import MaisonImage from "../_components/MaisonImage";
import MaisonPageIntro from "../_components/MaisonPageIntro";
import { disciplines } from "../_lib/content";

export default function MaisonAboutPage() {
  return (
    <>
      <MaisonPageIntro
        eyebrow="About Us"
        title={
          <>
            <span>A studio of</span>
            <em>considered contrasts.</em>
          </>
        }
        intro="Maison Form is a fictional interior architecture practice created to demonstrate the depth, pacing and content systems of Sleek Studio's White Glove offer."
      />
      <MaisonImage
        asset="maison-library.webp"
        alt="Oxblood private library portrait representing Maison Form."
        className="mf-about-portrait"
        sizes="42vw"
      />
      <section className="mf-about-story">
        <p className="mf-eyebrow">Our character</p>
        <h2>
          Old and new.
          <span>Instinct and rigour.</span>
          <em>Silence and surprise.</em>
        </h2>
        <div>
          <p>
            We believe memorable rooms resist easy definition. They feel collected rather than completed: clear in
            their architecture, generous in atmosphere, and precise in every touch.
          </p>
          <p>
            This demonstration deliberately avoids invented awards, dates or credentials. In a real White Glove
            commission, this system becomes the client's verified history, team, philosophy and international point of
            view.
          </p>
        </div>
      </section>
      <section className="mf-disciplines">
        <div>
          <p className="mf-eyebrow">Studio disciplines</p>
          <h2>
            A collective
            <em>point of view.</em>
          </h2>
        </div>
        <div className="mf-ruled-list">
          {disciplines.map((discipline, index) => (
            <article key={discipline.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{discipline.title}</h3>
                <p>{discipline.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="mf-quote-band">
        <blockquote>“A room should reveal itself slowly—and continue to reward attention.”</blockquote>
        <p className="mf-eyebrow">Maison Form · Studio principle</p>
      </section>
    </>
  );
}
