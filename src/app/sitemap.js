import { SITE_URL, industryRoutes, legalRoutes, productRoutes, serviceRoutes } from "../lib/site-routes";

export default function sitemap() {
  const entry = (path, priority, changeFrequency = "monthly") => ({ url: `${SITE_URL}${path}`, changeFrequency, priority });

  return [
    entry("", 1),
    ...productRoutes.map((path) => entry(path, 0.9)),
    ...Object.keys(industryRoutes).map((slug) => entry(`/industries/${slug}`, 0.8)),
    ...Object.keys(serviceRoutes).map((slug) => entry(`/services/${slug}`, 0.8)),
    ...Object.keys(legalRoutes).map((slug) => entry(`/legal/${slug}`, 0.3, "yearly")),
  ];
}
