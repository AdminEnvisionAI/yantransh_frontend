"use client";

export default function Clientele() {
  const partners = [
    {
      name: "Ciena",
      src: "/images/voiceiq/client-ciena.webp",
      height: 44,
      width: 140,
    },
    {
      name: "Nokia",
      src: "/images/voiceiq/client-nokia.webp",
      height: 30,
      width: 130,
    },
    {
      name: "KPMG",
      src: "/images/voiceiq/client-kpmg.webp",
      height: 40,
      width: 110,
    },
    {
      name: "Cisco",
      src: "/images/voiceiq/client-cisco.webp",
      height: 46,
      width: 110,
    },
    {
      name: "Sify",
      src: "/images/voiceiq/client-sify.webp",
      height: 46,
      width: 110,
    },
  ];

  return (
    <section
      style={{
        background: "#FFFFFF",
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "clamp(32px, 5vw, 44px) clamp(16px, 4vw, 24px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#64748B",
            textAlign: "center",
          }}
        >
          Trusted by enterprises across the Teleindia Group
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "clamp(24px, 5vw, 44px) clamp(28px, 6vw, 56px)",
          }}
        >
          {partners.map((partner) => (
            <div
              key={partner.name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s ease, opacity 0.2s ease",
                opacity: 0.88,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.opacity = "0.88";
              }}
            >
              {/* Partner Logo */}
              <img
                src={partner.src}
                alt={partner.name}
                loading="lazy"
                decoding="async"
                style={{
                  height: `${partner.height}px`,
                  width: "auto",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
