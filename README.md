# Blind Spot — The AI Thinking Companion

> **"Think deeper. Decide better. Your call."**

Blind Spot is an AI-powered cognitive debiasing thinking companion designed for founders, executives, and professionals. Unlike standard conversational bots that prescribe answers, Blind Spot acts as an **epistemic mirror**: surfacing hidden assumptions, calculating blind spot vulnerability, and generating Socratic inquiries—**without ever substituting AI judgment for human agency**.

---

## 🌟 Key Features

1. **Blind Spot Risk Score (1–10):**
   - An animated speedometer gauge synthesizing detected cognitive biases, confidence gaps, and critical assumption risks into an intuitive index.
2. **Conviction vs. Evidence Comparative Meter:**
   - Real-time linguistic analysis comparing user certainty markers against empirical metrics (revenue, runway, client testing) to immediately expose overconfidence bias.
3. **Interactive Assumption Dependency Map:**
   - Deconstructs claims into **🟢 Stated**, **🟡 Inferred**, and **🔴 Critical Defeater Nodes**, each with Karl Popper epistemic falsification tests.
4. **Stakeholder Perspective Switcher:**
   - Interactive lenses: *The Skeptic*, *The Impacted Stakeholder*, *Your 5-Year Older Self*, and *The Strategic Optimist*.
5. **"What Am I Missing?" Quick Modal:**
   - 1-click query isolating the #1 single unaddressed blind spot with a high-leverage Socratic question.
6. **Pre-Mortem Guided Wizard:**
   - Step-by-step prospective hindsight exercise ("Imagine it failed 12 months out. Why? What preemptive action kills that risk today?").
7. **Local-First Decision Journal & GDPR Wipe:**
   - Zero-tracking privacy; saves reflections securely to browser storage with 1-click total data erasure.
8. **Export Executive Debrief:**
   - Generates clean, formatted debriefs for printing or PDF archiving.

---

## 🚀 Running the Web Application

The application is fully self-contained and serves locally with zero build step dependencies:

```bash
# Start the local server
python -m http.server 8080

# Open in your browser
http://localhost:8080
```

---

## 📚 Project Documentation

- [Product Requirements Document (PRD)](file:///docs/PRD.md)
- [System Architecture Document (SAD) — 10/10 Gold Standard](file:///docs/SYSTEM_ARCHITECTURE.md)
- [Design System & UI/UX Specification](file:///docs/DESIGN_SYSTEM_UI_UX.md)
- [Safety, Ethics, Innovation & Execution Guide](file:///docs/SAFETY_ETHICS_INNOVATION.md)
- [Technology Stack & Cost-Benefit Analysis](file:///docs/TECHNOLOGY_STACK_ANALYSIS.md)
- [Pitch Deck (10-Slide Judge Presentation)](file:///docs/PITCH_DECK.md)
- [Supabase Production SQL Migration Script](file:///docs/SUPABASE_SETUP.sql)

---

## ☁️ Supabase Cloud Database Integration

Blind Spot features hybrid persistence:
1. **Local-First Fallback:** Seamlessly operates offline and records decisions to browser `localStorage`.
2. **Supabase Cloud Sync:** Automatically synchronizes decision debriefs and feedback audits to your live Supabase PostgreSQL instance:
   - **Endpoint:** `https://yfwcnncthbjcwekkoxwe.supabase.co`
   - **Tables:** `decisions`, `analysis_feedback`, `socratic_sessions`

### Setting Up the Supabase Database:
1. Log into your [Supabase Dashboard](https://supabase.com/dashboard).
2. Open your project `yfwcnncthbjcwekkoxwe` and navigate to **SQL Editor**.
3. Copy and run the contents of [`docs/SUPABASE_SETUP.sql`](file:///docs/SUPABASE_SETUP.sql).
4. All tables, Row-Level-Security (RLS) policies, and performance indexes will be established automatically!

---

## 🛡️ Autonomy-by-Design & Ethics Charter

Blind Spot adheres strictly to non-directive autonomy principles:
- **No Imperative Language:** The system will never say *"You should"*, *"We recommend"*, or *"The best choice is"*.
- **User Sovereignty:** All final decisions and reflection conclusions are made and recorded exclusively by the user.
- **Crisis Intercept:** Automatically detects high-stakes medical, legal, or crisis inputs and displays relevant helplines and disclaimers.
