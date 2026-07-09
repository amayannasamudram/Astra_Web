"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ── Aurora hero ───────────────────────────────────────────── */
function Aurora() {
  return (
    <div
      className="aurora-layer"
      style={{
        position: "absolute",
        inset: -10,
        zIndex: 1,
        pointerEvents: "none",
        opacity: 0.55,
        willChange: "background-position",
        filter: "blur(8px) invert(1)",
        backgroundImage:
          "repeating-linear-gradient(100deg, #ffffff 0%, #ffffff 7%, transparent 10%, transparent 12%, #ffffff 16%), repeating-linear-gradient(100deg, #3b82f6 10%, #a5b4fc 15%, #93c5fd 20%, #ddd6fe 25%, #60a5fa 30%)",
        backgroundSize: "300%, 200%",
        backgroundPosition: "50% 50%, 50% 50%",
        maskImage: "radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%)",
        animation: "aurora 60s linear infinite",
      }}
    />
  );
}

/* ── Timeline rail ─────────────────────────────────────────── */
const STEPS = ["Describe", "Validate", "File", "Launch", "Acquire", "Operate"];

function TimelineRail({ activeStep }: { activeStep: number }) {
  return (
    <aside className="timeline-rail" style={{ position: "sticky", top: 88 }}>
      <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column" }}>
        {STEPS.map((s, i) => (
          <li
            key={i}
            style={{
              fontFamily: "var(--font-jetbrains-mono, monospace)",
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: activeStep === i ? "var(--ink)" : "var(--mute)",
              padding: "10px 0",
              borderTop: "1px solid var(--hair)",
              borderBottom: i === STEPS.length - 1 ? "1px solid var(--hair)" : undefined,
            }}
          >
            {String(i).padStart(2, "0")} · {s}
          </li>
        ))}
      </ol>
    </aside>
  );
}

/* ── Mock card ─────────────────────────────────────────────── */
function MockCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      aspectRatio: "4/3", borderRadius: 6, background: "var(--surface)",
      border: "1px solid var(--hair-2)", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 9 }}>
        {children}
      </div>
    </div>
  );
}

function MockHead({ title, status, live }: { title: string; status: string; live?: boolean }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 9,
      letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mute)",
      paddingBottom: 12, borderBottom: "1px solid var(--hair)",
    }}>
      <span>{title}</span>
      <span style={{ color: live ? "var(--accent)" : undefined, display: "flex", alignItems: "center", gap: 5 }}>
        {live && <span style={{ display: "inline-block", width: 4, height: 4, borderRadius: "50%", background: "var(--accent)" }} />}
        {status}
      </span>
    </div>
  );
}

function MockRow({ pill, pillVariant, main, meta }: { pill: string; pillVariant?: "star" | "gold"; main: string; meta?: string }) {
  const pillStyle: React.CSSProperties = {
    padding: "2px 7px", borderRadius: 999, border: "1px solid var(--hair-2)",
    fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase",
    color: pillVariant === "star" ? "var(--accent)" : pillVariant === "gold" ? "var(--gold)" : "var(--ink-2)",
    background: pillVariant === "star" ? "rgba(33,97,255,0.05)" : pillVariant === "gold" ? "var(--gold-bg)" : undefined,
    borderColor: pillVariant === "star" ? "rgba(33,97,255,0.25)" : pillVariant === "gold" ? "var(--gold-border)" : undefined,
    flexShrink: 0,
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, color: "var(--mute)", padding: "3px 0" }}>
      <span style={pillStyle}>{pill}</span>
      <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--ink-2)" }}>{main}</span>
      {meta && <span style={{ color: "var(--mute)", fontSize: 9, whiteSpace: "nowrap", flexShrink: 0 }}>{meta}</span>}
    </div>
  );
}

