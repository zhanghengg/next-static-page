import Link from 'next/link';
import { Layout } from '@/src/components/Layout';

export default function Home() {
  return (
    <Layout title="Neon Notes">
      <section className="hero">
        <div className="heroLeft">
          <h1 className="h1">Neon Notes</h1>
          <p className="lead">
            A tiny full-stack Next.js app: API routes, Prisma (SQLite), and a UI
            that actually has some attitude.
          </p>

          <div className="cta">
            <Link className="btn primary" href="/notes">
              Open Notes
            </Link>
            <Link className="btn ghost" href="/lab">
              Open Lab
            </Link>
            <a className="btn ghost" href="/api/notes" target="_blank" rel="noreferrer">
              View API
            </a>
          </div>

          <div className="bullets">
            <div className="bullet">
              <div className="k">Backend</div>
              <div className="v">Next.js API routes + Zod validation</div>
            </div>
            <div className="bullet">
              <div className="k">DB</div>
              <div className="v">Prisma + SQLite</div>
            </div>
            <div className="bullet">
              <div className="k">Frontend</div>
              <div className="v">SWR + responsive glass UI</div>
            </div>
          </div>
        </div>

        <div className="heroRight" aria-hidden="true">
          <div className="mock">
            <div className="mockTop">
              <span className="dot d1" />
              <span className="dot d2" />
              <span className="dot d3" />
              <span className="mockTitle">notes.ts</span>
            </div>
            <pre className="code">
{`GET  /api/notes
POST /api/notes

{
  "title": "Midnight idea",
  "content": "Ship it before 8am."
}`}
            </pre>
          </div>
        </div>
      </section>

      <style>{css}</style>
    </Layout>
  );
}

const css = String.raw`
  .hero {
    display: grid;
    grid-template-columns: 1.25fr 0.95fr;
    gap: 20px;
    align-items: center;
    padding: 14px 0 8px;
  }

  .h1 {
    font-family: "Space Grotesk", ui-sans-serif, system-ui;
    font-size: clamp(42px, 6vw, 64px);
    line-height: 1.02;
    margin: 0;
    letter-spacing: -0.05em;
  }

  .lead {
    margin: 12px 0 16px;
    color: var(--muted);
    font-size: 16px;
    line-height: 1.65;
    max-width: 58ch;
  }

  .cta {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin: 16px 0 18px;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 11px 14px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.14);
    font-weight: 700;
    letter-spacing: -0.01em;
    transition: transform 160ms ease, background 160ms ease, border 160ms ease;
    user-select: none;
  }

  .btn:hover {
    transform: translateY(-1px);
  }

  .primary {
    background: linear-gradient(90deg, rgba(112,246,255,0.28), rgba(255,79,216,0.22), rgba(255,211,110,0.20));
    box-shadow: 0 18px 45px rgba(0,0,0,0.35);
  }

  .ghost {
    background: rgba(0,0,0,0.16);
    color: rgba(255,255,255,0.84);
  }

  .bullets {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin-top: 12px;
  }

  .bullet {
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.05);
    border-radius: var(--r);
    padding: 12px 14px;
    box-shadow: 0 14px 40px rgba(0,0,0,0.25);
    backdrop-filter: blur(12px);
  }

  .k {
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.62);
    margin-bottom: 4px;
  }

  .v { color: rgba(255,255,255,0.86); font-size: 14px; }

  .mock {
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(0,0,0,0.20);
    box-shadow: 0 30px 90px rgba(0,0,0,0.48);
    overflow: hidden;
    transform: translateY(0);
    animation: float 4.6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  .mockTop {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border-bottom: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.04);
  }

  .dot { width: 10px; height: 10px; border-radius: 99px; opacity: 0.9; }
  .d1 { background: rgba(255, 110, 110, 0.95); }
  .d2 { background: rgba(255, 211, 110, 0.95); }
  .d3 { background: rgba(112, 246, 255, 0.95); }
  .mockTitle { margin-left: 6px; color: rgba(255,255,255,0.70); font-size: 12px; }

  .code {
    margin: 0;
    padding: 14px 14px 16px;
    font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
    font-size: 13px;
    line-height: 1.6;
    color: rgba(255,255,255,0.82);
    white-space: pre-wrap;
  }

  @media (max-width: 900px) {
    .hero { grid-template-columns: 1fr; }
    .mock { animation-duration: 5.4s; }
  }

  @media (prefers-reduced-motion: reduce) {
    .mock { animation: none !important; }
    .btn { transition: none; }
  }
`;
