"use client";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { Korak } from "@/components/ScrollScene";
import { pratiElement } from "@/lib/mjera";
import { zagrijScenu } from "@/lib/zagrij";

/*
 * Pravi 3D telefon (GLB model, three.js). Stoji licem prema gledaocu i blago
 * se njiše; na ekranu se smjenjuju pravi screenshoti kao iOS navigacija (novi
 * uklizi s desna). Ekran je CanvasTexture koja se crta
 * samo kad se pozicija promijeni.
 */

type Props = { slike: string[]; koraci: Korak[]; duzina?: number };

const MODEL = "/models/iphone.glb";
const CRNO = new THREE.MeshBasicMaterial({ color: 0x000000 });
const OKVIR = new THREE.MeshStandardMaterial({ color: 0x232326, metalness: 0.6, roughness: 0.55, envMapIntensity: 0.35 });
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const glatko = (t: number) => t * t * (3 - 2 * t);

// Teksture ekrana u modelu su 1:2; naš ekran se uklopi bez sječenja.
// Tekstura ekrana: dovoljno oštra za telefon na ~80 % visine prozora, a manja
// za upload na GPU pri svakoj smjeni ekrana (isti omjer 1:2 kao prije).
// Tekstura ekrana u modelu je 1:2 (širina:visina), pa je omjer piksela x/y 0,5.
const ASPEKT = 0.5;

type Stanje = { u: number; pozicija: number; p: number };

// Kadar za svaki ekran: zum (1 = cijeli telefon) i fokus po visini ekrana.
// Početna → cijeli; majstori → lista; vrijeme → kalendar; zahtjev → udaljen.
const KADROVI = [
  { zum: 1, fokus: 0.5 },
  { zum: 1.75, fokus: 0.52 },
  { zum: 1.75, fokus: 0.33 },
  { zum: 0.82, fokus: 0.5 },
];

// Cijela tekstura se vidi na staklu (provjereno probnom mrežom), a staklo je
// u omjeru pravog iPhonea (1290x2796). Uglovi stakla su zaobljeniji nego na
// iPhoneu, pa screenshot ide cijeli, neskaliran po omjeru, sa jednakim crnim
// rubom okolo (3,5 % širine = 1,6 % visine), da ništa ne bude odsječeno.
const RUB = 0.045;
// Spušteno 1 % visine, da status bar ne ide pod zaobljeni vrh stakla.
const SPUST = 0.01;
const EKRAN = { x: RUB, w: 1 - 2 * RUB, vrh: RUB * (1290 / 2796) + SPUST, dno: 1 - RUB * (1290 / 2796) + SPUST };

