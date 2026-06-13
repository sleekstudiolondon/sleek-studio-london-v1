"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { CaseStudy, DemoProject } from "@/lib/caseStudies";
import { type DemoTab, useDemoNavigation } from "./DemoShared";

const materialIndex = [
  { title: "Survey", copy: "Light, threshold, storage, and existing junctions are measured before visual work begins." },
  { title: "Material", copy: "Stone, plaster, timber, metal, and textile are tested as one disciplined system." },
  { title: "Spatial edit", copy: "Loose decoration is removed so proportions, views, and movement become sharper." },
  { title: "Objects", copy: "Furniture and art are placed as part of the architecture, not as afterthoughts." },
];

const alterSpecs = [
  { material: "Clay plaster / bronze shadow line", move: "Recast the stair hall as a quiet vertical gallery" },
  { material: "Olive lacquer / pale stone", move: "Define the plan with low partitions and edited storage" },
  { material: "Ink steel / brushed stainless", move: "Turn the kitchen into a precise hosting instrument" },
  { material: "Mineral paint / garden-facing timber", move: "Pull courtyard light through a sequence of rooms" },
];

function AlterNav({ site, tabs, activeTab, selectTab }: { site: CaseStudy; tabs: DemoTab[]; activeTab: string; selectTab: (key: string) => void }) {
  return (
    <header className="alter2-nav">
      <button type="button" className="alter2-brand" onClick={() => selectTab("home")}>{site.title}</button>
      <nav className="alter2-index-nav" aria-label={`${site.title} architectural index`}>
        {tabs.map((item, index) => (
          <button key={item.key} type="button" className={activeTab === item.key ? "is-active" : ""} onClick={() => selectTab(item.key)} aria-current={activeTab === item.key ? "page" : undefined}>
            <span>{String(index + 1).padStart(2, "0")}</span>{item.label}
          </button>
        ))}
      </nav>
      <Link href="/work" className="alter2-return">← Work gallery</Link>
    </header>
  );
}

function AlterHome({ site, selectTab }: { site: CaseStudy; selectTab: (key: string) => void }) {
  const featured = site.projects[0];
  return (
    <section className="alter2-page alter2-home" aria-labelledby="alter2-home-title">
      <div className="alter2-hero">
        <div className="alter2-manifesto">
          <p className="alter2-kicker">{site.hero.eyebrow}</p>
          <h1 id="alter2-home-title">{site.hero.title}</h1>
          <p>{site.hero.copy}</p>
          <button type="button" onClick={() => selectTab("projects")}>Open archive</button>
        </div>
        <figure className="alter2-hero-image">
          <Image src={site.hero.image} alt={`${site.title} architectural interior crop`} width={1500} height={1800} className="alter2-image" sizes="(max-width: 900px) 100vw, 42vw" priority />
          <figcaption>Material study / Chelsea / contemporary residential interiors</figcaption>
        </figure>
      </div>
      <div className="alter2-material-index">
        {materialIndex.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{item.title}</h2><p>{item.copy}</p></article>)}
      </div>
      {featured ? (
        <button type="button" className="alter2-feature-row" onClick={() => selectTab("projects")}>
          <span>Featured archive / 01</span>
          <strong>{featured.title}</strong>
          <em>{featured.category} · {featured.location}</em>
          <small>{featured.description}</small>
        </button>
      ) : null}
    </section>
  );
}

function AlterStudio({ site }: { site: CaseStudy }) {
  return (
    <section className="alter2-page alter2-studio" id="studio" aria-labelledby="alter2-studio-title">
      <div className="alter2-section-head">
        <p className="alter2-kicker">02 Studio</p>
        <h2 id="alter2-studio-title">A studio system for sharper domestic architecture.</h2>
        <p>{site.manifesto?.copy}</p>
      </div>
      <div className="alter2-system-grid">
        {[
          ["Material system", "Stone / plaster / metal / textile", site.philosophy.copy],
          ["Spatial principles", "Thresholds / voids / views", "Each plan is checked as a sequence of movements before furnishings are placed."],
          ["Survey notes", "Light / storage / constraints", "The existing building becomes the discipline that gives the interior its edge."],
          ["Object placement", "Furniture / art / lighting", "Objects are selected for proportion and usefulness before decoration is considered."],
        ].map(([label, title, copy]) => <article key={label}><span>{label}</span><h3>{title}</h3><p>{copy}</p></article>)}
      </div>
      <div className="alter2-remove-keep">
        <article><span>Remove</span><p>Noise, loose styling, unresolved junctions, excess finish, furniture without purpose.</p></article>
        <article><span>Keep</span><p>Useful tension, strong sightlines, edited storage, honest materials, rooms with a clear rhythm.</p></article>
      </div>
    </section>
  );
}

function AlterProjects({ site }: { site: CaseStudy }) {
  const [feature, ...rest] = site.projects;
  return (
    <section className="alter2-page alter2-projects" id="projects" aria-labelledby="alter2-projects-title">
      <div className="alter2-section-head">
        <p className="alter2-kicker">03 Projects</p>
        <h2 id="alter2-projects-title">Project archive: site, material, spatial move.</h2>
        <div className="alter2-filters"><span>Townhouse</span><span>Apartment</span><span>Interior architecture</span><span>Objects</span></div>
      </div>
      {feature ? <AlterFeatureProject site={site} project={feature} spec={alterSpecs[0]} /> : null}
      <div className="alter2-archive-rows">
        {rest.map((project, index) => <AlterArchiveRow key={project.title} site={site} project={project} index={index + 2} spec={alterSpecs[index + 1]} />)}
      </div>
    </section>
  );
}

