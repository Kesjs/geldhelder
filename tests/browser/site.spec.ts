import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/rijbewijzen",
  ...["am", "a", "b", "be", "c", "d", "t"].map((c) => `/rijbewijzen/${c}`),
  "/pakketten",
  "/reserveren",
  "/theorie",
  "/over-ons",
  "/instructeurs",
  "/contact",
  "/faq",
  "/privacy",
  "/algemene-voorwaarden",
  "/bestellen/beginner",
  "/betaling/annule",
  "/betaling/fout",
];

test("public routes render with one main heading", async ({ page }) => {
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page).toHaveTitle(/Stuurvast Rijschool/);
    await expect(page.locator("h1"), route).toHaveCount(1);
  }
  const missing = await page.goto("/does-not-exist");
  expect(missing?.status()).toBe(404);
});

test("responsive pages do not overflow", async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/rijbewijzen",
      "/rijbewijzen/t",
      "/pakketten",
      "/reserveren",
      "/bestellen/beginner",
    ]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${route} at ${width}px`,
      ).toBe(true);
      if (route === "/rijbewijzen" && [390, 1440].includes(width)) {
        await page.screenshot({
          path: `test-results/catalog-${width}.png`,
          fullPage: true,
        });
      }
    }
  }
});

test("motion feedback respects reduced motion and works after navigation", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = Element.prototype.animate;
    const state = window as unknown as { motionCalls: number };
    state.motionCalls = 0;
    Element.prototype.animate = function (...args) {
      state.motionCalls++;
      return original.apply(this, args);
    };
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect
    .poll(() =>
      page.evaluate(
        () => (window as unknown as { motionCalls: number }).motionCalls,
      ),
    )
    .toBeGreaterThan(0);
  const button = page.getByRole("link", { name: "Start met een aanvraag" });
  await button.hover();
  await expect
    .poll(() => button.evaluate((node) => getComputedStyle(node).transform))
    .not.toBe("none");
  await page
    .getByRole("heading", { name: "Goed voorbereid begint vóór je instapt." })
    .scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator(".reading-progress")
        .evaluate((node) => new DOMMatrix(getComputedStyle(node).transform).a),
    )
    .toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator('[data-revealed="true"]').first()).toBeAttached();
  expect(
    await page.evaluate(
      () => (window as unknown as { motionCalls: number }).motionCalls,
    ),
  ).toBe(0);
  await button.hover();
  await expect(button).toHaveCSS("transform", "none");
  const discovery = page.getByRole("link", {
    name: "Ontdek alle rijbewijzen",
    exact: true,
  });
  await discovery.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/rijbewijzen$/);
  await expect(page.locator("main")).toContainText("€");
  await expect(page.locator('[data-revealed="true"]').first()).toBeAttached();
  expect(
    await page.evaluate(
      () => (window as unknown as { motionCalls: number }).motionCalls,
    ),
  ).toBe(0);
});

test("request preselection and client validation", async ({ page }) => {
  await page.goto("/reserveren?categorie=b&pakket=beginner");
  await expect(page.getByLabel("Rijbewijs", { exact: false })).toHaveValue("B");
  await expect(
    page.getByLabel("Pakket of prestatie", { exact: false }),
  ).toHaveValue("Pakket Beginner");
  await page.getByRole("button", { name: "Aanvraag versturen" }).click();
  await expect(page.locator("#naam-error")).toBeVisible();
  await expect(page.locator("#email-error")).toBeVisible();
});

test("homepage images load and header pages are reachable at every breakpoint", async ({
  page,
}) => {
  const links = [
    "/rijbewijzen",
    "/pakketten",
    "/theorie",
    "/over-ons",
    "/instructeurs",
  ];
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    if (width === 390)
      await page.locator('button[aria-controls="mobiel-menu"]').click();
    for (const href of links) {
      await expect(
        page.locator(`header a[href="${href}"]:visible`).first(),
      ).toBeVisible();
    }
    await expect(
      page.locator('main a[href="/faq"]:visible').first(),
    ).toBeVisible();
    await expect(
      page.locator('main a[href="/contact"]:visible').first(),
    ).toBeVisible();
    if (width === 390) await page.keyboard.press("Escape");
    const images = page.locator("main img");
    await expect(page.locator("main")).not.toContainText("€");
    await expect(page.locator('main a[href^="/rijbewijzen/"]')).toHaveCount(0);
    await expect(page.locator('main a[href^="/bestellen/"]')).toHaveCount(0);
    expect(await images.count()).toBeGreaterThanOrEqual(5);
    for (const picture of await images.all()) {
      await picture.scrollIntoViewIfNeeded();
      await expect(picture).toHaveJSProperty("complete", true);
      await expect
        .poll(() =>
          picture.evaluate((img: HTMLImageElement) => img.naturalWidth),
        )
        .toBeGreaterThan(0);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `artifacts/home-${width}.png`,
      fullPage: true,
    });
  }
});

test("license page header image remains visible on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/rijbewijzen");

  const image = page.locator('main img[alt*="Verschillende voertuigen"]');
  await expect(image).toBeVisible();
  await expect(image).toHaveJSProperty("complete", true);
  await expect
    .poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth))
    .toBeGreaterThan(0);
  await expect(image).toHaveAttribute(
    "sizes",
    "(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), 560px",
  );
});

test("language switcher translates the current page and can switch back", async ({
  page,
}) => {
  await page.goto("/rijbewijzen");
  const switcher = page.locator("header details").first();

  await switcher.locator("summary").click();
  await switcher.getByRole("option", { name: "Français", exact: true }).click();
  await expect.poll(() => page.evaluate(() => document.documentElement.lang)).toBe("fr");
  await expect(page.locator("h1")).toHaveText("Choisissez le permis qui vous convient");
  await expect(page.locator('header nav a').first()).toHaveText("Permis de conduire");
  await expect(page.locator("main")).toContainText(
    "Prix indicatifs basés sur le marché néerlandais en 2026. Le coût final dépend de votre niveau et du nombre de leçons nécessaires.",
  );
  await expect(page.locator("main")).not.toContainText(
    "Richtprijzen op basis van de Nederlandse markt in 2026.",
  );

  await switcher.locator("summary").click();
  await switcher.getByRole("option", { name: "Nederlands", exact: true }).click();
  await expect(page.locator("h1")).toHaveText("Kies het rijbewijs dat bij je past");
});

test("runtime APIs reject invalid requests", async ({ request }) => {
  if (
    process.env.E2E_PRODUCTION === "1" &&
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    expect((await request.post("/api/aanvraag", { data: null })).status()).toBe(
      503,
    );
    expect((await request.post("/api/checkout", { data: {} })).status()).toBe(410);
    return;
  }
  expect((await request.post("/api/aanvraag", { data: null })).status()).toBe(
    400,
  );
  expect(
    (
      await request.post("/api/aanvraag", {
        data: { type: "contact", email: "invalid" },
      })
    ).status(),
  ).toBe(422);
  expect((await request.post("/api/checkout", { data: {} })).status()).toBe(410);
});

test("legacy checkout links return to the request form", async ({ page }) => {
  await page.goto("/bestellen/beginner");
  await expect(page).toHaveURL(/\/reserveren\?pakket=beginner$/);
  await expect(page.getByRole("heading", { name: "Van aanvraag naar eerste les" })).toBeVisible();
});

test("request UI handles server success and failure", async ({ page }) => {
  await page.route("**/api/aanvraag", (route) =>
    route.fulfill({ status: 502, json: { error: "Verzenden mislukt." } }),
  );
  await page.goto("/contact");
  await page.locator("#naam").fill("Test Bezoeker");
  await page.locator("#email").fill("test@example.com");
  await page.locator("#bericht").fill("Ik wil graag informatie.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Bericht versturen" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "Verzenden mislukt.",
  );
  await page.unroute("**/api/aanvraag");
  await page.route("**/api/aanvraag", (route) =>
    route.fulfill({ status: 200, json: { ok: true } }),
  );
  await page.getByRole("button", { name: "Bericht versturen" }).click();
  await expect(page.getByRole("status")).toContainText(
    "geen bevestigde reservering",
  );
});

test("FAQ and mobile menu work with the keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/faq");
  const menu = page.locator('button[aria-controls="mobiel-menu"]');
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  const question = page.getByRole("button", {
    name: "Hoe begin ik met een opleiding?",
  });
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("ArrowDown");
  await expect(
    page.getByRole("button", {
      name: "Wat is het verschil tussen een les en een pakket?",
    }),
  ).toBeFocused();
});

test("critical screens pass automated accessibility checks", async ({
  page,
}) => {
  for (const route of ["/", "/faq", "/reserveren", "/bestellen/beginner"]) {
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations, route).toEqual([]);
  }
});
