import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SplitWords } from "@/components/motion/motion-primitives";

/**
 * A suspense beat between chapters. One line, held in the dark,
 * arriving word by word so the reader has to wait for it.
 */
export function Whisper({ text, tag = "keep going" }: { text: string; tag?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);

  return (
    <div
      ref={ref}
      className="relative flex min-h-[60vh] items-center justify-center overflow-hidden px-6"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 h-64 blur-3xl"
        style={{
          y: "-50%",
          opacity: glow,
          background:
            "radial-gradient(50% 100% at 50% 50%, color-mix(in oklab, var(--color-glow) 14%, transparent), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl text-center">
        <motion.span
          aria-hidden="true"
          className="mx-auto mb-10 block h-16 w-px origin-top bg-gradient-to-b from-transparent via-primary/60 to-transparent"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <p className="font-display text-2xl leading-snug text-foreground sm:text-4xl">
          <SplitWords text={text} />
        </p>
        <motion.p
          className="mt-10 font-mono text-[10px] tracking-[0.5em] text-muted-foreground uppercase"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {tag}
        </motion.p>
      </div>
    </div>
  );
}
