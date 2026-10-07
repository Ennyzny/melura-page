import Image from "next/image";
import { ArrowRight } from "lucide-react";

type Feature = { title: string; text: string };

type Media =
  | { kind: "phone"; src: string; alt: string; width: number; height: number; position?: string; tint?: string }
  | { kind: "desktop"; src: string; alt: string; width: number; height: number; tint?: string }
  | { kind: "phones"; items: { src: string; alt: string; width: number; height: number; position?: string }[]; tint?: string };

type Section = {
  id: string;
  title: string;
  subtitle: string;
  features: Feature[];
  media?: Media;
  mediaSide?: "left" | "right";
};

const sections: Section[] = [
  {
    id: "zakazivanje",
    title: "Zakazivanje",
    subtitle: "Upravljajte terminima i zahtjevima bez napora",
    features: [
      {
        title: "Kalendar",
        text: "Dnevni kalendar sa kolonom za svakog majstora, bojama po statusu i linijom trenutnog vremena. Radi na telefonu i računaru.",
      },
      {
        title: "Zahtjevi na odobrenju",
        text: "Svaki novi zahtjev stiže kao obavijest. Potvrdite ili odbijte jednim dodirom — za 30 sekundi, ne za 4 sata.",
      },
      {
        title: "Ručni unos termina",
        text: "Klijent je zvao telefonom? Dodajte termin ručno — sve je u istom kalendaru, pa nema preklapanja.",
      },
      {
        title: "Usluge i cjenovnik",
        text: "Cijena, trajanje, kategorija i opis. Trajanje usluge automatski određuje koliko termin traje.",
      },
      {
        title: "Blokirano vrijeme",
        text: "Pauze, neradni dani i blokade. Blokirano vrijeme se klijentu nikad ne prikazuje kao slobodno.",
      },
      {
        title: "Nula duplih termina",
        text: "Dostupnost poštuje radno vrijeme, pauze i razmak između termina. Dupli termin jednostavno nije moguć.",
      },
      {
        title: "Pravila naručivanja",
        text: "Najranije i najkasnije naručivanje, razmak između termina i rok za otkazivanje — sve po vašim pravilima.",
      },
      {
        title: "Automatsko isticanje",
        text: "Zaboravljeni zahtjevi automatski istječu i oslobađaju termin, pa vam kalendar nikad ne ostane blokiran.",
      },
      {
        title: "Statusi termina",
        text: "Na čekanju, potvrđeno, završeno, otkazano ili nije došao — pratite svaki termin do kraja.",
      },
    ],
  },
  {
    id: "aplikacija",
    title: "Vlastita aplikacija",
    subtitle: "Vaš salon u App Storeu i Google Playu",
    mediaSide: "right",
    media: {
      kind: "phone",
      src: "/screens/client-01-pocetna.png",
      alt: "Aplikacija Barber Studio Vitez — početni ekran",
      width: 808,
      height: 4140,
      tint: "bg-fog",
    },
    features: [
      {
        title: "Vaša ikona, vaše ime",
        text: "Klijent ne skida tuđu platformu — skida aplikaciju vašeg salona, s vašim logom i bojama.",
      },
      {
        title: "Android i iOS",
        text: "Native aplikacija u Google Playu, a u Pro paketu i u App Storeu.",
      },
      {
        title: "Web booking link",
        text: "Link za Instagram bio i Google Maps — naručivanje i bez instaliranja aplikacije.",
      },
      {
        title: "QR kod",
        text: "Na pultu, ogledalu ili vizitki. Klijent skenira i naruči se za par sekundi.",
      },
      {
        title: "Potpun branding",
        text: "Logo, cover slika, primarna i sekundarna boja, tema i tekstovi po vašem ukusu.",
      },
      {
        title: "Galerija i recenzije",
        text: "Pokažite radove i ocjene klijenata direktno u svojoj aplikaciji.",
      },
    ],
  },
  {
    id: "online-booking",
    title: "Online booking",
    subtitle: "Klijenti se naručuju sami, 0–24",
    mediaSide: "left",
    media: {
      kind: "phones",
      tint: "bg-coral-soft",
      items: [
        { src: "/screens/client-05-korak3-vrijeme.png", alt: "Korak 3 — izbor vremena", width: 808, height: 1214 },
        { src: "/screens/client-07-zahtjev-poslan.png", alt: "Zahtjev poslan", width: 808, height: 1562 },
      ],
    },
    features: [
      {
        title: "Termin u 4 koraka",
        text: "Usluga, majstor, vrijeme, potvrda — za manje od minute.",
      },
      {
        title: "\"Bilo ko od nas\"",
        text: "Klijent bira konkretnog majstora ili prvi slobodan termin kod bilo koga.",
      },
      {
        title: "Samo slobodni termini",
        text: "Prikazuju se isključivo stvarno slobodni termini za izabranu uslugu.",
      },
      {
        title: "Prijava jednim dodirom",
        text: "Apple, Google ili email — i to tek na kraju. Broj telefona se ne traži.",
      },
      {
        title: "Moji termini",
        text: "Klijent vidi svoje termine i status — na čekanju ili potvrđeno.",
      },
      {
        title: "Otkazivanje",
        text: "Klijent sam otkaže do roka koji vi odredite, a termin se odmah oslobađa.",
      },
    ],
  },
  {
    id: "klijenti",
    title: "Klijenti",
    subtitle: "Gradite trajne odnose sa svojim klijentima",
    mediaSide: "right",
    media: {
      kind: "desktop",
      src: "/screens/admin-klijenti.png",
      alt: "Adresar klijenata u Melura adminu",
      width: 2880,
      height: 1800,
      tint: "bg-navy-soft",
    },
    features: [
      {
        title: "Adresar klijenata",
        text: "Svi klijenti na jednom mjestu, sa profilom uz listu.",
      },
      {
        title: "Historija termina",
        text: "Svaki dolazak, otkazivanje i nedolazak uz profil klijenta.",
      },
      {
        title: "Kontakt jednim dodirom",
        text: "Poziv, Viber ili WhatsApp direktno iz detalja termina.",
      },
      {
        title: "Oznaka nedolaska",
        text: "Označite ko nije došao i prepoznajte klijente koji često propuštaju termine.",
      },
    ],
  },
  {
    id: "tim",
    title: "Tim i smjene",
    subtitle: "Organizujte svoj tim bez papira i poruka",
    mediaSide: "left",
    media: {
      kind: "desktop",
      src: "/screens/admin-osoblje.png",
      alt: "Osoblje i smjene u Melura adminu",
      width: 2880,
      height: 1800,
      tint: "bg-fog",
    },
    features: [
      {
        title: "Profili radnika",
        text: "Fotografija, uloga i kratka biografija koju klijenti vide pri izboru majstora.",
      },
      {
        title: "Usluge po radniku",
        text: "Svaki radnik radi samo usluge koje mu dodijelite.",
      },
      {
        title: "Redovni raspored",
        text: "Sedmične smjene po radniku, sa pauzama i slobodnim danima.",
      },
      {
        title: "Radno vrijeme salona",
        text: "Radno vrijeme po danu, praznici i neradni dani unaprijed.",
      },
      {
        title: "Zauzetost majstora",
        text: "Koliko termina i koji procenat dana svaki majstor ima popunjen.",
      },
      {
        title: "Uskoro: pristup za radnike",
        text: "Svaki radnik dobija svoj login i vidi samo svoje termine.",
      },
    ],
  },
  {
    id: "obavijesti",
    title: "Obavijesti",
    subtitle: "Automatske push poruke koje smanjuju nedolaske",
    mediaSide: "right",
    media: {
      kind: "phone",
      src: "/screens/client-10-obavijesti.png",
      alt: "Obavijesti u aplikaciji salona",
      width: 808,
      height: 1262,
      tint: "bg-mint",
    },
    features: [
      {
        title: "Potvrda termina",
        text: "Klijent odmah dobija push: \"Vaš termin je potvrđen — 20.05. u 14:30\".",
      },
      {
        title: "Podsjetnik dan ranije",
        text: "\"Sutra u 14:30 — Muško šišanje kod Emira.\"",
      },
      {
        title: "Podsjetnik 3 sata prije",
        text: "Posljednji podsjetnik da niko ne zaboravi doći.",
      },
      {
        title: "Obavijesti za vlasnika",
        text: "\"Novi zahtjev: Amina Hadžić, Feniranje, 13:30\" — čim klijent pošalje.",
      },
      {
        title: "Odbijeni termini",
        text: "Ako termin nije moguć, klijent to odmah sazna i bira drugi.",
      },
      {
        title: "Bez SMS troškova",
        text: "Push obavijesti su besplatne — nema računa za poruke na kraju mjeseca.",
      },
    ],
  },
  {
    id: "pregled",
    title: "Pregled poslovanja",
    subtitle: "Znajte kako vam ide dan, u svakom trenutku",
    mediaSide: "left",
    media: {
      kind: "desktop",
      src: "/screens/admin-danas.png",
      alt: "Melura — pregled današnjeg dana",
      width: 1440,
      height: 901,
      tint: "bg-coral-soft",
    },
    features: [
      {
        title: "Danas na prvi pogled",
        text: "Zahtjevi, sljedeći klijent i ko je trenutno u stolici — sve na jednom ekranu.",
      },
      {
        title: "Naplaćeno i prognoza",
        text: "Koliko ste zaradili danas i koliko još očekujete do kraja dana.",
      },
      {
        title: "Termini danas i ove sedmice",
        text: "Broj termina, nedolazaka i otkazivanja.",
      },
      {
        title: "Najveća rupa u rasporedu",
        text: "Odmah vidite gdje imate slobodnog vremena za dodatne termine.",
      },
    ],
  },
  {
    id: "djelatnost",
    title: "Paketi po djelatnosti",
    subtitle: "Prilagođeno baš vašem poslu",
    mediaSide: "right",
    media: {
      kind: "phones",
      tint: "bg-fog",
      items: [
        { src: "/screens/client-01-pocetna.png", alt: "Barber aplikacija — tamna tema", width: 808, height: 4140 },
        { src: "/screens/fizio-light-pocetna.png", alt: "Fizioterapija — svijetla tema", width: 804, height: 6104, position: "50% 27.5%" },
      ],
    },
    features: [
      {
        title: "Barber i frizeri",
        text: "Majstori, usluge i tema prilagođeni muškim i ženskim salonima.",
      },
      {
        title: "Beauty, nokti, obrve",
        text: "Dugi tretmani, više kategorija i galerija radova.",
      },
      {
        title: "Masaža i fizioterapija",
        text: "Terapeuti, terapije i smirena svijetla tema.",
      },
      {
        title: "Stomatologija",
        text: "Ordinacije, pacijenti i pravila prilagođena zdravstvu.",
      },
    ],
  },
];

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
        <p className="mt-3 text-lg">{subtitle}</p>
      </div>
      <a
        href="#demo"
        className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3 text-[17px] font-semibold text-white transition-colors hover:bg-ink-soft"
      >
        Saznaj više <ArrowRight className="h-5 w-5" />
      </a>
    </div>
  );
}

