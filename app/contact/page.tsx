import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildContactPageSchema, buildFaqSchema } from "@/lib/seo/schema";
import { getStaticRouteConfig } from "@/lib/shared/route-registry";
import { CONTACT_FAQS } from "@/lib/seo/static-page-faqs";
import { SHOW_PUBLIC_FAQ_SCHEMA } from "@/lib/seo/visibility";

const route = getStaticRouteConfig("contact");

export const metadata: Metadata = route.metadata;

export default function Page() {
  return (
    <>
      <StructuredData
        id="contact-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <StructuredData id="contact-page-schema" data={buildContactPageSchema("/contact")} />
      <StructuredData id="contact-faq-schema" data={SHOW_PUBLIC_FAQ_SCHEMA ? buildFaqSchema(CONTACT_FAQS) : null} />
      <route.View />
    </>
  );
}
