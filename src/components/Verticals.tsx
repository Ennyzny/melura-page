const verticals = [
  "Barber shopovi",
  "Frizerski saloni",
  "Beauty studiji",
  "Nokti",
  "Obrve i trepavice",
  "Kozmetički saloni",
  "Masaža i SPA",
  "Fizioterapija",
  "Stomatologija",
  "Tattoo studiji",
];

export function Verticals() {
  const items = [...verticals, ...verticals];
  return (
    <section aria-label="Za koga je Melura" className="border-y border-line bg-white py-8">
      <p className="eyebrow mb-6 px-4 text-center text-muted">
        Jedna platforma, prilagođena vašoj djelatnosti
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <ul className="animate-marquee flex w-max gap-4">
          {items.map((v, i) => (
            <li
              key={i}
              aria-hidden={i >= verticals.length}
              className="whitespace-nowrap rounded-full border border-line bg-paper px-6 py-2.5 font-display text-xl font-semibold uppercase tracking-wide text-ink-soft"
            >
              {v}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