/* ── Timeline steps data ───────────────────────────────────── */
const timelineSteps = [
  {
    label: "00 · Describe", title: "Describe the idea.",
    desc: "A text box. No form, no template, no structured questionnaire. Astra parses your description and distributes context to all eight agents simultaneously.",
    agent: "5 min · founder",
    mock: (
      <MockCard>
        <MockHead title="New Company · Untitled" status="Draft" />
        <div style={{ fontFamily: "var(--font-inter-tight, 'Inter Tight', system-ui, sans-serif)", fontSize: 18, lineHeight: 1.4, color: "var(--ink)" }}>
          <span style={{ color: "var(--mute)" }}>I want to build a tool that helps independent musicians</span> find collaborators in their city — by sound, not just by genre.
          <span style={{ display: "inline-block", width: 7, height: "1em", background: "var(--accent)", marginLeft: 3, verticalAlign: "-3px", animation: "blink 1s steps(2) infinite" }} />
        </div>
        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 9, color: "var(--mute)", letterSpacing: "0.06em" }}>
          <span>249 / ∞</span><span>⌘↵ to dispatch agents</span>
        </div>
      </MockCard>
    ),
  },
  {
    label: "01 · Validate", title: "Validate the market.",
    desc: "Total addressable market, competitor landscape, customer personas, pricing benchmarks, and an honest go/no-go recommendation. Updated weekly as the market shifts.",
    agent: "2 hr · research agent",
    mock: (
      <MockCard>
        <MockHead title="Research Agent · Brief" status="Live" live />
        <MockRow pill="TAM" pillVariant="star" main="$2.4B addressable" meta="+12% YoY" />
        <MockRow pill="SAM" pillVariant="star" main="$340M serviceable" meta="31 cities" />
        <MockRow pill="RIVAL" pillVariant="gold" main="BandLab, Vampr, Splice" meta="3 direct" />
        <MockRow pill="RIVAL" pillVariant="gold" main="none with audio-fingerprint match" meta="gap" />
        <MockRow pill="CPL" pillVariant="star" main="$3.20 estimated" meta="Meta, IG" />
        <div style={{ borderTop: "1px solid var(--hair)", marginTop: 4, paddingTop: 10, display: "flex", gap: 9, alignItems: "center", fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10 }}>
          <span style={{ color: "var(--accent)" }}>●</span>
          <span style={{ flex: 1, color: "var(--ink)" }}>Recommendation: <em style={{ fontFamily: "var(--font-inter-tight, sans-serif)" }}>proceed.</em></span>
        </div>
      </MockCard>
    ),
  },
  {
    label: "02 · File", title: "File the company.",
    desc: "Delaware LLC filed and registered. EIN pulled from IRS.gov. Founder agreement, NDA, and IP assignment drafted in your specific context. Compliance deadlines tracked thereafter.",
    agent: "24 hr · legal agent",
    mock: (
      <MockCard>
        <MockHead title="Legal Agent · Approval Queue" status="2 Pending" live />
        <MockRow pill="FILE" main="Delaware LLC formation" meta="approved 14:02" />
        <MockRow pill="PAY" main="State filing fee · $110" meta="approved 14:02" />
        <MockRow pill="EIN" pillVariant="star" main="retrieved from IRS.gov" meta="88-4012984" />
        <MockRow pill="DRAFT" pillVariant="gold" main="Founder agreement · v2" meta="awaiting review" />
        <MockRow pill="DRAFT" pillVariant="gold" main="IP assignment, two-founder split" meta="awaiting review" />
      </MockCard>
    ),
  },
  {
    label: "03 · Launch", title: "Launch the site.",
    desc: "Headline, value prop, feature highlights, waitlist form, pricing preview — all generated in your brand voice and deployed live to a real domain before day two ends.",
    agent: "48 hr · web agent",
    mock: (
      <MockCard>
        <MockHead title="resonant.fm" status="Deployed" live />
        <div style={{ fontFamily: "var(--font-inter-tight, 'Inter Tight', system-ui, sans-serif)", fontSize: 20, lineHeight: 1.2, color: "var(--ink)" }}>
          Find your sound,<br /><em style={{ color: "var(--mute)", fontStyle: "italic" }}>in your city.</em>
        </div>
        <div style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 9, color: "var(--mute)", letterSpacing: "0.06em", marginTop: 6 }}>
          A collaborator network for independent musicians — matched by what you actually play.
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
          <div style={{ flex: 1, padding: "7px 10px", border: "1px solid var(--hair-2)", borderRadius: 5, fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, color: "var(--mute)" }}>you@studio.com</div>
          <div style={{ padding: "7px 14px", background: "var(--accent)", color: "#fff", borderRadius: 5, fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase" }}>Get in</div>
        </div>
      </MockCard>
    ),
  },
  {
    label: "04 · Acquire", title: "Acquire customers.",
    desc: "Cold email sequences to the personas Research identified. Google and Meta ad campaigns inside your budget. Social posts across platforms. Adjusts autonomously on what converts.",
    agent: "Ongoing · marketing agent",
    mock: (
      <MockCard>
        <MockHead title="Marketing Agent · 7-day window" status="Running" live />
        <MockRow pill="SENT" pillVariant="star" main="Cold sequence · cohort A" meta="487 / 500" />
        <MockRow pill="OPEN" pillVariant="star" main="Open rate" meta="38.4%" />
        <MockRow pill="REPLY" pillVariant="star" main="Replied" meta="12.1%" />
        <MockRow pill="ADS" pillVariant="gold" main="Meta · creative B winning" meta="$2.84 CPL" />
        <MockRow pill="SOCIAL" pillVariant="gold" main="9 posts queued · IG, X, TikTok" meta="auto-publish" />
      </MockCard>
    ),
  },
  {
    label: "05 · Operate", title: "Run everything else.",
    desc: "Your task list, the approval queue, the weekly digest, every routine email response, and a persistent memory of every decision your company has ever made.",
    agent: "Always · ops agent",
    mock: (
      <MockCard>
        <MockHead title="Weekly Digest · Week 06" status="Draft" />
        <div style={{ fontFamily: "var(--font-inter-tight, 'Inter Tight', system-ui, sans-serif)", fontSize: 16, lineHeight: 1.45, color: "var(--ink)" }}>
          This week the company hit <span style={{ color: "var(--accent)" }}>214 signups</span> — a 38% jump on last week&apos;s pace.
        </div>
        <MockRow pill="DECIDED" main="Hold pricing at $9 / mo" />
        <MockRow pill="SHIPPED" main="Audio-fingerprint v0 onboarding" />
        <MockRow pill="DECIDE" pillVariant="gold" main="Open up Berlin or wait?" />
        <div style={{ marginTop: "auto", fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 9, color: "var(--mute)", letterSpacing: "0.06em" }}>3 items need you · 0 are urgent</div>
      </MockCard>
    ),
  },
];

