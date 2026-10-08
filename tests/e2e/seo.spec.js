import { expect, test } from "./fixtures";

const ldTypes = async (page) =>
  page.evaluate(() =>
    [...document.querySelectorAll('script[type="application/ld+json"]')]
      .flatMap((s) => { const d = JSON.parse(s.textContent); return d["@graph"] || [d]; })
      .flatMap((n) => [].concat(n["@type"])),
  );

test.describe("SEO, AEO and GEO", () => {
  test("pages carry the expected structured data", async ({ page }) => {
    const expected = {
      "/": ["Organization", "WebSite", "WebPage", "FAQPage"],
      "/voiceiq": ["SoftwareApplication", "BreadcrumbList", "FAQPage"],
      "/industries/telecom": ["Service", "BreadcrumbList", "FAQPage"],
      "/services/data-ai": ["Service", "BreadcrumbList", "FAQPage"],
      "/legal/privacy-policy": ["WebPage", "BreadcrumbList"],
    };
    for (const [path, types] of Object.entries(expected)) {
      await page.goto(path);
      expect(await ldTypes(page), path).toEqual(expect.arrayContaining(types));
    }
  });

  test("every FAQPage question is visible on the page and the accordion works", async ({ page }) => {
    for (const path of ["/", "/industries/banking", "/services/cloud-infrastructure", "/voiceiq"]) {
      await page.goto(path);
      const questions = await page.evaluate(() =>
        [...document.querySelectorAll('script[type="application/ld+json"]')]
          .flatMap((s) => { const d = JSON.parse(s.textContent); return d["@graph"] || [d]; })
          .filter((n) => n["@type"] === "FAQPage")
          .flatMap((n) => n.mainEntity.map((q) => [q.name, q.acceptedAnswer.text])),
      );
      expect(questions.length, path).toBeGreaterThan(2);
      for (const [q, a] of questions) {
        await expect(page.getByText(q, { exact: true }).first(), path).toBeAttached();
        expect(await page.locator("body").textContent(), path).toContain(a);
      }
    }
    await page.goto("/industries/telecom");
    const second = page.getByRole("button", { name: "What is the AI@Tele framework?" });
    await second.click();
    await expect(second).toHaveAttribute("aria-expanded", "true");
  });

  test("titles, descriptions, Open Graph images and canonical tags are unique and complete", async ({ page, request }) => {
    const seen = new Set();
    for (const path of ["/", "/voiceiq", "/industries/healthcare", "/services/talent-solutions"]) {
      await page.goto(path);
      const title = await page.title();
      expect(seen.has(title), title).toBe(false);
      seen.add(title);
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description.length, path).toBeGreaterThan(70);
      expect(description.length, path).toBeLessThanOrEqual(160);
      const og = await page.locator('meta[property="og:image"]').first().getAttribute("content");
      const img = await request.get(new URL(og).pathname);
      expect(img.headers()["content-type"], og).toBe("image/png");
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /max-image-preview:large/);
    }
  });

  test("robots.txt welcomes search and AI answer-engine crawlers", async ({ request }) => {
    const robots = await (await request.get("/robots.txt")).text();
    for (const bot of ["OAI-SearchBot", "GPTBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Google-Extended", "Googlebot", "Bingbot"]) {
      expect(robots).toContain(`User-Agent: ${bot}`);
    }
    expect(robots).not.toMatch(/Disallow: \/\s*$/m);
  });

  test("llms-full.txt contains every page and FAQ", async ({ request }) => {
    const res = await request.get("/llms-full.txt");
    expect(res.headers()["content-type"]).toContain("text/plain");
    const text = await res.text();
    for (const part of ["## Telecom", "## Data & AI", "## VoiceIQ", "What is the AI@Tele framework?", "How much does VoiceIQ cost?", "Madhup Sharma"]) {
      expect(text).toContain(part);
    }
  });

  test("sitemap lists images and last-modified dates; manifest is served", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).toContain("<lastmod>");
    expect(sitemap).toContain("<image:loc>https://www.yantranshvt.com/og/voiceiq.png</image:loc>");
    const manifest = await (await request.get("/manifest.webmanifest")).json();
    expect(manifest.name).toBe("YantranshVT");
  });

  test("the bare domain redirects to the www canonical host", async ({ request }) => {
    const res = await request.get("/services/data-ai", { headers: { host: "yantranshvt.com" }, maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers().location).toBe("https://www.yantranshvt.com/services/data-ai");
  });
});
