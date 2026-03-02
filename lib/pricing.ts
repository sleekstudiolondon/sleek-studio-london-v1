export type PackageId = "entry" | "mid" | "top";

export type StudioPackage = {
  id: PackageId;
  name: string;
  nickname: string;
  minBudget: number;
  deposit: number;
  monthly: number;
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
    minBudget: 5000,
    deposit: 2000,
    monthly: 999,
    intendedFor: "Studios launching a focused site with core assets already prepared.",
    timeline: "4-6 days",
    description: "A concise, design-led launch with disciplined structure and polished delivery.",
    includes: [
      "Core website architecture and page planning",
      "Editorial visual polish with responsive build",
      "QA, launch support, and handover guidance",
    ],
  },
  {
    id: "mid",
    name: "Mid",
    nickname: "The House",
    minBudget: 15000,
    deposit: 12000,
    monthly: 7000,
    intendedFor: "Growing studios with broader page scope or partial readiness.",
    timeline: "6-8 days",
    description: "A deeper programme with added production support and tighter strategic control.",
    includes: [
      "Expanded page templates and conversion structure",
      "Integrated content and brand-readiness support",
      "Priority revisions through the launch window",
    ],
  },
  {
    id: "top",
    name: "Top",
    nickname: "White-Glove",
    minBudget: 35000,
    deposit: 25000,
    monthly: 15000,
    intendedFor: "High-complexity builds including ecommerce, multi-location, or compressed timelines.",
    timeline: "4-7 days",
    description: "End-to-end delivery with concierge oversight, priority scheduling, and executive pace.",
    includes: [
      "Complex architecture and implementation handling",
      "Priority scheduling and daily delivery cadence",
      "Concierge support across design, build, QA, and launch",
    ],
  },
];

export const PACKAGE_MAP: Record<PackageId, StudioPackage> = {
  entry: PACKAGES[0],
  mid: PACKAGES[1],
  top: PACKAGES[2],
};

export const CONTACT_BUDGET_OPTIONS = [
  "\u00A32,000-\u00A37,999",
  "\u00A38,000-\u00A314,999",
  "\u00A315,000-\u00A324,999",
  "\u00A325,000+",
  "Not sure",
] as const;

export function formatGBP(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}
