import contentData from "../../data/content.json";
import { SITE_URL, industryRoutes, legalRoutes, serviceRoutes } from "../../lib/site-routes";

export const dynamic = "force-static";

/** llms.txt — a plain-text site guide for AI answer engines, generated from site content. */
export function GET() {
  const { company, pages, platforms, metrics, products } = contentData;
  const line = (path, title, text) => {
    const summary = String(text || "").replace(/\s+/g, " ").trim();
    return `- [${title}](${SITE_URL}${path})${summary ? `: ${summary}` : ""}`;
  };
  const pageLines = (routes, prefix) =>
    Object.entries(routes).map(([slug, route]) => line(`${prefix}/${slug}`, pages[route.contentKey].title, pages[route.contentKey].subtitle || pages[route.contentKey].heroDescription));

  const body = [
    `# ${company.name}`,
    "",
    `> ${company.name} — ${company.tagline}. Enterprise consulting and technology services across data & AI, product engineering, cloud and talent, with offices in ${company.locations.map((l) => `${l.city} (${l.country})`).join(", ")}.`,
    "",
    `Key facts: ${metrics.stats.map((m) => `${m.value} ${m.label}`).join("; ")}. Contact: Info@yantranshVT.com (business), HR@yantranshVT.com (careers).`,
    "",
    "## Products",
    ...products.map((p) => line(p.href, p.name, `${p.tagline}. ${p.description}`)),
    "",
    "## Services",
    ...pageLines(serviceRoutes, "/services"),
    "",
    "## Industries",
    ...pageLines(industryRoutes, "/industries"),
    "",
    "## Platforms",
    ...platforms.map((p) => `- ${p.name}: ${p.desc || p.description}`),
    "",
    "## Optional",
    ...Object.entries(legalRoutes).map(([slug, route]) => line(`/legal/${slug}`, pages[route.contentKey].title, "")),
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
