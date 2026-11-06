import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DemoModal } from "@/components/DemoModal";

// Javni sajt: navigacija, footer i demo modal. Pozivnice (/invitations) imaju svoj layout
// bez menija — do njih se dolazi samo linkom iz emaila.
export default function SajtLayout({ children }: LayoutProps<"/">) {
  return (
    <>
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
    </>
  );
}
