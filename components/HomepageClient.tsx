'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

export default function HomepageClient() {
  // Lightbox modal state for the gallery (interactive feature).
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  // Section tracking for scroll-triggered reveals (interactive feature).
  const sectionsRef = useRef<HTMLElement[]>([])
  const [revealKeys, setRevealKeys] = useState<string[]>([])
  // Subtle parallax offset for hero accents (interactive animation).
  const [scrollY, setScrollY] = useState(0)
  const heroImage =
    'https://images.unsplash.com/photo-1615874959472-7a8a6a3d3b9f?auto=format&fit=crop&w=2200&q=75&fm=webp'

  // Gallery data: dynamic loop renders every image (no hardcoded <img> tags).
  const gallery = useMemo(() => [
    { title: 'Minimalist Kitchen', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=75&fm=webp' },
    { title: 'Luxury Bedroom Suite', url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=75&fm=webp' },
    { title: 'Elegant Workspace', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=75&fm=webp' },
    { title: 'Boutique Hotel Suite', url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=75&fm=webp' }
  ], [])

  // Scroll-triggered section reveals using IntersectionObserver (animation feature).
  useEffect(() => {
    const items = sectionsRef.current
    if (!items.length) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            const key = entry.target.dataset.revealKey
            if (key) {
              setRevealKeys(prev => (prev.includes(key) ? prev : [...prev, key]))
            }
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    )

    items.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  // Lightweight parallax for decorative layers (animation feature).
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY || 0)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lightbox modal keyboard handling for accessibility (interactive feature).
  useEffect(() => {
    if (activeIndex === null) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowRight') {
        setActiveIndex(prev => (prev === null ? 0 : (prev + 1) % gallery.length))
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex(prev => (prev === null ? 0 : (prev - 1 + gallery.length) % gallery.length))
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, gallery.length])

  const isRevealed = (key: string) => revealKeys.includes(key)

  return (
    <main className="mx-auto max-w-6xl px-6 pb-28">
      {/* Hero section with animated text and subtle motion overlay (luxury palette). */}
      <section
        className={`hero hero-full section-surface ${isRevealed('hero') ? 'reveal-up' : 'opacity-0 translate-y-6'}`}
        data-reveal-key="hero"
        ref={el => {
          if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el)
        }}
      >
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-bg-image"
        />
        {/* Decorative elements and soft gradients to add depth (design choice). */}
        <div
          className="decorative-orb decor-orb-top parallax-layer"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        />
        <div
          className="decorative-block decor-block-left parallax-layer"
          style={{ transform: `translateY(${scrollY * 0.04}px)` }}
        />
        <div className="hero-overlay" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(640px 300px at 85% 20%, rgba(7, 16, 30, 0.5), transparent 58%), linear-gradient(120deg, rgba(7, 16, 30, 0.52), rgba(7, 16, 30, 0.14))'
          }}
        />
        <div className="hero-inner">
          <p className="eyebrow">London Digital Atelier</p>
          <h1 className="font-serif text-5xl sm:text-6xl mb-6">
            Luxury Digital Marketing for Interior Designers
          </h1>
          <p className="text-lg text-neutral-200/90 max-w-2xl mb-8">
            Bespoke online experiences, refined campaigns, and quiet-luxury brand narratives
            that help studios attract discerning clients across London and beyond.
          </p>
          <div className="hero-actions">
            <a href="/contact" className="btn-gold btn-hero">
              Request a Private Consultation
            </a>
            <a href="/work" className="btn-secondary">
              Explore our work
            </a>
          </div>
          {/* Subtle animated divider to add motion without clutter (micro-interaction). */}
          <div className="mt-8 h-px w-40 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Services section with hover lift and soft shadows (interactive feature). */}
      <section
        className={`mt-24 section-grid section-surface ${isRevealed('services') ? 'reveal-up' : 'opacity-0 translate-y-6'}`}
        data-reveal-key="services"
        ref={el => {
          if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el)
        }}
      >
        {/* Decorative accents to fill space elegantly (design choice). */}
        <div
          className="decorative-orb decor-orb-left parallax-layer"
          style={{ transform: `translateY(${scrollY * 0.03}px)` }}
        />
        <div>
          <p className="eyebrow">Our Services</p>
          <h2 className="font-serif text-3xl sm:text-4xl mb-4">Luxury, with modern clarity.</h2>
          <p className="text-neutral-600">
            We design digital touchpoints that feel as considered as the spaces you create,
            from positioning and presence to measured performance.
          </p>
        </div>
        <div className="cards">
          <div className="card service-card">
            <h3 className="font-serif text-xl mb-2">Brand Positioning</h3>
            <p className="text-sm text-neutral-600">
              Crafting a premium brand identity that speaks to luxury clientele.
            </p>
          </div>
          <div className="card service-card">
            <h3 className="font-serif text-xl mb-2">Digital Experience</h3>
            <p className="text-sm text-neutral-600">
              Elegant, modern websites that showcase your most refined projects.
            </p>
          </div>
          <div className="card service-card">
            <h3 className="font-serif text-xl mb-2">Client Acquisition</h3>
            <p className="text-sm text-neutral-600">
              Targeted campaigns designed to reach discerning clients with precision.
            </p>
          </div>
        </div>
      </section>

      {/* Work/Gallery section with hover zoom and staggered fade-in animations. */}
      <section
        className={`mt-24 ${isRevealed('gallery') ? 'reveal-up' : 'opacity-0 translate-y-6'}`}
        data-reveal-key="gallery"
        ref={el => {
          if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el)
        }}
      >
        <div className="section-header">
          <div>
            <p className="eyebrow">Selected Portfolio</p>
            <h2 className="font-serif text-3xl sm:text-4xl">
              Spaces that communicate quiet luxury.
            </h2>
            <p className="text-neutral-600 max-w-xl mt-3">
              A curated look at recent interior showcases and editorial-style spaces.
            </p>
          </div>
          <a href="/work" className="text-sm nav-link">View full portfolio</a>
        </div>
        {/* Dynamic gallery loop with hover zoom + caption overlay (interactive feature). */}
        <div className="image-grid">
          {gallery.map((item, index) => (
            <figure
              className="image-tile reveal-tile"
              key={item.title}
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <button
                type="button"
                aria-label={`Open ${item.title}`}
                className="block w-full text-left"
                onClick={() => setActiveIndex(index)}
              >
                <Image
                  src={item.url}
                  alt={item.title}
                  className="image-cover"
                  width={1200}
                  height={1500}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </button>
              <figcaption className="image-title">{item.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA section with gold accent button and decorative elements. */}
      <section
        className={`mt-24 section-surface ${isRevealed('cta') ? 'reveal-up' : 'opacity-0 translate-y-6'}`}
        data-reveal-key="cta"
        ref={el => {
          if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el)
        }}
      >
        {/* Decorative accents around the CTA (design choice). */}
        <div className="decorative-block decor-block-right" />
        <div className="cta-panel">
          <div>
            <p className="eyebrow">Start the project</p>
            <h2 className="font-serif text-3xl sm:text-4xl mb-4">
              A digital presence as considered as your interiors.
            </h2>
            <p className="text-neutral-600 mb-6">
              We take on a limited number of studios each quarter to keep every engagement bespoke.
            </p>
            <a href="/contact" className="btn-gold">
              Schedule a strategy call
            </a>
          </div>
          <div className="cta-note">
            <p className="font-serif text-2xl mb-3">Minimal. Luxurious. Effective.</p>
            <p className="text-sm text-neutral-600">
              Elegant storytelling with the performance to match.
            </p>
            <div className="cta-badges">
              <span className="badge">London Studio</span>
              <span className="badge">High-End Interiors</span>
            </div>
          </div>
        </div>
      </section>

      {/* About section: brand story and luxury palette notes. */}
      <section
        className={`mt-24 section-grid ${isRevealed('about') ? 'reveal-up' : 'opacity-0 translate-y-6'}`}
        data-reveal-key="about"
        ref={el => {
          if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el)
        }}
      >
        <div>
          <p className="eyebrow">About</p>
          <h2 className="font-serif text-3xl sm:text-4xl mb-4">A studio built around quiet confidence.</h2>
          <p className="text-neutral-600">
            We pair elegant brand strategy with modern performance, shaping digital touchpoints
            that feel tailored, composed, and unmistakably premium.
          </p>
        </div>
        <div className="card">
          <h3 className="font-serif text-xl mb-2">Signature Approach</h3>
          <p className="text-sm text-neutral-600">
            A refined palette of deep navy, warm cream, and soft gold accents establishes
            a light, luxurious atmosphere that elevates every story.
          </p>
        </div>
      </section>

      {/* Contact section with soft gradient and premium accents. */}
      <section
        className={`mt-24 section-surface ${isRevealed('contact') ? 'reveal-up' : 'opacity-0 translate-y-6'}`}
        data-reveal-key="contact"
        ref={el => {
          if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el)
        }}
      >
        <div className="cta-panel">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 className="font-serif text-3xl sm:text-4xl mb-4">
              Begin a collaboration tailored to your studio.
            </h2>
            <p className="text-neutral-600 mb-6">
              Share your goals, timelines, and ambitions. We will respond within two business days
              with a curated proposal.
            </p>
            <a href="/contact" className="btn-primary">
              Start a conversation
            </a>
          </div>
          <div className="cta-note">
            <p className="font-serif text-2xl mb-3">Private Consultations</p>
            <p className="text-sm text-neutral-600">
              Reserved for studios ready to elevate their digital presence with a premium, bespoke approach.
            </p>
            <div className="cta-badges">
              <span className="badge">By Referral</span>
              <span className="badge">London + Global</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox modal for gallery images with smooth transitions (interactive feature). */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveIndex(null)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="relative w-[92vw] max-w-4xl rounded-2xl bg-white/95 p-4 shadow-2xl"
            onClick={event => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full border border-neutral-200 bg-white/90 px-3 py-1 text-sm"
              onClick={() => setActiveIndex(null)}
            >
              Close
            </button>
            <div className="image-frame">
              <Image
                src={gallery[activeIndex].url}
                alt={gallery[activeIndex].title}
                className="image-cover"
                width={1600}
                height={2000}
                sizes="(max-width: 768px) 90vw, 70vw"
              />
            </div>
            <p className="image-caption">{gallery[activeIndex].title}</p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-neutral-500">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setActiveIndex(prev => (prev === null ? 0 : (prev - 1 + gallery.length) % gallery.length))}
              >
                Previous
              </button>
              <span>Use left and right arrow keys to navigate</span>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setActiveIndex(prev => (prev === null ? 0 : (prev + 1) % gallery.length))}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}


