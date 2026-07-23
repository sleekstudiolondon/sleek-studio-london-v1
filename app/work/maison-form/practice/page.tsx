import MaisonImage from "../_components/MaisonImage";
import MaisonPageIntro from "../_components/MaisonPageIntro";
import { practiceStages, scopeItems } from "../_lib/content";

export default function MaisonPracticePage() {
  return (
    <>
      <MaisonPageIntro
        eyebrow="The practice"
        title={
          <>
            <span>One vision,</span>
            <em>every detail.</em>
          </>
        }
        intro="From the first spatial study to the last object placed, we imagine each commission as a complete and enduring world."
      />
      <MaisonImage
        asset="maison-coastal.webp"
        alt="Travertine Mediterranean living room used as the Maison Form practice image."
        className="mf-gutter-image"
        sizes="94vw"
      />
      <section className="mf-process">
        <div>
          <p className="mf-eyebrow">How we work</p>
          <h2>
            Rigour in the process.
            <em>Ease in the experience.</em>
          </h2>
        </div>
        <div className="mf-ruled-list">
          {practiceStages.map((stage, index) => (
            <article key={stage.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{stage.title}</h3>
                <p>{stage.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="mf-scope-band">
        <p className="mf-eyebrow">Our scope</p>
        <ul>
          {scopeItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
