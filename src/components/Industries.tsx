import {
  Brush,
  Eye,
  Flower2,
  Hand,
  HeartPulse,
  PawPrint,
  PenTool,
  Scissors,
  Smile,
  Sparkles,
  Stethoscope,
  Waves,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Industry = { name: string; icon: LucideIcon; bg: string };

const row1: Industry[] = [
  { name: "Frizerski salon", icon: Scissors, bg: "from-[#3d5a80] to-[#1f2f45]" },
  { name: "Nokti", icon: Hand, bg: "from-[#ee6c4d] to-[#b8442b]" },
  { name: "Barber shop", icon: Brush, bg: "from-[#2a2c31] to-[#0d0d0d]" },
  { name: "Obrve i trepavice", icon: Eye, bg: "from-[#c9877a] to-[#8f5246]" },
  { name: "Kozmetički salon", icon: Sparkles, bg: "from-[#7d6aa8] to-[#4b3d72]" },
  { name: "Stomatologija", icon: Smile, bg: "from-[#4f8fa8] to-[#2b5a6e]" },
];

const row2: Industry[] = [
  { name: "Masaža", icon: Waves, bg: "from-[#5b8a7a] to-[#2f5548]" },
  { name: "SPA", icon: Flower2, bg: "from-[#b49a6a] to-[#7a6439]" },
  { name: "Fizioterapija", icon: HeartPulse, bg: "from-[#2f7a6a] to-[#164a3f]" },
  { name: "Tattoo i piercing", icon: PenTool, bg: "from-[#3a3a3a] to-[#111]" },
  { name: "Ordinacije", icon: Stethoscope, bg: "from-[#5c7fb8] to-[#34507f]" },
  { name: "Šišanje ljubimaca", icon: PawPrint, bg: "from-[#d98a4d] to-[#9c5a26]" },
];

function Row({ items, direction }: { items: Industry[]; direction: "left" | "right" }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <ul
        className={`flex w-max gap-6 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {doubled.map(({ name, icon: Icon, bg }, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length}
            className={`relative h-48 w-[310px] shrink-0 overflow-hidden rounded-xl bg-gradient-to-br ${bg}`}
          >
            <Icon
              className="absolute -right-6 -top-6 h-44 w-44 text-white/15"
              strokeWidth={1.25}
            />
            <span className="absolute bottom-4 left-4 text-xl font-bold text-white">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Industries() {
  return (
    <section id="djelatnosti" className="bg-fog py-24 sm:py-32">
      <div className="px-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Napravljeno za salone poput vašeg
        </h2>
        <p className="mt-4 text-lg">Jedna platforma, prilagođena svakoj uslužnoj djelatnosti</p>
      </div>
      <div className="mt-14 space-y-6">
        <Row items={row1} direction="left" />
        <Row items={row2} direction="right" />
      </div>
    </section>
  );
}
