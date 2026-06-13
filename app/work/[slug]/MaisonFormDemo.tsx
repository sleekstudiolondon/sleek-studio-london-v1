"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { CaseStudy } from "@/lib/caseStudies";
import { type DemoTab, useDemoNavigation, useReducedMotion } from "./DemoShared";

const atelierPanels = [
  { title: "Bespoke furniture", copy: "Quietly exact pieces developed for the room, the client, and the long life of the property.", detail: "Frame, finish, upholstery, and placement are resolved with the makers before installation." },
  { title: "Specialist procurement", copy: "Stone, textiles, antiques, art, lighting, and objects sourced through a trusted international network.", detail: "Procurement is managed discreetly with samples, approvals, and documented provenance." },
  { title: "Craft network", copy: "Makers, restorers, upholsterers, metalworkers, and finishers brought into the project at the right moment.", detail: "Each craft decision is selected for atmosphere and longevity, not spectacle." },
  { title: "Installation", copy: "A precise final layer, coordinated room by room so the property feels complete when the doors open.", detail: "Placement, styling, lighting levels, flowers, and handover notes are handled by the studio." },
  { title: "Stewardship", copy: "Aftercare, seasonal adjustments, and future acquisitions held with the same discretion as the first appointment.", detail: "The relationship continues quietly when a home needs to evolve." },
];

type LookbookSlide = {
  image: string;
  title: string;
  category: string;
  location: string;
  caption: string;
  target: string;
  position: string;
};

const focusAreas = [
  { label: "Residences", imageIndex: 0, copy: "Layered homes where ceremony and privacy can sit comfortably in the same room." },
  { label: "Hospitality", imageIndex: 2, copy: "Guest spaces choreographed around arrival, service, retreat, and memory." },
  { label: "Atelier", imageIndex: 1, copy: "Bespoke furniture, procurement, installation, and stewardship held in one private process." },
];

function MaisonNav({ site, tabs, activeTab, selectTab }: { site: CaseStudy; tabs: DemoTab[]; activeTab: string; selectTab: (key: string) => void }) {
  const currentIndex = Math.max(0, tabs.findIndex((tab) => tab.key === activeTab));
  const current = tabs[currentIndex] ?? tabs[0];
  return (
    <header className="maison2-nav">
      <button type="button" className="maison2-wordmark" onClick={() => selectTab("home")}>{site.title}</button>
      <div className="maison2-current" aria-live="polite"><strong>{current?.label}</strong></div>
      <nav className="maison2-link-rail" aria-label={`${site.title} editorial navigation`}>
        {tabs.map((item) => <button key={item.key} type="button" className={activeTab === item.key ? "is-active" : ""} onClick={() => selectTab(item.key)} aria-current={activeTab === item.key ? "page" : undefined}>{item.label}</button>)}
      </nav>
      <Link href="/work" className="maison2-return">Back to Sleek Studio</Link>
    </header>
  );
}

function getLookbookSlides(site: CaseStudy): LookbookSlide[] {
  const positions = ["center 58%", "center 48%", "center 62%", "center 42%"];
  return site.projects.map((project, index) => ({
    image: project.image,
    title: project.title,
    category: project.category,
    location: project.location,
    caption: project.description,
    target: "portfolio",
    position: positions[index] ?? "center",
  }));
}

