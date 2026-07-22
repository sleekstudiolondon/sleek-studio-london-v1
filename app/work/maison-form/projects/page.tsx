import MaisonPageIntro from "../_components/MaisonPageIntro";
import MaisonProjectLibrary from "../_components/MaisonProjectLibrary";

export default function MaisonProjectsPage() {
  return (
    <>
      <MaisonPageIntro
        eyebrow="Project library"
        title={
          <>
            <span>Selected</span>
            <em>work.</em>
          </>
        }
        intro="Residences, retreats and places of gathering, each shaped by its own light, history and way of living."
      />
      <MaisonProjectLibrary />
    </>
  );
}
