import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';

export function Layout(props: { title: string; children: ReactNode }) {
  const { title, children } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="A tiny Next.js app with API routes + Prisma." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="shell">
        <header className="topbar">
          <Link className="brand" href="/">
            <span className="mark" aria-hidden="true" />
            <span className="word">Neon Notes</span>
          </Link>

          <nav className="nav">
            <Link className="navLink" href="/notes">
              Notes
            </Link>
            <Link className="navLink" href="/api/notes" target="_blank">
              API
            </Link>
          </nav>
        </header>

        <main className="content">{children}</main>

        <footer className="footer">
          <span className="footMuted">Built with Next.js API Routes + Prisma (SQLite)</span>
        </footer>
      </div>

      <style>{css}</style>
    </>
  );
}

const css = String.raw`
  .shell {
    width: min(980px, 100%);
    margin: 0 auto;
    padding: 18px;
  }

  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 12px;
    border: 1px solid var(--stroke);
    background: rgba(255,255,255,0.05);
    border-radius: 999px;
    box-shadow: 0 18px 50px rgba(0,0,0,0.35);
    backdrop-filter: blur(12px);
    position: sticky;
    top: 14px;
    z-index: 20;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: "Space Grotesk", ui-sans-serif, system-ui;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .mark {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: radial-gradient(circle at 30% 30%, var(--a), transparent 70%),
                radial-gradient(circle at 70% 40%, var(--b), transparent 72%),
                radial-gradient(circle at 50% 80%, var(--c), transparent 75%);
    box-shadow: 0 0 0 0 rgba(112,246,255,0.55);
    animation: ping 1.8s ease-out infinite;
  }

  @keyframes ping {
    0% { box-shadow: 0 0 0 0 rgba(112,246,255,0.55); }
    70% { box-shadow: 0 0 0 14px rgba(112,246,255,0.0); }
    100% { box-shadow: 0 0 0 0 rgba(112,246,255,0.0); }
  }

  .word { color: rgba(255,255,255,0.92); }

  .nav {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .navLink {
    font-size: 13px;
    padding: 8px 12px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(0,0,0,0.18);
    color: rgba(255,255,255,0.80);
    transition: transform 160ms ease, background 160ms ease;
  }

  .navLink:hover {
    transform: translateY(-1px);
    background: rgba(255,255,255,0.08);
  }

  .content {
    padding: 18px 2px 10px;
  }

  .footer {
    margin-top: 22px;
    padding: 10px 2px 16px;
    color: var(--muted2);
    font-size: 12px;
    text-align: center;
  }

  .footMuted { opacity: 0.85; }

  @media (max-width: 520px) {
    .shell { padding: 14px; }
    .navLink { padding: 7px 10px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .mark { animation: none !important; }
    .navLink { transition: none; }
  }
`;
