import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  workers: 1,
  timeout: 180000,
  use: {
    baseURL: "http://localhost:3187",
    headless: true,
    channel: "msedge",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: process.env.E2E_PRODUCTION === "1" ? "npm run start -- --port 3187" : "npm run dev -- --port 3187",
    url: "http://localhost:3187",
    reuseExistingServer: false,
    timeout: 180000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
