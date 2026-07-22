import MaisonImage from "../../_components/MaisonImage";

export default function MaterialMemoryPage() {
  return (
    <article className="mf-article">
      <header className="mf-article-header">
        <p className="mf-eyebrow">Materials · Journal 01</p>
        <h1>
          The beauty of
          <em>a living finish.</em>
        </h1>
        <p>Patina is not an imperfection. It is evidence that a room has entered into conversation with time.</p>
      </header>
      <MaisonImage
        asset="maison-hero.webp"
        alt="Sunlit Paris townhouse used as the Material Memory article hero."
        className="mf-article-image"
        priority
        sizes="94vw"
      />
      <section className="mf-article-body">
        <p>
          The most convincing interiors rarely appear untouched. Stone carries tonal shifts. Timber deepens around the
          grain. Bronze records every hand that reaches for a door.
        </p>
        <p>
          We value finishes that become more particular through use. This does not mean leaving an interior unresolved;
          it means specifying with enough knowledge to understand how beauty will change.
        </p>
        <blockquote>Material becomes meaningful when it carries both origin and time.</blockquote>
        <p>
          In practice, that requires samples at architectural scale, close conversations with makers, and a willingness
          to let natural variation remain visible. Precision and character are not opposites. The most enduring rooms
          depend on both.
        </p>
      </section>
    </article>
  );
}
