# YantranshVT website

The corporate site for YantranshVT and its products (currently **VoiceIQ**), built
as a single Next.js App Router application. Pages are statically generated for
fast loads and full search/answer-engine indexing (SEO, AEO, GEO).

## Requirements

- Node.js 20.9 or later (see `.nvmrc`)

## Development

```bash
npm install
npm run dev          # http://localhost:3000
```

## Production

```bash
npm run build
npm start            # serves on port 5173 behind the reverse proxy
```

Deploy the Next.js build (`.next`) as one Node.js service.

## Forms, email and captcha

The Contact, Careers and VoiceIQ demo forms send email from the server over SMTP
and are protected by Cloudflare Turnstile, a hidden honeypot field and a
per-IP rate limit (5 sent submissions per form every 10 minutes).

| Form | API | Delivered to | Also |
| --- | --- | --- | --- |
| Contact (homepage) | `POST /api/contact` | `CONTACT_EMAIL_TO` (default Info@yantranshVT.com) | Acknowledgement to the sender |
| Careers (homepage) | `POST /api/careers` | `CAREERS_EMAIL_TO` (default HR@yantranshVT.com) | Resume attached (PDF/DOC/DOCX, max 5 MB); acknowledgement to the applicant |
| VoiceIQ demo | `POST /api/send-demo-email` | `ADMIN_EMAIL` | Confirmation to the requester |

Replies to team notifications go straight to the person who submitted the form.

Setup:

