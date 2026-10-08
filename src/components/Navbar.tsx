"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Store, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "/#djelatnosti", label: "Djelatnosti" },
  { href: "/funkcije", label: "Funkcije" },
  { href: "/#cijene", label: "Cijene" },
];

const menuLinks = [...links, { href: "/#pitanja", label: "Česta pitanja" }];

const featureLinks = [
  { href: "/funkcije#rezervacija", label: "Jedna rezervacija" },
  { href: "/funkcije#zakazivanje", label: "Zakazivanje" },
  { href: "/funkcije#aplikacija", label: "Vlastita aplikacija" },
  { href: "/funkcije#online-booking", label: "Online booking" },
  { href: "/funkcije#klijenti", label: "Klijenti" },
  { href: "/funkcije#tim", label: "Tim i smjene" },
  { href: "/funkcije#obavijesti", label: "Obavijesti" },
  { href: "/funkcije#pregled", label: "Pregled poslovanja" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled || open ? "bg-white/85 backdrop-blur-md" : "bg-fog"
      }`}
    >
      <nav className="flex h-[72px] items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-12">
          <Link href="/" aria-label="Melura početna" onClick={close}>
            <Logo />
          </Link>
          <ul className="hidden items-center gap-10 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className="text-[17px] font-semibold hover:text-ink-soft aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/funkcije#aplikacija"
            className="hidden min-h-11 items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-[17px] font-semibold transition-colors hover:border-ink/30 md:inline-flex"
          >
            <Store className="h-5 w-5" strokeWidth={1.75} />
            Primjer aplikacije
          </Link>
          <a
            href="#demo"
            onClick={close}
            className="inline-flex min-h-11 items-center rounded-full bg-ink px-4 py-2.5 text-[15px] sm:px-5 font-semibold text-white transition-colors hover:bg-ink-soft sm:text-[17px]"
          >
            Zakaži demo
          </a>
          <button
            ref={menuButton}
            type="button"
            aria-label={open ? "Zatvori meni" : "Otvori meni"}
            aria-expanded={open}
            aria-controls="glavni-meni"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex min-h-11 items-center gap-3 rounded-full border border-line bg-white px-3.5 py-2.5 text-[17px] font-semibold transition-colors hover:border-ink/30 sm:px-5"
          >
            <span className="hidden sm:inline">Meni</span>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="glavni-meni"
          className="absolute right-4 top-[76px] max-h-[calc(100dvh-6rem)] w-[calc(100%-2rem)] max-w-sm overflow-y-auto rounded-2xl border border-line bg-white p-3 shadow-2xl sm:right-8"
        >
          <ul className="border-b border-line pb-2">
            {menuLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={close}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className="block rounded-lg px-3 py-2.5 text-[17px] font-semibold hover:bg-fog aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-4"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="px-3 pb-1 pt-3 text-sm font-semibold text-muted">Funkcije</p>
          <ul>
            {featureLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={close}
                  className="block rounded-lg px-3 py-2.5 text-[17px] font-semibold hover:bg-fog"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
