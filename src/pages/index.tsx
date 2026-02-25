import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Next Static Page</title>
        <meta name="description" content="A tiny static page built with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={styles.main}>
        <section style={styles.card}>
          <h1 style={styles.h1}>Hello, Next.js</h1>
          <p style={styles.p}>
            This is a static export page (output: export) ready for Vercel.
          </p>
          <ul style={styles.ul}>
            <li>Fast build</li>
            <li>Jest + Testing Library tests</li>
            <li>Auto-deploy via Vercel</li>
          </ul>
        </section>
      </main>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    padding: 24,
    background:
      'radial-gradient(circle at 20% 20%, #e0f2fe, transparent 40%), radial-gradient(circle at 80% 30%, #fee2e2, transparent 40%), #0b1220',
    color: '#e5e7eb',
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
  },
  card: {
    width: 'min(760px, 100%)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 16,
    padding: 28,
    background: 'rgba(255,255,255,0.06)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
    backdropFilter: 'blur(10px)',
  },
  h1: {
    margin: 0,
    fontSize: 44,
    letterSpacing: -0.5,
  },
  p: {
    margin: '12px 0 18px',
    lineHeight: 1.6,
    color: '#cbd5e1',
    fontSize: 16,
  },
  ul: {
    margin: 0,
    paddingLeft: 18,
    lineHeight: 1.8,
  },
};
