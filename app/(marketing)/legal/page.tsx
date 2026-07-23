export default function LegalPage() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<div class="legal-soon">
    <div class="mono section-label" style="display:flex;justify-content:center;margin-bottom:32px;">Legal</div>

    <h1>Legal<br /><em>center.</em></h1>

    <p class="sub">
      Review Astra's public terms, privacy statement, disclosures, and service agreement information.
      <strong>Questions can be sent directly to our team.</strong>
    </p>

    <div class="docs-list">
      <div class="doc-row">
        <span>Terms of Service</span>
        <a class="doc-badge" href="/terms">Open</a>
      </div>
      <div class="doc-row">
        <span>Privacy Statement</span>
        <a class="doc-badge" href="/privacy">Open</a>
      </div>
      <div class="doc-row">
        <span>Disclosures</span>
        <a class="doc-badge" href="/disclosures">Open</a>
      </div>
      <div class="doc-row">
        <span>Cloud Service Agreement</span>
        <a class="doc-badge" href="/cloud-service-agreement">Open</a>
      </div>
    </div>

    <a href="/contact" class="btn-primary" style="font-size: 15px; padding: 14px 28px;">
      Contact Astra →
    </a>

    <p class="legal-note">Questions? Email <a href="mailto:hello@astracreates.com" style="color:var(--accent);">hello@astracreates.com</a>.</p>
  </div>

  <footer>
    <div class="foot-inner wrap">
      <span class="mono">© 2026 Astra Technologies Inc.</span>
      <div style="display:flex;gap:24px;">
        <a href="/terms" class="mono" style="color:var(--mute)">Terms</a>
        <a href="/privacy" class="mono" style="color:var(--mute)">Privacy</a>
        <a href="mailto:hello@astracreates.com" class="mono" style="color:var(--mute)">hello@astracreates.com</a>
      </div>
    </div>
  </footer>`,
      }}
    />
  );
}
