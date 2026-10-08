import Link from "next/link";
import DetailFooter from "../components/detail-footer";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <section className="status-page">
        <p className="status-page__code">404</p>
        <h1>This page could not be found.</h1>
        <Link href="/">Back to Home Page</Link>
      </section>
      <DetailFooter />
    </>
  );
}
