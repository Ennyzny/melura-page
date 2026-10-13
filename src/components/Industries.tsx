"use client";

import { useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

// planned: djelatnosti koje po planu dolaze nakon frizera i beauty salona (Faza 2 i 3).
type Industry = { name: string; img: string; planned?: boolean };

const row1: Industry[] = [
  { name: "Frizerski salon", img: "frizerski" },
  { name: "Nokti", img: "nokti" },
  { name: "Barber shop", img: "barber" },
  { name: "Obrve i trepavice", img: "obrve" },
  { name: "Kozmetički salon", img: "kozmetika" },
  { name: "Stomatologija", img: "stomatologija", planned: true },
];

const row2: Industry[] = [
  { name: "Masaža", img: "masaza", planned: true },
  { name: "SPA", img: "spa", planned: true },
  { name: "Fizioterapija", img: "fizio", planned: true },
  { name: "Tattoo i piercing", img: "tattoo", planned: true },
  { name: "Ordinacije", img: "ordinacija", planned: true },
  { name: "Saloni za ljubimce", img: "ljubimci", planned: true },
];

function Row({ items, direction }: { items: Industry[]; direction: "left" | "right" }) {
  const doubled = [...items, ...items];
  return (
    <div className="group overflow-hidden">
      <ul
        className={`flex w-max gap-6 group-hover:[animation-play-state:paused] ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {doubled.map(({ name, img, planned }, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length}
            className="relative h-48 w-[310px] shrink-0 overflow-hidden rounded-xl bg-night"
          >
            <Image
              src={`/industries/${img}.jpg`}
              alt=""
              width={800}
              height={520}
              sizes="310px"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            {planned && (
              <span className="absolute right-3 top-3 rounded-full bg-white px-2.5 py-0.5 text-[13px] font-semibold text-ink">
                Uskoro
              </span>
            )}
            <span className="absolute bottom-4 left-4 text-xl font-bold text-white">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Industries() {
  const [paused, setPaused] = useState(false);
  return (
    <section id="djelatnosti" className="bg-fog py-24 sm:py-32">
      <div className="px-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Napravljeno za salone poput vašeg
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg">
          Danas za frizerske salone, barber shopove i beauty salone. Ostale uslužne djelatnosti dolaze uskoro.
        </p>
      </div>
      <div className={`mt-14 space-y-6 ${paused ? "marquee-paused" : ""}`}>
        <Row items={row1} direction="left" />
        <Row items={row2} direction="right" />
      </div>
      <div className="mt-6 flex justify-center px-4">
        <button
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((v) => !v)}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-5 text-[15px] font-semibold transition-colors hover:border-ink/30"
        >
          {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
          {paused ? "Pokreni traku" : "Zaustavi traku"}
        </button>
      </div>
    </section>
  );
}
