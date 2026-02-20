import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-start justify-center px-6 py-24">
      <p className="eyebrow">404</p>
      <h1 className="font-serif text-4xl sm:text-5xl mb-4">This page could not be found.</h1>
      <p className="text-neutral-600 max-w-xl mb-8">
        The page you were looking for may have been moved, renamed, or no longer exists.
        Explore the studio instead:
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">Back to home</Link>
        <Link href="/services" className="btn-secondary">Services</Link>
        <Link href="/work" className="btn-secondary">Work</Link>
        <Link href="/contact" className="btn-secondary">Contact</Link>
      </div>
    </main>
  )
}

