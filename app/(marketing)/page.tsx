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
const STEPS = ["Define", "Plan", "Dispatch", "Approve", "Inspect", "Operate"];

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
    label: "00 · Define", title: "Give Astra the objective.",
    desc: "Start with the outcome in plain language. Astra creates a durable run and keeps the company context attached from the first sentence onward.",
    agent: "Founder goal · durable run",
    mock: (
      <MockCard>
        <MockHead title="New Run · Company Objective" status="Ready" />
        <div style={{ fontFamily: "var(--font-inter-tight, 'Inter Tight', system-ui, sans-serif)", fontSize: 18, lineHeight: 1.4, color: "var(--ink)" }}>
          Build a launch plan for our B2B product, validate the market, and prepare the first customer outreach sequence.
          <span style={{ display: "inline-block", width: 7, height: "1em", background: "var(--accent)", marginLeft: 3, verticalAlign: "-3px", animation: "blink 1s steps(2) infinite" }} />
        </div>
        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 9, color: "var(--mute)", letterSpacing: "0.06em" }}>
          <span>goal_8F2A · saved</span><span>⌘↵ to run</span>
        </div>
      </MockCard>
    ),
  },
  {
    label: "01 · Plan", title: "Turn the goal into a plan.",
    desc: "The planner compiles the objective into a task graph, selects the right specialist stack, and lays out the work in lanes with clear dependencies and outcomes.",
    agent: "Planner · task DAG",
    mock: (
      <MockCard>
        <MockHead title="Operating Plan · Launch Sprint" status="Compiled" live />
        <MockRow pill="LANE" pillVariant="star" main="Market evidence + decision brief" meta="Research" />
        <MockRow pill="LANE" pillVariant="star" main="Offer, positioning, and ICP" meta="Marketing" />
        <MockRow pill="LANE" pillVariant="gold" main="Customer outreach package" meta="Sales" />
        <MockRow pill="GATE" pillVariant="gold" main="Review claims before publishing" meta="approval" />
        <div style={{ borderTop: "1px solid var(--hair)", marginTop: 4, paddingTop: 10, display: "flex", gap: 9, alignItems: "center", fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10 }}>
          <span style={{ color: "var(--accent)" }}>●</span>
          <span style={{ flex: 1, color: "var(--ink)" }}>4 lanes · 12 tasks · 3 gates</span>
        </div>
      </MockCard>
    ),
  },
  {
    label: "02 · Dispatch", title: "Dispatch the specialist bench.",
    desc: "Research, legal, web, technical, finance, ops, sales, and marketing agents work in parallel with shared context, tools, and a live event stream.",
    agent: "Specialists · shared context",
    mock: (
      <MockCard>
        <MockHead title="Run Stream · Launch Sprint" status="Live" live />
        <MockRow pill="DONE" pillVariant="star" main="Research brief synthesized" meta="2m ago" />
        <MockRow pill="RUN" pillVariant="star" main="Technical stack recommendation" meta="streaming" />
        <MockRow pill="RUN" pillVariant="gold" main="ICP and outreach angles" meta="streaming" />
        <MockRow pill="WAIT" pillVariant="gold" main="Publish first campaign" meta="approval gate" />
        <MockRow pill="EVENT" main="agent_action · source captured" meta="replayable" />
      </MockCard>
    ),
  },
  {
    label: "03 · Approve", title: "Keep risky actions in your hands.",
    desc: "Deployments, emails, account actions, and production changes pause at explicit approval gates. You can steer, cancel, or resume the run without losing the trail.",
    agent: "Founder control · approval queue",
    mock: (
      <MockCard>
        <MockHead title="Approval Queue · Run goal_8F2A" status="2 Pending" live />
        <MockRow pill="EMAIL" pillVariant="gold" main="Send 48 customer invites" meta="review" />
        <MockRow pill="DEPLOY" pillVariant="gold" main="Publish staging → production" meta="review" />
        <MockRow pill="READY" pillVariant="star" main="Market brief · 11 sources" meta="verified" />
        <MockRow pill="AUDIT" main="Guardrail check passed" meta="safe" />
      </MockCard>
    ),
  },
  {
    label: "04 · Inspect", title: "Leave with artifacts, not answers.",
    desc: "Astra turns the run into briefs, files, receipts, workboards, and deployment records you can review, download, reuse, and hand to the next initiative.",
    agent: "Artifacts · receipts · replay",
    mock: (
      <MockCard>
        <MockHead title="Run Receipt · Completed" status="Verified" live />
        <MockRow pill="BRIEF" pillVariant="star" main="Market decision brief.md" meta="download" />
        <MockRow pill="PLAN" main="Execution blueprint.json" meta="12 tasks" />
        <MockRow pill="FILE" main="Outbound sequence.pptx" meta="library" />
        <MockRow pill="TRACE" pillVariant="gold" main="Completion audit" meta="passed" />
        <div style={{ marginTop: "auto", fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 9, color: "var(--mute)", letterSpacing: "0.06em" }}>all events replayable · 0 errors</div>
      </MockCard>
    ),
  },
  {
    label: "05 · Operate", title: "Keep the company operating.",
    desc: "Company context, initiatives, missions, automations, approvals, and recurring work persist after the run. Ask a follow-up and Astra routes it to the right operating thread.",
    agent: "Company OS · always on",
    mock: (
      <MockCard>
        <MockHead title="Company OS · Today" status="Current" />
        <MockRow pill="INIT" pillVariant="star" main="Launch B2B offer" meta="on track" />
        <MockRow pill="BRAIN" main="Synced 4 connected sources" meta="Slack · GitHub" />
        <MockRow pill="FLOW" pillVariant="gold" main="Lead enrichment automation" meta="running" />
        <MockRow pill="NEXT" main="Review Friday decision brief" meta="you" />
        <div style={{ marginTop: "auto", fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 9, color: "var(--mute)", letterSpacing: "0.06em" }}>state replayed from event log · healthy</div>
      </MockCard>
    ),
  },
];

