import type { Metadata } from "next";
import AboutUs from "../../components/voiceiq/AboutUs";
import Clientele from "../../components/voiceiq/Clientele";
import FAQ from "../../components/voiceiq/FAQ";
import Hero from "../../components/voiceiq/Hero";
import HowItWorks from "../../components/voiceiq/HowItWorks";
import Industries from "../../components/voiceiq/Industries";
import LeadForm from "../../components/voiceiq/LeadForm";
import Omnichannel from "../../components/voiceiq/Omnichannel";
import Onboarding from "../../components/voiceiq/Onboarding";
import Pricing from "../../components/voiceiq/Pricing";
import SecurityCompliance from "../../components/voiceiq/SecurityCompliance";
import WhyVoiceIQ from "../../components/voiceiq/WhyVoiceIQ";
import { faqs } from "../../components/voiceiq/faqs";
import JsonLd from "../../components/json-ld";
import SiteFooter from "../../components/site-footer";
import { SITE_URL } from "../../lib/site-routes";
import "../../components/voiceiq/voiceiq.css";

const title = "VoiceIQ | Enterprise AI Voice Agents";
const description =
  "VoiceIQ by YantranshVT delivers private, enterprise-grade AI voice agents for customer support, sales and operations, deployed inside your own infrastructure.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/voiceiq" },
  openGraph: { type: "website", title, description, url: "/voiceiq", images: ["/images/logo.png"] },
  twitter: { card: "summary_large_image", title, description },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "VoiceIQ",
    url: `${SITE_URL}/voiceiq`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Telephony, WhatsApp",
    description,
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  },
];

export default function VoiceIQPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <main className="viq">
        <Hero />
        <Clientele />
        <HowItWorks />
        <WhyVoiceIQ />
        <Omnichannel />
        <Industries />
        <Onboarding />
        <SecurityCompliance />
        <Pricing />
        <FAQ />
        <AboutUs />
        <LeadForm />
      </main>
      <SiteFooter />
    </>
  );
}
