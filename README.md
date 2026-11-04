# Melura — landing page (demo)

Marketing stranica za **Melura** booking platformu (vlastite booking aplikacije za frizere, beauty
salone, masere i stomatološke ordinacije). Struktura i stil su po uzoru na
[Fresha — features](https://www.fresha.com/for-business/features).

Sadržaj (funkcije, booking flow, paketi i cijene) je preuzet iz
[`htuco/salon-booking-platform`](https://github.com/htuco/salon-booking-platform) — `docs/01-mvp-spec.md`.
Screenshotovi u `public/screens/` su iz prave aplikacije sa izmišljenim demo salonima
(Oštrica Barber Studio, Lumière Beauty Studio, Kinetika Fizio Centar) — nikad podaci pravih
salona. Telefonski ekrani su sa iPhonea 14 Pro Max (1290×2796), a Melura znak iz
`apps/admin/assets/brand/`.
Fotografije djelatnosti u `public/industries/` su sa [Unsplasha](https://unsplash.com/license)
(besplatne za komercijalnu upotrebu, bez obaveznog navođenja autora).

## Pokretanje

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # statični build
```

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · lucide-react · Plus Jakarta Sans

## Sekcije

`src/components/` — Navbar · Hero (kolaž UI kartica) · ScrollScenes (3D iPhone i MacBook na
skrol, three.js) · FeatureSections (8 kategorija funkcija) · Industries (djelatnosti) · Pricing ·
CtaBanner · Apps · Footer.

3D modeli su u `public/models/`: MacBook iz `rigged-macbook-3d` (model CC-BY 4.0, autor naveden u
footeru), iPhone iz `anna-abadi/iphone-3d` (licenca modela nepoznata — provjeriti prije objave).

> Demo: forma za demo i linkovi u footeru još nigdje ne vode.
