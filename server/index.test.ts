import request from "supertest";
import { describe, expect, it, vi } from "vitest";

import { createApp } from "./index";

const validPayload = {
  company: "FLOCK",
  email: "lon@example.com",
  firstName: "Lon",
  lastName: "Bardhi",
  message: "We need a secure CYNX launch plan.",
  phone: "+441234567890",
  role: "Founder"
};

describe("contact API", () => {
  it("accepts a valid contact request without logging personal data", async () => {
    const logger = {
      info: vi.fn(),
      warn: vi.fn()
    };
    const app = await createApp({ logger, serveClient: false });

    const response = await request(app).post("/api/contact").send(validPayload);

    expect(response.status).toBe(202);
    expect(response.body).toEqual({ ok: true });
    expect(logger.info).toHaveBeenCalledWith(
      "CYNX contact submission accepted",
      expect.objectContaining({ emailDomain: "example.com" })
    );
    expect(JSON.stringify(logger.info.mock.calls)).not.toContain(validPayload.email);
    expect(JSON.stringify(logger.info.mock.calls)).not.toContain(validPayload.message);
    expect(JSON.stringify(logger.info.mock.calls)).not.toContain(validPayload.phone);
  });

  it("rejects invalid payloads with validation errors", async () => {
    const app = await createApp({ serveClient: false });

    const response = await request(app).post("/api/contact").send({ ...validPayload, email: "bad-email" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Please provide a valid email address." });
  });

  it("rate limits repeated submissions from the same client", async () => {
    const logger = {
      info: vi.fn(),
      warn: vi.fn()
    };
    const app = await createApp({
      contactRateLimit: { maxRequests: 2, windowMs: 60_000 },
      logger,
      serveClient: false
    });

    await request(app).post("/api/contact").send(validPayload).expect(202);
    await request(app).post("/api/contact").send(validPayload).expect(202);
    const response = await request(app).post("/api/contact").send(validPayload);

    expect(response.status).toBe(429);
    expect(response.body).toEqual({ error: "Too many contact requests. Please try again later." });
  });
});
