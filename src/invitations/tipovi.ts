// Oblik jedne pozivnice. Nova pozivnica = novi fajl u ovom folderu + red u `index.ts` +
// slike u `public/invitations/<slug>/`. Stranica (`app/invitations/[slug]`) se ne dira.
//
// Dvije vrste: lična (jedan salon, njegovo ime, logo, boje i fotografije sa javnih profila) i
// opšta (`opsta: true`, za male salone: bez imena, logotipa i ličnog pasusa, u Melurinim bojama).
// Opštih ima po vertikali (`frizer`, `beauty`, `masaza`), a sve se prave kroz `opsta()`.

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

  /**
   * Opšta pozivnica: nije za jedan salon. Ime salona je „vaš salon", nema logotipa ni
   * fotografije, ne tvrdi se ništa o javnim profilima, a cjenovnik traži ime salona i kontakt.
   */
  opsta?: boolean;

  salon: {
    ime: string;
    /** Ime salona u genitivu („aplikacija Studija Primjer"). */
    genitiv: string;
    /** Ime salona u dativu („zašto se Studiju Primjer isplati"). */
    dativ: string;
    vlasnik?: string;
    vrsta?: string;
    grad?: string;
    adresa?: string;
    telefon?: string;
    logo?: string;
    /** Fotografija salona za uvod — sa javnog profila salona. */
    fotografija?: string;
    boje: {
      /** Boja brenda (dugmad, naglasci). */
      primarna: string;
      /** Tamna podloga brenda. */
      tamna: string;
    };
  };

  /**
   * Riječi vertikale u pregledu cjenovnika (telefon pored crta ekran „Usluge" iz aplikacije).
   * Bez ovoga su „Usluge" i „Zakaži termin", kao u frizerskom i barber salonu.
   */
  rjecnik?: {
    /** Naslov ekrana: „Usluge", „Tretmani". */
    usluge: string;
    /** Dugme za zakazivanje: „Zakaži termin", „Rezerviši termin", „Rezerviši tretman". */
    zakazi: string;
  };

  /**
   * Dio `naslova` koji se ističe bojom brenda (mora biti njegov tačan podniz). Naslov udara
   * u jedan konkretan problem, a istaknut je ono što ga čini pitanjem ili obećanjem.
   */
  naglasak?: string;

  /**
   * Mala oznaka iznad naslova: kome je stranica namijenjena. Bez nje piše „Pozivnica za
   * {ime salona}", što u ličnoj pozivnici i treba, a u opštoj govori premalo.
   */
  oznaka?: string;

  /** Uvodna rečenica ispod naslova. */
  uvod: string;

  /**
   * Naslov uvoda: obraćanje vlasniku po imenu (lično, pogodi odmah) + problem koji mu
   * rješavamo, rečen njegovim jezikom i sa malo duha („Sanine, sveska za termine može u penziju.").
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

  /**
   * „A ko smo to mi?" — jedini lični pasus u inače zajedničkoj sekciji: zašto se javljamo
   * baš ovom salonu. Činjenica sa javnih izvora, bez laskanja koje ne možemo potkrijepiti.
   */
  zastoVi?: string;

  /** Šta je na snimcima izmišljeno — ide u podnožje, da pitch ne tvrdi ništa netačno. */
  napomena: string;
};
