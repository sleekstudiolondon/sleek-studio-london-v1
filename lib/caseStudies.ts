export type DemoNavItem = {
  label: string;
  href: string;
};

export type DemoProject = {
  title: string;
  location: string;
  year: string;
  category: string;
  image: string;
  description: string;
};

export type DemoService = {
  title: string;
  copy: string;
};

export type DemoTextBlock = {
  title: string;
  copy: string;
};

export type DemoJournalItem = {
  title: string;
  meta: string;
  copy: string;
};

export type DemoPressItem = {
  source: string;
  quote: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  archetype: string;
  location: string;
  year: string;
  summary: string;
  outcome: string;
  style: string;
  image: string;
  palette: string;
  nav: DemoNavItem[];
  hero: {
    eyebrow: string;
    title: string;
    copy: string;
    image: string;
  };
  philosophy: DemoTextBlock;
  projects: DemoProject[];
  services: DemoService[];
  bio?: DemoTextBlock & { image: string };
  manifesto?: DemoTextBlock;
  process?: DemoTextBlock[];
  journal?: DemoJournalItem[];
  press?: DemoPressItem[];
  team?: DemoTextBlock[];
  contact: {
    eyebrow: string;
    title: string;
    copy: string;
    email: string;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "john-doe",
    title: "John Doe",
    archetype: "Independent interior designer",
    location: "London",
    year: "2026",
    summary:
      "A quiet portfolio for a solo designer, built around soft daylight, measured prose, and an intimate enquiry path.",
    outcome:
      "Prospective private clients can understand the designer’s eye, review selected homes, and begin a calm conversation without distraction.",
    style: "Limestone, ivory, charcoal, restrained serif typography",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1800&q=78&fm=webp",
    palette: "demo-john",
    nav: [
      { label: "Home", href: "#home" },
      { label: "Studio", href: "#studio" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "Services", href: "#services" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      eyebrow: "Private residential interiors · London",
      title: "Rooms composed for slower, more beautiful living.",
      copy:
        "John Doe creates warm, quietly refined homes for clients who value natural materials, gentle proportion, and an interior that feels deeply personal.",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2200&q=80&fm=webp",
    },
    philosophy: {
      title: "A home should feel collected, not decorated.",
      copy:
        "The studio works with existing architecture, light, and the daily rituals of each client. Every decision is edited until the room feels inevitable: calm, useful, and quietly expressive.",
    },
    projects: [
      {
        title: "Holland Park Apartment",
        location: "Holland Park",
        year: "2026",
        category: "Private residence",
        image:
          "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=78&fm=webp",
        description: "Layered ivory rooms with antique oak, woven texture, and a softened city outlook.",
      },
      {
        title: "Canonbury House",
        location: "Islington",
        year: "2025",
        category: "Family home",
        image:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=78&fm=webp",
        description: "A restrained palette and tactile finishes bring ease to a busy period property.",
      },
      {
        title: "Belsize Reading Room",
        location: "Belsize Park",
        year: "2025",
        category: "Room study",
        image:
          "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1400&q=78&fm=webp",
        description: "Limestone, linen, and soft charcoal details create a compact retreat for reading and work.",
      },
    ],
    services: [
      { title: "Whole-room direction", copy: "Concept, palette, furnishing, and styling for clients who want a room resolved with care." },
      { title: "Residential renovation support", copy: "Material selection, spatial edits, and finishing detail alongside architects and contractors." },
      { title: "Sourcing and final layers", copy: "Antique, vintage, textile, artwork, and object sourcing for homes that need depth and memory." },
    ],
    bio: {
      title: "John Doe, designer",
      copy:
        "John’s work is rooted in listening: to buildings, to light, and to the way clients actually live. His studio is intentionally small, allowing each home to receive close attention from first conversation to final styling.",
      image:
        "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1100&q=78&fm=webp",
    },
    contact: {
      eyebrow: "Enquiries",
      title: "Begin with a room, a house, or a feeling you want to return to.",
      copy: "For private residential enquiries, please send a short note about the property, location, and what you hope the interior might become.",
      email: "studio@johndoe-interiors.com",
    },
  },
  {
    slug: "studio-alter",
    title: "Studio Alter",
    archetype: "Boutique contemporary interior studio",
    location: "Chelsea",
    year: "2026",
    summary:
      "A design-led studio website with a sharper editorial grid, architectural cropping, journal rhythm, and a confident contemporary voice.",
    outcome:
      "The studio presents its process, projects, and material intelligence with enough authority to support larger residential commissions.",
    style: "Off-white, ink, olive, clay accents, architectural image crops",
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1800&q=78&fm=webp",
    palette: "demo-alter",
    nav: [
      { label: "Home", href: "#home" },
      { label: "Studio", href: "#studio" },
      { label: "Projects", href: "#projects" },
      { label: "Services", href: "#services" },
      { label: "Journal", href: "#journal" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      eyebrow: "Contemporary interiors · Objects · Material studies",
      title: "Interiors with architectural tension and a human pulse.",
      copy:
        "Studio Alter designs contemporary homes, apartments, and private spaces shaped by proportion, material contrast, and disciplined warmth.",
      image:
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=2200&q=80&fm=webp",
    },
    manifesto: {
      title: "Alter the room, sharpen the ritual.",
      copy:
        "We see interiors as living compositions: a sequence of thresholds, surfaces, objects, and pauses. Our work balances strong architectural moves with the softness required for daily life.",
    },
    philosophy: {
      title: "Material decisions lead the narrative.",
      copy:
        "Stone, plaster, timber, metal, and textile are tested as a family before a scheme is drawn too tightly. This keeps each space cohesive without losing contrast or surprise.",
    },
    projects: [
      {
        title: "Grove House",
        location: "Notting Hill",
        year: "2026",
        category: "Townhouse",
        image:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=78&fm=webp",
        description: "A clay-toned townhouse study in shadow lines, plaster volume, and sculptural furniture.",
      },
      {
        title: "Park Loft",
        location: "Battersea",
        year: "2025",
        category: "Apartment",
        image:
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1500&q=78&fm=webp",
        description: "Open-plan living edited through low partitions, olive joinery, and gallery-like lighting.",
      },
      {
        title: "The Collector’s Kitchen",
        location: "Marylebone",
        year: "2025",
        category: "Interior architecture",
        image:
          "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1500&q=78&fm=webp",
        description: "An ink and stainless-steel kitchen designed around art, hosting, and precise storage.",
      },
      {
        title: "Courtyard Rooms",
        location: "Hampstead",
        year: "2024",
        category: "Private residence",
        image:
          "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=1500&q=78&fm=webp",
        description: "Layered greens and mineral textures connect a lateral home to its planted courtyard.",
      },
    ],
    services: [
      { title: "Interior architecture", copy: "Spatial planning, joinery concepts, materials, and detail direction for renovation-led homes." },
      { title: "Full interior design", copy: "Concept through installation for private clients seeking a complete contemporary interior." },
      { title: "Objects and styling", copy: "Furniture, lighting, art placement, and final composition for spaces requiring editorial precision." },
    ],
    process: [
      { title: "Survey the existing rhythm", copy: "We map light, movement, views, and constraints before proposing a visual language." },
      { title: "Build the material argument", copy: "Finishes and samples are assembled as a tactile system, not a moodboard of isolated gestures." },
      { title: "Edit to the essential", copy: "Every line, junction, and object earns its place before the scheme moves into delivery." },
    ],
    journal: [
      { title: "On olive as a neutral", meta: "Material notes", copy: "How green-black joinery can quieten a room while adding depth to pale architecture." },
      { title: "The value of negative space", meta: "Studio letter", copy: "Why restraint is not absence, and how edited rooms create stronger memories." },
      { title: "Three stones we keep returning to", meta: "Archive", copy: "A short study of honed limestone, travertine, and dark marble in domestic settings." },
    ],
    press: [
      { source: "Design Anthology", quote: "A young studio with a precise eye for contemporary domestic atmosphere." },
    ],
    contact: {
      eyebrow: "Commissions",
      title: "Tell us what needs to change.",
      copy: "Studio Alter accepts a small number of private residential commissions and interior architecture studies each year.",
      email: "hello@studioalter.co",
    },
  },
  {
    slug: "maison-form",
    title: "Maison Form",
    archetype: "Established luxury interior practice",
    location: "Kensington · Paris · Geneva",
    year: "2026",
    summary:
      "A cinematic private-client website for an established practice, with layered portfolio categories, press authority, and discreet enquiry language.",
    outcome:
      "The practice can speak to international residential and hospitality clients with a polished, high-authority digital presence.",
    style: "Deep ink, ivory, muted bronze, cinematic imagery, layered editorial layouts",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=78&fm=webp",
    palette: "demo-maison",
    nav: [
      { label: "Home", href: "#home" },
      { label: "About Us", href: "#studio" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "Atelier", href: "#atelier" },
      { label: "Press", href: "#press" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      eyebrow: "Private residences · Hospitality · International commissions",
      title: "Interiors with presence, provenance, and quiet theatre.",
      copy:
        "Maison Form is a luxury interiors practice creating layered homes, hotels, and private spaces for clients who expect discretion and exceptional detail.",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2200&q=80&fm=webp",
    },
    philosophy: {
      title: "We compose atmosphere at architectural scale.",
      copy:
        "Each commission is guided by context, craft, and the private rhythm of the client. Rooms are designed to carry ceremony when required, and stillness when the door closes.",
    },
    projects: [
      {
        title: "Belgravia Residence",
        location: "London",
        year: "2026",
        category: "Residences",
        image:
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=78&fm=webp",
        description: "A formal townhouse softened with bronze, parchment, and deeply upholstered rooms.",
      },
      {
        title: "Lakeside Villa",
        location: "Geneva",
        year: "2025",
        category: "Residences",
        image:
          "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1500&q=78&fm=webp",
        description: "An international family retreat balancing lake views, stone craft, and private entertaining.",
      },
      {
        title: "The Aurelia Suite",
        location: "Paris",
        year: "2025",
        category: "Hospitality",
        image:
          "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1500&q=78&fm=webp",
        description: "A hospitality suite with cinematic lighting, lacquered detail, and intimate dining spaces.",
      },
      {
        title: "Riad Courtyard",
        location: "Marrakech",
        year: "2024",
        category: "Hospitality",
        image:
          "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1500&q=78&fm=webp",
        description: "A restored courtyard property where craft, shade, and water shape the guest experience.",
      },
    ],
    services: [
      { title: "Private residences", copy: "Complete interior direction for townhouses, apartments, villas, and international homes." },
      { title: "Hospitality environments", copy: "Atmospheric suites, lounges, dining rooms, and boutique hotel spaces with operational awareness." },
      { title: "Atelier procurement", copy: "Bespoke furniture, specialist finishes, art advisory, and final installation through a trusted craft network." },
    ],
    process: [
      { title: "Context and discretion", copy: "Every commission begins with listening, site intelligence, and a clear understanding of privacy." },
      { title: "Atelier development", copy: "Custom pieces, finishes, lighting, and craft details are developed with makers and suppliers." },
      { title: "Installation and stewardship", copy: "The final layer is managed with precision, from placement and styling to aftercare guidance." },
    ],
    press: [
      { source: "House & Garden", quote: "Interiors of depth and discretion, where every material appears to have a history." },
      { source: "Elle Decoration", quote: "A polished practice balancing international confidence with intimate domestic detail." },
      { source: "The World of Interiors", quote: "Maison Form understands ceremony, shadow, and the quiet power of restraint." },
    ],
    team: [
      { title: "Amelia Laurent", copy: "Founder and creative director, leading concept, client vision, and the studio’s international design language." },
      { title: "Rafael Voss", copy: "Studio director, overseeing interior architecture, procurement, site coordination, and installation detail." },
    ],
    contact: {
      eyebrow: "Private enquiries",
      title: "For residences, hospitality spaces, and discreet international commissions.",
      copy: "Please contact the studio with the property location, intended scope, and preferred appointment window. All enquiries are handled in confidence.",
      email: "private@maisonform.com",
    },
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((entry) => entry.slug === slug);
}
