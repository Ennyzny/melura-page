import { MacbookScene } from "@/components/MacbookScene";
import { Phone3D } from "@/components/Phone3D";
import { ScrollScene, type SceneData } from "@/components/ScrollScene";
import { Preducitaj } from "@/components/Preducitaj";
import laptop from "../../public/scroll/laptop/scene.json";
import saloni from "../../public/scroll/saloni/scene.json";

const IPHONE = [1, 2, 3, 4].map((n) => `/scroll/lebdi/iphone-${n}.webp?v=3`);
const SVE_SLIKE = [
  ...IPHONE,
  ...(laptop as SceneData).ekrani[0].slike.map((s) => s.src),
  (saloni as SceneData).bg.uredjaj,
  ...(saloni as SceneData).ekrani.flatMap((e) => e.slike.map((s) => s.src)),
];

export function ScrollScenes() {
  // Tamni blok sa svim scenama, zaobljen gore i dole prema svijetlim sekcijama;
  // uređaji se pretapaju na ulazu i izlazu, pa između scena nema reza.
  // Uglove nose dvije trake gore i dole, a ne zaobljen okvir oko cijelog bloka:
  // takav okvir bi telefon maskirao u svakom kadru skrola preko 3D scena.
  // data-tamno čita Navbar da pređe u tamnu varijantu.
  return (
    <div data-tamno className="relative">
      <Preducitaj slike={SVE_SLIKE} />
      <div aria-hidden className="h-10 rounded-t-[2.5rem] bg-night" />
      {/* -mt-px: preklop od jednog piksela, da se između traka i bloka ne vidi šav */}
      <div className="-mt-px bg-night">
      <div aria-hidden className="h-[calc(14svh-2.5rem+1px)]" />
      <Phone3D
        slike={IPHONE}
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
        duzina={3}
        koraci={[
          { kicker: "Jedna platforma", naslov: "Isti sistem iza svakog salona…" },
          { naslov: "…a svaki salon sa svojom aplikacijom.", tekst: "Barber, beauty ili fizio — vaše ime, vaše boje i vaš rječnik." },
        ]}
      />
      <div aria-hidden className="h-[calc(10svh-2.5rem+1px)]" />
      </div>
      <div aria-hidden className="-mt-px h-10 rounded-b-[2.5rem] bg-night" />
    </div>
  );
}
