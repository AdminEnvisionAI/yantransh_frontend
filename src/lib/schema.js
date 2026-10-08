import contentData from "../data/content.json";
import { SITE_NAME, SITE_URL } from "./site-routes";

/*
 * schema.org structured data (JSON-LD) for search engines and AI answer engines.
 * Every entity has a stable @id so pages can reference the organization,
 * website and product instead of repeating them.
 */

export const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const abs = (path) => `${SITE_URL}${path === "/" ? "" : path}`;
const BUILD_DATE = new Date().toISOString().slice(0, 10);

const { company, leadership, services, platforms, verticals, products } = contentData;
const title = (text) => text.toLowerCase().replace(/(^|[\s&-])\w/g, (m) => m.toUpperCase()).replace(/\bAi\b/g, "AI");

export function organizationSchema() {
  const founder = leadership.find((p) => /founder/i.test(p.title));
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: company.legalName,
    alternateName: ["Yantransh", company.legalName],
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo-square.png`, width: 240, height: 240 },
    image: `${SITE_URL}/images/logo.png`,
    slogan: company.tagline,
    description:
      "YantranshVT is a strategy, technology and talent company that helps enterprises turn strategy into execution through Data & AI Transformation, Product Engineering, Cloud & Infrastructure and Talent Solutions, and builds AI products such as VoiceIQ.",
    email: company.email,
    parentOrganization: company.parentOrganization ? { "@type": "Organization", name: company.parentOrganization } : undefined,
    founder: founder ? { "@type": "Person", name: founder.name, jobTitle: founder.title } : undefined,
    employee: leadership.map((p) => ({ "@type": "Person", name: p.name, jobTitle: p.title, worksFor: { "@id": ORG_ID } })),
    location: company.locations.map((l) => ({ "@type": "Place", name: `${l.city}, ${l.country}`, address: { "@type": "PostalAddress", addressLocality: l.city, addressCountry: l.country } })),
    areaServed: "Worldwide",
    knowsAbout: [
      ...services.map((s) => title(s.sectionLabel)),
      ...platforms.map((p) => p.name),
      "Agentic AI", "Generative AI", "Data Modernization", "Cloud Migration", "DevSecOps", "Staff Augmentation", "AI Voice Agents",
      ...verticals.map((v) => title(v.sectionLabel)),
    ],
    contactPoint: [
      { "@type": "ContactPoint", contactType: "sales", email: "Info@yantranshVT.com", availableLanguage: ["English"] },
      { "@type": "ContactPoint", contactType: "human resources", email: "HR@yantranshVT.com", availableLanguage: ["English"] },
    ],
    makesOffer: products.map((p) => ({ "@type": "Offer", itemOffered: { "@id": `${abs(p.href)}#product` } })),
    sameAs: (() => {
      const profiles = [...Object.values(company.social || {}), ...(company.sameAs || [])].filter(Boolean);
      return profiles.length ? profiles : undefined;
    })(),
    brand: products.map((p) => ({ "@type": "Brand", name: p.name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@id": `${abs(`/services/${s.id}`)}#service` } })),
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: "Yantransh",
    description: company.tagline,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

/**
 * @param {{ path: string, name: string, description?: string, type?: string | string[], image?: string, about?: string, breadcrumb?: boolean }} options
 */
export function webPageSchema({ path, name, description, type = "WebPage", image, about, breadcrumb = true }) {
  return {
    "@type": type,
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    about: about ? { "@id": about } : { "@id": ORG_ID },
    primaryImageOfPage: image ? { "@type": "ImageObject", url: `${SITE_URL}${image}` } : undefined,
    dateModified: BUILD_DATE,
    breadcrumb: breadcrumb ? { "@id": `${abs(path)}#breadcrumb` } : undefined,
  };
}

/** @param {string} path @param {{ name: string, path: string }[]} items */
export function breadcrumbSchema(path, items) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${abs(path)}#breadcrumb`,
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

/** @param {string} path @param {{ q: string, a: string }[]} faqs */
export function faqSchema(path, faqs) {
  if (!faqs?.length) return undefined;
  return {
    "@type": "FAQPage",
    "@id": `${abs(path)}#faq`,
    isPartOf: { "@id": `${abs(path)}#webpage` },
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

/** Industry and service pages: the offering as a schema.org Service with its capabilities. */
export function serviceSchema({ path, page, kind }) {
  return {
    "@type": "Service",
    "@id": `${abs(path)}#service`,
    name: kind === "industry" ? `${page.title} Solutions` : page.title,
    serviceType: page.seoTitle || page.title,
    description: page.seoDescription || page.subtitle,
    url: abs(path),
    image: page.image ? `${SITE_URL}/images/${page.image}` : undefined,
    provider: { "@id": ORG_ID },
    areaServed: "Worldwide",
    audience: kind === "industry" ? { "@type": "BusinessAudience", audienceType: `${page.title} organizations` } : { "@type": "BusinessAudience", audienceType: "Enterprises" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${page.title} offerings`,
      itemListElement: (page.offerings || []).map((o) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: o.title, description: o.description } })),
    },
  };
}

/** Wraps entities into one JSON-LD document, dropping empty values. */
/** @param {...(object | undefined)} nodes */
export const graph = (...nodes) => ({ "@context": "https://schema.org", "@graph": nodes.filter(Boolean) });