function FeatureItem({ title, text }: Feature) {
  return (
    <div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-[17px] leading-relaxed text-ink-soft">{text}</p>
    </div>
  );
}

function Phone({ src, alt, width, height, position = "50% 0%", className = "" }: {
  src: string; alt: string; width: number; height: number; position?: string; className?: string;
}) {
  return (
    <div className={`rounded-[2.6rem] border-[8px] border-ink bg-ink shadow-2xl ${className}`}>
      <div className="relative aspect-[402/874] overflow-hidden rounded-[2rem] bg-white">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 300px, 60vw"
          style={{ objectPosition: position }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

function MediaCard({ media }: { media: Media }) {
  const tint = media.tint ?? "bg-fog";
  return (
    <div className={`relative h-[460px] overflow-hidden rounded-3xl sm:h-[620px] ${tint}`}>
      {media.kind === "phone" && (
        <Phone {...media} className="absolute left-1/2 top-16 w-[62%] max-w-[330px] -translate-x-1/2" />
      )}
      {media.kind === "phones" && (
        <>
          <Phone {...media.items[0]} className="absolute left-[8%] top-20 w-[44%] max-w-[250px]" />
          <Phone {...media.items[1]} className="absolute right-[8%] top-10 w-[44%] max-w-[250px]" />
        </>
      )}
      {media.kind === "desktop" && (
        <div className="absolute left-10 top-14 w-[190%] overflow-hidden rounded-xl border-[6px] border-ink bg-ink shadow-2xl sm:left-14 sm:top-20 sm:w-[170%]">
          <Image
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            sizes="(min-width: 1024px) 1000px, 180vw"
            className="block h-auto w-full rounded-md"
          />
        </div>
      )}
    </div>
  );
}

export function FeatureSections() {
  return (
    <div id="funkcije">
      {sections.map((s) => (
        <section key={s.id} id={s.id} className="py-16 sm:py-24">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <SectionHeader title={s.title} subtitle={s.subtitle} />
            {s.media ? (
              <div className="mt-12 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
                <div className={s.mediaSide === "right" ? "lg:order-2" : ""}>
                  <MediaCard media={s.media} />
                </div>
                <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
                  {s.features.map((f) => (
                    <FeatureItem key={f.title} {...f} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {s.features.map((f) => (
                  <FeatureItem key={f.title} {...f} />
                ))}
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
