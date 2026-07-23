import MaisonImage from "../../_components/MaisonImage";
import MaisonTextLink from "../../_components/MaisonTextLink";
import { maisonRoutes } from "../../_lib/routes";

export default function MaisonRivoliPage() {
  return (
    <article className="mf-case">
      <section className="mf-case-hero" aria-labelledby="mf-case-title">
        <div className="mf-case-meta">
          <span>Residential · Paris</span>
          <span>2026</span>
        </div>
        <h1 id="mf-case-title">
          Maison <em className="mf-inline-em">Rivoli</em>
        </h1>
        <MaisonImage asset="maison-hero.webp" alt="Maison Rivoli sunlit Paris townhouse interior." priority sizes="94vw" />
      </section>

      <section className="mf-case-story">
        <div>
          <p className="mf-eyebrow">The brief</p>
          <span>01 / 03</span>
        </div>
        <h2>
          A Parisian house,
          <span>edited for</span>
          <em>modern life.</em>
        </h2>
        <div>
          <p>
            The imagined commission begins with a simple question: how can a historic home feel generous and current
            without losing the intelligence of its original plan?
          </p>
          <p>
            New walnut portals clarify the sequence of rooms. Lime plaster softens the changing light. Furniture is
            placed sparingly, allowing architecture and art to hold equal weight.
          </p>
        </div>
      </section>

      <section className="mf-case-gallery">
        <MaisonImage asset="maison-library.webp" alt="Oxblood library material study for Maison Rivoli." sizes="64vw" />
        <aside>
          <p className="mf-eyebrow">Material study · 02</p>
          <p>Walnut, oxblood lacquer and hand-finished plaster bring depth without noise.</p>
        </aside>
        <MaisonImage asset="maison-coastal.webp" alt="Travertine living room gallery image." sizes="94vw" />
      </section>

      <section className="mf-next-project">
        <span>Next project</span>
        <MaisonTextLink href={maisonRoutes.projects}>Casa Levante</MaisonTextLink>
      </section>
    </article>
  );
}
