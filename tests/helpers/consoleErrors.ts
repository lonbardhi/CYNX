import type { ConsoleMessage, Page } from "@playwright/test";

const ignoredPatterns = [/favicon/i];

export function collectMajorConsoleErrors(page: Page) {
  const messages: string[] = [];

  page.on("console", (message: ConsoleMessage) => {
    if (message.type() !== "error") return;

    const text = message.text();
    if (ignoredPatterns.some((pattern) => pattern.test(text))) return;

    messages.push(text);
  });

  page.on("pageerror", (error) => {
    messages.push(error.message);
  });

  return messages;
}
