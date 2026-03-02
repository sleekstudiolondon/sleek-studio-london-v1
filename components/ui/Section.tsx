import type { ReactNode } from "react";
import Container from "./Container";
import Divider from "./Divider";
import Reveal from "../Reveal";

type SectionProps = {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
  center?: boolean;
  divider?: boolean;
  tone?: "none" | "wash";
  reveal?: boolean;
  revealStagger?: number;
};

export default function Section({
  children,
  className = "",
  narrow = false,
  center = false,
  divider = false,
  tone = "none",
  reveal = true,
  revealStagger = 0,
}: SectionProps) {
  const sectionClass = [
    "ui-section",
    tone === "wash" ? "ui-section-wash" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={sectionClass}>
      <Container narrow={narrow} center={center}>
        {reveal ? <Reveal stagger={revealStagger}>{children}</Reveal> : children}
      </Container>
      {divider ? <Divider /> : null}
    </section>
  );
}
