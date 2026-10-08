import { SITE_URL } from "../lib/site-routes";

/*
 * Search engines and AI assistants are explicitly welcome. Each AI crawler is
 * listed by name so the policy is unambiguous and easy to change per bot:
 * to opt out of model training, change the "Training" agents to `disallow: "/"`
 * (search and answer visibility come from the other agents).
 */
const AI_AGENTS = {
  search: [
    "OAI-SearchBot", // ChatGPT search
    "ChatGPT-User", // ChatGPT browsing on a user's request
    "Claude-SearchBot", // Claude search index
    "Claude-User", // Claude fetching on a user's request
    "PerplexityBot", // Perplexity search
    "Perplexity-User",
    "Googlebot", // Google Search, AI Overviews and AI Mode
    "Bingbot", // Bing, Microsoft Copilot (and partners)
    "DuckAssistBot",
    "Applebot", // Siri / Spotlight / Apple Intelligence answers
    "MistralAI-User",
  ],
  training: [
    "GPTBot", // OpenAI model training
    "ClaudeBot", // Anthropic model training
    "Google-Extended", // Gemini apps and grounding
    "Applebot-Extended", // Apple foundation models
    "CCBot", // Common Crawl, used by many open models
    "Meta-ExternalAgent",
    "Amazonbot",
  ],
};

export default function robots() {
  const policy = { allow: "/", disallow: ["/api/"] };
  return {
    rules: [
      { userAgent: "*", ...policy },
      { userAgent: [...AI_AGENTS.search, ...AI_AGENTS.training], ...policy },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
