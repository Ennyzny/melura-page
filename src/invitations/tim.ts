// „A ko smo to mi?" — isto u svakoj pozivnici. Po salonu se mijenja samo `zastoVi` u
// podacima pozivnice. Izvori: hamza-tuco.vercel.app i GitHub profili (2026-11-06).

export type Clan = {
  ime: string;
  uloga: string;
  opis: string;
  slika: string;
};

export const tim: Clan[] = [
  {
    ime: "Hamza Tuco",
    uloga: "Proizvod i razvoj",
    opis: "Softverski inženjer u Symphonyju i student četvrte godine softverskog inženjerstva na FIT-u u Mostaru.",
    slika: "/invitations/tim/hamza.webp",
  },
  {
    ime: "Eniz Dajić",
    uloga: "Razvoj aplikacije",
    opis: "Student softverskog inženjerstva na Politehničkom fakultetu Univerziteta u Zenici.",
    slika: "/invitations/tim/eniz.webp",
  },
];

export const oNama = {
  naslov: "Dvojica studenata iz Viteza i jedna ideja.",
  prica: [
    "Mi smo Hamza i Eniz, studenti softverskog inženjerstva iz Viteza. Gledali smo kako se termini kod frizera, u beauty salonima i kod fizioterapeuta i dalje dogovaraju pozivima i porukama — i na domaćem tržištu nismo našli rješenje koje to radi kako treba.",
    "Zato smo napravili Meluru: platformu na kojoj svaki salon dobija aplikaciju sa svojim imenom, a vlasnik jedno mjesto za cijeli raspored. Svuda gdje se zakazuje termin.",
  ],
};
