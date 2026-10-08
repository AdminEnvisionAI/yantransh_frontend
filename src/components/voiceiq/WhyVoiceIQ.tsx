"use client";

import React from "react";

export default function WhyVoiceIQ() {
  const pillars = [
    {
      title: "Speed",
      desc: "Responses in under 800 ms. Inbound calls answered within about 5 seconds.",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M13 2 3 14h9l-1 8 10-12h-9z" />
        </svg>
      ),
    },
    {
      title: "Accuracy",
      desc: "Grounded in your actual company content, not generic AI guesses.",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" />
        </svg>
      ),
    },
    {
      title: "Security & control",
      desc: "Fully on private cloud, with enterprise-grade tenant data isolation.",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      title: "No lock-in",
      desc: "Built on open standards and open-source components.",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
          <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
        </svg>
      ),
    },
    {
      title: "Cost effective",
      desc: "In-house hosted models, the right model for each job, no external cloud costs.",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z" />
          <circle cx="7" cy="7" r="1.5" />
        </svg>
      ),
    },
  ];

  const comparisonRows = [
    {
      dimension: "Pricing model",
      typical: "Per-minute billing via third-party vendors",
      viq: "Transparent pricing, no third-party dependencies",
    },
    {
      dimension: "Data residency",
      typical: "Audio and transcripts processed on vendor cloud",
      viq: "Data stays fully in-house, no third-party APIs or services",
    },
    {
      dimension: "AI models",
      typical: "Fixed, vendor-controlled models",
      viq: "Self-hosted, with custom domain-trained models available",
    },
    {
      dimension: "Latency",
      typical: "Shared, vendor-managed infrastructure",
      viq: "Best-in-class: we control the full infrastructure stack",
    },
    {
      dimension: "AI / knowledge layer",
      typical: "Generic, bolt-on RAG",
      viq: "Custom integrations with enterprise knowledge sources",
    },
    {
      dimension: "Vendor lock-in",
      typical: "Locked to the platform's pricing and roadmap",
      viq: "Full control of your organisational data, no lock-in",
    },
    {
      dimension: "Time to first call",
      typical: "Days to weeks, vendor-dependent onboarding",
      viq: "Less than a day",
    },
  ];

  return (
    <section id="why" style={{ background: "#F4F6FA" }}>
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
            Why VoiceIQ
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
            Built for speed, accuracy and control.
          </h2>
        </div>

        {/* 5 Pillars Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))",
            gap: "20px",
          }}
        >
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="interactive-card"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "14px",
                padding: "clamp(20px, 4vw, 26px)",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <span
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "#E3F2FD",
                  color: "#0D47A1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {pillar.icon}
              </span>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 600, color: "#1E293B" }}>
                {pillar.title}
              </h3>
              <p style={{ margin: 0, color: "#64748B", fontSize: "15.5px", lineHeight: 1.5 }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Comparison Table */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "10px" }}>
            <h3
              style={{
                margin: 0,
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(22px, 4vw, 28px)",
                color: "#0D47A1",
              }}
            >
              VoiceIQ vs. typical market platforms
            </h3>
            <span style={{ fontSize: "12.5px", color: "#64748B", fontWeight: 500 }}>
              ← Swipe to view comparison →
            </span>
          </div>

          <div
            className="table-scroll-container"
            style={{
              border: "1px solid #E2E8F0",
              borderRadius: "14px",
              background: "#FFFFFF",
              boxShadow: "0 4px 16px rgba(13, 71, 161, 0.04)",
            }}
          >
            <table
              style={{
                width: "100%",
                minWidth: "760px",
                borderCollapse: "collapse",
                fontSize: "15.5px",
              }}
            >
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{
                      textAlign: "left",
                      padding: "18px 22px",
                      background: "#F4F6FA",
                      color: "#64748B",
                      fontWeight: 600,
                      fontSize: "13px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      width: "24%",
                    }}
                  >
                    Feature / Dimension
                  </th>
                  <th
                    scope="col"
                    style={{
                      textAlign: "left",
                      padding: "18px 22px",
                      background: "#F4F6FA",
                      color: "#64748B",
                      fontWeight: 600,
                      fontSize: "13px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      width: "38%",
                    }}
                  >
                    Typical platforms
                  </th>
                  <th
                    scope="col"
                    style={{
                      textAlign: "left",
                      padding: "18px 22px",
                      background: "#0D47A1",
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontSize: "13px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    VoiceIQ
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr
                    key={row.dimension}
                    style={{
                      borderTop: "1px solid #E2E8F0",
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(220, 239, 251, 0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <th
                      scope="row"
                      style={{
                        textAlign: "left",
                        padding: "16px 22px",
                        fontWeight: 600,
                        color: "#1E293B",
                      }}
                    >
                      {row.dimension}
                    </th>
                    <td
                      style={{
                        padding: "16px 22px",
                        color: "#64748B",
                        lineHeight: 1.45,
                      }}
                    >
                      {row.typical}
                    </td>
                    <td
                      style={{
                        padding: "16px 22px",
                        background: "#F4F6FA",
                        fontWeight: 500,
                        color: "#0D47A1",
                        lineHeight: 1.45,
                      }}
                    >
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#2E9E5B"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {row.viq}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
