import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowDown, Bell, CalendarCheck, Mail, Phone, Smartphone } from "lucide-react";
import { pozivnica, sviSlugovi } from "@/invitations";
import { Telefon } from "@/components/pozivnica/Telefon";
import { Cjenovnik } from "@/components/pozivnica/Cjenovnik";
import { BrowserFrame } from "@/components/Frames";
import { Logo, MeluraMark } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { DEMO_EMAIL } from "@/lib/site";

// Shell pozivnice: sav sadržaj dolazi iz `src/invitations/<slug>.ts`. Uz `cacheComponents`
// nema `dynamicParams = false`, pa nepoznat slug (i goli /invitations) ide na notFound().
export async function generateStaticParams() {
  return sviSlugovi().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/invitations/[slug]">): Promise<Metadata> {
  const p = pozivnica((await params).slug);
  if (!p) return {};
  const naslov = `${p.salon.ime} — vaša aplikacija`;
  return {
    title: naslov,
    description: p.uvod,
    openGraph: { title: naslov, description: p.uvod, images: [{ url: p.salon.fotografija ?? p.salon.logo }] },
  };
}

/** Tamni ili bijeli tekst na boji brenda, po relativnoj luminanciji (WCAG). */
function tekstNa(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.18 ? "#0d0d0d" : "#ffffff";
}

const koraci = [
  { ikona: Mail, naslov: "Javite se", tekst: "Odgovorite na email ili pošaljite cjenovnik sa ove stranice." },
  { ikona: Smartphone, naslov: "Mi postavimo aplikaciju", tekst: "Vaše ime, logo, boje, usluge i tim — u App Storeu i Google Playu, plus web link i QR kod." },
  { ikona: CalendarCheck, naslov: "Klijenti zakazuju sami", tekst: "Vi termine vidite i potvrđujete u Meluri, na telefonu ili računaru." },
];

const prednosti = [
  { ikona: Bell, naslov: "Podsjetnici bez SMS troškova", tekst: "Push obavijest dan prije i nekoliko sati prije termina — manje propuštenih dolazaka." },
  { ikona: CalendarCheck, naslov: "Lista čekanja", tekst: "Kad se termin oslobodi, klijent koji je čekao dobija obavijest." },
  { ikona: Smartphone, naslov: "Bez provizije po terminu", tekst: "Mjesečna pretplata. Svaki termin i svaki klijent ostaju vaši." },
];

