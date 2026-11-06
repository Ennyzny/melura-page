"use client";

import { StatusStranica } from "@/components/StatusStranica";

// Greška u renderu bilo koje stranice ispod root layouta. `retry` ponovo dohvati i nacrta
// segment (Next 16.2+), umjesto da posjetilac mora sam osvježiti.
export default function Greska({ retry }: { error: unknown; retry: () => void }) {
  return (
    <StatusStranica
      kod="Ups"
      naslov="Nešto nije prošlo kako treba."
      tekst="Stranica se nije učitala do kraja. Pokušajte ponovo, a ako se ponovi, javite nam se."
      glavna={{ onClick: () => retry(), label: "Pokušaj ponovo" }}
      sporedna={{ href: "/", label: "Na početnu" }}
    />
  );
}
