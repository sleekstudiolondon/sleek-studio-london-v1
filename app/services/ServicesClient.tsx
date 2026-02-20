'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'

const services = [
  {
    id: 'positioning',
    title: 'Brand Positioning & Identity',
    summary:
      'Clarify your studio voice, elevate perception, and build a visual system that feels quietly luxurious.',
    detail:
      'We refine your narrative, typography, and color palette to communicate confidence and restraint.',
    deliverables: ['Brand strategy', 'Logo refinement', 'Luxury palette system'],
    outcome: 'Ideal for studios refining premium positioning.'
  },
  {
    id: 'website',
    title: 'Website Design & Build',
    summary:
      'Editorial layouts, calming motion, and performance-driven builds that showcase projects with clarity.',
    detail:
      'We design and build an experience that feels bespoke, with smooth navigation and premium polish.',
    deliverables: ['UX architecture', 'High-end UI', 'SEO-ready build'],
    outcome: 'Best for studios seeking immediate lead lift.'
  },
  {
    id: 'content',
    title: 'Content & Social Direction',
    summary:
      "Calm, consistent feeds and content frameworks that reflect your studio's aesthetic.",
    detail:
      'We establish visual pillars, captions, and seasonal edits that align with your portfolio.',
    deliverables: ['Content pillars', 'Templates', 'Copy guidance'],
    outcome: 'Perfect for studios growing social authority.'
  },
  {
    id: 'seo',
    title: 'SEO & Local Visibility',
    summary:
      'Elevate discoverability without compromising luxury positioning.',
    detail:
      'We optimize your site for high-intent searches and refine local signals for London-based clients.',
    deliverables: ['On-page SEO', 'Local optimization', 'Content planning'],
    outcome: 'Great for steady lead flow in 6-12 months.'
  }
]

const packages = [
  {
    name: 'Foundation',
    price: 'from £3,500',
    bestFor: 'Early-stage studios seeking clarity and cohesion.',
    timeline: '4-6 weeks',
    includes: ['Brand audit', 'Light site refresh', 'Content direction']
  },
  {
    name: 'Signature',
    price: 'from £6,500',
    bestFor: 'Established practices ready to elevate positioning.',
    timeline: '6-8 weeks',
    includes: ['Brand strategy', 'Luxury website', 'SEO foundations'],
    featured: true
  },
  {
    name: 'Complete',
    price: 'from £10,000',
    bestFor: 'Full transformation across brand, web, and content.',
    timeline: '8-12 weeks',
    includes: ['Full identity system', 'Editorial site build', 'Content templates']
  },
  {
    name: 'Legacy',
    price: 'from £15,000',
    bestFor: 'Studios preparing for large-scale growth or international reach.',
    timeline: '12-16 weeks',
    includes: ['Positioning refresh', 'Multi-page web build', 'Launch campaign']
  }
]

