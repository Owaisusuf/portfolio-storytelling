import { useEffect, useRef, useState } from "react";
import { HEART_HADITH } from "./noor-content";
import { NoorSaying } from "./NoorSaying";

const LINES = [
  "Every machine can be upgraded.",
  "Every program can be rewritten.",
  "Every system can be patched.",
  "The heart is different.",
  "If it becomes corrupted, nothing else truly works.",
];

/** The heart returns to light as the visitor scrolls through the section. */
export function HeartOS() {
  const ref = useRef<HTMLElement | null>(null);
  const [light, setLight] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const seen = window.innerHeight - rect.top;
      setLight(Math.min(1, Math.max(0, seen / total)));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="noor-heart"
      aria-labelledby="noor-heart-title"
      className="relative flex min-h-dvh flex-col justify-center gap-20 overflow-hidden py-28"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-mono text-xs tracking-[0.45em] text-primary/80 uppercase">
            نور — the inner journey
          </p>
          <h2
            id="noor-heart-title"
            className="glow-text mt-4 font-display text-4xl leading-[1.05] font-medium sm:text-5xl"
          >
            The heart is the real operating system
          </h2>
          <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {LINES.map((line, i) => (
              <p
                key={line}
                className="transition-all duration-700"
                style={{
                  opacity: 0.25 + light * 1.4 - i * 0.12,
                  transform: `translateY(${Math.max(0, 12 - light * 40 + i * 4)}px)`,
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute h-72 w-72 rounded-full blur-3xl transition-opacity duration-700"
            style={{
              opacity: 0.15 + light * 0.7,
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--color-ember) 45%, transparent), transparent 70%)",
            }}
          />
          <svg
            viewBox="0 0 100 92"
            role="img"
            aria-label="A heart slowly filling with light"
            className="relative h-56 w-56 sm:h-72 sm:w-72"
            style={{ transform: `scale(${0.94 + light * 0.08})`, transition: "transform 700ms" }}
          >
            <defs>
              <linearGradient id="noor-heart-fill" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="var(--color-ember)" stopOpacity="0.85" />
                <stop offset={`${Math.round(light * 100)}%`} stopColor="var(--color-primary)" stopOpacity="0.55" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M50 88C22 68 4 51 4 30.5 4 15.5 15.5 5 29 5c8.6 0 16.4 4.6 21 12 4.6-7.4 12.4-12 21-12 13.5 0 25 10.5 25 25.5C96 51 78 68 50 88Z"
              fill="url(#noor-heart-fill)"
              stroke="color-mix(in oklab, var(--color-primary) 55%, transparent)"
              strokeWidth="1"
              style={{ opacity: 0.35 + light * 0.65 }}
            />
          </svg>
        </div>
      </div>

      <div className="relative z-10 px-6">
        <NoorSaying saying={HEART_HADITH} size="sm" />
      </div>
    </section>
  );
}
