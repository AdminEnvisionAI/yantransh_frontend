import { SITE_URL, industryRoutes, legalRoutes, productRoutes, serviceRoutes, getPage } from "../lib/site-routes";

const LAST_MODIFIED = new Date();

export default function sitemap() {
  const entry = (path, priority, changeFrequency, images = []) => ({
    url: `${SITE_URL}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency,
    priority,
    images: images.map((src) => `${SITE_URL}${src}`),
  });
  const pageImages = (key) => [getPage(key).image && `/images/${getPage(key).image}`, `/og/${key}.png`].filter(Boolean);

  return [
    entry("", 1, "weekly", ["/og/home.png", "/images/hero-strategy.jpg", "/images/about.jpg"]),
    ...productRoutes.map((path) => entry(path, 0.9, "weekly", [`/og${path}.png`])),
    ...Object.entries(serviceRoutes).map(([slug, r]) => entry(`/services/${slug}`, 0.8, "monthly", pageImages(r.contentKey))),
    ...Object.entries(industryRoutes).map(([slug, r]) => entry(`/industries/${slug}`, 0.8, "monthly", pageImages(r.contentKey))),
    ...Object.keys(legalRoutes).map((slug) => entry(`/legal/${slug}`, 0.3, "yearly")),
  ];
}
