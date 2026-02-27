'use client';

import { useEffect, useMemo, useState } from 'react';

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function makeSignal(t: number, seed: number) {
  const a = 0.55 + 0.45 * Math.sin(t / 750 + seed);
  const b = 0.55 + 0.45 * Math.sin(t / 1100 + seed * 1.7);
  return { a, b };
}

export function LabClient() {
  const [t, setT] = useState(0);

  useEffect(() => {
    const tick = () => setT(Date.now());
    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, []);

  const now = useMemo(() => new Date(t || Date.now()), [t]);
  const time = `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`;

  const s1 = makeSignal(t, 0.9);
  const s2 = makeSignal(t, 2.1);
  const s3 = makeSignal(t, 3.2);

  return (
    <>
      <section className="wrap">
        <div className="top">
          <h1 className="h1">LAB</h1>
          <div className="sub">A tiny kinetic playground (client-only).</div>
        </div>

        <div className="card">
          <div className="row">
            <div className="label">NOW</div>
            <div className="mono">{time}</div>
          </div>

          <div className="meters" aria-hidden="true">
            <div className="m">
              <div className="mBar" style={{ ['--p' as any]: s1.a }} />
            </div>
            <div className="m">
              <div className="mBar b" style={{ ['--p' as any]: s2.a }} />
            </div>
            <div className="m">
              <div className="mBar c" style={{ ['--p' as any]: s3.a }} />
            </div>
          </div>

          <div className="blobs" aria-hidden="true">
            <div className="blob" style={{ opacity: s1.b }} />
            <div className="blob b" style={{ opacity: s2.b }} />
            <div className="blob c" style={{ opacity: s3.b }} />
          </div>

          <p className="p">
            This page exists so the hourly bot can keep shipping playful UI additions without
            touching the core Notes flow.
          </p>
        </div>
      </section>

      <style>{css}</style>
    </>
  );
}

const css = String.raw`
  .wrap { padding: 10px 0 18px; }

  .top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    margin: 8px 2px 14px;
  }

  .h1 {
    margin: 0;
    font-family: "Space Grotesk", ui-sans-serif, system-ui;
    letter-spacing: -0.05em;
    font-size: clamp(34px, 6vw, 44px);
  }

  .sub { color: var(--muted2); font-size: 13px; }

  .card {
    border-radius: var(--r);
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.05);
    box-shadow: 0 24px 70px rgba(0,0,0,0.40);
    backdrop-filter: blur(14px);
    padding: 16px;
    position: relative;
    overflow: hidden;
  }

  .row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
  }

  .label {
    font-size: 12px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.62);
  }

  .mono {
    font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas;
    font-weight: 800;
    font-size: clamp(18px, 4vw, 26px);
    letter-spacing: -0.02em;
  }

  .meters {
    display: grid;
    gap: 10px;
    margin: 14px 0 10px;
  }

  .m {
    height: 10px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(0,0,0,0.22);
    overflow: hidden;
  }

  .mBar {
    height: 100%;
    width: calc(var(--p) * 100%);
    background: linear-gradient(90deg, rgba(112,246,255,0.9), rgba(255,79,216,0.7));
    transition: width 260ms cubic-bezier(.2, .8, .2, 1);
  }

  .mBar.b { background: linear-gradient(90deg, rgba(255,79,216,0.85), rgba(255,211,110,0.75)); }
  .mBar.c { background: linear-gradient(90deg, rgba(255,211,110,0.8), rgba(112,246,255,0.75)); }

  .blobs {
    position: absolute;
    inset: -30px;
    pointer-events: none;
  }

  .blob {
    position: absolute;
    width: 280px;
    height: 280px;
    left: -40px;
    top: -60px;
    border-radius: 999px;
    background: radial-gradient(circle at 30% 30%, rgba(112,246,255,0.32), transparent 60%);
    filter: blur(18px);
  }

  .blob.b {
    left: auto;
    right: -60px;
    top: 30px;
    width: 320px;
    height: 320px;
    background: radial-gradient(circle at 35% 35%, rgba(255,79,216,0.26), transparent 62%);
  }

  .blob.c {
    top: auto;
    bottom: -90px;
    left: 20%;
    width: 340px;
    height: 340px;
    background: radial-gradient(circle at 35% 35%, rgba(255,211,110,0.22), transparent 62%);
  }

  .p {
    margin: 10px 0 0;
    color: var(--muted);
    font-size: 13px;
    line-height: 1.6;
    position: relative;
    z-index: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .mBar { transition: none; }
  }
`;
