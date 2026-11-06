import type { Metadata } from "next";
import { StatusStranica } from "@/components/StatusStranica";

export const metadata: Metadata = { title: "Stranica nije pronađena" };

export default function NotFound() {
  return (
    <StatusStranica
      kod="404"
      naslov="Ova stranica ne postoji."
      tekst="Link je možda pogrešno upisan ili je stranica premještena. Sve o Meluri je na početnoj."
      glavna={{ href: "/", label: "Na početnu" }}
      sporedna={{ href: "/funkcije", label: "Pogledajte funkcije" }}
    />
  );
}
