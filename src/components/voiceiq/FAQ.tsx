"use client";

import React, { useState } from "react";
import { faqs } from "./faqs";

export default function FAQ() {
  const [openIndices, setOpenIndices] = useState<number[]>([]);


  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section style={{ background: "#FFFFFF" }}>
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "clamp(56px, 8vw, 96px) clamp(16px, 4vw, 24px)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(28px, 5vw, 40px)",
        }}
      >
        {/* Section Heading */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            textAlign: "center",
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
            FAQ
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
            Questions we hear most
          </h2>
        </div>

        {/* Accordion List */}
        <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid #E2E8F0" }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndices.includes(index);
            return (
              <div
                key={index}
                style={{
                  borderBottom: "1px solid #E2E8F0",
                  padding: "clamp(18px, 3.5vw, 24px) 0",
                  transition: "background 0.2s ease",
                }}
              >
                <button
                  onClick={() => toggleIndex(index)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                    background: "none",
                    border: "none",
                    padding: 0,
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "clamp(16px, 4vw, 18px)",
                    fontWeight: 600,
                    color: isOpen ? "#0D47A1" : "#1E293B",
                    transition: "color 0.2s ease",
                    minHeight: "44px",
                  }}
                >
                  <span style={{ lineHeight: 1.4 }}>{faq.q}</span>
                  <span
                    style={{
                      color: "#0D47A1",
                      fontSize: "24px",
                      fontWeight: 500,
                      lineHeight: 1,
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "28px",
                      height: "28px",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    style={{
                      margin: "14px 0 0",
                      color: "#64748B",
                      fontSize: "16px",
                      lineHeight: 1.6,
                      animation: "fade-in-up 0.25s ease-out",
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
