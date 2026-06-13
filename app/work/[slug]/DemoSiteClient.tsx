"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CaseStudy, DemoProject } from "@/lib/caseStudies";

type DemoSiteClientProps = {
  site: CaseStudy;
};

type DemoTab = CaseStudy["nav"][number] & { key: string };

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

function brandNotes(site: CaseStudy) {
  if (site.slug === "maison-form") {
    return ["Discreet international appointments", "Bespoke furniture and atelier procurement", "Residences, hospitality suites, and private retreats"];
  }
  if (site.slug === "studio-alter") {
    return ["Interior architecture with material discipline", "Architectural surveys, samples, and spatial edits", "Contemporary homes with sharper composition"];
  }
  return ["Personal residential guidance", "Natural materials and gentle proportion", "Quietly layered rooms for daily life"];
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function contactCopy(site: CaseStudy) {
  if (site.slug === "maison-form") {
    return {
      contactLabel: "Representative / assistant contact",
      locationLabel: "Preferred appointment location",
      typeLabel: "Property type",
      scopeLabel: "Appointment preference",
      messageLabel: "Confidential project note",
      placeholder: "Principal introduction, private office call, atelier appointment, or site visit",
      locationPlaceholder: "London, Paris, Geneva, New York, private estate…",
      messagePlaceholder: "Share property context, decision-makers, privacy considerations, and desired appointment cadence.",
      options: ["Private residence", "International residence", "Hospitality suite", "Atelier procurement"],
      button: "Request a private appointment",
    };
  }
  if (site.slug === "studio-alter") {
    return {
      contactLabel: "Name",
      locationLabel: "Site / project location",
      typeLabel: "Existing architecture type",
      scopeLabel: "Commission type",
      messageLabel: "Material priorities / survey notes",
      placeholder: "Interior architecture, full residential design, apartment refurbishment, or object direction",
      locationPlaceholder: "Hackney townhouse, Marylebone flat, coastal site…",
      messagePlaceholder: "Tell us about the architecture, constraints, materials, and what should change.",
      options: ["Townhouse", "Apartment", "Lateral home", "New-build shell"],
      button: "Submit commission brief",
    };
  }
  return {
    contactLabel: "Name",
    locationLabel: "Home location",
    typeLabel: "Project type",
    scopeLabel: "Room or home in mind",
    messageLabel: "A note for John",
    placeholder: "A room, apartment, family home, or sourcing support",
    locationPlaceholder: "Notting Hill, Bath, Cotswolds, or wherever home is…",
    messagePlaceholder: "Tell John about the home, the feeling you want, and what feels unresolved.",
    options: ["Single room", "Whole home", "Renovation support", "Sourcing and final layers"],
    button: "Send John a note",
  };
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
      {site.slug === "maison-form" ? (
        <MaisonNav site={site} tabs={tabs} activeTab={activeTab} selectTab={selectTab} />
      ) : site.slug === "studio-alter" ? (
        <AlterNav site={site} tabs={tabs} activeTab={activeTab} selectTab={selectTab} />
      ) : (
        <DefaultNav site={site} tabs={tabs} activeTab={activeTab} selectTab={selectTab} />
      )}

      <div className="demo-tab-shell">
        {activeTab === "home" ? (
          site.slug === "maison-form" ? <MaisonHomePanel site={site} selectTab={selectTab} /> : site.slug === "studio-alter" ? <AlterHomePanel site={site} selectTab={selectTab} /> : <HomePanel site={site} selectTab={selectTab} />
        ) : null}
        {activeTab === "studio" ? (
          site.slug === "studio-alter" ? <AlterStudioSystem site={site} /> : <StudioPanel site={site} />
        ) : null}
        {["portfolio", "projects", "residences", "hospitality"].includes(activeTab) ? (
          site.slug === "maison-form" ? <MaisonPortfolioPanel site={site} activeTab={activeTab} projects={getProjectsForTab(site, activeTab)} /> : site.slug === "studio-alter" ? <AlterProjectArchive site={site} projects={getProjectsForTab(site, activeTab)} /> : <ProjectPanel site={site} activeTab={activeTab} projects={getProjectsForTab(site, activeTab)} />
        ) : null}
        {activeTab === "services" ? <ServicesPanel site={site} /> : null}
        {activeTab === "journal" ? <JournalPanel site={site} /> : null}
        {activeTab === "atelier" ? (site.slug === "maison-form" ? <MaisonAtelierPanel site={site} /> : <AtelierPanel site={site} />) : null}
        {activeTab === "press" ? (site.slug === "maison-form" ? <MaisonPressPanel site={site} /> : <PressPanel site={site} />) : null}
        {activeTab === "contact" ? <ContactPanel site={site} /> : null}
      </div>
    </article>
  );
}

