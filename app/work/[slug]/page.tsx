import { caseStudies } from '@/lib/data'
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
      <h1 className="font-serif text-4xl mb-6">{cs.title}</h1>
      <p className="mb-4"><strong>Challenge:</strong> {cs.challenge}</p>
      <p className="mb-4"><strong>Approach:</strong> {cs.approach}</p>
      <p className="mb-8"><strong>Outcome:</strong> {cs.outcome}</p>
      <ul className="list-disc pl-6">
        {cs.metrics.map(m => <li key={m}>{m}</li>)}
      </ul>
    </main>
  )
}
