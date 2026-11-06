"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Copy, Mail, Plus, RotateCcw, Trash2 } from "lucide-react";
import type { Usluga } from "@/invitations";

// Vlasnik uređuje prijedlog cjenovnika, a telefon pored crta isti ekran „Usluge" kao
// aplikacija (kategorije, trajanje, cijena) u bojama salona. Izmjene ostaju samo u
// njegovom browseru; prema nama idu tek kad klikne „Pošalji".

const trajanjeTekst = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  const sati = h === 1 ? "1 sat" : h >= 2 && h <= 4 ? `${h} sata` : `${h} sati`;
  if (h === 0) return `${m} minuta`;
  return m === 0 ? sati : `${sati} i ${m} minuta`;
};

const kljuc = (slug: string) => `pozivnica:${slug}:usluge`;

// Izmjene žive u localStorageu, čitane kroz useSyncExternalStore: server i prvi kadar
// crtaju prijedlog, a sačuvana verzija dolazi bez setState-a u effectu.
const slusaoci = new Set<() => void>();
const pretplati = (f: () => void) => {
  slusaoci.add(f);
  return () => slusaoci.delete(f);
};
const procitaj = (slug: string) => {
  try {
    return localStorage.getItem(kljuc(slug));
  } catch {
    return null;
  }
};

