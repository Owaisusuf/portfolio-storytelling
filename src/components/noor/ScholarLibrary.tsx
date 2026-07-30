import { useState } from "react";
import library from "@/assets/noor-library.jpg";
import { useReveal } from "../owaisism/use-reveal";
import { SCHOLARS } from "./noor-content";

/**
 * A dark library. Each book floats until it is opened — then it says one thing
 * and goes quiet again.
 */
export function ScholarLibrary() {
  const { ref, visible } = useReveal<HTMLElement>(0.15);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      id="noor-library"
      aria-labelledby="noor-library-title"
      className="relative flex min-h-dvh items-center overflow-hidden py-28"
    >
      <img
        src={library}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1920}
        height={1088}
        className="drift absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="veil absolute inset-0" />

      <div
        data-visible={visible}
        className="reveal relative z-10 mx-auto w-full max-w-5xl px-6"
      >
        <p className="font-mono text-[11px] tracking-[0.45em] text-primary/75 uppercase">
          نور — the shelf
        </p>
        <h2
          id="noor-library-title"
          className="glow-text mt-4 font-display text-3xl leading-tight font-medium sm:text-5xl"
        >
          Words that outlived their authors
        </h2>
        <p className="mt-5 max-w-xl text-sm text-muted-foreground">
          Open one. Nothing here is loud.
        </p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {SCHOLARS.map((s, i) => {
            const isOpen = open === i;
            return (
              <li key={s.source + i}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={`surface-glass sweep float-slow w-full rounded-xl px-6 py-6 text-left transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 ${
                    isOpen ? "border-primary/40" : ""
                  }`}
                  style={{ animationDelay: `${i * 0.6}s` }}
                >
                  <span className="font-mono text-[10px] tracking-[0.35em] text-primary/70 uppercase">
                    {isOpen ? "close" : "open the book"}
                  </span>
                  <span
                    className="mt-4 block overflow-hidden transition-all duration-700"
                    style={{ maxHeight: isOpen ? "16rem" : "2.6rem", opacity: isOpen ? 1 : 0.55 }}
                  >
                    <span className="block font-display text-base leading-snug text-foreground sm:text-lg">
                      {s.text}
                    </span>
                    <span className="mt-4 block font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                      {s.source}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
