"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { CaseStudy, DemoProject } from "@/lib/caseStudies";
import { type DemoTab, useDemoNavigation, useReducedMotion } from "./DemoShared";

const maisonRhythms = ["Arrival", "Dining", "Retreat", "Principal suite"];
const hospitalitySequence = ["Arrival", "Dining", "Suite", "Service"];
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
};

function MaisonNav({ site, tabs, activeTab, selectTab }: { site: CaseStudy; tabs: DemoTab[]; activeTab: string; selectTab: (key: string) => void }) {
  const currentIndex = Math.max(0, tabs.findIndex((tab) => tab.key === activeTab));
  const current = tabs[currentIndex] ?? tabs[0];
  return (
    <header className="maison2-nav">
      <button type="button" className="maison2-wordmark" onClick={() => selectTab("home")}>{site.title}</button>
      <div className="maison2-current" aria-live="polite"><span>{String(currentIndex + 1).padStart(2, "0")}</span><strong>{current?.label}</strong></div>
      <nav className="maison2-link-rail" aria-label={`${site.title} editorial navigation`}>
        {tabs.map((item) => <button key={item.key} type="button" className={activeTab === item.key ? "is-active" : ""} onClick={() => selectTab(item.key)} aria-current={activeTab === item.key ? "page" : undefined}>{item.label}</button>)}
      </nav>
      <Link href="/work" className="maison2-return">Sleek Studio</Link>
    </header>
  );
}

function getLookbookSlides(site: CaseStudy): LookbookSlide[] {
  return site.projects.map((project) => ({
    image: project.image,
    title: project.title,
    category: project.category,
    location: project.location,
    caption: project.description,
    target: project.category === "Hospitality" ? "hospitality" : "residences",
  }));
}

