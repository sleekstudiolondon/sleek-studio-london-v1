import PageShell from "../../components/layout/PageShell";
import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Kicker from "../../components/ui/Kicker";
import { getPackagePricing, PACKAGES } from "../../lib/pricing";

const WHITE_GLOVE_PAGE_FAMILIES = [
  "Core studio pages: Home, About, Services, Process, Contact",
  "Portfolio library: overview, category pages, and featured case-study templates",
  "Authority system: Press, Awards, Journal, and editorial article templates",
  "Conversion routes: Private client, developer, consultation, and investment-guide pages",
  "Operational pages: Team, FAQ, privacy, campaign landing pages, and launch utilities",
];

export default function ServicesPage() {
  return (
    <PageShell
      eyebrow="Services"
      title="Premium website packages with room to refine."
      subtitle="Choose the level of build support that fits your studio, then continue with a clear monthly refinement rhythm after launch. Every package is structured around interior designers, premium proof, and better-qualified enquiries."
    >
      <Section>
        <div className="service-launch-brief">
          <div className="service-launch-copy">
            <Kicker>Launch planning</Kicker>
            <h2 className="section-title">A composed route from deposit to launch.</h2>
            <p className="section-copy">
              Each package combines a defined page count, a response window, and an ongoing request allowance. That
              keeps the project calm, protects quality, and gives your studio a realistic sense of what can be improved
              after the site goes live.
            </p>
          </div>
          <div className="service-launch-panel">
            <div className="service-launch-metric">
              <span className="service-launch-label">Built around</span>
              <strong>Scope, service level, and a premium enquiry journey</strong>
            </div>
            <div className="service-launch-divider" />
            <div className="service-launch-grid">
              <div>
                <span className="service-launch-label">What changes package fit</span>
                <p>Page depth, weekly request allowance, response window, and concierge involvement.</p>
              </div>
              <div>
                <span className="service-launch-label">What stays included</span>
                <p>Hosting support, domain setup, technical QA, responsive development, and launch handover.</p>
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
              <Card key={tier.id} className="pricing-card" variant="card" recommended={tier.id === "mid"}>
                <div className="pricing-card-head">
                  <div>
                    <h2 className="card-title">{tier.name}</h2>
                    <p className="pricing-nickname">{tier.nickname}</p>
                  </div>
                  {tier.id === "mid" ? <span className="pricing-badge">Most balanced</span> : null}
                  {tier.isInviteOnly ? <span className="pricing-badge">Limited intake</span> : null}
                </div>
                {tier.headline ? <p className="card-copy">{tier.headline}</p> : null}
                <p className="pricing-bestfor">Best for: {tier.intendedFor}</p>
                <div className="pricing-stack">
                  <p className="pricing-amount">{pricing.primary}</p>
                  {pricing.secondary ? <p className="pricing-amount-subtle">{pricing.secondary}</p> : null}
                </div>
                <div className="package-meta-grid">
                  <span>{tier.pageCount}{tier.isInviteOnly ? "+" : ""} pages</span>
                  <span>{tier.requestAllowance}</span>
                  <span>{tier.responseTime}</span>
                </div>
                <p className="pricing-meta">Typical timeline: {tier.timeline}</p>
                <ul className="list-soft">
                  {tier.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="button-row pricing-card-cta">
                  <Button href={`/contact?plan=${tier.id}`}>{tier.isInviteOnly ? "Request a private review" : "Apply for this package"}</Button>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section divider>
        <div className="editorial-split">
          <div>
            <Kicker>White Glove architecture</Kicker>
            <h2 className="section-title">20+ pages without filler or dead-end routes.</h2>
            <p className="section-copy">
              White Glove is not a collection of empty pages. It is a premium content estate grouped into useful page
              families, so an established interior studio can scale portfolio, press, editorial, and conversion content
              while preserving a calm navigation experience.
            </p>
          </div>
          <Card className="content-card" hoverable={false}>
            <ul className="list-soft">
              {WHITE_GLOVE_PAGE_FAMILIES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section narrow center>
        <Kicker>Still choosing?</Kicker>
        <h2 className="section-title">Tell us where your studio is now. We will recommend the calmest route.</h2>
        <p className="section-copy">
          If you are unsure whether you need three pages, eight pages, or a larger content estate, apply with your goals
          and we will map the right first phase before any build begins.
        </p>
        <div className="button-row">
          <Button href="/contact">Apply for a project slot</Button>
          <Button href="/work" variant="secondary">View examples</Button>
        </div>
      </Section>
    </PageShell>
  );
}
