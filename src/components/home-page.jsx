"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { T, EMAILS, formUi, W, Icon, getCircularImageStyles, getCircularImageBackgroundStyles, getCircularImageInnerStyles } from "../theme";
import { Rv, useInView } from "./reveal";
import { Captcha, Honeypot } from "./captcha";
import { getImage } from "../lib/images";
import { isRouteHref, toHref } from "../lib/links";
import contentData from "../data/content.json";
import FaqSection from "./faq-section";

/* ═══════════════ CONTENT ═══════════════ */
const C = {
  heroSlides: contentData.heroSlides.map((slide) => ({
    h: slide.headline,
    p: slide.description,
    cta: slide.cta?.label,
    href: toHref(slide.cta?.href),
    img: getImage(slide.img),
  })),
  industries: contentData.verticals.map((v) => ({ name: v.sectionLabel, img: getImage(v.img) })),
  services: contentData.services.map((svc) => ({
    title: svc.sectionLabel,
    desc: svc.description,
    icon: svc.icon,
    img: getImage(svc.img),
    href: svc.id ? `/services/${svc.id}` : "#contact",
  })),
  platforms: contentData.platforms.map((pl) => ({
    name: pl.name || pl.title || "Platform",
    desc: pl.desc || pl.description || "",
    features: pl.features || [],
    img: getImage(pl.img),
  })),
  metrics: contentData.metrics.stats,
  leadership: contentData.leadership.map((leader) => ({ ...leader, img: getImage(leader.img) })),
  partners: contentData.partners.logos,
  about: {
    mission: contentData.about.mission?.text ?? contentData.about.mission,
    vision: contentData.about.vision?.text ?? contentData.about.vision,
    img: getImage(contentData.about.img),
  },
};
C.heroTabs = C.heroSlides.map((s) => s.h.split(" ").slice(0, 3).join(" "));

const SmartLink = ({ href, ...props }) => (isRouteHref(href) ? <Link href={href} {...props} /> : <a href={href} {...props} />);

/* Scrolls to the homepage section addressed by the URL hash (e.g. #platforms/agentic-ai). */
const useHashSectionScroll = () => {
  useEffect(() => {
    const scrollToHash = () => {
      let id = window.location.hash.slice(1);
      if (!id || id.startsWith("/")) return;
      if (/^platforms\/(agentic-ai|data-modernization|predictive-analytics)$/.test(id)) id = "platforms";
      if (/^company\/(about-us|leadership|partners)$/.test(id)) id = "company";
      const el = document.getElementById(id);
      if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
    };
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);
};

const Hero = () => {
  const [a, setA] = useState(0);
  const sl = C.heroSlides;
  useEffect(() => { const t = setInterval(() => setA(p => (p + 1) % sl.length), 5500); return () => clearInterval(t); }, [sl.length]);
  return (
    <section style={{ position: "relative", overflow: "hidden", background: T.navy }}>
      {/* Background image */}
      {sl.map((s, i) => (
        <div key={i} style={{ position: "absolute", inset: 0, backgroundImage: `url(${s.img})`, backgroundSize: "cover", backgroundPosition: "center", opacity: a === i ? 1 : 0, transition: "opacity 1.2s ease", zIndex: 0 }} />
      ))}
      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(11,29,58,0.88) 0%, rgba(11,29,58,0.65) 50%, rgba(11,29,58,0.4) 100%)", zIndex: 1 }} />

      <W style={{ position: "relative", zIndex: 2, paddingTop: 140, paddingBottom: 80, minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ maxWidth: 680 }} key={a}>
          <h1 style={{ fontFamily: T.fd, fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 700, color: T.white, lineHeight: 1.25, margin: "0 0 20px", opacity: 0, animation: "fadeUp 0.6s ease 0.1s forwards" }}>{sl[a].h}</h1>
          <p style={{ fontFamily: T.fn, fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: 520, margin: "0 0 28px", opacity: 0, animation: "fadeUp 0.6s ease 0.25s forwards" }}>{sl[a].p}</p>
          <SmartLink href={sl[a].href} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 26px", background: T.white, color: T.navy, fontFamily: T.fn, fontSize: 14, fontWeight: 700, borderRadius: T.r, textDecoration: "none", opacity: 0, animation: "fadeUp 0.6s ease 0.4s forwards" }}>{sl[a].cta} <Icon name="arrow" size={15} /></SmartLink>
        </div>
      </W>
      <div style={{ position: "relative", zIndex: 3, background: "rgba(11,29,58,0.8)", backdropFilter: "blur(8px)" }}>
        <W style={{ display: "flex" }}>
          {C.heroTabs.map((t, i) => (
            <button key={i} onClick={() => setA(i)} style={{ flex: 1, padding: "16px 12px", background: "transparent", border: "none", borderBottom: a === i ? "3px solid #fff" : "3px solid transparent", cursor: "pointer", transition: "all 0.3s" }}>
              <span style={{ fontFamily: T.fn, fontSize: 14, fontWeight: 700, color: a === i ? T.white : "rgba(255,255,255,0.5)", letterSpacing: 0.3 }}>{t}</span>
            </button>
          ))}
        </W>
      </div>
    </section>
  );
};

