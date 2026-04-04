import { test, expect } from "@playwright/test";

test.describe("Navigation - key pages load without errors", () => {
  test("homepage loads with h1 and Take Sam's OATH CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(
      page.locator('a[href="/take-the-oath"]').first()
    ).toBeVisible();
  });

  test("/about loads", async ({ page }) => {
    await page.goto("/about");
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page).not.toHaveTitle(/404/);
  });

  test("/take-the-oath loads with form visible", async ({ page }) => {
    await page.goto("/take-the-oath");
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.locator("form")).toBeVisible();
  });

  test("/stories loads", async ({ page }) => {
    await page.goto("/stories");
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page).not.toHaveTitle(/404/);
  });

  test("/resources loads", async ({ page }) => {
    await page.goto("/resources");
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page).not.toHaveTitle(/404/);
  });

  test("/donate loads with donation form visible", async ({ page }) => {
    await page.goto("/donate");
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.locator("form")).toBeVisible();
  });

  test("/contact loads", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page).not.toHaveTitle(/404/);
  });

  test("/feedback loads", async ({ page }) => {
    await page.goto("/feedback");
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page).not.toHaveTitle(/404/);
  });

  test("/map loads", async ({ page }) => {
    await page.goto("/map");
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page).not.toHaveTitle(/404/);
  });

  test("/press loads", async ({ page }) => {
    await page.goto("/press");
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page).not.toHaveTitle(/404/);
  });

  test("/workplace loads", async ({ page }) => {
    await page.goto("/workplace");
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page).not.toHaveTitle(/404/);
  });
});
