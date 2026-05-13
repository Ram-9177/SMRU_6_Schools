import PartnerIframePage from "@/views/PartnerIframePage";
import EdinboxForensicLandingV2 from "@/views/EdinboxForensicLandingV2";
import IstLandingV2 from "@/views/IstLandingV2";
import { EDU_PARTNERS } from "@/data/schools";
import { buildMetadata } from "@/lib/metadata";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";
import type { Metadata } from "next";

const partnerSlug = (partner: any) => (partner.landingUrl || partner.code || "").replace(/^\//, "").toLowerCase();

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const partner = Object.values(EDU_PARTNERS || {}).find((item: any) => partnerSlug(item) === params.slug);
  const name = (partner as any)?.name || params.slug.toUpperCase();
  return buildMetadata({
    title: `${name} Partner | St. Mary's Rehabilitation University`,
    description: `Explore ${name} education partner programs and pathways at St. Mary's Rehabilitation University.`,
    pathname: `/partner/${params.slug}`,
  });
}

export function generateStaticParams() {
  return Object.values(EDU_PARTNERS || {})
    .map(partnerSlug)
    .filter(Boolean)
    .map((slug) => ({ slug }));
}

export default function PartnerDetailPage({ params }: { params: { slug: string } }) {
  const partner = Object.values(EDU_PARTNERS || {}).find((item: any) => partnerSlug(item) === params.slug);
  const name = (partner as any)?.name || params.slug.toUpperCase();
  return (
    <>
      <StructuredData
        id={`${params.slug}-breadcrumb-schema`}
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Partners", path: "/partner" },
          { name, path: `/partner/${params.slug}` },
        ])}
      />
      <StructuredData
        id={`${params.slug}-page-schema`}
        data={buildWebPageSchema({
          title: `${name} Partner`,
          description: `Explore ${name} education partner programs and pathways at St. Mary's Rehabilitation University.`,
          pathname: `/partner/${params.slug}`,
        })}
      />
      {params.slug === "edinbox" ? (
        <EdinboxForensicLandingV2 />
      ) : params.slug === "ist" ? (
        <IstLandingV2 />
      ) : (
        <PartnerIframePage slug={params.slug} />
      )}
    </>
  );
}
