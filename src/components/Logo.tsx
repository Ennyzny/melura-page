type LogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

export function MeluraMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M16 23.5Q16 18 21.5 18L24 18Q27 18 29.12 20.12L44.88 35.88Q47 38 47 41L47 73Q47 82 38 82L25 82Q16 82 16 73Z"
        fill="#EE6C4D"
      />
      <path
        d="M70.88 20.12Q73 18 76 18L78.5 18Q84 18 84 23.5L84 73Q84 82 75 82L62 82Q53 82 53 73L53 41Q53 38 55.12 35.88Z"
        fill="#3D5A80"
      />
    </svg>
  );
}

export function Logo({ variant = "dark", className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <MeluraMark className="h-8 w-8" />
      <span
        className={`font-display text-2xl font-bold tracking-[0.14em] ${
          variant === "light" ? "text-white" : "text-ink"
        }`}
      >
        MELURA
      </span>
    </span>
  );
}
