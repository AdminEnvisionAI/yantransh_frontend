import { notFound } from "next/navigation";
import DetailFooter from "../../../components/detail-footer";
import { getRouteMetadata, legalRoutes } from "../../../lib/site-routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(legalRoutes).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const route = legalRoutes[slug];
  return route ? getRouteMetadata(route.contentKey, `/legal/${slug}`) : {};
}

export default async function LegalPage({ params }) {
  const { slug } = await params;
  const route = legalRoutes[slug];
  if (!route) notFound();

  const { default: Page } = await route.load();
  return (
    <>
      <Page />
      <DetailFooter />
    </>
  );
}
