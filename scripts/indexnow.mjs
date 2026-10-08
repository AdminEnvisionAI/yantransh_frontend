#!/usr/bin/env node
/**
 * Submits every URL in the live sitemap to IndexNow after a deployment.
 *
 *   INDEXNOW_KEY=<key> npm run indexnow            # uses https://www.yantranshvt.com
 *   INDEXNOW_KEY=<key> npm run indexnow -- https://staging.example.com
 *
 * The same key must be configured on the server so /indexnow.txt returns it.
 */
const site = (process.argv[2] || "https://www.yantranshvt.com").replace(/\/$/, "");
const key = process.env.INDEXNOW_KEY;
if (!key || !/^[a-zA-Z0-9-]{8,128}$/.test(key)) {
  console.error("Set INDEXNOW_KEY to an 8-128 character key (letters, numbers, dashes).");
  process.exit(1);
}

const keyCheck = await fetch(`${site}/indexnow.txt`);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== key) {
  console.error(`${site}/indexnow.txt does not return the key. Deploy with INDEXNOW_KEY set first.`);
  process.exit(1);
}

const sitemap = await (await fetch(`${site}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => u.startsWith(site) && !/\.(png|jpe?g|webp)$/i.test(u));

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/indexnow.txt`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs, response ${res.status} ${res.statusText}`);
if (res.status >= 400) process.exit(1);
