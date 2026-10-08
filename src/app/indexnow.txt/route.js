/**
 * IndexNow key file (https://www.indexnow.org). Bing, Yandex, Seznam and Naver
 * use IndexNow to re-crawl changed pages within minutes; Bing's index also
 * feeds Microsoft Copilot and other AI assistants. Set INDEXNOW_KEY to enable.
 */
export function GET() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) return new Response("Not found", { status: 404 });
  return new Response(key, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
