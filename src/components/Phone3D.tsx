"use client";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { Korak } from "@/components/ScrollScene";

/*
 * Pravi 3D telefon (GLB model, three.js). Stoji licem prema gledaocu i blago
 * se njiše; na ekranu se smjenjuju pravi screenshoti kao iOS navigacija (novi
 * uklizi s desna). Ekran je CanvasTexture koja se crta
 * samo kad se pozicija promijeni.
 */

type Props = { slike: string[]; koraci: Korak[]; duzina?: number };

const MODEL = "/models/iphone.glb";
const CRNO = new THREE.MeshBasicMaterial({ color: 0x000000 });
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const glatko = (t: number) => t * t * (3 - 2 * t);

// Teksture ekrana u modelu su 1:2; naš ekran se uklopi bez sječenja.
const TW = 1024;
const TH = 2048;

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
const RUB = 0.035;
// Spušteno 1 % visine, da status bar ne ide pod zaobljeni vrh stakla.
const SPUST = 0.01;
const EKRAN = { x: RUB, w: 1 - 2 * RUB, vrh: RUB * (1290 / 2796) + SPUST, dno: 1 - RUB * (1290 / 2796) + SPUST };

// Dynamic Island je dio hardvera: crta se jednom, preko svih ekrana, na
// mjestu kao na iPhoneu 14 Pro Max (126x37 pt na 11 pt od vrha, ekran 430x932).
// Širi je od originala da pokrije rupu prednje kamere u ekranu modela (na ~1/3
// širine, ne u sredini kao na pravom iPhoneu).
function dynamicIsland(g: CanvasRenderingContext2D) {
  const sh = TH * (EKRAN.dno - EKRAN.vrh);
  const sw = TW * EKRAN.w;
  const iw = sw * 0.37;
  const ih = sh * (37 / 932);
  g.fillStyle = "#000";
  g.beginPath();
  // island je dio stakla, ne slike: ne pomjera se sa SPUST
  g.roundRect(TW / 2 - iw / 2, TH * (EKRAN.vrh - SPUST) + sh * (11 / 932), iw, ih, ih / 2);
  g.fill();
}

