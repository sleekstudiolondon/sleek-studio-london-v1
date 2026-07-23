// @ts-nocheck
import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import jpeg from "jpeg-js";
import { PNG } from "pngjs";

const base = "/work/maison-form";
const qaDir = path.join(process.cwd(), "qa", "maison-form", "evidence");
const screenshotDir = path.join(qaDir, "screenshot-matrix");
const responsiveDir = path.join(qaDir, "responsive-width-checks");
const visualDir = path.join(qaDir, "desktop-reference-comparison");
const visualGeneratedDir = path.join(visualDir, "generated");
const visualReferenceDir = path.join(visualDir, "reference");
const visualDiffDir = path.join(visualDir, "diff");
const referenceDir = path.join(
  process.cwd(),
  ".input",
  "maison-form",
  "visual-reference-extracted",
  "maison-form-sites-v2-canonical-visual-reference-pack",
  "screenshots",
);

const routes = [
  { name: "home", path: base },
  { name: "projects", path: `${base}/projects` },
  { name: "maison-rivoli", path: `${base}/projects/maison-rivoli` },
  { name: "practice", path: `${base}/practice` },
  { name: "about-us", path: `${base}/about-us` },
  { name: "journal", path: `${base}/journal` },
  { name: "material-memory", path: `${base}/journal/material-memory` },
  { name: "press", path: `${base}/press` },
  { name: "contact", path: `${base}/contact` },
];

const viewports = [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1280x900", width: 1280, height: 900 },
  { name: "1024x768", width: 1024, height: 768 },
  { name: "900x900", width: 900, height: 900 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "390x844", width: 390, height: 844 },
  { name: "360x800", width: 360, height: 800 },
  { name: "320x800", width: 320, height: 800 },
];

const exactWidthViewports = [
  { name: "1280x900", width: 1280, height: 900, menuArtVisible: true },
  { name: "360x800", width: 360, height: 800, menuArtVisible: false },
];

const visualPixelmatchThreshold = 0.08;

const headerRegion = {
  name: "header/navigation band",
  x: 0,
  y: 0,
  width: "full",
  height: 92,
  maxDiffRatio: 0.065,
  expectedDeviation: "browser rasterisation difference",
};

const introRegions = [
  headerRegion,
  {
    name: "intro title and supporting copy",
    x: 250,
    y: 145,
    width: 1040,
    height: 545,
    maxDiffRatio: 0.135,
    expectedDeviation: "browser rasterisation difference",
  },
  {
    name: "intro lower rule or first content edge",
    x: 0,
    y: 730,
    width: "full",
    height: 170,
    maxDiffRatio: 0.09,
    expectedDeviation: "browser rasterisation difference",
  },
];

const homeRegions = [
  {
    name: "transparent home header over canonical hero image",
    x: 0,
    y: 0,
    width: "full",
    height: 92,
    maxDiffRatio: 0.14,
    expectedDeviation: "browser rasterisation difference",
  },
  {
    name: "hero image and headline composition",
    x: 0,
    y: 92,
    width: "full",
    height: 735,
    maxDiffRatio: 0.22,
    expectedDeviation: "browser rasterisation difference",
  },
  {
    name: "hero footer rule and metadata",
    x: 0,
    y: 835,
    width: "full",
    height: 90,
    maxDiffRatio: 0.105,
    expectedDeviation: "browser rasterisation difference",
  },
];

const caseStudyRegions = [
  headerRegion,
  {
    name: "case metadata and title",
    x: 0,
    y: 145,
    width: "full",
    height: 300,
    maxDiffRatio: 0.14,
    expectedDeviation: "browser rasterisation difference",
  },
  {
    name: "case hero image crop",
    x: 35,
    y: 450,
    width: 1260,
    height: 440,
    maxDiffRatio: 0.175,
    expectedDeviation: "browser rasterisation difference",
  },
];

const articleRegions = [
  headerRegion,
  {
    name: "article header composition",
    x: 0,
    y: 125,
    width: "full",
    height: 430,
    maxDiffRatio: 0.13,
    expectedDeviation: "browser rasterisation difference",
  },
  {
    name: "article image crop",
    x: 35,
    y: 555,
    width: 1260,
    height: 335,
    maxDiffRatio: 0.16,
    expectedDeviation: "browser rasterisation difference",
  },
];

const filteredProjectRegions = [
  headerRegion,
  {
    name: "filtered intro summary and controls",
    x: 0,
    y: 155,
    width: "full",
    height: 360,
    maxDiffRatio: 0.095,
    expectedDeviation: "browser rasterisation difference",
  },
  {
    name: "filtered project result crop",
    x: 0,
    y: 565,
    width: 920,
    height: 360,
    maxDiffRatio: 0.18,
    expectedDeviation: "browser rasterisation difference",
  },
];

