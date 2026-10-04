import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div style={{
        fontSize: '4.5rem',
        fontWeight: 800,
        fontFamily: 'var(--font-display)',
        background: 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '0.5rem'
      }}>
        404
      </div>
      <h2 style={{
        fontSize: '1.75rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: '0.75rem'
      }}>
        Cognitive Path Not Found
      </h2>
      <p style={{
        color: 'var(--text-secondary)',
        maxWidth: '520px',
        lineHeight: 1.6,
        marginBottom: '2rem'
      }}>
        The decision debrief, perspective, or resource you are looking for does not exist or was purged in accordance with our GDPR right-to-erasure policy.
      </p>
      <Link href="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        Return to Decision Workbench
      </Link>
    </div>
  );
}
