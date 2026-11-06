import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ScrollScenes } from "@/components/ScrollScenes";
import { Highlights } from "@/components/Highlights";
import { Industries } from "@/components/Industries";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { CtaBanner } from "@/components/Footer";

// Canonical samo za početnu; u root layoutu bi ga naslijedile i podstranice.
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollScenes />
      <Highlights />
      <Industries />
      <Pricing />
      <Faq />
      <CtaBanner />
    </>
  );
}
