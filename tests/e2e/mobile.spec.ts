import { expect, test } from "@playwright/test";

test.describe("Mobile viewport (375×812)", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("homepage loads without horizontal overflow", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const [scrollWidth, clientWidth] = await Promise.all([
      page.evaluate(() => document.documentElement.scrollWidth),
      page.evaluate(() => document.documentElement.clientWidth),
    ]);

    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });

  test("hero clocks visible on mobile", async ({ page }) => {
    await page.goto("/");

    const siteClock = page.getByTestId("site-clock");
    await expect(siteClock).toBeVisible();
  });

  test("footer visible on mobile", async ({ page }) => {
    await page.goto("/");

    const footer = page.getByTestId("site-footer");
    await expect(footer).toBeVisible();
  });
});
