import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-start justify-center px-6 py-24">
      <p className="eyebrow">404</p>
      <h1 className="font-serif text-4xl sm:text-5xl mb-4">This page could not be found.</h1>
      <p className="text-neutral-600 max-w-xl mb-8">
        The page you were looking for may have been moved, renamed, or no longer exists.
        Explore the studio instead:
      </p>
      <div className="button-row">
        <Button href="/">Back to home</Button>
        <Button href="/services" variant="secondary">Services</Button>
        <Button href="/work" variant="secondary">Work</Button>
        <Button href="/contact" variant="secondary">Contact</Button>
      </div>
    </main>
  );
}

