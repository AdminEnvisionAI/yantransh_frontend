"use client";

import Link from "next/link";
import { T, W, IC } from "../theme";
import { Rv } from "../components/reveal";
import { getImage } from "../lib/images";
import contentData from "../data/content.json";

/**
 * Shared layout for industry and service pages. The per-page options
 * reproduce the small visual differences between the production pages.
 */
export default function DetailPage({
  contentKey,
  fallbackCategory,
  fallbackTitle,
  accent = "white",
  checkColor = "blue",
  ctaDelay = 0.5,
}) {
  const page = contentData.pages?.[contentKey] || {};
  const img = getImage(page.image);
  const accentColor = T[accent];

  return (
    <div style={{ minHeight: "100vh", background: T.white }}>
      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", background: T.navy, paddingTop: 100 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.7 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(11, 29, 58, 0) 0%, rgba(11, 29, 58, 0.8) 100%)" }} />

        <W style={{ position: "relative", zIndex: 2, paddingTop: 80, paddingBottom: 60 }}>
          <Rv d={0.1}>
            <span style={{ fontFamily: T.fn, fontSize: 13, fontWeight: 600, color: accentColor, letterSpacing: 1, textTransform: "uppercase" }}>{page.category || fallbackCategory}</span>
          </Rv>
          <Rv d={0.15}>
            <h1 style={{ fontFamily: T.fd, fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: T.white, lineHeight: 1.2, margin: "16px 0 20px" }}>{page.title || fallbackTitle}</h1>
          </Rv>
          <Rv d={0.2}>
            <h2 style={{ fontFamily: T.fd, fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 600, color: accentColor, marginBottom: 24 }}>{page.subtitle || ""}</h2>
          </Rv>
          <Rv d={0.25}>
            <p style={{ fontFamily: T.fn, fontSize: 16, color: "rgba(255,255,255,0.8)", lineHeight: 1.8, maxWidth: 720 }}>
              {page.heroDescription || ""}
            </p>
          </Rv>
        </W>
      </section>

      {/* Content */}
      <section style={{ padding: "70px 0", background: T.white }}>
        <W>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40, alignItems: "center", marginBottom: 50 }}>
            <Rv>
              <img src={img} alt={page.title || fallbackTitle} style={{ width: "100%", height: "auto", borderRadius: T.r, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }} />
            </Rv>
            <Rv d={0.1}>
              <p style={{ fontFamily: T.fn, fontSize: 16, color: T.txt, lineHeight: 1.8 }}>
                {page.introText || ""}
              </p>
            </Rv>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {(page.offerings || []).map((offering, i) => (
              <Rv key={i} d={i * 0.08}>
                <div style={{ padding: 28, background: T.bgAlt, borderRadius: T.r, border: `1px solid ${T.bdr}`, height: "100%" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ color: T[checkColor], flexShrink: 0, marginTop: 2 }}>{IC.check}</div>
                    <div>
                      <h3 style={{ fontFamily: T.fn, fontSize: 15, fontWeight: 700, color: T.navy, marginBottom: 8 }}>{offering.title}</h3>
                      <p style={{ fontFamily: T.fn, fontSize: 14, color: T.txtS, lineHeight: 1.7 }}>{offering.description}</p>
                    </div>
                  </div>
                </div>
              </Rv>
            ))}

            {(page.slides || []).map((slide, i) => (
              <Rv key={`slide-${i}`} d={0.3 + i * 0.08}>
                <div style={{ padding: 24, background: T.bgAlt, borderRadius: T.r, border: `1px solid ${T.bdr}`, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  {slide.image && (
                    <div style={{ marginBottom: 16, width: "100%" }}>
                      <img src={getImage(slide.image)} alt={`${fallbackTitle} Slide`} style={{ width: "100%", height: "auto", borderRadius: T.r, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }} />
                    </div>
                  )}
                  {slide.content && (
                    <p style={{ fontFamily: T.fn, fontSize: 14, color: T.txt, lineHeight: 1.7, textAlign: "center", fontWeight: 500 }}>
                      {slide.content}
                    </p>
                  )}
                </div>
              </Rv>
            ))}
          </div>

          <Rv d={ctaDelay}>
            <div style={{ marginTop: 50, padding: 32, background: T.navy, borderRadius: T.r, textAlign: "center" }}>
              <p style={{ fontFamily: T.fn, fontSize: 15, color: "rgba(255,255,255,0.9)", lineHeight: 1.7, marginBottom: 24 }}>
                {page.ctaText || ""}
              </p>
              <Link href="/#contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", background: T.white, color: T.navy, fontFamily: T.fn, fontSize: 14, fontWeight: 700, borderRadius: T.r, textDecoration: "none" }}>
                {page.ctaButton || "Contact Us"} <span style={{ display: "inline-flex" }}>{IC.arrow}</span>
              </Link>
            </div>
          </Rv>
        </W>
      </section>
    </div>
  );
}
