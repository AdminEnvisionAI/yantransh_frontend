import { expect, test } from "./fixtures";

test.describe("homepage", () => {
  test("shows every section with the production copy", async ({ page }) => {
    await page.goto("/");
    for (const heading of ["Industries", "Services", "Platforms", "Company", "Contact", "Careers"]) {
      await expect(page.getByRole("heading", { level: 2, name: heading, exact: true })).toBeAttached();
    }
    await expect(page.getByText("Our integrated AI, data and digital services connect strategy and execution")).toBeAttached();
    for (const industry of ["TELECOM", "BFSI", "HEALTHCARE", "LIFE SCIENCES"]) {
      await expect(page.getByRole("heading", { level: 3, name: industry })).toBeAttached();
    }
    await expect(page.getByText("YantranshVT Solutions. All rights reserved.")).toBeAttached();
  });

  test("hero tabs switch the slide", async ({ page }) => {
    await page.goto("/");
    const tabs = page.locator("section").first().locator("button");
    await expect(tabs).toHaveCount(3);
    const first = await page.locator("h1").textContent();
    await tabs.nth(1).click();
    await expect(page.locator("h1")).not.toHaveText(first);
  });

  test("services accordion expands and links to the service page", async ({ page }) => {
    await page.goto("/");
    const services = page.locator("#services");
    await services.getByRole("button", { name: /product engineering/i }).click();
    await expect(services.getByRole("button", { name: /product engineering/i })).toHaveAttribute("aria-expanded", "true");
    await services.locator("#service-details-1").getByRole("link", { name: "Learn More" }).click();
    await expect(page).toHaveURL("/services/product-engineering");
    await expect(page.locator("h1")).toHaveText("Product Engineering");
  });

  test("platform deep links open the matching tab", async ({ page }) => {
    await page.goto("/#platforms/data-modernization");
    await expect(page.locator("#platforms h3")).toHaveText("Data Modernization Suite");
    await expect.poll(() => page.evaluate(() => document.getElementById("platforms").getBoundingClientRect().top)).toBeLessThan(120);
  });

  test("company deep links open the matching tab", async ({ page }) => {
    await page.goto("/#company/leadership");
    await expect(page.locator("#company h4").first()).toBeVisible();
    await page.goto("/#company/partners");
    await expect(page.getByText("Our strong technology stack, digital expertise")).toBeVisible();
  });

  test("contact form validates, sends through the API with the captcha token, and confirms", async ({ page }) => {
    let payload;
    await page.route("**/api/contact", async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({ json: { success: true } });
    });
    await page.goto("/");
    await page.getByRole("button", { name: "Contact Form" }).click();
    await expect(page).toHaveURL(/#contact$/);
    const form = page.locator("#contact form");
    await expect(form.getByTestId("captcha")).toHaveText("Security check passed");
    await form.locator("#contact-name").fill("Asha Rao");
    await form.locator("#contact-email").fill("asha@example.com");
    await form.locator("#contact-company").fill("Example Corp");
    await form.locator("#contact-message").fill("   ");
    await form.evaluate((f) => f.noValidate = true);
    await form.getByRole("button", { name: /Email Info Team/ }).click();
    await expect(form.getByText("Please add your name, email, company, and message before submitting.")).toBeVisible();

    await form.locator("#contact-message").fill("We would like to discuss a data platform.");
    await form.getByRole("button", { name: /Email Info Team/ }).click();
    await expect(form.getByText("Thank you! Your message has been sent to our team and we'll get back to you shortly.")).toBeVisible();
    expect(payload).toMatchObject({ name: "Asha Rao", email: "asha@example.com", company: "Example Corp", message: "We would like to discuss a data platform.", website: "", captchaToken: "XXXX.DUMMY.TOKEN.XXXX" });
    await expect(form.locator("#contact-name")).toHaveValue("");
  });

  test("contact form shows server errors", async ({ page }) => {
    await page.route("**/api/contact", (route) => route.fulfill({ status: 500, json: { error: "We couldn't send your message right now. Please try again or email Info@yantranshVT.com." } }));
    await page.goto("/#contact");
    const form = page.locator("#contact form");
    await form.locator("#contact-name").fill("Asha Rao");
    await form.locator("#contact-email").fill("asha@example.com");
    await form.locator("#contact-company").fill("Example Corp");
    await form.locator("#contact-message").fill("Hello");
    await expect(form.getByTestId("captcha")).toHaveText("Security check passed");
    await form.getByRole("button", { name: /Email Info Team/ }).click();
    await expect(form.getByText(/We couldn't send your message right now/)).toBeVisible();
  });

  test("careers form validates, uploads the resume and confirms", async ({ page }) => {
    let request;
    await page.route("**/api/careers", async (route) => {
      request = route.request();
      await route.fulfill({ json: { success: true } });
    });
    await page.goto("/#careers");
    const form = page.locator("#careers form");
    await expect(form).toBeVisible();
    await form.evaluate((f) => f.noValidate = true);
    await form.locator("#career-name").fill("Ravi");
    await form.locator("#career-email").fill("ravi@example.com");
    await form.getByRole("button", { name: /Email HR Team/ }).click();
    await expect(form.getByText("Please add your name, email, and role of interest before submitting.")).toBeVisible();

    await form.locator("#career-resume").setInputFiles({ name: "cv.exe", mimeType: "application/octet-stream", buffer: Buffer.from("MZ") });
    await expect(form.getByText("Please choose a PDF, DOC or DOCX file of 5 MB or less.")).toBeVisible();
    await form.locator("#career-resume").setInputFiles({ name: "cv.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.4 resume") });

    await form.locator("#career-role").fill("Data Engineer");
    await expect(form.getByTestId("captcha")).toHaveText("Security check passed");
    await form.getByRole("button", { name: /Email HR Team/ }).click();
    await expect(form.getByText("Thank you! Your application has been sent to our HR team.")).toBeVisible();
    const body = request.postDataBuffer().toString("latin1");
    expect(request.headers()["content-type"]).toContain("multipart/form-data");
    for (const part of ['name="role"', "Data Engineer", 'filename="cv.pdf"', "%PDF-1.4 resume", "XXXX.DUMMY.TOKEN.XXXX"]) expect(body).toContain(part);
  });
});
