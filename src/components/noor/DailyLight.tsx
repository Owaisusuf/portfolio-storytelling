import { useReveal } from "../owaisism/use-reveal";
import { DAILY_AYAH, DAILY_HADITH, pickForToday } from "./noor-content";

/** One ayah and one authentic hadith, changing once a day. Nothing else. */
export function DailyLight() {
  const { ref, visible } = useReveal<HTMLElement>(0.25);
  const ayah = pickForToday(DAILY_AYAH);
  const hadith = pickForToday(DAILY_HADITH);

  return (
    <section
      ref={ref}
      id="noor-daily"
      aria-labelledby="noor-daily-title"
      className="relative py-32"
    >
      <div data-visible={visible} className="reveal mx-auto w-full max-w-5xl px-6">
        <h2
          id="noor-daily-title"
          className="text-center font-mono text-[11px] tracking-[0.45em] text-primary/75 uppercase"
        >
          Today only
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="surface-glass sweep rounded-xl px-7 py-9 text-center">
            <p className="font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
              Ayah of the day
            </p>
            <p className="font-arabic mt-6 text-2xl leading-loose text-primary/85 sm:text-3xl" dir="rtl">
              {ayah.arabic}
            </p>
            <p className="mt-6 font-display text-lg leading-snug text-foreground">{ayah.text}</p>
            <p className="mt-4 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              {ayah.source}
            </p>
          </article>

          <article className="surface-glass sweep rounded-xl px-7 py-9 text-center">
            <p className="font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
              Hadith of the day
            </p>
            <p className="mt-8 font-display text-lg leading-snug text-foreground">{hadith.text}</p>
            <p className="mt-4 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              {hadith.source}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
