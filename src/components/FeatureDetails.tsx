"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

/** Sve funkcije sklopljene iza dugmeta; linkovi na #funkciju (meni, čipovi, direktan URL) ih otvaraju. */
export function FeatureDetails({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const reveal = (id: string) => {
      const target = document.getElementById(id);
      if (!target || !el.contains(target)) return;
      setOpen(true);
      // Sačekaj da se panel prikaže prije skrolanja.
      requestAnimationFrame(() => requestAnimationFrame(() => target.scrollIntoView({ block: "start" })));
    };
    const fromHash = () => reveal(decodeURIComponent(window.location.hash.slice(1)));
    // Next <Link> mijenja hash preko pushState (bez hashchange), pa hvatamo i klik na link.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href*='#']");
      if (a instanceof HTMLAnchorElement && a.pathname === window.location.pathname) {
        reveal(decodeURIComponent(a.hash.slice(1)));
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", fromHash);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div>
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col gap-6 rounded-3xl border border-line p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Istražite sve funkcije Melure</h2>
            <p className="mt-2 text-lg text-ink-soft">
              Kalendar, aplikacija salona, klijenti, tim, obavijesti i pregled poslovanja.
            </p>
          </div>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="sve-funkcije"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex min-h-12 w-fit shrink-0 items-center gap-2 rounded-full bg-ink px-6 text-[17px] font-semibold text-white transition-colors hover:bg-ink-soft"
          >
            {open ? "Sakrij funkcije" : "Prikaži sve funkcije"}
            <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div ref={panel} id="sve-funkcije" hidden={!open} className="-mt-16 sm:-mt-24">
        {children}
      </div>
    </div>
  );
}
