"use client";
import { useEffect, useRef, useState } from "react";
import { pratiElement } from "@/lib/mjera";

/*
 * Scena sa tri telefona: na početku se vidi samo srednji, a lijevi i desni na
 * skrol izađu iza njega. Svaki telefon je jedan sloj koji se samo pomjera
 * (transform), pa skrol ne traži ni preračun rasporeda ni ponovno crtanje.
 */

type Slika = { src: string; w: number; h: number };
export type SceneData = {
  /** src: scena, blur: zamućena i potamnjena, uredjaj: samo uređaj (alfa, meki rub) */
  bg: { src: string; blur: string; uredjaj: string; w: number; h: number };
  uredjaj: "telefon" | "laptop";
  ekrani: { uglovi: number[][]; slike: Slika[] }[];
};
export type Korak = { kicker?: string; naslov: string; tekst?: string };

type Props = {
  scena: SceneData;
  /** tekst po koraku; koraci se smjenjuju dok bočni telefoni izlaze */
  koraci: Korak[];
  /** dužina sekcije u visinama ekrana */
  duzina?: number;
};

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// U slici uređaja telefoni su razmaknuti, pa je svaki isječak ove veličine oko
// sredine svog ekrana (px slike).
const ISJECAK = { w: 800, h: 1572 };
const SREDNJI = 1;
// Dok je iza srednjeg, bočni telefon je manji od njega, da mu ivice ne proviruju.
const SAKRIVEN = 0.8;
// Kraj izlaska. Mjere su u odnosu na srednji telefon na početku: `sredina` i
// `strana` su razmjere, `pomak` je udaljenost od sredine u širinama telefona,
// `spust` je pomak naniže u visinama telefona.
const KRAJ = {
  // na uskom ekranu bočni ostaju djelimično iza srednjeg, da sva tri stanu cijela
  usko: { sredina: 0.82, strana: 0.67, pomak: 0.51, spust: 0.03 },
  siroko: { sredina: 0.88, strana: 0.83, pomak: 0.93, spust: 0.02 },
};

const pocetak = (i: number) => `translate3d(-50%,-50%,0) scale(${i === SREDNJI ? 1 : SAKRIVEN})`;

