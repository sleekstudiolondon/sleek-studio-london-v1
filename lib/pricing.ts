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
  requestAllowance: string;
  responseTime: string;
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
    headline: "A focused premium launch for an independent interior designer.",
    minBudget: 1500,
    deposit: 1499,
    monthly: 749,
    pageCount: 3,
    requestAllowance: "2 changes per week",
    responseTime: "72h refinement window",
    intendedFor: "Independent designers who need a refined portfolio, clear enquiry path, and elegant first phase without overbuilding.",
    timeline: "4-6 days",
    description: "A composed three-page website with premium essentials, launch support, and a simple weekly refinement rhythm.",
    includes: [
      "3 core pages: Home, Portfolio, Contact",
      "2 approved change requests per week",
      "Modifications completed within 72 hours after approval",
      "Hosting and domain setup",
      "Refined enquiry form setup",
      "Launch QA and calm handover",
    ],
  },
  {
    id: "mid",
    name: "The House",
    nickname: "The House",
    headline: "A fuller studio website for growing practices with more rooms to explore.",
    minBudget: 5000,
    deposit: 4599,
    monthly: 2999,
    pageCount: 8,
    requestAllowance: "5 changes per week",
    responseTime: "48h refinement window",
    intendedFor: "Boutique and growing studios that need deeper proof, richer service pages, and a more structured route to consultation.",
    timeline: "7-10 days",
    description: "An eight-page build for interior studios ready to present capability, process, projects, and trust signals with more depth.",
    includes: [
      "8-page studio architecture",
      "5 approved change requests per week",
      "Modifications completed within 48 hours after approval",
      "Hosting and domain setup",
      "Expanded portfolio and service structure",
      "Launch QA, analytics setup, and refinement handover",
    ],
  },
  {
    id: "top",
    name: "White Glove",
    nickname: "White Glove",
    headline: "A private, concierge-led digital estate for ambitious interior brands.",
    minBudget: 20000,
    deposit: null,
    monthly: null,
    isInviteOnly: true,
    pageCount: 20,
    requestAllowance: "Concierge support",
    responseTime: "24h priority window",
    intendedFor: "Established studios, multi-location practices, or launches with layered portfolios, press, campaigns, and complex content needs.",
    timeline: "12-18 days",
    description: "Our most tailored route: a 20+ page architecture, priority refinement, migration planning, and hands-free concierge launch support.",
    includes: [
      "20+ page-family architecture",
      "Concierge support and priority scheduling",
      "Priority modifications completed within 24 hours after approval",
      "Hosting, domain, and migration planning",
      "Press, journal, team, and project-library systems",
      "Dedicated launch support shaped around scope",
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
