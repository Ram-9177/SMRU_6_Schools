// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaArrowRight,
  FaBalanceScale,
  FaBookOpen,
  FaBriefcase,
  FaCheckCircle,
  FaEnvelope,
  FaGavel,
  FaGraduationCap,
  FaHandshake,
  FaLandmark,
  FaMicroscope,
  FaPaperPlane,
  FaUsers,
} from "react-icons/fa";
import useOpenApply from "../hooks/useOpenApply";
import UniversitySectionHeader from "../components/UniversitySectionHeader";
import CtplFormWidget from "../components/CtplFormWidget";

const LAW_CTPL_FORM_ID = "1c76a1c8dbc7278676884e00e5a46d7f54115d6b49a81b2210941f1a12f6771a";

const heroChips = ["Moot Court Training", "Legal Aid Cell", "AI Regulation & Data Sovereignty", "Forensic Jurisprudence"];
const personName = "Prof. N.R. Madhava Menon";

const sectionLinks = [
  ["About", "#about"],
  ["Law in Action", "#law-in-action"],
  ["Programmes", "#programmes"],
  ["Admissions", "#admissions"],
  ["Careers", "#careers"],
  ["Recognition", "#recognition"],
  ["Contact", "#contact"],
];

const featureCards = [
  ["Practice-Driven Legal Education", "Learning supported by moot courts, legal aid, internships, workshops, and clinical exposure."],
  ["Emerging Law Focus", "Exposure to areas such as AI Regulation, Data Sovereignty, Cyber Law, Technology Law, and Forensic Jurisprudence."],
  ["Community Justice Orientation", "Legal Aid Cell activities connect students with social responsibility and access-to-justice needs."],
  ["Ethics & Professional Readiness", "Emphasis on constitutional values, legal reasoning, advocacy, drafting, and professional conduct."],
];

const actionCards = [
  ["Moot Court Training", "Simulated courtroom practice helps students develop advocacy, oratory, analytical, and courtroom presentation skills.", FaGavel],
  ["Legal Aid & Community Justice", "Students engage with legal literacy, rural legal aid camps, urban legal awareness, and community-focused legal service.", FaHandshake],
  ["Emerging Law & Technology", "Academic exposure includes AI Regulation, Data Sovereignty, Cyber Law, Technology Law, and digital legal challenges.", FaMicroscope],
  ["Research & Publication", "The Research and Publication Cell supports research papers, seminars, conferences, and legal scholarship.", FaBookOpen],
  ["ADR & Arbitration", "Dedicated training in negotiation, mediation, arbitration, drafting arbitration clauses, and dispute resolution simulations.", FaBalanceScale],
  ["Career Readiness", "Internships, resume workshops, mock interviews, bootcamps, and career guidance support professional preparation.", FaBriefcase],
];

const visionItems = [
  "To become a globally recognized centre of excellence in legal education, research, and innovation.",
  "To cultivate intellectually strong, ethically principled, and socially responsible legal professionals.",
  "To inspire transformative leadership that strengthens the rule of law and nation-building.",
  "To uphold constitutional values of justice, equality, liberty, and fraternity.",
  "To serve as a catalyst for social change through legal empowerment, outreach, and interdisciplinary scholarship.",
];

const missionItems = [
  "Offer holistic and dynamic legal education blending theory with real-world applications.",
  "Promote critical inquiry, academic freedom, and interdisciplinary research.",
  "Bridge legal academia and profession through clinical programmes, internships, and partnerships.",
  "Instill professional ethics, public service, and commitment to human rights.",
  "Encourage diversity, inclusivity, and global engagement.",
  "Nurture future-ready legal professionals for local, national, and global legal challenges.",
];

const objectiveClusters = [
  ["Academic Excellence", ["High-quality legal education balancing theory, practical training, and skills development.", "Learner-centric pedagogy supporting legal reasoning, advocacy, drafting, and critical thinking."]],
  ["Constitutional & Social Responsibility", ["Deep respect for constitutional values, democratic institutions, human rights, and rule of law.", "Legal aid clinics, public legal education, and pro bono outreach."]],
  ["Research & Global Perspective", ["Interdisciplinary and policy-oriented legal research.", "Comparative legal studies, academic exchange, and international collaborations."]],
  ["Professional & Holistic Development", ["Internships, moot court training, workshops, and industry interactions.", "Mentorship, student support, co-curricular activities, debates, sports, and cultural engagement."]],
];

const programmes = [
  { programme: "B.A. LL.B. (Hons.) - Integrated", eligibility: "10+2 with 45% aggregate", duration: "5 Years", level: "UG" },
  { programme: "B.B.A. LL.B. (Hons.) - Integrated", eligibility: "10+2 with 45% aggregate", duration: "5 Years", level: "UG" },
  { programme: "B.Sc. LL.B. (Hons.) - Integrated", eligibility: "10+2 with 45% aggregate Science", duration: "5 Years", level: "UG" },
  { programme: "LL.B. (Hons.) - 3-Year", eligibility: "Bachelor's Degree with 45%", duration: "3 Years", level: "UG" },
  { programme: "LL.B. (General) - 3-Year", eligibility: "Bachelor's Degree with 45%", duration: "3 Years", level: "UG" },
  { programme: "LL.M.", eligibility: "LL.B./B.L. with 55% + Entrance", duration: "1 Year", level: "PG" },
  { programme: "Ph.D. in Law", eligibility: "LL.M. with 55% + NET/SET or Entrance", duration: "3-6 Years", level: "Doctoral" },
];

