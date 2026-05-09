import { expect, test } from "@playwright/test";

test.describe("/projects route", () => {
  test("projects page loads with filter tabs", async ({ page }) => {
    await page.goto("/projects");

    const projectsPage = page.getByTestId("projects-page");
    await expect(projectsPage).toBeVisible();

    const filters = page.getByTestId("category-filters");
    await expect(filters).toBeVisible();

    const projectCards = page.getByTestId("project-card");
    const count = await projectCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("back-home link is present", async ({ page }) => {
    await page.goto("/projects");

    const backLink = page.getByTestId("back-home");
    await expect(backLink).toBeVisible();
  });
});

test.describe("/about route", () => {
  test("about page loads with content", async ({ page }) => {
    await page.goto("/about");

    const aboutPage = page.getByTestId("about-page");
    await expect(aboutPage).toBeVisible();

    const skillsList = page.getByTestId("skills-list");
    await expect(skillsList).toBeVisible();
  });

  test("back-home link is present", async ({ page }) => {
    await page.goto("/about");

    const backLink = page.getByTestId("back-home");
    await expect(backLink).toBeVisible();
  });
});
