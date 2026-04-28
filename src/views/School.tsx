"use client";
import React, { useState, useMemo } from "react";
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
import { buildSchoolAnswers, buildSchoolDepartmentLinks, buildSchoolFaqs } from "@/lib/seo/academic";
import { SHOW_PUBLIC_SEO_SECTIONS } from "@/lib/seo/visibility";

const GROUPS = [
  { key: "ug",             label: "Undergraduate Programs" },
  { key: "pg",             label: "Postgraduate Programs" },
  { key: "diploma",        label: "Diploma / Certificate" },
  { key: "phd",            label: "Ph.D. / M.Phil." },
  { key: "integrated_phd", label: "M.Tech. + Ph.D." },
];

const sortByName = (a, b) => (a.name || "").localeCompare(b.name || "");

export default function School() {
  const { schoolSlug } = useParams();
  const { state } = useDeveloperCms();
  const cmsSchools = useMemo(() => buildAcademicSchoolsFromCms(state), [state]);
  const schoolSource = cmsSchools.length ? cmsSchools : staticSchools;
  const school = findBySlugOrName(schoolSource, schoolSlug) as any;
  const openApply = useOpenApply();

  // Detect major partner for branding
  const partner = useMemo(() => {
    if (!school) return null;
    // For Health school, explicitly show Emversity
    if (school.slug === "health-allied-health-sciences") {
      return { name: "Emversity" };
    }
    // For Engineering, we could show others, but user specifically asked for Emversity
    return null;
  }, [school]);

  const [tab, setTab] = useState("programs");

  const groupedPrograms = useMemo(() => {
    if (!school) return { ug: [], pg: [], diploma: [], phd: [], integrated_phd: [] };
    const catalog = { ug: [], pg: [], diploma: [], phd: [], integrated_phd: [] };
    const seen = new Set();
    const schoolSlugSafe = safeSlug(school.slug, school.name);

    (school.departments || []).forEach((dept) => {
      const deptSlug = safeSlug(dept.slug, dept.name);
      (dept.programs || []).forEach((prog) => {
        if (!prog?.name) return;
        const cat = detectProgramCategory(prog, { includeIntegratedPhd: true });
        const canon = getCanonicalProgramKey(prog.name, { extended: true });
        if (!seen.has(cat + "-" + canon)) {
          seen.add(cat + "-" + canon);
          catalog[cat].push({
            name: cleanProgramName(prog.name),
            dept: dept.name,
            path: `/schools/${schoolSlugSafe}/${deptSlug}/${safeSlug(prog.slug, prog.name)}`,
          });
        }
      });
    });
    Object.keys(catalog).forEach((key) => catalog[key].sort(sortByName));
    return catalog;
  }, [school]);

  const schoolQuickAnswers = useMemo(() => buildSchoolAnswers(school), [school]);
  const schoolFaqs = useMemo(() => buildSchoolFaqs(school), [school]);
  const schoolQuickLinks = useMemo(
    () => [
      ...buildSchoolDepartmentLinks(school),
      { href: "/admissions", label: "Admissions", description: "Official admissions routes for school and program applications." },
      { href: "/contact", label: "Contact", description: "Campus, admissions, and support contact details." },
      TRUST_LINKS[0],
    ].filter(Boolean),
    [school]
  );

  if (!school) notFound();

  return (
    <SchoolLayout
      activeSchoolSlug={safeSlug(school.slug, school.name)}
      title={school.name}
      subtitle={school.about || "Empowering students with industry-relevant skills and academic excellence."}
      breadcrumbs={[{ label: school.short || school.name }]}
      sectionLabel={school.name.toUpperCase()}
      heading="Programs by Level"
      onApply={openApply}
      partner={partner}
    >
      <div className="space-y-10">
        <div className="flex gap-2 bg-[#f5f9ff] p-1.5 cut-corner-panel w-fit">
          {[
            { id: "programs", label: "Programs" },
            { id: "departments", label: "Departments" },
            (school.vision || school.mission) && { id: "vision", label: "Vision & Mission" },
            school.facilities && { id: "facilities", label: "Facilities" },
          ].filter(Boolean).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-6 py-2.5 cut-corner-badge text-xs font-black uppercase tracking-widest transition-all ${
                tab === t.id
                  ? "bg-[#0d315c] text-white shadow-xl"
                  : "text-[#0d315c]/50 hover:bg-white hover:text-[#0d315c]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "programs" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {GROUPS.map((g) => {
              const list = groupedPrograms[g.key];
              if (!list?.length) return null;
              return (
                <div key={g.key}>
                  <div className="mb-6">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">
                      {g.label}
                    </h3>
                    <div className="h-0.5 w-12 bg-[#ffaf3a] cut-corner-badge" />
                  </div>
                  <div className="space-y-6">
                    {list.map((p, i) => (
                      <Link
                        key={i}
                        to={p.path}
                        className="group block transition-all"
                      >
                        <h4 className="text-[14px] font-black text-[#1f2933] group-hover:text-[#25b895] leading-tight mb-1">
                          {p.name}
                        </h4>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                          {p.dept}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : tab === "departments" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(school.departments || []).map((dept, i) => (
              <Link
                key={i}
                to={`/schools/${safeSlug(school.slug, school.name)}/${safeSlug(dept.slug, dept.name)}`}
                className="group p-6 cut-corner-card border border-slate-100 bg-slate-50 hover:bg-white hover:border-[#25b895] hover:shadow-xl transition-all"
              >
                <h4 className="text-sm font-black text-[#0d315c] group-hover:text-[#25b895] mb-2 leading-tight">
                  {dept.name}
                </h4>
                <p className="text-xs text-slate-500 font-medium line-clamp-2 mb-4 leading-relaxed">
                  {dept.about || "Explore programs and research in this department."}
                </p>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#25b895]">
                  View Programs →
                </div>
              </Link>
            ))}
          </div>
        ) : tab === "vision" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {school.vision && (
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#019e6e] mb-2">
                    Our Vision
                  </h3>
                  <div className="h-0.5 w-12 bg-[#019e6e] cut-corner-badge" />
                </div>
                <ul className="space-y-4">
                  {school.vision.map((v, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ffaf3a] flex-shrink-0" />
                      <p className="text-sm text-[#0d315c]/80 font-medium leading-relaxed">{v}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {school.mission && (
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#0d315c] mb-2">
                    Our Mission
                  </h3>
                  <div className="h-0.5 w-12 bg-[#0d315c] cut-corner-badge" />
                </div>
                <ul className="space-y-4">
                  {school.mission.map((m, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#25b895] flex-shrink-0" />
                      <p className="text-sm text-[#0d315c]/80 font-medium leading-relaxed">{m}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(school.facilities || []).map((f, i) => (
              <div
                key={i}
                className="p-8 cut-corner-card border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 cut-corner-badge bg-[#f5f9ff] flex items-center justify-center text-[#019e6e] mb-6">
                  <span className="font-black text-xs">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h4 className="text-base font-black text-[#0d315c] mb-3 leading-tight">
                  {f.name}
                </h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {SHOW_PUBLIC_SEO_SECTIONS && (
          <>
            <AnswerGridSection title="Quick Answers" items={schoolQuickAnswers} />
            <LinkGridSection title="Departments & Admissions" items={schoolQuickLinks} />
            <FaqSection title="Frequently Asked Questions" items={schoolFaqs} />
          </>
        )}
      </div>
    </SchoolLayout>
  );
}