const Industries = () => {
  const [hov, setHov] = useState(null);
  return (
    <section id="industries" style={{ padding: "70px 0 60px", background: T.white }}>
      <W>
        <Rv><h2 style={{ fontFamily: T.fd, fontSize: 36, fontWeight: 700, color: T.navy, marginBottom: 40 }}>Industries</h2></Rv>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 0 }}>
          {C.industries.map((ind, i) => (
            <Rv key={i} d={i * 0.06}>
              <div
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{
                  cursor: "pointer",
                  overflow: "hidden",
                  borderRadius: T.r,
                  position: "relative",
                  height: 220,
                  transition: "transform 0.3s",
                  transform: hov === i ? "translateY(-4px)" : "none",
                  boxShadow: hov === i ? "0 12px 32px rgba(0,0,0,0.12)" : "0 2px 8px rgba(0,0,0,0.06)",
                  margin: "0 8px",
                }}
              >
                <img src={ind.img} alt={ind.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(11,29,58,0.85) 100%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 18px" }}>
                  <h3 style={{ fontFamily: T.fn, fontSize: 16, fontWeight: 700, color: T.white }}>{ind.name}</h3>
                </div>
              </div>
            </Rv>
          ))}
        </div>
      </W>
    </section>
  );
};

const Services = () => {
  const [open, setOpen] = useState(0);
  return (
    <section id="services" style={{ padding: "70px 0 80px", background: T.bgAlt }}>
      <W>
        <Rv><h2 style={{ fontFamily: T.fd, fontSize: 36, fontWeight: 700, color: T.navy, marginBottom: 8 }}>Services</h2></Rv>
        <Rv d={0.06}><p style={{ fontFamily: T.fn, fontSize: 15, color: T.txtS, lineHeight: 1.7, maxWidth: 560, marginBottom: 36 }}>Our integrated AI, data and digital services connect strategy and execution to bring the best from digital natives.</p></Rv>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", gap: 40, alignItems: "start" }}>
          {/* Accordion */}
          <div>
            {C.services.map((svc, i) => (
              <Rv key={i} d={i * 0.05}>
                <div style={{ borderBottom: `1px solid ${T.bdr}` }}>
                  <button
                    type="button"
                    aria-expanded={open === i}
                    aria-controls={`service-details-${i}`}
                    onClick={() => setOpen(open === i ? -1 : i)}
                    style={{ width: "100%", padding: "18px 0", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: open === i ? T.blue : T.white, border: `1px solid ${open === i ? T.blue : T.bdr}`, display: "flex", alignItems: "center", justifyContent: "center", color: open === i ? T.white : T.blue, transition: "all 0.3s", flexShrink: 0 }}><Icon name={svc.icon} size={18} /></div>
                      <span style={{ fontFamily: T.fn, fontSize: 17, fontWeight: 700, color: open === i ? T.blue : T.navy, textAlign: "left", transition: "color 0.3s" }}>{svc.title}</span>
                    </div>
                    <div style={{ transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.3s", color: T.txtS, flexShrink: 0 }}><Icon name="chevDown" size={18} /></div>
                  </button>
                  <div id={`service-details-${i}`} style={{ maxHeight: open === i ? 140 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                    <div style={{ padding: "0 0 18px 54px" }}>
                      <p style={{ fontFamily: T.fn, fontSize: 14, color: T.txtS, lineHeight: 1.7 }}>{svc.desc}</p>
                      <Link href={svc.href} style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10, fontFamily: T.fn, fontSize: 13, fontWeight: 700, color: T.blue, textDecoration: "none" }}>Learn More <Icon name="arrow" size={13} /></Link>
                    </div>
                  </div>
                </div>
              </Rv>
            ))}
          </div>
          {/* Image that changes with active service */}
          <Rv d={0.15}>
            <div style={{ borderRadius: T.r, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.1)", position: "relative" }}>
              <img src={C.services[Math.max(0, open)].img} alt="" style={{ width: "100%", height: 340, objectFit: "cover", display: "block", transition: "opacity 0.4s" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "40px 24px 20px", background: "linear-gradient(transparent, rgba(11,29,58,0.7))" }}>
                <span style={{ fontFamily: T.fn, fontSize: 15, fontWeight: 700, color: T.white }}>{C.services[Math.max(0, open)].title}</span>
              </div>
            </div>
          </Rv>
        </div>
        </W>
      </section>
  );
};

const Platforms = () => {
  const [tab, setTab] = useState(0);
  const p = C.platforms[tab];

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#platforms/agentic-ai") setTab(0);
    else if (hash === "#platforms/data-modernization") setTab(1);
    else if (hash === "#platforms/predictive-analytics") setTab(2);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#platforms/agentic-ai") setTab(0);
      else if (hash === "#platforms/data-modernization") setTab(1);
      else if (hash === "#platforms/predictive-analytics") setTab(2);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  return (
    <section id="platforms" style={{ padding: "70px 0 80px", background: T.white }}>
      <W>
        <Rv><h2 style={{ fontFamily: T.fd, fontSize: 36, fontWeight: 700, color: T.navy, marginBottom: 8 }}>Platforms</h2></Rv>
        <Rv d={0.06}><p style={{ fontFamily: T.fn, fontSize: 15, color: T.txtS, lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>Our AI & Data platform offerings deliver impact on key business KPIs for enterprises to leverage opportunities and accelerate Digital Transformation.</p></Rv>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: `2px solid ${T.bdr}`, marginBottom: 36 }}>
          {C.platforms.map((pl, i) => (
            <button key={i} onClick={() => setTab(i)} style={{ padding: "12px 20px", background: "transparent", border: "none", borderBottom: tab === i ? `3px solid ${T.blue}` : "3px solid transparent", cursor: "pointer", marginBottom: -2, transition: "all 0.3s" }}>
              <span style={{ fontFamily: T.fn, fontSize: 14, fontWeight: 700, color: tab === i ? T.blue : T.txtS }}>{pl.name}</span>
            </button>
          ))}
        </div>
        {/* Content */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: 40, alignItems: "center" }}>
          <Rv key={tab}>
            <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.1)", border: `1px solid ${T.bdr}` }}>
              <img src={p.img} alt={p.name} style={{ width: "100%", height: 320, objectFit: "cover", display: "block" }} />
            </div>
          </Rv>
          <Rv key={`t${tab}`} d={0.1}>
            <h3 style={{ fontFamily: T.fd, fontSize: 26, fontWeight: 700, color: T.navy, marginBottom: 14 }}>{p.name}</h3>
            <p style={{ fontFamily: T.fn, fontSize: 15, color: T.txtS, lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {p.features.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ color: T.blue, flexShrink: 0 }}><Icon name="check" size={16} /></div>
                  <span style={{ fontFamily: T.fn, fontSize: 14, color: T.txt }}>{f}</span>
                </div>
              ))}
            </div>
            <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 20, fontFamily: T.fn, fontSize: 14, fontWeight: 700, color: T.blue, textDecoration: "none" }}>Learn More <Icon name="arrow" size={14} /></a>
          </Rv>
        </div>
        </W>
      </section>
  );
};

