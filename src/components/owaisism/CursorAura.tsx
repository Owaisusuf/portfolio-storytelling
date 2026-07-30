import { useEffect, useRef } from "react";

/** A torch that follows the pointer. The site is dark; you carry the light. */
export function CursorAura() {
  const auraRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const soft = { ...target };
    let raf = 0;
    let isRunning = false;

    const tick = () => {
      const dx = target.x - soft.x;
      const dy = target.y - soft.y;
      soft.x += dx * 0.08;
      soft.y += dy * 0.08;

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${soft.x}px, ${soft.y}px, 0) translate(-50%, -50%)`;
      }

      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        isRunning = false;
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      startLoop();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    startLoop();
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 hidden md:block">
      <div
        ref={auraRef}
        className="absolute h-[28rem] w-[28rem] rounded-full opacity-60 blur-2xl will-change-transform"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-glow) 16%, transparent), transparent 65%)",
        }}
      />
      <div ref={dotRef} className="absolute h-2 w-2 rounded-full bg-primary/70 blur-[1px] will-change-transform" />
    </div>
  );
}
