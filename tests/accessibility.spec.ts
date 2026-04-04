import { test, expect } from "@playwright/test";

const PUBLIC_PAGES = [
  "/",
  "/about",
  "/take-the-oath",
  "/stories",
  "/resources",
  "/donate",
  "/contact",
  "/feedback",
  "/map",
  "/press",
  "/workplace",
];

test.describe("Accessibility basics", () => {
  for (const path of PUBLIC_PAGES) {
    test(`${path} has exactly one h1`, async ({ page }) => {
      await page.goto(path);
      const h1Count = await page.locator("h1").count();
      expect(h1Count).toBe(1);
    });
  }

  for (const path of PUBLIC_PAGES) {
    test(`${path} - all images have alt text`, async ({ page }) => {
      await page.goto(path);
      // Wait for content to load
      await page.waitForLoadState("domcontentloaded");

      const images = page.locator("img");
      const count = await images.count();

      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute("alt");
        const src = await img.getAttribute("src");
        // Every img must have an alt attribute (can be empty string for decorative)
        expect(
          alt !== null,
          `Image missing alt attribute: ${src}`
        ).toBe(true);
      }
    });
  }

  test("crisis banner is present on homepage", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator('[aria-label="Crisis resources"]')
    ).toBeVisible();
  });

  test("crisis banner contains helpline info", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/need help now/i)).toBeVisible();
  });

  test("focus is visible on interactive elements", async ({ page }) => {
    await page.goto("/");

    // Tab to the first interactive element and check it receives focus
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toBeVisible();

    // Tab a few more times to verify focus continues to move
    await page.keyboard.press("Tab");
    const focused2 = page.locator(":focus");
    await expect(focused2).toBeVisible();
  });
});
