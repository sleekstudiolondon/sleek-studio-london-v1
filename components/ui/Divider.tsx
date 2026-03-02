type DividerProps = {
  className?: string;
};

export default function Divider({ className = "" }: DividerProps) {
  const classes = ["ui-divider", className].filter(Boolean).join(" ");
  return <hr className={classes} aria-hidden="true" />;
}
