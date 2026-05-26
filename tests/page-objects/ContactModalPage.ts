import { expect, type Page } from "@playwright/test";

export class ContactModalPage {
  readonly openButton = this.page.getByTestId("contact-open-button");
  readonly modal = this.page.getByTestId("contact-modal");
  readonly closeButton = this.page.getByTestId("contact-modal-close-button");
  readonly firstNameInput = this.page.getByTestId("contact-first-name-input");
  readonly lastNameInput = this.page.getByTestId("contact-last-name-input");
  readonly companyInput = this.page.getByTestId("contact-company-input");
  readonly roleInput = this.page.getByTestId("contact-role-input");
  readonly emailInput = this.page.getByTestId("contact-email-input");
  readonly phoneInput = this.page.getByTestId("contact-phone-input");
  readonly messageInput = this.page.getByTestId("contact-message-input");
  readonly submitButton = this.page.getByTestId("contact-submit-button");
  readonly statusMessage = this.page.getByTestId("contact-status-message");

  constructor(private readonly page: Page) {}

  async open() {
    if (await this.openButton.isVisible()) {
      await this.openButton.click();
    } else {
      await this.page.getByTestId("mobile-menu-toggle").click();
      await this.page.getByTestId("mobile-contact-open-button").click();
    }

    await expect(this.modal).toBeVisible();
  }

  async fillValidForm() {
    await this.firstNameInput.fill("Carrot");
    await this.lastNameInput.fill("QA");
    await this.companyInput.fill("FLOCK");
    await this.roleInput.fill("Lead QA");
    await this.emailInput.fill("carrot@example.com");
    await this.phoneInput.fill("+440000000000");
    await this.messageInput.fill("Please validate the CYNX QA foundation smoke path.");
  }

  async submit() {
    await this.submitButton.click();
  }
}
