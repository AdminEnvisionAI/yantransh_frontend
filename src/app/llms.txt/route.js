import { llmsTxt } from "../../lib/llms";

export const dynamic = "force-static";

/** llms.txt: a concise, link-rich site guide for AI answer engines (https://llmstxt.org). */
export function GET() {
  return new Response(llmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
