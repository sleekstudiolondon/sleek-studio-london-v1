import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DemoSiteClient from "./DemoSiteClient";
import { caseStudies, getCaseStudyBySlug } from "@/lib/caseStudies";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.filter((cs) => cs.slug !== "maison-form").map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const site = getCaseStudyBySlug(slug);
  if (!site) return {};
  return {
    title: `${site.title} | Sleek Studio concept website`,
    description: site.summary,
  };
}

export default async function DemoWebsite({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = getCaseStudyBySlug(slug);
  if (!site) return notFound();

  return <DemoSiteClient site={site} />;
}
