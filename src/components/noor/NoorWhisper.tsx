import { useReveal } from "../owaisism/use-reveal";

/**
 * A tiny reminder placed between chapters. Deliberately small — a whisper,
 * not a sermon. It should be easy to walk past, and hard to forget.
 */
export function NoorWhisper({ text }: { text: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.7);

  return (
    <div ref={ref} data-visible={visible} className="reveal relative py-24 text-center">
      <span
        aria-hidden="true"
        className="mx-auto mb-6 block h-10 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent"
      />
      <p className="font-arabic text-sm text-primary/50" dir="rtl" aria-hidden="true">
        نور
      </p>
      <p className="breathe mt-4 font-mono text-[11px] tracking-[0.4em] text-muted-foreground uppercase">
        {text}
      </p>
    </div>
  );
}
