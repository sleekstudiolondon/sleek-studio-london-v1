import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MaisonShell from "../MaisonShell";
import MaisonContactForm from "../MaisonContactForm";
import { getCaseStudyBySlug } from "@/lib/caseStudies";
import { maisonAtelierPanels, maisonJournal, maisonPressMentions, maisonPrinciples, maisonProjects, maisonTimeline } from "@/lib/maisonForm";

const sections = ["about", "projects", "atelier", "journal", "press", "contact"] as const;
type Section = (typeof sections)[number];

const labels: Record<Section, string> = { about: "About Us", projects: "Projects", atelier: "Atelier", journal: "Journal", press: "Press", contact: "Contact" };
const descriptions: Record<Section, string> = {
  about: "An illustrative Paris-born interiors atelier shaped around discretion, provenance, atmosphere, and stewardship.",
  projects: "Selected illustrative Maison Form commissions across private residences and hospitality interiors.",
  atelier: "Bespoke furniture, specialist procurement, craft coordination, installation, and long-term stewardship.",
  journal: "Illustrative notes on materials, atmosphere, private practice, and the life of finished interiors.",
  press: "An illustrative recognition archive for the Maison Form concept website.",
  contact: "A demonstration of a discreet private-client enquiry journey for a luxury interiors practice.",
};

function isSection(value: string): value is Section {
  return sections.includes(value as Section);
}

export function generateStaticParams() {
  return sections.map((section) => ({ slug: "maison-form", section }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; section: string }> }): Promise<Metadata> {
  const { slug, section } = await params;
  if (slug !== "maison-form" || !isSection(section)) return {};
  return { title: `${labels[section]} | Maison Form — Sleek Studio concept`, description: descriptions[section] };
}

