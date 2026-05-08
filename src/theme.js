import { useState, useEffect, useRef } from "react";

/* ═══════════════ THEME & TOKENS ═══════════════ */

// Color Palette
export const T = {
  white: "#fff",
  bg: "#FAFBFD",
  bgAlt: "#F4F6FA",
  navy: "#0B1D3A",
  blue: "#0D47A1",
  blueL: "#1976D2",
  blueA: "#2196F3",
  txt: "#1E293B",
  txtS: "#64748B",
  txtL: "#94A3B8",
  bdr: "#E2E8F0",
  bdrL: "#F1F5F9",
  // Typography
  fn: "'Manrope', sans-serif",
  fd: "'Playfair Display', serif",
  // Layout
  mw: 1200,
  r: 8,
};

// Contact Emails
export const EMAILS = {
  careers: "HR@yantranshVT.com",
  contact: "Info@yantranshVT.com",
};

// Form UI Styles
export const formUi = {
  card: {
    background: T.white,
    borderRadius: 18,
    border: `1px solid ${T.bdr}`,
    boxShadow: "0 18px 48px rgba(2, 12, 27, 0.12)",
    padding: "28px",
  },
  label: {
    display: "block",
    fontFamily: T.fn,
    fontSize: 12,
    fontWeight: 700,
    color: T.navy,
    marginBottom: 8,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: T.r,
    border: `1px solid ${T.bdr}`,
    background: T.white,
    color: T.txt,
    fontFamily: T.fn,
    fontSize: 14,
    outline: "none",
  },
  textarea: {
    width: "100%",
    minHeight: 136,
    padding: "12px 14px",
    borderRadius: T.r,
    border: `1px solid ${T.bdr}`,
    background: T.white,
    color: T.txt,
    fontFamily: T.fn,
    fontSize: 14,
    outline: "none",
    resize: "vertical",
  },
};

// Utilities
export const buildMailto = (to, subject, fields) => {
  const body = [
    "Hello YantranshVT team,",
    "",
    ...fields.filter(([, value]) => value && value.trim()).map(([label, value]) => `${label}: ${value.trim()}`),
    "",
    "Regards,",
  ].join("\n");

  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export const footerHref = (label) => ({
  "About Us": "#about",
  Leadership: "#leadership",
  Partners: "#partners",
  Careers: "#careers",
  Contact: "#contact",
}[label] || "#");

// SVG Stroke Props
export const svgProps = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };

// Icons
const IC = {
  brain: <svg viewBox="0 0 24 24" {...svgProps}><path d="M12 2a5 5 0 0 1 5 5c0 .9-.3 1.7-.7 2.4A5 5 0 0 1 19 14a5 5 0 0 1-3 4.6V22h-2v-3h-4v3h-2v-3.4A5 5 0 0 1 5 14a5 5 0 0 1 2.7-4.6A5 5 0 0 1 7 7a5 5 0 0 1 5-5z"/></svg>,
  code: <svg viewBox="0 0 24 24" {...svgProps}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  cloud: <svg viewBox="0 0 24 24" {...svgProps}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
  users: <svg viewBox="0 0 24 24" {...svgProps}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
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

export const Icon = ({ name, size = 22 }) => <span style={{ width: size, height: size, display: "inline-flex", flexShrink: 0 }}>{IC[name]}</span>;

/* ═══════════════ REUSABLE COMPONENT STYLES ═══════════════ */

export const getButtonStyles = (isActive = false) => ({
  background: "none",
  border: "none",
  cursor: "pointer",
  color: T.blue,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s",
  flexShrink: 0,
});

export const getCircularImageStyles = (isSelected = false) => ({
  position: "relative",
  width: 240,
  height: 240,
  borderRadius: "50%",
  overflow: "visible",
  background: "transparent",
  marginBottom: 20,
  transition: "all 0.3s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const getCircularImageBackgroundStyles = (isSelected = false) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  background: isSelected
    ? "linear-gradient(135deg, #FFD89B 0%, #FFA366 50%, #FF8C42 100%)"
    : "linear-gradient(135deg, #E8C9A0 0%, #D4A373 50%, #C4884D 100%)",
  boxShadow: isSelected
    ? "0 0 30px rgba(255, 140, 66, 0.4)"
    : "0 8px 32px rgba(13, 71, 161, 0.08)",
  transition: "all 0.3s",
  zIndex: 0,
});

export const getCircularImageInnerStyles = (isSelected = false) => ({
  position: "relative",
  width: "calc(100% - 12px)",
  height: "calc(100% - 12px)",
  borderRadius: "50%",
  overflow: "hidden",
  border: `3px solid ${isSelected ? "#FF8C42" : "#E8C9A0"}`,
  background: T.white,
  boxShadow: isSelected
    ? "0 0 20px rgba(255, 140, 66, 0.3)"
    : "0 2px 8px rgba(0,0,0,0.05)",
  zIndex: 1,
});

export const getSectionPaddingStyles = (py = 70) => ({
  padding: `${py}px 0 ${py}px`,
  background: T.white,
});

export const getHeadingStyles = (size = "lg") => {
  const sizes = {
    lg: { fontSize: 36 },
    md: { fontSize: 26 },
    sm: { fontSize: 20 },
  };
  return {
    fontFamily: T.fd,
    fontWeight: 700,
    color: T.navy,
    ...sizes[size],
  };
};

export const getTextStyles = (size = "md", color = "txt") => {
  const sizes = {
    sm: { fontSize: 12 },
    md: { fontSize: 14 },
    lg: { fontSize: 15 },
    xl: { fontSize: 18 },
  };
  return {
    fontFamily: T.fn,
    color: T[color],
    ...sizes[size],
  };
};

/* ═══════════════ HOOKS & COMPONENTS ═══════════════ */

export function useInView(t = 0.1) {
  const r = useRef(null);
  const [v, sv] = useState(false);
  useEffect(() => {
    const el = r.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { sv(true); o.disconnect(); }
    }, { threshold: t });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return [r, v];
}

export const Rv = ({ children, d = 0, style: s = {} }) => {
  const [r, v] = useInView();
  return <div ref={r} style={{ ...s, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(24px)", transition: `opacity 0.5s ease ${d}s, transform 0.5s ease ${d}s` }}>{children}</div>;
};

export const W = ({ children, style: s = {} }) => <div style={{ maxWidth: T.mw, margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)", ...s }}>{children}</div>;
