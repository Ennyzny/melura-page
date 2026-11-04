"use client";
import { useEffect, useRef, useState } from "react";

/*
 * Scroll scena: "kamera" uleti u ekran uređaja (ili se povuče iz njega) dok se
 * skrola. Nema videa ni sekvence kadrova — pozadinska fotografija i pravi
 * screenshoti se izvijaju CSS matrix3d homografijom, pa je tekst na ekranu
 * oštar u svakoj rezoluciji. Uglovi ekrana su izmjereni iz zelenog ekrana
 * scene (public/scroll/<scena>/scene.json).
 */

type Tacka = [number, number];
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
  /** indeks ekrana prema kojem kamera ide */
  fokus?: number;
  /** true: kreće se iz ekrana i kamera se povlači */
  obrnuto?: boolean;
  /** tekst po koraku; korak 0 prati let kamere, ostali smjenu ekrana */
  koraci: Korak[];
  /** dužina sekcije u visinama ekrana */
  duzina?: number;
  /** "strana": uređaj desno, tekst lijevo (desktop); "sredina": uređaj u sredini, tekst dole */
  raspored?: "strana" | "sredina";
  /** samo uređaji (izrezani) na tamnoj podlozi, bez fotografije scene */
  samoUredjaj?: boolean;
};

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Homografija koja mapira 4 tačke `od` na 4 tačke `na` (h22 = 1).
function homografija(od: Tacka[], na: Tacka[]): number[] {
  const A: number[][] = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = od[i];
    const [u, v] = na[i];
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y, u]);
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y, v]);
  }
  for (let c = 0; c < 8; c++) {
    let p = c;
    for (let r = c + 1; r < 8; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    [A[c], A[p]] = [A[p], A[c]];
    for (let r = 0; r < 8; r++) {
      if (r === c) continue;
      const f = A[r][c] / A[c][c];
      for (let k = c; k < 9; k++) A[r][k] -= f * A[c][k];
    }
  }
  const h = A.map((row, i) => row[8] / row[i]);
  return [...h, 1];
}

function primijeni(h: number[], [x, y]: Tacka): Tacka {
  const w = h[6] * x + h[7] * y + h[8];
  return [(h[0] * x + h[1] * y + h[2]) / w, (h[3] * x + h[4] * y + h[5]) / w];
}

const matrix3d = (h: number[]) =>
  `matrix3d(${h[0]},${h[3]},0,${h[6]},${h[1]},${h[4]},0,${h[7]},0,0,1,0,${h[2]},${h[5]},0,${h[8]})`;

const pravougaonik = (w: number, h: number): Tacka[] => [[0, 0], [w, 0], [w, h], [0, h]];

function okvir(q: Tacka[], k: number): Tacka[] {
  const cx = q.reduce((s, p) => s + p[0], 0) / 4;
  const cy = q.reduce((s, p) => s + p[1], 0) / 4;
  return q.map(([x, y]) => [cx + (x - cx) * k, cy + (y - cy) * k]);
}

