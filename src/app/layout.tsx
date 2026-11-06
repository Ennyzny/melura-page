import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

const description =
  "Vlastita aplikacija vašeg salona u storeu, web booking link i QR kod, kalendar, tim i push podsjetnici — bez provizije po terminu i bez SMS troškova.";

// Ikone su fajlovi u app/ (favicon.ico, icon.svg, apple-icon.png) i Next ih sam upisuje u
// <head>; manifest je app/manifest.ts. Ovdje ostaje samo tekst i ponašanje.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Melura",
  title: {
    template: "%s · Melura",
    default: "Melura · booking aplikacija za vaš salon",
  },
  description,
  keywords: [
    "zakazivanje termina",
    "aplikacija za salon",
    "frizerski salon",
    "barber shop",
    "beauty salon",
    "fizioterapija",
    "online booking",
    "Bosna i Hercegovina",
  ],
  authors: [{ name: "Melura" }],
  creator: "Melura",
  publisher: "Melura",
  category: "business",
  // Telefon u tekstu (npr. 061 …) ne postaje link na iOS-u sam od sebe.
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    siteName: "Melura",
    locale: "bs_BA",
    url: "/",
    title: "Melura · booking aplikacija za vaš salon",
    description,
  },
  twitter: { card: "summary_large_image", title: "Melura · booking aplikacija za vaš salon", description },
  appleWebApp: { title: "Melura", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bs" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
