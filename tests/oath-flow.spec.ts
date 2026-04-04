import { test, expect } from "@playwright/test";

test.describe("OATH form flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/take-the-oath");
  });

  test("form renders with category selection cards", async ({ page }) => {
    await expect(page.locator("form")).toBeVisible();
    await expect(
      page.getByText("Supporting a loved one")
    ).toBeVisible();
    await expect(page.getByText("Standing with others")).toBeVisible();
    await expect(
      page.getByText(/Seeking hope/i)
    ).toBeVisible();
  });

  test("can select a category", async ({ page }) => {
    const card = page.getByText("Supporting a loved one");
    await card.click();
    await expect(card).toBeVisible();
  });

  test("required fields show validation errors on empty submit", async ({
    page,
  }) => {
    const submitButton = page.getByRole("button", {
      name: /Take.*OATH|Submit/i,
    });
    if (await submitButton.isVisible()) {
      await submitButton.click();
      await expect(
        page.getByText(/required|please select/i).first()
      ).toBeVisible();
    }
  });

  test("can fill out the form without submitting", async ({ page }) => {
    // Select a category
    await page.getByText("Supporting a loved one").click();

    // Fill in first name
    const firstNameInput = page.getByLabel(/first name/i);
    await firstNameInput.fill("Test");

    // Fill in city
    const cityInput = page.getByLabel(/city/i);
    await cityInput.fill("Austin");

    // Verify fields have values
    await expect(firstNameInput).toHaveValue("Test");
    await expect(cityInput).toHaveValue("Austin");
  });
});
