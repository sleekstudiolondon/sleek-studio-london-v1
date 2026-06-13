"use client";

import type { CaseStudy } from "@/lib/caseStudies";
import JohnDemo from "./JohnDemo";
import MaisonFormDemo from "./MaisonFormDemo";
import StudioAlterDemo from "./StudioAlterDemo";

type DemoSiteClientProps = {
  site: CaseStudy;
};

export default function DemoSiteClient({ site }: DemoSiteClientProps) {
  if (site.slug === "studio-alter") return <StudioAlterDemo site={site} />;
  if (site.slug === "maison-form") return <MaisonFormDemo site={site} />;
  return <JohnDemo site={site} />;
}
