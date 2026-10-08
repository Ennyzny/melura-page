import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";
import { DevicePreview } from "./DevicePreview";
import { LavaBackground } from "./LavaBackground";
import { Logo, MeluraMark } from "./Logo";

export function CtaBanner() {
  return (
    <section id="demo" className="relative overflow-hidden bg-night text-white">
      <LavaBackground />
      <div className="relative px-4 py-20 text-center sm:py-24">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Zakažite demo</h2>
        <p className="mx-auto mt-4 max-w-2xl text-xl font-bold">
          Ostavite podatke i javićemo vam se da dogovorimo kratak prikaz Melure za vaš salon
        </p>
        <a
          href="#demo"
          className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 text-[17px] font-semibold text-ink transition-colors hover:bg-fog"
        >
          Zakaži demo <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function StoreBadge({ store }: { store: "apple" | "google" }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg bg-ink px-3.5 py-2 text-white">
      {store === "apple" ? (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
          <path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.87-.76-1.47.02-2.83.86-3.59 2.18-1.53 2.66-.39 6.6 1.1 8.75.73 1.05 1.6 2.24 2.73 2.2 1.1-.05 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.3-.88-2.3-3.52ZM14.2 6.13c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.64-1.05 1.68-.92 2.67.97.08 1.96-.49 2.56-1.22Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path d="M3.6 2.2 13.4 12l-9.8 9.8c-.36-.2-.6-.6-.6-1.07V3.27c0-.47.24-.87.6-1.07Z" fill="#00d7fe" />
          <path d="m16.8 8.6-3.4 3.4-9.8-9.8c.3-.17.69-.19 1.05.01L16.8 8.6Z" fill="#00f076" />
          <path d="m16.8 15.4-12.15 6.79c-.36.2-.75.18-1.05.01l9.8-9.8 3.4 3Z" fill="#ff3a44" />
          <path d="m20.4 13.4-3.6 2-3.4-3.4 3.4-3.4 3.6 2c.97.55.97 2.25 0 2.8Z" fill="#ffd500" />
        </svg>
      )}
      <span className="text-left leading-none">
        <span className="block text-[9px]">{store === "apple" ? "Preuzmite na" : "Nabavite na"}</span>
        <span className="block text-[15px] font-semibold">
          {store === "apple" ? "App Store" : "Google Play"}
        </span>
      </span>
    </span>
  );
}

export function Apps() {
  const cards = [
    {
      title: "Aplikacija vašeg salona",
      text: "Vaši klijenti se naručuju u aplikaciji koja nosi ime i boje vašeg salona",
      src: "/screens/phone/client-home.png",
      alt: "Početni ekran aplikacije salona Amko Barbershop",
      icon: (
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-night text-lg font-bold text-white">
          B
        </span>
      ),
    },
    {
      title: "Melura admin za vlasnike",
      text: "Vodite termine, tim i usluge sa iOS i Android aplikacije ili iz preglednika",
      src: "/screens/phone/admin-today.png",
      alt: "Melura admin — pregled dana za Barber Studio Vitez",
      icon: (
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
          <MeluraMark className="h-8 w-8" />
        </span>
      ),
    },
  ];
  return (
    <section id="aplikacije" className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Dvije aplikacije, jedan sistem</h2>
          <p className="mt-4 text-lg">
            Klijenti se naručuju u aplikaciji vašeg salona, a vi sve vodite iz Melura admina —
            na telefonu ili računaru
          </p>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {cards.map((c) => (
            <div key={c.title} className="relative flex h-[480px] overflow-hidden rounded-3xl bg-fog p-8 sm:p-10">
              <div className="relative z-10 flex max-w-[52%] flex-col justify-end">
                {c.icon}
                <h3 className="mt-5 text-2xl font-bold leading-tight sm:text-3xl">{c.title}</h3>
                <p className="mt-3 text-ink-soft">{c.text}</p>
                <div className="mt-6 flex flex-col items-start gap-2">
                  <StoreBadge store="apple" />
                  <StoreBadge store="google" />
                </div>
              </div>
              <div className="absolute -right-10 top-10 w-[46%] max-w-[230px] sm:right-8 sm:w-[40%]">
                <DevicePreview src={c.src} alt={c.alt} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const links = [
  { href: "/funkcije", label: "Funkcije" },
  { href: "/#cijene", label: "Cijene" },
  { href: "/#djelatnosti", label: "Djelatnosti" },
  { href: "/#pitanja", label: "Česta pitanja" },
  { href: "#demo", label: "Zakaži demo" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Link href="/" aria-label="Melura početna" className="inline-block">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-ink-soft">
              Vlastita booking aplikacija za frizerske, barber i beauty salone.
            </p>
          </div>
          <nav aria-label="Footer">
            <p className="text-lg font-bold">Za salone</p>
            <ul className="mt-2 grid grid-cols-2 gap-x-6 sm:grid-cols-3">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-11 items-center text-ink-soft hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Melura · Vitez, Bosna i Hercegovina</p>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line px-4 py-2 font-semibold text-ink">
            <Globe className="h-4 w-4" /> Bosanski
          </span>
        </div>
      </div>
    </footer>
  );
}
