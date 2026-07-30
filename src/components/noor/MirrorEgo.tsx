import { useReveal } from "../owaisism/use-reveal";
import { EGO_HADITH } from "./noor-content";
import { NoorSaying } from "./NoorSaying";

/** A mirror whose reflection quietly leaves once you look at it long enough. */
export function MirrorEgo() {
  const { ref, visible } = useReveal<HTMLElement>(0.35);

  return (
    <section
      ref={ref}
      id="noor-ego"
      aria-labelledby="noor-ego-title"
      className="relative flex min-h-dvh items-center overflow-hidden bg-background py-28"
    >
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center">
        <h2 id="noor-ego-title" className="sr-only">
          Ego
        </h2>

        <div className="relative mx-auto h-64 w-44 overflow-hidden rounded-t-full border border-border sm:h-80 sm:w-56">
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, color-mix(in oklab, var(--color-foreground) 8%, transparent), transparent 60%)",
            }}
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-6 bottom-0 h-2/3 rounded-t-full blur-md transition-all duration-[4000ms] ease-out"
            style={{
              opacity: visible ? 0 : 0.5,
              transform: visible ? "translateY(18px) scale(0.96)" : "none",
              background:
                "linear-gradient(to top, color-mix(in oklab, var(--color-foreground) 24%, transparent), transparent)",
            }}
          />
        </div>

        <div className="mt-14">
          <NoorSaying saying={EGO_HADITH} />
        </div>

        <p
          className="mt-16 font-display text-2xl leading-snug text-foreground transition-opacity duration-[2500ms] sm:text-3xl"
          style={{ opacity: visible ? 1 : 0, transitionDelay: "1200ms" }}
        >
          The biggest vulnerability is not in the code.
          <br />
          <span className="text-primary">It is ego.</span>
        </p>
      </div>
    </section>
  );
}
