"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import {
  Macbook, MacbookLighting, MacbookStage, journeyState, resolvePoses, resolveTimeline, smoothDamp, useCapabilityGate,
} from "rigged-macbook-3d";
import type { Korak } from "@/components/ScrollScene";
import { pratiElement } from "@/lib/mjera";
import { zagrijScenu } from "@/lib/zagrij";

/*
 * Melura na pravom 3D MacBooku (rigged-macbook-3d, MIT; model "MacBook Pro M3
 * 16-inch 2024" od jackbaeten, CC-BY 4.0 — autor naveden u README-u). Laptop je
 * otvoren od početka, blago se približi i stane desno od teksta; dok se skrola,
 * na ekranu se smjenjuju pravi screenshoti Melure.
 *
 * Ne koristi <MacbookScroll>: on ekran prima kao URL, pa svaka smjena ekrana
 * ponovo pravi model i izgubi pozu. Ovdje je ekran jedna CanvasTexture na koju
 * crtamo screenshote, a poza dolazi iz istog journeyState koji paket koristi.
 */

type Props = { slike: string[]; koraci: Korak[] };

// Poklopac je stalno otvoren (lidOpen se ne koristi). Laptop uđe sa desne
// strane dok sekcija ulazi u prozor, blago se približi i polako se okreće dok
// se ekrani smjenjuju; na kraju se malo povuče.
const TIMELINE = resolveTimeline({ deviceIn: [0, 0.01], lidOpen: [0, 0.01], dive: [0, 0.2], recede: [0.9, 0.98] });
// Smjena ekrana i tekstova u 0,2–0,88.
const EKRANI = [0.2, 0.88];
const POZE_SIROKO = resolvePoses({ intro: { x: 0.5, scale: 0.64 }, dive: { x: 0.4, scale: 0.74, y: 0.08 }, outro: { scale: 0.7, y: 0.08 } });
// uski ekran: laptop u gornjoj polovini, tekst ispod njega
const POZE_USKO = resolvePoses({ intro: { scale: 0.62, y: 0.5 }, dive: { scale: 0.7, y: 0.5 }, outro: { scale: 0.66, y: 0.5 } });
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const glatko = (t: number) => t * t * (3 - 2 * t);

const clamp = (v: number) => Math.min(1, Math.max(0, v));

// Tekstura pokriva cijeli ekran (provjereno probnom mrežom). Ekran je ~1,55:1,
// pa traka od 3,5 % gore ostavi tačno 16:10 za screenshot Melure (1440x900).
const TW = 1600;
const TH = 1033;
const TRAKA = Math.round(TH * 0.035);

type Stanje = { p: number; ulaz: number; korak: number; siroko: boolean; prostor: number };

// Kadar po tekstu: zum i pomak laptopa (svjetske jedinice). Uvod i „Danas"
// cijeli laptop; „Sedmica" kamera priđe ekranu; „Svaki klijent" priđe listi
// klijenata (lijevi dio ekrana dolazi u sredinu).
// Isti koraci za uski ekran: laptop je tu mali, pa je zum jači i ide na sredinu
// dijela o kojem tekst govori (kalendar, profil klijenta), da se čita.
const KADROVI_USKO = [
  { zum: 1, dx: 0, dy: 0 },
  { zum: 1, dx: 0, dy: 0 },
  { zum: 2.1, dx: -0.22, dy: -0.18 },
  { zum: 2.9, dx: -0.62, dy: -0.28 },
];
const KADROVI = [
  { zum: 1, dx: 0, dy: 0 },
  { zum: 0.9, dx: 0, dy: 0.02 },
  { zum: 1.75, dx: 0.88, dy: -0.56 },
  { zum: 3.1, dx: -1.15, dy: -0.95 },
];

// three.js teksture se mijenjaju na mjestu, van React stanja
function osvjezi(t: THREE.Texture) {
  t.needsUpdate = true;
}

