"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

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

export default function PricingPage() {
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

  return (
    <>
      <section style={{ minHeight: "100vh", padding: "140px 0 80px", borderBottom: "1px solid var(--hair)" }}>
        <div className="wrap">
          <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mute)", margin: "0 0 28px" }}>Pricing</p>
          <h1 style={{ fontSize: "clamp(52px, 7.5vw, 104px)", lineHeight: 1.02, letterSpacing: "-0.03em", fontWeight: 400, margin: "0 0 28px" }}>
            Two paths.<br /><span style={{ color: "var(--mute)" }}>One team </span><span style={{ color: "var(--accent)" }}>behind you.</span>
          </h1>
          <p style={{ maxWidth: "56ch", fontSize: "clamp(16px, 1.4vw, 19px)", color: "var(--mute)", lineHeight: 1.65 }}>
            Whether you&apos;re turning an idea into a company or already running one — Astra has a plan sized for where you are. Both paths include the same eight agents, working around the clock.
          </p>
        </div>
      </section>

      {/* Controls */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "52px 48px 0", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
        <div style={{ display: "inline-flex", padding: 3, borderRadius: 12, background: "var(--bg)", border: "1px solid var(--hair)", gap: 2 }}>
          {(["startup", "business"] as const).map((a) => (
            <button
              key={a}
              onClick={() => switchAudience(a)}
              style={{
                padding: "10px 22px", border: `1px solid ${audience === a ? "var(--hair)" : "transparent"}`,
                background: audience === a ? "#fff" : "transparent",
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
          <div ref={indicatorRef} style={{ position: "absolute", top: 3, left: 3, height: "calc(100% - 6px)", borderRadius: 999, background: "var(--ink)", transition: "transform 0.3s cubic-bezier(.4,0,.2,1), width 0.3s cubic-bezier(.4,0,.2,1)", zIndex: 1 }} />
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
      <div style={{ maxWidth: 1280, margin: "28px auto 0", padding: "20px 48px", borderTop: "1px solid var(--hair)", borderBottom: "1px solid var(--hair)", display: "flex", alignItems: "center", gap: 32 }}>
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
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 48px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {[
          { key: "build", tag: "Build", name: "Build", featured: false, amt: buildAmt, features: ["All eight agents active 24 / 7", "Features on demand via credits", "Marketing campaigns running autonomously", "Weekly ops digest", "Ongoing legal compliance monitoring", "Website iterations from plain English", "20 credits per month included", "Agent chat interface"] },
          { key: "scale", tag: "Most popular", name: "Scale", featured: true, amt: scaleAmt, features: ["50 credits per month included", "Priority agent processing", "Dedicated persistent memory", "Investor deck generation", "Pitch preparation assistance", "Term-sheet review", "Faster Computer Use queues", "Early access to new agents"] },
        ].map((tier) => (
          <div key={tier.key} style={{ padding: "40px 36px 36px", borderRadius: 4, background: "#fff", border: `1px solid ${tier.featured ? "var(--hair-2)" : "var(--hair)"}`, display: "flex", flexDirection: "column", boxShadow: tier.featured ? "0 2px 24px rgba(0,0,0,0.06)" : undefined }}>
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
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 48px", borderTop: "1px solid var(--hair)" }}>
        <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--mute)", margin: "0 0 22px" }}>The math, once more</p>
        <p style={{ fontSize: "clamp(22px, 3vw, 40px)", fontWeight: 400, lineHeight: 1.4, letterSpacing: "-0.015em", color: "var(--ink)" }}>
          Specialists for one month: <span style={{ color: "var(--mute)", textDecoration: "line-through", textDecorationColor: "var(--hair-2)", fontStyle: "italic" }}>$7,300</span>.<br />
          Astra for a new founder: <span style={{ color: "var(--accent)" }}>from $40/mo</span>.<br />
          Astra for a business owner: <span style={{ color: "var(--accent)" }}>from $35/mo</span>.
        </p>
      </div>

      {/* FAQ */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px 80px", borderTop: "1px solid var(--hair)" }}>
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
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 48px", borderTop: "1px solid var(--hair)" }}>
        <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--mute)", margin: "0 0 44px" }}>Cohort One · Opening June 1st</p>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end" }}>
          <h2 style={{ fontSize: "clamp(34px, 4.2vw, 58px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.08, margin: 0 }}>
            The Founding Cohort —<br /><em style={{ fontStyle: "italic", color: "var(--mute)" }}>limited to 25.</em>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 28, alignItems: "flex-start" }}>
            <p style={{ fontSize: 16, color: "var(--mute)", lineHeight: 1.65, maxWidth: "44ch", margin: 0 }}>The first 25 accepted founders receive founding-rate pricing on the Build plan in exchange for a case study. Applications are open now.</p>
            <Link href="/waitlist" className="btn-primary">Join the waitlist →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
