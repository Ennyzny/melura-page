import { Plus } from "lucide-react";
import { CIJENE } from "@/lib/flags";

// Odgovori prate ponudu iz MVP specifikacije (paketi, Linija A/B, Faza 1). Dok je cjenovnik
// ugašen (CIJENE), odgovori ne spominju pakete ni uslove ugovora — ni na stranici ni u JSON-LD-u.
const faqs = [
  {
    q: "Da li klijent mora instalirati aplikaciju?",
    a: "Ne mora. Klijent može skinuti aplikaciju vašeg salona ili se naručiti preko web linka i QR koda, bez instalacije. Pregled usluga, cijena i slobodnih termina ne traži prijavu. Prijava (Apple, Google ili email) traži se tek na kraju, a broj telefona se ne traži.",
  },
  {
    q: "Kako počinje korištenje?",
    a: "Zakažete demo i pokažemo vam Meluru. Zatim izaberete paket, mi pripremimo i objavimo aplikaciju vašeg salona, a vi podijelite link i QR kod klijentima. Od tada zahtjevi stižu u Melura admin.",
  },
  {
    q: "Šta uključuje postavljanje?",
    a: `Aplikaciju s imenom, ikonom, logom i bojama vašeg salona, unos usluga, cijena, radnika i radnog vremena, te objavu u Google Playu${CIJENE ? " (u Pro paketu i u App Storeu)" : " i App Storeu"}. Aplikacija ide pod našim developer nalogom, pa vi ne otvarate nikakav nalog. Na kraju vama i timu uživo pokažemo kako se radi u adminu.`,
  },
  {
    q: "Na kojim uređajima radi?",
    a: `Klijenti koriste Android aplikaciju, iPhone aplikaciju${CIJENE ? " (Pro paket)" : ""} ili web link u bilo kojem pregledniku. Vi termine vodite iz Melura admina na Android telefonu ili iPhoneu.`,
  },
  {
    q: "Kakvi su uslovi ugovora?",
    a: CIJENE
      ? "Postoje dva modela. Bez setup troška plaćate samo mjesečno, uz ugovor na najmanje 12 mjeseci. Uz jednokratni setup mjesečna cijena je niža. U oba modela nema provizije po terminu ni SMS troškova. Tačne uslove dobijate u pisanoj ponudi nakon demoa."
      : "Plan cijena i uslove objavljujemo uskoro. Do tada svaki salon dobija ponudu po mjeri nakon kratkog demoa. Nema provizije po terminu ni SMS troškova.",
  },
  {
    q: "Mogu li sam mijenjati usluge, cijene i radno vrijeme?",
    a: "Da. Usluge, cijene, radnike, radno vrijeme i blokirano vrijeme mijenjate iz admina, a promjene se odmah vide u aplikaciji — bez čekanja nove verzije u storeu.",
  },
  {
    q: "Šta ako dva klijenta izaberu isti termin?",
    a: "Sistem provjerava dostupnost pri svakom zahtjevu. Prvi zahtjev zauzima termin, a drugi klijent dobija poruku da je termin upravo zauzet i bira novi.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function Faq() {
  return (
    <section id="pitanja" aria-labelledby="pitanja-naslov" className="bg-fog py-24 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 id="pitanja-naslov" className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Česta pitanja
        </h2>
        <div className="mt-12 divide-y divide-line rounded-3xl bg-white px-6 sm:px-8">
          {faqs.map((f) => (
            <details key={f.q} className="group py-2">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus
                  className="h-5 w-5 shrink-0 transition-transform group-open:rotate-45 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <p className="pb-4 text-[17px] leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
