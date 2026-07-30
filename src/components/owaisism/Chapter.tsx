import type { ReactNode } from "react";
import { motion } from "motion/react";
import { FadeUp, ParallaxImage, SplitWords } from "@/components/motion/motion-primitives";

type ChapterProps = {
  id: string;
  index: string;
  title: string;
  image?: string;
  align?: "left" | "center";
  children: ReactNode;
};

/** A cinematic chapter framed like a technical readout. */
export function Chapter({ id, index, title, image, align = "left", children }: ChapterProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="grain relative flex min-h-[86vh] w-full items-center overflow-hidden py-30 sm:py-40"
    >
      {image ? (
        <>
          <ParallaxImage src={image} className="opacity-55" />
          <div className="veil absolute inset-0" />
        </>
      ) : null}

      <div aria-hidden="true" className="hud-grid absolute inset-0 opacity-40" />

      <div
        className={`relative z-10 mx-auto w-full max-w-[88rem] px-6 lg:px-10 ${
          align === "center" ? "text-center" : ""
        }`}
      >
        <div
          className={`grid gap-10 lg:grid-cols-12 lg:gap-15 ${
            align === "center" ? "place-items-center" : ""
          }`}
        >
          <div className={align === "center" ? "lg:col-span-12" : "lg:col-span-5"}>
            <FadeUp>
              <div
                className={`flex items-center gap-5 ${align === "center" ? "justify-center" : ""}`}
              >
                <span className="font-mono text-[11px] tracking-[0.45em] text-neon uppercase">
                  Chapter {index}
                </span>
                <motion.span
                  className="h-px origin-left bg-gradient-to-r from-neon/70 to-transparent"
                  initial={{ width: 0 }}
                  whileInView={{ width: "3.5rem" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </FadeUp>

            <h2
              id={`${id}-title`}
              className="mt-5 font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.95] font-medium tracking-[-0.035em] text-foreground"
            >
              <SplitWords text={title} delay={0.15} />
            </h2>

            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`mt-10 block font-display text-7xl leading-none text-foreground/[0.06] sm:text-9xl ${
                align === "center" ? "hidden" : ""
              }`}
            >
              {index}
            </motion.span>
          </div>

          <FadeUp
            delay={0.2}
            className={`space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg ${
              align === "center" ? "mx-auto max-w-2xl lg:col-span-12" : "lg:col-span-7"
            }`}
          >
            {children}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

export function Line({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

export function Emph({ children }: { children: ReactNode }) {
  return <span className="text-foreground">{children}</span>;
}
