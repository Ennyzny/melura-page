import type { Pozivnica } from "./tipovi";
import { beautyPozivnica } from "./beauty";
import { frizerPozivnica } from "./frizer";
import { hadisPozivnica } from "./hadis";
import { lotusPozivnica } from "./lotus";
import { masazaPozivnica } from "./masaza";

// Registar pozivnica. Slug je i adresa: /invitations/<slug>. `frizer`, `beauty` i `masaza` su
// opšte pozivnice za male salone po vertikali (sve kroz `opsta()`); lične pozivnice za velike
// (`hadis`, `lotus`) dodaje skill `/platform-pitch` u platformskom repou.
const pozivnice: Pozivnica[] = [frizerPozivnica, beautyPozivnica, masazaPozivnica, hadisPozivnica, lotusPozivnica];

export const sviSlugovi = () => pozivnice.map((p) => p.slug);

export const pozivnica = (slug: string) => pozivnice.find((p) => p.slug === slug);

export type { Pozivnica, Usluga, Snimak } from "./tipovi";
