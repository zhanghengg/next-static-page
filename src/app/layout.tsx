import type { Metadata } from 'next';

import { AppShell } from './shell/AppShell';

export const metadata: Metadata = {
  title: {
    default: 'Neon Notes',
    template: '%s - Neon Notes',
  },
  description: 'A tiny Next.js app with API routes + Prisma.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{globalCss}</style>
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

const globalCss = String.raw`
  :root {
    --bg: #070914;
    --card: rgba(255, 255, 255, 0.06);
    --stroke: rgba(255, 255, 255, 0.12);
    --text: rgba(255, 255, 255, 0.92);
    --muted: rgba(255, 255, 255, 0.70);
    --muted2: rgba(255, 255, 255, 0.55);

    --a: #70f6ff;
    --b: #ff4fd8;
    --c: #ffd36e;

    --r: 18px;
  }

  * { box-sizing: border-box; }
  html, body { height: 100%; }
  body {
    margin: 0;
    background:
      radial-gradient(1200px 700px at 20% 10%, rgba(112,246,255,0.16), transparent 55%),
      radial-gradient(1100px 760px at 85% 30%, rgba(255,79,216,0.14), transparent 58%),
      radial-gradient(980px 700px at 60% 95%, rgba(255,211,110,0.12), transparent 58%),
      linear-gradient(180deg, #050612, var(--bg));
    color: var(--text);
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
    overflow-x: hidden;
  }

  a { color: inherit; text-decoration: none; }
  button, input, textarea { font: inherit; }

  ::selection { background: rgba(112,246,255,0.22); }
`;
