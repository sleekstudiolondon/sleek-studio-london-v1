import { notFound } from "next/navigation";
import DemoSiteClient from "./DemoSiteClient";
import { caseStudies, getCaseStudyBySlug } from "@/lib/caseStudies";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default async function DemoWebsite({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = getCaseStudyBySlug(slug);
  if (!site) return notFound();

  return <DemoSiteClient site={site} />;
}
