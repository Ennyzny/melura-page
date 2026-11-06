// Ilustracije za 404 i greške, u bojama Melura znaka (coral #EE6C4D, navy #3D5A80).
// Kalendar je „termin koji ne postoji", koverat je pozivnica koje nema.

const CORAL = "#EE6C4D";
const NAVY = "#3D5A80";
const INK = "#0d0d0d";

export type VrstaIlustracije = "kalendar" | "koverat" | "greska";

export function StatusIlustracija({ vrsta, className = "" }: { vrsta: VrstaIlustracije; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none">
      {/* sjena */}
      <ellipse cx="100" cy="186" rx="62" ry="7" fill={INK} opacity="0.07" />
      {vrsta === "koverat" ? <Koverat /> : <Kalendar />}
      {vrsta === "greska" ? <Uskličnik /> : <Kriz />}
    </svg>
  );
}

function Kalendar() {
  return (
    <g transform="rotate(-6 100 100)">
      <rect x="34" y="38" width="132" height="132" rx="22" fill="#fff" stroke={INK} strokeWidth="6" />
      <path d="M34 60a22 22 0 0 1 22-22h88a22 22 0 0 1 22 22v14H34z" fill={CORAL} stroke={INK} strokeWidth="6" strokeLinejoin="round" />
      <rect x="64" y="22" width="12" height="30" rx="6" fill={NAVY} stroke={INK} strokeWidth="5" />
      <rect x="124" y="22" width="12" height="30" rx="6" fill={NAVY} stroke={INK} strokeWidth="5" />
      {/* dani: jedan termin je izbrisan */}
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={52 + c * 26}
            y={90 + r * 24}
            width="16"
            height="12"
            rx="4"
            fill={r === 1 && c === 2 ? "none" : "#e3e3e3"}
            stroke={r === 1 && c === 2 ? CORAL : "none"}
            strokeWidth="3"
            strokeDasharray="4 4"
          />
        )),
      )}
    </g>
  );
}

function Koverat() {
  return (
    <g transform="rotate(-6 100 110)">
      <rect x="26" y="58" width="148" height="104" rx="16" fill="#fff" stroke={INK} strokeWidth="6" />
      <path d="M30 66l70 52 70-52" stroke={INK} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 156l52-40M170 156l-52-40" stroke={INK} strokeWidth="5" strokeLinecap="round" opacity="0.25" />
    </g>
  );
}

function Kriz() {
  return (
    <g>
      <circle cx="150" cy="150" r="30" fill={CORAL} stroke={INK} strokeWidth="6" />
      <path d="M139 139l22 22M161 139l-22 22" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
    </g>
  );
}

function Uskličnik() {
  return (
    <g>
      <circle cx="150" cy="150" r="30" fill={NAVY} stroke={INK} strokeWidth="6" />
      <path d="M150 135v17" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
      <circle cx="150" cy="164" r="4.5" fill="#fff" />
    </g>
  );
}
