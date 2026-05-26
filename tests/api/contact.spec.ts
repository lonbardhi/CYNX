import { expect, test } from "@playwright/test";

const validPayload = {
  company: "FLOCK",
  email: "carrot@example.com",
  firstName: "Carrot",
  lastName: "QA",
  message: "API smoke validation for the CYNX contact endpoint.",
  phone: "+440000000000",
  role: "Lead QA"
};

test.describe("API - contact endpoint", () => {
  test("API - valid contact request returns accepted response", async ({ request }) => {
    const response = await request.post("/api/contact", { data: validPayload });

    expect(response.status()).toBe(202);
    await expect(response).toBeOK();
    expect(await response.json()).toEqual({ ok: true });
  });

  test("API - invalid email returns validation error", async ({ request }) => {
    const response = await request.post("/api/contact", {
      data: { ...validPayload, email: "bad-email" }
    });

    expect(response.status()).toBe(400);
    expect(await response.json()).toEqual({ error: "Please provide a valid email address." });
  });
});
