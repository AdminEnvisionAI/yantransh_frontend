import React from "react";

export default function Omnichannel() {
  const channels = [
    {
      title: "Phone",
      desc: "Inbound and outbound calls on your existing numbers. Callers just dial; no app needed.",
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
      title: "Web → AI voice call",
      desc: "Instant voice interaction right from your website. Turn visitors into qualified leads with less friction than forms or callbacks.",
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
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20" />
        </svg>
      ),
    },
    {
      title: "WhatsApp chat + voice",
      desc: "Engage on WhatsApp and move seamlessly from text to voice when a conversation gets complex. Automate follow-ups and reminders.",
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
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section style={{ background: "#FFFFFF" }}>
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
            Omnichannel
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
            Meet customers on the channels they already use.
          </h2>
        </div>

        {/* 3 Channel Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "20px",
          }}
        >
          {channels.map((chan) => (
            <div
              key={chan.title}
              className="interactive-card"
              style={{
                border: "1px solid #E2E8F0",
                borderRadius: "14px",
                padding: "clamp(22px, 4vw, 32px)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                background: "#FFFFFF",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "#0D47A1",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {chan.icon}
                </span>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#1E293B",
                  }}
                >
                  {chan.title}
                </h3>
              </div>

              <p
                style={{
                  margin: 0,
                  color: "#64748B",
                  fontSize: "16px",
                  lineHeight: 1.55,
                }}
              >
                {chan.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
