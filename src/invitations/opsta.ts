import type { Pozivnica, Snimak } from "./tipovi";

// Zajedničko svim opštim pozivnicama (`frizer`, `beauty`, `masaza`): Melurine boje, bez
// logotipa i ličnog pasusa, ime salona kao „vaš salon". Po vertikali se razlikuju tekstovi,
// usluge, rječnik i snimci. Velike salone hvatamo ličnim pozivnicama (skill `/platform-pitch`).

const BOJE = { primarna: "#ee6c4d", tamna: "#1a1b1e" };
const DATUM = "2026-11-07";

type Sadrzaj = Omit<Pozivnica, "datum" | "opsta" | "salon" | "naslov" | "oznaka" | "potpis"> &
  Partial<Pick<Pozivnica, "naslov" | "oznaka" | "potpis">> & {
  /** Kako se vertikala obraća „svom" salonu: „vaš salon", „vaš studio". */
  salon: { ime: string; genitiv: string; dativ: string };
};

export const opsta = ({ salon, ...ostalo }: Sadrzaj): Pozivnica => ({
  datum: DATUM,
  opsta: true,
  salon: { ...salon, boje: BOJE },
  // Isti pozdrav u svim opštim pozivnicama; po vertikali se mijenja uvod.
  oznaka: "Pripremili smo ovo za vas",
  naslov: "Važni su nam saloni poput vašeg.",
  potpis: "Hamza i Eniz",
  ...ostalo,
});

/** Snimak telefona (iPhone 14 Pro Max, 1290×2796). */
export const telefon = (src: string, naslov: string, opis?: string): Snimak => ({
  src,
  sirina: 1290,
  visina: 2796,
  naslov,
  opis,
});

/** Snimak računara (2880×1800). */
export const racunar = (src: string, naslov: string, opis?: string): Snimak => ({
  src,
  sirina: 2880,
  visina: 1800,
  naslov,
  opis,
});
