import { useEffect, useState } from "react";
import { OPENING } from "./noor-content";

/**
 * The first breath of the site: black, wind, one ayah — then it lets go.
 * Shown once per browser session so returning visitors aren't delayed.
 */
export function NoorOpening() {
  const [phase, setPhase] = useState<"hidden" | "in" | "out" | "gone">("hidden");

  const skip = () => {
    try {
      window.sessionStorage.setItem("noor-opening", "1");
    } catch {
      /* ignore */
    }
    setPhase("out");
    setTimeout(() => setPhase("gone"), 600);
  };

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem("noor-opening") === "1";
    } catch {
      /* storage blocked */
    }
    if (seen) {
      setPhase("gone");
      return;
    }
    try {
      window.sessionStorage.setItem("noor-opening", "1");
    } catch {
      /* ignore */
    }

    setPhase("in");
    const fade = window.setTimeout(() => setPhase("out"), 2200);
    const done = window.setTimeout(() => setPhase("gone"), 2900);
    return () => {
      window.clearTimeout(fade);
      window.clearTimeout(done);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden={phase === "out"}
      onClick={skip}
      className="fixed inset-0 z-[70] flex cursor-pointer items-center justify-center bg-background px-6 transition-opacity duration-700 select-none"
      style={{ opacity: phase === "out" ? 0 : 1, pointerEvents: phase === "out" ? "none" : "auto" }}
    >
      <div
        aria-hidden="true"
        className="aurora pointer-events-none absolute inset-x-0 top-1/2 h-72 -translate-y-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(45% 100% at 50% 50%, color-mix(in oklab, var(--color-primary) 10%, transparent), transparent 70%)",
        }}
      />
      <div
        data-visible={phase === "in"}
        className="relative z-10 max-w-2xl text-center"
        style={{ opacity: phase === "hidden" ? 0 : 1 }}
      >
        <p className="font-arabic text-2xl leading-loose text-foreground/90 sm:text-4xl" dir="rtl">
          {OPENING.arabic}
        </p>
        <p className="mt-6 font-display text-xl leading-snug text-foreground sm:text-2xl">
          {OPENING.text}
        </p>
        <p className="mt-4 font-mono text-[10px] tracking-[0.5em] text-muted-foreground uppercase">
          {OPENING.source}
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            skip();
          }}
          className="mt-8 rounded-full border border-border/80 bg-secondary/50 px-5 py-2 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase transition-colors hover:border-primary/50 hover:text-foreground"
        >
          Skip Intro →
        </button>
      </div>
    </div>
  );
}
