"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { CaseStudy, DemoProject } from "@/lib/caseStudies";
import { type DemoTab, useDemoNavigation } from "./DemoShared";

const atelierPanels = [
  { title: "Bespoke furniture", copy: "Quietly exact pieces developed for the room, the client, and the long life of the property.", detail: "Frame, finish, upholstery, and placement are resolved with the makers before installation." },
  { title: "Specialist procurement", copy: "Stone, textiles, antiques, art, lighting, and objects sourced through a trusted international network.", detail: "Procurement is managed discreetly with samples, approvals, and documented provenance." },
  { title: "Craft network", copy: "Makers, restorers, upholsterers, metalworkers, and finishers brought into the project at the right moment.", detail: "Each craft decision is selected for atmosphere and longevity, not spectacle." },
  { title: "Installation", copy: "A precise final layer, coordinated room by room so the property feels complete when the doors open.", detail: "Placement, styling, lighting levels, flowers, and handover notes are handled by the studio." },
  { title: "Stewardship", copy: "Aftercare, seasonal adjustments, and future acquisitions held with the same discretion as the first appointment.", detail: "The relationship continues quietly when a home needs to evolve." },
];

const disciplineIndex = [
  { title: "Private residences", copy: "Layered homes composed around arrival, privacy, ceremony, and the daily rituals of the principal client." },
  { title: "Hospitality interiors", copy: "Guest spaces with atmosphere, operational grace, and a cinematic memory of service." },
  { title: "Atelier procurement", copy: "Furniture, art, antiques, textiles, lighting, and makers coordinated through a single private process." },
  { title: "Installation stewardship", copy: "Final placement, handover, aftercare, and future acquisitions held quietly by the studio." },
];

const projectDetailNotes = [
  { notes: "A sequence of formal and informal rooms balanced through stone, antique oak, silk texture, and controlled shadow.", materials: "Limestone, dark oak, silk velvet, bronze, handwoven rugs", service: "Private residence / installation stewardship" },
  { notes: "A quieter villa study where lake light is softened through pale plaster, linen, and low furniture profiles.", materials: "Pale plaster, linen, travertine, smoked timber", service: "Private residence / atelier procurement" },
  { notes: "An intimate hospitality suite shaped around evening arrival, lacquered detail, and private dining service.", materials: "Lacquer, bronze mirror, mohair, smoked glass", service: "Hospitality interiors / bespoke furniture" },
  { notes: "A members dining room with a slower rhythm: deep banquettes, candlelight, and concealed service circulation.", materials: "Walnut, leather, aged brass, low-gloss plaster", service: "Hospitality interiors / installation stewardship" },
];

function MaisonNav({ site, tabs, activeTab, selectTab }: { site: CaseStudy; tabs: DemoTab[]; activeTab: string; selectTab: (key: string) => void }) {
  const [open, setOpen] = useState(false);
  const current = tabs.find((tab) => tab.key === activeTab) ?? tabs[0];
  const handleSelect = (key: string) => { selectTab(key); setOpen(false); };

  return (
    <header className="maison3-nav">
      <button type="button" className="maison3-wordmark" onClick={() => handleSelect("home")}>{site.title}</button>
      <div className="maison3-current" aria-live="polite"><span>Current</span><strong>{current?.label}</strong></div>
      <div className={open ? "maison3-menu is-open" : "maison3-menu"} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        <button type="button" className="maison3-menu-trigger" aria-expanded={open} aria-controls="maison-navigation-menu" onClick={() => setOpen((value) => !value)} onFocus={() => setOpen(true)}><span>Navigation</span><strong>Menu</strong></button>
        <div id="maison-navigation-menu" className="maison3-menu-panel" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
          {tabs.map((item) => <button key={item.key} type="button" className={activeTab === item.key ? "is-active" : ""} onClick={() => handleSelect(item.key)} aria-current={activeTab === item.key ? "page" : undefined}>{item.label}</button>)}
          <Link href="/work">Back to Sleek Studio</Link>
        </div>
      </div>
    </header>
  );
}

