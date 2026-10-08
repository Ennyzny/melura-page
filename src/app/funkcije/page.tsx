import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { FeatureSections } from "@/components/FeatureSections";
import { Industries } from "@/components/Industries";
import { CtaBanner, Footer } from "@/components/Footer";
import { DevicePreview } from "@/components/DevicePreview";
import { Reveal } from "@/components/Reveal";
import { BookingFlow } from "@/components/BookingFlow";
import { MeluraMark } from "@/components/Logo";
import { FeatureDetails } from "@/components/FeatureDetails";

export const metadata: Metadata = {
  title: "Funkcije — Melura",
  description: "Kako Melura povezuje klijentsku aplikaciju, zakazivanje, zahtjeve i raspored vašeg salona.",
};
export default function FeaturesPage() {
  return <><Navbar /><main className="flex-1">
    <section className="bg-fog px-6 py-16 text-center sm:py-24">
      <Link href="/" className="text-sm font-semibold text-muted">← Početna</Link>
      <h1 className="mt-5 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-2 text-3xl font-bold tracking-tight sm:gap-x-4 sm:text-6xl">
        <span>Kako</span>
        <span className="inline-flex items-baseline gap-1 sm:gap-2">
          <MeluraMark className="h-[1em] w-[1em] translate-y-[0.18em] shrink-0" />
          <span>melura</span>
        </span>
        <span>radi?</span>
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">Klijent bira termin. Vi birate način potvrde. Raspored ostaje pregledan.</p>
      <div className="mx-auto mt-10 grid max-w-4xl gap-5 text-left sm:grid-cols-3">
        {[
          ["01", "Klijent zakazuje", "Bira uslugu, majstora i slobodno vrijeme u aplikaciji vašeg salona."],
          ["02", "Vi birate pravila", "Termini se potvrđuju automatski ili nakon vašeg odobrenja."],
          ["03", "Svi imaju pregled", "Klijent prati svoj termin, a vaš tim vidi raspored i obaveze."],
        ].map(([number, title, text]) => <Reveal key={number}><div className="rounded-2xl bg-white p-6"><span className="font-semibold text-coral">{number}</span><h2 className="mt-3 text-xl font-bold">{title}</h2><p className="mt-3 text-ink-soft">{text}</p></div></Reveal>)}
      </div>
    </section>
    <section id="aplikacije" className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="mb-10 text-center text-3xl font-bold">Dvije aplikacije, jedan sistem</h2>
      <div className="flex justify-center gap-6 sm:gap-12">
        <div className="w-[44%] max-w-[280px]"><Reveal><DevicePreview src="/screens/phone/client-home.png" alt="Klijentska aplikacija Amko Barbershop" /><p className="mt-4 text-center text-sm text-muted">Aplikacija vašeg salona</p></Reveal></div>
        <div className="w-[44%] max-w-[280px]"><Reveal><DevicePreview src="/screens/phone/admin-today.png" alt="Melura admin za Barber Studio Vitez" /><p className="mt-4 text-center text-sm text-muted">Melura admin za vaš tim</p></Reveal></div>
      </div>
    </section>
    <BookingFlow />
    <section className="mx-auto max-w-[1200px] px-6 py-16">
      <FeatureDetails><FeatureSections /></FeatureDetails>
    </section>
    <Industries /><CtaBanner />
  </main><Footer /></>;
}
