'use client'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200/70 bg-white/70 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col items-center gap-4">
        <Link href="/" className="font-serif text-4xl sm:text-5xl tracking-tight">Sleek Studio London</Link>
        <div className="flex items-center gap-6 text-sm flex-wrap justify-center">
          <Link href="/services" className="nav-link">Services</Link>
          <Link href="/work" className="nav-link">Work</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/growth-lab" className="nav-link">Growth Lab</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </div>
      </div>
    </nav>
  )
}
