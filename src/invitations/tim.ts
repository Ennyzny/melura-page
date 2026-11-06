// „A ko smo to mi?" — isto u svakoj pozivnici. Po salonu se mijenja samo `zastoVi` u
// podacima pozivnice. Izvori: hamza-tuco.vercel.app i GitHub profili (2026-11-06).

type Salon = { ime: string; genitiv: string; dativ: string };

export type Clan = {
  ime: string;
  uloga: string;
  /** Šta konkretno radi za salon iz pozivnice — rečenica se sklapa sa imenom salona. */
  zaSalon: (s: Salon) => string;
  opis: string;
  slika: string;
};

export const tim: Clan[] = [
  {
    ime: "Hamza Tuco",
    uloga: "Arhitekta rješenja",
    zaSalon: (s) => `Osmislio je kako Melura radi, od servera do aplikacije, i s vama dogovara sve oko ${s.genitiv}.`,
    opis: "Student četvrte godine softverskog inženjerstva na Fakultetu informacijskih tehnologija u Mostaru.",
    slika: "/invitations/tim/hamza.webp",
  },
  {
    ime: "Eniz Dajić",
    uloga: "Programer aplikacija",
    zaSalon: () => "Razvija Meluru, aplikaciju u kojoj vi i vaš tim vodite termine, klijente i recenzije.",
    opis: "Student softverskog inženjerstva na Politehničkom fakultetu Univerziteta u Zenici.",
    slika: "/invitations/tim/eniz.webp",
  },
];

export const oNama = {
  naslov: "Dvojica studenata iz Viteza i jedna ideja.",
  prica: [
    "Mi smo Hamza i Eniz, studenti softverskog inženjerstva iz Viteza. Gledali smo kako se termini kod frizera, u beauty salonima i kod fizioterapeuta i dalje dogovaraju pozivima i porukama, a na domaćem tržištu nismo našli rješenje koje to radi kako treba.",
    "Zato smo napravili Meluru: platformu na kojoj svaki salon dobija aplikaciju sa svojim imenom, a vlasnik jedno mjesto za cijeli raspored. Svuda gdje se zakazuje termin.",
  ],
};
