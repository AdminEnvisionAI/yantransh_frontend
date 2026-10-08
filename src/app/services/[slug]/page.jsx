import { notFound } from "next/navigation";
import DetailPage from "../../../site-pages/DetailPage";
import DetailFooter from "../../../components/detail-footer";
import { getRouteMetadata, serviceRoutes } from "../../../lib/site-routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(serviceRoutes).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const route = serviceRoutes[slug];
  return route ? getRouteMetadata(route.contentKey, `/services/${slug}`) : {};
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const route = serviceRoutes[slug];
  if (!route) notFound();

  return (
    <>
      <DetailPage {...route} />
      <DetailFooter />
    </>
  );
}
