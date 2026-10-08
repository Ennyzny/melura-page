// Javna adresa sajta — koristi se za OG preview, sitemap i robots.
// Na produkciji postaviti NEXT_PUBLIC_SITE_URL (npr. https://melura.ba).
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Adresa na koju stižu zahtjevi za demo (forma otvara popunjen email na ovu adresu).
// TODO: zamijeniti stvarnom adresom prije objave.
export const DEMO_EMAIL = "demo@melura.ba";
