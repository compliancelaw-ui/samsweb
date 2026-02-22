interface LogoProps {
  variant?: "header" | "footer" | "full";
  className?: string;
}

/**
 * Sam's OATH stacked logo (1B).
 * - header: compact for nav bar with tagline
 * - footer: compact for dark footer
 * - full: full size with prominent tagline
 */
export function Logo({ variant = "header", className }: LogoProps) {
  if (variant === "full") {
    return (
      <svg
        viewBox="0 0 310 135"
        className={className}
        aria-label="Sam's OATH — What's Hidden Doesn't Heal"
        role="img"
      >
        <text
          x="155"
          y="28"
          textAnchor="middle"
          fontFamily="Inter, system-ui, -apple-system, sans-serif"
          fontWeight="400"
          fontSize="22"
          fill="#2E3B4E"
          letterSpacing="6"
        >
          SAM&apos;S
        </text>
        <text x="36" y="95" fontFamily="Inter, system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="76" fill="#3EABA8" letterSpacing="-3">O</text>
        <text x="92" y="95" fontFamily="Inter, system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="76" fill="#4A6FA5" letterSpacing="-3">A</text>
        <text x="154" y="95" fontFamily="Inter, system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="76" fill="#7AB87A" letterSpacing="-3">T</text>
        <text x="206" y="95" fontFamily="Inter, system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="76" fill="#E8956F" letterSpacing="-3">H</text>
        <line x1="36" y1="106" x2="272" y2="106" stroke="#3EABA8" strokeWidth="3" strokeLinecap="round" />
        <text
          x="155"
          y="126"
          textAnchor="middle"
          fontFamily="Inter, system-ui, -apple-system, sans-serif"
          fontWeight="600"
          fontSize="13"
          fill="#4B5563"
          letterSpacing="2.5"
        >
          WHAT&apos;S HIDDEN DOESN&apos;T HEAL
        </text>
      </svg>
    );
  }

  if (variant === "footer") {
    return (
      <svg
        viewBox="0 0 140 66"
        className={className}
        aria-label="Sam's OATH — What's Hidden Doesn't Heal"
        role="img"
      >
        <text
          x="70"
          y="12"
          textAnchor="middle"
          fontFamily="Inter, system-ui, -apple-system, sans-serif"
          fontWeight="400"
          fontSize="10"
          fill="#D1D5DB"
          letterSpacing="3"
        >
          SAM&apos;S
        </text>
        <text x="15" y="44" fontFamily="Inter, system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="36" fill="#3EABA8" letterSpacing="-1">O</text>
        <text x="41" y="44" fontFamily="Inter, system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="36" fill="#6B9FD4" letterSpacing="-1">A</text>
        <text x="70" y="44" fontFamily="Inter, system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="36" fill="#7AB87A" letterSpacing="-1">T</text>
        <text x="94" y="44" fontFamily="Inter, system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="36" fill="#E8956F" letterSpacing="-1">H</text>
        <line x1="15" y1="50" x2="125" y2="50" stroke="#3EABA8" strokeWidth="1.5" strokeLinecap="round" />
        <text
          x="70"
          y="63"
          textAnchor="middle"
          fontFamily="Inter, system-ui, -apple-system, sans-serif"
          fontWeight="500"
          fontSize="5.5"
          fill="#9CA3AF"
          letterSpacing="1"
        >
          WHAT&apos;S HIDDEN DOESN&apos;T HEAL
        </text>
      </svg>
    );
  }

  // header variant (default) — compact stacked for nav bar with tagline
  return (
    <svg
      viewBox="0 0 140 66"
      className={className}
      aria-label="Sam's OATH — What's Hidden Doesn't Heal"
      role="img"
    >
      <text
        x="70"
        y="12"
        textAnchor="middle"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="400"
        fontSize="10"
        fill="#2E3B4E"
        letterSpacing="3"
      >
        SAM&apos;S
      </text>
      <text x="15" y="44" fontFamily="Inter, system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="36" fill="#3EABA8" letterSpacing="-1">O</text>
      <text x="41" y="44" fontFamily="Inter, system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="36" fill="#4A6FA5" letterSpacing="-1">A</text>
      <text x="70" y="44" fontFamily="Inter, system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="36" fill="#7AB87A" letterSpacing="-1">T</text>
      <text x="94" y="44" fontFamily="Inter, system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="36" fill="#E8956F" letterSpacing="-1">H</text>
      <line x1="15" y1="50" x2="125" y2="50" stroke="#3EABA8" strokeWidth="1.5" strokeLinecap="round" />
      <text
        x="70"
        y="63"
        textAnchor="middle"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="600"
        fontSize="5.5"
        fill="#4B5563"
        letterSpacing="1"
      >
        WHAT&apos;S HIDDEN DOESN&apos;T HEAL
      </text>
    </svg>
  );
}
