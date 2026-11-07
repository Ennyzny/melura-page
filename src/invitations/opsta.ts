import type { Pozivnica, Snimak } from "./tipovi";

// Zajedničko svim opštim pozivnicama (`frizer`, `beauty`, `masaza`): bez logotipa i ličnog
// pasusa, ime salona kao „vaš salon". Po vertikali se razlikuju boje (boje demo salona sa
// snimaka, da hero ima smisla za tenanta koji se na njemu vidi), tekstovi, usluge, rječnik i snimci. Velike salone hvatamo ličnim pozivnicama (skill `/platform-pitch`).

const DATUM = "2026-11-07";

type Sadrzaj = Omit<Pozivnica, "datum" | "opsta" | "salon"> & {
  /** Kako se vertikala obraća „svom" salonu: „vaš salon", „vaš studio". */
  salon: { ime: string; genitiv: string; dativ: string; boje: { primarna: string; tamna: string } };
};

export const opsta = ({ salon, ...ostalo }: Sadrzaj): Pozivnica => ({
  datum: DATUM,
  opsta: true,
  salon,
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
