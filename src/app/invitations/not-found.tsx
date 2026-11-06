import type { Metadata } from "next";
import { StatusStranica } from "@/components/StatusStranica";

export const metadata: Metadata = { title: "Pozivnica nije pronađena" };

// Pozivnica sa pogrešnim ili starim linkom: ne otkriva koje pozivnice postoje.
export default function PozivnicaNotFound() {
  return (
    <StatusStranica
      kod="404"
      naslov="Ova pozivnica ne postoji."
      tekst="Link je možda nepotpun ili je pozivnica povučena. Ako ste ga dobili od nas, odgovorite na email i poslaćemo novi."
      glavna={{ href: "/", label: "Šta je Melura" }}
    />
  );
}