function DefaultNav({ site, tabs, activeTab, selectTab }: { site: CaseStudy; tabs: DemoTab[]; activeTab: string; selectTab: (key: string) => void }) {
  return (
    <header className="demo-nav">
      <button type="button" className="demo-brand" onClick={() => selectTab("home")}>{site.title}</button>
      <nav className="demo-nav-links" aria-label={`${site.title} website navigation`}>
        {tabs.map((item) => (
          <button key={item.key} type="button" className={activeTab === item.key ? "demo-nav-link-active" : ""} onClick={() => selectTab(item.key)} aria-current={activeTab === item.key ? "page" : undefined}>
            {item.label}
          </button>
        ))}
      </nav>
      <Link href="/work" className="demo-back-link" aria-label="Return to Sleek Studio work gallery"><span aria-hidden="true">←</span> Sleek Studio</Link>
    </header>
  );
}

function MaisonNav({ site, tabs, activeTab, selectTab }: { site: CaseStudy; tabs: DemoTab[]; activeTab: string; selectTab: (key: string) => void }) {
  const currentIndex = Math.max(0, tabs.findIndex((tab) => tab.key === activeTab));
  const current = tabs[currentIndex] ?? tabs[0];

  return (
    <header className="maison-nav" aria-label={`${site.title} website navigation`}>
      <button type="button" className="maison-wordmark" onClick={() => selectTab("home")}>{site.title}</button>
      <div className="maison-section-indicator" aria-live="polite">
        <span>{String(currentIndex + 1).padStart(2, "0")}</span>
        <strong>{current?.label}</strong>
      </div>
      <nav className="maison-section-rail">
        {tabs.map((item, index) => (
          <button key={item.key} type="button" className={activeTab === item.key ? "maison-section-active" : ""} onClick={() => selectTab(item.key)} aria-current={activeTab === item.key ? "page" : undefined}>
            <span>{String(index + 1).padStart(2, "0")}</span>{item.label}
          </button>
        ))}
      </nav>
      <Link href="/work" className="maison-back-link">Sleek Studio</Link>
    </header>
  );
}

function AlterNav({ site, tabs, activeTab, selectTab }: { site: CaseStudy; tabs: DemoTab[]; activeTab: string; selectTab: (key: string) => void }) {
  return (
    <header className="alter-nav" aria-label={`${site.title} website navigation`}>
      <button type="button" className="alter-brand" onClick={() => selectTab("home")}>{site.title}</button>
      <nav className="alter-nav-index">
        {tabs.map((item, index) => (
          <button key={item.key} type="button" className={activeTab === item.key ? "alter-nav-active" : ""} onClick={() => selectTab(item.key)} aria-current={activeTab === item.key ? "page" : undefined}>
            <span>{String(index + 1).padStart(2, "0")}</span>{item.label}
          </button>
        ))}
      </nav>
      <Link href="/work" className="alter-back-link">← Work gallery</Link>
    </header>
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
          <Image src={site.hero.image} alt={`${site.title} interior atmosphere`} width={2200} height={1500} className="demo-hero-image" sizes="(max-width: 900px) 100vw, 54vw" priority />
        </div>
      </div>
      <div className="demo-home-strip" aria-label={`${site.title} studio summary`}>
        <span>{site.location}</span><span>{site.archetype}</span><span>{site.style}</span>
      </div>
      <div className="demo-home-editorial">
        <div><p className="demo-kicker">Approach</p><h2>{site.philosophy.title}</h2></div>
        <p>{site.philosophy.copy}</p>
        <div className="demo-home-notes">{brandNotes(site).map((note) => <span key={note}>{note}</span>)}</div>
      </div>
      <BrandDepth site={site} selectTab={selectTab} />
    </section>
  );
}

