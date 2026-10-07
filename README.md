# Melura — landing page (demo)

Marketing stranica za **Melura** booking platformu (vlastite booking aplikacije za frizere, beauty
salone, masere i stomatološke ordinacije). Struktura i stil su po uzoru na
[Fresha — features](https://www.fresha.com/for-business/features).

Sadržaj (funkcije, booking flow, paketi i cijene) je preuzet iz
[`htuco/salon-booking-platform`](https://github.com/htuco/salon-booking-platform) — `docs/01-mvp-spec.md`.
Screenshotovi u `public/screens/` su iz `prototype/` istog repoa, a Melura znak iz
`apps/admin/assets/brand/`.

## Pokretanje

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # statični build
```

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · lucide-react · Plus Jakarta Sans

## Sekcije

`src/components/` — Navbar · Hero (kolaž UI kartica) · FeatureSections (8 kategorija funkcija) ·
Industries (djelatnosti) · Pricing · CtaBanner · Apps · Footer.

> Demo: forma za demo i linkovi u footeru još nigdje ne vode.
