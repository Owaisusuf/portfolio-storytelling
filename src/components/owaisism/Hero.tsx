import { useEffect, useState } from "react";
import { motion } from "motion/react";
import heroImage from "@/assets/hero-galaxy.jpg";
import { Magnetic, ParallaxImage } from "@/components/motion/motion-primitives";

const TITLE = "OWAISISM";

const STATS = [
  { k: "Chapters", v: "10" },
  { k: "Based in", v: "Kashmir" },
  { k: "Discipline", v: "Design × Systems" },
  { k: "Status", v: "Open to work" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

/** Landing: silence first, then the world names itself letter by letter. */
export function Hero() {
  const [awake, setAwake] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setAwake(true), 50);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      id="top"
      className="grain relative flex min-h-dvh w-full items-end overflow-hidden pt-30 pb-15"
    >
      <ParallaxImage
        src={heroImage}
        alt="A lone traveler on a ridge facing mountains beneath an enormous spiral galaxy"
        priority
        strength={60}
      />
      <div className="veil absolute inset-0" />
      <div aria-hidden="true" className="hud-grid absolute inset-0 opacity-70" />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-[88rem] px-6 lg:px-10"
        initial="hidden"
        animate={awake ? "show" : "hidden"}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
      >
        <motion.div
          className="flex flex-wrap items-center gap-5"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
          }}
        >
          <span className="chip">
            <span className="breathe h-1.5 w-1.5 rounded-full bg-neon" />
            Portfolio v3 — interactive
          </span>
          <span className="chip hidden sm:inline-flex">Owais · Designer &amp; Builder</span>
        </motion.div>

        <h1 className="mt-10 overflow-hidden font-display text-[clamp(3.4rem,15vw,13rem)] leading-[0.84] font-medium tracking-[-0.045em]">
          <span className="block overflow-hidden">
            <motion.span
              className="holo block"
              variants={{
                hidden: { y: "110%", opacity: 0, filter: "blur(14px)" },
                show: {
                  y: "0%",
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: { duration: 1.4, ease: EASE },
                },
              }}
            >
              {TITLE}
            </motion.span>
          </span>
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <motion.div
            className="lg:col-span-6"
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
            }}
          >
            <p className="font-display text-2xl leading-tight text-foreground sm:text-4xl">
              Nothing Is Locked.
            </p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Some people collect achievements. I collected questions — then built the systems,
              interfaces and stories that answer them.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Magnetic>
                <a
                  href="#chapter-01"
                  className="sweep group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background"
                >
                  Begin the passage
                  <motion.span
                    aria-hidden="true"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ↓
                  </motion.span>
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#campfire"
                  className="inline-flex items-center gap-3 rounded-full border border-border px-7 py-3.5 text-sm text-foreground transition-colors duration-500 hover:border-neon/50 hover:bg-secondary/40"
                >
                  Work with me
                </a>
              </Magnetic>
            </div>
          </motion.div>

          <motion.dl
            className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/80 bg-border/40 lg:col-span-6 lg:grid-cols-4"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          >
            {STATS.map((s) => (
              <motion.div
                key={s.k}
                className="bg-background/55 px-5 py-6 backdrop-blur-md"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
                }}
                whileHover={{ backgroundColor: "color-mix(in oklab, var(--color-neon) 8%, transparent)" }}
              >
                <dt className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                  {s.k}
                </dt>
                <dd className="mt-2 font-display text-base text-foreground">{s.v}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      <motion.span
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 h-24 w-px bg-gradient-to-t from-neon to-transparent"
        style={{ x: "-50%" }}
        animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}
