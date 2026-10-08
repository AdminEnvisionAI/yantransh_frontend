"use client";

import { type FormEvent, useRef, useState } from "react";
import { Captcha, Honeypot, type CaptchaHandle } from "../captcha";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    volume: "Under 5,000 minutes",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [trap, setTrap] = useState("");
  const captcha = useRef<CaptchaHandle>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      setErrorMessage("Please complete the security check before submitting.");
      return;
    }
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/send-demo-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, website: trap, captchaToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit your demo request. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
      captcha.current?.reset();
    }
  };

  return (
    <section
      id="demo"
      style={{
        background: "#0D47A1",
        color: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative ambient background circle */}
      <div
        style={{
          position: "absolute",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 70%)",
          right: "-160px",
          bottom: "-260px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "clamp(56px, 8vw, 96px) clamp(16px, 4vw, 24px)",
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(36px, 6vw, 56px)",
          alignItems: "flex-start",
        }}
      >
        {/* Left Column: Pilot steps */}
        <div
          style={{
            flex: "1 1 440px",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(28px, 5.5vw, 52px)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
            }}
          >
            Let&apos;s build your pilot.
          </h2>

          <p
            style={{
              margin: 0,
              fontSize: "clamp(16px, 3.8vw, 19px)",
              color: "#DCEFFB",
              lineHeight: 1.55,
            }}
          >
            See your first AI-answered call within days, not months.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginTop: "12px",
            }}
          >
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span
                style={{
                  flex: "none",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#2196F3",
                  color: "#1E293B",
                  fontWeight: 700,
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                }}
              >
                1
              </span>
              <div>
                <div style={{ fontWeight: 600, fontSize: "17px", color: "#FFFFFF" }}>
                  Kickoff
                </div>
                <div style={{ color: "#DCEFFB", fontSize: "15.5px", marginTop: "2px" }}>
                  Define escalation rules, tone and persona.
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span
                style={{
                  flex: "none",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#2196F3",
                  color: "#1E293B",
                  fontWeight: 700,
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                }}
              >
                2
              </span>
              <div>
                <div style={{ fontWeight: 600, fontSize: "17px", color: "#FFFFFF" }}>
                  Share knowledge
                </div>
                <div style={{ color: "#DCEFFB", fontSize: "15.5px", marginTop: "2px" }}>
                  Provide a handful of database, FAQ and SOP documents.
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span
                style={{
                  flex: "none",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#2196F3",
                  color: "#1E293B",
                  fontWeight: 700,
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                }}
              >
                3
              </span>
              <div>
                <div style={{ fontWeight: 600, fontSize: "17px", color: "#FFFFFF" }}>
                  See it live
                </div>
                <div style={{ color: "#DCEFFB", fontSize: "15.5px", marginTop: "2px" }}>
                  Your first AI-answered call within days.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div
          style={{
            flex: "1 1 400px",
            minWidth: 0,
            maxWidth: "520px",
            width: "100%",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              color: "#1E293B",
              borderRadius: "16px",
              padding: "clamp(24px, 5vw, 36px) clamp(18px, 4vw, 32px)",
              boxShadow: "0 24px 50px rgba(5,30,50,0.3)",
            }}
          >
            {isSubmitted ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "30px 10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                  animation: "fade-in-up 0.3s ease-out",
                }}
              >
                <span
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "#E3F2FD",
                    color: "#0D47A1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2E9E5B"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#0D47A1",
                    fontFamily: "var(--font-serif)",
                  }}
                >
                  Demo Request Received!
                </h3>
                <p style={{ color: "#64748B", fontSize: "16px", lineHeight: 1.5 }}>
                  Thank you, <strong>{formData.name || "there"}</strong>! We&apos;ve sent a confirmation email to <strong>{formData.email}</strong>. Our enterprise team will get back to you within one business day.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      company: "",
                      phone: "",
                      volume: "Under 5,000 minutes",
                    });
                  }}
                  style={{
                    marginTop: "8px",
                    background: "#0D47A1",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >
                <h3 style={{ margin: 0, fontSize: "22px", fontWeight: 600, color: "#1E293B" }}>
                  Talk to our team
                </h3>
                <Honeypot value={trap} onChange={setTrap} />

                {errorMessage && (
                  <div
                    style={{
                      background: "#FDEDEC",
                      color: "#C0392B",
                      border: "1px solid #F5B7B1",
                      borderRadius: "8px",
                      padding: "12px 14px",
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    ⚠️ {errorMessage}
                  </div>
                )}

                <div
                  className="leadform-inputs-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
                    gap: "14px",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#1E293B",
                    }}
                  >
                    Full name
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      style={{
                        font: "inherit",
                        fontWeight: 400,
                        fontSize: "15.5px",
                        padding: "12px 14px",
                        border: "1px solid #94A3B8",
                        borderRadius: "8px",
                        minHeight: "44px",
                        boxSizing: "border-box",
                      }}
                    />
                  </label>

                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#1E293B",
                    }}
                  >
                    Work email
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rahul@company.com"
                      style={{
                        font: "inherit",
                        fontWeight: 400,
                        fontSize: "15.5px",
                        padding: "12px 14px",
                        border: "1px solid #94A3B8",
                        borderRadius: "8px",
                        minHeight: "44px",
                        boxSizing: "border-box",
                      }}
                    />
                  </label>

                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#1E293B",
                    }}
                  >
                    Company
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your Company Name"
                      style={{
                        font: "inherit",
                        fontWeight: 400,
                        fontSize: "15.5px",
                        padding: "12px 14px",
                        border: "1px solid #94A3B8",
                        borderRadius: "8px",
                        minHeight: "44px",
                        boxSizing: "border-box",
                      }}
                    />
                  </label>

                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#1E293B",
                    }}
                  >
                    Phone
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      style={{
                        font: "inherit",
                        fontWeight: 400,
                        fontSize: "15.5px",
                        padding: "12px 14px",
                        border: "1px solid #94A3B8",
                        borderRadius: "8px",
                        minHeight: "44px",
                        boxSizing: "border-box",
                      }}
                    />
                  </label>
                </div>

                <label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#1E293B",
                  }}
                >
                  Monthly call volume
                  <select
                    name="volume"
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    style={{
                      font: "inherit",
                      fontWeight: 400,
                      fontSize: "15.5px",
                      padding: "12px 14px",
                      border: "1px solid #94A3B8",
                      borderRadius: "8px",
                      minHeight: "44px",
                      background: "#FFFFFF",
                      cursor: "pointer",
                    }}
                  >
                    <option value="Under 5,000 minutes">Under 5,000 minutes</option>
                    <option value="5,000 – 15,000 minutes">5,000 – 15,000 minutes</option>
                    <option value="15,000 – 1,00,000 minutes">15,000 – 1,00,000 minutes</option>
                    <option value="Over 1,00,000 minutes">Over 1,00,000 minutes</option>
                  </select>
                </label>

                <Captcha ref={captcha} onToken={setCaptchaToken} />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    font: "inherit",
                    fontWeight: 700,
                    fontSize: "16px",
                    background: "#2196F3",
                    color: "#1E293B",
                    border: 0,
                    borderRadius: "8px",
                    padding: "15px",
                    minHeight: "48px",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    boxShadow: "0 2px 8px rgba(33, 150, 243, 0.35)",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        style={{
                          width: "16px",
                          height: "16px",
                          border: "2px solid #1E293B",
                          borderTopColor: "transparent",
                          borderRadius: "50%",
                          animation: "viq-spin 0.6s linear infinite",
                          display: "inline-block",
                        }}
                      />
                      Processing...
                    </>
                  ) : (
                    "Book my demo"
                  )}
                </button>

                <p style={{ margin: 0, fontSize: "13px", color: "#64748B", lineHeight: 1.45 }}>
                  We&apos;ll get back to you within one business day. By submitting, you
                  agree to our <a href="/legal/privacy-policy">privacy policy</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

    </section>
  );
}
