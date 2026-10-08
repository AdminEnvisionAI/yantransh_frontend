import { test as base, expect } from "@playwright/test";

/**
 * Replaces the Cloudflare Turnstile script with a local stub that immediately
 * "passes", so form tests are deterministic and need no network access.
 * Server-side verification is covered by the API tests.
 */
const TURNSTILE_STUB = `
  window.turnstile = {
    _n: 0,
    render(el, opts) {
      const id = String(++this._n);
      el.setAttribute("data-turnstile-id", id);
      el.textContent = "Security check passed";
      setTimeout(() => opts.callback("XXXX.DUMMY.TOKEN.XXXX"), 50);
      this["cb" + id] = opts.callback;
      return id;
    },
    reset(id) { setTimeout(() => this["cb" + id] && this["cb" + id]("XXXX.DUMMY.TOKEN.XXXX"), 50); },
    remove() {},
  };
`;

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route("https://challenges.cloudflare.com/**", (route) => route.fulfill({ contentType: "text/javascript", body: TURNSTILE_STUB }));
    await use(page);
  },
});

export { expect };
