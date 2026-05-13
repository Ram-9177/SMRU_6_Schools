"use client";

import React from "react";
import { Link } from "@/lib/router";
import { FaShieldAlt, FaBalanceScale, FaFileSignature, FaUserShield, FaDownload, FaCheckCircle, FaAward, FaUniversity } from "react-icons/fa";
import OfficialDocumentCard from "@/components/OfficialDocumentCard";
import { OFFICIAL_DOCUMENTS } from "@/lib/shared/official-documents";
import { UNIVERSITY_INFO } from "@/lib/shared/university";
import UniversitySectionHeader from "@/components/UniversitySectionHeader";

export default function ApprovalsRecognitions() {
  const documents = [
    OFFICIAL_DOCUMENTS.smruAct2026,
    OFFICIAL_DOCUMENTS.ugcRecognition2f,
  ];

  return (
    <div className="min-h-screen bg-[#f8fbff] selection:bg-[#019e6e] selection:text-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden">
        {/* Background Aesthetics */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white" />
          <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(1,158,110,0.08)_0,transparent_50%),radial-gradient(at_100%_0%,rgba(13,49,92,0.1)_0,transparent_50%),radial-gradient(at_50%_100%,rgba(255,175,58,0.05)_0,transparent_50%)]" />
          <div className="absolute inset-0 opacity-[0.03] grayscale pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0d315c 1px, transparent 1px), linear-gradient(90deg, #0d315c 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="smru-container relative z-10">
          <div className="flex flex-col items-center text-center">
            {/* Trust Badge */}
            <div className="mb-8 inline-flex items-center gap-3 border border-[#0d315c]/10 bg-white/80 backdrop-blur-md px-5 py-2.5 cut-corner-badge shadow-sm animate-fade-in">
              <FaShieldAlt className="text-[#019e6e]" size={16} />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0d315c]/60">Statutory Trust & Compliance</span>
            </div>

            <h1 className="smru-h1 max-w-4xl mb-6">
              Approvals <span className="text-[#019e6e]">&</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#019e6e] to-[#0d315c]">Recognitions</span>
            </h1>

            <div className="w-20 h-1.5 bg-[#ffaf3a] cut-corner-underline mb-8" />

            <p className="max-w-2xl text-slate-600 font-medium text-lg leading-relaxed mb-10">
              St. Mary&apos;s Rehabilitation University is a pioneering institution established under the Telangana State Private Universities Act. We maintain complete transparency regarding our statutory status and regulatory approvals.
            </p>

            {/* Quick Stats/Trust Items */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
              {[
                { icon: FaUniversity, label: "State Established", value: "Act No. 10 of 2026" },
                { icon: FaCheckCircle, label: "UGC Recognized", value: "Under Section 2(f)" },
                { icon: FaAward, label: "Professional Excellence", value: "30+ Year Legacy" },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-[#d8e8fb] cut-corner-panel p-5 shadow-sm flex flex-col items-center text-center">
                  <item.icon className="text-[#019e6e] mb-3" size={20} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.label}</span>
                  <span className="text-sm font-bold text-[#0d315c]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= DOCUMENTS GRID ================= */}
      <section className="smru-section bg-white border-y border-[#d8e8fb]">
        <div className="smru-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="max-w-2xl">
              <UniversitySectionHeader
                title="Official Statutory Documents"
                align="left"
                className="mb-4"
              />
              <p className="text-slate-600 font-medium leading-relaxed">
                Applicants, parents, and stakeholders may access and download the official university establishment documents and recognition letters below for verification.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
              <FaFileSignature className="text-[#ffaf3a]" />
              Verified Digital Repository
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {documents.map((doc, idx) => (
              <OfficialDocumentCard
                key={idx}
                title={doc.title}
                label={doc.label}
                description={doc.description}
                href={doc.href}
                ctaLabel="Download PDF"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMPLIANCE SECTIONS ================= */}
      <section className="smru-section">
        <div className="smru-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: Context & Identity */}
            <div className="lg:col-span-1 space-y-12">
              <div className="cut-corner-panel bg-[#0d315c] p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 cut-corner-badge -mr-16 -mt-16" />
                <h3 className="text-2xl font-black uppercase tracking-tight mb-6">Verification <br /><span className="text-[#ffaf3a]">Protocol</span></h3>
                <p className="text-white/70 text-sm font-medium leading-relaxed mb-8">
                  All statutory documents published here are certified copies of the original gazette notifications and council letters. For specific programme-level approvals, please refer to the respective school pages.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 cut-corner-badge">
                    <FaCheckCircle className="text-[#019e6e] shrink-0" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">TS Private Universities Act</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 cut-corner-badge">
                    <FaCheckCircle className="text-[#019e6e] shrink-0" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">UGC 2(f) Recognition</span>
                  </div>
                </div>
              </div>

              <div className="p-8 border border-[#d8e8fb] cut-corner-panel bg-white shadow-sm">
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#019e6e] mb-4">University Registry</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Official Name</p>
                    <p className="text-sm font-bold text-[#0d315c]">{UNIVERSITY_INFO.legalName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Public Brand</p>
                    <p className="text-sm font-bold text-[#0d315c]">{UNIVERSITY_INFO.legacyBrandName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">HQ Location</p>
                    <p className="text-sm font-bold text-[#0d315c]">{UNIVERSITY_INFO.city}, {UNIVERSITY_INFO.state}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Disclosures */}
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: FaBalanceScale,
                    title: "Regulatory Compliance",
                    desc: "Our academic and administrative policies are fully aligned with the UGC (Establishment of and Maintenance of Standards in Private Universities) Regulations.",
                  },
                  {
                    icon: FaUserShield,
                    title: "Mandatory Disclosures",
                    desc: "In compliance with Section 4 of the RTI Act and UGC guidelines, we maintain public records of institutional disclosures and quality metrics.",
                  },
                  {
                    icon: FaDownload,
                    title: "Archives & Notices",
                    desc: "Historical notices, previous year gazettes, and legacy recognition letters for our constituent institutions are available upon request.",
                  },
                  {
                    icon: FaShieldAlt,
                    title: "Consumer Protection",
                    desc: "The university strictly adheres to fee transparency and refund norms as prescribed by the state higher education regulatory authority.",
                  },
                ].map((feature, i) => (
                  <article key={i} className="p-6 bg-white border border-[#d8e8fb] hover:border-[#019e6e]/30 cut-corner-panel transition-all hover:shadow-md group">
                    <feature.icon className="text-[#0d315c] group-hover:text-[#019e6e] transition-colors mb-4" size={24} />
                    <h4 className="text-lg font-black text-[#0d315c] mb-2">{feature.title}</h4>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">{feature.desc}</p>
                  </article>
                ))}
              </div>

              {/* Policy Quick Links */}
              <div className="p-8 bg-gradient-to-br from-[#f0f7ff] to-[#f8fbff] border border-[#d8e8fb] cut-corner-panel">
                <h4 className="text-[13px] font-black uppercase tracking-[0.2em] text-[#0d315c] mb-6">Institutional Policies</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "UGC Mandatory Disclosure", href: "/mandatory-disclosure" },
                    { label: "Fee & Refund Policy", href: "/refund-policy" },
                    { label: "Admission Regulations", href: "/admission-policy" },
                    { label: "Grievance Redressal", href: "/grievance-redressal" },
                  ].map((link, i) => (
                    <Link 
                      key={i} 
                      to={link.href}
                      className="flex items-center justify-between p-4 bg-white border border-[#d8e8fb] cut-corner-badge group hover:bg-[#019e6e] transition-all"
                    >
                      <span className="text-[11px] font-black uppercase tracking-wider text-[#0d315c] group-hover:text-white">{link.label}</span>
                      <span className="text-[#019e6e] group-hover:text-white transition-colors">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="smru-section bg-[#0d315c] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,175,58,0.4),transparent_70%)]" />
        </div>
        <div className="smru-container max-w-4xl text-center relative z-10">
          <h2 className="smru-h2 text-white italic mb-6">
            Building a <span className="text-[#ffaf3a]">Legacy of Trust</span>
          </h2>
          <p className="text-white/70 text-lg font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
            Questions regarding our statutory status or regulatory approvals? Our registrar&apos;s office is committed to providing prompt and transparent assistance.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              to="/contact" 
              className="px-10 py-5 bg-[#ffaf3a] text-[#0d315c] font-black text-[13px] uppercase tracking-[0.25em] cut-corner-badge shadow-2xl hover:scale-105 transition-all"
            >
              Contact Registrar
            </Link>
            <Link 
              to="/about" 
              className="px-10 py-5 bg-white/10 border border-white/20 text-white font-black text-[13px] uppercase tracking-[0.25em] cut-corner-badge hover:bg-white/20 transition-all"
            >
              About the University
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
