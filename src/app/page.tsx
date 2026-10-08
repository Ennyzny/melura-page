import Link from "next/link";
import { ArrowRight, CalendarCheck2, Smartphone, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import { CtaBanner, Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <section className="mx-auto max-w-[1200px] px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Vaš salon, jednostavnije organizovan.</h2>
            <p className="mt-4 text-lg text-ink-soft">Od prvog zahtjeva do pregleda dana — sve povezano u jednom sistemu.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: Smartphone, title: "Vlastita aplikacija", text: "Ime i boje vašeg salona. Jedno mjesto gdje se klijenti vraćaju da zakažu termin." },
              { icon: CalendarCheck2, title: "Online zakazivanje", text: "Klijenti biraju uslugu i slobodan termin. Vi pregledate i potvrđujete zahtjeve." },
              { icon: Users, title: "Pregledan raspored", text: "Termini, osoblje i usluge na telefonu ili računaru — pregledno za cijeli tim." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl bg-fog p-7">
                <Icon className="mb-5 h-7 w-7 text-coral" />
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center"><Link href="/funkcije" className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-white">Istraži sve funkcije <ArrowRight className="h-4 w-4" /></Link></div>
        </section>
        <Pricing />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
