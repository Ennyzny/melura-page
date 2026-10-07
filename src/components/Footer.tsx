import { MeluraMark, Logo } from "./Logo";

const columns = [
  {
    title: "Proizvod",
    links: ["Funkcije", "Aplikacija salona", "Admin aplikacija", "Cijene"],
  },
  {
    title: "Za koga",
    links: ["Barber shopovi", "Frizerski saloni", "Beauty i nokti", "Masaža i SPA", "Stomatologija"],
  },
  {
    title: "Kompanija",
    links: ["O nama", "Kontakt", "Politika privatnosti", "Uslovi korištenja"],
  },
];

export function CtaBanner() {
  return (
    <section id="demo" className="px-4 pb-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-coral px-6 py-16 text-center text-white sm:px-12 sm:py-24">
        <MeluraMark className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 opacity-15 [&_path]:fill-white" />
        <MeluraMark className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 opacity-10 [&_path]:fill-white" />
        <h2 className="relative font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl">
          Spremni za svoju aplikaciju?
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/90">
          Pokazaćemo vam kako bi aplikacija vašeg salona izgledala — sa vašim
          imenom, uslugama i bojama. Demo je besplatan i traje 20 minuta.
        </p>
        <form
          className="relative mx-auto mt-9 flex max-w-lg flex-col gap-3 sm:flex-row"
          action="#"
        >
          <label htmlFor="demo-email" className="sr-only">
            Email adresa
          </label>
          <input
            id="demo-email"
            type="email"
            required
            placeholder="vas@salon.ba"
            className="min-w-0 flex-1 rounded-full bg-white px-6 py-4 text-ink placeholder:text-muted focus:outline-none focus:ring-4 focus:ring-white/40"
          />
          <button
            type="submit"
            className="rounded-full bg-ink px-8 py-4 font-semibold transition-colors hover:bg-night-2"
          >
            Zakaži demo
          </button>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-white/60">
              Vlastite booking aplikacije za frizere, beauty salone, masere i
              stomatološke ordinacije. Napravljeno u Bosni i Hercegovini.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((c) => (
              <div key={c.title}>
                <p className="eyebrow text-white/40">{c.title}</p>
                <ul className="mt-4 space-y-3">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-white/80 transition-colors hover:text-white">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/40 sm:flex-row">
          <p>© 2026 Melura. Sva prava zadržana.</p>
          <p>Vitez · Travnik · Sarajevo</p>
        </div>
      </div>
    </footer>
  );
}
