import type { ExamplePage, PackageExample } from "@/lib/packageExamples";
import AlderGlobalPresenceSection from "./AlderGlobalPresenceSection";

type AlderAboutPageProps = {
  site: PackageExample;
  page: ExamplePage;
  fallbackSrc: string;
};

const PHILOSOPHY = [
  {
    title: "Architectural calm",
    copy: "The work is structured through proportion, pacing, and material restraint before decoration enters the conversation.",
  },
  {
    title: "Studio-scale confidence",
    copy: "Creative direction, technical development, and delivery are held together so the studio feels established at every point of contact.",
  },
  {
    title: "International fluency",
    copy: "The practice is positioned to speak clearly across private homes, boutique commercial work, and broader cross-border commissions.",
  },
];

const APPROACH = [
  {
    number: "01",
    title: "Creative Direction",
    copy: "Brief, atmosphere, and architectural intent are aligned early so the project reads with clarity from the first move.",
  },
  {
    number: "02",
    title: "Design Development",
    copy: "Planning, materials, lighting, and furnishing are resolved as one composed language rather than separate layers.",
  },
  {
    number: "03",
    title: "Material Strategy",
    copy: "Selections are made for texture, permanence, and how they support the larger spatial rhythm of the scheme.",
  },
  {
    number: "04",
    title: "Project Delivery",
    copy: "Coordination remains measured and exacting so the final experience feels controlled, premium, and complete.",
  },
];

const STUDIO_FACTS = [
  { label: "Projects", value: "100+" },
  { label: "Established", value: "2017" },
  { label: "Based", value: "Copenhagen" },
  { label: "Focus", value: "Residential + Boutique Commercial" },
];

const CLOSING_POINTS = [
  "Private residential commissions with a calmer architectural point of view.",
  "Boutique commercial environments designed with the same level of restraint and control.",
  "A studio presence built to speak confidently across local and international briefs.",
];

export default function AlderAboutPage({ site, page }: AlderAboutPageProps) {
  return (
    <div className="alder-about-profile alder-about-profile-rebuilt">
      <section className="alder-about-opening-stage" aria-labelledby="alder-about-intro">
        <div className="alder-about-opening-grid">
          <div className="alder-about-opening-meta" aria-label="Studio metadata">
            <p className="alder-about-section-label alder-about-opening-label">Studio Profile</p>
            <p className="alder-about-opening-meta-line alder-about-opening-meta-brand">{site.brandName}</p>
            <p className="alder-about-opening-meta-line">Copenhagen</p>
            <p className="alder-about-opening-meta-line">Established 2017</p>
          </div>

          <div className="alder-about-opening-anchor">
            <div className="alder-about-opening-copy-shell">
              <h1 id="alder-about-intro" className="alder-about-opening-title">
                {page.heroTitle}
              </h1>
              <p className="alder-about-opening-lead">{page.heroCopy}</p>
            </div>
          </div>

          <aside className="alder-about-opening-note" aria-label="Studio positioning">
            <p className="alder-about-section-label">Studio Note</p>
            <p className="alder-about-opening-note-copy">
              A calm European practice structured to hold creative direction, technical development, and delivery within
              one composed design language.
            </p>
          </aside>
        </div>

        <div className="alder-about-opening-stats" aria-label="Studio details">
          {STUDIO_FACTS.map((fact) => (
            <div key={fact.label} className="alder-about-opening-stat">
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </div>
          ))}
        </div>

        <div className="alder-about-opening-editorial">
          <div className="alder-about-editorial-intro" aria-labelledby="alder-about-philosophy-title">
            <div className="alder-about-block-head">
              <p className="alder-about-section-label">Philosophy + Approach</p>
              <h2 id="alder-about-philosophy-title" className="alder-about-block-title alder-about-philosophy-title">
                A studio language built through proportion, material restraint, and a measured delivery rhythm.
              </h2>
            </div>
            <p className="alder-about-editorial-intro-copy">
              The page should feel like an established design house: precise in tone, calm in execution, and substantial
              enough to carry larger international commissions with confidence.
            </p>
          </div>

          <div className="alder-about-editorial-cards">
            <div className="alder-about-editorial-column alder-about-editorial-column-philosophy">
              {PHILOSOPHY.map((item) => (
                <article key={item.title} className="alder-about-philosophy-card">
                  <p className="alder-about-card-index">{item.title}</p>
                  <p className="alder-about-card-copy">{item.copy}</p>
                </article>
              ))}
            </div>

            <div className="alder-about-editorial-column alder-about-editorial-column-approach" aria-labelledby="alder-about-approach-title">
              <h3 id="alder-about-approach-title" className="alder-about-approach-stage-title">
                A measured delivery structure designed for layered commissions.
              </h3>
              {APPROACH.map((step) => (
                <article key={step.number} className="alder-about-process-card">
                  <span className="alder-about-process-number">{step.number}</span>
                  <div className="alder-about-process-copy">
                    <h3 className="alder-about-process-title">{step.title}</h3>
                    <p>{step.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="alder-about-global-presence" aria-labelledby="alder-about-global-presence-title">
        <div className="alder-about-global-presence-head">
          <p className="alder-about-section-label alder-about-global-presence-label">Global Presence</p>
          <div className="alder-about-global-presence-intro">
            <h2 id="alder-about-global-presence-title" className="alder-about-block-title alder-about-global-presence-title">
              Presence across major design capitals.
            </h2>
            <p className="alder-about-global-presence-copy">
              Selected residential and boutique commercial work across Europe, the Middle East, and major international
              design capitals.
            </p>
          </div>
        </div>
        <AlderGlobalPresenceSection />
      </section>

      <section className="alder-about-closing-stage" aria-labelledby="alder-about-closing-title">
        <div className="alder-about-closing-rule" aria-hidden="true" />
        <div className="alder-about-closing-grid">
          <div className="alder-about-closing-main">
            <p className="alder-about-section-label">Closing Statement</p>
            <h2 id="alder-about-closing-title" className="alder-about-block-title alder-about-closing-title">
              Designed to feel established, internationally fluent, and ready for a broader client conversation.
            </h2>
          </div>

          <div className="alder-about-closing-support">
            <p className="alder-about-closing-copy">
              Studio Alder is positioned for clients who want atmosphere carried through with clarity, control, and a
              quieter sense of confidence.
            </p>
            <div className="alder-about-closing-points" aria-label="Closing highlights">
              {CLOSING_POINTS.map((point, index) => (
                <p key={point}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {point}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
