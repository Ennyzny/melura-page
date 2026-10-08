"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { DEMO_EMAIL } from "@/lib/site";

const fields = [
  { name: "ime", label: "Ime i prezime", type: "text", autoComplete: "name", required: true },
  { name: "salon", label: "Naziv salona", type: "text", autoComplete: "organization", required: true },
  { name: "kontakt", label: "Telefon ili email", type: "text", autoComplete: "tel", required: true },
  { name: "grad", label: "Grad", type: "text", autoComplete: "address-level2", required: false },
] as const;

export function DemoForm({
  className = "mx-auto mt-10 grid max-w-xl gap-4 rounded-3xl bg-white p-6 text-left text-ink shadow-2xl sm:grid-cols-2 sm:p-8",
}: { className?: string }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const v = (k: string) => String(data.get(k) ?? "").trim();
    const subject = `Zahtjev za demo — ${v("salon")}`;
    const body = [
      `Ime i prezime: ${v("ime")}`,
      `Salon: ${v("salon")}`,
      `Telefon / email: ${v("kontakt")}`,
      v("grad") && `Grad: ${v("grad")}`,
      v("poruka") && `\n${v("poruka")}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${DEMO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={className}
    >
      {fields.map((f) => (
        <label key={f.name} className="grid gap-1.5 text-[15px] font-semibold">
          <span>
            {f.label}
            {!f.required && <span className="font-normal text-muted"> (opcionalno)</span>}
          </span>
          <input
            name={f.name}
            type={f.type}
            autoComplete={f.autoComplete}
            required={f.required}
            className="h-12 rounded-xl border border-line bg-fog px-4 text-base font-normal focus:border-ink"
          />
        </label>
      ))}
      <label className="grid gap-1.5 text-[15px] font-semibold sm:col-span-2">
        <span>
          Napomena <span className="font-normal text-muted">(opcionalno)</span>
        </span>
        <textarea
          name="poruka"
          rows={3}
          placeholder="Npr. broj radnika ili kada vam odgovara poziv"
          className="rounded-xl border border-line bg-fog px-4 py-3 text-base font-normal focus:border-ink"
        />
      </label>
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-[17px] font-semibold text-white transition-colors hover:bg-ink-soft sm:col-span-2"
      >
        Zakaži demo <ArrowRight className="h-5 w-5" />
      </button>
      <p aria-live="polite" className="text-center text-sm text-ink-soft sm:col-span-2">
        {sent ? (
          <>Otvorili smo vaš email s popunjenim zahtjevom — samo ga pošaljite. Ako se nije otvorio, pišite na </>
        ) : (
          <>Forma otvara vaš email s popunjenim zahtjevom. Možete pisati i direktno na </>
        )}
        <a href={`mailto:${DEMO_EMAIL}`} className="font-semibold text-ink underline">
          {DEMO_EMAIL}
        </a>
        .
      </p>
    </form>
  );
}
