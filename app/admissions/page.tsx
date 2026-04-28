import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { getStaticRouteConfig } from "@/lib/shared/route-registry";
import { ADMISSIONS_FAQS } from "@/lib/seo/static-page-faqs";
import { SHOW_PUBLIC_FAQ_SCHEMA } from "@/lib/seo/visibility";

const route = getStaticRouteConfig("admissions");

export const metadata: Metadata = route.metadata;

export default function Page() {
  return (
    <>
      <StructuredData
        id="admissions-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Admissions", path: "/admissions" },
        ])}
      />
      <StructuredData
        id="admissions-page-schema"
        data={buildWebPageSchema({
          title: "Admissions",
          description: "Admissions for UG, PG, diploma, and doctoral pathways at St. Mary's Rehabilitation University.",
          pathname: "/admissions",
        })}
      />
      <StructuredData
        id="admissions-faq-schema"
        data={SHOW_PUBLIC_FAQ_SCHEMA ? buildFaqSchema(ADMISSIONS_FAQS) : null}
      />
      <route.View />
    </>
  );
}
