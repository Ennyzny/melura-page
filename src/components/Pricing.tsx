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
    monthly: { price: "149 KM", note: "mjesečno · 0 KM setup · ugovor min. 12 mjeseci" },
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
    monthly: { price: "209 KM", note: "mjesečno · 0 KM setup · ugovor min. 12 mjeseci" },
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
      "VIP termini i lista čekanja (uskoro)",
      "Custom funkcije",
      "Dedicirana podrška",
    ],
  },
];

export function Pricing() {
  const [mode, setMode] = useState<"monthly" | "setup">("monthly");

  return (
    <section id="cijene" className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Jednostavne cijene, bez iznenađenja
          </h2>
          <p className="mt-5 text-lg text-ink-soft">
            Bez provizije po terminu i bez SMS troškova. Cijene za frizerske i
            beauty salone.
          </p>

          <div
            role="group"
            aria-label="Model plaćanja"
            className="mt-8 inline-flex rounded-full bg-fog p-1"
          >
            {(
              [
                ["monthly", "Bez setup troška"],
                ["setup", "Setup + niža mjesečna"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={mode === value}
                onClick={() => setMode(value)}
                className={`min-h-11 rounded-full px-5 py-2 text-sm font-semibold transition-colors sm:text-[15px] ${
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
                    ? "bg-ink text-white"
                    : "bg-fog"
                }`}
              >
                {p.highlight && (
                  <span className="absolute right-6 top-6 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                    Android + iOS
                  </span>
                )}
                <h3 className="text-2xl font-bold">{p.name}</h3>
                <p className={`mt-1 ${p.highlight ? "text-white/60" : "text-ink-soft"}`}>
                  {p.tagline}
                </p>
                <p className="mt-8 text-4xl font-bold tracking-tight">{price.price}</p>
                <p className={`mt-1 text-sm ${p.highlight ? "text-white/60" : "text-muted"}`}>
                  {price.note}
                </p>
                <a
                  href="#demo"
                  className={`mt-8 rounded-full py-3.5 text-center font-semibold transition-colors ${
                    p.highlight
                      ? "bg-white text-ink hover:bg-fog"
                      : "bg-ink text-white hover:bg-ink-soft"
                  }`}
                >
                  Zakaži demo
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
          Cijene su za frizerske salone, barber shopove i beauty salone. Paketi za masažu,
          fizioterapiju i stomatologiju su u pripremi.
        </p>
      </div>
    </section>
  );
}
