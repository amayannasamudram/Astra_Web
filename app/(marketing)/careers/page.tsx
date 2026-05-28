import Link from "next/link";

export default function CareersPage() {
  return (
    <>
      <section style={{ minHeight: "100vh", padding: "140px 0 80px", borderBottom: "1px solid var(--hair)" }}>
        <div className="wrap">
          <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mute)", margin: "0 0 28px" }}>Careers at Astra</p>
          <h1 style={{ fontSize: "clamp(52px, 7.5vw, 104px)", lineHeight: 1.02, letterSpacing: "-0.03em", fontWeight: 400 }}>
            Why are you<br /><span style={{ color: "var(--mute)" }}>looking for a job?</span>
          </h1>
        </div>
      </section>

      <section style={{ padding: "80px 0 100px" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 100, alignItems: "start" }}>
            <div>
              <p style={{ fontSize: "clamp(16px, 1.4vw, 18px)", color: "var(--mute)", lineHeight: 1.7, maxWidth: "48ch", margin: "0 0 40px" }}>
                Seriously. You found us — which means you have the drive to build something.{" "}
                <strong style={{ color: "var(--ink)", fontWeight: 500 }}>That&apos;s exactly the kind of person Astra was made for.</strong>
              </p>
              <p style={{ fontSize: "clamp(16px, 1.4vw, 18px)", color: "var(--mute)", lineHeight: 1.7, maxWidth: "48ch", margin: "-20px 0 40px" }}>
                Instead of sending a résumé somewhere, why not send your idea here? We&apos;ll spin up a full founding team around it — legal, design, engineering, marketing — and have you live within 72 hours. No co-founder needed. No runway required. Just the idea you&apos;ve been sitting on.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
                <Link href="/waitlist" className="btn-primary">Reserve your spot →</Link>
                <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mute)" }}>Applications open June 1st · 25 founding spots</p>
              </div>
            </div>
            <div style={{ padding: "52px 48px", border: "1px solid var(--hair)", borderRadius: 4, background: "#fff" }}>
              <p style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--mute)", margin: "0 0 24px" }}>The better move</p>
              <h2 style={{ fontSize: "clamp(36px, 4.5vw, 64px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05, margin: "0 0 16px" }}>
                Just build<br /><em style={{ color: "var(--accent)", fontStyle: "italic" }}>with Astra.</em>
              </h2>
              <p style={{ color: "var(--mute)", fontSize: 15, lineHeight: 1.65, maxWidth: "44ch", margin: "0 0 32px" }}>Eight specialists. One shared memory. Your idea, live within 72 hours. The same quality of founding team that costs $7,300 a month — starting from $40.</p>
              <Link href="/pricing" className="btn-secondary">See pricing →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
