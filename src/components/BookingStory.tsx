import Image from "next/image";
import { BellRing } from "lucide-react";

type Step = {
  title: string;
  text: string;
  who: "Klijent" | "Salon";
  screen?: { src: string; alt: string; width: number; height: number };
};

// Isti termin kroz cijeli tok: Fade šišanje kod Emira, srijeda 20.05. u 14:30.
const steps: Step[] = [
  {
    who: "Klijent",
    title: "Bira uslugu",
    text: "Usluge sa cijenom i trajanjem, iz vašeg cjenovnika. Klijent bira Fade šišanje.",
    screen: { src: "/screens/client-03-korak1-usluga.png", alt: "Korak 1 — izbor usluge, označeno Fade šišanje 20 KM", width: 808, height: 1706 },
  },
  {
    who: "Klijent",
    title: "Bira majstora",
    text: "Konkretnog majstora ili „Bilo ko od nas“ za najviše slobodnih termina.",
    screen: { src: "/screens/client-04-korak2-majstor.png", alt: "Korak 2 — izbor majstora, označen Emir", width: 808, height: 1484 },
  },
  {
    who: "Klijent",
    title: "Bira vrijeme i prijavljuje se",
    text: "Nude se samo stvarno slobodni termini. Prijava (Apple, Google ili email) traži se tek na kraju, a izabrani termin se čuva. Broj telefona se ne traži.",
    screen: { src: "/screens/client-06-korak4-prijava.png", alt: "Korak 4 — prijava, sačuvan termin srijeda 20. maj u 14:30", width: 808, height: 1436 },
  },
  {
    who: "Klijent",
    title: "Šalje zahtjev",
    text: "Termin je na čekanju dok ga salon ne potvrdi, i za to vrijeme ga niko drugi ne može zauzeti.",
    screen: { src: "/screens/client-07-zahtjev-poslan.png", alt: "Zahtjev poslan — status na čekanju", width: 808, height: 1562 },
  },
  {
    who: "Salon",
    title: "Vi potvrđujete",
    text: "Na telefon vam stiže obavijest o novom zahtjevu. Potvrdite ili odbijte jednim dodirom u Melura adminu.",
  },
  {
    who: "Klijent",
    title: "Stiže potvrda",
    text: "Klijent odmah dobija push obavijest da je termin potvrđen.",
    screen: { src: "/screens/client-10-obavijesti.png", alt: "Obavijesti — termin je potvrđen", width: 808, height: 1262 },
  },
  {
    who: "Klijent",
    title: "Podsjetnici same stižu",
    text: "Termin je u „Moji termini“, a podsjetnik stiže dan ranije i tri sata prije termina.",
    screen: { src: "/screens/client-08-moji-termini.png", alt: "Moji termini — potvrđen termin", width: 808, height: 1502 },
  },
];

function Phone({ screen }: { screen: NonNullable<Step["screen"]> }) {
  return (
    <div className="rounded-[2rem] border-[6px] border-ink bg-ink shadow-xl">
      <Image
        src={screen.src}
        alt={screen.alt}
        width={screen.width}
        height={screen.height}
        sizes="(min-width: 1024px) 260px, 70vw"
        className="block h-auto w-full rounded-[1.6rem]"
      />
    </div>
  );
}

// Korak salona nema snimak iste rezervacije, pa je nacrtan sa istim podacima.
function SalonCard() {
  return (
    <div className="flex aspect-[808/1500] flex-col justify-center gap-4 rounded-[2rem] bg-coral-soft p-5">
      <div className="rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-coral-soft text-coral-text">
            <BellRing className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">Novi zahtjev</p>
            <p className="text-[15px] font-bold">Fade šišanje · Emir</p>
          </div>
        </div>
        <p className="mt-3 text-[14px] text-ink-soft">Srijeda, 20.05. u 14:30 · 40 min · 20 KM</p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-[13px] font-semibold" aria-hidden="true">
          <span className="rounded-full border border-line py-2 text-center">Odbij</span>
          <span className="rounded-full bg-ink py-2 text-center text-white">Potvrdi</span>
        </div>
      </div>
      <p className="text-center text-[13px] text-ink-soft">Melura admin na vašem telefonu</p>
    </div>
  );
}

export function BookingStory() {
  return (
    <section id="rezervacija" aria-labelledby="rezervacija-naslov" className="py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="border-b border-line pb-8">
          <h2 id="rezervacija-naslov" className="text-4xl font-bold tracking-tight sm:text-5xl">
            Jedna rezervacija, od početka do kraja
          </h2>
          <p className="mt-3 max-w-2xl text-lg">
            Ovako izgleda isti termin — Fade šišanje kod Emira, srijeda u 14:30 — iz ugla klijenta i
            salona. Snimci su iz aplikacije demo salona Barber Studio Vitez.
          </p>
        </div>

        <ol
          tabIndex={0}
          aria-label="Koraci rezervacije"
          className="-mx-4 mt-12 flex snap-x snap-mandatory scroll-px-4 gap-6 overflow-x-auto px-4 sm:scroll-px-6 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {steps.map((s, i) => (
            <li key={s.title} className="w-[68%] max-w-[280px] shrink-0 snap-start sm:w-[40%] lg:w-auto lg:max-w-none">
              {s.screen ? <Phone screen={s.screen} /> : <SalonCard />}
              <p className="mt-5 text-sm font-semibold text-muted">
                {i + 1}. korak · {s.who}
              </p>
              <h3 className="mt-1 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted lg:hidden">Povucite u stranu za sljedeći korak.</p>
      </div>
    </section>
  );
}
