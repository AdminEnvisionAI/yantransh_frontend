"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { T, Icon } from "../theme";
import { getImage } from "../lib/images";
import { isRouteHref } from "../lib/links";
import contentData from "../data/content.json";

const links = [
  { l: "Industries", subLinks: [
    { label: "Telecom", href: "/industries/telecom" },
    { label: "Banking & Payments", href: "/industries/banking" },
    { label: "Healthcare", href: "/industries/healthcare" },
    { label: "Life Sciences", href: "/industries/lifesciences" },
  ] },
  { l: "Platforms", subLinks: [
    { label: "Agentic AI Platform", href: "/#platforms/agentic-ai" },
    { label: "Data Modernization Suite", href: "/#platforms/data-modernization" },
    { label: "Predictive Analytics Engine", href: "/#platforms/predictive-analytics" },
  ] },
  { l: "Services", subLinks: [
    { label: "Data & AI", href: "/services/data-ai" },
    { label: "Product Engineering", href: "/services/product-engineering" },
    { label: "Cloud & Infrastructure", href: "/services/cloud-infrastructure" },
    { label: "Talent Solutions", href: "/services/talent-solutions" },
  ] },
  { l: "Products", subLinks: [
    { label: "VoiceIQ", href: "/voiceiq" },
  ] },
  { l: "Company", subLinks: [
    { label: "About Us", href: "/#company/about-us" },
    { label: "Leadership", href: "/#company/leadership" },
    { label: "Partners", href: "/#company/partners" },
  ] },
  { l: "Careers", h: "/#careers" },
];

/* Route links use client-side navigation; homepage section links stay plain anchors. */
const NavLink = ({ href, ...props }) => (isRouteHref(href) ? <Link href={href} {...props} /> : <a href={href} {...props} />);

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [mobileSub, setMobileSub] = useState(null);
  const contactHref = pathname === "/voiceiq" ? "#demo" : "/#contact";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setHovered(null);
  }, [pathname]);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${scrolled ? T.bdr : "transparent"}`, transition: "all 0.3s" }}>
      <div style={{ maxWidth: T.mw, margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <img src={getImage(contentData.company.logoImg)} alt={contentData.company.name} style={{ height: 36 }} />
          <span style={{ fontFamily: T.fn, fontWeight: 800, fontSize: 20, color: T.navy }}>
            <span style={{ color: T.blue }}>Y</span>antransh<span style={{ color: T.blue }}>VT</span>
          </span>
        </Link>
        <div className="dn" style={{ display: "flex", gap: 0, alignItems: "center" }}>
          {links.map((lk) => (
            <div key={lk.l} style={{ position: "relative" }} onMouseEnter={() => lk.subLinks && setHovered(lk.l)} onMouseLeave={() => setHovered(null)}>
              <a
                href={lk.subLinks ? "#" : lk.h}
                onClick={(e) => lk.subLinks && e.preventDefault()}
                style={{ padding: "8px 12px", color: T.txt, fontSize: 14, fontFamily: T.fn, textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: 3, transition: "color 0.2s", cursor: "pointer" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = T.blue; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = T.txt; }}
              >
                {lk.l}{lk.subLinks && <Icon name="chevDown" size={12} />}
              </a>
              {lk.subLinks && hovered === lk.l && (
                <div style={{ position: "absolute", top: "100%", left: 0, background: T.white, border: `1px solid ${T.bdr}`, borderRadius: T.r, padding: "6px 0", minWidth: 220, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}>
                  {lk.subLinks.map((item) => (
                    <NavLink
                      key={item.label}
                      href={item.href}
                      onClick={() => setHovered(null)}
                      style={{ display: "block", padding: "8px 18px", color: T.txtS, fontSize: 13, fontFamily: T.fn, textDecoration: "none", fontWeight: 500, transition: "all 0.15s" }}
                      onMouseEnter={(e) => { e.target.style.color = T.blue; e.target.style.background = T.bgAlt; }}
                      onMouseLeave={(e) => { e.target.style.color = T.txtS; e.target.style.background = "transparent"; }}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a href={contactHref} style={{ marginLeft: 8, padding: "8px 20px", background: T.blue, color: T.white, fontFamily: T.fn, fontSize: 13, fontWeight: 700, borderRadius: T.r, textDecoration: "none" }}>Contact Us</a>
        </div>
        <button className="mb" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none", color: T.navy, cursor: "pointer" }}>
          <Icon name={mobileOpen ? "close" : "menu"} size={24} />
        </button>
      </div>
      {mobileOpen && (
        <div style={{ padding: "8px 24px 20px", background: T.white, borderTop: `1px solid ${T.bdr}` }}>
          {links.map((lk) => (
            <div key={lk.l}>
              {lk.subLinks ? (
                <button
                  type="button"
                  aria-expanded={mobileSub === lk.l}
                  onClick={() => setMobileSub(mobileSub === lk.l ? null : lk.l)}
                  style={{ display: "block", width: "100%", padding: "11px 0", color: T.txt, fontFamily: T.fn, fontSize: 15, fontWeight: 600, textAlign: "left", background: "none", border: "none", cursor: "pointer", borderBottom: `1px solid ${T.bdrL}` }}
                >
                  {lk.l}
                </button>
              ) : (
                <a href={lk.h} onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "11px 0", color: T.txt, fontFamily: T.fn, fontSize: 15, fontWeight: 600, textDecoration: "none", borderBottom: `1px solid ${T.bdrL}` }}>{lk.l}</a>
              )}
              {lk.subLinks && mobileSub === lk.l && (
                <div style={{ paddingLeft: 16 }}>
                  {lk.subLinks.map((sub) => (
                    <NavLink key={sub.label} href={sub.href} onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "8px 0", color: T.txtS, fontFamily: T.fn, fontSize: 13, textDecoration: "none" }}>{sub.label}</NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
