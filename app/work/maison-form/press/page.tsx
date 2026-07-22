import MaisonPageIntro from "../_components/MaisonPageIntro";
import { pressRows } from "../_lib/content";

export default function MaisonPressPage() {
  return (
    <>
      <MaisonPageIntro
        eyebrow="Press"
        title={
          <>
            <span>Selected</span>
            <em>recognition.</em>
          </>
        }
        intro="A flexible editorial system for features, interviews and studio announcements. All entries below are clearly marked demonstration copy."
      />
      <section className="mf-press-list">
        {pressRows.map((row) => (
          <article key={row.ordinal}>
            <span>{row.ordinal}</span>
            <p>{row.publication}</p>
            <h2>{row.title}</h2>
            <p>{row.type}</p>
            <span aria-hidden="true">↗</span>
          </article>
        ))}
      </section>
      <p className="mf-press-disclaimer">Demonstration content only · No publication endorsement is implied.</p>
    </>
  );
}
