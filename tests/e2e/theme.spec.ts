import { expect, test } from "@playwright/test";

test.describe("Theme Toggle", () => {
  test("toggles dark class on html element", async ({ page }) => {
    page.on("pageerror", (err) => {
      if (err.message.includes("#418")) return;
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const toggle = page.locator('button[aria-label="Toggle theme"]');
    await expect(toggle).toBeVisible();

    await page.waitForTimeout(3000);

    const initialIsDark = await page.evaluate(() =>
      document.documentElement.classList.contains("dark")
    );

    await toggle.click({ force: true });

    await expect(async () => {
      const afterClickIsDark = await page.evaluate(() =>
        document.documentElement.classList.contains("dark")
      );
      expect(afterClickIsDark).toBe(!initialIsDark);
    }).toPass({ timeout: 10_000 });
  });
});
