export default function LegalPage() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<div class="legal-soon">
    <div class="mono section-label" style="display:flex;justify-content:center;margin-bottom:32px;">Legal</div>

    <h1>Dropping<br /><em>June 1st.</em></h1>

    <p class="sub">
      Our legal documents are being finalized ahead of Cohort One.
      <strong>Everything publishes the day applications open.</strong>
    </p>

    <div class="docs-list">
      <div class="doc-row">
        <span>Terms of Service</span>
        <span class="doc-badge">June 1st</span>
      </div>
      <div class="doc-row">
        <span>Privacy Statement</span>
        <span class="doc-badge">June 1st</span>
      </div>
      <div class="doc-row">
        <span>Disclosures</span>
        <span class="doc-badge">June 1st</span>
      </div>
      <div class="doc-row">
        <span>Cloud Service Agreement</span>
        <span class="doc-badge">June 1st</span>
      </div>
    </div>

    <a href="waitlist.html" class="btn-primary" style="font-size: 15px; padding: 14px 28px;">
      Reserve your spot →
    </a>

    <p class="legal-note">Questions? Reach us via the waitlist form.</p>
  </div>

  <footer>
    <div class="foot-inner wrap">
      <span class="mono">© 2026 Astra Technologies Inc.</span>
      <div style="display:flex;gap:24px;">
        <a href="terms.html" class="mono" style="color:var(--mute)">Terms</a>
        <a href="privacy.html" class="mono" style="color:var(--mute)">Privacy</a>
        <a href="mailto:hello@astracreates.com" class="mono" style="color:var(--mute)">hello@astracreates.com</a>
      </div>
    </div>
  </footer>`,
      }}
    />
  );
}
