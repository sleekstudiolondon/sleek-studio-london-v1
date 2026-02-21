'use client'

import Image from 'next/image'
import Link from 'next/link'
import { caseStudies } from '@/lib/caseStudies'

export default function WorkPage() {
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
          {caseStudies.map(project => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="case-card"
              aria-label={`Read case study: ${project.title}`}
            >
              <div className="case-image">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={1400}
                  height={1800}
                  className="image-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
                <div className="case-overlay">
                  <p className="work-meta">{project.location} - {project.year}</p>
                  <h3 className="font-serif text-xl">{project.title}</h3>
                  <p className="text-sm text-white/80">{project.focus}</p>
                </div>
              </div>
              <div className="case-body">
                <p className="text-sm text-neutral-600">{project.summary}</p>
                <div className="case-details">
                  <p><strong>Studio challenge:</strong> {project.challenge}</p>
                  <p><strong>Strategy:</strong> {project.strategy}</p>
                  <p><strong>Growth achieved:</strong> {project.impact}</p>
                  <span className="badge">View case study</span>
                </div>
              </div>
            </Link>
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

