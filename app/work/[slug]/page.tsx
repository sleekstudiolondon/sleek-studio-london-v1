import Image from 'next/image'
import Link from 'next/link'
import { caseStudies } from '@/lib/caseStudies'
import { notFound } from 'next/navigation'

export const dynamicParams = false

export function generateStaticParams() {
  return caseStudies.map(cs => ({ slug: cs.slug }))
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const cs = caseStudies.find(c => c.slug === params.slug)
  if (!cs) return notFound()

  return (
    <main className="max-w-4xl mx-auto px-6 py-24">
      <Link href="/work" className="btn-secondary mb-8">
        Back to work
      </Link>
      <div className="image-frame mb-8">
        <Image
          src={cs.image}
          alt={cs.title}
          width={1800}
          height={1200}
          sizes="(max-width: 768px) 100vw, 900px"
          priority
        />
      </div>
      <p className="eyebrow">{cs.location} - {cs.year}</p>
      <h1 className="font-serif text-4xl mb-4">{cs.title}</h1>
      <p className="text-neutral-600 mb-8">{cs.summary}</p>
      <p className="mb-4"><strong>Challenge:</strong> {cs.challenge}</p>
      <p className="mb-4"><strong>Approach:</strong> {cs.strategy}</p>
      <p className="mb-4"><strong>Outcome:</strong> {cs.impact}</p>
      <p className="mb-8"><strong>Business impact:</strong> {cs.businessImpact}</p>
    </main>
  )
}
