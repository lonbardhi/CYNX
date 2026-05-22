import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

type ContactPayload = {
  company?: unknown;
  email?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  message?: unknown;
  phone?: unknown;
  role?: unknown;
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const isProduction = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT ?? 3000);

const app = express();

app.use(express.json({ limit: "1mb" }));

function requiredText(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

app.post("/api/contact", (request, response) => {
  const payload = request.body as ContactPayload;
  const firstName = requiredText(payload.firstName);
  const lastName = requiredText(payload.lastName);
  const company = requiredText(payload.company);
  const role = requiredText(payload.role);
  const email = requiredText(payload.email);
  const message = requiredText(payload.message);

  if (!firstName || !lastName || !company || !role || !email || !message) {
    response.status(400).json({ error: "Please complete all required fields." });
    return;
  }

  if (!validEmail(email)) {
    response.status(400).json({ error: "Please provide a valid email address." });
    return;
  }

  const submission = {
    company,
    email,
    firstName,
    lastName,
    message,
    phone: typeof payload.phone === "string" ? payload.phone.trim() : "",
    receivedAt: new Date().toISOString(),
    role
  };

  console.info("CYNX contact submission", submission);
  response.json({ ok: true });
});

if (isProduction) {
  const dist = path.join(root, "dist");
  app.use(express.static(dist));
  app.get("*", (_request, response) => {
    response.sendFile(path.join(dist, "index.html"));
  });
} else {
  const { createServer } = await import("vite");
  const vite = await createServer({
    appType: "spa",
    root,
    server: { middlewareMode: true }
  });
  app.use(vite.middlewares);
}

app.listen(port, "127.0.0.1", () => {
  console.log(`CYNX running at http://127.0.0.1:${port}`);
});
