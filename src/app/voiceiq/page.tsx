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
import { ORG_ID, breadcrumbSchema, faqSchema, graph, webPageSchema } from "../../lib/schema";
import SiteFooter from "../../components/site-footer";
import { SITE_NAME, SITE_URL, ogImage } from "../../lib/site-routes";
import "../../components/voiceiq/voiceiq.css";

const title = "VoiceIQ | Enterprise AI Voice Agents";
const description =
  "VoiceIQ by YantranshVT: an enterprise AI voice agent that answers every call in under 800 ms, grounded in your knowledge base and run on your private cloud.";
const path = "/voiceiq";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ["VoiceIQ", "AI voice agent", "enterprise voice AI", "AI call center", "conversational AI", "private cloud AI", "WhatsApp voice bot", "YantranshVT"],
  alternates: { canonical: path },
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_US", title, description, url: path, images: [ogImage("voiceiq", title)] },
  twitter: { card: "summary_large_image", title, description, images: ["/og/voiceiq.png"] },
};

const plan = (name: string, price: number, description: string) => ({
  "@type": "Offer",
  name,
  description,
  price,
  priceCurrency: "INR",
  priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "INR", unitText: "month", billingDuration: "P1M" },
  url: `${SITE_URL}${path}#pricing`,
});

const structuredData = graph(
  webPageSchema({ path, name: title, description, about: `${SITE_URL}${path}#product` }),
  breadcrumbSchema(path, [{ name: "VoiceIQ", path }]),
  {
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}${path}#product`,
    name: "VoiceIQ",
    url: `${SITE_URL}${path}`,
    description,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "AI voice agent",
    operatingSystem: "Cloud (private deployment)",
    featureList: [
      "Answers calls in under 800 ms",
      "Grounded in your own knowledge base",
      "Runs entirely on your private cloud",
      "Phone, website voice and WhatsApp chat + voice",
      "Escalation to human agents",
      "CRM and custom integrations",
    ],
    publisher: { "@id": ORG_ID },
    provider: { "@id": ORG_ID },
    offers: [
      plan("Starter", 25000, "Platform & AI agent, dashboard, basic integration, 5,000 minutes included; additional minutes ₹4/min."),
      plan("Growth", 50000, "Platform & AI agent, 15,000 minutes included, CRM integration; additional minutes ₹3/min."),
    ],
  },
  faqSchema(path, faqs),
);

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