function MaisonHomePanel({ site, selectTab }: { site: CaseStudy; selectTab: (key: string) => void }) {
  const reducedMotion = useReducedMotion();
  const slides = [site.hero.image, ...site.projects.map((project) => project.image)].slice(0, 4);
  const [activeSlide, setActiveSlide] = useState(0);
  const featured = site.projects[0];

  useEffect(() => {
    if (reducedMotion || slides.length < 2) return;
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % slides.length), 6200);
    return () => window.clearInterval(timer);
  }, [reducedMotion, slides.length]);

  return (
    <section className="demo-tab-panel maison-home-panel" aria-labelledby="maison-hero-title">
      <div className="maison-billboard">
        <div className="maison-reel" aria-hidden="true">
          {slides.map((image, index) => (
            <Image key={image} src={image} alt="" width={2400} height={1600} priority={index === 0} className={index === activeSlide ? "maison-reel-image maison-reel-active" : "maison-reel-image"} sizes="100vw" />
          ))}
        </div>
        <div className="maison-billboard-copy">
          <p className="demo-kicker">{site.hero.eyebrow}</p>
          <h1 id="maison-hero-title">{site.hero.title}</h1>
          <p>{site.hero.copy}</p>
          <button type="button" className="maison-quiet-button" onClick={() => selectTab("contact")}>Request a private appointment</button>
        </div>
      </div>
      <div className="maison-quiet-index">
        <button type="button" onClick={() => selectTab("residences")}><span>01</span> Private residences</button>
        <button type="button" onClick={() => selectTab("hospitality")}><span>02</span> Hospitality suites</button>
        <button type="button" onClick={() => selectTab("atelier")}><span>03</span> Atelier procurement</button>
      </div>
      <div className="maison-editorial-statement">
        <p className="demo-kicker">Private-client practice</p>
        <h2>{site.philosophy.title}</h2>
        <p>{site.philosophy.copy}</p>
      </div>
      {featured ? (
        <div className="maison-selected-commission">
          <div className="maison-commission-copy">
            <p className="demo-kicker">Selected commission</p>
            <h2>{featured.title}</h2>
            <p>{featured.description}</p>
            <span>{featured.category} · {featured.location} · {featured.year}</span>
          </div>
          <div className="maison-commission-image">
            <Image src={featured.image} alt={`${featured.title} by ${site.title}`} width={1600} height={1100} className="demo-project-image" sizes="(max-width: 900px) 100vw, 56vw" loading="lazy" />
          </div>
        </div>
      ) : null}
      <div className="maison-authority-strip">
        {site.press?.map((item) => <span key={item.source}>{item.source}</span>)}
      </div>
      <div className="maison-private-invitation">
        <p>For clients seeking discretion, atmosphere, and an exacting studio presence.</p>
        <button type="button" className="maison-quiet-button" onClick={() => selectTab("contact")}>Begin confidentially</button>
      </div>
    </section>
  );
}

