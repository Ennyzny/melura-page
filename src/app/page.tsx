import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { Industries } from "@/components/Industries";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { CtaBanner } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <Industries />
      <Pricing />
      <Faq />
      <CtaBanner />
    </>
  );
}
