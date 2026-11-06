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

  naslov: "Vlastita aplikacija za zakazivanje Studija Maestro.",

  uvod:
    "U vašim bojama, sa vašim logom, uslugama i timom. Klijenti zakazuju sami, u bilo koje doba, a vi termine pratite u Meluri — bez telefona u ruci.",

  koristi: [
    {
      naslov: "Klijenti zakazuju sami",
      danas: "Termini se dogovaraju pozivom i porukama na 061 372 353 — često dok imate makaze u rukama.",
      sa: "Klijent u aplikaciji vidi slobodne termine i zakaže sam, i u nedjelju uveče. Termin se potvrđuje automatski — ili ga vi potvrdite kad stignete, kako podesite.",
      snimak: tel("app-flow-termin", "Izbor termina", "Samo stvarno slobodna vremena"),
    },
    {
      naslov: "Manje nedolazaka, otkazani termin se popuni",
      danas: "Kad neko zaboravi bojanje ili pramenove, prazna je stolica sat i po do dva.",
      sa: "Aplikacija sama šalje podsjetnik dan prije i nekoliko sati prije termina, bez SMS troškova. Kad neko otkaže, klijent sa liste čekanja odmah dobije obavijest.",
      snimak: tel("app-notifications", "Obavijesti", "Potvrda i podsjetnik"),
    },
    {
      naslov: "Znate svoje klijente",
      danas: "Ko dolazi redovno, ko je zadnji put izostao i šta je tražio — to se pamti ili piše u svesku.",
      sa: "Svaki klijent ima istoriju dolazaka i broj nedolazaka, a napomenu uz termin („samo vrhove“) vidite prije nego sjedne u stolicu.",
      snimak: racunar("melura-clients", "Klijenti u Meluri", "Istorija dolazaka i nedolasci"),
    },
    {
      naslov: "Cijeli dan na jednom ekranu",
      danas: "Raspored je u telefonu, svesci i glavi — i svaka izmjena je novi poziv.",
      sa: "U Meluri vidite ko dolazi, šta čeka potvrdu, ko je u smjeni, naplaćeno i prognozu dana. Smjene, pauze i blokade (seminar, isporuka robe) postavite jednom.",
      snimak: racunar("melura-today", "Danas u Meluri", "Pregled dana salona"),
    },
    {
      naslov: "Facebook vodi pravo u termin",
      danas: "Studio Maestro prati 3,9 hiljada ljudi. Ko vidi objavu, a želi termin, mora zvati ili pisati.",
      sa: "Link za zakazivanje stavite u objave i opis stranice. Od objave do termina je par dodira.",
      dokaz: "3,9 hilj. pratilaca na Facebooku",
      snimak: tel("app-pocetna", "Početna aplikacije", "Ime, cjenovnik i dugme za termin"),
    },
    {
      naslov: "Aplikacija sa vašim imenom",
      danas: "Na platformama za zakazivanje salon stoji u listi pored konkurencije, a od termina ide provizija.",
      sa: "U App Storeu i Google Playu piše Studio Maestro, sa vašim logom, fotografijama i recenzijama. Klijent vidi samo vas. Bez provizije po terminu.",
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
