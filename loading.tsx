import React from 'react';

export default function Loading() {
  return (
    <div style={{
      minHeight: '65vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.25rem',
      padding: '2rem'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        border: '3px solid rgba(99, 102, 241, 0.2)',
        borderTopColor: '#6366F1',
        animation: 'spin 1s linear infinite'
      }} />
      <style dangerouslySetInnerHTML={{
        __html: `@keyframes spin { to { transform: rotate(360deg); } }`
      }} />
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.1rem',
        fontWeight: 600,
        color: 'var(--text-primary)'
      }}>
        Calibrating Cognitive Parameters...
      </div>
      <p style={{
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        Synthesizing epistemic assumptions, checking confidence calibration, and preparing Socratic inquiries.
      </p>
    </div>
  );
}
