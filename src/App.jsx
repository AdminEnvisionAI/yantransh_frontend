import { useState, useEffect, useRef } from "react";
import { getImage } from "./lib/images";

import { T, EMAILS, formUi, buildMailto, footerHref, svgProps, getButtonStyles, getCircularImageStyles, getCircularImageBackgroundStyles, getCircularImageInnerStyles } from "./theme";
import contentData from "./data/content.json";

/* ═══════════════ PAGE IMPORTS ═══════════════ */
import Telecom from "./pages/Telecom";
import Banking from "./pages/Banking";
import LifeSciences from "./pages/LifeSciences";
import Healthcare from "./pages/Healthcare";
import DataAI from "./pages/DataAI";
import ProductEngineering from "./pages/ProductEngineering";
import CloudInfrastructure from "./pages/CloudInfrastructure";
import TalentSolutions from "./pages/TalentSolutions";

/* ═══════════════ CONTENT ═══════════════ */
const C = (() => {
  const data = { ...contentData };
  
  // Map images for leadership
  if (data.leadership) {
    data.leadership = data.leadership.map(leader => ({
      ...leader,
      img: getImage(leader.img)
    }));
  }
  
  // Flatten metrics from stats array
  if (data.metrics && data.metrics.stats) {
    data.metrics = data.metrics.stats;
  } else if (data.metrics && !Array.isArray(data.metrics)) {
    data.metrics = [];
  }
  
  // Flatten partners from logos array
  if (data.partners && data.partners.logos) {
    data.partners = data.partners.logos;
  } else if (data.partners && !Array.isArray(data.partners)) {
    data.partners = [];
  }
  
  // Flatten footer columns
  if (data.footer && data.footer.columns) {
    data.footer.cols = data.footer.columns.map(col => ({
      title: col.title,
      links: col.links.map(link => ({ label: link.label, href: link.href }))
    }));
  }
  
  // Ensure heroSlides exists with correct format and map images
  if (!data.heroSlides) {
    data.heroSlides = [];
  } else {
    data.heroSlides = data.heroSlides.map(slide => ({
      h: slide.headline || slide.h,
      p: slide.description || slide.p,
      cta: slide.cta?.label || slide.cta,
      href: slide.cta?.href || slide.href || "#",
      img: getImage(slide.img)
    }));
  }
  
  // Ensure heroTabs exist
  if (!data.heroTabs) {
    data.heroTabs = data.heroSlides.map(s => s.h.split(' ').slice(0, 3).join(' ')) || [];
  }
  
  // Ensure industries exist and map images
  if (!data.industries) {
    data.industries = data.verticals?.map(v => ({
      name: v.sectionLabel,
      img: getImage(v.img)
    })) || [];
  } else {
    data.industries = data.industries.map(ind => ({
      ...ind,
      img: getImage(ind.img)
    }));
  }
  
  // Ensure services exist - flatten from nested items structure
  if (!data.services || (Array.isArray(data.services))) {
    const svcs = Array.isArray(data.services) ? data.services : [];
     data.services = data.services.map(svc => ({
    title: svc.sectionLabel,
    desc: svc.description,
    icon: svc.icon,
    img: getImage(svc.img),
    href: svc.id ? `#/services/${svc.id}` : "#contact"
  }));
  }
  
  // Ensure platforms exist with all required fields and map images
  if (!data.platforms) {
    data.platforms = [];
  } else {
    data.platforms = data.platforms.map(pl => ({
      name: pl.name || pl.title || "Platform",
      desc: pl.desc || pl.description || "",
      features: pl.features || [],
      img: getImage(pl.img)
    }));
  }
  
  // Ensure about section has string values not objects and map images
  if (data.about) {
    if (typeof data.about.mission === 'object' && data.about.mission?.text) {
      data.about.mission = data.about.mission.text;
    }
    if (typeof data.about.vision === 'object' && data.about.vision?.text) {
      data.about.vision = data.about.vision.text;
    }
    data.about.img = getImage(data.about.img);
  }
  
  return data;
})();

