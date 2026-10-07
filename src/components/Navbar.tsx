"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "#funkcije", label: "Funkcije" },
  { href: "#kako-radi", label: "Kako radi" },
  { href: "#aplikacija", label: "Vaša aplikacija" },
  { href: "#cijene", label: "Cijene" },
  { href: "#faq", label: "Pitanja" },
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
        scrolled || open
          ? "border-b border-line bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" aria-label="Melura početna">
          <Logo />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[15px] font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#"
            className="rounded-full px-4 py-2 text-[15px] font-semibold text-ink hover:bg-black/5"
          >
            Prijava za salone
          </a>
          <a
            href="#demo"
            className="rounded-full bg-ink px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-navy"
          >
            Zakaži demo
          </a>
        </div>

        <button
          type="button"
          className="-mr-2 rounded-md p-2 lg:hidden"
          aria-label={open ? "Zatvori meni" : "Otvori meni"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-paper px-4 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-3.5 text-lg font-medium"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <a
              href="#"
              className="rounded-full border border-ink/20 py-3 text-center font-semibold"
            >
              Prijava
            </a>
            <a
              href="#demo"
              onClick={() => setOpen(false)}
              className="rounded-full bg-ink py-3 text-center font-semibold text-white"
            >
              Zakaži demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
