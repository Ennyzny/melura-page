import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeatureSections } from "@/components/FeatureSections";
import { Industries } from "@/components/Industries";
import { Pricing } from "@/components/Pricing";
import { Apps, CtaBanner, Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeatureSections />
        <Industries />
        <Pricing />
        <CtaBanner />
        <Apps />
      </main>
      <Footer />
    </>
  );
}
