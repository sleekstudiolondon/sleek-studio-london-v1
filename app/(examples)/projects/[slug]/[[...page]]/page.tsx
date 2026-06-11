import { notFound } from "next/navigation";
import ExampleWebsite from "../../../../../components/examples/ExampleWebsite";
import { getPackageExampleBySlug, packageExamples } from "@/lib/packageExamples";

export const dynamicParams = false;

export function generateStaticParams() {
  return packageExamples.flatMap((site) =>
    site.pages.map((page) => (page.slug ? { slug: site.slug, page: [page.slug] } : { slug: site.slug })),
  );
}

export default async function ProjectExamplePage({
  params,
}: {
  params: Promise<{ slug: string; page?: string[] }>;
}) {
  const { slug, page } = await params;
  const site = getPackageExampleBySlug(slug);

  if (!site) {
    return notFound();
  }

  const pageSlug = page?.[0] ?? "";
  const currentPage = site.pages.find((entry) => entry.slug === pageSlug);

  if (!currentPage || (page && page.length > 1)) {
    return notFound();
  }

  return <ExampleWebsite site={site} page={currentPage} />;
}
