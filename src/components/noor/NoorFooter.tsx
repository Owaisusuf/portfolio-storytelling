import { Link } from "@tanstack/react-router";

/** The last thing on the page is not a credit — it is a request. */
export function NoorFooter() {
  return (
    <footer className="relative border-t border-border py-20 text-center">
      <p className="mx-auto max-w-xl px-6 text-base leading-relaxed text-muted-foreground">
        If anything here benefited you, make a sincere du'a for me and my parents.
      </p>
      <p className="font-arabic mt-8 text-2xl text-primary/85 sm:text-3xl" dir="rtl">
        اللهم اغفر لي ولوالدي
      </p>
      <p className="mt-3 text-xs text-muted-foreground">
        O Allah, forgive me and my parents.
      </p>
      <Link
        to="/tasbih"
        className="mt-10 inline-block font-mono text-[10px] tracking-[0.45em] text-muted-foreground uppercase transition-colors hover:text-primary"
      >
        · tasbih ·
      </Link>
    </footer>
  );
}
