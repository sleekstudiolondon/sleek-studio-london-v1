import type { ReactNode } from "react";

type KickerProps = {
  children: ReactNode;
  className?: string;
};

export default function Kicker({ children, className = "" }: KickerProps) {
  const classes = ["ui-kicker", className].filter(Boolean).join(" ");
  return <p className={classes}>{children}</p>;
}
