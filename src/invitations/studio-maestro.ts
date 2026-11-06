import type { Pozivnica } from "./tipovi";

// Studio „MAESTRO" by Sanin Fazlić, Vitez. Izvori (2026-11-06): Google Maps (ocjena, adresa,
// telefon, fotografija salona) i Facebook stranica salonmaestrosano (logo, pratioci,
// Kérastase Fusio-Dose, fotografija rada). Tenant `studiomaestro` u platformi.

const p = "/invitations/studio-maestro";
const tel = { sirina: 1290, visina: 2796 };
const racunar = { sirina: 2880, visina: 1800 };

export const studioMaestro: Pozivnica = {
  slug: "studio-maestro",
  datum: "2026-11-06",

  salon: {
    ime: "Studio Maestro",
    vokativ: "Sanine",
    genitiv: "Studija Maestro",
    vlasnik: "Sanin Fazlić",
    vrsta: "Muški i ženski frizerski salon",
    grad: "Vitez",
    adresa: "Branilaca Starog Viteza",
    telefon: "061 372 353",
    logo: `${p}/logo.webp`,
    fotografija: `${p}/salon.webp`,
    boje: { primarna: "#34F0E0", tamna: "#0D0D0D" },
  },

  uvod:
    "Napravili smo Studiju Maestro vlastitu aplikaciju — u vašim bojama, sa vašim uslugama i vašim timom. Klijenti zakazuju sami, u bilo koje doba, a vi termine vidite i potvrđujete u Meluri.",

  zapazanja: [
    { vrijednost: "4,8 ★", opis: "Ocjena na Google Mapama. Klijenti su zadovoljni — sljedeći korak je da im zakazivanje bude jednako lako." },
    { vrijednost: "3,9 hilj.", opis: "Pratilaca na Facebooku. Link za zakazivanje u objavi ili u opisu stranice pretvara pratioca u termin." },
    { vrijednost: "061 372 353", opis: "Danas se termin traži pozivom ili porukom — i usred bojanja. Aplikacija preuzima pitanje „imate li slobodno?“." },
  ],

  usluge: [
    { naziv: "Muško šišanje", kategorija: "Šišanje", cijena: 12, trajanje: 30 },
    { naziv: "Žensko šišanje + feniranje", kategorija: "Šišanje", cijena: 25, trajanje: 60 },
    { naziv: "Dječije šišanje", kategorija: "Šišanje", cijena: 8, trajanje: 20 },
    { naziv: "Feniranje", kategorija: "Styling", cijena: 15, trajanje: 30 },
    { naziv: "Svečana frizura", kategorija: "Styling", cijena: 40, trajanje: 60 },
    { naziv: "Bojanje izrastka", kategorija: "Boja", cijena: 45, trajanje: 90 },
    { naziv: "Pramenovi", kategorija: "Boja", cijena: 70, trajanje: 120 },
    { naziv: "Kérastase Fusio-Dose", kategorija: "Njega", cijena: 35, trajanje: 30 },
  ],

  snimci: {
    aplikacija: [
      { src: `${p}/app-pocetna.webp`, ...tel, naslov: "Početna", opis: "Vaš salon, vaše boje, cjenovnik i dugme za termin." },
      { src: `${p}/app-flow-usluga.webp`, ...tel, naslov: "1. Usluga", opis: "Klijent bira šta želi." },
      { src: `${p}/app-flow-radnik.webp`, ...tel, naslov: "2. Frizer", opis: "Kod koga dolazi — ili „bilo ko od nas“." },
      { src: `${p}/app-flow-termin.webp`, ...tel, naslov: "3. Termin", opis: "Samo stvarno slobodna vremena." },
      { src: `${p}/app-book-success.webp`, ...tel, naslov: "4. Poslano", opis: "Vi potvrđujete, klijent dobija obavijest." },
      { src: `${p}/app-about.webp`, ...tel, naslov: "O nama", opis: "Fotografije, radno vrijeme, kontakt." },
    ],
    meluraRacunar: [
      { src: `${p}/melura-today.webp`, ...racunar, naslov: "Danas", opis: "Ko dolazi, šta čeka potvrdu i koliko je dan popunjen." },
      { src: `${p}/melura-calendar.webp`, ...racunar, naslov: "Kalendar", opis: "Dan, sedmica i mjesec — kolona po frizeru." },
      { src: `${p}/melura-requests.webp`, ...racunar, naslov: "Zahtjevi", opis: "Potvrda jednim klikom." },
      { src: `${p}/melura-clients.webp`, ...racunar, naslov: "Klijenti", opis: "Istorija dolazaka i kontakt." },
    ],
    meluraTelefon: [
      { src: `${p}/melura-telefon-today.webp`, ...tel, naslov: "Danas na telefonu" },
      { src: `${p}/melura-telefon-calendar.webp`, ...tel, naslov: "Kalendar na telefonu" },
    ],
  },

  napomena:
    "Ime, logo, boje, fotografije i telefon su sa javnih profila Studija Maestro. Cjenovnik, imena radnika osim vlasnika, klijenti i termini na snimcima su primjer — sve to upisujete vi.",
};
