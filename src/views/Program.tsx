"use client";
import React, { useMemo } from "react";
import { notFound } from "next/navigation";
import { useParams, useNavigate, Link } from "@/lib/router";
import { schools as staticSchools, getEduPartner, getEduPartnerLandingUrl } from "../data/schools";
import useOpenApply from "../hooks/useOpenApply";
import SchoolLayout from "../components/SchoolLayout";
import { useDeveloperCms } from "@/lib/developer/useDeveloperCms";
import { buildAcademicSchoolsFromCms } from "@/lib/developer/academic-data";
import {
  findBySlugOrName,
  getCanonicalProgramKey,
  parseProgramNameParts,
  safeSlug,
} from "@/lib/shared/program-utils";
import { AnswerGridSection, FaqSection, LinkGridSection } from "@/components/seo/PageSections";
import StructuredData from "@/components/seo/StructuredData";
import { 
  buildBreadcrumbSchema, 
  buildEducationProgramSchema, 
  buildFaqSchema 
} from "@/lib/seo/schema";
import { RESEARCH_LINKS, TRUST_LINKS } from "@/lib/seo/info-pages";
import { buildProgramAnswers, buildProgramFaqs, buildProgramRelatedLinks } from "@/lib/seo/academic";
import { SHOW_PUBLIC_SEO_SECTIONS } from "@/lib/seo/visibility";
import { 
  FaClock, FaUserGraduate, FaCheckCircle, FaHospital, FaMicroscope, 
  FaBriefcase, FaFileDownload, FaUsers, FaArrowRight, FaShieldAlt 
} from "react-icons/fa";

const formatLevel = (lvl = "") => {
  const l = lvl.toLowerCase().trim();
  if (l.includes("ug")) return "Undergraduate Program";
  if (l.includes("pg")) return "Postgraduate Program";
  if (l.includes("ph.d") || l.includes("phd")) return "Doctoral Program (Ph.D.)";
  if (l.includes("post") || l.includes("dip")) return "Postgraduate Diploma";
  return l.toUpperCase();
};

