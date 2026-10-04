import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="page-container" style={{ maxWidth: '900px' }}>
      <div className="page-header" style={{ marginBottom: '3rem' }}>
        <div className="banner-tag" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
          PHILOSOPHY & ETHICS
        </div>
        <h1 className="page-title">The Epistemic Mirror</h1>
        <p className="page-description">
          Why we built Blind Spot as an adversarial thinking companion rather than an answer-generating oracle.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {/* Section 1: The Core Problem */}
        <section className="glass-card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            1. The Problem with Prescriptive AI
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
            Current generative AI models are trained via RLHF (Reinforcement Learning from Human Feedback) to be sycophantic, agreeable, and directive. When users ask high-stakes questions—such as whether to resign, accept venture funding, or relocate—traditional LLMs default to persuasive summaries that recommend actions.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            This creates <strong>autonomy erosion</strong>: individuals outsource existential agency to statistical models that lack personal skin in the game. When AI gives advice, accountability evaporates.
          </p>
        </section>

        {/* Section 2: Autonomy-by-Design Charter */}
        <section className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid #10B981' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34D399', marginBottom: '1rem' }}>
            2. The Autonomy-by-Design Charter
          </h2>
          <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li><strong>Zero Directive Imperatives:</strong> Blind Spot is strictly prohibited from uttering "you should", "you must", or "the optimal choice is".</li>
            <li><strong>Epistemic Separation:</strong> The AI separates verified facts (paying customers, signed contracts, cash runway) from inferred optimistic assumptions.</li>
            <li><strong>Sovereign Human Conclusion:</strong> Only the user can formulate and record the final decision. The tool is an amplifier for human discernment, not its replacement.</li>
          </ul>
        </section>

        {/* Section 3: Karl Popper Falsification */}
        <section className="glass-card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            3. Karl Popper & Epistemic Falsification
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
            Philosopher of science Karl Popper established that a theory can never be conclusively verified by accumulating supporting evidence; it can only be tested by attempting to falsify it.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            In high-stakes strategy, founders and leaders often gather dozens of polite compliments to "prove" demand. Blind Spot inverts this: it identifies your <strong>Critical Defeater Assumption</strong> and helps you formulate a fast, low-cost Popperian experiment to test whether your premise is false <em>before</em> you risk your savings or career.
          </p>
        </section>

        {/* Section 4: Safety & Crisis Intercept */}
        <section className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid #EF4444' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F87171', marginBottom: '1rem' }}>
            4. Safety & Crisis Intercept Policy
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
            Blind Spot is exclusively an intellectual cognitive exercise for strategic and career dilemmas. It is <strong>never a substitute for clinical psychological therapy, medical diagnosis, fiduciary investment counsel, or legal advice</strong>.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Any inputs referencing mental health crises, self-harm, or clinical distress immediately trigger emergency hotline referrals (such as Dial 988 in North America) and halt cognitive challenge routines.
          </p>
        </section>

        {/* Navigation CTA */}
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link href="/analysis" className="btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
            Experience the Epistemic Mirror in Action →
          </Link>
        </div>
      </div>
    </div>
  );
}
