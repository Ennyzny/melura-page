import type { Metadata } from "next";
import { FeatureSections, sectionLinks } from "@/components/FeatureSections";
import { BookingStory } from "@/components/BookingStory";
import { Apps, CtaBanner } from "@/components/Footer";

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
      <section className="bg-fog">
        <div className="mx-auto max-w-4xl px-4 pb-14 pt-16 text-center sm:pt-20">
          <p className="text-lg font-semibold text-coral-text">Melura funkcije</p>
          <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Sve funkcije na jednom mjestu
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg sm:text-xl">
            Od prvog zahtjeva klijenta do pregleda poslovanja na kraju mjeseca
          </p>
          <ul className="mt-10 flex flex-wrap justify-center gap-2">
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
      <FeatureSections />
      <Apps />
      <CtaBanner />
    </>
  );
}