export default async function PozivnicaPage({ params }: PageProps<"/invitations/[slug]">) {
  const p = pozivnica((await params).slug);
  if (!p) notFound();

  const { salon, snimci } = p;
  const boje = { ...salon.boje, naPrimarnoj: tekstNa(salon.boje.primarna) };
  const [pocetna, ...flow] = snimci.aplikacija;
  const kontakt = `mailto:${DEMO_EMAIL}?subject=${encodeURIComponent(`${salon.ime} — aplikacija`)}`;

  return (
    <div style={{ ["--brend" as string]: boje.primarna, ["--brend-tamna" as string]: boje.tamna }}>
      {/* Uvod — u bojama salona, preko fotografije salona. */}
      <section className="relative overflow-hidden text-white" style={{ background: boje.tamna }}>
        {salon.fotografija && (
          <Image
            src={salon.fotografija}
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover opacity-30"
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, ${boje.tamna}66 0%, ${boje.tamna}e6 60%, ${boje.tamna} 100%)` }}
        />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-[1fr_380px] lg:pb-28">
          <div className="lg:col-span-2 flex items-center gap-3 text-[15px] font-semibold text-white/80">
            <Logo variant="light" />
            <span aria-hidden="true">×</span>
            <Image src={salon.logo} alt={salon.ime} width={44} height={44} className="h-11 w-11 rounded-full" />
          </div>
          <div>
            <p className="text-lg font-semibold" style={{ color: boje.primarna }}>
              Pozivnica za {salon.ime}
            </p>
            <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              {salon.vokativ}, ovako bi izgledala aplikacija {salon.genitiv}.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl">{p.uvod}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={kontakt}
                className="inline-flex min-h-12 items-center gap-2 rounded-full px-7 text-[17px] font-semibold transition-opacity hover:opacity-90"
                style={{ background: boje.primarna, color: boje.naPrimarnoj }}
              >
                <Mail className="h-5 w-5" aria-hidden="true" /> Želim aplikaciju
              </a>
              <a
                href="#cjenovnik"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 px-7 text-[17px] font-semibold transition-colors hover:border-white/60"
              >
                Uredite svoj cjenovnik <ArrowDown className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
          {pocetna && (
            <Telefon snimak={pocetna} pozadina={boje.tamna} preload className="mx-auto w-[280px] sm:w-[320px]" />
          )}
        </div>
      </section>

      {/* Šta smo primijetili */}
      <section className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Pogledali smo {salon.ime}</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {p.zapazanja.map((z) => (
            <li key={z.vrijednost}>
              <Reveal className="h-full">
                <div className="h-full rounded-3xl bg-fog p-7">
                  <p className="text-4xl font-bold tracking-tight">{z.vrijednost}</p>
                  <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">{z.opis}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Klijentska aplikacija */}
      <section className="py-20 text-white" style={{ background: boje.tamna }}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <p className="font-semibold" style={{ color: boje.primarna }}>
            Aplikacija za vaše klijente
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Termin za manje od minute — bez poziva i bez čekanja na odgovor.
          </h2>
          <ol className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [scrollbar-width:thin]">
            {flow.map((s) => (
              <li key={s.src} className="w-[240px] shrink-0 snap-start sm:w-[260px]">
                <Telefon snimak={s} pozadina={boje.tamna} sizes="260px" />
                <p className="mt-4 text-lg font-bold">{s.naslov}</p>
                {s.opis && <p className="mt-1 text-[15px] text-white/75">{s.opis}</p>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Melura */}
      <section className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
        <div className="flex items-center gap-2 font-semibold text-coral-text">
          <MeluraMark className="h-6 w-6" /> Melura — za vas i vaš tim
        </div>
        <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
          Cijeli dan salona na jednom ekranu.
        </h2>
        <div className="mt-12 grid gap-10">
          {snimci.meluraRacunar.map((s, i) => (
            <Reveal key={s.src}>
              <figure className={`grid items-center gap-6 lg:grid-cols-[1fr_280px] ${i % 2 ? "lg:grid-cols-[280px_1fr]" : ""}`}>
                <BrowserFrame
                  src={s.src}
                  alt={s.opis ?? s.naslov}
                  width={s.sirina}
                  height={s.visina}
                  className={i % 2 ? "lg:order-2" : ""}
                />
                <figcaption>
                  <p className="text-2xl font-bold">{s.naslov}</p>
                  {s.opis && <p className="mt-2 text-[17px] leading-relaxed text-ink-soft">{s.opis}</p>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        {snimci.meluraTelefon.length > 0 && (
          <div className="mt-16 grid items-center gap-10 rounded-[2rem] bg-fog p-8 sm:p-12 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-2xl font-bold sm:text-3xl">I na telefonu, između dva klijenta.</p>
              <p className="mt-3 max-w-lg text-[17px] leading-relaxed text-ink-soft">
                Novi zahtjev stiže kao obavijest. Potvrda je jedan dodir — klijent odmah dobija odgovor.
              </p>
            </div>
            <div className="flex justify-center gap-5">
              {snimci.meluraTelefon.map((s) => (
                <Telefon key={s.src} snimak={s} pozadina="#ffffff" sizes="220px" className="w-[160px] sm:w-[220px]" />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Interaktivni cjenovnik */}
      <section id="cjenovnik" className="scroll-mt-6 border-y border-line bg-[#fafafa] py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <p className="font-semibold text-coral-text">Vaš cjenovnik</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Upišite svoje usluge i odmah ih vidite u aplikaciji.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            Ovo je naš prijedlog — promijenite nazive i cijene, dodajte ili uklonite usluge.
          </p>
          <div className="mt-10">
            <Cjenovnik slug={p.slug} salon={salon.ime} pocetne={p.usluge} boje={boje} email={DEMO_EMAIL} />
          </div>
        </div>
      </section>

      {/* Prednosti i koraci */}
      <section className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
        <ul className="grid gap-5 md:grid-cols-3">
          {prednosti.map(({ ikona: Ikona, naslov, tekst }) => (
            <li key={naslov} className="rounded-3xl border border-line p-7">
              <Ikona className="h-7 w-7" aria-hidden="true" />
              <p className="mt-4 text-xl font-bold">{naslov}</p>
              <p className="mt-2 text-[16px] leading-relaxed text-ink-soft">{tekst}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-20 text-3xl font-bold tracking-tight sm:text-4xl">Kako ide dalje</h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {koraci.map(({ ikona: Ikona, naslov, tekst }, i) => (
            <li key={naslov} className="rounded-3xl bg-fog p-7">
              <span className="font-semibold text-coral-text">0{i + 1}</span>
              <Ikona className="mt-3 h-7 w-7" aria-hidden="true" />
              <p className="mt-3 text-xl font-bold">{naslov}</p>
              <p className="mt-2 text-[16px] leading-relaxed text-ink-soft">{tekst}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Završni poziv */}
      <section className="relative overflow-hidden text-white" style={{ background: boje.tamna }}>
        <div className="mx-auto max-w-[1200px] px-4 py-20 text-center sm:px-6">
          <Image src={salon.logo} alt="" width={96} height={96} className="mx-auto h-24 w-24 rounded-full" />
          <h2 className="mx-auto mt-6 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Da klijenti {salon.genitiv} zakazuju sami?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Javite se i dogovaramo kratak sastanak u salonu — pokažemo aplikaciju uživo, na vašem telefonu.
          </p>
          <a
            href={kontakt}
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full px-7 text-[17px] font-semibold transition-opacity hover:opacity-90"
            style={{ background: boje.primarna, color: boje.naPrimarnoj }}
          >
            <Mail className="h-5 w-5" aria-hidden="true" /> Javite nam se
          </a>
        </div>
      </section>

      <footer className="mx-auto max-w-[1200px] px-4 py-10 text-[14px] leading-relaxed text-muted sm:px-6">
        <p>{p.napomena}</p>
        <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>
            {salon.ime} · {salon.vrsta} · {salon.adresa ? `${salon.adresa}, ` : ""}
            {salon.grad}
          </span>
          {salon.telefon && (
            <span className="inline-flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" /> {salon.telefon}
            </span>
          )}
          <span>Pripremila Melura · {new Date(p.datum).toLocaleDateString("bs-BA")}</span>
        </p>
      </footer>
    </div>
  );
}
