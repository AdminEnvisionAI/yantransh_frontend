"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toHref } from "../lib/links";

/**
 * The original site used hash routes such as /#/industries/telecom.
 * Redirect those bookmarks and inbound links to the canonical Next.js URLs.
 */
export default function LegacyHashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const redirectLegacyPath = () => {
      if (window.location.hash.startsWith("#/")) router.replace(toHref(window.location.hash));
    };

    redirectLegacyPath();
    window.addEventListener("hashchange", redirectLegacyPath);
    return () => window.removeEventListener("hashchange", redirectLegacyPath);
  }, [router]);

  return null;
}
