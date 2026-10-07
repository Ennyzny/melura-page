import {
  BellRing,
  CalendarDays,
  CalendarX2,
  Clock,
  Inbox,
  Link2,
  Palette,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Scissors,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Feature = { icon: LucideIcon; title: string; text: string; accent?: "coral" | "navy" };

const features: Feature[] = [
  {
    icon: Smartphone,
    title: "Vlastita native aplikacija",
    text: "Vaše ime, ikona i boje u App Storeu i Google Playu. Klijent vas ima na početnom ekranu telefona.",
    accent: "coral",
  },
  {
    icon: Link2,
    title: "Web booking link i QR kod",
    text: "Link za Instagram bio i QR kod na pultu — klijent se naruči i bez instaliranja aplikacije.",
  },
  {
    icon: BellRing,
    title: "Push podsjetnici",
    text: "Potvrda, podsjetnik dan ranije i 3 sata prije termina. Besplatno, bez SMS troškova.",
    accent: "navy",
  },
  {
    icon: Inbox,
    title: "Zahtjevi na odobrenju",
    text: "Svaki novi zahtjev stiže kao obavijest. Potvrdite ili odbijte za 30 sekundi, ne za 4 sata.",
  },
  {
    icon: CalendarDays,
    title: "Kalendar po radniku",
    text: "Dnevni pregled sa kolonom za svakog majstora, bojama po statusu i trenutnim vremenom.",
  },
  {
    icon: CalendarX2,
    title: "Nula duplih termina",
    text: "Algoritam dostupnosti poštuje radno vrijeme, pauze i razmak između termina. Dupli termin nije moguć.",
    accent: "coral",
  },
  {
    icon: Scissors,
    title: "Usluge i cjenovnik",
    text: "Cijena, trajanje, kategorija i opis. Trajanje usluge automatski određuje koliko termin traje.",
  },
  {
    icon: Users,
    title: "Osoblje i smjene",
    text: "Dodajte radnike, dodijelite im usluge i smjene. Klijent bira majstora ili \"bilo koga od nas\".",
  },
  {
    icon: Clock,
    title: "Radno vrijeme i blokade",
    text: "Radno vrijeme, pauze, neradni dani i blokirano vrijeme — klijentu se nikad ne prikazuje kao slobodno.",
  },
  {
    icon: Palette,
    title: "Potpun branding",
    text: "Logo, cover slika, primarna i sekundarna boja, tema i tekstovi. Aplikacija izgleda kao da je samo vaša.",
    accent: "navy",
  },
  {
    icon: ShieldCheck,
    title: "Prijava bez broja telefona",
    text: "Apple, Google ili email. Prijava se traži tek na kraju — pregled usluga i termina je uvijek slobodan.",
  },
  {
    icon: Sparkles,
    title: "Paketi po djelatnosti",
    text: "Frizeri, beauty, masaža, stomatologija — terminologija, pravila i tema prilagođeni vama.",
  },
];

const accentClasses = {
  coral: "bg-coral text-white",
  navy: "bg-navy text-white",
  none: "bg-navy-soft text-navy",
};

export function FeatureGrid() {
  return (
    <section id="funkcije" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-coral">Sve funkcije</p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl">
            Sve što salonu treba,
            <br className="hidden sm:block" /> na jednom mjestu
          </h2>
          <p className="mt-5 text-lg text-ink-soft">
            Od prvog dodira klijenta do završenog termina. Bez Vibera, bez
            sveske, bez &quot;ima li slobodno sutra?&quot;.
          </p>
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text, accent }) => (
            <li
              key={title}
              className="group rounded-2xl border border-line bg-white p-7 transition-all hover:-translate-y-1 hover:border-transparent hover:shadow-[0_20px_50px_-20px_rgba(27,29,33,0.25)]"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                  accentClasses[accent ?? "none"]
                }`}
              >
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
