/*
 * Pozicije sekcija bez mjerenja u toku skrola.
 *
 * getBoundingClientRect/offsetHeight poslije upisa stila tjeraju browser da u
 * tom kadru preračuna raspored cijele stranice (forced reflow); sa nekoliko
 * scena i navigacijom to se dešavalo više puta po kadru. Ovdje se element
 * izmjeri jednom (i ponovo samo kad se raspored stvarno promijeni), a skrol
 * pozicija se računa iz scrollY.
 */
type Mjera = { top: number; visina: number; vw: number; vh: number };

const elementi = new Map<Element, Mjera>();
let ro: ResizeObserver | null = null;
// I čitanje scrollY poslije upisa stila tjera preračun rasporeda, pa se pamti
// u scroll događaju (prije nego iko išta upiše u tom kadru).
let skrol = 0;

function izmjeri(el: Element): Mjera {
  const r = el.getBoundingClientRect();
  skrol = window.scrollY;
  return { top: r.top + skrol, visina: r.height, vw: window.innerWidth, vh: window.innerHeight };
}

function osvjeziSve() {
  elementi.forEach((_, el) => elementi.set(el, izmjeri(el)));
}

/** scrollY zapamćen u zadnjem scroll događaju (bez preračuna rasporeda). */
export const skrolY = () => skrol;

/** Prati element; vraća funkciju koja daje {top (u odnosu na prozor), visina, vw, vh}. */
export function pratiElement(el: Element) {
  if (!ro) {
    // promjena visine stranice (slike, fontovi) ili prozora pomjera sekcije
    skrol = window.scrollY;
    // capture: ovaj listener ide prije listenera scena
    window.addEventListener("scroll", () => (skrol = window.scrollY), { passive: true, capture: true });
    ro = new ResizeObserver(() => osvjeziSve());
    ro.observe(document.documentElement);
    window.addEventListener("resize", osvjeziSve);
    window.addEventListener("load", osvjeziSve);
  }
  elementi.set(el, izmjeri(el));
  return {
    citaj() {
      const m = elementi.get(el)!;
      return { top: m.top - skrol, bottom: m.top + m.visina - skrol, visina: m.visina, vw: m.vw, vh: m.vh };
    },
    prestani() {
      elementi.delete(el);
    },
  };
}
