import Card from "../ui/Card";

type StatItem = {
  value: string;
  label: string;
  detail: string;
};

type StatGridProps = {
  items: StatItem[];
  className?: string;
};

export default function StatGrid({ items, className = "" }: StatGridProps) {
  return (
    <div className={["feature-grid", className].filter(Boolean).join(" ")}>
      {items.map((item) => (
        <Card key={`${item.value}-${item.label}`} className="stat-card" hoverable={false}>
          <p className="stat-value">{item.value}</p>
          <p className="stat-label">{item.label}</p>
          <p className="card-copy">{item.detail}</p>
        </Card>
      ))}
    </div>
  );
}
