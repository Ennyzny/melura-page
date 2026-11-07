import { opsta, racunar, telefon } from "./opsta";

// Opšta pozivnica za masažu i SPA (`/invitations/masaza`). Snimci su iz demo studija „Studio
// Masaže Lotos" sa izmišljenim podacima, u `public/invitations/masaza/`. Rječnik vertikale:
// klijent, terapeut, tretman. Klijent uvijek bira terapeuta (nema „bilo ko od nas").
// Nema tvrdnji o liječenju, zdravlju ni ishodima: Melura vodi termine, ne terapiju.

const p = "/invitations/masaza";

export const masazaPozivnica = opsta({
  slug: "masaza",

  salon: { ime: "vaš studio", genitiv: "vašeg studija", dativ: "vašem studiju" },

  rjecnik: { usluge: "Tretmani", zakazi: "Rezerviši tretman" },

  naslov: "Telefon ne mora zvoniti usred tretmana.",

  uvod:
    "Melura je alat za vođenje cijelog studija: kartoteka klijenata sa historijom dolazaka, raspored terapeuta, pregled dana i zarade, i aplikacija u kojoj klijenti sami rezervišu tretman, pod imenom vašeg studija. Ispod je primjer kako to izgleda, a cjenovnik možete odmah prepisati po svome.",

  koristi: [
    {
      naslov: "Historija svakog klijenta na jednom mjestu",
      danas: "Ko dolazi redovno, koji tretman je radio zadnji put i šta je tražio da se izbjegne, to se pamti ili piše u svesku.",
      sa: "Svaki klijent ima historiju dolazaka sa tretmanima i datumima, broj nedolazaka i napomene uz termine. Uz rezervaciju klijent može ostaviti napomenu za terapeuta, a iz profila zakažete sljedeći termin ili ga pozovete jednim dodirom.",
      snimak: racunar(`${p}/melura-klijenti.webp`, "Klijenti u Meluri", "Historija dolazaka i nedolasci"),
    },
    {
      naslov: "Pregled dana i zarade",
      danas: "Raspored je u telefonu, svesci i glavi, a koliko je dan donio, znate tek uveče.",
      sa: "U Meluri vidite ko dolazi, šta čeka potvrdu, naplaćeno i prognozu dana, popunjenost svakog terapeuta i najveću rupu u rasporedu. Kalendar po danu, sedmici i mjesecu.",
      snimak: racunar(`${p}/melura-danas.webp`, "Danas u Meluri", "Pregled dana studija"),
    },
    {
      naslov: "Terapeuti i pravila studija pod kontrolom",
      danas: "Ko radi kada, ko ima pauzu i kad je studio zatvoren, dogovara se usmeno.",
      sa: "Smjene i pauze po terapeutu, blokade za godišnji odmor ili isporuku materijala, trajanje svakog tretmana. Sve je na jednom mjestu i vidi se u rasporedu.",
      snimak: racunar(`${p}/melura-osoblje.webp`, "Osoblje u Meluri", "Smjene po terapeutu"),
    },
    {
      naslov: "Klijenti rezervišu sami",
      danas: "Termini se dogovaraju pozivima, a telefon zvoni baš kad su vam ruke zauzete.",
      sa: "Klijent u aplikaciji bira tretman i terapeuta, vidi samo stvarno slobodne termine i rezerviše sam, i u nedjelju uveče. Link za rezervaciju stavite na Instagram i Facebook.",
      snimak: telefon(`${p}/app-termin.webp`, "Izbor termina", "Samo stvarno slobodna vremena"),
    },
    {
      naslov: "Zaboravljeni termini više ne moraju ostati prazni",
      danas: "Kad klijent zaboravi tretman od sat vremena, taj sat ostane prazan.",
      sa: "Aplikacija automatski šalje podsjetnik dan prije i nekoliko sati prije termina, bez SMS troškova. A kad neko otkaže, klijenti sa liste čekanja odmah dobiju obavijest da se oslobodio termin.",
      snimak: telefon(`${p}/app-obavijesti.webp`, "Obavijesti", "Potvrda i podsjetnik"),
    },
    {
      naslov: "Zahtjev potvrđujete jednim dodirom",
      danas: "Svaka poruka sa pitanjem za termin traži odgovor, a vi ste usred tretmana.",
      sa: "Zahtjevi za termin stižu na jedno mjesto, a vi ih potvrđujete jednim dodirom kad vam odgovara. Ako želite, uključite automatsku potvrdu. Klijent dobija obavijest čim odlučite.",
      snimak: telefon(`${p}/melura-zahtjevi.webp`, "Zahtjevi u Meluri", "Potvrda jednim dodirom"),
    },
    {
      naslov: "Vaše ime, vaše recenzije",
      danas: "Na platformama za zakazivanje studio stoji u listi pored konkurencije, a od termina ide provizija.",
      sa: "Aplikacija nosi ime vašeg studija, sa vašim logom i fotografijama. Klijenti ocjenjuju posjetu, a vi odlučujete koje recenzije su vidljive. Bez provizije po terminu.",
      snimak: telefon(`${p}/app-pocetna.webp`, "Aplikacija studija", "Ime, fotografije i cjenovnik"),
    },
  ],

  usluge: [
    { naziv: "Relax masaža 30 min", kategorija: "Masaže", cijena: 25, trajanje: 30 },
    { naziv: "Relax masaža 60 min", kategorija: "Masaže", cijena: 45, trajanje: 60 },
    { naziv: "Masaža leđa", kategorija: "Masaže", cijena: 25, trajanje: 30 },
    { naziv: "Antistres masaža", kategorija: "Masaže", cijena: 35, trajanje: 45 },
    { naziv: "Masaža glave i vrata", kategorija: "Masaže", cijena: 15, trajanje: 20 },
    { naziv: "Aromaterapija", kategorija: "Njega", cijena: 50, trajanje: 60 },
    { naziv: "Limfna drenaža", kategorija: "Njega", cijena: 50, trajanje: 60 },
    { naziv: "Masaža stopala", kategorija: "Njega", cijena: 20, trajanje: 30 },
  ],

  naslovniSnimak: telefon(`${p}/app-pocetna.webp`, "Aplikacija studija", "Početna"),

  zakazivanje: [
    telefon(`${p}/app-usluga.webp`, "1. Tretman", "Klijent bira šta želi."),
    telefon(`${p}/app-radnik.webp`, "2. Terapeut", "Klijent bira kod koga dolazi."),
    telefon(`${p}/app-termin.webp`, "3. Termin", "Samo stvarno slobodna vremena."),
    telefon(`${p}/app-potvrda.webp`, "4. Poslano", "Vi potvrđujete, klijent dobija obavijest."),
  ],

  napomena:
    "Snimci ekrana su iz demo studija (Studio Masaže Lotos) i prikazuju izmišljene podatke: imena, klijente, tretmane i termine. Cjenovnik je primjer koji vi mijenjate. Vaša verzija nosi ime, logo, boje i fotografije vašeg studija.",
});
