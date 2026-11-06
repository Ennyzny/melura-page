import Image from "next/image";
import type { Snimak } from "@/invitations";

// Snimci iz web demo builda nemaju status bar ni safe area, pa okvir crta svoj status bar
// iznad snimka, umjesto da „ostrvo" pokrije „Nazad" i „Korak 1 od 4". Snimak ide cijeli i
// neizmijenjen, u svom omjeru — bez cropa i rastezanja.
export function Telefon({
  snimak,
  pozadina,
  sizes = "(min-width: 1024px) 300px, 70vw",
  preload,
  className = "",
}: {
  snimak: Snimak;
  pozadina: string;
  sizes?: string;
  preload?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[2.6rem] bg-[#1a1b1e] p-[7px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] ring-1 ring-black/30 ${className}`}
    >
      <div className="overflow-hidden rounded-[2.2rem]" style={{ background: pozadina }}>
        <div className="relative flex h-9 items-center justify-between px-7 text-[13px] font-semibold text-white">
          <span>9:41</span>
          <span className="absolute left-1/2 top-2 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-1" aria-hidden="true">
            <svg viewBox="0 0 18 12" className="h-2.5 w-4 fill-current">
              <rect x="0" y="8" width="3" height="4" rx="1" />
              <rect x="5" y="5" width="3" height="7" rx="1" />
              <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
              <rect x="15" y="0" width="3" height="12" rx="1" />
            </svg>
            <svg viewBox="0 0 26 12" className="h-2.5 w-6">
              <rect x="0.5" y="0.5" width="22" height="11" rx="3" fill="none" stroke="currentColor" opacity="0.5" />
              <rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor" />
              <rect x="23.5" y="4" width="2" height="4" rx="1" fill="currentColor" opacity="0.5" />
            </svg>
          </span>
        </div>
        <Image
          src={snimak.src}
          alt={snimak.opis ? `${snimak.naslov} — ${snimak.opis}` : snimak.naslov}
          width={snimak.sirina}
          height={snimak.visina}
          sizes={sizes}
          preload={preload}
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}
