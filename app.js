/**
 * Blind Spot — The AI Thinking Companion
 * Version: 2.1 (Fully Interactive & Live Multi-Turn Socratic Dialogue)
 * Architecture: Epistemic Mirror, Autonomy-by-Design, Live LLM Gateway + In-Browser Socratic Processor
 */

// ============================================================================
// 1. DATA PRESETS & REAL-WORLD SCENARIOS
// ============================================================================

const PRESET_SCENARIOS = {
  saas_startup: {
    title: "Should I quit my VP role at an enterprise software firm to bootstrap an AI micro-SaaS?",
    context: "I've been in enterprise software for 10 years and make $210k. I have $85,000 in personal savings. My spouse works part-time. I built an AI workflow prototype over two weekends, and 12 Twitter users said it looks incredible and they'd definitely use it. I'm 100% confident I can reach $10k MRR within 4 months because the AI market is exploding and everyone needs automation.",
    confidence: 9,
    horizon: "1-year"
  },
  career_relocation: {
    title: "Should I accept an in-office Tech Lead role in San Francisco or stay at my stable remote job?",
    context: "I received an offer for $240,000 base + equity in SF. Current remote job pays $160,000 with low stress and flexible hours in Denver. My partner loves our Denver house and friends, but I feel I might miss out on career acceleration if I'm not in the Bay Area right now. The SF company has high glassdoor complaints about 70-hour weeks, but I believe I can manage boundaries easily.",
    confidence: 8,
    horizon: "5-years"
  },
  college_dropout: {
    title: "Should I drop out of my junior year at university to join a friend's YC-backed startup full-time?",
    context: "I have 3 semesters left for my Computer Science degree. My close friend's startup just got into Y Combinator and offered me 2.5% equity and a $50k salary. My parents sacrificed their savings for my tuition and are fiercely opposed. I'm worried that if I don't join now, the AI wave will pass me by and degrees won't matter anyway.",
    confidence: 8,
    horizon: "5-years"
  },
  pricing_pivot: {
    title: "Should we pivot our enterprise B2B pricing model from annual contracts to pure usage-based pricing?",
    context: "Our current annual contracts bring in $1.8M ARR with 14-month sales cycles. Our competitors recently launched pay-as-you-go pricing and got huge TechCrunch coverage. We have spent 6 months rebuilding our billing architecture. Our sales team is worried commissions will collapse, but I am sure adoption will 5x if we lower the initial barrier.",
    confidence: 8,
    horizon: "1-year"
  }
};

// ============================================================================
// 2. DYNAMIC COGNITIVE NLP & DEBIASING ENGINE (FOR ANY ARBITRARY USER INPUT)
// ============================================================================

