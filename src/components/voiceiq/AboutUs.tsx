export default function AboutUs() {
  const stats = [
    { value: "1000+", label: "Employees worldwide" },
    { value: "21 years", label: "Industry experience" },
    { value: "3", label: "Countries: India, Sharjah & Singapore" },
  ];

  return (
    <section style={{ background: "#F4F6FA", borderTop: "1px solid #E2E8F0" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "clamp(56px, 8vw, 88px) clamp(16px, 4vw, 24px)",
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(32px, 5vw, 48px)",
          alignItems: "center",
        }}
      >
        {/* Left Column: Organization & Heritage */}
        <div
          style={{
            flex: "1 1 420px",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "16px",
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
            About us
          </div>

          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(26px, 5vw, 38px)",
              lineHeight: 1.15,
              color: "#0D47A1",
            }}
          >
            Built by Yantransh, backed by the Teleindia Group.
          </h2>

          <p
            style={{
              margin: 0,
              color: "#64748B",
              fontSize: "16px",
              lineHeight: 1.6,
            }}
          >
            Yantransh Value Technologies is a Start-up India certified software
            solutions provider, part of the Teleindia Group of Companies, with
            deep telecom and data centre capabilities behind every deployment.
          </p>
        </div>

        {/* Right Column: 3 Metric Cards */}
        <div
          style={{
            flex: "1 1 480px",
            minWidth: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))",
            gap: "16px",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="interactive-card"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "14px",
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "32px",
                  fontWeight: 700,
                  color: "#0D47A1",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "14.5px",
                  color: "#64748B",
                  lineHeight: 1.35,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
