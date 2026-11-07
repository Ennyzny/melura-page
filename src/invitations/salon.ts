import type { Pozivnica, Snimak } from "./tipovi";

// Opšta pozivnica za male salone: jedan link za sve, bez imena, logotipa i fotografija.
// Velike salone hvatamo ličnim pozivnicama (v. `tipovi.ts` i skill `/platform-pitch`).
//
// Snimci su isti kao na landingu (`public/screens/`): demo salon Oštrica Barber Studio sa
// izmišljenim podacima, pa nema tuđih fotografija ni imena.

const tel = (src: string, naslov: string, opis?: string): Snimak => ({
  src,
  sirina: 1290,
  visina: 2796,
  naslov,
  opis,
});
const racunar = (src: string, naslov: string, opis?: string): Snimak => ({
  src,
  sirina: 2880,
  visina: 1800,
  naslov,
  opis,
});

export const opstaPozivnica: Pozivnica = {
  slug: "salon",
  datum: "2026-11-07",
  opsta: true,

  salon: {
    ime: "vaš salon",
    genitiv: "vašeg salona",
    dativ: "vašem salonu",
    boje: { primarna: "#ee6c4d", tamna: "#1a1b1e" },
  },

  naslov: "Sveska za termine može u penziju.",

  uvod:
    "Melura je alat za vođenje cijelog salona: kartoteka klijenata sa historijom dolazaka, raspored tima, pregled dana i zarade, i aplikacija u kojoj klijenti zakazuju sami, pod imenom vašeg salona. Ispod je primjer kako to izgleda, a cjenovnik možete odmah prepisati po svome.",

  koristi: [
    {
      naslov: "Historija svakog klijenta na jednom mjestu",
      danas: "Ko dolazi redovno, šta je radio zadnji put i ko je izostao, to se pamti ili piše u svesku.",
      sa: "Svaki klijent ima historiju dolazaka sa uslugama i datumima, broj nedolazaka i napomene uz termine. Iz profila klijenta zakažete sljedeći termin ili ga pozovete jednim dodirom.",
      snimak: racunar("/screens/o-klijenti.webp", "Klijenti u Meluri", "Historija dolazaka i nedolasci"),
    },
    {
      naslov: "Pregled dana i zarade",
      danas: "Raspored je u telefonu, svesci i glavi, a koliko je dan donio, znate tek uveče.",
      sa: "U Meluri vidite ko dolazi, šta čeka potvrdu, naplaćeno i prognozu dana, popunjenost svakog radnika i najveću rupu u rasporedu. Kalendar po danu, sedmici i mjesecu.",
      snimak: racunar("/screens/o-danas.webp", "Danas u Meluri", "Pregled dana salona"),
    },
    {
      naslov: "Tim i pravila salona pod kontrolom",
      danas: "Ko radi kada, ko ima pauzu i kad je salon zatvoren zbog seminara, dogovara se usmeno.",
      sa: "Smjene i pauze po radniku, blokade za seminar ili isporuku robe, trajanje svake usluge. Sve je na jednom mjestu i vidi se u rasporedu.",
      snimak: racunar("/screens/o-osoblje.webp", "Osoblje u Meluri", "Smjene po radniku"),
    },
    {
      naslov: "Klijenti zakazuju sami",
      danas: "Termini se dogovaraju pozivom i porukama, često dok imate makaze u rukama.",
      sa: "Klijent u aplikaciji vidi samo stvarno slobodne termine i zakaže sam, i u nedjelju uveče. Link za zakazivanje stavite na Facebook i Instagram.",
      snimak: tel("/screens/phone/o-vrijeme.webp", "Izbor termina", "Samo stvarno slobodna vremena"),
    },
    {
      naslov: "Zaboravljeni termini više ne moraju ostati prazni",
      danas: "Kad neko zaboravi termin, stolica ostane prazna sat i po do dva.",
      sa: "Aplikacija automatski šalje podsjetnik dan prije i nekoliko sati prije termina, bez SMS troškova. Kad neko otkaže, klijenti sa liste čekanja odmah dobiju obavijest. Zahtjev potvrđujete jednim dodirom ili uključite automatsku potvrdu.",
      snimak: tel("/screens/phone/o-melura-zahtjevi.webp", "Zahtjevi u Meluri", "Potvrda jednim dodirom"),
    },
    {
      naslov: "Vaše ime, vaše recenzije",
      danas: "Na platformama za zakazivanje salon stoji u listi pored konkurencije, a od termina ide provizija.",
      sa: "Aplikacija nosi ime vašeg salona, sa vašim logom i fotografijama. Klijenti ocjenjuju posjetu, a vi odlučujete koje recenzije su vidljive. Bez provizije po terminu.",
      snimak: tel("/screens/phone/o-pocetna.webp", "Aplikacija salona", "Ime, fotografije i cjenovnik"),
    },
  ],

  usluge: [
    { naziv: "Muško šišanje", kategorija: "Šišanje", cijena: 12, trajanje: 30 },
    { naziv: "Žensko šišanje + feniranje", kategorija: "Šišanje", cijena: 25, trajanje: 60 },
    { naziv: "Dječije šišanje", kategorija: "Šišanje", cijena: 8, trajanje: 20 },
    { naziv: "Brada", kategorija: "Šišanje", cijena: 8, trajanje: 20 },
    { naziv: "Feniranje", kategorija: "Styling", cijena: 15, trajanje: 30 },
    { naziv: "Bojanje izrastka", kategorija: "Boja", cijena: 45, trajanje: 90 },
    { naziv: "Pramenovi", kategorija: "Boja", cijena: 70, trajanje: 120 },
    { naziv: "Manikir", kategorija: "Njega", cijena: 20, trajanje: 45 },
  ],

  naslovniSnimak: tel("/screens/phone/o-pocetna.webp", "Aplikacija salona", "Početna"),

  zakazivanje: [
    tel("/screens/phone/o-usluga.webp", "1. Usluga", "Klijent bira šta želi."),
    tel("/screens/phone/o-majstor.webp", "2. Radnik", "Kod koga dolazi, ili „bilo ko od nas“."),
    tel("/screens/phone/o-vrijeme.webp", "3. Termin", "Samo stvarno slobodna vremena."),
    tel("/screens/phone/o-potvrda.webp", "4. Poslano", "Vi potvrđujete, klijent dobija obavijest."),
  ],

  napomena:
    "Snimci ekrana su iz demo salona (Oštrica Barber Studio) i prikazuju izmišljene podatke: imena, klijente, usluge i termine. Cjenovnik je primjer koji vi mijenjate. Vaša verzija nosi ime, logo, boje i fotografije vašeg salona.",
};
