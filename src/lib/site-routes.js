import contentData from "../data/content.json";

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

export function getRouteMetadata(contentKey, pathname) {
  const page = contentData.pages?.[contentKey];
  const title = page?.title || SITE_NAME;
  const description = [page?.seoDescription, page?.heroDescription, page?.subtitle, page?.introText, `${title} delivers strategy, technology, and talent solutions.`]
    .find(Boolean)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
  const image = page?.image ? `/images/${page.image}` : "/images/logo.png";

  return {
    title,
    description,
    alternates: { canonical: pathname },
    openGraph: { title, description, type: "website", url: pathname, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
