import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { getStaticRouteConfig } from "@/lib/shared/route-registry";

const route = getStaticRouteConfig("approvalsRecognitions");

export const metadata: Metadata = route.metadata;

export default function Page() {
  return (
    <>
      <StructuredData
        id="approvals-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Approvals & Recognitions", path: "/approvals-recognitions" },
        ])}
      />
      <StructuredData
        id="approvals-page-schema"
        data={buildWebPageSchema({
          title: "Approvals & Recognitions",
          description: "Official approvals, recognitions, and regulatory disclosure page for St. Mary's Rehabilitation University.",
          pathname: "/approvals-recognitions",
        })}
      />
      <route.View />
    </>
  );
}