/* ═══════════════ METRICS ═══════════════ */
const CountUp = ({ value, go }) => { const [c, setC] = useState(0); const n = parseInt(value.replace(/[^0-9]/g, "")); const sfx = value.replace(/[0-9]/g, ""); const ok = /^\d+[%+]?$/.test(value); useEffect(() => { if (!go || !ok) return; let i = 0; const s = 1600 / Math.max(n, 1); const t = setInterval(() => { i++; setC(i); if (i >= n) clearInterval(t); }, s); return () => clearInterval(t); }, [go, n, ok]); return <>{ok ? `${c}${sfx}` : value}</>; };
const MetricsBar = () => { const [r, v] = useInView(); return (
  <section ref={r} style={{ background: T.navy }}>
    <W style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
      {C.metrics.map((m, i) => (
        <div key={i} style={{ padding: "44px 16px", textAlign: "center", borderRight: i < C.metrics.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
          <div style={{ fontFamily: T.fd, fontSize: 44, fontWeight: 700, color: T.white, lineHeight: 1 }}><CountUp value={m.value} go={v} /></div>
          <div style={{ fontFamily: T.fn, fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 6, fontWeight: 500 }}>{m.label}</div>
        </div>
      ))}
    </W>
  </section>
); };

const Company = () => {
  const [tab, setTab] = useState(0);
  const [focusIdx, setFocusIdx] = useState(0);
  const leaders = C.leadership;

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#company/about-us") setTab(0);
    else if (hash === "#company/leadership") setTab(1);
    else if (hash === "#company/partners") setTab(2);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#company/about-us") setTab(0);
      else if (hash === "#company/leadership") setTab(1);
      else if (hash === "#company/partners") setTab(2);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const nextLead = () => {
    setFocusIdx((focusIdx + 1) % leaders.length);
  };

  const prevLead = () => {
    setFocusIdx((focusIdx - 1 + leaders.length) % leaders.length);
  };

  const tabs = [
    { name: "About Us", id: "about" },
    { name: "Leadership", id: "leadership" },
    { name: "Partners", id: "partners" }
  ];

  return (
    <section id="company" style={{ padding: "70px 0 80px", background: T.bgAlt }}>
      <W>
        <Rv><h2 style={{ fontFamily: T.fd, fontSize: 36, fontWeight: 700, color: T.navy, marginBottom: 8 }}>Company</h2></Rv>
        <Rv d={0.06}><p style={{ fontFamily: T.fn, fontSize: 15, color: T.txtS, lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>Learn more about our mission, leadership team, and strategic partnerships.</p></Rv>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: `2px solid ${T.bdr}`, marginBottom: 36 }}>
          {tabs.map((t, i) => (
            <button key={i} onClick={() => setTab(i)} style={{ padding: "12px 24px", background: "transparent", border: "none", borderBottom: tab === i ? `3px solid ${T.blue}` : "3px solid transparent", cursor: "pointer", marginBottom: -2, transition: "all 0.3s" }}>
              <span style={{ fontFamily: T.fn, fontSize: 15, fontWeight: 700, color: tab === i ? T.blue : T.txtS }}>{t.name}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: 40, alignItems: "center" }}>
            <Rv>
              <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,0.1)" }}>
                <img src={C.about.img} alt="About" style={{ width: "100%", height: 360, objectFit: "cover", display: "block" }} />
              </div>
            </Rv>
            <div>
              <Rv><h2 style={{ fontFamily: T.fd, fontSize: 36, fontWeight: 700, color: T.navy, marginBottom: 24 }}>Who We Are</h2></Rv>
              <Rv d={0.08}>
                <div style={{ padding: "24px 0", borderBottom: `1px solid ${T.bdr}` }}>
                  <h3 style={{ fontFamily: T.fn, fontSize: 16, fontWeight: 700, color: T.blue, marginBottom: 8 }}>Our Mission</h3>
                  <p style={{ fontFamily: T.fn, fontSize: 14, color: T.txtS, lineHeight: 1.7 }}>{C.about.mission}</p>
                </div>
              </Rv>
              <Rv d={0.14}>
                <div style={{ padding: "24px 0" }}>
                  <h3 style={{ fontFamily: T.fn, fontSize: 16, fontWeight: 700, color: T.blue, marginBottom: 8 }}>Our Vision</h3>
                  <p style={{ fontFamily: T.fn, fontSize: 14, color: T.txtS, lineHeight: 1.7 }}>{C.about.vision}</p>
                </div>
              </Rv>
            </div>
          </div>
        )}

        {tab === 1 && (
          <div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 30 }}>
              {/* Left Arrow */}
              <button onClick={prevLead} style={{  background: "none", border: "none", cursor: "pointer", color: T.blue, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", flexShrink: 0 }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}><Icon name="chevL" size={32} /></button>

              {/* Multiple Circular Images */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, maxWidth: 1000 }}>
                {leaders.map((d, idx) => {
                  const isSelected = idx === focusIdx;
                  return (
                    <Rv key={idx}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", cursor: "pointer" }} onClick={() => setFocusIdx(idx)}>
                        {/* Circular Image Container with Gradient Background */}
                        <div style={getCircularImageStyles(isSelected)} onMouseEnter={e => !isSelected && (e.currentTarget.style.transform = "translateY(-8px)")} onMouseLeave={e => !isSelected && (e.currentTarget.style.transform = "translateY(0)")}>
                          {/* Background Gradient Circle */}
                          <div style={getCircularImageBackgroundStyles(isSelected)} />
                          
                          {/* Inner Image Container */}
                          <div style={getCircularImageInnerStyles(isSelected)}>
                            <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                            {isSelected && <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent)", pointerEvents: "none" }} />}
                          </div>
                        </div>
                        <h4 style={{ fontFamily: T.fn, fontSize: isSelected ? 17 : 15, fontWeight: isSelected ? 800 : 700, color: isSelected ? T.blue : T.navy, marginBottom: 4 }}>{d.name}</h4>
                        <p style={{ fontFamily: T.fn, fontSize: isSelected ? 13 : 12, color: isSelected ? T.blue : T.txtS, fontWeight: isSelected ? 700 : 600, margin: 0 }}>{d.title}</p>
                      </div>
                    </Rv>
                  );
                })}
              </div>

              {/* Right Arrow */}
              <button onClick={nextLead} style={{ background: "none", border: "none", cursor: "pointer", color: T.blue, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", flexShrink: 0 }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}><Icon name="chevR" size={32} /></button>
            </div>

            {/* Quote Section */}
            {leaders.length > 0 && (
              <Rv d={0.15}>
                <div style={{ marginTop: 60, textAlign: "center", maxWidth: 800, margin: "60px auto 0" }}>
                  <div style={{ position: "relative", marginBottom: 30 }}>
                    <div style={{ fontSize: 100, fontFamily: "Georgia, serif", color: T.blue, opacity: 0.1, lineHeight: 0.8, position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)" }}>{"\u201C"}</div>
                    <p style={{ fontFamily: T.fd, fontSize: 18, fontWeight: 400, fontStyle: "italic", color: T.txt, lineHeight: 1.7, position: "relative", zIndex: 1, marginTop: 20 }}>{leaders[focusIdx].quote}</p>
                  </div>
                  <div>
                    <span style={{ fontFamily: T.fn, fontSize: 16, fontWeight: 700, color: T.navy }}>— {leaders[focusIdx].name}</span><br />
                    <span style={{ fontFamily: T.fn, fontSize: 13, color: T.blue, fontWeight: 600 }}>{leaders[focusIdx].title}</span>
                  </div>
                </div>
              </Rv>
            )}
          </div>
        )}

        {tab === 2 && (
          <div>
            <Rv><p style={{ fontFamily: T.fn, fontSize: 15, color: T.txtS, textAlign: "center", maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.7 }}>Our strong technology stack, digital expertise and partnerships with leading technology companies enable us to deliver superior digital experiences.</p></Rv>
            <Rv d={0.1}>
              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 14 }}>
                {C.partners.map((p, i) => (
                  <div key={i} style={{ padding: "14px 28px", background: T.white, borderRadius: T.r, border: `1px solid ${T.bdr}`, fontFamily: T.fn, fontSize: 14, fontWeight: 700, color: T.txtS, whiteSpace: "nowrap", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = T.blue; e.currentTarget.style.color = T.blue; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = T.bdr; e.currentTarget.style.color = T.txtS; }}>{p}</div>
                ))}
              </div>
            </Rv>
          </div>
        )}
      </W>
    </section>
  );
};

