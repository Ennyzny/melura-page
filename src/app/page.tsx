import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Verticals } from "@/components/Verticals";
import { FeatureGrid } from "@/components/FeatureGrid";
import { FeatureTabs } from "@/components/FeatureTabs";
import { BookingFlow } from "@/components/BookingFlow";
import { NativeApp } from "@/components/NativeApp";
import { Benefits } from "@/components/Benefits";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { CtaBanner, Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Verticals />
        <FeatureGrid />
        <FeatureTabs />
        <BookingFlow />
        <NativeApp />
        <Benefits />
        <Pricing />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
