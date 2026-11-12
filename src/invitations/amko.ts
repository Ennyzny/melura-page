import type { Pozivnica } from "./tipovi";
import { racunar, telefon } from "./opsta";

// Lična pozivnica za Amko The Barber (Vitez). Javni izvori (2026-11-12): Google Mape (5,0,
// Ilije Petrovića, 062 596 252), Instagram barber.shop.amkothebarber (cjenovnik važeći od
// 01.03.2026 sa pravilom o nedolasku), Facebook „BarberShop Amko The Barber", vitez.info
// (otvorenje 03.02.2025, radno vrijeme) i viteski.ba (treće mjesto u BiH sa 17 godina).
// Amar Skopljak je drugi barber po Hamzi. Cijene su njegove, trajanja usluga su pretpostavka.
// Snimci Melure su iz demo builda sa izmišljenim klijentima; snimci aplikacije sa telefona.
// Poslije deploya provjeriti: 200, noindex i `og:image` na produkcijskoj domeni.

const p = "/invitations/amko";

export const amkoPozivnica: Pozivnica = {
  slug: "amko",
  datum: "2026-11-12",

  salon: {
    ime: "Amko The Barber",
    genitiv: "salona Amko The Barber",
    dativ: "salonu Amko The Barber",
    vlasnik: "Amrudin Topčić",
    vrsta: "Barber shop",
    grad: "Vitez",
    adresa: "Ilije Petrovića bb",
    telefon: "062 596 252",
    logo: `${p}/logo.webp`,
    fotografija: `${p}/salon.webp`,
    boje: { primarna: "#E3B23C", tamna: "#0D0D0D" },
  },

  pozadina: `${p}/salon-unutra.webp`,

  naslov: "Amko, termini, klijenti i pravila vašeg salona na jednom mjestu.",
  naglasak: "na jednom mjestu.",

  uvod:
    "Termini se danas dogovaraju putem WhatsAppa, Instagrama i telefona, a pravilo o otkazivanju najmanje dva sata unaprijed navedeno je na vašem cjenovniku. Melura objedinjuje evidenciju klijenata, raspored za vas i Amara, automatske podsjetnike i rok za otkazivanje u jednom alatu za vođenje salona.",

  zakljucak:
    "Za vas smo pripremili demo aplikaciju sa imenom, logom, cjenovnikom i fotografijama vašeg salona. U nastavku je pregled funkcija.",

  koristi: [
    {
      naslov: "Evidencija klijenata sa historijom dolazaka",
      danas: "Podaci o redovnim klijentima, njihovim uslugama i propuštenim terminima ne vode se na jednom mjestu.",
      sa: "Svaki klijent ima historiju dolazaka sa uslugama i datumima, broj nedolazaka i napomene uz termin. Iz profila klijenta možete zakazati sljedeći termin ili ga direktno pozvati.",
      dokaz: "Ocjena 5,0 na Google Mapama i 1.500 pratilaca na Instagramu.",
      snimak: racunar(`${p}/melura-klijenti.webp`, "Klijenti u Meluri", "Historija dolazaka i nedolasci"),
    },
    {
      naslov: "Pregled dana i zarade",
      danas: "Dnevni promet i popunjenost termina poznati su tek na kraju radnog dana.",
      sa: "Melura prikazuje naredne termine, zahtjeve koji čekaju potvrdu, naplaćeni iznos i prognozu dana, kao i popunjenost svakog barbera.",
      snimak: racunar(`${p}/melura-danas.webp`, "Danas u Meluri", "Pregled dana salona"),
    },
    {
      naslov: "Raspored po barberu",
      danas: "Raspored se dogovara usmeno, a radno vrijeme se razlikuje po danima (petkom od 11 do 19).",
      sa: "Svaki barber ima vlastitu kolonu u kalendaru, sa smjenama i pauzama. Radno vrijeme se podešava po danu, a trajanje po usluzi, uz mogućnost blokiranja termina za edukacije ili druge obaveze.",
      snimak: racunar(`${p}/melura-kalendar.webp`, "Kalendar u Meluri", "Kolona po barberu"),
    },
    {
      naslov: "Online zakazivanje",
      danas: "Termini se dogovaraju porukama i pozivima, najčešće u toku rada.",
      sa: "Klijent u aplikaciji vidi samo slobodne termine i zakazuje samostalno, u bilo koje doba dana. Link za zakazivanje možete postaviti na Instagram profil. Zahtjeve potvrđujete jednim dodirom ili uključujete automatsku potvrdu.",
      snimak: racunar(`${p}/melura-zahtjevi.webp`, "Zahtjevi u Meluri", "Potvrda jednim dodirom"),
    },
    {
      naslov: "Podsjetnici i rok za otkazivanje",
      danas: "Pravilo o nedolasku navedeno je na cjenovniku, ali njegovo poštivanje zavisi od ručnog podsjećanja klijenata.",
      sa: "Aplikacija automatski šalje podsjetnik dan prije i nekoliko sati prije termina, bez troškova SMS poruka. Otkazivanje je moguće do roka koji odredite, a nedolazak se evidentira uz profil klijenta. Kada se termin oslobodi, klijenti sa liste čekanja dobijaju obavijest.",
      dokaz: "Vaš cjenovnik: otkazivanje minimalno 2 sata ranije.",
      snimak: telefon(`${p}/app-potvrda.webp`, "Status zahtjeva", "Klijent vidi status termina"),
    },
    {
      naslov: "Aplikacija sa imenom vašeg salona",
      danas: "Klijenti nemaju jedno mjesto na kojem vide vaše usluge, cijene i slobodne termine.",
      sa: "Aplikacija nosi ime Amko The Barber, vaš logo i boje, fotografije radova i cjenovnik. Klijenti mogu ocijeniti posjetu, a vi odlučujete koje recenzije su javno vidljive. Bez provizije po terminu.",
      snimak: telefon(`${p}/app-pocetna.webp`, "Aplikacija salona", "Ime, fotografije i cjenovnik"),
    },
  ],

  usluge: [
    { naziv: "Šišanje", kategorija: "Šišanje", cijena: 15, trajanje: 30, slika: `${p}/sisanje.webp` },
    { naziv: "Šišanje sa izbrijavanjem", kategorija: "Šišanje", cijena: 18, trajanje: 40, slika: `${p}/izbrijavanje.webp` },
    { naziv: "Šišanje na jednu dužinu", kategorija: "Šišanje", cijena: 10, trajanje: 20, slika: `${p}/jedna-duzina.webp` },
    { naziv: "Pranje kose", kategorija: "Njega", cijena: 5, trajanje: 10, slika: `${p}/pranje.webp` },
    { naziv: "Brijanje / oblikovanje brade", kategorija: "Brada", cijena: 5, trajanje: 20, slika: `${p}/brada.webp` },
    { naziv: "Konture / skidanje brade mašinicom", kategorija: "Brada", cijena: 3, trajanje: 10, slika: `${p}/konture.webp` },
    { naziv: "Oblikovanje extra duge brade", kategorija: "Brada", cijena: 7, trajanje: 25, slika: `${p}/duga-brada.webp` },
  ],

  naslovniSnimak: telefon(`${p}/app-pocetna.webp`, "Aplikacija salona", "Početna"),

  zakazivanje: [
    telefon(`${p}/app-usluga.webp`, "1. Usluga", "Klijent bira uslugu."),
    telefon(`${p}/app-radnik.webp`, "2. Barber", "Amko, Amar ili prvi slobodan barber."),
    telefon(`${p}/app-termin.webp`, "3. Termin", "Samo stvarno slobodna vremena."),
    telefon(`${p}/app-potvrda.webp`, "4. Poslano", "Nakon vaše potvrde klijent dobija obavijest."),
  ],

  zastoVi:
    "Javljamo se vama jer ste sa 17 godina osvojili treće mjesto na izboru za najboljeg barbera u BiH, a u februaru 2025. ste u Vitezu otvorili vlastiti salon. Salon u razvoju je dobar trenutak za uvođenje uređenog sistema zakazivanja.",

  napomena:
    "Ime, adresa, telefon, opis, logo, boje, cjenovnik i fotografije su sa vaših javnih profila (Google Mape, Facebook i Instagram). Trajanja usluga su naša procjena. Snimci ekrana su iz demo aplikacije napravljene za Amko The Barber: klijenti, termini i treći barber u Meluri su izmišljeni. Vaša verzija nosi vaše stvarne podatke.",
};
