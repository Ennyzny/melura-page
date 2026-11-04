import { DevicePreview } from "@/components/DevicePreview";
import { Reveal } from "@/components/Reveal";

const steps = [
  { title: "Odabere uslugu", text: "Cijena i trajanje su jasni prije zakazivanja.", image: "o-usluga", alt: "Odabrana usluga Šišanje + brada u aplikaciji Oštrica Barber Studio" },
  { title: "Izabere majstora", text: "Rezerviše kod osobe kojoj se želi vratiti.", image: "o-majstor", alt: "Izbor majstora Kenan u klijentskoj aplikaciji" },
  { title: "Pronađe svoje vrijeme", text: "Bira datum i jedan od dostupnih termina.", image: "o-vrijeme", alt: "Izbor termina 10. novembra" },
  { title: "Pošalje zahtjev", text: "Salon potvrđuje jednim dodirom, a klijent dobije obavijest. Uz automatsku potvrdu termin je odmah rezervisan.", image: "o-potvrda", alt: "Zahtjev poslan za Šišanje + brada u 12:30, čeka potvrdu salona" },
];

export function BookingFlow() {
  return (
    <section id="zakazivanje-flow" className="bg-fog px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-coral">Iz ugla klijenta</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Od izbora do termina.</h2>
          <p className="mt-5 text-lg text-ink-soft">Četiri jednostavna koraka u aplikaciji vašeg salona.</p>
        </div>
        <ol className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.image}>
              <Reveal>
                <div className="rounded-3xl border border-line bg-white px-6 pt-7 pb-8">
                  <span className="text-sm font-semibold text-coral">0{index + 1}</span>
                  <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-ink-soft">{step.text}</p>
                  <div className="mx-auto mt-7 w-full max-w-[230px]">
                    <DevicePreview src={`/screens/phone/${step.image}.webp`} alt={step.alt} />
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <Reveal>
            <div className="grid items-center gap-10 rounded-3xl bg-white p-8 sm:p-12 md:grid-cols-[1fr_260px] lg:gap-20">
              <div className="max-w-lg">
                <p className="text-sm font-semibold uppercase tracking-widest text-navy">Iz ugla salona</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Želite odobriti svaki zahtjev?</h2>
                <p className="mt-5 text-lg leading-relaxed text-ink-soft">Možete koristiti ručno odobravanje umjesto automatske potvrde. Zahtjev čeka vaš odgovor u Melura adminu.</p>
                <p className="mt-4 leading-relaxed text-ink-soft">Vidite uslugu, majstora i vrijeme. Prihvatite ili odbijte zahtjev direktno s telefona.</p>
              </div>
              <div className="mx-auto w-full max-w-[240px]">
                <DevicePreview src="/screens/phone/o-melura-zahtjevi.webp" alt="Zahtjevi na čekanju u Meluri, sa dugmadi Odbij i Potvrdi" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
