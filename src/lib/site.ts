// Javna adresa sajta — koristi se za OG preview, sitemap i robots.
// Na produkciji postaviti NEXT_PUBLIC_SITE_URL (npr. https://melura.ba).
// Bez NEXT_PUBLIC_SITE_URL na Vercelu se uzima produkcijska domena koju Vercel sam postavlja
// (VERCEL_PROJECT_PRODUCTION_URL, bez https://). Inače bi og:image i canonical pokazivali na
// localhost i preview linka u emailu/Viberu bi bio bez slike.
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercel ? `https://${vercel}` : "http://localhost:3000");

// Naš email. Forme ne šalju same na njega nego kroz Web3Forms, čiji je ključ vezan za ovu adresu.
export const DEMO_EMAIL = "meluraapp@gmail.com";

// Web3Forms access key (app.web3forms.com) — javan po dizajnu, samo usmjerava poruke na naš email.
export const WEB3FORMS_KEY = "167b999a-c0e6-4211-8b16-5ce9d3918c3f";
