export const MF_BASE = "/work/maison-form";

export function mfHref(path = "") {
  if (!path || path === "/") return MF_BASE;
  return `${MF_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

export function mfAsset(name: string) {
  return `/work/maison-form/${name}`;
}

export const maisonRoutes = {
  home: mfHref(),
  projects: mfHref("/projects"),
  maisonRivoli: mfHref("/projects/maison-rivoli"),
  practice: mfHref("/practice"),
  about: mfHref("/about-us"),
  journal: mfHref("/journal"),
  materialMemory: mfHref("/journal/material-memory"),
  press: mfHref("/press"),
  contact: mfHref("/contact"),
} as const;
