"use client";

import Link from "next/link";
import { T, W } from "../theme";
import { Rv } from "../components/reveal";
import contentData from "../data/content.json";

const IC = {
    check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
};

const PrivacyPolicy = () => {
    const page = contentData.pages?.["privacy-policy"] || {};

    return (
        <div style={{ minHeight: "100vh", background: T.white }}>
            {/* Hero */}
            <section style={{ position: "relative", overflow: "hidden", background: T.navy, paddingTop: 100 }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(11,29,58,0.95) 0%, rgba(13,71,161,0.8) 100%)", zIndex: 1 }} />

                <W style={{ position: "relative", zIndex: 2, paddingTop: 80, paddingBottom: 60 }}>
                    <Rv d={0.1}>
                        <span style={{ fontFamily: T.fn, fontSize: 13, fontWeight: 600, color: T.blueA, letterSpacing: 1, textTransform: "uppercase" }}>{page.category || "Legal"}</span>
                    </Rv>
                    <Rv d={0.15}>
                        <h1 style={{ fontFamily: T.fd, fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: T.white, lineHeight: 1.2, margin: "16px 0 20px" }}>{page.title || "Privacy Policy"}</h1>
                    </Rv>
                    <Rv d={0.2}>
                        <p style={{ fontFamily: T.fn, fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.8, maxWidth: 800 }}>
                            {page.subtitle || ""}
                        </p>
                    </Rv>
                </W>
            </section>

            {/* Content */}
            <section style={{ padding: "70px 0", background: T.white }}>
                <W>
                    <div style={{ maxWidth: 800, margin: "0 auto" }}>
                        <Rv d={0.1}>
                            <div style={{ background: T.bgAlt, border: `1px solid ${T.bdr}`, borderRadius: T.r, padding: "32px", marginBottom: "40px" }}>
                                <p style={{ fontFamily: T.fn, fontSize: 15, color: T.txt, lineHeight: 1.8 }}>
                                    {page.introText || ""}
                                </p>
                            </div>
                        </Rv>

                        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
                            {(page.bullets || []).map((bullet, i) => (
                                <Rv key={i} d={i * 0.05}>
                                    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                                        <span style={{ color: T.blue, flexShrink: 0, marginTop: 4 }}>{IC.check}</span>
                                        <p style={{ fontFamily: T.fn, fontSize: 15, color: T.txtS, lineHeight: 1.7 }}>
                                            {bullet}
                                        </p>
                                    </div>
                                </Rv>
                            ))}
                        </div>

                        <Rv d={0.35}>
                            <div style={{ borderTop: `1px solid ${T.bdr}`, paddingTop: 30, marginTop: 30 }}>
                                <p style={{ fontFamily: T.fn, fontSize: 15, color: T.txt, lineHeight: 1.8, fontWeight: 500 }}>
                                    {page.conclusion || ""}
                                </p>
                            </div>
                        </Rv>

                        <Rv d={0.4}>
                            <div style={{ marginTop: 50, textAlign: "center" }}>
                                <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", background: T.blue, color: T.white, fontFamily: T.fn, fontSize: 14, fontWeight: 700, borderRadius: T.r, textDecoration: "none", transition: "background 0.2s" }}
                                    onMouseEnter={e => e.currentTarget.style.background = T.blueL} onMouseLeave={e => e.currentTarget.style.background = T.blue}>
                                    Back to Home Page
                                </Link>
                            </div>
                        </Rv>
                    </div>
                </W>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