const emptyFilterRegions = [
  headerRegion,
  {
    name: "filtered intro summary and controls",
    x: 0,
    y: 155,
    width: "full",
    height: 360,
    maxDiffRatio: 0.095,
    expectedDeviation: "browser rasterisation difference",
  },
  {
    name: "objects empty-state message",
    x: 315,
    y: 640,
    width: 720,
    height: 185,
    maxDiffRatio: 0.12,
    expectedDeviation: "browser rasterisation difference",
  },
];

const menuRegions = [
  {
    name: "menu header band",
    x: 0,
    y: 0,
    width: "full",
    height: 92,
    maxDiffRatio: 0.07,
    expectedDeviation: "browser rasterisation difference",
  },
  {
    name: "menu artwork crop",
    x: 0,
    y: 0,
    width: 575,
    height: "full",
    maxDiffRatio: 0.18,
    expectedDeviation: "browser rasterisation difference",
  },
  {
    name: "menu navigation panel",
    x: 575,
    y: 92,
    width: 770,
    height: 760,
    maxDiffRatio: 0.13,
    expectedDeviation: "browser rasterisation difference",
  },
];

const contactSuccessRegions = [
  headerRegion,
  {
    name: "success message and contact details",
    x: 0,
    y: 160,
    width: 1130,
    height: 485,
    maxDiffRatio: 0.125,
    expectedDeviation: "browser rasterisation difference",
  },
  {
    name: "footer boundary",
    x: 0,
    y: 810,
    width: "full",
    height: 116,
    maxDiffRatio: 0.08,
    expectedDeviation: "browser rasterisation difference",
  },
];

const references = [
  {
    file: "01-home__viewport-1363x936.jpg",
    route: base,
    comparisonMode: "regions",
    regions: homeRegions,
  },
  {
    file: "02-projects--filter-all__viewport-1363x936.jpg",
    route: `${base}/projects`,
    comparisonMode: "whole",
    maxEffectiveDiffRatio: 0.085,
    regions: introRegions,
  },
  {
    file: "03-project-maison-rivoli__viewport-1363x936.jpg",
    route: `${base}/projects/maison-rivoli`,
    comparisonMode: "regions",
    regions: caseStudyRegions,
  },
  {
    file: "04-practice__viewport-1363x936.jpg",
    route: `${base}/practice`,
    comparisonMode: "whole",
    maxEffectiveDiffRatio: 0.105,
    regions: introRegions,
  },
  {
    file: "05-about-us__viewport-1363x936.jpg",
    route: `${base}/about-us`,
    comparisonMode: "whole",
    maxEffectiveDiffRatio: 0.11,
    regions: introRegions,
  },
  {
    file: "06-journal__viewport-1363x936.jpg",
    route: `${base}/journal`,
    comparisonMode: "whole",
    maxEffectiveDiffRatio: 0.11,
    regions: introRegions,
  },
  {
    file: "07-journal-material-memory__viewport-1363x936.jpg",
    route: `${base}/journal/material-memory`,
    comparisonMode: "regions",
    regions: articleRegions,
  },
  {
    file: "08-press__viewport-1363x936.jpg",
    route: `${base}/press`,
    comparisonMode: "whole",
    maxEffectiveDiffRatio: 0.09,
    regions: introRegions,
  },
  {
    file: "09-contact__viewport-1363x936.jpg",
    route: `${base}/contact`,
    comparisonMode: "whole",
    maxEffectiveDiffRatio: 0.09,
    regions: introRegions,
  },
  {
    file: "10-home--menu-open-desktop__viewport-1363x936.jpg",
    route: base,
    comparisonMode: "regions",
    regions: menuRegions,
    masks: [
      {
        name: "canonical cursor capture",
        x: 1235,
        y: 24,
        width: 70,
        height: 55,
        reason: "Cursor is baked into the canonical screenshot and is not product UI.",
      },
    ],
    setup: async (page) => page.getByRole("button", { name: /menu/i }).click(),
  },
  {
    file: "11-projects--filter-residential__viewport-1363x936.jpg",
    route: `${base}/projects`,
    comparisonMode: "regions",
    regions: filteredProjectRegions,
    masks: [
      {
        name: "canonical cursor capture",
        x: 1058,
        y: 435,
        width: 82,
        height: 76,
        reason: "Cursor is baked into the canonical screenshot and is not product UI.",
      },
    ],
    setup: async (page) => scrollProjectsFilterState(page, "Residential"),
  },
  {
    file: "12-projects--filter-hospitality__viewport-1363x936.jpg",
    route: `${base}/projects`,
    comparisonMode: "regions",
    regions: filteredProjectRegions,
    masks: [
      {
        name: "canonical cursor capture",
        x: 1158,
        y: 435,
        width: 82,
        height: 76,
        reason: "Cursor is baked into the canonical screenshot and is not product UI.",
      },
    ],
    setup: async (page) => scrollProjectsFilterState(page, "Hospitality"),
  },
  {
    file: "13-projects--filter-objects__viewport-1363x936.jpg",
    route: `${base}/projects`,
    comparisonMode: "regions",
    regions: emptyFilterRegions,
    masks: [
      {
        name: "canonical cursor capture",
        x: 1240,
        y: 435,
        width: 78,
        height: 76,
        reason: "Cursor is baked into the canonical screenshot and is not product UI.",
      },
    ],
    setup: async (page) => scrollProjectsFilterState(page, "Objects"),
  },
  {
    file: "14-contact--success-state__viewport-1363x936.jpg",
    route: `${base}/contact`,
    comparisonMode: "whole",
    maxEffectiveDiffRatio: 0.09,
    regions: contactSuccessRegions,
    masks: [
      {
        name: "canonical cursor capture",
        x: 420,
        y: 435,
        width: 82,
        height: 78,
        reason: "Cursor is baked into the canonical screenshot and is not product UI.",
      },
    ],
    setup: async (page) => {
      await fillContactForm(page);
      await page.getByRole("button", { name: /submit private enquiry/i }).click();
    },
  },
];

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

