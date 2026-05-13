"use client";
import React, { useMemo } from "react";
import { notFound } from "next/navigation";
import { useParams, useNavigate, Link } from "@/lib/router";
import { schools as staticSchools, getEduPartnerLandingUrl, getEduPartners } from "../data/schools";
import useOpenApply from "../hooks/useOpenApply";
import SchoolLayout from "../components/SchoolLayout";
import { useDeveloperCms } from "@/lib/developer/useDeveloperCms";
import { buildAcademicSchoolsFromCms, syncAcademicSchoolsWithCms } from "@/lib/developer/academic-data";
import {
  findBySlugOrName,
  safeSlug,
} from "@/lib/shared/program-utils";
import { AnswerGridSection, FaqSection, LinkGridSection } from "@/components/seo/PageSections";
import { RESEARCH_LINKS, TRUST_LINKS } from "@/lib/seo/info-pages";
import { buildProgramAnswers, buildProgramFaqs, buildProgramRelatedLinks } from "@/lib/seo/academic";
import { SHOW_PUBLIC_SEO_SECTIONS } from "@/lib/seo/visibility";
import { 
  FaClock, FaUserGraduate, FaCheckCircle, FaHospital, FaMicroscope, 
  FaBriefcase, FaFileDownload, FaUsers, FaArrowRight, FaShieldAlt 
} from "react-icons/fa";
import { resolveAssetSrc } from "@/lib/shared/media";

const formatLevel = (lvl = "") => {
  const l = lvl.toLowerCase().trim();
  if (l.includes("ug")) return "Undergraduate Program";
  if (l.includes("pg")) return "Postgraduate Program";
  if (l.includes("ph.d") || l.includes("phd")) return "Doctoral Program (Ph.D.)";
  if (l.includes("post") || l.includes("dip")) return "Postgraduate Diploma";
  return l.toUpperCase();
};

const getProgramPositioning = (schoolSlug: string, progName: string) => {
  const slug = (schoolSlug || "").toLowerCase();
  if (slug.includes('rehabilitation')) {
    return {
      overview: `This programme focuses on clinical learning and rehabilitation care. Students gain foundational and advanced knowledge in communication disorders, prosthetics, orthotics, inclusive education, and assistive support according to professional practice requirements.`,
      study: "Students engage in evidence-based academic modules focused on rehabilitative care, therapeutic interventions, and patient-centric communication methodologies.",
      experience: "Clinical laboratory exposure and supervised therapeutic practice."
    };
  }
  if (slug.includes('health')) {
    return {
      overview: `This programme prepares students for the dynamic patient-care ecosystem, focusing on healthcare delivery, diagnostics, emergency care, and critical operation theatre support.`,
      study: "Students explore advanced diagnostic methodologies, healthcare delivery protocols, and clinical technologies essential for modern medical environments.",
      experience: "Hands-on diagnostic laboratory work, clinical rotations, and emergency care simulations."
    };
  }
  if (slug.includes('psychology')) {
    return {
      overview: `This programme offers an in-depth study of human behaviour, mental health, and behavioural health interventions, preparing students for roles in clinical psychology and counselling.`,
      study: "Coursework covers psychological assessment, rehabilitation psychology, behavioral intervention strategies, and professional ethics.",
      experience: "Supervised counseling practice, behavioral observation, and psychological assessment labs."
    };
  }
  if (slug.includes('nursing')) {
    return {
      overview: `This programme focuses on patient care, clinical responsibility, and nursing practice, equipping students to become essential members of hospital and community healthcare teams.`,
      study: "Students master clinical nursing procedures, healthcare ethics, patient safety protocols, and advanced health monitoring.",
      experience: "Extensive hospital rotations, community healthcare outreach, and rigorous clinical skills training."
    };
  }
  if (slug.includes('engineering') || slug.includes('technology') || slug.includes('tech')) {
    return {
      overview: `This programme merges technical proficiency with emerging technologies. Students explore fields like assistive technology, rehabilitation engineering, computer science, AI, machine learning, and data science.`,
      study: "Core subjects include software development, data analysis, algorithm design, and the application of emerging technologies to solve real-world problems.",
      experience: "Project-based learning in advanced computing labs, software simulations, and industry-aligned technical workshops."
    };
  }
  if (slug.includes('law')) {
    return {
      overview: `This programme delivers comprehensive legal education rooted in constitutional values, rights, and ethics. It prepares students for advocacy, legal research, and public policy.`,
      study: "The curriculum spans foundational law, disability rights, healthcare law, public policy, and rigorous legal research methodologies.",
      experience: "Moot court practice, policy analysis, and legal advocacy internships."
    };
  }
  
  return {
    overview: `This programme provides a structured academic pathway focusing on professional excellence, critical thinking, and industry-relevant skill development.`,
    study: "A balanced curriculum covering foundational theories, applied knowledge, and professional competencies.",
    experience: "Practical workshops, academic projects, and industry-focused learning activities."
  };
};

