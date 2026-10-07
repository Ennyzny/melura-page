import Image from "next/image";

type Industry = { name: string; img: string };

const row1: Industry[] = [
  { name: "Frizerski salon", img: "frizerski" },
  { name: "Nokti", img: "nokti" },
  { name: "Barber shop", img: "barber" },
  { name: "Obrve i trepavice", img: "obrve" },
  { name: "Kozmetički salon", img: "kozmetika" },
  { name: "Stomatologija", img: "stomatologija" },
];

const row2: Industry[] = [
  { name: "Masaža", img: "masaza" },
  { name: "SPA", img: "spa" },
  { name: "Fizioterapija", img: "fizio" },
  { name: "Tattoo i piercing", img: "tattoo" },
  { name: "Ordinacije", img: "ordinacija" },
  { name: "Saloni za ljubimce", img: "ljubimci" },
];

function Row({ items, direction }: { items: Industry[]; direction: "left" | "right" }) {
  const doubled = [...items, ...items];
  return (
    <div className="group overflow-hidden">
      <ul
        className={`flex w-max gap-6 group-hover:[animation-play-state:paused] ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {doubled.map(({ name, img }, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length}
            className="relative h-48 w-[310px] shrink-0 overflow-hidden rounded-xl bg-night"
          >
            <Image
              src={`/industries/${img}.jpg`}
              alt={i >= items.length ? "" : name}
              width={800}
              height={520}
              sizes="310px"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
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
