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

  naslov: "Sanine, sveska za termine može u penziju.",

  uvod:
    "Melura je alat za vođenje cijelog salona: kartoteka klijenata sa historijom dolazaka, raspored tima, pregled dana i zarade, i aplikacija u kojoj klijenti zakazuju sami. Za Studio Maestro smo pripremili početnu verziju, u vašim bojama i sa vašim uslugama.",

  koristi: [
    {
      naslov: "Historija svakog klijenta na jednom mjestu",
      danas: "Ko dolazi redovno, šta je radio zadnji put i ko je izostao, to se pamti ili piše u svesku.",
      sa: "Svaki klijent ima historiju dolazaka sa uslugama i datumima, broj nedolazaka i napomene uz termine. Iz profila klijenta zakažete sljedeći termin ili ga pozovete jednim dodirom.",
      snimak: racunar("melura-clients", "Klijenti u Meluri", "Historija dolazaka i nedolasci"),
    },
    {
      naslov: "Pregled dana i zarade",
      danas: "Raspored je u telefonu, svesci i glavi, a koliko je dan donio, znate tek uveče.",
      sa: "U Meluri vidite ko dolazi, šta čeka potvrdu, naplaćeno i prognozu dana, popunjenost svakog frizera i najveću rupu u rasporedu. Kalendar po danu, sedmici i mjesecu.",
      snimak: racunar("melura-today", "Danas u Meluri", "Pregled dana salona"),
    },
    {
      naslov: "Tim i pravila salona pod kontrolom",
      danas: "Ko radi kada, ko ima pauzu i kad je salon zatvoren zbog seminara, dogovara se usmeno.",
      sa: "Smjene i pauze po frizeru, blokade za seminar ili isporuku robe, trajanje svake usluge. Vi birate da li se termini potvrđuju automatski ili ručno, jednim klikom.",
      snimak: racunar("melura-requests", "Zahtjevi u Meluri", "Potvrda jednim klikom"),
    },
    {
      naslov: "Klijenti zakazuju sami",
      danas: "Termini se dogovaraju pozivom i porukama na 061 372 353, često dok imate makaze u rukama.",
      sa: "Klijent u aplikaciji vidi samo stvarno slobodne termine i zakaže sam, i u nedjelju uveče. Link za zakazivanje stavite i na Facebook, gdje vas prati 3,9 hiljada ljudi.",
      dokaz: "3,9 hilj. pratilaca na Facebooku",
      snimak: tel("app-flow-termin", "Izbor termina", "Samo stvarno slobodna vremena"),
    },
    {
      naslov: "Zaboravljeni termini više ne moraju ostati prazni",
      danas: "Kad neko zaboravi bojanje ili pramenove, stolica ostane prazna sat i po do dva.",
      sa: "Aplikacija automatski šalje podsjetnik dan prije i nekoliko sati prije termina, bez SMS troškova. A kad neko otkaže, klijenti sa liste čekanja odmah dobiju obavijest da se oslobodio termin.",
      snimak: tel("app-notifications", "Obavijesti", "Potvrda i podsjetnik"),
    },
    {
      naslov: "Vaše ime, vaše recenzije",
      danas: "Na platformama za zakazivanje salon stoji u listi pored konkurencije, a od termina ide provizija.",
      sa: "Aplikacija nosi ime Studio Maestro, sa vašim logom i fotografijama. Klijenti ocjenjuju posjetu, a vi odlučujete koje recenzije su vidljive. Bez provizije po terminu.",
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
    tel("app-flow-radnik", "2. Frizer", "Kod koga dolazi, ili „bilo ko od nas“."),
    tel("app-flow-termin", "3. Termin", "Samo stvarno slobodna vremena."),
    tel("app-book-success", "4. Poslano", "Vi potvrđujete, klijent dobija obavijest."),
  ],

  zastoVi:
    "Sanine, Studiju Maestro se javljamo prvom. Barberski seminari, edukacije i certifikati vaših polaznika pokazuju da u frizerstvu ovog kraja vi postavljate trend i želimo da novi način zakazivanja u Vitezu i regiji krene upravo od vas.",

  napomena:
    "Ime, logo, boje, fotografije i telefon su sa javnih profila Studija Maestro. Cjenovnik, imena radnika osim vlasnika, klijenti i termini na snimcima su primjer. Sve to upisujete vi.",
};
