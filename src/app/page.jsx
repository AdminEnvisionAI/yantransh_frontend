import { HomePage } from "../components/home-page";
import SiteFooter from "../components/site-footer";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <>
      <HomePage />
      <SiteFooter />
    </>
  );
}