const ugProgrammes = [
  {
    title: "B.A. LL.B. (Hons.) - 5-Year Integrated Programme",
    overview: "A five-year integrated programme combining arts, humanities, and law to build interdisciplinary legal understanding.",
    groups: [
      ["Highlights", ["Humanities and law foundation.", "Political science, history, sociology, and economics.", "Constitutional law, criminal law, jurisprudence, corporate law, international law, and environmental law.", "Honours specialization from the 9th term.", "Moot court training.", "Legal Aid Cell exposure.", "Internships with courts, law firms, NGOs, and corporate legal departments.", "Legal writing, research methodology, and publication opportunities.", "Career preparation for litigation, judiciary, civil services, corporate law, academia, and policy-making."]],
      ["Programme Educational Objectives", ["Equip students with humanities and legal education for understanding law in its social context.", "Develop legal reasoning and professional competencies across major legal systems.", "Foster ethical, social, and professional responsibility.", "Build competencies in emerging areas such as Cyber Law, Environmental Law, and Human Rights.", "Promote lifelong learning and research through moot courts, internships, legal aid clinics, and publication opportunities."]],
    ],
  },
  {
    title: "B.B.A. LL.B. (Hons.) - 5-Year Integrated Programme",
    overview: "A five-year integrated programme combining business administration and law for students interested in corporate legal practice, business consultancy, compliance, and entrepreneurship.",
    groups: [
      ["Highlights", ["Business administration and legal education.", "Management principles, corporate strategy, financial management, marketing, entrepreneurship, and organizational behaviour.", "Corporate governance, company law, taxation, IPR, securities law, and commercial contracts.", "Transactional lawyering, contract drafting, and corporate compliance.", "Mergers and acquisitions, securities law, and insolvency law.", "Internships with law firms, corporate legal departments, and financial institutions.", "Career preparation for corporate counsel, legal advisor, investment banker, and compliance officer."]],
      ["Programme Educational Objectives", ["Provide grounding in business administration and core legal education.", "Develop competencies in corporate law, business regulations, financial laws, and transactional practice.", "Build ethical standards and governance consciousness.", "Equip students with contract drafting, compliance, due diligence, and corporate dispute resolution skills.", "Prepare graduates for corporate law firms, in-house legal departments, investment banking, and regulatory bodies."]],
    ],
  },
  {
    title: "B.Sc. LL.B. (Hons.) - 5-Year Integrated Programme",
    overview: "An integrated programme combining science and law for students interested in technology, forensic science, cyber law, biotechnology law, environmental law, and intellectual property.",
    groups: [
      ["Highlights", ["Science and law integration.", "Mathematics, computer science, biology, chemistry, physics, and forensic science.", "Cyber law, biotechnology law, environmental law, forensic science, and IPR.", "Patent law and technology licensing exposure.", "Forensic evidence and courtroom applications.", "Interdisciplinary research projects.", "Career pathways in patent law, cyber law, environmental litigation, forensic legal practice, and regulatory compliance."]],
      ["Programme Educational Objectives", ["Integrate scientific disciplines with legal education.", "Develop expertise in technology law, intellectual property, cyber law, and environmental law.", "Foster interdisciplinary research skills.", "Build practical skills in forensic evidence handling, patent application drafting, and regulatory compliance.", "Prepare graduates for careers in patent law firms, technology legal departments, regulatory bodies, and environmental law practice."]],
    ],
  },
  {
    title: "LL.B. (Hons.) - 3-Year Programme",
    overview: "A three-year graduate-level legal programme for students from any academic discipline who want to pursue law with honours specialization and research-oriented learning.",
    groups: [["Highlights", ["Six-semester legal education.", "Honours electives from the fifth semester.", "Specializations in Corporate Law, Criminal Law, Constitutional Law, IPR, and International Law.", "Legal drafting, pleadings, conveyancing, and trial advocacy.", "Moot court training.", "Mandatory internships.", "Research dissertation and seminar papers.", "Preparation for judicial services, AIBE, UPSC, and higher legal education."]]],
  },
  {
    title: "LL.B. (General) - 3-Year Programme",
    overview: "A three-year legal programme for graduates from all disciplines, covering essential legal core subjects and practical legal training.",
    groups: [
      ["Core Subjects", ["Constitutional Law.", "Law of Crimes - BNS 2023 and BNSS 2023.", "Law of Contracts.", "Family Law.", "Law of Evidence - BSA 2023.", "Property Law.", "Administrative Law.", "Company Law.", "Labour Law.", "Environmental Law.", "CPC and Limitation Act.", "Public International Law.", "Professional Ethics.", "Drafting, Pleading, and Conveyancing.", "Alternative Dispute Resolution."]],
      ["Highlights", ["Comprehensive legal core subject coverage.", "Moot courts, drafting workshops, and court visits.", "Mandatory internships.", "Legal aid clinic participation.", "Career support for litigation, judiciary, government service, and corporate legal roles."]],
    ],
  },
];

const llmSpecializations = ["Constitutional Democracy & Public Governance", "Criminal Justice Reform & Forensic Advocacy", "Corporate & Commercial Laws", "Intellectual Property, AI Regulation & Data Sovereignty"];
const llmStructure = [
  ["Compulsory Core Papers", "Comparative Public Law / Systems of Governance; Law and Justice in a Globalizing World; Research Methodology and Legal Writing"],
  ["Specialization Core", "2 core specialization papers specific to the chosen stream"],
  ["Electives", "3 concentration super-specialization papers"],
  ["General Pool Electives", "2 papers from shared interdisciplinary pool"],
  ["Dissertation", "Original research of 10,000-15,000 words under faculty supervision"],
  ["Capstone Seminar", "Presentation before academic and professional panel"],
  ["Total Credits", "40 credits across two semesters"],
];
const llmPeos = ["Equip LL.M. graduates with advanced legal knowledge in specialized areas of law and contemporary applications.", "Enable high-quality legal research, academic writing, and policy analysis.", "Develop ability to critically evaluate legal doctrines, judicial decisions, and legislative developments.", "Prepare graduates for academic, policy, judiciary, consultancy, or senior legal roles.", "Promote ethical leadership and commitment to the rule of law, justice, and constitutional values."];

