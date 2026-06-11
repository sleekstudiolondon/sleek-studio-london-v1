import Button from "../ui/Button";
import Card from "../ui/Card";
import Kicker from "../ui/Kicker";
import { packageExamples, buildExampleHref, EXAMPLE_PROJECT_CTA_LABEL } from "@/lib/packageExamples";
import { PACKAGE_MAP } from "@/lib/pricing";

export default function AboutCaseStudiesSection() {
  return (
    <div className="about-case-studies-shell">
      <div className="about-case-studies-intro">
        <div>
          <Kicker>Projects</Kicker>
          <h2 className="section-title">Step into example websites that show what each package could become.</h2>
        </div>
        <p className="section-copy about-case-studies-copy">
          These examples are designed as standalone interior design websites, not reports. The goal is to help clients
          feel the difference between a focused launch, a fuller multi-page studio site, and the most bespoke luxury
          experience.
        </p>
      </div>

      <div id="projects-showcase" className="pricing-grid about-case-studies-grid">
        {packageExamples.map((site) => (
          <Card key={site.slug} className="pricing-card about-case-study-card" variant="card">
            <div className="pricing-card-head">
              <div>
                <h3 className="card-title">{site.brandName}</h3>
                <p className="pricing-nickname">{PACKAGE_MAP[site.packageId].name}</p>
              </div>
            </div>

            <p className="pricing-bestfor">{site.aboutCard?.positioning ?? site.brandTagline}</p>
            <p className="card-copy">{site.aboutCard?.detail ?? site.cardDescription}</p>

            <div className="pricing-stack about-case-study-summary">
              <p className="about-case-study-summary-title">{site.aboutCard?.summaryTitle ?? site.pages[0].heroTitle}</p>
              <p className="about-case-study-summary-subtle">{site.aboutCard?.summarySubtle ?? site.cardDescription}</p>
            </div>

            <p className="pricing-meta">{site.aboutCard?.meta ?? PACKAGE_MAP[site.packageId].headline ?? PACKAGE_MAP[site.packageId].description}</p>

            <ul className="list-soft" aria-label={`${site.brandName} package details`}>
              {(site.aboutCard?.bullets ?? [
                site.pages[0].heroCopy,
                `${PACKAGE_MAP[site.packageId].timeline} typical delivery rhythm for this package tier.`,
                "Designed to show how this package feels as a finished studio website, not a placeholder layout.",
              ]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="button-row pricing-card-cta about-case-study-actions">
              <Button href={buildExampleHref(site.slug)} variant="secondary" className="about-case-study-button">
                {EXAMPLE_PROJECT_CTA_LABEL}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
