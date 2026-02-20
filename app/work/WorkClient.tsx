'use client'

import Image from 'next/image'
import { useState } from 'react'

const projects = [
  {
    id: 'mayfair',
    title: 'Mayfair Townhouse',
    location: 'London',
    focus: 'Residential',
    year: '2025',
    summary: 'A layered, warm-neutral narrative with bespoke walnut joinery.',
    challenge: 'Reposition a heritage studio for a younger, design-forward clientele.',
    strategy: 'Premium positioning + editorial storytelling',
    impact: '38% increase in private enquiries within 6 months.',
    businessImpact: 'Shortlisted by two new international developers.',
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1800&q=80'
  },
  {
    id: 'riverside',
    title: 'Riverside Penthouse',
    location: 'Chelsea',
    focus: 'Residential',
    year: '2024',
    summary: 'Muted teal accents and sculptural lighting across open-plan living.',
    challenge: 'Increase qualified leads while maintaining a private, low-volume brand feel.',
    strategy: 'Website conversion lift + social authority',
    impact: '2.1x website engagement after launch.',
    businessImpact: 'Improved enquiry-to-consultation ratio by 30%.',
    image:
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1800&q=80'
  },
  {
    id: 'atelier',
    title: 'Atelier South',
    location: 'Soho',
    focus: 'Studio',
    year: '2025',
    summary: 'A creative studio reimagined in deep navy, brass, and pale stone.',
    challenge: 'Clarify positioning and improve lead qualification.',
    strategy: 'Brand positioning upgrade + lead qualification',
    impact: 'High-fit enquiries grew by 42% in 4 months.',
    businessImpact: 'Raised average project value by 18%.',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80'
  },
  {
    id: 'linden',
    title: 'Linden Park Suite',
    location: 'Kensington',
    focus: 'Hospitality',
    year: '2024',
    summary: 'Soft gold tones and layered textures for an intimate boutique suite.',
    challenge: 'Expand inbound visibility beyond referrals.',
    strategy: 'SEO foundation + editorial content system',
    impact: 'Qualified leads increased by 31% in 6 months.',
    businessImpact: 'Secured a multi-property contract within 8 months.',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80'
  }
]

export default function WorkPage() {
  const [activeId, setActiveId] = useState('mayfair')

  return (
    <main className="mx-auto max-w-6xl px-6 pb-28">
      <section className="work-hero mt-10">
        <div className="work-decor work-decor-left" />
        <div className="work-decor work-decor-right" />
        <p className="eyebrow text-white/70">Selected Work</p>
        <h1 className="font-serif text-4xl sm:text-5xl mb-4">
          Spaces that feel composed, elevated, and unmistakably bespoke.
        </h1>
        <p className="text-neutral-200/90 max-w-2xl">
          Interactive case studies that highlight strategy, growth, and impact.
        </p>
      </section>

      <section className="mt-20">
        <div className="section-header">
          <div>
            <p className="eyebrow">Portfolio</p>
            <h2 className="font-serif text-3xl sm:text-4xl mb-3">Luxury interiors with a modern edge.</h2>
            <p className="text-neutral-600 max-w-xl">
              Each project blends warm creams, deep navy, and soft gold accents to create a confident,
              lived-in elegance.
            </p>
          </div>
          <div className="badge">2023-2025</div>
        </div>

        <div className="case-grid">
          {projects.map(project => (
            <button
              key={project.id}
              type="button"
              className={`case-card ${activeId === project.id ? 'is-active' : ''}`}
              onClick={() => setActiveId(project.id)}
            >
              <div className="case-image">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={1400}
                  height={1800}
                  className="image-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="case-overlay">
                  <p className="work-meta">{project.location} - {project.year}</p>
                  <h3 className="font-serif text-xl">{project.title}</h3>
                  <p className="text-sm text-white/80">{project.focus}</p>
                </div>
              </div>
              <div className="case-body">
                <p className="text-sm text-neutral-600">{project.summary}</p>
                {activeId === project.id && (
                  <div className="case-details">
                    <p><strong>Studio challenge:</strong> {project.challenge}</p>
                    <p><strong>Strategy:</strong> {project.strategy}</p>
                    <p><strong>Growth achieved:</strong> {project.impact}</p>
                    <p><strong>Business impact:</strong> {project.businessImpact}</p>
                    <span className="badge">Case study</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-20 section-surface">
        <div className="decorative-block decor-block-right" />
        <div className="cta-panel">
          <div>
            <p className="eyebrow">Collaboration</p>
            <h2 className="font-serif text-3xl sm:text-4xl mb-4">
              A tailored digital presence for your next signature project.
            </h2>
            <p className="text-neutral-600 mb-6">
              We align every visual and message to your studio's aesthetic, presenting work with clarity
              and prestige.
            </p>
            <a href="/contact" className="btn-gold">Start a project</a>
          </div>
          <div className="cta-note">
            <p className="font-serif text-2xl mb-3">Portfolio-ready storytelling.</p>
            <p className="text-sm text-neutral-600">
              High-resolution galleries, refined layouts, and elegant micro-interactions.
            </p>
            <div className="cta-badges">
              <span className="badge">Luxury Interiors</span>
              <span className="badge">Editorial Style</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
