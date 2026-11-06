import Image from "next/image";
import type { Snimak } from "@/invitations";

// Snimak ekrana bez okvira uređaja: cijeli i neizmijenjen, u svom omjeru, samo zaobljen i
// sa sjenom. Telefon ide pravih uglova (zaobljen izgleda kao lažni uređaj), računar blago zaobljen.
export function Ekran({
  snimak,
  sizes = "(min-width: 1024px) 320px, 80vw",
  preload,
  className = "",
}: {
  snimak: Snimak;
  sizes?: string;
  preload?: boolean;
  className?: string;
}) {
  const telefon = snimak.visina > snimak.sirina;
  return (
    <Image
      src={snimak.src}
      alt={snimak.opis ? `${snimak.naslov}: ${snimak.opis}` : snimak.naslov}
      width={snimak.sirina}
      height={snimak.visina}
      sizes={sizes}
      preload={preload}
      className={`block h-auto w-full ring-1 ring-black/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] ${
        telefon ? "" : "rounded-xl"
      } ${className}`}
    />
  );
}
