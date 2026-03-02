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
};

export default function PageShell({
  title,
  subtitle,
  children,
  eyebrow,
  hideEyebrow = false,
}: PageShellProps) {
  return (
    <div className="page-shell">
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
        </Container>
      </header>
      <div className="page-content">{children}</div>
    </div>
  );
}
