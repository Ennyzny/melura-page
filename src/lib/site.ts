// Javna adresa sajta — koristi se za OG preview, sitemap i robots.
// Na produkciji postaviti NEXT_PUBLIC_SITE_URL (npr. https://melura.ba).
// Bez NEXT_PUBLIC_SITE_URL na Vercelu se uzima produkcijska domena koju Vercel sam postavlja
// (VERCEL_PROJECT_PRODUCTION_URL, bez https://). Inače bi og:image i canonical pokazivali na
// localhost i preview linka u emailu/Viberu bi bio bez slike.
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercel ? `https://${vercel}` : "http://localhost:3000");

// Adresa na koju stižu zahtjevi za demo (forma otvara popunjen email na ovu adresu).
// TODO: zamijeniti stvarnom adresom prije objave.
export const DEMO_EMAIL = "demo@melura.ba";
