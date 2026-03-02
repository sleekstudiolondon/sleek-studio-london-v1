import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "../../../components/layout/PageShell";
import Section from "../../../components/ui/Section";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Kicker from "../../../components/ui/Kicker";
import { caseStudies } from "@/lib/caseStudies";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = caseStudies.find((entry) => entry.slug === slug);
  if (!cs) return notFound();

  return (
    <PageShell
      eyebrow="Case Study"
      title={cs.title}
      subtitle={`${cs.location} | ${cs.year} | ${cs.focus}`}
    >
      <Section narrow divider>
        <Link href="/work" className="ui-button ui-button-secondary">
          Back to work
        </Link>
        <Card as="article" className="content-card" hoverable={false}>
          <div className="work-image-frame">
            <Image
              src={cs.image}
              alt={cs.title}
              width={1800}
              height={1200}
              className="work-image-cover"
              sizes="(max-width: 768px) 100vw, 900px"
              priority
            />
          </div>
          <p className="section-copy">{cs.summary}</p>
        </Card>
      </Section>

      <Section narrow>
        <Kicker>Project details</Kicker>
        <ul className="list-soft">
          <li><strong>Challenge:</strong> {cs.challenge}</li>
          <li><strong>Approach:</strong> {cs.strategy}</li>
          <li><strong>Outcome:</strong> {cs.impact}</li>
          <li><strong>Business impact:</strong> {cs.businessImpact}</li>
        </ul>
      </Section>

      <Section narrow center>
        <h2 className="section-title">Ready for your own case-study-level website?</h2>
        <p className="section-note">We accept a limited number of projects each cycle.</p>
        <div className="button-row">
          <Button href="/contact">Apply now</Button>
        </div>
      </Section>
    </PageShell>
  );
}
