"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { DEMO_EMAIL, WEB3FORMS_KEY } from "@/lib/site";

const fields = [
  { name: "ime", label: "Ime i prezime", type: "text", autoComplete: "name", required: true },
  { name: "salon", label: "Naziv salona", type: "text", autoComplete: "organization", required: true },
  { name: "kontakt", label: "Telefon ili email", type: "text", autoComplete: "tel", required: true },
  { name: "grad", label: "Grad", type: "text", autoComplete: "address-level2", required: false },
] as const;

export function DemoForm({
  className = "mx-auto mt-10 grid max-w-xl gap-4 rounded-3xl bg-white p-6 text-left text-ink shadow-2xl sm:grid-cols-2 sm:p-8",
}: { className?: string }) {
  const [result, setResult] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", `Zahtjev za demo: ${formData.get("salon")}`);
    setResult("Šaljemo…");
    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await response.json();
      if (data.success) {
        setResult("Hvala! Zahtjev je stigao, javljamo vam se u toku dana.");
        form.reset();
      } else setResult(`Slanje nije uspjelo. Pišite nam na ${DEMO_EMAIL}.`);
    } catch {
      setResult(`Slanje nije uspjelo. Pišite nam na ${DEMO_EMAIL}.`);
    }
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
        {result || (
          <>
            Možete pisati i direktno na{" "}
            <a href={`mailto:${DEMO_EMAIL}`} className="font-semibold text-ink underline">
              {DEMO_EMAIL}
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