/* ── Agents section data ────────────────────────────────────── */
const agents = [
  { num: "01", role: "Research", title: "Validates the market.", desc: "Full TAM/SAM/SOM, competitor landscape, customer personas, pricing benchmarks, and a go/no-go summary. Real-time grounding — not training-cutoff data. Flags patent conflicts before you build.", icon: (<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="22" cy="22" r="13" /><circle cx="22" cy="22" r="6" /><path d="M22 4 L22 13 M22 31 L22 40 M4 22 L13 22 M31 22 L40 22" strokeWidth="1" /><circle cx="22" cy="22" r="1.6" fill="currentColor" stroke="none" /></svg>) },
  { num: "02", role: "Web", title: "Ships the site.", desc: "Generates copy, layout, and the waitlist flow from your one-paragraph pitch. Deploys live via Vercel with PostHog and Clarity analytics wired in. Iterates from plain-English feedback.", icon: (<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="22" cy="22" r="14" /><path d="M8 22 L36 22" strokeWidth="1" /><path d="M22 8 C28 12, 28 32, 22 36 C16 32, 16 12, 22 8 Z" strokeWidth="1" /><circle cx="22" cy="22" r="2.4" fill="currentColor" stroke="none" /></svg>) },
  { num: "03", role: "Marketing", title: "Runs the campaigns.", desc: "Creates social posts, reels, TikTok packages, and Meta ads. Builds and sends email sequences via Gmail and LinkedIn integrations. Adjusts autonomously on what converts.", icon: (<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M8 32 Q16 30, 22 22 T36 8" /><path d="M28 8 L36 8 L36 16" strokeLinecap="round" /><circle cx="8" cy="32" r="2.5" fill="currentColor" stroke="none" /><circle cx="22" cy="22" r="1.8" fill="currentColor" stroke="none" /></svg>) },
  { num: "04", role: "Technical", title: "Builds the product.", desc: "Provisions GitHub repos, Supabase databases, and Clerk auth. Scaffolds real app code with Claude Code and deploys to Vercel. Creates Linear issues and Notion docs for follow-up.", icon: (<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16,14 6,22 16,30" /><polyline points="28,14 38,22 28,30" /><line x1="26" y1="10" x2="18" y2="34" /></svg>) },
  { num: "05", role: "Legal", title: "Files the company.", desc: "Drafts NDAs, privacy policies, terms, and founder agreements as PDFs. Files Delaware LLCs and retrieves the EIN directly from IRS.gov. Monitors ongoing compliance.", icon: (<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="8" y="8" width="28" height="28" rx="2" /><path d="M14 16 L30 16 M14 22 L26 22 M14 28 L24 28" strokeWidth="1" /><circle cx="32" cy="32" r="3.2" fill="currentColor" stroke="none" /></svg>) },
  { num: "06", role: "Ops", title: "Keeps it moving.", desc: "Creates Linear tasks, documents SOPs and OKRs in Notion, sends investor emails, books calendar events, and synthesizes all agent outputs into a weekly executive digest.", icon: (<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="0.9"><line x1="22" y1="22" x2="9" y2="10" /><line x1="22" y1="22" x2="34" y2="9" /><line x1="22" y1="22" x2="8" y2="30" /><line x1="22" y1="22" x2="36" y2="32" /><line x1="22" y1="22" x2="22" y2="38" /><circle cx="22" cy="22" r="2.6" fill="currentColor" stroke="none" /><circle cx="9" cy="10" r="1.6" fill="currentColor" stroke="none" /><circle cx="34" cy="9" r="1.6" fill="currentColor" stroke="none" /><circle cx="8" cy="30" r="1.6" fill="currentColor" stroke="none" /><circle cx="36" cy="32" r="1.6" fill="currentColor" stroke="none" /><circle cx="22" cy="38" r="1.6" fill="currentColor" stroke="none" /></svg>) },
  { num: "07", role: "Sales", title: "Fills the pipeline.", desc: "Discovers and enriches leads, builds outreach sequences, sets up inbox warming and SPF/DKIM, creates CRM contacts, and tracks every touchpoint from first email to close.", icon: (<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10 L37 10 L27 23 L27 35 L17 35 L17 23 Z" /><circle cx="22" cy="10" r="2.4" fill="currentColor" stroke="none" /></svg>) },
  { num: "08", role: "Design", title: "Shapes the product.", desc: "Creates wireframes, color palettes, design specs, and logo briefs. Researches visual inspiration and produces the UX direction that Technical and Web build from.", icon: (<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="6" width="13" height="9" rx="1.5" /><rect x="25" y="6" width="13" height="9" rx="1.5" /><rect x="6" y="20" width="13" height="18" rx="1.5" /><rect x="25" y="20" width="13" height="18" rx="1.5" /></svg>) },
];

const energyLines = [
  { x1: 0, y1: -200, delay: "0.00s" }, { x1: 141, y1: -141, delay: "0.53s" },
  { x1: 200, y1: 0, delay: "1.05s" }, { x1: 141, y1: 141, delay: "1.58s" },
  { x1: 0, y1: 200, delay: "2.10s" }, { x1: -141, y1: 141, delay: "2.63s" },
  { x1: -200, y1: 0, delay: "3.15s" }, { x1: -141, y1: -141, delay: "3.68s" },
];

const agentLabels: { x: number; y: number; anchor: "middle" | "start" | "end"; dx: number; dy: number; name: string }[] = [
  { x: 0, y: -200, anchor: "middle", dx: 0, dy: -16, name: "Research" },
  { x: 141, y: -141, anchor: "start", dx: 14, dy: 5, name: "Web" },
  { x: 200, y: 0, anchor: "start", dx: 16, dy: 5, name: "Marketing" },
  { x: 141, y: 141, anchor: "start", dx: 14, dy: 5, name: "Technical" },
  { x: 0, y: 200, anchor: "middle", dx: 0, dy: 22, name: "Legal" },
  { x: -141, y: 141, anchor: "end", dx: -14, dy: 5, name: "Ops" },
  { x: -200, y: 0, anchor: "end", dx: -16, dy: 5, name: "Sales" },
  { x: -141, y: -141, anchor: "end", dx: -14, dy: 5, name: "Design" },
];

/* ── Pricing section data ───────────────────────────────────── */
const prices = {
  startup: {
    setup: 300,
    setupDesc: "Entity formation, EIN, founder agreements, and your first landing page — included with every plan. Non-recurring.",
    build: { monthly: 40, yearly: 34 },
    scale: { monthly: 60, yearly: 51 },
  },
  business: {
    setup: 50,
    setupDesc: "Onboarding, brand configuration, and initial agent setup tailored to your existing company. Non-recurring.",
    build: { monthly: 35, yearly: 30 },
    scale: { monthly: 55, yearly: 47 },
  },
};

export default function HomePage() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  // Pricing state
  const [audience, setAudience] = useState<"startup" | "business">("startup");
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const [animating, setAnimating] = useState(false);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const billingSwitchRef = useRef<HTMLDivElement>(null);

  const aud = prices[audience];

  function positionIndicator(btn: HTMLButtonElement) {
    if (!indicatorRef.current || !billingSwitchRef.current) return;
    const sr = billingSwitchRef.current.getBoundingClientRect();
    const br = btn.getBoundingClientRect();
    indicatorRef.current.style.width = br.width + "px";
    indicatorRef.current.style.transform = `translateX(${br.left - sr.left - 3}px)`;
  }

  useEffect(() => {
    const active = billingSwitchRef.current?.querySelector<HTMLButtonElement>("button.active");
    if (active) positionIndicator(active);
  });

  function switchAudience(a: "startup" | "business") {
    setAnimating(true);
    setTimeout(() => { setAudience(a); setAnimating(false); }, 120);
  }

  function switchPeriod(p: "monthly" | "yearly", btn: HTMLButtonElement) {
    setPeriod(p);
    positionIndicator(btn);
  }

  const buildAmt = aud.build[period];
  const scaleAmt = aud.scale[period];

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = parseInt((e.target as HTMLElement).dataset.step ?? "0", 10);
            setActiveStep(i);
          }
        });
      },
      { rootMargin: "-35% 0px -40% 0px" }
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* HERO */}
      <section style={{ minHeight: "100vh", padding: "140px 0 80px", position: "relative", overflow: "hidden" }}>
        <Aurora />
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mute)", margin: "0 0 28px" }}>Your AI Founding Team</p>
          <h1 aria-label="You bring the idea. Astra handles everything else." style={{ fontSize: "clamp(54px, 6.8vw, 92px)", lineHeight: 1.02, letterSpacing: "-0.035em", fontWeight: 400, margin: "0 0 32px" }}>
            You bring the idea.<br />
            <span style={{ color: "var(--accent)" }}>Astra</span>{" "}
            <span style={{ color: "var(--mute)" }}>handles everything else.</span>
          </h1>
          <p style={{ maxWidth: "52ch", fontSize: "clamp(16px, 1.4vw, 19px)", color: "var(--mute)", lineHeight: 1.65, margin: "0 0 40px" }}>
            Entity formation, market research, landing page, legal docs, and first customers — handled by eight specialized agents while you sleep.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/waitlist" className="btn-primary">Join the waitlist →</Link>
            <a href="/#agents" className="btn-secondary">See the agents</a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="wrap">
          <div className="mkt-hiw-intro">
            <div>
              <p className="mono section-label">The flow</p>
              <h2 style={{ fontSize: "clamp(32px, 3.8vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 400, margin: "12px 0 0" }}>One text box.<br />Three days.</h2>
            </div>
            <p style={{ color: "var(--mute)", fontSize: 16, lineHeight: 1.65, maxWidth: "48ch", margin: 0 }}>
              Onboarding is a single conversation. You describe the idea in plain English. Astra extracts the context, distributes it across eight agents, and the company assembles itself.
            </p>
          </div>

          <div className="mkt-timeline-grid">
            <TimelineRail activeStep={activeStep} />
            <div style={{ display: "flex", flexDirection: "column", gap: 96 }}>
              {timelineSteps.map((step, i) => (
                <article
                  key={i}
                  ref={(el) => { stepRefs.current[i] = el; }}
                  data-step={i}
                  className="mkt-step-article"
                >
                  <div>
                    <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mute)", margin: "0 0 18px" }}>{step.label}</p>
                    <h3 style={{ fontSize: "clamp(22px, 2.6vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.15, margin: "0 0 14px" }}>{step.title}</h3>
                    <p style={{ color: "var(--mute)", fontSize: 15, lineHeight: 1.65, maxWidth: "42ch", margin: 0 }}>{step.desc}</p>
                    <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginTop: 20 }}>{step.agent}</p>
                  </div>
                  {step.mock}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE MATH */}
      <section className="section">
        <div className="wrap">
          <div style={{ marginBottom: 48 }}>
            <p className="mono section-label">The math</p>
            <h2 style={{ fontSize: "clamp(28px, 3.2vw, 44px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.1, margin: "10px 0 0" }}>
              Why does hiring a team<br />cost more than a car payment?
            </h2>
          </div>
          <div className="mkt-math-grid">
            <div style={{ padding: "44px 52px", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
              <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--mute)", marginBottom: 18 }}>Traditional hiring</p>
              <p style={{ fontSize: "clamp(44px, 5vw, 72px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1, margin: 0, color: "var(--mute)", textDecoration: "line-through", textDecorationColor: "var(--hair-2)" }}>$7,300</p>
              <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mute)", margin: "8px 0 28px" }}>/ month</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--hair)", paddingTop: 22, display: "flex", flexDirection: "column", gap: 10 }}>
                {["Development team alone", "Legal counsel billed separately", "Design agency retainer", "Marketing freelancer or agency", "$300k+ annualized, full coverage", "6–8 weeks to get started"].map((item) => (
                  <li key={item} style={{ fontSize: 14, color: "var(--mute)", display: "flex", alignItems: "center", gap: 10, lineHeight: 1.4 }}>
                    <span style={{ width: 4, height: 4, flexShrink: 0, borderRadius: "50%", background: "var(--hair-2)", display: "inline-block" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mkt-math-divider" style={{ width: 1, background: "var(--hair)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mute)", background: "var(--hair)", padding: "7px 10px", borderRadius: 999 }}>vs</span>
            </div>
            <div style={{ padding: "44px 52px", background: "var(--surface)", display: "flex", flexDirection: "column" }}>
              <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--mute)", marginBottom: 18 }}>Astra</p>
              <p style={{ fontSize: "clamp(44px, 5vw, 72px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1, margin: 0, color: "var(--accent)" }}>from $40</p>
              <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mute)", margin: "8px 0 28px" }}>/ month</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--hair)", paddingTop: 22, display: "flex", flexDirection: "column", gap: 10 }}>
                {["Legal, technical, web, research", "Marketing and ops included", "Eight agents, shared memory", "Autonomous approval queue", "No retainer, no hiring overhead", "Live within 72 hours"].map((item) => (
                  <li key={item} style={{ fontSize: 14, color: "var(--mute)", display: "flex", alignItems: "center", gap: 10, lineHeight: 1.4 }}>
                    <span style={{ width: 4, height: 4, flexShrink: 0, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 40, marginTop: 36, paddingTop: 28, borderTop: "1px solid var(--hair)" }}>
            <p style={{ fontSize: 15, color: "var(--mute)", lineHeight: 1.6, maxWidth: "52ch", margin: 0 }}>Whether you&apos;re starting from scratch or already operating — there&apos;s a plan for where you are.</p>
            <a href="/#pricing" className="btn-secondary" style={{ flexShrink: 0 }}>See plans →</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "120px 0" }}>
        <div className="wrap">
          <p className="mono section-label" style={{ marginBottom: 44 }}>Cohort one · Opening June 1st</p>
          <div className="mkt-cta-grid">
            <h2 style={{ fontSize: "clamp(34px, 4.2vw, 58px)", letterSpacing: "-0.03em", fontWeight: 400, lineHeight: 1.08, margin: 0 }}>
              You bring the idea.<br /><em style={{ fontStyle: "italic", color: "var(--mute)" }}>Astra handles everything else.</em>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 28, alignItems: "flex-start" }}>
              <p style={{ fontSize: 16, color: "var(--mute)", lineHeight: 1.65, maxWidth: "44ch", margin: 0 }}>The first cohort opens June 1st — 100 spots, founding-rate pricing, your company live within 72 hours.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/waitlist" className="btn-primary">Join the waitlist →</Link>
                <a href="/#pricing" className="btn-secondary">See pricing</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AGENTS */}
      <section id="agents" style={{ borderTop: "1px solid var(--hair)" }}>
        <div style={{ padding: "140px 0 80px", borderBottom: "1px solid var(--hair)" }}>
          <div className="wrap">
            <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mute)", margin: "0 0 28px" }}>The stack</p>
            <h2 style={{ fontSize: "clamp(52px, 7.5vw, 104px)", lineHeight: 1.02, letterSpacing: "-0.03em", fontWeight: 400, margin: "0 0 28px" }}>
              Eight specialists.<br /><span style={{ color: "var(--mute)" }}>One shared </span><span style={{ color: "var(--accent)" }}>mind.</span>
            </h2>
            <p style={{ maxWidth: "54ch", fontSize: "clamp(16px, 1.4vw, 19px)", color: "var(--mute)", lineHeight: 1.65 }}>
              Each agent owns its domain completely. Each one builds on what the others produce through a shared memory store. Together, they form a founding team that operates around the clock.
            </p>
          </div>
        </div>

        {/* Agent grid */}
        <div className="mkt-agents-outer">
          <div className="mkt-agents-grid">
            {agents.map((agent) => (
              <div key={agent.num} style={{ background: "var(--bg)", padding: "40px 36px 32px", minHeight: 340, display: "flex", flexDirection: "column", gap: 10, transition: "background 0.3s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bg)")}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 6 }}>
                  <div style={{ width: 44, height: 44, flexShrink: 0, color: "var(--ink)" }}>{agent.icon}</div>
                  <div style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.18em", color: "var(--mute)", paddingTop: 4 }}>{agent.num}</div>
                </div>
                <div style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--accent)" }}>{agent.role}</div>
                <h3 style={{ fontSize: "clamp(22px, 2vw, 28px)", letterSpacing: "-0.015em", fontWeight: 400, lineHeight: 1.15, margin: "4px 0 0" }}>{agent.title}</h3>
                <p style={{ color: "var(--mute)", fontSize: 14, lineHeight: 1.6, margin: "6px 0 0", flex: 1 }}>{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Shared mind */}
        <div className="mkt-mind-outer">
          <div className="mkt-mind-grid">
            <div>
              <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--mute)", margin: "0 0 20px" }}>The shared mind</p>
              <h2 style={{ fontSize: "clamp(36px, 4.2vw, 56px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.08, margin: "0 0 24px" }}>
                Not eight chatbots.<br /><em style={{ color: "var(--mute)", fontStyle: "italic" }}>One company.</em>
              </h2>
              <p style={{ color: "var(--mute)", fontSize: 15, lineHeight: 1.7, maxWidth: "52ch", margin: "0 0 14px" }}>Every agent reads from and writes to the same vector store — every decision, document, campaign, and conversation lives in one persistent memory. When Sales enriches a lead, Marketing already knows it. When Technical ships a feature, Ops files it in the weekly digest.</p>
              <p style={{ color: "var(--mute)", fontSize: 15, lineHeight: 1.7, maxWidth: "52ch", margin: 0 }}>After ninety days, Astra knows your company better than any human consultant could — and that memory belongs to you.</p>
            </div>
            <div style={{ aspectRatio: "1", maxWidth: 480, marginLeft: "auto", width: "100%" }}>
              <svg viewBox="-260 -260 520 520" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-hidden="true">
                <circle stroke="var(--hair-2)" fill="none" strokeDasharray="3 6" cx="0" cy="0" r="200" />
                <circle stroke="var(--hair-2)" fill="none" strokeDasharray="3 6" cx="0" cy="0" r="130" />
                {agentLabels.map((a) => (
                  <g key={a.name} transform={`translate(${a.x},${a.y})`}>
                    <line stroke="var(--hair-2)" strokeWidth="1" x1="0" y1="0" x2={-a.x} y2={-a.y} />
                    <circle fill="var(--accent)" r="5" />
                    <text fill="var(--mute)" fontFamily="var(--font-inter-tight, 'Inter Tight', system-ui, sans-serif)" fontSize="13" fontStyle="italic" textAnchor={a.anchor} x={a.dx} y={a.dy}>{a.name}</text>
                  </g>
                ))}
                {energyLines.map((l, i) => (
                  <line key={i} stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 196" fill="none"
                    style={{ filter: "drop-shadow(0 0 4px rgba(33,97,255,0.5))", animation: `energyFlow 4.2s linear infinite`, animationDelay: l.delay }}
                    x1={l.x1} y1={l.y1} x2="0" y2="0" />
                ))}
                <circle cx="0" cy="0" r="9" fill="var(--ink)" style={{ filter: "drop-shadow(0 0 6px rgba(33,97,255,0.35))", animation: "corePulse 3.4s ease-in-out infinite" }} />
                <text fill="var(--ink)" fontFamily="var(--font-inter-tight, 'Inter Tight', system-ui, sans-serif)" fontSize="14" fontStyle="italic" textAnchor="middle" x="0" y="30">memory</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ borderTop: "1px solid var(--hair)" }}>
        <div style={{ padding: "140px 0 80px", borderBottom: "1px solid var(--hair)" }}>
          <div className="wrap">
            <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mute)", margin: "0 0 28px" }}>Pricing</p>
            <h2 style={{ fontSize: "clamp(52px, 7.5vw, 104px)", lineHeight: 1.02, letterSpacing: "-0.03em", fontWeight: 400, margin: "0 0 28px" }}>
              Two paths.<br /><span style={{ color: "var(--mute)" }}>One team </span><span style={{ color: "var(--accent)" }}>behind you.</span>
            </h2>
            <p style={{ maxWidth: "56ch", fontSize: "clamp(16px, 1.4vw, 19px)", color: "var(--mute)", lineHeight: 1.65 }}>
              Whether you&apos;re turning an idea into a company or already running one — Astra has a plan sized for where you are. Both paths include the same eight agents, working around the clock.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="mkt-pricing-inner" style={{ paddingTop: 52, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div style={{ display: "inline-flex", padding: 3, borderRadius: 12, background: "var(--bg)", border: "1px solid var(--hair)", gap: 2 }}>
            {(["startup", "business"] as const).map((a) => (
              <button
                key={a}
                onClick={() => switchAudience(a)}
                style={{
                  padding: "10px 22px", border: `1px solid ${audience === a ? "var(--hair)" : "transparent"}`,
                  background: audience === a ? "var(--surface)" : "transparent",
                  color: audience === a ? "var(--ink)" : "var(--mute)",
                  fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 11, letterSpacing: "0.14em",
                  textTransform: "uppercase", cursor: "pointer", borderRadius: 9, transition: "all 0.2s",
                }}
              >
                <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                  <span>{a === "startup" ? "New Startup Founders" : "Business Owners"}</span>
                  <span style={{ fontSize: 9, letterSpacing: "0.08em", color: "var(--accent)", opacity: audience === a ? 1 : 0, transition: "opacity 0.2s" }}>
                    from ${a === "startup" ? "40" : "35"} / mo
                  </span>
                </span>
              </button>
            ))}
          </div>
          <div style={{ width: 1, height: 32, background: "var(--hair)" }} />
          <div ref={billingSwitchRef} style={{ display: "inline-flex", padding: 3, borderRadius: 999, background: "var(--bg)", border: "1px solid var(--hair)", position: "relative" }}>
            <div ref={indicatorRef} style={{ position: "absolute", top: 3, left: 3, height: "calc(100% - 6px)", borderRadius: 999, background: "var(--ink)", transition: "transform 0.3s cubic-bezier(.4,0,.2,1)", zIndex: 1 }} />
            {(["monthly", "yearly"] as const).map((p) => (
              <button
                key={p}
                className={period === p ? "active" : ""}
                onClick={(e) => switchPeriod(p, e.currentTarget)}
                style={{ position: "relative", zIndex: 2, padding: "9px 18px", background: "transparent", border: 0, color: period === p ? "#fff" : "var(--mute)", fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                {p === "monthly" ? "Monthly" : (
                  <>Yearly <span style={{ padding: "2px 7px", borderRadius: 999, background: period === "yearly" ? "rgba(255,255,255,0.15)" : "rgba(33,97,255,0.1)", color: period === "yearly" ? "rgba(255,255,255,0.9)" : "var(--accent)", fontSize: 9, letterSpacing: "0.12em" }}>save 15%</span></>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Setup bar */}
        <div className="mkt-pricing-inner" style={{ marginTop: 28, paddingTop: 20, paddingBottom: 20, borderTop: "1px solid var(--hair)", borderBottom: "1px solid var(--hair)", display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 6 }}>Setup · one-time</div>
            <div style={{ fontSize: 32, fontWeight: 400, letterSpacing: "-0.01em", color: "var(--ink)", lineHeight: 1, opacity: animating ? 0.3 : 1, transition: "opacity 0.2s" }}>
              ${aud.setup}<span style={{ fontSize: 13, color: "var(--mute)", marginLeft: 6 }}>at signup</span>
            </div>
          </div>
          <div style={{ width: 1, alignSelf: "stretch", background: "var(--hair)" }} />
          <p style={{ margin: 0, color: "var(--mute)", fontSize: 14, lineHeight: 1.5, maxWidth: "52ch" }}>{aud.setupDesc}</p>
        </div>

        {/* Tiers */}
        <div className="mkt-tier-grid">
          {[
            { key: "build", tag: "Build", name: "Build", featured: false, amt: buildAmt, features: ["All eight agents active 24 / 7", "Features on demand via credits", "Marketing campaigns running autonomously", "Weekly ops digest", "Ongoing legal compliance monitoring", "Website iterations from plain English", "20 credits per month included", "Agent chat interface"] },
            { key: "scale", tag: "Most popular", name: "Scale", featured: true, amt: scaleAmt, features: ["50 credits per month included", "Priority agent processing", "Dedicated persistent memory", "Investor deck generation", "Pitch preparation assistance", "Term-sheet review", "Faster Computer Use queues", "Early access to new agents"] },
          ].map((tier) => (
            <div key={tier.key} style={{ padding: "40px 36px 36px", borderRadius: 4, background: "var(--surface)", border: `1px solid ${tier.featured ? "var(--hair-2)" : "var(--hair)"}`, display: "flex", flexDirection: "column", boxShadow: tier.featured ? "0 2px 24px rgba(0,0,0,0.06)" : undefined }}>
              <div style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: tier.featured ? "var(--accent)" : "var(--mute)", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                {tier.featured && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />}
                {tier.tag}
              </div>
              <div style={{ fontSize: 44, fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 16 }}>{tier.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 4 }}>
                <span style={{ fontSize: 24, color: "var(--mute)" }}>$</span>
                <span style={{ fontSize: 72, lineHeight: 1, letterSpacing: "-0.02em", opacity: animating ? 0.3 : 1, transition: "opacity 0.2s" }}>{tier.amt}</span>
                <span style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mute)", marginLeft: 6 }}>{period === "monthly" ? "/ month" : "/ mo, billed yearly"}</span>
              </div>
              <div style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mute)", marginBottom: 28, paddingBottom: 22, borderBottom: "1px solid var(--hair)" }}>
                {tier.key === "build" ? "All eight agents, 24/7" : "Everything in Build, plus"}
                {period === "yearly" && <span style={{ color: "var(--accent)", marginLeft: 8 }}>· ${(prices[audience][tier.key as "build" | "scale"].monthly - prices[audience][tier.key as "build" | "scale"].yearly) * 12} saved / yr</span>}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 11 }}>
                {tier.features.map((f) => (
                  <li key={f} style={{ fontSize: 14, color: "var(--mute)", display: "flex", alignItems: "flex-start", gap: 10, lineHeight: 1.5 }}>
                    <span style={{ flexShrink: 0, width: 4, height: 4, marginTop: 7, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
                    {f}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "auto" }}>
                <Link href="/waitlist" className={tier.featured ? "btn-primary" : "btn-secondary"} style={{ width: "100%", justifyContent: "center", display: "block", textAlign: "center" }}>
                  Start with {tier.name} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Math */}
        <div className="mkt-pricing-inner" style={{ paddingTop: 72, paddingBottom: 72, borderTop: "1px solid var(--hair)" }}>
          <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--mute)", margin: "0 0 22px" }}>The math, once more</p>
          <p style={{ fontSize: "clamp(22px, 3vw, 40px)", fontWeight: 400, lineHeight: 1.4, letterSpacing: "-0.015em", color: "var(--ink)" }}>
            Specialists for one month: <span style={{ color: "var(--mute)", textDecoration: "line-through", textDecorationColor: "var(--hair-2)", fontStyle: "italic" }}>$7,300</span>.<br />
            Astra for a new founder: <span style={{ color: "var(--accent)" }}>from $40/mo</span>.<br />
            Astra for a business owner: <span style={{ color: "var(--accent)" }}>from $35/mo</span>.
          </p>
        </div>

        {/* FAQ */}
        <div className="mkt-pricing-inner" style={{ paddingBottom: 80, borderTop: "1px solid var(--hair)" }}>
          <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--mute)", margin: "56px 0 20px" }}>FAQ</p>
          <h2 style={{ fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 400, letterSpacing: "-0.02em", margin: "0 0 48px" }}>Honest answers.</h2>
          <div style={{ borderTop: "1px solid var(--hair)" }}>
            {[
              { q: "What's included in the one-time setup fee?", a: "For new startup founders ($300): entity formation, EIN, founder agreements, IP assignment, and your first landing page deployed to a live domain. For business owners ($50): onboarding, brand configuration, and initial agent setup tailored to your existing company context. Both are charged once at signup and never again." },
              { q: "Is the LLC actually filed, or is this a template generator?", a: "Actually filed. The Legal Agent uses Computer Use to navigate the Delaware filing system, complete payment, and submit the formation documents directly. The EIN is then retrieved from IRS.gov the same way. You receive the real certificate of formation and EIN letter from the State of Delaware." },
              { q: "How does yearly billing work?", a: "Yearly is billed once for the year and saves you 15% versus monthly. You can switch back to monthly at renewal. Mid-year cancellation refunds the remaining unused months on a pro-rata basis." },
              { q: "Is this legal advice?", a: "No. Astra prepares documents and files paperwork autonomously, but every output ships with an explicit disclaimer: AI-generated document preparation, not legal advice. We recommend reviewing important documents with a licensed attorney before signing anything significant." },
              { q: "Can I cancel?", a: "Yes, any time. The setup fee is non-refundable once filing has begun, but Build and Scale are month-to-month with no commitment. If you cancel, you keep every document, the company entity, and your company memory — exportable on the way out." },
              { q: "What if I'm not in the US?", a: "Delaware accepts founders from any country — that is one of its longstanding advantages. We handle the registered agent requirement and the EIN is obtained whether or not you have a US Social Security Number." },
              { q: "Do you have an enterprise plan?", a: "For university accelerators and incubators, yes — we offer cohort pricing starting at $1,500 per cohort of ten founders. Reach out via the contact form on the waitlist page." },
            ].map(({ q, a }) => (
              <details key={q} style={{ borderBottom: "1px solid var(--hair)", padding: "22px 0" }}>
                <summary style={{ listStyle: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, fontSize: "clamp(18px, 1.8vw, 24px)", fontWeight: 400, letterSpacing: "-0.005em", color: "var(--ink)" }}>
                  {q}
                  <span style={{ width: 14, height: 14, flexShrink: 0, position: "relative", display: "inline-block" }}>
                    <span style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "var(--mute)", transform: "translateY(-0.5px)", display: "block" }} />
                    <span style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "var(--mute)", transform: "translateX(-0.5px)", display: "block" }} />
                  </span>
                </summary>
                <div style={{ marginTop: 16, color: "var(--mute)", fontSize: 15, lineHeight: 1.65, maxWidth: "68ch" }}>{a}</div>
              </details>
            ))}
          </div>
        </div>

        {/* Pricing CTA */}
        <div className="mkt-mind-outer">
          <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--mute)", margin: "0 0 44px" }}>Cohort One · Opening June 1st</p>
          <div className="mkt-pricing-cta-grid">
            <h2 style={{ fontSize: "clamp(34px, 4.2vw, 58px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.08, margin: 0 }}>
              The Founding Cohort —<br /><em style={{ fontStyle: "italic", color: "var(--mute)" }}>limited to 25.</em>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 28, alignItems: "flex-start" }}>
              <p style={{ fontSize: 16, color: "var(--mute)", lineHeight: 1.65, maxWidth: "44ch", margin: 0 }}>The first 25 accepted founders receive founding-rate pricing on the Build plan in exchange for a case study. Applications are open now.</p>
              <Link href="/waitlist" className="btn-primary">Join the waitlist →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
