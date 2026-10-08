import React from "react";

export default function Onboarding() {
  const steps = [
    {
      num: 1,
      title: "Discovery & requirements",
      desc: "Understand call volumes and use cases, map integration needs and deliver the onboarding plan.",
      highlight: false,
    },
    {
      num: 2,
      title: "Collect data & integrations",
      desc: "Gather FAQs, SOPs and manuals, identify tool integrations and confirm data and compliance needs.",
      highlight: false,
    },
    {
      num: 3,
      title: "AI customisation",
      desc: "Set persona, tone and voice, build escalation rules and flows, and connect your knowledge base and APIs.",
      highlight: false,
    },
    {
      num: 4,
      title: "Test & validate",
      desc: "Run scripted test calls, validate tool calls and escalation, tune accuracy, tone and latency, then sign off.",
      highlight: false,
    },
    {
      num: 5,
      title: "Go live",
      desc: "Cut over the live phone number, enable real-time dashboards and monitor the first live calls.",
      highlight: false,
    },
    {
      num: 6,
      title: "Support",
      desc: "Hand over to operations, fix production issues and keep improving continuously.",
      highlight: true,
    },
  ];

  return (
    <section style={{ background: "#F4F6FA" }}>
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
            Onboarding
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
            From kickoff to go-live in six steps.
          </h2>
        </div>

        {/* 6 Steps Grid */}
        <ol
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "20px",
          }}
        >
          {steps.map((step) => (
            <li
              key={step.num}
              className="interactive-card"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "14px",
                padding: "clamp(20px, 4vw, 28px)",
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  flex: "none",
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: step.highlight ? "#2196F3" : "#0D47A1",
                  color: step.highlight ? "#1E293B" : "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "17px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                }}
              >
                {step.num}
              </span>

              <div>
                <h3
                  style={{
                    margin: "0 0 8px",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#1E293B",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: "#64748B",
                    fontSize: "15.5px",
                    lineHeight: 1.5,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
