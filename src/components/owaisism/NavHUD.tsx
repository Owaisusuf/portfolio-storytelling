import { useEffect, useState } from "react";

const LINKS = [
  { href: "#chapter-01", label: "Origin" },
  { href: "#chapter-03", label: "Systems" },
  { href: "#chapter-06", label: "Work" },
  { href: "#noor-heart", label: "نور" },
  { href: "#campfire", label: "Contact" },
];

/** Fixed glass command bar: identity, live clock, scroll telemetry. */
export function NavHUD() {
  const [progress, setProgress] = useState(0);
  const [solid, setSolid] = useState(false);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setSolid(window.scrollY > 80);
    };
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    tick();
    const id = window.setInterval(tick, 1000);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.clearInterval(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        solid ? "backdrop-blur-xl" : ""
      }`}
      style={{
        background: solid
          ? "linear-gradient(to bottom, color-mix(in oklab, var(--color-background) 88%, transparent), transparent)"
          : "transparent",
      }}
    >
      <nav className="mx-auto flex h-16 w-full max-w-[88rem] items-center justify-between px-6 lg:px-10">
        <a href="#top" className="group flex items-center gap-3">
          <span
            aria-hidden="true"
            className="breathe block h-2 w-2 rounded-full bg-neon shadow-[0_0_14px_var(--color-neon)]"
          />
          <span className="font-display text-sm tracking-[0.4em] text-foreground uppercase">
            Owaisism
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase transition-colors hover:bg-secondary/50 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-[10px] tracking-[0.3em] text-muted-foreground tabular-nums sm:block">
            {clock}
          </span>
          <span className="chip">{String(Math.round(progress * 100)).padStart(3, "0")}%</span>
        </div>
      </nav>

      <div aria-hidden="true" className="relative h-px w-full bg-border/60">
        <div
          className="h-px origin-left bg-gradient-to-r from-neon via-violet to-transparent"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </header>
  );
}
