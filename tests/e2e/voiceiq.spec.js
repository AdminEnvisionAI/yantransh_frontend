import { expect, test } from "./fixtures";

test.describe("VoiceIQ product page", () => {
  test("renders all sections and FAQ structured data", async ({ page }) => {
    await page.goto("/voiceiq");
    for (const id of ["top", "how", "why", "industries", "security", "pricing", "demo"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const types = schemas.flatMap((s) => [].concat(JSON.parse(s)).map((d) => d["@type"]));
    expect(types).toEqual(expect.arrayContaining(["Organization", "SoftwareApplication", "FAQPage"]));
  });

  test("FAQ items expand", async ({ page }) => {
    await page.goto("/voiceiq");
    await page.getByRole("button", { name: /Are we locked in\?/ }).click();
    await expect(page.getByText("The platform is built on open standards")).toBeVisible();
  });

  test("Book a demo scrolls to the demo form", async ({ page }) => {
    await page.goto("/voiceiq");
    await page.getByRole("button", { name: "Book a demo" }).first().click();
    await expect.poll(() => page.evaluate(() => document.getElementById("demo").getBoundingClientRect().top)).toBeLessThan(150);
  });

  test("demo form shows the confirmation after a successful request", async ({ page }) => {
    let payload;
    await page.route("**/api/send-demo-email", async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({ json: { success: true } });
    });
    await page.goto("/voiceiq#demo");
    const form = page.locator("#demo form");
    await form.locator('[name="name"]').fill("Asha Rao");
    await form.locator('[name="email"]').fill("asha@example.com");
    await form.locator('[name="company"]').fill("Example Corp");
    await form.locator('[name="phone"]').fill("+91 98765 43210");
    await form.locator('[name="volume"]').selectOption("Over 1,00,000 minutes");
    await expect(form.getByTestId("captcha")).toHaveText("Security check passed");
    await form.getByRole("button", { name: "Book my demo" }).click();
    await expect(page.getByRole("heading", { name: "Demo Request Received!" })).toBeVisible();
    expect(payload).toEqual({ name: "Asha Rao", email: "asha@example.com", company: "Example Corp", phone: "+91 98765 43210", volume: "Over 1,00,000 minutes", website: "", captchaToken: "XXXX.DUMMY.TOKEN.XXXX" });
  });

  test("demo form shows the server error message", async ({ page }) => {
    await page.route("**/api/send-demo-email", (route) => route.fulfill({ status: 500, json: { error: "Unable to process demo request at this moment. Please try again." } }));
    await page.goto("/voiceiq#demo");
    const form = page.locator("#demo form");
    await form.locator('[name="name"]').fill("Asha Rao");
    await form.locator('[name="email"]').fill("asha@example.com");
    await form.locator('[name="company"]').fill("Example Corp");
    await form.locator('[name="phone"]').fill("+91 98765 43210");
    await expect(form.getByTestId("captcha")).toHaveText("Security check passed");
    await form.getByRole("button", { name: "Book my demo" }).click();
    await expect(page.getByText("Unable to process demo request at this moment. Please try again.")).toBeVisible();
  });

  test("product styles do not leak into the corporate pages", async ({ page }) => {
    await page.goto("/");
    const before = await page.evaluate(() => getComputedStyle(document.body).fontSize + getComputedStyle(document.querySelector("#services a") || document.body).color);
    await page.goto("/voiceiq");
    await page.locator("footer").getByRole("link", { name: "Disclaimer" }).click();
    await expect(page).toHaveURL("/legal/disclaimer");
    await page.getByRole("link", { name: "Back to Home Page" }).click();
    await expect(page).toHaveURL("/");
    const after = await page.evaluate(() => getComputedStyle(document.body).fontSize + getComputedStyle(document.querySelector("#services a") || document.body).color);
    expect(after).toBe(before);
  });
});

test.describe("form APIs", () => {
  test("require a valid captcha token", async ({ request }) => {
    const demo = await request.post("/api/send-demo-email", { data: { name: "Asha", email: "asha@example.com", company: "Example", phone: "+91 98765 43210" } });
    expect(demo.status()).toBe(400);
    expect((await demo.json()).error).toBe("Please complete the security check and try again.");

    const contact = await request.post("/api/contact", { data: { name: "Asha", email: "asha@example.com", company: "Example", message: "Hello" } });
    expect(contact.status()).toBe(400);
    expect((await contact.json()).error).toBe("Please complete the security check and try again.");

    const careers = await request.post("/api/careers", { multipart: { name: "Ravi", email: "ravi@example.com", role: "Engineer" } });
    expect(careers.status()).toBe(400);
    expect((await careers.json()).error).toBe("Please complete the security check and try again.");
  });

  test("validate contact and careers input", async ({ request }) => {
    const contact = await request.post("/api/contact", { data: { name: "Asha", email: "nope", company: "Example", message: "Hi" } });
    expect((await contact.json()).error).toBe("Please enter a valid email address.");
    const missing = await request.post("/api/contact", { data: { name: "Asha", email: "asha@example.com" } });
    expect((await missing.json()).error).toBe("Please add your name, email, company, and message before submitting.");

    const badFile = await request.post("/api/careers", {
      multipart: { name: "Ravi", email: "ravi@example.com", role: "Engineer", resume: { name: "cv.pdf", mimeType: "application/pdf", buffer: Buffer.from("MZ not a pdf") } },
    });
    expect((await badFile.json()).error).toBe("Please upload your resume as a PDF, DOC or DOCX file.");
    const bigFile = await request.post("/api/careers", {
      multipart: { name: "Ravi", email: "ravi@example.com", role: "Engineer", resume: { name: "cv.pdf", mimeType: "application/pdf", buffer: Buffer.alloc(5 * 1024 * 1024 + 1, 0x25) } },
    });
    expect((await bigFile.json()).error).toBe("Your resume must be 5 MB or smaller.");
  });

  test("silently drop submissions that fill the hidden honeypot field", async ({ request }) => {
    const res = await request.post("/api/contact", { data: { name: "Bot", email: "bot@example.com", company: "x", message: "spam", website: "http://spam.example" } });
    expect(res.status()).toBe(200);
  });
});

test.describe("demo request API", () => {
  test("rejects invalid input", async ({ request }) => {
    const base = { name: "Asha", email: "asha@example.com", company: "Example", phone: "+91 98765 43210" };
    for (const [field, value, message] of [
      ["name", " ", "Please provide a valid name."],
      ["email", "not-an-email", "Please provide a valid email address."],
      ["company", "", "Please provide your company name."],
      ["phone", "12", "Please provide a valid phone number."],
    ]) {
      const res = await request.post("/api/send-demo-email", { data: { ...base, [field]: value } });
      expect(res.status(), field).toBe(400);
      expect((await res.json()).error).toBe(message);
    }
    const bad = await request.post("/api/send-demo-email", { data: "{", headers: { "content-type": "application/json" } });
    expect(bad.status()).toBe(400);
  });

  test("rejects non-POST methods", async ({ request }) => {
    const res = await request.get("/api/send-demo-email");
    expect(res.status()).toBe(405);
  });
});
