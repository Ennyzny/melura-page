"use client";

import { useState } from "react";
import { Check } from "lucide-react";

type Plan = {
  name: string;
  tagline: string;
  monthly: { price: string; note: string };
  setup: { price: string; note: string };
  features: string[];
  highlight?: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    tagline: "Za salone koji počinju sa online bookingom",
    monthly: { price: "149 KM", note: "mjesečno · 0 KM setup" },
    setup: { price: "99 KM", note: "mjesečno + 1.490 KM setup" },
    features: [
      "Android aplikacija u Google Playu",
      "Web booking link + QR kod",
      "Admin aplikacija",
      "Push obavijesti i podsjetnici",
      "Do 2 radnika, do 15 usluga",
      "Osnovni branding",
    ],
  },
  {
    name: "Pro",
    tagline: "Za salone sa timom i stalnom klijentelom",
    monthly: { price: "209 KM", note: "mjesečno · 0 KM setup" },
    setup: { price: "179 KM", note: "mjesečno + 2.290 KM setup" },
    features: [
      "Sve iz Startera",
      "iOS aplikacija u App Storeu",
      "Do 6 radnika, do 50 usluga",
      "Naprednije teme",
      "Galerija radova",
      "Prioritetna podrška",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    tagline: "Za lance i salone sa posebnim zahtjevima",
    monthly: { price: "Po dogovoru", note: "prilagođena ponuda" },
    setup: { price: "od 299 KM", note: "mjesečno + od 3.990 KM setup" },
    features: [
      "Sve iz Pro paketa",
      "Custom dizajn aplikacije",
      "Vlastiti domen",
      "VIP termini i lista čekanja",
      "Custom funkcije",
      "Dedicirana podrška",
    ],
  },
];

export function Pricing() {
  const [mode, setMode] = useState<"monthly" | "setup">("monthly");

  return (
    <section id="cijene" className="bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-coral">Cijene</p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl">
            Jednostavne cijene, bez iznenađenja
          </h2>
          <p className="mt-5 text-lg text-ink-soft">
            Bez provizije po terminu i bez SMS troškova. Cijene za frizerske i
            beauty salone.
          </p>

          <div
            role="radiogroup"
            aria-label="Model plaćanja"
            className="mt-8 inline-flex rounded-full bg-white p-1 ring-1 ring-line"
          >
            {(
              [
                ["monthly", "Bez setup troška"],
                ["setup", "Setup + niža mjesečna"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                role="radio"
                aria-checked={mode === value}
                onClick={() => setMode(value)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors sm:text-[15px] ${
                  mode === value ? "bg-ink text-white" : "text-ink-soft hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((p) => {
            const price = p[mode];
            return (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-2xl p-8 ${
                  p.highlight
                    ? "bg-night text-white shadow-2xl lg:-my-4 lg:py-12"
                    : "border border-line bg-white"
                }`}
              >
                {p.highlight && (
                  <span className="eyebrow absolute -top-3 left-8 rounded-full bg-coral px-3 py-1 text-[11px] text-white">
                    Najpopularniji
                  </span>
                )}
                <h3 className="font-display text-3xl font-bold uppercase">{p.name}</h3>
                <p className={`mt-1 ${p.highlight ? "text-white/60" : "text-ink-soft"}`}>
                  {p.tagline}
                </p>
                <p className="mt-8 font-display text-5xl font-bold">{price.price}</p>
                <p className={`mt-1 text-sm ${p.highlight ? "text-white/60" : "text-muted"}`}>
                  {price.note}
                </p>
                <a
                  href="#demo"
                  className={`mt-8 rounded-full py-3.5 text-center font-semibold transition-colors ${
                    p.highlight
                      ? "bg-coral text-white hover:bg-coral-dark"
                      : "bg-ink text-white hover:bg-navy"
                  }`}
                >
                  {p.name === "Premium" ? "Kontaktirajte nas" : "Zakaži demo"}
                </a>
                <ul className="mt-8 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <Check
                        className={`mt-0.5 h-5 w-5 shrink-0 ${
                          p.highlight ? "text-coral" : "text-navy"
                        }`}
                        strokeWidth={2.5}
                      />
                      <span className={p.highlight ? "text-white/90" : ""}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-muted">
          Cijene su za vertikale frizer/barber i beauty. Masaža, fizioterapija i
          stomatologija imaju posebne pakete. Ugovor na minimalno 12 mjeseci.
        </p>
      </div>
    </section>
  );
}
