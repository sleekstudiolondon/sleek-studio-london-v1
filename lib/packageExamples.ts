import type { PackageId } from "./pricing";

export const EXAMPLE_PROJECT_CTA_LABEL = "Explore Example Project";

export type ExampleImage = {
  src: string;
  alt: string;
  caption?: string;
};

type SplitSection = {
  type: "split";
  kicker: string;
  title: string;
  body: string;
  secondary?: string;
  list?: string[];
  image?: ExampleImage;
};

type CardsSection = {
  type: "cards";
  kicker: string;
  title: string;
  items: {
    title: string;
    copy: string;
  }[];
};

type GallerySection = {
  type: "gallery";
  kicker: string;
  title: string;
  images: ExampleImage[];
};

type QuoteSection = {
  type: "quote";
  quote: string;
  attribution: string;
};

type ContactSection = {
  type: "contact";
  kicker: string;
  title: string;
  copy: string;
  details: {
    label: string;
    value: string;
  }[];
};

export type ExamplePage = {
  slug: string;
  label: string;
  navLabel?: string;
  heroEyebrow: string;
  heroTitle: string;
  heroCopy: string;
  heroImage?: ExampleImage;
  sections: Array<SplitSection | CardsSection | GallerySection | QuoteSection | ContactSection>;
};

export type PackageExample = {
  slug: string;
  packageId: PackageId;
  brandName: string;
  brandTagline: string;
  theme: "john" | "alder" | "maison";
  cardDescription: string;
  aboutCard?: {
    positioning: string;
    detail: string;
    summaryTitle: string;
    summarySubtle: string;
    meta: string;
    bullets: string[];
  };
  previewImage: ExampleImage;
  footerNote: string;
  imageSwapNote: string;
  pages: ExamplePage[];
};

export function buildExampleHref(slug: string, pageSlug = "") {
  return pageSlug ? `/projects/${slug}/${pageSlug}` : `/projects/${slug}`;
}