function Model({ stanje, slike, onSpreman }: { stanje: React.RefObject<Stanje>; slike: string[]; onSpreman: () => void }) {
  const { scene } = useGLTF(MODEL, "/draco/");
  // Model je učitan čim se ova komponenta prvi put iscrta (Suspense). Odmah
  // "zagrijemo" GPU: par kadrova van ekrana kompajlira shadere, napravi okolinu
  // (Environment) i pošalje teksture — da prvi pravi kadar na skrolu ne trzne.
  const advance = useThree((st) => st.advance);
  const grije = useRef(0);
  // Pauza van ekrana direktno na platnu (setFrameloop), bez React stanja: promjena
  // stanja bi ponovo iscrtala i svjetlo (Environment) — nova mapa okoline,
  // rekompajliranje materijala i trzaj pri ulasku u sekciju.
  const setFrameloop = useThree((st) => st.setFrameloop);
  const platno = useThree((st) => st.gl.domElement);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setFrameloop(e.isIntersecting ? "always" : "never"), { rootMargin: "25% 0px" });
    io.observe(platno);
    return () => io.disconnect();
  }, [setFrameloop, platno]);
  const { gl, scene: scene3, camera } = useThree();
  useEffect(() => {
    onSpreman();
    // Okolina (Environment) se napravi u prvom kadru i tada materijali dobiju
    // novi shader; zato zagrijavanje ide u tri talasa, da se i ti shaderi
    // kompajliraju prije nego sekcija naiđe.
    const talas = () => {
      // telefon je pri zagrijavanju van kadra (ulijeće sa strane), pa ga obični
      // kadar preskoči; compile kompajlira sve materijale bez obzira na kadar
      zagrijScenu(gl, scene3, camera);
      let n = 0;
      // Metal/ANGLE pravi stanje crtanja tek pri prvom stvarnom crtanju u kadru,
      // pa tokom ovih kadrova uređaj stoji u kadru
      grije.current++;
      const kadar = () => {
        advance(performance.now());
        if (++n < 3) requestAnimationFrame(kadar);
        else grije.current--;
      };
      requestAnimationFrame(kadar);
    };
    talas();
    const t1 = setTimeout(talas, 400);
    const t2 = setTimeout(talas, 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onSpreman, advance, gl, scene3, camera]);
  const grupa = useRef<THREE.Group>(null);
  const { viewport, size } = useThree();

  const { model, visina } = useMemo(() => {
    // Model u fajlu gleda licem u +x; okrenemo ga licem prema kameri (+z).
    const m = new THREE.Group();
    const kopija = scene.clone(true);
    kopija.rotation.y = -Math.PI / 2;
    m.add(kopija);
    m.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(m);
    const c = box.getCenter(new THREE.Vector3());
    m.position.sub(c);
    return { model: m, visina: box.getSize(new THREE.Vector3()).y };
  }, [scene]);

  // Sva četiri screenshota idu na GPU jednom (useTexture, pod istim Suspense
  // kao model, pa ih "zagrijavanje" pošalje prije skrola). Smjenu ekrana radi
  // shader — u toku skrola nema crtanja ni slanja tekstura.
  const teksture = useTexture(slike);
  const materijal = useRef<THREE.ShaderMaterial | null>(null);
  useEffect(() => {
    teksture.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      t.needsUpdate = true;
    });
    model.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      const mat = mesh.material as THREE.Material;
      // prednja kamera iz modela bi stajala pored Dynamic Islanda koji crtamo
      if (/Front_Camera|Lens003|Lens_Glass003|Front_Mic/.test(mesh.parent?.name ?? "") || /Front_Camera|Lens003|Front_Mic/.test(mesh.name)) {
        // čisto crno, bez odsjaja: kamera nestane u Dynamic Islandu
        mesh.material = CRNO;
      }
      // rupu kamere u ekranu zatvara crna kugla (kugla, jer orijentacija čvora nije poznata)
      if (/Front_Camera_Glass/.test(mesh.parent?.name ?? "") && !mesh.parent!.userData.zatvoreno) {
        mesh.parent!.userData.zatvoreno = true;
        mesh.parent!.add(new THREE.Mesh(new THREE.SphereGeometry(1.6, 24, 16), CRNO));
      }
      // Model nosi KHR_materials_iridescence: sedefasti odsjaj koji pod oštrim
      // uglom daje zlatnu liniju po ivici telefona. Gasimo ga svuda.
      const fiz = mesh.material as THREE.MeshPhysicalMaterial;
      if (fiz.isMeshPhysicalMaterial) {
        fiz.iridescence = 0;
        fiz.sheen = 0;
      }
      // Metalni okvir (Side_Rails) je u originalu jako sjajan pa pod uglom
      // svijetli kao zlatna linija oko ekrana; ovdje je običan tamni metal.
      if (mat.name === "Side_Rails") {
        mesh.material = OKVIR;
      }
      // poleđina: matiranija, da ne bljesne kad se telefon okrene
      if (mat.name === "Back_Glass") {
        const m = (mesh.material as THREE.MeshStandardMaterial).clone();
        m.roughness = Math.max(m.roughness ?? 0, 0.55);
        m.envMapIntensity = 0.45;
        m.color.multiplyScalar(0.55);
        mesh.material = m;
      }
      if (mat.name === "Screen") {
        // dvostrano kao u originalu — normale ekrana u modelu gledaju unutra
        // Ekran u modelu ima zaobljen rub preko okvira, a UV tog ruba gađa sredinu
        // slike, pa je rub svijetlio bojom screenshota (dugme, fotografija).
        // Shader zato po pikselu gleda koliko površina gleda u smjeru lica
        // ekrana: ravni dio prikazuje sliku, a sve što se savija ka rubu ide u
        // crno — glatko, i bez obzira na UV.
        // smjer lica = najtanja osa ploče ekrana
        mesh.geometry.computeBoundingBox();
        const vel = mesh.geometry.boundingBox!.getSize(new THREE.Vector3());
        const najtanja = vel.x <= vel.y && vel.x <= vel.z ? 0 : vel.y <= vel.z ? 1 : 2;
        const lice = new THREE.Vector3().setComponent(najtanja, 1);
        const sh = EKRAN.dno - EKRAN.vrh;
        const mat2 = new THREE.ShaderMaterial({
          uniforms: {
            t0: { value: teksture[0] }, t1: { value: teksture[1] }, t2: { value: teksture[2] }, t3: { value: teksture[3] },
            uPoz: { value: 0 },
            uLice: { value: lice },
            // pravougaonik slike u ekranu (udjeli, y odozgo)
            uRect: { value: new THREE.Vector4(EKRAN.x, EKRAN.vrh, EKRAN.w, sh) },
            // Dynamic Island: centar x, gornji y, širina, visina (udjeli), omjer ekrana
            uIsland: { value: new THREE.Vector4(0.5, EKRAN.vrh - SPUST + sh * (11 / 932), EKRAN.w * 0.37, sh * (37 / 932)) },
            uOmjer: { value: ASPEKT },
          },
          side: THREE.DoubleSide,
          toneMapped: false,
          vertexShader: `
            varying vec2 vUv;
            varying float vLice;
            uniform vec3 uLice;
            void main() {
              vUv = uv;
              vLice = abs(dot(normalize(normal), uLice));
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }`,
          fragmentShader: `
            uniform sampler2D t0, t1, t2, t3;
            uniform float uPoz, uOmjer;
            uniform vec4 uRect, uIsland;
            varying vec2 vUv;
            varying float vLice;
            vec3 uzmi(int i, vec2 uv) {
              if (i <= 0) return texture2D(t0, uv).rgb;
              if (i == 1) return texture2D(t1, uv).rgb;
              if (i == 2) return texture2D(t2, uv).rgb;
              return texture2D(t3, uv).rgb;
            }
            // ekran i, pomaknut za o (udio širine): boja ili crno van slike
            vec3 ekran(int i, float x, float y) {
              vec2 u = vec2((x - uRect.x) / uRect.z, (y - uRect.y) / uRect.w);
              if (u.x < 0.0 || u.x > 1.0 || u.y < 0.0 || u.y > 1.0) return vec3(0.0);
              return uzmi(i, vec2(u.x, 1.0 - u.y));
            }
            void main() {
              float x = vUv.x;
              float y = 1.0 - vUv.y; // odozgo, kao na platnu ranije
              int a = int(floor(uPoz));
              float f = uPoz - float(a);
              vec3 c;
              float ob = 1.0 - f; // novi ekran ulazi s desna
              if (f > 0.0001 && x >= ob) c = ekran(a + 1, x - ob, y);
              else c = ekran(a, x + f * 0.3, y) * (1.0 - f * 0.35); // stari se odmiče i tamni
              // Dynamic Island (zaobljen pravougaonik, u pikselima omjera ekrana)
              vec2 p = vec2((x - uIsland.x) * uOmjer, y - (uIsland.y + uIsland.w * 0.5));
              vec2 hb = vec2(uIsland.z * 0.5 * uOmjer, uIsland.w * 0.5);
              float r = hb.y;
              vec2 q = abs(p) - hb + vec2(r);
              float sd = length(max(q, 0.0)) - r;
              c *= smoothstep(-0.0008, 0.0008, sd);
              gl_FragColor = vec4(c * smoothstep(0.95, 0.99, vLice), 1.0);
              #include <colorspace_fragment>
            }`,
        });
        materijal.current = mat2;
        mesh.material = mat2;
      }
    });
  }, [model, teksture]);

  // Prikazano stanje prigušeno prati skrol (točkić miša ne trza telefon).
  const glatko_ = useRef<Stanje | null>(null);
  useFrame((_, dt) => {
    const cilj = stanje.current;
    if (!cilj || !grupa.current) return;
    const s = (glatko_.current ??= { ...cilj });
    const k = 1 - Math.exp(-Math.min(dt, 0.05) * 9);
    s.u += (cilj.u - s.u) * k;
    s.p += (cilj.p - s.p) * k;
    s.pozicija += (cilj.pozicija - s.pozicija) * k;
    if (Math.abs(cilj.pozicija - s.pozicija) < 0.0005) s.pozicija = cilj.pozicija;
    const siroko = size.width >= 900;

    // Kadar po ekranu: telefon priđe dijelu ekrana o kojem tekst govori
    // (lista majstora, kalendar), a na zahtjevu se udalji. Između kadrova
    // pretapanje prati smjenu ekrana.
    const n = slike.length;
    const kk = clamp(s.pozicija, 0, KADROVI.length - 1);
    const a = Math.floor(kk);
    const b = Math.min(a + 1, KADROVI.length - 1);
    const f = glatko(kk - a);
    // Zum treba prostor pored teksta: pun na 16:10 i širem, blaži na 4:3,
    // na uskom ekranu (tekst ispod telefona) telefon samo stoji i smjenjuje ekrane.
    const prostor = siroko ? Math.min(1, Math.max(0, (size.width / size.height - 1.2) / 0.4)) : 0;
    const zum = 1 + (lerp(KADROVI[a].zum, KADROVI[b].zum, f) - 1) * lerp(0.35, 1, prostor) * (siroko ? 1 : 0);
    const fokus = lerp(KADROVI[a].fokus, KADROVI[b].fokus, f);
    // na uskom ekranu telefon ispod navigacije (72 px), iznad teksta
    const osnova = (viewport.height * (siroko ? 0.82 : 0.5)) / visina;
    const vel = osnova * zum;
    grupa.current.scale.setScalar(vel);
    // fokus (0 = vrh ekrana, 1 = dno) dovodi se u sredinu kadra
    const yFokus = (fokus - 0.5) * visina * vel * (zum > 1 ? 1 : 0);
    // ulaz kao kod laptopa: dok sekcija dolazi u prozor, telefon uđe sa
    // desne strane, blago okrenut, i stane licem prema gledaocu
    // pri zagrijavanju telefon u kadru (sekcija je tada nevidljiva)
    const ulaz = grije.current > 0 ? 1 : glatko(s.u);
    grupa.current.position.set(
      (siroko ? viewport.width * 0.17 : 0) + (1 - ulaz) * viewport.width * 0.45,
      (siroko ? -0.02 * viewport.height : viewport.height * 0.1) + yFokus,
      0,
    );
    const njihanje = (s.pozicija / Math.max(1, n - 1) - 0.5) * -0.3;
    grupa.current.rotation.set(0.05 + Math.sin(s.p * Math.PI * 2) * 0.015, njihanje - (1 - ulaz) * 0.6, (1 - ulaz) * 0.08);

    if (materijal.current) materijal.current.uniforms.uPoz.value = clamp(s.pozicija, 0, slike.length - 1);
  });

  return (
    <group ref={grupa}>
      <primitive object={model} />
    </group>
  );
}

