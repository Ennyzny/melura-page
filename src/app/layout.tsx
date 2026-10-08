import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DemoModal } from "@/components/DemoModal";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

const description =
  "Vlastita aplikacija vašeg salona u storeu, web booking link i QR kod, kalendar, tim i push podsjetnici — bez provizije po terminu i bez SMS troškova.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s — Melura",
    default: "Melura — vlastita booking aplikacija za vaš salon",
  },
  description,
  openGraph: {
    type: "website",
    siteName: "Melura",
    locale: "bs_BA",
    description,
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/brand/melura-znak.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bs" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#sadrzaj"
          className="sr-only z-[60] rounded-full bg-ink px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Preskoči na sadržaj
        </a>
        <Navbar />
        <main id="sadrzaj" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <DemoModal />
      </body>
    </html>
  );
}
