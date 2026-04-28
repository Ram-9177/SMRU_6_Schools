import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { getStaticRouteConfig } from "@/lib/shared/route-registry";
import { PHD_FAQS } from "@/lib/seo/static-page-faqs";
import { SHOW_PUBLIC_FAQ_SCHEMA } from "@/lib/seo/visibility";

const route = getStaticRouteConfig("phdAdmissions");

export const metadata: Metadata = route.metadata;

export default function Page() {
  return (
    <>
      <StructuredData
        id="phd-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Ph.D. Admissions", path: "/phd-admissions" },
        ])}
      />
      <StructuredData
        id="phd-page-schema"
        data={buildWebPageSchema({
          title: "Ph.D. Admissions",
          description: "Ph.D. admissions details, notices, and doctoral application routes for St. Mary's Rehabilitation University.",
          pathname: "/phd-admissions",
        })}
      />
      <StructuredData id="phd-faq-schema" data={SHOW_PUBLIC_FAQ_SCHEMA ? buildFaqSchema(PHD_FAQS) : null} />
      <route.View />
    </>
  );
}
