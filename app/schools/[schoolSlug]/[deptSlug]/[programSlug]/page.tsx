import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildCourseSchema, buildEducationProgramSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { buildProgramBreadcrumbs, buildProgramFaqs, resolveProgram } from "@/lib/seo/academic";
import { SHOW_PUBLIC_FAQ_SCHEMA } from "@/lib/seo/visibility";
import Program from "@/views/Program";
import { getProgramMetadata } from "@/lib/shared/dynamic-route-metadata";
import { schools } from "@/data/schools";
import { cleanProgramName, safeSlug } from "@/lib/shared/program-utils";

export function generateMetadata({ params }: { params: { schoolSlug: string; deptSlug: string; programSlug: string } }): Metadata {
  return getProgramMetadata(params);
}

export function generateStaticParams() {
  return (schools || []).flatMap((school) =>
    (school.departments || []).flatMap((department) =>
      (department.programs || []).map((program) => ({
        schoolSlug: safeSlug(school.slug, school.name),
        deptSlug: safeSlug(department.slug, department.name),
        programSlug: safeSlug(program.slug, program.name),
      }))
    )
  );
}

export default function Page({
  params,
}: {
  params: { schoolSlug: string; deptSlug: string; programSlug: string };
}) {
  const { school, department, program } = resolveProgram(params.schoolSlug, params.deptSlug, params.programSlug);
  const pathname = `/schools/${params.schoolSlug}/${params.deptSlug}/${params.programSlug}`;
  const programName = cleanProgramName(program?.name || "Program");
  return (
    <>
      <StructuredData
        id={`${params.schoolSlug}-${params.deptSlug}-${params.programSlug}-breadcrumb-schema`}
        data={school && department && program ? buildBreadcrumbSchema(buildProgramBreadcrumbs(school, department, program)) : null}
      />
      <StructuredData
        id={`${params.schoolSlug}-${params.deptSlug}-${params.programSlug}-page-schema`}
        data={buildWebPageSchema({
          title: programName,
          description: program?.overview || "Program detail at St. Mary's Rehabilitation University.",
          pathname,
        })}
      />
      <StructuredData
        id={`${params.schoolSlug}-${params.deptSlug}-${params.programSlug}-course-schema`}
        data={
          program
            ? buildCourseSchema({
                name: programName,
                description: program?.overview || "Program detail at St. Mary's Rehabilitation University.",
                pathname,
                schoolName: school?.name,
                level: program?.level,
                duration: program?.duration,
                eligibility: program?.eligibility,
                offers: program?.fees ? { price: program.fees.replace(/[^0-9]/g, ''), priceCurrency: "INR" } : undefined
              })
            : null
        }
      />
      <StructuredData
        id={`${params.schoolSlug}-${params.deptSlug}-${params.programSlug}-edu-program-schema`}
        data={
          program
            ? buildEducationProgramSchema({
                name: programName,
                description: program?.overview || "Program detail at St. Mary's Rehabilitation University.",
                pathname,
                level: program?.level,
              })
            : null
        }
      />
      <StructuredData
        id={`${params.schoolSlug}-${params.deptSlug}-${params.programSlug}-faq-schema`}
        data={
          school && department && program && SHOW_PUBLIC_FAQ_SCHEMA
            ? buildFaqSchema(buildProgramFaqs(school, department, program))
            : null
        }
      />
      <Program />
    </>
  );
}