export function Phone3D({ slike, koraci, duzina = 5 }: Props) {
  const sekcija = useRef<HTMLElement>(null);
  const pozornica = useRef<HTMLDivElement>(null);
  const stanje = useRef<Stanje>({ u: 0, pozicija: 0, p: 0 });
  const tekstovi = useRef<(HTMLDivElement | null)[]>([]);
  const tacke = useRef<(HTMLSpanElement | null)[]>([]);
  const [vidljivo, setVidljivo] = useState(false);
  const [spreman, setSpreman] = useState(false);
  const naSpreman = useCallback(() => setSpreman(true), []);

  // Canvas se pali tek kad je sekcija blizu, da ne troši GPU iznad nje.
  useEffect(() => {
    const el = sekcija.current;
    if (!el) return;
    // Dvije visine ekrana prije sekcije canvas se napravi (i model krene da se
    // skida); poslije ostaje, a van ekrana samo ne crta (frameloop "never").
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVidljivo(true);
    }, { rootMargin: "200% 0px" });
    // Ne čekamo skrol: čim se stranica učita i browser odahne, canvas se napravi
    // i model krene da se skida i priprema (dok korisnik još gleda hero).
    const pripremi = () => setVidljivo(true);
    const idle = (cb: () => void) =>
      "requestIdleCallback" in window ? window.requestIdleCallback(cb, { timeout: 2500 }) : setTimeout(cb, 1200);
    if (document.readyState === "complete") idle(pripremi);
    else window.addEventListener("load", () => idle(pripremi), { once: true });
    io.observe(el);
    return () => {
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    let id = 0;
    const n = slike.length;
    const mjera = sekcija.current ? pratiElement(sekcija.current) : null;
    const crtaj = () => {
      id = 0;
      if (!mjera) return;
      const r = mjera.citaj();
      const p = clamp(-r.top / Math.max(1, r.visina - r.vh));
      const u = glatko(clamp(1 - r.top / r.vh));
      // pretapanje na izlazu, da se sljedeća scena nadoveže bez reza
      if (pozornica.current) pozornica.current.style.opacity = String(clamp(u * 2) * (1 - clamp((p - 0.94) / 0.06)));
      // ekrani se smjenjuju preko cijele sekcije
      const s = clamp((p - 0.05) / 0.85) * (n - 1);
      const cijeli = Math.floor(s);
      const pozicija = Math.min(n - 1, cijeli + glatko(clamp((s - cijeli - 0.3) / 0.4)));
      stanje.current = { u, pozicija, p };

      koraci.forEach((_, j) => {
        const v = clamp(1 - Math.abs(pozicija - j) * 2.5);
        const d = tekstovi.current[j];
        if (d) {
          d.style.opacity = String(j === 0 ? Math.min(v, clamp(u * 1.5 - 0.3)) : v);
          d.style.transform = `translateY(${(pozicija - j) * -24}px)`;
        }
        const t = tacke.current[j];
        if (t) t.style.opacity = String(0.3 + 0.7 * v);
      });
    };
    const zakazi = () => {
      if (!id) id = requestAnimationFrame(crtaj);
    };
    crtaj();
    window.addEventListener("scroll", zakazi, { passive: true });
    window.addEventListener("resize", zakazi);
    return () => {
      cancelAnimationFrame(id);
      mjera?.prestani();
      window.removeEventListener("scroll", zakazi);
      window.removeEventListener("resize", zakazi);
    };
  }, [slike, koraci]);

  return (
    <section ref={sekcija} className="relative bg-night" style={{ height: `${duzina * 100}svh` }}>
      <div ref={pozornica} className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_55%_at_67%_52%,rgba(238,108,77,0.2),transparent_70%)] max-[899px]:bg-[radial-gradient(ellipse_70%_40%_at_50%_35%,rgba(238,108,77,0.2),transparent_70%)]" />
        {/* Dok model ne stigne (spora mreža), na mjestu telefona stoji obični
            screenshot u okviru; 3D se pretopi preko njega. */}
        <div
          aria-hidden
          className={`pointer-events-none absolute left-1/2 top-1/2 aspect-[1290/2796] h-[50svh] -translate-x-1/2 -translate-y-[calc(50%+10svh)] overflow-hidden rounded-[2.2rem] border-[8px] border-[#1c1b1d] bg-black shadow-2xl transition-opacity duration-700 min-[900px]:h-[78svh] min-[900px]:translate-x-[calc(-50%+17vw)] min-[900px]:-translate-y-[calc(50%-2svh)] min-[900px]:rounded-[3rem] min-[900px]:border-[11px] ${
            spreman ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* mala verzija prvog ekrana (~20 KB) stiže odmah i na sporoj mreži */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/scroll/lebdi/iphone-1-mala.webp" alt="" className="h-full w-full" />
        </div>
        {vidljivo && (
          <Canvas className={`!absolute inset-0 transition-opacity duration-700 ${spreman ? "opacity-100" : "opacity-0"}`} camera={{ position: [0, 0, 8], fov: 30 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }} frameloop="never">
            <Suspense fallback={null}>
              <Model stanje={stanje} slike={slike} onSpreman={naSpreman} />
              {/* svjetlo bez preuzimanja HDR-a: nekoliko svjetlećih ploha */}
              {/* mekano studijsko svjetlo: velika bijela ploha odozgo i dvije
                  slabe bočne, bez obojenih odsjaja */}
              {/* frames={1}: okolina se izračuna jednom, ne u svakom kadru */}
              <Environment resolution={256} frames={1}>
                <Lightformer form="rect" intensity={1.1} position={[0, 5, 3]} rotation-x={Math.PI / 2.5} scale={[12, 6, 1]} />
                <Lightformer form="rect" intensity={0.45} position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[4, 10, 1]} />
                <Lightformer form="rect" intensity={0.3} position={[6, 0, 1]} rotation-y={-Math.PI / 2} scale={[4, 10, 1]} />
              </Environment>
              <ambientLight intensity={0.25} />
            </Suspense>
          </Canvas>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 grid px-6 pb-[7svh] text-white min-[900px]:inset-y-0 min-[900px]:left-[5vw] min-[900px]:right-auto min-[900px]:w-[30vw] min-[900px]:items-center min-[900px]:px-0 min-[900px]:pb-0">
          {koraci.map((k, j) => (
            <div key={k.naslov} ref={(d) => { tekstovi.current[j] = d; }} className="col-start-1 row-start-1 opacity-0">
              {k.kicker && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-coral">{k.kicker}</p>}
              <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl min-[900px]:text-5xl">{k.naslov}</h2>
              {k.tekst && <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">{k.tekst}</p>}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute bottom-[2.5svh] left-1/2 flex -translate-x-1/2 gap-2 min-[900px]:bottom-[10svh] min-[900px]:left-[5vw] min-[900px]:translate-x-0">
          {koraci.map((k, j) => (
            <span key={k.naslov} ref={(t) => { tacke.current[j] = t; }} className="h-1.5 w-6 rounded-full bg-coral opacity-30" />
          ))}
        </div>
      </div>
    </section>
  );
}

useGLTF.preload(MODEL, "/draco/");