function MaisonHome({ site, selectTab }: { site: CaseStudy; selectTab: (key: string) => void }) {
  const [activeDiscipline, setActiveDiscipline] = useState(0);
  const discipline = disciplineIndex[activeDiscipline];
  return (
    <section className="maison2-page maison3-home" aria-labelledby="maison3-home-title">
      <div className="maison3-text-hero">
        <p className="maison2-kicker">{site.hero.eyebrow}</p>
        <h1 id="maison3-home-title">Interiors with presence, provenance, and quiet theatre.</h1>
        <p>{site.hero.copy}</p>
        <div className="maison3-hero-actions"><button type="button" onClick={() => selectTab("portfolio")}>View selected commissions</button><button type="button" onClick={() => selectTab("contact")}>Request a private appointment</button></div>
      </div>
      <div className="maison3-positioning"><p>Maison Form works with private clients, hospitality owners, and representatives who require atmosphere, discretion, and a studio capable of carrying a project from first idea to the final placed object.</p></div>
      <div className="maison3-discipline-selector" aria-label="Maison Form disciplines">
        <div className="maison3-discipline-controls">
          {disciplineIndex.map((item, index) => <button key={item.title} type="button" className={index === activeDiscipline ? "is-active" : ""} onMouseEnter={() => setActiveDiscipline(index)} onFocus={() => setActiveDiscipline(index)} onClick={() => setActiveDiscipline(index)}>{item.title}</button>)}
        </div>
        <div className="maison3-discipline-copy"><p className="maison2-kicker">Discipline</p><h2>{discipline.title}</h2><p>{discipline.copy}</p></div>
      </div>
      <div className="maison3-commission-teaser"><div><p className="maison2-kicker">Selected commissions</p><h2>Private residences, dining rooms, suites, and atelier pieces held in one authored portfolio.</h2></div><button type="button" onClick={() => selectTab("portfolio")}>Enter portfolio</button></div>
      <div className="maison2-process-teaser">
        {["Discretion", "Procurement", "Installation", "Stewardship"].map((item, index) => <article key={item}><span>{item}</span><h3>{item}</h3><p>{index === 0 ? "Private information, decision-makers, and site access are handled quietly." : index === 1 ? "Materials, makers, furniture, and objects are coordinated through the atelier." : index === 2 ? "Rooms are placed, lit, and styled with a controlled final layer." : "Aftercare keeps the home evolving without losing its original atmosphere."}</p></article>)}
      </div>
      <div className="maison2-authority-strip">{site.press?.map((item) => <span key={item.source}>{item.source}</span>)}</div>
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
      <div className="maison2-timeline">{site.process?.map((step) => <article key={step.title}><span>{step.title}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>
      <div className="maison3-closing-rule"><p>The practice is deliberately private: senior attention, quiet coordination, and careful handover are treated as part of the design work.</p></div>
    </section>
  );
}

function MaisonProjectDetail({ project, index, selectTab }: { project: DemoProject; index: number; selectTab: (key: string) => void }) {
  const detail = projectDetailNotes[index % projectDetailNotes.length];
  return (
    <article className="maison3-project-detail" aria-live="polite">
      <div><p className="maison2-kicker">Project detail</p><h3>{project.title}</h3><p>{project.description} {detail.notes}</p></div>
      <dl><div><dt>Location</dt><dd>{project.location}</dd></div><div><dt>Type</dt><dd>{project.category}</dd></div><div><dt>Materials</dt><dd>{detail.materials}</dd></div><div><dt>Service area</dt><dd>{detail.service}</dd></div></dl>
      <button type="button" onClick={() => selectTab("contact")}>Request a private appointment</button>
    </article>
  );
}

function MaisonPortfolio({ site, selectTab }: { site: CaseStudy; selectTab: (key: string) => void }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = site.projects[selectedIndex] ?? site.projects[0];
  const marquee = [...site.projects, ...site.projects];
  return (
    <section className="maison2-page maison2-portfolio" id="portfolio" aria-labelledby="maison2-portfolio-title">
      <div className="maison2-section-head maison2-portfolio-opening"><p className="maison2-kicker">Portfolio</p><h2 id="maison2-portfolio-title">Residences, hospitality rooms, and atelier commissions held as one private body of work.</h2><p>Maison Form presents each commission as a sequence of arrival, atmosphere, craft, and stewardship. Select a moving plate to open the project notes.</p></div>
      <div className="maison2-marquee" aria-label="Continuous Maison Form portfolio reel">
        <div className="maison2-marquee-track">
          {marquee.map((project, index) => {
            const realIndex = index % site.projects.length;
            return <button key={`${project.title}-${index}`} type="button" className="maison3-marquee-card" onClick={() => setSelectedIndex(realIndex)} onFocus={() => setSelectedIndex(realIndex)} onMouseEnter={() => setSelectedIndex(realIndex)}><Image src={project.image} alt={`${project.title} by ${site.title}`} width={820} height={560} className="maison2-image" sizes="(max-width: 900px) 72vw, 360px" loading="lazy" /><span><small>{project.category} · {project.location}</small><strong>{project.title}</strong><em>{project.description}</em></span></button>;
          })}
        </div>
      </div>
      {selected ? <MaisonProjectDetail project={selected} index={selectedIndex} selectTab={selectTab} /> : null}
      <div className="maison2-portfolio-categories">
        {["Private residences", "Hospitality", "Atelier commissions"].map((title, index) => <article key={title}><h3>{title}</h3><p>{disciplineIndex[index].copy}</p></article>)}
      </div>
      <div className="maison2-portfolio-notes">{site.projects.map((project) => <article key={project.title}><span>{project.location} / {project.year}</span><h3>{project.title}</h3><p>{project.description}</p></article>)}</div>
      <div className="maison2-private-cta"><p>For private clients, portfolio conversations begin with discretion, property context, and the atmosphere the rooms should hold.</p><button type="button" onClick={() => selectTab("contact")}>Request a private appointment</button></div>
    </section>
  );
}

function MaisonAtelier({ site, selectTab }: { site: CaseStudy; selectTab: (key: string) => void }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="maison2-page maison2-atelier" id="atelier" aria-labelledby="maison2-atelier-title">
      <div className="maison2-section-head"><p className="maison2-kicker">Atelier</p><h2 id="maison2-atelier-title">Craft, procurement, and the final private layer.</h2><p>The atelier coordinates makers, finishes, furniture, art advisory, and installation with quiet precision.</p></div>
      <div className="maison2-atelier-panels">{atelierPanels.map((panel, index) => <article key={panel.title} className={open === index ? "is-open" : ""}><button type="button" onClick={() => setOpen(index)} onFocus={() => setOpen(index)}><span>{panel.title}</span><strong>{panel.title}</strong></button><p>{panel.copy}</p><em>{panel.detail}</em></article>)}</div>
      <div className="maison3-closing-rule"><p>{site.title} treats procurement and installation as atmosphere, not administration: each object is selected for provenance, proportion, and the way it holds the room.</p><button type="button" onClick={() => selectTab("contact")}>Discuss atelier support</button></div>
    </section>
  );
}

function MaisonPress({ site }: { site: CaseStudy }) {
  return (
    <section className="maison2-page maison2-press" id="press" aria-labelledby="maison2-press-title">
      <div className="maison2-section-head"><p className="maison2-kicker">Press & recognition</p><h2 id="maison2-press-title">Quiet authority, carried by the rooms themselves.</h2></div>
      <div className="maison2-press-index">{site.press?.map((item) => <blockquote key={item.source}><span>Recognition</span><cite>{item.source}</cite><p>{item.quote}</p></blockquote>)}</div>
      <div className="maison2-recognition-strip"><span>Private residences</span><span>Hospitality interiors</span><span>International commissions</span><span>Atelier procurement</span></div>
      <div className="maison3-closing-rule"><p>Press is intentionally quiet: the studio’s reputation is built through completed rooms, private referrals, and projects that can remain discreet.</p></div>
    </section>
  );
}

function MaisonContact({ site }: { site: CaseStudy }) {
  const [submitted, setSubmitted] = useState(false);
  const [dossier, setDossier] = useState({ propertyType: "Private residence", location: "London", focus: "Residence planning", privacy: "Principal-led and discreet", appointment: "Private studio appointment", areas: "Arrival, dining, principal suite", notes: "" });
  const updateDossier = (key: keyof typeof dossier, value: string) => setDossier((current) => ({ ...current, [key]: value }));
  return (
    <section className="maison2-page maison3-contact" id="contact" aria-labelledby="maison2-contact-title">
      <div className="maison3-contact-intro"><p className="maison2-kicker">{site.contact.eyebrow}</p><h2 id="maison2-contact-title">Private appointment</h2><p>{site.contact.copy}</p><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a><span>All enquiries handled in confidence.</span></div>
      <div className="maison2-dossier-builder" aria-label="Private commission dossier builder">
        <div className="maison2-builder-head"><p className="maison2-kicker">Private dossier builder</p><h3>Prepare the shape of a confidential appointment.</h3><p>Select the details that best describe the commission. This stays local to the preview and prepares a refined summary only.</p></div>
        <div className="maison2-builder-grid">
          <label><span>Property type</span><select value={dossier.propertyType} onChange={(event) => updateDossier("propertyType", event.target.value)}><option>Private residence</option><option>International residence</option><option>Hospitality suite</option><option>Atelier procurement</option></select></label>
          <label><span>Location</span><select value={dossier.location} onChange={(event) => updateDossier("location", event.target.value)}><option>London</option><option>Paris</option><option>Geneva</option><option>New York</option><option>Private estate</option></select></label>
          <label><span>Project focus</span><select value={dossier.focus} onChange={(event) => updateDossier("focus", event.target.value)}><option>Residence planning</option><option>Hospitality atmosphere</option><option>Atelier procurement</option><option>Installation stewardship</option></select></label>
          <label><span>Privacy level</span><select value={dossier.privacy} onChange={(event) => updateDossier("privacy", event.target.value)}><option>Principal-led and discreet</option><option>Private office coordination</option><option>Family office introduction</option><option>Representative-led appointment</option></select></label>
          <label><span>Appointment type</span><select value={dossier.appointment} onChange={(event) => updateDossier("appointment", event.target.value)}><option>Private studio appointment</option><option>Site visit</option><option>Private office call</option><option>Atelier review</option></select></label>
          <label><span>Key rooms / areas</span><input value={dossier.areas} onChange={(event) => updateDossier("areas", event.target.value)} /></label>
          <label className="maison3-builder-notes"><span>Notes for the principal or private office</span><textarea value={dossier.notes} onChange={(event) => updateDossier("notes", event.target.value)} rows={5} placeholder="Share privacy considerations, decision-makers, or rooms that require particular attention." /></label>
        </div>
        <div className="maison2-builder-summary"><span>Private dossier prepared</span><p>Recommended next step: private appointment.</p><p>Focus areas: {dossier.focus.toLowerCase()}, {dossier.propertyType.toLowerCase()}, {dossier.areas.toLowerCase()}.</p><p>The atelier would respond privately with appointment availability.</p></div>
      </div>
      <form className={submitted ? "maison2-dossier is-submitted" : "maison2-dossier"} onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
        {submitted ? <div className="maison2-seal" role="status"><span>Request received privately</span><p>Thank you — the atelier would respond privately with appointment availability.</p></div> : <>
          <fieldset><legend>Representative</legend><label><span>Representative / assistant contact</span><input name="representative" type="text" autoComplete="name" required /></label><label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label></fieldset>
          <fieldset><legend>Property</legend><label><span>Preferred appointment location</span><input name="location" type="text" placeholder="London, Paris, Geneva, New York, private estate…" required /></label><label><span>Property type</span><select name="propertyType" defaultValue="" required><option value="" disabled>Select one</option><option>Private residence</option><option>International residence</option><option>Hospitality suite</option><option>Atelier procurement</option></select></label></fieldset>
          <fieldset><legend>Appointment</legend><label><span>Appointment preference</span><input name="appointment" type="text" placeholder="Principal introduction, private office call, atelier appointment, or site visit" required /></label></fieldset>
          <fieldset className="maison2-confidential"><legend>Confidential note</legend><label><span>Confidential project note</span><textarea name="message" rows={9} placeholder="Share property context, decision-makers, privacy considerations, and desired appointment cadence." required /></label></fieldset>
          <button type="submit">Request a private appointment</button><p className="maison2-note">Preview note — this concept form confirms locally and does not send email.</p>
        </>}
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
        {activeTab === "atelier" ? <MaisonAtelier site={site} selectTab={selectTab} /> : null}
        {activeTab === "press" ? <MaisonPress site={site} /> : null}
        {activeTab === "contact" ? <MaisonContact site={site} /> : null}
      </main>
    </article>
  );
}
