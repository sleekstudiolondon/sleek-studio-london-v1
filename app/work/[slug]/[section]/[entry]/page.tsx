import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MaisonShell from "../../MaisonShell";
import { getMaisonArticle, getMaisonProject, maisonJournal, maisonProjects } from "@/lib/maisonForm";

export function generateStaticParams() {
  return [
    ...maisonProjects.map((project) => ({ slug: "maison-form", section: "projects", entry: project.slug })),
    ...maisonJournal.map((article) => ({ slug: "maison-form", section: "journal", entry: article.slug })),
    { slug: "maison-form", section: "contact", entry: "confirmation" },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; section: string; entry: string }> }): Promise<Metadata> {
  const { slug, section, entry } = await params;
  if (slug !== "maison-form") return {};
  if (section === "projects") {
    const project = getMaisonProject(entry);
    return project ? { title: `${project.title} | Maison Form — Sleek Studio concept`, description: project.description } : {};
  }
  if (section === "journal") {
    const article = getMaisonArticle(entry);
    return article ? { title: `${article.title} | Maison Form Journal — Sleek Studio concept`, description: article.dek } : {};
  }
  if (section === "contact" && entry === "confirmation") return { title: "Enquiry preview | Maison Form — Sleek Studio concept", description: "Confirmation state for the Maison Form concept enquiry flow." };
  return {};
}

export default async function MaisonEntryPage({ params }: { params: Promise<{ slug: string; section: string; entry: string }> }) {
  const { slug, section, entry } = await params;
  if (slug !== "maison-form") return notFound();

  if (section === "projects") {
    const project = getMaisonProject(entry);
    if (!project) return notFound();
    const index = maisonProjects.findIndex((item) => item.slug === project.slug);
    const previous = maisonProjects[(index - 1 + maisonProjects.length) % maisonProjects.length];
    const next = maisonProjects[(index + 1) % maisonProjects.length];
    return <MaisonShell current="Projects"><article className="maison2-page maison4-project-story" aria-labelledby="maison-project-title">
      <header className="maison4-project-hero maison4-reveal"><div><p className="maison2-kicker">{project.category} · {project.location} · {project.year}</p><h1 id="maison-project-title">{project.title}</h1><p>{project.premise}</p></div><Image src={project.image} alt={`${project.title} illustrative interior`} width={2000} height={1400} className="maison2-image" sizes="100vw" priority /></header>
      <div className="maison4-project-intro maison4-reveal"><p className="maison2-kicker">Project story</p><div>{project.narrative.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div>
      <div className="maison4-project-facts maison4-reveal"><dl><div><dt>Location</dt><dd>{project.location}</dd></div><div><dt>Category</dt><dd>{project.category}</dd></div><div><dt>Service</dt><dd>{project.service}</dd></div><div><dt>Areas</dt><dd>{project.areas.join(" · ")}</dd></div><div><dt>Materials</dt><dd>{project.materials.join(" · ")}</dd></div></dl></div>
      <div className="maison4-project-image-sequence maison4-reveal"><Image src={project.image} alt={`${project.title} material study`} width={1500} height={1100} className="maison2-image" sizes="(max-width: 900px) 100vw, 58vw" /><blockquote>“The commission is presented as atmosphere, craft, and stewardship rather than a catalogue of decorative decisions.” <cite>Illustrative project note</cite></blockquote></div>
      <div className="maison3-closing-rule maison4-reveal"><p>This project is fictional demonstration content created to show the depth of a White Glove case study.</p><Link href="/work/maison-form/contact">Request a private appointment</Link></div>
      <nav className="maison4-project-pagination" aria-label="Project navigation"><Link href={`/work/maison-form/projects/${previous.slug}`}>Previous · {previous.title}</Link><Link href="/work/maison-form/projects">All projects</Link><Link href={`/work/maison-form/projects/${next.slug}`}>Next · {next.title}</Link></nav>
    </article></MaisonShell>;
  }

  if (section === "journal") {
    const article = getMaisonArticle(entry);
    if (!article) return notFound();
    return <MaisonShell current="Journal"><article className="maison2-page maison4-article" aria-labelledby="maison-article-title">
      <header className="maison4-article-hero maison4-reveal"><p className="maison2-kicker">{article.eyebrow} · illustrative journal</p><h1 id="maison-article-title">{article.title}</h1><p>{article.dek}</p><Image src={article.image} alt="Illustrative Maison Form journal atmosphere" width={1800} height={1100} className="maison2-image" sizes="100vw" priority /></header>
      <div className="maison4-article-body">{article.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.copy}</p></section>)}</div>
      <div className="maison3-closing-rule maison4-reveal"><p>This article is fictional editorial content demonstrating Maison Form’s White Glove publishing system.</p><Link href="/work/maison-form/journal">Return to journal</Link></div>
    </article></MaisonShell>;
  }

  if (section === "contact" && entry === "confirmation") {
    return <MaisonShell current="Contact"><section className="maison2-page maison4-confirmation" aria-labelledby="maison-confirmation-title"><div className="maison2-seal"><span>Concept request prepared</span><h1 id="maison-confirmation-title">A private appointment journey, completed without sending data.</h1><p>This confirmation demonstrates the final state of a White Glove enquiry flow. No message was transmitted and no real Maison Form studio or client relationship exists.</p><div className="maison3-hero-actions"><Link href="/work/maison-form">Return home</Link><Link href="/work">Back to Sleek Studio</Link></div></div></section></MaisonShell>;
  }

  return notFound();
}
