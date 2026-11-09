"use client";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { Korak } from "@/components/ScrollScene";
import { pratiElement } from "@/lib/mjera";

/*
 * Pravi 3D telefon (GLB model, three.js). Stoji licem prema gledaocu i blago
 * se njiše; na ekranu se smjenjuju pravi screenshoti kao iOS navigacija (novi
 * uklizi s desna). Svaki screenshot ide na GPU jednom, u punoj rezoluciji, a
 * smjenu radi shader: u toku skrola nema crtanja platna ni slanja teksture
 * (to je na telefonima trzalo). Kadar se crta samo kad se nešto pomjera.
 */

type Props = { slike: string[]; koraci: Korak[]; duzina?: number };

const MODEL = "/models/iphone.glb";
const CRNO = new THREE.MeshBasicMaterial({ color: 0x000000 });
const OKVIR = new THREE.MeshStandardMaterial({ color: 0x232326, metalness: 0.6, roughness: 0.55, envMapIntensity: 0.35 });
// Dok screenshot ne stigne na GPU, ekran je crn.
const CRNA = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1);
CRNA.needsUpdate = true;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const glatko = (t: number) => t * t * (3 - 2 * t);
const pribli = (a: number, b: number, k: number, eps: number) => (Math.abs(b - a) < eps ? b : a + (b - a) * k);

type Stanje = { u: number; pozicija: number; p: number; blizu: boolean };

// Kadar za svaki ekran: zum (1 = cijeli telefon) i fokus po visini ekrana.
// Početna → cijeli; majstori → lista; vrijeme → kalendar; zahtjev → udaljen.
const KADROVI = [
  { zum: 1, fokus: 0.5 },
  { zum: 1.75, fokus: 0.52 },
  { zum: 1.75, fokus: 0.33 },
  { zum: 0.82, fokus: 0.5 },
];

// Cijela površina stakla se vidi (provjereno probnom mrežom), a staklo je
// u omjeru pravog iPhonea (1290x2796). Uglovi stakla su zaobljeniji nego na
// iPhoneu, pa screenshot ide cijeli, neskaliran po omjeru, sa jednakim crnim
// rubom okolo (3,5 % širine = 1,6 % visine), da ništa ne bude odsječeno.
const RUB = 0.045;
// Spušteno 1 % visine, da status bar ne ide pod zaobljeni vrh stakla.
const SPUST = 0.01;
const EKRAN = { x: RUB, w: 1 - 2 * RUB, vrh: RUB * (1290 / 2796) + SPUST, dno: 1 - RUB * (1290 / 2796) + SPUST };

// Dynamic Island je dio hardvera: ide preko svih ekrana, na mjestu kao na
// iPhoneu 14 Pro Max (126x37 pt na 11 pt od vrha, ekran 430x932). Širi je od
// originala da pokrije rupu prednje kamere u ekranu modela (na ~1/3 širine, ne
// u sredini kao na pravom iPhoneu). Jedinice: širina ekrana 1, visina 2.
const VISINA_SLIKE = 2 * (EKRAN.dno - EKRAN.vrh);
const ISLAND = {
  polaSirine: (EKRAN.w * 0.37) / 2,
  polaVisine: (VISINA_SLIKE * (37 / 932)) / 2,
  // island je dio stakla, ne slike: ne pomjera se sa SPUST
  vrh: 2 * (EKRAN.vrh - SPUST) + VISINA_SLIKE * (11 / 932),
};

const SVJETLO = (
  <>
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
  </>
);

