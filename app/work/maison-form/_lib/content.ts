import { maisonRoutes } from "./routes";

export type MaisonAsset =
  | "maison-hero.webp"
  | "maison-library.webp"
  | "maison-milan.webp"
  | "maison-atlas.webp"
  | "maison-coastal.webp";

export type MaisonProjectType = "Residential" | "Hospitality" | "Objects";

export type MaisonProject = {
  ordinal: string;
  name: string;
  location: string;
  type: MaisonProjectType;
  year: string;
  asset: MaisonAsset;
  layout: "standard" | "portrait" | "wide";
  href: string;
  alt: string;
};

export const maisonAssets: Record<MaisonAsset, { width: number; height: number; sha256: string; alt: string }> = {
  "maison-hero.webp": {
    width: 1536,
    height: 1024,
    sha256: "b5fb0bf5ed2deeb5c42e29194fb43224838f3d131becfe78eb6071c185c5c5ed",
    alt: "Sunlit double-height Paris townhouse with cream plaster, walnut joinery, sculptural ivory seating and marble fireplace.",
  },
  "maison-library.webp": {
    width: 1122,
    height: 1402,
    sha256: "00e9f8bba28176aaee333bf8e03ef37142b892cc893b7d71c9e34df67d4881bc",
    alt: "Oxblood private library at dusk with timber shelving, curved ivory sofa, books and lamps.",
  },
  "maison-milan.webp": {
    width: 1122,
    height: 1402,
    sha256: "4f5179b6fef4dcaa8dbcdb2ced6ca1c4f7de3dc5df998e37371cc4c0a91aab57",
    alt: "Muted sage dining room beneath an aged ceiling fresco with sculptural table and pale chairs.",
  },
  "maison-atlas.webp": {
    width: 1672,
    height: 941,
    sha256: "9fefb3c84d7db898e1b3a16cd776e780be549a21d67136c195d064ae20df6971",
    alt: "Monumental earthen riad courtyard with repeated arches, reflecting pool, olive trees and desert light.",
  },
  "maison-coastal.webp": {
    width: 1448,
    height: 1086,
    sha256: "c59f1007b3faefedbd08a47bd8545654f2ebdae62756eeeb97a39447e3b4ccd8",
    alt: "Pale travertine Mediterranean living room with ivory seating, integrated joinery and sea view.",
  },
};

export const menuLinks = [
  { ordinal: "01", label: "Projects", href: maisonRoutes.projects },
  { ordinal: "02", label: "Practice", href: maisonRoutes.practice },
  { ordinal: "03", label: "About Us", href: maisonRoutes.about },
  { ordinal: "04", label: "Journal", href: maisonRoutes.journal },
  { ordinal: "05", label: "Press", href: maisonRoutes.press },
] as const;

export const primaryNavLinks = menuLinks.slice(0, 3);

export const projects: MaisonProject[] = [
  {
    ordinal: "01",
    name: "Maison Rivoli",
    location: "Paris, France",
    type: "Residential",
    year: "2026",
    asset: "maison-hero.webp",
    layout: "wide",
    href: maisonRoutes.maisonRivoli,
    alt: maisonAssets["maison-hero.webp"].alt,
  },
  {
    ordinal: "02",
    name: "Casa Levante",
    location: "Mallorca, Spain",
    type: "Residential",
    year: "2026",
    asset: "maison-coastal.webp",
    layout: "standard",
    href: maisonRoutes.maisonRivoli,
    alt: maisonAssets["maison-coastal.webp"].alt,
  },
  {
    ordinal: "03",
    name: "Belgravia Library",
    location: "London, England",
    type: "Residential",
    year: "2026",
    asset: "maison-library.webp",
    layout: "portrait",
    href: maisonRoutes.maisonRivoli,
    alt: maisonAssets["maison-library.webp"].alt,
  },
  {
    ordinal: "04",
    name: "Casa Brera",
    location: "Milan, Italy",
    type: "Residential",
    year: "2026",
    asset: "maison-milan.webp",
    layout: "portrait",
    href: maisonRoutes.maisonRivoli,
    alt: maisonAssets["maison-milan.webp"].alt,
  },
  {
    ordinal: "05",
    name: "Dar Atlas",
    location: "Marrakech, Morocco",
    type: "Hospitality",
    year: "2026",
    asset: "maison-atlas.webp",
    layout: "wide",
    href: maisonRoutes.maisonRivoli,
    alt: maisonAssets["maison-atlas.webp"].alt,
  },
];

