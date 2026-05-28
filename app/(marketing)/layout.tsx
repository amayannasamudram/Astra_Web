import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Astra — Your AI Founding Team",
  description:
    "Entity formation, market research, landing page, legal docs, and first customers — handled by eight specialized agents while you sleep.",
};

function MarketingNav() {
  return (
    <nav className="mkt-nav">
      <div className="mkt-nav-inner">
        <Link href="/" className="mkt-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand_assets/favicon.png"
            alt="Astra"
            style={{ height: 26, width: "auto", mixBlendMode: "multiply" }}
          />
          <span>Astra</span>
        </Link>
        <div className="mkt-nav-links">
          <Link href="/" className="mkt-nav-link">Overview</Link>
          <Link href="/agents" className="mkt-nav-link">Agents</Link>
          <Link href="/pricing" className="mkt-nav-link">Pricing</Link>
          <Link href="/careers" className="mkt-nav-link">Careers</Link>
          <Link href="/waitlist" className="mkt-nav-cta">Join waitlist →</Link>
          <Link href="/dashboard" className="mkt-nav-cta" style={{ marginLeft: 8 }}>Launch app →</Link>
        </div>
      </div>
    </nav>
  );
}

function MarketingFooter() {
  return (
    <footer className="mkt-footer">
      <div className="mkt-foot-inner">
        <span className="mono">© 2026 Astra Technologies Inc.</span>
        <div style={{ display: "flex", gap: 24 }}>
          <Link href="/terms" className="mono" style={{ color: "var(--mute)" }}>Terms</Link>
          <Link href="/privacy" className="mono" style={{ color: "var(--mute)" }}>Privacy</Link>
          <a href="mailto:hello@astracreates.com" className="mono" style={{ color: "var(--mute)" }}>hello@astracreates.com</a>
        </div>
      </div>
    </footer>
  );
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="marketing-root" data-theme="light">
      <MarketingNav />
      <main>{children}</main>
      <MarketingFooter />
    </div>
  );
}
