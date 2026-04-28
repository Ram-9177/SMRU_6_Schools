import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { getStaticRouteConfig } from "@/lib/shared/route-registry";

const route = getStaticRouteConfig("about");

export const metadata: Metadata = route.metadata;

export default function Page() {
  return (
    <>
      <StructuredData
        id="about-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <StructuredData
        id="about-page-schema"
        data={buildWebPageSchema({
          title: "About St. Mary's Rehabilitation University",
          description: "Read about the leadership, institutional journey, and academic direction of St. Mary's Rehabilitation University in Hyderabad.",
          pathname: "/about",
          type: "AboutPage",
        })}
      />
      <route.View />
    </>
  );
}
