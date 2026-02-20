import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Process' }

export default function Process() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-24">
      <h1 className="font-serif text-4xl mb-10">Our process</h1>
      <ol className="space-y-3 text-neutral-600">
        <li>1. Discovery</li>
        <li>2. Positioning</li>
        <li>3. Visual direction</li>
        <li>4. Build + optimise</li>
        <li>5. Launch + refine</li>
      </ol>
    </main>
  )
}
