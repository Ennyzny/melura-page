import { opsta, racunar, telefon } from "./opsta";

// Opšta pozivnica za beauty salone: ženski frizerski saloni, kozmetika, nokti, obrve i
// trepavice (`/invitations/beauty`). Snimci su iz demo salona „Lumière Beauty Studio" sa
// izmišljenim podacima, u `public/invitations/beauty/`.

const p = "/invitations/beauty";

export const beautyPozivnica = opsta({
  slug: "beauty",

  salon: { ime: "vaš salon", genitiv: "vašeg salona", dativ: "vašem salonu" },

  rjecnik: { usluge: "Usluge", zakazi: "Rezerviši termin" },

  oznaka: "Za beauty salone",

  naslov: "Dok vi radite, klijentica piše. Ko joj odgovara?",
  naglasak: "Ko joj odgovara?",

  uvod:
    "Poruke na Instagramu, Viberu i telefonu stižu usred tretmana, a odgovor čeka. Melura vodi cijeli salon umjesto vas: klijentice, tim, zaradu i termine koje same rezervišu, i dok su vam ruke zauzete. Pokazat ću vam kako to izgleda: ispod je primjer, a cjenovnik možete odmah prepisati po svome.",

  koristi: [
    {
      naslov: "Historija svake klijentice na jednom mjestu",
      danas: "Ko dolazi redovno, šta je radila zadnji put i koju nijansu ste miješali, to se pamti ili piše u bilježnicu.",
      sa: "Svaka klijentica ima historiju dolazaka sa uslugama i datumima, broj nedolazaka i napomene uz termine, na primjer koju boju ste koristili. Iz profila zakažete sljedeći termin ili je pozovete jednim dodirom.",
      snimak: racunar(`${p}/melura-klijenti.webp`, "Klijentice u Meluri", "Historija dolazaka i nedolasci"),
    },
    {
      naslov: "Pregled dana i zarade",
      danas: "Raspored je u telefonu, bilježnici i glavi, a koliko je dan donio, znate tek kad uveče saberete.",
      sa: "U Meluri vidite ko dolazi, šta čeka potvrdu, naplaćeno i prognozu dana, popunjenost svake stilistice i najveću rupu u rasporedu. Kalendar po danu, sedmici i mjesecu.",
      snimak: racunar(`${p}/melura-danas.webp`, "Danas u Meluri", "Pregled dana salona"),
    },
    {
      naslov: "Tim i pravila salona pod kontrolom",
      danas: "Ko radi kada, ko ima pauzu i kad je salon zatvoren zbog edukacije ili isporuke materijala, dogovara se usmeno.",
      sa: "Smjene i pauze po stilistici, blokade za edukaciju ili isporuku, trajanje svake usluge. Manikir, gel lak i farbanje ne traju isto, a sve je na jednom mjestu i vidi se u rasporedu.",
      snimak: racunar(`${p}/melura-osoblje.webp`, "Osoblje u Meluri", "Smjene po stilistici"),
    },
    {
      naslov: "Klijentice rezervišu same",
      danas: "Termini se dogovaraju porukama na Instagramu i Viberu i pozivima, često usred tretmana.",
      sa: "Klijentica u aplikaciji vidi samo stvarno slobodne termine i rezerviše sama, i u nedjelju uveče. Link za rezervaciju stavite u bio na Instagramu i na Facebook.",
      snimak: telefon(`${p}/app-termin.webp`, "Izbor termina", "Samo stvarno slobodna vremena"),
    },
    {
      naslov: "Zaboravljeni termini više ne moraju ostati prazni",
      danas: "Kad klijentica zaboravi gel lak ili farbanje, stolica ostane prazna sat do dva.",
      sa: "Aplikacija automatski šalje podsjetnik dan prije i nekoliko sati prije termina, bez SMS troškova. A kad neko otkaže, klijentice sa liste čekanja odmah dobiju obavijest da se oslobodio termin.",
      snimak: telefon(`${p}/app-obavijesti.webp`, "Obavijesti", "Potvrda i podsjetnik"),
    },
    {
      naslov: "Zahtjev potvrđujete jednim dodirom",
      danas: "Svaka poruka sa pitanjem za termin traži odgovor odmah, ma šta radili.",
      sa: "Zahtjevi za termin stižu na jedno mjesto, a vi ih potvrđujete jednim dodirom. Ako želite, uključite automatsku potvrdu. Klijentica dobija obavijest čim odlučite.",
      snimak: telefon(`${p}/melura-zahtjevi.webp`, "Zahtjevi u Meluri", "Potvrda jednim dodirom"),
    },
    {
      naslov: "Vaše ime, vaše recenzije",
      danas: "Na platformama za zakazivanje salon stoji u listi pored konkurencije, a od termina ide provizija.",
      sa: "Aplikacija nosi ime vašeg salona, sa vašim logom i fotografijama. Klijentice ocjenjuju posjetu, a vi odlučujete koje recenzije su vidljive. Bez provizije po terminu.",
      snimak: telefon(`${p}/app-pocetna.webp`, "Aplikacija salona", "Ime, fotografije i cjenovnik"),
    },
  ],

  usluge: [
    { naziv: "Žensko šišanje", kategorija: "Kosa", cijena: 25, trajanje: 45 },
    { naziv: "Farbanje", kategorija: "Kosa", cijena: 70, trajanje: 120 },
    { naziv: "Manikir", kategorija: "Nokti", cijena: 20, trajanje: 45 },
    { naziv: "Gel lak", kategorija: "Nokti", cijena: 30, trajanje: 60 },
    { naziv: "Pedikir", kategorija: "Nokti", cijena: 25, trajanje: 60 },
    { naziv: "Oblikovanje obrva", kategorija: "Obrve i trepavice", cijena: 10, trajanje: 20 },
    { naziv: "Trepavice", kategorija: "Obrve i trepavice", cijena: 60, trajanje: 120 },
    { naziv: "Njega lica", kategorija: "Lice", cijena: 40, trajanje: 60 },
  ],

  naslovniSnimak: telefon(`${p}/app-pocetna.webp`, "Aplikacija salona", "Početna"),

  zakazivanje: [
    telefon(`${p}/app-usluga.webp`, "1. Usluga", "Klijentica bira šta želi."),
    telefon(`${p}/app-radnik.webp`, "2. Stilistica", "Kod koje dolazi, ili „bilo koja od nas“."),
    telefon(`${p}/app-termin.webp`, "3. Termin", "Samo stvarno slobodna vremena."),
    telefon(`${p}/app-potvrda.webp`, "4. Poslano", "Vi potvrđujete, klijentica dobija obavijest."),
  ],

  napomena:
    "Snimci ekrana su iz demo salona (Lumière Beauty Studio) i prikazuju izmišljene podatke: imena, klijentice, usluge i termine. Cjenovnik je primjer koji vi mijenjate. Vaša verzija nosi ime, logo, boje i fotografije vašeg salona.",
});
