import { PhoneFrame } from "./Frames";

const steps = [
  {
    n: "01",
    title: "Izabere uslugu",
    text: "Cjenovnik sa trajanjem i cijenom. Bez prijave, bez poziva.",
    src: "/screens/client-03-korak1-usluga.png",
    h: 1706,
  },
  {
    n: "02",
    title: "Izabere majstora",
    text: "Konkretnog radnika ili \"bilo ko od nas\" za prvi slobodan termin.",
    src: "/screens/client-04-korak2-majstor.png",
    h: 1484,
  },
  {
    n: "03",
    title: "Izabere vrijeme",
    text: "Prikazuju se samo stvarno slobodni termini — dupli termin nije moguć.",
    src: "/screens/client-05-korak3-vrijeme.png",
    h: 1214,
  },
  {
    n: "04",
    title: "Pošalje zahtjev",
    text: "Prijava jednim dodirom preko Apple ili Google računa. Vi potvrdite, klijent dobije push.",
    src: "/screens/client-07-zahtjev-poslan.png",
    h: 1562,
  },
];

export function BookingFlow() {
  return (
    <section id="kako-radi" className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-6 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-coral">Za vaše klijente</p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl">
              Termin u 4 koraka,
              <br /> za manje od minute
            </h2>
          </div>
          <p className="text-lg text-ink-soft lg:pb-2">
            Klijent otvori aplikaciju vašeg salona ili link sa Instagrama,
            izabere uslugu, majstora i vrijeme — i pošalje zahtjev. Prijava se
            traži tek na samom kraju, broj telefona nikad.
          </p>
        </div>

        <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((s) => (
            <li key={s.n} className="flex flex-col">
              <PhoneFrame
                src={s.src}
                alt={`Korak ${s.n}: ${s.title}`}
                width={808}
                height={s.h}
                className="mx-auto w-full max-w-[250px]"
              />
              <div className="mt-7 flex gap-4">
                <span className="font-display text-4xl font-bold leading-none text-coral">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1 text-ink-soft">{s.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
