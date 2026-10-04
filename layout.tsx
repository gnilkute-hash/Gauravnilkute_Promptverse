import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blind Spot — The AI Thinking Companion | Epistemic Mirror',
  description:
    'An AI thinking companion that surfaces hidden assumptions, detects cognitive biases, and asks Socratic questions without ever making decisions for you.',
  keywords: [
    'Socratic AI',
    'Cognitive Bias Detection',
    'Decision Making',
    'Epistemic Mirror',
    'Autonomy by Design',
    'Executive Thinking'
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark-theme">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Ambient background glow elements */}
        <div className="ambient-glow glow-top-left" aria-hidden="true" />
        <div className="ambient-glow glow-center-right" aria-hidden="true" />

        {/* Global Navigation Header */}
        <header className="app-header">
          <div className="header-container">
            <Link href="/" className="brand-group">
              <div className="brand-icon-wrapper" aria-hidden="true">
                <svg className="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeDasharray="4 2" />
                  <circle cx="12" cy="12" r="4" fill="currentColor" />
                  <line x1="12" y1="2" x2="12" y2="6" />
                  <line x1="12" y1="18" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="6" y2="12" />
                  <line x1="18" y1="12" x2="22" y2="12" />
                </svg>
              </div>
              <div className="brand-text">
                <div className="brand-title">BLIND SPOT</div>
                <span className="brand-subtitle">AI Thinking Companion</span>
              </div>
            </Link>

            {/* Nav Links */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link href="/" className="nav-link">Workbench</Link>
              <Link href="/analysis" className="nav-link">Live Analysis</Link>
              <Link href="/dashboard" className="nav-link">Dashboard</Link>
              <Link href="/history" className="nav-link">Journal</Link>
              <Link href="/about" className="nav-link">Methodology</Link>
            </nav>

            {/* Header Actions */}
            <div className="header-actions">
              <div className="autonomy-pill" title="Blind Spot is strictly non-directive. It never prescribes what you should decide.">
                <span className="pill-dot"></span>
                <span className="pill-text">Autonomy-by-Design</span>
              </div>

              <div className="autonomy-pill supabase-pill" title="Connected to Supabase PostgreSQL: https://yfwcnncthbjcwekkoxwe.supabase.co">
                <span className="pill-dot"></span>
                <span className="pill-text">Supabase Cloud</span>
              </div>

              <Link href="/login" className="btn-ghost" style={{ padding: '0.4rem 0.85rem' }}>
                Sign In
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>{children}</main>

        {/* Global Footer */}
        <footer style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '3rem 1.5rem',
          marginTop: '4rem',
          background: 'rgba(9, 13, 22, 0.95)',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                Blind Spot — The Epistemic Mirror
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                "Think deeper. Decide better. Your call." Non-prescriptive cognitive debiasing.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <Link href="/about" style={{ textDecoration: 'none' }}>About & Ethics</Link>
              <Link href="/privacy" style={{ textDecoration: 'none' }}>Privacy Policy</Link>
              <Link href="/terms" style={{ textDecoration: 'none' }}>Terms of Service</Link>
              <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">Powered by Supabase</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
