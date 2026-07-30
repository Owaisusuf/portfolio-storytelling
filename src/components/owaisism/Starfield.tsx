import { useEffect, useRef } from "react";

type Star = { x: number; y: number; z: number; r: number; tw: number };

/** Slow-drifting parallax starfield that reacts subtly to the pointer. */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let raf = 0;
    let t = 0;
    const pointer = { x: 0, y: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((width * height) / 7000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.9 + 0.1,
        r: Math.random() * 1.1 + 0.25,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const draw = () => {
      t += 0.004;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#c8e2ff";
      for (const s of stars) {
        const px = s.x + pointer.x * 22 * s.z;
        const py = s.y + pointer.y * 14 * s.z + Math.sin(t + s.tw) * 2 * s.z;
        const alpha = 0.25 + 0.55 * Math.abs(Math.sin(t * 1.6 + s.tw)) * s.z;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(px, py, s.r * s.z + 0.2, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    if (reduced) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-dvh w-full opacity-70"
    />
  );
}
