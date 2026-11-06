import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Melura",
    short_name: "Melura",
    description: "Booking aplikacija za salone: vaša aplikacija u storeu, web booking, kalendar i tim.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "bs",
    icons: [
      { src: "/brand/ikona-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/ikona-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/ikona-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
