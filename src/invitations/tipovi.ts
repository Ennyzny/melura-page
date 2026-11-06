// Oblik jedne pozivnice. Nova pozivnica = novi fajl u ovom folderu + red u `index.ts` +
// slike u `public/invitations/<slug>/`. Stranica (`app/invitations/[slug]`) se ne dira.

export type Usluga = {
  naziv: string;
  kategorija: string;
  /** KM */
  cijena: number;
  /** minute */
  trajanje: number;
  /** Sličica u pregledu cjenovnika; nova usluga je nema i dobija praznu ploču. */
  slika?: string;
};

/** Snimak ekrana iz demo builda tenanta, u `public/invitations/<slug>/`. */
export type Snimak = {
  src: string;
  /** Širina i visina fajla u pikselima — Next ih traži, a okvir iz njih čita omjer. */
  sirina: number;
  visina: number;
  naslov: string;
  opis?: string;
};

export type Korist = {
  naslov: string;
  /** Kako je danas u salonu — konkretno, njegovim riječima. */
  danas: string;
  /** Šta se mijenja sa aplikacijom. */
  sa: string;
  /** Činjenica koja potkrepljuje (ocjena, broj pratilaca, trajanje usluge). */
  dokaz?: string;
  snimak: Snimak;
};

export type Pozivnica = {
  slug: string;
  /** Datum kad je pozivnica napravljena (ISO), za podnožje. */
  datum: string;

  salon: {
    ime: string;
    /** Ime salona u genitivu („aplikacija Studija Maestro"). */
    genitiv: string;
    /** Ime salona u dativu („zašto se Studiju Maestro isplati"). */
    dativ: string;
    vlasnik: string;
    vrsta: string;
    grad: string;
    adresa?: string;
    telefon?: string;
    logo: string;
    /** Fotografija salona za uvod — sa javnog profila salona. */
    fotografija?: string;
    boje: {
      /** Boja brenda (dugmad, naglasci). */
      primarna: string;
      /** Tamna podloga brenda. */
      tamna: string;
    };
  };

  /** Uvodna rečenica ispod naslova. */
  uvod: string;

  /**
   * Naslov uvoda: obraćanje vlasniku po imenu (lično, pogodi odmah) + problem koji mu
   * rješavamo, rečen njegovim jezikom („Sanine, došli smo da vam skinemo telefon s uha.").
   * Bez slogana i bez „vlastita aplikacija".
   */
  naslov: string;

  /**
   * Fokus stranice: zašto se ovom salonu isplati. Svaka korist polazi od njegove situacije
   * (sa javnih izvora ili iz vrste posla), kaže šta aplikacija mijenja i pokazuje snimak.
   * Tvrdnja o funkciji mora postojati u aplikaciji — ništa iz „uskoro".
   */
  koristi: Korist[];

  /** Prijedlog cjenovnika: polazna tačka koju vlasnik mijenja na stranici. */
  usluge: Usluga[];

  /** Snimak za uvod (početna aplikacije salona). */
  naslovniSnimak: Snimak;

  /** „Kako klijent zakazuje" — koraci booking flowa, redom. */
  zakazivanje: Snimak[];

  /** Šta je na snimcima izmišljeno — ide u podnožje, da pitch ne tvrdi ništa netačno. */
  napomena: string;
};
