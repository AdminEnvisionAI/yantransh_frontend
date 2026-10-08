import SiteHeader from "../components/site-header";
import LegacyHashRedirect from "../components/legacy-hash-redirect";
import JsonLd from "../components/json-ld";
import { SITE_NAME, SITE_URL, ogImage } from "../lib/site-routes";
import { graph, organizationSchema, websiteSchema } from "../lib/schema";
import "./globals.css";

const title = "YantranshVT | Strategy, Technology & Talent Excellence";
const description =
  "YantranshVT turns enterprise strategy into execution with Data & AI, Product Engineering, Cloud, Talent Solutions and the VoiceIQ AI voice agent.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s | ${SITE_NAME}` },
  description,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  keywords: ["YantranshVT", "Yantransh", "digital transformation", "Data and AI services", "Agentic AI", "product engineering", "cloud migration", "AWS", "Azure", "staff augmentation", "telecom", "BFSI", "healthcare", "life sciences", "VoiceIQ", "AI voice agent"],
  alternates: { canonical: "/" },
  // Allow full snippets and large image previews in search results and AI answers.
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_US", title, description, url: "/", images: [ogImage("home", title)] },
  twitter: { card: "summary_large_image", title, description, images: ["/og/home.png"] },
  icons: { icon: "/images/logo.png", apple: "/images/logo-square.png" },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="alternate" type="text/plain" title="LLM-friendly site summary" href="/llms.txt" />
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
      </head>
      <body>
        <div style={{ background: "#fff" }}>
          <SiteHeader />
          {children}
        </div>
        <LegacyHashRedirect />
      </body>
    </html>
  );
}
