export type MaisonProject = {
  slug: string;
  title: string;
  location: string;
  year: string;
  category: string;
  image: string;
  description: string;
  premise: string;
  narrative: string[];
  materials: string[];
  areas: string[];
  service: string;
};

export type MaisonJournalArticle = {
  slug: string;
  title: string;
  eyebrow: string;
  dek: string;
  image: string;
  sections: { title: string; copy: string }[];
};

export const maisonNav = [
  { label: "Home", href: "/work/maison-form" },
  { label: "About Us", href: "/work/maison-form/about" },
  { label: "Projects", href: "/work/maison-form/projects" },
  { label: "Atelier", href: "/work/maison-form/atelier" },
  { label: "Journal", href: "/work/maison-form/journal" },
  { label: "Press", href: "/work/maison-form/press" },
  { label: "Contact", href: "/work/maison-form/contact" },
] as const;

export const maisonProjects: MaisonProject[] = [
  {
    slug: "belgravia-residence",
    title: "Belgravia Residence",
    location: "London",
    year: "2026",
    category: "Private residence",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=80&fm=webp",
    description: "A formal townhouse softened with bronze, parchment, antique oak, and deeply upholstered rooms.",
    premise: "A sequence of formal and informal rooms composed around arrival, privacy, and evening entertaining.",
    narrative: [
      "The concept begins at the threshold: limestone, antique oak, and controlled shadow create a quieter arrival before the house opens into more generous rooms.",
      "Furniture and textiles are intentionally layered rather than matched. Parchment, bronze, silk velvet, and handwoven rugs build depth without losing the architectural order of the townhouse.",
      "The final installation is treated as part of the design work, with lighting levels, object placement, flowers, and handover notes resolved room by room.",
    ],
    materials: ["Limestone", "Antique oak", "Silk velvet", "Bronze", "Handwoven rugs"],
    areas: ["Arrival", "Formal dining", "Drawing room", "Principal suite", "Final installation"],
    service: "Private residence · installation stewardship",
  },
  {
    slug: "lakeside-villa",
    title: "Lakeside Villa",
    location: "Geneva",
    year: "2025",
    category: "Private residence",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1800&q=80&fm=webp",
    description: "An international family retreat balancing lake light, pale plaster, stone craft, and private entertaining.",
    premise: "A quieter villa study where the landscape is allowed to lead the interior atmosphere.",
    narrative: [
      "Lake light is softened rather than amplified. Pale plaster, linen, travertine, and smoked timber keep the rooms calm through changing weather and seasons.",
      "Low furniture profiles preserve long views while creating more intimate seating islands for family use, reading, and private entertaining.",
      "Procurement focuses on pieces that can age well across an international residence, combining bespoke work with a restrained antique and art layer.",
    ],
    materials: ["Pale plaster", "Linen", "Travertine", "Smoked timber", "Brushed metal"],
    areas: ["Lake salon", "Family dining", "Library", "Guest suites", "Terrace rooms"],
    service: "Private residence · atelier procurement",
  },
  {
    slug: "aurelia-suite",
    title: "The Aurelia Suite",
    location: "Paris",
    year: "2025",
    category: "Hospitality",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1800&q=80&fm=webp",
    description: "A hospitality suite with cinematic lighting, lacquered detail, and intimate dining spaces.",
    premise: "A compact hospitality sequence designed around evening arrival, private service, and a memorable sense of retreat.",
    narrative: [
      "The suite is conceived as a progression from public arrival to private retreat. Lacquer, bronze mirror, and mohair hold a deeper evening palette without becoming theatrical.",
      "Service circulation is kept quiet and legible, allowing dining, dressing, and rest to feel composed rather than operational.",
      "Bespoke furniture is scaled to the suite rather than selected as isolated statement pieces, keeping the atmosphere continuous from threshold to bedroom.",
    ],
    materials: ["Lacquer", "Bronze mirror", "Mohair", "Smoked glass", "Dark timber"],
    areas: ["Arrival salon", "Private dining", "Dressing room", "Principal bedroom", "Service layer"],
    service: "Hospitality interiors · bespoke furniture",
  },
  {
    slug: "riad-courtyard",
    title: "Riad Courtyard",
    location: "Marrakech",
    year: "2024",
    category: "Hospitality",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=80&fm=webp",
    description: "A restored courtyard property where craft, shade, water, and low evening light shape the guest experience.",
    premise: "A hospitality commission centred on a slower courtyard rhythm and locally grounded material decisions.",
    narrative: [
      "The courtyard remains the organising room of the property. Shade, water, planted edges, and low seating create a measured transition between heat and interior calm.",
      "Local craft is treated as architecture rather than decoration, with plaster, timber, metalwork, and woven surfaces edited into a restrained material family.",
      "Guest rooms use a quieter palette so the courtyard remains the strongest memory of arrival and return.",
    ],
    materials: ["Hand-finished plaster", "Cedar", "Aged brass", "Woven fibre", "Local stone"],
    areas: ["Courtyard", "Dining room", "Guest suites", "Roof terrace", "Arrival passage"],
    service: "Hospitality interiors · installation stewardship",
  },
];

