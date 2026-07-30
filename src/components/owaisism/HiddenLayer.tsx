import { useEffect, useState } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/** Konami code + a journey progress rail. Curiosity is rewarded. */
export function HiddenLayer() {
  const [unlocked, setUnlocked] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let buffer: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      buffer = [...buffer, e.key].slice(-KONAMI.length);
      if (buffer.join("|").toLowerCase() === KONAMI.join("|").toLowerCase()) setUnlocked(true);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    console.log(
      "%cOWAISISM — nothing is locked.",
      "color:#7FD7FF;font-size:14px;letter-spacing:2px",
    );
    console.log("%cyou opened the console. of course you did. try the konami code.", "color:#94A3B8");
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 z-50 h-px w-full bg-gradient-to-r from-primary via-glow to-transparent origin-left"
        style={{ transform: `scaleX(${progress})` }}
      />
      {unlocked ? (
        <div
          role="status"
          className="surface-glass fixed bottom-6 left-1/2 z-50 w-[min(92vw,32rem)] -translate-x-1/2 rounded-xl p-5 text-center"
        >
          <p className="font-mono text-xs tracking-[0.35em] text-primary uppercase">
            Artifact unlocked
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            At 3 AM, the question that keeps me awake is simple:{" "}
            <span className="text-foreground">what else was I never told to look for?</span>
          </p>
          <button
            type="button"
            onClick={() => setUnlocked(false)}
            className="mt-4 rounded-md border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-secondary"
          >
            Close
          </button>
        </div>
      ) : null}
    </>
  );
}
