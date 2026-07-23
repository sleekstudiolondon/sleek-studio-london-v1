import type { Metadata } from "next";
import type { ReactNode } from "react";
import MaisonFooter from "./_components/MaisonFooter";
import MaisonHeader from "./_components/MaisonHeader";
import "./maison-form.css";

export const metadata: Metadata = {
  title: "Maison Form - Interior Architecture",
  description: "A fictional White Glove interior architecture website demonstration by Sleek Studio London.",
};

export default function MaisonFormLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mf-site">
      <MaisonHeader />
      <main className="mf-main">{children}</main>
      <MaisonFooter />
    </div>
  );
}
