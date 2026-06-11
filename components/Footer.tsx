import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/sleekstudiolondon" },
  { label: "TikTok", href: "https://tiktok.com/@sleekstudiolondon" },
];

export default function Footer() {
  return (
    <footer className="footer-shell">
      <div className="container-luxe footer-inner footer-inner-expanded">
        <div className="footer-brand footer-brand-stack">
          <Link className="footer-studio-name" href="/" aria-label="Sleek Studio London home">
            Sleek Studio London
          </Link>
          <p className="footer-note">Luxury web design for interior designers.</p>
          <p className="footer-note">© {new Date().getFullYear()} Sleek Studio London. Limited clients per cycle.</p>
        </div>
        <div className="footer-nav-groups">
          <nav className="footer-links" aria-label="Footer navigation">
            {FOOTER_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className="footer-link">
                {item.label}
              </Link>
            ))}
          </nav>
          <nav className="footer-links footer-social-links" aria-label="Social links">
            {SOCIAL_LINKS.map((item) => (
              <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="footer-link">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
