import { useState } from "react";
import { motion } from "motion/react";
import campfire from "@/assets/ch-campfire.jpg";
import { FadeUp, Magnetic, ParallaxImage, SplitWords } from "@/components/motion/motion-primitives";

const EMAIL = "owaisusuf10@gmail.com";
const PHONE = "9149691391";

const EASE = [0.16, 1, 0.3, 1] as const;

const CONTACTS = [
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    note: "for work, ideas, and long questions",
  },
  {
    label: "Phone",
    value: PHONE,
    href: `tel:+91${PHONE}`,
    note: "for work — call or message",
  },
];

/** The campfire — the end of the road, and the only place with warmth. */
export function Campfire() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard unavailable — the link still works */
    }
  };

  return (
    <section
      id="campfire"
      aria-labelledby="campfire-title"
      className="relative flex min-h-dvh items-center overflow-hidden py-30 sm:py-40"
    >
      <ParallaxImage src={campfire} className="opacity-55" />
      <div className="veil absolute inset-0" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-[26rem] w-[26rem] rounded-full blur-3xl"
        style={{
          x: "-50%",
          y: "33%",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-ember) 30%, transparent), transparent 70%)",
        }}
        animate={{ opacity: [0.55, 1, 0.7, 1, 0.6], scale: [1, 1.08, 0.98, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center">
        <FadeUp>
          <p className="font-mono text-xs tracking-[0.45em] text-ember/80 uppercase">The campfire</p>
        </FadeUp>
        <h2
          id="campfire-title"
          className="glow-text mt-5 font-display text-4xl leading-tight font-medium sm:text-5xl"
        >
          <SplitWords text="If you've made it this far, thank you." />
        </h2>
        <FadeUp delay={0.2}>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Most people only skim. You explored. That means something — so here is the only door I
            keep unlocked.
          </p>
        </FadeUp>

        <motion.ul
          className="mt-15 grid gap-5 text-left sm:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
        >
          {CONTACTS.map((c) => (
            <motion.li
              key={c.label}
              className="panel bracket group p-6 hover:border-ember/45"
              variants={{
                hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.8, ease: EASE },
                },
              }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            >
              <div className="flex items-center justify-between gap-5">
                <span className="font-mono text-[10px] tracking-[0.35em] text-ember/90 uppercase">
                  {c.label}
                </span>
                <button
                  type="button"
                  onClick={() => copy(c.value)}
                  className="rounded-full border border-border px-3 py-1 font-mono text-[9px] tracking-[0.28em] text-muted-foreground uppercase transition-colors hover:border-ember/50 hover:text-foreground"
                >
                  {copied === c.value ? "copied" : "copy"}
                </button>
              </div>
              <a
                href={c.href}
                className="mt-5 block font-display text-xl break-all text-foreground transition-colors group-hover:text-ember sm:text-2xl"
              >
                {c.value}
              </a>
              <p className="mt-2 text-xs text-muted-foreground">{c.note}</p>
            </motion.li>
          ))}
        </motion.ul>

        <FadeUp delay={0.3}>
          <p className="mt-15 font-mono text-[11px] tracking-[0.35em] text-muted-foreground uppercase">
            <Magnetic>
              <span className="breathe">OWAISISM — nothing is locked</span>
            </Magnetic>
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
