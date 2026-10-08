import "server-only";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

/**
 * Small in-memory limiter: at most 5 sent submissions per form per IP every 10 minutes
 * (checked after validation and the captcha, so typos never lock anyone out).
 * It applies per server instance, which suits the single Node.js deployment.
 */
export function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_REQUESTS;
}

export const clientIp = (request: Request) =>
  request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
