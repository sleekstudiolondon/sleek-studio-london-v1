import PageShell from "../../components/layout/PageShell";
import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Kicker from "../../components/ui/Kicker";
import { formatGBP, PACKAGES } from "../../lib/pricing";

const INCLUDED_IN_ALL_PROJECTS = [
  "Strategic discovery and scope alignment",
  "Design and development tailored to your studio position",
  "Responsive optimisation with technical QA",
  "Refined contact flow with dependable submission handling",
  "Post-launch support and practical handover",
];

export default function ServicesPage() {
  return (
    <PageShell
      eyebrow="Services"
      title="Investment tiers for an elevated digital presence."
      subtitle="Three calibrated tiers, from focused launches to white-glove multi-phase delivery."
    >
      <Section divider>
        <Kicker>Pricing tiers</Kicker>
        <div className="pricing-grid">
          {PACKAGES.map((tier) => (
            <Card
              key={tier.id}
              className="pricing-card"
              recommended={tier.id === "mid"}
              variant="card"
            >
              <h2 className="card-title">{tier.name}</h2>
              <p className="pricing-nickname">{tier.nickname}</p>
              <p className="pricing-bestfor">Best for: {tier.intendedFor}</p>
              <p className="card-copy">{tier.description}</p>
              <div className="pricing-stack">
                <p className="pricing-amount">{formatGBP(tier.deposit)} initial deposit</p>
                <p className="pricing-amount-subtle">From {formatGBP(tier.monthly)}/mo</p>
              </div>
              <p className="pricing-meta">Typical timeline: {tier.timeline}</p>
              <ul className="list-soft">
                {tier.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="button-row">
                <Button href="/contact">Apply now</Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section narrow center>
        <Kicker>Included in every project</Kicker>
        <ul className="list-soft">
          {INCLUDED_IN_ALL_PROJECTS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="section-note">Final figures are confirmed after a short scope conversation.</p>
      </Section>
    </PageShell>
  );
}
