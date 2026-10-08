import { ImageResponse } from "next/og";

export const alt = "Melura — vlastita booking aplikacija za salone";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Tekst je bez dijakritika jer ugrađeni font ImageResponse-a nema č, ć, š, đ, ž.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#f5f5f5",
          color: "#0d0d0d",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="72" height="72" viewBox="0 0 100 100">
            <path
              d="M16 23.5Q16 18 21.5 18L24 18Q27 18 29.12 20.12L44.88 35.88Q47 38 47 41L47 73Q47 82 38 82L25 82Q16 82 16 73Z"
              fill="#EE6C4D"
            />
            <path
              d="M70.88 20.12Q73 18 76 18L78.5 18Q84 18 84 23.5L84 73Q84 82 75 82L62 82Q53 82 53 73L53 41Q53 38 55.12 35.88Z"
              fill="#3D5A80"
            />
          </svg>
          <span style={{ fontSize: 56, fontWeight: 700, letterSpacing: -2 }}>melura</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, letterSpacing: -3 }}>
            Vlastita booking aplikacija za salone
          </span>
          <span style={{ marginTop: 28, fontSize: 36, color: "#3c3c3c" }}>
            Online booking, kalendar, tim i push podsjetnici na jednom mjestu
          </span>
        </div>
      </div>
    ),
    size,
  );
}
