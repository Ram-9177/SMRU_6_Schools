import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildCollectionPageSchema } from "@/lib/seo/schema";
import { getStaticRouteConfig } from "@/lib/shared/route-registry";

const route = getStaticRouteConfig("partner");

export const metadata: Metadata = route.metadata;

export default function Page() {
  return (
    <>
      <StructuredData
        id="partner-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Partners", path: "/partner" },
        ])}
      />
      <StructuredData
        id="partner-page-schema"
        data={buildCollectionPageSchema({
          title: "Education Partners",
          description: "Explore public education and industry partner routes published on the SMRU website.",
          pathname: "/partner",
        })}
      />
      <route.View />
    </>
  );
}
