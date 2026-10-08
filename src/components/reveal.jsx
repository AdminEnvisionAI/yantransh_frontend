"use client";

import { useEffect, useRef, useState } from "react";

/* Reveal-on-scroll hook and wrappers */
export function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export const Rv = ({ children, d = 0, style: s = {} }) => {
  const [r, v] = useInView();
  return <div ref={r} style={{ ...s, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(24px)", transition: `opacity 0.5s ease ${d}s, transform 0.5s ease ${d}s` }}>{children}</div>;
};
