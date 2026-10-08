"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { DemoForm } from "./DemoForm";

/** Forma za demo u modalu; otvara je svaki link na #demo (navigacija, cijene, funkcije, footer). */
export function DemoModal() {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const open = () => {
      if (el.open) return;
      el.showModal();
      document.documentElement.style.overflow = "hidden";
    };
    const onClose = () => {
      document.documentElement.style.overflow = "";
      if (window.location.hash === "#demo") {
        history.replaceState(history.state, "", window.location.pathname + window.location.search);
      }
    };
    // Capture faza: stižemo prije Next <Link>, koji poštuje preventDefault.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement) || a.hash !== "#demo") return;
      e.preventDefault();
      open();
    };
    const fromHash = () => {
      if (window.location.hash === "#demo") open();
    };

    fromHash();
    window.addEventListener("hashchange", fromHash);
    document.addEventListener("click", onClick, true);
    el.addEventListener("close", onClose);
    return () => {
      window.removeEventListener("hashchange", fromHash);
      document.removeEventListener("click", onClick, true);
      el.removeEventListener("close", onClose);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      aria-labelledby="demo-naslov"
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close(); // klik na pozadinu
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl overflow-y-auto overscroll-contain rounded-3xl bg-white p-0 text-ink backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="demo-naslov" className="text-3xl font-bold tracking-tight">
              Zakažite demo
            </h2>
            <p className="mt-2 text-ink-soft">
              Ostavite podatke i javićemo vam se da dogovorimo kratak prikaz Melure za vaš salon.
            </p>
          </div>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Zatvori"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line transition-colors hover:border-ink/30"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <DemoForm className="mt-6 grid gap-4 text-left sm:grid-cols-2" />
      </div>
    </dialog>
  );
}
