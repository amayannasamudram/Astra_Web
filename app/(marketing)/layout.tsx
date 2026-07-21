import type { Metadata } from "next";
import Link from "next/link";
import "./marketing.css";
import { MarketingNav } from "./nav";

export const metadata: Metadata = {
  title: "Astra — The AI Operating System for Founders",
  description:
    "Turn a business objective into an executable system with coordinated agents, durable company context, approvals, artifacts, and inspectable runs.",
};

function MarketingFooter() {
  return (
    <footer className="mkt-footer">
      <div className="mkt-foot-inner">
        <span className="mono">© 2026 Astra Technologies Inc.</span>
        <div style={{ display: "flex", gap: 24 }}>
          <Link href="/terms" className="mono" style={{ color: "var(--text-3)" }}>Terms</Link>
          <Link href="/privacy" className="mono" style={{ color: "var(--text-3)" }}>Privacy</Link>
          <a href="mailto:hello@astracreates.com" className="mono" style={{ color: "var(--text-3)" }}>hello@astracreates.com</a>
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
