// @ts-nocheck
import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import jpeg from "jpeg-js";
import { PNG } from "pngjs";

const base = "/work/maison-form";
const qaDir = path.join(process.cwd(), ".next", "maison-form-qa");
const screenshotDir = path.join(qaDir, "screenshots");
const visualDir = path.join(qaDir, "visual-comparison");
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
  { name: "1024x768", width: 1024, height: 768 },
  { name: "900x900", width: 900, height: 900 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "390x844", width: 390, height: 844 },
  { name: "320x800", width: 320, height: 800 },
];

const references = [
  { file: "01-home__viewport-1363x936.jpg", route: base },
  { file: "02-projects--filter-all__viewport-1363x936.jpg", route: `${base}/projects` },
  { file: "03-project-maison-rivoli__viewport-1363x936.jpg", route: `${base}/projects/maison-rivoli` },
  { file: "04-practice__viewport-1363x936.jpg", route: `${base}/practice` },
  { file: "05-about-us__viewport-1363x936.jpg", route: `${base}/about-us` },
  { file: "06-journal__viewport-1363x936.jpg", route: `${base}/journal` },
  { file: "07-journal-material-memory__viewport-1363x936.jpg", route: `${base}/journal/material-memory` },
  { file: "08-press__viewport-1363x936.jpg", route: `${base}/press` },
  { file: "09-contact__viewport-1363x936.jpg", route: `${base}/contact` },
  {
    file: "10-home--menu-open-desktop__viewport-1363x936.jpg",
    route: base,
    setup: async (page) => page.getByRole("button", { name: /menu/i }).click(),
  },
  {
    file: "11-projects--filter-residential__viewport-1363x936.jpg",
    route: `${base}/projects`,
    setup: async (page) => page.getByRole("button", { name: "Residential" }).click(),
  },
  {
    file: "12-projects--filter-hospitality__viewport-1363x936.jpg",
    route: `${base}/projects`,
    setup: async (page) => page.getByRole("button", { name: "Hospitality" }).click(),
  },
  {
    file: "13-projects--filter-objects__viewport-1363x936.jpg",
    route: `${base}/projects`,
    setup: async (page) => page.getByRole("button", { name: "Objects" }).click(),
  },
  {
    file: "14-contact--success-state__viewport-1363x936.jpg",
    route: `${base}/contact`,
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

function decodeImage(filePath: string) {
  const buffer = fs.readFileSync(filePath);
  if (filePath.endsWith(".png")) {
    const image = PNG.sync.read(buffer);
    return { width: image.width, height: image.height, data: image.data };
  }
  const image = jpeg.decode(buffer, { useTArray: true, formatAsRGBA: true });
  return { width: image.width, height: image.height, data: image.data };
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

      await page.keyboard.press("Escape");
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
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

  test("project filters expose canonical counts and empty state", async ({ page }) => {
    const failures = await visit(page, `${base}/projects`);
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

    for (const viewport of viewports) {
      const viewportDir = path.join(screenshotDir, viewport.name);
      ensureDir(viewportDir);
      for (const route of routes) {
        const failures = await visit(page, route.path, viewport);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, `${route.name} should not overflow at ${viewport.name}`).toBeLessThanOrEqual(0);
        await page.screenshot({ path: path.join(viewportDir, `${route.name}.png`), fullPage: true });
        await expectNoRuntimeFailures(page, failures);
      }
    }
  });
});

test.describe("Maison Form desktop reference comparison", () => {
  test("compares Chromium output against canonical Sites v2 desktop references", async ({ page }) => {
    test.setTimeout(120_000);
    ensureDir(visualDir);
    await page.emulateMedia({ reducedMotion: "reduce" });
    const { default: pixelmatch } = await import("pixelmatch");
    const report: { file: string; diffRatio: number; comparedWidth: number; comparedHeight: number }[] = [];

    for (const reference of references) {
      const referencePath = path.join(referenceDir, reference.file);
      expect(fs.existsSync(referencePath), `Missing canonical reference ${reference.file}`).toBe(true);

      await page.setViewportSize({ width: 1363, height: 936 });
      await page.goto(reference.route, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      if (reference.setup) await reference.setup(page);
      await page.waitForTimeout(120);

      const generatedPath = path.join(visualDir, reference.file.replace(".jpg", ".png"));
      await page.screenshot({ path: generatedPath, fullPage: false });

      const actual = decodeImage(generatedPath);
      const expected = decodeImage(referencePath);
      const width = Math.min(actual.width, expected.width);
      const height = Math.min(actual.height, expected.height);
      const actualCrop = cropImage(actual, width, height);
      const expectedCrop = cropImage(expected, width, height);
      const diff = new PNG({ width, height });
      const mismatched = pixelmatch(expectedCrop.data, actualCrop.data, diff.data, width, height, {
        threshold: 0.22,
        includeAA: false,
      });
      const diffRatio = mismatched / (width * height);
      const diffPath = path.join(visualDir, reference.file.replace(".jpg", ".diff.png"));
      fs.writeFileSync(diffPath, PNG.sync.write(diff));
      report.push({ file: reference.file, diffRatio, comparedWidth: width, comparedHeight: height });

      expect.soft(diffRatio, `${reference.file} visual diff ratio`).toBeLessThan(0.42);
    }

    fs.writeFileSync(path.join(visualDir, "desktop-reference-report.json"), JSON.stringify(report, null, 2));
  });
});
