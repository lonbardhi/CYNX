import { expect, test } from "@playwright/test";

import { ContactModalPage } from "../../page-objects/ContactModalPage";

test.describe("Contact - consultation modal", () => {
  test("Contact - invalid email is blocked by browser validation", async ({ page }) => {
    const contactModal = new ContactModalPage(page);

    await page.goto("/");
    await contactModal.open();
    await contactModal.fillValidForm();
    await contactModal.emailInput.fill("not-an-email");
    await contactModal.submit();

    await expect(contactModal.emailInput).toBeFocused();
    await expect(contactModal.emailInput).toHaveJSProperty("validity.valid", false);
  });
});
