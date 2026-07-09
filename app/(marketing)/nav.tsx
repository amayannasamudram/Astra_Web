"use client";

import { useState } from "react";
import Link from "next/link";

export function MarketingNav() {
  const [open, setOpen] = useState(false);

  function close() { setOpen(false); }

  return (
    <>
      <nav className="mkt-nav">
        <div className="mkt-nav-inner">
          <Link href="/" className="mkt-brand" onClick={close}>
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
            <a href="/#agents" className="mkt-nav-link">Agents</a>
            <a href="/#pricing" className="mkt-nav-link">Pricing</a>
            <Link href="/careers" className="mkt-nav-link">Careers</Link>
            <Link href="/waitlist" className="mkt-nav-cta">Join waitlist →</Link>
            <a
              href="https://app.astracreates.com"
              className="mkt-nav-cta"
              style={{ marginLeft: 8 }}
            >
              Open app →
            </a>
          </div>
          <button
            className="mkt-hamburger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <line x1="3" y1="6" x2="17" y2="6" />
                <line x1="3" y1="10" x2="17" y2="10" />
                <line x1="3" y1="14" x2="17" y2="14" />
              </svg>
            )}
          </button>
        </div>
      </nav>
      <div className={`mkt-mobile-menu${open ? " open" : ""}`} aria-hidden={!open}>
        <Link href="/" className="mkt-mobile-link" onClick={close}>Overview</Link>
        <a href="/#agents" className="mkt-mobile-link" onClick={close}>Agents</a>
        <a href="/#pricing" className="mkt-mobile-link" onClick={close}>Pricing</a>
        <Link href="/careers" className="mkt-mobile-link" onClick={close}>Careers</Link>
        <div style={{ height: 16 }} />
        <Link href="/waitlist" className="btn-primary" onClick={close} style={{ justifyContent: "center" }}>
          Join waitlist →
        </Link>
        <a
          href="https://app.astracreates.com"
          className="btn-secondary"
          onClick={close}
          style={{ marginTop: 10, justifyContent: "center" }}
        >
          Open app →
        </a>
      </div>
    </>
  );
}