export const maisonJournal: MaisonJournalArticle[] = [
  {
    slug: "provenance-before-polish",
    title: "Provenance before polish",
    eyebrow: "Material notes",
    dek: "Why origin, repairability, and the life of a surface matter more than immediate perfection.",
    image: maisonProjects[0].image,
    sections: [
      { title: "Begin with origin", copy: "A material earns its place through suitability and provenance before colour or finish is discussed. Stone, timber, metal, and textile are reviewed for where they come from, how they will age, and how they can be maintained." },
      { title: "Allow patina", copy: "Private interiors should become more convincing through use. The atelier favours surfaces that can carry touch, light, repair, and time rather than requiring permanent visual perfection." },
      { title: "Edit the final layer", copy: "Objects and furniture are introduced after the architectural atmosphere is stable, allowing fewer pieces to hold greater meaning and avoiding a room assembled around novelty." },
    ],
  },
  {
    slug: "the-evening-room",
    title: "The evening room",
    eyebrow: "Atmosphere",
    dek: "A short study in low light, reflective surfaces, and rooms designed to become more intimate after dusk.",
    image: maisonProjects[2].image,
    sections: [
      { title: "Light as sequence", copy: "Evening rooms are not solved with a single decorative fitting. Pools of low light, concealed sources, reflected glow, and darker thresholds are composed as a sequence." },
      { title: "Materials after dusk", copy: "Bronze, lacquer, mohair, dark timber, and mirror change character in artificial light. Samples are reviewed at the time of day the room will be used most." },
      { title: "Service without spectacle", copy: "Hospitality and private entertaining both benefit from operational clarity that remains visually quiet. Lighting, circulation, and placement should support service without announcing it." },
    ],
  },
  {
    slug: "stewardship-after-installation",
    title: "Stewardship after installation",
    eyebrow: "Private practice",
    dek: "Why a finished residence still needs a measured framework for aftercare, seasonal change, and future acquisitions.",
    image: maisonProjects[1].image,
    sections: [
      { title: "Handover is a beginning", copy: "A careful handover records finishes, makers, care notes, lighting levels, and outstanding decisions so the interior can be maintained with the same precision used to create it." },
      { title: "Seasonal adjustment", copy: "Textiles, flowers, art placement, exterior rooms, and lighting can evolve with the year while the architectural character of the home remains stable." },
      { title: "Future acquisitions", copy: "A long-term relationship helps new furniture, art, and objects enter the home without weakening the original composition." },
    ],
  },
];

export const maisonTimeline = [
  ["1963", "Illustrative founding chapter: a Paris private-interiors atelier serving collectors and family residences."],
  ["1980s", "Illustrative expansion into London townhouses and private apartments with a deeper craft network."],
  ["2000s", "Illustrative hospitality commissions introduce a more cinematic, service-aware discipline."],
  ["Today", "The concept practice is presented as atelier-led, international, and focused on discreet private clients."],
] as const;

export const maisonPrinciples = [
  ["Discretion", "Private information, family offices, and property access are handled with quiet precision."],
  ["Provenance", "Materials, antiques, makers, and art are chosen for origin, suitability, and longevity."],
  ["Atmosphere", "Rooms are composed for light, ceremony, comfort, and the memory they leave."],
  ["Stewardship", "Aftercare and future acquisitions keep a home evolving without losing its original character."],
] as const;

export const maisonAtelierPanels = [
  { title: "Bespoke furniture", copy: "Quietly exact pieces developed for the room, the client, and the long life of the property.", detail: "Frame, finish, upholstery, and placement are resolved with makers before installation." },
  { title: "Specialist procurement", copy: "Stone, textiles, antiques, art, lighting, and objects sourced through a trusted international network.", detail: "Procurement is managed with samples, approvals, and documented provenance." },
  { title: "Craft network", copy: "Makers, restorers, upholsterers, metalworkers, and finishers brought into the project at the right moment.", detail: "Each craft decision is selected for atmosphere and longevity, not spectacle." },
  { title: "Installation", copy: "A precise final layer, coordinated room by room so the property feels complete when the doors open.", detail: "Placement, styling, lighting levels, and handover notes are handled by the studio." },
  { title: "Stewardship", copy: "Aftercare, seasonal adjustments, and future acquisitions held with the same discretion as the first appointment.", detail: "The relationship continues quietly when a home needs to evolve." },
];

export const maisonPressMentions = [
  { source: "Atelier Review", note: "Illustrative editorial feature · private residences and material provenance" },
  { source: "The Interior Ledger", note: "Illustrative editorial feature · hospitality atmosphere and service" },
  { source: "Form & Place", note: "Illustrative editorial feature · craft networks and international commissions" },
];

export function getMaisonProject(slug: string) {
  return maisonProjects.find((project) => project.slug === slug);
}

export function getMaisonArticle(slug: string) {
  return maisonJournal.find((article) => article.slug === slug);
}
