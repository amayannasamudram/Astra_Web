"use client";

import Link from "next/link";

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

export default function AgentsPage() {
  return (
    <>
      <section style={{ minHeight: "100vh", padding: "140px 0 80px", borderBottom: "1px solid var(--hair)" }}>
        <div className="wrap">
          <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mute)", margin: "0 0 28px" }}>The stack</p>
          <h1 style={{ fontSize: "clamp(52px, 7.5vw, 104px)", lineHeight: 1.02, letterSpacing: "-0.03em", fontWeight: 400, margin: "0 0 28px" }}>
            Eight specialists.<br /><span style={{ color: "var(--mute)" }}>One shared </span><span style={{ color: "var(--accent)" }}>mind.</span>
          </h1>
          <p style={{ maxWidth: "54ch", fontSize: "clamp(16px, 1.4vw, 19px)", color: "var(--mute)", lineHeight: 1.65 }}>
            Each agent owns its domain completely. Each one builds on what the others produce through a shared memory store. Together, they form a founding team that operates around the clock.
          </p>
        </div>
      </section>

      {/* Agent grid */}
      <section style={{ padding: "80px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "var(--hair)", border: "1px solid var(--hair)" }}>
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
      </section>

      {/* Shared mind */}
      <section style={{ padding: "100px 48px", borderTop: "1px solid var(--hair)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 100, alignItems: "center" }}>
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
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 48px", borderTop: "1px solid var(--hair)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--mute)", margin: "0 0 44px" }}>Ready</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end" }}>
            <h2 style={{ fontSize: "clamp(34px, 4.2vw, 58px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.08, margin: 0 }}>
              Type the idea.<br /><em style={{ fontStyle: "italic", color: "var(--mute)" }}>We&apos;ll handle everything else.</em>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 28, alignItems: "flex-start" }}>
              <p style={{ fontSize: 16, color: "var(--mute)", lineHeight: 1.65, maxWidth: "44ch", margin: 0 }}>The first cohort opens June 1st — 25 spots, founding-rate pricing, and your company live within 72 hours.</p>
              <div style={{ display: "flex", gap: 12 }}>
                <Link href="/waitlist" className="btn-primary">Join the waitlist →</Link>
                <Link href="/pricing" className="btn-secondary">See pricing</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
