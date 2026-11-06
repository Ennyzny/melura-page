// Oblik jedne pozivnice. Nova pozivnica = novi fajl u ovom folderu + red u `index.ts` +
// slike u `public/invitations/<slug>/`. Stranica (`app/invitations/[slug]`) se ne dira.

export type Usluga = {
  naziv: string;
  kategorija: string;
  /** KM */
  cijena: number;
  /** minute */
  trajanje: number;
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

export type Pozivnica = {
  slug: string;
  /** Datum kad je pozivnica napravljena (ISO), za podnožje. */
  datum: string;

  salon: {
    ime: string;
    /** Ime kako se obraćamo vlasniku u naslovu, u vokativu („Sanine"). */
    vokativ: string;
    /** Ime salona u genitivu („aplikacija Studija Maestro"). */
    genitiv: string;
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

  /** „Šta smo primijetili" — kratke tvrdnje sa javnih izvora, svaka sa brojem ili činjenicom. */
  zapazanja: { vrijednost: string; opis: string }[];

  /** Prijedlog cjenovnika: polazna tačka koju vlasnik mijenja na stranici. */
  usluge: Usluga[];

  snimci: {
    /** Klijentska aplikacija salona, telefon. */
    aplikacija: Snimak[];
    /** Melura na računaru. */
    meluraRacunar: Snimak[];
    /** Melura na telefonu. */
    meluraTelefon: Snimak[];
  };

  /** Šta je na snimcima izmišljeno — ide u podnožje, da pitch ne tvrdi ništa netačno. */
  napomena: string;
};
