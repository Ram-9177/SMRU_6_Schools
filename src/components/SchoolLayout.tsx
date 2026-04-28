"use client";
import React from "react";
import { Link } from "@/lib/router";
import { FaInfoCircle } from "react-icons/fa";
import { schools } from "../data/schools";
import abstractHeroBg from "../assets/education-pattern.png";
import { safeSlug } from "@/lib/shared/program-utils";
import { resolveAssetSrc } from "@/lib/shared/media";

export default function SchoolLayout({ 
  breadcrumbs = [], 
  title = "", 
  subtitle = "", 
  activeSchoolSlug = "", 
  sectionLabel = "",
  heading = "",
  children,
  onApply = null,
  partner = null
}) {
  const allSchools = (schools || []).map((s) => ({
    name: s.name,
    short: s.short || s.name,
    slug: safeSlug(s.slug, s.name)
  }));

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f3f7fc_0%,#eef3f9_100%)]">
      {/* ================= HERO ================= */}
      <section className="relative text-[#0d315c] pt-24 pb-10 px-6 text-center overflow-hidden">
        {/* Premium Atmospheric 'Mesh' Gradient - The Best-in-Class Brand Look */}
        <div className="absolute inset-0 bg-[#f7fafd]" />
        
        {/* Dynamic Multi-layered Brand Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(33,168,136,0.11)_0,transparent_55%),radial-gradient(at_100%_0%,rgba(13,49,92,0.1)_0,transparent_55%),radial-gradient(at_50%_0%,rgba(243,249,255,0.95)_0,transparent_62%)]" />

        {/* Cinematic Texture / Pattern */}
        <div 
          className="absolute inset-0 bg-repeat opacity-[0.04] mix-blend-multiply" 
          style={{ backgroundImage: `url(${resolveAssetSrc(abstractHeroBg)})`, backgroundSize: '460px' }}
        />
        
        {/* Smooth integration with content area */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#edf3fa]/95" />
        
        <div className="max-w-6xl mx-auto relative z-20">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 mb-6 opacity-70">
            <Link to="/schools" className="text-[11px] font-black uppercase tracking-[0.4em] hover:text-[#019e6e] transition-colors">Schools</Link>
            {breadcrumbs.map((bc, i) => (
              <React.Fragment key={i}>
                <span className="text-[12px] font-black text-[#6c819e] leading-none">/</span>
                {bc.path ? (
                  <Link to={bc.path} className="text-[11px] font-black uppercase tracking-[0.4em] hover:text-[#019e6e] transition-colors">{bc.label}</Link>
                ) : (
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500">{bc.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
          
          {partner && (
            <div className="mb-6 flex justify-center animate-in fade-in slide-in-from-top-4 duration-1000">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 cut-corner-badge bg-white/40 border border-white/60 shadow-[0_4px_12px_rgba(13,49,92,0.05)] backdrop-blur-md">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#0d315c]/50">Institutional Partner</span>
                <div className="h-3 w-px bg-[#0d315c]/10" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#019e6e]">{partner.name}</span>
              </div>
            </div>
          )}

          <h1 className={`font-black font-outfit mb-3 tracking-tight leading-[0.95] uppercase mx-auto max-w-[98%] ${
            title.length > 40 
              ? "text-2xl md:text-4xl lg:text-[3.2rem]" 
              : title.length > 28
                ? "text-3xl md:text-5xl lg:text-[4.2rem]"
                : "text-4xl md:text-6xl lg:text-[5.4rem]"
          }`}>
            {title}
          </h1>
          <div className="mt-4 h-1.5 w-16 cut-corner-badge bg-[#ffaf3a] mx-auto mb-6 shadow-sm" />
          {subtitle && (
            <p className={`max-w-4xl mx-auto text-[#0d315c]/52 font-semibold leading-relaxed ${
              subtitle.length > 80
                ? "text-[15px] md:text-[1.15rem] normal-case tracking-normal opacity-85"
                : "text-[14px] md:text-base uppercase tracking-[0.4em]"
            }`}>
              {subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Admissions Notice */}
      <div className="max-w-7xl mx-auto px-4 -mt-6 relative z-20">
        <div className="bg-[#fffaf1] border-2 border-[#ffaf3a]/30 p-4 cut-corner-panel shadow-xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex-shrink-0 w-10 h-10 cut-corner-badge bg-[#ffaf3a]/10 flex items-center justify-center">
            <FaInfoCircle className="text-[#ffaf3a] text-sm" />
          </div>
          <p className="text-[#0d315c] text-sm font-bold leading-relaxed">
            <strong className="text-[#ffaf3a] mr-1">Admissions Notice:</strong> 
            Our website is currently being updated for the upcoming 2026-27 session. We appreciate your patience and understanding.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-[#fdfefe] cut-corner-panel shadow-[0_20px_44px_rgba(13,49,92,0.12)] border border-[#dbe6f3] overflow-hidden grid grid-cols-1 lg:grid-cols-[280px,1fr]">
          
          {/* Sidebar */}
          <aside className="bg-[linear-gradient(180deg,#123d72_0%,#0d315c_100%)] p-8 text-white">
            <h4 className="text-[11px] font-black text-white/45 uppercase tracking-[0.4em] mb-8">Schools</h4>
            <ul className="space-y-2">
              {allSchools.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/schools/${s.slug}`}
                    className={`block px-4 py-3 cut-corner-badge text-xs font-bold transition-all ${
                      s.slug === activeSchoolSlug 
                        ? "bg-[#f7fbff] text-[#0d315c] shadow-[0_10px_24px_rgba(0,0,0,0.2)] translate-x-1" 
                        : "text-white/75 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* Body */}
          <main className="p-8 md:p-12 flex flex-col justify-between min-h-[500px] bg-[linear-gradient(180deg,#fbfdff_0%,#f7fbff_100%)]">
            <div>
               {sectionLabel && (
                 <div className="text-[11px] font-black text-[#1f9a79] uppercase tracking-[0.4em] mb-2">
                   {sectionLabel}
                 </div>
               )}
               {heading && (
                 <h2 className="text-2xl md:text-3xl font-black text-[#133f71] font-outfit mb-8">
                   {heading}
                 </h2>
               )}
               
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  {children}
               </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-[#dce7f3] flex flex-wrap items-center justify-between gap-6">
               <Link to="/schools" className="text-sm font-black text-[#1f9a79] uppercase tracking-widest hover:underline">
                  ← All Schools
               </Link>
               {onApply && (
                 <button
                   onClick={onApply}
                   className="px-10 py-4 cut-corner-badge bg-[#1f9a79] text-white font-black uppercase tracking-widest text-[11px] shadow-[0_10px_24px_rgba(31,154,121,0.24)] hover:bg-[#1a8b6c] transition-all hover:scale-[1.02] active:scale-95"
                 >
                   Apply / Enquire
                 </button>
               )}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
