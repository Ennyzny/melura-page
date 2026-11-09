import type { Pozivnica } from "./tipovi";
import { racunar, telefon } from "./opsta";

// Lična pozivnica za Lotus Salon (Zenica), Tier A: Google Mape 4,9 na osnovu 224 recenzije,
// Lotus Beauty Academy, rezervacije kroz formu na webu, WhatsApp, Instagram i telefon. Vlasnik
// nije javno naveden, pa se naslov ne obraća imenom. Javni izvori: lotussalonbeauty.com (usluge,
// cijene, trajanje, radno vrijeme, fotografije), Google Mape, Facebook stranica „Salon za njegu
// tijela "Lotus"" i Instagram lotus.salon1 (2026-11-09). Snimci su iz demo salona sa izmišljenim
// klijenticama, timom i terminima, u `public/invitations/lotus/`.

const p = "/invitations/lotus";

export const lotusPozivnica: Pozivnica = {
  slug: "lotus",
  datum: "2026-11-09",

  salon: {
    ime: "Lotus Salon",
    genitiv: "salona Lotus",
    dativ: "salonu Lotus",
    vrsta: "Salon za njegu tijela",
    grad: "Zenica",
    adresa: "Prve zeničke brigade 9",
    telefon: "060 325 2029",
    logo: `${p}/logo.webp`,
    fotografija: `${p}/salon.webp`,
    boje: { primarna: "#de6f91", tamna: "#2b1822" },
  },

  rjecnik: { usluge: "Tretmani", zakazi: "Rezerviši termin" },

  naslov: "Rezervacije vam stižu na četiri mjesta. Ko ih sabira?",
  naglasak: "Ko ih sabira?",

  uvod:
    "Vodite salon sa više od dvadeset tretmana, masažama, hidžamom i Lotus Beauty Academy, a termini se dogovaraju kroz formu na webu, WhatsApp, poruke na Instagramu i telefon, često usred tretmana. Sa Melurom klijentica vidi slobodne termine kod svake terapeutkinje i sama rezerviše, vi potvrdite jednim dodirom, a podsjetnik joj stiže prije dolaska.",

  zakljucak:
    "Napravili smo demo aplikaciju sa imenom, bojama i cjenovnikom vašeg salona. Pogledajte ispod šta sve dobijate.",

  koristi: [
    {
      naslov: "Historija svake klijentice na jednom mjestu",
      danas: "Ko dolazi redovno, na koji tretman i kad je zadnji put bila na masaži ili čišćenju lica, to se pamti ili piše u bilježnicu.",
      sa: "Svaka klijentica ima historiju dolazaka sa uslugama i datumima, broj nedolazaka i napomene uz termine, na primjer alergije ili da ne podnosi jak pritisak. Iz profila zakažete sljedeći termin ili je pozovete jednim dodirom.",
      dokaz: "Ocjena 4,9 na osnovu 224 recenzije na Google Mapama: klijentice se vraćaju.",
      snimak: racunar(`${p}/melura-klijenti.webp`, "Klijentice u Meluri", "Historija dolazaka i nedolasci"),
    },
    {
      naslov: "Pregled dana i zarade",
      danas: "Termini su u telefonu, bilježnici i glavi, a koliko je dan donio, znate tek kad uveče saberete.",
      sa: "U Meluri vidite ko dolazi, šta čeka potvrdu, naplaćeno i prognozu dana, popunjenost svake terapeutkinje i najveću rupu u rasporedu. Kalendar po danu, sedmici i mjesecu.",
      snimak: racunar(`${p}/melura-danas.webp`, "Danas u Meluri", "Pregled dana salona"),
    },
    {
      naslov: "Tim, edukacije i pravila salona pod kontrolom",
      danas: "Kad se drži edukacija ili se ide na kućnu adresu, a salon radi, ko preuzima klijentice dogovara se usmeno.",
      sa: "Smjene i pauze po terapeutu, blokade za edukaciju ili izlazak na teren, trajanje svake usluge. Relax masaža od sat vremena, hot stone od 45 minuta i Hydrafacial ne traju isto, a sve se vidi u rasporedu.",
      dokaz: "Lotus Beauty Academy: više od 500 održanih edukacija, kako piše na vašem webu.",
      snimak: racunar(`${p}/melura-osoblje.webp`, "Osoblje u Meluri", "Smjene po terapeutu"),
    },
    {
      naslov: "Rezervacije sa četiri mjesta na jedno",
      danas: "Zahtjev stiže kroz formu na webu, WhatsApp, poruku na Instagramu ili poziv, pa ga treba prepisati u raspored.",
      sa: "Klijentica u aplikaciji vidi samo stvarno slobodne termine i rezerviše sama, i u nedjelju uveče. Link stavite na web, u bio na Instagramu i u WhatsApp poruku. Zahtjev potvrđujete jednim dodirom, ili uključite automatsku potvrdu.",
      dokaz: "Web, WhatsApp, Instagram i telefon: četiri mjesta, jedan raspored.",
      snimak: telefon(`${p}/app-termin.webp`, "Izbor termina", "Samo stvarno slobodna vremena"),
    },
    {
      naslov: "Zaboravljeni termini više ne moraju ostati prazni",
      danas: "Kad klijentica zaboravi masažu od sat vremena ili Hydrafacial, terapeutkinja čeka praznu sobu.",
      sa: "Aplikacija automatski šalje podsjetnik dan prije i nekoliko sati prije termina, bez SMS troškova. A kad neko otkaže, klijentice sa liste čekanja odmah dobiju obavijest da se oslobodio termin.",
      snimak: telefon(`${p}/app-obavijesti.webp`, "Obavijesti", "Potvrda i podsjetnik"),
    },
    {
      naslov: "Vaše ime, vaš izgled",
      danas: "Zakazivanje ide formom i porukama, pa klijentica nema jednu aplikaciju sa vašim imenom u kojoj vidi termine i cjenovnik.",
      sa: "Aplikacija nosi ime vašeg salona, sa vašim logom, bojama i cjenovnikom. Klijentice ocjenjuju posjetu, a vi odlučujete koje recenzije su vidljive. Bez provizije po terminu.",
      snimak: telefon(`${p}/app-pocetna.webp`, "Aplikacija salona", "Ime, fotografije i cjenovnik"),
    },
  ],

  usluge: [
    { naziv: "Hydrafacial 7u1", kategorija: "Lice", cijena: 80, trajanje: 60, slika: `${p}/hydrafacial.webp` },
    { naziv: "Dubinsko čišćenje lica", kategorija: "Lice", cijena: 35, trajanje: 45, slika: `${p}/ciscenje.webp` },
    { naziv: "Relax masaža", kategorija: "Masaže", cijena: 50, trajanje: 60, slika: `${p}/relax.webp` },
    { naziv: "Sportska masaža", kategorija: "Masaže", cijena: 70, trajanje: 60, slika: `${p}/sportska.webp` },
    { naziv: "Hot Stone masaža", kategorija: "Masaže", cijena: 45, trajanje: 45, slika: `${p}/hotstone.webp` },
    { naziv: "Mokra hidžama", kategorija: "Hidžama", cijena: 40, trajanje: 45, slika: `${p}/hidzama.webp` },
    { naziv: "Anticelulitna masaža", kategorija: "Tijelo", cijena: 30, trajanje: 30, slika: `${p}/madero.webp` },
  ],

  naslovniSnimak: telefon(`${p}/app-pocetna.webp`, "Aplikacija salona", "Početna"),

  zakazivanje: [
    telefon(`${p}/app-usluga.webp`, "1. Tretman", "Klijentica bira šta želi."),
    telefon(`${p}/app-radnik.webp`, "2. Terapeut", "Kod koga dolazi, ili „bilo ko od nas“."),
    telefon(`${p}/app-termin.webp`, "3. Termin", "Samo stvarno slobodna vremena."),
    telefon(`${p}/app-potvrda.webp`, "4. Poslano", "Vi potvrđujete, klijentica dobija obavijest."),
  ],

  zastoVi:
    "Javljamo se vama jer vas je na Google Mapama ocijenilo 224 klijentica ocjenom 4,9, držite Lotus Beauty Academy, a rezervacije vam stižu na više mjesta odjednom. A jedan od nas studira u vašoj Zenici.",

  napomena:
    "Ime, adresa, telefon, radno vrijeme, usluge, cijene, trajanje i fotografije su sa vašeg weba i javnih profila (lotussalonbeauty.com, Google Mape, Facebook i Instagram). Snimci ekrana su iz demo aplikacije napravljene za Lotus Salon i prikazuju izmišljene podatke: klijentice, članove tima i termine. Cjenovnik je primjer sa vašeg weba koji vi mijenjate. Vaša verzija nosi vaše stvarne podatke.",
};