export function ScrollScene({ scena, koraci, duzina = 4 }: Props) {
  const sekcija = useRef<HTMLElement>(null);
  const pozornica = useRef<HTMLDivElement>(null);
  const telefoni = useRef<(HTMLDivElement | null)[]>([]);
  const tekstovi = useRef<(HTMLDivElement | null)[]>([]);
  const [smanjeno, setSmanjeno] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setSmanjeno(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    const el = sekcija.current;
    if (smanjeno || !el) return;
    const mjera = pratiElement(el);
    let okvirId = 0;
    let prozirnost = "";
    const opacity = koraci.map(() => "");
    const transform = koraci.map(() => "");

    const crtaj = () => {
      okvirId = 0;
      const r = mjera.citaj();
      // daleko od sekcije nema šta da se crta
      if (r.bottom < -r.vh || r.top > r.vh * 2) return;
      const p = clamp(-r.top / Math.max(1, r.visina - r.vh));
      // pretapanje na ulazu, da se scena nadoveže na prethodnu bez reza
      const pr = String(clamp((1 - r.top / r.vh) * 1.6));
      if (pozornica.current && pr !== prozirnost) {
        pozornica.current.style.opacity = pr;
        prozirnost = pr;
      }

      // Bočni telefoni izlaze dok skrol ide preko 8–70 % sekcije; ostatak drži
      // završni kadar, da se tekst stigne pročitati.
      const t = ease(clamp((p - 0.08) / 0.62));
      const k = r.vw >= 900 ? KRAJ.siroko : KRAJ.usko;
      telefoni.current.forEach((d, i) => {
        if (!d) return;
        const strana = i - SREDNJI;
        const razmjera = strana === 0 ? lerp(1, k.sredina, t) : lerp(SAKRIVEN, k.strana, t);
        const x = -50 + strana * k.pomak * 100 * t;
        const y = -50 + (strana === 0 ? 0 : k.spust * 100 * t);
        d.style.transform = `translate3d(${x}%,${y}%,0) scale(${razmjera})`;
      });

      // Tekst koraka j je pun oko x = j i potpuno nestane prije nego se pojavi
      // sljedeći — nikad dva teksta odjednom. Prvi i zadnji ostaju do ruba.
      const nk = koraci.length;
      const x = clamp(p / 0.85) * (nk - 1);
      koraci.forEach((_, j) => {
        const d = tekstovi.current[j];
        if (!d) return;
        const od = j === 0 ? -0.35 : j - 0.5;
        const doo = j === nk - 1 ? Infinity : j + 0.5;
        const v = Math.min(clamp((x - od) / 0.2), clamp((doo - x) / 0.2));
        const o = String(v);
        if (o !== opacity[j]) {
          d.style.opacity = o;
          opacity[j] = o;
        }
        if (v > 0) {
          const tr = `translateY(${(1 - v) * 16}px)`;
          if (tr !== transform[j]) {
            d.style.transform = tr;
            transform[j] = tr;
          }
        }
      });
    };

    const zakazi = () => {
      if (!okvirId) okvirId = requestAnimationFrame(crtaj);
    };
    crtaj();
    window.addEventListener("scroll", zakazi, { passive: true });
    window.addEventListener("resize", zakazi);
    return () => {
      cancelAnimationFrame(okvirId);
      window.removeEventListener("scroll", zakazi);
      window.removeEventListener("resize", zakazi);
      mjera.prestani();
    };
  }, [smanjeno, koraci]);

  if (smanjeno) {
    return (
      <section className="bg-night px-6 py-20 text-white">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 md:grid-cols-2">
          <div className="space-y-8">
            {koraci.map((k) => (
              <TekstKoraka key={k.naslov} korak={k} />
            ))}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={scena.bg.src} alt="" className="w-full rounded-2xl" />
        </div>
      </section>
    );
  }

  return (
    <section ref={sekcija} className="relative bg-night" style={{ height: `${duzina * 100}svh` }}>
      <div ref={pozornica} className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_45%,rgba(238,108,77,0.16),transparent_70%)]" />

        {scena.ekrani.map((e, i) => {
          const xs = e.uglovi.map((a) => a[0]);
          const ys = e.uglovi.map((a) => a[1]);
          const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
          const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
          // ekran 0,6 % veći da ne ostane šav uz okvir
          const ew = (Math.max(...xs) - Math.min(...xs)) * 1.006;
          const eh = (Math.max(...ys) - Math.min(...ys)) * 1.006;
          const lijevo = cx - ISJECAK.w / 2;
          const gore = cy - ISJECAK.h / 2;
          const ekran = e.slike[0];
          return (
            <div
              key={ekran.src}
              ref={(d) => { telefoni.current[i] = d; }}
              className={`absolute left-1/2 top-[38%] aspect-[800/1572] w-[min(27svh,58vw)] will-change-transform min-[900px]:top-[44%] min-[900px]:w-[min(32svh,25vw)] ${i === SREDNJI ? "z-[2]" : "z-[1]"}`}
              style={{ transform: pocetak(i) }}
            >
              {/* sjena je dio sloja: bočni telefon izlazi iza srednjeg, ne kroz njega */}
              <div className="absolute inset-x-[2%] inset-y-[1%] rounded-[14%/7%] shadow-[0_24px_60px_rgba(0,0,0,0.6)]" />
              <div className="absolute inset-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={scena.bg.uredjaj}
                  alt=""
                  draggable={false}
                  className="absolute max-w-none"
                  style={{
                    left: `${(-lijevo / ISJECAK.w) * 100}%`,
                    top: `${(-gore / ISJECAK.h) * 100}%`,
                    width: `${(scena.bg.w / ISJECAK.w) * 100}%`,
                    height: `${(scena.bg.h / ISJECAK.h) * 100}%`,
                  }}
                />
              </div>
              <div
                className="absolute overflow-hidden bg-black"
                style={{
                  left: `${((cx - ew / 2 - lijevo) / ISJECAK.w) * 100}%`,
                  top: `${((cy - eh / 2 - gore) / ISJECAK.h) * 100}%`,
                  width: `${(ew / ISJECAK.w) * 100}%`,
                  height: `${(eh / ISJECAK.h) * 100}%`,
                  borderRadius: `13.5% / ${(13.5 * ew) / eh}%`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ekran.src} alt="" width={ekran.w} height={ekran.h} className="absolute inset-0 h-full w-full max-w-none" draggable={false} />
                <div className="absolute left-1/2 top-[1.26%] h-[4.2%] w-[31.3%] -translate-x-1/2 rounded-full bg-black" />
              </div>
            </div>
          );
        })}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[34svh] bg-gradient-to-t from-night via-night/85 to-transparent min-[900px]:h-[24svh]" />
        <div className="pointer-events-none absolute inset-0 z-[4] mx-auto grid max-w-[1200px] px-6 min-[900px]:px-10">
          {koraci.map((k, j) => (
            <div
              key={k.naslov}
              ref={(d) => { tekstovi.current[j] = d; }}
              className="col-start-1 row-start-1 self-end pb-[7svh] text-white opacity-0 will-change-[transform,opacity] min-[900px]:mx-auto min-[900px]:max-w-2xl min-[900px]:pb-[6svh] min-[900px]:text-center"
            >
              <TekstKoraka korak={k} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TekstKoraka({ korak }: { korak: Korak }) {
  return (
    <div>
      {korak.kicker && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-coral">{korak.kicker}</p>}
      <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl min-[900px]:text-5xl">{korak.naslov}</h2>
      {korak.tekst && <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">{korak.tekst}</p>}
    </div>
  );
}
