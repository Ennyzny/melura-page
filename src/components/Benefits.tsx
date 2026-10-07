import { X, Check } from "lucide-react";

const before = [
  "Termini preko Vibera, WhatsAppa, Instagrama i poziva",
  "Stalno ista pitanja: \"Ima li slobodno sutra?\"",
  "Sveska ili Google Calendar koji niko ne ažurira",
  "Dupli termini i klijenti koji zaborave doći",
  "Nema booking linka za Instagram bio",
];

const after = [
  "Svi zahtjevi na jednom mjestu, u realnom vremenu",
  "Klijent sam vidi slobodne termine, 0–24",
  "Kalendar po radniku koji se sam popunjava",
  "Nemoguć dupli termin, push podsjetnici protiv nedolazaka",
  "Vlastita aplikacija, web link i QR kod",
];

const stats = [
  { value: "30 s", label: "do potvrde termina umjesto 4 sata" },
  { value: "0", label: "duplih termina — sistem ih ne dozvoljava" },
  { value: "D-1 · H-3", label: "automatski push podsjetnici" },
  { value: "0 KM", label: "za SMS — push je besplatan" },
];

export function Benefits() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-coral">Zašto Melura</p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl">
            Manje poruka. Više termina.
          </h2>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-8">
            <p className="eyebrow text-muted">Bez Melure</p>
            <ul className="mt-6 space-y-4">
              {before.map((b) => (
                <li key={b} className="flex gap-3 text-ink-soft">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/5">
                    <X className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-navy p-8 text-white">
            <p className="eyebrow text-white/60">Sa Melurom</p>
            <ul className="mt-6 space-y-4">
              {after.map((a) => (
                <li key={a} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-coral">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-coral-soft p-6">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-4xl font-bold text-coral-dark sm:text-5xl">
                {s.value}
              </dd>
              <dd className="mt-2 text-sm text-ink-soft sm:text-base">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
