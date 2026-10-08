import { BellRing, CalendarCheck2, Clock } from "lucide-react";
import { DevicePreview } from "./DevicePreview";
import { Reveal } from "./Reveal";

// Isti termin kroz klijentski tok: Šišanje + brada kod Amka, četvrtak 15.10. u 09:00.
const steps = [
  {
    title: "Bira uslugu",
    text: "Usluge sa cijenom i trajanjem, iz vašeg cjenovnika. Sve je jasno prije zakazivanja.",
    image: "service-choice",
    alt: "Korak 1 — odabrana usluga Šišanje + brada u aplikaciji Amko Barbershop",
  },
  {
    title: "Bira majstora",
    text: "Rezerviše kod osobe kojoj se želi vratiti, ili kod bilo koga ko je slobodan.",
    image: "staff-choice",
    alt: "Korak 2 — izbor majstora, označen Amko",
  },
  {
    title: "Bira slobodno vrijeme",
    text: "Nude se samo stvarno slobodni termini — bez preklapanja i bez dopisivanja.",
    image: "time-choice",
    alt: "Korak 3 — izbor termina 15. oktobra u 09:00",
  },
  {
    title: "Dobija potvrdu",
    text: "Uz automatsku potvrdu termin je odmah upisan u raspored. Prijava se traži tek na kraju, a broj telefona nikako.",
    image: "booking-confirmed",
    alt: "Termin je potvrđen — Šišanje + brada, četvrtak 15.10. u 09:00",
  },
];

const after = [
  { icon: BellRing, title: "Push umjesto SMS-a", text: "Klijent dobija obavijest čim je termin potvrđen ili odbijen." },
  { icon: Clock, title: "Podsjetnici same stižu", text: "Dan ranije i tri sata prije termina, bez troška po poruci." },
  { icon: CalendarCheck2, title: "Moji termini", text: "Klijent vidi status i može otkazati do roka koji vi odredite." },
];

export function BookingStory() {
  return (
    <section id="rezervacija" aria-labelledby="rezervacija-naslov" className="bg-fog py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="border-b border-line pb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-coral-text">Iz ugla klijenta</p>
          <h2 id="rezervacija-naslov" className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Jedna rezervacija, od izbora do termina
          </h2>
          <p className="mt-3 max-w-2xl text-lg">
            Četiri kratka koraka u aplikaciji vašeg salona. Snimci su iz stvarne aplikacije salona
            Amko Barbershop.
          </p>
        </div>

        <ol
          tabIndex={0}
          aria-label="Koraci rezervacije"
          className="-mx-4 mt-12 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {steps.map((s, i) => (
            <li key={s.image} className="w-[72%] max-w-[290px] shrink-0 snap-start sm:w-[42%] lg:w-auto lg:max-w-none">
              <Reveal>
                <div className="h-full rounded-3xl border border-line bg-white px-6 pb-8 pt-7">
                  <p className="text-sm font-semibold text-coral-text">{i + 1}. korak</p>
                  <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft lg:min-h-[7.5rem]">{s.text}</p>
                  <div className="mx-auto mt-6 w-full max-w-[220px]">
                    <DevicePreview src={`/screens/phone/${s.image}.png`} alt={s.alt} />
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted lg:hidden">Povucite u stranu za sljedeći korak.</p>

        <Reveal>
          <div className="mt-12 grid items-center gap-10 rounded-3xl bg-white p-8 sm:p-12 md:grid-cols-[1fr_240px] lg:gap-20">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-navy">Iz ugla salona</p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Želite odobriti svaki zahtjev?
              </h3>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                Umjesto automatske potvrde uključite ručno odobravanje. Na telefon vam stiže obavijest,
                a zahtjev čeka u Melura adminu — s uslugom, majstorom i vremenom.
              </p>
              <p className="mt-4 leading-relaxed text-ink-soft">
                Prihvatite ili odbijte jednim dodirom. Dok čeka, termin niko drugi ne može zauzeti, a
                zaboravljeni zahtjevi sami istječu i oslobađaju kalendar.
              </p>
            </div>
            <div className="mx-auto w-full max-w-[240px]">
              <DevicePreview
                src="/screens/phone/admin-request.png"
                alt="Novi zahtjev za termin u 10:00, s opcijama Prihvati i Odbij u Melura adminu"
              />
            </div>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-8 sm:grid-cols-3">
          {after.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-ink-soft">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
