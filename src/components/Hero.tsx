import { BellRing, Check, Star } from "lucide-react";
import { BrowserFrame, PhoneFrame } from "./Frames";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] bg-[radial-gradient(60%_60%_at_80%_10%,#fdece7_0%,transparent_70%),radial-gradient(50%_50%_at_10%_30%,#e8edf4_0%,transparent_70%)]"
      />
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-coral/30 bg-coral-soft px-4 py-1.5 text-coral-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            Booking platforma za salone u BiH
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.5rem]">
            Vaš salon.
            <br />
            <span className="text-navy">Vaša aplikacija.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            Melura daje vašem salonu vlastitu aplikaciju u App Storeu i Google
            Playu — s vašim imenom, ikonom i bojama. Klijenti se naručuju bez
            poziva, a vi termine potvrđujete jednim dodirom.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#demo"
              className="w-full rounded-full bg-coral px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-coral/30 transition-colors hover:bg-coral-dark sm:w-auto"
            >
              Zakaži besplatan demo
            </a>
            <a
              href="#funkcije"
              className="w-full rounded-full border border-ink/15 bg-white px-8 py-4 text-lg font-semibold transition-colors hover:border-ink/40 sm:w-auto"
            >
              Pogledaj funkcije
            </a>
          </div>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
            {["0 KM za postavljanje", "Android, iOS i web", "Bez SMS troškova"].map(
              (t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-navy" strokeWidth={2.5} />
                  {t}
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="relative mx-auto mt-16 max-w-6xl lg:mt-20">
          <BrowserFrame
            src="/screens/admin-danas.png"
            alt="Melura admin — pregled današnjih termina i zahtjeva na odobrenju"
            width={1440}
            height={901}
            preload
            className="lg:mr-28"
          />

          <PhoneFrame
            src="/screens/client-01-pocetna.png"
            alt="Aplikacija salona — početni ekran sa cjenovnikom"
            width={808}
            height={4140}
            className="absolute -bottom-10 right-0 hidden w-[230px] lg:block xl:w-[260px]"
          />

          <div className="animate-float absolute -left-4 top-1/3 hidden w-72 rounded-2xl border border-black/5 bg-white p-4 shadow-xl md:block xl:-left-12">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-coral-soft text-coral">
                <BellRing className="h-5 w-5" />
              </span>
              <div className="text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Novi zahtjev · sada
                </p>
                <p className="mt-0.5 text-[15px] font-semibold leading-snug">
                  Amina Hadžić, Feniranje
                </p>
                <p className="text-sm text-ink-soft">Danas u 13:30 · kod Lejle</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <span className="rounded-lg border border-line py-1.5 text-center text-sm font-semibold">
                Odbij
              </span>
              <span className="rounded-lg bg-coral py-1.5 text-center text-sm font-semibold text-white">
                Potvrdi
              </span>
            </div>
          </div>

          <div className="absolute -bottom-6 left-6 hidden items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-xl sm:flex lg:left-24">
            <div className="flex text-[#f5b301]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-sm">
              <span className="font-semibold">4,8</span>{" "}
              <span className="text-muted">ocjena salona u aplikaciji</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
