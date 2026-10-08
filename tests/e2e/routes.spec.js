import { expect, test } from "./fixtures";

const pages = [
  { path: "/", h1: /./, title: "YantranshVT | Strategy, Technology & Talent Excellence" },
  { path: "/industries/telecom", h1: "Telecom" },
  { path: "/industries/banking", h1: "Banking & Payments" },
  { path: "/industries/healthcare", h1: "Healthcare" },
  { path: "/industries/lifesciences", h1: "Life Sciences" },
  { path: "/services/data-ai", h1: "Data & AI" },
  { path: "/services/product-engineering", h1: "Product Engineering" },
  { path: "/services/cloud-infrastructure", h1: "Cloud & Infrastructure" },
  { path: "/services/talent-solutions", h1: "Talent Solutions" },
  { path: "/legal/disclaimer", h1: "Disclaimer" },
  { path: "/legal/privacy-policy", h1: "Privacy Policy" },
  { path: "/legal/terms-of-use", h1: "Terms of Use" },
  { path: "/legal/cookies-policy", h1: "Cookies Policy" },
  { path: "/voiceiq", h1: /AI voice agents/, title: "VoiceIQ | Enterprise AI Voice Agents" },
];

for (const { path, h1, title } of pages) {
  test(`${path} renders without errors, broken images or failed requests`, async ({ page, baseURL }) => {
    const errors = [];
    const failed = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => msg.type() === "error" && !/fonts\.(googleapis|gstatic)/.test(msg.location().url + msg.text()) && errors.push(msg.text()));
    page.on("response", (res) => res.url().startsWith(baseURL) && res.status() >= 400 && failed.push(`${res.status()} ${res.url()}`));

    const response = await page.goto(path, { waitUntil: "load" });
    expect(response.status()).toBe(200);
    await expect(page.locator("h1").first()).toHaveText(h1);
    if (title) await expect(page).toHaveTitle(title);

    // Canonical URL and description are present for search and answer engines.
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.yantranshvt.com${path === "/" ? "" : path}`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\S{10,}/);
    expect(await page.locator('script[type="application/ld+json"]').count()).toBeGreaterThan(0);

    // Scroll through the page so lazy and reveal-on-scroll content renders, then check images.
    const height = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < height; y += 500) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(40);
    }
    const broken = await page.evaluate(async () => {
      const imgs = [...document.images];
      await Promise.all(imgs.map((img) => (img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; }))));
      return imgs.filter((img) => img.naturalWidth === 0).map((img) => img.src);
    });
    expect(broken).toEqual([]);
    expect(failed).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("unknown routes return the 404 page", async ({ page }) => {
  const response = await page.goto("/does-not-exist");
  expect(response.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "This page could not be found." })).toBeVisible();
  await page.getByRole("link", { name: "Back to Home Page" }).click();
  await expect(page).toHaveURL("/");
});

test("legacy hash URLs redirect to canonical routes", async ({ page }) => {
  await page.goto("/#/industries/telecom");
  await expect(page).toHaveURL("/industries/telecom");
  await page.goto("/#/privacy-policy");
  await expect(page).toHaveURL("/legal/privacy-policy");
  await page.goto("/#/services/talent-solutions");
  await expect(page).toHaveURL("/services/talent-solutions");
});

test("the old bfsi industry slug permanently redirects to banking", async ({ request }) => {
  const res = await request.get("/industries/bfsi", { maxRedirects: 0 });
  expect(res.status()).toBe(308);
  expect(res.headers().location).toBe("/industries/banking");
});

test("robots.txt, sitemap.xml and llms.txt are served", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap: https://www.yantranshvt.com/sitemap.xml");

  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const path of ["/voiceiq", "/industries/telecom", "/services/data-ai", "/legal/cookies-policy"]) {
    expect(sitemap).toContain(`https://www.yantranshvt.com${path}</loc>`);
  }

  const llms = await request.get("/llms.txt");
  expect(llms.headers()["content-type"]).toContain("text/plain");
  const text = await llms.text();
  expect(text).toContain("# YantranshVT");
  expect(text).toContain("[VoiceIQ](https://www.yantranshvt.com/voiceiq)");
});
