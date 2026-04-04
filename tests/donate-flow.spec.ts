import { test, expect } from "@playwright/test";

test.describe("Donation form flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/donate");
  });

  test("donation form renders with preset amounts", async ({ page }) => {
    await expect(page.locator("form")).toBeVisible();
    await expect(page.getByText("$25", { exact: true })).toBeVisible();
    await expect(page.getByText("$50", { exact: true })).toBeVisible();
    await expect(page.getByText("$100", { exact: true })).toBeVisible();
    await expect(page.getByText("$250", { exact: true })).toBeVisible();
  });

  test("can select a preset amount", async ({ page }) => {
    const btn100 = page.getByText("$100", { exact: true });
    await btn100.click();
    await expect(btn100).toBeVisible();
  });

  test("can toggle between one-time and monthly", async ({ page }) => {
    const oneTime = page.getByText("One-time", { exact: true });
    const monthly = page.getByText("Monthly", { exact: true });

    await expect(oneTime).toBeVisible();
    await expect(monthly).toBeVisible();

    await monthly.click();
    await oneTime.click();
  });

  test("custom amount input works", async ({ page }) => {
    const customBtn = page.getByText("Custom", { exact: true });
    await customBtn.click();

    const customInput = page.locator('input[type="number"]');
    await expect(customInput).toBeVisible();
    await customInput.fill("75");
    await expect(customInput).toHaveValue("75");
  });
});
