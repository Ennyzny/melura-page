import type { Pozivnica, Snimak } from "./tipovi";

// Studio „MAESTRO" by Sanin Fazlić, Vitez. Izvori (2026-11-06): Google Maps (ocjena, adresa,
// telefon, fotografija salona) i Facebook stranica salonmaestrosano (logo, pratioci,
// Kérastase Fusio-Dose). Tenant `studiomaestro` u platformi.

const p = "/invitations/studio-maestro";
const tel = (ime: string, naslov: string, opis?: string): Snimak => ({
  src: `${p}/${ime}.webp`,
  sirina: 1290,
  visina: 2796,
  naslov,
  opis,
});
const racunar = (ime: string, naslov: string, opis?: string): Snimak => ({
  src: `${p}/${ime}.webp`,
  sirina: 2880,
  visina: 1800,
  naslov,
  opis,
});

export const studioMaestro: Pozivnica = {
  slug: "studio-maestro",
  datum: "2026-11-06",

  salon: {
    ime: "Studio Maestro",
    vokativ: "Sanine",
    genitiv: "Studija Maestro",
    dativ: "Studiju Maestro",
    vlasnik: "Sanin Fazlić",
    vrsta: "Muški i ženski frizerski salon",
    grad: "Vitez",
    adresa: "Branilaca Starog Viteza",
    telefon: "061 372 353",
    logo: `${p}/logo.webp`,
    fotografija: `${p}/salon.webp`,
    boje: { primarna: "#34F0E0", tamna: "#0D0D0D" },
  },

  obecanje: "manje poziva, više termina",

  uvod:
    "Napravili smo Studiju Maestro vlastitu aplikaciju — sa vašim imenom, logom i bojama. Klijenti zakazuju sami, u bilo koje doba, a vi radite bez telefona u ruci.",

  koristi: [
    {
      naslov: "Telefon prestaje zvoniti usred bojanja",
      danas:
        "Termin se danas traži pozivom ili porukom na 061 372 353. Dok nanosite boju, ne možete se javiti — a klijentica koja ne dobije odgovor zove sljedeći salon.",
      sa: "Klijent sam vidi samo stvarno slobodne termine i zakaže za manje od minute. Vi pogledate zahtjeve kad završite sa klijentom.",
      snimak: tel("app-flow-termin", "Izbor termina", "Samo stvarno slobodna vremena"),
    },
    {
      naslov: "Pratioci postaju termini — i u 23 h",
      danas:
        "Studio Maestro prati 3,9 hiljada ljudi na Facebooku. Kad uveče vide novu frizuru u objavi, salon je zatvoren i termin se ostavlja „za sutra“.",
      sa: "Link za zakazivanje u objavi i u opisu stranice vodi pravo u vašu aplikaciju. Ko želi termin, zakaže ga odmah, dok mu je želja svježa.",
      dokaz: "3,9 hilj. pratilaca na Facebooku",
      snimak: tel("app-pocetna", "Početna aplikacije", "Ime, cjenovnik i dugme za termin"),
    },
    {
      naslov: "Manje praznih stolica kod dugih tretmana",
      danas:
        "Bojanje i pramenovi traju sat i po do dva. Kad takva klijentica zaboravi termin, propadne pola dana jednog frizera — a neko drugi bi ga rado uzeo.",
      sa: "Aplikacija šalje podsjetnik dan prije i nekoliko sati prije termina (vi birate koliko). Kad neko otkaže, lista čekanja odmah javlja klijentu koji je čekao.",
      snimak: tel("app-notifications", "Obavijesti", "Potvrda i podsjetnik"),
    },
    {
      naslov: "Vi odlučujete ko dolazi i kada",
      danas: "Raspored drži telefon, sveska ili pamćenje — i svako mijenjanje termina je novi poziv.",
      sa: "Svaki zahtjev potvrđujete jednim klikom ili uključite automatsku potvrdu. Smjene i pauze po frizeru, blokade za seminar ili isporuku robe — klijent nikad ne vidi termin koji ne možete ispoštovati.",
      snimak: racunar("melura-requests", "Zahtjevi u Meluri", "Potvrda jednim klikom"),
    },
    {
      naslov: "Cijeli dan salona na jednom ekranu",
      danas: "Koliko je dan popunjen, ko kasni i koliko je naplaćeno, znate tek na kraju dana.",
      sa: "Melura na telefonu ili računaru pokazuje ko dolazi, šta čeka potvrdu, naplaćeno i prognozu dana, popunjenost svakog frizera i najveću rupu u rasporedu.",
      snimak: racunar("melura-today", "Danas u Meluri", "Pregled dana salona"),
    },
    {
      naslov: "Vaš brend, ne tuđa platforma",
      danas:
        "Ocjena 4,8 na Google Mapama je vaš kapital. Na platformama za zakazivanje vaš salon stoji u listi pored konkurencije, a provizija ide od svakog termina.",
      sa: "Aplikacija se zove Studio Maestro, sa vašim logom u App Storeu i Google Playu. Klijent vidi samo vas — vaše fotografije, vaš tim, vaše recenzije. Bez provizije po terminu.",
      dokaz: "4,8 ★ na Google Mapama",
      snimak: tel("app-about", "O nama", "Fotografije, radno vrijeme, kontakt"),
    },
  ],

  usluge: [
    { naziv: "Muško šišanje", kategorija: "Šišanje", cijena: 12, trajanje: 30, slika: `${p}/usluge/musko.webp` },
    { naziv: "Žensko šišanje + feniranje", kategorija: "Šišanje", cijena: 25, trajanje: 60, slika: `${p}/usluge/zensko.webp` },
    { naziv: "Dječije šišanje", kategorija: "Šišanje", cijena: 8, trajanje: 20 },
    { naziv: "Feniranje", kategorija: "Styling", cijena: 15, trajanje: 30, slika: `${p}/usluge/feniranje.webp` },
    { naziv: "Svečana frizura", kategorija: "Styling", cijena: 40, trajanje: 60 },
    { naziv: "Bojanje izrastka", kategorija: "Boja", cijena: 45, trajanje: 90, slika: `${p}/usluge/bojanje.webp` },
    { naziv: "Pramenovi", kategorija: "Boja", cijena: 70, trajanje: 120, slika: `${p}/usluge/pramenovi.webp` },
    { naziv: "Kérastase Fusio-Dose", kategorija: "Njega", cijena: 35, trajanje: 30, slika: `${p}/usluge/kerastase.webp` },
  ],

  naslovniSnimak: tel("app-pocetna", "Aplikacija Studija Maestro", "Početna"),

  zakazivanje: [
    tel("app-flow-usluga", "1. Usluga", "Klijent bira šta želi."),
    tel("app-flow-radnik", "2. Frizer", "Kod koga dolazi — ili „bilo ko od nas“."),
    tel("app-flow-termin", "3. Termin", "Samo stvarno slobodna vremena."),
    tel("app-book-success", "4. Poslano", "Vi potvrđujete, klijent dobija obavijest."),
  ],

  napomena:
    "Ime, logo, boje, fotografije i telefon su sa javnih profila Studija Maestro. Cjenovnik, imena radnika osim vlasnika, klijenti i termini na snimcima su primjer — sve to upisujete vi.",
};
