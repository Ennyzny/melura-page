import type { Pozivnica } from "./tipovi";
import { racunar, telefon } from "./opsta";

// Lična pozivnica za Hair Salon by Hadis (Zenica). Tier A: 88 hiljada pratilaca na Instagramu,
// Google Mape 4,4 na osnovu 260 recenzija, linija HM Luxury Hair i edukacije (poster za
// 15.11.2026). Javni izvori: Google Mape, Facebook stranica „Salon ljepote by Hadis" i
// Instagram hair_salon_by_hadis (2026-11-09). Snimci su iz demo salona sa izmišljenim
// klijentima, radnicima (osim vlasnika), uslugama i cijenama, u `public/invitations/hadis/`.
// Poslije deploya provjeriti: 200, noindex i `og:image` na produkcijskoj domeni.

const p = "/invitations/hadis";

export const hadisPozivnica: Pozivnica = {
  slug: "hadis",
  datum: "2026-11-09",

  salon: {
    ime: "Hair Salon by Hadis",
    genitiv: "salona Hadis",
    dativ: "salonu Hadis",
    vlasnik: "Hadis Muračević",
    vrsta: "Frizerski salon",
    grad: "Zenica",
    adresa: "Dr. Abdulaziza Aska Borića 27",
    telefon: "063 486 783",
    logo: `${p}/logo.webp`,
    fotografija: `${p}/salon.webp`,
    boje: { primarna: "#eb8b25", tamna: "#2b2829" },
  },

  rjecnik: { usluge: "Usluge", zakazi: "Rezerviši termin" },

  naslov: "Hadise, 88 hiljada vas prati. Ko im odgovara na poruke?",
  naglasak: "Ko im odgovara na poruke?",

  uvod:
    "Vodite salon, imate liniju HM Luxury Hair, držite edukacije, a upiti za termine stižu na Instagram, Viber i telefon baš kad su vam ruke u farbi ili ste na predavanju. Sa Melurom klijentica vidi slobodne termine i sama rezerviše, vi potvrdite jednim dodirom, a podsjetnik joj stiže prije dolaska.",

  zakljucak:
    "Napravili smo demo aplikaciju sa imenom, bojama i uslugama vašeg salona. Pogledajte ispod šta sve dobijate.",

  koristi: [
    {
      naslov: "Historija svake klijentice na jednom mjestu",
      danas: "Ko dolazi redovno, koju nijansu blonda ste miješali i šta ste radili zadnji put, to se pamti ili piše u bilježnicu.",
      sa: "Svaka klijentica ima historiju dolazaka sa uslugama i datumima, broj nedolazaka i napomene uz termine, na primjer formulu boje ili ton toniranja. Iz profila zakažete sljedeći termin ili je pozovete jednim dodirom.",
      dokaz: "Ocjena 4,4 na osnovu 260 recenzija na Google Mapama: toliko klijentica se već vraća.",
      snimak: racunar(`${p}/melura-klijenti.webp`, "Klijentice u Meluri", "Historija dolazaka i nedolasci"),
    },
    {
      naslov: "Pregled dana i zarade",
      danas: "Raspored je u telefonu, bilježnici i glavi, a koliko je dan donio, znate tek kad uveče saberete.",
      sa: "U Meluri vidite ko dolazi, šta čeka potvrdu, naplaćeno i prognozu dana, popunjenost svake stilistice i najveću rupu u rasporedu. Kalendar po danu, sedmici i mjesecu.",
      snimak: racunar(`${p}/melura-danas.webp`, "Danas u Meluri", "Pregled dana salona"),
    },
    {
      naslov: "Tim, edukacije i pravila salona pod kontrolom",
      danas: "Kad ste vi na edukaciji, a salon radi, ko preuzima klijentice i ko je kada na smjeni dogovara se usmeno.",
      sa: "Smjene i pauze po stilistici, blokade za edukaciju ili isporuku proizvoda, trajanje svake usluge. Balayage od tri sata i feniranje od sat vremena ne traju isto, a sve se vidi u rasporedu.",
      dokaz: "Najavljena edukacija za keratinsko ravnanje kose, 15.11.2026. u Zenici.",
      snimak: racunar(`${p}/melura-osoblje.webp`, "Osoblje u Meluri", "Smjene po stilistici"),
    },
    {
      naslov: "Poruke sa Instagrama postaju termini",
      danas: "Profil prati 88 hiljada ljudi, a termin se dogovara porukom, često dok radite.",
      sa: "Klijentica u aplikaciji vidi samo stvarno slobodne termine i rezerviše sama, i u nedjelju uveče. Link za rezervaciju stavite u bio na Instagramu i u highlight „Rezervišite se“. Zahtjev potvrđujete jednim dodirom, ili uključite automatsku potvrdu.",
      dokaz: "88 hiljada pratilaca na Instagramu.",
      snimak: telefon(`${p}/app-termin.webp`, "Izbor termina", "Samo stvarno slobodna vremena"),
    },
    {
      naslov: "Zaboravljeni termini više ne moraju ostati prazni",
      danas: "Kad klijentica zaboravi termin za pramenove ili balayage, stolica ostane prazna sat, dva ili tri.",
      sa: "Aplikacija automatski šalje podsjetnik dan prije i nekoliko sati prije termina, bez SMS troškova. A kad neko otkaže, klijentice sa liste čekanja odmah dobiju obavijest da se oslobodio termin.",
      snimak: telefon(`${p}/app-obavijesti.webp`, "Obavijesti", "Potvrda i podsjetnik"),
    },
    {
      naslov: "Vaše ime, vaš izgled",
      danas: "Zakazivanje ide porukama ili kroz tuđu platformu, pa klijentica ne vidi baš vaš salon i vaš izgled.",
      sa: "Aplikacija nosi ime vašeg salona, sa vašim logom, bojama i fotografijama radova. Klijentice ocjenjuju posjetu, a vi odlučujete koje recenzije su vidljive. Bez provizije po terminu.",
      snimak: telefon(`${p}/app-pocetna.webp`, "Aplikacija salona", "Ime, fotografije i cjenovnik"),
    },
  ],

  usluge: [
    { naziv: "Šišanje + feniranje", kategorija: "Kosa", cijena: 30, trajanje: 60, slika: `${p}/sisanje.webp` },
    { naziv: "Blond i pramenovi", kategorija: "Boja", cijena: 90, trajanje: 150, slika: `${p}/blond.webp` },
    { naziv: "Balayage", kategorija: "Boja", cijena: 110, trajanje: 180, slika: `${p}/balayage.webp` },
    { naziv: "Farbanje korijena", kategorija: "Boja", cijena: 45, trajanje: 90, slika: `${p}/korijen.webp` },
    { naziv: "Valovi i svečana frizura", kategorija: "Frizure", cijena: 35, trajanje: 60, slika: `${p}/valovi.webp` },
    { naziv: "Dubinska njega kose", kategorija: "Njega", cijena: 40, trajanje: 60, slika: `${p}/njega.webp` },
    { naziv: "Limfna drenaža", kategorija: "Tijelo", cijena: 40, trajanje: 60, slika: `${p}/tijelo.webp` },
  ],

  naslovniSnimak: telefon(`${p}/app-pocetna.webp`, "Aplikacija salona", "Početna"),

  zakazivanje: [
    telefon(`${p}/app-usluga.webp`, "1. Usluga", "Klijentica bira šta želi."),
    telefon(`${p}/app-radnik.webp`, "2. Frizer", "Kod koga dolazi, ili „bilo ko od nas“."),
    telefon(`${p}/app-termin.webp`, "3. Termin", "Samo stvarno slobodna vremena."),
    telefon(`${p}/app-potvrda.webp`, "4. Poslano", "Vi potvrđujete, klijentica dobija obavijest."),
  ],

  zastoVi:
    "Javljamo se vama jer vas na Instagramu prati 88 hiljada ljudi, uz salon imate liniju HM Luxury Hair i držite edukacije, pa se kod vas mnogo toga dešava istovremeno. A jedan od nas studira u vašoj Zenici.",

  napomena:
    "Ime, adresa, telefon, opis, logo, boje i fotografije su sa vaših javnih profila (Google Mape, Facebook i Instagram). Snimci ekrana su iz demo aplikacije napravljene za Hair Salon by Hadis i prikazuju izmišljene podatke: klijentice, članove tima osim vlasnika, usluge, cijene i termine. Cjenovnik je primjer koji vi mijenjate. Vaša verzija nosi vaše stvarne podatke.",
};