export const reelProjects = [
  { name: "Belgravia Library", place: "London", asset: "maison-library.webp" as MaisonAsset },
  { name: "Casa Brera", place: "Milan", asset: "maison-milan.webp" as MaisonAsset },
  { name: "Dar Atlas", place: "Marrakech", asset: "maison-atlas.webp" as MaisonAsset },
  { name: "Casa Levante", place: "Mallorca", asset: "maison-coastal.webp" as MaisonAsset },
] as const;

export const principles = [
  {
    title: "Architecture first",
    copy: "Every decision begins with the room: its light, movement and inherent rhythm.",
  },
  {
    title: "Material honesty",
    copy: "Stone, timber, metal and cloth are chosen for the way they live, not simply how they photograph.",
  },
  {
    title: "Quietly personal",
    copy: "Our work carries the character of its owners without becoming a portrait of passing taste.",
  },
] as const;

export const practiceStages = [
  {
    title: "Listening",
    copy: "We begin with the life of the place: who it serves, what it must hold and what should remain.",
  },
  {
    title: "Architecture",
    copy: "Plan, proportion, movement and light form the quiet framework for every later decision.",
  },
  {
    title: "Material",
    copy: "A limited palette is tested at full scale so tone, texture and ageing are understood together.",
  },
  {
    title: "Objects",
    copy: "Furniture, lighting, art and joinery are composed as one continuous interior landscape.",
  },
] as const;

export const scopeItems = [
  "Interior architecture",
  "Creative direction",
  "Furniture & objects",
  "Art advisory",
  "Styling",
] as const;

export const disciplines = [
  {
    title: "Interior architecture",
    copy: "Spatial direction, planning and architectural detail.",
  },
  {
    title: "Furniture & objects",
    copy: "Commissioned pieces, lighting, art and final composition.",
  },
  {
    title: "Project delivery",
    copy: "Documentation, maker coordination and considered installation.",
  },
] as const;

export const journalEntries = [
  {
    ordinal: "01",
    category: "Materials",
    title: "The beauty of a living finish",
    summary: "How patina, variation and touch give an interior its sense of permanence.",
    asset: "maison-hero.webp" as MaisonAsset,
    href: maisonRoutes.materialMemory,
    lead: true,
  },
  {
    ordinal: "02",
    category: "Field notes",
    title: "Light on the Mediterranean",
    summary: "A study in shade, reflection and the architecture of retreat.",
    asset: "maison-coastal.webp" as MaisonAsset,
    href: maisonRoutes.materialMemory,
    lead: false,
  },
  {
    ordinal: "03",
    category: "Library",
    title: "Rooms for reading",
    summary: "Why intimacy, acoustics and evening light matter as much as shelves.",
    asset: "maison-library.webp" as MaisonAsset,
    href: maisonRoutes.materialMemory,
    lead: false,
  },
] as const;

export const pressRows = [
  {
    ordinal: "01",
    publication: "Editorial placeholder",
    title: "A Paris house shaped by light",
    type: "Feature",
  },
  {
    ordinal: "02",
    publication: "Publication name",
    title: "The return of crafted modernism",
    type: "Interview",
  },
  {
    ordinal: "03",
    publication: "Design journal",
    title: "In praise of quieter rooms",
    type: "Essay",
  },
  {
    ordinal: "04",
    publication: "Architecture review",
    title: "Material, memory and the new interior",
    type: "Profile",
  },
] as const;
