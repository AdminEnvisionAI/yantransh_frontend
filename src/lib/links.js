const LEGAL_SLUGS = new Set(["disclaimer", "privacy-policy", "terms-of-use", "cookies-policy"]);

/**
 * Converts the hash-based links stored in content.json (inherited from the
 * original single-page React app) into canonical Next.js URLs.
 *
 *   "#/industries/telecom" -> "/industries/telecom"
 *   "#/disclaimer"         -> "/legal/disclaimer"
 *   "#contact"             -> "/#contact"
 */
export function toHref(href) {
  if (!href || href === "#") return "/";
  if (href.startsWith("#/")) {
    const path = href.slice(2);
    return LEGAL_SLUGS.has(path) ? `/legal/${path}` : `/${path}`;
  }
  if (href.startsWith("#")) return `/${href}`;
  return href;
}

/** True for links that point at a different route (not a section of the homepage). */
export const isRouteHref = (href) => href.startsWith("/") && !href.startsWith("/#");
