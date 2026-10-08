import { notFound, permanentRedirect } from "next/navigation";
import DetailPage from "../../../site-pages/DetailPage";
import DetailFooter from "../../../components/detail-footer";
import { getRouteMetadata, industryAliases, industryRoutes } from "../../../lib/site-routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...Object.keys(industryRoutes), ...Object.keys(industryAliases)].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const canonicalSlug = industryAliases[slug] || slug;
  const route = industryRoutes[canonicalSlug];
  return route ? getRouteMetadata(route.contentKey, `/industries/${canonicalSlug}`) : {};
}

export default async function IndustryPage({ params }) {
  const { slug } = await params;
  if (industryAliases[slug]) permanentRedirect(`/industries/${industryAliases[slug]}`);

  const route = industryRoutes[slug];
  if (!route) notFound();

  return (
    <>
      <DetailPage {...route} />
      <DetailFooter />
    </>
  );
}
