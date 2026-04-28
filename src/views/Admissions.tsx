// @ts-nocheck
"use client";
import React, { useEffect } from "react";
import { Link } from "@/lib/router";
import { 
  FaUserGraduate, FaBrain, FaArrowRight, FaAward, FaBuilding, 
  FaCheckCircle, FaFileAlt, FaUserCheck, FaUniversity, FaShieldAlt 
} from "react-icons/fa";
import abstractHeroBg from "../assets/abstract-hero-bg.png";
import { resolveAssetSrc } from "@/lib/shared/media";
import UniversitySectionHeader from "../components/UniversitySectionHeader";
import TrustBand from "../components/TrustBand";
import { BigNumberGrid } from "../components/InfographicSections";
import { FaqSection, LinkGridSection } from "@/components/seo/PageSections";
import { ADMISSIONS_FAQS } from "@/lib/seo/static-page-faqs";
import { SHOW_PUBLIC_SEO_SECTIONS } from "@/lib/seo/visibility";

export default function Admissions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-outfit text-[#0d315c] overflow-x-hidden">
      
      {/* ================= HERO ================= */}
      <section className="relative pt-16 pb-12 md:pt-24 md:pb-16 px-6 text-center overflow-hidden">
        {/* Cinematic Asset Wash */}
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-gradient-to-r from-[#f8fafc] via-white to-[#f8fafc]" />
           <img
             src={resolveAssetSrc(abstractHeroBg)}
             alt="Abstract Background"
             className="absolute inset-0 h-full w-full object-cover opacity-[0.03] scale-105"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-[#f8fafc]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-20">
          <div className="inline-flex items-center gap-3 px-5 py-2 cut-corner-badge bg-[#019e6e]/10 border border-[#019e6e]/20 mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
            <span className="w-2 h-2 rounded-full bg-[#019e6e] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#019e6e]">Enrollment Cycle 2026-27</span>
          </div>

          <h1 className="text-6xl md:text-[9rem] lg:text-[11rem] font-black font-outfit mb-10 tracking-tighter leading-[0.75] text-[#0d315c] uppercase">
            Admissions <br />
            <span className="text-[#019e6e]">Gateway.</span>
          </h1>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { label: "UGC Status", icon: <FaUniversity /> },
              { label: "BCI/RCI Approved", icon: <FaShieldAlt /> },
              { label: "30 Years Legacy", icon: <FaAward /> },
            ].map(pill => (
              <div key={pill.label} className="px-6 py-2 bg-white border border-slate-100 cut-corner-badge shadow-sm flex items-center gap-3">
                 <span className="text-[#ffaf3a]">{pill.icon}</span>
                 <span className="text-[10px] font-black uppercase tracking-widest">{pill.label}</span>
              </div>
            ))}
          </div>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 font-medium leading-relaxed italic border-l-4 border-[#ffaf3a] pl-8 text-left md:text-center md:border-l-0 md:pl-0">
            "SMRU is more than an institution; it's a launchpad for professional mastery. Select your academic path below to begin your journey."
          </p>
        </div>
      </section>

      {/* ================= ADMISSION PATHS ================= */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <UniversitySectionHeader
            title="Choose Your Admission Path"
            subtitle="Select the entry route tailored to your career aspirations."
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20">
            
            {/* PATH 1: UG/PG */}
            <div className="group relative bg-white border border-slate-100 cut-corner-panel shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-12 overflow-hidden hover:shadow-2xl transition-all duration-500">
               <div className="absolute top-0 right-0 w-48 h-48 bg-[#019e6e]/5 rounded-full blur-3xl -mr-24 -mt-24 transition-transform group-hover:scale-125" />
               <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#019e6e] text-white flex items-center justify-center text-3xl cut-corner-badge shadow-xl mb-10 group-hover:rotate-12 transition-transform">
                     <FaUserGraduate />
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter text-[#0d315c] mb-6">UG, PG & <br />Specialized Diploma</h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-10 max-w-sm">
                    Access Bachelor's and Master's programs across Allied Health, Nursing, Clinical Psychology, and Law.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-12">
                     {['Full Time', 'Clinical Labs', 'Industry Ready'].map(tag => (
                       <span key={tag} className="px-3 py-1 bg-slate-50 border border-slate-100 text-[9px] font-black uppercase tracking-widest text-slate-400 cut-corner-badge">{tag}</span>
                     ))}
                  </div>
                  <a 
                    href="https://apply.smru.edu.in" 
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-5 bg-[#0d315c] text-white font-black uppercase tracking-[0.2em] text-xs cut-corner-badge hover:bg-[#019e6e] transition-all"
                  >
                    Go to Application Portal <FaArrowRight className="ml-3" />
                  </a>
               </div>
            </div>

            {/* PATH 2: DOCTORAL */}
            <div className="group relative bg-[#0d315c] border border-white/5 cut-corner-panel shadow-[0_30px_60px_rgba(13,49,92,0.15)] p-12 overflow-hidden hover:shadow-2xl transition-all duration-500">
               <div className="absolute top-0 right-0 w-48 h-48 bg-[#ffaf3a]/10 rounded-full blur-3xl -mr-24 -mt-24 transition-transform group-hover:scale-125" />
               <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#ffaf3a] text-[#0d315c] flex items-center justify-center text-3xl cut-corner-badge shadow-xl mb-10 group-hover:-rotate-12 transition-transform">
                     <FaBrain />
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter text-white mb-6">Doctoral Research <br />(Ph.D. / M.Phil.)</h3>
                  <p className="text-white/60 font-medium leading-relaxed mb-10 max-w-sm">
                    India's premier doctoral excellence programme. Join a high-impact research community in Hyderabad.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-12">
                     {['Fellowships', 'NEP 2020', 'Research Labs'].map(tag => (
                       <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/40 cut-corner-badge">{tag}</span>
                     ))}
                  </div>
                  <Link 
                    to="/phd-admissions"
                    className="flex items-center justify-center w-full py-5 bg-[#ffaf3a] text-[#0d315c] font-black uppercase tracking-[0.2em] text-xs cut-corner-badge hover:bg-white transition-all"
                  >
                    Explore Ph.D. Pathways <FaArrowRight className="ml-3" />
                  </Link>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= APPLICATION JOURNEY ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <UniversitySectionHeader 
             title="The Admission Journey" 
             subtitle="A clear, institutional route from your first enquiry to official enrollment."
             align="center"
           />
           
           <div className="grid md:grid-cols-4 gap-8 mt-20 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-20 right-20 h-0.5 bg-slate-100 z-0" />
              
              {[
                { step: "01", title: "Select Track", icon: <FaUserCheck />, desc: "Choose your UG, PG, or Ph.D. route based on eligibility." },
                { step: "02", title: "Apply Online", icon: <FaFileAlt />, desc: "Submit your academic credentials via our digital portal." },
                { step: "03", title: "Expert Review", icon: <FaAward />, desc: "Our board reviews your profile for fit and merit." },
                { step: "04", title: "Enroll", icon: <FaCheckCircle />, desc: "Confirm your seat and begin your professional journey." }
              ].map((item, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center space-y-6 group">
                   <div className="w-24 h-24 bg-[#f8fafc] border-2 border-slate-100 cut-corner-panel flex items-center justify-center text-3xl text-[#0d315c] shadow-sm group-hover:border-[#ffaf3a] group-hover:bg-white transition-all duration-500">
                      {item.icon}
                   </div>
                   <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#ffaf3a]">Step {item.step}</p>
                      <h4 className="text-xl font-black uppercase tracking-tighter">{item.title}</h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[200px] mx-auto">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ================= SCHOLARSHIP SPOTLIGHT ================= */}
      <section className="py-24 px-6">
         <div className="max-w-7xl mx-auto bg-[#0d315c] cut-corner-panel p-12 md:p-20 relative overflow-hidden text-white">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ffaf3a]/10 rounded-full blur-3xl -mb-48 -mr-48" />
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
               <div className="space-y-8 text-center lg:text-left">
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                    Accessible <br /> <span className="text-[#ffaf3a]">Excellence.</span>
                  </h2>
                  <p className="text-white/70 text-lg font-medium leading-relaxed italic">
                    "We believe talent should never be limited by financial constraints. SMRU offers up to 50% merit scholarships for the 2026-27 cycle."
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                     {["Merit Based", "SC/ST Support", "RCI Incentives"].map(p => (
                       <div key={p} className="px-4 py-2 bg-white/10 cut-corner-badge border border-white/10 text-[10px] font-black uppercase tracking-widest">{p}</div>
                     ))}
                  </div>
               </div>
               <div className="bg-white p-10 cut-corner-panel text-[#0d315c] shadow-2xl flex flex-col items-center text-center">
                  <div className="text-6xl font-black tracking-tighter text-[#ffaf3a] mb-2">50%</div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8">Scholarship Ceiling</p>
                  <p className="text-sm font-medium leading-relaxed mb-10 text-slate-600">
                    Apply before the early bird deadline to be eligible for our flagship Institutional Merit Grant.
                  </p>
                  <Link to="/contact" className="w-full py-5 bg-[#0d315c] text-white font-black uppercase tracking-widest text-[11px] cut-corner-badge hover:bg-[#ffaf3a] hover:text-[#0d315c] transition-all">
                    Enquire About Scholarships
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* ================= FAQS ================= */}
      {SHOW_PUBLIC_SEO_SECTIONS && (
        <section className="py-24 px-6 bg-white border-y border-slate-100">
          <div className="max-w-4xl mx-auto">
            <FaqSection title="Admissions FAQ" items={ADMISSIONS_FAQS} />
          </div>
        </section>
      )}

      {/* ================= GLOBAL TRUST ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <TrustBand 
             items={[
               { icon: <FaBuilding className="text-[#ffaf3a]" />, text: "120-Acre Campus" },
               { icon: <FaAward className="text-[#ffaf3a]" />, text: "30 Years of Legacy" },
               { icon: <FaUserGraduate className="text-[#ffaf3a]" />, text: "Academic Excellence" },
             ]}
           />
        </div>
      </section>

    </div>
  );
}