const phdAreas = ["Constitutional Law and Governance", "Criminal Law and Criminology", "International Law and Human Rights", "Corporate and Commercial Law", "Intellectual Property Rights", "Environmental and Energy Law", "Cyber Law and Technology Law", "Family Law and Personal Laws", "Labour and Social Security Law", "Legal Theory and Jurisprudence"];
const phdRequirements = [
  ["Basic Eligibility", "LL.M. degree with minimum 55% marks; 50% for SC/ST/OBC as per UGC norms."],
  ["Entrance Examination", "UGC NET Law / SET qualified candidates are exempted from written test; others must clear SMRU Ph.D. Entrance Examination."],
  ["Research Proposal", "Approximately 1,000 words required."],
  ["Additional Documents", "Publications/research papers if any, two recommendation letters, employer NOC for part-time candidates."],
  ["Duration", "Minimum 3 years; maximum 6 years."],
];

const facilities = [
  ["Moot Court Hall", "Real courtroom-style training space for simulated proceedings, advocacy practice, oral arguments, and moot court competitions."],
  ["Digital Law Library", "Digital legal research resources will be listed based on officially available subscriptions and university-published information."],
  ["Legal Aid Cell", "Provides legal assistance and public legal education through supervised legal aid work, rural camps, urban literacy drives, and community outreach."],
  ["Smart Classrooms", "ICT-enabled classrooms with smart boards, projectors, audio-visual support, and internet access."],
  ["ADR & Arbitration Centre", "Training in negotiation, mediation, arbitration, drafting arbitration clauses, and mock dispute resolution."],
  ["Research and Publication Cell", "Supports research projects, papers, seminars, workshops, conferences, and publication activities."],
  ["Career Guidance and Placement Cell", "Supports internships, bootcamps, resume workshops, mock interviews, and career guidance."],
  ["Centre for Criminal Law, Forensic Studies, and Criminology", "Focuses on criminal law, forensic science, mock crime scene investigations, forensic psychology, toxicology, cybercrime, and criminal profiling."],
  ["Student Clubs and Societies", "Includes Moot Court Society, Legal Debating and Literary Club, Human Rights Forum, Corporate Law Club, Cyber Law and Technology Society, ADR and Negotiation Club, Environmental Law Collective, Sports and IPR Club."],
  ["Campus Infrastructure", "Wi-Fi-enabled campus, hostel facilities, cafeteria, sports and recreation, student lounge, and university transport."],
];

const entranceTabs = {
  "5-Year Integrated UG Programmes": ["CLAT UG", "AILET UG", "LSAT India", "LAW CET Telangana / Andhra Pradesh", "CUET Law Domain", "SMRU-LAT"],
  "3-Year LL.B. Programmes": ["CLAT UG", "AILET UG", "LSAT India", "LAW CET Telangana / Andhra Pradesh", "CUET Law Domain", "SMRU-LAT"],
  "LL.M. Programmes": ["CLAT PG", "AILET PG", "CUET PG Law", "LAW CET PG Telangana / Andhra Pradesh", "SMRU-LAT PG", "500-word research proposal for preferred specialization"],
};
const admissionFlow = [
  ["01", "Choose Programme", "Select integrated law, LL.B., LL.M., or Ph.D."],
  ["02", "Entrance Test", "Submit valid national, state, or SMRU-LAT score."],
  ["03", "Documents", "Upload academic records and required certificates."],
  ["04", "Admission Review", "Complete counselling, verification, and final confirmation."],
];
const mandatoryDocs = ["Mark sheets and passing certificates of qualifying examinations.", "Valid entrance examination scorecard.", "Transfer Certificate.", "Migration Certificate if applicable.", "Aadhar Card.", "Four recent passport-size photographs.", "Category Certificate for SC/ST/OBC/EWS/PwD candidates if applicable.", "Gap Year Affidavit if applicable.", "Research Proposal for LL.M. and Ph.D. admissions.", "Recommendation Letters for LL.M. and Ph.D.", "Employer NOC for part-time Ph.D. candidates."];
const undertakings = ["Anti-Ragging Affidavit signed by Student and Parent/Guardian.", "Code of Conduct Agreement.", "Attendance Undertaking with 75% minimum attendance.", "Plagiarism and Research Ethics Declaration for LL.M. and Ph.D.", "Moot Court and Internship Participation Agreement."];

const careerTabs = {
  "After Integrated Law / LL.B.": ["Advocate", "Judicial Services", "Corporate Counsel / In-House Lawyer", "Legal Advisor / Consultant", "Public Prosecutor / Assistant Public Prosecutor", "Legal Analyst / Legal Researcher", "Law Firm Associate", "Civil Services", "Legal Process Outsourcing", "NGO / Policy Work", "Legal Journalism", "Higher Studies"],
  "After LL.M.": ["Legal Academia", "Judicial Services", "Senior Legal Advisor / Consultant", "Policy and Legislative Research", "International Organizations", "Arbitration and Mediation Specialist", "Legal Publishing and Content Development", "Doctoral Studies"],
};

