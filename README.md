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

- `/` — Hero · ScrollScenes (3D iPhone, MacBook i tri salona) · Highlights (šta je Melura) · Industries · Pricing · Faq · CtaBanner (forma za demo)
- `/funkcije` — BookingStory (jedna rezervacija, korak po korak) · FeatureSections · Apps · CtaBanner

Navbar i Footer su u `src/app/layout.tsx`.

Forma „Zakaži demo“ (`src/components/DemoForm.tsx`) otvara klijentov email program s popunjenim
zahtjevom — bez backenda. Adresa primaoca je u `src/lib/site.ts` (`DEMO_EMAIL`).

Na produkciji postaviti `NEXT_PUBLIC_SITE_URL` (npr. `https://melura.ba`) — koristi se za
preview pri dijeljenju linka, `sitemap.xml` i `robots.txt`.

Cjenovnik je iza feature flaga (`src/lib/flags.ts`): bez `NEXT_PUBLIC_CIJENE=1` sekcija
`#cijene` najavljuje plan cijena, a FAQ i funkcije ne spominju pakete ni uslove ugovora.

Pozivnice salonima su na `/invitations/<slug>` (van menija, `noindex`): sadržaj u
`src/invitations/`, slike u `public/invitations/`. Za male salone postoje tri opšte
pozivnice po vertikali: `/invitations/frizer` (frizerski i barber, snimci sa landinga), `/beauty` i
`/masaza` (snimci demo salona u `public/invitations/<slug>/`). Prave se kroz `opsta()` u
`src/invitations/opsta.ts`: bez imena i logotipa, Melurine boje, cjenovnik traži ime salona i
kontakt. Lične pozivnice su za velike salone. Ikone su fajlovi u `src/app/`
(`favicon.ico`, `icon.svg`, `apple-icon.png`) uz `manifest.ts`; 404 i greške su
`not-found.tsx`, `error.tsx` i `global-error.tsx`.

Tvrdnje na stranici prate `docs/01-mvp-spec.md`: funkcije, djelatnosti i stavke paketa koje
specifikacija stavlja u Fazu 2 ili kasnije označene su sa „Uskoro“.

## 3D scene

`src/components/ScrollScenes.tsx` slaže tri scene na početnoj: 3D iPhone (`Phone3D`), 3D MacBook
(`MacbookScene`, paket `rigged-macbook-3d`) i tri telefona (`ScrollScene`). Kadrovi idu po
koraku teksta, a na užim ekranima zum je blaži ili ga nema.

Modeli su u `public/models/`, Draco dekoder u `public/draco/`:
- MacBook — "MacBook Pro M3 16-inch 2024", jackbaeten, CC-BY 4.0.
- iPhone — iz `anna-abadi/iphone-3d`; licenca modela nije navedena, provjeriti prije objave.

