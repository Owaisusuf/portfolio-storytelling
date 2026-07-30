import { useEffect, useRef, useState } from "react";

const RESPONSES: Record<string, string[]> = {
  help: [
    "available: whoami, skills, projects, coffee, linux, design, code, unlock, future, clear",
    "tip: not every command is listed. curiosity is the interface.",
  ],
  whoami: ["owais — born among mountains, raised by questions.", "role: designer / builder / permanent student"],
  skills: [
    "design    ██████████  ui, motion, brand, storytelling",
    "code      ████████░░  typescript, react, node, python",
    "systems   ███████░░░  linux, networking, security fundamentals",
    "patience  █████████░  earned the hard way",
  ],
  projects: [
    "01  owaisism        — this. a mind you can scroll through.",
    "02  quiet-tools     — small utilities that remove friction.",
    "03  field-notes     — a writing system for half-formed ideas.",
    "run `unlock` to see what isn't listed.",
  ],
  coffee: ["brewing... ☕", "error: sleep not found. continuing anyway."],
  linux: ["$ uname -a", "OWAISISM 6.0 #curious SMP x86_64 GNU/Questions"],
  design: ["design is not decoration.", "it is the argument you make before you say a word."],
  code: ["code is just an opinion the machine agrees to execute."],
  unlock: [
    "nothing is locked.",
    "every lock was created by someone — which means someone also understands the key.",
    "integrity decides which doors remain closed.",
  ],
  future: ["i don't know exactly where i'm going.", "i know exactly how i'll get there. curious."],
  sudo: ["you already have permission. that was never the problem."],
  ls: ["chapters/  memories/  questions/  .secrets"],
  "cat .secrets": ["try the konami code. up up down down left right left right b a"],
};

/** Chapter 07 — an interactive terminal. Typed commands reveal hidden lines. */
export function Terminal() {
  const [history, setHistory] = useState<string[]>([
    "OWAISISM shell v1.0 — type `help` and press enter.",
  ]);
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") {
      setHistory([]);
      return;
    }
    const output = RESPONSES[cmd] ?? [`command not found: ${cmd}`, "try `help` — or try guessing."];
    setHistory((h) => [...h, `owais@owaisism:~$ ${cmd}`, ...output]);
  };

  return (
    <div className="surface-glass rounded-xl p-1 shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-ember/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">owais@owaisism</span>
      </div>
      <button
        type="button"
        onClick={() => inputRef.current?.focus()}
        aria-label="Focus the terminal input"
        className="block w-full cursor-text text-left"
      >
        <div
          ref={scrollRef}
          className="h-72 overflow-y-auto px-5 pb-3 font-mono text-[13px] leading-relaxed text-primary/90"
        >
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {line}
            </div>
          ))}
        </div>
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(value);
          setValue("");
        }}
        className="flex items-center gap-2 border-t border-border px-5 py-3 font-mono text-[13px]"
      >
        <label htmlFor="owais-terminal" className="text-primary">
          $
        </label>
        <input
          id="owais-terminal"
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="type a command…"
          autoComplete="off"
          spellCheck={false}
          className="w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground/60"
        />
      </form>
    </div>
  );
}
