import type { Pozivnica } from "./tipovi";
import { studioMaestro } from "./studio-maestro";

// Registar pozivnica. Slug je i adresa: /invitations/<slug>. Nove dodaje skill
// `/platform-pitch` u platformskom repou.
const pozivnice: Pozivnica[] = [studioMaestro];

export const sviSlugovi = () => pozivnice.map((p) => p.slug);

export const pozivnica = (slug: string) => pozivnice.find((p) => p.slug === slug);

export type { Pozivnica, Usluga, Snimak } from "./tipovi";
