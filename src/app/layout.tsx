import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Funkcije — Melura",
  description:
    "Jedna platforma, sve što vašem salonu treba: vlastita aplikacija u storeu, online booking, kalendar, klijenti, tim i push podsjetnici.",
  icons: { icon: "/brand/melura-znak.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bs" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
