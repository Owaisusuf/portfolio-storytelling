import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Marquee } from "@/components/owaisism/Marquee";

const TASBIH_ITEMS = [
  "سُبْحَانَ اللّٰهِ وَبِحَمْدِهِ",
  "SubhanAllah",
  "الْحَمْدُ لِلّٰهِ",
  "Alhamdulillah",
  "اللّٰهُ أَكْبَرُ",
  "Allahu Akbar",
  "لا إِلهَ إِلا اللّٰهُ",
  "La ilaha illallah",
];

const PHRASES = [
  { arabic: "سُبْحَانَ اللّٰه", latin: "SubhanAllah" },
  { arabic: "الْحَمْدُ لِلّٰه", latin: "Alhamdulillah" },
  { arabic: "اللّٰهُ أَكْبَر", latin: "Allahu Akbar" },
];

const KEY = "noor-tasbih";
const TITLE = "Tasbih — نور | OWAISISM";
const DESCRIPTION =
  "A quiet counter. Press space for SubhanAllah, Alhamdulillah, Allahu Akbar. Counts stay on your device.";

export const Route = createFileRoute("/tasbih")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TasbihPage,
});

function TasbihPage() {
  const [counts, setCounts] = useState<number[]>([0, 0, 0]);
  const [active, setActive] = useState(0);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { counts?: number[]; active?: number };
        if (Array.isArray(parsed.counts) && parsed.counts.length === 3) setCounts(parsed.counts);
        if (typeof parsed.active === "number") setActive(parsed.active % 3);
      }
    } catch {
      /* first visit, or storage blocked */
    }
  }, []);

  const persist = useCallback((nextCounts: number[], nextActive: number) => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify({ counts: nextCounts, active: nextActive }));
    } catch {
      /* ignore */
    }
  }, []);

  const increment = useCallback(() => {
    setCounts((prev) => {
      const next = prev.slice();
      next[active] += 1;
      persist(next, active);
      return next;
    });
    setPulse((p) => p + 1);
  }, [active, persist]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        increment();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [increment]);

  const choose = (i: number) => {
    setActive(i);
    persist(counts, i);
  };

  const reset = () => {
    const zero = [0, 0, 0];
    setCounts(zero);
    persist(zero, active);
  };

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-24 overflow-hidden">
      <div className="absolute top-0 inset-x-0 pt-4 z-10 pointer-events-none">
        <Marquee items={TASBIH_ITEMS} variant="ember" speed="slow" />
      </div>
      <span
        aria-hidden="true"
        key={pulse}
        className="pulse-ring pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25"
      />

      <h1 className="font-mono text-[11px] tracking-[0.5em] text-muted-foreground uppercase">
        نور — tasbih
      </h1>

      <button
        type="button"
        onClick={increment}
        aria-label={`Count ${PHRASES[active].latin}`}
        className="relative z-10 mt-16 flex flex-col items-center gap-6 rounded-full px-14 py-14 transition-transform duration-200 active:scale-95"
      >
        <span className="font-arabic text-4xl text-foreground sm:text-6xl" dir="rtl">
          {PHRASES[active].arabic}
        </span>
        <span className="font-display text-6xl tabular-nums text-primary sm:text-8xl">
          {counts[active]}
        </span>
      </button>

      <ul className="relative z-10 mt-14 flex flex-wrap justify-center gap-3">
        {PHRASES.map((p, i) => (
          <li key={p.latin}>
            <button
              type="button"
              onClick={() => choose(i)}
              aria-pressed={i === active}
              className={`surface-glass rounded-full px-5 py-2 font-mono text-[10px] tracking-[0.3em] uppercase transition-colors ${
                i === active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p.latin} · {counts[i]}
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-12 font-mono text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
        <span className="breathe">press space</span>
      </p>

      <div className="mt-10 flex gap-6">
        <button
          type="button"
          onClick={reset}
          className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase hover:text-foreground"
        >
          reset
        </button>
        <Link
          to="/"
          className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase hover:text-foreground"
        >
          back
        </Link>
      </div>
    </main>
  );
}