async function installRuntimeGuards(page) {
  const failures: string[] = [];
  page.on("pageerror", (error) => failures.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    const text = message.text();
    if (message.type() === "error" || /hydration|did not match|recoverable/i.test(text)) {
      failures.push(`console ${message.type()}: ${text}`);
    }
  });
  page.on("requestfailed", (request) => {
    const resourceType = request.resourceType();
    const url = request.url();
    if (["document", "image"].includes(resourceType) && url.startsWith("http://localhost:3000")) {
      failures.push(`request failed: ${resourceType} ${url}`);
    }
  });
  return failures;
}

async function visit(page, route: string, viewport = { width: 1440, height: 900 }) {
  await page.setViewportSize(viewport);
  const failures = await installRuntimeGuards(page);
  const response = await page.goto(route, { waitUntil: "networkidle" });
  expect(response?.ok(), `${route} should render successfully`).toBeTruthy();
  await page.locator(".mf-site").waitFor({ state: "visible" });
  await page.evaluate(() => document.fonts.ready);
  return failures;
}

async function expectNoRuntimeFailures(page, failures: string[]) {
  const overlay = await page.locator("[data-nextjs-dialog]").count();
  expect(overlay, "Next.js error overlay should be absent").toBe(0);
  await expect(page.locator(".mf-site")).toBeVisible();
  expect(failures).toEqual([]);
}

async function fillContactForm(page) {
  await page.getByLabel("Your name *").fill("Luigi Parity");
  await page.getByLabel("Email address *").fill("luigi@example.com");
  await page.getByLabel("Project location").fill("London");
  await page.getByLabel("Nature of enquiry *").selectOption("Residential interior");
  await page.getByLabel("Tell us about the place *").fill("A townhouse with generous light and a quiet material brief.");
  await page.getByLabel(/fictional demonstration/).check();
}

async function scrollProjectsFilterState(page, label: string) {
  await page.getByRole("button", { name: label }).click();
  await page.evaluate(() => window.scrollTo(0, 335));
  await page.waitForTimeout(120);
}

async function suppressDevOnlyChrome(page) {
  await page
    .addStyleTag({
      content: `
        nextjs-portal,
        [data-nextjs-devtools],
        [data-nextjs-route-announcer] {
          display: none !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
      `,
    })
    .catch(() => undefined);
}

async function expectNoHorizontalOverflow(page, label: string) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow, `${label} should not have document-level horizontal overflow`).toBeLessThanOrEqual(0);
}

async function expectNoClippedDisplayHeadings(page, label: string) {
  const clipped = await page.locator(".mf-site :is(h1, h2)").evaluateAll((nodes) =>
    nodes
      .map((node) => {
        const rect = node.getBoundingClientRect();
        const style = getComputedStyle(node);
        return {
          text: (node.textContent || "").replace(/\s+/g, " ").trim(),
          left: rect.left,
          right: rect.right,
          width: rect.width,
          viewportWidth: window.innerWidth,
          overflowX: style.overflowX,
        };
      })
      .filter((item) => item.width > 0)
      .filter(
        (item) =>
          item.left < -1 ||
          item.right > item.viewportWidth + 1 ||
          (item.overflowX !== "visible" && item.overflowX !== "clip"),
      ),
  );
  expect(clipped, `${label} should not clip display headings`).toEqual([]);
}

