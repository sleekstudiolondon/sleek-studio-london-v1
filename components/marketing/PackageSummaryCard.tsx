import Button from "../ui/Button";
import Card from "../ui/Card";
import { getPackagePricing, type StudioPackage } from "@/lib/pricing";

type PackageSummaryCardProps = {
  packageItem: StudioPackage;
  compact?: boolean;
};

export default function PackageSummaryCard({
  packageItem,
  compact = false,
}: PackageSummaryCardProps) {
  const pricing = getPackagePricing(packageItem);

  return (
    <Card
      className={`pricing-card package-summary-card ${compact ? "package-summary-card-compact" : ""}`}
      variant="card"
      recommended={packageItem.id === "mid"}
    >
      <div className="pricing-card-head">
        <div>
          <p className="pricing-nickname">
            {packageItem.name} / {packageItem.nickname}
          </p>
          <h3 className="card-title">{packageItem.headline}</h3>
        </div>
        {packageItem.isInviteOnly ? <span className="pricing-badge">Limited intake</span> : null}
      </div>
      <p className="pricing-bestfor">{packageItem.intendedFor}</p>
      <div className="pricing-stack">
        <p className="pricing-amount">{pricing.primary}</p>
        {pricing.secondary ? <p className="pricing-amount-subtle">{pricing.secondary}</p> : null}
      </div>
      <p className="pricing-meta">Typical timeline: {packageItem.timeline}</p>
      <p className="package-summary-copy">{packageItem.description}</p>
      <ul className="list-soft">
        {packageItem.includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="button-row pricing-card-cta">
        <Button href="/contact">{packageItem.isInviteOnly ? "Request white-glove consultation" : "Book a consultation"}</Button>
      </div>
    </Card>
  );
}
