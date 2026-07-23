import type { ReactNode } from "react";

type MaisonPageIntroProps = {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  compact?: boolean;
};

export default function MaisonPageIntro({ eyebrow, title, intro, compact = false }: MaisonPageIntroProps) {
  return (
    <section className={`mf-page-intro ${compact ? "mf-page-intro--compact" : ""}`}>
      <p className="mf-eyebrow">{eyebrow}</p>
      <div>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
    </section>
  );
}