1. Copy `.env.example` to `.env` and fill in the SMTP settings (for Gmail, use an
   [app password](https://myaccount.google.com/apppasswords)).
2. In the Cloudflare dashboard, open **Turnstile → Add widget**, add your domains
   (`yantranshvt.com`, `www.yantranshvt.com`, and `localhost` for development),
   and copy the keys into `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.
   `.env.example` ships with Cloudflare's always-pass test keys for local use.
3. `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is built into the page, so rebuild
   (`npm run build`) after changing it.

Without SMTP settings the forms show a friendly error and nothing is sent; without
the Turnstile secret every submission is rejected (both are logged on the server).

## Search and AI visibility (SEO, AEO, GEO)

Built in:

- **Metadata:** unique title, description, canonical URL, Open Graph and Twitter
  cards on every page; `max-snippet`/`max-image-preview` robots directives.
- **Structured data (JSON-LD):** Organization and WebSite on every page; WebPage,
  BreadcrumbList, Service and FAQPage on industry/service pages;
  SoftwareApplication (with pricing) and FAQPage on `/voiceiq` (`src/lib/schema.js`).
- **FAQs:** visible FAQ sections on the homepage, every industry/service page
  and VoiceIQ, matching the FAQPage data. Edit them in `src/data/faqs.json`
  (VoiceIQ: `src/components/voiceiq/faqs.ts`).
- **AI crawlers:** `robots.txt` explicitly allows search engines and AI
  assistants (ChatGPT, Claude, Gemini, Perplexity, Copilot, Apple). To opt out
  of model training only, set the `training` group in `src/app/robots.js` to
  `disallow: "/"`.
- **llms.txt / llms-full.txt:** generated from the site content (`src/lib/llms.js`).
- **Open Graph images:** generated per page at `/og/<page>.png`.
- **Sitemap** with images and last-modified dates, a web manifest, and a
  permanent redirect from `yantranshvt.com` to `www.yantranshvt.com`.

To finish setup:

1. Add the company's social profile URLs to `company.social` (and any other
   profiles such as Crunchbase or Clutch to `company.sameAs`) in
   `src/data/content.json`. They appear in the footer and in the Organization data.
2. Verify the site in Google Search Console and Bing Webmaster Tools; put the
   verification tokens in `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION`.
3. Set `INDEXNOW_KEY`, deploy, then run `npm run indexnow` after each release so
   Bing (and Copilot/ChatGPT search, which draw on it) re-crawl changed pages.

## Testing

```bash
npx playwright install chromium   # first time only
npm run build
npm run test:e2e                  # starts `next start` on port 3005 and runs all tests
```

Set `E2E_BASE_URL` to run the suite against an already running server or a
deployed environment, for example `E2E_BASE_URL=https://www.yantranshvt.com npm run test:e2e`.
The suite covers every route (desktop and mobile), navigation, deep links,
legacy hash redirects, the contact/careers forms, the VoiceIQ demo form and API
validation, captcha enforcement, resume upload checks, structured data, FAQs,
metadata, Open Graph images, sitemap, robots.txt and llms.txt. Form tests replace the Turnstile widget with a local stub,
so they run without network access.

## Routes

| URL | Source |
| --- | --- |
| `/` | `src/app/page.jsx` → `components/home-page.jsx` |
| `/industries/{telecom,banking,healthcare,lifesciences}` | `app/industries/[slug]` → `site-pages/DetailPage.jsx` |
| `/services/{data-ai,product-engineering,cloud-infrastructure,talent-solutions}` | `app/services/[slug]` → `site-pages/DetailPage.jsx` |
| `/legal/{disclaimer,privacy-policy,terms-of-use,cookies-policy}` | `app/legal/[slug]` → `site-pages/*.jsx` |
| `/voiceiq` | `app/voiceiq/page.tsx` → `components/voiceiq/*` |
| `/api/contact`, `/api/careers`, `/api/send-demo-email` | Form submissions (POST) |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/manifest.webmanifest` | Generated from the route registry and `src/data` |
| `/og/<page>.png` | Generated Open Graph images |
| `/indexnow.txt` | IndexNow key (when `INDEXNOW_KEY` is set) |

Old hash links (`/#/industries/telecom`, `/#/privacy-policy`, …) redirect to the
canonical URLs, and `/industries/bfsi` permanently redirects to `/industries/banking`.

## Project structure

```
src/
  app/                    App Router pages, metadata, sitemap, robots, llms.txt, API
  components/
    site-header.jsx       Navigation (all pages)
    site-footer.jsx       Full footer (homepage, products)
    detail-footer.jsx     Compact footer (industry, service, legal pages)
    home-page.jsx         Homepage sections
    reveal.jsx            Reveal-on-scroll animation helper
    captcha.tsx           Cloudflare Turnstile widget and honeypot field
    faq-section.jsx       FAQ accordion
    json-ld.jsx           schema.org structured data
    voiceiq/              VoiceIQ product page sections and scoped styles
  site-pages/             Industry/service template and legal pages
  lib/                    Route registry, schema.org data, llms.txt, email, captcha, rate limiting
scripts/indexnow.mjs      Submits sitemap URLs to IndexNow after a deploy
  data/content.json       Homepage, footer and product content
  data/pages.json         Industry, service and legal page copy (incl. SEO titles/descriptions)
  data/faqs.json          FAQs for the homepage and industry/service pages
  theme.js                Design tokens and shared icons
public/images/            Images (VoiceIQ assets in public/images/voiceiq)
tests/e2e/                Playwright end-to-end tests
```

## Common changes

- **Edit copy:** homepage, footer and product text live in `src/data/content.json`;
  industry, service and legal page text lives in `src/data/pages.json`. Page
  metadata and `llms.txt` are generated from these files.
- **Add an industry or service page:** add its content to `src/data/pages.json`,
  then register the slug in `src/lib/site-routes.js`. The sitemap
  and static generation pick it up automatically; add a navigation link in
  `components/site-header.jsx` and a footer link in `content.json`.
- **Add a product:** create `src/app/<product>/page.*`, keep its styles scoped
  under a wrapper class (as `components/voiceiq/voiceiq.css` does with `.viq`),
  add it to `products` and the footer `Products` column in `content.json`, to the
  `Products` menu in `site-header.jsx`, and to `productRoutes` in `site-routes.js`.

See `src/THEME_GUIDE.md` for styling conventions.