const methodologyCards = [
  ["Case-Based Learning", "Case law analysis, judicial decisions, legislative texts, and scholarly readings."],
  ["Problem-Based Learning", "Classroom discussions built around real legal problems and socio-economic contexts."],
  ["Moot Courts & Simulations", "Moot court exercises, role-plays, legal clinics, and courtroom simulations."],
  ["Legal Writing & Research", "Project work, legal writing, research methodology, and dissertation-based learning."],
  ["Structured Academic Planning", "Course outlines, weekly teaching plans, reading lists, and advance preparation."],
  ["Continuous Feedback", "End-semester feedback supports course improvement and academic responsiveness."],
];

function CheckList({ items, columns = "md:grid-cols-2" }) {
  return (
    <ul className={`grid ${columns} gap-3`}>
      {items.map((item) => (
        <li key={item} className="cut-corner-card flex gap-3 border border-[#dbe8f8] border-l-4 border-l-[#019e6e] bg-[#f8fbff] p-3 text-sm font-medium leading-relaxed text-slate-700">
          <FaCheckCircle className="mt-1 shrink-0 text-[#019e6e]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CardGrid({ items }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map(([title, desc, Icon]) => {
        const CardIcon = Icon || FaLandmark;
        return (
          <article key={title} className="cut-corner-card border border-[#dbe8f8] border-t-4 border-t-[#019e6e] bg-white p-5 shadow-[0_12px_28px_rgba(13,49,92,0.06)]">
            <CardIcon className="mb-4 text-[#019e6e]" size={28} />
            <h3 className="text-lg font-black text-[#0d315c]">{title}</h3>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">{desc}</p>
          </article>
        );
      })}
    </div>
  );
}