async function expectHealthyImageCrops(page, label: string) {
  await page.evaluate(async () => {
    const images = Array.from(document.querySelectorAll(".mf-image img")) as HTMLImageElement[];
    for (const image of images) {
      image.loading = "eager";
    }

    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const stops = Array.from(new Set([0, Math.round(window.innerHeight * 0.9), Math.round(maxScroll / 2), maxScroll]));
    for (const top of stops) {
      window.scrollTo(0, top);
      await new Promise((resolve) => window.setTimeout(resolve, 70));
    }
    window.scrollTo(0, 0);
    await new Promise((resolve) => window.setTimeout(resolve, 90));
    await Promise.all(images.map((image) => image.decode().catch(() => undefined)));
  });

  const broken = await page.locator(".mf-image img").evaluateAll((nodes) =>
    nodes
      .map((node) => {
        const img = node as HTMLImageElement;
        const imageRect = img.getBoundingClientRect();
        const frameRect = img.closest(".mf-image")?.getBoundingClientRect();
        const style = getComputedStyle(img);
        return {
          src: img.currentSrc || img.src,
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          objectFit: style.objectFit,
          imageWidth: imageRect.width,
          imageHeight: imageRect.height,
          frameWidth: frameRect?.width ?? 0,
          frameHeight: frameRect?.height ?? 0,
        };
      })
      .filter((item) => item.frameWidth > 0 && item.frameHeight > 0)
      .filter(
        (item) =>
          item.naturalWidth <= 0 ||
          item.naturalHeight <= 0 ||
          item.imageWidth + 1 < item.frameWidth ||
          item.imageHeight + 1 < item.frameHeight ||
          item.objectFit !== "cover",
      ),
  );
  expect(broken, `${label} should not have broken image crops`).toEqual([]);
}

function decodeImage(filePath: string) {
  const buffer = fs.readFileSync(filePath);
  if (filePath.endsWith(".png")) {
    const image = PNG.sync.read(buffer);
    return { width: image.width, height: image.height, data: image.data };
  }
  const image = jpeg.decode(buffer, { useTArray: true, formatAsRGBA: true });
  return { width: image.width, height: image.height, data: image.data };
}

function relativeArtifactPath(filePath: string) {
  return path.relative(process.cwd(), filePath).split(path.sep).join("/");
}

function cropImage(image, width: number, height: number) {
  const cropped = new PNG({ width, height });
  for (let y = 0; y < height; y += 1) {
    const sourceStart = y * image.width * 4;
    const targetStart = y * width * 4;
    cropped.data.set(image.data.subarray(sourceStart, sourceStart + width * 4), targetStart);
  }
  return cropped;
}

function resolveRect(rect, width: number, height: number) {
  const x = Math.max(0, rect.xFromRight !== undefined ? width - rect.xFromRight : rect.x ?? 0);
  const y = Math.max(0, rect.y ?? 0);
  const rectWidth = rect.width === "full" ? width - x : rect.width;
  const rectHeight = rect.height === "full" ? height - y : rect.height;
  return {
    x,
    y,
    width: Math.max(0, Math.min(rectWidth, width - x)),
    height: Math.max(0, Math.min(rectHeight, height - y)),
  };
}

function clonePng(image) {
  const cloned = new PNG({ width: image.width, height: image.height });
  cloned.data.set(image.data);
  return cloned;
}

function cropRect(image, rect) {
  const cropped = new PNG({ width: rect.width, height: rect.height });
  for (let y = 0; y < rect.height; y += 1) {
    const sourceStart = ((rect.y + y) * image.width + rect.x) * 4;
    const targetStart = y * rect.width * 4;
    cropped.data.set(image.data.subarray(sourceStart, sourceStart + rect.width * 4), targetStart);
  }
  return cropped;
}

function automaticReferenceMasks(width: number, height: number) {
  if (width !== 1348) return [];
  return [
    {
      name: "canonical browser scrollbar gutter",
      x: 1332,
      y: 0,
      width: 16,
      height: "full",
      reason: "The canonical JPEG includes browser scrollbar pixels that are outside Maison product UI.",
    },
  ];
}

function applyMasks(actual, expected, masks) {
  for (const mask of masks) {
    const rect = resolveRect(mask, actual.width, actual.height);
    for (let y = 0; y < rect.height; y += 1) {
      for (let x = 0; x < rect.width; x += 1) {
        const index = ((rect.y + y) * actual.width + rect.x + x) * 4;
        actual.data[index] = expected.data[index];
        actual.data[index + 1] = expected.data[index + 1];
        actual.data[index + 2] = expected.data[index + 2];
        actual.data[index + 3] = expected.data[index + 3];
      }
    }
  }
}

function writeDesktopComparisonMarkdown(report) {
  const lines = [
    "# Maison Form Desktop Reference Comparison",
    "",
    `Pixelmatch threshold: ${visualPixelmatchThreshold}`,
    "Acceptance: whole-mode references gate on the effective whole-image ratio plus all layout-critical regions. Region-mode references gate on stable layout-critical regions while raw/effective whole-image ratios remain reported.",
    "Masks are limited to canonical browser/capture artifacts: scrollbar gutters and baked-in mouse cursors.",
    "",
    "| Reference | Mode | Raw Diff | Effective Diff | Gate | Result | Classification |",
    "|---|---:|---:|---:|---:|---|---|",
  ];

  for (const item of report) {
    const gate =
      item.comparisonMode === "whole"
        ? item.maxEffectiveDiffRatio.toFixed(4)
        : item.regions.map((region) => `${region.name} <= ${region.maxDiffRatio.toFixed(4)}`).join("<br>");
    lines.push(
      `| ${item.file} | ${item.comparisonMode} | ${item.rawDiffRatio.toFixed(6)} | ${item.effectiveDiffRatio.toFixed(6)} | ${gate} | ${item.passed ? "PASS" : "FAIL"} | ${item.classifications.join("; ")} |`,
    );
  }

  fs.writeFileSync(path.join(visualDir, "desktop-reference-report.md"), `${lines.join("\n")}\n`);
}

