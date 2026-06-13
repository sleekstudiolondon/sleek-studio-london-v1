"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { CaseStudy, DemoProject } from "@/lib/caseStudies";
import { type DemoTab, useDemoNavigation } from "./DemoShared";

function JohnNav({ site, tabs, activeTab, selectTab }: { site: CaseStudy; tabs: DemoTab[]; activeTab: string; selectTab: (key: string) => void }) {
  return (
    <header className="john-demo-nav">
      <button type="button" className="john-demo-brand" onClick={() => selectTab("home")}>{site.title}</button>
      <nav aria-label={`${site.title} website navigation`}>
        {tabs.map((item) => (
          <button key={item.key} type="button" className={activeTab === item.key ? "is-active" : ""} onClick={() => selectTab(item.key)} aria-current={activeTab === item.key ? "page" : undefined}>{item.label}</button>
        ))}
      </nav>
      <Link href="/work" className="john-demo-return">← Sleek Studio</Link>
    </header>
  );
}

function JohnHome({ site, selectTab }: { site: CaseStudy; selectTab: (key: string) => void }) {
  const feature = site.projects[0];
  return (
    <section className="john-page john-home" aria-labelledby="john-home-title">
      <div className="john-hero">
        <div className="john-hero-copy">
          <p className="john-kicker">{site.hero.eyebrow}</p>
          <h1 id="john-home-title">{site.hero.title}</h1>
          <p>{site.hero.copy}</p>
          <div className="john-actions">
            <button type="button" onClick={() => selectTab("portfolio")}>View residences</button>
            <button type="button" onClick={() => selectTab("contact")}>Send a note</button>
          </div>
        </div>
        <div className="john-hero-image">
          <Image src={site.hero.image} alt={`${site.title} interior atmosphere`} width={1800} height={1300} className="john-image" sizes="(max-width: 900px) 100vw, 52vw" priority />
        </div>
      </div>
      <div className="john-home-note">
        <p className="john-kicker">A note from John</p>
        <blockquote>“The best rooms rarely announce themselves. They settle around the people who live there, becoming softer and more useful with time.”</blockquote>
      </div>
      {feature ? (
        <article className="john-feature-story">
          <div>
            <p className="john-kicker">Home story</p>
            <h2>{feature.title}</h2>
            <p>{feature.description} The work begins with light, then moves through texture, storage, and the pieces a client reaches for every day.</p>
          </div>
          <Image src={feature.image} alt={`${feature.title} by ${site.title}`} width={1300} height={900} className="john-image" sizes="(max-width: 900px) 100vw, 42vw" loading="lazy" />
        </article>
      ) : null}
    </section>
  );
}

function JohnStudio({ site }: { site: CaseStudy }) {
  return (
    <section className="john-page john-studio" id="studio" aria-labelledby="john-studio-title">
      <div className="john-section-intro">
        <p className="john-kicker">Studio</p>
        <h2 id="john-studio-title">{site.philosophy.title}</h2>
        <p>{site.philosophy.copy}</p>
      </div>
      <div className="john-bio-card">
        {site.bio ? <Image src={site.bio.image} alt={site.bio.title} width={900} height={1100} className="john-image" sizes="(max-width: 900px) 100vw, 32vw" loading="lazy" /> : null}
        <div>
          <p className="john-kicker">Designer</p>
          <h3>{site.bio?.title}</h3>
          <p>{site.bio?.copy}</p>
        </div>
      </div>
      <div className="john-room-notes" aria-label="Room notes">
        {[
          ["Light", "The day’s natural rhythm decides where the room should feel open, shaded, or quiet."],
          ["Texture", "Linen, oak, stone, and antique surfaces are layered until the space feels collected."],
          ["Daily ritual", "Every plan is checked against how morning, meals, reading, and rest actually happen."],
        ].map(([title, copy]) => <article key={title}><span>{title}</span><p>{copy}</p></article>)}
      </div>
    </section>
  );
}

