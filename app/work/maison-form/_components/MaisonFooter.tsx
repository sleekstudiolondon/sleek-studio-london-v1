import Link from "next/link";
import { maisonRoutes } from "../_lib/routes";

const footerLinks = [
  { label: "Projects", href: maisonRoutes.projects },
  { label: "Practice", href: maisonRoutes.practice },
  { label: "About Us", href: maisonRoutes.about },
  { label: "Journal", href: maisonRoutes.journal },
] as const;

export default function MaisonFooter() {
  return (
    <footer className="mf-footer">
      <div className="mf-footer-lead">
        <p className="mf-eyebrow">Private commissions</p>
        <h2>
          Let us consider
          <em>what comes next.</em>
        </h2>
        <Link className="mf-footer-cta" href={maisonRoutes.contact}>
          Begin a conversation ↗
        </Link>
      </div>
      <div className="mf-footer-grid">
        <div>
          <Link className="mf-footer-wordmark" href={maisonRoutes.home}>
            Maison Form
          </Link>
          <p>
            Interior architecture and
            <br />
            objects of quiet permanence.
          </p>
        </div>
        <nav aria-label="Maison Form footer navigation">
          {footerLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div>
          <p>
            London studio
            <br />
            By appointment
          </p>
          <p>studio@example.com</p>
        </div>
        <div>
          <p>
            A fictional White Glove demonstration
            <br />
            for Sleek Studio London.
          </p>
          <p>© 2026</p>
        </div>
      </div>
    </footer>
  );
}
