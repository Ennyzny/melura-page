"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function FeatureDetails({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const revealTarget = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (target && ref.current?.contains(target)) {
        ref.current.open = true;
        target.scrollIntoView({ block: "start" });
      }
    };
    revealTarget();
    window.addEventListener("hashchange", revealTarget);
    return () => window.removeEventListener("hashchange", revealTarget);
  }, []);
  return (
    <details ref={ref} className="rounded-3xl border border-line p-6 sm:p-10">
      <summary className="cursor-pointer text-xl font-bold sm:text-2xl">Istražite sve funkcije Melure</summary>
      <p className="mt-4 text-ink-soft">Detaljnije o kalendaru, timu, klijentima i obavijestima.</p>
      {children}
    </details>
  );
}
