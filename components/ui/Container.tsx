import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
  center?: boolean;
};

export default function Container({
  children,
  className = "",
  narrow = false,
  center = false,
}: ContainerProps) {
  const classes = [
    "ui-container",
    narrow ? "ui-container-narrow" : "",
    center ? "ui-container-center" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}
