import { Hero } from "@/components/Hero";
import { ScrollScenes } from "@/components/ScrollScenes";
import { Highlights } from "@/components/Highlights";
import { Industries } from "@/components/Industries";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { CtaBanner } from "@/components/Footer";

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