function MaisonHome({ site, selectTab }: { site: CaseStudy; selectTab: (key: string) => void }) {
  const reducedMotion = useReducedMotion();
  const slides = getLookbookSlides(site);
  const [active, setActive] = useState(0);
  const current = slides[active] ?? slides[0];

  useEffect(() => {
    if (reducedMotion || slides.length < 2) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [reducedMotion, slides.length]);

  return (
    <section className="maison2-page maison2-home" aria-labelledby="maison2-home-title">
      <div className="maison2-lookbook">
        <div className="maison2-reel-frame">
          {slides.map((slide, index) => <Image key={slide.title} src={slide.image} alt={index === active ? `${slide.title} by ${site.title}` : ""} width={2100} height={1400} priority={index === 0} className={index === active ? "maison2-reel-image is-active" : "maison2-reel-image"} sizes="(max-width: 900px) 100vw, 68vw" />)}
        </div>
        <div className="maison2-lookbook-copy">
          <p className="maison2-kicker">{site.hero.eyebrow}</p>
          <h1 id="maison2-home-title">{site.hero.title}</h1>
          <p>{site.hero.copy}</p>
          {current ? <div className="maison2-slide-caption"><span>{current.category} · {current.location}</span><strong>{current.title}</strong><p>{current.caption}</p></div> : null}
          <div className="maison2-section-links"><button type="button" onClick={() => selectTab("residences")}>Private Residences</button><button type="button" onClick={() => selectTab("hospitality")}>Hospitality</button><button type="button" onClick={() => selectTab("atelier")}>Atelier</button></div>
        </div>
        <div className="maison2-lookbook-index" aria-label="Lookbook index">
          {slides.map((slide, index) => <button key={slide.title} type="button" className={index === active ? "is-active" : ""} onClick={() => setActive(index)} onMouseEnter={() => setActive(index)}><span>{String(index + 1).padStart(2, "0")}</span>{slide.location}</button>)}
        </div>
      </div>
      <div className="maison2-editorial-statement"><p className="maison2-kicker">Private-client practice</p><h2>{site.philosophy.title}</h2><p>{site.philosophy.copy}</p></div>
      <div className="maison2-selected-preview">
        <div><p className="maison2-kicker">Selected commission</p><h2>{site.projects[0]?.title}</h2><p>{site.projects[0]?.description}</p><button type="button" onClick={() => selectTab("residences")}>Enter residences</button></div>
        {site.projects[0] ? <Image src={site.projects[0].image} alt={`${site.projects[0].title} commission preview`} width={1400} height={960} className="maison2-image" sizes="(max-width: 900px) 100vw, 48vw" loading="lazy" /> : null}
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
      <div className="maison2-timeline">{site.process?.map((step, index) => <article key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>
    </section>
  );
}

function MaisonResidences({ site }: { site: CaseStudy }) {
  const residences = site.projects.filter((project) => project.category === "Residences");
  const [feature, support] = residences;
  return (
    <section className="maison2-page maison2-residences" id="residences" aria-labelledby="maison2-residences-title">
      <div className="maison2-section-head"><p className="maison2-kicker">Residences</p><h2 id="maison2-residences-title">Private residences with scale, ceremony, and intimacy.</h2></div>
      {feature ? <article className="maison2-residence-feature"><Image src={feature.image} alt={`${feature.title} by ${site.title}`} width={1700} height={1120} className="maison2-image" sizes="(max-width: 900px) 100vw, 62vw" loading="eager" /><div><span>London / Residence / {feature.year}</span><h3>{feature.title}</h3><p>{feature.description}</p></div></article> : null}
      <div className="maison2-rhythm-notes">{maisonRhythms.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3><p>{index === 0 ? "The first room sets pace, fragrance, shadow, and ease." : index === 1 ? "Dining spaces hold ceremony without losing warmth." : index === 2 ? "Quieter rooms are composed for privacy and recovery." : "The most personal rooms are edited with particular restraint."}</p></article>)}</div>
      {support ? <article className="maison2-support-plate"><div><span>{support.location} / {support.year}</span><h3>{support.title}</h3><p>{support.description}</p></div><Image src={support.image} alt={`${support.title} by ${site.title}`} width={1000} height={760} className="maison2-image" sizes="(max-width: 900px) 100vw, 34vw" loading="lazy" /></article> : null}
    </section>
  );
}

function MaisonHospitality({ site }: { site: CaseStudy }) {
  const hospitality = site.projects.filter((project) => project.category === "Hospitality");
  const [feature, detail] = hospitality;
  return (
    <section className="maison2-page maison2-hospitality" id="hospitality" aria-labelledby="maison2-hospitality-title">
      <div className="maison2-hospitality-story">
        <div className="maison2-hospitality-copy"><p className="maison2-kicker">Hospitality</p><h2 id="maison2-hospitality-title">Guest spaces with theatre, privacy, and operational poise.</h2><p>Hospitality is treated as atmosphere in motion: arrival, pause, service, retreat, and memory are composed with the discretion of a private residence.</p></div>
        {feature ? <figure className="maison2-hospitality-image"><Image src={feature.image} alt={`${feature.title} by ${site.title}`} width={1400} height={1000} className="maison2-image" sizes="(max-width: 900px) 100vw, 50vw" loading="eager" /><figcaption>{feature.title} · {feature.location}</figcaption></figure> : null}
        {detail ? <aside className="maison2-detail-plate"><span>Detail plate</span><h3>{detail.title}</h3><p>{detail.description}</p></aside> : null}
      </div>
      <div className="maison2-hospitality-sequence">{hospitalitySequence.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3><p>{index === 0 ? "Lighting and material establish the first private impression." : index === 1 ? "Dining rooms are balanced for theatre, conversation, and service." : index === 2 ? "Suites are layered for retreat, storage, and evening atmosphere." : "Operational grace is hidden inside the detail of the room."}</p></article>)}</div>
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
  return (
    <section className="maison2-page maison2-contact" id="contact" aria-labelledby="maison2-contact-title">
      <div className="maison2-dossier-intro"><p className="maison2-kicker">{site.contact.eyebrow}</p><h2 id="maison2-contact-title">Private appointment</h2><p>{site.contact.copy}</p><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a><span>All enquiries handled in confidence.</span></div>
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
    <article className="maison2-site" id="home">
      <MaisonNav site={site} tabs={tabs} activeTab={activeTab} selectTab={selectTab} />
      <main>
        {activeTab === "home" ? <MaisonHome site={site} selectTab={selectTab} /> : null}
        {activeTab === "studio" ? <MaisonStudio site={site} /> : null}
        {activeTab === "residences" ? <MaisonResidences site={site} /> : null}
        {activeTab === "hospitality" ? <MaisonHospitality site={site} /> : null}
        {activeTab === "atelier" ? <MaisonAtelier site={site} /> : null}
        {activeTab === "press" ? <MaisonPress site={site} /> : null}
        {activeTab === "contact" ? <MaisonContact site={site} /> : null}
      </main>
    </article>
  );
}
