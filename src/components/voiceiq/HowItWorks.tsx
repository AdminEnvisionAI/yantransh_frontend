import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Caller dials in",
      desc: "A normal phone call. No app or special hardware needed, with many concurrent connections.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "AI listens & understands",
      desc: "Speech is transcribed and understood in real time.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M3 12h1M7 8v8M11 4v16M15 7v10M19 10v4" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "Answers from your knowledge",
      desc: "Retrieves accurate, on-brand answers from your own documents, CRM and database.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z" />
          <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
        </svg>
      ),
    },
    {
      num: "04",
      title: "Takes action",
      desc: "Escalates to a human or looks up CRM and order information, then responds naturally.",
      icon: (
        <svg
          width="24"
          height="24"
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
  ];

  return (
    <section id="how" style={{ background: "#FFFFFF" }}>
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
            How it works
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
            A natural conversation, from dial-in to resolution.
          </h2>
        </div>

        {/* 4 Steps Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
            gap: "20px",
          }}
        >
          {steps.map((step) => (
            <div
              key={step.num}
              className="interactive-card"
              style={{
                border: "1px solid #E2E8F0",
                borderRadius: "14px",
                padding: "clamp(22px, 4vw, 28px)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                background: "#FFFFFF",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "#DCEFFB",
                    color: "#0D47A1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {step.icon}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "30px",
                    fontWeight: 700,
                    color: "#2196F3",
                  }}
                >
                  {step.num}
                </span>
              </div>

              <h3
                style={{
                  margin: 0,
                  fontSize: "19px",
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
                  fontSize: "16px",
                  lineHeight: 1.55,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div
          style={{
            background: "#0D47A1",
            color: "#FFFFFF",
            borderRadius: "14px",
            padding: "24px 32px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "14px 32px",
            boxShadow: "0 8px 24px rgba(13, 71, 161, 0.15)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "36px",
              fontWeight: 700,
              color: "#2196F3",
              letterSpacing: "-0.01em",
            }}
          >
            &lt; 800 ms
          </span>
          <span
            style={{
              fontSize: "18px",
              color: "#DCEFFB",
              fontWeight: 400,
            }}
          >
            End-to-end response time, so every call feels like a real conversation.
          </span>
        </div>
      </div>
    </section>
  );
}