function AlterHomePanel({ site, selectTab }: { site: CaseStudy; selectTab: (key: string) => void }) {
  const featured = site.projects[0];
  return (
    <section className="demo-tab-panel alter-home-panel" aria-labelledby="alter-hero-title">
      <div className="alter-hero-grid">
        <div className="alter-manifesto-block">
          <p className="demo-kicker">{site.hero.eyebrow}</p>
          <h1 id="alter-hero-title">{site.hero.title}</h1>
          <p>{site.hero.copy}</p>
          <button type="button" className="alter-index-button" onClick={() => selectTab("projects")}>Open project archive</button>
        </div>
        <div className="alter-hero-crop">
          <Image src={site.hero.image} alt={`${site.title} architectural interior`} width={1800} height={1400} className="demo-hero-image" sizes="(max-width: 900px) 100vw, 50vw" priority />
        </div>
        <div className="alter-material-strip">
          {brandNotes(site).map((note, index) => <span key={note}>{String(index + 1).padStart(2, "0")} · {note}</span>)}
        </div>
      </div>
      {featured ? (
        <div className="alter-feature-row">
          <span>Featured / 01</span>
          <h2>{featured.title}</h2>
          <p>{featured.description}</p>
          <button type="button" className="alter-index-button" onClick={() => selectTab("projects")}>Read as archive</button>
        </div>
      ) : null}
    </section>
  );
}

function BrandDepth({ site, selectTab }: { site: CaseStudy; selectTab: (key: string) => void }) {
  if (site.slug === "studio-alter") {
    return (
      <div className="demo-brand-depth demo-alter-depth">
        {["Survey", "Material argument", "Spatial edit", "Object placement"].map((item, index) => (
          <article key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item}</h3>
            <p>{index === 0 ? "Light, thresholds, views, and circulation are mapped before style is discussed." : index === 1 ? "Stone, metal, plaster, timber, and textile are tested as a disciplined family." : index === 2 ? "Joinery, openings, and negative space are edited until the architecture feels sharper." : "Furniture and art are placed as part of the composition, not as decoration."}</p>
          </article>
        ))}
      </div>
    );
  }
  return (
    <div className="demo-brand-depth demo-john-depth">
      <p className="demo-kicker">A note from John</p>
      <blockquote>“The best rooms rarely announce themselves. They settle around the people who live there, becoming softer and more useful with time.”</blockquote>
      <button type="button" className="demo-text-link" onClick={() => selectTab("studio")}>Read the studio note</button>
    </div>
  );
}

function StudioPanel({ site }: { site: CaseStudy }) {
  return (
    <section className="demo-tab-panel demo-section demo-studio-panel" id="studio" aria-labelledby="studio-title">
      <p className="demo-kicker">Studio</p>
      <div className="demo-statement-grid">
        <h2 id="studio-title">{site.manifesto?.title ?? site.philosophy.title}</h2>
        <div className="demo-rich-copy"><p>{site.manifesto?.copy ?? site.philosophy.copy}</p>{site.manifesto ? <p>{site.philosophy.copy}</p> : null}</div>
      </div>
      {site.slug === "john-doe" ? <JohnRoomBegins /> : null}
      {site.bio ? (
        <div className="demo-bio demo-inline-feature">
          <div className="demo-bio-image-wrap"><Image src={site.bio.image} alt={site.bio.title} width={1100} height={1300} className="demo-bio-image" sizes="(max-width: 768px) 100vw, 36vw" loading="lazy" /></div>
          <div><p className="demo-kicker">Designer</p><h2>{site.bio.title}</h2><p>{site.bio.copy}</p></div>
        </div>
      ) : null}
      {site.team ? (
        <div className="demo-inline-feature demo-team-feature"><p className="demo-kicker">Principals</p><div className="demo-service-grid">{site.team.map((person) => <article key={person.title} className="demo-service-card"><h3>{person.title}</h3><p>{person.copy}</p></article>)}</div></div>
      ) : null}
    </section>
  );
}

