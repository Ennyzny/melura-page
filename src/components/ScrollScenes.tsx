import { MacbookScene } from "@/components/MacbookScene";
import { Phone3D } from "@/components/Phone3D";
import { ScrollScene, type SceneData } from "@/components/ScrollScene";
import laptop from "../../public/scroll/laptop/scene.json";
import saloni from "../../public/scroll/saloni/scene.json";

export function ScrollScenes() {
  // Tamni blok sa svim scenama, zaobljen gore i dole prema svijetlim sekcijama;
  // uređaji se pretapaju na ulazu i izlazu, pa između scena nema reza.
  // data-tamno čita Navbar da pređe u tamnu varijantu.
  return (
    <div data-tamno className="relative overflow-clip rounded-[2.5rem] bg-night">
      <div aria-hidden className="h-[14svh]" />
      <Phone3D
        slike={[1, 2, 3, 4].map((n) => `/scroll/lebdi/iphone-${n}.webp?v=3`)}
        duzina={5}
        koraci={[
          { kicker: "Za vaše klijente", naslov: "Vaš salon u njihovom džepu.", tekst: "Vlastita aplikacija sa imenom, bojama i cijenama vašeg salona — bez poziva i poruka." },
          { naslov: "Bira svog majstora…", tekst: "Sa slikom, da zna kod koga dolazi." },
          { naslov: "…i slobodan termin.", tekst: "Samo vremena koja stvarno postoje u vašem rasporedu." },
          { naslov: "Zahtjev je odmah kod vas.", tekst: "Klijent dobija obavještenje čim ga potvrdite." },
        ]}
      />
      <MacbookScene
        slike={(laptop as SceneData).ekrani[0].slike.map((s) => s.src)}
        koraci={[
          { kicker: "Za vas i vaš tim", naslov: "Melura: cijeli salon na jednom ekranu." },
          { naslov: "Danas.", tekst: "Zahtjevi na čekanju, sljedeći termin i zarada dana — čim otvorite." },
          { naslov: "Sedmica cijelog tima.", tekst: "Ko radi kada, gdje je rupa i šta čeka potvrdu." },
          { naslov: "Svaki klijent, sa historijom.", tekst: "Dolasci, nedolasci i VIP — bez sveske i bez pamćenja." },
        ]}
      />
      <ScrollScene
        scena={saloni as SceneData}
        fokus={1}
        obrnuto
        raspored="sredina"
        samoUredjaj
        duzina={3}
        koraci={[
          { kicker: "Jedna platforma", naslov: "Isti sistem iza svakog salona…" },
          { naslov: "…a svaki salon sa svojom aplikacijom.", tekst: "Barber, beauty ili fizio — vaše ime, vaše boje i vaš rječnik." },
        ]}
      />
      <div aria-hidden className="h-[10svh]" />
    </div>
  );
}
