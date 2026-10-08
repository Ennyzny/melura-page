# Melura — landing page (demo)

Marketing stranica za **Melura** booking platformu (vlastite booking aplikacije za frizere, beauty
salone, masere i stomatološke ordinacije). Struktura i stil su po uzoru na
[Fresha — features](https://www.fresha.com/for-business/features).

Sadržaj (funkcije, booking flow, paketi i cijene) je preuzet iz
[`htuco/salon-booking-platform`](https://github.com/htuco/salon-booking-platform) — `docs/01-mvp-spec.md`.
Screenshotovi u `public/screens/` su iz `prototype/` istog repoa, a Melura znak iz
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

- `/` — Hero · Highlights (šta je Melura) · Industries · Pricing · Faq · CtaBanner (forma za demo)
- `/funkcije` — BookingStory (jedna rezervacija, korak po korak) · FeatureSections · Apps · CtaBanner

Navbar i Footer su u `src/app/layout.tsx`.

Forma „Zakaži demo“ (`src/components/DemoForm.tsx`) otvara klijentov email program s popunjenim
zahtjevom — bez backenda. Adresa primaoca je u `src/lib/site.ts` (`DEMO_EMAIL`).

Na produkciji postaviti `NEXT_PUBLIC_SITE_URL` (npr. `https://melura.ba`) — koristi se za
preview pri dijeljenju linka, `sitemap.xml` i `robots.txt`.

Tvrdnje na stranici prate `docs/01-mvp-spec.md`: funkcije, djelatnosti i stavke paketa koje
specifikacija stavlja u Fazu 2 ili kasnije označene su sa „Uskoro“.