function AlterStudioSystem({ site }: { site: CaseStudy }) {
  return (
    <section className="demo-tab-panel alter-studio-system" id="studio" aria-labelledby="alter-studio-title">
      <div className="alter-studio-heading">
        <p className="demo-kicker">Studio system</p>
        <h2 id="alter-studio-title">{site.manifesto?.title}</h2>
        <p>{site.manifesto?.copy}</p>
      </div>
      <div className="alter-system-board">
        <article><span>Material system</span><h3>Stone / metal / plaster / textile</h3><p>{site.philosophy.copy}</p></article>
        <article><span>Spatial principles</span><h3>Thresholds, voids, views, edits.</h3><p>Each plan is tested as a sequence of movements before furnishings are placed.</p></article>
        <article><span>Survey notes</span><h3>Light, joins, storage, constraints.</h3><p>Existing conditions become the discipline that gives the interior its edge.</p></article>
      </div>
      <div className="alter-remove-keep">
        <div><p className="demo-kicker">Remove</p><h3>Noise, loose styling, unresolved junctions, excess finish.</h3></div>
        <div><p className="demo-kicker">Keep</p><h3>Useful tension, material honesty, generous voids, precise objects.</h3></div>
      </div>
    </section>
  );
}

function AlterMaterialIndex() {
  return <div className="demo-material-index demo-inline-feature">{["Honed stone", "Darkened metal", "Olive joinery", "Clay plaster"].map((item) => <span key={item}>{item}</span>)}</div>;
}

function JohnRoomBegins() {
  return <div className="demo-john-process demo-inline-feature"><p className="demo-kicker">How a room begins</p><div><span>01 · Listen to the daily ritual</span><span>02 · Edit light, storage, and proportion</span><span>03 · Layer textiles, antiques, and final objects</span></div></div>;
}

function ProjectPanel({ site, activeTab, projects }: { site: CaseStudy; activeTab: string; projects: DemoProject[] }) {
  return (
    <section className="demo-tab-panel demo-section demo-project-panel" id={activeTab} aria-labelledby={`${activeTab}-title`}>
      <div className="demo-section-head"><p className="demo-kicker">Selected work</p><h2 id={`${activeTab}-title`}>{projectHeading(site, activeTab)}</h2></div>
      <div className="demo-project-grid">
        {projects.map((project, index) => <ProjectCard key={project.title} site={site} project={project} index={index} />)}
      </div>
      <div className="demo-project-storyline">{projects.slice(0, 3).map((project, index) => <article key={`${project.title}-story`}><span>{String(index + 1).padStart(2, "0")}</span><h3>{project.title}</h3><p>{project.description}</p></article>)}</div>
    </section>
  );
}

function ProjectCard({ site, project, index }: { site: CaseStudy; project: DemoProject; index: number }) {
  return (
    <article className="demo-project-card">
      <div className="demo-project-image-wrap"><Image src={project.image} alt={`${project.title} by ${site.title}`} width={1500} height={1100} className="demo-project-image" sizes="(max-width: 768px) 100vw, 50vw" loading={index === 0 ? "eager" : "lazy"} /></div>
      <div className="demo-project-meta"><p>{project.category} · {project.location} · {project.year}</p><h3>{project.title}</h3><span>{project.description}</span></div>
    </article>
  );
}

