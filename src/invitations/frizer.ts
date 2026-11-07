import { opsta, racunar, telefon } from "./opsta";

// Opšta pozivnica za frizerske salone i barber shopove: jedan link za sve male salone te
// vertikale (`/invitations/frizer`), bez imena, logotipa i fotografija.
//
// Snimci su isti kao na landingu (`public/screens/`): demo salon Oštrica Barber Studio sa
// izmišljenim podacima, pa nema tuđih fotografija ni imena.

export const frizerPozivnica = opsta({
  slug: "frizer",

  salon: { ime: "vaš salon", genitiv: "vašeg salona", dativ: "vašem salonu", boje: { primarna: "#c9a961", tamna: "#111111" } },

  oznaka: "Pozvani ste: dopustite da vam olakšamo posao",

  naslov: "Koliko vas je ove sedmice koštala prazna stolica?",
  naglasak: "prazna stolica",

  uvod:
    "Klijenti zaborave termin, telefon zvoni usred šišanja, a raspored živi u svesci. Sa Melurom klijenti sami zakazuju samo slobodne termine, podsjetnik im stiže dan prije, a kad neko otkaže, klijenti sa liste čekanja odmah dobiju obavijest. Vi samo šišate.",

  pozadina: "/invitations/frizer/hero.webp",

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
      snimak: telefon("/screens/phone/o-vrijeme.webp", "Izbor termina", "Samo stvarno slobodna vremena"),
    },
    {
      naslov: "Zaboravljeni termini više ne moraju ostati prazni",
      danas: "Kad neko zaboravi termin, stolica ostane prazna sat i po do dva.",
      sa: "Aplikacija automatski šalje podsjetnik dan prije i nekoliko sati prije termina, bez SMS troškova. Kad neko otkaže, klijenti sa liste čekanja odmah dobiju obavijest. Zahtjev potvrđujete jednim dodirom ili uključite automatsku potvrdu.",
      snimak: telefon("/screens/phone/o-melura-zahtjevi.webp", "Zahtjevi u Meluri", "Potvrda jednim dodirom"),
    },
    {
      naslov: "Vaše ime, vaše recenzije",
      danas: "Na platformama za zakazivanje salon stoji u listi pored konkurencije, a od termina ide provizija.",
      sa: "Aplikacija nosi ime vašeg salona, sa vašim logom i fotografijama. Klijenti ocjenjuju posjetu, a vi odlučujete koje recenzije su vidljive. Bez provizije po terminu.",
      snimak: telefon("/screens/phone/o-pocetna.webp", "Aplikacija salona", "Ime, fotografije i cjenovnik"),
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

  naslovniSnimak: telefon("/screens/phone/o-pocetna.webp", "Aplikacija salona", "Početna"),

  zakazivanje: [
    telefon("/screens/phone/o-usluga.webp", "1. Usluga", "Klijent bira šta želi."),
    telefon("/screens/phone/o-majstor.webp", "2. Radnik", "Kod koga dolazi, ili „bilo ko od nas“."),
    telefon("/screens/phone/o-vrijeme.webp", "3. Termin", "Samo stvarno slobodna vremena."),
    telefon("/screens/phone/o-potvrda.webp", "4. Poslano", "Vi potvrđujete, klijent dobija obavijest."),
  ],

  napomena:
    "Snimci ekrana su iz demo salona (Oštrica Barber Studio) i prikazuju izmišljene podatke: imena, klijente, usluge i termine. Cjenovnik je primjer koji vi mijenjate. Vaša verzija nosi ime, logo, boje i fotografije vašeg salona.",
});