function MaisonHome({ site, selectTab }: { site: CaseStudy; selectTab: (key: string) => void }) {
  const reducedMotion = useReducedMotion();
  const slides = getLookbookSlides(site);
  const [active, setActive] = useState(0);
  const [activeFocus, setActiveFocus] = useState(0);
  const current = slides[active] ?? slides[0];
  const focus = focusAreas[activeFocus];
  const focusSlide = slides[focus?.imageIndex ?? 0] ?? slides[0];

  useEffect(() => {
    if (reducedMotion || slides.length < 2) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [reducedMotion, slides.length]);

  return (
    <section className="maison2-page maison2-home" aria-labelledby="maison2-home-title">
      <div className="maison2-lookbook">
        <div className="maison2-reel-frame">
          {slides.map((slide, index) => <Image key={slide.title} src={slide.image} alt={index === active ? `${slide.title} by ${site.title}` : ""} width={2100} height={1400} priority={index === 0} className={index === active ? "maison2-reel-image is-active" : "maison2-reel-image"} style={{ objectPosition: slide.position }} sizes="(max-width: 900px) 100vw, 68vw" />)}
        </div>
        <div className="maison2-lookbook-copy">
          <p className="maison2-kicker">{site.hero.eyebrow}</p>
          <h1 id="maison2-home-title">{site.hero.title}</h1>
          <p>{site.hero.copy}</p>
          {current ? <div className="maison2-slide-caption"><span>{current.category} · {current.location}</span><strong>{current.title}</strong><p>{current.caption}</p></div> : null}
          <div className="maison2-section-links"><button type="button" onClick={() => selectTab("portfolio")}>Portfolio</button><button type="button" onClick={() => selectTab("atelier")}>Atelier</button><button type="button" onClick={() => selectTab("contact")}>Private appointment</button></div>
        </div>
        <div className="maison2-lookbook-index" aria-label="Lookbook index">
          {slides.map((slide, index) => <button key={slide.title} type="button" className={index === active ? "is-active" : ""} onClick={() => setActive(index)} onMouseEnter={() => setActive(index)}><span>{String(index + 1).padStart(2, "0")}</span>{slide.location}</button>)}
        </div>
      </div>
      <div className="maison2-editorial-statement"><p className="maison2-kicker">Private-client practice</p><h2>{site.philosophy.title}</h2><p>{site.philosophy.copy}</p></div>
      <div className="maison2-focus-selector">
        <div className="maison2-focus-controls">
          {focusAreas.map((item, index) => <button key={item.label} type="button" className={index === activeFocus ? "is-active" : ""} onClick={() => setActiveFocus(index)} onFocus={() => setActiveFocus(index)}><span>{String(index + 1).padStart(2, "0")}</span>{item.label}</button>)}
        </div>
        <div className="maison2-focus-copy"><p className="maison2-kicker">Studio focus</p><h2>{focus.label}</h2><p>{focus.copy}</p><button type="button" onClick={() => selectTab(focus.label === "Atelier" ? "atelier" : "portfolio")}>Explore {focus.label}</button></div>
        {focusSlide ? <Image src={focusSlide.image} alt={`${focus.label} focus by ${site.title}`} width={1200} height={860} className="maison2-image" style={{ objectPosition: focusSlide.position }} sizes="(max-width: 900px) 100vw, 44vw" loading="lazy" /> : null}
      </div>
      <div className="maison2-selected-preview">
        <div><p className="maison2-kicker">Selected commission</p><h2>{site.projects[0]?.title}</h2><p>{site.projects[0]?.description}</p><button type="button" onClick={() => selectTab("portfolio")}>Enter portfolio</button></div>
        {site.projects[0] ? <Image src={site.projects[0].image} alt={`${site.projects[0].title} commission preview`} width={1400} height={960} className="maison2-image" sizes="(max-width: 900px) 100vw, 48vw" loading="lazy" /> : null}
      </div>
      <div className="maison2-authority-strip">{site.press?.map((item) => <span key={item.source}>{item.source}</span>)}</div>
      <div className="maison2-process-teaser">
        {["Discretion", "Procurement", "Installation", "Stewardship"].map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3><p>{index === 0 ? "Private information, decision-makers, and site access are handled quietly." : index === 1 ? "Materials, makers, furniture, and objects are coordinated through the atelier." : index === 2 ? "Rooms are placed, lit, and styled with a controlled final layer." : "Aftercare keeps the home evolving without losing its original atmosphere."}</p></article>)}
      </div>
      <div className="maison2-private-cta"><p>For clients seeking discretion, atmosphere, and an exacting studio presence.</p><button type="button" onClick={() => selectTab("contact")}>Request a private appointment</button></div>
    </section>
  );
}

