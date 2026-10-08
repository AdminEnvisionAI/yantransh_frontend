"use client";

import { useEffect, useImperativeHandle, useRef, type CSSProperties, type Ref } from "react";

interface TurnstileApi {
  render(el: HTMLElement, options: Record<string, unknown>): string;
  reset(id: string): void;
  remove(id: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export interface CaptchaHandle {
  reset(): void;
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let scriptPromise: Promise<void> | undefined;

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  scriptPromise ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = undefined;
      reject(new Error("Could not load the security check."));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

/**
 * Cloudflare Turnstile widget. Calls onToken with the verification token
 * (or "" when it expires or fails). Call ref.current.reset() after each submit,
 * because a token can only be verified once.
 */
export function Captcha({
  onToken,
  theme = "light",
  style,
  ref,
}: {
  onToken: (token: string) => void;
  theme?: "light" | "dark" | "auto";
  style?: CSSProperties;
  ref?: Ref<CaptchaHandle>;
}) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetId.current != null) window.turnstile?.reset(widgetId.current);
      onTokenRef.current("");
    },
  }));

  useEffect(() => {
    if (!siteKey) {
      console.error("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set; the security check cannot load.");
      return undefined;
    }
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        if (cancelled || !container.current) return;
        widgetId.current = window.turnstile!.render(container.current, {
          sitekey: siteKey,
          theme,
          callback: (token: string) => onTokenRef.current(token),
          "expired-callback": () => onTokenRef.current(""),
          "error-callback": () => onTokenRef.current(""),
        });
      })
      .catch(() => onTokenRef.current(""));

    return () => {
      cancelled = true;
      if (widgetId.current != null) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [siteKey, theme]);

  return <div ref={container} data-testid="captcha" style={{ minHeight: 65, ...style }} />;
}

/** Off-screen field that only bots fill in; the APIs silently drop submissions that include it. */
export function Honeypot({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: -10000, top: "auto", width: 1, height: 1, overflow: "hidden" }}>
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}
