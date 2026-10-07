"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

type Tab = {
  id: string;
  label: string;
  title: string;
  text: string;
  points: string[];
  image: { src: string; alt: string; width: number; height: number };
};

const tabs: Tab[] = [
  {
    id: "kalendar",
    label: "Kalendar",
    title: "Cijeli dan na jednom ekranu",
    text: "Kolona za svakog majstora, termini obojeni po statusu i crvena linija koja pokazuje gdje ste u danu. Pauze i neradno vrijeme su jasno označeni.",
    points: [
      "Dnevni prikaz po radniku",
      "Boje po statusu: potvrđeno, čeka, u toku, završeno",
      "Blokiraj vrijeme, dodaj pauzu ili zatvori dan jednim klikom",
    ],
    image: {
      src: "/screens/admin-kalendar.png",
      alt: "Melura kalendar dana sa kolonama po radniku",
      width: 2880,
      height: 1800,
    },
  },
  {
    id: "zahtjevi",
    label: "Zahtjevi",
    title: "Potvrdite termin za 30 sekundi",
    text: "Kad klijent pošalje zahtjev, slot se privremeno zauzme i vi dobijete obavijest. Jedan dodir potvrđuje, klijent odmah dobija push.",
    points: [
      "Zahtjevi sortirani po vremenu termina",
      "Zaboravljeni zahtjevi automatski istječu i oslobađaju slot",
      "Kod odbijanja klijent odmah dobija obavijest i bira drugi termin",
    ],
    image: {
      src: "/screens/admin-zahtjevi.png",
      alt: "Lista zahtjeva za potvrdu u Melura adminu",
      width: 2880,
      height: 1800,
    },
  },
  {
    id: "klijenti",
    label: "Klijenti",
    title: "Znajte ko vam dolazi",
    text: "Adresar svih klijenata sa historijom termina. Kontakt jednim dodirom preko poziva, Vibera ili WhatsAppa.",
    points: [
      "Profil klijenta uz listu",
      "Historija dolazaka i nedolazaka",
      "Ručno dodavanje klijenata koji zovu telefonom",
    ],
    image: {
      src: "/screens/admin-klijenti.png",
      alt: "Adresar klijenata sa profilom",
      width: 2880,
      height: 1800,
    },
  },
  {
    id: "usluge",
    label: "Usluge",
    title: "Cjenovnik koji se sam održava",
    text: "Dodajte usluge sa cijenom, trajanjem i kategorijom. Promjena cijene se odmah vidi u aplikaciji vašeg salona.",
    points: [
      "Kategorije, opis i fotografija usluge",
      "Trajanje određuje dužinu termina",
      "Deaktivirajte uslugu bez brisanja historije",
    ],
    image: {
      src: "/screens/admin-usluge.png",
      alt: "Usluge i cjenovnik u Melura adminu",
      width: 2880,
      height: 1800,
    },
  },
  {
    id: "osoblje",
    label: "Osoblje",
    title: "Tim, smjene i usluge po radniku",
    text: "Svaki radnik ima svoje usluge i redovni raspored. Klijent vidi samo majstore koji rade traženu uslugu u to vrijeme.",
    points: [
      "Kartice radnika sa fotografijom",
      "Redovni sedmični raspored smjena",
      "Zauzetost po majstoru na pregledu dana",
    ],
    image: {
      src: "/screens/admin-osoblje.png",
      alt: "Osoblje i smjene u Melura adminu",
      width: 2880,
      height: 1800,
    },
  },
  {
    id: "radno-vrijeme",
    label: "Radno vrijeme",
    title: "Radno vrijeme, pauze i praznici",
    text: "Postavite radno vrijeme salona, pauze i neradne dane. Blokirano vrijeme se klijentima nikad ne prikazuje kao slobodno.",
    points: [
      "Radno vrijeme po danu u sedmici",
      "Pauze i neradni dani unaprijed",
      "Pravila: najranije i najkasnije naručivanje, razmak između termina",
    ],
    image: {
      src: "/screens/admin-radno-vrijeme.png",
      alt: "Radno vrijeme i pauze",
      width: 2880,
      height: 1800,
    },
  },
];

export function FeatureTabs() {
  const [active, setActive] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section className="bg-night py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="eyebrow text-coral">Admin aplikacija</p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl">
            Upravljajte salonom
            <br /> s telefona ili računara
          </h2>
          <p className="mt-5 text-lg text-white/70">
            Jedna admin aplikacija za vlasnika: termini, kalendar, klijenti,
            usluge i osoblje. Radi na Androidu, iOS-u i u pregledniku.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Funkcije admin aplikacije"
          className="-mx-4 mt-12 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={t.id === active}
              aria-controls={`panel-${t.id}`}
              onClick={() => setActive(t.id)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-[15px] font-semibold transition-colors ${
                t.id === active
                  ? "bg-white text-ink"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:gap-14"
        >
          <div key={tab.id + "-text"}>
            <h3 className="font-display text-3xl font-bold uppercase leading-tight sm:text-4xl">
              {tab.title}
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/70">{tab.text}</p>
            <ul className="mt-7 space-y-3.5">
              {tab.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-coral">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-white/90">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-xl bg-white/5 p-2 ring-1 ring-white/10">
            <Image
              key={tab.image.src}
              src={tab.image.src}
              alt={tab.image.alt}
              width={tab.image.width}
              height={tab.image.height}
              sizes="(min-width: 1024px) 760px, 100vw"
              className="block h-auto w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
