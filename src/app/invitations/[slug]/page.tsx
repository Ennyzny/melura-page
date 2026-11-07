import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowRight, CalendarCheck, Mail, Phone, Smartphone, Video } from "lucide-react";
import { pozivnica, sviSlugovi } from "@/invitations";
import { oNama, tim } from "@/invitations/tim";
import { Ekran } from "@/components/pozivnica/Ekran";
import { Cjenovnik } from "@/components/pozivnica/Cjenovnik";
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
  const naslov = p.opsta ? "Melura: alat i aplikacija za vaš salon" : `${p.salon.ime}: vaša aplikacija`;
  // Opšta pozivnica nema svoju sliku: preview je isti kao na naslovnoj (`app/opengraph-image`).
  // Eksplicitan `images` je nužan, jer `openGraph` iz ove funkcije inače briše sliku iz fajla.
  const slika = p.salon.fotografija ?? p.salon.logo ?? "/opengraph-image";
  return {
    title: naslov,
    description: p.uvod,
    openGraph: { title: naslov, description: p.uvod, images: [{ url: slika }] },
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
  {
    ikona: Video,
    naslov: "Dogovorimo detalje",
    tekst: "Uživo u salonu ili preko Google Meet poziva: usluge, tim, radno vrijeme, fotografije i sve što želite drugačije.",
  },
  {
    ikona: Smartphone,
    naslov: "Aplikacija je vaša",
    tekst: "U App Storeu i Google Playu pod vašim imenom, plus web link i QR kod za izlog i Facebook.",
  },
  { ikona: CalendarCheck, naslov: "Salon vodite iz Melure", tekst: "Termini, klijenti, tim i pregled dana, na telefonu ili računaru. Klijenti zakazuju sami." },
];

