import { useReveal } from "../owaisism/use-reveal";
import type { Saying } from "./noor-content";

/** One saying, held in space. Nothing decorative — only breathing room. */
export function NoorSaying({
  saying,
  size = "md",
}: {
  saying: Saying;
  size?: "sm" | "md" | "lg";
}) {
  const { ref, visible } = useReveal<HTMLElement>(0.4);
  const scale =
    size === "lg"
      ? "text-2xl sm:text-4xl"
      : size === "sm"
        ? "text-lg sm:text-xl"
        : "text-xl sm:text-2xl";

  return (
    <figure ref={ref} data-visible={visible} className="reveal mx-auto max-w-2xl text-center">
      {saying.arabic ? (
        <p className="font-arabic mb-6 text-2xl leading-loose text-primary/85 sm:text-3xl" dir="rtl">
          {saying.arabic}
        </p>
      ) : null}
      <blockquote className={`font-display leading-snug text-foreground ${scale}`}>
        <span aria-hidden="true" className="mr-1 text-primary/50">
          “
        </span>
        {saying.text}
        <span aria-hidden="true" className="ml-1 text-primary/50">
          ”
        </span>
      </blockquote>
      <figcaption className="mt-6 font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
        {saying.source}
      </figcaption>
    </figure>
  );
}
