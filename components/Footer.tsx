import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="footer-shell">
      <div className="container-luxe footer-inner">
        <p className="footer-note">(c) {new Date().getFullYear()} Sleek Studio London</p>
        <nav className="footer-links">
          {FOOTER_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="footer-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
