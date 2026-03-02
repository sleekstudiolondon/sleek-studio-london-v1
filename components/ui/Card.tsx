import type { ElementType, ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  recommended?: boolean;
  hoverable?: boolean;
  variant?: "panel" | "card";
};

export default function Card({
  children,
  className = "",
  as: Tag = "article",
  recommended = false,
  hoverable = true,
  variant = "panel",
}: CardProps) {
  const classes = [
    "ui-card",
    variant === "card" ? "ui-card-variant-card" : "ui-card-variant-panel",
    recommended ? "ui-card-recommended" : "",
    hoverable ? "ui-card-hover" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Tag className={classes}>{children}</Tag>;
}
