"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CaseStudy, DemoProject } from "@/lib/caseStudies";

type DemoSiteClientProps = {
  site: CaseStudy;
};

function tabKeyFromHref(href: string) {
  return href.replace(/^#/, "") || "home";
}

function projectHeading(site: CaseStudy, activeTab: string) {
  if (site.slug === "maison-form" && activeTab === "hospitality") return "Guest spaces with atmosphere and memory.";
  if (site.slug === "maison-form") return "Residences of scale and intimacy.";
  if (site.slug === "studio-alter") return "Projects shaped by proportion, material, and restraint.";
  return "Selected residences.";
}

function getProjectsForTab(site: CaseStudy, activeTab: string): DemoProject[] {
  if (site.slug === "maison-form" && activeTab === "residences") {
    return site.projects.filter((project) => project.category === "Residences");
  }

  if (site.slug === "maison-form" && activeTab === "hospitality") {
    return site.projects.filter((project) => project.category === "Hospitality");
  }

  return site.projects;
}

export default function DemoSiteClient({ site }: DemoSiteClientProps) {
  const tabs = useMemo(
    () => site.nav.map((item) => ({ ...item, key: tabKeyFromHref(item.href) })),
    [site.nav],
  );
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (tabs.some((tab) => tab.key === hash)) setActiveTab(hash);
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [tabs]);

  const selectTab = (key: string) => {
    setActiveTab(key);
    window.history.replaceState(null, "", `#${key}`);
  };

  return (
    <article className={`demo-site demo-site-tabbed ${site.palette}`} id="home">
      <header className="demo-nav">
        <button type="button" className="demo-brand" onClick={() => selectTab("home")}>
          {site.title}
        </button>
        <nav className="demo-nav-links" aria-label={`${site.title} website navigation`}>
          {tabs.map((item) => (
            <button
              key={item.key}
              type="button"
              className={activeTab === item.key ? "demo-nav-link-active" : ""}
              onClick={() => selectTab(item.key)}
              aria-current={activeTab === item.key ? "page" : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <Link href="/work" className="demo-back-link" aria-label="Return to Sleek Studio work gallery">
          <span aria-hidden="true">←</span> Sleek Studio
        </Link>
      </header>

      <div className="demo-tab-shell">
        {activeTab === "home" ? <HomePanel site={site} selectTab={selectTab} /> : null}
        {activeTab === "studio" ? <StudioPanel site={site} /> : null}
        {["portfolio", "projects", "residences", "hospitality"].includes(activeTab) ? (
          <ProjectPanel site={site} activeTab={activeTab} projects={getProjectsForTab(site, activeTab)} />
        ) : null}
        {activeTab === "services" ? <ServicesPanel site={site} /> : null}
        {activeTab === "journal" ? <JournalPanel site={site} /> : null}
        {activeTab === "atelier" ? <AtelierPanel site={site} /> : null}
        {activeTab === "press" ? <PressPanel site={site} /> : null}
        {activeTab === "contact" ? <ContactPanel site={site} /> : null}
      </div>
    </article>
  );
}

function HomePanel({ site, selectTab }: { site: CaseStudy; selectTab: (key: string) => void }) {
  const nextKey = site.slug === "maison-form" ? "residences" : site.slug === "studio-alter" ? "projects" : "portfolio";

  return (
    <section className="demo-tab-panel demo-home-panel" aria-labelledby="demo-hero-title">
      <div className="demo-hero">
        <div className="demo-hero-copy">
          <p className="demo-kicker">{site.hero.eyebrow}</p>
          <h1 id="demo-hero-title">{site.hero.title}</h1>
          <p>{site.hero.copy}</p>
          <div className="demo-action-row">
            <button type="button" className="demo-button" onClick={() => selectTab("contact")}>Begin an enquiry</button>
            <button type="button" className="demo-text-link" onClick={() => selectTab(nextKey)}>View selected work</button>
          </div>
        </div>
        <div className="demo-hero-image-wrap">
          <Image
            src={site.hero.image}
            alt={`${site.title} interior atmosphere`}
            width={2200}
            height={1500}
            className="demo-hero-image"
            sizes="(max-width: 900px) 100vw, 54vw"
            priority
          />
        </div>
      </div>
      <div className="demo-home-strip" aria-label={`${site.title} studio summary`}>
        <span>{site.location}</span>
        <span>{site.archetype}</span>
        <span>{site.style}</span>
      </div>
    </section>
  );
}

function StudioPanel({ site }: { site: CaseStudy }) {
  return (
    <section className="demo-tab-panel demo-section demo-studio-panel" id="studio" aria-labelledby="studio-title">
      <p className="demo-kicker">Studio</p>
      <div className="demo-statement-grid">
        <h2 id="studio-title">{site.manifesto?.title ?? site.philosophy.title}</h2>
        <div className="demo-rich-copy">
          <p>{site.manifesto?.copy ?? site.philosophy.copy}</p>
          {site.manifesto ? <p>{site.philosophy.copy}</p> : null}
        </div>
      </div>

      {site.bio ? (
        <div className="demo-bio demo-inline-feature">
          <div className="demo-bio-image-wrap">
            <Image
              src={site.bio.image}
              alt={site.bio.title}
              width={1100}
              height={1300}
              className="demo-bio-image"
              sizes="(max-width: 768px) 100vw, 36vw"
              loading="lazy"
            />
          </div>
          <div>
            <p className="demo-kicker">Designer</p>
            <h2>{site.bio.title}</h2>
            <p>{site.bio.copy}</p>
          </div>
        </div>
      ) : null}

      {site.team ? (
        <div className="demo-inline-feature demo-team-feature">
          <p className="demo-kicker">Principals</p>
          <div className="demo-service-grid">
            {site.team.map((person) => (
              <article key={person.title} className="demo-service-card">
                <h3>{person.title}</h3>
                <p>{person.copy}</p>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function ProjectPanel({ site, activeTab, projects }: { site: CaseStudy; activeTab: string; projects: DemoProject[] }) {
  return (
    <section className="demo-tab-panel demo-section demo-project-panel" id={activeTab} aria-labelledby={`${activeTab}-title`}>
      <div className="demo-section-head">
        <p className="demo-kicker">{activeTab === "hospitality" ? "Hospitality" : "Selected work"}</p>
        <h2 id={`${activeTab}-title`}>{projectHeading(site, activeTab)}</h2>
      </div>
      <div className={`demo-project-grid ${site.slug === "studio-alter" ? "demo-project-grid-editorial" : ""} ${site.slug === "maison-form" ? "demo-project-grid-cinematic" : ""}`}>
        {projects.map((project, index) => (
          <article key={project.title} className="demo-project-card">
            <div className="demo-project-image-wrap">
              <Image
                src={project.image}
                alt={`${project.title} by ${site.title}`}
                width={1500}
                height={1100}
                className="demo-project-image"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
            <div className="demo-project-meta">
              <p>{project.location} · {project.year}</p>
              <h3>{project.title}</h3>
              <span>{project.description}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ServicesPanel({ site }: { site: CaseStudy }) {
  return (
    <section className="demo-tab-panel demo-section demo-services" id="services" aria-labelledby="services-title">
      <div className="demo-section-head">
        <p className="demo-kicker">Services</p>
        <h2 id="services-title">{site.slug === "maison-form" ? "Private-client capabilities." : "How the studio can help."}</h2>
      </div>
      <div className="demo-service-grid">
        {site.services.map((service) => (
          <article key={service.title} className="demo-service-card">
            <h3>{service.title}</h3>
            <p>{service.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function JournalPanel({ site }: { site: CaseStudy }) {
  return (
    <section className="demo-tab-panel demo-section demo-journal" id="journal" aria-labelledby="journal-title">
      <div className="demo-section-head">
        <p className="demo-kicker">Journal</p>
        <h2 id="journal-title">Notes from the studio.</h2>
      </div>
      <div className="demo-journal-grid">
        {site.journal?.map((item) => (
          <article key={item.title}>
            <p>{item.meta}</p>
            <h3>{item.title}</h3>
            <span>{item.copy}</span>
          </article>
        ))}
      </div>
      {site.press ? <PressQuotes site={site} compact /> : null}
    </section>
  );
}

function AtelierPanel({ site }: { site: CaseStudy }) {
  return (
    <section className="demo-tab-panel demo-section demo-process" id="atelier" aria-labelledby="atelier-title">
      <div className="demo-section-head">
        <p className="demo-kicker">Atelier</p>
        <h2 id="atelier-title">Craft, procurement, and private installation.</h2>
      </div>
      <ProcessList site={site} />
      <div className="demo-service-grid demo-atelier-services">
        {site.services.map((service) => (
          <article key={service.title} className="demo-service-card">
            <h3>{service.title}</h3>
            <p>{service.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PressPanel({ site }: { site: CaseStudy }) {
  return (
    <section className="demo-tab-panel demo-section demo-press" id="press" aria-labelledby="press-title">
      <div className="demo-section-head">
        <p className="demo-kicker">Press</p>
        <h2 id="press-title">Selected recognition.</h2>
      </div>
      <PressQuotes site={site} />
    </section>
  );
}

function PressQuotes({ site, compact = false }: { site: CaseStudy; compact?: boolean }) {
  return (
    <div className={`demo-press-grid ${compact ? "demo-press-grid-compact" : ""}`}>
      {site.press?.map((item) => (
        <blockquote key={item.source}>
          <p>“{item.quote}”</p>
          <cite>{item.source}</cite>
        </blockquote>
      ))}
    </div>
  );
}

function ProcessList({ site }: { site: CaseStudy }) {
  return (
    <div className="demo-process-list">
      {site.process?.map((step, index) => (
        <article key={step.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{step.title}</h3>
          <p>{step.copy}</p>
        </article>
      ))}
    </div>
  );
}

function ContactPanel({ site }: { site: CaseStudy }) {
  return (
    <section className="demo-tab-panel demo-section demo-contact" id="contact" aria-labelledby="contact-title">
      <p className="demo-kicker">{site.contact.eyebrow}</p>
      <h2 id="contact-title">{site.contact.title}</h2>
      <p>{site.contact.copy}</p>
      <a href={`mailto:${site.contact.email}`} className="demo-button">{site.contact.email}</a>
    </section>
  );
}
