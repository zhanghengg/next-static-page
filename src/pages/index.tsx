import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Head>
        <title>Next Static Page</title>
        <meta name="description" content="A tiny static page built with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.7;
            }
          }
          .fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }
          .slide-in-left {
            animation: slideInLeft 0.8s ease-out forwards;
          }
          .pulse-glow {
            animation: pulse 2s ease-in-out infinite;
          }
        `}</style>
      </Head>
      <main style={styles.main}>
        <section style={{
          ...styles.card,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.6s ease-out',
        }}>
          <h1 style={{
            ...styles.h1,
            animation: isVisible ? 'fadeInUp 0.8s ease-out' : 'none',
          }}>
            Hello, Next.js
          </h1>
          <p style={{
            ...styles.p,
            animation: isVisible ? 'slideInLeft 0.8s ease-out 0.2s both' : 'none',
          }}>
            This is a static export page (output: export) ready for Vercel.
          </p>
          <ul style={{
            ...styles.ul,
            animation: isVisible ? 'slideInLeft 0.8s ease-out 0.4s both' : 'none',
          }}>
            <li>⚡ Fast build</li>
            <li>🧪 Jest + Testing Library tests</li>
            <li>🚀 Auto-deploy via Vercel</li>
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
