import Link from "next/link";
import type { ExamplePage, PackageExample } from "@/lib/packageExamples";
import { buildExampleHref } from "@/lib/packageExamples";
import ExampleSiteImage from "./ExampleSiteImage";
import AlderAboutPage from "./AlderAboutPage";
import AlderSiteMenu from "./AlderSiteMenu";

type ExampleWebsiteProps = {
  site: PackageExample;
  page: ExamplePage;
};

const THEME_FALLBACKS: Record<PackageExample["theme"], string> = {
  john: "/images/examples/john-doe-interiors-placeholder.svg",
  alder: "/images/examples/studio-alder-interiors-placeholder.svg",
  maison: "/images/examples/maison-form-interiors-placeholder.svg",
};

const ALDER_NAV_ORDER = ["", "portfolio", "services", "projects", "process", "journal", "about", "contact"];

const PACKAGE_PRESENTATION: Record<
  PackageExample["packageId"],
  {
    ctaCopy: string;
    ctaTitle: string;
    label: string;
    metrics: { label: string; value: string }[];
    ribbonCopy: string;
  }
> = {
  entry: {
    label: "Individual",
    ctaTitle: "Interested in a refined first website for your own studio?",
    ctaCopy: "This concept shows how a focused launch can still feel premium, polished, and ready for enquiry.",
    ribbonCopy: "A focused package for individual designers who need a polished first presence.",
    metrics: [
      { label: "Scope", value: "3 pages" },
      { label: "Support", value: "72h updates" },
      { label: "Best for", value: "Solo designers" },
    ],
  },
  mid: {
    label: "The House",
    ctaTitle: "Build a polished eight-page website for your interiors studio.",
    ctaCopy:
      "The House gives growing studios a complete, refined presence with 8 pages, 5 weekly changes, and 48-hour turnaround after approval.",
    ribbonCopy:
      "Designed as The House: 8 pages, 5 changes per week, and 48-hour turnaround for a premium interior studio website.",
    metrics: [
      { label: "Package", value: "The House" },
      { label: "Pages", value: "8" },
      { label: "Weekly changes", value: "5" },
      { label: "Turnaround", value: "48h" },
    ],
  },
  top: {
    label: "White Glove",
    ctaTitle: "Commission a fully bespoke White Glove website experience.",
    ctaCopy:
      "White Glove is shaped for established studios that need 20+ pages, concierge-level delivery, and 24-hour priority refinement.",
    ribbonCopy:
      "Designed as White Glove: 20+ pages, concierge-level delivery, 24-hour turnaround, and a fully bespoke luxury experience.",
    metrics: [
      { label: "Package", value: "White Glove" },
      { label: "Pages", value: "20+" },
      { label: "Delivery", value: "Concierge" },
      { label: "Turnaround", value: "24h" },
    ],
  },
};

function slugClassName(slug: string) {
  return slug ? slug.replace(/[^a-z0-9-]/gi, "-").toLowerCase() : "home";
}

function renderNavLinks(site: PackageExample, page: ExamplePage) {
  return site.pages.map((item) => {
    const href = buildExampleHref(site.slug, item.slug);
    const active = item.slug === page.slug;

    return (
      <Link key={href} href={href} className={`example-site-link ${active ? "example-site-link-active" : ""}`}>
        {item.navLabel ?? item.label}
      </Link>
    );
  });
}

