"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import MaisonImage from "./MaisonImage";
import { projects, type MaisonProjectType } from "../_lib/content";

type ProjectFilter = "All" | MaisonProjectType;

const filters: ProjectFilter[] = ["All", "Residential", "Hospitality", "Objects"];

export default function MaisonProjectLibrary() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const visibleProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.type === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <div className="mf-filter-bar" role="group" aria-label="Project category filters">
        <span>View</span>
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={activeFilter === filter}
            className={activeFilter === filter ? "is-active" : ""}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
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
