import type { ReactNode } from "react";
import Container from "../ui/Container";
import Kicker from "../ui/Kicker";
import Reveal from "../Reveal";

type PageShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  eyebrow?: string;
  hideEyebrow?: boolean;
  className?: string;
  heroFooter?: ReactNode;
  heroFooterStagger?: number;
};

export default function PageShell({
  title,
  subtitle,
  children,
  eyebrow,
  hideEyebrow = false,
  className = "",
  heroFooter,
  heroFooterStagger = 180,
}: PageShellProps) {
  return (
    <div className={["page-shell", className].filter(Boolean).join(" ")}>
      <header className="page-hero">
        <Container narrow center>
          {!hideEyebrow && eyebrow ? (
            <Reveal>
              <Kicker className="page-eyebrow">{eyebrow}</Kicker>
            </Reveal>
          ) : null}
          <Reveal stagger={60}>
            <h1 className="page-title">{title}</h1>
          </Reveal>
          <Reveal stagger={120}>
            <p className="page-subtitle">{subtitle}</p>
          </Reveal>
          {heroFooter ? (
            <Reveal className="page-hero-footer" stagger={heroFooterStagger}>
              {heroFooter}
            </Reveal>
          ) : null}
        </Container>
      </header>
      <div className="page-content">{children}</div>
    </div>
  );
}
