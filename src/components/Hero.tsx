import Image from "next/image";
import { BellRing, CalendarCheck2 } from "lucide-react";

function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ${className}`}>
      {children}
    </div>
  );
}

function RevenueCard({ className = "" }: { className?: string }) {
  return (
    <Card className={className}>
      <p className="text-[13px] font-semibold">Prognoza dana</p>
      <div className="mt-1 flex items-center gap-2">
        <p className="whitespace-nowrap text-2xl font-bold">283 KM</p>
        <span className="rounded-md bg-mint px-1.5 py-0.5 text-[11px] font-bold text-mint-dark">
          16 termina
        </span>
      </div>
      <div className="relative mx-auto mt-4 h-28 w-28">
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
          <circle cx="18" cy="18" r="14" fill="none" stroke="#e8edf4" strokeWidth="6" />
          <circle cx="18" cy="18" r="14" fill="none" stroke="#3d5a80" strokeWidth="6" strokeDasharray="55 88" />
          <circle cx="18" cy="18" r="14" fill="none" stroke="#ee6c4d" strokeWidth="6" strokeDasharray="19 88" strokeDashoffset="-55" />
        </svg>
      </div>
      <ul className="mt-4 space-y-1 text-[11px]">
        <li className="flex justify-between"><span className="text-muted">● Potvrđeno</span><span className="font-semibold">223 KM</span></li>
        <li className="flex justify-between"><span className="text-coral">● Čeka potvrdu</span><span className="font-semibold">60 KM</span></li>
      </ul>
    </Card>
  );
}

function StaffCard({ className = "" }: { className?: string }) {
  const rows = [
    ["Emir", 40],
    ["Vedad", 44],
    ["Amar", 29],
  ] as const;
  return (
    <Card className={className}>
      <p className="text-[13px] font-semibold">Zauzetost majstora</p>
      <ul className="mt-3 space-y-2.5">
        {rows.map(([name, pct]) => (
          <li key={name}>
            <div className="flex justify-between text-[11px]">
              <span className="font-semibold">{name}</span>
              <span className="text-muted">{pct} %</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-fog">
              <div className="h-full rounded-full bg-navy" style={{ width: `${pct * 2}%` }} />
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
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-coral-soft text-coral">
          <BellRing className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">Novi zahtjev</p>
          <p className="text-[14px] font-bold leading-snug">Amina Hadžić</p>
          <p className="text-[12px] text-muted">Feniranje · danas 13:30</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-[12px] font-semibold">
        <span className="rounded-full border border-line py-1.5 text-center">Odbij</span>
        <span className="rounded-full bg-ink py-1.5 text-center text-white">Potvrdi</span>
      </div>
    </Card>
  );
}

function ServicesCard({ className = "" }: { className?: string }) {
  const rows = [
    ["Muško šišanje", "30 min", "15 KM"],
    ["Fade šišanje", "40 min", "20 KM"],
    ["Šišanje + brada", "45 min", "25 KM"],
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

function PushCard({ className = "" }: { className?: string }) {
  return (
    <Card className={`!p-4 ${className}`}>
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-night text-white">
          <CalendarCheck2 className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[12px] font-bold">Barber Studio Vitez</p>
          <p className="text-[11px] text-ink-soft">Vaš termin je potvrđen — 20.05. u 14:30</p>
        </div>
      </div>
    </Card>
  );
}

function ReminderCard({ className = "" }: { className?: string }) {
  return (
    <Card className={`bg-mint ${className}`}>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-mint-dark">Podsjetnik</p>
      <p className="mt-1 text-4xl font-bold">14:30</p>
      <p className="mt-2 text-[12px] text-ink-soft">Sutra · Fade šišanje kod Emira</p>
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
      <div className="relative mx-auto hidden h-[560px] max-w-[1440px] lg:block">
        <StaffCard className="absolute -left-24 top-24 w-52 opacity-90" />
        <RevenueCard className="absolute left-[5%] top-6 w-52" />
        <ServicesCard className="absolute left-[5%] top-[370px] w-52" />

        <div className="absolute left-[19%] top-0 w-[220px] rounded-[2.2rem] border-[7px] border-ink bg-ink shadow-xl">
          <div className="relative aspect-[402/874] overflow-hidden rounded-[1.7rem] bg-white">
            <Image
              src="/screens/admin-phone-danas.png"
              alt="Melura admin na telefonu — današnji termini"
              width={402}
              height={874}
              preload
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </div>
        </div>

        <div className="absolute left-[36%] top-36 w-[720px] overflow-hidden rounded-t-2xl border-[7px] border-b-0 border-ink bg-ink shadow-2xl">
          <Image
            src="/screens/admin-kalendar.png"
            alt="Melura kalendar dana sa kolonama po radniku"
            width={2880}
            height={1800}
            preload
            sizes="720px"
            className="block h-auto w-full rounded-t-lg"
          />
        </div>

        <RequestCard className="absolute right-[5%] top-0 w-60" />
        <PushCard className="absolute right-[3%] top-[188px] w-72" />
        <ReminderCard className="absolute right-[6%] top-[280px] w-48" />
        <ServicesCard className="absolute -right-28 top-[400px] w-48 opacity-90" />
      </div>

      {/* Kolaž — mobilni i tablet */}
      <div className="relative mx-auto h-[420px] max-w-xl px-4 lg:hidden">
        <div className="absolute inset-x-4 top-14 overflow-hidden rounded-t-xl border-[5px] border-b-0 border-ink bg-ink shadow-2xl">
          <Image
            src="/screens/admin-kalendar.png"
            alt="Melura kalendar dana"
            width={2880}
            height={1800}
            sizes="100vw"
            className="block h-auto w-full rounded-t-md"
          />
        </div>
        <RequestCard className="absolute left-2 top-0 w-56 sm:left-4" />
        <ReminderCard className="absolute right-2 top-48 w-36 sm:right-4" />
      </div>
    </section>
  );
}
