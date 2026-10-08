"use client";

import Link from "next/link";
import { T, Icon } from "../theme";
import { isRouteHref, toHref } from "../lib/links";
import contentData from "../data/content.json";

const legalLinks = [
  { label: "Disclaimer", href: "/legal/disclaimer" },
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms of Use", href: "/legal/terms-of-use" },
  { label: "Cookies Policy", href: "/legal/cookies-policy" },
];

const FooterLink = ({ href, ...props }) => (isRouteHref(href) ? <Link href={href} {...props} /> : <a href={href} {...props} />);

/** Full site footer shown on the homepage and product pages. */
export default function SiteFooter() {
  const columns = contentData.footer?.columns || [];

  return (
    <footer style={{ padding: "44px 0 20px", background: "#060E1A" }}>
      <div style={{ maxWidth: T.mw, margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
        <div className="fg" style={{ display: "grid", gap: 32, marginBottom: 32 }}>
          <div>
            <Link href="/" style={{ fontFamily: T.fn, fontWeight: 800, fontSize: 18, color: T.white, textDecoration: "none" }}><span style={{ color: T.blueA }}>Y</span>antransh<span style={{ color: T.blueA }}>VT</span></Link>
            <p style={{ fontFamily: T.fn, fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 10, lineHeight: 1.6, maxWidth: 200 }}>{contentData.company.tagline}</p>
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              {["linkedin", "twitter"].map((ic) => (
                <a key={ic} href={contentData.company.social?.[ic] || "#"} {...(contentData.company.social?.[ic] ? { target: "_blank", rel: "me noopener noreferrer" } : {})} aria-label={ic === "linkedin" ? "YantranshVT on LinkedIn" : "YantranshVT on X (Twitter)"} style={{ color: "rgba(255,255,255,0.35)", display: "inline-flex", transition: "color 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.color = T.white; }} onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}><Icon name={ic} size={16} /></a>
              ))}
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 style={{ fontFamily: T.fn, fontSize: 13, fontWeight: 700, color: T.white, marginBottom: 12 }}>{col.title}</h4>
              {col.links.map((l) => (
                <FooterLink key={l.label} href={toHref(l.href)} style={{ display: "block", fontFamily: T.fn, fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none", padding: "3px 0", transition: "color 0.2s" }}
                  onMouseEnter={(e) => { e.target.style.color = T.white; }} onMouseLeave={(e) => { e.target.style.color = "rgba(255,255,255,0.4)"; }}>{l.label}</FooterLink>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 14, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontFamily: T.fn, fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{"©"} {new Date().getFullYear()} YantranshVT Solutions. All rights reserved.</span>
          <div style={{ display: "flex", gap: 16 }}>
            {legalLinks.map((t) => (
              <Link key={t.label} href={t.href} style={{ fontFamily: T.fn, fontSize: 11, color: "rgba(255,255,255,0.25)", textDecoration: "none" }}
                onMouseEnter={(e) => { e.target.style.color = "rgba(255,255,255,0.6)"; }} onMouseLeave={(e) => { e.target.style.color = "rgba(255,255,255,0.25)"; }}>{t.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
