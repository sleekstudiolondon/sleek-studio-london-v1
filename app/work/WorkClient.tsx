import Image from "next/image";
import PageShell from "../../components/layout/PageShell";
import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Kicker from "../../components/ui/Kicker";
import { caseStudies } from "@/lib/caseStudies";

export default function WorkPage() {
  return (
    <PageShell
      eyebrow="Work"
      title="Selected projects shaped with quiet precision."
      subtitle="A look at recent interiors and studio platforms designed for clarity, trust, and premium demand."
    >
      <Section divider>
        <Kicker>Portfolio</Kicker>
        <div className="feature-grid">
          {caseStudies.map((project) => (
            <Card key={project.slug} className="content-card" variant="panel">
              <div className="work-image-frame">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={1400}
                  height={1000}
                  className="work-image-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
              <h2 className="card-title">{project.title}</h2>
              <p className="card-copy">{project.location} | {project.year} | {project.focus}</p>
              <p className="card-copy">{project.summary}</p>
              <ul className="list-soft">
                <li><strong>Challenge:</strong> {project.challenge}</li>
                <li><strong>Strategy:</strong> {project.strategy}</li>
                <li><strong>Impact:</strong> {project.impact}</li>
              </ul>
              <div className="button-row">
                <Button href={`/work/${project.slug}`} variant="secondary">View case study</Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section narrow center>
        <Kicker>Next project</Kicker>
        <h2 className="section-title">If your portfolio deserves a calmer digital stage, we can build it.</h2>
        <p className="section-copy">
          We shape every project around refined structure, premium design detail, and a smooth enquiry journey.
        </p>
        <div className="button-row">
          <Button href="/contact">Apply now</Button>
        </div>
      </Section>
    </PageShell>
  );
}
