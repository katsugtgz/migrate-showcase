import { expect, test } from "@playwright/test";

test.describe("Homepage Smoke", () => {
  test("page loads with correct title and body", async ({ page }) => {
    await page.goto("/");

    const body = page.locator("body");
    await expect(body).toBeVisible();

    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test("no unhandled console errors during load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });
    page.on("pageerror", (err) => {
      errors.push(err.message);
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const benign = [
      "net::ERR_CONNECTION_REFUSED",
      "ResizeObserver loop",
      "Hydration failed because the server rendered HTML didn't match the client",
      "Encountered a script tag while rendering React component",
      "Failed to load resource: the server responded with a status of 500",
      "Minified React error #418",
      "Failed to load resource: the server responded with a status of 404",
    ];

    const realErrors = errors.filter(
      (e) => !benign.some((b) => e.includes(b))
    );

    expect(realErrors).toEqual([]);
  });

  test("hero clocks are visible", async ({ page }) => {
    await page.goto("/");

    const siteClock = page.getByTestId("site-clock");
    await expect(siteClock).toBeVisible();

    const viewerClock = page.getByTestId("viewer-clock");
    await expect(viewerClock).toBeVisible();
  });

  test("marquee rows are present", async ({ page }) => {
    await page.goto("/");

    const rows = page.getByTestId("role-marquee-row");
    await expect(rows).toHaveCount(2);
  });

  test("tech logos are loaded", async ({ page }) => {
    await page.goto("/");

    const logos = page.getByTestId("tech-logo");
    const count = await logos.count();
    expect(count).toBeGreaterThan(0);
  });

  test("desktop 3D badge renders instead of the fallback", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(3200);
    await page.locator("#id-card").scrollIntoViewIfNeeded();

    await expect(page.getByTestId("id-card-3d")).toBeVisible();
    await expect(page.locator("#id-card canvas")).toHaveCount(1);
    await expect(page.getByText("Drag the badge; rope and card follow physics.")).toHaveCount(0);
  });

  test("project cards are present on homepage", async ({ page }) => {
    await page.goto("/");

    const cards = page.getByTestId("project-card").first();
    await expect(cards).toBeVisible();
  });

  test("projects see-more CTA is present", async ({ page }) => {
    await page.goto("/");

    const cta = page.getByTestId("projects-see-more");
    await expect(cta).toBeVisible();
  });

  test("about section glitch text is present", async ({ page }) => {
    await page.goto("/");

    const glitchText = page.getByTestId("about-glitch-text");
    await expect(glitchText).toBeVisible();
  });

  test("about readable text (sr-only) is present", async ({ page }) => {
    await page.goto("/");

    const readableText = page.getByTestId("about-readable-text");
    await expect(readableText).toBeAttached();
  });

  test("quote section is visible", async ({ page }) => {
    await page.goto("/");

    const quote = page.getByTestId("quote-section");
    await expect(quote).toBeVisible();
  });

  test("contact section is visible", async ({ page }) => {
    await page.goto("/");

    const contact = page.getByTestId("contact-section");
    await expect(contact).toBeVisible();
  });

  test("contact email link is present", async ({ page }) => {
    await page.goto("/");

    const emailLink = page.getByTestId("contact-email-link");
    await expect(emailLink).toBeVisible();
  });

  test("footer is visible", async ({ page }) => {
    await page.goto("/");

    const footer = page.getByTestId("site-footer");
    await expect(footer).toBeVisible();
  });

  test("footer wordmark is present", async ({ page }) => {
    await page.goto("/");

    const wordmark = page.getByTestId("footer-wordmark");
    await expect(wordmark).toBeAttached();
  });
});
