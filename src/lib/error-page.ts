export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>OWAISISM — System Interruption</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <style>
      :root {
        --background: #090d16;
        --foreground: #f8fafc;
        --muted: #94a3b8;
        --neon: #7fd7ff;
        --border: rgba(255, 255, 255, 0.12);
      }
      body {
        font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
        background-color: var(--background);
        color: var(--foreground);
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        margin: 0;
        padding: 1.5rem;
        box-sizing: border-border;
      }
      .card {
        max-width: 32rem;
        width: 100%;
        text-align: center;
        padding: 2.5rem 2rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--border);
        border-radius: 1rem;
        backdrop-filter: blur(16px);
      }
      .badge {
        font-family: monospace;
        font-size: 10px;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: var(--neon);
        display: inline-block;
        margin-bottom: 1.5rem;
        padding: 0.3rem 0.8rem;
        border-radius: 99px;
        border: 1px solid var(--border);
      }
      h1 { font-size: 2rem; font-weight: 500; margin: 0 0 1rem; letter-spacing: -0.02em; }
      p { color: var(--muted); line-height: 1.6; margin: 0 0 2rem; font-size: 0.95rem; }
      .actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
      a, button {
        padding: 0.75rem 1.5rem;
        border-radius: 99px;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        text-decoration: none;
        transition: all 0.2s ease;
      }
      .primary { background: var(--foreground); color: var(--background); border: none; }
      .secondary { background: transparent; color: var(--foreground); border: 1px solid var(--border); }
      .primary:hover { opacity: 0.9; }
      .secondary:hover { border-color: var(--neon); }
    </style>
  </head>
  <body>
    <div class="card">
      <span class="badge">OWAISISM · SYSTEM PAUSE</span>
      <h1>The machine paused.</h1>
      <p>Systems drift, but nothing here is permanently locked. Take a breath, refresh the page, or step back into the main passage.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Re-enter passage</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
