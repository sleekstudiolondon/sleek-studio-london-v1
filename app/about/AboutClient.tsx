'use client'

import Image from 'next/image'
import { useState } from 'react'

const team = [
  {
    name: 'Elena Ward',
    role: 'Creative Director',
    bio: 'Leads editorial storytelling and brand refinement for luxury studios.',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Marcus Chen',
    role: 'Digital Experience Lead',
    bio: 'Crafts serene, high-converting web experiences and refined UI systems.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Isabelle Knight',
    role: 'Strategy & Partnerships',
    bio: 'Shapes positioning, pricing, and client acquisition with calm precision.',
    image:
      'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Ravi Patel',
    role: 'Brand Designer',
    bio: 'Builds visual identities grounded in muted palettes and tactile detail.',
    image:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Solvia Alvarez',
    role: 'Content Director',
    bio: 'Curates imagery and copy that feel calm, luxurious, and editorial.',
    image:
      'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Noah Gallagher',
    role: 'Client Experience',
    bio: 'Guides studio partners through launches with precision and care.',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80'
  }
]

const values = [
  {
    title: 'Quiet Luxury',
    detail: 'We favor restraint, negative space, and confident typography over visual noise.'
  },
  {
    title: 'Measured Performance',
    detail: 'Every elegant interface is supported by fast, conversion-ready execution.'
  },
  {
    title: 'Bespoke Partnerships',
    detail: 'We take on limited engagements to keep every detail genuinely tailored.'
  }
]

const storySections = [
  {
    id: 'philosophy',
    title: 'Philosophy',
    body:
      'We build digital experiences with the same calm precision that defines the interiors we serve. Every touchpoint is curated to feel intentional and premium.'
  },
  {
    id: 'approach',
    title: 'Approach',
    body:
      'We begin with discovery, define a luxury narrative, and deliver an editorial-quality presence that supports growth without overexposure.'
  },
  {
    id: 'partnerships',
    title: 'Partnerships',
    body:
      'We work with a limited number of studios to ensure every engagement receives senior attention and a bespoke level of care.'
  }
]

export default function AboutPage() {
  const [activeValue, setActiveValue] = useState<number | null>(null)
  const [openSections, setOpenSections] = useState<string[]>([])

  return (
    <main className="mx-auto max-w-6xl px-6 pb-28">
      <section className="about-surface mt-10">
        <div className="about-ornament about-ornament-left" />
        <div className="about-ornament about-ornament-right" />
        <p className="eyebrow">About the studio</p>
        <h1 className="font-serif text-4xl sm:text-5xl mb-4">
          A digital atelier dedicated to interior design excellence.
        </h1>
        <p className="text-neutral-600 max-w-2xl">
          Sleek Studio London was founded to give interior designers a refined digital presence that
          feels as considered as their projects. We pair quiet, luxurious visuals with thoughtful
          strategy to help studios attract the right clients.
        </p>
      </section>

      <section className="mt-20 section-grid">
        <div>
          <p className="eyebrow">Our story</p>
          <h2 className="font-serif text-3xl sm:text-4xl mb-4">Design-led. Detail-obsessed.</h2>
          <p className="text-neutral-600 mb-4">
            From concept to launch, we craft experiences that feel quietly opulent. Our team blends
            brand strategy, luxury art direction, and modern digital craft to help interior designers
            stand apart in an increasingly crowded landscape.
          </p>
          <div className="story-reveal">
            {storySections.map(section => (
              <button
                key={section.id}
                type="button"
                className={`story-panel ${openSections.includes(section.id) ? 'is-open' : ''}`}
                onClick={() =>
                  setOpenSections(prev =>
                    prev.includes(section.id)
                      ? prev.filter(item => item !== section.id)
                      : [...prev, section.id]
                  )
                }
              >
                <div className="story-panel-head">
                  <span className="font-serif text-lg">{section.title}</span>
                  <span className="text-sm text-neutral-400">{openSections.includes(section.id) ? 'Hide' : 'Read'}</span>
                </div>
                {openSections.includes(section.id) && (
                  <p className="mt-3 text-sm text-neutral-600">{section.body}</p>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="card">
          <p className="eyebrow">Studio values</p>
          <div className="space-y-3">
            {values.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className="w-full text-left rounded-2xl border border-neutral-200/70 px-4 py-4 transition hover:border-neutral-400/60"
                onClick={() => setActiveValue(prev => (prev === index ? null : index))}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg">{item.title}</span>
                  <span className="text-sm text-neutral-400">Read</span>
                </div>
                {activeValue === index && (
                  <p className="mt-3 text-sm text-neutral-600">
                    {item.detail}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="section-header">
          <div>
            <p className="eyebrow">Team</p>
            <h2 className="font-serif text-3xl sm:text-4xl mb-3">A small team with senior focus.</h2>
            <p className="text-neutral-600 max-w-xl">
              Specialists in luxury brand direction, digital experience, and refined content systems.
            </p>
          </div>
          <span className="badge">London + Global</span>
        </div>

        <div className="team-grid">
          {team.map(member => (
            <article key={member.name} className="team-card">
              <Image
                src={member.image}
                alt={member.name}
                width={1200}
                height={1400}
                className="team-photo"
              />
              <div className="p-4">
                <h3 className="font-serif text-xl">{member.name}</h3>
                <p className="text-sm text-neutral-500">{member.role}</p>
                <p className="mt-2 text-sm text-neutral-600">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 section-surface">
        <div className="cta-panel">
          <div>
            <p className="eyebrow">Working style</p>
            <h2 className="font-serif text-3xl sm:text-4xl mb-4">
              Collaborative, calm, and exceptionally tailored.
            </h2>
            <p className="text-neutral-600 mb-6">
              We begin with a deep discovery session, align on a luxury narrative, and build a digital
              experience that feels editorial and effortlessly premium.
            </p>
            <a href="/contact" className="btn-primary">Start a conversation</a>
          </div>
          <div className="cta-note">
            <p className="font-serif text-2xl mb-3">Personal, not templated.</p>
            <p className="text-sm text-neutral-600">
              Every interaction is crafted to reinforce the studio's bespoke approach.
            </p>
            <div className="cta-badges">
              <span className="badge">Senior Team</span>
              <span className="badge">Luxury Focus</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
