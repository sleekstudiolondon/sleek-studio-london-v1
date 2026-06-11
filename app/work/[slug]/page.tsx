import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudyBySlug } from "@/lib/caseStudies";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default async function DemoWebsite({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = getCaseStudyBySlug(slug);
  if (!site) return notFound();

  const residentialProjects = site.projects.filter((project) => project.category === "Residences");
  const hospitalityProjects = site.projects.filter((project) => project.category === "Hospitality");
  const primaryProjects = residentialProjects.length > 0 ? residentialProjects : site.projects;

  return (
    <article className={`demo-site ${site.palette}`}>
      <Link href="/work" className="demo-return" aria-label="Return to Sleek Studio work gallery">
        <span aria-hidden="true">←</span> Sleek Studio
      </Link>

      <header className="demo-nav" id="home">
        <Link href="#home" className="demo-brand">{site.title}</Link>
        <nav className="demo-nav-links" aria-label={`${site.title} website navigation`}>
          {site.nav.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
      </header>

      <section className="demo-hero" aria-labelledby="demo-hero-title">
        <div className="demo-hero-copy">
          <p className="demo-kicker">{site.hero.eyebrow}</p>
          <h1 id="demo-hero-title">{site.hero.title}</h1>
          <p>{site.hero.copy}</p>
          <a href="#contact" className="demo-button">Begin an enquiry</a>
        </div>
        <div className="demo-hero-image-wrap">
          <Image
            src={site.hero.image}
            alt={`${site.title} interior atmosphere`}
            width={2200}
            height={1500}
            className="demo-hero-image"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      <section className="demo-section demo-statement" id="studio">
        <p className="demo-kicker">Studio</p>
        <div className="demo-statement-grid">
          <h2>{site.manifesto?.title ?? site.philosophy.title}</h2>
          <p>{site.manifesto?.copy ?? site.philosophy.copy}</p>
        </div>
      </section>

      {site.manifesto ? (
        <section className="demo-section demo-material-section">
          <p className="demo-kicker">Material direction</p>
          <div className="demo-statement-grid">
            <h2>{site.philosophy.title}</h2>
            <p>{site.philosophy.copy}</p>
          </div>
        </section>
      ) : null}

      <section className="demo-section" id={site.slug === "maison-form" ? "residences" : site.slug === "studio-alter" ? "projects" : "portfolio"}>
        <div className="demo-section-head">
          <p className="demo-kicker">Selected work</p>
          <h2>{site.slug === "maison-form" ? "Residences of scale and intimacy." : "Selected residences."}</h2>
        </div>
        <div className={`demo-project-grid ${site.slug === "studio-alter" ? "demo-project-grid-editorial" : ""}`}>
          {primaryProjects.map((project, index) => (
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

      {hospitalityProjects.length > 0 ? (
        <section className="demo-section demo-hospitality" id="hospitality">
          <div className="demo-section-head">
            <p className="demo-kicker">Hospitality</p>
            <h2>Guest spaces with atmosphere and memory.</h2>
          </div>
          <div className="demo-project-grid demo-project-grid-compact">
            {hospitalityProjects.map((project) => (
              <article key={project.title} className="demo-project-card">
                <div className="demo-project-image-wrap">
                  <Image
                    src={project.image}
                    alt={`${project.title} by ${site.title}`}
                    width={1500}
                    height={1100}
                    className="demo-project-image"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
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
      ) : null}

      <section className="demo-section demo-services" id="services">
        <div className="demo-section-head">
          <p className="demo-kicker">Services</p>
          <h2>{site.slug === "maison-form" ? "Private-client capabilities." : "How the studio can help."}</h2>
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

      {site.process ? (
        <section className="demo-section demo-process" id={site.slug === "maison-form" ? "atelier" : undefined}>
          <p className="demo-kicker">{site.slug === "maison-form" ? "Atelier" : "Process"}</p>
          <div className="demo-process-list">
            {site.process.map((step, index) => (
              <article key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {site.bio ? (
        <section className="demo-section demo-bio">
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
        </section>
      ) : null}

      {site.team ? (
        <section className="demo-section demo-team">
          <p className="demo-kicker">Principals</p>
          <div className="demo-service-grid">
            {site.team.map((person) => (
              <article key={person.title} className="demo-service-card">
                <h3>{person.title}</h3>
                <p>{person.copy}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {site.press ? (
        <section className="demo-section demo-press" id="press">
          <div className="demo-section-head">
            <p className="demo-kicker">Press</p>
            <h2>{site.slug === "studio-alter" ? "Noted for material clarity." : "Selected recognition."}</h2>
          </div>
          <div className="demo-press-grid">
            {site.press.map((item) => (
              <blockquote key={item.source}>
                <p>“{item.quote}”</p>
                <cite>{item.source}</cite>
              </blockquote>
            ))}
          </div>
        </section>
      ) : null}

      {site.journal ? (
        <section className="demo-section demo-journal" id="journal">
          <div className="demo-section-head">
            <p className="demo-kicker">Journal</p>
            <h2>Notes from the studio.</h2>
          </div>
          <div className="demo-journal-grid">
            {site.journal.map((item) => (
              <article key={item.title}>
                <p>{item.meta}</p>
                <h3>{item.title}</h3>
                <span>{item.copy}</span>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="demo-section demo-contact" id="contact">
        <p className="demo-kicker">{site.contact.eyebrow}</p>
        <h2>{site.contact.title}</h2>
        <p>{site.contact.copy}</p>
        <a href={`mailto:${site.contact.email}`} className="demo-button">{site.contact.email}</a>
      </section>
    </article>
  );
}