function AlterProjectArchive({ site, projects }: { site: CaseStudy; projects: DemoProject[] }) {
  const [feature, ...rest] = projects;
  return (
    <section className="demo-tab-panel alter-project-archive" id="projects" aria-labelledby="alter-projects-title">
      <div className="alter-archive-head"><p className="demo-kicker">Project archive</p><h2 id="alter-projects-title">Work indexed by site, material, and spatial edit.</h2></div>
      {feature ? (
        <article className="alter-feature-project">
          <div className="alter-feature-image"><Image src={feature.image} alt={`${feature.title} by ${site.title}`} width={1800} height={1300} className="demo-project-image" sizes="(max-width: 900px) 100vw, 58vw" loading="eager" /></div>
          <div className="alter-feature-spec"><span>01 / {feature.category}</span><h3>{feature.title}</h3><p>{feature.description}</p><dl><div><dt>Site</dt><dd>{feature.location}</dd></div><div><dt>Year</dt><dd>{feature.year}</dd></div></dl></div>
        </article>
      ) : null}
      <div className="alter-archive-list">
        {rest.map((project, index) => (
          <article key={project.title}>
            <span>{String(index + 2).padStart(2, "0")}</span>
            <h3>{project.title}</h3>
            <p>{project.category} · {project.location}</p>
            <em>{project.description}</em>
          </article>
        ))}
      </div>
    </section>
  );
}

