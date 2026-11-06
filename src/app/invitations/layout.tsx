import type { Metadata } from "next";

// Pozivnice su lične: do njih se dolazi samo linkom iz emaila. Nisu u meniju, sitemapu ni
// robots.txt-u (Disallow bi javno izlistao putanju), a pretraživači ih ne indeksiraju.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function PozivniceLayout({ children }: LayoutProps<"/invitations">) {
  return <main className="flex-1">{children}</main>;
}
