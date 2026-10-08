export default function Industries() {
  const industries = [
    {
      title: "Healthcare",
      items: [
        "Appointment scheduling",
        "Proactive appointment reminders",
        "Prescription & benefits status",
      ],
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
        </svg>
      ),
    },
    {
      title: "E-commerce & retail",
      items: [
        "Order status, returns & refunds",
        "In-call payment processing",
        "Personalised outbound updates",
      ],
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
        </svg>
      ),
    },
    {
      title: "Travel & logistics",
      items: [
        "Booking changes & rebooking",
        "Shipment & delivery tracking",
        "Omnichannel handoff (chat + voice)",
      ],
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M1 3h15v13H1z" />
          <path d="M16 8h4l3 3v5h-7z" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
    },
    {
      title: "Insurance",
      items: [
        "Claims status & first notice of loss",
        "Callback & adjuster scheduling",
        "Distressed-caller escalation",
      ],
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M23 12a11 11 0 0 0-22 0z" />
          <path d="M12 12v7a3 3 0 0 1-6 0" />
        </svg>
      ),
    },
    {
      title: "Telecommunications",
      items: [
        "Outage & service notifications",
        "Ticketing system integration",
        "Multilingual customer support",
      ],
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4.9 19.1a10 10 0 0 1 0-14.2M19.1 4.9a10 10 0 0 1 0 14.2M7.8 16.2a6 6 0 0 1 0-8.4M16.2 7.8a6 6 0 0 1 0 8.4" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
  ];

  return (
    <section id="industries" style={{ background: "#0D47A1", color: "#FFFFFF" }}>
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
              color: "#2196F3",
            }}
          >
            Industries
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(28px, 5vw, 44px)",
              lineHeight: 1.15,
            }}
          >
            One platform, extended for what your industry needs most.
          </h2>
        </div>

        {/* 5 Industry Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))",
            gap: "20px",
          }}
        >
          {industries.map((ind) => (
            <div
              key={ind.title}
              className="interactive-card-dark"
              style={{
                background: "rgba(255, 255, 255, 0.07)",
                border: "1px solid rgba(255, 255, 255, 0.16)",
                borderRadius: "14px",
                padding: "clamp(20px, 4vw, 26px)",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                backdropFilter: "blur(4px)",
              }}
            >
              <span style={{ color: "#2196F3" }}>{ind.icon}</span>

              <h3
                style={{
                  margin: 0,
                  fontSize: "19px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                }}
              >
                {ind.title}
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  fontSize: "15px",
                  color: "#DCEFFB",
                  lineHeight: 1.45,
                }}
              >
                {ind.items.map((item, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        color: "#2196F3",
                        fontSize: "13px",
                        lineHeight: "1.4",
                      }}
                    >
                      •
                    </span>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
