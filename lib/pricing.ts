export type PackageId = "entry" | "mid" | "top";

export type StudioPackage = {
  id: PackageId;
  name: string;
  nickname: string;
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
    name: "Entry",
    nickname: "The Edit",
    minBudget: 1500,
    deposit: 1499,
    monthly: 749,
    pageCount: 3,
    intendedFor: "Focused launches for studios that need a refined site live without overbuilding the first phase.",
    timeline: "4-6 days",
    description: "A streamlined premium build with the essentials covered, so you can launch clearly and confidently.",
    includes: [
      "3 pages",
      "Hosting",
      "Domain name",
      "2 modifications per week after launch",
    ],
  },
  {
    id: "mid",
    name: "Mid",
    nickname: "The House",
    minBudget: 5000,
    deposit: 4599,
    monthly: 2999,
    pageCount: 8,
    intendedFor: "Serious business launches with stronger conversion goals, broader scope, and room to grow after go-live.",
    timeline: "7-10 days",
    description: "A fuller build path with more support, more flexibility, and a stronger runway for business growth.",
    includes: [
      "8 pages",
      "Hosting",
      "Domain name",
      "5 modifications per week after launch",
      "Expanded content structure",
      "Priority feedback windows",
    ],
  },
  {
    id: "top",
    name: "Top",
    nickname: "White-Glove",
    minBudget: 20000,
    deposit: null,
    monthly: null,
    isInviteOnly: true,
    pageCount: 20,
    intendedFor: "High-complexity, premium, or fast-moving launches that need white-glove execution and concierge oversight.",
    timeline: "12-18 days",
    description: "Our most tailored route for ambitious launches where complexity, pace, and polish all need to stay elevated.",
    includes: [
      "20 pages",
      "Hosting",
      "Domain name",
      "20 modifications per week after launch",
      "Priority scheduling",
      "Migration and systems planning",
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
      secondary: "",
    };
  }

  return {
    primary: `${formatGBP(packageItem.deposit ?? 0)} initial deposit`,
    secondary: `${formatGBP(packageItem.monthly ?? 0)} monthly`,
  };
}
