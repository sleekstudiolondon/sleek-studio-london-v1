import { expect, test, type Page } from "@playwright/test";

async function visitWithGuards(page: Page, path: string) {
  const failures: string[] = [];
  page.on("pageerror", (error) => failures.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") failures.push(`console error: ${message.text()}`);
  });
  const response = await page.goto(path, { waitUntil: "networkidle" });
  expect(response?.ok(), `${path} should render successfully`).toBeTruthy();
  expect(failures).toEqual([]);
}

test.describe("Sleek Studio regression smoke checks", () => {
  test("main Sleek Studio home remains on the global shell", async ({ page }) => {
    await visitWithGuards(page, "/");
    await expect(page.locator(".nav-shell")).toBeVisible();
    await expect(page.locator(".footer-shell")).toBeVisible();
    await expect(page.locator(".mf-site")).toHaveCount(0);
    await expect(page.getByRole("banner").getByRole("link", { name: /Sleek Studio London home/i })).toBeVisible();
  });

  test("John Doe demo remains isolated and non-Maison", async ({ page }) => {
    await visitWithGuards(page, "/work/john-doe");
    await expect(page.locator(".nav-shell")).toHaveCount(0);
    await expect(page.locator(".footer-shell")).toHaveCount(0);
    await expect(page.locator(".mf-site")).toHaveCount(0);
    await expect(page.locator("body")).toContainText("John Doe");
  });

  test("Studio Alter demo remains isolated and non-Maison", async ({ page }) => {
    await visitWithGuards(page, "/work/studio-alter");
    await expect(page.locator(".nav-shell")).toHaveCount(0);
    await expect(page.locator(".footer-shell")).toHaveCount(0);
    await expect(page.locator(".mf-site")).toHaveCount(0);
    await expect(page.locator("body")).toContainText("Studio Alter");
  });
});
