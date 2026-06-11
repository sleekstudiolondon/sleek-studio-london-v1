import PageShell from "../../../components/layout/PageShell";
import Section from "../../../components/ui/Section";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Kicker from "../../../components/ui/Kicker";
import GlobalPresenceMap from "../../../components/marketing/GlobalPresenceMap";

const PHILOSOPHY = [
  {
    title: "Quiet authority",
    copy: "Presence is built through pacing, hierarchy, and restraint rather than noise.",
  },
  {
    title: "Editorial precision",
    copy: "Every page is structured to make the studio's standard feel immediate and legible.",
  },
  {
    title: "Senior-led delivery",
    copy: "Strategy, design direction, and build quality stay aligned from first brief to launch.",
  },
];

const APPROACH = [
  {
    step: "01",
    title: "Position the practice clearly",
    copy: "We define what must be understood first, what can wait, and how the studio should read at a glance.",
  },
  {
    step: "02",
    title: "Compose the narrative",
    copy: "Copy, imagery, spacing, and flow are shaped together so the site feels resolved, not assembled.",
  },
  {
    step: "03",
    title: "Build with discipline",
    copy: "Responsive development, performance, and interaction are handled with the same care as the visual system.",
  },
  {
    step: "04",
    title: "Launch with control",
    copy: "Reviews stay concise, decisions stay visible, and the final rollout remains calm from preview to go-live.",
  },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com/sleekstudiolondon",
    handle: "@sleekstudiolondon",
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@sleekstudiolondon",
    handle: "@sleekstudiolondon",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      className="about-page-shell"
      eyebrow="About"
      title="Sleek Studio London"
      subtitle="Senior-led strategy, editorial design, and web development for interior practices that need to read as established, exacting, and international."
      heroFooter={
        <div className="about-hero-presence-shell" aria-label="Studio positioning">
          <div className="about-hero-presence-divider" aria-hidden="true" />
          <div className="about-hero-presence-row">
            <span className="about-hero-presence-pill">Senior-led direction</span>
            <span className="about-hero-presence-pill">Editorial web systems</span>
            <span className="about-hero-presence-pill">Global-facing positioning</span>
          </div>
        </div>
      }
    >
      <Section divider className="about-philosophy-section">
        <div className="about-section-head">
          <div className="about-section-copy">
            <Kicker>Philosophy</Kicker>
            <h2 className="section-title about-section-title">Digital presence that feels composed before a word is read.</h2>
          </div>
          <p className="section-copy about-section-lead">
            The work is less about decoration and more about control. We shape sites that hold attention quickly,
            guide it cleanly, and leave the studio feeling established from the opening scroll.
          </p>
        </div>
        <div className="about-philosophy-grid">
          {PHILOSOPHY.map((item) => (
            <Card key={item.title} className="about-philosophy-card content-card">
              <h3 className="card-title">{item.title}</h3>
              <p className="card-copy">{item.copy}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section divider tone="wash" className="about-approach-section">
        <div className="about-section-head about-section-head-wide">
          <div className="about-section-copy">
            <Kicker>Approach</Kicker>
            <h2 className="section-title about-section-title">Structured to feel calm, exacting, and ready for a larger stage.</h2>
          </div>
          <p className="section-copy about-section-lead">
            Each project moves through a deliberate sequence so strategy, presentation, and technical execution stay in
            step. The result is measured, premium, and easy to carry across teams and markets.
          </p>
        </div>
        <div className="about-approach-grid">
          {APPROACH.map((item) => (
            <article key={item.step} className="about-approach-card">
              <p className="about-approach-step">{item.step}</p>
              <h3 className="about-approach-title">{item.title}</h3>
              <p className="about-approach-copy">{item.copy}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="global-presence" className="about-presence-section">
        <GlobalPresenceMap />
      </Section>

      <Section narrow center className="about-closing-section">
        <Kicker>Closing Statement</Kicker>
        <h2 className="section-title about-closing-title">
          Built for studios that want their online presence to feel as resolved as the spaces they deliver.
        </h2>
        <p className="section-copy about-closing-copy">
          We work quietly, move precisely, and keep standards high from first brief to final launch.
        </p>
        <div className="about-social-block" aria-label="Follow Sleek Studio London">
          <p className="about-social-label">Follow Sleek Studio London</p>
          <div className="about-social-row">
            {SOCIALS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="about-social-link"
              >
                <span>{item.label}</span>
                <strong>{item.handle}</strong>
              </a>
            ))}
          </div>
        </div>
        <div className="button-row about-closing-actions">
          <Button href="/contact">Start a conversation</Button>
        </div>
      </Section>
    </PageShell>
  );
}
