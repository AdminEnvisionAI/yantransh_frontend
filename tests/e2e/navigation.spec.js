import { expect, test } from "./fixtures";

test.describe("desktop navigation", () => {
  test.skip(({ isMobile }) => isMobile, "desktop menu only");

  test("dropdowns navigate to industry, service and product pages", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("nav").first();

    await nav.getByRole("link", { name: "Industries" }).hover();
    await nav.getByRole("link", { name: "Healthcare" }).click();
    await expect(page).toHaveURL("/industries/healthcare");
    await expect(page.locator("h1")).toHaveText("Healthcare");

    await nav.getByRole("link", { name: "Services" }).hover();
    await nav.getByRole("link", { name: "Cloud & Infrastructure" }).click();
    await expect(page).toHaveURL("/services/cloud-infrastructure");

    await nav.getByRole("link", { name: "Products" }).hover();
    await nav.getByRole("link", { name: "VoiceIQ" }).click();
    await expect(page).toHaveURL("/voiceiq");
    await expect(page.locator("#demo")).toBeAttached();
  });

  test("section links from an inner page return to the homepage section", async ({ page }) => {
    await page.goto("/services/data-ai");
    const nav = page.locator("nav").first();
    await nav.getByRole("link", { name: "Platforms" }).hover();
    await nav.getByRole("link", { name: "Predictive Analytics Engine" }).click();
    await expect(page).toHaveURL("/#platforms/predictive-analytics");
    await expect(page.locator("#platforms h3")).toHaveText("Predictive Analytics Engine");

    await nav.getByRole("link", { name: "Contact Us" }).click();
    await expect(page.locator("#contact form")).toBeVisible();
  });

  test("detail page call-to-action opens the homepage contact form", async ({ page }) => {
    await page.goto("/industries/telecom");
    await page.locator("section").nth(1).getByRole("link").last().click();
    await expect(page).toHaveURL("/#contact");
    await expect(page.locator("#contact form")).toBeVisible();
  });

  test("footer links reach legal pages and back home", async ({ page }) => {
    await page.goto("/");
    await page.locator("footer").getByRole("link", { name: "Cookies Policy" }).click();
    await expect(page).toHaveURL("/legal/cookies-policy");
    await page.getByRole("link", { name: "Back to Home Page" }).click();
    await expect(page).toHaveURL("/");
    await page.locator("footer").getByRole("link", { name: "VoiceIQ" }).click();
    await expect(page).toHaveURL("/voiceiq");
  });

  test("navbar becomes opaque with a border after scrolling", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("nav").first();
    await expect(nav).toHaveCSS("background-color", "rgba(255, 255, 255, 0.9)");
    await page.mouse.wheel(0, 600);
    await expect(nav).toHaveCSS("background-color", "rgba(255, 255, 255, 0.97)");
  });
});

test.describe("mobile navigation", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile menu only");

  test("menu toggles and navigates", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("nav").first();
    await nav.getByRole("button", { name: "Open menu" }).click();
    await nav.getByRole("button", { name: "Services", exact: true }).click();
    await nav.getByRole("link", { name: "Talent Solutions" }).click();
    await expect(page).toHaveURL("/services/talent-solutions");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();

    await nav.getByRole("button", { name: "Open menu" }).click();
    await nav.getByRole("button", { name: "Products", exact: true }).click();
    await nav.getByRole("link", { name: "VoiceIQ" }).click();
    await expect(page).toHaveURL("/voiceiq");
  });

  test("pages do not scroll horizontally", async ({ page }) => {
    for (const path of ["/", "/industries/telecom", "/legal/terms-of-use", "/voiceiq"]) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });
});
