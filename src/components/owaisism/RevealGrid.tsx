import { useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";

export type RevealItem = { label: string; hint: string; reveal: string };

const EASE = [0.16, 1, 0.3, 1] as const;

/** Click-to-open objects with a cursor-tracking spotlight. */
export function RevealGrid({ items }: { items: RevealItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <motion.div
      className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
    >
      {items.map((item, i) => (
        <Card
          key={item.label}
          item={item}
          index={i}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
        />
      ))}
    </motion.div>
  );
}

function Card({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: RevealItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [hover, setHover] = useState(false);

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = (((e.clientX - r.left) / r.width) * 100).toFixed(1);
    const y = (((e.clientY - r.top) / r.height) * 100).toFixed(1);
    ref.current?.style.setProperty("--spot-x", `${x}%`);
    ref.current?.style.setProperty("--spot-y", `${y}%`);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-expanded={isOpen}
      onClick={onToggle}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      variants={{
        hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
      }}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      whileTap={{ scale: 0.985 }}
      layout
      className={`panel bracket group relative min-h-[9rem] overflow-hidden p-6 text-left ${
        isOpen
          ? "border-neon/45 shadow-[0_24px_70px_-24px_var(--color-glow)]"
          : "hover:border-foreground/25"
      }`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: hover ? 1 : 0,
          background: `radial-gradient(220px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklab, var(--color-neon) 16%, transparent), transparent 70%)`,
        }}
      />

      <span className="relative z-10 flex items-start justify-between gap-5">
        <span className="font-display text-lg leading-snug text-foreground">{item.label}</span>
        <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/70 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
      </span>

      <span className="relative z-10 mt-2 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-neon/80 uppercase">
        {isOpen ? "open" : item.hint}
        <motion.span
          aria-hidden="true"
          animate={{ rotate: isOpen ? 90 : 0, x: isOpen ? 0 : [0, 4, 0] }}
          transition={{ duration: isOpen ? 0.5 : 1.8, repeat: isOpen ? 0 : Infinity, ease: "easeInOut" }}
          className="inline-block"
        >
          →
        </motion.span>
      </span>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.span
            key="reveal"
            className="relative z-10 block overflow-hidden text-sm leading-relaxed text-muted-foreground"
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 20 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {item.reveal}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.button>
  );
}