export default function Program() {
  const { schoolSlug, deptSlug, programSlug } = useParams();
  const navigate = useNavigate();
  const openApply = useOpenApply();
  const { state } = useDeveloperCms();
  const cmsSchools = useMemo(() => buildAcademicSchoolsFromCms(state), [state]);
  const schoolSource = cmsSchools.length ? cmsSchools : staticSchools;

  const school = findBySlugOrName(schoolSource, schoolSlug) as any;
  const dept = findBySlugOrName(school?.departments, deptSlug) as any;
  const prog = findBySlugOrName(dept?.programs, programSlug) as any;

  const { main: mainName } = useMemo(() => (prog ? parseProgramNameParts(prog.name) : { main: "", sub: "" }), [prog]);
  const levelFull = useMemo(() => prog ? formatLevel(prog.level || "") : "", [prog]);

  const partners = useMemo(() => {
    const cmsLinks = (state.partnerLinks || []).filter((link) => link.programId === prog?.id && link.enabled);
    if (cmsLinks.length > 0) {
      return cmsLinks.map((link) => {
        const partner = (state.partners || []).find((item) => item.id === link.partnerId);
        return {
          code: (partner?.slug || "").toUpperCase(),
          name: partner?.name || "Partner",
          logo: partner?.logo || "",
          leadUrl: link.redirectLink || partner?.redirectUrl || (partner?.slug ? `/partner/${partner.slug}` : ""),
        };
      });
    }

    if (!dept || !prog) return [];
    const canonTarget = getCanonicalProgramKey(prog.name, { extended: true });
    const partneredVers = (dept.programs || []).filter(p => getCanonicalProgramKey(p.name, { extended: true }) === canonTarget);
    return partneredVers
      .map(p => ({ ...getEduPartner(p), leadUrl: getEduPartnerLandingUrl(p) }))
      .filter(p => p.code);
  }, [dept, prog, state.partnerLinks, state.partners]);

  const isPhd = useMemo(() => {
    if (!prog) return false;
    const progLevel = (prog.level || "").toLowerCase();
    const progName = (prog.name || "").toLowerCase().replace(/\s+/g, '');
    return progLevel.includes("ph.d") || progLevel.includes("phd") || progName.includes("phd") || progName.includes("ph.d") || progName.includes("m.phil") || progName.includes("mphil");
  }, [prog]);

  const handleApplyClick = () => {
    if (isPhd) {
      openApply("phd");
      return;
    }
    const directPartnerUrl = getEduPartnerLandingUrl(prog);
    const applyUrl = directPartnerUrl || "";
    if (applyUrl) {
      if (applyUrl.startsWith("/")) navigate(applyUrl);
      else window.location.href = applyUrl;
      return;
    }
    openApply("general");
  };

  const schoolSlugSafe = safeSlug(school?.slug || "", school?.name || "");
  const deptSlugSafe = safeSlug(dept?.slug || "", dept?.name || "");
  const programQuickAnswers = useMemo(() => buildProgramAnswers(school, dept, prog), [dept, prog, school]);
  const programFaqs = useMemo(() => buildProgramFaqs(school, dept, prog), [dept, prog, school]);
  const programQuickLinks = useMemo(() => {
    if (!school || !dept || !prog) return [];
    return [
      { href: `/schools/${schoolSlugSafe}/${deptSlugSafe}`, label: dept.name, description: "Parent department." },
      { href: `/schools/${schoolSlugSafe}`, label: school.name, description: "Parent school." },
      ...buildProgramRelatedLinks(school, dept, prog),
      { href: "/scholarships", label: "Scholarships", description: "Financial aid for this program." },
      { href: "/placements", label: "Placements", description: "Career outcomes & records." },
      { href: "/approvals-recognitions", label: "Regulatory Status", description: "Official approvals." },
    ].filter(Boolean);
  }, [dept, deptSlugSafe, prog, school, schoolSlugSafe]);

  if (!school || !dept || !prog) notFound();

  return (
    <>
      <StructuredData
        id="program-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Schools", path: "/schools" },
          { name: school.name, path: `/schools/${schoolSlugSafe}` },
          { name: dept.name, path: `/schools/${schoolSlugSafe}/${deptSlugSafe}` },
          { name: prog.name, path: `/schools/${schoolSlugSafe}/${deptSlugSafe}/${programSlug}` },
        ])}
      />
      <StructuredData
        id="program-course-schema"
        data={buildEducationProgramSchema({
          name: prog.name,
          description: prog.overview || `Professional ${prog.name} program at St. Mary's Rehabilitation University.`,
          providerName: "St. Mary's Rehabilitation University",
          url: `https://smru.edu.in/schools/${schoolSlugSafe}/${deptSlugSafe}/${programSlug}`,
          courseCode: prog.slug,
          educationalLevel: prog.level,
        })}
      />
      {programFaqs.length > 0 && (
        <StructuredData
          id="program-faq-schema"
          data={buildFaqSchema(programFaqs.map(f => ({ question: f.question, answer: f.answer })))}
        />
      )}

      <SchoolLayout
      activeSchoolSlug={schoolSlugSafe}
      title={mainName}
      subtitle={levelFull}
      breadcrumbs={[
        { label: school.short || school.name, path: `/schools/${schoolSlugSafe}` },
        { label: dept.short || dept.name, path: `/schools/${schoolSlugSafe}/${deptSlugSafe}` },
        { label: "Program Detail" }
      ]}
      sectionLabel={levelFull.toUpperCase()}
      heading={mainName}
      onApply={handleApplyClick}
    >
      <div className="space-y-16">
        {/* 1. Regulatory Badge & Quick Summary */}
        <section className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
               <div className="bg-[#019e6e]/10 text-[#019e6e] p-2 cut-corner-badge">
                 <FaShieldAlt size={20} />
               </div>
               <p className="text-[12px] font-black uppercase tracking-widest text-[#0d315c]">
                 {prog.accreditation || "Regulatory Status: Under University Verification"}
               </p>
            </div>
            <h3 className="text-2xl font-black text-[#0d315c]">Program Overview</h3>
            <p className="text-base text-slate-600 font-medium leading-[1.8]">
              {prog.overview || "Professional overview for the 2026-27 session is currently being finalized by the board."}
            </p>
          </div>
          <div className="w-full md:w-[320px] bg-[#f8fafc] border border-[#dce7f3] cut-corner-panel p-8 space-y-6">
             <h4 className="text-[13px] font-black text-[#0d315c] uppercase tracking-widest border-b border-[#dce7f3] pb-3">Quick Facts</h4>
             <div className="space-y-4">
                {[
                  { label: "Duration", value: prog.duration || "Needs university input", icon: FaClock },
                  { label: "Intake", value: prog.intake || "Needs university input", icon: FaUsers },
                  { label: "Level", value: prog.level || "Needs university input", icon: FaUserGraduate },
                  { label: "Eligibility", value: prog.eligibility || "Needs university input", icon: FaCheckCircle },
                ].map((fact, i) => (
                  <div key={i} className="flex gap-4">
                    <fact.icon className="text-[#1f9a79] mt-1 shrink-0" size={16} />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{fact.label}</p>
                      <p className="text-[13px] font-bold text-[#0d315c]">{fact.value}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* 2. Curriculum & Training */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           <section className="space-y-6">
              <div className="flex items-center gap-3">
                <FaMicroscope className="text-[#ffaf3a]" size={20} />
                <h3 className="text-xl font-black text-[#0d315c] uppercase tracking-tighter">Labs & Practical Training</h3>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed">
                {prog.labs || "Specialized laboratory details for this program are undergoing manual verification."}
              </p>
              <div className="bg-[#fcfdfd] border border-slate-100 p-6 cut-corner-panel italic text-sm text-slate-500">
                "Students engage in hands-on clinical drills and laboratory sessions to master technical competencies."
              </div>
           </section>

           <section className="space-y-6">
              <div className="flex items-center gap-3">
                <FaHospital className="text-[#ffaf3a]" size={20} />
                <h3 className="text-xl font-black text-[#0d315c] uppercase tracking-tighter">Clinical / Field Exposure</h3>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed">
                {prog.fieldExposure || "Clinical internship and field exposure schedules are as per the official academic calendar."}
              </p>
              <div className="flex flex-wrap gap-2">
                {["Clinical Rotation", "Case Studies", "Field Visits"].map(tag => (
                  <span key={tag} className="text-[10px] font-black uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full text-slate-500">{tag}</span>
                ))}
              </div>
           </section>
        </div>

        {/* 3. Career & Placements */}
        <section className="bg-[#0d315c] cut-corner-panel p-10 md:p-14 text-white">
          <div className="flex flex-col md:flex-row justify-between gap-10">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3">
                <FaBriefcase className="text-[#ffaf3a]" size={24} />
                <h3 className="text-2xl font-black uppercase tracking-tight">Career Opportunities</h3>
              </div>
              <p className="text-white/70 font-medium leading-relaxed max-w-xl">
                {prog.outcomes || "Graduates from this program are equipped for leadership roles in their respective clinical and technical domains."}
              </p>
              <div className="flex flex-wrap gap-3">
                {(prog.careerOpportunities || ["Clinical Specialist", "Research Associate", "Academician"]).map((job: string) => (
                  <div key={job} className="bg-white/10 px-4 py-2 rounded-lg text-[13px] font-bold border border-white/5">
                    {job}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-auto flex flex-col gap-4">
               <button onClick={handleApplyClick} className="bg-[#ffaf3a] hover:bg-[#ffbf5a] text-[#0d315c] px-8 py-5 rounded-xl font-black text-[12px] uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3">
                 Apply for Admission <FaArrowRight />
               </button>
               <div className="flex flex-col items-center gap-2">
                 <Link to="/placements" className="text-white/60 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-colors">
                   Institutional Placement Records
                 </Link>
                 <Link to="/scholarships" className="text-[#ffaf3a]/60 hover:text-[#ffaf3a] text-[11px] font-bold uppercase tracking-widest transition-colors">
                   Scholarships & Financial Aid
                 </Link>
               </div>
            </div>
          </div>
        </section>

        {/* 4. Curriculum & Documents (Missing Data placeholders) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-8 border-2 border-dashed border-slate-200 rounded-3xl space-y-4">
              <div className="flex items-center gap-3 text-slate-400">
                <FaFileDownload size={20} />
                <h4 className="font-black uppercase tracking-widest text-[13px]">Curriculum & Syllabus</h4>
              </div>
              <p className="text-sm text-slate-400 font-medium italic">
                Detailed semester-wise curriculum is being updated for the 2026-27 session. Please contact the admissions office for a draft copy.
              </p>
           </div>
           <div className="p-8 border-2 border-dashed border-slate-200 rounded-3xl space-y-4">
              <div className="flex items-center gap-3 text-slate-400">
                <FaUsers size={20} />
                <h4 className="font-black uppercase tracking-widest text-[13px]">Academic Faculty</h4>
              </div>
              <p className="text-sm text-slate-400 font-medium italic">
                List of lead faculty members and clinical supervisors for this program is undergoing annual verification.
              </p>
           </div>
        </div>

        {/* 5. Industry Partners (Existing) */}
        {partners.length > 0 && (
          <section className="p-8 cut-corner-panel bg-[#fefefe] border-2 border-[#eadcc3] shadow-[0_12px_28px_rgba(13,49,92,0.08)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#e9d5b5]/30 cut-corner-badge -mr-16 -mt-16 transition-transform group-hover:scale-110" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-2 w-10 cut-corner-underline bg-[#ffaf3a]" />
                <h4 className="text-[13px] font-black text-[#0d315c] uppercase tracking-[0.3em]">Industry Specializations</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {partners.map((partner: any, idx: number) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (partner.leadUrl?.startsWith("/")) navigate(partner.leadUrl);
                      else if (partner.leadUrl) window.location.href = partner.leadUrl;
                    }}
                    className="flex flex-col items-center justify-center p-6 cut-corner-card bg-[#f7fbff] border border-[#dce7f3] transition-all hover:bg-white hover:border-[#e1c796] hover:shadow-[0_10px_22px_rgba(13,49,92,0.1)] group/partner"
                  >
                    <span className="text-[14px] font-black text-[#0d315c] text-center">
                      {partner.name === "Emversity" ? "Powered By Emversity" : partner.name}
                    </span>
                    <span className="text-[10px] font-bold text-[#1f9a79] uppercase tracking-widest mt-2 bg-white px-3 py-1 cut-corner-badge border border-[#dce7f3]">View Track →</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 6. SEO Sections (Existing) */}
        {SHOW_PUBLIC_SEO_SECTIONS && (
          <div className="pt-8 border-t border-slate-100">
            <AnswerGridSection title="Quick Answers" items={programQuickAnswers} />
            <LinkGridSection title="Related Pathways & Trust" items={programQuickLinks} />
            <FaqSection title="Program FAQs" items={programFaqs} />
          </div>
        )}
      </div>
    </SchoolLayout>
    </>
  );
}
