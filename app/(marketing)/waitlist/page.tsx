"use client";

import { useState, useEffect } from "react";

export default function WaitlistPage() {
  const [stage, setStage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ticketNum, setTicketNum] = useState("#0067");
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", idea: "" });

  useEffect(() => {
    const target = new Date("2026-06-01T00:00:00");
    function check() {
      if (new Date() >= target) setUnlocked(true);
    }
    check();
    const id = setInterval(check, 1000);
    return () => clearInterval(id);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.idea) return;
    setSubmitting(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("idea", form.idea);
      fd.append("stage", stage);
      const res = await fetch("https://formspree.io/f/xwvzrqad", { method: "POST", headers: { Accept: "application/json" }, body: fd });
      if (!res.ok) throw new Error("server");
      setTicketNum("#00" + (67 + Math.floor(Math.random() * 4)));
      setSubmitted(true);
    } catch {
      setError("Something went wrong — please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", minHeight: "100vh", padding: "140px 32px 80px", display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 90, alignItems: "start" }}>
      {/* Left */}
      <div>
        <div className="mono section-label" style={{ marginBottom: 28 }}>Cohort One · Opening June 1st</div>
        <h1 style={{ fontSize: "clamp(56px, 7.5vw, 110px)", lineHeight: 0.98, marginBottom: 28, letterSpacing: "-0.02em", fontWeight: 400 }}>
          Bring an idea.<br />Get a <span style={{ color: "var(--accent)" }}>company.</span>
        </h1>
        <p style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.55, marginBottom: 12, maxWidth: "50ch", color: "var(--ink-2)" }}>
          The first 25 accepted founders receive founding-rate pricing on the Build plan in exchange for a case study.
        </p>
        <p style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.55, maxWidth: "50ch", color: "var(--mute)" }}>
          Cohort One launches June 1st. Accepted founders ship within seventy-two hours of kickoff.
        </p>
        <div style={{ marginTop: 56, padding: "32px 0", borderTop: "1px solid var(--hair)", borderBottom: "1px solid var(--hair)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div>
            <div style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--mute)", marginBottom: 12 }}>Seats remaining</div>
            <div style={{ fontFamily: "var(--font-inter-tight, 'Inter Tight', system-ui, sans-serif)", fontSize: 52, lineHeight: 1, letterSpacing: "-0.02em", display: "flex", alignItems: "baseline", gap: 6 }}>
              25<span style={{ color: "var(--mute)", fontSize: "0.4em", letterSpacing: 0 }}>/ 25</span>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--mute)", marginBottom: 12 }}>Status</div>
            <div style={{ fontFamily: "var(--font-inter-tight, 'Inter Tight', system-ui, sans-serif)", fontSize: 52, lineHeight: 1, letterSpacing: "-0.02em", color: "var(--accent)", display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: "0.4em", marginRight: 8, animation: "waitlistPulse 1.6s ease-in-out infinite" }}>●</span>
              Coming Soon
            </div>
          </div>
        </div>
        <div style={{ marginTop: 24, height: 1, background: "var(--hair)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "67%", background: "linear-gradient(to right, transparent, var(--accent) 50%, transparent)", animation: "waitlistScan 3s ease-in-out infinite" }} />
          <div style={{ height: "100%", width: "32%", background: "linear-gradient(to right, var(--hair-2), var(--accent))" }} />
        </div>
      </div>

      {/* Right — form card */}
      <div style={{ position: "relative", padding: "48px 44px", borderRadius: 20, background: "var(--bg)", border: "1px solid var(--hair)", boxShadow: "0 4px 32px rgba(0,0,0,0.07)", overflow: "hidden" }}>
        {!submitted ? (
          <>
            <div style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 10px var(--accent)", animation: "waitlistPulse 1.6s ease-in-out infinite", display: "inline-block" }} />
              {unlocked ? "Application · 4 fields" : "Application · Opens June 1st"}
            </div>
            <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", lineHeight: 1.05, marginBottom: 12 }}>
              {unlocked ? <>Type the idea.<br /><em style={{ color: "var(--mute)", fontStyle: "italic" }}>We&apos;ll take it from there.</em></> : <>Applications open<br /><em style={{ color: "var(--mute)", fontStyle: "italic" }}>June 1st.</em></>}
            </h2>
            <p style={{ color: "var(--mute)", fontSize: 15, lineHeight: 1.5, marginBottom: 36 }}>
              {unlocked ? "No business plan, no pitch deck. A few sentences in plain English is all we need to dispatch the agents." : "Drop your idea below — we'll unlock submissions the moment the countdown hits zero."}
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[{ id: "name", label: "Name", type: "text", placeholder: "Vera Aldana" }, { id: "email", label: "Email", type: "email", placeholder: "vera@studio.com" }].map((f) => (
                  <div key={f.id} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <label style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--mute)" }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} value={form[f.id as "name" | "email"]} onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                      style={{ width: "100%", background: "rgba(0,0,0,0.04)", border: "1px solid var(--hair-2)", color: "var(--ink)", padding: "14px 16px", borderRadius: 10, fontFamily: "var(--font-inter-tight, 'Inter Tight', system-ui, sans-serif)", fontSize: 15, outline: "none" }} />
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--mute)" }}>The idea <em style={{ fontStyle: "italic", letterSpacing: "0.04em", textTransform: "none" }}>— two or three sentences</em></label>
                <textarea placeholder="A tool that helps independent musicians find collaborators in their city — by sound, not just by genre." value={form.idea} onChange={(e) => setForm({ ...form, idea: e.target.value })}
                  style={{ width: "100%", background: "rgba(0,0,0,0.04)", border: "1px solid var(--hair-2)", color: "var(--ink)", padding: "14px 16px", borderRadius: 10, fontFamily: "var(--font-inter-tight, 'Inter Tight', system-ui, sans-serif)", fontSize: 15, outline: "none", resize: "vertical", minHeight: 120, lineHeight: 1.5 }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--mute)" }}>Where are you in the journey?</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {[{ val: "thinking", label: "Just thinking" }, { val: "weekend", label: "Tinkering weekends" }, { val: "building", label: "Building, no entity" }, { val: "incorporated", label: "Already incorporated" }].map((c) => (
                    <button key={c.val} type="button" onClick={() => setStage(c.val)}
                      style={{ padding: "8px 14px", borderRadius: 999, border: "1px solid var(--hair-2)", background: stage === c.val ? "var(--ink)" : "transparent", fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: stage === c.val ? "#fff" : "var(--mute)", cursor: "pointer", transition: "all 0.2s" }}>
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
              {error && <p style={{ color: "oklch(0.65 0.18 20)", fontSize: 14 }}>{error}</p>}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 8, justifyContent: "space-between" }}>
                <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.06em", color: "var(--mute)", maxWidth: "26ch", lineHeight: 1.4 }}>By applying you agree to occasional emails about the cohort. We never share your idea.</p>
                <button type="submit" disabled={!unlocked || submitting}
                  style={{ padding: "14px 24px", fontSize: 14, background: "var(--accent)", color: "#fff", border: "1px solid var(--accent)", borderRadius: 999, fontWeight: 500, cursor: unlocked ? "pointer" : "not-allowed", opacity: unlocked ? 1 : 0.45, transition: "opacity 0.15s" }}>
                  {submitting ? "Sending…" : unlocked ? "Apply →" : "Opens June 1st"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div style={{ padding: "36px 0", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, margin: "0 auto 20px", borderRadius: "50%", background: "radial-gradient(circle at 30% 30%, #fff, var(--accent) 60%, transparent 90%)", boxShadow: "0 0 30px var(--accent), 0 0 80px rgba(33,97,255,0.5)" }} />
            <h3 style={{ fontSize: 36, marginBottom: 12 }}>You&apos;re on the list.</h3>
            <p style={{ color: "var(--mute)", fontSize: 15 }}>Astra received your application. Watch your inbox for the cohort invite — they go out Mondays at 09:00 UTC.</p>
            <div style={{ marginTop: 24, display: "inline-flex", gap: 10, padding: "10px 16px", borderRadius: 999, background: "rgba(246,246,248,0.04)", border: "1px solid var(--hair-2)", fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink)" }}>
              <span>Ticket</span>
              <span style={{ color: "var(--accent)" }}>{ticketNum}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
