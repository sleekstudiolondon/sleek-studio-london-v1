export type PackageId = "entry" | "mid" | "top";

export type StudioPackage = {
  id: PackageId;
  name: string;
  nickname: string;
  headline?: string;
  minBudget: number;
  deposit: number | null;
  monthly: number | null;
  isInviteOnly?: boolean;
  pageCount: number;
  intendedFor: string;
  timeline: string;
  description: string;
  includes: string[];
};

export const PACKAGES: StudioPackage[] = [
  {
    id: "entry",
    name: "Individual",
    nickname: "Individual",
    headline: "A focused premium launch tailored for individual designers.",
    minBudget: 1500,
    deposit: 1499,
    monthly: 749,
    pageCount: 3,
    intendedFor: "Tailored for individual designers who need a refined site live without overbuilding the first phase.",
    timeline: "4-6 days",
    description: "A streamlined premium build with the essentials covered, so you can launch clearly and confidently.",
    includes: [
      "3 pages",
      "Hosting",
      "Domain name",
      "Modifications completed within 72 hours after approval",
      "Free add-ons",
      "Refined enquiry form setup",
    ],
  },
  {
    id: "mid",
    name: "The House",
    nickname: "The House",
    headline: "A fuller site launch shaped for growing studios.",
    minBudget: 5000,
    deposit: 4599,
    monthly: 2999,
    pageCount: 8,
    intendedFor: "Positioned for growing studios that need broader scope, stronger conversion goals, and room to grow after go-live.",
    timeline: "7-10 days",
    description: "A fuller build path with more support, more flexibility, and a stronger runway for business growth.",
    includes: [
      "8 pages",
      "Hosting",
      "Domain name",
      "Modifications completed within 48 hours after approval",
      "Free add-ons",
      "Refined enquiry form setup",
      "Expanded content structure",
    ],
  },
  {
    id: "top",
    name: "White Glove",
    nickname: "White Glove",
    headline: "A private, concierge-led build with expert support for ambitious launches.",
    minBudget: 20000,
    deposit: null,
    monthly: null,
    isInviteOnly: true,
    pageCount: 20,
    intendedFor: "High-complexity or fast-moving launches that need expert execution, premium flexibility, and concierge oversight.",
    timeline: "12-18 days",
    description: "Our most tailored route for ambitious launches where complexity, pace, and polish all need to stay elevated.",
    includes: [
      "20 pages",
      "Hosting",
      "Domain name",
      "Priority modifications completed within 24 hours after approval",
      "Priority scheduling",
      "Migration and systems planning",
      "Dedicated team support tailored to your project scope and budget",
      "Concierge launch support",
    ],
  },
];

export const PACKAGE_MAP: Record<PackageId, StudioPackage> = {
  entry: PACKAGES[0],
  mid: PACKAGES[1],
  top: PACKAGES[2],
};

export const CONTACT_BUDGET_OPTIONS = [
  "\u00A31,500-\u00A34,999",
  "\u00A35,000-\u00A39,999",
  "\u00A310,000-\u00A319,999",
  "\u00A320,000+",
  "Not sure",
] as const;

export function formatGBP(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getPackagePricing(packageItem: StudioPackage) {
  if (packageItem.isInviteOnly) {
    return {
      primary: "Invite only",
      secondary: "Pricing shaped around scope",
    };
  }

  return {
    primary: `${formatGBP(packageItem.deposit ?? 0)} initial deposit`,
    secondary: `${formatGBP(packageItem.monthly ?? 0)} monthly`,
  };
}