/* ── Agents section data ────────────────────────────────────── */
const agents = [
  { num: "01", role: "Research", title: "Builds the evidence.", desc: "Market, regulatory, and financial research grounded in live sources, synthesized into decision briefs you can inspect and reuse.", icon: (<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="22" cy="22" r="13" /><circle cx="22" cy="22" r="6" /><path d="M22 4 L22 13 M22 31 L22 40 M4 22 L13 22 M31 22 L40 22" strokeWidth="1" /><circle cx="22" cy="22" r="1.6" fill="currentColor" stroke="none" /></svg>) },
  { num: "02", role: "Legal", title: "Makes the work reviewable.", desc: "Entity, document, and IP workflows with clear context, approval gates, and durable records for the decisions that matter.", icon: (<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="8" y="8" width="28" height="28" rx="2" /><path d="M14 16 L30 16 M14 22 L26 22 M14 28 L24 28" strokeWidth="1" /><circle cx="32" cy="32" r="3.2" fill="currentColor" stroke="none" /></svg>) },
  { num: "03", role: "Web", title: "Ships the surface.", desc: "Creates sites and web experiences from a business objective, then connects deployment records and verification back to the run.", icon: (<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="22" cy="22" r="14" /><path d="M8 22 L36 22" strokeWidth="1" /><path d="M22 8 C28 12, 28 32, 22 36 C16 32, 16 12, 22 8 Z" strokeWidth="1" /><circle cx="22" cy="22" r="2.4" fill="currentColor" stroke="none" /></svg>) },
  { num: "04", role: "Technical", title: "Builds the system.", desc: "Scaffolds applications, data, and infrastructure; coordinates technical work in a plan with dependencies, checks, and handoffs.", icon: (<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16,14 6,22 16,30" /><polyline points="28,14 38,22 28,30" /><line x1="26" y1="10" x2="18" y2="34" /></svg>) },
  { num: "05", role: "Finance", title: "Models the decisions.", desc: "Fundraise, financial modeling, and operating scenarios that turn assumptions into artifacts the team can challenge and act on.", icon: (<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="6" width="32" height="32" rx="2" /><path d="M12 29 L18 23 L23 27 L32 15" /><path d="M28 15 H32 V19" /></svg>) },
  { num: "06", role: "Ops", title: "Keeps state current.", desc: "Initiatives, squads, missions, tasks, digests, and recurring work stay durable in a company operating layer that can replay to current state.", icon: (<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="0.9"><line x1="22" y1="22" x2="9" y2="10" /><line x1="22" y1="22" x2="34" y2="9" /><line x1="22" y1="22" x2="8" y2="30" /><line x1="22" y1="22" x2="36" y2="32" /><line x1="22" y1="22" x2="22" y2="38" /><circle cx="22" cy="22" r="2.6" fill="currentColor" stroke="none" /><circle cx="9" cy="10" r="1.6" fill="currentColor" stroke="none" /><circle cx="34" cy="9" r="1.6" fill="currentColor" stroke="none" /><circle cx="8" cy="30" r="1.6" fill="currentColor" stroke="none" /><circle cx="36" cy="32" r="1.6" fill="currentColor" stroke="none" /><circle cx="22" cy="38" r="1.6" fill="currentColor" stroke="none" /></svg>) },
  { num: "07", role: "Sales", title: "Moves the pipeline.", desc: "Prospecting, enrichment, pipeline, and enablement work from the same company context, with outreach held behind the right approvals.", icon: (<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10 L37 10 L27 23 L27 35 L17 35 L17 23 Z" /><circle cx="22" cy="10" r="2.4" fill="currentColor" stroke="none" /></svg>) },
  { num: "08", role: "Marketing", title: "Creates demand.", desc: "Content, paid, SEO, and outreach packages tied to objectives, evidence, and measurable execution rather than one-off prompts.", icon: (<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M8 32 Q16 30, 22 22 T36 8" /><path d="M28 8 L36 8 L36 16" strokeLinecap="round" /><circle cx="8" cy="32" r="2.5" fill="currentColor" stroke="none" /><circle cx="22" cy="22" r="1.8" fill="currentColor" stroke="none" /></svg>) },
];

const energyLines = [
  { x1: 0, y1: -200, delay: "0.00s" }, { x1: 141, y1: -141, delay: "0.53s" },
  { x1: 200, y1: 0, delay: "1.05s" }, { x1: 141, y1: 141, delay: "1.58s" },
  { x1: 0, y1: 200, delay: "2.10s" }, { x1: -141, y1: 141, delay: "2.63s" },
  { x1: -200, y1: 0, delay: "3.15s" }, { x1: -141, y1: -141, delay: "3.68s" },
];

const agentLabels: { x: number; y: number; anchor: "middle" | "start" | "end"; dx: number; dy: number; name: string }[] = [
  { x: 0, y: -200, anchor: "middle", dx: 0, dy: -16, name: "Research" },
  { x: 141, y: -141, anchor: "start", dx: 14, dy: 5, name: "Legal" },
  { x: 200, y: 0, anchor: "start", dx: 16, dy: 5, name: "Web" },
  { x: 141, y: 141, anchor: "start", dx: 14, dy: 5, name: "Technical" },
  { x: 0, y: 200, anchor: "middle", dx: 0, dy: 22, name: "Finance" },
  { x: -141, y: 141, anchor: "end", dx: -14, dy: 5, name: "Ops" },
  { x: -200, y: 0, anchor: "end", dx: -16, dy: 5, name: "Sales" },
  { x: -141, y: -141, anchor: "end", dx: -14, dy: 5, name: "Marketing" },
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
          <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mute)", margin: "0 0 28px" }}>The AI operating system for founders</p>
          <h1 aria-label="Turn a business objective into an executable system." style={{ fontSize: "clamp(54px, 6.8vw, 92px)", lineHeight: 1.02, letterSpacing: "-0.035em", fontWeight: 400, margin: "0 0 32px" }}>
            Turn an objective<br />
            into an <span style={{ color: "var(--accent)" }}>executable system.</span>
          </h1>
          <p style={{ maxWidth: "52ch", fontSize: "clamp(16px, 1.4vw, 19px)", color: "var(--mute)", lineHeight: 1.65, margin: "0 0 40px" }}>
            Astra plans the work, dispatches specialist agents, streams progress live, produces artifacts, and keeps your company operating layer durable and inspectable.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/waitlist" className="btn-primary">Start with a goal →</Link>
            <Link href="/#agents" className="btn-secondary">Explore the stack</Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="wrap">
          <div className="mkt-hiw-intro">
            <div>
              <p className="mono section-label">The operating run</p>
              <h2 style={{ fontSize: "clamp(32px, 3.8vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 400, margin: "12px 0 0" }}>One objective.<br />A durable run.</h2>
            </div>
            <p style={{ color: "var(--mute)", fontSize: 16, lineHeight: 1.65, maxWidth: "48ch", margin: 0 }}>
              Give Astra a business objective in plain English. It compiles the work into a plan, coordinates the right agents, and records the outcome as an operating asset your company can build on.
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
              Why stop at an answer<br />when the work still needs doing?
            </h2>
          </div>
          <div className="mkt-math-grid">
            <div style={{ padding: "44px 52px", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
              <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--mute)", marginBottom: 18 }}>A one-off chatbot</p>
              <p style={{ fontSize: "clamp(44px, 5vw, 72px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1, margin: 0, color: "var(--mute)", textDecoration: "line-through", textDecorationColor: "var(--hair-2)" }}>An answer</p>
              <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mute)", margin: "8px 0 28px" }}>and then a blank page</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--hair)", paddingTop: 22, display: "flex", flexDirection: "column", gap: 10 }}>
                {["No durable run or replay", "No shared company context", "No approval boundaries", "No specialist handoffs", "No artifact trail", "No operating state after the chat"].map((item) => (
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
              <p style={{ fontSize: "clamp(44px, 5vw, 72px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1, margin: 0, color: "var(--accent)" }}>A system</p>
              <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mute)", margin: "8px 0 28px" }}>that keeps executing</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--hair)", paddingTop: 22, display: "flex", flexDirection: "column", gap: 10 }}>
                {["Goal-to-run orchestration", "Specialist stacks in parallel", "Company Brain + durable context", "Approvals for risky actions", "Artifacts, receipts, and replays", "Automations that keep running"].map((item) => (
                  <li key={item} style={{ fontSize: 14, color: "var(--mute)", display: "flex", alignItems: "center", gap: 10, lineHeight: 1.4 }}>
                    <span style={{ width: 4, height: 4, flexShrink: 0, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 40, marginTop: 36, paddingTop: 28, borderTop: "1px solid var(--hair)" }}>
            <p style={{ fontSize: 15, color: "var(--mute)", lineHeight: 1.6, maxWidth: "52ch", margin: 0 }}>Astra is built for founders, startup teams, and operator-heavy businesses that need the work to stay coordinated after the prompt ends.</p>
            <Link href="/#agents" className="btn-secondary" style={{ flexShrink: 0 }}>See the platform →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "120px 0" }}>
        <div className="wrap">
          <p className="mono section-label" style={{ marginBottom: 44 }}>The next operating layer</p>
          <div className="mkt-cta-grid">
            <h2 style={{ fontSize: "clamp(34px, 4.2vw, 58px)", letterSpacing: "-0.03em", fontWeight: 400, lineHeight: 1.08, margin: 0 }}>
              Make the next objective<br /><em style={{ fontStyle: "italic", color: "var(--mute)" }}>executable.</em>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 28, alignItems: "flex-start" }}>
              <p style={{ fontSize: 16, color: "var(--mute)", lineHeight: 1.65, maxWidth: "44ch", margin: 0 }}>From research missions to deployment checks, Astra turns company objectives into coordinated work with clear evidence, approvals, and durable outcomes.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/waitlist" className="btn-primary">Start with a goal →</Link>
                <Link href="/#agents" className="btn-secondary">Explore the stack</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AGENTS */}
      <section id="agents" style={{ borderTop: "1px solid var(--hair)" }}>
        <div style={{ padding: "140px 0 80px", borderBottom: "1px solid var(--hair)" }}>
          <div className="wrap">
            <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mute)", margin: "0 0 28px" }}>The specialist bench</p>
            <h2 style={{ fontSize: "clamp(52px, 7.5vw, 104px)", lineHeight: 1.02, letterSpacing: "-0.03em", fontWeight: 400, margin: "0 0 28px" }}>
              Many specialists.<br /><span style={{ color: "var(--mute)" }}>One operating </span><span style={{ color: "var(--accent)" }}>system.</span>
            </h2>
            <p style={{ maxWidth: "54ch", fontSize: "clamp(16px, 1.4vw, 19px)", color: "var(--mute)", lineHeight: 1.65 }}>
              Astra routes work across dedicated research, legal, web, technical, finance, ops, sales, and marketing surfaces. They share context, produce artifacts, and coordinate through the same durable run.
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
              <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--mute)", margin: "0 0 20px" }}>Company Brain + Company OS</p>
              <h2 style={{ fontSize: "clamp(36px, 4.2vw, 56px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.08, margin: "0 0 24px" }}>
                Not loose prompts.<br /><em style={{ color: "var(--mute)", fontStyle: "italic" }}>A durable company layer.</em>
              </h2>
              <p style={{ color: "var(--mute)", fontSize: 15, lineHeight: 1.7, maxWidth: "52ch", margin: "0 0 14px" }}>Company Brain syncs connected sources such as Slack, GitHub, Notion, Google Workspace, and more into a knowledge layer agents can query. Company OS keeps initiatives, squads, missions, tasks, and artifacts durable as an append-only event log.</p>
              <p style={{ color: "var(--mute)", fontSize: 15, lineHeight: 1.7, maxWidth: "52ch", margin: 0 }}>The result is a company context that stays inspectable, replayable, and useful across every run — not trapped in a single conversation.</p>
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
              Two paths.<br /><span style={{ color: "var(--mute)" }}>One operating </span><span style={{ color: "var(--accent)" }}>layer.</span>
            </h2>
            <p style={{ maxWidth: "56ch", fontSize: "clamp(16px, 1.4vw, 19px)", color: "var(--mute)", lineHeight: 1.65 }}>
              Whether you&apos;re turning an idea into a company or already running one — Astra gives your team a durable way to plan, execute, and inspect the work. Both paths include the same company operating layer and specialist bench.
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
            { key: "build", tag: "Build", name: "Build", featured: false, amt: buildAmt, features: ["Goal-to-run orchestration", "Specialist agents in parallel", "Company OS with durable state", "Artifacts and reusable files", "Approval gates for risky actions", "Visual automations and integrations", "20 credits per month included", "Live run and event history"] },
            { key: "scale", tag: "Most popular", name: "Scale", featured: true, amt: scaleAmt, features: ["50 credits per month included", "Priority agent processing", "Company Brain connected sources", "Execution blueprints and verification", "Persistent mission and initiative context", "Deployment and completion receipts", "Faster Computer Use queues", "Early access to new platform surfaces"] },
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
                {tier.key === "build" ? "The operating layer, always on" : "Everything in Build, plus"}
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
              { q: "What does Astra do?", a: "You give Astra a business objective. It creates a durable run, plans the work, dispatches specialist agents, streams progress live, produces artifacts, and records the outcome so the company can keep operating from it." },
              { q: "Is Astra more than a chatbot?", a: "Yes. Astra coordinates work across specialist agents, preserves durable company context, and ties outputs to inspectable runs with events, workboards, receipts, and completion audits." },
              { q: "How are risky actions handled?", a: "Deployments, emails, account actions, and production changes can pause behind explicit approval gates. Founders can review, approve, steer, cancel, or resume work without losing the event trail." },
              { q: "What is Company Brain?", a: "Company Brain is Astra's knowledge layer. It can sync connected sources such as Slack, Discord, GitHub, Notion, Google Workspace, and more, then provide that context to the right agents and runs." },
              { q: "What does Astra produce?", a: "Astra produces decision briefs, execution plans, files, PDFs, decks, deployment records, workboards, receipts, and other reusable artifacts. Outputs stay in your workspace history and Library." },
              { q: "Can I automate recurring work?", a: "Yes. The visual automation builder connects triggers, agents, actions, conditions, delays, webhooks, and integrations. Flows run through a server-side integration registry and can be reviewed as durable runs." },
              { q: "How does billing work?", a: "Astra supports plan-based limits, token-to-credit accounting, checkout, and billing webhooks. Build and Scale are month-to-month; annual billing is available with the displayed savings." },
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
          <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--mute)", margin: "0 0 44px" }}>Build with a durable operating layer</p>
          <div className="mkt-pricing-cta-grid">
            <h2 style={{ fontSize: "clamp(34px, 4.2vw, 58px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.08, margin: 0 }}>
              Start with one objective —<br /><em style={{ fontStyle: "italic", color: "var(--mute)" }}>keep the outcome.</em>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 28, alignItems: "flex-start" }}>
              <p style={{ fontSize: 16, color: "var(--mute)", lineHeight: 1.65, maxWidth: "44ch", margin: 0 }}>Give Astra a business objective and get a coordinated run with evidence, artifacts, approvals, and a company context that is ready for what comes next.</p>
              <Link href="/waitlist" className="btn-primary">Start with a goal →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
