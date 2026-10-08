import type { Metadata } from "next";
import { FeatureSections, sectionLinks } from "@/components/FeatureSections";
import { BookingStory } from "@/components/BookingStory";
import { Apps, CtaBanner } from "@/components/Footer";
import { MeluraMark } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { FeatureDetails } from "@/components/FeatureDetails";

const howItWorks = [
  ["Klijent zakazuje", "Bira uslugu, majstora i slobodno vrijeme u aplikaciji vašeg salona ili preko web linka."],
  ["Vi birate pravila", "Termini se potvrđuju automatski ili tek nakon vašeg odobrenja."],
  ["Svi imaju pregled", "Klijent prati svoj termin, a vaš tim vidi raspored na telefonu ili računaru."],
];

const description =
  "Jedna rezervacija od izbora usluge do potvrde, plus zakazivanje, aplikacija salona, klijenti, tim, obavijesti i pregled poslovanja.";

export const metadata: Metadata = {
  title: "Funkcije",
  description,
  openGraph: {
    type: "website",
    siteName: "Melura",
    locale: "bs_BA",
    url: "/funkcije",
    description,
    // Vlastiti openGraph zamjenjuje roditeljev, pa sliku iz app/opengraph-image treba ponoviti.
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Melura — vlastita booking aplikacija za salone" }],
  },
};

export default function FunkcijePage() {
  return (
    <>
      <section>
        <div className="mx-auto max-w-5xl px-4 pb-14 pt-16 text-center sm:pt-20">
          <p className="text-lg font-semibold text-coral-text">Melura funkcije</p>
          <h1 className="mt-4 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-2 text-5xl font-bold leading-[1.05] tracking-tight sm:gap-x-4 sm:text-6xl">
            <span>Kako</span>
            <span className="inline-flex items-baseline gap-1 sm:gap-2">
              <MeluraMark className="h-[1em] w-[1em] shrink-0 translate-y-[0.18em]" />
              <span>melura</span>
            </span>
            <span>radi?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg sm:text-xl">
            Klijent bira termin. Vi birate način potvrde. Raspored ostaje pregledan.
          </p>
          <ol className="mt-12 grid gap-5 text-left sm:grid-cols-3">
            {howItWorks.map(([title, text], i) => (
              <li key={title}>
                <Reveal>
                  <div className="h-full rounded-3xl bg-fog p-7">
                    <span className="font-semibold text-coral-text">0{i + 1}</span>
                    <h2 className="mt-3 text-xl font-bold">{title}</h2>
                    <p className="mt-2 text-[16px] leading-relaxed text-ink-soft">{text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <ul aria-label="Skok na funkciju" className="mt-12 flex flex-wrap justify-center gap-2">
            {sectionLinks.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-block rounded-full border border-line bg-white px-4 py-2 text-[15px] font-semibold transition-colors hover:border-ink/30"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <BookingStory />
      <FeatureDetails>
        <FeatureSections />
      </FeatureDetails>
      <Apps />
      <CtaBanner />
    </>
  );
}
