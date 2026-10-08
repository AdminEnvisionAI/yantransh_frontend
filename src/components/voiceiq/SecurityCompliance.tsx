export default function SecurityCompliance() {
  const certifications = [
    { title: "ISO 27001:2013", desc: "IT security" },
    { title: "ISO 22301:2019", desc: "Business continuity" },
    { title: "ISO/IEC 20000-1:2018", desc: "IT management systems" },
    { title: "ISO 9001:2015", desc: "Quality" },
    { title: "ISO 14001:2018", desc: "Environment" },
    { title: "ISO 45001:2018", desc: "Occupational health & safety" },
    { title: "EcoVadis rated", desc: "CSR & sustainability" },
    { title: "bizSAFE 3", desc: "WSH Council, Singapore" },
    { title: "95 / 100", desc: "Rapid Ratings financial health" },
  ];

  return (
    <section id="security" style={{ background: "#FFFFFF" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "clamp(56px, 8vw, 96px) clamp(16px, 4vw, 24px)",
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(36px, 5vw, 48px)",
          alignItems: "flex-start",
        }}
      >
        {/* Left Column: Description & Primary Badges */}
        <div
          style={{
            flex: "1 1 380px",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "18px",
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
            Security &amp; compliance
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
            Your data never leaves your walls.
          </h2>

          <p
            style={{
              margin: 0,
              color: "#64748B",
              fontSize: "16.5px",
              lineHeight: 1.6,
            }}
          >
            VoiceIQ runs on owned infrastructure in an enterprise-grade,
            certified data centre backed by the Teleindia Group. Audio,
            transcripts and knowledge stay in-house, with tenant-level data
            isolation and continuous governance over data, privacy, metrics and
            accountability.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "8px",
            }}
          >
            <span
              style={{
                background: "#0D47A1",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: "14px",
                padding: "10px 16px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(13, 71, 161, 0.15)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2196F3"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              HIPAA compliance
            </span>

            <span
              style={{
                background: "#0D47A1",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: "14px",
                padding: "10px 16px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(13, 71, 161, 0.15)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2196F3"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              TIA-942-B Rated-3
            </span>
          </div>
        </div>

        {/* Right Column: 9 Certifications Grid */}
        <div
          style={{
            flex: "1 1 520px",
            minWidth: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))",
            gap: "14px",
          }}
        >
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="interactive-card"
              style={{
                background: "#F4F6FA",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                padding: "20px 18px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#0D47A1",
                }}
              >
                {cert.title}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#64748B",
                  lineHeight: 1.4,
                }}
              >
                {cert.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
