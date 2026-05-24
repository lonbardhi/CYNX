import express, { type Express, type Request } from "express";
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
  website?: unknown;
};

type Logger = Pick<Console, "info" | "warn">;

type RateLimitConfig = {
  maxRequests: number;
  windowMs: number;
};

type CreateAppOptions = {
  contactRateLimit?: RateLimitConfig;
  logger?: Logger;
  serveClient?: boolean;
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const isProduction = process.env.NODE_ENV === "production";
const defaultPort = Number(process.env.PORT ?? 3000);
const defaultRateLimit: RateLimitConfig = {
  maxRequests: 5,
  windowMs: 15 * 60 * 1000
};

function requiredText(value: unknown, maxLength = 200) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= maxLength ? trimmed : null;
}

function optionalText(value: unknown, maxLength = 80) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.length > 0) {
    return forwardedFor.split(",")[0]?.trim() || request.ip || "unknown";
  }

  return request.ip || request.socket.remoteAddress || "unknown";
}

function getEmailDomain(email: string) {
  return email.split("@")[1]?.toLowerCase() ?? "unknown";
}

function createContactRateLimiter(config: RateLimitConfig) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return (request: Request) => {
    const now = Date.now();
    const key = getClientKey(request);
    const current = hits.get(key);

    if (!current || current.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + config.windowMs });
      return false;
    }

    current.count += 1;
    return current.count > config.maxRequests;
  };
}

export async function createApp(options: CreateAppOptions = {}): Promise<Express> {
  const app = express();
  const logger = options.logger ?? console;
  const rateLimitExceeded = createContactRateLimiter(options.contactRateLimit ?? defaultRateLimit);
  const serveClient = options.serveClient ?? true;

  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  app.use(express.json({ limit: "50kb" }));

  app.post("/api/contact", (request, response) => {
    if (rateLimitExceeded(request)) {
      logger.warn("CYNX contact rate limit exceeded", { client: getClientKey(request) });
      response.status(429).json({ error: "Too many contact requests. Please try again later." });
      return;
    }

    const payload = request.body as ContactPayload;

    if (requiredText(payload.website, 1_000)) {
      response.status(202).json({ ok: true });
      return;
    }

    const firstName = requiredText(payload.firstName);
    const lastName = requiredText(payload.lastName);
    const company = requiredText(payload.company);
    const role = requiredText(payload.role);
    const email = requiredText(payload.email, 320);
    const message = requiredText(payload.message, 2_000);

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
      emailDomain: getEmailDomain(email),
      firstNameLength: firstName.length,
      lastNameLength: lastName.length,
      messageLength: message.length,
      phoneProvided: optionalText(payload.phone).length > 0,
      receivedAt: new Date().toISOString(),
      role
    };

    logger.info("CYNX contact submission accepted", submission);
    response.status(202).json({ ok: true });
  });

  if (serveClient) {
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
  }

  return app;
}

async function startServer() {
  const app = await createApp();
  app.listen(defaultPort, "127.0.0.1", () => {
    console.log(`CYNX running at http://127.0.0.1:${defaultPort}`);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  void startServer();
}