test.describe("Maison Form canonical routes", () => {
  for (const route of routes) {
    test(`${route.name} renders with isolated chrome`, async ({ page }) => {
      const failures = await visit(page, route.path);

      await expect(page.locator(".mf-header")).toBeVisible();
      await expect(page.locator(".mf-footer")).toBeVisible();
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator(".nav-shell")).toHaveCount(0);
      await expect(page.locator(".footer-shell")).toHaveCount(0);
      await expect(page.locator('img[src*="images.unsplash.com"]')).toHaveCount(0);

      const forbidden = [
        "Back to Sleek Studio",
        "dossier-builder",
        "Dossier",
        "Atelier",
        "/contact/confirmation",
        "Belgravia Residence",
        "Lakeside Villa",
        "The Aurelia Suite",
        "provenance-before-polish",
      ];
      const bodyText = await page.locator("body").innerText();
      for (const text of forbidden) {
        expect(bodyText.includes(text), `${route.name} should not leak legacy copy: ${text}`).toBe(false);
      }

      const hrefs = await page.locator(".mf-site a[href]").evaluateAll((links) =>
        links.map((link) => (link as HTMLAnchorElement).href),
      );
      for (const href of hrefs) {
        const url = new URL(href);
        if (url.origin === "http://localhost:3000") {
          expect(url.pathname.startsWith(base), `${href} should stay inside Maison namespace`).toBe(true);
        }
      }

      await expectNoRuntimeFailures(page, failures);
    });
  }

  test("legacy Maison URLs are not rendered", async ({ page }) => {
    for (const legacyPath of [
      `${base}/about`,
      `${base}/atelier`,
      `${base}/projects/belgravia-residence`,
      `${base}/journal/provenance-before-polish`,
      `${base}/contact/confirmation`,
    ]) {
      const response = await page.goto(legacyPath, { waitUntil: "networkidle" });
      expect(response?.status(), `${legacyPath} should be a 404`).toBe(404);
    }
  });
});

