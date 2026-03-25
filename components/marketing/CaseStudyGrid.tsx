import Image from "next/image";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { caseStudies } from "@/lib/caseStudies";

type CaseStudyGridProps = {
  limit?: number;
  className?: string;
};

export default function CaseStudyGrid({ limit, className = "" }: CaseStudyGridProps) {
  const projects = typeof limit === "number" ? caseStudies.slice(0, limit) : caseStudies;

  return (
    <div className={["feature-grid", className].filter(Boolean).join(" ")}>
      {projects.map((project) => (
        <Card key={project.slug} className="content-card work-proof-card" variant="panel">
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
          <div className="work-proof-meta">
            <span>{project.location}</span>
            <span>{project.focus}</span>
            <span>{project.year}</span>
          </div>
          <h3 className="card-title">{project.title}</h3>
          <p className="card-copy">{project.summary}</p>
          <div className="work-proof-stack">
            <div>
              <p className="work-proof-label">Challenge</p>
              <p className="work-proof-copy">{project.challenge}</p>
            </div>
            <div>
              <p className="work-proof-label">Strategy</p>
              <p className="work-proof-copy">{project.strategy}</p>
            </div>
            <div>
              <p className="work-proof-label">Outcome</p>
              <p className="work-proof-copy">{project.metric ?? project.impact}</p>
            </div>
          </div>
          <div className="button-row work-proof-actions">
            <Button href={`/work/${project.slug}`} variant="secondary">
              View case study
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
