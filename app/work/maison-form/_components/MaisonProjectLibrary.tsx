import Link from "next/link";
import MaisonImage from "./MaisonImage";
import { projects, type MaisonProjectType } from "../_lib/content";

type ProjectIndexCategory = "All" | MaisonProjectType;

const categories: ProjectIndexCategory[] = ["All", "Residential", "Hospitality", "Objects"];

function projectCount(category: ProjectIndexCategory) {
  return category === "All" ? projects.length : projects.filter((project) => project.type === category).length;
}

export default function MaisonProjectLibrary() {
  return (
    <>
      <section className="mf-project-index" aria-labelledby="mf-project-index-title">
        <div>
          <p className="mf-eyebrow">Project index</p>
          <h2 id="mf-project-index-title">A catalogue of places, held in view.</h2>
        </div>
        <ol className="mf-project-index-list" aria-label="Project index categories">
          {categories.map((category, index) => (
            <li key={category}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{category}</strong>
              <small>{String(projectCount(category)).padStart(2, "0")}</small>
            </li>
          ))}
        </ol>
      </section>
      <section className="mf-project-library" aria-label="All Maison Form projects">
        {projects.map((project) => (
          <article key={project.ordinal} className={`mf-project-tile mf-project-tile--${project.layout}`}>
            <Link href={project.href}>
              <MaisonImage asset={project.asset} alt={project.alt} sizes="(max-width: 900px) 100vw, 66vw" />
              <span className="mf-project-meta">
                <span>{project.ordinal}</span>
                <strong>{project.name}</strong>
                <span>
                  {project.location}
                  <br />
                    {project.type} · {project.year}
                </span>
              </span>
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}
