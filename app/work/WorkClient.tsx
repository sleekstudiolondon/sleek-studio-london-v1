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
      title="Example websites for interior designers with a premium point of view."
      subtitle="Explore three concept websites shaped as real interior brands: an intimate solo practice, a contemporary boutique studio, and an established luxury firm."
    >
      <Section divider>
        <Kicker>Website concepts</Kicker>
        <div className="work-intro-row">
          <h2 className="section-title">Built to help prospects imagine their own studio online.</h2>
          <p className="section-copy">
            Each example uses a different visual language, narrative rhythm, and enquiry path while staying calm,
            editorial, and commercially clear.
          </p>
        </div>
        <div className="feature-grid work-gallery-grid">
          {caseStudies.map((project) => (
            <Card key={project.slug} className="content-card work-card" variant="panel">
              <div className="work-image-frame work-image-frame-tall">
                <Image
                  src={project.image}
                  alt={`${project.title} interior website concept`}
                  width={1400}
                  height={1600}
                  className="work-image-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
              <p className="pricing-nickname">{project.archetype}</p>
              <h2 className="card-title">{project.title}</h2>
              <p className="card-copy work-card-meta">{project.location} · {project.style}</p>
              <p className="card-copy">{project.summary}</p>
              <p className="section-note"><strong>Example outcome:</strong> {project.outcome}</p>
              <div className="button-row">
                <Button href={`/work/${project.slug}`} variant="secondary">Explore website</Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section narrow center>
        <Kicker>Your studio</Kicker>
        <h2 className="section-title">A portfolio can feel like a private appointment, not a template.</h2>
        <p className="section-copy">
          We translate your taste, process, projects, and enquiry flow into a website that feels designed around your
          clients rather than borrowed from another industry.
        </p>
        <div className="button-row">
          <Button href="/contact">Apply for a project slot</Button>
          <Button href="/services" variant="secondary">View services</Button>
        </div>
      </Section>
    </PageShell>
  );
}