// Example imagery is defined per site so each package can present a distinct visual direction.
export const packageExamples: PackageExample[] = [
  {
    slug: "john-doe-interiors",
    packageId: "entry",
    brandName: "John Doe Interiors",
    brandTagline: "Quietly modern homes shaped with warmth and restraint.",
    theme: "john",
    cardDescription:
      "A clean, premium 3-page website example for an individual interior designer who needs elegance, clarity, and a polished first impression without unnecessary complexity.",
    aboutCard: {
      positioning: "For individual designers who need a refined first presence.",
      detail: "A focused entry level that gets you live clearly, quickly, and with confidence.",
      summaryTitle: "Lean scope, polished presentation.",
      summarySubtle: "A premium first step for studios that want clarity without overbuilding.",
      meta: "Best when a strong first impression and a clean launch matter most.",
      bullets: [
        "Clear positioning for a solo studio.",
        "Essential pages shaped with premium restraint.",
        "A calm launch that feels established from day one.",
      ],
    },
    previewImage: {
      src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1500&q=75&fm=webp",
      alt: "Light residential interior preview for John Doe Interiors",
    },
    footerNote: "Example website concept built by Sleek Studio.",
    imageSwapNote: "The Individual example shows how a focused three-page website can still feel calm, polished, and credible.",
    pages: [
      {
        slug: "",
        label: "Home",
        heroEyebrow: "John Doe Interiors",
        heroTitle: "Homes that feel quieter, clearer, and more resolved with time.",
        heroCopy:
          "John Doe Interiors shapes homes through proportion, restraint, and a careful use of light and material. The aim is not impact at first glance, but a quieter sense of rightness that grows more convincing with use.",
        sections: [
          {
            type: "split",
            kicker: "Studio introduction",
            title: "A small London studio for homes that want to feel calmer, warmer, and more fully resolved.",
            body:
              "The work is usually residential and often deeply personal. Apartments that never quite settle, townhouses with strong bones but uneven flow, or homes that need a steadier eye to bring comfort and clarity into the same conversation.",
            secondary:
              "The studio stays intentionally small. Decisions are not passed around — they are observed, edited, and carried through with continuity from first visit to final layer.",
          },
          {
            type: "cards",
            kicker: "What the studio is known for",
            title: "Rooms that feel composed, lived in, and quietly complete.",
            items: [
              {
                title: "Softness with structure",
                copy: "Colour and texture are used to settle a room rather than dramatise it. Finishes are chosen for how they hold light and age over time, not how they read in a photograph.",
              },
              {
                title: "Daily life, properly considered",
                copy: "Movement, storage, and scale are treated as part of the atmosphere of a home. Rooms should work quietly at eight in the morning as well as they do in the evening.",
              },
              {
                title: "Editing, not adding",
                copy: "The final result is rarely about more. It is about choosing what matters, removing what does not, and allowing the space to feel inevitable.",
              },
            ],
          },
          {
            type: "split",
            kicker: "Design philosophy",
            title: "A good room lowers the volume of daily life.",
            body:
              "The most persuasive homes are not arranged for performance. They are shaped through proportion, restraint, and a close understanding of what makes a space feel calm, generous, and steady.",
            secondary:
              "That often means letting certain things stay quiet. Circulation is kept clear. Materials carry mood. Decorative noise is resisted so comfort becomes something deliberate rather than accidental.",
          },
          {
            type: "cards",
            kicker: "How the studio works",
            title: "The work moves carefully, but it does move with purpose.",
            items: [
              {
                title: "Reading the home properly",
                copy: "Before anything is proposed, the studio looks closely at what feels unresolved — circulation, light, proportion, and the quieter things that stop a home from settling.",
              },
              {
                title: "Shaping the scheme with restraint",
                copy: "The scheme is built as one composed language. Layout, materials, lighting, and furnishings are developed together so the home gains clarity rather than collecting decisions.",
              },
              {
                title: "Refinement, selections, and settling in",
                copy: "The final phase is slower and more exacting. Layers are edited back, scale is adjusted, and decisions are carried through until the home feels complete without feeling finished.",
              },
            ],
          },
          {
            type: "split",
            kicker: "Residential focus",
            title: "Best suited to clients who want their home to feel more resolved, not more decorated.",
            body:
              "Projects are often at that useful middle point where a home needs more than surface change but less than theatre: a newly bought flat that lacks warmth, a family house that needs rooms to work harder, or a broader renovation where calm and coherence matter as much as finish.",
            secondary:
              "The studio tends to fit people who care about how rooms feel in real life, who notice proportion, light, and mood, and who want the end result to feel quietly elevated rather than obviously designed.",
            list: [
              "Furnishing and atmosphere-led home updates",
              "Room-by-room renewal with stronger flow and material clarity",
              "Residential refurbishments that want discipline, not drama",
            ],
          },
          {
            type: "split",
            kicker: "Client experience",
            title: "Clients should feel guided with confidence, but never pushed into a house that does not feel like theirs.",
            body:
              "The process is calm, direct, and closely held. Clients are not overwhelmed with endless options or left alone to decode every detail. Instead, they are guided through decisions with a clear point of view, practical clarity, and enough room for the home to keep its own character.",
            secondary:
              "That means listening carefully to how people actually live: how the house is used in the morning, where everyone gathers, what feels exposed, what never quite gets finished, and which details would quietly improve life every single day.",
            list: [
              "Direct conversations and fewer but better decisions",
              "Clear guidance on materials, furnishing, and finish",
              "A home that still feels personal when the work is done",
            ],
          },
          {
            type: "quote",
            quote: "A home should not feel arranged for a moment. It should feel quietly right for the people living in it.",
            attribution: "",
          },
        ],
      },
      {
        slug: "portfolio",
        label: "Portfolio",
        heroEyebrow: "Selected work",
        heroTitle: "Residential interiors shaped with calm, proportion, and restraint.",
        heroCopy:
          "A curated selection of homes designed to feel quieter, warmer, and more resolved in daily life.",
        heroImage: {
          src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2200&q=75&fm=webp",
          alt: "Belgravia Townhouse living room interior for John Doe Interiors",
        },
        sections: [
          {
            type: "split",
            kicker: "Portfolio selection",
            title: "A studio edit of quiet, high-touch residential interiors.",
            body:
              "The composition is designed to read like a carefully paced interior portfolio rather than a conventional gallery, balancing large image moments with restrained project notes and a clearer sense of studio authorship.",
            secondary:
              "Rather than presenting volume, the page focuses on atmosphere, proportion, and the kinds of homes that best describe the studio's editorial point of view.",
          },
          {
            type: "gallery",
            kicker: "Projects",
            title: "Selected private residential work.",
            images: [
              {
                src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=75&fm=webp",
                alt: "Primrose Hill Apartment kitchen and dining space for John Doe Interiors portfolio",
                caption: "Primrose Hill Apartment",
              },
              {
                src: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1600&q=75&fm=webp",
                alt: "Holland Park Residence living room detail for John Doe Interiors portfolio",
                caption: "Holland Park Residence",
              },
              {
                src: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1900&q=75&fm=webp",
                alt: "Notting Hill House bedroom view for John Doe Interiors portfolio",
                caption: "Notting Hill House",
              },
            ],
          },
          {
            type: "cards",
            kicker: "Shared qualities",
            title: "What these homes have in common.",
            items: [
              {
                title: "Architectural softness",
                copy: "Layouts are refined without losing ease, keeping rooms clear, inviting, and proportionally calm.",
              },
              {
                title: "Material restraint",
                copy: "Stone, timber, plaster, and upholstery are chosen to sit together quietly rather than compete for attention.",
              },
              {
                title: "Daily-life clarity",
                copy: "Storage, lighting, furnishing, and finish decisions are made around how each client actually wants to live in the space.",
              },
            ],
          },
        ],
      },
      {
        slug: "contact",
        label: "Contact",
        heroEyebrow: "Contact",
        heroTitle: "Begin a residential project conversation.",
        heroCopy:
          "The studio welcomes residential enquiries from clients looking for a calm, thoughtful process and a home shaped with clarity, warmth, and restraint.",
        sections: [
          {
            type: "split",
            kicker: "Begin the conversation",
            title: "A good fit for homes that need thoughtful guidance and a measured design hand.",
            body:
              "The studio is best suited to residential projects where clients want a calm, collaborative process and a designer who can shape the work with clarity from the earliest decisions onward.",
            secondary:
              "Whether the brief is a furnishing-led update or a fuller refurbishment, initial conversations usually begin with the property, desired atmosphere, timeline, and how involved you would like support to be.",
          },
          {
            type: "cards",
            kicker: "Projects that suit the studio",
            title: "Often the right fit for quieter residential projects that need clarity and care.",
            items: [
              {
                title: "Furnishing-led updates",
                copy: "For clients who want a room or home to feel more coherent, layered, and resolved without entering a full construction programme.",
              },
              {
                title: "Refurbishment guidance",
                copy: "For projects where layout, finishes, lighting, and joinery decisions need a calmer design framework from the outset.",
              },
              {
                title: "Homes needing a softer point of view",
                copy: "Particularly suited to clients who value restraint, atmosphere, and spaces that feel personal rather than heavily styled.",
              },
            ],
          },
          {
            type: "contact",
            kicker: "Consultations",
            title: "Share your project, timeline, and location.",
            copy:
              "Enquiries are handled personally, with a considered first reply that usually arrives within a few working days and focuses on whether the brief, scope, and timing feel aligned for both sides.",
            details: [
              { label: "Email", value: "studio@johndoeinteriors.com" },
              { label: "Location", value: "London and surrounding counties" },
              { label: "Projects", value: "Residential refurbishments and furnishing" },
            ],
          },
          {
            type: "split",
            kicker: "After your first message",
            title: "Every enquiry begins with a clear, personal response and a sensible next step.",
            body:
              "If the project sounds like a strong fit, the next conversation usually covers the property, intended scope, timescale, and the level of support you are looking for, so the design process can begin with clarity.",
            secondary:
              "Where helpful, the studio can also advise on likely priorities, early pacing, and whether the brief is best approached as furnishing, refinement, or a broader residential scheme.",
          },
          {
            type: "cards",
            kicker: "Useful to include",
            title: "A few details help make the first conversation more useful from the start.",
            items: [
              {
                title: "Property and location",
                copy: "A short note on the home, its current state, and where the project is based helps establish scope quickly.",
              },
              {
                title: "Timing and priorities",
                copy: "An outline of your timeline, decision points, and any rooms of greatest importance makes the first discussion more productive.",
              },
              {
                title: "Desired atmosphere",
                copy: "References are welcome, but even a few words about how you want the home to feel are often the most useful starting point.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "studio-alder-interiors",
    packageId: "mid",
    brandName: "Studio Alder Interiors",
    brandTagline: "Layered residential interiors shaped with structure, restraint, and material calm.",
    theme: "alder",
    cardDescription:
      "An eight-page example for The House package, showing how a growing interiors studio can present portfolio depth, service clarity, and a refined enquiry path.",
    aboutCard: {
      positioning: "For growing studios ready for a fuller, more structured presence.",
      detail: "The House gives the studio eight polished pages, five changes per week, and a 48-hour turnaround rhythm.",
      summaryTitle: "Eight pages, clearer pathways, stronger proof.",
      summarySubtle: "A complete studio website for teams moving beyond a simple launch.",
      meta: "Best when your studio needs services, portfolio, process, journal, and enquiry pages to work together.",
      bullets: [
        "8-page website structure aligned to The House.",
        "5 weekly changes with 48-hour turnaround after approval.",
        "A refined, commercially ready presence for a growing interiors studio.",
      ],
    },
    previewImage: {
      src: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1500&q=78&fm=webp",
      alt: "Refined kitchen and dining space with warm timber and pale stone for Studio Alder Interiors",
    },
    footerNote: "Example website concept built by Sleek Studio.",
    imageSwapNote:
      "The House example shows how an eight-page interior studio website can feel polished, structured, and ready for higher-value enquiries.",
    pages: [
      {
        slug: "",
        label: "Home",
        heroEyebrow: "Studio Alder Interiors",
        heroTitle: "Refined interiors with a clearer studio point of view.",
        heroCopy:
          "A polished homepage for The House package, built around eight clear pages, five weekly changes, and a 48-hour refinement rhythm that keeps a growing interiors studio moving with confidence.",
        heroImage: {
          src: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=2200&q=78&fm=webp",
          alt: "Studio Alder Interiors homepage showing a refined kitchen and dining room with warm natural materials",
        },
        sections: [
          {
            type: "cards",
            kicker: "The House structure",
            title: "A complete eight-page presence for a studio ready to show more depth.",
            items: [
              {
                title: "8 considered pages",
                copy: "Home, about, portfolio, services, projects, process, journal, and contact are shaped as one coherent studio experience.",
              },
              {
                title: "5 weekly changes",
                copy: "The support rhythm gives the studio room to refine copy, imagery, and priority content without losing pace.",
              },
              {
                title: "48-hour turnaround",
                copy: "Approved updates move quickly, keeping the website useful after launch rather than frozen at handover.",
              },
            ],
          },
          {
            type: "split",
            kicker: "Studio positioning",
            title: "A refined digital house for an interiors practice with broader ambition.",
            body:
              "Studio Alder needs more than a beautiful first impression. The site gives the practice a structured way to present its services, selected work, process, and point of view without making the experience feel crowded or over-explained.",
            secondary:
              "The result is elegant, commercially clear, and intentionally calm: premium enough for design-led clients, but practical enough to convert a serious enquiry.",
            image: {
              src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=78&fm=webp",
              alt: "Neutral dining interior with sculptural chairs and soft daylight for Studio Alder Interiors",
            },
          },
          {
            type: "gallery",
            kicker: "Featured work",
            title: "A portfolio rhythm with enough range to feel established.",
            images: [
              {
                src: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1500&q=78&fm=webp",
                alt: "Warm kitchen and dining space for Studio Alder Interiors portfolio",
                caption: "Hampstead townhouse",
              },
              {
                src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=78&fm=webp",
                alt: "Calm contemporary sitting room with stone fireplace for Studio Alder Interiors",
                caption: "Chelsea apartment",
              },
              {
                src: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1500&q=78&fm=webp",
                alt: "Layered bedroom with soft textiles and quiet architectural detail for Studio Alder Interiors",
                caption: "Cotswolds retreat",
              },
            ],
          },
          {
            type: "quote",
            quote: "A strong studio website should feel measured, useful, and quietly persuasive at every step.",
            attribution: "The House example",
          },
        ],
      },
      {
        slug: "about",
        label: "About",
        heroEyebrow: "About",
        heroTitle:
          "A London interiors studio shaping residential and boutique environments through clarity, proportion, and material restraint.",
        heroCopy:
          "Studio Alder operates as a growing design house: calm in tone, precise in delivery, and structured enough to guide layered commissions from concept to final detail.",
        heroImage: {
          src: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1800&q=78&fm=webp",
          alt: "Studio Alder Interiors about page with warm neutral living room details",
        },
        sections: [
          {
            type: "split",
            kicker: "Studio overview",
            title: "Studio Alder is a collaborative interiors practice with the range to hold more layered commissions.",
            body:
              "The studio works across private residential, boutique commercial, and selected developer-facing interiors, bringing together creative direction, design development, material curation, and a considered delivery framework.",
            secondary:
              "Rather than presenting a single designer viewpoint, the site positions Studio Alder as a growing design house: clear in perspective, measured in execution, and able to hold atmosphere and operational confidence together.",
            list: [
              "Residential interiors, boutique commercial spaces, and selected developer collaborations",
              "A studio structure spanning creative direction, design development, and project coordination",
              "London-based, with scope across the capital, the Home Counties, and select external commissions",
            ],
          },
          {
            type: "cards",
            kicker: "Studio perspective",
            title: "What gives the practice its stronger, more mature point of view.",
            items: [
              {
                title: "Architectural clarity",
                copy: "The studio uses planning, rhythm, and proportion to make spaces feel composed at the structural level, before the final layers are introduced.",
              },
              {
                title: "Material depth",
                copy: "Finishes, textures, and furnishings are curated to create warmth and atmosphere while still feeling disciplined, contemporary, and enduring.",
              },
              {
                title: "Studio-scale confidence",
                copy: "Projects are shaped with a broader understanding of client flow, coordination, and delivery, helping the work feel more established than a purely personal practice.",
              },
            ],
          },
          {
            type: "split",
            kicker: "Practice focus",
            title: "The studio moves comfortably between private homes, hospitality-minded spaces, and more structured multi-layered briefs.",
            body:
              "Studio Alder is suited to clients who want more than styling and more than a narrow design signature. The practice is built for commissions that require atmosphere, spatial judgment, material consistency, and a steadier framework for decision-making across the life of the project.",
            secondary:
              "That makes the studio especially relevant for projects where the design language needs to feel elevated and coherent, but the client experience also needs to feel organised, well-held, and professionally paced.",
            list: [
              "Close collaboration with architects, consultants, makers, and specialist suppliers",
              "Furnishing, finishes, lighting, spatial planning, and detail development considered together",
              "A restrained visual identity paired with a stronger sense of scope and delivery maturity",
            ],
            image: {
              src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=75&fm=webp",
              alt: "Studio profile supporting image for Studio Alder Interiors",
            },
          },
          {
            type: "cards",
            kicker: "Delivery rhythm",
            title: "Creative direction is matched by a more structured delivery model.",
            items: [
              {
                title: "Concept and spatial strategy",
                copy: "Early work aligns brief, circulation, tone, and project intent so the wider scheme has clarity before it begins to expand.",
              },
              {
                title: "Design development and specification",
                copy: "Layouts, materials, joinery, lighting, furnishings, and detailing are developed as one integrated language rather than separate layers.",
              },
              {
                title: "Coordination and completion",
                copy: "The later stages focus on refinement, sequencing, supplier coordination, and making sure the final space feels resolved both visually and operationally.",
              },
            ],
          },
          {
            type: "quote",
            quote: "The most persuasive studios pair atmosphere with clarity, so the work feels considered at every scale.",
            attribution: "Studio Alder Interiors",
          },
        ],
      },
      {
        slug: "portfolio",
        label: "Portfolio",
        heroEyebrow: "Portfolio",
        heroTitle: "A portfolio designed to feel curated, substantial, and easy to explore.",
        heroCopy: "The House package gives Studio Alder room to lead with image quality, then support each project with enough detail to build trust.",
        heroImage: {
          src: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1900&q=78&fm=webp",
          alt: "Studio Alder Interiors portfolio hero with warm kitchen and dining room",
        },
        sections: [
          {
            type: "gallery",
            kicker: "Selected projects",
            title: "Selected work presented with calm pacing and confident hierarchy.",
            images: [
              {
                src: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1500&q=78&fm=webp",
                alt: "Hampstead townhouse kitchen and dining space for Studio Alder Interiors",
                caption: "Hampstead townhouse",
              },
              {
                src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=78&fm=webp",
                alt: "Chelsea apartment sitting room for Studio Alder Interiors",
                caption: "Chelsea apartment",
              },
              {
                src: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1500&q=78&fm=webp",
                alt: "Cotswolds retreat bedroom for Studio Alder Interiors",
                caption: "Cotswolds retreat",
              },
            ],
          },
          {
            type: "cards",
            kicker: "Portfolio logic",
            title: "Project browsing that supports a higher-trust enquiry.",
            items: [
              {
                title: "Lead with atmosphere",
                copy: "Large image moments establish taste and confidence before visitors move into practical detail.",
              },
              {
                title: "Add enough context",
                copy: "Project names, locations, and scope notes help the work feel real without slowing the page down.",
              },
              {
                title: "Guide the next step",
                copy: "The page keeps enquiry routes visible so inspiration can turn into a serious project conversation.",
              },
            ],
          },
          {
            type: "split",
            kicker: "The House depth",
            title: "A portfolio page with room for both mood and commercial clarity.",
            body:
              "For a growing studio, the portfolio has to do more than display taste. It needs to show range, signal project maturity, and help the right clients understand where their own home could sit within the practice.",
            secondary:
              "The page is intentionally spacious, but the hierarchy stays practical: featured work, project pathways, and a clear route into enquiry.",
          },
        ],
      },
      {
        slug: "services",
        label: "Services",
        heroEyebrow: "Services",
        heroTitle: "Services explained with enough clarity to help the right clients self-select.",
        heroCopy: "A dedicated services page is where The House becomes especially useful: it gives Studio Alder space to explain scope without diluting the visual restraint.",
        heroImage: {
          src: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1900&q=78&fm=webp",
          alt: "Studio Alder Interiors services page with refined living space and pale timber",
        },
        sections: [
          {
            type: "cards",
            kicker: "Offer structure",
            title: "Three service paths, each framed for confident enquiry.",
            items: [
              {
                title: "Full residential renovation",
                copy: "Spatial planning, finish direction, lighting, furnishing, procurement, and detail coordination for complete homes.",
              },
              {
                title: "Furnishing and final layer",
                copy: "A focused route for clients who need rooms to feel coherent, sourced, and resolved without entering a full renovation.",
              },
              {
                title: "Developer and boutique commercial",
                copy: "Interior direction for refined residential schemes, hospitality-minded spaces, and presentation-led environments.",
              },
            ],
          },
          {
            type: "split",
            kicker: "Conversion role",
            title: "The page answers practical questions while keeping the brand elevated.",
            body:
              "Clients can understand what is included, how the studio works, and which route best fits their brief before they enquire. That makes the contact step feel more deliberate and less exploratory.",
            secondary:
              "The House support rhythm then keeps the service content fresh, with five weekly changes available and approved updates turned around within 48 hours.",
            image: {
              src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=78&fm=webp",
              alt: "Material-rich interior detail for Studio Alder services page",
            },
          },
          {
            type: "quote",
            quote: "Clarity is part of the luxury: clients should understand the route without feeling pushed through it.",
            attribution: "Studio Alder Interiors",
          },
        ],
      },
      {
        slug: "projects",
        label: "Projects",
        heroEyebrow: "Projects",
        heroTitle: "Project pathways that make the studio feel established without becoming complicated.",
        heroCopy: "The projects route shows how The House can create a richer browsing experience beyond a single portfolio page.",
        heroImage: {
          src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=78&fm=webp",
          alt: "Studio Alder Interiors projects page hero with warm contemporary living space",
        },
        sections: [
          {
            type: "split",
            kicker: "Project storytelling",
            title: "Separate project navigation creates a calmer, deeper browsing experience.",
            body:
              "Visitors can move between overview, featured homes, and service-related work in a way that feels intentional and premium. The structure supports more proof without making the site feel heavy.",
            secondary:
              "For a growing studio, this is the difference between showing images and building a persuasive body of work.",
            image: {
              src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1500&q=78&fm=webp",
              alt: "Studio Alder Interiors project storytelling image with soft contemporary furnishings",
            },
          },
          {
            type: "gallery",
            kicker: "Project index",
            title: "A small archive that feels curated rather than crowded.",
            images: [
              {
                src: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1500&q=78&fm=webp",
                alt: "Marylebone maisonette project for Studio Alder Interiors",
                caption: "Marylebone maisonette",
              },
              {
                src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1500&q=78&fm=webp",
                alt: "Highgate house project for Studio Alder Interiors",
                caption: "Highgate house",
              },
              {
                src: "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1500&q=78&fm=webp",
                alt: "Soho apartment project for Studio Alder Interiors",
                caption: "Soho apartment",
              },
            ],
          },
          {
            type: "cards",
            kicker: "Why it works",
            title: "The project route supports confidence before contact.",
            items: [
              {
                title: "More proof",
                copy: "The site can hold more selected work while still feeling controlled and editorial.",
              },
              {
                title: "Better orientation",
                copy: "Visitors can understand project type, location, and tone without needing a long case-study system.",
              },
              {
                title: "Clearer conversion",
                copy: "Project browsing links naturally into service pages, process notes, and the contact route.",
              },
            ],
          },
        ],
      },
      {
        slug: "process",
        label: "Process",
        heroEyebrow: "Process",
        heroTitle: "A measured design process that turns a complex brief into a calmer sequence of decisions.",
        heroCopy:
          "The House gives Studio Alder room to explain how a project moves, how decisions are held, and how the client experience stays clear from concept to completion.",
        heroImage: {
          src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1900&q=78&fm=webp",
          alt: "Studio Alder process page showing a calm living room with textured materials",
        },
        sections: [
          {
            type: "cards",
            kicker: "Working rhythm",
            title: "A process page that reassures without overloading the visitor.",
            items: [
              {
                title: "Discovery and direction",
                copy: "Brief, property, lifestyle, and atmosphere are translated into a clear design direction before the work expands.",
              },
              {
                title: "Development and specification",
                copy: "Layouts, materials, furnishings, lighting, and details are resolved together so the scheme feels coherent.",
              },
              {
                title: "Coordination and completion",
                copy: "The studio manages refinement, supplier conversations, and final layers with a calm, structured cadence.",
              },
            ],
          },
          {
            type: "split",
            kicker: "Why this page matters",
            title: "Process content helps premium clients feel held before they enquire.",
            body:
              "Interior projects can feel complex before they begin. A strong process page reduces uncertainty, gives the studio authority, and helps clients understand what kind of support they are buying.",
            secondary:
              "For The House, this page is also a conversion asset: it gives the studio room to sound experienced, organised, and commercially ready.",
          },
        ],
      },
      {
        slug: "journal",
        label: "Journal",
        heroEyebrow: "Journal",
        heroTitle: "Editorial notes that extend the studio voice beyond the portfolio.",
        heroCopy:
          "A journal page gives Studio Alder a controlled place for material edits, project notes, and perspective pieces that support trust after launch.",
        heroImage: {
          src: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1900&q=78&fm=webp",
          alt: "Studio Alder journal page with refined dining room and neutral palette",
        },
        sections: [
          {
            type: "cards",
            kicker: "Editorial use",
            title: "A restrained content layer for an interiors studio with a point of view.",
            items: [
              {
                title: "Material notes",
                copy: "Short, useful edits on stone, timber, plaster, upholstery, and lighting choices.",
              },
              {
                title: "Project observations",
                copy: "Behind-the-scenes thinking that makes the studio process feel more considered.",
              },
              {
                title: "Studio perspective",
                copy: "Opinion-led content that supports search, credibility, and a stronger brand voice.",
              },
            ],
          },
          {
            type: "split",
            kicker: "Ongoing refinement",
            title: "The House support rhythm keeps the page alive after launch.",
            body:
              "With five weekly changes and 48-hour turnaround after approval, the journal does not need to sit untouched. It can become a refined, manageable layer of authority for the studio.",
            secondary:
              "That matters for growing practices that want a website to support positioning, not just display finished rooms.",
          },
        ],
      },
      {
        slug: "contact",
        label: "Contact",
        heroEyebrow: "Contact",
        heroTitle: "A considered enquiry route for clients who already understand the studio fit.",
        heroCopy: "The contact page is structured to feel calm, premium, and practical, giving serious prospects enough direction to start well.",
        heroImage: {
          src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=78&fm=webp",
          alt: "Studio Alder Interiors contact page with refined residential interior detail",
        },
        sections: [
          {
            type: "split",
            kicker: "Before enquiry",
            title: "A contact page should qualify gently, not create friction.",
            body:
              "The page explains what kind of project fits the studio, what to include in an enquiry, and how the first conversation usually begins.",
            secondary:
              "That lets the form feel like a continuation of the brand rather than a generic final step.",
          },
          {
            type: "contact",
            kicker: "Project enquiries",
            title: "Share your project timeline and location.",
            copy:
              "Enquiries are reviewed with the same care as the studio's design work. A useful first note includes property type, location, desired scope, and any important timing.",
            details: [
              { label: "Email", value: "hello@studioalderinteriors.com" },
              { label: "Studio", value: "London and the Home Counties" },
              { label: "Project types", value: "Residential, boutique commercial, and selected developer work" },
            ],
          },
          {
            type: "cards",
            kicker: "Useful to include",
            title: "A more useful first message begins with the right details.",
            items: [
              {
                title: "Property and location",
                copy: "Share the home or space, where it is based, and what currently feels unresolved.",
              },
              {
                title: "Scope and timing",
                copy: "Note whether you need full renovation, furnishing, commercial direction, or phased support.",
              },
              {
                title: "Desired atmosphere",
                copy: "A few words on how the space should feel are often more useful than a long reference deck.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "maison-form-interiors",
    packageId: "top",
    brandName: "Maison Form Interiors",
    brandTagline: "Private interiors shaped with cinematic restraint, rare materials, and exacting delivery.",
    theme: "maison",
    cardDescription:
      "A White Glove example website for an established luxury interiors practice, with a bespoke editorial feel, concierge-level delivery cues, and a 20+ page architecture.",
    aboutCard: {
      positioning: "For established studios wanting complete creative freedom.",
      detail: "White Glove is concierge-led, fully bespoke, and built for ambitious studios that need 20+ pages and 24-hour priority refinement.",
      summaryTitle: "Bespoke architecture, editorial pacing, private delivery.",
      summarySubtle: "A high-end digital presence shaped around the studio rather than a predefined template.",
      meta: "Best when the website needs to feel immersive, substantial, and unmistakably premium.",
      bullets: [
        "20+ pages shaped around the full client journey.",
        "Concierge-level delivery and 24-hour priority turnaround.",
        "The most flexible, expansive, fully bespoke route.",
      ],
    },
    previewImage: {
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80&fm=webp",
      alt: "High-end living room with stone fireplace and sculptural furniture for Maison Form Interiors",
    },
    footerNote: "Example website concept built by Sleek Studio.",
    imageSwapNote:
      "The White Glove example shows how a 20+ page luxury interiors website can feel immersive, selective, and fully bespoke.",
    pages: [
      {
        slug: "",
        label: "Home",
        heroEyebrow: "Maison Form Interiors",
        heroTitle: "A private interiors website designed to feel bespoke before a word is read.",
        heroCopy:
          "Maison Form shows the White Glove tier at its most editorial: 20+ page potential, concierge-level delivery, 24-hour priority refinement, and a brand world built for high-value private commissions.",
        heroImage: {
          src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80&fm=webp",
          alt: "Maison Form Interiors homepage hero with elegant stone fireplace and sculptural furniture",
        },
        sections: [
          {
            type: "gallery",
            kicker: "Featured project world",
            title: "A more immersive visual system for a studio with private, high-value work.",
            images: [
              {
                src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80&fm=webp",
                alt: "Maison Form Interiors editorial homepage image with stone fireplace and quiet seating",
                caption: "Mayfair residence",
              },
              {
                src: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1600&q=80&fm=webp",
                alt: "Maison Form Interiors gallery image with refined dining room and artful lighting",
                caption: "Belgravia dining room",
              },
              {
                src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80&fm=webp",
                alt: "Maison Form Interiors gallery image with luxury bedroom and soft architectural detail",
                caption: "Paris apartment",
              },
            ],
          },
          {
            type: "quote",
            quote: "The website should feel like entering the atmosphere of the studio before a word has been read.",
            attribution: "Maison Form Interiors",
          },
          {
            type: "split",
            kicker: "Brand world",
            title: "The site behaves like a private brand world, not a brochure.",
            body:
              "White Glove is where the layout can slow down, imagery can breathe, and practical pages can still feel art-directed. The experience is built for a studio whose work requires discretion, depth, and a sense of arrival.",
            secondary:
              "The 20+ page architecture can hold portfolio systems, private services, process, editorial notes, press, location pages, and enquiry routes without forcing everything into one compressed narrative.",
            image: {
              src: "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1600&q=80&fm=webp",
              alt: "Maison Form Interiors brand world image with dark wood, stone, and soft upholstery",
            },
          },
          {
            type: "cards",
            kicker: "White Glove depth",
            title: "More architecture, more narrative, more bespoke control.",
            items: [
              {
                title: "20+ page potential",
                copy: "The site can expand into private residences, hospitality, services, process, journal, press, and location-led pages.",
              },
              {
                title: "Concierge delivery",
                copy: "The build is shaped through a closer, more directed process for studios that need high-touch creative and technical support.",
              },
              {
                title: "24-hour priority refinement",
                copy: "Approved changes are handled quickly so the website can keep pace with launches, press, and live business priorities.",
              },
            ],
          },
        ],
      },
      {
        slug: "about",
        label: "About",
        heroEyebrow: "About",
        heroTitle: "A studio profile shaped to feel private, articulate, and unmistakably high luxury.",
        heroCopy:
          "Maison Form is presented as an established international practice with a precise creative voice, a discreet client experience, and the delivery depth expected at the top end of the market.",
        heroImage: {
          src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2100&q=80&fm=webp",
          alt: "Maison Form Interiors about page with elegant stone fireplace and tailored seating",
        },
        sections: [
          {
            type: "split",
            kicker: "Practice",
            title: "Maison Form designs homes and hospitality spaces with atmosphere, discretion, and exacting detail.",
            body:
              "The studio approaches each project as a complete environment rather than a set of isolated rooms. Layout, finish, furnishing, light, art direction, and procurement are treated as one continuous language.",
            secondary:
              "The website gives Maison Form room to communicate that level of precision through slower pacing, richer language, and a stronger sense of world-building.",
            list: [
              "Full-service interior architecture and furnishing",
              "Private residential, hospitality, and developer collaborations",
              "London, Paris, and select international commissions",
            ],
          },
          {
            type: "cards",
            kicker: "Point of view",
            title: "A fully developed expression of the studio's identity.",
            items: [
              {
                title: "Who they design for",
                copy: "Clients seeking interiors that feel cultivated, emotionally resonant, and carefully tailored to the architecture of the property.",
              },
              {
                title: "How they work",
                copy: "Maison Form moves from concept through procurement and installation with a controlled design language and concierge-level client experience.",
              },
              {
                title: "What makes them distinctive",
                copy: "The studio balances softness and structure, giving projects cinematic impact, long-term ease, and a sense of private character.",
              },
            ],
          },
          {
            type: "split",
            kicker: "White Glove role",
            title: "The About page becomes a confidence piece, not a short biography.",
            body:
              "At this tier, biography, credibility, process, and taste need to work together. The page gives the studio enough space to sound established without becoming corporate.",
            secondary:
              "That is why White Glove supports a larger content architecture and a closer delivery process, rather than compressing the practice into a small standard template.",
          },
          {
            type: "quote",
            quote: "We are drawn to interiors that feel quietly commanding, richly layered, and impossible to mistake for anyone else's work.",
            attribution: "Maison Form Interiors",
          },
        ],
      },
      {
        slug: "portfolio",
        label: "Portfolio",
        heroEyebrow: "Portfolio",
        heroTitle: "A portfolio system built to feel immersive, selective, and substantial.",
        heroCopy:
          "White Glove supports a deeper project presentation system, with room for private residences, hospitality work, featured narratives, and carefully controlled image pacing.",
        heroImage: {
          src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2100&q=80&fm=webp",
          alt: "Maison Form Interiors portfolio page with high luxury bedroom and warm neutral materials",
        },
        sections: [
          {
            type: "gallery",
            kicker: "Selected residences",
            title: "Project imagery given enough scale, variation, and atmosphere to feel editorial.",
            images: [
              {
                src: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=80&fm=webp",
                alt: "Mayfair residence sitting room for Maison Form Interiors",
                caption: "Mayfair residence",
              },
              {
                src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80&fm=webp",
                alt: "Belgravia townhouse drawing room for Maison Form Interiors",
                caption: "Belgravia townhouse",
              },
              {
                src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80&fm=webp",
                alt: "Paris pied-a-terre bedroom for Maison Form Interiors",
                caption: "Paris pied-a-terre",
              },
            ],
          },
          {
            type: "cards",
            kicker: "Portfolio system",
            title: "A deeper archive can still feel selective.",
            items: [
              {
                title: "Featured narratives",
                copy: "Lead projects can expand into dedicated stories with scope, location, materials, and design intent.",
              },
              {
                title: "Private index",
                copy: "Smaller projects can sit in a restrained archive without competing with the most important case studies.",
              },
              {
                title: "Editorial control",
                copy: "Image scale, captioning, and page pacing are designed to feel closer to a luxury publication than a grid.",
              },
            ],
          },
          {
            type: "split",
            kicker: "20+ page architecture",
            title: "The portfolio can expand without losing its sense of discretion.",
            body:
              "For established studios, a single gallery is rarely enough. White Glove allows project families, sectors, locations, and private pages to be arranged with more nuance.",
            secondary:
              "The result is still calm, but the experience has more weight and more room to convert high-value clients.",
          },
        ],
      },
      {
        slug: "services",
        label: "Services",
        heroEyebrow: "Services",
        heroTitle: "A luxury services page with room for nuance, discretion, and bespoke detail.",
        heroCopy:
          "White Glove allows service pages to feel tailored and expansive, with enough structure to explain a high-touch process without making it feel transactional.",
        heroImage: {
          src: "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=2100&q=80&fm=webp",
          alt: "Maison Form Interiors services page with luxury living room and tailored finishes",
        },
        sections: [
          {
            type: "cards",
            kicker: "Offerings",
            title: "Services presented with a more bespoke sense of detail.",
            items: [
              {
                title: "Interior architecture",
                copy: "Large-scale spatial redesign, finishes, detailing, lighting strategy, and bespoke furnishing direction.",
              },
              {
                title: "Turnkey furnishing",
                copy: "Procurement, installation, final styling, and residence-ready completion for private clients.",
              },
              {
                title: "Hospitality and developer",
                copy: "Luxury residential and hospitality environments shaped around atmosphere, brand feel, and long-term use.",
              },
            ],
          },
          {
            type: "split",
            kicker: "Concierge delivery",
            title: "The page makes high-touch support feel calm, not excessive.",
            body:
              "At this level, the client is not simply buying a design service. They are buying judgement, discretion, access, control, and a process that protects their time.",
            secondary:
              "The website needs to communicate that before a consultation. White Glove gives the page enough depth to do it properly.",
            image: {
              src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80&fm=webp",
              alt: "Maison Form Interiors concierge services image with luxury neutral living space",
            },
          },
          {
            type: "quote",
            quote: "The service experience should feel as controlled and considered as the interiors themselves.",
            attribution: "Maison Form Interiors",
          },
        ],
      },
      {
        slug: "projects",
        label: "Projects",
        heroEyebrow: "Projects",
        heroTitle: "Project routes that make the website feel expansive, private, and highly composed.",
        heroCopy:
          "Rather than relying on one portfolio page, White Glove can support deeper project pathways, location-led browsing, and more luxurious transitions between work.",
        heroImage: {
          src: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=2100&q=80&fm=webp",
          alt: "Maison Form Interiors projects page with refined dining room and warm architectural detail",
        },
        sections: [
          {
            type: "split",
            kicker: "Project depth",
            title: "Separate project pathways make the site feel larger and more bespoke.",
            body:
              "This route can support featured homes, project narratives, private archives, hospitality work, and location-led browsing in a way that feels closer to a true luxury studio platform.",
            secondary:
              "The page keeps its emphasis on narrative structure and editorial pacing rather than dropping into a loose standalone image block.",
            image: {
              src: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=80&fm=webp",
              alt: "Maison Form Interiors project depth image with layered bedroom and soft neutral materials",
            },
          },
          {
            type: "gallery",
            kicker: "Private pathways",
            title: "A project system that can hold more than a conventional gallery.",
            images: [
              {
                src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=80&fm=webp",
                alt: "Maison Form Interiors London residence project pathway",
                caption: "London residences",
              },
              {
                src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1500&q=80&fm=webp",
                alt: "Maison Form Interiors hospitality project pathway",
                caption: "Hospitality interiors",
              },
              {
                src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1500&q=80&fm=webp",
                alt: "Maison Form Interiors international project pathway",
                caption: "International homes",
              },
            ],
          },
          {
            type: "cards",
            kicker: "White Glove scale",
            title: "The route signals the size of the studio without making the experience noisy.",
            items: [
              {
                title: "Private project families",
                copy: "Related residences, locations, and client types can be grouped without flattening the work.",
              },
              {
                title: "Selective reveal",
                copy: "The design can keep certain work discreet while still showing enough depth to build confidence.",
              },
              {
                title: "Conversion without pressure",
                copy: "Project routes lead naturally into service detail, process reassurance, and private enquiry.",
              },
            ],
          },
        ],
      },
      {
        slug: "journal",
        label: "Journal",
        heroEyebrow: "Journal",
        heroTitle: "Editorial content that extends the brand beyond the portfolio.",
        heroCopy:
          "The journal gives Maison Form a place for material thinking, travel references, project notes, and press-adjacent storytelling that supports a more substantial luxury presence.",
        heroImage: {
          src: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2100&q=80&fm=webp",
          alt: "Maison Form Interiors journal page with high-end neutral living room",
        },
        sections: [
          {
            type: "cards",
            kicker: "Editorial categories",
            title: "A journal can support press, inspiration, project notes, and authority.",
            items: [
              {
                title: "Material stories",
                copy: "Stone, timber, metal, and textile edits that reveal the studio's eye without feeling instructional.",
              },
              {
                title: "Project diaries",
                copy: "Behind-the-scenes narratives from design development through installation, written with discretion.",
              },
              {
                title: "Travel and references",
                copy: "A richer content layer that connects interiors, architecture, art, and place.",
              },
            ],
          },
          {
            type: "split",
            kicker: "Brand authority",
            title: "The journal makes the site feel alive without compromising exclusivity.",
            body:
              "For a high-end practice, editorial content should not feel like a blog feed. It should feel curated, selective, and valuable to the right reader.",
            secondary:
              "White Glove gives the team room to design that layer properly, then keep it moving with priority 24-hour refinement after approval.",
          },
        ],
      },
      {
        slug: "process",
        label: "Process",
        heroEyebrow: "Process",
        heroTitle: "Process content presented with the same polish as the portfolio.",
        heroCopy:
          "The White Glove process page turns practical information into a high-trust editorial sequence, showing how a concierge-led delivery model protects quality and time.",
        heroImage: {
          src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2100&q=80&fm=webp",
          alt: "Maison Form Interiors process page with luxury bedroom and layered soft materials",
        },
        sections: [
          {
            type: "cards",
            kicker: "Stages",
            title: "A more elegant way to explain the studio's full-service journey.",
            items: [
              {
                title: "Brief and private direction",
                copy: "Lifestyle, architecture, atmosphere, budget, and access are aligned early with a discreet senior-led process.",
              },
              {
                title: "Design development",
                copy: "Spatial planning, finishes, furnishings, procurement, and detailing are developed as one controlled language.",
              },
              {
                title: "Delivery and installation",
                copy: "Procurement, coordination, installation, styling, and completion are handled with concierge-level oversight.",
              },
            ],
          },
          {
            type: "split",
            kicker: "Client experience",
            title: "The process page turns complexity into reassurance.",
            body:
              "Luxury clients often need to know that discretion, pace, and decision quality will be protected. This page gives Maison Form space to communicate that without becoming overly operational.",
            secondary:
              "It also makes the White Glove tier tangible: fully bespoke support, high-touch delivery, and a 24-hour priority turnaround rhythm for approved refinements.",
          },
        ],
      },
      {
        slug: "contact",
        label: "Contact",
        heroEyebrow: "Contact",
        heroTitle: "A private enquiry route that feels calm, selective, and fully aligned with the brand.",
        heroCopy:
          "The contact page preserves exclusivity while still making the next step clear for qualified residential, hospitality, and international commissions.",
        heroImage: {
          src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80&fm=webp",
          alt: "Maison Form Interiors contact page with elegant fireplace and tailored seating",
        },
        sections: [
          {
            type: "contact",
            kicker: "Private enquiries",
            title: "Share your project scope, timeline, and location.",
            copy:
              "Initial enquiries are reviewed privately. A helpful note includes the property or site, desired scope, location, timing, and whether the project involves full-service design, furnishing, hospitality, or developer work.",
            details: [
              { label: "Email", value: "studio@maisonforminteriors.com" },
              { label: "Locations", value: "London, Paris, and international projects by request" },
              { label: "Project types", value: "Full-service residential, hospitality, and developer commissions" },
            ],
          },
          {
            type: "cards",
            kicker: "Selective intake",
            title: "The enquiry experience should feel private without becoming unclear.",
            items: [
              {
                title: "Qualified context",
                copy: "The page asks for the details that help the studio respond meaningfully from the first exchange.",
              },
              {
                title: "Concierge tone",
                copy: "Copy and spacing are calm, exact, and deliberate, avoiding the feel of a generic lead form.",
              },
              {
                title: "Clear next step",
                copy: "The visitor knows what to send, where the studio works, and which kinds of commissions are best aligned.",
              },
            ],
          },
          {
            type: "split",
            kicker: "White Glove close",
            title: "The final page keeps the same level of polish as the opening.",
            body:
              "For a White Glove site, the enquiry route is part of the luxury experience. It should feel discreet, composed, and confident enough for a serious private client.",
            secondary:
              "The 24-hour priority refinement promise also matters here, because contact details, availability, press context, and intake notes often need to stay current.",
          },
        ],
      },
    ],
  },
];

export function getPackageExampleByPackageId(packageId: PackageId) {
  const example = packageExamples.find((entry) => entry.packageId === packageId);

  if (!example) {
    throw new Error(`No package example found for package id "${packageId}".`);
  }

  return {
    ...example,
    href: buildExampleHref(example.slug),
  };
}

export function getPackageExampleBySlug(slug: string) {
  return packageExamples.find((entry) => entry.slug === slug);
}
