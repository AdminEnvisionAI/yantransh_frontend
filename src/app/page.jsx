import { HomePage } from "../components/home-page";
import SiteFooter from "../components/site-footer";
import JsonLd from "../components/json-ld";
import { getFaqs } from "../lib/site-routes";
import { ORG_ID, faqSchema, graph, webPageSchema } from "../lib/schema";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Page() {
  const faqs = getFaqs("home");
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/", name: "YantranshVT | Strategy, Technology & Talent Excellence", description: "Strategy, technology and talent solutions for enterprises: Data & AI, Product Engineering, Cloud & Infrastructure and Talent Solutions.", about: ORG_ID, breadcrumb: false, type: ["WebPage", "AboutPage"] }),
          faqSchema("/", faqs),
        )}
      />
      <main>
        <HomePage faqs={faqs} />
      </main>
      <SiteFooter />
    </>
  );
}