/* ═══════════════ CONTACT + CAREERS ═══════════════ */
const Connect = () => {
  const [openSections, setOpenSections] = useState({ contact: false, careers: false });
  const [contact, setContact] = useState({ name: "", email: "", company: "", phone: "", service: "", message: "" });
  const [career, setCareer] = useState({ name: "", email: "", phone: "", role: "", experience: "", profile: "", message: "" });
  const [contactNote, setContactNote] = useState({ tone: "", text: "" });
  const [careerNote, setCareerNote] = useState({ tone: "", text: "" });
  const [sending, setSending] = useState({ contact: false, careers: false });
  const [captcha, setCaptcha] = useState({ contact: "", careers: "" });
  const [trap, setTrap] = useState({ contact: "", careers: "" });
  const [resume, setResume] = useState(null);
  const contactCaptcha = useRef(null);
  const careerCaptcha = useRef(null);
  const resumeInput = useRef(null);

  useEffect(() => {
    const syncOpenSection = () => {
      const hash = window.location.hash;
      if (hash === "#contact" || hash === "#careers") {
        const section = hash.slice(1);
        setOpenSections(prev => ({ ...prev, [section]: true }));
      }
    };

    syncOpenSection();
    window.addEventListener("hashchange", syncOpenSection);
    return () => window.removeEventListener("hashchange", syncOpenSection);
  }, []);

  const updateContact = (key, value) => {
    setContact(prev => ({ ...prev, [key]: value }));
    if (contactNote.text) setContactNote({ tone: "", text: "" });
  };

  const updateCareer = (key, value) => {
    setCareer(prev => ({ ...prev, [key]: value }));
    if (careerNote.text) setCareerNote({ tone: "", text: "" });
  };

  const submitForm = async (url, init) => {
    const res = await fetch(url, { method: "POST", ...init });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    if (![contact.name, contact.email, contact.company, contact.message].every(value => value.trim())) {
      setContactNote({ tone: "error", text: "Please add your name, email, company, and message before submitting." });
      return;
    }
    if (!captcha.contact) {
      setContactNote({ tone: "error", text: "Please complete the security check before submitting." });
      return;
    }

    setSending(prev => ({ ...prev, contact: true }));
    try {
      await submitForm("/api/contact", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, website: trap.contact, captchaToken: captcha.contact }),
      });
      setContact({ name: "", email: "", company: "", phone: "", service: "", message: "" });
      setContactNote({ tone: "success", text: "Thank you! Your message has been sent to our team and we'll get back to you shortly." });
    } catch (err) {
      setContactNote({ tone: "error", text: err.message });
    } finally {
      setSending(prev => ({ ...prev, contact: false }));
      contactCaptcha.current?.reset();
    }
  };

  const handleResume = (file) => {
    if (careerNote.text) setCareerNote({ tone: "", text: "" });
    if (file && (!/\.(pdf|docx?)$/i.test(file.name) || file.size > 5 * 1024 * 1024)) {
      setResume(null);
      if (resumeInput.current) resumeInput.current.value = "";
      setCareerNote({ tone: "error", text: "Please choose a PDF, DOC or DOCX file of 5 MB or less." });
      return;
    }
    setResume(file || null);
  };

  const handleCareerSubmit = async (e) => {
    e.preventDefault();

    if (![career.name, career.email, career.role].every(value => value.trim())) {
      setCareerNote({ tone: "error", text: "Please add your name, email, and role of interest before submitting." });
      return;
    }
    if (!captcha.careers) {
      setCareerNote({ tone: "error", text: "Please complete the security check before submitting." });
      return;
    }

    const body = new FormData();
    Object.entries(career).forEach(([key, value]) => body.append(key, value));
    if (resume) body.append("resume", resume);
    body.append("website", trap.careers);
    body.append("captchaToken", captcha.careers);

    setSending(prev => ({ ...prev, careers: true }));
    try {
      await submitForm("/api/careers", { body });
      setCareer({ name: "", email: "", phone: "", role: "", experience: "", profile: "", message: "" });
      setResume(null);
      if (resumeInput.current) resumeInput.current.value = "";
      setCareerNote({ tone: "success", text: "Thank you! Your application has been sent to our HR team." });
    } catch (err) {
      setCareerNote({ tone: "error", text: err.message });
    } finally {
      setSending(prev => ({ ...prev, careers: false }));
      careerCaptcha.current?.reset();
    }
  };

  const noteStyle = (tone) => ({
    marginTop: 14,
    fontFamily: T.fn,
    fontSize: 13,
    lineHeight: 1.6,
    color: tone === "error" ? "#B42318" : "#166534",
  });

  const toggleSection = (section) => {
    const nextOpen = !openSections[section];
    setOpenSections(prev => ({ ...prev, [section]: nextOpen }));

    if (nextOpen) {
      if (window.location.hash !== `#${section}`) {
        window.history.pushState(null, "", `#${section}`);
      }
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <section id="contact" style={{ padding: "70px 0 82px", background: T.navy, scrollMarginTop: 88 }}>
        <W>
          <Rv>
            <div style={{ maxWidth: 820, marginBottom: 30 }}>
              <h2 style={{ fontFamily: T.fd, fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: T.white, marginBottom: 12 }}>
                Contact
              </h2>
              <p style={{ fontFamily: T.fn, fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.75 }}>
                Reach out for business inquiries, partnerships, and project discussions. The form stays hidden until you choose to open it.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                <button
                  type="button"
                  onClick={() => toggleSection("contact")}
                  style={{
                    padding: "12px 22px",
                    borderRadius: 999,
                    border: `1px solid ${openSections.contact ? T.white : "rgba(255,255,255,0.35)"}`,
                    background: openSections.contact ? T.white : "transparent",
                    color: openSections.contact ? T.navy : T.white,
                    fontFamily: T.fn,
                    fontSize: 14,
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  {!openSections.contact ? "Contact Form" : "Contact Form"}
                </button>
              </div>
            </div>
          </Rv>
          {openSections.contact && (
            <Rv d={0.08}>
              <div style={{ ...formUi.card, maxWidth: 860, margin: "0 auto" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                  <div>
                    <span style={{ display: "inline-block", padding: "6px 10px", background: T.bgAlt, borderRadius: 999, color: T.blue, fontFamily: T.fn, fontSize: 11, fontWeight: 800, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 12 }}>Contact Form</span>
                    <h3 style={{ fontFamily: T.fd, fontSize: 28, fontWeight: 700, color: T.navy, marginBottom: 8 }}>Business inquiries</h3>
                    <p style={{ fontFamily: T.fn, fontSize: 14, color: T.txtS, lineHeight: 1.7, maxWidth: 460 }}>
                      Reach the YantranshVT team for solution discussions, partnerships, and project conversations.
                    </p>
                  </div>
                  <a href={`mailto:${EMAILS.contact}`} style={{ fontFamily: T.fn, fontSize: 13, fontWeight: 700, color: T.blue, textDecoration: "none" }}>{EMAILS.contact}</a>
                </div>
                <form onSubmit={handleContactSubmit} style={{ position: "relative" }}>
                  <Honeypot value={trap.contact} onChange={v => setTrap(prev => ({ ...prev, contact: v }))} />
                  <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={formUi.label} htmlFor="contact-name">Full Name</label>
                      <input id="contact-name" type="text" required value={contact.name} onChange={e => updateContact("name", e.target.value)} style={formUi.input} />
                    </div>
                    <div>
                      <label style={formUi.label} htmlFor="contact-email">Email</label>
                      <input id="contact-email" type="email" required value={contact.email} onChange={e => updateContact("email", e.target.value)} style={formUi.input} />
                    </div>
                    <div>
                      <label style={formUi.label} htmlFor="contact-company">Company</label>
                      <input id="contact-company" type="text" required value={contact.company} onChange={e => updateContact("company", e.target.value)} style={formUi.input} />
                    </div>
                    <div>
                      <label style={formUi.label} htmlFor="contact-phone">Phone</label>
                      <input id="contact-phone" type="tel" value={contact.phone} onChange={e => updateContact("phone", e.target.value)} style={formUi.input} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label style={formUi.label} htmlFor="contact-service">Service of Interest</label>
                    <input id="contact-service" type="text" value={contact.service} onChange={e => updateContact("service", e.target.value)} style={formUi.input} />
                  </div>
                  <div>
                    <label style={formUi.label} htmlFor="contact-message">How Can We Help?</label>
                    <textarea id="contact-message" required value={contact.message} onChange={e => updateContact("message", e.target.value)} style={formUi.textarea} />
                  </div>
                  <Captcha ref={contactCaptcha} onToken={token => setCaptcha(prev => ({ ...prev, contact: token }))} style={{ marginTop: 18 }} />
                  <button type="submit" disabled={sending.contact} style={{ marginTop: 18, padding: "13px 22px", background: T.blue, color: T.white, border: "none", borderRadius: T.r, fontFamily: T.fn, fontSize: 14, fontWeight: 700, cursor: sending.contact ? "wait" : "pointer", opacity: sending.contact ? 0.7 : 1, display: "inline-flex", alignItems: "center", gap: 8 }}>
                    {sending.contact ? "Sending..." : "Email Info Team"} <Icon name="arrow" size={15} />
                  </button>
                  <p style={contactNote.text ? noteStyle(contactNote.tone) : { marginTop: 14, fontFamily: T.fn, fontSize: 13, lineHeight: 1.6, color: T.txtS }}>
                    {contactNote.text || `Prefer email? Write to us directly at ${EMAILS.contact}.`}
                  </p>
                </form>
              </div>
            </Rv>
          )}
        </W>
      </section>
      <section id="careers" style={{ padding: "70px 0 82px", background: T.bgAlt, scrollMarginTop: 88 }}>
        <W>
          <Rv>
            <div style={{ maxWidth: 820, marginBottom: 30 }}>
              <h2 style={{ fontFamily: T.fd, fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: T.navy, marginBottom: 12 }}>
                Careers
              </h2>
              <p style={{ fontFamily: T.fn, fontSize: 15, color: T.txtS, lineHeight: 1.75 }}>
                Explore opportunities with YantranshVT and share your profile with our HR team. The form stays hidden until you choose to open it.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                <button
                  type="button"
                  onClick={() => toggleSection("careers")}
                  style={{
                    padding: "12px 22px",
                    borderRadius: 999,
                    border: `1px solid ${openSections.careers ? T.blue : T.bdr}`,
                    background: openSections.careers ? T.blue : "transparent",
                    color: openSections.careers ? T.white : T.navy,
                    fontFamily: T.fn,
                    fontSize: 14,
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  {openSections.careers ? "Careers Form" : "Careers Form"}
                </button>
              </div>
            </div>
          </Rv>
          {openSections.careers && (
            <Rv d={0.08}>
              <div style={{ ...formUi.card, maxWidth: 860, margin: "0 auto" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                  <div>
                    <span style={{ display: "inline-block", padding: "6px 10px", background: T.bgAlt, borderRadius: 999, color: T.blue, fontFamily: T.fn, fontSize: 11, fontWeight: 800, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 12 }}>Careers Form</span>
                    <h3 style={{ fontFamily: T.fd, fontSize: 28, fontWeight: 700, color: T.navy, marginBottom: 8 }}>Join our team</h3>
                    <p style={{ fontFamily: T.fn, fontSize: 14, color: T.txtS, lineHeight: 1.7, maxWidth: 520 }}>
                      Share the role you are interested in, your experience, and your profile link. You can also attach your resume (PDF or Word, up to 5 MB).
                    </p>
                  </div>
                  <a href={`mailto:${EMAILS.careers}`} style={{ fontFamily: T.fn, fontSize: 13, fontWeight: 700, color: T.blue, textDecoration: "none" }}>{EMAILS.careers}</a>
                </div>
                <form onSubmit={handleCareerSubmit} style={{ position: "relative" }}>
                  <Honeypot value={trap.careers} onChange={v => setTrap(prev => ({ ...prev, careers: v }))} />
                  <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={formUi.label} htmlFor="career-name">Full Name</label>
                      <input id="career-name" type="text" required value={career.name} onChange={e => updateCareer("name", e.target.value)} style={formUi.input} />
                    </div>
                    <div>
                      <label style={formUi.label} htmlFor="career-email">Email</label>
                      <input id="career-email" type="email" required value={career.email} onChange={e => updateCareer("email", e.target.value)} style={formUi.input} />
                    </div>
                    <div>
                      <label style={formUi.label} htmlFor="career-phone">Phone</label>
                      <input id="career-phone" type="tel" value={career.phone} onChange={e => updateCareer("phone", e.target.value)} style={formUi.input} />
                    </div>
                    <div>
                      <label style={formUi.label} htmlFor="career-role">Role of Interest</label>
                      <input id="career-role" type="text" required value={career.role} onChange={e => updateCareer("role", e.target.value)} style={formUi.input} />
                    </div>
                  </div>
                  <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={formUi.label} htmlFor="career-experience">Experience</label>
                      <input id="career-experience" type="text" value={career.experience} onChange={e => updateCareer("experience", e.target.value)} style={formUi.input} />
                    </div>
                    <div>
                      <label style={formUi.label} htmlFor="career-profile">Resume or LinkedIn URL</label>
                      <input id="career-profile" type="url" value={career.profile} onChange={e => updateCareer("profile", e.target.value)} style={formUi.input} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label style={formUi.label} htmlFor="career-resume">Resume (PDF, DOC or DOCX, max 5 MB)</label>
                    <input id="career-resume" ref={resumeInput} type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={e => handleResume(e.target.files?.[0])} style={formUi.input} />
                  </div>
                  <div>
                    <label style={formUi.label} htmlFor="career-message">Message</label>
                    <textarea id="career-message" value={career.message} onChange={e => updateCareer("message", e.target.value)} style={formUi.textarea} />
                  </div>
                  <Captcha ref={careerCaptcha} onToken={token => setCaptcha(prev => ({ ...prev, careers: token }))} style={{ marginTop: 18 }} />
                  <button type="submit" disabled={sending.careers} style={{ marginTop: 18, padding: "13px 22px", background: T.blue, color: T.white, border: "none", borderRadius: T.r, fontFamily: T.fn, fontSize: 14, fontWeight: 700, cursor: sending.careers ? "wait" : "pointer", opacity: sending.careers ? 0.7 : 1, display: "inline-flex", alignItems: "center", gap: 8 }}>
                    {sending.careers ? "Sending..." : "Email HR Team"} <Icon name="arrow" size={15} />
                  </button>
                  <p style={careerNote.text ? noteStyle(careerNote.tone) : { marginTop: 14, fontFamily: T.fn, fontSize: 13, lineHeight: 1.6, color: T.txtS }}>
                    {careerNote.text || `Prefer email? Send your profile directly to ${EMAILS.careers}.`}
                  </p>
                </form>
              </div>
            </Rv>
          )}
        </W>
      </section>
    </>
  );
};

export function HomePage({ faqs = [] }) {
  useHashSectionScroll();
  return (
  <>
    <Hero />
    <Industries />
    <Services />
    <Platforms />
    <MetricsBar />
    <Company />
    <FaqSection faqs={faqs} intro="Quick answers about YantranshVT, our services, platforms and how to work with us." />
    <Connect />
  </>
  );
}