/* ═══════════════ ICONS ═══════════════ */
const sp = svgProps;
const IC = {
  brain: <svg viewBox="0 0 24 24" {...sp}><path d="M12 2a5 5 0 0 1 5 5c0 .9-.3 1.7-.7 2.4A5 5 0 0 1 19 14a5 5 0 0 1-3 4.6V22h-2v-3h-4v3h-2v-3.4A5 5 0 0 1 5 14a5 5 0 0 1 2.7-4.6A5 5 0 0 1 7 7a5 5 0 0 1 5-5z"/></svg>,
  code: <svg viewBox="0 0 24 24" {...sp}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  cloud: <svg viewBox="0 0 24 24" {...sp}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
  users: <svg viewBox="0 0 24 24" {...sp}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  arrow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  menu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  close: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  chevDown: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  chevL: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  chevR: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  download: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  twitter: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
};
const Icon = ({ name, size = 22 }) => <span style={{ width: size, height: size, display: "inline-flex", flexShrink: 0 }}>{IC[name]}</span>;

/* ═══════════════ HOOKS ═══════════════ */
function useInView(t = 0.1) { const r = useRef(null); const [v, sv] = useState(false); useEffect(() => { const el = r.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { sv(true); o.disconnect(); } }, { threshold: t }); o.observe(el); return () => o.disconnect(); }, []); return [r, v]; }

