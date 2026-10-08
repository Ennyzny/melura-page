import Link from "next/link";
import { ArrowRight, BellRing, CalendarCheck2, QrCode, Smartphone } from "lucide-react";

const items = [
  {
    icon: Smartphone,
    title: "Vaša aplikacija u storeu",
    text: "Klijenti skidaju aplikaciju s imenom, ikonom i bojama vašeg salona. Android je u svakom paketu, iPhone u Pro paketu.",
  },
  {
    icon: QrCode,
    title: "Naručivanje i bez instalacije",
    text: "Web link za Instagram i Google Maps i QR kod na pultu vode na isti booking.",
  },
  {
    icon: BellRing,
    title: "Automatska ili ručna potvrda",
    text: "Termin se potvrdi odmah, ili vam stiže obavijest pa odobrite jednim dodirom. Nude se samo slobodni termini, pa nema preklapanja.",
  },
  {
    icon: CalendarCheck2,
    title: "Podsjetnici bez SMS troška",
    text: "Klijent dobija potvrdu i podsjetnik dan ranije i tri sata prije termina, kao push obavijest.",
  },
];

export function Highlights() {
  return (
    <section aria-labelledby="sta-je-melura" className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 id="sta-je-melura" className="text-4xl font-bold tracking-tight sm:text-5xl">
            Šta je Melura?
          </h2>
          <p className="mt-5 text-lg sm:text-xl">
            Booking sistem za salone: aplikacija vašeg salona za klijente i Melura admin za vas.
            Klijenti se naručuju sami, a termin se potvrđuje automatski ili jednim vašim dodirom. Postavljanje, objavu u storeu i obuku
            radimo mi.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-3xl bg-fog p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold leading-snug">{title}</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-ink-soft">{text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/funkcije#rezervacija"
            className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-ink px-6 text-[17px] font-semibold text-white transition-colors hover:bg-ink-soft"
          >
            Pogledajte jednu rezervaciju <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link
            href="/funkcije"
            className="inline-flex min-h-12 w-fit items-center rounded-full border border-line px-6 text-[17px] font-semibold transition-colors hover:border-ink/30"
          >
            Sve funkcije
          </Link>
        </div>
      </div>
    </section>
  );
}