function MaisonPortfolioPanel({ site, activeTab, projects }: { site: CaseStudy; activeTab: string; projects: DemoProject[] }) {
  const [feature, ...plates] = projects;
  const isHospitality = activeTab === "hospitality";
  return (
    <section className="demo-tab-panel maison-portfolio-panel" id={activeTab} aria-labelledby={`${activeTab}-title`}>
      <div className="maison-portfolio-head"><p className="demo-kicker">{isHospitality ? "Hospitality" : "Residences"}</p><h2 id={`${activeTab}-title`}>{isHospitality ? "Guest spaces composed with atmosphere and operational grace." : "Private residences with scale, ceremony, and intimacy."}</h2></div>
      {feature ? (
        <article className="maison-portfolio-feature">
          <div className="maison-portfolio-image"><Image src={feature.image} alt={`${feature.title} by ${site.title}`} width={2000} height={1350} className="demo-project-image" sizes="100vw" loading="eager" /></div>
          <div className="maison-portfolio-caption"><span>01 · {feature.category} · {feature.location}</span><h3>{feature.title}</h3><p>{feature.description}</p></div>
        </article>
      ) : null}
      <div className="maison-portfolio-plates">
        {plates.map((project, index) => (
          <article key={project.title}>
            <div><Image src={project.image} alt={`${project.title} by ${site.title}`} width={1200} height={900} className="demo-project-image" sizes="(max-width: 900px) 100vw, 36vw" loading="lazy" /></div>
            <span>{String(index + 2).padStart(2, "0")} · {project.location}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ServicesPanel({ site }: { site: CaseStudy }) {
  return (
    <section className="demo-tab-panel demo-section demo-services" id="services" aria-labelledby="services-title">
      <div className="demo-section-head"><p className="demo-kicker">Services</p><h2 id="services-title">{site.slug === "maison-form" ? "Private-client capabilities." : "How the studio can help."}</h2></div>
      <div className="demo-service-grid">{site.services.map((service) => <article key={service.title} className="demo-service-card"><h3>{service.title}</h3><p>{service.copy}</p></article>)}</div>
      {site.process ? <div className="demo-service-process"><p className="demo-kicker">Working rhythm</p><ProcessList site={site} /></div> : null}
    </section>
  );
}

function JournalPanel({ site }: { site: CaseStudy }) {
  return (
    <section className="demo-tab-panel demo-section demo-journal" id="journal" aria-labelledby="journal-title">
      <div className="demo-section-head"><p className="demo-kicker">Journal</p><h2 id="journal-title">Notes from the studio.</h2></div>
      <div className="demo-journal-grid">{site.journal?.map((item) => <article key={item.title}><p>{item.meta}</p><h3>{item.title}</h3><span>{item.copy}</span></article>)}</div>
      {site.press ? <PressQuotes site={site} compact /> : null}
    </section>
  );
}

function AtelierPanel({ site }: { site: CaseStudy }) {
  return (
    <section className="demo-tab-panel demo-section demo-process" id="atelier" aria-labelledby="atelier-title">
      <div className="demo-section-head"><p className="demo-kicker">Atelier</p><h2 id="atelier-title">Craft, procurement, and private installation.</h2></div>
      <ProcessList site={site} />
      <div className="demo-service-grid demo-atelier-services">{site.services.map((service) => <article key={service.title} className="demo-service-card"><h3>{service.title}</h3><p>{service.copy}</p></article>)}</div>
    </section>
  );
}

function MaisonAtelierPanel({ site }: { site: CaseStudy }) {
  const atelier = ["Bespoke furniture", "Specialist procurement", "Craft network", "Installation", "Stewardship"];
  return (
    <section className="demo-tab-panel maison-atelier-panel" id="atelier" aria-labelledby="maison-atelier-title">
      <div className="maison-atelier-intro"><p className="demo-kicker">Atelier</p><h2 id="maison-atelier-title">Craft, procurement, and the final private layer.</h2><p>The atelier coordinates makers, finishes, furniture, art advisory, and installation with the quiet precision expected by international clients.</p></div>
      <div className="maison-atelier-list">{atelier.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3><p>{site.process?.[index % (site.process?.length || 1)]?.copy}</p></article>)}</div>
    </section>
  );
}

function PressPanel({ site }: { site: CaseStudy }) {
  return <section className="demo-tab-panel demo-section demo-press" id="press" aria-labelledby="press-title"><div className="demo-section-head"><p className="demo-kicker">Press</p><h2 id="press-title">Selected recognition.</h2></div><PressQuotes site={site} /></section>;
}

function MaisonPressPanel({ site }: { site: CaseStudy }) {
  return (
    <section className="demo-tab-panel maison-press-panel" id="press" aria-labelledby="maison-press-title">
      <div className="maison-press-head"><p className="demo-kicker">Press & recognition</p><h2 id="maison-press-title">Quiet authority, carried by the rooms themselves.</h2></div>
      <div className="maison-press-index">{site.press?.map((item, index) => <blockquote key={item.source}><span>{String(index + 1).padStart(2, "0")}</span><cite>{item.source}</cite><p>“{item.quote}”</p></blockquote>)}</div>
    </section>
  );
}

function PressQuotes({ site, compact = false }: { site: CaseStudy; compact?: boolean }) {
  return <div className={`demo-press-grid ${compact ? "demo-press-grid-compact" : ""}`}>{site.press?.map((item) => <blockquote key={item.source}><p>“{item.quote}”</p><cite>{item.source}</cite></blockquote>)}</div>;
}

function ProcessList({ site }: { site: CaseStudy }) {
  return <div className="demo-process-list">{site.process?.map((step, index) => <article key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>;
}

function ContactPanel({ site }: { site: CaseStudy }) {
  if (site.slug === "maison-form") return <MaisonContactPanel site={site} />;
  if (site.slug === "studio-alter") return <AlterContactBrief site={site} />;
  return <JohnContactPanel site={site} />;
}

function JohnContactPanel({ site }: { site: CaseStudy }) {
  const [submitted, setSubmitted] = useState(false);
  const formCopy = contactCopy(site);
  return (
    <section className="demo-tab-panel demo-section demo-contact john-contact-panel" id="contact" aria-labelledby="contact-title">
      <div className="demo-contact-intro"><p className="demo-kicker">{site.contact.eyebrow}</p><h2 id="contact-title">Write directly to John.</h2><p>{site.contact.copy}</p><a href={`mailto:${site.contact.email}`} className="demo-contact-email">{site.contact.email}</a></div>
      <form className="demo-contact-form john-contact-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
        <label><span>{formCopy.contactLabel}</span><input name="name" type="text" autoComplete="name" required /></label>
        <label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
        <label><span>{formCopy.locationLabel}</span><input name="location" type="text" placeholder={formCopy.locationPlaceholder} /></label>
        <label><span>{formCopy.messageLabel}</span><textarea name="message" rows={7} placeholder={formCopy.messagePlaceholder} required /></label>
        <button type="submit" className="demo-button">{formCopy.button}</button>
        {submitted ? <p className="demo-form-success" role="status">Thank you — John would read this and reply personally.</p> : null}
        <p className="demo-form-note">Preview note — this concept form confirms locally and does not send email.</p>
      </form>
    </section>
  );
}

function AlterContactBrief({ site }: { site: CaseStudy }) {
  const [submitted, setSubmitted] = useState(false);
  const formCopy = contactCopy(site);
  return (
    <section className="demo-tab-panel alter-contact-brief" id="contact" aria-labelledby="alter-contact-title">
      <div className="alter-contact-head"><p className="demo-kicker">{site.contact.eyebrow}</p><h2 id="alter-contact-title">Commission brief.</h2><p>{site.contact.copy}</p></div>
      <form className="alter-brief-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
        <div className="alter-field-row"><span>01</span><label><small>{formCopy.contactLabel}</small><input name="name" type="text" autoComplete="name" required /></label><label><small>Email</small><input name="email" type="email" autoComplete="email" required /></label></div>
        <div className="alter-field-row"><span>02</span><label><small>{formCopy.locationLabel}</small><input name="location" type="text" placeholder={formCopy.locationPlaceholder} required /></label><label><small>{formCopy.typeLabel}</small><select name="architectureType" required defaultValue=""><option value="" disabled>Select one</option>{formCopy.options.map((option) => <option key={option}>{option}</option>)}</select></label></div>
        <div className="alter-field-row alter-field-row-wide"><span>03</span><label><small>{formCopy.scopeLabel}</small><input name="scope" type="text" placeholder={formCopy.placeholder} required /></label></div>
        <div className="alter-field-row alter-field-row-wide"><span>04</span><label><small>{formCopy.messageLabel}</small><textarea name="message" rows={6} placeholder={formCopy.messagePlaceholder} required /></label></div>
        <button type="submit" className="alter-index-button">{formCopy.button}</button>
        {submitted ? <p className="demo-form-success" role="status">Thank you — the studio would review the brief against current capacity.</p> : null}
        <p className="demo-form-note">Preview note — this concept form confirms locally and does not send email.</p>
      </form>
    </section>
  );
}

function MaisonContactPanel({ site }: { site: CaseStudy }) {
  const [submitted, setSubmitted] = useState(false);
  const formCopy = contactCopy(site);
  return (
    <section className="demo-tab-panel maison-contact-panel" id="contact" aria-labelledby="maison-contact-title">
      <div className="maison-contact-dossier">
        <div className="maison-contact-copy"><p className="demo-kicker">{site.contact.eyebrow}</p><h2 id="maison-contact-title">Private appointment request.</h2><p>{site.contact.copy}</p><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></div>
        <form className="maison-dossier-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
          <div className="maison-dossier-grid"><label><span>{formCopy.contactLabel}</span><input name="representative" type="text" autoComplete="name" required /></label><label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label><label><span>{formCopy.locationLabel}</span><input name="location" type="text" placeholder={formCopy.locationPlaceholder} required /></label><label><span>{formCopy.typeLabel}</span><select name="propertyType" required defaultValue=""><option value="" disabled>Select one</option>{formCopy.options.map((option) => <option key={option}>{option}</option>)}</select></label></div>
          <label><span>{formCopy.scopeLabel}</span><input name="appointment" type="text" placeholder={formCopy.placeholder} required /></label>
          <label className="maison-confidential-note"><span>{formCopy.messageLabel}</span><textarea name="message" rows={8} placeholder={formCopy.messagePlaceholder} required /></label>
          <button type="submit" className="maison-quiet-button">{formCopy.button}</button>
          {submitted ? <p className="demo-form-success" role="status">Thank you — the atelier would respond privately with appointment availability.</p> : null}
          <p className="demo-form-note">Preview note — this concept form confirms locally and does not send email.</p>
        </form>
      </div>
    </section>
  );
}
