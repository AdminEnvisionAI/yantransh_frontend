import contentData from "../data/content.json";
import { faqs as voiceiqFaqs } from "../components/voiceiq/faqs";
import { SITE_NAME, SITE_URL, getFaqs, getPage, industryRoutes, legalRoutes, serviceRoutes } from "./site-routes";

/*
 * Plain-text site guides for AI answer engines (https://llmstxt.org):
 *   /llms.txt       concise index with links
 *   /llms-full.txt  the full site content as Markdown
 * Both are generated from the same data the pages use, so they never drift.
 */

const { company, metrics, leadership, platforms, partners, services, products, about } = contentData;
const url = (path) => `${SITE_URL}${path}`;
const clean = (text) => String(text || "").replace(/\s+/g, " ").trim();
const link = (path, title, note) => `- [${title}](${url(path)})${note ? `: ${clean(note)}` : ""}`;
const faqBlock = (faqs) => faqs.map((f) => `### ${f.q}\n\n${clean(f.a)}`).join("\n\n");

const SUMMARY = `${SITE_NAME} (Yantransh Value Technologies) is a strategy, technology and talent company that helps enterprises turn strategy into execution through Data & AI Transformation, Product Engineering, Cloud & Infrastructure and Talent Solutions, with industry solutions for Telecom, Banking & Financial Services, Healthcare and Life Sciences, and AI products including the VoiceIQ enterprise AI voice agent.`;

const facts = () => [
  `- Name: ${SITE_NAME} (also "Yantransh"; legal name ${company.legalName}; part of the ${company.parentOrganization})`,
  `- Tagline: ${company.tagline}`,
  `- Website: ${SITE_URL}`,
  `- Locations: ${company.locations.map((l) => `${l.city} (${l.country})`).join(", ")}`,
  `- Key figures: ${metrics.stats.map((m) => `${m.value} ${m.label}`).join("; ")}`,
  `- Leadership: ${leadership.map((p) => `${p.name}, ${p.title}`).join("; ")}`,
  `- Technology ecosystems: ${partners.logos.join(", ")}`,
  `- Contact: Info@yantranshVT.com (business enquiries), HR@yantranshVT.com (careers), ${company.email} (general)`,
];

const routeLinks = (routes, prefix) =>
  Object.entries(routes).map(([slug, r]) => {
    const page = getPage(r.contentKey);
    return link(`${prefix}/${slug}`, page.title, page.seoDescription || page.subtitle);
  });

export function llmsTxt() {
  return [
    `# ${SITE_NAME}`,
    "",
    `> ${SUMMARY}`,
    "",
    "## Key facts",
    "",
    ...facts(),
    "",
    "## Products",
    "",
    ...products.map((p) => link(p.href, p.name, `${p.tagline}. ${p.description}`)),
    "",
    "## Services",
    "",
    ...routeLinks(serviceRoutes, "/services"),
    "",
    "## Industries",
    "",
    ...routeLinks(industryRoutes, "/industries"),
    "",
    "## Platforms",
    "",
    ...platforms.map((p) => link("/#platforms", p.name, `${p.desc} Features: ${p.features.join(", ")}.`)),
    "",
    "## Company",
    "",
    link("/#company", "About YantranshVT", `Mission: ${about.mission.text}`),
    link("/#contact", "Contact", "Business enquiries form; responses by email."),
    link("/#careers", "Careers", "Apply with your resume; applications go to the HR team."),
    "",
    "## Optional",
    "",
    link("/llms-full.txt", "Full site content", "All page content, FAQs and product details in Markdown."),
    ...Object.entries(legalRoutes).map(([slug, r]) => link(`/legal/${slug}`, getPage(r.contentKey).title)),
    "",
  ].join("\n");
}

const detailSection = (routes, prefix) =>
  Object.entries(routes).map(([slug, r]) => {
    const page = getPage(r.contentKey);
    const faqs = getFaqs(r.contentKey);
    return [
      `## ${page.title}`,
      "",
      `URL: ${url(`${prefix}/${slug}`)}`,
      "",
      `**${page.subtitle}**`,
      "",
      clean(page.heroDescription),
      "",
      clean(page.introText),
      "",
      ...(page.offerings || []).map((o) => `- **${o.title}:** ${clean(o.description)}`),
      "",
      clean(page.ctaText),
      ...(faqs.length ? ["", `### Frequently asked questions: ${page.title}`, "", faqBlock(faqs).replace(/^### /gm, "#### ")] : []),
      "",
    ].join("\n");
  });

export function llmsFullTxt() {
  return [
    `# ${SITE_NAME}: full site content`,
    "",
    `> ${SUMMARY}`,
    "",
    `Source: ${SITE_URL}. Generated from the website's content. Last updated ${new Date().toISOString().slice(0, 10)}.`,
    "",
    "## Company overview",
    "",
    ...facts(),
    "",
    `**Mission:** ${about.mission.text}`,
    "",
    `**Vision:** ${about.vision.text}`,
    "",
    "### Service lines",
    "",
    ...services.map((s) => `- **${s.sectionLabel.toLowerCase().replace(/(^|[\s&])\w/g, (m) => m.toUpperCase()).replace(/\bAi\b/g, "AI")}** (${url(`/services/${s.id}`)}): ${clean(s.description)}`),
    "",
    "### Platforms",
    "",
    ...platforms.map((p) => `- **${p.name}:** ${clean(p.desc)} Features: ${p.features.join(", ")}.`),
    "",
    "### Frequently asked questions",
    "",
    faqBlock(getFaqs("home")).replace(/^### /gm, "#### "),
    "",
    "# Services",
    "",
    ...detailSection(serviceRoutes, "/services"),
    "# Industries",
    "",
    ...detailSection(industryRoutes, "/industries"),
    "# Products",
    "",
    "## VoiceIQ",
    "",
    `URL: ${url("/voiceiq")}`,
    "",
    "VoiceIQ is YantranshVT's enterprise AI voice agent. It answers every call in under 800 ms, grounded in the customer's own knowledge base, and runs entirely on the customer's private cloud with no AWS, GCP, Azure or third-party AI dependency.",
    "",
    "- Channels: phone calls, website voice calls, WhatsApp chat and voice",
    "- Industries: healthcare, e-commerce and retail, travel and logistics, insurance, telecommunications",
    "- Plans (indicative, INR): Starter ₹25K/month with 5,000 minutes (₹4/min extra); Growth ₹50K/month with 15,000 minutes and CRM integration (₹3/min extra); Enterprise custom from ₹2/min with dedicated infrastructure, custom integrations and SLA",
    `- Book a demo: ${url("/voiceiq#demo")}`,
    "",
    "### Frequently asked questions: VoiceIQ",
    "",
    faqBlock(voiceiqFaqs).replace(/^### /gm, "#### "),
    "",
    "# Contact",
    "",
    `- Business enquiries: Info@yantranshVT.com or ${url("/#contact")}`,
    `- Careers: HR@yantranshVT.com or ${url("/#careers")}`,
    `- Offices: ${company.locations.map((l) => `${l.city}, ${l.country}`).join("; ")}`,
    "",
  ].join("\n");
}
