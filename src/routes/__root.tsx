import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <main className="grain relative flex min-h-dvh flex-col items-center justify-center bg-background px-6 py-24 text-center overflow-hidden">
      <div aria-hidden="true" className="hud-grid absolute inset-0 opacity-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-neon) 18%, transparent), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-xl">
        <span className="chip mb-8 inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
          CHAPTER ??? — UNMAPPED PATH
        </span>

        <h1 className="holo font-display text-8xl font-bold tracking-tighter sm:text-9xl">
          404
        </h1>

        <h2 className="glow-text mt-6 font-display text-2xl font-medium text-foreground sm:text-4xl">
          You walked off the map.
        </h2>

        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Not every door leads to a standard room. In <span className="text-foreground font-medium">OWAISISM</span>, getting lost is just curiosity asking a better question.
        </p>

        <p className="mt-4 font-mono text-xs text-muted-foreground/80">
          "Every lock was created by someone — which means someone also understands the key."
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="sweep inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-transform hover:scale-105"
          >
            ← Return to the passage
          </Link>
          <Link
            to="/tasbih"
            className="inline-flex items-center gap-3 rounded-full border border-border bg-surface/40 px-7 py-3.5 font-mono text-xs tracking-[0.25em] uppercase text-foreground transition-colors hover:border-neon/50 hover:bg-secondary/50"
          >
            · tasbih ·
          </Link>
        </div>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <main className="grain relative flex min-h-dvh flex-col items-center justify-center bg-background px-6 py-24 text-center overflow-hidden">
      <div aria-hidden="true" className="hud-grid absolute inset-0 opacity-40" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-ember) 18%, transparent), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-xl">
        <span className="chip mb-8 inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse" />
          SYSTEM BREAK · UNEXPECTED STATE
        </span>

        <h1 className="font-display text-4xl font-medium tracking-tight text-foreground sm:text-6xl">
          The machine paused.
        </h1>

        <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Systems drift. Code stumbles. But nothing here is permanently broken. Take a breath, reset the state, or step back into the light.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="sweep inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-transform hover:scale-105"
          >
            Re-enter passage
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-3 rounded-full border border-border bg-surface/40 px-7 py-3.5 font-mono text-xs tracking-[0.25em] uppercase text-foreground transition-colors hover:border-ember/50 hover:bg-secondary/50"
          >
            Go home
          </a>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "OWAISISM — Nothing Is Locked" },
      {
        name: "description",
        content: "A cinematic, interactive portfolio built as a journey through curiosity.",
      },
      { name: "author", content: "Owais" },
      { name: "theme-color", content: "#05070B" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&family=Amiri:wght@400;700&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "shortcut icon", href: "/favicon.svg" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
