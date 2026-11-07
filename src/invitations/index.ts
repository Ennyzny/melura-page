import type { Pozivnica } from "./tipovi";
import { opstaPozivnica } from "./salon";

// Registar pozivnica. Slug je i adresa: /invitations/<slug>. `salon` je opšta pozivnica za
// male salone; lične pozivnice za velike dodaje skill `/platform-pitch` u platformskom repou.
const pozivnice: Pozivnica[] = [opstaPozivnica];

export const sviSlugovi = () => pozivnice.map((p) => p.slug);

export const pozivnica = (slug: string) => pozivnice.find((p) => p.slug === slug);

export type { Pozivnica, Usluga, Snimak } from "./tipovi";
