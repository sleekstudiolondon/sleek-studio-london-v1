import Link from "next/link";
import type { ReactNode } from "react";

type MaisonTextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export default function MaisonTextLink({ href, children, className = "" }: MaisonTextLinkProps) {
  return (
    <Link className={`mf-text-link ${className}`} href={href}>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