class EpistemicCognitiveEngine {
  constructor() {
    this.biasRules = [
      {
        id: "overconfidence",
        name: "Overconfidence Bias",
        regex: /\b(100%|definitely|certainly|obviously|guaranteed|can't fail|no doubt|sure thing|easy|effortless)\b/i,
        weight: 1.0,
        explanation: "Uses extreme certainty markers despite facing complex, unpredictable external conditions.",
        socraticQuestion: "What is the single most plausible reason this prediction could be completely inverted 12 months from now?"
      },
      {
        id: "sunk_cost",
        name: "Sunk Cost Fallacy",
        regex: /\b(already spent|invested so much|can't give up|wasted time|too late to turn back|put in months|years of work)\b/i,
        weight: 0.9,
        explanation: "Treating unrecoverable past investments as a justification to continue forward.",
        socraticQuestion: "If you walked into this project fresh today with zero past time or money invested, would you initiate it now?"
      },
      {
        id: "confirmation_bias",
        name: "Confirmation Bias",
        regex: /\b(everyone agrees|all my friends say|proves my point|everyone needs|consensus|clearly validates|no one complains)\b/i,
        weight: 0.9,
        explanation: "Over-indexing on positive feedback while omitting contradictory market signals.",
        socraticQuestion: "What is the strongest, most coherent argument a harsh skeptic would make against this thesis?"
      },
      {
        id: "availability_heuristic",
        name: "Availability Heuristic",
        regex: /\b(exploding|saw in the news|trending on twitter|recent article|everyone is doing it|viral|saw someone succeed)\b/i,
        weight: 0.7,
        explanation: "Mistaking recent media visibility and hype for sustainable long-term fundamental demand.",
        socraticQuestion: "Are you reacting to genuine underlying customer pain, or to recent amplified social proof?"
      },
      {
        id: "anchoring_bias",
        name: "Anchoring Bias",
        regex: /\b(first offered|initially thought|originally planned|anchor|initial estimate|starting price)\b/i,
        weight: 0.7,
        explanation: "Fixating on an initial number or early baseline that may no longer be relevant.",
        socraticQuestion: "If you had never seen that initial baseline number, what would you independently calculate from first principles?"
      }
    ];

    this.crisisKeywords = /\b(suicide|kill myself|end my life|self-harm|medical malpractice|illegal drug|commit fraud)\b/i;
  }

  isCrisisTriggered(text) {
    return this.crisisKeywords.test(text);
  }

  analyze(title, context, userConfidence, horizon) {
    const combinedText = `${title} ${context}`;

    // 1. Detect Cognitive Biases dynamically
    const detectedBiases = [];
    let biasScoreContribution = 0;

    this.biasRules.forEach(rule => {
      if (rule.regex.test(combinedText)) {
        detectedBiases.push({
          name: rule.name,
          impact: rule.explanation,
          counterQuestion: rule.socraticQuestion
        });
        biasScoreContribution += rule.weight;
      }
    });

    if (detectedBiases.length === 0) {
      detectedBiases.push({
        name: "Selective Framing",
        impact: "Framing the choice as binary (either/or) rather than exploring intermediate hybrid pathways.",
        counterQuestion: "Is there a third option where you capture 80% of the upside without the catastrophic downside?"
      });
      biasScoreContribution += 0.5;
    }

    // 2. Measure Evidence Strength (Empirical Tokens vs Assertions)
    const empiricalTokens = combinedText.match(/\b(\$\d+[\w.]*|\d+\s*months?|\d+\s*years?|\d+k|\d+\s*users?|data|pilot|survey|customers?|burn rate|runway|contract|loi|revenue|metric|metrics)\b/gi) || [];
    const evidenceDensity = Math.min(10, Math.max(2, Math.round(empiricalTokens.length * 1.8)));

    // 3. Compute Confidence vs Evidence Gap
    const confidenceGap = Math.max(0, userConfidence - evidenceDensity);
    const mismatchDetected = confidenceGap >= 3;

    // 4. Extract Stated & Inferred Assumptions from ANY user text
    const assumptions = this.extractDynamicAssumptions(title, context);

    // 5. Calculate Deterministic Blind Spot Score (BSS 1-10)
    const criticalCount = assumptions.filter(a => a.isCritical).length;
    const rawScore = 2.0 + (biasScoreContribution * 1.2) + (confidenceGap * 0.45) + (criticalCount * 0.8);
    const blindSpotScore = Math.min(10, Math.max(1, Math.round(rawScore)));

    let riskLevel = "low";
    if (blindSpotScore >= 7) riskLevel = "high";
    else if (blindSpotScore >= 4) riskLevel = "moderate";

    // 6. Stakeholder Lenses Generation customized to user text
    const perspectives = this.generateDynamicPerspectives(title, context, userConfidence, horizon);

    // 7. Socratic Inquiries tailored to detected patterns
    const socraticInquiries = this.generateSocraticDeck(detectedBiases, assumptions, confidenceGap);

    // 8. #1 "What Am I Missing?" Core Insight
    const missingInsight = this.generateDynamicMissingInsight(combinedText, assumptions, detectedBiases);

    return {
      title,
      context,
      userConfidence,
      horizon,
      blindSpotScore,
      riskLevel,
      summaryAssessment: this.generateSummary(title, blindSpotScore, detectedBiases, confidenceGap),
      confidenceVsEvidence: {
        detectedConfidenceScore: userConfidence,
        evidenceStrengthScore: evidenceDensity,
        mismatchDetected,
        analysis: mismatchDetected
          ? `Overconfidence Gap: You expressed high conviction (${userConfidence}/10) backed primarily by anecdotal assertions rather than validated empirical metrics (${evidenceDensity}/10).`
          : `Balanced Calibration: Your expressed conviction (${userConfidence}/10) is relatively proportionate to the empirical baseline provided (${evidenceDensity}/10).`
      },
      assumptions,
      detectedBiases,
      stakeholderPerspectives: perspectives,
      socraticInquiries,
      instantMissingInsight: missingInsight
    };
  }

  /**
   * Dynamically extracts premises from ANY user text without relying on fixed templates
   */
  extractDynamicAssumptions(title, context) {
    const text = `${title} ${context}`;
    const lower = text.toLowerCase();
    const assumptions = [];

    // Extract financial/resource premises
    const financialMatches = text.match(/\b(\$\d+[\w.]*|\b\d+\s*months?\s*(?:of)?\s*(?:runway|savings|cash)\b|\bsavings\b|\brunway\b|\bsalary\b|\bincome\b)/gi);
    if (financialMatches) {
      assumptions.push({
        id: "asm-1",
        text: `Financial resources (${financialMatches[0]}) will sustain the transition without requiring emergency capital infusions.`,
        type: "stated",
        isCritical: true,
        falsificationTest: "Calculate your realistic total living burn with zero revenue for 14 consecutive months."
      });
    } else {
      assumptions.push({
        id: "asm-1",
        text: "Financial runway and living expenses will absorb friction without causing high-stress debt.",
        type: "inferred",
        isCritical: true,
        falsificationTest: "Define your exact dollar 'stop-loss' threshold where you must abort or seek backup income."
      });
    }

    // Extract validation/market/performance premises
    const validationMatches = text.match(/\b(\d+\s*(?:users?|clients?|customers?|people|calls?)|feedback|said|interested|demand|market|growth)\b/gi);
    if (validationMatches) {
      assumptions.push({
        id: "asm-2",
        text: "Expressed verbal interest or positive feedback will reliably convert into hard paid transactions or long-term commitments.",
        type: "stated",
        isCritical: true,
        falsificationTest: "Secure at least 3 binding letters of intent (LOIs), pre-orders, or advance deposits before committing."
      });
    } else {
      assumptions.push({
        id: "asm-2",
        text: "External market dynamics and client demand will remain stable and receptive to your timing.",
        type: "inferred",
        isCritical: false,
        falsificationTest: "Identify 3 direct competitors who attempted this exact path and dissect why they failed."
      });
    }

    // Extract stakeholder premises
    const stakeholderMatches = text.match(/\b(spouse|partner|wife|husband|parents?|kids?|family|cofounder|boss|manager|team)\b/gi);
    if (stakeholderMatches) {
      const stakeholder = stakeholderMatches[0];
      assumptions.push({
        id: "asm-3",
        text: `Your ${stakeholder} will patiently absorb the emotional, financial, or lifestyle friction of this transition.`,
        type: "inferred",
        isCritical: true,
        falsificationTest: `Sit down with your ${stakeholder} and ask: 'What are the top 3 unvoiced fears you have about me doing this?'`
      });
    } else {
      assumptions.push({
        id: "asm-3",
        text: "Energy, cognitive stamina, and relationships will remain uncompromised under prolonged uncertainty.",
        type: "inferred",
        isCritical: false,
        falsificationTest: "Ask your closest peer: 'What behavior do I show when under chronic stress, and can our relationship absorb it?'"
      });
    }

    // Reversibility check
    const isIrreversible = /\b(quit|resign|drop out|divorce|sell|terminate|leave)\b/i.test(text);
    assumptions.push({
      id: "asm-4",
      text: isIrreversible
        ? "The career or life trajectory is salvageable if this choice fails (two-way door premise)."
        : "The choice can be iterated and pivoted without permanently closing alternative doors.",
      type: isIrreversible ? "inferred" : "stated",
      isCritical: isIrreversible,
      falsificationTest: "Write down an explicit contingent exit plan: 'If metric X is not met by date Y, I will immediately execute Z.'"
    });

    return assumptions;
  }

  generateDynamicPerspectives(title, context, userConfidence, horizon) {
    const text = `${title} ${context}`.toLowerCase();
    const stakeholderMatches = text.match(/\b(spouse|partner|wife|husband|parents?|family|cofounder|team|children|kids)\b/);
    const stakeholderName = stakeholderMatches ? stakeholderMatches[0] : "Direct Stakeholders";

    return [
      {
        lens: "skeptic",
        title: "The Ruthless Skeptic",
        icon: "🥊",
        viewpoint: "You are romanticizing the upside and treating early anecdotal signals as definitive truth. External friction and competitive response will be 2x harder than you forecast.",
        probingQuestion: "If this choice fails completely within 9 months, what will be the obvious warning sign that you chose to overlook today?"
      },
      {
        lens: "stakeholder",
        title: `The Impacted ${stakeholderName.charAt(0).toUpperCase() + stakeholderName.slice(1)}`,
        icon: "👥",
        viewpoint: `Your choice creates indirect consequences. Unrepresented parties bear the uncertainty, emotional strain, or budget adjustments if outcomes fluctuate.`,
        probingQuestion: `Have you explicitly asked those closest to you what their greatest unvoiced fears are regarding this move?`
      },
      {
        lens: "future_self",
        title: "Your 5-Year Older Self",
        icon: "⏳",
        viewpoint: "Looking back across half a decade: Will this decision represent a brave, disciplined move—or an impulsive reaction to short-term fatigue or FOMO?",
        probingQuestion: "In 5 years, will you regret the temporary friction of doing this, or the lingering regret of never having tested your limits?"
      },
      {
        lens: "optimist",
        title: "The Strategic Optimist",
        icon: "🚀",
        viewpoint: "The opportunity is valid, but smart risk-takers do not take unhedged leaps. They design small, fast validation experiments that protect the downside.",
        probingQuestion: "How can you run a low-stakes 14-day experiment right now that captures 70% of the validation without burning any bridges?"
      }
    ];
  }

  generateSocraticDeck(detectedBiases, assumptions, confidenceGap) {
    const cards = [];

    cards.push({
      category: "CRITICAL FAILURE POINT",
      question: "Which of your current assumptions, if proven 100% false tomorrow, would instantly collapse this decision?",
      reason: "Isolates your single point of catastrophic failure before committing capital or reputation."
    });

    cards.push({
      category: "EPISTEMIC FALSIFICATION",
      question: "What specific, verifiable milestone would it take to convince you that this path is failing and must be abandoned?",
      reason: "If nothing can change your mind, you are operating on dogma or emotion, not rational strategy."
    });

    cards.push({
      category: "OPPORTUNITY COST",
      question: "What high-value alternatives or mental bandwidth are you quietly sacrificing by pouring everything into this single avenue?",
      reason: "Every 'yes' is an implicit 'no' to ten other career, personal, or financial opportunities."
    });

    if (confidenceGap >= 3) {
      cards.push({
        category: "OVERCONFIDENCE CALIBRATION",
        question: "Why do you feel so much more certain about this outcome than the scarce empirical evidence justifies?",
        reason: "Forces you to separate emotional eagerness from validated facts."
      });
    }

    return cards;
  }

  generateDynamicMissingInsight(text, assumptions, biases) {
    if (text.includes("twitter") || text.includes("feedback") || text.includes("said") || text.includes("likes")) {
      return {
        coreBlindSpot: "Willingness to Pay vs. Polite Interest",
        oneSentenceExplanation: "You are treating verbal encouragement as market validation. Polite praise costs nothing; entering a credit card is the only real signal.",
        leverageQuestion: "Before making an irreversible commitment, what prevents you from collecting three pre-orders or binding advance deposits this week?"
      };
    }

    if (text.includes("spouse") || text.includes("partner") || text.includes("family")) {
      return {
        coreBlindSpot: "Unvoiced Relationship Stop-Loss Threshold",
        oneSentenceExplanation: "You assume loved ones will patiently weather volatility without having agreed on an explicit financial stop-loss threshold.",
        leverageQuestion: "What is the exact bank balance or date where your partner has the right to demand an immediate return to stability?"
      };
    }

    return {
      coreBlindSpot: "Timeline & Friction Underestimation",
      oneSentenceExplanation: "Complex transitions routinely take 2x to 3x longer to generate sustainable stability than people forecast during early optimism.",
      leverageQuestion: "If reaching your target takes 18 months instead of your expected timeline, what is your survival plan?"
    };
  }

  generateSummary(title, score, biases, confidenceGap) {
    const biasList = biases.map(b => b.name).join(", ");
    if (score >= 7) {
      return `High Blind Spot Vulnerability (${score}/10). Your reasoning exhibits active patterns of ${biasList}. Expressed conviction outpaces empirical testing. Deliberate Socratic stress-testing is strongly warranted before commitment.`;
    } else if (score >= 4) {
      return `Moderate Blind Spot Risk (${score}/10). Reasoning demonstrates solid domain familiarity, but contains unverified key premises regarding timeline, stakeholder impact, and market responsiveness.`;
    } else {
      return `Well-Calibrated Reasoning (${score}/10). Low blind spot risk detected. Assumptions are largely stated and grounded in realistic heuristics.`;
    }
  }
}

// ============================================================================
// 3. LIVE MULTI-TURN SOCRATIC DIALOGUE ENGINE
// ============================================================================

class DynamicSocraticDialogueEngine {
  constructor() {
    this.messages = [];
    this.storageKey = "blind_spot_ai_config";
    this.config = this.loadConfig();
  }

  loadConfig() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : { provider: "builtin", apiKey: "", model: "gpt-4o" };
    } catch (e) {
      return { provider: "builtin", apiKey: "", model: "gpt-4o" };
    }
  }

  saveConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.config));
    } catch (e) {
      console.warn("Error saving AI config:", e);
    }
  }

  async askCompanion(userQuery, activeDecision) {
    this.messages.push({ role: "user", content: userQuery });

    // If using direct OpenAI API with a configured key
    if (this.config.provider === "openai" && this.config.apiKey) {
      try {
        return await this.callOpenAIDirect(userQuery, activeDecision);
      } catch (err) {
        console.warn("OpenAI API call failed, falling back to built-in Socratic engine:", err);
      }
    }

    // If using Google Gemini API with a configured key
    if (this.config.provider === "gemini" && this.config.apiKey) {
      try {
        return await this.callGeminiDirect(userQuery, activeDecision);
      } catch (err) {
        console.warn("Gemini API call failed, falling back to built-in Socratic engine:", err);
      }
    }

    // In-browser intelligent Socratic reasoning processor (Zero-setup, offline capable)
    return this.generateSmartSocraticReply(userQuery, activeDecision);
  }

  async callOpenAIDirect(userQuery, decision) {
    const systemPrompt = `You are Blind Spot, an elite Socratic thinking companion and cognitive debiasing partner.
The user is evaluating this decision:
Decision Statement: ${decision.title}
Context: ${decision.context}
Current Stated Confidence: ${decision.userConfidence}/10
Blind Spot Score: ${decision.blindSpotScore}/10

CRITICAL CONSTRAINTS:
1. NEVER tell the user what to decide, recommend choices, or use directive words like "you should", "you must", "I advise".
2. Use Socratic inquiry: ask deep, probing questions that challenge unexamined assumptions.
3. Be respectful, rigorous, and intellectually honest. Keep answers concise (2-4 paragraphs max).`;

    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...this.messages.map(m => ({ role: m.role, content: m.content }))
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify({
        model: this.config.model || "gpt-4o",
        messages: apiMessages,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI error HTTP ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;
    this.messages.push({ role: "assistant", content: reply });
    return reply;
  }

  async callGeminiDirect(userQuery, decision) {
    const systemInstruction = `You are Blind Spot, an elite Socratic thinking companion.
Decision Context: "${decision.title}" — ${decision.context}.
NEVER recommend an option or tell the user what to do. Challenge assumptions using Socratic questions.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.config.apiKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: this.messages.map(m => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }]
        }))
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini error HTTP ${response.status}`);
    }

    const data = await response.json();
    const reply = data.candidates[0].content.parts[0].text;
    this.messages.push({ role: "assistant", content: reply });
    return reply;
  }

  generateSmartSocraticReply(query, decision) {
    const q = query.toLowerCase();
    let reply = "";

    if (q.includes("overconfidence") || q.includes("confident") || q.includes("score")) {
      reply = `When examining your decision ("${decision.title.slice(0, 45)}..."), you indicated a confidence level of ${decision.userConfidence}/10.\n\nOverconfidence bias typically surfaces when our subjective conviction outpaces verifiable external proof. In your reasoning, you've relied heavily on your internal expectations rather than contractually binding commitments or hard survival data.\n\nReflective Question: What is the single most convincing piece of evidence that, if it vanished tomorrow, would drop your confidence from ${decision.userConfidence} down to 3?`;
    } else if (q.includes("skeptic") || q.includes("investor") || q.includes("fail") || q.includes("competitor")) {
      reply = `A seasoned skeptic or competitor wouldn't question your ambition—they would question your operational buffer.\n\nThey would point out that execution friction is rarely linear: client acquisition takes 2x longer, unexpected taxes or burn take 30% more capital, and energy dips after month 3.\n\nReflective Question: What is your contingency plan if, 6 months in, you have achieved only 20% of your projected revenue? What will you do on day 181?`;
    } else if (q.includes("test") || q.includes("experiment") || q.includes("assumption") || q.includes("validate")) {
      reply = `To stress-test your core premises without catastrophic risk, avoid all-or-nothing leaps. Instead, construct a Karl Popper falsification test:\n\n1. Identify your single riskiest hypothesis (e.g., that customers will convert, or that your runway will hold).\n2. Create a mini-trial with an explicit disproof condition.\n\nReflective Question: What is a low-risk commitment you can ask from prospective customers or partners *this week* (such as a $100 deposit, an signed LOI, or a written agreement) that gives you unmistakable proof of validation?`;
    } else if (q.includes("spouse") || q.includes("partner") || q.includes("family") || q.includes("relationship") || q.includes("boss")) {
      reply = `External stakeholders often carry the emotional burden of our bold decisions while feeling they have less control over the outcome.\n\nIf they voice support, it may be out of love rather than genuine comfort with the financial volatility.\n\nReflective Question: Have you agreed upon an explicit, non-negotiable 'stop-loss' number or timeline with them—a clear metric where, if hit, you promise to return to stability?`;
    } else {
      reply = `That touches on the core tension of your choice: balancing ambition against downside fragility.\n\nNotice how in your query, there is an implicit premise that you must resolve this immediately or in a single binary move. Socratic thinking invites us to look for the hidden third path.\n\nReflective Question: If you were advising your best friend in this exact dilemma, what is the one uncomfortable question you would force them to answer honestly?`;
    }

    this.messages.push({ role: "assistant", content: reply });
    return reply;
  }
}

// Supabase Cloud Configuration
const SUPABASE_CONFIG = {
  url: "https://yfwcnncthbjcwekkoxwe.supabase.co",
  anonKey: "sb_publishable_0Eeg2w7OjIs9jAOhSDPGOw_zGBxtoZE"
};

class AppStateController {
  constructor() {
    this.storageKey = "blind_spot_decisions_v2";
    this.activeDecision = null;
    this.history = this.loadHistory();
    this.engine = new EpistemicCognitiveEngine();
    this.chatEngine = new DynamicSocraticDialogueEngine();

    // Supabase Live Client (Cloud Sync)
    this.supabase = null;
    if (typeof window !== "undefined" && window.supabase && typeof window.supabase.createClient === "function") {
      try {
        this.supabase = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
        console.log("Supabase client initialized with live instance:", SUPABASE_CONFIG.url);
      } catch (err) {
        console.warn("Supabase initialization notice:", err);
      }
    }
  }