export default function Program() {
  const { schoolSlug, deptSlug, programSlug } = useParams();
  const navigate = useNavigate();
  const openApply = useOpenApply();
  const { state } = useDeveloperCms({ useOverlay: true });
  const cmsSchools = useMemo(() => buildAcademicSchoolsFromCms(state), [state]);
  const schoolSource = useMemo(() => syncAcademicSchoolsWithCms(staticSchools, cmsSchools), [cmsSchools]);

  const school = findBySlugOrName(schoolSource, schoolSlug) as any;
  const dept = findBySlugOrName(school?.departments, deptSlug) as any;
  const prog = findBySlugOrName(dept?.programs, programSlug) as any;

  const programName = prog?.name || "";
  const levelFull = useMemo(() => prog ? formatLevel(prog.level || "") : "", [prog]);

  const partners = useMemo(() => {
    if (!prog) return [];
    return getEduPartners(prog)
      .map((partner) => ({ ...partner, leadUrl: partner?.landingUrl || getEduPartnerLandingUrl(prog) }))
      .filter(p => p.code);
  }, [prog]);

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
      { href: "/admissions", label: "Admissions", description: "Official admissions information for this program." },
      { href: "/contact", label: "Contact", description: "Contact the university for current program guidance." },
      { href: "/approvals-recognitions", label: "Regulatory Status", description: "Official approvals." },
    ].filter(Boolean);
  }, [dept, deptSlugSafe, prog, school, schoolSlugSafe]);

  if (!school || !dept || !prog) notFound();

  return (
    <>
      <SchoolLayout
      activeSchoolSlug={schoolSlugSafe}
      title={programName}
      subtitle={levelFull}
      breadcrumbs={[
        { label: school.short || school.name, path: `/schools/${schoolSlugSafe}` },
        { label: dept.short || dept.name, path: `/schools/${schoolSlugSafe}/${deptSlugSafe}` },
        { label: "Program Detail" }
      ]}
      sectionLabel={levelFull.toUpperCase()}
      heading={programName}
      onApply={handleApplyClick}
    >
      <div className="space-y-12">
        {/* Regulatory Note */}
        <div className="bg-[#f8fafc] border border-slate-200 p-4 cut-corner-panel flex items-start gap-4">
          <div className="bg-[#019e6e]/10 p-2 rounded-full shrink-0 mt-0.5">
            <img src="/assets/SMRU Logo.png" className="w-5 h-5 object-contain" alt="Regulatory" />
          </div>
          <div>
            <h4 className="text-[12px] font-black uppercase tracking-widest text-[#0d315c] mb-1">
              Regulatory Status
            </h4>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {prog.accreditation || "Programme-specific permissions, professional council approvals, and professional practice requirements should be reviewed through official university notifications and relevant statutory council documents wherever applicable."}
            </p>
          </div>
        </div>

        {/* 1. Overview & Quick Facts */}
        <section className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 space-y-8">
            <div>
              <h3 className="text-2xl font-black text-[#0d315c] mb-4">Programme Overview</h3>
              <p className="text-[15px] text-slate-700 font-medium leading-[1.8]">
                {prog.overview || getProgramPositioning(school.slug, prog.name).overview}
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h4 className="text-[13px] font-black uppercase tracking-widest text-[#019e6e] mb-3">What Students Study</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {getProgramPositioning(school.slug, prog.name).study}
                </p>
              </div>
              <div>
                <h4 className="text-[13px] font-black uppercase tracking-widest text-[#019e6e] mb-3">Learning Experience</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {prog.labs || prog.fieldExposure || getProgramPositioning(school.slug, prog.name).experience}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[340px] bg-white border border-slate-200 shadow-sm cut-corner-panel p-8 space-y-6 shrink-0">
             <h4 className="text-[14px] font-black text-[#0d315c] uppercase tracking-widest border-b border-slate-100 pb-4">Key Information</h4>
             <div className="space-y-5">
                {[
                  { label: "Duration", value: prog.duration, icon: FaClock },
                  { label: "Level", value: prog.level, icon: FaUserGraduate },
                  { label: "Eligibility", value: prog.eligibility, icon: FaCheckCircle },
                ].map((fact, i) => (
                  <div key={i} className="flex gap-4">
                    <fact.icon className="text-[#019e6e] mt-1 shrink-0" size={16} />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{fact.label}</p>
                      <p className="text-[13px] font-bold text-[#0d315c] mt-0.5">
                        {fact.value || "Contact admissions office for details"}
                      </p>
                    </div>
                  </div>
                ))}
             </div>
             
             <div className="pt-4 border-t border-slate-100">
               <p className="text-[11px] text-slate-500 font-medium italic leading-relaxed">
                 Please contact the admissions office for the latest programme-wise fee, intake, eligibility, and admissions guidance.
               </p>
             </div>
          </div>
        </section>

        {/* 2. Career Pathways */}
        <section className="bg-[#0d315c] cut-corner-panel p-10 md:p-14 text-white shadow-md">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3">
                <FaBriefcase className="text-[#ffaf3a]" size={24} />
                <h3 className="text-2xl font-black uppercase tracking-tight">Career & Higher Study Pathways</h3>
              </div>
              <p className="text-white/80 font-medium leading-relaxed max-w-2xl text-[15px]">
                {prog.outcomes || "Students may explore career and higher-study pathways depending on programme level, eligibility, professional requirements, and applicable regulations."}
              </p>
              {prog.careerOpportunities && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {prog.careerOpportunities.map((job: string) => (
                    <div key={job} className="bg-white/10 px-4 py-2 cut-corner-badge text-[13px] font-bold border border-white/5">
                      {job}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="w-full md:w-[300px] shrink-0 flex flex-col gap-4">
               <button onClick={handleApplyClick} className="bg-[#ffaf3a] hover:bg-[#e09930] text-[#0d315c] px-6 py-4 cut-corner-badge font-black text-[12px] uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-3">
                 Apply for this programme <FaArrowRight />
               </button>
               <Link to="/contact" className="bg-white hover:bg-slate-50 text-[#0d315c] px-6 py-4 cut-corner-badge font-black text-[11px] uppercase tracking-widest shadow-sm transition-all flex items-center justify-center text-center">
                 Check eligibility with Admissions
               </Link>
               <Link to={`/schools/${schoolSlugSafe}/${deptSlugSafe}`} className="text-white/70 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-colors text-center mt-2 underline underline-offset-4">
                 Explore related programmes
               </Link>
            </div>
          </div>
        </section>

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
                    <div className="h-14 w-full flex items-center justify-center mb-4">
                      {partner.logo ? (
                        <img 
                          src={resolveAssetSrc(partner.logo)} 
                          alt={partner.name} 
                          className="max-h-full max-w-[85%] object-contain transition-transform group-hover/partner:scale-105" 
                        />
                      ) : (
                        <span className="text-[14px] font-black text-[#0d315c] text-center">
                          {partner.name === "Emversity" ? "Powered By Emversity" : partner.name}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-[#1f9a79] uppercase tracking-widest bg-white px-3 py-1 cut-corner-badge border border-[#dce7f3]">View Track →</span>
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
