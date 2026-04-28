import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { HOME_FAQS } from "@/lib/seo/home-faqs";
import { buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { SHOW_PUBLIC_FAQ_SCHEMA } from "@/lib/seo/visibility";
import { getStaticRouteConfig } from "@/lib/shared/route-registry";

const route = getStaticRouteConfig("home");

export const metadata: Metadata = route.metadata;

export default function Page() {
  return (
    <>
      <StructuredData
        id="home-webpage-schema"
        data={buildWebPageSchema({
          title: "St. Mary's Rehabilitation University in Hyderabad",
          description:
            "Explore St. Mary's Rehabilitation University in Hyderabad with schools, departments, admissions routes, and program pathways.",
          pathname: "/",
        })}
      />
      <StructuredData id="home-faq-schema" data={SHOW_PUBLIC_FAQ_SCHEMA ? buildFaqSchema(HOME_FAQS) : null} />
      <route.View />
    </>
  );
}