export default async function MaisonSectionPage({ params }: { params: Promise<{ slug: string; section: string }> }) {
  const { slug, section } = await params;
  if (slug !== "maison-form" || !isSection(section)) return notFound();
  const site = getCaseStudyBySlug("maison-form");
  if (!site) return notFound();

  if (section === "about") {
    return <MaisonShell current="About Us"><section className="maison2-page maison2-studio maison3-about" aria-labelledby="maison-about-title">
      <div className="maison2-studio-opening maison4-reveal"><p className="maison2-kicker">About Us</p><h1 id="maison-about-title">A Paris-born private interiors atelier, imagined with decades of quiet practice.</h1><p>Maison Form is an illustrative Sleek Studio concept: a discreet, atelier-led practice fluent in private residences, hospitality projects, procurement, and exacting installation.</p></div>
      <div className="maison3-stat-strip maison3-about-stats maison4-scroll-stats maison4-reveal" aria-label="Illustrative Maison Form credentials"><span>Illustrative heritage story</span><span>International practice concept</span><span>Private-client positioning</span><span>Residences, hospitality & atelier procurement</span></div>
      <div className="maison2-principals maison4-reveal">{site.team?.map((person) => <article key={person.title}><span>Illustrative leadership profile</span><h2>{person.title}</h2><p>{person.copy}</p></article>)}</div>
      <div className="maison3-timeline maison4-reveal">{maisonTimeline.map(([year, copy]) => <article key={year}><span>{year}</span><p>{copy}</p></article>)}</div>
      <div className="maison3-principles maison4-reveal">{maisonPrinciples.map(([title, copy]) => <article key={title}><h2>{title}</h2><p>{copy}</p></article>)}</div>
      <div className="maison2-timeline maison4-reveal">{site.process?.map((step) => <article key={step.title}><span>{step.title}</span><h2>{step.title}</h2><p>{step.copy}</p></article>)}</div>
      <div className="maison3-closing-rule maison4-reveal"><p>The practice is deliberately presented as private: senior attention, quiet coordination, and careful handover are part of the design proposition.</p><Link href="/work/maison-form/projects">View projects</Link></div>
    </section></MaisonShell>;
  }

  if (section === "projects") {
    return <MaisonShell current="Projects"><section className="maison2-page maison2-portfolio" aria-labelledby="maison-projects-title">
      <div className="maison2-section-head maison2-portfolio-opening maison4-reveal"><p className="maison2-kicker">Projects</p><h1 id="maison-projects-title">Residences and hospitality commissions, presented as a private body of work.</h1><p>Each illustrative project has its own long-form route, demonstrating the depth expected of a White Glove portfolio rather than relying on a single carousel state.</p></div>
      <div className="maison4-project-library">{maisonProjects.map((project, index) => <article key={project.slug} className={index % 2 ? "is-reverse" : ""}><Link href={`/work/maison-form/projects/${project.slug}`}><Image src={project.image} alt={`${project.title} illustrative interior`} width={1600} height={1100} className="maison2-image" sizes="(max-width: 900px) 100vw, 62vw" /></Link><div><p className="maison2-kicker">{project.category} · {project.location} · {project.year}</p><h2><Link href={`/work/maison-form/projects/${project.slug}`}>{project.title}</Link></h2><p>{project.description}</p><Link href={`/work/maison-form/projects/${project.slug}`}>Open project story</Link></div></article>)}</div>
    </section></MaisonShell>;
  }

  if (section === "atelier") {
    return <MaisonShell current="Atelier"><section className="maison2-page maison2-atelier" aria-labelledby="maison-atelier-title">
      <div className="maison2-section-head maison4-reveal"><p className="maison2-kicker">Atelier</p><h1 id="maison-atelier-title">Craft, procurement, and the final private layer.</h1><p>The atelier coordinates makers, finishes, furniture, art advisory, installation, and aftercare as one authored service.</p></div>
      <div className="maison2-atelier-panels maison4-reveal">{maisonAtelierPanels.map((panel) => <article key={panel.title} className="is-open"><div><span>{panel.title}</span><strong>{panel.title}</strong></div><p>{panel.copy}</p><em>{panel.detail}</em></article>)}</div>
      <div className="maison4-material-notes maison4-reveal">{[["Stone and plaster","Tone, touch, repairability, and evening light are reviewed together."],["Textile and softness","Fabric, rugs, and upholstery are selected for comfort, patina, and restraint."],["Antiques and art","Objects are chosen for provenance and proportion rather than decorative excess."],["Final placement","Lighting levels, flowers, table objects, and handover notes complete the room."]].map(([title, copy]) => <article key={title}><h2>{title}</h2><p>{copy}</p></article>)}</div>
      <div className="maison3-closing-rule maison4-reveal"><p>Procurement and installation are treated as atmosphere, not administration.</p><Link href="/work/maison-form/contact">Discuss atelier support</Link></div>
    </section></MaisonShell>;
  }

  if (section === "journal") {
    return <MaisonShell current="Journal"><section className="maison2-page maison4-journal" aria-labelledby="maison-journal-title">
      <div className="maison2-section-head maison4-reveal"><p className="maison2-kicker">Journal</p><h1 id="maison-journal-title">Notes on provenance, atmosphere, and the life of a finished interior.</h1><p>An illustrative editorial layer showing how a White Glove practice can publish thoughtful long-form material without becoming a conventional blog.</p></div>
      <div className="maison4-journal-grid">{maisonJournal.map((article) => <article key={article.slug}><Link href={`/work/maison-form/journal/${article.slug}`}><Image src={article.image} alt="Illustrative Maison Form journal image" width={1200} height={850} className="maison2-image" sizes="(max-width: 900px) 100vw, 33vw" /></Link><p className="maison2-kicker">{article.eyebrow}</p><h2><Link href={`/work/maison-form/journal/${article.slug}`}>{article.title}</Link></h2><p>{article.dek}</p></article>)}</div>
    </section></MaisonShell>;
  }

  if (section === "press") {
    return <MaisonShell current="Press"><section className="maison2-page maison2-press maison3-press" aria-labelledby="maison-press-title">
      <div className="maison2-section-head maison4-reveal"><p className="maison2-kicker">Press & recognition</p><h1 id="maison-press-title">An illustrative recognition archive, clearly separated from real-world endorsement.</h1><p>Publication names and notes below are fictional demonstration content created to show how a premium practice might structure editorial recognition.</p></div>
      <div className="maison2-press-index maison4-reveal">{maisonPressMentions.map((item) => <article key={item.source}><span>Concept recognition</span><h2>{item.source}</h2><p>{item.note}</p></article>)}</div>
      <div className="maison3-awards maison4-reveal">{["Private residences", "Hospitality atmosphere and service", "Craft network and procurement", "International-practice positioning"].map((item) => <p key={item}>Illustrative focus · {item}</p>)}</div>
    </section></MaisonShell>;
  }

  return <MaisonShell current="Contact"><section className="maison2-page maison3-contact maison4-contact" aria-labelledby="maison-contact-title">
    <div className="maison3-contact-intro maison4-reveal"><p className="maison2-kicker">Private enquiries</p><h1 id="maison-contact-title">Private appointment</h1><p>This page demonstrates how a discreet international practice could qualify a confidential commission. Maison Form is an illustrative concept; no enquiry is sent to a real studio.</p><span>Concept interaction · no transmission · no real client relationship created</span></div>
    <MaisonContactForm />
  </section></MaisonShell>;
}
