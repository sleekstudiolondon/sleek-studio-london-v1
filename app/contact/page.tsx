import PageShell from "../../components/layout/PageShell";
import Section from "../../components/ui/Section";
import Kicker from "../../components/ui/Kicker";
import { PACKAGES } from "../../lib/pricing";
import ContactClient from "./ContactClient";

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Start your website launch with a clear next step."
      subtitle="Share your goals, launch timing, and investment range. We will return with a clear recommendation, package fit, and delivery pathway."
    >
      <Section>
        <div className="contact-premium-layout">
          <aside className="contact-premium-info">
            <Kicker>Before you apply</Kicker>
            <h2 className="section-title">Concierge intake for polished, launch-ready websites.</h2>
            <p className="contact-premium-lead">
              We keep intake intentionally focused so every project receives senior-level attention from strategy through
              launch, with hosting, domain setup, and post-launch support already accounted for in each package.
            </p>

            <article className="contact-content-block">
              <p className="contact-trust-label">How we work</p>
              <ol className="contact-mini-timeline">
                <li>
                  <p className="contact-mini-step-title">1. Brief review</p>
                  <p className="contact-mini-step-copy">We assess your goals, timeline, and scope so the right package feels obvious.</p>
                </li>
                <li>
                  <p className="contact-mini-step-title">2. Strategic response</p>
                  <p className="contact-mini-step-copy">You receive a clear recommendation and practical route to launch.</p>
                </li>
                <li>
                  <p className="contact-mini-step-title">3. Structured kickoff</p>
                  <p className="contact-mini-step-copy">Once aligned, we shape a focused production window and move toward go-live.</p>
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
                {PACKAGES.map((pkg) => (
                  <span key={pkg.id} className="contact-chip">{pkg.name}: {pkg.timeline}</span>
                ))}
              </div>
            </article>
          </aside>

          <div className="contact-premium-form-shell">
            <div className="contact-form-intro">
              <Kicker className="contact-form-shell-kicker">Concierge application</Kicker>
              <h2 className="section-title contact-form-shell-title">Apply for your project.</h2>
              <p className="contact-premium-lead contact-form-shell-lead">
                Share your scope and preferred start window. We will come back with the clearest package fit and next step for launch.
              </p>
            </div>
            <ContactClient />
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