export function Cjenovnik({
  slug,
  salon,
  pocetne,
  boje,
  email,
}: {
  slug: string;
  salon: string;
  pocetne: Usluga[];
  boje: { primarna: string; tamna: string; naPrimarnoj: string };
  email: string;
}) {
  const sacuvano = useSyncExternalStore(pretplati, () => procitaj(slug), () => null);
  const [uMemoriji, setUMemoriji] = useState<Usluga[] | null>(null);
  const [kopirano, setKopirano] = useState(false);

  let usluge = uMemoriji ?? pocetne;
  if (!uMemoriji && sacuvano) {
    try {
      usluge = JSON.parse(sacuvano) as Usluga[];
    } catch {}
  }

  const promijeni = (nove: Usluga[]) => {
    setUMemoriji(nove);
    try {
      localStorage.setItem(kljuc(slug), JSON.stringify(nove));
    } catch {}
    slusaoci.forEach((f) => f());
  };

  const polje = (i: number, k: keyof Usluga, v: string) =>
    promijeni(
      usluge.map((u, j) =>
        j === i ? { ...u, [k]: k === "cijena" || k === "trajanje" ? Math.max(0, Number(v) || 0) : v } : u,
      ),
    );

  const kategorije = [...new Set(usluge.map((u) => u.kategorija.trim() || "Ostalo"))];
  const tekst = usluge
    .map((u) => `${u.kategorija} — ${u.naziv}: ${u.cijena} KM, ${trajanjeTekst(u.trajanje)}`)
    .join("\n");
  const mailto = `mailto:${email}?subject=${encodeURIComponent(`Cjenovnik — ${salon}`)}&body=${encodeURIComponent(
    `Naše usluge za aplikaciju:\n\n${tekst}\n`,
  )}`;

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0">
        <ul className="grid gap-3">
          {usluge.map((u, i) => (
            <li
              key={i}
              className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-2 rounded-2xl border border-line bg-white p-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_90px_100px_auto] sm:items-end"
            >
              <label className="col-span-2 grid min-w-0 gap-1 text-[13px] font-semibold text-muted sm:col-span-1">
                Usluga
                <input
                  value={u.naziv}
                  onChange={(e) => polje(i, "naziv", e.target.value)}
                  className="h-11 w-full min-w-0 rounded-xl border border-line bg-fog px-3 text-base font-semibold text-ink focus:border-ink"
                />
              </label>
              <label className="col-span-2 grid min-w-0 gap-1 text-[13px] font-semibold text-muted sm:col-span-1">
                Kategorija
                <input
                  value={u.kategorija}
                  onChange={(e) => polje(i, "kategorija", e.target.value)}
                  list="kategorije"
                  className="h-11 w-full min-w-0 rounded-xl border border-line bg-fog px-3 text-base text-ink focus:border-ink"
                />
              </label>
              <label className="grid min-w-0 gap-1 text-[13px] font-semibold text-muted">
                KM
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={u.cijena}
                  onChange={(e) => polje(i, "cijena", e.target.value)}
                  className="h-11 w-full min-w-0 rounded-xl border border-line bg-fog px-3 text-base text-ink focus:border-ink"
                />
              </label>
              <label className="grid min-w-0 gap-1 text-[13px] font-semibold text-muted">
                Minuta
                <input
                  type="number"
                  inputMode="numeric"
                  min={5}
                  step={5}
                  value={u.trajanje}
                  onChange={(e) => polje(i, "trajanje", e.target.value)}
                  className="h-11 w-full min-w-0 rounded-xl border border-line bg-fog px-3 text-base text-ink focus:border-ink"
                />
              </label>
              <button
                type="button"
                onClick={() => promijeni(usluge.filter((_, j) => j !== i))}
                aria-label={`Ukloni ${u.naziv || "uslugu"}`}
                className="col-span-2 flex h-11 items-center justify-center gap-2 rounded-xl border border-line text-[15px] font-semibold text-muted transition-colors hover:border-ink/30 hover:text-ink sm:col-span-1 sm:w-11"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                <span className="sm:sr-only">Ukloni</span>
              </button>
            </li>
          ))}
        </ul>
        <datalist id="kategorije">
          {kategorije.map((k) => (
            <option key={k} value={k} />
          ))}
        </datalist>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              promijeni([...usluge, { naziv: "", kategorija: kategorije.at(-1) ?? "Ostalo", cijena: 0, trajanje: 30 }])
            }
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 font-semibold text-white transition-colors hover:bg-ink-soft"
          >
            <Plus className="h-4 w-4" aria-hidden="true" /> Dodaj uslugu
          </button>
          <button
            type="button"
            onClick={() => promijeni(pocetne)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 font-semibold transition-colors hover:border-ink/30"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" /> Vrati prijedlog
          </button>
        </div>

        <div className="mt-8 rounded-3xl bg-fog p-6">
          <p className="text-lg font-bold">Ovako izgleda — pošaljite nam i ubacujemo ga u aplikaciju.</p>
          <p className="mt-1 text-[15px] text-ink-soft">
            Izmjene se čuvaju samo u vašem browseru dok ih ne pošaljete. Kasnije ih mijenjate sami, iz Melure.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={mailto}
              className="inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-[17px] font-semibold transition-opacity hover:opacity-90"
              style={{ background: boje.tamna, color: "#fff" }}
            >
              <Mail className="h-5 w-5" aria-hidden="true" /> Pošalji cjenovnik
            </a>
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(tekst);
                  setKopirano(true);
                  setTimeout(() => setKopirano(false), 2000);
                } catch {}
              }}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line bg-white px-6 text-[17px] font-semibold transition-colors hover:border-ink/30"
            >
              {kopirano ? <Check className="h-5 w-5" aria-hidden="true" /> : <Copy className="h-5 w-5" aria-hidden="true" />}
              {kopirano ? "Kopirano" : "Kopiraj za Viber / WhatsApp"}
            </button>
          </div>
        </div>
      </div>

      {/* Živi pregled: isti raspored kao ekran „Usluge" u aplikaciji salona. */}
      <div className="lg:sticky lg:top-8" aria-label="Pregled u aplikaciji">
        <div className="rounded-[2.6rem] bg-[#1a1b1e] p-[7px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] ring-1 ring-black/30">
          <div
            className="flex h-[640px] flex-col overflow-hidden rounded-[2.2rem] text-white"
            style={{ background: boje.tamna }}
          >
            <div className="relative h-9 shrink-0">
              <span className="absolute left-1/2 top-2 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6">
              <p className="font-serif text-[28px] leading-tight">Usluge</p>
              <p className="mt-0.5 text-[12px] text-white/75">Dodirnite uslugu za direktno zakazivanje.</p>
              {kategorije.map((k) => (
                <div key={k}>
                  <p className="mb-2 mt-5 text-[11px] font-semibold tracking-[0.12em] text-white/80">{k}</p>
                  <ul className="grid gap-2">
                    {usluge
                      .filter((u) => (u.kategorija.trim() || "Ostalo") === k)
                      .map((u, i) => (
                        <li key={i} className="flex items-center gap-3 border border-white/15 p-2.5">
                          <span className="h-11 w-11 shrink-0 bg-gradient-to-br from-white/25 to-white/5" />
                          <span className="min-w-0 flex-1">
                            <span className="block text-[14px] font-semibold leading-snug">
                              {u.naziv || "Nova usluga"}
                            </span>
                            <span className="block text-[11px] text-white/70">{trajanjeTekst(u.trajanje)}</span>
                          </span>
                          <span className="font-serif text-[17px] font-bold">{u.cijena} KM</span>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="shrink-0 p-3">
              <span
                className="block py-2.5 text-center text-[14px] font-semibold"
                style={{ background: boje.primarna, color: boje.naPrimarnoj }}
              >
                Zakaži termin
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