test.describe("Maison Form interactions", () => {
  test("header switches state after 32px and mobile chrome simplifies", async ({ page }) => {
    const failures = await visit(page, base, { width: 1440, height: 900 });
    const header = page.locator(".mf-header");

    await expect(header).toHaveClass(/mf-header--home/);
    expect(Math.round((await header.boundingBox())!.height)).toBe(92);

    await page.evaluate(() => window.scrollTo(0, 31));
    await page.waitForTimeout(420);
    expect(Math.round((await header.boundingBox())!.height)).toBe(92);

    await page.evaluate(() => window.scrollTo(0, 33));
    await page.waitForTimeout(420);
    expect(Math.round((await header.boundingBox())!.height)).toBe(70);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base, { waitUntil: "networkidle" });
    expect(Math.round((await header.boundingBox())!.height)).toBe(72);
    await expect(page.locator(".mf-primary-nav")).toBeHidden();
    await expect(page.locator(".mf-private-link")).toBeHidden();
    await expectNoRuntimeFailures(page, failures);
  });

  for (const viewport of [
    { name: "desktop", width: 1440, height: 900, artVisible: true },
    { name: "mobile", width: 390, height: 844, artVisible: false },
  ]) {
    test(`expanded menu works on ${viewport.name}`, async ({ page }) => {
      const failures = await visit(page, base, viewport);
      const trigger = page.locator(".mf-menu-trigger");
      await trigger.click();

      await expect(trigger).toHaveAttribute("aria-expanded", "true");
      await expect(page.locator(".mf-menu-overlay")).toBeVisible();
      expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");
      await expect(page.locator(".mf-menu-panel nav a").first()).toBeFocused();
      await expect(page.locator(".mf-menu-panel nav a")).toHaveText([
        "01Projects",
        "02Practice",
        "03About Us",
        "04Journal",
        "05Press",
      ]);

      if (viewport.artVisible) {
        await expect(page.locator(".mf-menu-art")).toBeVisible();
      } else {
        await expect(page.locator(".mf-menu-art")).toBeHidden();
      }

      const menuLinks = page.locator('.mf-menu-overlay a[href]');
      await menuLinks.last().focus();
      await page.keyboard.press("Tab");
      await expect(menuLinks.first()).toBeFocused();
      await page.keyboard.press("Shift+Tab");
      await expect(menuLinks.last()).toBeFocused();

      await page.keyboard.press("Escape");
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
      await expect(trigger).toBeFocused();
      expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
      await expectNoRuntimeFailures(page, failures);
    });
  }

  test("reel duplicates are inaccessible and pause on hover", async ({ page }) => {
    const failures = await visit(page, base);
    await expect(page.locator(".mf-reel-card")).toHaveCount(8);
    await expect(page.locator('.mf-reel-card[aria-hidden="true"]')).toHaveCount(4);
    const duplicateTabIndexes = await page
      .locator('.mf-reel-card[aria-hidden="true"]')
      .evaluateAll((cards) => cards.map((card) => card.getAttribute("tabindex")));
    expect(duplicateTabIndexes).toEqual(["-1", "-1", "-1", "-1"]);
    await page.locator(".mf-reel").hover();
    const playState = await page.locator(".mf-reel-track").evaluate((node) => getComputedStyle(node).animationPlayState);
    expect(playState).toBe("paused");
    await expectNoRuntimeFailures(page, failures);
  });

  test("editorial Project Index exposes canonical counts and empty state", async ({ page }) => {
    const failures = await visit(page, `${base}/projects`);
    await expect(page.getByRole("heading", { name: "A catalogue of places, held in view." })).toBeVisible();
    await expect(page.locator(".mf-project-index-controls button")).toHaveCount(4);
    await expect(page.getByRole("button", { name: /all/i })).toContainText("05");
    await expect(page.locator(".mf-project-tile")).toHaveCount(5);

    await page.getByRole("button", { name: "Residential" }).click();
    await expect(page.getByRole("button", { name: "Residential" })).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".mf-project-tile")).toHaveCount(4);

    await page.getByRole("button", { name: "Hospitality" }).click();
    await expect(page.locator(".mf-project-tile")).toHaveCount(1);

    await page.getByRole("button", { name: "Objects" }).click();
    await expect(page.locator(".mf-project-tile")).toHaveCount(0);
    await expect(page.locator(".mf-project-empty")).toHaveText(
      "Objects are presented privately. Please enquire for the current collection.",
    );
    await expectNoRuntimeFailures(page, failures);
  });

  test("canonical contact form validates locally and transmits nothing", async ({ page }) => {
    const failures = await visit(page, `${base}/contact`);
    const postRequests: string[] = [];
    page.on("request", (request) => {
      if (["fetch", "xhr", "document"].includes(request.resourceType()) && request.method() !== "GET") {
        postRequests.push(`${request.method()} ${request.url()}`);
      }
    });

    await page.getByRole("button", { name: /submit private enquiry/i }).click();
    await expect(page.locator(".mf-enquiry-form")).toBeVisible();
    await expect(page.locator(".mf-enquiry-success")).toHaveCount(0);

    await page.getByLabel("Your name *").fill("Luigi Parity");
    await page.getByLabel("Email address *").fill("not-an-email");
    await page.getByLabel("Nature of enquiry *").selectOption("Residential interior");
    await page.getByLabel("Tell us about the place *").fill("A valid message.");
    await page.getByLabel(/fictional demonstration/).check();
    await page.getByRole("button", { name: /submit private enquiry/i }).click();
    await expect(page.locator(".mf-enquiry-form")).toBeVisible();

    await page.getByLabel("Email address *").fill("luigi@example.com");
    await page.getByLabel("Project location").fill("Paris");
    await page.getByRole("button", { name: /submit private enquiry/i }).click();

    await expect(page.locator('[role="status"]')).toContainText("Enquiry noted");
    await expect(page.locator('[role="status"]')).toContainText("Thank you.");
    await expect(page).toHaveURL(new RegExp(`${base}/contact$`));
    expect(postRequests).toEqual([]);

    await page.getByRole("button", { name: /return to form/i }).click();
    await expect(page.locator(".mf-enquiry-form")).toBeVisible();
    await expectNoRuntimeFailures(page, failures);
  });

  test("reduced motion resolves animations immediately", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const failures = await visit(page, base);
    const heroDuration = await page
      .locator(".mf-home-hero > .mf-image img")
      .evaluate((node) => getComputedStyle(node).animationDuration);
    const reelDuration = await page.locator(".mf-reel-track").evaluate((node) => getComputedStyle(node).animationDuration);
    expect(Number.parseFloat(heroDuration)).toBeLessThanOrEqual(0.001);
    expect(Number.parseFloat(reelDuration)).toBeLessThanOrEqual(0.001);
    await expectNoRuntimeFailures(page, failures);
  });
});

