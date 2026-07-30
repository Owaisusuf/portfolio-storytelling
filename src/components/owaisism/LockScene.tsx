import { useRef, useState } from "react";

/** Chapter 03 — the pointer is the only light source in the room. */
export function LockScene() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
    const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1);
    ref.current.style.setProperty("--lock-x", `${x}%`);
    ref.current.style.setProperty("--lock-y", `${y}%`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative flex min-h-[22rem] items-center justify-center overflow-hidden rounded-xl border border-border bg-background"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(28rem 28rem at var(--lock-x, 50%) var(--lock-y, 50%), color-mix(in oklab, var(--color-glow) 22%, transparent), transparent 70%)`,
        }}
      />
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-pressed={open}
        className="relative z-10 flex flex-col items-center gap-4 px-6 text-center"
      >
        <span
          className={`glow-text font-display text-5xl transition-transform duration-700 ${
            open ? "scale-110 rotate-12" : ""
          }`}
          aria-hidden="true"
        >
          {open ? "🔓" : "🔒"}
        </span>
        <span className="font-mono text-[11px] tracking-[0.35em] text-primary/80 uppercase">
          {open ? "nothing is locked" : "click the lock"}
        </span>
        <span
          className={`max-w-md text-sm leading-relaxed text-muted-foreground transition-opacity duration-700 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          Knowledge opens possibilities. Integrity decides which doors remain closed.
        </span>
      </button>
    </div>
  );
}