export default async function PozivnicaPage({ params }: PageProps<"/invitations/[slug]">) {
  const p = pozivnica((await params).slug);
  if (!p) notFound();

  const { salon } = p;
  const boje = { ...salon.boje, naPrimarnoj: tekstNa(salon.boje.primarna) };

  return (
    <div>
      {/* Uvod — u bojama salona, preko fotografije salona. */}
      <section className="relative overflow-hidden text-white" style={{ background: boje.tamna }}>
        {salon.fotografija && (
          <Image src={salon.fotografija} alt="" fill preload sizes="100vw" className="object-cover opacity-30" />
        )}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, ${boje.tamna}66 0%, ${boje.tamna}e6 60%, ${boje.tamna} 100%)` }}
        />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-[1fr_340px] lg:pb-28">
          <div className="flex items-center gap-3 text-[15px] font-semibold text-white/80 lg:col-span-2">
            <Logo variant="light" />
            {salon.logo && (
              <>
                <span aria-hidden="true">×</span>
                <Image src={salon.logo} alt={salon.ime} width={44} height={44} className="h-11 w-11 rounded-full" />
              </>
            )}
          </div>
          <div>
            <p className="text-lg font-semibold" style={{ color: boje.primarna }}>
              {p.oznaka ?? `Pozivnica za ${salon.ime}`}
            </p>
            <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              {p.naslov}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl">{p.uvod}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#zasto"
                className="inline-flex min-h-12 items-center gap-2 rounded-full px-7 text-[17px] font-semibold transition-opacity hover:opacity-90"
                style={{ background: boje.primarna, color: boje.naPrimarnoj }}
              >
                Šta dobijate <ArrowDown className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="#cjenovnik"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 px-7 text-[17px] font-semibold transition-colors hover:border-white/60"
              >
                Uredite svoj cjenovnik
              </a>
            </div>
          </div>
          <Ekran snimak={p.naslovniSnimak} preload className="mx-auto max-w-[300px] sm:max-w-[340px]" />
        </div>
      </section>

      {/* Fokus: zašto se isplati. */}
      <section id="zasto" className="mx-auto max-w-[1200px] scroll-mt-6 px-4 py-20 sm:px-6 sm:py-28">
        <p className="font-semibold text-coral-text">Šta {salon.dativ} donosi</p>
        <h2 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Cijeli salon na jednom mjestu.
        </h2>

        <ol className="mt-16 grid gap-20 sm:gap-28">
          {p.koristi.map((k, i) => {
            const telefon = k.snimak.visina > k.snimak.sirina;
            return (
              <li key={k.naslov}>
                <Reveal>
                  <div
                    className={`grid items-center gap-10 ${
                      !telefon
                        ? "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
                        : i % 2
                          ? "lg:grid-cols-[300px_1fr]"
                          : "lg:grid-cols-[1fr_300px]"
                    }`}
                  >
                    <div className={i % 2 && telefon ? "lg:order-2" : ""}>
                      <span className="text-sm font-semibold text-muted">0{i + 1}</span>
                      <h3 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{k.naslov}</h3>
                      {k.dokaz && (
                        <p
                          className="mt-4 inline-block rounded-full px-3 py-1 text-[14px] font-semibold"
                          style={{ background: boje.tamna, color: boje.primarna }}
                        >
                          {k.dokaz}
                        </p>
                      )}
                      <dl className="mt-6 grid gap-5">
                        <div>
                          <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">Danas</dt>
                          <dd className="mt-1 text-lg leading-relaxed text-ink-soft">{k.danas}</dd>
                        </div>
                        <div className="border-l-4 pl-4" style={{ borderColor: boje.primarna }}>
                          <dt className="text-[13px] font-semibold uppercase tracking-[0.12em]">Sa Melurom</dt>
                          <dd className="mt-1 text-lg font-medium leading-relaxed">{k.sa}</dd>
                        </div>
                      </dl>
                    </div>
                    <Ekran
                      snimak={k.snimak}
                      sizes={telefon ? "300px" : "(min-width: 1024px) 640px, 100vw"}
                      className={telefon ? `mx-auto max-w-[300px] ${i % 2 ? "lg:order-1" : ""}` : ""}
                    />
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Kako klijent zakazuje */}
      <section className="py-20 text-white" style={{ background: boje.tamna }}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <p className="font-semibold" style={{ color: boje.primarna }}>
            Kako klijent zakazuje
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Četiri dodira, bez poziva i bez čekanja na odgovor.
          </h2>
          <ol className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {p.zakazivanje.map((s) => (
              <li key={s.src}>
                <Ekran snimak={s} sizes="(min-width: 1024px) 270px, 45vw" />
                <p className="mt-4 text-lg font-bold">{s.naslov}</p>
                {s.opis && <p className="mt-1 text-[15px] text-white/75">{s.opis}</p>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Interaktivni cjenovnik */}
      <section id="cjenovnik" className="scroll-mt-6 border-b border-line bg-[#fafafa] py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <p className="font-semibold text-coral-text">Vaš cjenovnik</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Upišite svoje usluge i odmah ih vidite u aplikaciji.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            Ovo je naš prijedlog. Promijenite nazive i cijene, dodajte ili uklonite usluge.
          </p>
          <div className="mt-10">
            <Cjenovnik
              slug={p.slug}
              salon={p.opsta ? null : salon.ime}
              pocetne={p.usluge}
              boje={boje}
              rjecnik={p.rjecnik}
              email={DEMO_EMAIL}
            />
          </div>
        </div>
      </section>

      {/* Kako ide dalje */}
      <section className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Kako ide dalje</h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          {p.opsta ? (
            <>
              Ovo što vidite je <strong className="text-ink">primjer</strong>. Vašu verziju pravimo zajedno, uživo u
              salonu ili preko Google Meet poziva, kako vam odgovara.
            </>
          ) : (
            <>
              Ovo što vidite je <strong className="text-ink">početna verzija</strong>, napravljena po javnim podacima o
              salonu. Sve ostalo dorađujemo zajedno, uživo u salonu ili preko Google Meet poziva, kako vam odgovara.
            </>
          )}
        </p>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* A ko smo to mi? — zajedničko za sve pozivnice, osim pasusa `zastoVi`. */}
      <section className="border-t border-line bg-[#fafafa]">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
          <div>
            <p className="font-semibold text-coral-text">A ko smo to mi?</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{oNama.naslov}</h2>
            {oNama.prica.map((t) => (
              <p key={t} className="mt-4 text-lg leading-relaxed text-ink-soft">
                {t}
              </p>
            ))}
            {p.zastoVi && (
              <p className="mt-6 border-l-4 pl-4 text-lg font-medium leading-relaxed" style={{ borderColor: boje.primarna }}>
                {p.zastoVi}
              </p>
            )}
          </div>
          {/* Subgrid: ime, uloga, opis i studij stoje u istom redu u obje kartice. */}
          <ul className="grid grid-cols-2 gap-x-5">
            {tim.map((c) => (
              <li key={c.ime} className="row-span-5 grid grid-rows-subgrid gap-y-0">
                <Image
                  src={c.slika}
                  alt={c.ime}
                  width={600}
                  height={600}
                  sizes="(min-width: 1024px) 260px, 45vw"
                  className="aspect-square w-full object-cover"
                />
                <p className="mt-3 text-lg font-bold">{c.ime}</p>
                <p className="text-[14px] font-semibold text-coral-text">{c.uloga}</p>
                <p className="mt-2 text-[15px] leading-relaxed">{c.zaSalon(salon)}</p>
                <p className="mt-3 self-start text-[13px] leading-relaxed text-muted">{c.opis}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Završni poziv */}
      <section className="relative overflow-hidden text-white" style={{ background: boje.tamna }}>
        <div className="mx-auto max-w-[1200px] px-4 py-20 text-center sm:px-6">
          {salon.logo ? (
            <Image src={salon.logo} alt="" width={96} height={96} className="mx-auto h-24 w-24 rounded-full" />
          ) : (
            <MeluraMark className="mx-auto h-24 w-24" />
          )}
          <h2 className="mx-auto mt-6 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Da cijeli {salon.ime} vodite sa jednog mjesta?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Javite se i dogovorimo kratak sastanak, u salonu ili preko Google Meeta. Pokažemo aplikaciju uživo i
            dogovorimo sve izmjene.
          </p>
          <a
            href={`mailto:${DEMO_EMAIL}?subject=${encodeURIComponent(p.opsta ? "Melura" : `${salon.ime}: Melura`)}`}
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full px-7 text-[17px] font-semibold transition-opacity hover:opacity-90"
            style={{ background: boje.primarna, color: boje.naPrimarnoj }}
          >
            Javite nam se <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
          <p className="mt-4 text-sm text-white/70">{DEMO_EMAIL}</p>
        </div>
      </section>

      <footer className="mx-auto max-w-[1200px] px-4 py-10 text-[14px] leading-relaxed text-muted sm:px-6">
        <p>{p.napomena}</p>
        <ul className="mt-4 grid list-disc gap-1.5 pl-5 text-[13px]">
          <li>
            Ova stranica je neobavezujuća ponuda pripremljena za {salon.ime}, a ne ugovor. Konačne funkcije, rokovi
            i cijene dogovaraju se i utvrđuju ugovorom.
          </li>
          <li>
            Snimci ekrana su iz demo verzije aplikacije sa primjer podacima. Izgled i funkcije u verziji za salon mogu
            se razlikovati i dorađuju se u dogovoru sa vama.
          </li>
          <li>
            Opisane koristi su mogućnosti aplikacije, ne garancija rezultata. Broj termina, nedolazaka i prihod
            zavise od salona i njegovih klijenata.
          </li>
          {p.opsta ? (
            <li>Nazivi i znakovi App Store, Google Play i Facebook pripadaju njihovim vlasnicima.</li>
          ) : (
            <>
              <li>
                Podaci o salonu (ime, logo, fotografije, ocjena, broj pratilaca, telefon) preuzeti su sa javno dostupnih
                profila na dan {new Date(p.datum).toLocaleDateString("bs-BA")}, isključivo za potrebe ove ponude. Sva
                prava pripadaju salonu i autorima; na vaš zahtjev ih odmah uklanjamo.
              </li>
              <li>
                Melura nije povezana sa salonom niti nastupa u njegovo ime. Nazivi i znakovi Kérastase, App Store, Google
                Play, Google Maps i Facebook pripadaju njihovim vlasnicima.
              </li>
            </>
          )}
          <li>
            Aplikacija je u završnoj fazi isporuke. Objava u App Storeu i Google Playu, pa time i datum isporuke,
            zavise od pregleda i odobrenja Applea i Googlea.
          </li>
          <li>
            Cjenovnik koji upišete na ovoj stranici čuva se samo u vašem browseru i šalje se tek kad kliknete
            „Pošalji cjenovnik“. Stranica nije javno objavljena ni indeksirana u pretraživačima.
          </li>
        </ul>
        <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          {!p.opsta && (
            <span>
              {salon.ime} · {salon.vrsta} · {salon.adresa ? `${salon.adresa}, ` : ""}
              {salon.grad}
            </span>
          )}
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
