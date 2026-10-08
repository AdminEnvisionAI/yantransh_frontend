"use client";

import { useId, useState } from "react";
import { T, W, Icon } from "../theme";
import { Rv } from "./reveal";

/**
 * Accordion of frequently asked questions in the site's visual style.
 * Answers are always rendered in the HTML (only visually collapsed) so that
 * search and answer engines can read them; they match the page's FAQPage schema.
 */
export default function FaqSection({ faqs, title = "Frequently Asked Questions", intro, background = T.white, padding = "70px 0 80px" }) {
  const [open, setOpen] = useState(0);
  const id = useId();
  if (!faqs?.length) return null;

  return (
    <section aria-labelledby={`${id}-title`} style={{ padding, background }}>
      <W>
        <Rv><h2 id={`${id}-title`} style={{ fontFamily: T.fd, fontSize: 36, fontWeight: 700, color: T.navy, marginBottom: 8 }}>{title}</h2></Rv>
        {intro && <Rv d={0.06}><p style={{ fontFamily: T.fn, fontSize: 15, color: T.txtS, lineHeight: 1.7, maxWidth: 600, marginBottom: 28 }}>{intro}</p></Rv>}
        <div style={{ maxWidth: 860, marginTop: intro ? 0 : 28 }}>
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} style={{ borderBottom: `1px solid ${T.bdr}` }}>
                <h3 style={{ margin: 0 }}>
                  <button
                    type="button"
                    id={`${id}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    style={{ width: "100%", padding: "18px 0", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, textAlign: "left" }}
                  >
                    <span style={{ fontFamily: T.fn, fontSize: 16, fontWeight: 700, color: isOpen ? T.blue : T.navy, transition: "color 0.3s" }}>{faq.q}</span>
                    <span style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s", color: T.txtS, flexShrink: 0, display: "inline-flex" }}><Icon name="chevDown" size={18} /></span>
                  </button>
                </h3>
                <div id={`${id}-a${i}`} role="region" aria-labelledby={`${id}-q${i}`} style={{ display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr", transition: "grid-template-rows 0.35s ease" }}>
                  <div style={{ overflow: "hidden" }}>
                    <p style={{ fontFamily: T.fn, fontSize: 14, color: T.txtS, lineHeight: 1.7, padding: "0 0 18px" }}>{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </W>
    </section>
  );
}
