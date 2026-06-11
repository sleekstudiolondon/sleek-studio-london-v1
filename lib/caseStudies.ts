export type CaseStudy = {
  slug: string;
  title: string;
  packageName: string;
  pageArchitecture: string;
  location: string;
  focus: string;
  year: string;
  summary: string;
  challenge: string;
  strategy: string;
  metric?: string;
  impact: string;
  businessImpact: string;
  image: string;
  pages: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "john-doe",
    title: "John Doe",
    packageName: "Individual",
    pageArchitecture: "3-page launch",
    location: "London",
    focus: "Independent interior designer",
    year: "2025",
    summary: "A restrained portfolio website that gives an individual designer a polished first impression, concise service story, and confident enquiry route.",
    challenge: "Create a premium digital presence without making a solo studio feel larger or louder than it is.",
    strategy: "Shape a three-page editorial journey around signature projects, warm credibility, and one direct consultation path.",
    metric: "3 pages, 2 changes/week, 72h refinement window.",
    impact: "A clearer route from project viewing to enquiry, with the essentials composed into a calm premium launch.",
    businessImpact: "The designer can now send prospects to a focused site that supports higher-value conversations instead of relying only on referrals.",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1800&q=75&fm=webp",
    pages: ["Home", "Portfolio", "Contact"],
  },
  {
    slug: "studio-alder-interiors",
    title: "Studio Alder Interiors",
    packageName: "The House",
    pageArchitecture: "8-page studio build",
    location: "Chelsea",
    focus: "Growing interiors studio",
    year: "2025",
    summary: "An eight-page studio platform designed to make services, process, featured work, and press signals feel considered and easy to navigate.",
    challenge: "Help a growing studio present broader capability without overwhelming prospective residential clients.",
    strategy: "Build a measured page system for services, process, selected projects, studio story, and enquiry qualification.",
    metric: "8 pages, 5 changes/week, 48h refinement window.",
    impact: "The brand now feels more established, with a stronger path from inspiration to consultation.",
    businessImpact: "Studio Alder Interiors has a more credible foundation for larger whole-home briefs and trade introductions.",
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1800&q=75&fm=webp",
    pages: ["Home", "About", "Services", "Process", "Portfolio", "Case Study", "Journal", "Contact"],
  },
  {
    slug: "maison-form-interiors",
    title: "Maison Form Interiors",
    packageName: "White Glove",
    pageArchitecture: "20+ page-family digital estate",
    location: "Kensington",
    focus: "Established interiors practice",
    year: "2025",
    summary: "A concierge-level architecture for an established studio with layered project categories, press, journal content, team pages, and campaign-ready landing pages.",
    challenge: "Translate a high-touch, multi-service practice into a website architecture that feels expansive but never cluttered.",
    strategy: "Group the 20+ page requirement into premium page families so content can scale without creating dead-end or filler pages.",
    metric: "20+ pages, concierge support, 24h priority refinement window.",
    impact: "Maison Form Interiors gains a polished digital estate with room for project libraries, press validation, and white-glove enquiry handling.",
    businessImpact: "The structure supports larger private-client, developer, and international briefs while keeping navigation composed.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=75&fm=webp",
    pages: [
      "Core studio pages: Home, About, Services, Process, Contact",
      "Portfolio library: Overview, Residential, Hospitality, International, Featured detail templates",
      "Authority pages: Press, Journal index, Editorial article templates, Awards",
      "Conversion pages: Private client enquiry, Developer enquiry, Consultation, Investment guide",
      "Operational pages: Team, FAQ, Privacy, launch campaign landing pages",
    ],
  },
];
