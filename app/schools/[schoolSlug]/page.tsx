import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildFaqSchema } from "@/lib/seo/schema";
import { buildSchoolBreadcrumbs, buildSchoolFaqs, resolveSchool } from "@/lib/seo/academic";
import { SHOW_PUBLIC_FAQ_SCHEMA } from "@/lib/seo/visibility";
import School from "@/views/School";
import { getSchoolMetadata } from "@/lib/shared/dynamic-route-metadata";
import { schools } from "@/data/schools";
import { safeSlug } from "@/lib/shared/program-utils";

export function generateMetadata({ params }: { params: { schoolSlug: string } }): Metadata {
  return getSchoolMetadata(params);
}

export function generateStaticParams() {
  return (schools || []).map((school) => ({
    schoolSlug: safeSlug(school.slug, school.name),
  }));
}

export default function Page({ params }: { params: { schoolSlug: string } }) {
  const school = resolveSchool(params.schoolSlug);
  const pathname = `/schools/${params.schoolSlug}`;

  return (
    <>
      <StructuredData
        id={`${params.schoolSlug}-breadcrumb-schema`}
        data={school ? buildBreadcrumbSchema(buildSchoolBreadcrumbs(school)) : null}
      />
      <StructuredData
        id={`${params.schoolSlug}-page-schema`}
        data={buildCollectionPageSchema({
          title: school?.name || "School",
          description: school?.about || "Explore school programs and departments at St. Mary's Rehabilitation University.",
          pathname,
        })}
      />
      <StructuredData
        id={`${params.schoolSlug}-faq-schema`}
        data={school && SHOW_PUBLIC_FAQ_SCHEMA ? buildFaqSchema(buildSchoolFaqs(school)) : null}
      />
      <School />
    </>
  );
}
