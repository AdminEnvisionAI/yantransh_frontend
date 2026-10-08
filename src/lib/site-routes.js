import pages from "../data/pages.json";
import faqs from "../data/faqs.json";

export const SITE_URL = "https://www.yantranshvt.com";
export const SITE_NAME = "YantranshVT";

/**
 * Industry and service pages share one template. The options reproduce the
 * accent colours and animation timing used on each production page.
 */
export const industryRoutes = {
  telecom: { contentKey: "telecom", fallbackCategory: "Industries", fallbackTitle: "Telecom", checkColor: "white", ctaDelay: 0.4 },
  banking: { contentKey: "banking", fallbackCategory: "Industries", fallbackTitle: "Banking & Payments" },
  healthcare: { contentKey: "healthcare", fallbackCategory: "Industries", fallbackTitle: "Healthcare" },
  lifesciences: { contentKey: "lifesciences", fallbackCategory: "Industries", fallbackTitle: "Life Sciences", accent: "blue", ctaDelay: 0.4 },
};

export const industryAliases = { bfsi: "banking" };

export const serviceRoutes = {
  "data-ai": { contentKey: "data-ai", fallbackCategory: "Services", fallbackTitle: "Data & AI" },
  "product-engineering": { contentKey: "product-engineering", fallbackCategory: "Services", fallbackTitle: "Product Engineering", accent: "blue" },
  "cloud-infrastructure": { contentKey: "cloud-infrastructure", fallbackCategory: "Services", fallbackTitle: "Cloud & Infrastructure" },
  "talent-solutions": { contentKey: "talent-solutions", fallbackCategory: "Services", fallbackTitle: "Talent Solutions", accent: "blue" },
};

export const legalRoutes = {
  disclaimer: { contentKey: "disclaimer", load: () => import("../site-pages/Disclaimer.jsx") },
  "privacy-policy": { contentKey: "privacy-policy", load: () => import("../site-pages/PrivacyPolicy.jsx") },
  "terms-of-use": { contentKey: "terms-of-use", load: () => import("../site-pages/TermsOfUse.jsx") },
  "cookies-policy": { contentKey: "cookies-policy", load: () => import("../site-pages/CookiesPolicy.jsx") },
};

export const productRoutes = ["/voiceiq"];

export const getPage = (contentKey) => pages[contentKey] || {};
export const getFaqs = (key) => faqs[key] || [];

/** Cards for the generated Open Graph images at /og/<key>.png. */
const OG_CARDS = {
  home: { eyebrow: "Strategy · Technology · Talent", title: "Turning enterprise strategy into execution with Data, AI, Cloud & Talent" },
  voiceiq: { eyebrow: "VoiceIQ by YantranshVT", title: "Enterprise AI voice agents that answer every call in under 800 ms" },
};

export function getOgCard(key) {
  if (OG_CARDS[key]) return OG_CARDS[key];
  const page = pages[key];
  return page ? { eyebrow: page.category || "YantranshVT", title: page.seoTitle || page.title } : null;
}

export const ogCardKeys = () => [...Object.keys(OG_CARDS), ...Object.keys(pages)];

export const ogImage = (key, alt) => ({ url: `/og/${key}.png`, width: 1200, height: 630, alt });

export function getRouteMetadata(contentKey, pathname) {
  const page = pages[contentKey] || {};
  const title = page.seoTitle || page.title || SITE_NAME;
  const description = [page.seoDescription, page.heroDescription, page.subtitle, `${title} from ${SITE_NAME}.`]
    .find(Boolean)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
  const image = ogImage(contentKey, title);

  return {
    title,
    description,
    alternates: { canonical: pathname },
    openGraph: { title: `${title} | ${SITE_NAME}`, description, type: "website", url: pathname, siteName: SITE_NAME, locale: "en_US", images: [image] },
    twitter: { card: "summary_large_image", title: `${title} | ${SITE_NAME}`, description, images: [image.url] },
  };
}
