import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Da li moj salon zaista dobija svoju aplikaciju u storeu?",
    a: "Da. Svaki salon dobija zasebnu aplikaciju sa svojim imenom, ikonom i bojama u Google Playu (i App Storeu u Pro paketu). Klijent ne skida \"Meluru\" — skida aplikaciju vašeg salona.",
  },
  {
    q: "Šta ako klijent ne želi instalirati aplikaciju?",
    a: "Iz istog koda dobijate i web booking link koji radi u pregledniku. Stavite ga u Instagram bio, na Google Maps ili ga podijelite preko QR koda na pultu.",
  },
  {
    q: "Koliko traje da aplikacija bude spremna?",
    a: "Admin aplikaciju koristite odmah. Aplikacija salona ide u store čim pripremimo branding i Google/Apple je odobre — tačan rok dogovaramo na demo pozivu.",
  },
  {
    q: "Kako sprečavate duple termine?",
    a: "Klijentu se prikazuju samo stvarno slobodni termini — sistem uzima u obzir radno vrijeme, pauze, blokirano vrijeme, trajanje usluge i razmak između termina. Zahtjev na čekanju privremeno zauzima slot dok ga ne potvrdite ili odbijete.",
  },
  {
    q: "Da li klijenti moraju ostaviti broj telefona?",
    a: "Ne. Prijava je preko Apple ili Google računa jednim dodirom, ili emailom. Potvrde i podsjetnici idu putem push obavijesti — besplatno, bez SMS-a.",
  },
  {
    q: "Šta je sa terminima koje primam telefonom?",
    a: "Iz admin aplikacije ručno dodajete termin za klijenta koji je zvao. Sve je u istom kalendaru, pa nema preklapanja.",
  },
  {
    q: "Mogu li otkazati?",
    a: "Paketi bez setup troška imaju minimalno trajanje od 12 mjeseci jer izrada i objava vaše aplikacije ima stvaran trošak. Nakon toga otkazujete kad želite.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:px-8">
        <div>
          <p className="eyebrow text-coral">Pitanja</p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl">
            Često postavljana pitanja
          </h2>
          <p className="mt-5 text-lg text-ink-soft">
            Niste našli odgovor?{" "}
            <a href="#demo" className="font-semibold text-navy underline underline-offset-4">
              Pišite nam
            </a>
            .
          </p>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold">
                {f.q}
                <Plus className="mt-1 h-5 w-5 shrink-0 text-coral transition-transform group-open:rotate-45" />
              </summary>
              <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