/* ═══════════════ SHARED ═══════════════ */
const Rv = ({ children, d = 0, style: s = {} }) => { const [r, v] = useInView(); return <div ref={r} style={{ ...s, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(24px)", transition: `opacity 0.5s ease ${d}s, transform 0.5s ease ${d}s` }}>{children}</div>; };
const W = ({ children, style: s = {} }) => <div style={{ maxWidth: T.mw, margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)", ...s }}>{children}</div>;

/* ═══════════════ NAVBAR ═══════════════ */
const Navbar = ({ isDetailPage }) => {
  const [sc, setSc] = useState(false);
  const [mob, setMob] = useState(false);
  const [sub, setSub] = useState(null);
  const [openMobSub, setOpenMobSub] = useState(null);
  useEffect(() => { const h = () => setSc(window.scrollY > 20); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const links = [
    { l: "Industries", h: "#industries", s: ["Telecom", "Banking & Payments", "Healthcare", "Life Sciences"], subLinks: [
      { label: "Telecom", href: "#/industries/telecom" },
      { label: "Banking & Payments", href: "#/industries/banking" },
      { label: "Healthcare", href: "#/industries/healthcare" },
      { label: "Life Sciences", href: "#/industries/lifesciences" }
    ]},
    { l: "Platforms", h: "#platforms", s: ["Agentic AI Platform", "Data Modernization Suite", "Predictive Analytics Engine"], subLinks: [
      { label: "Agentic AI Platform", href: "#platforms/agentic-ai" },
      { label: "Data Modernization Suite", href: "#platforms/data-modernization" },
      { label: "Predictive Analytics Engine", href: "#platforms/predictive-analytics" }
    ] },
    { l: "Services", h: "#services", s: ["Data & AI", "Product Engineering", "Cloud & Infrastructure", "Talent Solutions"], subLinks: [
      { label: "Data & AI", href: "#/services/data-ai" },
      { label: "Product Engineering", href: "#/services/product-engineering" },
      { label: "Cloud & Infrastructure", href: "#/services/cloud-infrastructure" },
      { label: "Talent Solutions", href: "#/services/talent-solutions" }
    ]},
    { l: "Company", h: "#company", s: ["About Us", "Leadership", "Partners"], subLinks: [
      { label: "About Us", href: "#company/about-us" },
      { label: "Leadership", href: "#company/leadership" },
      { label: "Partners", href: "#company/partners" }
    ]},
    { l: "Careers", h: "#careers" },
    // { l: "Contact", h: "#contact" },
  ];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: sc ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${sc ? T.bdr : "transparent"}`, transition: "all 0.3s" }}>
      <W style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* <a href="#" style={{ fontFamily: T.fn, fontWeight: 800, fontSize: 20, color: T.navy, textDecoration: "none" }}><span style={{ color: T.blue }}>Y</span>antransh<span style={{ color: T.blue }}>VT</span></a> */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
        <img src={getImage(contentData.company.logoImg)} alt={contentData.company.name} style={{ height: 36 }} />
        <span style={{ fontFamily: T.fn, fontWeight: 800, fontSize: 20, color: T.navy }}>
          <span style={{ color: T.blue }}>Y</span>antransh<span style={{ color: T.blue }}>VT</span>
        </span>
      </a>
        <div className="dn" style={{ display: "flex", gap: 0, alignItems: "center" }}>
          {links.map(lk => (
            <div key={lk.l} style={{ position: "relative" }} onMouseEnter={() => lk.s && setSub(lk.l)} onMouseLeave={() => setSub(null)}>
              <a
                href={lk.subLinks ? "#" : lk.h}
                onClick={e => lk.subLinks && e.preventDefault()}
                style={{ padding: "8px 12px", color: T.txt, fontSize: 14, fontFamily: T.fn, textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: 3, transition: "color 0.2s", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.color = T.blue} onMouseLeave={e => e.currentTarget.style.color = T.txt}>
                {lk.l}{lk.s && <Icon name="chevDown" size={12} />}
              </a>
              {lk.s && sub === lk.l && <div style={{ position: "absolute", top: "100%", left: 0, background: T.white, border: `1px solid ${T.bdr}`, borderRadius: T.r, padding: "6px 0", minWidth: 220, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}>
                {(lk.subLinks || lk.s.map(s => ({ label: s, href: lk.h }))).map(item => <a key={item.label} href={item.href} style={{ display: "block", padding: "8px 18px", color: T.txtS, fontSize: 13, fontFamily: T.fn, textDecoration: "none", fontWeight: 500, transition: "all 0.15s" }}
                  onMouseEnter={e => { e.target.style.color = T.blue; e.target.style.background = T.bgAlt; }} onMouseLeave={e => { e.target.style.color = T.txtS; e.target.style.background = "transparent"; }}>{item.label}</a>)}
              </div>}
            </div>
          ))}
          <a href="#contact" style={{ marginLeft: 8, padding: "8px 20px", background: T.blue, color: T.white, fontFamily: T.fn, fontSize: 13, fontWeight: 700, borderRadius: T.r, textDecoration: "none" }}>Contact Us</a>
        </div>
        <button className="mb" onClick={() => setMob(!mob)} style={{ background: "none", border: "none", color: T.navy, cursor: "pointer" }}><Icon name={mob ? "close" : "menu"} size={24} /></button>
      </W>
      {mob && <div style={{ padding: "8px 24px 20px", background: T.white, borderTop: `1px solid ${T.bdr}` }}>
        {links.map(lk => (
          <div key={lk.l}>
            {lk.subLinks ? (
              <button
                type="button"
                onClick={() => setOpenMobSub(openMobSub === lk.l ? null : lk.l)}
                style={{ display: "block", width: "100%", padding: "11px 0", color: T.txt, fontFamily: T.fn, fontSize: 15, fontWeight: 600, textAlign: "left", background: "none", border: "none", cursor: "pointer", borderBottom: `1px solid ${T.bdrL}` }}>
                {lk.l}
              </button>
            ) : (
              <a href={lk.h} onClick={() => setMob(false)} style={{ display: "block", padding: "11px 0", color: T.txt, fontFamily: T.fn, fontSize: 15, fontWeight: 600, textDecoration: "none", borderBottom: `1px solid ${T.bdrL}` }}>{lk.l}</a>
            )}
            {lk.subLinks && openMobSub === lk.l && (
              <div style={{ paddingLeft: 16 }}>
                {lk.subLinks.map(sub => (
                  <a key={sub.label} href={sub.href} onClick={() => setMob(false)} style={{ display: "block", padding: "8px 0", color: T.txtS, fontFamily: T.fn, fontSize: 13, textDecoration: "none" }}>{sub.label}</a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>}
    </nav>
  );
};

const Hero = () => {
  const [a, setA] = useState(0);
  const sl = C.heroSlides;
  useEffect(() => { const t = setInterval(() => setA(p => (p + 1) % sl.length), 5500); return () => clearInterval(t); }, []);
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
          <a href={sl[a].href} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 26px", background: T.white, color: T.navy, fontFamily: T.fn, fontSize: 14, fontWeight: 700, borderRadius: T.r, textDecoration: "none", opacity: 0, animation: "fadeUp 0.6s ease 0.4s forwards" }}>{sl[a].cta} <Icon name="arrow" size={15} /></a>
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
              <div onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{
                cursor: "pointer", overflow: "hidden", borderRadius: T.r, position: "relative", height: 220, transition: "transform 0.3s",
                transform: hov === i ? "translateY(-4px)" : "none", boxShadow: hov === i ? "0 12px 32px rgba(0,0,0,0.12)" : "0 2px 8px rgba(0,0,0,0.06)",
                margin: "0 8px",
              }}>
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
                  <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: "100%", padding: "18px 0", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: open === i ? T.blue : T.white, border: `1px solid ${open === i ? T.blue : T.bdr}`, display: "flex", alignItems: "center", justifyContent: "center", color: open === i ? T.white : T.blue, transition: "all 0.3s", flexShrink: 0 }}><Icon name={svc.icon} size={18} /></div>
                      <span style={{ fontFamily: T.fn, fontSize: 17, fontWeight: 700, color: open === i ? T.blue : T.navy, textAlign: "left", transition: "color 0.3s" }}>{svc.title}</span>
                    </div>
                    <div style={{ transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.3s", color: T.txtS, flexShrink: 0 }}><Icon name="chevDown" size={18} /></div>
                  </button>
                  <div style={{ maxHeight: open === i ? 140 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                    <div style={{ padding: "0 0 18px 54px" }}>
                      <p style={{ fontFamily: T.fn, fontSize: 14, color: T.txtS, lineHeight: 1.7 }}>{svc.desc}</p>
                      <a href={svc.href || "#contact"} style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10, fontFamily: T.fn, fontSize: 13, fontWeight: 700, color: T.blue, textDecoration: "none" }}>Learn More <Icon name="arrow" size={13} /></a>
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
const CountUp = ({ value, go }) => { const [c, setC] = useState(0); const n = parseInt(value.replace(/[^0-9]/g, "")); const sfx = value.replace(/[0-9]/g, ""); const ok = /^\d+[%+]?$/.test(value); useEffect(() => { if (!go || !ok) return; let i = 0; const s = 1600 / Math.max(n, 1); const t = setInterval(() => { i++; setC(i); if (i >= n) clearInterval(t); }, s); return () => clearInterval(t); }, [go]); return <>{ok ? `${c}${sfx}` : value}</>; };
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

const Leadership = () => null;

const Partners = () => null;

/* ═══════════════ CONTACT + CAREERS ═══════════════ */
const Connect = () => {
  const [openSections, setOpenSections] = useState({ contact: false, careers: false });
  const [contact, setContact] = useState({ name: "", email: "", company: "", phone: "", service: "", message: "" });
  const [career, setCareer] = useState({ name: "", email: "", phone: "", role: "", experience: "", profile: "", message: "" });
  const [contactNote, setContactNote] = useState({ tone: "", text: "" });
  const [careerNote, setCareerNote] = useState({ tone: "", text: "" });

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

  const handleContactSubmit = (e) => {
    e.preventDefault();

    if (![contact.name, contact.email, contact.company, contact.message].every(value => value.trim())) {
      setContactNote({ tone: "error", text: "Please add your name, email, company, and message before submitting." });
      return;
    }

    window.location.href = buildMailto(
      EMAILS.contact,
      `Website Contact Inquiry - ${contact.name.trim()}`,
      [
        ["Name", contact.name],
        ["Email", contact.email],
        ["Company", contact.company],
        ["Phone", contact.phone],
        ["Service of Interest", contact.service],
        ["Message", contact.message],
      ],
    );

    setContactNote({ tone: "success", text: `Your email app should open a draft to ${EMAILS.contact}. If it does not, email us directly.` });
  };

  const handleCareerSubmit = (e) => {
    e.preventDefault();

    if (![career.name, career.email, career.role].every(value => value.trim())) {
      setCareerNote({ tone: "error", text: "Please add your name, email, and role of interest before submitting." });
      return;
    }

    window.location.href = buildMailto(
      EMAILS.careers,
      `Career Application - ${career.role.trim()} - ${career.name.trim()}`,
      [
        ["Name", career.name],
        ["Email", career.email],
        ["Phone", career.phone],
        ["Role of Interest", career.role],
        ["Experience", career.experience],
        ["Resume / LinkedIn URL", career.profile],
        ["Message", career.message],
      ],
    );

    setCareerNote({ tone: "success", text: `Your email app should open a draft to ${EMAILS.careers}. You can attach your resume before sending.` });
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
                <form onSubmit={handleContactSubmit}>
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
                  <button type="submit" style={{ marginTop: 18, padding: "13px 22px", background: T.blue, color: T.white, border: "none", borderRadius: T.r, fontFamily: T.fn, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
                    Email Info Team <Icon name="arrow" size={15} />
                  </button>
                  <p style={contactNote.text ? noteStyle(contactNote.tone) : { marginTop: 14, fontFamily: T.fn, fontSize: 13, lineHeight: 1.6, color: T.txtS }}>
                    {contactNote.text || `If your email app does not open, send your inquiry directly to ${EMAILS.contact}.`}
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
                      Share the role you are interested in, your experience, and your profile link. You can attach your resume in the email draft before sending.
                    </p>
                  </div>
                  <a href={`mailto:${EMAILS.careers}`} style={{ fontFamily: T.fn, fontSize: 13, fontWeight: 700, color: T.blue, textDecoration: "none" }}>{EMAILS.careers}</a>
                </div>
                <form onSubmit={handleCareerSubmit}>
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
                  <div>
                    <label style={formUi.label} htmlFor="career-message">Message</label>
                    <textarea id="career-message" value={career.message} onChange={e => updateCareer("message", e.target.value)} style={formUi.textarea} />
                  </div>
                  <button type="submit" style={{ marginTop: 18, padding: "13px 22px", background: T.blue, color: T.white, border: "none", borderRadius: T.r, fontFamily: T.fn, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
                    Email HR Team <Icon name="arrow" size={15} />
                  </button>
                  <p style={careerNote.text ? noteStyle(careerNote.tone) : { marginTop: 14, fontFamily: T.fn, fontSize: 13, lineHeight: 1.6, color: T.txtS }}>
                    {careerNote.text || `If your email app does not open, send your profile directly to ${EMAILS.careers}.`}
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

const Footer = () => (
  <footer style={{ padding: "44px 0 20px", background: "#060E1A" }}>
    <W>
      <div className="fg" style={{ display: "grid", gap: 32, marginBottom: 32 }}>
        <div>
          <a href="#" style={{ fontFamily: T.fn, fontWeight: 800, fontSize: 18, color: T.white, textDecoration: "none" }}><span style={{ color: T.blueA }}>Y</span>antransh<span style={{ color: T.blueA }}>VT</span></a>
          <p style={{ fontFamily: T.fn, fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 10, lineHeight: 1.6, maxWidth: 200 }}>Strategy | Technology | Talent Excellence</p>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            {["linkedin", "twitter"].map(ic => <a key={ic} href="#" style={{ color: "rgba(255,255,255,0.35)", display: "inline-flex", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = T.white} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}><Icon name={ic} size={16} /></a>)}
          </div>
        </div>
        {C.footer.cols.map(col => (
          <div key={col.title}>
            <h4 style={{ fontFamily: T.fn, fontSize: 13, fontWeight: 700, color: T.white, marginBottom: 12 }}>{col.title}</h4>
            {col.links.map(l => <a key={l.label} href={l.href} style={{ display: "block", fontFamily: T.fn, fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none", padding: "3px 0", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = T.white} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}>{l.label}</a>)}
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 14, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <span style={{ fontFamily: T.fn, fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{"\u00A9"} {new Date().getFullYear()} YantranshVT Solutions. All rights reserved.</span>
        <div style={{ display: "flex", gap: 16 }}>
          {["Disclaimer", "Privacy Policy", "Terms of Use", "Cookies Policy"].map(t => <a key={t} href="#" style={{ fontFamily: T.fn, fontSize: 11, color: "rgba(255,255,255,0.25)", textDecoration: "none" }}
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.6)"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.25)"}>{t}</a>)}
        </div>
      </div>
    </W>
  </footer>
);

/* ═══════════════ DOWNLOAD ═══════════════ */
// const DlBtn = () => { const [d, sd] = useState(false); const dl = useCallback(() => { const b = new Blob([JSON.stringify(C, null, 2)], { type: "application/json" }); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href = u; a.download = "content.json"; a.click(); URL.revokeObjectURL(u); sd(true); setTimeout(() => sd(false), 2500); }, []); return <button onClick={dl} style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999, padding: "10px 18px", borderRadius: T.r, background: d ? "#00C853" : T.blue, color: T.white, border: "none", cursor: "pointer", fontFamily: T.fn, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 6, boxShadow: "0 4px 16px rgba(13,71,161,0.25)" }}><Icon name={d ? "check" : "download"} size={14} />{d ? "Done!" : "Download JSON"}</button>; };

/* ═══════════════ PAGE ROUTER ═══════════════ */
const pageMap = {
  "#/industries/telecom": Telecom,
  "#/industries/banking": Banking,
  "#/industries/lifesciences": LifeSciences,
  "#/industries/healthcare": Healthcare,
  "#/services/data-ai": DataAI,
  "#/services/product-engineering": ProductEngineering,
  "#/services/cloud-infrastructure": CloudInfrastructure,
  "#/services/talent-solutions": TalentSolutions,
};

const PageRouter = () => {
  const [hash, setHash] = useState(window.location.hash);
  
  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  
  const PageComponent = pageMap[hash];
  
  if (PageComponent) {
    return <PageComponent />;
  }
  
  return null;
};

const HomePage = () => (
  <>
    <Hero />
    <Industries />
    <Services />
    <Platforms />
    <MetricsBar />
    <Company />
    <Connect />
  </>
);

/* ═══════════════ APP ═══════════════ */
export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [prevIsDetailPage, setPrevIsDetailPage] = useState(false);
  
  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  
  const isDetailPage = pageMap[currentHash] !== undefined;
  
  useEffect(() => {
    // Only scroll to top when transitioning between detail page and homepage without a target anchor.
    if (prevIsDetailPage !== isDetailPage) {
      if (isDetailPage || !currentHash || currentHash === "#") {
        window.scrollTo(0, 0);
      }
      setPrevIsDetailPage(isDetailPage);
    }
  }, [isDetailPage, prevIsDetailPage, currentHash]);

  useEffect(() => {
    if (!isDetailPage && currentHash && currentHash !== "#" && !currentHash.startsWith("#/")) {
      let targetId = currentHash.slice(1);
      if (/^platforms\/(agentic-ai|data-modernization|predictive-analytics)$/.test(targetId)) {
        targetId = "platforms";
      }
      if (/^company\/(about-us|leadership|partners)$/.test(targetId)) {
        targetId = "company";
      }
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        requestAnimationFrame(() => {
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }
  }, [currentHash, isDetailPage]);
  
  return (
    <div style={{ background: T.white }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}body{-webkit-font-smoothing:antialiased}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
        .dn{display:flex}.mb{display:none!important}
        .fg{grid-template-columns:1.4fr repeat(4,1fr)}
        @media(max-width:900px){.form-grid{grid-template-columns:1fr!important}}
        @media(max-width:768px){.dn{display:none!important}.mb{display:flex!important}.fg{grid-template-columns:1fr 1fr!important}}
      `}</style>
      <Navbar isDetailPage={isDetailPage} />
      {isDetailPage ? <PageRouter /> : <HomePage />}
      {!isDetailPage && <Footer />}
      {isDetailPage && (
        <footer style={{ padding: "30px 0", background: T.bgAlt, borderTop: `1px solid ${T.bdr}` }}>
          <W>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <a href="/" style={{ fontFamily: T.fn, fontWeight: 800, fontSize: 16, color: T.navy, textDecoration: "none" }}>
                <span style={{ color: T.blue }}>Y</span>antransh<span style={{ color: T.blue }}>VT</span>
              </a>
              <span style={{ fontFamily: T.fn, fontSize: 12, color: T.txtS }}>{"\u00A9"} {new Date().getFullYear()} YantranshVT Solutions. All rights reserved.</span>
            </div>
          </W>
        </footer>
      )}
      {/* <DlBtn /> */}
    </div>
  );
}
