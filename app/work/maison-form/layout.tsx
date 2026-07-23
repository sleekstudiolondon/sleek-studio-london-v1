import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import MaisonFooter from "./_components/MaisonFooter";
import MaisonHeader from "./_components/MaisonHeader";
import "./maison-form.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maison Form - Interior Architecture",
  description: "A fictional White Glove interior architecture website demonstration by Sleek Studio London.",
};

export default function MaisonFormLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`mf-site ${geistSans.variable}`}>
      <MaisonHeader />
      <main className="mf-main">{children}</main>
      <MaisonFooter />
    </div>
  );
}
