"use client";

import React from "react";

export default function Pricing() {
  const scrollToDemo = () => {
    const el = document.getElementById("demo");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="pricing" style={{ background: "#FFFFFF" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "clamp(56px, 8vw, 96px) clamp(16px, 4vw, 24px)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(32px, 5vw, 48px)",
        }}
      >
        {/* Section Heading */}
        <div
          style={{
            maxWidth: "720px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#0D47A1",
            }}
          >
            Pricing
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(28px, 5vw, 44px)",
              lineHeight: 1.15,
              color: "#0D47A1",
            }}
          >
            Simple, transparent plans that scale with your call volume.
          </h2>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {/* Starter Plan */}
          <div
            className="interactive-card"
            style={{
              border: "1px solid #E2E8F0",
              borderRadius: "16px",
              padding: "clamp(26px, 5vw, 36px) clamp(20px, 4vw, 32px)",
              display: "flex",
              flexDirection: "column",
              gap: "22px",
              background: "#FFFFFF",
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 600, color: "#1E293B" }}>
                Starter
              </h3>
              <div style={{ marginTop: "12px", display: "flex", alignItems: "baseline" }}>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "44px",
                    fontWeight: 700,
                    color: "#0D47A1",
                  }}
                >
                  ₹25K
                </span>
                <span style={{ color: "#64748B", fontSize: "16px", marginLeft: "4px" }}>
                  {" "}/ month
                </span>
              </div>
            </div>

            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                fontSize: "15.5px",
                color: "#1E293B",
              }}
            >
              {[
                "Platform & AI agent",
                "Dashboard",
                "Basic integration",
                "5,000 minutes included",
              ].map((feat, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0D47A1"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {feat}
                </li>
              ))}
            </ul>

            <div
              style={{
                marginTop: "auto",
                fontSize: "14px",
                color: "#64748B",
                borderTop: "1px solid #E2E8F0",
                paddingTop: "18px",
              }}
            >
              Additional minutes ₹4 / min
            </div>

            <button
              type="button"
              className="btn-outline-primary"
              onClick={scrollToDemo}
              style={{ cursor: "pointer", fontFamily: "inherit" }}
            >
              Get started
            </button>
          </div>

          {/* Growth Plan (Recommended) */}
          <div
            className="interactive-card-dark"
            style={{
              background: "#0D47A1",
              color: "#FFFFFF",
              borderRadius: "16px",
              padding: "clamp(26px, 5vw, 36px) clamp(20px, 4vw, 32px)",
              display: "flex",
              flexDirection: "column",
              gap: "22px",
              position: "relative",
              boxShadow: "0 20px 45px rgba(13, 71, 161, 0.28)",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "-14px",
                left: "32px",
                background: "#2196F3",
                color: "#1E293B",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "6px 14px",
                borderRadius: "999px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              }}
            >
              Recommended
            </span>

            <div>
              <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 600, color: "#FFFFFF" }}>
                Growth
              </h3>
              <div style={{ marginTop: "12px", display: "flex", alignItems: "baseline" }}>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "44px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                  }}
                >
                  ₹50K
                </span>
                <span style={{ color: "#DCEFFB", fontSize: "16px", marginLeft: "4px" }}>
                  {" "}/ month
                </span>
              </div>
            </div>

            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                fontSize: "15.5px",
                color: "#FFFFFF",
              }}
            >
              {[
                "Platform & AI agent",
                "15,000 minutes included",
                "CRM integration",
                "Call analytics",
                "Human transfer",
                "Multiple workflows",
              ].map((feat, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2196F3"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {feat}
                </li>
              ))}
            </ul>

            <div
              style={{
                marginTop: "auto",
                fontSize: "14px",
                color: "#DCEFFB",
                borderTop: "1px solid rgba(255,255,255,0.2)",
                paddingTop: "18px",
              }}
            >
              Additional minutes ₹3 / min
            </div>

            <button
              type="button"
              className="btn-primary"
              onClick={scrollToDemo}
              style={{ textAlign: "center", cursor: "pointer", fontFamily: "inherit", border: "none" }}
            >
              Book a demo
            </button>
          </div>

          {/* Enterprise Plan */}
          <div
            className="interactive-card"
            style={{
              border: "1px solid #E2E8F0",
              borderRadius: "16px",
              padding: "clamp(26px, 5vw, 36px) clamp(20px, 4vw, 32px)",
              display: "flex",
              flexDirection: "column",
              gap: "22px",
              background: "#F4F6FA",
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 600, color: "#1E293B" }}>
                Enterprise
              </h3>
              <div style={{ marginTop: "12px", display: "flex", alignItems: "baseline" }}>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "44px",
                    fontWeight: 700,
                    color: "#0D47A1",
                  }}
                >
                  Custom
                </span>
              </div>
            </div>

            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                fontSize: "15.5px",
                color: "#1E293B",
              }}
            >
              {[
                "Dedicated infrastructure",
                "Higher concurrency",
                "Private deployment",
                "Custom integrations",
                "SLA commitment",
                "Advanced analytics",
                "Dedicated support",
                "Custom AI workflows",
              ].map((feat, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0D47A1"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {feat}
                </li>
              ))}
            </ul>

            <div
              style={{
                marginTop: "auto",
                fontSize: "14px",
                color: "#64748B",
                borderTop: "1px solid #E2E8F0",
                paddingTop: "18px",
              }}
            >
              Pricing from ₹2 / min*
            </div>

            <button
              type="button"
              className="btn-outline-rust"
              onClick={scrollToDemo}
              style={{ cursor: "pointer", fontFamily: "inherit" }}
            >
              Talk to sales
            </button>
          </div>
        </div>

        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: "#64748B",
            fontStyle: "italic",
          }}
        >
          *Indicative pricing. Final pricing is confirmed once call volumes are discussed.
        </p>
      </div>
    </section>
  );
}