function DataTable({ rows }) {
  return (
    <>
      <div className="cut-corner-panel hidden overflow-hidden border border-[#dbe8f8] bg-white shadow-[0_20px_40px_rgba(13,49,92,0.08)] md:block">
        <table className="w-full text-sm">
          <thead className="bg-[#019e6e] text-white">
            <tr>
              <th className="px-4 py-4 text-left">Programme</th>
              <th className="px-4 py-4 text-left">Eligibility</th>
              <th className="px-4 py-4 text-left">Duration</th>
              <th className="px-4 py-4 text-left">Level</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.programme} className="border-t border-slate-200 align-top">
                <td className="px-4 py-4 font-black text-[#0d315c]">{row.programme}</td>
                <td className="px-4 py-4 text-slate-600">{row.eligibility}</td>
                <td className="px-4 py-4 text-slate-600">{row.duration}</td>
                <td className="px-4 py-4 text-slate-600">{row.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-4 md:hidden">
        {rows.map((row) => (
          <article key={row.programme} className="cut-corner-card border border-[#dbe8f8] border-l-4 border-l-[#019e6e] bg-white p-5 shadow-[0_12px_28px_rgba(13,49,92,0.06)]">
            <h3 className="font-black text-[#0d315c]">{row.programme}</h3>
            <dl className="mt-4 space-y-2 text-sm text-slate-600">
              <div><dt className="font-black text-[#0d315c]">Eligibility</dt><dd>{row.eligibility}</dd></div>
              <div><dt className="font-black text-[#0d315c]">Duration</dt><dd>{row.duration}</dd></div>
              <div><dt className="font-black text-[#0d315c]">Level</dt><dd>{row.level}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </>
  );
}

export default function SchoolOfLaw() {
  const openApply = useOpenApply();
  const [progFilter, setProgFilter] = useState("UG");
  const [expandedProg, setExpandedProg] = useState(null);
  const [vmoTab, setVmoTab] = useState("Vision");
  const [entranceTab, setEntranceTab] = useState("5-Year Integrated UG Programmes");
  const [careerTab, setCareerTab] = useState("After Integrated Law / LL.B.");
  const vmoItems = vmoTab === "Vision" ? visionItems : vmoTab === "Mission" ? missionItems : null;

  const [scrollDir, setScrollDir] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Force scroll to top on mount to prevent browser jumping to footer or hash
    window.scrollTo(0, 0);
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 50);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDir("down");
      } else {
        setScrollDir("up");
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f9ff] text-[#0d315c]">
      {/* Hero Section starts from the top, covering the area under the main navbar */}
      <section className="relative overflow-hidden bg-[#0d315c] pt-[112px] md:pt-[136px]">
        {/* Internal Page Navigation - Glassmorphic Overlay over the image */}
        <nav 
          aria-label="School of Law sections" 
          className={`absolute left-0 right-0 z-[1500] border-b border-white/10 bg-black/20 px-4 py-3 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:fixed ${
            scrollDir === "up" 
              ? "top-[112px] md:top-[136px]" 
              : "top-0 md:top-0"
          }`}
        >
          <div className="mx-auto max-w-7xl grid grid-cols-2 gap-2 sm:flex sm:justify-center sm:gap-2 sm:overflow-x-auto">
            {sectionLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="cut-corner-badge border border-white/20 px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-white hover:border-[#ffaf3a] hover:bg-white/10 hover:text-[#ffaf3a]"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* Background Image - Covers the entire section including padding area */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/law/hero.png" 
            alt="School of Law" 
            fill 
            priority 
            className="object-cover object-center lg:object-[50%_30%]"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full px-4 pt-4 md:pt-8 lg:pt-10 pb-12 md:pb-20 lg:pb-24">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
            {/* Left Column: Branding */}
            <div className="flex flex-col items-start text-left gap-12 lg:pl-16 lg:-mt-20">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffaf3a]/20 border border-[#ffaf3a]/30 text-[#ffaf3a] text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                  <FaLandmark size={12} /> St. Mary's University
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
                  School of <span className="text-[#ffaf3a]">Law</span>
                </h1>
              </div>
            </div>

            {/* Right Column: Enquiry Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0 rounded-[1.5rem] border border-white/20 bg-white/10 p-5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] backdrop-blur-md sm:p-7 md:p-8 animate-in fade-in slide-in-from-right-4 duration-1000">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ffaf3a]">Admissions 2026</p>
                  <h2 className="mt-1 text-2xl font-black text-white">Enquire Now</h2>
                </div>
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#ffaf3a] text-[#0d315c] shadow-lg shadow-[#ffaf3a]/20">
                  <FaPaperPlane size={16} />
                </div>
              </div>
              <div className="bg-white rounded-xl p-1">
                <CtplFormWidget formId={LAW_CTPL_FORM_ID} containerId="ctplform-hero" />
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="about" className="px-3 py-12 sm:px-4 sm:py-16 md:py-20 bg-white/50">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.6fr_0.4fr] items-center">
            <div className="max-w-3xl">
              <UniversitySectionHeader align="left" title="About School of Law" />
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700 sm:mt-8 sm:text-base sm:space-y-5">
                <p>The School of Law at St. Mary's Rehabilitation University, Hyderabad, stands distinct for combining rigorous legal doctrine with real-world advocacy and emerging legal technologies. The curriculum is designed to go beyond textbook learning, with specialised exposure to AI Regulation, Data Sovereignty, and Forensic Jurisprudence.</p>
                <p>The School promotes an immersive, practice-driven learning ecosystem through moot court training, legal aid engagement, community justice exposure, ethical reasoning, and professional skill development. The goal is to prepare legal professionals who are practice-ready, purpose-driven, and capable of responding to contemporary legal challenges.</p>
              </div>
              
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {featureCards.map(([title, desc]) => (
                  <article key={title} className="cut-corner-card border border-[#dbe8f8] border-l-4 border-l-[#019e6e] bg-white p-5 shadow-[0_12px_28px_rgba(13,49,92,0.06)]">
                    <h3 className="text-sm font-black text-[#0d315c]">{title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">{desc}</p>
                  </article>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="relative h-full min-h-[300px] col-span-2 overflow-hidden rounded-2xl shadow-lg">
                <Image src="/assets/law/about.png" alt="University Campus" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <span className="text-white font-black text-sm uppercase tracking-widest">About School of Law</span>
                </div>
              </div>
              <div className="relative h-[200px] overflow-hidden rounded-2xl shadow-lg">
                <Image src="/assets/law/classroom.png" alt="Smart Classroom" fill className="object-cover" />
              </div>
              <div className="relative h-[200px] overflow-hidden rounded-2xl shadow-lg">
                <Image src="/assets/law/library.png" alt="Legal Books" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="programmes" className="px-3 py-12 sm:px-4 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <UniversitySectionHeader 
            title="Programmes Offered" 
            subtitle="St. Mary's Rehabilitation University offers law programmes across undergraduate, postgraduate, and doctoral levels for students from diverse academic backgrounds, career goals, and professional aspirations." 
            subtitleClassName="max-w-2xl" 
          />
          
          <div className="mt-10 flex justify-center gap-3">
            {["UG", "PG", "Doctoral"].map((level) => (
              <button 
                key={level}
                onClick={() => setProgFilter(level)}
                className={`cut-corner-badge px-8 py-3 text-xs font-black uppercase tracking-[0.16em] transition-all ${progFilter === level ? "bg-[#019e6e] text-white shadow-lg" : "bg-white text-[#0d315c] border border-[#dbe8f8] hover:border-[#019e6e]"}`}
              >
                {level === "Doctoral" ? "PhD" : level}
              </button>
            ))}
          </div>

          <div className="mt-8 cut-corner-panel overflow-hidden border border-[#dbe8f8] bg-white shadow-xl">
            <table className="w-full text-sm">
              <thead className="bg-[#0d315c] text-white">
                <tr>
                  <th className="px-6 py-5 text-left uppercase tracking-wider">Programme</th>
                  <th className="px-6 py-5 text-left uppercase tracking-wider">Eligibility</th>
                  <th className="px-6 py-5 text-left uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-5 text-center uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {programmes.filter(p => p.level === progFilter).map((row) => (
                  <React.Fragment key={row.programme}>
                    <tr key={row.programme} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 flex-shrink-0 rounded bg-slate-100 p-2">
                            {row.programme.includes("B.A.") ? <Image src="/assets/law/ba-llb.png" alt="" width={40} height={40} /> :
                             row.programme.includes("B.B.A.") ? <Image src="/assets/law/bba-llb.png" alt="" width={40} height={40} /> :
                             row.programme.includes("B.Sc.") ? <Image src="/assets/law/bsc-llb.png" alt="" width={40} height={40} /> :
                             row.programme.includes("LL.M.") ? <FaBookOpen className="text-[#019e6e]" /> :
                             row.programme.includes("Ph.D.") ? <FaGraduationCap className="text-[#019e6e]" /> :
                             <FaGavel className="text-[#019e6e]" />}
                          </div>
                          <span className="font-black text-[#0d315c]">{row.programme}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-slate-600 font-medium">{row.eligibility}</td>
                      <td className="px-6 py-5 text-slate-600 font-medium">{row.duration}</td>
                      <td className="px-6 py-5 text-center">
                        <button 
                          onClick={() => setExpandedProg(expandedProg === row.programme ? null : row.programme)}
                          className="text-[#019e6e] font-black uppercase text-[10px] tracking-widest hover:underline"
                        >
                          {expandedProg === row.programme ? "Hide" : "Expand"}
                        </button>
                      </td>
                    </tr>
                    {expandedProg === row.programme && (
                      <tr className="bg-slate-50/50">
                        <td colSpan={4} className="px-6 py-8">
                          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            {row.level === "UG" && (
                              <div className="space-y-6">
                                {ugProgrammes.find(u => u.title.includes(row.programme.split(" - ")[0]))?.groups.map(([title, items]) => (
                                  <div key={title}>
                                    <h4 className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#0d315c] flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 bg-[#ffaf3a] rounded-full" />
                                      {title}
                                    </h4>
                                    <CheckList items={items} />
                                  </div>
                                ))}
                              </div>
                            )}
                            {row.level === "PG" && (
                              <div className="grid gap-6 lg:grid-cols-2">
                                <div className="space-y-6">
                                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0d315c]">Specializations</h4>
                                  <CheckList items={llmSpecializations} columns="grid-cols-1" />
                                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0d315c]">Programme Objectives</h4>
                                  <CheckList items={llmPeos} columns="grid-cols-1" />
                                </div>
                                <div>
                                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0d315c] mb-4">Programme Structure</h4>
                                  <div className="cut-corner-panel overflow-hidden border border-slate-200">
                                    <table className="w-full text-xs">
                                      <tbody>
                                        {llmStructure.map(([label, value]) => (
                                          <tr key={label} className="border-t border-slate-200 first:border-t-0">
                                            <th className="bg-slate-50 px-3 py-3 text-left font-black text-[#0d315c]">{label}</th>
                                            <td className="px-3 py-3 text-slate-600">{value}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            )}
                            {row.level === "Doctoral" && (
                              <div className="space-y-8">
                                <div>
                                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0d315c] mb-4">Research Areas</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {phdAreas.map(area => (
                                      <span key={area} className="px-3 py-1 bg-white border border-slate-200 text-[#019e6e] text-xs font-bold rounded-full">{area}</span>
                                    ))}
                                  </div>
                                </div>
                                <div className="cut-corner-panel overflow-hidden border border-slate-200">
                                  <table className="w-full text-xs">
                                    <tbody>
                                      {phdRequirements.map(([label, value]) => (
                                        <tr key={label} className="border-t border-slate-200 first:border-t-0">
                                          <th className="bg-slate-50 px-3 py-3 text-left font-black text-[#0d315c] w-1/4">{label}</th>
                                          <td className="px-3 py-3 text-slate-600">{value}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* VISION, MISSION & OBJECTIVES moved after Programmes */}
      <section id="vision-mission-objectives" className="bg-[#0d315c] px-3 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <UniversitySectionHeader title="Vision, Mission & Objectives" titleClassName="text-white" />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {["Vision", "Mission", "Objectives"].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setVmoTab(tab)} 
                className={`cut-corner-badge px-8 py-3 text-xs font-black uppercase tracking-[0.16em] transition-all flex items-center gap-2 ${vmoTab === tab ? "bg-[#019e6e] text-white shadow-lg" : "border border-white/20 bg-white/10 text-white hover:bg-white/20"}`}
              >
                {tab === "Vision" ? <FaLandmark size={14} /> : tab === "Mission" ? <FaBriefcase size={14} /> : <FaCheckCircle size={14} />}
                {tab}
              </button>
            ))}
          </div>
          <div className="cut-corner-panel mt-10 border border-white/15 bg-white/5 p-8 backdrop-blur-sm max-w-5xl mx-auto">
            <h3 className="text-2xl font-black text-[#ffaf3a] flex items-center gap-4">
              <div className="h-1 w-12 bg-[#ffaf3a]" />
              {vmoTab === "Vision" ? "Vision of the School" : vmoTab === "Mission" ? "Mission Statement" : "Objectives of the School of Law"}
            </h3>
            <div className="mt-8">
              {vmoItems ? (
                <ul className="grid md:grid-cols-2 gap-4">
                  {vmoItems.map((item) => (
                    <li key={item} className="flex gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                      <FaCheckCircle className="mt-1 shrink-0 text-[#019e6e]" />
                      <span className="text-sm font-medium leading-relaxed text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {objectiveClusters.map(([title, items]) => (
                    <article key={title} className="cut-corner-card border border-white/15 border-l-4 border-l-[#019e6e] bg-white/5 p-6 hover:bg-white/10 transition-colors">
                      <h4 className="font-black text-[#ffaf3a] uppercase tracking-wider text-sm mb-4">{title}</h4>
                      <ul className="space-y-3">
                        {items.map((item) => (
                          <li key={item} className="text-sm leading-relaxed text-white/80 flex gap-2">
                            <span className="text-[#019e6e]">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* LAW IN ACTION moved after VMO */}
      <section id="law-in-action" className="bg-white px-3 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <UniversitySectionHeader 
            title="Law in Action at SMRU" 
            subtitle="A legal learning ecosystem designed around advocacy, research, technology, ethics, and community justice." 
            subtitleClassName="max-w-3xl" 
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Moot Court Training", desc: "Simulated courtroom practice helps students develop advocacy, oratory, analytical, and courtroom presentation skills.", icon: FaGavel, img: "/assets/law/moot-court.png" },
              { title: "Legal Aid & Community Justice", desc: "Students engage with legal literacy, rural legal aid camps, urban legal awareness, and community-focused legal service.", icon: FaHandshake, img: "/assets/law/legal-aid.png" },
              { title: "Emerging Law & Technology", desc: "Academic exposure includes AI Regulation, Data Sovereignty, Cyber Law, Technology Law, and digital legal challenges.", icon: FaMicroscope, img: "/assets/law/tech-law.png" },
              { title: "Research & Publication", desc: "The Research and Publication Cell supports research papers, seminars, conferences, and legal scholarship.", icon: FaBookOpen, img: "/assets/law/library.png" },
              { title: "ADR & Arbitration", desc: "Dedicated training in negotiation, mediation, arbitration, drafting arbitration clauses, and dispute resolution simulations.", icon: FaBalanceScale, img: "/assets/law/adr.png" },
              { title: "Career Readiness", desc: "Internships, resume workshops, mock interviews, bootcamps, and career guidance support professional preparation.", icon: FaBriefcase, img: "/assets/law/career-readiness.png" },
            ].map((item) => (
              <article key={item.title} className="group cut-corner-card overflow-hidden border border-slate-200 bg-white shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d315c]/80 to-transparent" />
                  <item.icon className="absolute bottom-4 left-4 text-[#ffaf3a]" size={28} />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-black text-[#0d315c] uppercase tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* CAREER OPPORTUNITIES moved above Admissions */}
      <section id="careers" className="px-3 py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#dbe8f8] to-transparent" />
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <UniversitySectionHeader title="Career Opportunities" subtitle="Our graduates are prepared for diverse and impactful career pathways in the legal profession and beyond." align="left" />
              <p className="mt-6 text-slate-600 leading-relaxed font-medium">SMRU School of Law provides comprehensive support through internships, moot court training, and career guidance cells to ensure students are ready for the evolving legal landscape.</p>
            </div>
            <div className="relative h-[300px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
               <Image src="/assets/law/careers-hero.png" alt="Careers" fill className="object-cover" />
               <div className="absolute inset-0 bg-gradient-to-r from-[#0d315c]/20 to-transparent" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { title: "Judiciary", icon: FaGavel, careers: ["Judicial Services", "Magistrate", "Civil Judge"] },
              { title: "Academia", icon: FaBookOpen, careers: ["Professor", "Researcher", "Legal Scientist"] },
              { title: "Corporate", icon: FaBriefcase, careers: ["Corporate Counsel", "Legal Advisor", "Compliance Officer"] },
              { title: "Policy", icon: FaLandmark, careers: ["Policy Analyst", "Legislative Assistant", "NGO Advocate"] },
              { title: "International", icon: FaUsers, careers: ["International Arbitrator", "Human Rights Lawyer", "Diplomat"] }
            ].map((cat) => (
              <article key={cat.title} className="cut-corner-card border border-slate-200 bg-[#f8fbff] p-6 hover:border-[#019e6e] transition-all group">
                <cat.icon className="text-[#019e6e] mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-lg font-black text-[#0d315c] uppercase tracking-tight mb-4">{cat.title}</h3>
                <ul className="space-y-2">
                  {cat.careers.map(c => <li key={c} className="text-xs font-medium text-slate-600 flex items-center gap-2"><div className="w-1 h-1 bg-[#019e6e] rounded-full" /> {c}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {Object.keys(careerTabs).map((tab) => (
              <button 
                key={tab} 
                onClick={() => setCareerTab(tab)} 
                className={`cut-corner-badge px-5 py-2 text-[10px] font-black uppercase tracking-[0.14em] transition-all ${careerTab === tab ? "bg-[#0d315c] text-white" : "border border-slate-200 bg-white text-slate-500 hover:text-[#0d315c]"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {careerTabs[careerTab].map((career) => (
              <span key={career} className="px-4 py-2 bg-slate-50 border border-slate-100 text-[#0d315c] text-[10px] font-black uppercase tracking-widest rounded-md">{career}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-[#dbe8f8]" />

      <section id="facilities" className="px-3 py-16 md:py-24 bg-[#f8fbff] relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#dbe8f8] to-transparent" />
        <div className="mx-auto max-w-7xl">
          <UniversitySectionHeader title="Facilities at St. Mary's School of Law" />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Moot Court Hall", desc: "Real courtroom-style training space for simulated proceedings, advocacy practice, oral arguments, and moot court competitions.", img: "/assets/law/moot-court.png" },
              { title: "Digital Law Library", desc: "Digital legal research resources will be listed based on officially available subscriptions and university-published information.", img: "/assets/law/digital-library.png" },
              { title: "Legal Aid Cell", desc: "Provides legal assistance and public legal education through supervised legal aid work, rural camps, urban literacy drives, and community outreach.", img: "/assets/law/legal-aid.png" },
              { title: "Smart Classrooms", desc: "ICT-enabled classrooms with smart boards, projectors, audio-visual support, and internet access.", img: "/assets/law/classroom.png" },
              { title: "ADR & Arbitration Centre", desc: "Training in negotiation, mediation, arbitration, drafting arbitration clauses, and mock dispute resolution.", img: "/assets/law/adr.png" },
              { title: "Forensic & Criminal Law Centre", desc: "Specialized lab for forensic science, crime scene investigation simulations, and criminal psychology studies.", img: "/assets/law/forensic-lab.png" },
            ].map((facility) => (
              <article key={facility.title} className="cut-corner-card overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-shadow flex flex-col">
                <div className="relative h-48 w-full">
                  <Image src={facility.img} alt={facility.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-black text-[#0d315c] uppercase tracking-tight">{facility.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{facility.desc}</p>
                </div>
              </article>
            ))}
          </div>
          {/* Render remaining facilities as simple cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facilities.slice(6).map(([title, desc]) => (
              <article key={title} className="p-5 border border-slate-200 bg-white/50 cut-corner-card">
                <h3 className="font-black text-[#0d315c] text-xs uppercase tracking-wider">{title}</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-500">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-[#dbe8f8]" />

      <section id="admissions" className="bg-white px-3 py-16 md:py-24 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#dbe8f8] to-transparent" />
        <div className="mx-auto max-w-7xl">
          <UniversitySectionHeader title="Admissions" subtitle="Admissions at St. Mary's School of Law are conducted with a process designed around fairness, transparency, and merit-based selection in alignment with statutory frameworks." subtitleClassName="max-w-2xl" />
          <p className="cut-corner-panel mx-auto mt-4 max-w-3xl border border-[#dbe8f8] border-l-4 border-l-[#019e6e] bg-[#f8fbff] p-4 text-center text-xs font-medium leading-relaxed text-slate-700 sm:mt-6 sm:p-5 sm:text-sm">The School accepts recognized national and state-level entrance examinations and also conducts SMRU-LAT for candidates who do not have valid national entrance scores.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {admissionFlow.map(([step, title, desc], index) => (
              <article key={step} className="cut-corner-card relative overflow-hidden border border-[#dbe8f8] bg-[#f8fbff] p-5 shadow-[0_12px_28px_rgba(13,49,92,0.06)]">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-black text-white ${index % 2 === 0 ? "bg-[#019e6e]" : "bg-[#b4232a]"}`}>{step}</div>
                <h3 className="mt-4 font-black text-[#0d315c]">{title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">{desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3 sm:mt-8">{Object.keys(entranceTabs).map((tab) => <button key={tab} onClick={() => setEntranceTab(tab)} className={`cut-corner-badge px-3 py-2 text-xs font-black uppercase tracking-[0.12em] sm:px-4 sm:py-3 ${entranceTab === tab ? "bg-[#019e6e] text-white" : "border border-[#dbe8f8] bg-white text-[#0d315c]"}`}>{tab}</button>)}</div>
          <div className="cut-corner-panel mt-6 border border-[#dbe8f8] bg-white p-4 sm:p-6"><CheckList items={entranceTabs[entranceTab]} /></div>
          {/* Removed duplicate Eligibility Summary table as requested */}
          <div className="mt-8 grid gap-4 sm:gap-6 sm:mt-10 lg:grid-cols-2">
            <article>
              <h3 className="text-2xl font-black">Mandatory Documents</h3>
              <div className="mb-5 mt-3 h-1 w-16 cut-corner-underline bg-[#ffaf3a]" />
              <CheckList items={mandatoryDocs} columns="md:grid-cols-1" />
            </article>
            <article>
              <h3 className="text-2xl font-black">Undertakings Required</h3>
              <div className="mb-5 mt-3 h-1 w-16 cut-corner-underline bg-[#ffaf3a]" />
              <CheckList items={undertakings} columns="md:grid-cols-1" />
            </article>
          </div>
        </div>
      </section>

      {/* Hiding Methodology and Recognition as requested */}
      <section className="hidden">
        <UniversitySectionHeader title="Teaching-Learning Methodology" />
        <CardGrid items={methodologyCards} />
        <UniversitySectionHeader title="Professional Recognition" />
      </section>

      {/* ================= LAW PORTAL CTA ================= */}
      <section className="py-20 bg-[#f0f7ff] border-y border-[#dbe8f8] px-4 -mb-px">
        <div className="mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-[#0d315c] mb-6 shadow-sm border border-slate-100">
            <FaBalanceScale size={24} />
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-[#0d315c] uppercase tracking-tight">Explore the Law Portal</h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto font-medium">Access the complete legal education ecosystem, resources, and official student portal for the School of Law.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-6">
            <a 
              href="/law/" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#0d315c] text-white font-black text-[13px] uppercase tracking-[0.25em] cut-corner-badge shadow-xl hover:scale-105 transition-all transform active:scale-95"
            >
              Visit Law Portal <FaArrowRight />
            </a>
            <button 
              onClick={() => openApply("law")}
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#019e6e] text-white font-black text-[13px] uppercase tracking-[0.25em] cut-corner-badge shadow-xl hover:scale-105 transition-all transform active:scale-95"
            >
              APPLY / ENQUIRE
            </button>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#0d315c] px-3 py-12 sm:px-4 sm:py-16 text-white md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <FaGraduationCap className="mx-auto text-[#ffaf3a]" size={40} />
          <UniversitySectionHeader
            className="mt-4 sm:mt-5"
            title="Start Your Legal Education Journey"
            titleClassName="text-white"
            subtitle="For admissions-related enquiries, connect with the School of Law admissions office."
            subtitleClassName="max-w-2xl text-white/80"
          />
          <div className="cut-corner-panel mx-auto mt-6 grid max-w-3xl gap-2 border border-white/15 bg-white/8 p-4 text-xs font-semibold text-white/90 sm:gap-3 sm:p-5 sm:text-sm md:grid-cols-2 sm:mt-8">
            <div className="flex items-center justify-center gap-2"><FaLandmark className="text-[#ffaf3a]" /> School of Law</div>
            <div className="flex items-center justify-center gap-2"><FaUsers className="text-[#ffaf3a]" /> St. Mary's Rehabilitation University</div>
            <div className="flex items-center justify-center gap-2"><FaBalanceScale className="text-[#ffaf3a]" /> Hyderabad, Telangana, India</div>
            <a href="mailto:admissions.law@stmarysuniversity.edu.in" className="flex items-center justify-center gap-2 underline decoration-white/30 underline-offset-4"><FaEnvelope className="text-[#ffaf3a]" /> admissions.law@stmarysuniversity.edu.in</a>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3 sm:mt-8">
            <button onClick={() => openApply("general")} className="cut-corner-badge inline-flex items-center gap-2 bg-[#ffaf3a] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#0d315c] sm:px-8 sm:py-4 sm:gap-3">Apply for Law Admissions <FaArrowRight className="hidden sm:inline" /></button>
            <a href="#programmes" className="cut-corner-badge border border-white/25 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white sm:px-8 sm:py-4">Explore Law Programmes</a>
            <a href="mailto:admissions.law@stmarysuniversity.edu.in" className="cut-corner-badge border border-white/25 bg-[#019e6e] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white sm:px-8 sm:py-4">Talk to Admissions</a>
          </div>
        </div>
      </section>
    </div>
  );
}
