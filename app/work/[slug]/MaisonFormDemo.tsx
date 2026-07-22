"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { CaseStudy } from "@/lib/caseStudies";
import { maisonPressMentions, maisonProjects } from "@/lib/maisonForm";
import MaisonShell from "./MaisonShell";

const disciplines = [
  { title: "Private Residences", copy: "Layered homes composed around arrival, privacy, ceremony, and the daily rituals of the principal client." },
  { title: "Hospitality", copy: "Guest spaces with atmosphere, operational grace, and a cinematic memory of service." },
  { title: "Atelier Procurement", copy: "Furniture, art, antiques, textiles, lighting, and makers coordinated through a single private process." },
  { title: "Installation Stewardship", copy: "Final placement, handover, aftercare, and future acquisitions held quietly by the studio." },
];

export default function MaisonFormDemo({ site }: { site: CaseStudy }) {
  const [activeDiscipline, setActiveDiscipline] = useState(0);
  const discipline = disciplines[activeDiscipline];
  const marquee = [...maisonProjects, ...maisonProjects];

  return (
    <MaisonShell current="Home">
      <section className="maison2-page maison3-home maison4-home" aria-labelledby="maison-home-title">
        <div className="maison4-hero maison4-reveal">
          <div><p className="maison2-kicker">{site.hero.eyebrow}</p><h1 id="maison-home-title">Private interiors, quietly composed.</h1></div>
          <div className="maison4-hero-copy"><p>{site.hero.copy}</p><p>Maison Form is an illustrative private-practice concept showing how Sleek Studio’s White Glove tier can hold residences, hospitality, editorial publishing, procurement, and private enquiry in one authored digital estate.</p><div className="maison3-hero-actions"><Link href="/work/maison-form/projects">View selected commissions</Link><Link href="/work/maison-form/contact">Request a private appointment</Link></div></div>
        </div>
        <div className="maison4-positioning maison4-reveal"><p>Luxury is treated as atmosphere, provenance, and precision — never noise.</p></div>
        <div className="maison3-discipline-selector maison4-reveal" aria-label="Maison Form disciplines">
          <div className="maison3-discipline-controls">{disciplines.map((item, index) => <button key={item.title} type="button" className={index === activeDiscipline ? "is-active" : ""} onMouseEnter={() => setActiveDiscipline(index)} onFocus={() => setActiveDiscipline(index)} onClick={() => setActiveDiscipline(index)}>{item.title}</button>)}</div>
          <div className="maison3-discipline-copy"><p className="maison2-kicker">Discipline</p><h2>{discipline.title}</h2><p>{discipline.copy}</p></div>
        </div>
        <div className="maison3-stat-strip maison4-scroll-stats maison4-reveal" aria-label="Maison Form concept capabilities"><span>Multi-page White Glove architecture</span><span>Long-form project stories</span><span>Journal & editorial system</span><span>Private enquiry journey</span></div>
        <div className="maison3-commission-teaser maison4-reveal"><div><p className="maison2-kicker">Selected commissions</p><h2>Private residences and hospitality rooms held in a deeper project library.</h2></div><Link href="/work/maison-form/projects">Enter projects</Link></div>
        <div className="maison2-marquee maison4-reveal" aria-label="Continuous Maison Form project preview"><div className="maison2-marquee-track">{marquee.map((project, index) => <Link key={`${project.slug}-${index}`} href={`/work/maison-form/projects/${project.slug}`} className="maison3-marquee-card"><Image src={project.image} alt={`${project.title} illustrative interior`} width={820} height={560} className="maison2-image" sizes="(max-width: 900px) 72vw, 360px" loading="lazy" /><span><small>{project.category} · {project.location}</small><strong>{project.title}</strong><em>{project.description}</em></span></Link>)}</div></div>
        <div className="maison2-process-teaser maison4-reveal">{[["Discretion","Private information, decision-makers, and site access are handled quietly."],["Procurement","Materials, makers, furniture, and objects are coordinated through the atelier."],["Installation","Rooms are placed, lit, and styled with a controlled final layer."],["Stewardship","Aftercare keeps the home evolving without losing its original atmosphere."]].map(([title, copy]) => <article key={title}><span>{title}</span><h2>{title}</h2><p>{copy}</p></article>)}</div>
        <div className="maison4-editorial-teaser maison4-reveal"><div><p className="maison2-kicker">Journal</p><h2>Material notes, atmosphere, and private-practice thinking.</h2><p>The flagship concept now demonstrates a real editorial publishing layer rather than only portfolio and service states.</p></div><Link href="/work/maison-form/journal">Read the journal</Link></div>
        <div className="maison2-authority-strip maison4-reveal" aria-label="Illustrative recognition sources">{maisonPressMentions.map((item) => <span key={item.source}>{item.source} · concept</span>)}</div>
        <div className="maison2-private-cta maison4-reveal"><p>For a sample private-client journey built around discretion, atmosphere, and exacting presentation.</p><Link href="/work/maison-form/contact">Request a private appointment</Link></div>
      </section>
    </MaisonShell>
  );
}