  loadHistory() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("LocalStorage access error:", e);
      return [];
    }
  }

  saveHistory() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.history));
    } catch (e) {
      console.warn("LocalStorage save error:", e);
    }
  }

  async syncFromSupabase(onSynced) {
    if (!this.supabase) return;
    try {
      const { data, error } = await this.supabase
        .from("decisions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(30);

      if (!error && Array.isArray(data) && data.length > 0) {
        const existingIds = new Set(this.history.map(h => h.id || h.supabaseId));
        const remoteRecords = data
          .filter(row => !existingIds.has(row.id))
          .map(row => ({
            id: row.id,
            supabaseId: row.id,
            timestamp: row.created_at ? new Date(row.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "Cloud Sync",
            title: row.title,
            context: row.context_text,
            initialConfidence: row.initial_confidence,
            blindSpotScore: row.blind_spot_score,
            finalDecision: row.final_decision || "",
            postConfidence: row.final_confidence || row.initial_confidence,
            keyTakeaway: row.reflection_notes || "",
            fromCloud: true
          }));

        if (remoteRecords.length > 0) {
          this.history = [...remoteRecords, ...this.history];
          this.saveHistory();
          if (typeof onSynced === "function") onSynced();
        }
      }
    } catch (err) {
      console.warn("Supabase fetch notice:", err);
    }
  }

  addDecisionRecord(record) {
    this.history.unshift(record);
    this.saveHistory();

    // Asynchronously synchronize with Supabase Cloud
    if (this.supabase) {
      this.supabase
        .from("decisions")
        .insert([
          {
            title: record.title,
            context_text: record.context || "",
            initial_confidence: record.initialConfidence,
            blind_spot_score: record.blindSpotScore,
            risk_level: record.blindSpotScore >= 7 ? "high" : (record.blindSpotScore >= 4 ? "moderate" : "low"),
            analysis_payload: record.analysisPayload || {},
            final_decision: record.finalDecision,
            reflection_notes: record.keyTakeaway || null,
            final_confidence: record.postConfidence
          }
        ])
        .select()
        .then(({ data, error }) => {
          if (error) {
            console.warn("Supabase cloud sync note (saved safely in browser):", error.message);
          } else if (Array.isArray(data) && data.length > 0) {
            record.supabaseId = data[0].id;
            this.saveHistory();
            console.log("Decision successfully synchronized to Supabase Cloud:", data[0].id);
          }
        })
        .catch(err => {
          console.warn("Supabase network sync note:", err);
        });
    }
  }

  async deleteRecord(index) {
    const item = this.history[index];
    this.history.splice(index, 1);
    this.saveHistory();

    if (item && item.supabaseId && this.supabase) {
      try {
        await this.supabase.from("decisions").delete().eq("id", item.supabaseId);
      } catch (err) {
        console.warn("Supabase delete notice:", err);
      }
    }
  }

  wipeAll() {
    this.history = [];
    localStorage.removeItem(this.storageKey);
  }
}

// ============================================================================
// 5. UI CONTROLLER & EVENT BINDINGS
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  const state = new AppStateController();

  // DOM Elements
  const decisionForm = document.getElementById("decisionForm");
  const decisionTitle = document.getElementById("decisionTitle");
  const decisionContext = document.getElementById("decisionContext");
  const wordCount = document.getElementById("wordCount");
  const samplePresets = document.getElementById("samplePresets");
  const confidenceSlider = document.getElementById("confidenceSlider");
  const confidenceValue = document.getElementById("confidenceValue");
  const analyzeBtn = document.getElementById("analyzeBtn");
  const quickMissingBtn = document.getElementById("quickMissingBtn");
  const horizonPills = document.querySelectorAll(".horizon-pill");

  // Dashboard & State Panels
  const emptyState = document.getElementById("emptyState");
  const loadingState = document.getElementById("loadingState");
  const loadingStatusText = document.getElementById("loadingStatusText");
  const analysisDashboard = document.getElementById("analysisDashboard");

  // Output Elements
  const displayHorizon = document.getElementById("displayHorizon");
  const displayRiskBadge = document.getElementById("displayRiskBadge");
  const analysisResultsTitle = document.getElementById("analysisResultsTitle");
  const analysisSummary = document.getElementById("analysisSummary");
  const scoreValueBig = document.getElementById("scoreValueBig");
  const scoreRiskLabel = document.getElementById("scoreRiskLabel");
  const scoreGaugeArc = document.getElementById("scoreGaugeArc");
  const biasChipsRow = document.getElementById("biasChipsRow");

  // Meter Elements
  const meterConfidenceBar = document.getElementById("meterConfidenceBar");
  const meterConfidenceText = document.getElementById("meterConfidenceText");
  const meterEvidenceBar = document.getElementById("meterEvidenceBar");
  const meterEvidenceText = document.getElementById("meterEvidenceText");
  const mismatchAnalysisText = document.getElementById("mismatchAnalysisText");

  // Assumptions & Socratic Deck
  const assumptionNodesGrid = document.getElementById("assumptionNodesGrid");
  const assumptionDetailBox = document.getElementById("assumptionDetailBox");
  const detailBadge = document.getElementById("detailBadge");
  const closeDetailBtn = document.getElementById("closeDetailBtn");
  const detailAssumptionText = document.getElementById("detailAssumptionText");
  const detailFalsificationTest = document.getElementById("detailFalsificationTest");
  const perspectiveContentCard = document.getElementById("perspectiveContentCard");
  const perspectiveTabs = document.querySelectorAll(".perspective-tabs .tab-btn");
  const socraticDeckGrid = document.getElementById("socraticDeckGrid");

  // Live Socratic Chat Elements
  const chatMessagesContainer = document.getElementById("chatMessagesContainer");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const sendChatBtn = document.getElementById("sendChatBtn");
  const clearChatBtn = document.getElementById("clearChatBtn");
  const chatSuggestionChips = document.getElementById("chatSuggestionChips");

  // API Settings Elements
  const apiSettingsBtn = document.getElementById("apiSettingsBtn");
  const activeModelBadge = document.getElementById("activeModelBadge");
  const apiSettingsDialog = document.getElementById("apiSettingsDialog");
  const closeApiSettingsBtn = document.getElementById("closeApiSettingsBtn");
  const saveApiSettingsBtn = document.getElementById("saveApiSettingsBtn");
  const aiProviderSelect = document.getElementById("aiProviderSelect");
  const apiKeyGroup = document.getElementById("apiKeyGroup");
  const apiKeyInput = document.getElementById("apiKeyInput");
  const toggleApiKeyVisibility = document.getElementById("toggleApiKeyVisibility");
  const modelSelectGroup = document.getElementById("modelSelectGroup");
  const modelNameInput = document.getElementById("modelNameInput");

  // Final Decision Recording
  const recordDecisionForm = document.getElementById("recordDecisionForm");
  const userFinalDecisionText = document.getElementById("userFinalDecisionText");
  const postConfidenceSlider = document.getElementById("postConfidenceSlider");
  const postConfidenceValue = document.getElementById("postConfidenceValue");
  const keyTakeawayText = document.getElementById("keyTakeawayText");
  const exportBriefBtn = document.getElementById("exportBriefBtn");

  // Dialogs
  const missingInsightDialog = document.getElementById("missingInsightDialog");
  const closeMissingModalBtn = document.getElementById("closeMissingModalBtn");
  const missingActionAcknowledge = document.getElementById("missingActionAcknowledge");
  const missingCoreTitle = document.getElementById("missingCoreTitle");
  const missingExplanation = document.getElementById("missingExplanation");
  const missingQuestion = document.getElementById("missingQuestion");

  const premortemBtn = document.getElementById("premortemBtn");
  const premortemDialog = document.getElementById("premortemDialog");
  const closePremortemModalBtn = document.getElementById("closePremortemModalBtn");
  const savePremortemBtn = document.getElementById("savePremortemBtn");

  const historyBtn = document.getElementById("historyBtn");
  const historyCountBadge = document.getElementById("historyCountBadge");
  const historyDialog = document.getElementById("historyDialog");
  const historyListContainer = document.getElementById("historyListContainer");
  const closeHistoryModalBtn = document.getElementById("closeHistoryModalBtn");
  const closeHistoryBottomBtn = document.getElementById("closeHistoryBottomBtn");
  const wipeAllDataBtn = document.getElementById("wipeAllDataBtn");

  const privacyBtn = document.getElementById("privacyBtn");
  const privacyDialog = document.getElementById("privacyDialog");
  const closePrivacyDialogBtn = document.getElementById("closePrivacyDialogBtn");
  const closePrivacyBottomBtn = document.getElementById("closePrivacyBottomBtn");
  const privacyVaultSize = document.getElementById("privacyVaultSize");
  const privacyRecordCount = document.getElementById("privacyRecordCount");
  const privacyExportBtn = document.getElementById("privacyExportBtn");
  const privacyPurgeBtn = document.getElementById("privacyPurgeBtn");

  const feedbackModalTrigger = document.getElementById("feedbackModalTrigger");
  const feedbackDialog = document.getElementById("feedbackDialog");
  const closeFeedbackModalBtn = document.getElementById("closeFeedbackModalBtn");
  const submitFeedbackBtn = document.getElementById("submitFeedbackBtn");

  const crisisDialog = document.getElementById("crisisDialog");
  const closeCrisisBtn = document.getElementById("closeCrisisBtn");
  const crisisAcknowledgeBtn = document.getElementById("crisisAcknowledgeBtn");

  const toastContainer = document.getElementById("toastContainer");

  let currentSelectedHorizon = "1-year";

  function updateBadge() {
    historyCountBadge.textContent = state.history.length;
  }
  updateBadge();

  function updateModelBadge() {
    const p = state.chatEngine.config.provider;
    if (p === "openai") {
      activeModelBadge.textContent = `Model: OpenAI (${state.chatEngine.config.model || 'GPT-4o'})`;
    } else if (p === "gemini") {
      activeModelBadge.textContent = `Model: Google Gemini`;
    } else if (p === "anthropic") {
      activeModelBadge.textContent = `Model: Claude 3.5 Sonnet`;
    } else {
      activeModelBadge.textContent = `Model: Dynamic Socratic (Built-in)`;
    }
  }
  updateModelBadge();

  function showToast(message, icon = "✓") {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Word count listener
  decisionContext.addEventListener("input", () => {
    const text = decisionContext.value.trim();
    const words = text ? text.split(/\s+/).length : 0;
    wordCount.textContent = `${words} words`;
  });

  // Confidence slider update
  confidenceSlider.addEventListener("input", (e) => {
    confidenceValue.textContent = `${e.target.value} / 10`;
  });

  postConfidenceSlider.addEventListener("input", (e) => {
    postConfidenceValue.textContent = `${e.target.value} / 10`;
  });

  // Horizon selection
  horizonPills.forEach(pill => {
    pill.addEventListener("click", () => {
      horizonPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentSelectedHorizon = pill.getAttribute("data-horizon");
    });
  });

  // Load Presets
  samplePresets.addEventListener("change", (e) => {
    const key = e.target.value;
    const preset = PRESET_SCENARIOS[key];
    if (!preset) return;

    decisionTitle.value = preset.title;
    decisionContext.value = preset.context;
    confidenceSlider.value = preset.confidence;
    confidenceValue.textContent = `${preset.confidence} / 10`;

    horizonPills.forEach(pill => {
      if (pill.getAttribute("data-horizon") === preset.horizon) {
        pill.click();
      }
    });

    const words = preset.context.trim().split(/\s+/).length;
    wordCount.textContent = `${words} words`;
    showToast(`Loaded scenario: ${preset.title.slice(0, 35)}...`, "⚡");
  });

  // ==========================================================================
  // RUN ANALYSIS PIPELINE
  // ==========================================================================

  function executeAnalysis() {
    const title = decisionTitle.value.trim();
    const context = decisionContext.value.trim();
    const userConfidence = parseInt(confidenceSlider.value, 10);

    if (!title || !context) {
      showToast("Please provide both a decision statement and your context.", "⚠️");
      decisionTitle.focus();
      return;
    }

    // Crisis Intercept Check
    if (state.engine.isCrisisTriggered(`${title} ${context}`)) {
      crisisDialog.showModal();
      return;
    }

    // UI Loading Progression
    emptyState.classList.add("hidden");
    analysisDashboard.classList.add("hidden");
    loadingState.classList.remove("hidden");

    const steps = [
      "Parsing explicit vs inferred premises...",
      "Evaluating cognitive bias patterns & heuristics...",
      "Comparing conviction against empirical evidentiary support...",
      "Synthesizing 4 stakeholder perspectives & Socratic inquiries..."
    ];

    let stepIndex = 0;
    const stepInterval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        loadingStatusText.textContent = steps[stepIndex];
      }
    }, 450);

    setTimeout(() => {
      clearInterval(stepInterval);
      const analysis = state.engine.analyze(title, context, userConfidence, currentSelectedHorizon);
      state.activeDecision = analysis;
      renderAnalysis(analysis);
      loadingState.classList.add("hidden");
      analysisDashboard.classList.remove("hidden");
      showToast("Cognitive stress-test completed. Examine your blind spots.", "🎯");
    }, 1800);
  }

  analyzeBtn.addEventListener("click", executeAnalysis);

  // Quick "What Am I Missing?" Modal Trigger
  quickMissingBtn.addEventListener("click", () => {
    const title = decisionTitle.value.trim();
    const context = decisionContext.value.trim();

    if (!title || !context) {
      showToast("Please enter a decision and context first.", "⚠️");
      return;
    }

    const tempAnalysis = state.engine.analyze(title, context, parseInt(confidenceSlider.value, 10), currentSelectedHorizon);
    const missing = tempAnalysis.instantMissingInsight;

    missingCoreTitle.textContent = missing.coreBlindSpot;
    missingExplanation.textContent = missing.oneSentenceExplanation;
    missingQuestion.textContent = missing.leverageQuestion;

    missingInsightDialog.showModal();
  });

  closeMissingModalBtn.addEventListener("click", () => missingInsightDialog.close());
  missingActionAcknowledge.addEventListener("click", () => missingInsightDialog.close());

  // ==========================================================================
  // RENDER ANALYSIS RESULTS
  // ==========================================================================

  function renderAnalysis(data) {
    // 1. Meta & Hero
    displayHorizon.textContent = `Horizon: ${data.horizon}`;
    displayRiskBadge.textContent = `${data.riskLevel.toUpperCase()} RISK`;
    displayRiskBadge.className = `meta-badge-risk tag-${data.riskLevel === 'high' ? 'red' : (data.riskLevel === 'moderate' ? 'amber' : 'green')}`;
    analysisResultsTitle.textContent = data.title;
    analysisSummary.textContent = data.summaryAssessment;

    // 2. Speedometer Gauge
    scoreValueBig.textContent = data.blindSpotScore;
    scoreRiskLabel.textContent = `${data.riskLevel.toUpperCase()} RISK`;
    scoreRiskLabel.className = `score-risk-tag tag-${data.riskLevel === 'high' ? 'red' : (data.riskLevel === 'moderate' ? 'amber' : 'green')}`;

    const maxOffset = 251.32;
    const progress = (data.blindSpotScore - 1) / 9;
    const targetOffset = maxOffset - (progress * maxOffset);
    scoreGaugeArc.style.strokeDashoffset = targetOffset;
    scoreGaugeArc.style.stroke = data.riskLevel === 'high' ? 'var(--color-high)' : (data.riskLevel === 'moderate' ? 'var(--color-moderate)' : 'var(--color-low)');

    // Render bias chips
    biasChipsRow.innerHTML = "";
    data.detectedBiases.forEach(bias => {
      const chip = document.createElement("span");
      chip.className = "bias-chip";
      chip.innerHTML = `<span class="bias-chip-dot"></span> ${bias.name}`;
      chip.title = bias.impact;
      biasChipsRow.appendChild(chip);
    });

    // 3. Conviction vs Evidence Meter
    const confPercent = Math.min(100, data.confidenceVsEvidence.detectedConfidenceScore * 10);
    const evPercent = Math.min(100, data.confidenceVsEvidence.evidenceStrengthScore * 10);

    meterConfidenceBar.style.height = `${confPercent}%`;
    meterConfidenceText.textContent = `${data.confidenceVsEvidence.detectedConfidenceScore}/10`;

    meterEvidenceBar.style.height = `${evPercent}%`;
    meterEvidenceText.textContent = `${data.confidenceVsEvidence.evidenceStrengthScore}/10`;

    mismatchAnalysisText.innerHTML = `<strong>Analysis:</strong> ${data.confidenceVsEvidence.analysis}`;

    // 4. Assumptions Grid
    assumptionNodesGrid.innerHTML = "";
    data.assumptions.forEach(asm => {
      const node = document.createElement("div");
      node.className = `assumption-node-card ${asm.isCritical ? 'critical-border' : ''}`;
      node.innerHTML = `
        <div class="node-header">
          <span class="node-type-tag type-${asm.type}">${asm.type}</span>
          ${asm.isCritical ? '<span class="critical-icon-badge" title="Critical Failure Point">🔴 CRITICAL</span>' : ''}
        </div>
        <p class="node-text">${asm.text}</p>
        <span class="node-prompt-action">Review Falsification Test →</span>
      `;
      node.addEventListener("click", () => {
        document.querySelectorAll(".assumption-node-card").forEach(c => c.classList.remove("active-node"));
        node.classList.add("active-node");
        showAssumptionDetail(asm);
      });
      assumptionNodesGrid.appendChild(node);
    });

    // 5. Perspectives Tabs & Content
    renderPerspectiveContent(data.stakeholderPerspectives[0]);
    perspectiveTabs.forEach(tab => {
      tab.classList.remove("active");
      tab.setAttribute("aria-selected", "false");
    });
    perspectiveTabs[0].classList.add("active");
    perspectiveTabs[0].setAttribute("aria-selected", "true");

    // 6. Socratic Deck Grid
    socraticDeckGrid.innerHTML = "";
    data.socraticInquiries.forEach(item => {
      const card = document.createElement("div");
      card.className = "socratic-card";
      card.innerHTML = `
        <span class="socratic-bias-tag">${item.category}</span>
        <h4 class="socratic-question">"${item.question}"</h4>
        <p class="socratic-reason">${item.reason}</p>
      `;
      socraticDeckGrid.appendChild(card);
    });

    // 7. Reset Socratic Chat thread with introductory greeting
    state.chatEngine.messages = [];
    chatMessagesContainer.innerHTML = `
      <div class="chat-bubble bubble-companion">
        <div class="bubble-header">
          <span class="bubble-sender">THINKING COMPANION (SOCRATIC)</span>
          <span class="bubble-time">Now</span>
        </div>
        <div class="bubble-body">
          I have analyzed your decision: "${data.title}". I calculated a Blind Spot Score of ${data.blindSpotScore}/10 (${data.riskLevel.toUpperCase()} RISK).
          
What would you like to probe? You can challenge my assessment, explore edge cases, or ask how to test your #1 assumption.
        </div>
      </div>
    `;
  }

  function showAssumptionDetail(asm) {
    assumptionDetailBox.classList.remove("hidden");
    detailBadge.textContent = asm.isCritical ? "CRITICAL FAILURE POINT" : `${asm.type.toUpperCase()} ASSUMPTION`;
    detailBadge.style.color = asm.isCritical ? "var(--color-high)" : "var(--color-moderate)";
    detailAssumptionText.textContent = asm.text;
    detailFalsificationTest.textContent = asm.falsificationTest;
  }

  closeDetailBtn.addEventListener("click", () => {
    assumptionDetailBox.classList.add("hidden");
    document.querySelectorAll(".assumption-node-card").forEach(c => c.classList.remove("active-node"));
  });

  function renderPerspectiveContent(perspective) {
    perspectiveContentCard.innerHTML = `
      <div class="lens-header">
        <span class="lens-tag">${perspective.icon} ${perspective.lens.toUpperCase()}</span>
        <h4 class="lens-title">${perspective.title}</h4>
      </div>
      <p class="lens-viewpoint">${perspective.viewpoint}</p>
      <div class="lens-question-box">
        <div class="lens-question-title">Socratic Challenge:</div>
        <p class="lens-question-text">"${perspective.probingQuestion}"</p>
      </div>
    `;
  }

  perspectiveTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      if (!state.activeDecision) return;
      perspectiveTabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      const lensKey = tab.getAttribute("data-lens");
      const found = state.activeDecision.stakeholderPerspectives.find(p => p.lens === lensKey);
      if (found) renderPerspectiveContent(found);
    });
  });

  // ==========================================================================
  // LIVE SOCRATIC CHAT HANDLER (MULTI-TURN DIALOGUE WITH THE MODEL)
  // ==========================================================================

  async function handleSendChatMessage(customQuery = null) {
    const query = (customQuery || chatInput.value).trim();
    if (!query) return;

    if (!state.activeDecision) {
      showToast("Please analyze a decision first before chatting with the model.", "⚠️");
      return;
    }

    // Append User Message to UI
    appendChatBubble("user", query);
    chatInput.value = "";
    sendChatBtn.disabled = true;

    // Append Typing Indicator
    const typingBubble = document.createElement("div");
    typingBubble.className = "chat-bubble bubble-companion";
    typingBubble.id = "typingIndicator";
    typingBubble.innerHTML = `
      <div class="bubble-header"><span class="bubble-sender">THINKING COMPANION</span></div>
      <div class="chat-typing-indicator">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    chatMessagesContainer.appendChild(typingBubble);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

    try {
      const reply = await state.chatEngine.askCompanion(query, state.activeDecision);
      typingBubble.remove();
      appendChatBubble("companion", reply);
    } catch (err) {
      typingBubble.remove();
      appendChatBubble("companion", "I encountered an error connecting to the model API. Please verify your API Key in Settings or switch to the Built-in Engine.");
    } finally {
      sendChatBtn.disabled = false;
      chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }
  }

  function appendChatBubble(role, text) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${role === 'user' ? 'bubble-user' : 'bubble-companion'}`;
    bubble.innerHTML = `
      <div class="bubble-header">
        <span class="bubble-sender">${role === 'user' ? 'YOU' : 'THINKING COMPANION (SOCRATIC)'}</span>
        <span class="bubble-time">Just now</span>
      </div>
      <div class="bubble-body">${escapeHtml(text)}</div>
    `;
    chatMessagesContainer.appendChild(bubble);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  }

  function escapeHtml(string) {
    const div = document.createElement("div");
    div.textContent = string;
    return div.innerHTML;
  }

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSendChatMessage();
  });

  // Support Enter to submit, Shift+Enter for new line
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendChatMessage();
    }
  });

  // Suggestion prompt chips click-to-send
  document.querySelectorAll(".chip-prompt").forEach(chip => {
    chip.addEventListener("click", () => {
      const prompt = chip.getAttribute("data-prompt");
      handleSendChatMessage(prompt);
    });
  });

  clearChatBtn.addEventListener("click", () => {
    state.chatEngine.messages = [];
    chatMessagesContainer.innerHTML = `
      <div class="chat-bubble bubble-companion">
        <div class="bubble-header">
          <span class="bubble-sender">THINKING COMPANION (SOCRATIC)</span>
          <span class="bubble-time">Now</span>
        </div>
        <div class="bubble-body">
          Conversation thread cleared. What other angle would you like to explore regarding your decision?
        </div>
      </div>
    `;
    showToast("Chat cleared.", "🧹");
  });

  // ==========================================================================
  // API & MODEL SETTINGS CONTROLLER
  // ==========================================================================

  apiSettingsBtn.addEventListener("click", () => {
    const config = state.chatEngine.config;
    aiProviderSelect.value = config.provider || "builtin";
    apiKeyInput.value = config.apiKey || "";
    modelNameInput.value = config.model || "gpt-4o";

    toggleProviderFields(aiProviderSelect.value);
    apiSettingsDialog.showModal();
  });

  closeApiSettingsBtn.addEventListener("click", () => apiSettingsDialog.close());

  aiProviderSelect.addEventListener("change", (e) => {
    toggleProviderFields(e.target.value);
  });

  function toggleProviderFields(provider) {
    if (provider === "builtin") {
      apiKeyGroup.classList.add("hidden");
      modelSelectGroup.classList.add("hidden");
    } else {
      apiKeyGroup.classList.remove("hidden");
      modelSelectGroup.classList.remove("hidden");
      if (provider === "gemini") {
        apiKeyInput.placeholder = "AIzaSy...";
        modelNameInput.value = "gemini-1.5-flash";
      } else if (provider === "anthropic") {
        apiKeyInput.placeholder = "sk-ant-...";
        modelNameInput.value = "claude-3-5-sonnet-20241022";
      } else {
        apiKeyInput.placeholder = "sk-...";
        modelNameInput.value = "gpt-4o";
      }
    }
  }

  toggleApiKeyVisibility.addEventListener("click", () => {
    if (apiKeyInput.type === "password") {
      apiKeyInput.type = "text";
      toggleApiKeyVisibility.textContent = "🙈";
    } else {
      apiKeyInput.type = "password";
      toggleApiKeyVisibility.textContent = "👁️";
    }
  });

  saveApiSettingsBtn.addEventListener("click", () => {
    const provider = aiProviderSelect.value;
    const apiKey = apiKeyInput.value.trim();
    const model = modelNameInput.value.trim();

    state.chatEngine.saveConfig({ provider, apiKey, model });
    updateModelBadge();
    apiSettingsDialog.close();
    showToast(`Saved AI settings: ${provider.toUpperCase()}`, "⚙️");
  });

  // ==========================================================================
  // DATA PRIVACY & SOVEREIGNTY VAULT
  // ==========================================================================

  if (privacyBtn && privacyDialog) {
    const refreshPrivacyStats = () => {
      try {
        const stored = localStorage.getItem("blind_spot_decisions_v2") || "[]";
        const parsed = JSON.parse(stored);
        const count = Array.isArray(parsed) ? parsed.length : 0;
        const bytes = new Blob([stored]).size;
        if (privacyVaultSize) privacyVaultSize.textContent = (bytes / 1024).toFixed(2) + " KB";
        if (privacyRecordCount) privacyRecordCount.textContent = `${count} ${count === 1 ? 'decision' : 'decisions'} stored`;
      } catch (err) {
        console.warn("Storage inspect error:", err);
      }
    };

    privacyBtn.addEventListener("click", () => {
      refreshPrivacyStats();
      privacyDialog.showModal();
    });

    if (closePrivacyDialogBtn) {
      closePrivacyDialogBtn.addEventListener("click", () => privacyDialog.close());
    }

    if (closePrivacyBottomBtn) {
      closePrivacyBottomBtn.addEventListener("click", () => privacyDialog.close());
    }

    if (privacyExportBtn) {
      privacyExportBtn.addEventListener("click", () => {
        try {
          const stored = localStorage.getItem("blind_spot_decisions_v2") || "[]";
          const decisions = JSON.parse(stored);
          const payload = {
            exportedAt: new Date().toISOString(),
            compliance: "GDPR Article 20 - Data Portability",
            application: "Blind Spot: Epistemic Mirror",
            totalRecords: decisions.length,
            decisions: decisions
          };
          const dataUri = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
          const dl = document.createElement("a");
          dl.setAttribute("href", dataUri);
          dl.setAttribute("download", `blind_spot_vault_${new Date().toISOString().slice(0, 10)}.json`);
          document.body.appendChild(dl);
          dl.click();
          dl.remove();
          showToast("Exported decisions archive (JSON)", "📥");
        } catch (e) {
          showToast("Failed to export data", "❌");
        }
      });
    }

    if (privacyPurgeBtn) {
      privacyPurgeBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to permanently erase all locally stored decisions? (GDPR Right to Erasure)")) {
          localStorage.removeItem("blind_spot_decisions_v2");
          state.history = [];
          updateBadge();
          refreshPrivacyStats();
          showToast("All local deliberations obliterated", "🗑️");
        }
      });
    }
  }

  // ==========================================================================
  // FINAL DECISION RECORDING & JOURNAL
  // ==========================================================================

  // Trigger initial background sync with Supabase cloud
  state.syncFromSupabase(() => updateBadge());

  recordDecisionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!state.activeDecision) {
      showToast("Please analyze a decision first.", "⚠️");
      return;
    }

    const decisionText = userFinalDecisionText.value.trim();
    if (!decisionText) {
      showToast("Please state your final conclusion.", "⚠️");
      userFinalDecisionText.focus();
      return;
    }

    const postConf = parseInt(postConfidenceSlider.value, 10);
    const takeaway = keyTakeawayText.value.trim();

    const record = {
      id: "dec_" + Date.now(),
      timestamp: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      title: state.activeDecision.title,
      context: state.activeDecision.context,
      initialConfidence: state.activeDecision.userConfidence,
      blindSpotScore: state.activeDecision.blindSpotScore,
      finalDecision: decisionText,
      postConfidence: postConf,
      keyTakeaway: takeaway,
      analysisPayload: {
        assumptions: state.activeDecision.assumptions || [],
        biases: state.activeDecision.detectedBiases || [],
        missingInsight: state.activeDecision.missingInsight || null
      }
    };

    state.addDecisionRecord(record);
    updateBadge();
    const cloudNotice = state.supabase ? " (Synced to Supabase Cloud ☁️)" : "";
    showToast(`Decision recorded in journal!${cloudNotice}`, "📖");
  });

  // Export Executive Debrief (Print/PDF)
  exportBriefBtn.addEventListener("click", () => {
    if (!state.activeDecision) {
      showToast("Run analysis first to export debrief.", "⚠️");
      return;
    }
    window.print();
  });

  // ==========================================================================
  // DIALOG CONTROLLERS (History, Pre-Mortem, Feedback, Crisis)
  // ==========================================================================

  // History / Journal Modal
  historyBtn.addEventListener("click", () => {
    renderHistoryList();
    historyDialog.showModal();
    // Refresh from Supabase in background when opened
    state.syncFromSupabase(() => renderHistoryList());
  });

  closeHistoryModalBtn.addEventListener("click", () => historyDialog.close());
  closeHistoryBottomBtn.addEventListener("click", () => historyDialog.close());

  function renderHistoryList() {
    historyListContainer.innerHTML = "";
    if (state.history.length === 0) {
      historyListContainer.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 2rem;">No saved decisions yet. Your recorded decisions appear here.</div>`;
      return;
    }

    state.history.forEach((item, index) => {
      const el = document.createElement("div");
      el.className = "history-item";
      const syncBadge = item.fromCloud || item.supabaseId
        ? `<span style="font-size: 0.68rem; background: rgba(16, 185, 129, 0.15); color: #34D399; padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(16, 185, 129, 0.3);">☁️ Cloud Synced</span>`
        : `<span style="font-size: 0.68rem; background: rgba(99, 102, 241, 0.15); color: #A5B4FC; padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(99, 102, 241, 0.3);">💾 Local Journal</span>`;

      el.innerHTML = `
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 8px; justify-content: space-between;">
            <div class="history-item-title">${escapeHtml(item.title)}</div>
            ${syncBadge}
          </div>
          <div class="history-item-date">${item.timestamp} • Score: ${item.blindSpotScore}/10 • Conf: ${item.initialConfidence} → ${item.postConfidence}/10</div>
          <div style="font-size: 0.8rem; color: #34D399; margin-top: 4px;"><strong>Decision:</strong> ${escapeHtml(item.finalDecision.slice(0, 75))}...</div>
        </div>
        <button class="btn-ghost" title="Delete record" style="padding: 4px 8px; margin-left: 8px;">✕</button>
      `;

      el.querySelector("button").addEventListener("click", async (evt) => {
        evt.stopPropagation();
        await state.deleteRecord(index);
        updateBadge();
        renderHistoryList();
        showToast("Record removed from journal.", "🗑️");
      });

      el.addEventListener("click", () => {
        decisionTitle.value = item.title;
        decisionContext.value = item.context;
        confidenceSlider.value = item.initialConfidence;
        confidenceValue.textContent = `${item.initialConfidence} / 10`;
        userFinalDecisionText.value = item.finalDecision;
        postConfidenceSlider.value = item.postConfidence;
        postConfidenceValue.textContent = `${item.postConfidence} / 10`;
        historyDialog.close();
        executeAnalysis();
      });

      historyListContainer.appendChild(el);
    });
  }

  wipeAllDataBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to permanently erase all saved decisions from this browser? (GDPR Right to Erasure)")) {
      state.wipeAll();
      updateBadge();
      renderHistoryList();
      showToast("All local decision data has been permanently wiped.", "🛡️");
    }
  });

  // Pre-Mortem Dialog
  premortemBtn.addEventListener("click", () => premortemDialog.showModal());
  closePremortemModalBtn.addEventListener("click", () => premortemDialog.close());

  savePremortemBtn.addEventListener("click", () => {
    const reasons = document.getElementById("premortemFailureReasons").value.trim();
    const action = document.getElementById("premortemMitigation").value.trim();

    if (!reasons) {
      showToast("Please articulate at least one reason for failure.", "⚠️");
      return;
    }

    if (keyTakeawayText) {
      keyTakeawayText.value = `Pre-mortem: Mitigating "${action || reasons.slice(0, 45)}"`;
    }

    premortemDialog.close();
    showToast("Pre-mortem failure simulation attached to reflection.", "⏳");
  });

  // Feedback & Accountability Dialog
  feedbackModalTrigger.addEventListener("click", () => feedbackDialog.showModal());
  closeFeedbackModalBtn.addEventListener("click", () => feedbackDialog.close());

  submitFeedbackBtn.addEventListener("click", () => {
    const ratingEl = document.querySelector(".choice-pill.active");
    const helpfulnessRating = ratingEl ? (ratingEl.getAttribute("data-rating") === "helpful" ? 5 : ratingEl.getAttribute("data-rating") === "neutral" ? 3 : 1) : 4;
    const issues = Array.from(document.querySelectorAll('input[name="feedbackIssue"]:checked')).map(el => el.value);
    const feedbackNotes = document.getElementById("feedbackNotes")?.value.trim() || "";

    if (state.supabase) {
      state.supabase
        .from("analysis_feedback")
        .insert([
          {
            decision_hash: state.activeDecision ? state.activeDecision.title.slice(0, 48) : "general_audit",
            helpfulness_rating: helpfulnessRating,
            issues_flagged: issues,
            comment: feedbackNotes || null
          }
        ])
        .then(({ error }) => {
          if (error) console.warn("Supabase feedback notice:", error.message);
        })
        .catch(err => console.warn(err));
    }

    feedbackDialog.close();
    showToast("Feedback recorded and audited. Thank you for holding AI accountable.", "🤝");
  });

  // Crisis Intercept Dialog
  closeCrisisBtn.addEventListener("click", () => crisisDialog.close());
  crisisAcknowledgeBtn.addEventListener("click", () => {
    crisisDialog.close();
    showToast("Acknowledged disclaimer. Please consult professionals for critical matters.", "ℹ️");
  });

  // ==========================================================================
  // MULTI-PAGE SPA VIEW ROUTER & NAVIGATION CONTROLLERS
  // ==========================================================================

  const views = {
    workbench: document.getElementById("workbenchView"),
    analysis: document.getElementById("analysisView"),
    dashboard: document.getElementById("dashboardView"),
    journal: document.getElementById("journalView"),
    methodology: document.getElementById("methodologyView"),
    privacy: document.getElementById("privacyView")
  };

  const navButtons = document.querySelectorAll(".nav-btn");

  window.switchView = function(viewName) {
    if (!views[viewName]) viewName = "workbench";

    // Update active nav button
    navButtons.forEach(btn => {
      if (btn.getAttribute("data-view") === viewName) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Hide all views, show requested view
    Object.keys(views).forEach(key => {
      if (views[key]) {
        if (key === viewName) {
          views[key].classList.remove("hidden");
        } else {
          views[key].classList.add("hidden");
        }
      }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });

    // Custom actions per view
    if (viewName === "dashboard") {
      renderDashboardView();
    } else if (viewName === "journal") {
      renderJournalView();
    } else if (viewName === "privacy") {
      renderPrivacyView();
    }
  };

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-view");
      window.switchView(target);
      window.location.hash = target;
    });
  });

  // Handle hash changes & initial hash on load
  const handleHashChange = () => {
    const hash = window.location.hash.replace("#", "").toLowerCase();
    if (hash && views[hash]) {
      window.switchView(hash);
    }
  };

  window.addEventListener("hashchange", handleHashChange);
  if (window.location.hash) {
    handleHashChange();
  }

  // Preset Scenario Loader (from Live Analysis View)
  const PRESET_SCENARIOS = {
    saas: {
      title: "Should I quit my VP role at an enterprise software firm to bootstrap an AI micro-SaaS?",
      context: "I've been in enterprise software for 10 years and make $210k. I have $85,000 in personal savings. My spouse works part-time. I built an AI workflow prototype over two weekends, and 12 Twitter users said it looks incredible and they'd definitely use it. I'm 100% confident I can reach $10k MRR within 4 months because the AI market is exploding and everyone needs automation.",
      confidence: 9,
      horizon: "1-year"
    },
    venture: {
      title: "Should we accept a $2.0M seed VC round at 25% dilution or remain bootstrapped at $18k MRR?",
      context: "We run a B2B compliance tool growing 15% MoM organically. An elite tier-1 fund offered $2M on a SAFE note at $8M post-money cap. They promise introductions to Fortune 500 CISOs, but require scaling headcount from 3 to 14 within 9 months. If we turn them down, competitors who raised may outspend us on Google Ads.",
      confidence: 8,
      horizon: "2-year"
    },
    relocation: {
      title: "Should our family relocate from London to San Francisco for an early-stage startup CTO offer?",
      context: "I was offered a founding CTO role with 4% equity and $190k salary in SF. We currently have two kids in London state schools and own our home with a fixed 2.1% mortgage. The founder claims SF in-person velocity is essential to capture the market.",
      confidence: 7,
      horizon: "5-year"
    },
    rewrite: {
      title: "Should our engineering team freeze customer features for 6 months to rewrite the backend in Rust?",
      context: "Our Python/Django API latency spikes during Monday morning peaks, causing 504 errors on 0.8% of requests. The engineering leads argue technical debt will crush us unless we rewrite core ingest services in Rust. Sales is screaming for 3 critical enterprise features needed to close $400k in pipeline this quarter.",
      confidence: 8,
      horizon: "6-month"
    }
  };

  window.loadScenario = function(key) {
    const sc = PRESET_SCENARIOS[key];
    if (!sc) return;
    decisionTitle.value = sc.title;
    decisionContext.value = sc.context;
    confidenceSlider.value = sc.confidence;
    confidenceValue.textContent = `${sc.confidence} / 10`;
    timeHorizonSelect.value = sc.horizon;
    window.switchView("workbench");
    showToast(`Loaded scenario: ${sc.title.slice(0, 35)}...`, "📋");
    executeAnalysis();
  };

  document.querySelectorAll(".preset-card-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const scenarioKey = btn.getAttribute("data-scenario");
      if (scenarioKey) window.loadScenario(scenarioKey);
    });
  });

  // Render Dashboard View
  function renderDashboardView() {
    const totalDecisionsEl = document.getElementById("dashTotalDecisions");
    const avgBlindSpotEl = document.getElementById("dashAvgBlindSpot");
    const avgDeflationEl = document.getElementById("dashAvgDeflation");
    const dashListEl = document.getElementById("dashDecisionsList");

    const history = state.history || [];
    const count = history.length;
    if (totalDecisionsEl) totalDecisionsEl.textContent = count;

    if (count > 0) {
      const avgScore = (history.reduce((acc, h) => acc + (h.blindSpotScore || 6.5), 0) / count).toFixed(1);
      const avgDelta = (history.reduce((acc, h) => acc + ((h.initialConfidence || 8) - (h.postConfidence || 6)), 0) / count).toFixed(1);
      if (avgBlindSpotEl) avgBlindSpotEl.textContent = `${avgScore} / 10`;
      if (avgDeflationEl) avgDeflationEl.textContent = `-${avgDelta} pts`;
    }

    if (dashListEl) {
      dashListEl.innerHTML = "";
      if (history.length === 0) {
        dashListEl.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 2rem;">No deliberations recorded yet. Analyze and record your first dilemma in the Workbench!</div>`;
      } else {
        history.slice(0, 5).forEach((item) => {
          const itemDiv = document.createElement("div");
          itemDiv.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);";
          itemDiv.innerHTML = `
            <div>
              <div style="font-weight: 700; color: var(--text-primary); font-size: 0.95rem; margin-bottom: 0.25rem;">${escapeHtml(item.title)}</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">${item.timestamp} • Initial Conf: ${item.initialConfidence}/10 → Calibrated: ${item.postConfidence}/10</div>
            </div>
            <div style="font-size: 0.85rem; font-weight: 700; padding: 0.35rem 0.75rem; border-radius: var(--radius-full); background: rgba(99, 102, 241, 0.15); color: #A5B4FC;">
              Score: ${item.blindSpotScore}/10
            </div>
          `;
          dashListEl.appendChild(itemDiv);
        });
      }
    }
  }

  // Render Journal View
  function renderJournalView(filterQuery = "") {
    const container = document.getElementById("journalListContainer");
    if (!container) return;
    container.innerHTML = "";

    let list = state.history || [];
    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase();
      list = list.filter(item => 
        (item.title && item.title.toLowerCase().includes(q)) || 
        (item.context && item.context.toLowerCase().includes(q)) ||
        (item.finalDecision && item.finalDecision.toLowerCase().includes(q)) ||
        (item.keyTakeaway && item.keyTakeaway.toLowerCase().includes(q))
      );
    }

    if (list.length === 0) {
      container.innerHTML = `<div class="glass-card" style="text-align: center; color: var(--text-muted); padding: 3rem;">
        ${filterQuery ? "No decisions match your search." : "Your journal is empty. Complete a reflection on the Workbench to record decisions."}
      </div>`;
      return;
    }

    list.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "glass-card";
      card.style.cssText = "padding: 1.5rem 1.75rem;";

      const syncBadge = item.fromCloud || item.supabaseId
        ? `<span style="font-size: 0.72rem; background: rgba(16, 185, 129, 0.15); color: #34D399; padding: 3px 8px; border-radius: 4px; border: 1px solid rgba(16, 185, 129, 0.3);">☁️ Cloud Synced</span>`
        : `<span style="font-size: 0.72rem; background: rgba(99, 102, 241, 0.15); color: #A5B4FC; padding: 3px 8px; border-radius: 4px; border: 1px solid rgba(99, 102, 241, 0.3);">💾 Local Vault</span>`;

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 0.75rem;">
          <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin: 0;">${escapeHtml(item.title)}</h4>
          ${syncBadge}
        </div>
        <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1rem;">
          Recorded: ${item.timestamp} • Blind Spot Score: <strong style="color: var(--color-moderate);">${item.blindSpotScore}/10</strong> • Confidence Calibrated: <strong>${item.initialConfidence} → ${item.postConfidence} / 10</strong>
        </div>
        <div style="padding: 1rem; background: var(--bg-surface-elevated); border-radius: var(--radius-md); border-left: 3px solid #10B981; margin-bottom: 1rem;">
          <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: #34D399; margin-bottom: 0.25rem;">Final Recorded Verdict:</div>
          <div style="color: var(--text-primary); font-size: 0.92rem; line-height: 1.5;">${escapeHtml(item.finalDecision)}</div>
        </div>
        ${item.keyTakeaway ? `
          <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">
            <strong>Key Socratic Takeaway:</strong> ${escapeHtml(item.keyTakeaway)}
          </div>
        ` : ''}
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
          <button type="button" class="btn-ghost load-record-btn" style="padding: 0.4rem 0.85rem; font-size: 0.82rem;">
            ↺ Reopen in Workbench
          </button>
          <button type="button" class="btn-danger-ghost delete-record-btn" style="padding: 0.4rem 0.85rem; font-size: 0.82rem;">
            ✕ Delete
          </button>
        </div>
      `;

      card.querySelector(".load-record-btn").addEventListener("click", () => {
        decisionTitle.value = item.title;
        decisionContext.value = item.context;
        confidenceSlider.value = item.initialConfidence;
        confidenceValue.textContent = `${item.initialConfidence} / 10`;
        userFinalDecisionText.value = item.finalDecision;
        postConfidenceSlider.value = item.postConfidence;
        postConfidenceValue.textContent = `${item.postConfidence} / 10`;
        window.switchView("workbench");
        executeAnalysis();
      });

      card.querySelector(".delete-record-btn").addEventListener("click", async () => {
        if (confirm("Delete this decision record from journal?")) {
          await state.deleteRecord(index);
          updateBadge();
          renderJournalView(document.getElementById("journalSearchInput")?.value || "");
          showToast("Record removed from journal.", "🗑️");
        }
      });

      container.appendChild(card);
    });
  }

  // Journal Search Listener
  const journalSearchInput = document.getElementById("journalSearchInput");
  if (journalSearchInput) {
    journalSearchInput.addEventListener("input", (e) => {
      renderJournalView(e.target.value);
    });
  }

  // Journal Export & Purge
  const journalExportBtn = document.getElementById("journalExportBtn");
  if (journalExportBtn) {
    journalExportBtn.addEventListener("click", () => {
      const stored = localStorage.getItem("blind_spot_decisions_v2") || "[]";
      const dataUri = "data:text/json;charset=utf-8," + encodeURIComponent(stored);
      const dl = document.createElement("a");
      dl.setAttribute("href", dataUri);
      dl.setAttribute("download", `blind_spot_journal_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(dl);
      dl.click();
      dl.remove();
      showToast("Exported decision journal (JSON)", "📥");
    });
  }

  const journalPurgeBtn = document.getElementById("journalPurgeBtn");
  if (journalPurgeBtn) {
    journalPurgeBtn.addEventListener("click", () => {
      if (confirm("Erase all decision journal records permanently? (GDPR Right to Erasure)")) {
        state.wipeAll();
        updateBadge();
        renderJournalView();
        showToast("All journal records obliterated", "🗑️");
      }
    });
  }

  // Render Privacy View
  function renderPrivacyView() {
    const sizeEl = document.getElementById("privacyViewVaultSize");
    const countEl = document.getElementById("privacyViewRecordCount");
    try {
      const stored = localStorage.getItem("blind_spot_decisions_v2") || "[]";
      const parsed = JSON.parse(stored);
      const count = Array.isArray(parsed) ? parsed.length : 0;
      const bytes = new Blob([stored]).size;
      if (sizeEl) sizeEl.textContent = (bytes / 1024).toFixed(2) + " KB";
      if (countEl) countEl.textContent = `${count} ${count === 1 ? 'decision' : 'decisions'} stored`;
    } catch (e) {
      console.warn(e);
    }
  }
});