function MaisonStudio({ site }: { site: CaseStudy }) {
  return (
    <section className="maison2-page maison2-studio" id="studio" aria-labelledby="maison2-studio-title">
      <div className="maison2-studio-opening"><p className="maison2-kicker">Studio</p><h2 id="maison2-studio-title">An established practice for private homes, hotels, and international commissions.</h2><p>{site.philosophy.copy}</p></div>
      <div className="maison2-principals">{site.team?.map((person) => <article key={person.title}><span>Principal</span><h3>{person.title}</h3><p>{person.copy}</p></article>)}</div>
      <div className="maison2-international"><h3>International commissions coordinated through discretion, procurement, and exacting site presence.</h3><div>{["London townhouses", "Paris apartments", "Geneva villas", "Hospitality suites"].map((item) => <span key={item}>{item}</span>)}</div></div>
      <div className="maison2-timeline">{site.process?.map((step, index) => <article key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>
    </section>
  );
}

function MaisonPortfolio({ site, selectTab }: { site: CaseStudy; selectTab: (key: string) => void }) {
  const [feature, ...support] = site.projects;
  const marquee = [...site.projects, ...site.projects];
  return (
    <section className="maison2-page maison2-portfolio" id="portfolio" aria-labelledby="maison2-portfolio-title">
      <div className="maison2-section-head maison2-portfolio-opening"><p className="maison2-kicker">Portfolio</p><h2 id="maison2-portfolio-title">Residences, hospitality rooms, and atelier commissions held as one private body of work.</h2><p>Maison Form presents each commission as a sequence of arrival, atmosphere, craft, and stewardship. The portfolio moves between private homes, hospitality settings, and the bespoke pieces that make them feel authored.</p></div>
      <div className="maison2-marquee" aria-label="Continuous Maison Form portfolio reel">
        <div className="maison2-marquee-track">
          {marquee.map((project, index) => <figure key={`${project.title}-${index}`}><Image src={project.image} alt={`${project.title} by ${site.title}`} width={820} height={560} className="maison2-image" sizes="(max-width: 900px) 72vw, 360px" loading="lazy" /><figcaption><span>{project.category}</span>{project.title}</figcaption></figure>)}
        </div>
      </div>
      {feature ? <article className="maison2-portfolio-feature"><Image src={feature.image} alt={`${feature.title} by ${site.title}`} width={1600} height={1060} className="maison2-image" sizes="(max-width: 900px) 100vw, 54vw" loading="eager" /><div><p className="maison2-kicker">Featured commission</p><h3>{feature.title}</h3><p>{feature.description}</p><dl><div><dt>Location</dt><dd>{feature.location}</dd></div><div><dt>Category</dt><dd>{feature.category}</dd></div><div><dt>Atmosphere</dt><dd>Layered, private, exacting</dd></div></dl></div></article> : null}
      <div className="maison2-portfolio-categories">
        {[
          ["Private residences", "Homes composed around privacy, ceremony, daily rhythm, and a restrained final layer."],
          ["Hospitality", "Guest spaces designed with operational grace, atmospheric lighting, and a memory of arrival."],
          ["Atelier commissions", "Bespoke furniture, procurement, craft coordination, and installation stewardship."],
        ].map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
      </div>
      <div className="maison2-portfolio-notes">
        {support.map((project) => <article key={project.title}><span>{project.location} / {project.year}</span><h3>{project.title}</h3><p>{project.description}</p></article>)}
      </div>
      <div className="maison2-private-cta"><p>For private clients, portfolio conversations begin with discretion, property context, and the atmosphere the rooms should hold.</p><button type="button" onClick={() => selectTab("contact")}>Request a private appointment</button></div>
    </section>
  );
}

function MaisonAtelier({}: { site: CaseStudy }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="maison2-page maison2-atelier" id="atelier" aria-labelledby="maison2-atelier-title">
      <div className="maison2-section-head"><p className="maison2-kicker">Atelier</p><h2 id="maison2-atelier-title">Craft, procurement, and the final private layer.</h2><p>The atelier coordinates makers, finishes, furniture, art advisory, and installation with quiet precision.</p></div>
      <div className="maison2-atelier-panels">{atelierPanels.map((panel, index) => <article key={panel.title} className={open === index ? "is-open" : ""}><button type="button" onClick={() => setOpen(index)} onFocus={() => setOpen(index)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{panel.title}</strong></button><p>{panel.copy}</p><em>{panel.detail}</em></article>)}</div>
    </section>
  );
}

function MaisonPress({ site }: { site: CaseStudy }) {
  return (
    <section className="maison2-page maison2-press" id="press" aria-labelledby="maison2-press-title">
      <div className="maison2-section-head"><p className="maison2-kicker">Press & recognition</p><h2 id="maison2-press-title">Quiet authority, carried by the rooms themselves.</h2></div>
      <div className="maison2-press-index">{site.press?.map((item, index) => <blockquote key={item.source}><span>{String(index + 1).padStart(2, "0")}</span><cite>{item.source}</cite><p>{item.quote}</p></blockquote>)}</div>
      <div className="maison2-recognition-strip"><span>Recognition</span><span>Private residences</span><span>Hospitality interiors</span><span>International commissions</span></div>
    </section>
  );
}

function MaisonContact({ site }: { site: CaseStudy }) {
  const [submitted, setSubmitted] = useState(false);
  const [dossier, setDossier] = useState({
    propertyType: "Private residence",
    location: "London",
    focus: "Residence planning",
    privacy: "Principal-led and discreet",
    appointment: "Private studio appointment",
    areas: "Arrival, dining, principal suite",
  });

  const updateDossier = (key: keyof typeof dossier, value: string) => {
    setDossier((current) => ({ ...current, [key]: value }));
  };

  return (
    <section className="maison2-page maison2-contact" id="contact" aria-labelledby="maison2-contact-title">
      <div className="maison2-dossier-intro"><p className="maison2-kicker">{site.contact.eyebrow}</p><h2 id="maison2-contact-title">Private appointment</h2><p>{site.contact.copy}</p><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a><span>All enquiries handled in confidence.</span></div>
      <div className="maison2-dossier-builder" aria-label="Private commission dossier builder">
        <div className="maison2-builder-head">
          <p className="maison2-kicker">Private dossier builder</p>
          <h3>Prepare the shape of a confidential appointment.</h3>
          <p>Select the details that best describe the commission. This stays local to the preview and prepares a refined summary only.</p>
        </div>
        <div className="maison2-builder-grid">
          <label><span>Property type</span><select value={dossier.propertyType} onChange={(event) => updateDossier("propertyType", event.target.value)}><option>Private residence</option><option>International residence</option><option>Hospitality suite</option><option>Atelier procurement</option></select></label>
          <label><span>Location</span><select value={dossier.location} onChange={(event) => updateDossier("location", event.target.value)}><option>London</option><option>Paris</option><option>Geneva</option><option>New York</option><option>Private estate</option></select></label>
          <label><span>Project focus</span><select value={dossier.focus} onChange={(event) => updateDossier("focus", event.target.value)}><option>Residence planning</option><option>Hospitality atmosphere</option><option>Atelier procurement</option><option>Installation stewardship</option></select></label>
          <label><span>Privacy level</span><select value={dossier.privacy} onChange={(event) => updateDossier("privacy", event.target.value)}><option>Principal-led and discreet</option><option>Private office coordination</option><option>Family office introduction</option><option>Representative-led appointment</option></select></label>
          <label><span>Appointment type</span><select value={dossier.appointment} onChange={(event) => updateDossier("appointment", event.target.value)}><option>Private studio appointment</option><option>Site visit</option><option>Private office call</option><option>Atelier review</option></select></label>
          <label><span>Key rooms / areas</span><input value={dossier.areas} onChange={(event) => updateDossier("areas", event.target.value)} /></label>
        </div>
        <div className="maison2-builder-summary">
          <span>Private dossier prepared</span>
          <p>Recommended next step: {dossier.appointment.toLowerCase()}.</p>
          <p>Focus areas: {dossier.focus.toLowerCase()}, {dossier.propertyType.toLowerCase()}, {dossier.areas.toLowerCase()}.</p>
          <p>The atelier would respond privately with appointment availability for {dossier.location}.</p>
        </div>
      </div>
      <form className={submitted ? "maison2-dossier is-submitted" : "maison2-dossier"} onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
        {submitted ? <div className="maison2-seal" role="status"><span>Request received privately</span><p>Thank you — the atelier would respond privately with appointment availability.</p></div> : (
          <>
            <fieldset><legend>Representative</legend><label><span>Representative / assistant contact</span><input name="representative" type="text" autoComplete="name" required /></label><label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label></fieldset>
            <fieldset><legend>Property</legend><label><span>Preferred appointment location</span><input name="location" type="text" placeholder="London, Paris, Geneva, New York, private estate…" required /></label><label><span>Property type</span><select name="propertyType" defaultValue="" required><option value="" disabled>Select one</option><option>Private residence</option><option>International residence</option><option>Hospitality suite</option><option>Atelier procurement</option></select></label></fieldset>
            <fieldset><legend>Appointment</legend><label><span>Appointment preference</span><input name="appointment" type="text" placeholder="Principal introduction, private office call, atelier appointment, or site visit" required /></label></fieldset>
            <fieldset className="maison2-confidential"><legend>Confidential note</legend><label><span>Confidential project note</span><textarea name="message" rows={9} placeholder="Share property context, decision-makers, privacy considerations, and desired appointment cadence." required /></label></fieldset>
            <button type="submit">Request a private appointment</button>
            <p className="maison2-note">Preview note — this concept form confirms locally and does not send email.</p>
          </>
        )}
      </form>
    </section>
  );
}

export default function MaisonFormDemo({ site }: { site: CaseStudy }) {
  const { tabs, activeTab, selectTab } = useDemoNavigation(site);
  return (
    <article className="demo-site maison2-site" id="home">
      <MaisonNav site={site} tabs={tabs} activeTab={activeTab} selectTab={selectTab} />
      <main>
        {activeTab === "home" ? <MaisonHome site={site} selectTab={selectTab} /> : null}
        {activeTab === "studio" ? <MaisonStudio site={site} /> : null}
        {activeTab === "portfolio" ? <MaisonPortfolio site={site} selectTab={selectTab} /> : null}
        {activeTab === "atelier" ? <MaisonAtelier site={site} /> : null}
        {activeTab === "press" ? <MaisonPress site={site} /> : null}
        {activeTab === "contact" ? <MaisonContact site={site} /> : null}
      </main>
    </article>
  );
}
