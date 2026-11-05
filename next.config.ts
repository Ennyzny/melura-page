import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // dev server otvoren sa telefona na istoj mreži (inače Next blokira skripte)
  allowedDevOrigins: ["192.168.0.13"],
  partialPrefetching: true,
  // Modeli, dekoder i screenshoti se rijetko mijenjaju: browser ih čuva sedmicu
  // i odmah servira iz keša, a u pozadini provjeri ima li novijih (bitno na
  // sporoj mreži — druga posjeta ne skida ništa).
  async headers() {
    const kes = "public, max-age=604800, stale-while-revalidate=2592000";
    return ["/models/:path*", "/draco/:path*", "/scroll/:path*", "/screens/:path*"].map((source) => ({
      source,
      headers: [{ key: "Cache-Control", value: kes }],
    }));
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
