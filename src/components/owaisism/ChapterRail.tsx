import { useEffect, useState } from "react";

const STOPS = [
  { id: "top", label: "Start" },
  { id: "chapter-01", label: "Who am I" },
  { id: "chapter-02", label: "First question" },
  { id: "chapter-03", label: "The key" },
  { id: "noor-heart", label: "The heart" },
  { id: "chapter-04", label: "Schools" },
  { id: "chapter-05", label: "Side quests" },
  { id: "chapter-06", label: "Designer" },
  { id: "chapter-07", label: "Builder" },
  { id: "chapter-08", label: "Philosopher" },
  { id: "chapter-09", label: "Family" },
  { id: "chapter-10", label: "The future" },
  { id: "campfire", label: "Contact" },
];

/** Right-edge index rail — always shows where you are in the passage. */
export function ChapterRail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const mid = window.innerHeight * 0.45;
          let current = STOPS[0].id;
          for (const stop of STOPS) {
            const el = document.getElementById(stop.id);
            if (el && el.getBoundingClientRect().top <= mid) current = stop.id;
          }
          setActive(current);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Chapter index"
      className="fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
    >
      {STOPS.map((stop) => {
        const on = active === stop.id;
        return (
          <a
            key={stop.id}
            href={`#${stop.id}`}
            className="group flex items-center gap-3"
            aria-current={on ? "true" : undefined}
          >
            <span className="pointer-events-none font-mono text-[9px] tracking-[0.3em] text-muted-foreground uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {stop.label}
            </span>
            <span
              className={`block h-px transition-all duration-500 ${
                on
                  ? "w-8 bg-neon shadow-[0_0_10px_var(--color-neon)]"
                  : "w-3 bg-foreground/25 group-hover:w-6 group-hover:bg-foreground/60"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
