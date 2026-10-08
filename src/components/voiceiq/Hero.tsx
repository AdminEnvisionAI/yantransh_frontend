"use client";

import { useState, useEffect } from "react";

export default function Hero() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeStep, setActiveStep] = useState(4); // 1 to 4 steps visible

  // Optional auto-demo loop toggle
  const togglePlaySimulation = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      setActiveStep(4);
    } else {
      setIsPlayingAudio(true);
      setActiveStep(1);
    }
  };

  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;
    let timer3: NodeJS.Timeout;
    let timer4: NodeJS.Timeout;

    if (isPlayingAudio) {
      timer1 = setTimeout(() => setActiveStep(2), 1200);
      timer2 = setTimeout(() => setActiveStep(3), 2600);
      timer3 = setTimeout(() => setActiveStep(4), 4000);
      timer4 = setTimeout(() => setIsPlayingAudio(false), 8000);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isPlayingAudio]);

  return (
    <section
      id="top"
      className="voice-hero"
      style={{
        background:
          "linear-gradient(112deg, rgba(11, 29, 58, 0.98) 0%, rgba(13, 71, 161, 0.94) 54%, rgba(13, 71, 161, 0.88) 100%)",
        color: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative ambient background circles */}
      <div
        className="animate-float"
        style={{
          position: "absolute",
          width: "620px",
          height: "620px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 70%)",
          right: "-180px",
          top: "-220px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(33,150,243,0.06) 0%, rgba(33,150,243,0) 70%)",
          left: "-140px",
          bottom: "-200px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "clamp(44px, 7vw, 72px) clamp(16px, 4vw, 24px) clamp(56px, 8vw, 96px)",
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(36px, 6vw, 56px)",
          alignItems: "center",
        }}
      >
        {/* Left Column: Headline, subhead, CTAs, metrics */}
        <div
          style={{
            flex: "1 1 480px",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#2196F3",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Enterprise-grade · Real-time voice AI
          </div>

          {/* Heading */}
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: "clamp(30px, 6.5vw, 60px)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              color: "#FFFFFF",
            }}
          >
            AI voice agents that speak your business language.
          </h1>

          {/* Description */}
          <p
            style={{
              margin: 0,
              fontSize: "clamp(16px, 3.8vw, 19px)",
              color: "#DCEFFB",
              maxWidth: "560px",
              lineHeight: 1.6,
            }}
          >
            VoiceIQ answers every call in under 800 ms, grounded in your own
            knowledge base, and runs entirely on your private cloud. No AWS,
            GCP, Azure or third-party AI dependency.
          </p>

          {/* Action CTAs */}
          <div
            className="hero-buttons-container"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "14px",
              marginTop: "6px",
            }}
          >
            <button
              className="btn-primary"
              onClick={() => {
                document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              style={{
                fontSize: "16px",
                padding: "14px 26px",
                cursor: "pointer",
                fontFamily: "inherit",
                border: "none",
              }}
            >
              Book a demo
            </button>

            <button
              onClick={() => {
                document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="btn-secondary"
              aria-label="Talk to the agent now interactive demo"
              style={{ cursor: "pointer", fontFamily: "inherit" }}
            >
              <svg
                width="18"
                height="18"
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
              Talk to the agent now
            </button>
          </div>

          {/* 4 Stats Grid */}
          <div
            className="hero-stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(115px, 1fr))",
              gap: "20px",
              marginTop: "20px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255, 255, 255, 0.18)",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "30px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                &lt; 800 ms
              </div>
              <div style={{ fontSize: "14px", color: "#DCEFFB", marginTop: "2px" }}>
                End-to-end response
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "30px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                24 × 7
              </div>
              <div style={{ fontSize: "14px", color: "#DCEFFB", marginTop: "2px" }}>
                Always-on conversations
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "30px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                &lt; 1 day
              </div>
              <div style={{ fontSize: "14px", color: "#DCEFFB", marginTop: "2px" }}>
                Time to first call
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "30px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                100%
              </div>
              <div style={{ fontSize: "14px", color: "#DCEFFB", marginTop: "2px" }}>
                Data stays in-house
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Call Mockup Card */}
        <div
          style={{
            flex: "1 1 400px",
            minWidth: 0,
            maxWidth: "480px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              color: "#1E293B",
              borderRadius: "18px",
              boxShadow: "0 30px 60px rgba(5,30,50,0.38), 0 0 0 1px rgba(255,255,255,0.1)",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            {/* Mockup Card Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                background: "#F4F6FA",
                borderBottom: "1px solid #E2E8F0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#2E9E5B",
                    display: "inline-block",
                  }}
                  className="animate-pulse-live"
                />
                <span style={{ fontWeight: 600, fontSize: "15px", color: "#1E293B" }}>
                  Live call · Inbound
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "13px", color: "#64748B" }}>
                  Sample conversation
                </span>
                <button
                  onClick={togglePlaySimulation}
                  title="Replay conversation simulation"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#0D47A1",
                    cursor: "pointer",
                    padding: "2px 4px",
                    fontSize: "12px",
                    fontWeight: 600,
                    textDecoration: "underline",
                  }}
                >
                  {isPlayingAudio ? "Stop" : "Replay"}
                </button>
              </div>
            </div>

            {/* Mockup Card Body / Chat messages */}
            <div
              style={{
                padding: "22px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                fontSize: "15px",
                minHeight: "340px",
              }}
            >
              {/* Message 1: Caller */}
              {activeStep >= 1 && (
                <div
                  style={{
                    alignSelf: "flex-start",
                    maxWidth: "84%",
                    background: "#F4F6FA",
                    border: "1px solid #E2E8F0",
                    padding: "10px 14px",
                    borderRadius: "14px 14px 14px 4px",
                    animation: "fade-in-up 0.25s ease-out",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#64748B",
                      marginBottom: "2px",
                    }}
                  >
                    Caller
                  </div>
                  Hi, I&apos;d like to check the status of my claim.
                </div>
              )}

              {/* Message 2: VoiceIQ Agent */}
              {activeStep >= 2 && (
                <div
                  style={{
                    alignSelf: "flex-end",
                    maxWidth: "84%",
                    background: "#0D47A1",
                    color: "#FFFFFF",
                    padding: "10px 14px",
                    borderRadius: "14px 14px 4px 14px",
                    animation: "fade-in-up 0.25s ease-out",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#2196F3",
                      marginBottom: "2px",
                    }}
                  >
                    VoiceIQ
                  </div>
                  Of course. Could you tell me your claim number?
                </div>
              )}

              {/* Message 3: Caller */}
              {activeStep >= 3 && (
                <div
                  style={{
                    alignSelf: "flex-start",
                    maxWidth: "84%",
                    background: "#F4F6FA",
                    border: "1px solid #E2E8F0",
                    padding: "10px 14px",
                    borderRadius: "14px 14px 14px 4px",
                    animation: "fade-in-up 0.25s ease-out",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#64748B",
                      marginBottom: "2px",
                    }}
                  >
                    Caller
                  </div>
                  It&apos;s C-L-M four eight two one three.
                </div>
              )}

              {/* Processing Pill badge */}
              {activeStep >= 3 && (
                <div
                  style={{
                    alignSelf: "center",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "12.5px",
                    fontWeight: 600,
                    color: "#0D47A1",
                    background: "#E3F2FD",
                    padding: "6px 14px",
                    borderRadius: "999px",
                    animation: "fade-in-up 0.25s ease-out",
                    boxShadow: "0 2px 6px rgba(184,87,10,0.12)",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                  Looking up claim in CRM
                </div>
              )}

              {/* Message 4: VoiceIQ Agent resolution */}
              {activeStep >= 4 && (
                <div
                  style={{
                    alignSelf: "flex-end",
                    maxWidth: "84%",
                    background: "#0D47A1",
                    color: "#FFFFFF",
                    padding: "10px 14px",
                    borderRadius: "14px 14px 4px 14px",
                    animation: "fade-in-up 0.25s ease-out",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#2196F3",
                      marginBottom: "2px",
                    }}
                  >
                    VoiceIQ
                  </div>
                  Thanks. Your claim has been approved and the payout is being
                  processed. Would you like me to send the details by WhatsApp?
                </div>
              )}
            </div>

            {/* Mockup Card Footer: Real-time Audio Wave & Latency badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "16px 20px",
                borderTop: "1px solid #E2E8F0",
                background: "#FFFFFF",
              }}
            >
              {/* Dynamic waveform visualization */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3.5px",
                  height: "28px",
                  padding: "0 4px",
                }}
              >
                {[
                  { h: 8, delay: "0s" },
                  { h: 16, delay: "0.2s" },
                  { h: 24, delay: "0.4s" },
                  { h: 14, delay: "0.1s" },
                  { h: 10, delay: "0.3s" },
                  { h: 20, delay: "0.5s" },
                  { h: 28, delay: "0.25s" },
                  { h: 18, delay: "0.45s" },
                  { h: 12, delay: "0.15s" },
                  { h: 22, delay: "0.35s" },
                  { h: 16, delay: "0.05s" },
                  { h: 8, delay: "0.2s" },
                  { h: 14, delay: "0.4s" },
                  { h: 6, delay: "0.1s" },
                ].map((bar, i) => (
                  <span
                    key={i}
                    style={{
                      width: "3px",
                      height: `${bar.h}px`,
                      background: "#0D47A1",
                      borderRadius: "2px",
                      animation: `wave-bounce 1.1s ease-in-out infinite alternate ${bar.delay}`,
                    }}
                  />
                ))}
              </div>

              <span
                style={{
                  marginLeft: "auto",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#0D47A1",
                  background: "#DCEFFB",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  whiteSpace: "nowrap",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#2E9E5B",
                  }}
                />
                Response &lt; 800 ms
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
