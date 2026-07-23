"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import MaisonImage from "./MaisonImage";
import { projects, type MaisonProjectType } from "../_lib/content";

type ProjectFilter = "All" | MaisonProjectType;

const filters: ProjectFilter[] = ["All", "Residential", "Hospitality", "Objects"];

function projectCount(filter: ProjectFilter) {
  return filter === "All" ? projects.length : projects.filter((project) => project.type === filter).length;
}

export default function MaisonProjectLibrary() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const visibleProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.type === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <section className="mf-project-index" aria-labelledby="mf-project-index-title">
        <div>
          <p className="mf-eyebrow">Project index</p>
          <h2 id="mf-project-index-title">A catalogue of places, held in view.</h2>
        </div>
        <div className="mf-project-index-controls" role="group" aria-label="Project index categories">
          {filters.map((filter, index) => (
            <button
              key={filter}
              type="button"
              aria-pressed={activeFilter === filter}
              className={activeFilter === filter ? "is-active" : ""}
              onClick={() => setActiveFilter(filter)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{filter}</strong>
              <small>{String(projectCount(filter)).padStart(2, "0")}</small>
            </button>
          ))}
        </div>
      </section>
      <section
        className="mf-project-library"
        aria-label={`${activeFilter} project results`}
        aria-live="polite"
      >
        {visibleProjects.length > 0 ? (
          visibleProjects.map((project) => (
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
          ))
        ) : (
          <p className="mf-project-empty">Objects are presented privately. Please enquire for the current collection.</p>
        )}
      </section>
    </>
  );
}
