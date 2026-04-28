"use client";
import React, { useMemo } from "react";
import { notFound } from "next/navigation";
import { useParams, Link } from "@/lib/router";
import { schools as staticSchools } from "../data/schools";
import useOpenApply from "../hooks/useOpenApply";
import SchoolLayout from "../components/SchoolLayout";
import { useDeveloperCms } from "@/lib/developer/useDeveloperCms";
import { buildAcademicSchoolsFromCms } from "@/lib/developer/academic-data";
import {
  cleanProgramName,
  detectProgramCategory,
  findBySlugOrName,
  getCanonicalProgramKey,
  safeSlug,
} from "@/lib/shared/program-utils";
import { AnswerGridSection, FaqSection, LinkGridSection } from "@/components/seo/PageSections";
import { TRUST_LINKS } from "@/lib/seo/info-pages";
import {
  buildDepartmentAnswers,
  buildDepartmentFaqs,
  buildDepartmentProgramLinks,
  buildDepartmentSiblingLinks,
} from "@/lib/seo/academic";
import { SHOW_PUBLIC_SEO_SECTIONS } from "@/lib/seo/visibility";

const LEVEL_ORDER = { ug: 0, pg: 1, diploma: 2, phd: 3, integrated_phd: 4 };

const sortPrograms = (programs = []) =>
  [...programs].sort((a, b) => {
    const rankA = LEVEL_ORDER[detectProgramCategory(a, { includeIntegratedPhd: true })] ?? 99;
    const rankB = LEVEL_ORDER[detectProgramCategory(b, { includeIntegratedPhd: true })] ?? 99;
    if (rankA !== rankB) return rankA - rankB;
    return (a.name || "").localeCompare(b.name || "");
  });

export default function Department() {
  const { schoolSlug, deptSlug } = useParams();
  const { state } = useDeveloperCms();
  const cmsSchools = useMemo(() => buildAcademicSchoolsFromCms(state), [state]);
  const schoolSource = cmsSchools.length ? cmsSchools : staticSchools;
  const school = findBySlugOrName(schoolSource, schoolSlug) as any;
  const dept = findBySlugOrName(school?.departments, deptSlug) as any;
  const openApply = useOpenApply();

  const sortedPrograms = useMemo(() => {
    const raw = sortPrograms((dept?.programs || []).filter(Boolean));
    const seen = new Set();
    return raw.filter((p) => {
      if (!p?.name) return false;
      const canon = getCanonicalProgramKey(p.name, { extended: true });
      if (seen.has(canon)) return false;
      seen.add(canon);
      return true;
    }).map((p) => ({ ...p, name: cleanProgramName(p.name, { trailingOnly: true }) }));
  }, [dept]);

  const schoolSlugSafe = safeSlug(school?.slug || "", school?.name || "");
  const deptSlugSafe = safeSlug(dept?.slug || "", dept?.name || "");
  const departmentQuickAnswers = useMemo(() => buildDepartmentAnswers(school, dept), [school, dept]);
  const departmentFaqs = useMemo(() => buildDepartmentFaqs(school, dept), [school, dept]);
  const departmentQuickLinks = useMemo(() => {
    if (!school || !dept) return [];
    return [
      ...buildDepartmentProgramLinks(school, dept),
      ...buildDepartmentSiblingLinks(school, dept).slice(0, 3),
      { href: `/schools/${schoolSlugSafe}`, label: school.name, description: "Parent school page for this department." },
      { href: "/admissions", label: "Admissions", description: "Official admissions routes for listed programs." },
      TRUST_LINKS[0],
    ].filter(Boolean);
  }, [dept, school, schoolSlugSafe]);

  if (!school || !dept) notFound();

  return (
    <SchoolLayout
      activeSchoolSlug={safeSlug(school.slug, school.name)}
      title={dept.name}
      subtitle={dept.about || "Leading research and education for the future."}
      breadcrumbs={[
        { label: school.short || school.name, path: `/schools/${schoolSlugSafe}` },
        { label: dept.short || dept.name }
      ]}
      sectionLabel={dept.name.toUpperCase()}
      heading="Programs Offered"
      onApply={openApply}
    >
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedPrograms.map((p, i) => {
            const progSlug = safeSlug(p.slug, p.name);
            return (
              <Link
                key={i}
                to={`/schools/${schoolSlugSafe}/${deptSlugSafe}/${progSlug}`}
                className="group p-6 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-[#25b895] hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#25b895] bg-[#25b895]/10 px-3 py-1 rounded-full">
                    {p.level || "Program"}
                  </span>
                  {p.duration && (
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {p.duration}
                    </span>
                  )}
                </div>
                <h4 className="text-[15px] font-black text-[#0d315c] group-hover:text-[#25b895] mb-4 leading-tight">
                  {p.name}
                </h4>
                {p.partnerCode === "QTST" && (
                  <div className="mb-4">
                    <Link
                      to="/qtst"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#0d315c] bg-[#ffaf3a]/20 px-3 py-1 rounded-full hover:bg-[#ffaf3a]/30 transition-colors"
                      aria-label="View QTST partner page"
                    >
                      QTST Partner Page →
                    </Link>
                  </div>
                )}
                <div className="text-[10px] font-black uppercase tracking-widest text-[#25b895]">
                  Full Details →
                </div>
              </Link>
            );
          })}
        </div>
        {SHOW_PUBLIC_SEO_SECTIONS && (
          <>
            <AnswerGridSection title="Quick Answers" items={departmentQuickAnswers} />
            <LinkGridSection title="Programs & Related Departments" items={departmentQuickLinks} />
            <FaqSection title="Frequently Asked Questions" items={departmentFaqs} />
          </>
        )}
      </div>
    </SchoolLayout>
  );
}