function AlterFeatureProject({ site, project, spec }: { site: CaseStudy; project: DemoProject; spec: { material: string; move: string } }) {
  return (
    <article className="alter2-feature-project">
      <div className="alter2-feature-crop"><Image src={project.image} alt={`${project.title} by ${site.title}`} width={1300} height={980} className="alter2-image" sizes="(max-width: 900px) 100vw, 46vw" loading="eager" /></div>
      <div className="alter2-feature-spec">
        <span>01 / {project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <dl><div><dt>Site</dt><dd>{project.location}</dd></div><div><dt>Material note</dt><dd>{spec.material}</dd></div><div><dt>Spatial move</dt><dd>{spec.move}</dd></div></dl>
      </div>
    </article>
  );
}

function AlterArchiveRow({ site, project, index, spec }: { site: CaseStudy; project: DemoProject; index: number; spec: { material: string; move: string } }) {
  return (
    <article className="alter2-archive-row">
      <span>{String(index).padStart(2, "0")}</span>
      <div className="alter2-row-thumb"><Image src={project.image} alt={`${project.title} archive thumbnail by ${site.title}`} width={420} height={300} className="alter2-image" sizes="(max-width: 900px) 100vw, 160px" loading="lazy" /></div>
      <h3>{project.title}</h3>
      <p>{project.category} · {project.location}</p>
      <em>{spec.move}</em>
    </article>
  );
}

function AlterServices({ site }: { site: CaseStudy }) {
  const outputs = ["Plans, joinery direction, materials, and critical junctions.", "Concept, procurement direction, installation, and interior composition.", "Furniture, lighting, art placement, and final editorial styling."];
  return (
    <section className="alter2-page alter2-services" id="services" aria-labelledby="alter2-services-title">
      <div className="alter2-section-head"><p className="alter2-kicker">04 Services</p><h2 id="alter2-services-title">Capabilities arranged as a design system.</h2></div>
      <div className="alter2-capability-matrix">
        {site.services.map((service, index) => <article key={service.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{service.title}</h3><p>{service.copy}</p><small>Studio output: {outputs[index]}</small></article>)}
      </div>
    </section>
  );
}

function AlterJournal({ site }: { site: CaseStudy }) {
  const featured = site.journal?.[0];
  const rest = site.journal?.slice(1) ?? [];
  return (
    <section className="alter2-page alter2-journal" id="journal" aria-labelledby="alter2-journal-title">
      <div className="alter2-section-head"><p className="alter2-kicker">05 Journal</p><h2 id="alter2-journal-title">Material notes and studio letters.</h2></div>
      {featured ? <article className="alter2-feature-article"><span>{featured.meta}</span><h3>{featured.title}</h3><p>{featured.copy}</p></article> : null}
      <div className="alter2-article-index">
        {rest.map((item, index) => <article key={item.title}><span>{String(index + 2).padStart(2, "0")}</span><p>{item.meta}</p><h3>{item.title}</h3><em>{item.copy}</em></article>)}
      </div>
    </section>
  );
}

function AlterContact({ site }: { site: CaseStudy }) {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="alter2-page alter2-contact" id="contact" aria-labelledby="alter2-contact-title">
      <aside className="alter2-contact-rail">
        <span>06 Contact</span>
        <h2 id="alter2-contact-title">Commission brief</h2>
        <p>{site.contact.copy}</p>
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
      </aside>
      <form className="alter2-brief" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
        <div className="alter2-field-group"><span>01</span><label><small>Name</small><input name="name" type="text" autoComplete="name" required /></label><label><small>Email</small><input name="email" type="email" autoComplete="email" required /></label></div>
        <div className="alter2-field-group"><span>02</span><label><small>Site / project location</small><input name="location" type="text" placeholder="Hackney townhouse, Marylebone flat, coastal site…" required /></label><label><small>Existing architecture type</small><select name="architecture" defaultValue="" required><option value="" disabled>Select one</option><option>Townhouse</option><option>Apartment</option><option>Lateral home</option><option>New-build shell</option></select></label></div>
        <div className="alter2-field-group"><span>03</span><label><small>Commission type</small><input name="commission" type="text" placeholder="Interior architecture, residential design, object direction…" required /></label></div>
        <div className="alter2-field-group"><span>04</span><label><small>Material priorities / survey notes</small><textarea name="message" rows={6} placeholder="Tell us about the architecture, constraints, materials, and what should change." required /></label></div>
        <button type="submit">Submit commission brief</button>
        {submitted ? <p className="alter2-success" role="status">Thank you — the studio would review the brief against current capacity.</p> : null}
        <p className="alter2-note">Preview note — this concept form confirms locally and does not send email.</p>
      </form>
    </section>
  );
}

export default function StudioAlterDemo({ site }: { site: CaseStudy }) {
  const { tabs, activeTab, selectTab } = useDemoNavigation(site);
  return (
    <article className="alter2-site" id="home">
      <AlterNav site={site} tabs={tabs} activeTab={activeTab} selectTab={selectTab} />
      <main>
        {activeTab === "home" ? <AlterHome site={site} selectTab={selectTab} /> : null}
        {activeTab === "studio" ? <AlterStudio site={site} /> : null}
        {activeTab === "projects" ? <AlterProjects site={site} /> : null}
        {activeTab === "services" ? <AlterServices site={site} /> : null}
        {activeTab === "journal" ? <AlterJournal site={site} /> : null}
        {activeTab === "contact" ? <AlterContact site={site} /> : null}
      </main>
    </article>
  );
}
