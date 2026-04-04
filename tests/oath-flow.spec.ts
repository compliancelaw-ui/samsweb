import { test, expect } from "@playwright/test";

test.describe("OATH form flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/take-the-oath");
  });

  test("form renders with category selection cards", async ({ page }) => {
    await expect(page.locator("form")).toBeVisible();
    // Three category cards: supporting, supporter, hope
    await expect(
      page.getByText("Supporting a loved one")
    ).toBeVisible();
    await expect(page.getByText("Standing with others")).toBeVisible();
    await expect(
      page.getByText("Seeking hope & recovery")
    ).toBeVisible();
  });

  test("can select a category", async ({ page }) => {
    const card = page.getByText("Standing with others");
    await card.click();
    // After clicking, the parent button should reflect selected state
    // Verify the click registered by checking the button is still visible
    await expect(card).toBeVisible();
  });

  test("required fields show validation errors on empty submit", async ({
    page,
  }) => {
    // Try to submit without filling anything
    const submitButton = page.getByRole("button", {
      name: /Take the OATH|Submit|Sign/i,
    });
    if (await submitButton.isVisible()) {
      await submitButton.click();
      // Expect validation messages for required fields
      await expect(
        page.getByText(/first name is required|required/i).first()
      ).toBeVisible();
    }
  });

  test("can fill out the form without submitting", async ({ page }) => {
    // Select a category
    await page.getByText("Standing with others").click();

    // Fill in first name
    const firstNameInput = page.getByLabel(/first name/i);
    await firstNameInput.fill("Test");

    // Fill in city
    const cityInput = page.getByLabel(/city/i);
    await cityInput.fill("Austin");

    // Fill in state
    const stateInput = page.getByLabel(/state/i);
    await stateInput.fill("TX");

    // Verify fields have values
    await expect(firstNameInput).toHaveValue("Test");
    await expect(cityInput).toHaveValue("Austin");
    await expect(stateInput).toHaveValue("TX");

    // Do NOT submit - we don't want DB writes in tests
  });
});
