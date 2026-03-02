import PageShell from "../../components/layout/PageShell";
import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Kicker from "../../components/ui/Kicker";

const AUDIENCE = [
  "Individual interior designers refining their positioning",
  "Boutique studios preparing for higher-value projects",
  "Mid-sized teams presenting multiple designers and portfolios clearly",
];

const CREDIBILITY = [
  {
    title: "Senior-led delivery",
    copy: "The same core team leads discovery, design direction, and build quality from first brief to launch.",
  },
  {
    title: "Editorial precision",
    copy: "Every page is composed for legibility, pacing, and trust so clients understand value quickly.",
  },
  {
    title: "Calm execution",
    copy: "Structured milestones, clear feedback loops, and dependable communication keep momentum predictable.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="Sleek Studio London"
      subtitle="A web-first studio creating luxury website experiences for interior designers and growing studios."
    >
      <Section narrow divider>
        <Kicker>Mission</Kicker>
        <h2 className="section-title">Luxury presentation, delivered with clarity and craft.</h2>
        <p className="section-copy">
          Sleek Studio London exists to help interior studios present their work with quiet authority. We shape digital
          experiences that feel composed, editorial, and unmistakably premium from the first impression onward.
        </p>
      </Section>

      <Section narrow divider>
        <Kicker>Who we build for</Kicker>
        <ul className="list-soft">
          {AUDIENCE.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section divider>
        <Kicker>Credibility</Kicker>
        <div className="feature-grid">
          {CREDIBILITY.map((item) => (
            <Card key={item.title} className="content-card">
              <h3 className="card-title">{item.title}</h3>
              <p className="card-copy">{item.copy}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section narrow center>
        <Kicker>Approach</Kicker>
        <p className="section-copy">
          Our approach combines strategic structure, premium design detail, and disciplined engineering delivery. The
          process stays transparent and collaborative, with enough rigor to protect quality at every stage.
        </p>
        <div className="button-row">
          <Button href="/contact">Apply now</Button>
        </div>
      </Section>
    </PageShell>
  );
}
