"use client";

import "./globals.css";

// Pada i root layout, pa ova stranica nosi svoj <html>/<body> i ne oslanja se ni na font
// ni na komponente iz layouta — samo na globals.css.
export default function GlobalnaGreska({ retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="bs">
      <body className="flex min-h-screen items-center justify-center bg-white px-4 text-center text-ink">
        <main className="max-w-xl">
          <p className="text-[96px] font-bold leading-none tracking-tight text-coral">Ups</p>
          <h1 className="mt-6 text-3xl font-bold tracking-tight">Melura se trenutno ne učitava.</h1>
          <p className="mt-4 text-lg text-ink-soft">Pokušajte ponovo za trenutak.</p>
          <button
            type="button"
            onClick={() => retry()}
            className="mt-8 inline-flex min-h-12 items-center rounded-full bg-ink px-7 text-[17px] font-semibold text-white"
          >
            Pokušaj ponovo
          </button>
        </main>
      </body>
    </html>
  );
}