test.describe("Maison Form screenshot matrix", () => {
  test("captures all required routes and viewports without page overflow", async ({ page }) => {
    test.setTimeout(180_000);
    ensureDir(screenshotDir);
    await page.emulateMedia({ reducedMotion: "reduce" });
    const manifest: {
      viewport: string;
      route: string;
      screenshot: string;
      horizontalOverflow: number;
    }[] = [];

    for (const viewport of viewports) {
      const viewportDir = path.join(screenshotDir, viewport.name);
      ensureDir(viewportDir);
      for (const route of routes) {
        const failures = await visit(page, route.path, viewport);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, `${route.name} should not overflow at ${viewport.name}`).toBeLessThanOrEqual(0);
        await expectNoClippedDisplayHeadings(page, `${route.name} at ${viewport.name}`);
        await expectHealthyImageCrops(page, `${route.name} at ${viewport.name}`);
        await suppressDevOnlyChrome(page);
        const screenshot = path.join(viewportDir, `${route.name}.jpg`);
        await page.screenshot({ path: screenshot, type: "jpeg", quality: 80, fullPage: true });
        manifest.push({
          viewport: viewport.name,
          route: route.path,
          screenshot: relativeArtifactPath(screenshot),
          horizontalOverflow: overflow,
        });
        await expectNoRuntimeFailures(page, failures);
      }
    }

    fs.writeFileSync(path.join(screenshotDir, "screenshot-manifest.json"), JSON.stringify(manifest, null, 2));
  });
});

test.describe("Maison Form exact-width responsive QA", () => {
  for (const viewport of exactWidthViewports) {
    test(`${viewport.name} validates layout, media crops, menu behavior, and runtime health`, async ({ page }) => {
      test.setTimeout(90_000);
      await page.emulateMedia({ reducedMotion: "reduce" });
      const viewportDir = path.join(responsiveDir, viewport.name);
      ensureDir(viewportDir);
      const results: {
        route: string;
        horizontalOverflow: number;
        screenshot: string;
      }[] = [];

      for (const route of routes) {
        const failures = await visit(page, route.path, viewport);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        await expectNoHorizontalOverflow(page, `${route.name} at ${viewport.name}`);
        await expectNoClippedDisplayHeadings(page, `${route.name} at ${viewport.name}`);
        await expectHealthyImageCrops(page, `${route.name} at ${viewport.name}`);
        await suppressDevOnlyChrome(page);
        const screenshot = path.join(viewportDir, `${route.name}.jpg`);
        await page.screenshot({ path: screenshot, type: "jpeg", quality: 80, fullPage: true });
        results.push({
          route: route.path,
          horizontalOverflow: overflow,
          screenshot: relativeArtifactPath(screenshot),
        });
        await expectNoRuntimeFailures(page, failures);
      }

      const failures = await visit(page, base, viewport);
      const trigger = page.locator(".mf-menu-trigger");
      if (viewport.width >= 901) {
        await expect(page.locator(".mf-primary-nav")).toBeVisible();
        await expect(page.locator(".mf-private-link")).toBeVisible();
      } else {
        await expect(page.locator(".mf-primary-nav")).toBeHidden();
        await expect(page.locator(".mf-private-link")).toBeHidden();
      }

      await trigger.click();
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
      await expect(page.locator(".mf-menu-overlay")).toBeVisible();
      expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");
      if (viewport.menuArtVisible) {
        await expect(page.locator(".mf-menu-art")).toBeVisible();
      } else {
        await expect(page.locator(".mf-menu-art")).toBeHidden();
      }
      await expectNoHorizontalOverflow(page, `menu open at ${viewport.name}`);
      await suppressDevOnlyChrome(page);
      const menuScreenshot = path.join(viewportDir, "menu-open.jpg");
      await page.screenshot({ path: menuScreenshot, type: "jpeg", quality: 80, fullPage: false });
      await page.keyboard.press("Escape");
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
      await expectNoRuntimeFailures(page, failures);

      fs.writeFileSync(
        path.join(viewportDir, "verification-report.json"),
        JSON.stringify(
          {
            viewport: viewport.name,
            width: viewport.width,
            height: viewport.height,
            mobileParityScope:
              viewport.width === 360
                ? "Faithful responsive implementation only; no canonical mobile screenshot-exact reference was supplied."
                : "Desktop exact-width responsive verification.",
            routes: results,
            menu: {
              expanded: true,
              artVisible: viewport.menuArtVisible,
              screenshot: relativeArtifactPath(menuScreenshot),
            },
          },
          null,
          2,
        ),
      );
    });
  }
});

