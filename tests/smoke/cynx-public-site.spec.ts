import { expect, test } from "@playwright/test";

import { collectMajorConsoleErrors } from "../helpers/consoleErrors";
import { ContactModalPage } from "../page-objects/ContactModalPage";

test.describe("Smoke - CYNX public site", () => {
  test("Smoke - public homepage loads with critical navigation and no major console errors", async ({ page, isMobile }) => {
    const consoleErrors = collectMajorConsoleErrors(page);

    await page.goto("/");

    await expect(page.getByRole("heading", { name: /CYNX builds intelligent systems/i })).toBeVisible();
    await expect(page.getByTestId("brand-home-button")).toBeVisible();

    if (isMobile) {
      await page.getByTestId("mobile-menu-toggle").click();
      await expect(page.getByTestId("mobile-nav-panel")).toBeVisible();
      await page.getByTestId("mobile-nav-about-button").click();
    } else {
      await expect(page.getByTestId("contact-open-button")).toBeVisible();
      await page.getByTestId("nav-about-button").click();
    }

    await expect(page.getByRole("heading", { name: /Technology consulting with product judgement/i })).toBeVisible();
    expect(consoleErrors).toEqual([]);
  });

  test("Smoke - contact form accepts a valid project request", async ({ page }) => {
    const consoleErrors = collectMajorConsoleErrors(page);
    const contactModal = new ContactModalPage(page);

    await page.goto("/");
    await contactModal.open();
    await contactModal.fillValidForm();
    await contactModal.submit();

    await expect(contactModal.statusMessage).toContainText("CYNX has received your project note");
    expect(consoleErrors).toEqual([]);
  });
});
