import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#chapter-01", label: "Origin" },
  { href: "#chapter-03", label: "Systems" },
  { href: "#chapter-06", label: "Work" },
  { href: "#noor-heart", label: "نور" },
  { href: "#campfire", label: "Contact" },
];

/** Fixed glass command bar: identity, live clock, scroll telemetry & mobile hamburger menu. */
export function NavHUD() {
  const [progress, setProgress] = useState(0);
  const [solid, setSolid] = useState(false);
  const [clock, setClock] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          setProgress(max > 0 ? window.scrollY / max : 0);
          setSolid(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid || mobileMenuOpen ? "backdrop-blur-xl bg-background/80" : ""
      }`}
      style={{
        background: solid || mobileMenuOpen
          ? "linear-gradient(to bottom, color-mix(in oklab, var(--color-background) 92%, transparent), transparent)"
          : "transparent",
      }}
    >
      <nav className="mx-auto flex h-16 w-full max-w-[88rem] items-center justify-between px-6 lg:px-10">
        <a href="#top" className="group flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
          <span
            aria-hidden="true"
            className="breathe block h-2 w-2 rounded-full bg-neon shadow-[0_0_14px_var(--color-neon)]"
          />
          <span className="font-display text-sm tracking-[0.4em] text-foreground uppercase">
            Owaisism
          </span>
        </a>

        {/* Desktop navigation */}
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

        {/* Desktop & Mobile Telemetry / Hamburger */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden font-mono text-[10px] tracking-[0.3em] text-muted-foreground tabular-nums sm:block">
            {clock}
          </span>
          <span className="chip">{String(Math.round(progress * 100)).padStart(3, "0")}%</span>

          {/* Hamburger toggle button for mobile */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/50 text-foreground transition-colors hover:border-neon/50 hover:bg-secondary/60 md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-neon" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div aria-hidden="true" className="relative h-px w-full bg-border/60">
        <div
          className="h-px origin-left bg-gradient-to-r from-neon via-violet to-transparent"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* Mobile navigation drawer overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-border/80 bg-background/95 backdrop-blur-2xl md:hidden"
          >
            <div className="mx-auto flex flex-col space-y-3 px-6 py-6">
              <div className="flex items-center justify-between pb-2 border-b border-border/40 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                <span>Passage Index</span>
                <span className="tabular-nums">{clock}</span>
              </div>
              {LINKS.map((l, idx) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl p-3.5 font-display text-lg tracking-wide text-foreground transition-colors hover:bg-secondary/60 active:bg-secondary"
                >
                  <span>{l.label}</span>
                  <span className="font-mono text-xs tracking-widest text-neon/70">0{idx + 1}</span>
                </a>
              ))}
              <div className="pt-2 flex items-center justify-between font-mono text-xs text-muted-foreground">
                <a
                  href="/tasbih"
                  onClick={() => setMobileMenuOpen(false)}
                  className="chip text-[10px] tracking-[0.25em]"
                >
                  · Tasbih ·
                </a>
                <span className="text-[10px] tracking-widest text-muted-foreground/60 uppercase">OWAISISM</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
