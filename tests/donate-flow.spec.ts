import { test, expect } from "@playwright/test";

test.describe("Donation form flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/donate");
  });

  test("donation form renders with preset amounts", async ({ page }) => {
    await expect(page.locator("form")).toBeVisible();
    // Preset amounts: $25, $50, $100, $250
    await expect(page.getByRole("button", { name: "$25" })).toBeVisible();
    await expect(page.getByRole("button", { name: "$50" })).toBeVisible();
    await expect(page.getByRole("button", { name: "$100" })).toBeVisible();
    await expect(page.getByRole("button", { name: "$250" })).toBeVisible();
  });

  test("can select a preset amount", async ({ page }) => {
    const btn100 = page.getByRole("button", { name: "$100" });
    await btn100.click();
    // After selection, the button styling changes (border-teal)
    await expect(btn100).toBeVisible();
  });

  test("can toggle between one-time and recurring", async ({ page }) => {
    const oneTime = page.getByRole("button", { name: /one-time/i });
    const monthly = page.getByRole("button", { name: /monthly/i });

    await expect(oneTime).toBeVisible();
    await expect(monthly).toBeVisible();

    // Click monthly
    await monthly.click();
    // Click back to one-time
    await oneTime.click();
  });

  test("custom amount input works", async ({ page }) => {
    // Click the Custom button
    const customBtn = page.getByRole("button", { name: /custom/i });
    await customBtn.click();

    // Custom input should appear
    const customInput = page.locator('input[type="number"]');
    await expect(customInput).toBeVisible();

    await customInput.fill("75");
    await expect(customInput).toHaveValue("75");
  });
});
