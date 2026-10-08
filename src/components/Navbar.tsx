"use client";

import { useEffect, useState } from "react";
import { Menu, Store, X } from "lucide-react";
import { Logo } from "./Logo";
import Link from "next/link";

const links = [
  { href: "/funkcije#djelatnosti", label: "Djelatnosti" },
  { href: "/funkcije", label: "Funkcije" },
  { href: "/#cijene", label: "Cijene" },
];

const menuLinks = [
  { href: "#zakazivanje", label: "Zakazivanje" },
  { href: "#aplikacija", label: "Vlastita aplikacija" },
  { href: "#online-booking", label: "Online booking" },
  { href: "#klijenti", label: "Klijenti" },
  { href: "#tim", label: "Tim i smjene" },
  { href: "#obavijesti", label: "Obavijesti" },
  { href: "#pregled", label: "Pregled poslovanja" },
  { href: "#cijene", label: "Cijene" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled || open ? "bg-white/85 backdrop-blur-md" : "bg-fog"
      }`}
    >
      <nav className="flex h-[72px] items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-12">
          <Link href="/" aria-label="Melura početna">
            <Logo />
          </Link>
          <ul className="hidden items-center gap-10 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[17px] font-semibold hover:text-ink-soft">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/funkcije#aplikacije"
            className="hidden items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-[17px] font-semibold transition-colors hover:border-ink/30 md:inline-flex"
          >
            <Store className="h-5 w-5" strokeWidth={1.75} />
            Primjer aplikacije
          </Link>
          <a
            href="#demo"
            className="rounded-full bg-ink px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-ink-soft sm:text-[17px]"
          >
            Registracija
          </a>
          <button
            type="button"
            aria-label={open ? "Zatvori meni" : "Otvori meni"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-3 rounded-full border border-line bg-white px-4 py-2.5 text-[17px] font-semibold transition-colors hover:border-ink/30 sm:px-5"
          >
            <span className="hidden sm:inline">Meni</span>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="absolute right-4 top-[76px] w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-line bg-white p-3 shadow-2xl sm:right-8">
          <p className="px-3 pb-1 pt-2 text-sm font-semibold text-muted">Funkcije</p>
          <ul>
            {menuLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href === "#cijene" ? "/#cijene" : `/funkcije${l.href}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-[17px] font-semibold hover:bg-fog"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-2 border-t border-line pt-3">
            <a
              href="#"
              className="block rounded-lg px-3 py-2.5 text-[17px] font-semibold hover:bg-fog"
            >
              Prijava za salone
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