function Model({ stanje, slike, onSpreman, osvjeziRef }: {
  stanje: React.RefObject<Stanje>;
  slike: string[];
  onSpreman: () => void;
  osvjeziRef: React.RefObject<(() => void) | null>;
}) {
  const { scene } = useGLTF(MODEL, "/draco/");
  const advance = useThree((st) => st.advance);
  const invalidate = useThree((st) => st.invalidate);
  const gl = useThree((st) => st.gl);
  const scena3 = useThree((st) => st.scene);
  const kamera = useThree((st) => st.camera);
  const viewport = useThree((st) => st.viewport);
  const size = useThree((st) => st.size);
  const grupa = useRef<THREE.Group>(null);
  const materijal = useRef<THREE.ShaderMaterial | null>(null);
  const teksture = useRef<(THREE.Texture | null)[]>([]);
  // dok se GPU zagrijava, telefon stoji u kadru (platno je tada još nevidljivo)
  const grije = useRef(false);

  useEffect(() => {
    osvjeziRef.current = () => invalidate();
    return () => {
      osvjeziRef.current = null;
    };
  }, [osvjeziRef, invalidate]);

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

  useEffect(() => {
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
        const m = new THREE.ShaderMaterial({
          uniforms: {
            mapA: { value: CRNA },
            mapB: { value: CRNA },
            uPomak: { value: 0 },
            uTama: { value: 1 },
            uLice: { value: lice },
            // pravougaonik slike na ekranu (udjeli, y odozgo)
            uRect: { value: new THREE.Vector4(EKRAN.x, EKRAN.vrh, EKRAN.w, EKRAN.dno - EKRAN.vrh) },
            // Dynamic Island: centar x, centar y, pola širine, pola visine
            uIsland: { value: new THREE.Vector4(0.5, ISLAND.vrh + ISLAND.polaVisine, ISLAND.polaSirine, ISLAND.polaVisine) },
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
            uniform sampler2D mapA;
            uniform sampler2D mapB;
            uniform float uPomak;
            uniform float uTama;
            uniform vec4 uRect;
            uniform vec4 uIsland;
            varying vec2 vUv;
            varying float vLice;

            // screenshot pomaknut za udio širine ekrana; van slike je crno
            vec3 sloj(sampler2D mapa, vec2 st, float pomak) {
              vec2 uv = (vec2(st.x - pomak, st.y) - uRect.xy) / uRect.zw;
              vec2 w = fwidth(uv) * 0.5 + 1e-6;
              vec2 m = smoothstep(-w, w, uv) * (1.0 - smoothstep(1.0 - w, 1.0 + w, uv));
              return texture2D(mapa, vec2(uv.x, 1.0 - uv.y)).rgb * m.x * m.y;
            }

            void main() {
              vec2 st = vec2(vUv.x, 1.0 - vUv.y);
              // stari ekran se odmiče ulijevo i tamni
              vec3 c = sloj(mapA, st, -uPomak * 0.3) * uTama;
              // novi ulazi s desna, i sve desno od njegove ivice pripada njemu
              if (uPomak > 0.0) {
                float ivica = 1.0 - uPomak;
                float pokriva = clamp((st.x - ivica) / max(fwidth(st.x), 1e-5) + 0.5, 0.0, 1.0);
                c = mix(c, sloj(mapB, st, ivica), pokriva);
              }
              // Dynamic Island: zaobljen pravougaonik, u jedinicama širina 1, visina 2
              vec2 o = abs(st * vec2(1.0, 2.0) - uIsland.xy) - uIsland.zw + uIsland.w;
              float sd = length(max(o, 0.0)) + min(max(o.x, o.y), 0.0) - uIsland.w;
              float aa = max(fwidth(sd), 1e-6) * 0.5;
              c *= smoothstep(-aa, aa, sd);
              gl_FragColor = vec4(c * smoothstep(0.95, 0.99, vLice), 1.0);
              #include <colorspace_fragment>
            }`,
        });
        materijal.current = m;
        mesh.material = m;
      }
    });
  }, [model]);

  // Screenshoti idu na GPU jedan po jedan, kad browser odahne, a zatim se
  // kompajliraju shaderi i iscrta par kadrova. Sve to prije nego sekcija naiđe:
  // u toku skrola više nema ni slanja tekstura ni kompajliranja.
  useEffect(() => {
    let otkazano = false;
    let zadnjiSkrol = 0;
    const naSkrol = () => {
      zadnjiSkrol = performance.now();
    };
    window.addEventListener("scroll", naSkrol, { passive: true });
    // Slanje jedne teksture traje par desetina ms; dok prst skrola to bi se
    // vidjelo kao trzaj, pa se čeka kratka pauza (osim ako sekcija već stiže).
    const mir = () =>
      new Promise<void>((gotovo) => {
        const probaj = () => {
          if (performance.now() - zadnjiSkrol < 200 && !stanje.current.blizu) {
            setTimeout(probaj, 100);
            return;
          }
          if ("requestIdleCallback" in window) window.requestIdleCallback(() => gotovo(), { timeout: 500 });
          else setTimeout(gotovo, 30);
        };
        probaj();
      });
    const nastale: THREE.Texture[] = [];
    (async () => {
      for (let i = 0; i < slike.length; i++) {
        const img = new Image();
        img.decoding = "async";
        img.src = slike[i];
        await img.decode().catch(() => {});
        if (otkazano) return;
        if (!img.naturalWidth) continue;
        await mir();
        if (otkazano) return;
        const t = new THREE.Texture(img);
        t.colorSpace = THREE.SRGBColorSpace;
        // tekstura ekrana u modelu je okrenuta po vertikali
        t.flipY = true;
        t.anisotropy = 16;
        // mipmape za čist tekst kad je ekran manji od teksture
        t.generateMipmaps = true;
        t.minFilter = THREE.LinearMipmapLinearFilter;
        t.needsUpdate = true;
        gl.initTexture(t);
        nastale.push(t);
        teksture.current[i] = t;
        invalidate();
      }
      await gl.compileAsync(scena3, kamera).catch(() => {});
      if (otkazano) return;
      // Metal/ANGLE pravi stanje crtanja tek pri prvom stvarnom crtanju u kadru,
      // pa tokom ovih kadrova telefon stoji u kadru.
      grije.current = true;
      let n = 0;
      const kadar = () => {
        if (otkazano) return;
        advance(performance.now());
        if (++n < 3) {
          requestAnimationFrame(kadar);
          return;
        }
        grije.current = false;
        onSpreman();
        invalidate();
      };
      requestAnimationFrame(kadar);
    })();
    return () => {
      otkazano = true;
      window.removeEventListener("scroll", naSkrol);
      nastale.forEach((t) => t.dispose());
    };
  }, [slike, gl, scena3, kamera, advance, invalidate, onSpreman, stanje]);

  // Prikazano stanje prigušeno prati skrol (točkić miša ne trza telefon).
  const glatko_ = useRef<Stanje | null>(null);
  useFrame((_, dt) => {
    const cilj = stanje.current;
    if (!cilj || !grupa.current) return;
    const s = (glatko_.current ??= { ...cilj });
    const k = 1 - Math.exp(-Math.min(dt, 0.05) * 9);
    s.u = pribli(s.u, cilj.u, k, 1e-4);
    s.p = pribli(s.p, cilj.p, k, 1e-4);
    s.pozicija = pribli(s.pozicija, cilj.pozicija, k, 0.0005);
    // kadar se crta samo dok se nešto pomjera
    if (s.u !== cilj.u || s.p !== cilj.p || s.pozicija !== cilj.pozicija) invalidate();
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
    const ulaz = grije.current ? 1 : glatko(s.u);
    grupa.current.position.set(
      (siroko ? viewport.width * 0.17 : 0) + (1 - ulaz) * viewport.width * 0.45,
      (siroko ? -0.02 * viewport.height : viewport.height * 0.1) + yFokus,
      0,
    );
    const njihanje = (s.pozicija / Math.max(1, n - 1) - 0.5) * -0.3;
    grupa.current.rotation.set(0.05 + Math.sin(s.p * Math.PI * 2) * 0.015, njihanje - (1 - ulaz) * 0.6, (1 - ulaz) * 0.08);

    // Smjena ekrana: samo se biraju teksture i pomak, ništa se ne šalje na GPU.
    const m = materijal.current;
    if (m) {
      const poz = clamp(s.pozicija, 0, n - 1);
      const prvi = Math.floor(poz);
      const pomak = poz - prvi;
      m.uniforms.mapA.value = teksture.current[prvi] ?? CRNA;
      m.uniforms.mapB.value = teksture.current[Math.min(prvi + 1, n - 1)] ?? CRNA;
      m.uniforms.uPomak.value = pomak;
      // Tamnjenje je bilo u sRGB prostoru (alfa 0,35), a shader radi u linearnom.
      m.uniforms.uTama.value = Math.pow(1 - 0.35 * pomak, 2.2);
    }
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
  const stanje = useRef<Stanje>({ u: 0, pozicija: 0, p: 0, blizu: false });
  const osvjezi = useRef<(() => void) | null>(null);
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
    // skida); poslije ostaje, a kad se ništa ne mijenja, ne crta.
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
    const el = sekcija.current;
    if (!el) return;
    let id = 0;
    const n = slike.length;
    // pozicije iz keša: mjerenje u svakom kadru tjera preračun rasporeda
    const mjera = pratiElement(el);
    // u DOM se piše samo ono što se stvarno promijenilo
    const stari = {
      pozornica: "",
      opacity: koraci.map(() => ""),
      transform: koraci.map(() => ""),
      tacka: koraci.map(() => ""),
    };
    const crtaj = () => {
      id = 0;
      const r = mjera.citaj();
      const st = stanje.current;
      st.blizu = r.top < r.vh * 1.5 && r.bottom > -r.vh;
      // daleko od sekcije nema šta da se crta
      if (r.bottom < -r.vh || r.top > r.vh * 2) return;
      const p = clamp(-r.top / Math.max(1, r.visina - r.vh));
      const u = glatko(clamp(1 - r.top / r.vh));
      // pretapanje na izlazu, da se sljedeća scena nadoveže bez reza
      const prozirnost = String(clamp(u * 2) * (1 - clamp((p - 0.94) / 0.06)));
      if (pozornica.current && prozirnost !== stari.pozornica) {
        pozornica.current.style.opacity = prozirnost;
        stari.pozornica = prozirnost;
      }
      // ekrani se smjenjuju preko cijele sekcije
      const s = clamp((p - 0.05) / 0.85) * (n - 1);
      const cijeli = Math.floor(s);
      const pozicija = Math.min(n - 1, cijeli + glatko(clamp((s - cijeli - 0.3) / 0.4)));
      st.u = u;
      st.pozicija = pozicija;
      st.p = p;
      osvjezi.current?.();

      koraci.forEach((_, j) => {
        const v = clamp(1 - Math.abs(pozicija - j) * 2.5);
        const d = tekstovi.current[j];
        if (d) {
          const o = String(j === 0 ? Math.min(v, clamp(u * 1.5 - 0.3)) : v);
          if (o !== stari.opacity[j]) {
            d.style.opacity = o;
            stari.opacity[j] = o;
          }
          // nevidljivom tekstu pomak ne treba
          if (o !== "0") {
            const tr = `translateY(${(pozicija - j) * -24}px)`;
            if (tr !== stari.transform[j]) {
              d.style.transform = tr;
              stari.transform[j] = tr;
            }
          }
        }
        const t = tacke.current[j];
        if (t) {
          const o = String(0.3 + 0.7 * v);
          if (o !== stari.tacka[j]) {
            t.style.opacity = o;
            stari.tacka[j] = o;
          }
        }
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
      window.removeEventListener("scroll", zakazi);
      window.removeEventListener("resize", zakazi);
      mjera.prestani();
    };
  }, [slike, koraci]);

  // Sadržaj platna se ne smije ponovo iscrtati kad se promijeni stanje ove
  // komponente: nova mapa okoline i rekompajliranje materijala daju trzaj.
  const scena = useMemo(
    () => (
      <Suspense fallback={null}>
        <Model stanje={stanje} slike={slike} onSpreman={naSpreman} osvjeziRef={osvjezi} />
        {SVJETLO}
      </Suspense>
    ),
    [slike, naSpreman],
  );

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
          <Canvas className={`!absolute inset-0 transition-opacity duration-700 ${spreman ? "opacity-100" : "opacity-0"}`} style={{ pointerEvents: "none" }} camera={{ position: [0, 0, 8], fov: 30 }} dpr={[1, 2]} gl={{ antialias: true, powerPreference: "high-performance" }} frameloop="demand">
            {scena}
          </Canvas>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 grid px-6 pb-[7svh] text-white min-[900px]:inset-y-0 min-[900px]:left-[5vw] min-[900px]:right-auto min-[900px]:w-[30vw] min-[900px]:items-center min-[900px]:px-0 min-[900px]:pb-0">
          {koraci.map((k, j) => (
            <div key={k.naslov} ref={(d) => { tekstovi.current[j] = d; }} className="col-start-1 row-start-1 opacity-0 will-change-[transform,opacity]">
              {k.kicker && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-coral">{k.kicker}</p>}
              <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl min-[900px]:text-5xl">{k.naslov}</h2>
              {k.tekst && <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">{k.tekst}</p>}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute bottom-[2.5svh] left-1/2 flex -translate-x-1/2 gap-2 min-[900px]:bottom-[10svh] min-[900px]:left-[5vw] min-[900px]:translate-x-0">
          {koraci.map((k, j) => (
            <span key={k.naslov} ref={(t) => { tacke.current[j] = t; }} className="h-1.5 w-6 rounded-full bg-coral opacity-30 will-change-[opacity]" />
          ))}
        </div>
      </div>
    </section>
  );
}

useGLTF.preload(MODEL, "/draco/");