function JohnPortfolio({ site }: { site: CaseStudy }) {
  const [feature, ...studies] = site.projects;
  return (
    <section className="john-page john-portfolio" id="portfolio" aria-labelledby="john-portfolio-title">
      <div className="john-section-intro">
        <p className="john-kicker">Portfolio</p>
        <h2 id="john-portfolio-title">Selected residences and quiet room studies.</h2>
      </div>
      {feature ? <JohnProjectFeature site={site} project={feature} /> : null}
      <div className="john-room-study-grid">
        {studies.map((project) => <JohnRoomStudy key={project.title} site={site} project={project} />)}
      </div>
    </section>
  );
}

function JohnProjectFeature({ site, project }: { site: CaseStudy; project: DemoProject }) {
  return (
    <article className="john-project-feature">
      <Image src={project.image} alt={`${project.title} by ${site.title}`} width={1500} height={1000} className="john-image" sizes="(max-width: 900px) 100vw, 54vw" loading="eager" />
      <div>
        <span>{project.location} · {project.year}</span>
        <h3>{project.title}</h3>
        <p>{project.description} A calm sequence of rooms designed to feel useful first, beautiful second, and quietly richer over time.</p>
      </div>
    </article>
  );
}

function JohnRoomStudy({ site, project }: { site: CaseStudy; project: DemoProject }) {
  return (
    <article className="john-room-study">
      <Image src={project.image} alt={`${project.title} by ${site.title}`} width={900} height={680} className="john-image" sizes="(max-width: 900px) 100vw, 38vw" loading="lazy" />
      <span>{project.category} · {project.location}</span>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </article>
  );
}

function JohnServices({ site }: { site: CaseStudy }) {
  return (
    <section className="john-page john-services" id="services" aria-labelledby="john-services-title">
      <div className="john-section-intro">
        <p className="john-kicker">Services</p>
        <h2 id="john-services-title">Interior guidance for homes that need care, not noise.</h2>
      </div>
      <div className="john-service-list">
        {site.services.map((service) => <article key={service.title}><h3>{service.title}</h3><p>{service.copy}</p></article>)}
      </div>
    </section>
  );
}

function JohnContact({ site }: { site: CaseStudy }) {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="john-page john-contact" id="contact" aria-labelledby="john-contact-title">
      <div className="john-contact-intro">
        <p className="john-kicker">{site.contact.eyebrow}</p>
        <h2 id="john-contact-title">Write directly to John.</h2>
        <p>{site.contact.copy}</p>
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
      </div>
      <form className="john-note-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
        <label><span>Name</span><input name="name" type="text" autoComplete="name" required /></label>
        <label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
        <label><span>Home location</span><input name="location" type="text" placeholder="London, Bath, Cotswolds, or wherever home is…" /></label>
        <label className="john-note-field"><span>Note for John</span><textarea name="message" rows={8} placeholder="Tell John about the home, the feeling you want, and what feels unresolved." required /></label>
        <button type="submit">Send John a note</button>
        {submitted ? <p className="john-success" role="status">Thank you — John would read this and reply personally.</p> : null}
        <p className="john-preview-note">Preview note — this concept form confirms locally and does not send email.</p>
      </form>
    </section>
  );
}

export default function JohnDemo({ site }: { site: CaseStudy }) {
  const { tabs, activeTab, selectTab } = useDemoNavigation(site);
  return (
    <article className="demo-site john-demo-site" id="home">
      <JohnNav site={site} tabs={tabs} activeTab={activeTab} selectTab={selectTab} />
      <main>
        {activeTab === "home" ? <JohnHome site={site} selectTab={selectTab} /> : null}
        {activeTab === "studio" ? <JohnStudio site={site} /> : null}
        {activeTab === "portfolio" ? <JohnPortfolio site={site} /> : null}
        {activeTab === "services" ? <JohnServices site={site} /> : null}
        {activeTab === "contact" ? <JohnContact site={site} /> : null}
      </main>
    </article>
  );
}
