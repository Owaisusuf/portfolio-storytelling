import type { ReactNode } from "react";
import { motion } from "motion/react";
import { FadeUp, ParallaxImage, SplitWords } from "@/components/motion/motion-primitives";

/** A quiet, image-backed reflection. Calm by default — never decorative. */
export function NoorScene({
  id,
  eyebrow,
  title,
  image,
  imageAlt = "",
  children,
  tone = "cool",
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  image?: string;
  imageAlt?: string;
  children: ReactNode;
  tone?: "cool" | "warm";
}) {
  return (
    <section
      id={id}
      aria-label={title ?? eyebrow ?? "Reflection"}
      className="relative flex min-h-dvh items-center overflow-hidden py-30 sm:py-40"
    >
      {image ? (
        <>
          <ParallaxImage src={image} alt={imageAlt} className="opacity-50" strength={70} />
          <div className="veil absolute inset-0" />
        </>
      ) : null}

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/3 h-72 blur-3xl"
        style={{
          background: `radial-gradient(45% 100% at 50% 50%, color-mix(in oklab, var(${
            tone === "warm" ? "--color-ember" : "--color-primary"
          }) 10%, transparent), transparent 70%)`,
        }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.06, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center">
        {eyebrow ? (
          <FadeUp>
            <p className="font-mono text-[11px] tracking-[0.45em] text-primary/75 uppercase">
              {eyebrow}
            </p>
          </FadeUp>
        ) : null}
        {title ? (
          <h2 className="glow-text mt-5 font-display text-3xl leading-tight font-medium sm:text-5xl">
            <SplitWords text={title} delay={0.1} />
          </h2>
        ) : null}
        <FadeUp
          delay={0.25}
          className="mt-10 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {children}
        </FadeUp>
      </div>
    </section>
  );
}
