import Link from "next/link";
import { Logo } from "./Logo";

type Akcija = { href?: string; onClick?: () => void; label: string };

// Zajednički izgled za 404 i greške: bez navigacije sajta (stoje van (sajt) layouta), sa
// znakom, velikim kodom i najviše dvije akcije.
export function StatusStranica({
  kod,
  naslov,
  tekst,
  glavna,
  sporedna,
}: {
  kod: string;
  naslov: string;
  tekst: string;
  glavna: Akcija;
  sporedna?: Akcija;
}) {
  const dugme = (a: Akcija, primarno: boolean) => {
    const cls = `inline-flex min-h-12 items-center rounded-full px-7 text-[17px] font-semibold transition-colors ${
      primarno ? "bg-ink text-white hover:bg-ink-soft" : "border border-line hover:border-ink/30"
    }`;
    return a.href ? (
      <Link href={a.href} className={cls}>
        {a.label}
      </Link>
    ) : (
      <button type="button" onClick={a.onClick} className={cls}>
        {a.label}
      </button>
    );
  };

  return (
    <main className="flex min-h-screen flex-1 flex-col px-4 sm:px-6">
      <div className="mx-auto w-full max-w-[1200px] pt-8">
        <Link href="/" aria-label="Melura početna" className="inline-block">
          <Logo />
        </Link>
      </div>
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center py-20 text-center">
        <p className="text-[96px] font-bold leading-none tracking-tight text-coral sm:text-[128px]">{kod}</p>
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">{naslov}</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{tekst}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {dugme(glavna, true)}
          {sporedna && dugme(sporedna, false)}
        </div>
      </div>
    </main>
  );
}
