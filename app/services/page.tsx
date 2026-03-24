import PageShell from "../../components/layout/PageShell";
import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Kicker from "../../components/ui/Kicker";
import { getPackagePricing, PACKAGES } from "../../lib/pricing";

export default function ServicesPage() {
  return (
    <PageShell
      eyebrow="Services"
      title="Choose the website build that fits your launch vision."
      subtitle="Choose the level of build support that fits your vision, timeline, and launch goals. Tell us how soon you want your site live, and we will shape the clearest path to get you there."
    >
      <Section>
        <div className="service-launch-brief">
          <div className="service-launch-copy">
            <Kicker>Launch planning</Kicker>
            <h2 className="section-title">See the shape of your launch before you apply.</h2>
            <p className="section-copy">
              Choose the support level that fits your website vision, how quickly you want to go live, and how much
              room you want after launch. Each package is structured to feel complete on its own, so you can picture
              the pace, page count, and post-launch flexibility before we even start.
            </p>
          </div>
          <div className="service-launch-panel">
            <div className="service-launch-metric">
              <span className="service-launch-label">Built around</span>
              <strong>Timeline, scope, and launch confidence</strong>
            </div>
            <div className="service-launch-divider" />
            <div className="service-launch-grid">
              <div>
                <span className="service-launch-label">What changes package fit</span>
                <p>Page count, delivery pace, and the level of support you want once the site is live.</p>
              </div>
              <div>
                <span className="service-launch-label">What stays included</span>
                <p>Hosting, domain setup, technical QA, and a clean handover into your post-launch edits.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section divider>
        <Kicker>Pricing tiers</Kicker>
        <div className="pricing-grid">
          {PACKAGES.map((tier) => {
            const pricing = getPackagePricing(tier);

            return (
              <Card key={tier.id} className="pricing-card" variant="card">
                <div className="pricing-card-head">
                  <div>
                    <h2 className="card-title">{tier.name}</h2>
                    <p className="pricing-nickname">{tier.nickname}</p>
                  </div>
                </div>
                <p className="pricing-bestfor">Best for: {tier.intendedFor}</p>
                <p className="card-copy">{tier.description}</p>
                <div className="pricing-stack">
                  <p className="pricing-amount">{pricing.primary}</p>
                  {pricing.secondary ? <p className="pricing-amount-subtle">{pricing.secondary}</p> : null}
                </div>
                <p className="pricing-meta">Typical timeline: {tier.timeline}</p>
                <ul className="list-soft">
                  {tier.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="button-row pricing-card-cta">
                  <Button href="/contact">{tier.isInviteOnly ? "Request access" : "Apply now"}</Button>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>
    </PageShell>
  );
}
