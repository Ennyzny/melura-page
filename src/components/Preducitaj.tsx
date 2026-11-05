"use client";
import { useEffect } from "react";

/*
 * Čim se stranica učita (i browser odahne), skine i dekodira slike 3D scena:
 * ekrane telefona i laptopa i slojeve scene sa tri telefona. Kad korisnik dođe
 * do sekcije, slike su već u memoriji i nema trzaja pri prvom prikazu.
 */
export function Preducitaj({ slike }: { slike: string[] }) {
  useEffect(() => {
    let otkazano = false;
    const kreni = () => {
      for (const src of slike) {
        if (otkazano) return;
        const i = new Image();
        i.decoding = "async";
        i.src = src;
        i.decode().catch(() => {});
      }
    };
    const idle = () =>
      "requestIdleCallback" in window ? window.requestIdleCallback(kreni, { timeout: 3000 }) : setTimeout(kreni, 1500);
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });
    return () => {
      otkazano = true;
    };
  }, [slike]);
  return null;
}
