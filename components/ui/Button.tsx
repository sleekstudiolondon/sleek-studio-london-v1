import type { MouseEventHandler, ReactNode } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ActionButtonProps = {
  href?: never;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

type ButtonProps = LinkButtonProps | ActionButtonProps;

export default function Button(props: ButtonProps) {
  const variantClass =
    props.variant === "secondary"
      ? "ui-button-secondary"
      : props.variant === "ghost"
        ? "ui-button-ghost"
        : "ui-button-primary";
  const className = ["ui-button", variantClass, props.className ?? ""].filter(Boolean).join(" ");

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={className}>
        {props.children}
      </Link>
    );
  }

  const actionProps = props as ActionButtonProps;

  return (
    <button
      type={actionProps.type ?? "button"}
      className={className}
      disabled={actionProps.disabled}
      onClick={actionProps.onClick}
    >
      {actionProps.children}
    </button>
  );
}
