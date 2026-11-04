import Image from "next/image";

function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ${className}`}>
      {children}
    </div>
  );
}

// Kartice su vjerne Meluri i klijentskoj aplikaciji: iste rubrike, isti tekst,
// podaci demo salona Oštrica (isti kao na screenshotima).

function DanasCard({ className = "" }: { className?: string }) {
  const rows = [
    ["Naplaćeno", "150 KM", "9 završenih termina"],
    ["Prognoza dana", "465 KM", "sve potvrđeno"],
    ["Termini danas", "29", "1 otkazan"],
  ] as const;
  return (
    <Card className={className}>
      <ul className="divide-y divide-line">
        {rows.map(([label, value, note]) => (
          <li key={label} className="flex items-start justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
            <span className="whitespace-nowrap text-[12px] text-muted">{label}</span>
            <span className="text-right">
              <span className="block text-[14px] font-bold">{value}</span>
              <span className="block whitespace-nowrap text-[11px] text-muted">{note}</span>
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function ZauzetostCard({ className = "" }: { className?: string }) {
  const rows = [
    ["Amar", 10, 66],
    ["Emir", 10, 68],
    ["Kenan", 9, 72],
  ] as const;
  return (
    <Card className={className}>
      <p className="text-[13px] font-semibold">Zauzetost danas</p>
      <ul className="mt-3 space-y-2.5">
        {rows.map(([name, n, pct]) => (
          <li key={name}>
            <div className="flex justify-between text-[11px]">
              <span className="font-semibold">{name}</span>
              <span className="text-muted">{n} termina · {pct} %</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-fog">
              <div className="h-full rounded-full bg-navy" style={{ width: `${pct}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function RequestCard({ className = "" }: { className?: string }) {
  return (
    <Card className={className}>
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold">Zahtjevi na odobrenju</p>
        <span className="rounded-full bg-coral px-1.5 text-[11px] font-bold text-white">5</span>
      </div>
      <div className="mt-3 flex items-start gap-3 rounded-lg border border-dashed border-line p-3">
        <div>
          <p className="text-[15px] font-bold leading-none">09:30</p>
          <p className="mt-1 text-[11px] text-muted">sutra</p>
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-bold leading-snug">Nermin Hodžić</p>
          <p className="text-[11px] text-muted">Muško šišanje · Amar · 15 KM</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-[12px] font-semibold">
        <span className="rounded-md border border-line py-1.5 text-center">Odbij</span>
        <span className="rounded-md bg-coral py-1.5 text-center text-white">POTVRDI</span>
      </div>
    </Card>
  );
}

function ServicesCard({ className = "" }: { className?: string }) {
  const rows = [
    ["Muško šišanje", "30 minuta", "15 KM"],
    ["Fade", "40 minuta", "20 KM"],
    ["Šišanje + brada", "45 minuta", "25 KM"],
  ];
  return (
    <Card className={className}>
      <p className="text-[13px] font-semibold">Cjenovnik</p>
      <ul className="mt-3 space-y-3">
        {rows.map(([n, d, p]) => (
          <li key={n} className="flex items-center gap-3">
            <span className="h-9 w-1 rounded-full bg-coral" />
            <div className="flex-1">
              <p className="text-[12px] font-semibold">{n}</p>
              <p className="text-[11px] text-muted">{d}</p>
            </div>
            <span className="text-[12px] font-bold">{p}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

// Push iz send-push: naslov po vrsti, tekst „Otvorite aplikaciju za detalje.";
// iOS iznad prikaže ikonu i ime aplikacije salona.
function PushCard({ className = "" }: { className?: string }) {
  return (
    <Card className={`!rounded-[1.4rem] !p-3.5 ${className}`}>
      <div className="flex items-center gap-3">
        <Image src="/screens/ostrica-logo.webp" alt="" width={36} height={36} className="h-9 w-9 rounded-[9px]" />
        <div className="min-w-0 flex-1">
          <div className="flex justify-between text-[11px] text-muted">
            <span className="font-semibold uppercase tracking-wide">Oštrica</span>
            <span>sada</span>
          </div>
          <p className="text-[12px] font-bold">Zahtjev je potvrđen</p>
          <p className="text-[11px] text-ink-soft">Otvorite aplikaciju za detalje.</p>
        </div>
      </div>
    </Card>
  );
}

export function Hero() {
  return (
    <section className="overflow-hidden bg-fog">
      <div className="mx-auto max-w-4xl px-4 pb-14 pt-16 text-center sm:pt-20">
        <p className="text-lg font-semibold text-coral">Melura funkcije</p>
        <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Jedna platforma,
          <br /> sve što vam treba
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg sm:text-xl">
          Upoznajte sve funkcije za vođenje i rast vašeg salona
        </p>
      </div>

      {/* Kolaž — desktop */}
      <div className="relative mx-auto hidden h-[560px] max-w-[1440px] xl:block">
        <DanasCard className="absolute left-[2%] top-6 w-56" />
        <ServicesCard className="absolute left-[2%] top-[290px] w-56" />

        <div className="absolute left-[19%] top-0 w-[220px] rounded-[2.2rem] border-[7px] border-ink bg-ink shadow-xl">
          <div className="relative aspect-[1290/2796] overflow-hidden rounded-[1.7rem] bg-black">
            <Image
              src="/screens/ostrica-iphone-pocetna.webp"
              alt="Aplikacija salona Oštrica na iPhoneu — početna sa cjenovnikom"
              width={1290}
              height={2796}
              preload
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </div>
        </div>

        <div className="absolute left-[36%] top-36 w-[720px] overflow-hidden rounded-t-2xl border-[7px] border-b-0 border-ink bg-ink shadow-2xl">
          <Image
            src="/screens/ostrica-kalendar.webp"
            alt="Melura — sedmični kalendar cijelog tima"
            width={2880}
            height={1800}
            preload
            sizes="720px"
            className="block h-auto w-full rounded-t-lg"
          />
        </div>

        <RequestCard className="absolute right-[4%] top-0 w-64" />
        <PushCard className="absolute right-[3%] top-[230px] w-72" />
        <ZauzetostCard className="absolute right-[5%] top-[350px] w-60" />
      </div>

      {/* Kolaž — mobilni i tablet */}
      <div className="relative mx-auto h-[420px] max-w-xl px-4 xl:hidden">
        <div className="absolute inset-x-4 top-14 overflow-hidden rounded-t-xl border-[5px] border-b-0 border-ink bg-ink shadow-2xl">
          <Image
            src="/screens/ostrica-kalendar.webp"
            alt="Melura — sedmični kalendar"
            width={2880}
            height={1800}
            sizes="100vw"
            className="block h-auto w-full rounded-t-md"
          />
        </div>
        <RequestCard className="absolute left-2 top-0 w-56 sm:left-4" />
        <PushCard className="absolute right-2 top-56 w-64 sm:right-4" />
      </div>
    </section>
  );
}