function Rig({ stanje, slike, onSpreman }: { stanje: React.RefObject<Stanje>; slike: string[]; onSpreman: () => void }) {
  // Kad je model učitan, par kadrova van ekrana kompajlira shadere, napravi
  // okolinu i pošalje teksture GPU-u — prije nego korisnik dođe do sekcije.
  const advance = useThree((st) => st.advance);
  const grije = useRef(0);
  // Pauziranje van ekrana radimo sami, direktno na platnu: paketovo pauziranje
  // (pauseWhenOffscreen) mijenja React stanje, pa se pri ulasku u sekciju
  // ponovo iscrta i svjetlo (Environment) — mapa okoline se pravi iznova, svi
  // materijali se rekompajliraju i kadar trzne ~200 ms.
  const setFrameloop = useThree((st) => st.setFrameloop);
  const platno = useThree((st) => st.gl.domElement);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setFrameloop(e.isIntersecting ? "always" : "never"), { rootMargin: "200px 0px" });
    io.observe(platno);
    return () => io.disconnect();
  }, [setFrameloop, platno]);
  const { gl, scene: scene3, camera } = useThree();
  const zagrij = useCallback(() => {
    onSpreman();
    // Okolina (Environment) se napravi u prvom kadru i tada materijali dobiju
    // novi shader; zato zagrijavanje ide u tri talasa, da se i ti shaderi
    // kompajliraju prije nego sekcija naiđe.
    const talas = () => {
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
  const [ekran] = useState(() => {
    const c = document.createElement("canvas");
    c.width = TW;
    c.height = TH;
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return { c, t };
  });
  const [slikeEl] = useState(() =>
    slike.map((src) => {
      const i = new Image();
      i.src = src;
      return i;
    }),
  );
  const zadnje = useRef(-1);
  // Svaki screenshot jednom složen u platno veličine ekrana (traka gore za
  // notch + slika ispod). Slaganje (skaliranje 2880 → 1600) je skupo, pa ide
  // kad browser odahne čim slika stigne — ne u prvom kadru kad sekcija naiđe.
  const gotovi = useRef<(HTMLCanvasElement | null)[]>(slike.map(() => null));
  const gotoviEkrani = () => gotovi.current;
  const invalidate = useThree((st) => st.invalidate);
  useEffect(() => {
    const slozi = (img: HTMLImageElement, k: number) => {
      if (gotovi.current[k] || !img.naturalWidth) return;
      const c = document.createElement("canvas");
      c.width = TW;
      c.height = TH;
      const g = c.getContext("2d")!;
      g.drawImage(img, 0, TRAKA, TW, TH - TRAKA);
      // traka iznad (gdje je notch) produžava gornji red aplikacije, pa tamni
      // bočni meni ide do vrha ekrana, a ostatak je bijel
      g.drawImage(img, 0, 0, img.naturalWidth, 2, 0, 0, TW, TRAKA);
      gotovi.current[k] = c;
      invalidate();
    };
    const idle = (cb: () => void) =>
      "requestIdleCallback" in window ? window.requestIdleCallback(cb, { timeout: 2000 }) : setTimeout(cb, 200);
    slikeEl.forEach((img, k) => {
      const kad = () => idle(() => slozi(img, k));
      if (img.complete && img.naturalWidth) kad();
      else img.addEventListener("load", kad, { once: true });
    });
  }, [slikeEl, invalidate]);

  useFrame(() => {
    const s = stanje.current;
    const g = grupa.current;
    if (!s || !g) return;
    const j = journeyState(s.p, TIMELINE, s.siroko ? POZE_SIROKO : POZE_USKO);
    // ulaz sa strane: iz desna, okrenut prema sredini
    // pri zagrijavanju uređaj u kadru (sekcija je tada nevidljiva)
    const u = grije.current > 0 ? 1 : glatko(s.ulaz);
    // jedan spor, ravnomjeran okret kroz cijelu sekciju (kao kamera koja
    // polako kruži), bez ljuljanja
    const okret = lerp(0.14, -0.1, s.p);
    const kk = Math.min(Math.max(s.korak, 0), KADROVI.length - 1);
    const ka = Math.floor(kk);
    const kb = Math.min(ka + 1, KADROVI.length - 1);
    const kf = glatko(kk - ka);
    // pun zum samo kad ima prostora pored teksta (16:10 i šire); na 4:3 i
    // telefonu blaži, da tekst ne ide preko ekrana
    const K = s.siroko ? KADROVI : KADROVI_USKO;
    const jacina = s.siroko ? s.prostor ** 1.5 : 1;
    const zum = 1 + (lerp(K[ka].zum, K[kb].zum, kf) - 1) * jacina;
    // na uskom ekranu nema mjesta za tekst sa strane, pa nema ni bočnog pomaka
    // bez punog zuma laptop ostaje malo desno, da tekst lijevo ima mjesta
    const dx = lerp(K[ka].dx, K[kb].dx, kf) * jacina + (s.siroko ? (1 - jacina) * 0.5 : 0);
    const dy = lerp(K[ka].dy, K[kb].dy, kf) * jacina;
    // kamera paketa je za 16:10; na uskom (uspravnom) ekranu vidljiva širina je
    // manja, pa se laptop smanjuje srazmjerno omjeru
    const omjer = s.siroko ? 1 : Math.min(1, (window.innerWidth / window.innerHeight) * 1.02);
    g.scale.setScalar(j.pose.scale * zum * omjer);
    g.rotation.set(j.pose.pitch, j.pose.yaw + lerp(-0.5, 0, u) + okret * (2 - zum) * 0.7, 0);
    g.position.set(j.pose.x + lerp(2.4, 0, u) + dx, j.pose.y + dy, 0);

    // pretapanje između susjednih ekrana
    const n = slike.length;
    const x = clamp((s.p - EKRANI[0]) / (EKRANI[1] - EKRANI[0])) * (n - 1);
    // Kanvas se crta samo dok traje pretapanje (i kad stigne nova slika), a ne
    // u svakom kadru skrola; slike su unaprijed složene u punu veličinu ekrana,
    // pa je pretapanje samo kopiranje bez skaliranja.
    const a = Math.floor(x);
    const prelaz = clamp((x - a - 0.4) / 0.2);
    const gotove = gotoviEkrani();
    const kljuc = a * 1000 + Math.round(prelaz * 120) + gotove.filter(Boolean).length * 100000;
    if (kljuc === zadnje.current) return;
    zadnje.current = kljuc;
    const ctx = ekran.c.getContext("2d")!;
    ctx.fillStyle = "#f6f6f7";
    ctx.fillRect(0, 0, TW, TH);
    [[a, 1], [a + 1, prelaz]].forEach(([k, alfa]) => {
      const gotov = gotove[k];
      if (!gotov || !alfa) return;
      ctx.globalAlpha = alfa;
      ctx.drawImage(gotov, 0, 0);
    });
    ctx.globalAlpha = 1;
    osvjezi(ekran.t);
  });

  return (
    <group ref={grupa}>
      <Macbook
        screen={ekran.t}
        modelSrc="/models/macbook.glb"
        open={1}
        brightness={1}
        onLoad={zagrij}
      />
    </group>
  );
}

export function MacbookScene({ slike, koraci }: Props) {
  const capable = useCapabilityGate();
  const omotac = useRef<HTMLDivElement>(null);
  const pozornica = useRef<HTMLDivElement>(null);
  const tekstovi = useRef<(HTMLDivElement | null)[]>([]);
  const [spreman, setSpreman] = useState(false);
  const naSpreman = useCallback(() => setSpreman(true), []);
  const stanje = useRef<Stanje>({ p: 0, ulaz: 0, korak: 0, siroko: true, prostor: 1 });

  useEffect(() => {
    if (!capable) return;
    let raf = 0;
    let last = performance.now();
    const brzina = { current: 0 };
    const mjera = omotac.current ? pratiElement(omotac.current) : null;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!mjera) return;
      const r = mjera.citaj();
      // daleko od sekcije petlja samo čeka (bez upisa u DOM)
      if (r.bottom < -r.vh || r.top > r.vh * 2) return;
      const cilj = clamp(-r.top / Math.max(1, r.visina - r.vh));
      const s = stanje.current;
      s.siroko = r.vw >= 900;
      s.prostor = clamp((r.vw / r.vh - 1.2) / 0.4);
      // ista prigušena vožnja kao u paketu: točkić miša postaje glatki pokret
      s.p = Math.abs(s.p - cilj) < 1e-4 ? cilj : smoothDamp(s.p, cilj, brzina, 0.35, dt, 1.2);

      // ulaz: dok vrh sekcije ide od dna prozora do vrha
      s.ulaz = clamp(1 - r.top / r.vh);
      if (pozornica.current) pozornica.current.style.opacity = String(clamp(s.ulaz * 2) * (1 - clamp((s.p - 0.94) / 0.06)));
      const n = koraci.length;
      const x = s.p < EKRANI[0] ? (s.p / EKRANI[0]) * 0.5 : 0.5 + ((s.p - EKRANI[0]) / (EKRANI[1] - EKRANI[0])) * (n - 1.5);
      // kadar kamere stoji dok je tekst pun, pa pređe na sljedeći između tekstova
      const j0 = Math.floor(Math.max(0, x));
      s.korak = j0 + glatko(clamp((Math.max(0, x) - j0 - 0.25) / 0.5));
      const nestaje = 1 - clamp((s.p - TIMELINE.recede[0]) / 0.04);
      koraci.forEach((_, k) => {
        const d = tekstovi.current[k];
        if (!d) return;
        const od = k === 0 ? -1 : k - 0.5;
        const doo = k === n - 1 ? Infinity : k + 0.5;
        const v = Math.min(clamp((x - od) / 0.2), clamp((doo - x) / 0.2)) * nestaje * (k === 0 ? clamp(s.ulaz * 2 - 0.8) : 1);
        d.style.opacity = String(v);
        d.style.transform = `translateY(${(1 - v) * 16}px)`;
      });
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      mjera?.prestani();
    };
  }, [capable, koraci]);

  if (capable === false) {
    return (
      <section className="bg-night px-6 py-20 text-white">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 md:grid-cols-2">
          <div className="space-y-8">{koraci.map((k) => <Tekst key={k.naslov} korak={k} />)}</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slike[0]} alt="" className="w-full rounded-xl ring-8 ring-black" />
        </div>
      </section>
    );
  }

  return (
    <section ref={omotac} className="relative bg-night" style={{ height: "550svh" }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <div ref={pozornica} className="absolute inset-0 opacity-0">
          {/* Dok model ne stigne (spora mreža), na mjestu laptopa stoji obični
              screenshot u okviru; 3D se pretopi preko njega. */}
          <div
            aria-hidden
            className={`pointer-events-none absolute left-1/2 top-[30%] w-[88vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border-[7px] border-[#111214] bg-black shadow-2xl transition-opacity duration-700 min-[900px]:left-auto min-[900px]:right-[5vw] min-[900px]:top-1/2 min-[900px]:w-[54vw] min-[900px]:translate-x-0 min-[900px]:rounded-2xl min-[900px]:border-[12px] ${
              spreman ? "opacity-0" : "opacity-100"
            }`}
          >
            {/* mala verzija prvog ekrana stiže odmah i na sporoj mreži */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/scroll/laptop/ekran-0-0-mala.webp" alt="" className="block w-full" />
          </div>
          {capable && (
            <MacbookStage dpr={[1, 1.5]} pauseWhenOffscreen={false} className={`transition-opacity duration-700 ${spreman ? "opacity-100" : "opacity-0"}`}>
              {/* neutralno bijelo svjetlo (preseti paketa su plavkasti) */}
              <MacbookLighting>
                <ambientLight intensity={0.45} />
                <directionalLight position={[3, 8, 5]} intensity={0.7} />
                {/* jedna velika, meka ploha odozgo — bez bočnih odsjaja */}
                <Environment resolution={256} frames={1}>
                  <Lightformer form="rect" intensity={0.5} position={[0, 3, 9]} rotation={[-0.3, 0, 0]} scale={[8, 4, 1]} />
                  <Lightformer form="rect" intensity={0.25} position={[0, 9, -2]} rotation={[Math.PI / 2, 0, 0]} scale={[10, 3, 1]} />
                </Environment>
              </MacbookLighting>
              <Rig stanje={stanje} slike={slike} onSpreman={naSpreman} />
            </MacbookStage>
          )}
        </div>
        {/* uski ekran: tamni prelaz ispod teksta, da se čita preko zumiranog laptopa */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34svh] bg-gradient-to-t from-night via-night/90 to-transparent min-[900px]:hidden" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 grid px-6 pb-[7svh] text-white min-[900px]:inset-y-0 min-[900px]:left-[5vw] min-[900px]:right-auto min-[900px]:w-[28vw] min-[900px]:items-center min-[900px]:px-0 min-[900px]:pb-0">
          {koraci.map((k, j) => (
            <div key={k.naslov} ref={(d) => { tekstovi.current[j] = d; }} className={`col-start-1 row-start-1 opacity-0 ${
                // zadnji kadar je zum na profil klijenta, pa je ispod teksta bijeli ekran
                j === koraci.length - 1 ? "-mx-7 rounded-3xl bg-night/85 px-7 py-6 shadow-2xl backdrop-blur-md" : ""
              }`}>
              <Tekst korak={k} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tekst({ korak }: { korak: Korak }) {
  return (
    <div>
      {korak.kicker && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-coral">{korak.kicker}</p>}
      <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl min-[900px]:text-5xl">{korak.naslov}</h2>
      {korak.tekst && <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">{korak.tekst}</p>}
    </div>
  );
}

// Model MacBooka se skida čim se učita kod stranice, ne tek kad sekcija naiđe
// (isti ključ keša kao useGLTF(url) u paketu).
useGLTF.preload("/models/macbook.glb");
