import MaisonPageIntro from "../_components/MaisonPageIntro";
import MaisonProjectLibrary from "../_components/MaisonProjectLibrary";

export default function MaisonProjectsPage() {
  return (
    <>
      <MaisonPageIntro
        eyebrow="Project library"
        title={
          <>
            Selected <em className="mf-inline-em">work.</em>
          </>
        }
        intro="Residences, retreats and places of gathering, each shaped by its own light, history and way of living."
        compact
      />
      <MaisonProjectLibrary />
    </>
  );
}