export function ScrollScene({
  scena, fokus = 0, obrnuto = false, koraci, duzina = 4, raspored = "strana", samoUredjaj = false,
}: Props) {
  const sekcija = useRef<HTMLElement>(null);
  const pozornica = useRef<HTMLDivElement>(null);
  const podloga = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const mutno = useRef<HTMLDivElement>(null);
  const uredjaj = useRef<HTMLDivElement>(null);
  const ekrani = useRef<(HTMLDivElement | null)[]>([]);
  const slike = useRef<(HTMLImageElement | null)[][]>([]);
  const tekstovi = useRef<(HTMLDivElement | null)[]>([]);
  const [smanjeno, setSmanjeno] = useState(false);

  const telefon = scena.uredjaj === "telefon";
  const q = scena.ekrani.map((e) => e.uglovi as Tacka[]);
  const W = scena.bg.w;
  const H = scena.bg.h;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setSmanjeno(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    if (smanjeno) return;
    let okvirId = 0;

    const crtaj = () => {
      okvirId = 0;
      const el = sekcija.current;
      const st = pozornica.current;
      if (!el || !st) return;
      const vw = st.clientWidth;
      // Uređaj se slaže ispod sticky navigacije, ne ispod nje.
      const vrh = document.querySelector("header")?.offsetHeight ?? 0;
      const vh = st.clientHeight - vrh;
      const siroko = vw >= 900;
      const strana = siroko && raspored === "strana";
      const r = el.getBoundingClientRect();
      const p = clamp(-r.top / Math.max(1, r.height - st.clientHeight));
      // pretapanje na ulazu, da se scena nadoveže na prethodnu bez reza
      st.style.opacity = String(clamp((1 - r.top / st.clientHeight) * 1.6));

      // Prvih 45 % skrola je let kamere, ostatak smjena ekrana.
      const LET = scena.ekrani[fokus].slike.length > 1 ? 0.45 : 0.85;
      const tLet = ease(clamp(p / LET));
      const t = obrnuto ? 1 - tLet : tLet;
      // Jedna pozicija za tekst i ekrane: korak 0 = let kamere, korak j = ekran j-1.
      const nk = koraci.length;
      const x = p < LET ? lerp(-1, 0.5, p / LET) : lerp(0.5, nk - 1, (p - LET) / (1 - LET));

      // Početak: cijela scena (ili svi uređaji) u kadru.
      const sve = obrnuto ? q.flat() : q[fokus];
      const xs = sve.map((a) => a[0]);
      const ys = sve.map((a) => a[1]);
      const bw = Math.max(...xs) - Math.min(...xs);
      const bh = Math.max(...ys) - Math.min(...ys);
      const pokrij = Math.max(vw / W, st.clientHeight / H);
      // "sredina" ostavlja donju trećinu tekstu
      const s0 = Math.min(pokrij, (vw * (siroko ? 0.9 : 0.94)) / bw, (vh * (strana ? 0.8 : siroko ? 0.64 : 0.6)) / bh);
      const cx = (Math.max(...xs) + Math.min(...xs)) / 2;
      const cy = (Math.max(...ys) + Math.min(...ys)) / 2;
      let tx = vw * 0.5 - cx * s0;
      let ty = vrh + vh * (strana ? 0.5 : siroko ? 0.4 : 0.38) - cy * s0;
      if (W * s0 >= vw) tx = clamp(tx, vw - W * s0, 0);
      if (H * s0 >= st.clientHeight) ty = clamp(ty, st.clientHeight - H * s0, 0);
      const pocetak = q[fokus].map(([x, y]) => [x * s0 + tx, y * s0 + ty] as Tacka);

      // Kraj: ekran uspravno, preko većeg dijela kadra, desno od teksta na desktopu.
      const sl = scena.ekrani[fokus].slike[0];
      const omjer = sl.w / sl.h;
      let ew: number, eh: number, ecx: number, ecy: number;
      if (telefon) {
        eh = vh * (strana ? 0.84 : siroko ? 0.56 : 0.42);
        ew = eh * omjer;
        ecx = strana ? vw * 0.66 : vw / 2;
        ecy = strana ? vh / 2 : siroko ? vh * 0.42 : vh * 0.36;
      } else {
        // lijevih ~38 % širine pripada tekstu; ekran malo iznad sredine, da se
        // ispod vidi tastatura
        ew = Math.min(vw * (strana ? 0.48 : 0.9), vh * (strana ? 0.6 : 0.42) * omjer);
        eh = ew / omjer;
        ecx = strana ? vw * 0.68 : vw / 2;
        ecy = strana ? vh * 0.4 : vh * 0.28;
      }
      ecy += vrh;
      const kraj: Tacka[] = [
        [ecx - ew / 2, ecy - eh / 2], [ecx + ew / 2, ecy - eh / 2],
        [ecx + ew / 2, ecy + eh / 2], [ecx - ew / 2, ecy + eh / 2],
      ];

      const sada = pocetak.map((a, i) => [lerp(a[0], kraj[i][0], t), lerp(a[1], kraj[i][1], t)] as Tacka);
      const h = homografija(q[fokus], sada);
      const m = matrix3d(h);
      // Scena se pretapa u zamućenu verziju; uređaj (izrezan po obliku) ostaje oštar.
      if (bg.current) {
        bg.current.style.transform = m;
        bg.current.style.opacity = String(1 - t);
      }
      if (mutno.current) {
        mutno.current.style.transform = m;
        mutno.current.style.opacity = String(t);
      }
      if (uredjaj.current) uredjaj.current.style.transform = m;
      // Podloga pokriva rubove kojih na fotografiji nema kad se kamera približi.
      if (podloga.current) podloga.current.style.opacity = String(clamp(t * 1.6));

      scena.ekrani.forEach((e, i) => {
        const div = ekrani.current[i];
        if (!div) return;
        const s = e.slike[0];
        // ekran 0,6 % veći da ne ostane šav uz okvir
        const cilj = okvir(e.uglovi.map((a) => primijeni(h, a as Tacka)), 1.006);
        div.style.transform = matrix3d(homografija(pravougaonik(s.w, s.h), cilj));
        const n = e.slike.length;
        const sad = clamp(x - 1, 0, n - 1);
        slike.current[i]?.forEach((img, j) => {
          if (!img) return;
          // svaki sljedeći ekran se pretopi preko prethodnog oko polovine koraka
          img.style.opacity = String(j === 0 ? 1 : clamp((sad - (j - 1) - 0.35) / 0.3));
        });
      });

      // Tekst koraka j je pun oko x = j i potpuno nestane prije nego se pojavi
      // sljedeći — nikad dva teksta odjednom. Prvi i zadnji ostaju do ruba.
      koraci.forEach((_, j) => {
        const d = tekstovi.current[j];
        if (!d) return;
        const od = j === 0 ? -0.35 : j - 0.5;
        const doo = j === nk - 1 ? Infinity : j + 0.5;
        const v = Math.min(clamp((x - od) / 0.2), clamp((doo - x) / 0.2));
        d.style.opacity = String(v);
        d.style.transform = `translateY(${(1 - v) * 16}px)`;
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
    };
  }, [smanjeno, scena, fokus, obrnuto, koraci, telefon, W, H, q, raspored]);

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
        {samoUredjaj ? (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_45%,rgba(238,108,77,0.16),transparent_70%)]" />
        ) : (
          <div ref={podloga} className="absolute inset-0 opacity-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={scena.bg.blur} alt="" className="h-full w-full scale-125 object-cover blur-2xl" draggable={false} />
          </div>
        )}
        {!samoUredjaj && <Sloj ref={bg} src={scena.bg.src} w={W} h={H} />}
        {!samoUredjaj && <Sloj ref={mutno} src={scena.bg.blur} w={W} h={H} skriven />}
        <Sloj ref={uredjaj} src={scena.bg.uredjaj} w={W} h={H} />

        {scena.ekrani.map((e, i) => {
          const s = e.slike[0];
          return (
            <div
              key={i}
              ref={(d) => { ekrani.current[i] = d; }}
              className="absolute left-0 top-0 origin-top-left overflow-hidden bg-black will-change-transform"
              style={{ width: s.w, height: s.h, borderRadius: telefon ? s.w * 0.135 : s.w * 0.008 }}
            >
              {e.slike.map((sl, j) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={sl.src}
                  ref={(img) => { (slike.current[i] ??= [])[j] = img; }}
                  src={sl.src}
                  alt=""
                  width={sl.w}
                  height={sl.h}
                  className="absolute inset-0 h-full w-full max-w-none"
                  style={{ opacity: j === 0 ? 1 : 0 }}
                  draggable={false}
                />
              ))}
              {telefon && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black"
                  style={{ top: s.h * 0.0126, width: s.w * 0.313, height: s.h * 0.042 }}
                />
              )}
            </div>
          );
        })}

        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-[42svh] bg-gradient-to-t from-night via-night/85 to-transparent ${
            raspored === "strana" ? "min-[900px]:hidden" : "min-[900px]:h-[30svh]"
          }`}
        />
        {/* Na desktopu tekst ide u lijevih 5–35 % širine ekrana — isti procenti
            kao položaj uređaja u crtaj(), pa se nikad ne preklapaju. */}
        <div
          className={`pointer-events-none absolute inset-0 mx-auto grid max-w-[1200px] px-6 min-[900px]:px-10 ${
            raspored === "strana" ? "min-[900px]:mx-0 min-[900px]:max-w-none min-[900px]:pl-[5vw] min-[900px]:pr-0" : ""
          }`}
        >
          {koraci.map((k, j) => (
            <div
              key={k.naslov}
              ref={(d) => { tekstovi.current[j] = d; }}
              className={`col-start-1 row-start-1 self-end pb-[7svh] text-white opacity-0 ${
                raspored === "strana"
                  ? "min-[900px]:w-[30vw] min-[900px]:self-center min-[900px]:pb-0"
                  : "min-[900px]:mx-auto min-[900px]:max-w-2xl min-[900px]:pb-[6svh] min-[900px]:text-center"
              }`}
            >
              <TekstKoraka korak={k} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Sloj scene u pikselima bg slike; crtaj() mu daje matrix3d.
function Sloj({ ref, src, w, h, skriven = false }: {
  ref: React.Ref<HTMLDivElement>; src: string; w: number; h: number; skriven?: boolean;
}) {
  return (
    <div
      ref={ref}
      className={`absolute left-0 top-0 origin-top-left will-change-transform ${skriven ? "opacity-0" : ""}`}
      style={{ width: w, height: h }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="block h-full w-full max-w-none" draggable={false} />
    </div>
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
