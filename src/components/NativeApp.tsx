import { Apple, Globe, Play, QrCode } from "lucide-react";
import { PhoneFrame } from "./Frames";

const salons = [
  { name: "Barber Studio", bg: "bg-night", fg: "text-white", letter: "B" },
  { name: "Beauty Travnik", bg: "bg-[#c9877a]", fg: "text-white", letter: "BT" },
  { name: "Fizio Vitez", bg: "bg-[#5b8a7a]", fg: "text-white", letter: "F" },
  { name: "Nails by Lejla", bg: "bg-coral", fg: "text-white", letter: "N" },
];

export function NativeApp() {
  return (
    <section id="aplikacija" className="bg-sand py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative order-2 mx-auto flex w-full max-w-lg items-end justify-center gap-4 lg:order-1">
          <PhoneFrame
            src="/screens/client-01-pocetna.png"
            alt="Aplikacija barber salona — tamna tema"
            width={808}
            height={4140}
            className="w-[48%] translate-y-6"
          />
          <PhoneFrame
            src="/screens/fizio-light-pocetna.png"
            alt="Aplikacija fizioterapije — svijetla tema"
            width={804}
            height={6104}
            objectPosition="50% 27.5%"
            className="w-[48%] -translate-y-6"
          />
        </div>

        <div className="order-1 lg:order-2">
          <p className="eyebrow text-coral">Vaša aplikacija u storeu</p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl">
            Vaša ikona na telefonu svakog klijenta
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Nije link na tuđu platformu, nije marketplace gdje vam konkurencija
            stoji odmah do vas. Klijent skine <strong>vašu</strong> aplikaciju —
            s vašim imenom, logom, bojama i uslugama — i vraća se baš vama.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {salons.map((s) => (
              <div key={s.name} className="flex w-[72px] flex-col items-center gap-2">
                <span
                  className={`flex h-[60px] w-[60px] items-center justify-center rounded-[18px] font-display text-xl font-bold shadow-md ${s.bg} ${s.fg}`}
                >
                  {s.letter}
                </span>
                <span className="text-center text-xs leading-tight text-ink-soft">
                  {s.name}
                </span>
              </div>
            ))}
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            <li className="flex gap-3 rounded-xl bg-white p-4">
              <Play className="mt-0.5 h-5 w-5 shrink-0 text-navy" />
              <div>
                <p className="font-semibold">Google Play</p>
                <p className="text-sm text-ink-soft">Android — glavni kanal u BiH</p>
              </div>
            </li>
            <li className="flex gap-3 rounded-xl bg-white p-4">
              <Apple className="mt-0.5 h-5 w-5 shrink-0 text-navy" />
              <div>
                <p className="font-semibold">App Store</p>
                <p className="text-sm text-ink-soft">iOS aplikacija u Pro paketu</p>
              </div>
            </li>
            <li className="flex gap-3 rounded-xl bg-white p-4">
              <Globe className="mt-0.5 h-5 w-5 shrink-0 text-navy" />
              <div>
                <p className="font-semibold">Web link</p>
                <p className="text-sm text-ink-soft">Za Instagram bio i Google Maps</p>
              </div>
            </li>
            <li className="flex gap-3 rounded-xl bg-white p-4">
              <QrCode className="mt-0.5 h-5 w-5 shrink-0 text-navy" />
              <div>
                <p className="font-semibold">QR kod</p>
                <p className="text-sm text-ink-soft">Na pultu, ogledalu ili vizitki</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
