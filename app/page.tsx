import PageShell from "../components/layout/PageShell";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Kicker from "../components/ui/Kicker";

const OUTCOMES = [
  {
    title: "Perception",
    copy: "A digital presence that reads as deliberate, composed, and distinctly high-end.",
  },
  {
    title: "Clarity",
    copy: "Sharper narrative structure so the right client understands your value in moments.",
  },
  {
    title: "Enquiry Quality",
    copy: "A calmer route from first impression to application, filtering for stronger-fit briefs.",
  },
];

const WHAT_YOU_GET = [
  "Editorial page architecture tailored to design-led studios",
  "Refined typography and spacing systems with clear hierarchy",
  "Reliable, responsive development with disciplined performance",
  "An enquiry path designed for better-qualified introductions",
  "Measured launch support and post-release refinement",
];

export default function HomePage() {
  return (
    <PageShell
      title="Digital presence, composed like an interior."
      subtitle="We design and build editorial websites for interior studios that value restraint, clarity, and quiet authority."
      hideEyebrow
    >
      <Section narrow center>
        <div className="button-row">
          <Button href="/contact">Apply now</Button>
          <Button href="/services" variant="secondary">
            View pricing
          </Button>
        </div>
      </Section>

      <Section divider>
        <Kicker>Why it matters</Kicker>
        <div className="editorial-split">
          <div className="editorial-column">
            <h2 className="section-title">Perception sets the tone before the first call.</h2>
            <p className="section-copy">
              Your website is usually the first room a client enters. It should feel considered, not crowded, and confident without noise.
            </p>
          </div>
          <div className="editorial-column">
            <p className="section-copy">
              We shape each page around pacing and legibility, so the enquiry experience feels precise from opening scroll to final submission.
            </p>
            <ul className="list-soft">
              {WHAT_YOU_GET.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section divider>
        <Kicker>Signature outcomes</Kicker>
        <div className="feature-grid">
          {OUTCOMES.map((item) => (
            <Card key={item.title}>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-copy">{item.copy}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section narrow center>
        <Kicker>Designed for</Kicker>
        <h2 className="section-title">Individual designers through to mid-sized studios.</h2>
        <p className="section-copy">
          We work with independent practices, boutique teams, and growing multi-designer studios. When multiple profiles are needed, we build a unified structure that keeps every project easy to navigate.
        </p>
        <p className="section-note">We take on a limited number of projects each cycle to protect quality.</p>
        <div className="button-row">
          <Button href="/contact">Apply now</Button>
        </div>
      </Section>
    </PageShell>
  );
}
