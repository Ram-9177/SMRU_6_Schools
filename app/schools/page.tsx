import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildCollectionPageSchema } from "@/lib/seo/schema";
import { getStaticRouteConfig } from "@/lib/shared/route-registry";

const route = getStaticRouteConfig("schools");

export const metadata: Metadata = route.metadata;

export default function Page() {
  return (
    <>
      <StructuredData
        id="schools-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Schools", path: "/schools" },
        ])}
      />
      <StructuredData
        id="schools-page-schema"
        data={buildCollectionPageSchema({
          title: "Schools",
          description: "Explore schools, departments, and program categories at St. Mary's Rehabilitation University.",
          pathname: "/schools",
        })}
      />
      <route.View />
    </>
  );
}
