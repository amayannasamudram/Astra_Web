import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Astra",
  description: "Contact Astra for product, privacy, partnership, and support questions.",
};

export default function ContactPage() {
  return (
    <section className="section contact-section">
      <div className="wrap contact-grid">
        <div>
          <div className="mono section-label">Contact</div>
          <h1 style={{ fontSize: "clamp(48px, 8vw, 112px)", lineHeight: 0.92, maxWidth: 760 }}>
            Talk to the team building Astra.
          </h1>
        </div>
        <div className="contact-card">
          <p className="contact-kicker">General inquiries</p>
          <a href="mailto:hello@astracreates.com" className="contact-email">
            hello@astracreates.com
          </a>
          <p className="contact-copy">
            Use this address for product questions, partnerships, privacy requests,
            terms questions, and anything related to the Astra website or platform.
          </p>
          <div className="contact-divider" />
          <p className="contact-copy">
            If you are joining the founder waitlist, include your company idea,
            current stage, and the best way to reach you.
          </p>
        </div>
      </div>
    </section>
  );
}
