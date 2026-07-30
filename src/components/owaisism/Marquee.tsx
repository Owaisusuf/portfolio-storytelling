import { type ReactNode, useState } from "react";
import { motion } from "motion/react";

export type MarqueeVariant = "default" | "neon" | "ember" | "subtle" | "pills";

interface MarqueeProps {
  items?: (string | ReactNode)[];
  reverse?: boolean;
  speed?: "fast" | "normal" | "slow";
  variant?: MarqueeVariant;
  pauseOnHover?: boolean;
  className?: string;
}

const DEFAULT_ITEMS = [
  "Nothing Is Locked",
  "Curiosity Over Certainty",
  "Systems / Design / Faith",
  "Ask The Better Question",
  "Built From Kashmir",
];

export function Marquee({
  items = DEFAULT_ITEMS,
  reverse = false,
  speed = "normal",
  variant = "default",
  pauseOnHover = false,
  className = "",
}: MarqueeProps) {
  // Multiply items to ensure seamless infinite loop across wide screens (laptop, desktop, 4K)
  const doubled = [...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items];
  const [isPaused, setIsPaused] = useState(false);

  const durationMap = {
    fast: 16,
    normal: 28,
    slow: 45,
  };
  const duration = durationMap[speed] || 28;

  const variantStyles = {
    default: "border-y border-border/70 py-5 bg-background/40 backdrop-blur-sm",
    neon: "border-y border-neon/30 py-4 bg-neon/[0.03] backdrop-blur-md shadow-[0_0_25px_-5px_var(--color-neon)]",
    ember: "border-y border-ember/30 py-4 bg-ember/[0.03] backdrop-blur-md shadow-[0_0_25px_-5px_var(--color-ember)]",
    subtle: "py-3 opacity-80",
    pills: "border-y border-border/50 py-4 bg-surface/30",
  };

  const textStyles = {
    default: "font-display text-2xl tracking-tight whitespace-nowrap text-foreground/80 sm:text-4xl",
    neon: "font-display text-xl sm:text-3xl tracking-wide whitespace-nowrap text-neon font-medium glow-text",
    ember: "font-display text-xl sm:text-3xl tracking-wide whitespace-nowrap text-ember font-medium",
    subtle: "font-mono text-xs sm:text-sm tracking-[0.3em] uppercase whitespace-nowrap text-muted-foreground",
    pills: "font-mono text-xs tracking-[0.25em] uppercase whitespace-nowrap text-foreground",
  };

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden select-none ${variantStyles[variant]} ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className={`marquee-track flex w-max items-center gap-8 ${
          reverse ? "marquee-animate-right" : "marquee-animate-left"
        }`}
        style={{
          animationPlayState: isPaused ? "paused" : "running",
          animationDuration: `${duration}s`,
        }}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            {variant === "pills" ? (
              <span className="surface-glass inline-flex items-center gap-2.5 rounded-full px-5 py-2 transition-transform duration-300 hover:scale-105 hover:border-neon/40">
                <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
                <span className={textStyles[variant]}>{item}</span>
              </span>
            ) : (
              <span className={textStyles[variant]}>{item}</span>
            )}
            
            {variant !== "pills" && (
              <span
                className={`h-1.5 w-1.5 rotate-45 ${
                  variant === "neon"
                    ? "bg-neon shadow-[0_0_8px_var(--color-neon)]"
                    : variant === "ember"
                    ? "bg-ember shadow-[0_0_8px_var(--color-ember)]"
                    : "bg-neon/70"
                }`}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Pre-packaged marquee presets for easy usage */
export const TECH_ITEMS = [
  "TypeScript",
  "React 19",
  "Vite",
  "TailwindCSS",
  "Motion / Motion React",
  "System Architecture",
  "UI/UX Craft",
  "Performance Tuning",
  "Kashmir",
];

export const PHILOSOPHY_ITEMS = [
  "Curiosity Over Certainty",
  "Nothing Is Locked",
  "Ask The Better Question",
  "Silence Carries Weight",
  "The Floor Is Never A Ceiling",
];

export const SECURITY_ITEMS = [
  "SYSTEM AUDITING",
  "REVERSE ENGINEERING",
  "CRYPTOGRAPHY",
  "INTEGRITY FIRST",
  "CLEAN ARCHITECTURE",
  "ZERO FRICTION",
];

export const NOOR_ITEMS = [
  "سُبْحَانَ اللّٰهِ وَبِحَمْدِهِ",
  "ALHAMDULILLAH",
  "KNOWLEDGE & TAQWA",
  "RETURNING IS NOT WEAKNESS",
  "TIE YOUR CAMEL",
  "TRUST ALLAH",
];
