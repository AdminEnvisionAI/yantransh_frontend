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
validation, captcha enforcement, resume upload checks, structured data, sitemap,
robots.txt and llms.txt. Form tests replace the Turnstile widget with a local stub,
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
| `/sitemap.xml`, `/robots.txt`, `/llms.txt` | Generated from the route registry and `content.json` |

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
    json-ld.jsx           schema.org structured data
    voiceiq/              VoiceIQ product page sections and scoped styles
  site-pages/             Industry/service template and legal pages
  lib/                    Route registry, link/image helpers, email, captcha, rate limiting
  data/content.json       Site content (copy, navigation, footer, products)
  theme.js                Design tokens and shared icons
public/images/            Images (VoiceIQ assets in public/images/voiceiq)
tests/e2e/                Playwright end-to-end tests
```

## Common changes

- **Edit copy:** update `src/data/content.json`. Industry, service and legal pages,
  the footer, `llms.txt` and page metadata all read from it.
- **Add an industry or service page:** add its content under `pages` in
  `content.json`, then register the slug in `src/lib/site-routes.js`. The sitemap
  and static generation pick it up automatically; add a navigation link in
  `components/site-header.jsx` and a footer link in `content.json`.
- **Add a product:** create `src/app/<product>/page.*`, keep its styles scoped
  under a wrapper class (as `components/voiceiq/voiceiq.css` does with `.viq`),
  add it to `products` and the footer `Products` column in `content.json`, to the
  `Products` menu in `site-header.jsx`, and to `productRoutes` in `site-routes.js`.

See `src/THEME_GUIDE.md` for styling conventions.