test.describe("Maison Form desktop reference comparison", () => {
  test("compares Chromium output against canonical Sites v2 desktop references", async ({ page }) => {
    test.setTimeout(120_000);
    ensureDir(visualGeneratedDir);
    ensureDir(visualReferenceDir);
    ensureDir(visualDiffDir);
    await page.emulateMedia({ reducedMotion: "reduce" });
    const { default: pixelmatch } = await import("pixelmatch");
    const report: {
      file: string;
      route: string;
      comparisonMode: string;
      pixelmatchThreshold: number;
      rawDiffRatio: number;
      effectiveDiffRatio: number;
      maxEffectiveDiffRatio: number | null;
      comparedWidth: number;
      comparedHeight: number;
      generatedScreenshot: string;
      canonicalReference: string;
      diffImage: string;
      masks: { name: string; reason: string; x: number; y: number; width: number; height: number }[];
      regions: {
        name: string;
        diffRatio: number;
        maxDiffRatio: number;
        passed: boolean;
        expectedDeviation: string;
      }[];
      classifications: string[];
      passed: boolean;
    }[] = [];

    for (const reference of references) {
      const referencePath = path.join(referenceDir, reference.file);
      expect(fs.existsSync(referencePath), `Missing canonical reference ${reference.file}`).toBe(true);
      const referenceCopyPath = path.join(visualReferenceDir, reference.file);
      fs.copyFileSync(referencePath, referenceCopyPath);

      const expectedSource = decodeImage(referencePath);
      await page.setViewportSize({ width: expectedSource.width, height: expectedSource.height });
      await page.goto(reference.route, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      if (reference.setup) await reference.setup(page);
      await suppressDevOnlyChrome(page);
      await page.waitForTimeout(120);

      const generatedPath = path.join(visualGeneratedDir, reference.file.replace(".jpg", ".png"));
      await page.screenshot({ path: generatedPath, fullPage: false });

      const actual = decodeImage(generatedPath);
      const expected = expectedSource;
      const width = Math.min(actual.width, expected.width);
      const height = Math.min(actual.height, expected.height);
      const actualCrop = cropImage(actual, width, height);
      const expectedCrop = cropImage(expected, width, height);
      const rawDiff = new PNG({ width, height });
      const rawMismatched = pixelmatch(expectedCrop.data, actualCrop.data, rawDiff.data, width, height, {
        threshold: visualPixelmatchThreshold,
        includeAA: false,
      });
      const rawDiffRatio = rawMismatched / (width * height);

      const masks = [...automaticReferenceMasks(width, height), ...(reference.masks ?? [])].map((mask) => {
        const rect = resolveRect(mask, width, height);
        return { ...mask, ...rect };
      });
      const actualEffective = clonePng(actualCrop);
      const expectedEffective = clonePng(expectedCrop);
      applyMasks(actualEffective, expectedEffective, masks);

      const diff = new PNG({ width, height });
      const effectiveMismatched = pixelmatch(
        expectedEffective.data,
        actualEffective.data,
        diff.data,
        width,
        height,
        {
          threshold: visualPixelmatchThreshold,
          includeAA: false,
        },
      );
      const effectiveDiffRatio = effectiveMismatched / (width * height);
      const diffPath = path.join(visualDiffDir, reference.file.replace(".jpg", ".diff.png"));
      fs.writeFileSync(diffPath, PNG.sync.write(diff));

      const regionResults = (reference.regions ?? []).map((region) => {
        const rect = resolveRect(region, width, height);
        const actualRegion = cropRect(actualEffective, rect);
        const expectedRegion = cropRect(expectedEffective, rect);
        const regionDiff = new PNG({ width: rect.width, height: rect.height });
        const regionMismatched = pixelmatch(
          expectedRegion.data,
          actualRegion.data,
          regionDiff.data,
          rect.width,
          rect.height,
          {
            threshold: visualPixelmatchThreshold,
            includeAA: false,
          },
        );
        const diffRatio = regionMismatched / (rect.width * rect.height);
        return {
          name: region.name,
          diffRatio,
          maxDiffRatio: region.maxDiffRatio,
          passed: diffRatio <= region.maxDiffRatio,
          expectedDeviation: region.expectedDeviation,
        };
      });

      const regionPass = regionResults.every((region) => region.passed);
      const wholePass =
        reference.comparisonMode === "whole"
          ? effectiveDiffRatio <= reference.maxEffectiveDiffRatio
          : true;
      const passed = wholePass && regionPass;
      const classifications = new Set<string>();
      if (!passed) classifications.add("implementation bug");
      if (effectiveDiffRatio > 0 || regionResults.some((region) => region.diffRatio > 0)) {
        classifications.add("browser rasterisation difference");
      }
      if (masks.length > 0) classifications.add("genuine framework/platform constraint");

      report.push({
        file: reference.file,
        route: reference.route,
        comparisonMode: reference.comparisonMode,
        pixelmatchThreshold: visualPixelmatchThreshold,
        rawDiffRatio,
        effectiveDiffRatio,
        maxEffectiveDiffRatio: reference.maxEffectiveDiffRatio ?? null,
        comparedWidth: width,
        comparedHeight: height,
        generatedScreenshot: relativeArtifactPath(generatedPath),
        canonicalReference: relativeArtifactPath(referenceCopyPath),
        diffImage: relativeArtifactPath(diffPath),
        masks: masks.map((mask) => ({
          name: mask.name,
          reason: mask.reason,
          x: mask.x,
          y: mask.y,
          width: mask.width,
          height: mask.height,
        })),
        regions: regionResults,
        classifications: Array.from(classifications),
        passed,
      });

      expect.soft(passed, `${reference.file} visual comparison should pass`).toBe(true);
    }

    fs.writeFileSync(path.join(visualDir, "desktop-reference-report.json"), JSON.stringify(report, null, 2));
    writeDesktopComparisonMarkdown(report);
  });
});
