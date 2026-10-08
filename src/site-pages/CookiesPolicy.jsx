"use client";

import Link from "next/link";
import { T, W } from "../theme";
import { Rv } from "../components/reveal";
import contentData from "../data/content.json";

const CookiesPolicy = () => {
    const page = contentData.pages?.["cookies-policy"] || {};

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
                        <h1 style={{ fontFamily: T.fd, fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: T.white, lineHeight: 1.2, margin: "16px 0 20px" }}>{page.title || "Cookies Policy"}</h1>
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
                        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                            {(page.sections || []).map((sect, i) => {
                                const renderExtraContent = () => {
                                    // Special rendering for Section 2 (Table)
                                    if (sect.num === "2" && sect.table) {
                                        return (
                                            <div style={{ marginTop: 24, overflowX: "auto", border: `1px solid ${T.bdr}`, borderRadius: T.r, boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
                                                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: T.fn, fontSize: 14, textAlign: "left" }}>
                                                    <thead>
                                                        <tr style={{ background: T.bgAlt, borderBottom: `2px solid ${T.bdr}` }}>
                                                            <th style={{ padding: "12px 16px", fontWeight: 700, color: T.navy }}>Cookie Type</th>
                                                            <th style={{ padding: "12px 16px", fontWeight: 700, color: T.navy }}>Description</th>
                                                            <th style={{ padding: "12px 16px", fontWeight: 700, color: T.navy }}>Necessity</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {sect.table.map((row, idx) => (
                                                            <tr key={idx} style={{ borderBottom: idx === sect.table.length - 1 ? "none" : `1px solid ${T.bdrL}`, background: idx % 2 === 1 ? T.bgAlt : "transparent" }}>
                                                                <td style={{ padding: "12px 16px", fontWeight: 600, color: T.navy }}>{row.type}</td>
                                                                <td style={{ padding: "12px 16px", color: T.txtS, lineHeight: 1.5 }}>{row.desc}</td>
                                                                <td style={{ padding: "12px 16px", color: row.necessity.includes("Mandatory") ? T.blue : T.txtL, fontWeight: 500 }}>{row.necessity}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        );
                                    }

                                    // Special rendering for Section 3 (Breakdown Cards)
                                    if (sect.num === "3" && sect.breakdowns) {
                                        return (
                                            <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 24 }}>
                                                {sect.breakdowns.map((b, idx) => (
                                                    <div key={idx} style={{ padding: 24, background: T.bgAlt, borderRadius: T.r, border: `1px solid ${T.bdr}` }}>
                                                        <h3 style={{ fontFamily: T.fn, fontSize: 16, fontWeight: 700, color: T.navy, marginBottom: 16 }}>{b.category}</h3>
                                                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
                                                            {b.items.map((item, key) => (
                                                                <div key={key} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                                                    <span style={{ fontSize: 11, fontWeight: 700, color: T.txtL, textTransform: "uppercase", letterSpacing: 0.5 }}>{item.label}</span>
                                                                    <span style={{ fontSize: 13, color: T.txt, fontWeight: 500 }}>{item.value}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    }

                                    // Special rendering for Section 4 (Subsections)
                                    if (sect.num === "4" && sect.subsections) {
                                        return (
                                            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 20 }}>
                                                {sect.subsections.map((sub, idx) => (
                                                    <div key={idx} style={{ paddingLeft: 16, borderLeft: `3px solid ${T.blueL}`, margin: "10px 0" }}>
                                                        <h4 style={{ fontFamily: T.fn, fontSize: 16, fontWeight: 700, color: T.navy, marginBottom: 8 }}>{sub.title}</h4>
                                                        <p style={{ fontFamily: T.fn, fontSize: 14, color: T.txtS, lineHeight: 1.7, whiteSpace: "pre-line" }}>
                                                            {sub.content}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    }

                                    return null;
                                };

                                return (
                                    <Rv key={i} d={i * 0.05}>
                                        <div style={{ paddingBottom: 24, borderBottom: i === (page.sections.length - 1) ? "none" : `1px solid ${T.bdrL}` }}>
                                            <h2 style={{ fontFamily: T.fd, fontSize: 22, fontWeight: 700, color: T.navy, marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
                                                <span style={{ color: T.blue, fontSize: 16, fontFamily: T.fn, fontWeight: 800, background: T.bgAlt, width: 32, height: 32, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }}>
                                                    {sect.num}
                                                </span>
                                                {sect.title}
                                            </h2>
                                            <p style={{ fontFamily: T.fn, fontSize: 15, color: T.txtS, lineHeight: 1.8, whiteSpace: "pre-line", paddingLeft: 42 }}>
                                                {sect.content}
                                            </p>
                                            <div style={{ paddingLeft: 42 }}>
                                                {renderExtraContent()}
                                            </div>
                                        </div>
                                    </Rv>
                                );
                            })}
                        </div>

                        <Rv d={0.3}>
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

export default CookiesPolicy;
