import PageShell from "../../components/layout/PageShell";
import Section from "../../components/ui/Section";
import Kicker from "../../components/ui/Kicker";
import ContactClient from "./ContactClient";

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Start a considered website commission."
      subtitle="Share your goals, timeline, and investment range. We will return with a clear direction and next step."
    >
      <Section>
        <div className="contact-premium-layout">
          <aside className="contact-premium-info">
            <Kicker>Before you apply</Kicker>
            <h2 className="section-title">Concierge intake for design-led commissions.</h2>
            <p className="contact-premium-lead">
              We keep intake intentionally focused so each project receives senior-level attention from strategy through
              launch.
            </p>

            <article className="contact-content-block">
              <p className="contact-trust-label">How we work</p>
              <ol className="contact-mini-timeline">
                <li>
                  <p className="contact-mini-step-title">1. Brief review</p>
                  <p className="contact-mini-step-copy">We assess plan fit, goals, and priorities against current scope.</p>
                </li>
                <li>
                  <p className="contact-mini-step-title">2. Strategic response</p>
                  <p className="contact-mini-step-copy">You receive a clear recommendation and practical delivery pathway.</p>
                </li>
                <li>
                  <p className="contact-mini-step-title">3. Structured kickoff</p>
                  <p className="contact-mini-step-copy">Once aligned, we start discovery with a focused production timeline.</p>
                </li>
              </ol>
            </article>

            <article className="contact-content-block">
              <p className="contact-trust-label">What happens next</p>
              <ul className="contact-next-list">
                <li>
                  <span className="contact-next-key">Review window</span>
                  <p className="contact-mini-step-copy">Every application is reviewed directly by the core team.</p>
                </li>
                <li>
                  <span className="contact-next-key">Reply time</span>
                  <p className="contact-mini-step-copy">Expect a response within one business day.</p>
                </li>
                <li>
                  <span className="contact-next-key">Kickoff readiness</span>
                  <p className="contact-mini-step-copy">Qualified projects can begin quickly after alignment.</p>
                </li>
              </ul>
            </article>

            <article className="contact-content-block">
              <p className="contact-trust-label">Typical timelines</p>
              <div className="contact-chip-row">
                <span className="contact-chip">Entry: 4-6 days</span>
                <span className="contact-chip">Mid: 6-8 days</span>
                <span className="contact-chip">Top: 4-7 days</span>
                <span className="contact-chip">Most projects: 4-10 days</span>
              </div>
            </article>
          </aside>

          <div className="contact-premium-form-shell">
            <Kicker>Concierge application</Kicker>
            <h2 className="section-title">Apply for your project.</h2>
            <p className="contact-premium-lead">
              Share your scope and preferred start window. We will return with a clear recommendation and next step.
            </p>
            <ContactClient />
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