function renderSection(site: PackageExample, section: ExamplePage["sections"][number], index: number, pageSlug: string) {
  const fallbackSrc = THEME_FALLBACKS[site.theme];
  const isJohnTextOnlySplit = site.theme === "john" && section.type === "split" && !section.image;
  const isJohnHomeQuote = site.theme === "john" && section.type === "quote" && pageSlug === "";
  const sectionClasses = [
    "example-site-section",
    `example-site-section-${section.type}`,
    `example-site-section-index-${index + 1}`,
    index % 2 === 0 ? "example-site-section-odd" : "example-site-section-even",
    `example-page-section-${slugClassName(pageSlug)}`,
  ]
    .filter(Boolean)
    .join(" ");

  if (section.type === "split") {
    return (
      <section
        key={`${pageKey(site, section.title)}-split`}
        className={`${sectionClasses} ${section.image ? "" : "example-site-section-split-text-only"}`.trim()}
      >
        <div
          className={`example-site-section-inner example-site-shell example-site-shell-split example-site-split ${section.image ? "" : "example-site-split-text-only"}`.trim()}
        >
          <div className={`example-site-copy ${isJohnTextOnlySplit ? "example-site-copy-john" : ""}`.trim()}>
            {isJohnTextOnlySplit ? (
              <>
                <div className="example-site-copy-head">
                  <p className="example-site-kicker">{section.kicker}</p>
                  <h2 className="example-site-title">{section.title}</h2>
                </div>
                <div className="example-site-copy-body-group">
                  <p className="example-site-body">{section.body}</p>
                  {section.secondary ? <p className="example-site-body example-site-body-muted">{section.secondary}</p> : null}
                  {section.list ? (
                    <ul className="example-site-list">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </>
            ) : (
              <>
                <p className="example-site-kicker">{section.kicker}</p>
                <h2 className="example-site-title">{section.title}</h2>
                <p className="example-site-body">{section.body}</p>
                {section.secondary ? <p className="example-site-body example-site-body-muted">{section.secondary}</p> : null}
                {section.list ? (
                  <ul className="example-site-list">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </>
            )}
          </div>
          {section.image ? (
            <div className="example-site-image-card">
              <div className="example-site-image-frame">
                <ExampleSiteImage
                  src={section.image.src}
                  fallbackSrc={fallbackSrc}
                  alt={section.image.alt}
                  width={1600}
                  height={1200}
                  className="example-site-image"
                  sizes="(max-width: 899px) 100vw, 45vw"
                  loading="lazy"
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  if (section.type === "cards") {
    return (
      <section key={`${pageKey(site, section.title)}-cards`} className={sectionClasses}>
        <div className="example-site-section-inner example-site-shell example-site-shell-cards">
          <p className="example-site-kicker">{section.kicker}</p>
          <h2 className="example-site-title">{section.title}</h2>
          <div className="example-site-card-grid">
            {section.items.map((item) => (
              <article key={item.title} className="example-site-panel">
                <h3 className="example-site-panel-title">{item.title}</h3>
                <p className="example-site-panel-copy">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section.type === "gallery") {
    const galleryCount = Math.min(section.images.length, 3);
    const gallerySizes =
      section.images.length >= 3 ? "(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw" : "(max-width: 767px) 100vw, 50vw";

    return (
      <section key={`${pageKey(site, section.title)}-gallery`} className={sectionClasses}>
        <div className="example-site-section-inner example-site-shell example-site-shell-gallery">
          <p className="example-site-kicker">{section.kicker}</p>
          <h2 className="example-site-title">{section.title}</h2>
          <div className={`example-site-gallery example-site-gallery-count-${galleryCount}`}>
            {section.images.map((image) => (
              <figure key={image.src} className="example-site-gallery-card">
                <div className="example-site-gallery-frame">
                  <ExampleSiteImage
                    src={image.src}
                    fallbackSrc={fallbackSrc}
                    alt={image.alt}
                    width={1500}
                    height={1150}
                    className="example-site-gallery-image"
                    sizes={gallerySizes}
                    loading="lazy"
                  />
                </div>
                {image.caption ? <figcaption className="example-site-caption">{image.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section.type === "quote") {
    return (
      <section key={`${pageKey(site, section.quote)}-quote`} className={sectionClasses}>
        <div className="example-site-section-inner">
          <blockquote className={`example-site-quote ${isJohnHomeQuote ? "example-site-quote-manifesto" : ""}`.trim()}>
            <p>{isJohnHomeQuote ? section.quote : <>&ldquo;{section.quote}&rdquo;</>}</p>
            {section.attribution ? <footer>{section.attribution}</footer> : null}
          </blockquote>
        </div>
      </section>
    );
  }

  return (
    <section key={`${pageKey(site, section.title)}-contact`} className={sectionClasses}>
      <div className="example-site-section-inner example-site-shell example-site-shell-contact example-site-contact">
        <div className="example-site-copy">
          <p className="example-site-kicker">{section.kicker}</p>
          <h2 className="example-site-title">{section.title}</h2>
          <p className="example-site-body">{section.copy}</p>
        </div>
        <div className="example-site-contact-panel">
          {section.details.map((detail) => (
            <div key={detail.label} className="example-site-contact-item">
              <span>{detail.label}</span>
              <strong>{detail.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function pageKey(site: PackageExample, seed: string) {
  return `${site.slug}-${seed}`;
}

function getPackagePresentation(site: PackageExample) {
  return PACKAGE_PRESENTATION[site.packageId];
}

function renderPackageMetrics(site: PackageExample, className = "") {
  const presentation = getPackagePresentation(site);

  return (
    <dl className={`example-package-metrics ${className}`.trim()} aria-label={`${presentation.label} package details`}>
      {presentation.metrics.map((metric) => (
        <div key={`${metric.label}-${metric.value}`} className="example-package-metric">
          <dt>{metric.label}</dt>
          <dd>{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function renderPackageRibbon(site: PackageExample) {
  const presentation = getPackagePresentation(site);

  return (
    <section className="example-package-ribbon" aria-label={`${presentation.label} package alignment`}>
      <div className="example-package-ribbon-copy">
        <p className="example-site-kicker">{presentation.label} package</p>
        <p>{presentation.ribbonCopy}</p>
      </div>
      {renderPackageMetrics(site, "example-package-metrics-ribbon")}
    </section>
  );
}

function renderJohnHome(page: ExamplePage) {
  const [intro, knownFor, philosophy, process, residential, client, closing] = page.sections;

  if (
    intro?.type !== "split" ||
    knownFor?.type !== "cards" ||
    philosophy?.type !== "split" ||
    process?.type !== "cards" ||
    residential?.type !== "split" ||
    client?.type !== "split" ||
    closing?.type !== "quote"
  ) {
    return null;
  }

  const clientNotes = [
    {
      label: "Typical scope",
      value: residential.list?.[0] ?? "Furnishing and atmosphere-led home updates",
    },
    {
      label: "Working style",
      value: client.list?.[0] ?? "Direct conversations and fewer but better decisions",
    },
    {
      label: "Outcome",
      value: client.list?.[2] ?? "A home that still feels personal when the work is done",
    },
  ];

  const heroDetails = [
    {
      label: "Studio focus",
      value: "Private homes shaped through architectural calm and material warmth",
    },
    {
      label: "Location",
      value: "London, with a closely held residential practice",
    },
    {
      label: "Typical brief",
      value: "Townhouses, apartments, and family homes that need clarity rather than noise",
    },
  ];

  const openingTitle = "A London studio for homes that need calm authority rather than another layer of decoration.";

  const openingLead =
    "John Doe Interiors works with homes that already have potential but have not yet settled into themselves. The aim is not to add noise, but to bring proportion, calm, and material clarity into sharper focus.";

  const openingParagraphs = [
    "Most commissions begin with a house or apartment that has promise but no real point of rest. The bones may be strong and the light may be generous, yet the rooms still feel unsettled in use: too exposed, too busy, too polite, or simply unsure of themselves.",
    "John Doe Interiors is brought in to make those homes feel composed from the inside out. Layout, circulation, colour, lighting, joinery, and furnishing are shaped as one atmosphere so the result feels quieter, warmer, and more convincing every month it is lived in.",
  ];

  const openingNotes = [
    {
      label: "What defines the work",
      value: "Restraint, proportion, and atmosphere over decorative excess",
    },
    {
      label: "Scale of practice",
      value: "A private process with continuity from the first visit to the final layer",
    },
  ];

  const philosophyParagraphs = [
    "A persuasive interior does not perform too quickly. It settles the body first. Thresholds feel unforced, materials absorb rather than scatter noise, and rooms begin to hold daily life with more steadiness and less effort. It reveals itself gradually rather than all at once. Over time, the space feels increasingly resolved, not because more has been added, but because nothing feels out of place.",
    "That atmosphere comes from editing with precision. Some things are softened, some are stripped back, and some are given more weight so the house can finally read as one calm, continuous whole.",
    "That sense of calm also depends on restraint in what is left unsaid. When a room is resolved properly, comfort comes less from abundance than from balance, clarity, and a quieter confidence in the way everything sits together.",
  ];

  const principleBlocks = [
    {
      title: knownFor.items[0]?.title ?? "Softness with structure",
      copy:
        "Colour, plaster, timber, stone, and upholstery are selected for the way they hold light and settle a room over time. Softness is created through control, not through looseness.",
    },
    {
      title: knownFor.items[1]?.title ?? "Daily life, properly considered",
      copy:
        "Storage, movement, lighting, and seating are treated as part of the emotional life of the home. Rooms should work quietly in the first hour of the day as well as they do at night.",
    },
    {
      title: knownFor.items[2]?.title ?? "Editing, not adding",
      copy:
        "The work is often about removal, rebalancing, and deciding what deserves emphasis. The final house should feel richer for being more precise, not more filled.",
    },
    {
      title: "Reading the unresolved",
      copy:
        "Before design language is introduced, the studio studies what already feels out of tune. The correction often begins with subtle shifts in sequence, rhythm, and visual weight.",
    },
  ];

  return (
    <div className="jdi-homepage-main">
      <section className="jdi-hero jdi-hero-content">
        <div className="jdi-hero-right">
          <div className="jdi-hero-card">
            <div className="jdi-hero-card-top">
              {heroDetails.map((item) => (
                <div key={item.label} className="jdi-hero-card-meta">
                  <span className="jdi-note-label">{item.label}</span>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>

            <div className="jdi-hero-card-grid">
              <div className="jdi-hero-card-copy">
                <p className="jdi-detail-label">{page.heroEyebrow}</p>
                <h2 className="jdi-hero-headline">{page.heroTitle}</h2>
                <p className="jdi-hero-copy">{page.heroCopy}</p>
              </div>

              <div className="jdi-hero-card-note">
                <p className="jdi-detail-label">Atmosphere over novelty</p>
                <p className="jdi-copy">
                  The work aims for a house that feels immediately calmer and gradually more beautiful, not one that depends on novelty or noise to hold attention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="jdi-opening-band jdi-body-band">
        <div className="jdi-opening-main">
          <p className="jdi-eyebrow">{intro.kicker}</p>
          <h2 className="jdi-heading jdi-heading-opening">{openingTitle}</h2>
          <p className="jdi-copy jdi-opening-lead">{openingLead}</p>
        </div>

        <div className="jdi-opening-rail">
          <div className="jdi-opening-copy">
            {openingParagraphs.map((paragraph, index) => (
              <p key={paragraph} className={`jdi-copy ${index === 0 ? "jdi-copy-lead" : ""}`.trim()}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="jdi-opening-notes">
            {openingNotes.map((note) => (
              <div key={note.label} className="jdi-opening-note">
                <span className="jdi-note-label">{note.label}</span>
                <p>{note.value}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="jdi-signature-band jdi-body-band">
        <div className="jdi-signature-head">
          <p className="jdi-eyebrow">{knownFor.kicker}</p>
        </div>

        <div className="jdi-signature-grid">
          {principleBlocks.map((item, index) => (
            <article key={item.title} className="jdi-signature-item">
              <span className="jdi-principle-index">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="jdi-signature-title">{item.title}</h3>
              <p className="jdi-point-copy">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="jdi-philosophy-band jdi-body-band">
        <div className="jdi-philosophy-panel">
          <p className="jdi-eyebrow">{philosophy.kicker}</p>
          <h2 className="jdi-heading jdi-heading-philosophy">{philosophy.title}</h2>
          <div className="jdi-philosophy-copy">
            <p className="jdi-copy jdi-copy-lead">{philosophyParagraphs[0]}</p>
          </div>
        </div>

        <div className="jdi-philosophy-side">
          <p className="jdi-detail-label">Why the rooms hold</p>
          {philosophyParagraphs.slice(1).map((paragraph) => (
            <p key={paragraph} className="jdi-copy jdi-copy-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="jdi-experience-band jdi-body-band">
        <div className="jdi-experience-head">
          <p className="jdi-eyebrow">{process.kicker}</p>
          <h2 className="jdi-heading jdi-heading-approach">{process.title}</h2>
        </div>

        <div className="jdi-experience-grid">
          {process.items.map((item) => (
            <article key={item.title} className="jdi-experience-step">
              <div className="jdi-step-text">
                <h3 className="jdi-step-title">{item.title}</h3>
                <p className="jdi-step-copy">{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="jdi-client-band jdi-body-band">
        <div className="jdi-client-shell">
          <div className="jdi-client-band-head">
            <p className="jdi-eyebrow">Client and use case</p>
            <h2 className="jdi-heading jdi-heading-client">{residential.title}</h2>
          </div>

          <div className="jdi-client-band-content">
            <div className="jdi-client-columns">
              <div className="jdi-client-copy-group">
                <p className="jdi-detail-label">{residential.kicker}</p>
                <p className="jdi-copy">{residential.body}</p>
                {residential.secondary ? <p className="jdi-copy jdi-copy-muted">{residential.secondary}</p> : null}
              </div>

              <div className="jdi-client-copy-group">
                <p className="jdi-detail-label">{client.kicker}</p>
                <p className="jdi-copy">{client.body}</p>
                {client.secondary ? <p className="jdi-copy jdi-copy-muted">{client.secondary}</p> : null}
              </div>
            </div>

            <div className="jdi-client-notes">
              {clientNotes.map((item) => (
                <div key={item.label} className="jdi-client-note">
                  <span className="jdi-note-label">{item.label}</span>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function renderJohnPortfolio(page: ExamplePage, fallbackSrc: string) {
  const [, gallery, shared] = page.sections;

  if (
    gallery?.type !== "gallery" ||
    shared?.type !== "cards" ||
    !page.heroImage ||
    gallery.images.length < 3
  ) {
    return null;
  }

  const sharedSummary =
    "Across different scales and briefs, the work is still defined by correction rather than display: a home becomes calmer, more coherent, and easier to inhabit without losing intimacy.";

  const projectIndex = [
    { id: "belgravia", title: "Belgravia Townhouse", location: "London", descriptor: "Residential refinement" },
    { id: "primrose", title: "Primrose Hill Apartment", location: "London", descriptor: "Furnishing and atmosphere" },
    { id: "holland", title: "Holland Park Residence", location: "London", descriptor: "Quiet material palette" },
    { id: "nottinghill", title: "Notting Hill House", location: "London", descriptor: "Family home clarity" },
  ];
  const previewProjects = [
    {
      id: "belgravia",
      title: "Belgravia Townhouse",
      meta: "London / Residential refinement",
      src: page.heroImage.src,
      alt: page.heroImage.alt,
    },
    {
      id: "primrose",
      title: "Primrose Hill Apartment",
      meta: "London / Furnishing and atmosphere",
      src: gallery.images[0].src,
      alt: gallery.images[0].alt,
    },
    {
      id: "holland",
      title: "Holland Park Residence",
      meta: "London / Quiet material palette",
      src: gallery.images[1].src,
      alt: gallery.images[1].alt,
    },
    {
      id: "nottinghill",
      title: "Notting Hill House",
      meta: "London / Family home clarity",
      src: gallery.images[2].src,
      alt: gallery.images[2].alt,
    },
  ];
  return (
    <div className="jdp-portfolio-main">
      <section id="portfolio-menu" className="portfolio-entry">
        <div className="portfolio-entry-inner">
          <div className="portfolio-entry-left">
            <div className="jdp-portfolio-archive-intro">
              <h1 className="jdp-portfolio-archive-title">Projects</h1>
            </div>

            <ul className="portfolio-entry-list" aria-label="Selected portfolio projects">
              {projectIndex.map((project, index) => (
                <li key={project.id} className="portfolio-entry-item">
                  <a
                    href={`#${project.id}`}
                    className={`jdp-portfolio-archive-link${index === 0 ? " is-active" : ""}`}
                    data-preview-id={project.id}
                  >
                    <span className="jdp-portfolio-archive-link-name">{project.title}</span>
                    <span className="jdp-portfolio-archive-link-meta">
                      {project.location} / {project.descriptor}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="portfolio-entry-preview" aria-hidden="true">
            <div className="portfolio-entry-preview-stage">
              {previewProjects.map((project, index) => (
                <article
                  key={project.id}
                  className={`portfolio-entry-preview-card${index === 0 ? " is-default" : ""}`}
                >
                  <figure className="portfolio-entry-preview-figure">
                    <ExampleSiteImage
                      src={project.src}
                      fallbackSrc={fallbackSrc}
                      alt={project.alt}
                      width={1600}
                      height={1200}
                      className="portfolio-entry-preview-image"
                      sizes="(max-width: 1023px) 100vw, 320px"
                      priority={index === 0}
                    />
                  </figure>
                  <div className="portfolio-entry-preview-copy">
                    <p className="portfolio-entry-preview-label">Preview</p>
                    <h2 className="portfolio-entry-preview-title">{project.title}</h2>
                    <p className="portfolio-entry-preview-meta">{project.meta}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-projects">
        <div className="portfolio-return-row">
          <a href="#portfolio-menu" className="portfolio-return-link">
            View other projects
          </a>
        </div>

        <section id="belgravia" className="jdp-portfolio-section jdp-portfolio-section-lead">
          <div className="jdp-portfolio-shell">
            <div className="jdp-portfolio-head jdp-portfolio-head-lead">
              <p className="jdp-portfolio-eyebrow">Lead project</p>
              <h2 className="jdp-portfolio-band-title">Belgravia Townhouse</h2>
              <p className="jdp-portfolio-band-intro">
                A family townhouse edited toward greater warmth, continuity, and a quieter sense of structure from one room
                to the next.
              </p>
            </div>

            <div className="jdp-portfolio-feature-split jdp-portfolio-feature-split-lead">
              <figure className="jdp-portfolio-image-wrap jdp-portfolio-image-wrap-lead">
                <ExampleSiteImage
                  src={page.heroImage.src}
                  fallbackSrc={fallbackSrc}
                  alt={page.heroImage.alt}
                  width={2200}
                  height={1500}
                  className="jdp-portfolio-image"
                  sizes="(max-width: 1023px) 100vw, 64vw"
                  priority
                />
              </figure>

              <div className="jdp-portfolio-feature-copy jdp-portfolio-panel">
                <p className="jdp-portfolio-detail-label">London</p>
                <div className="jdp-portfolio-copy-group">
                  <p className="jdp-portfolio-body jdp-portfolio-body-lead">
                    This project focused on bringing warmth, continuity, and a quieter sense of structure to a family
                    townhouse.
                  </p>
                  <p className="jdp-portfolio-body jdp-portfolio-body-muted">
                    Materials were selected to soften visual noise and allow the rooms to feel composed rather than staged.
                  </p>
                </div>

                <dl className="jdp-portfolio-meta-row" aria-label="Belgravia Townhouse details">
                  <div>
                    <dt>Type</dt>
                    <dd>Townhouse</dd>
                  </div>
                  <div>
                    <dt>Scope</dt>
                    <dd>Interior furnishing and refinement</dd>
                  </div>
                  <div>
                    <dt>Focus</dt>
                    <dd>Warmth, flow, restraint</dd>
                  </div>
                </dl>

                <div className="jdp-portfolio-detail-stack" aria-label="Belgravia Townhouse design notes">
                  <p className="jdp-portfolio-body jdp-portfolio-body-muted">
                    Circulation between principal rooms was refined, perimeter joinery was simplified, and furnishing was
                    used to steady the transition from one space to the next rather than compete for attention.
                  </p>
                  <p className="jdp-portfolio-body jdp-portfolio-body-muted">
                    Finishes were kept low in contrast so natural light, tactile surfaces, and the continuity of tone
                    could do more of the atmospheric work throughout the house.
                  </p>
                  <div>
                    <span>Refined</span>
                    <p>Circulation, joinery restraint, softened lighting balance.</p>
                  </div>
                  <div>
                    <span>Intent</span>
                    <p>To create a warmer, quieter sequence of rooms that felt settled in daily use.</p>
                  </div>
                  <div>
                    <span>Atmosphere</span>
                    <p>Layered warmth, steadier transitions, and a calmer visual cadence from room to room.</p>
                  </div>
                  <p className="jdp-portfolio-body jdp-portfolio-body-muted">
                    Throughout the scheme, the aim was to let material continuity and a softer register of contrast carry
                    the sense of finish, so the house could feel complete without becoming overly composed.
                  </p>
                  <div>
                    <span>Material note</span>
                    <p>Oak, plaster, and quieter textiles were used to hold warmth while keeping visual density low.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      <section className="jdp-portfolio-section jdp-portfolio-section-secondary">
        <div className="jdp-portfolio-shell">
          <div className="jdp-portfolio-supporting-split">
            <div className="jdp-portfolio-supporting-primary">
              <div className="jdp-portfolio-head">
                <p className="jdp-portfolio-eyebrow">Secondary residences</p>
                <h2 className="jdp-portfolio-section-title">
                  Projects are chosen for what they reveal about the studio&apos;s way of correcting a home.
                </h2>
                <p className="jdp-portfolio-section-copy">
                  The edit is deliberately small. Each residence is shown because it clarifies how atmosphere, circulation,
                  material quietness, and furnishing are resolved together.
                </p>
              </div>

              <article id="primrose" className="jdp-portfolio-residence-primary">
                <figure className="jdp-portfolio-image-wrap jdp-portfolio-image-wrap-portrait">
                  <ExampleSiteImage
                    src={gallery.images[0].src}
                    fallbackSrc={fallbackSrc}
                    alt={gallery.images[0].alt}
                    width={1500}
                    height={1900}
                    className="jdp-portfolio-image"
                    sizes="(max-width: 1023px) 100vw, 56vw"
                    loading="lazy"
                  />
                </figure>

                <div className="jdp-portfolio-project-caption">
                  <p className="jdp-portfolio-detail-label">Primrose Hill Apartment</p>
                  <h3 className="jdp-portfolio-project-title jdp-portfolio-project-title-small">London</h3>
                  <p className="jdp-portfolio-body jdp-portfolio-body-muted">
                    An apartment refined around light, texture, and a calmer rhythm of daily use.
                  </p>
                </div>
              </article>
            </div>

              <div className="jdp-portfolio-supporting-side">
                <div className="jdp-portfolio-note-panel jdp-portfolio-panel">
                  <p className="jdp-portfolio-detail-label">Editorial note</p>
                  <p className="jdp-portfolio-note-copy">
                    Rather than showing scale for its own sake, the portfolio stays close to rooms where the correction is
                  felt in proportion, comfort, and visual quietness.
                </p>
              </div>

              <article id="holland" className="jdp-portfolio-residence-side jdp-portfolio-panel">
                <figure className="jdp-portfolio-image-wrap jdp-portfolio-image-wrap-landscape">
                  <ExampleSiteImage
                    src={gallery.images[1].src}
                    fallbackSrc={fallbackSrc}
                    alt={gallery.images[1].alt}
                    width={1700}
                    height={1280}
                    className="jdp-portfolio-image"
                    sizes="(max-width: 1023px) 100vw, 34vw"
                    loading="lazy"
                  />
                </figure>

                  <div className="jdp-portfolio-project-caption">
                    <p className="jdp-portfolio-detail-label">Holland Park Residence</p>
                    <h3 className="jdp-portfolio-project-title jdp-portfolio-project-title-small">London</h3>
                    <p className="jdp-portfolio-body jdp-portfolio-body-muted">
                      A residence edited around material quietness, softness of light, and steadier spatial flow.
                    </p>
                  </div>
                </article>

                <div className="jdp-portfolio-principles-shell jdp-portfolio-panel">
                  {shared.items.map((item, index) => (
                    <article key={item.title} className="jdp-portfolio-principle">
                      <span className="jdp-portfolio-principle-index">{String(index + 1).padStart(2, "0")}</span>
                      <div className="jdp-portfolio-principle-body">
                        <h3 className="jdp-portfolio-principle-title">{item.title}</h3>
                        <p className="jdp-portfolio-body jdp-portfolio-body-muted">{item.copy}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="jdp-portfolio-section jdp-portfolio-section-principles">
          <div className="jdp-portfolio-shell">
            <div className="jdp-portfolio-head jdp-portfolio-principles-head">
              <p className="jdp-portfolio-eyebrow">{shared.kicker}</p>
              <h2 className="jdp-portfolio-section-title">What these homes have in common.</h2>
              <p className="jdp-portfolio-section-copy">{sharedSummary}</p>
            </div>
          </div>
        </section>

      <section className="jdp-portfolio-section jdp-portfolio-section-closing">
        <div className="jdp-portfolio-shell">
          <div id="nottinghill" className="jdp-portfolio-feature-split jdp-portfolio-feature-split-closing">
            <div className="jdp-portfolio-feature-copy jdp-portfolio-panel">
              <p className="jdp-portfolio-eyebrow">Private residential project</p>
              <h2 className="jdp-portfolio-section-title jdp-portfolio-section-title-large">
                Quiet rooms that feel complete without feeling finished.
              </h2>
              <p className="jdp-portfolio-detail-label">Notting Hill House, London</p>

                <div className="jdp-portfolio-copy-group">
                  <p className="jdp-portfolio-body jdp-portfolio-body-lead">
                    The work here was less about transformation than correction. Circulation, scale, and furnishing were
                    brought into closer alignment so the house could feel settled, lighter, and more coherent in daily use.
                  </p>
                  <p className="jdp-portfolio-body jdp-portfolio-body-muted">
                    Layers were edited with restraint so the rooms could read as lived-in and complete rather than overworked.
                  </p>
                </div>

              <dl className="jdp-portfolio-meta-row" aria-label="Notting Hill House details">
                <div>
                  <dt>Type</dt>
                  <dd>Family home</dd>
                </div>
                <div>
                  <dt>Scope</dt>
                  <dd>Spatial refinement</dd>
                </div>
                <div>
                  <dt>Character</dt>
                  <dd>Layered, calm, lived-in</dd>
                </div>
              </dl>

                <div className="jdp-portfolio-detail-stack" aria-label="Notting Hill House design notes">
                  <p className="jdp-portfolio-body jdp-portfolio-body-muted">
                    Attention was given to thresholds, seating depth, and softer material balance so the house could hold a
                    calmer rhythm without losing texture or domestic warmth.
                  </p>
                  <div>
                    <span>Adjusted</span>
                    <p>Room-to-room flow, furnishing scale, and the layering of quieter contrasts.</p>
                  </div>
                <div>
                  <span>Result</span>
                  <p>A home that feels more settled, lighter in mood, and complete without reading as over-finished.</p>
                </div>
              </div>
            </div>

            <figure className="jdp-portfolio-image-wrap jdp-portfolio-image-wrap-secondary">
              <ExampleSiteImage
                src={gallery.images[2].src}
                fallbackSrc={fallbackSrc}
                alt={gallery.images[2].alt}
                width={1900}
                height={2200}
                className="jdp-portfolio-image"
                sizes="(max-width: 1023px) 100vw, 52vw"
                loading="lazy"
              />
            </figure>
          </div>

          <div className="jdp-portfolio-register-shell jdp-portfolio-panel">
            <div className="jdp-portfolio-index-head">
              <p className="jdp-portfolio-eyebrow">Selected projects</p>
              <h2 className="jdp-portfolio-section-title">A small register of residential work shaped through restraint.</h2>
              <p className="jdp-portfolio-section-copy">
                The index is deliberately concise, keeping the emphasis on a smaller group of homes that best describe the
                studio&apos;s point of view.
              </p>
            </div>

            <div className="jdp-portfolio-index-list" role="list" aria-label="Selected residential projects">
              {projectIndex.map((project) => (
                <div key={project.title} className="jdp-portfolio-index-row" role="listitem">
                  <p className="jdp-portfolio-index-name">{project.title}</p>
                  <p className="jdp-portfolio-index-location">{project.location}</p>
                  <p className="jdp-portfolio-index-descriptor">{project.descriptor}</p>
                </div>
              ))}
            </div>

              <div className="jdp-portfolio-closing-shell">
                <p className="jdp-portfolio-closing-quote">
                  A home should feel quietly right once first impressions fade.
                </p>
              </div>
          </div>
        </div>
      </section>
    </section>
  </div>
  );
}

function renderJohnContact(page: ExamplePage) {
  const [opening, fit, consultation, response, useful] = page.sections;

  if (
    opening?.type !== "split" ||
    fit?.type !== "cards" ||
    consultation?.type !== "contact" ||
    response?.type !== "split" ||
    useful?.type !== "cards"
  ) {
    return null;
  }

  const openingTitle = "Begin a considered conversation.";
  const openingCopy =
    "The studio welcomes residential enquiries where calm direction, material clarity, and a measured process matter from the outset.";
  const studioNote =
    "Projects are taken on selectively, with the first exchange used to understand the home, the intended atmosphere, and whether the brief suits the studio's quieter way of working.";
  const projectFits = fit.items.slice(0, 3);
  const helpfulDetails = useful.items.slice(0, 3);

  return (
    <div className="jdc-contact-page">
      <section className="jdc-contact-opening">
        <div className="jdc-contact-opening-grid">
          <div className="jdc-contact-opening-copy">
            <p className="jdc-contact-eyebrow">{page.heroEyebrow}</p>
            <h1 className="jdc-contact-title">{openingTitle}</h1>
            <p className="jdc-contact-lead">{openingCopy}</p>
          </div>

          <aside className="jdc-contact-opening-note">
            <p className="jdc-contact-detail-label">Studio note</p>
            <p className="jdc-contact-note-copy">{studioNote}</p>

            <div className="jdc-contact-opening-details" aria-label="Studio details">
              {consultation.details.map((detail) => (
                <div key={detail.label} className="jdc-contact-opening-detail">
                  <span>{detail.label}</span>
                  <p>{detail.value}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="jdc-contact-enquiry">
        <div className="jdc-contact-enquiry-shell">
          <div className="jdc-contact-enquiry-copy">
            <p className="jdc-contact-eyebrow">{opening.kicker}</p>
            <h2 className="jdc-contact-section-title">{opening.title}</h2>
            <p className="jdc-contact-body">{opening.body}</p>
            {opening.secondary ? <p className="jdc-contact-body jdc-contact-body-muted">{opening.secondary}</p> : null}

            <div className="jdc-contact-fit-list" aria-label="Projects that suit the studio">
              {projectFits.map((item) => (
                <article key={item.title} className="jdc-contact-fit-item">
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>

            <div className="jdc-contact-followup">
              <p className="jdc-contact-detail-label">{response.kicker}</p>
              <p className="jdc-contact-body jdc-contact-body-muted">{response.body}</p>
              {response.secondary ? <p className="jdc-contact-body jdc-contact-body-muted">{response.secondary}</p> : null}
            </div>
          </div>

          <div className="jdc-contact-form-shell">
            <div className="jdc-contact-form-head">
              <p className="jdc-contact-detail-label">{consultation.kicker}</p>
              <h2 className="jdc-contact-form-title">{consultation.title}</h2>
              <p className="jdc-contact-body jdc-contact-body-muted">{consultation.copy}</p>
            </div>

            <form className="jdc-contact-form" action="#" method="post" aria-label="Demo enquiry form">
              <div className="jdc-contact-form-grid">
                <label className="jdc-contact-field">
                  <span>Name</span>
                  <input type="text" name="name" autoComplete="name" readOnly />
                </label>

                <label className="jdc-contact-field">
                  <span>Email</span>
                  <input type="email" name="email" autoComplete="email" readOnly />
                </label>

                <label className="jdc-contact-field">
                  <span>Location</span>
                  <input type="text" name="location" autoComplete="address-level2" readOnly />
                </label>

                <label className="jdc-contact-field">
                  <span>Timing</span>
                  <input type="text" name="timing" readOnly />
                </label>

                <label className="jdc-contact-field jdc-contact-field-full">
                  <span>Project scope</span>
                  <input type="text" name="scope" readOnly />
                </label>

                <label className="jdc-contact-field jdc-contact-field-full">
                  <span>Brief overview</span>
                  <textarea name="brief" rows={6} readOnly />
                </label>
              </div>

              <div className="jdc-contact-form-footer">
                <button type="button" className="jdc-contact-submit" aria-disabled="true">
                  Enquiry form preview
                </button>
                <p className="jdc-contact-form-note">
                  Shown here as part of the website concept. The live enquiry route would be connected during a real build.
                </p>
              </div>
            </form>

            <div className="jdc-contact-helpful" aria-label="Useful to include">
              {helpfulDetails.map((item) => (
                <article key={item.title} className="jdc-contact-helpful-item">
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function renderJohnHomeEnding(page: ExamplePage) {
  const closing = page.sections[6];

  if (closing?.type !== "quote") {
    return null;
  }

  return (
    <section className="jdi-ending-standalone">
      <div className="jdi-ending-standalone-inner">
        <p className="jdi-ending-standalone-quote">{closing.quote}</p>
      </div>
    </section>
  );
}

function renderJohnHomeTitle() {
  return (
    <section className="jdi-hero-title-row">
      <p className="jdi-hero-pretitle">LONDON - EST. 2024</p>
      <h1 className="jdi-hero-title">John Doe Interiors</h1>
    </section>
  );
}

function renderAlderHome(site: PackageExample, page: ExamplePage, fallbackSrc: string) {
  const orderedPages = ALDER_NAV_ORDER
    .map((slug) => site.pages.find((item) => item.slug === slug))
    .filter((item): item is ExamplePage => Boolean(item));
  const cards = page.sections.find((section) => section.type === "cards");
  const split = page.sections.find((section) => section.type === "split");
  const gallery = page.sections.find((section) => section.type === "gallery");
  const quote = page.sections.find((section) => section.type === "quote");
  const portfolioHref = buildExampleHref(site.slug, "portfolio");
  const contactHref = buildExampleHref(site.slug, "contact");

  return (
    <div className="alder-home-showcase">
      <section className="alder-home-hero" aria-labelledby="alder-home-title">
        <nav className="alder-home-nav" aria-label={`${site.brandName} navigation`}>
          {orderedPages.map((item) => (
            <Link
              key={item.slug || "home"}
              href={buildExampleHref(site.slug, item.slug)}
              className={`alder-home-nav-link ${item.slug === page.slug ? "alder-home-nav-link-active" : ""}`.trim()}
            >
              {item.navLabel ?? item.label}
            </Link>
          ))}
        </nav>

        <div className="alder-home-hero-grid">
          <div className="alder-home-hero-copy">
            <p className="example-site-kicker">{page.heroEyebrow}</p>
            <h1 id="alder-home-title" className="alder-home-title">
              {page.heroTitle}
            </h1>
            <p className="alder-home-lead">{page.heroCopy}</p>
            <div className="alder-home-actions">
              <Link href={contactHref} className="example-site-button">
                Start a House build
              </Link>
              <Link href={portfolioHref} className="example-site-button alder-home-button-secondary">
                View portfolio
              </Link>
            </div>
          </div>

          <div className="alder-home-hero-media">
            {page.heroImage ? (
              <div className="alder-home-hero-frame">
                <ExampleSiteImage
                  src={page.heroImage.src}
                  fallbackSrc={fallbackSrc}
                  alt={page.heroImage.alt}
                  fill
                  className="alder-home-image"
                  sizes="(max-width: 899px) 100vw, 52vw"
                  priority
                />
              </div>
            ) : null}
          </div>

          <aside className="alder-home-proof">
            <p className="example-site-kicker">The House package</p>
            {renderPackageMetrics(site, "alder-home-metrics")}
          </aside>
        </div>
      </section>

      {cards?.type === "cards" ? (
        <section className="alder-home-package" aria-labelledby="alder-home-package-title">
          <div className="alder-home-section-head">
            <p className="example-site-kicker">{cards.kicker}</p>
            <h2 id="alder-home-package-title" className="alder-home-section-title">
              {cards.title}
            </h2>
          </div>
          <div className="alder-home-card-grid">
            {cards.items.map((item, index) => (
              <article key={item.title} className="alder-home-card">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {split?.type === "split" ? (
        <section className="alder-home-split">
          <div className="alder-home-split-copy">
            <p className="example-site-kicker">{split.kicker}</p>
            <h2 className="alder-home-section-title">{split.title}</h2>
            <p>{split.body}</p>
            {split.secondary ? <p>{split.secondary}</p> : null}
          </div>
          {split.image ? (
            <figure className="alder-home-split-frame">
              <ExampleSiteImage
                src={split.image.src}
                fallbackSrc={fallbackSrc}
                alt={split.image.alt}
                fill
                className="alder-home-image"
                sizes="(max-width: 899px) 100vw, 42vw"
                loading="lazy"
              />
            </figure>
          ) : null}
        </section>
      ) : null}

      {gallery?.type === "gallery" ? (
        <section className="alder-home-gallery" aria-labelledby="alder-home-gallery-title">
          <div className="alder-home-section-head alder-home-section-head-wide">
            <p className="example-site-kicker">{gallery.kicker}</p>
            <h2 id="alder-home-gallery-title" className="alder-home-section-title">
              {gallery.title}
            </h2>
          </div>
          <div className="alder-home-gallery-grid">
            {gallery.images.map((image) => (
              <figure key={image.src} className="alder-home-gallery-card">
                <div className="alder-home-gallery-frame">
                  <ExampleSiteImage
                    src={image.src}
                    fallbackSrc={fallbackSrc}
                    alt={image.alt}
                    fill
                    className="alder-home-image"
                    sizes="(max-width: 899px) 100vw, 33vw"
                    loading="lazy"
                  />
                </div>
                {image.caption ? <figcaption>{image.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {quote?.type === "quote" ? (
        <section className="alder-home-quote">
          <blockquote>
            <p>{quote.quote}</p>
            {quote.attribution ? <footer>{quote.attribution}</footer> : null}
          </blockquote>
        </section>
      ) : null}

      {renderPackageRibbon(site)}
    </div>
  );
}

function renderMaisonHome(site: PackageExample, page: ExamplePage, fallbackSrc: string) {
  const gallery = page.sections.find((section) => section.type === "gallery");
  const split = page.sections.find((section) => section.type === "split");
  const cards = page.sections.find((section) => section.type === "cards");
  const quote = page.sections.find((section) => section.type === "quote");
  const portfolioHref = buildExampleHref(site.slug, "portfolio");
  const contactHref = buildExampleHref(site.slug, "contact");

  return (
    <div className="maison-home-showcase">
      <section className="maison-home-hero" aria-labelledby="maison-home-title">
        <div className="maison-home-hero-media">
          {page.heroImage ? (
            <div className="maison-home-hero-frame">
                <ExampleSiteImage
                  src={page.heroImage.src}
                  fallbackSrc={fallbackSrc}
                  alt={page.heroImage.alt}
                  fill
                  className="maison-home-image"
                  sizes="100vw"
                  priority
                />
            </div>
          ) : null}
        </div>

        <div className="maison-home-hero-panel">
          <p className="example-site-kicker">{page.heroEyebrow}</p>
          <h1 id="maison-home-title" className="maison-home-title">
            {page.heroTitle}
          </h1>
          <p className="maison-home-lead">{page.heroCopy}</p>
          <div className="maison-home-actions">
            <Link href={contactHref} className="example-site-button">
              Request White Glove consultation
            </Link>
            <Link href={portfolioHref} className="example-site-button maison-home-button-secondary">
              View selected work
            </Link>
          </div>
        </div>

        <aside className="maison-home-proof">
          <p className="example-site-kicker">White Glove</p>
          {renderPackageMetrics(site, "maison-home-metrics")}
        </aside>
      </section>

      {gallery?.type === "gallery" ? (
        <section className="maison-home-gallery" aria-labelledby="maison-home-gallery-title">
          <div className="maison-home-section-head">
            <p className="example-site-kicker">{gallery.kicker}</p>
            <h2 id="maison-home-gallery-title" className="maison-home-section-title">
              {gallery.title}
            </h2>
          </div>
          <div className="maison-home-gallery-grid">
            {gallery.images.map((image) => (
              <figure key={image.src} className="maison-home-gallery-card">
                <div className="maison-home-gallery-frame">
                  <ExampleSiteImage
                    src={image.src}
                    fallbackSrc={fallbackSrc}
                    alt={image.alt}
                    fill
                    className="maison-home-image"
                    sizes="(max-width: 899px) 100vw, 33vw"
                    loading="lazy"
                  />
                </div>
                {image.caption ? <figcaption>{image.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {split?.type === "split" ? (
        <section className="maison-home-split">
          <div className="maison-home-split-copy">
            <p className="example-site-kicker">{split.kicker}</p>
            <h2 className="maison-home-section-title">{split.title}</h2>
            <p>{split.body}</p>
            {split.secondary ? <p>{split.secondary}</p> : null}
          </div>
          {split.image ? (
            <figure className="maison-home-split-frame">
              <ExampleSiteImage
                src={split.image.src}
                fallbackSrc={fallbackSrc}
                alt={split.image.alt}
                fill
                className="maison-home-image"
                sizes="(max-width: 899px) 100vw, 44vw"
                loading="lazy"
              />
            </figure>
          ) : null}
        </section>
      ) : null}

      {cards?.type === "cards" ? (
        <section className="maison-home-depth" aria-labelledby="maison-home-depth-title">
          <div className="maison-home-section-head">
            <p className="example-site-kicker">{cards.kicker}</p>
            <h2 id="maison-home-depth-title" className="maison-home-section-title">
              {cards.title}
            </h2>
          </div>
          <div className="maison-home-card-grid">
            {cards.items.map((item) => (
              <article key={item.title} className="maison-home-card">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {quote?.type === "quote" ? (
        <section className="maison-home-quote">
          <blockquote>
            <p>{quote.quote}</p>
            {quote.attribution ? <footer>{quote.attribution}</footer> : null}
          </blockquote>
        </section>
      ) : null}

      {renderPackageRibbon(site)}
    </div>
  );
}

function renderHeader(site: PackageExample, page: ExamplePage) {
  const navLinks = renderNavLinks(site, page);
  const isJohnHome = site.theme === "john" && page.slug === "";
  const isAlderHome = site.theme === "alder" && page.slug === "";

  if (isAlderHome) {
    return null;
  }

  if (site.theme === "alder") {
    return null;
  }

  if (site.theme === "maison") {
    return (
      <header className="example-site-header example-site-header-maison">
        <div className="example-site-bar example-site-bar-maison">
          <Link href={buildExampleHref(site.slug)} className="example-site-brand" aria-label={`${site.brandName} home`}>
            <span className="example-site-brand-name">{site.brandName}</span>
            <span className="example-site-brand-tagline">{site.brandTagline}</span>
          </Link>
          <div className="example-site-header-maison-side">
            <Link href="/about#projects" className="example-site-back example-site-back-maison">
              Back to Projects
            </Link>
            <nav className="example-site-nav example-site-nav-maison" aria-label={`${site.brandName} navigation`}>
              {navLinks}
            </nav>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="example-site-header example-site-header-john example-site-header-john-sticky-shared">
      <div
        className={`example-site-bar example-site-bar-john example-site-bar-john-sticky-shared ${isJohnHome ? "example-site-bar-john-home" : ""}`.trim()}
      >
        <nav
          className="example-site-nav example-site-nav-john example-site-nav-john-sticky-shared"
          aria-label={`${site.brandName} navigation`}
        >
          {navLinks}
        </nav>
      </div>
    </header>
  );
}

function renderHero(site: PackageExample, page: ExamplePage, fallbackSrc: string) {
  const pageLabel = page.slug ? page.label : "Homepage";
  const slug = slugClassName(page.slug);
  const heroImage = page.heroImage;
  const showHeroEyebrow = !(site.theme === "john" && page.slug === "");
  const heroEmphasis = "quieter sense of rightness";

  if (site.theme === "alder") {
    if (!heroImage) {
      return null;
    }

    return (
      <section className={`example-site-hero example-site-hero-alder example-site-hero-${slug}`}>
        <div className="example-site-hero-copy example-site-hero-copy-alder">
          <p className="example-site-kicker">{page.heroEyebrow}</p>
          <h1 className="example-site-hero-title">{page.heroTitle}</h1>
          <p className="example-site-body example-site-hero-body">{page.heroCopy}</p>
        </div>
        <aside className="example-site-hero-meta example-site-hero-meta-alder">
          <span className="example-site-hero-meta-label">Studio page</span>
          <strong>{pageLabel}</strong>
          <p>{site.brandTagline}</p>
          {renderPackageMetrics(site, "example-package-metrics-hero")}
        </aside>
        <div className="example-site-hero-media">
          <div className="example-site-hero-frame">
            <ExampleSiteImage
              src={heroImage.src}
              fallbackSrc={fallbackSrc}
              alt={heroImage.alt}
              width={2200}
              height={1500}
              className="example-site-hero-image"
              sizes="(max-width: 1023px) 100vw, 60vw"
              priority
            />
          </div>
        </div>
      </section>
    );
  }

  if (site.theme === "maison") {
    if (!heroImage) {
      return null;
    }

    return (
      <section className={`example-site-hero example-site-hero-maison example-site-hero-${slug}`}>
        <div className="example-site-hero-media">
          <div className="example-site-hero-frame">
            <ExampleSiteImage
              src={heroImage.src}
              fallbackSrc={fallbackSrc}
              alt={heroImage.alt}
              width={2200}
              height={1500}
              className="example-site-hero-image"
              sizes="(max-width: 1023px) 100vw, 68vw"
              priority
            />
          </div>
        </div>
        <div className="example-site-hero-copy example-site-hero-copy-maison">
          <p className="example-site-kicker">{page.heroEyebrow}</p>
          <h1 className="example-site-hero-title">{page.heroTitle}</h1>
          <p className="example-site-body example-site-hero-body">{page.heroCopy}</p>
        </div>
        <aside className="example-site-hero-meta example-site-hero-meta-maison">
          <span className="example-site-hero-meta-label">{pageLabel}</span>
          <p>{site.brandTagline}</p>
          {renderPackageMetrics(site, "example-package-metrics-hero")}
        </aside>
      </section>
    );
  }

  return (
    <section
      className={`example-site-hero example-site-hero-john example-site-hero-${slug} ${heroImage ? "" : "example-site-hero-no-media"}`.trim()}
    >
      <div className="example-site-hero-copy">
        {showHeroEyebrow ? <p className="example-site-kicker">{page.heroEyebrow}</p> : null}
        <h1 className="example-site-hero-title">{page.heroTitle}</h1>
        <p className="example-site-body example-site-hero-body">
          {site.theme === "john" && page.slug === "" && page.heroCopy.includes(heroEmphasis) ? (
            <>
              {page.heroCopy.split(heroEmphasis)[0]}
              <span className="example-site-hero-emphasis">{heroEmphasis}</span>
              {page.heroCopy.split(heroEmphasis)[1]}
            </>
          ) : (
            page.heroCopy
          )}
        </p>
      </div>
      {heroImage ? (
        <div className="example-site-hero-media">
          <div className="example-site-hero-frame">
            <ExampleSiteImage
              src={heroImage.src}
              fallbackSrc={fallbackSrc}
              alt={heroImage.alt}
              width={2200}
              height={1500}
              className="example-site-hero-image"
              sizes="(max-width: 1023px) 100vw, 58vw"
              priority
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}

function renderCta(site: PackageExample, extraClassName = "") {
  const presentation = getPackagePresentation(site);

  return (
    <section className={`example-site-cta ${extraClassName}`.trim()}>
      <div className="example-site-cta-inner">
        <p className="example-site-kicker">{presentation.label}</p>
        <h2 className="example-site-title">{presentation.ctaTitle}</h2>
        <p className="example-site-body example-site-body-muted">{presentation.ctaCopy}</p>
        <div className="example-site-cta-row">
          <Link href="/contact" className="example-site-button">
            Enquire about a build like this
          </Link>
        </div>
      </div>
    </section>
  );
}

function renderFloatingJohnCta() {
  return (
    <div className="example-site-floating-cta">
      <Link href="/about#projects" className="example-site-button example-site-floating-cta-button example-site-floating-cta-button-secondary">
        Back to Projects
      </Link>
      <Link href="/contact" className="example-site-button example-site-floating-cta-button">
        Enquire about a build like this
      </Link>
    </div>
  );
}

export default function ExampleWebsite({ site, page }: ExampleWebsiteProps) {
  const fallbackSrc = THEME_FALLBACKS[site.theme];
  const pageClassName = `example-page-${slugClassName(page.slug)}`;
  const isJohnHome = site.theme === "john" && page.slug === "";
  const isAlderHome = site.theme === "alder" && page.slug === "";
  const isAlderAbout = site.theme === "alder" && page.slug === "about";
  const isMaisonHome = site.theme === "maison" && page.slug === "";
  const isJohnPortfolio = site.theme === "john" && page.slug === "portfolio";
  const isJohnContact = site.theme === "john" && page.slug === "contact";
  const shouldRenderDedicatedCta = site.theme !== "john" && !isAlderAbout;
  const alderMenuItems =
    site.theme === "alder"
      ? ALDER_NAV_ORDER
          .map((slug) => site.pages.find((item) => item.slug === slug))
          .filter((item): item is ExamplePage => Boolean(item))
          .map((item) => ({
            href: buildExampleHref(site.slug, item.slug),
            label: item.navLabel ?? item.label,
            active: item.slug === page.slug,
          }))
      : [];

  return (
    <div className={`example-site example-theme-${site.theme} ${pageClassName}`}>
      {site.theme === "alder" && !isAlderHome ? (
        <AlderSiteMenu ariaLabel={`${site.brandName} navigation`} items={alderMenuItems} />
      ) : null}

      {renderHeader(site, page)}

      {isJohnHome ? renderJohnHomeTitle() : null}

      <main
        className={`example-site-main ${isJohnHome ? "!w-full !max-w-none !mx-0 !px-0" : ""} ${isAlderHome ? "example-site-main-alder-home" : ""}`.trim()}
      >
        {isJohnHome ? (
          renderJohnHome(page)
        ) : isAlderHome ? (
          renderAlderHome(site, page, fallbackSrc)
        ) : isMaisonHome ? (
          renderMaisonHome(site, page, fallbackSrc)
        ) : isAlderAbout ? (
          <>
            <AlderAboutPage site={site} page={page} fallbackSrc={fallbackSrc} />
            {renderPackageRibbon(site)}
            {renderCta(site, "example-site-cta-alder-about")}
          </>
        ) : isJohnPortfolio ? (
          renderJohnPortfolio(page, fallbackSrc)
        ) : isJohnContact ? (
          renderJohnContact(page)
        ) : (
          <>
            {renderHero(site, page, fallbackSrc)}
            {site.theme !== "john" ? renderPackageRibbon(site) : null}
            {page.sections.map((section, index) => renderSection(site, section, index, page.slug))}
            {shouldRenderDedicatedCta ? renderCta(site) : null}
          </>
        )}
      </main>

      {isJohnHome ? renderJohnHomeEnding(page) : null}

      {site.theme === "john" ? renderFloatingJohnCta() : null}

      {isAlderHome || isAlderAbout ? null : (
        <footer className="example-site-footer">
          <div className="example-site-footer-inner">
            <p>{site.footerNote}</p>
          </div>
        </footer>
      )}
    </div>
  );
}
