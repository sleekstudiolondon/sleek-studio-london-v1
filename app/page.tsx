import PageShell from "../components/layout/PageShell";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Kicker from "../components/ui/Kicker";
import { PACKAGES } from "../lib/pricing";
import { caseStudies } from "../lib/caseStudies";

const OUTCOMES = [
  {
    title: "Luxury perception",
    copy: "A digital presence that feels aligned with premium fees, discerning clients, and design-led referrals.",
  },
  {
    title: "Sharper qualification",
    copy: "A calmer enquiry route that frames budget, timeline, and fit before the first consultation.",
  },
  {
    title: "Ongoing refinement",
    copy: "A deposit + monthly model with a clear request rhythm, so your website can keep improving after launch.",
  },
];

const WHAT_YOU_GET = [
  "Editorial page architecture tailored to interior design studios",
  "Refined typography, spacing, and visual hierarchy",
  "Portfolio and case-study framing that sells design outcomes",
  "One request queue at a time for controlled, high-quality refinement",
  "Responsive development, technical QA, and launch support",
];

export default function HomePage() {
  return (
    <PageShell
      title="Luxury web design, composed for interior designers."
      subtitle="We design and build editorial websites for interior studios that need a refined portfolio, a clearer enquiry path, and high-touch support after launch."
      hideEyebrow
    >
      <Section narrow center>
        <div className="button-row">
          <Button href="/contact">Apply for a project slot</Button>
          <Button href="/work" variant="secondary">
            View selected work
          </Button>
        </div>
        <p className="section-note">Limited clients per cycle · Hands-free delivery · One request queue at a time</p>
      </Section>

      <Section divider>
        <Kicker>Proof of fit</Kicker>
        <div className="proof-strip" aria-label="Selected example websites">
          {caseStudies.map((project) => (
            <Card key={project.slug} className="proof-card" variant="panel">
              <p className="pricing-nickname">{project.packageName}</p>
              <h2 className="card-title">{project.title}</h2>
              <p className="card-copy">{project.pageArchitecture}</p>
              <p className="card-copy">{project.metric}</p>
            </Card>
          ))}
        </div>
        <div className="button-row">
          <Button href="/work" variant="secondary">Explore the portfolio</Button>
        </div>
      </Section>

      <Section divider>
        <Kicker>Why it matters</Kicker>
        <div className="editorial-split">
          <div className="editorial-column">
            <h2 className="section-title">Your website is the first room a client enters.</h2>
            <p className="section-copy">
              It should feel deliberate, spacious, and commercially clear. We bring the same attention to pacing,
              proportion, and detail that your clients expect from a beautifully resolved interior.
            </p>
          </div>
          <div className="editorial-column">
            <p className="section-copy">
              Each page is shaped to help prospects understand your taste, trust your process, and take the next step
              without being rushed through a generic funnel.
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

      <Section divider>
        <Kicker>Packages</Kicker>
        <div className="feature-grid">
          {PACKAGES.map((pkg) => (
            <Card key={pkg.id} className="content-card" variant="card" recommended={pkg.id === "mid"}>
              <p className="pricing-nickname">{pkg.nickname}</p>
              <h3 className="card-title">{pkg.name}</h3>
              <p className="card-copy">{pkg.pageCount}{pkg.isInviteOnly ? "+" : ""} pages · {pkg.requestAllowance} · {pkg.responseTime}</p>
              <p className="card-copy">{pkg.headline}</p>
            </Card>
          ))}
        </div>
        <div className="button-row">
          <Button href="/services" variant="secondary">Compare packages</Button>
        </div>
      </Section>

      <Section narrow center>
        <Kicker>Designed for</Kicker>
        <h2 className="section-title">Individual designers through to established interiors practices.</h2>
        <p className="section-copy">
          We work with independent designers, boutique teams, and ambitious multi-page studios. When the scope grows,
          we create a page-family system that keeps every project, service, and enquiry route easy to navigate.
        </p>
        <p className="section-note">We take on a limited number of projects each cycle to protect quality.</p>
        <div className="button-row">
          <Button href="/contact">Apply for a project slot</Button>
        </div>
      </Section>
    </PageShell>
  );
}
