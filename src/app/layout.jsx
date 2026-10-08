import SiteHeader from "../components/site-header";
import LegacyHashRedirect from "../components/legacy-hash-redirect";
import JsonLd from "../components/json-ld";
import { SITE_NAME, SITE_URL } from "../lib/site-routes";
import contentData from "../data/content.json";
import "./globals.css";

const description =
  "YantranshVT helps enterprises turn strategy into execution through data and AI, product engineering, cloud, talent solutions and AI products such as VoiceIQ.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "YantranshVT | Strategy, Technology & Talent Excellence",
    template: `%s | ${SITE_NAME}`,
  },
  description,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "YantranshVT | Strategy, Technology & Talent Excellence",
    description,
    url: "/",
    images: ["/images/logo.png"],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/images/logo.png" },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  slogan: contentData.company.tagline,
  email: contentData.company.email,
  address: contentData.company.locations.map((loc) => ({ "@type": "PostalAddress", addressLocality: loc.city, addressCountry: loc.country })),
  contactPoint: [
    { "@type": "ContactPoint", contactType: "sales", email: "Info@yantranshVT.com" },
    { "@type": "ContactPoint", contactType: "human resources", email: "HR@yantranshVT.com" },
  ],
  makesOffer: contentData.products.map((product) => ({
    "@type": "Offer",
    itemOffered: { "@type": "SoftwareApplication", name: product.name, url: `${SITE_URL}${product.href}` },
  })),
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
        <JsonLd data={organization} />
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
