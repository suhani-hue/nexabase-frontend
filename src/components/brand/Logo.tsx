type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export function NexabaseMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="Nexabase mark"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="nx-grad" x1="4" y1="6" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="oklch(0.9 0.15 178)" />
          <stop offset="0.5" stopColor="oklch(0.82 0.18 165)" />
          <stop offset="1" stopColor="oklch(0.6 0.24 292)" />
        </linearGradient>
      </defs>
      <g stroke="url(#nx-grad)" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round">
        <path d="M24 5 41 14v9L24 32 7 23v-9L24 5Z" />
        <path d="M7 23v9l17 9 17-9v-9" opacity="0.55" />
        <path d="M7 14l17 9 17-9" />
      </g>
      <g fill="url(#nx-grad)">
        <circle cx="24" cy="23" r="3.4" />
        <circle cx="24" cy="41" r="2.2" opacity="0.8" />
      </g>
    </svg>
  );
}

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <NexabaseMark className="h-8 w-8 drop-shadow-[0_0_14px_color-mix(in_oklab,var(--primary)_45%,transparent)]" />
      {showWordmark && (
        <span className="font-display text-[1.35rem] font-bold tracking-tight">
          Nexa<span className="text-gradient">base</span>
        </span>
      )}
    </span>
  );
}