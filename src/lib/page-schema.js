import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from "./schema";
import { SITE_URL, getFaqs, getPage } from "./site-routes";

/** JSON-LD for an industry, service or legal page: WebPage + BreadcrumbList (+ Service and FAQPage). */
export function detailPageSchema({ kind, contentKey, path }) {
  const page = getPage(contentKey);
  const faqs = getFaqs(contentKey);
  const isLegal = kind === "legal";

  return graph(
    webPageSchema({
      path,
      name: page.seoTitle || page.title,
      description: page.seoDescription || page.subtitle,
      image: page.image ? `/images/${page.image}` : undefined,
      about: isLegal ? undefined : `${SITE_URL}${path}#service`,
    }),
    breadcrumbSchema(path, [{ name: page.title, path }]),
    isLegal ? undefined : serviceSchema({ path, page, kind }),
    faqSchema(path, faqs),
  );
}