function Model({ stanje, slike, onSpreman }: { stanje: React.RefObject<Stanje>; slike: string[]; onSpreman: () => void }) {
  const { scene } = useGLTF(MODEL, "/draco/");
  // model je učitan čim se ova komponenta prvi put iscrta (Suspense)
  useEffect(() => onSpreman(), [onSpreman]);
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

  // Ekran: platno na koje crtamo screenshote + Dynamic Island. U refu, jer se
  // tekstura mijenja svaki kadar (needsUpdate), a to nije React stanje.
  const ekran = useRef<{ platno: HTMLCanvasElement; tekstura: THREE.CanvasTexture } | null>(null);
  const dajEkran = () => {
    if (!ekran.current) {
      const cv = document.createElement("canvas");
      cv.width = TW;
      cv.height = TH;
      const t = new THREE.CanvasTexture(cv);
      t.colorSpace = THREE.SRGBColorSpace;
      t.flipY = true; // tekstura ekrana u modelu je okrenuta po vertikali
      t.anisotropy = 8;
      ekran.current = { platno: cv, tekstura: t };
    }
    return ekran.current;
  };

  const slikeEl = useMemo(
    () =>
      slike.map((src) => {
        const i = new Image();
        i.src = src;
        return i;
      }),
    [slike],
  );
  const zadnja = useRef(-1);

  useEffect(() => {
    const { tekstura } = dajEkran();
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
      if (mat.name === "Screen") {
        // dvostrano kao u originalu — normale ekrana u modelu gledaju unutra
        mesh.material = new THREE.MeshBasicMaterial({ map: tekstura, toneMapped: false, side: THREE.DoubleSide });
      }
    });
  }, [model]);

  useFrame(() => {
    const s = stanje.current;
    if (!s || !grupa.current) return;
    const siroko = size.width >= 900;

    // Kadar po ekranu: telefon priđe dijelu ekrana o kojem tekst govori
    // (lista majstora, kalendar), a na zahtjevu se udalji. Između kadrova
    // pretapanje prati smjenu ekrana.
    const n = slike.length;
    const k = clamp(s.pozicija, 0, KADROVI.length - 1);
    const a = Math.floor(k);
    const b = Math.min(a + 1, KADROVI.length - 1);
    const f = glatko(k - a);
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
    const ulaz = glatko(s.u);
    grupa.current.position.set(
      (siroko ? viewport.width * 0.17 : 0) + (1 - ulaz) * viewport.width * 0.45,
      (siroko ? -0.02 * viewport.height : viewport.height * 0.1) + yFokus,
      0,
    );
    const njihanje = (s.pozicija / Math.max(1, n - 1) - 0.5) * -0.3;
    grupa.current.rotation.set(0.05 + Math.sin(s.p * Math.PI * 2) * 0.015, njihanje - (1 - ulaz) * 0.6, (1 - ulaz) * 0.08);

    // crta se ponovo kad se pozicija promijeni ili kad se učita nova slika
    const ucitano = slikeEl.filter((i) => i.complete && i.naturalWidth).length;
    const kljuc = s.pozicija + ucitano * 1000;
    if (Math.abs(zadnja.current - kljuc) < 0.0005) return;
    zadnja.current = kljuc;
    const { platno, tekstura } = dajEkran();
    const g = platno.getContext("2d")!;
    g.fillStyle = "#000";
    g.fillRect(0, 0, TW, TH);
    slikeEl.forEach((img, j) => {
      const d = j - s.pozicija;
      if (d > 1 || d < -1 || !img.complete || !img.naturalWidth) return;
      const pomak = d >= 0 ? d * TW : d * TW * 0.3;
      // cijela širina pripada ovom ekranu, da ispod ne proviri prethodni
      g.fillStyle = "#000";
      g.fillRect(pomak, 0, TW, TH);
      const [x, y, w, h] = [TW * EKRAN.x + pomak, TH * EKRAN.vrh, TW * EKRAN.w, TH * (EKRAN.dno - EKRAN.vrh)];
      // rub stakla oko slike puni se krajnjim redom/kolonom screenshota, da nema
      // crne trake; sama slika ostaje neskalirana po omjeru
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      g.drawImage(img, 0, 0, iw, 1, x, 0, w, y + 1);
      g.drawImage(img, 0, ih - 1, iw, 1, x, y + h - 1, w, TH - (y + h) + 1);
      g.drawImage(img, 0, 0, 1, ih, pomak, y, x - pomak + 1, h);
      g.drawImage(img, iw - 1, 0, 1, ih, x + w - 1, y, TW + pomak - (x + w) + 1, h);
      g.drawImage(img, 0, 0, iw, ih, x, y, w, h);
      if (d < 0) {
        g.fillStyle = `rgba(0,0,0,${Math.min(-d, 1) * 0.35})`;
        g.fillRect(pomak, 0, TW, TH);
      }
    });
    dynamicIsland(g);
    tekstura.needsUpdate = true;
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
    const io = new IntersectionObserver(([e]) => setVidljivo(e.isIntersecting), { rootMargin: "200% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let id = 0;
    const n = slike.length;
    const crtaj = () => {
      id = 0;
      const el = sekcija.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = clamp(-r.top / Math.max(1, r.height - window.innerHeight));
      const u = glatko(clamp(1 - r.top / window.innerHeight));
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
          <Canvas className={`!absolute inset-0 transition-opacity duration-700 ${spreman ? "opacity-100" : "opacity-0"}`} camera={{ position: [0, 0, 8], fov: 30 }} dpr={[1, 2]} gl={{ antialias: true }}>
            <Suspense fallback={null}>
              <Model stanje={stanje} slike={slike} onSpreman={naSpreman} />
              {/* svjetlo bez preuzimanja HDR-a: nekoliko svjetlećih ploha */}
              {/* mekano studijsko svjetlo: velika bijela ploha odozgo i dvije
                  slabe bočne, bez obojenih odsjaja */}
              <Environment resolution={256}>
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
