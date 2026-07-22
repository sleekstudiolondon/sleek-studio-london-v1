import type { ReactNode } from "react";

type MaisonPageIntroProps = {
  eyebrow: string;
  title: ReactNode;
  intro: string;
};

export default function MaisonPageIntro({ eyebrow, title, intro }: MaisonPageIntroProps) {
  return (
    <section className="mf-page-intro">
      <p className="mf-eyebrow">{eyebrow}</p>
      <div>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
    </section>
  );
}