export default function ServicesPage() {
  const [activeServices, setActiveServices] = useState<string[]>(['website', 'positioning'])
  const [timeframe, setTimeframe] = useState(6)

  const timeframeSummary = useMemo(() => {
    const emphasis = timeframe <= 4
      ? 'Rapid clarity + conversion alignment'
      : timeframe <= 7
        ? 'Balanced positioning and lead lift'
        : 'Compounded visibility and brand authority'

    const shortTermFocus = timeframe <= 4
      ? 'Refine messaging, optimise the site journey, and stabilise lead capture.'
      : timeframe <= 7
        ? 'Layer brand clarity with consistent enquiry growth.'
        : 'Build durable visibility and long-form authority signals.'

    const longTermImpact = timeframe <= 4
      ? 'Sharper qualification and higher-fit enquiries.'
      : timeframe <= 7
        ? 'Stronger perceived value and steadier premium demand.'
        : 'A resilient reputation that sustains premium pricing.'

    const momentum = timeframe <= 4
      ? 'Fast-start momentum with focused execution.'
      : timeframe <= 7
        ? 'Measured momentum that compounds each month.'
        : 'Long-horizon momentum with strategic depth.'

    const pacing = timeframe <= 4
      ? 'Month 1 clarifies positioning, Month 2 stabilises conversion, Month 3 builds visible lift.'
      : timeframe <= 7
        ? 'Early months sharpen messaging, mid-cycle boosts visibility, later months strengthen authority.'
        : 'Initial phase calibrates foundations, mid-phase compounds visibility, final phase elevates authority.'

    const firstImprovement = timeframe <= 4
      ? 'Visibility and enquiry quality improve first, followed by stronger authority signals.'
      : timeframe <= 7
        ? 'Enquiry volume lifts first, then authority perception strengthens.'
        : 'Authority signals build gradually, with enquiries rising steadily behind them.'

    const compounding = timeframe <= 4
      ? 'Momentum compounds through tighter messaging and higher-fit lead capture.'
      : timeframe <= 7
        ? 'Compounding comes from layered visibility and repeatable conversion steps.'
        : 'Compounding comes from sustained visibility and long-form trust signals.'

    return {
      emphasis,
      shortTermFocus,
      longTermImpact,
      momentum,
      pacing,
      firstImprovement,
      compounding
    }
  }, [timeframe])

  const summary = useMemo(() => {
    const selected = services.filter(service => activeServices.includes(service.id))
    const names = selected.map(item => item.title)
    const intensity = selected.length >= 3 ? 'high' : selected.length === 2 ? 'balanced' : 'focused'
    const statement = selected.length
      ? `This ${intensity} setup is ideal for studios aiming to grow in ${timeframe} months.`
      : 'Select services to see tailored outcomes.'
    const hasPositioning = activeServices.includes('positioning')
    const hasWebsite = activeServices.includes('website')
    const hasContent = activeServices.includes('content')
    const hasSeo = activeServices.includes('seo')

    const recommendedFor = selected.length === 0
      ? 'Select services to receive a strategy profile.'
      : hasWebsite && hasPositioning
        ? 'Studios ready to reposition and convert premium enquiries.'
        : hasSeo && hasContent
          ? 'Studios building consistent inbound visibility.'
          : hasWebsite
            ? 'Studios focused on immediate enquiry lift.'
            : hasPositioning
              ? 'Studios refining premium perception.'
              : 'Studios seeking focused improvements.'

    const bestTimeline = hasSeo
      ? '6-12 months for compounded visibility.'
      : intensity === 'high'
        ? '6-9 months for a layered rollout.'
        : intensity === 'balanced'
          ? '4-6 months for balanced uplift.'
          : '3-4 months for focused impact.'

    const expectedImpact = hasWebsite && hasPositioning
      ? 'Higher-quality enquiries with stronger positioning.'
      : hasWebsite && hasSeo
        ? 'Sustained inbound lead growth.'
        : hasContent
          ? 'Elevated editorial presence and authority.'
          : 'Clearer brand focus and improved confidence.'

    const reasoning = selected.length
      ? 'Services complement each other when brand clarity, conversion, and visibility are aligned.'
      : 'A tailored mix will improve positioning and lead quality.'
    return {
      names,
      statement,
      recommendedFor,
      bestTimeline,
      expectedImpact,
      reasoning
    }
  }, [activeServices, timeframe])

  const synergyNotes = useMemo(() => {
    if (!summary.names.length) {
      return [
        'Select two or more services to see how they reinforce one another.'
      ]
    }
    const notes: string[] = []
    if (activeServices.includes('positioning') && activeServices.includes('website')) {
      notes.push('Brand positioning improves conversion clarity and elevates enquiry quality.')
    }
    if (activeServices.includes('seo') && activeServices.includes('content')) {
      notes.push('SEO and content direction compound to build steady inbound demand.')
    }
    if (activeServices.includes('website') && activeServices.includes('seo')) {
      notes.push('Optimised site structure amplifies visibility gains from search.')
    }
    if (activeServices.includes('content') && activeServices.includes('positioning')) {
      notes.push('Editorial storytelling makes premium positioning tangible across channels.')
    }
    if (!notes.length) {
      notes.push('Your selected services align around a focused uplift in visibility and enquiry quality.')
    }
    return notes
  }, [activeServices, summary.names.length])

  return (
    <main className="mx-auto max-w-6xl px-6 pb-28">
      <section className="services-hero mt-10">
        <p className="eyebrow text-white/70">Services</p>
        <h1 className="font-serif text-4xl sm:text-5xl mb-4">
          Luxury marketing services for interior designers.
        </h1>
        <p className="text-neutral-200/90 max-w-2xl">
          We combine refined brand strategy with calm digital craftsmanship to position your studio
          for premium, design-led clients.
        </p>
      </section>

      <section className="mt-16 section-surface service-overview">
        <div>
          <p className="eyebrow">Strategic overview</p>
          <h2 className="font-serif text-3xl sm:text-4xl mb-4">
            Integrated services that build momentum.
          </h2>
          <p className="text-neutral-600">
            Each engagement is mapped across brand clarity, conversion confidence, and long-term visibility.
            We combine services to align perception, enquiry quality, and consistent growth signals.
          </p>
        </div>
        <div className="service-overview-panel">
          <p className="sim-metric-title">How we structure delivery</p>
          <p className="text-sm text-neutral-600">
            Strategy first, followed by the design and performance layers that sustain premium demand.
          </p>
          <div className="service-overview-divider" />
          <p className="text-sm text-neutral-600">
            Every service is calibrated to reinforce the others, so your studio feels cohesive and authoritative.
          </p>
        </div>
      </section>

      <section className="mt-20 section-grid section-surface">
        <div>
          <p className="eyebrow">Interactive planning</p>
          <h2 className="font-serif text-3xl sm:text-4xl mb-4">
            Build your service mix.
          </h2>
          <p className="text-neutral-600">
            Toggle services to preview outcomes and the ideal use case for your studio.
          </p>
          <div className="service-summary">
            <p className="text-sm text-neutral-600">{summary.statement}</p>
            {summary.names.length > 0 && (
              <div className="service-summary-list">
                {summary.names.map(item => (
                  <span key={item} className="sim-pill">{item}</span>
                ))}
              </div>
            )}
            <div className="service-summary-panel">
              <div className="service-summary-grid">
                <div>
                  <p className="sim-metric-title">Recommended for</p>
                  <p className="text-sm text-neutral-600">{summary.recommendedFor}</p>
                </div>
                <div>
                  <p className="sim-metric-title">Best timeline</p>
                  <p className="text-sm text-neutral-600">{summary.bestTimeline}</p>
                </div>
                <div>
                  <p className="sim-metric-title">Expected impact</p>
                  <p className="text-sm text-neutral-600">{summary.expectedImpact}</p>
                </div>
              </div>
              <p className="text-sm text-neutral-500">{summary.reasoning}</p>
            </div>
          </div>
          <label className="sim-label mt-6">
            Target timeframe: {timeframe} months
            <input
              className="sim-range lux-range"
              type="range"
              min={3}
              max={12}
              step={1}
              value={timeframe}
              onChange={event => setTimeframe(Number(event.target.value))}
            />
            <div className="timeframe-summary">
              <div>
                <p className="sim-metric-title">Recommended strategy emphasis</p>
                <p className="text-sm text-neutral-600">{timeframeSummary.emphasis}</p>
              </div>
              <div>
                <p className="sim-metric-title">Expected short-term focus</p>
                <p className="text-sm text-neutral-600">{timeframeSummary.shortTermFocus}</p>
              </div>
              <div>
                <p className="sim-metric-title">Long-term positioning impact</p>
                <p className="text-sm text-neutral-600">{timeframeSummary.longTermImpact}</p>
              </div>
              <div>
                <p className="sim-metric-title">Momentum outlook</p>
                <p className="text-sm text-neutral-600">{timeframeSummary.momentum}</p>
                <p className="text-sm text-neutral-600 mt-2">{timeframeSummary.pacing}</p>
                <p className="text-sm text-neutral-600 mt-2">{timeframeSummary.firstImprovement}</p>
                <p className="text-sm text-neutral-600 mt-2">{timeframeSummary.compounding}</p>
              </div>
            </div>
          </label>
        </div>

        <div className="service-toggle-grid">
          {services.map(service => (
            <button
              key={service.id}
              type="button"
              className={`service-toggle ${activeServices.includes(service.id) ? 'is-active' : ''}`}
              onClick={() =>
                setActiveServices(prev =>
                  prev.includes(service.id)
                    ? prev.filter(item => item !== service.id)
                    : [...prev, service.id]
                )
              }
            >
              <h3 className="font-serif text-xl">{service.title}</h3>
              <p className="text-sm text-neutral-600 mt-2">{service.summary}</p>
              <p className="text-sm text-neutral-500 mt-2">{service.outcome}</p>
              <div className="service-toggle-footer">
                <span className="badge">Includes</span>
                <ul>
                  {service.deliverables.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-16 section-surface">
        <p className="eyebrow">How this works together</p>
        <h2 className="font-serif text-3xl mb-6">Synergy between your selections.</h2>
        <div className="service-synergy">
          {synergyNotes.map(note => (
            <div key={note} className="service-synergy-card">
              <p className="text-sm text-neutral-600">{note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 section-grid">
        <div className="service-image">
          <Image
            src="https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1600&q=80"
            alt="Luxury interior with warm neutrals and soft light"
            width={1400}
            height={1000}
          />
        </div>
        <div>
          <p className="eyebrow">How we work</p>
          <h2 className="font-serif text-3xl sm:text-4xl mb-4">
            A calm, collaborative process.
          </h2>
          <p className="text-neutral-600 mb-4">
            We begin with discovery, move through curated concepts, and build a refined, performant
            digital presence that feels as tailored as your interiors.
          </p>
          <div className="service-notes">
            <span className="note-pill">Discovery</span>
            <span className="note-pill">Direction</span>
            <span className="note-pill">Design</span>
            <span className="note-pill">Launch</span>
          </div>
        </div>
      </section>

      <section className="mt-20 section-surface">
        <div className="decorative-block decor-block-right" />
        <h2 className="font-serif text-3xl mb-8">Packages</h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {packages.map(pkg => (
            <div
              key={pkg.name}
              className={`package-card ${pkg.featured ? 'package-highlight' : ''}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-xl">{pkg.name}</h3>
                {pkg.featured && <span className="badge">Most Popular</span>}
              </div>
              <p className="mb-1">{pkg.price}</p>
              <p className="text-sm text-neutral-500 mb-3">Timeline: {pkg.timeline}</p>
              <p className="text-sm text-neutral-600 mb-4">
                {pkg.bestFor}
              </p>
              <ul className="text-sm text-neutral-600">
                {pkg.includes.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
