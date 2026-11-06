// Feature flagovi landinga. Uključuju se env varijablom u buildu (NEXT_PUBLIC_*), pa se
// odluka ne čita iz koda: isti commit može ići sa cijenama i bez njih.

/**
 * Cjenovnik sa paketima. Ugašen dok plan cijena nije potvrđen (v. #298) — umjesto paketa
 * landing kaže da plan stiže uskoro, a FAQ ne spominje pakete ni uslove ugovora.
 * Uključivanje: NEXT_PUBLIC_CIJENE=1.
 */
export const CIJENE = process.env.NEXT_PUBLIC_CIJENE === "1";
