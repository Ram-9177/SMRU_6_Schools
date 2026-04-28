// @ts-nocheck
"use client";

import { useState } from "react";
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
  FaUsers,
} from "react-icons/fa";
import useOpenApply from "../hooks/useOpenApply";
import UniversitySectionHeader from "../components/UniversitySectionHeader";

const lawHeroImg = "/assets/hero-campus.jpg";

const heroChips = ["Moot Court Training", "Legal Aid Cell", "AI Regulation & Data Sovereignty", "Forensic Jurisprudence"];

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
    overview: "A three-year legal programme for graduates from all disciplines, covering BCI-mandated core subjects and practical legal training.",
    groups: [
      ["Core Subjects", ["Constitutional Law.", "Law of Crimes - BNS 2023 and BNSS 2023.", "Law of Contracts.", "Family Law.", "Law of Evidence - BSA 2023.", "Property Law.", "Administrative Law.", "Company Law.", "Labour Law.", "Environmental Law.", "CPC and Limitation Act.", "Public International Law.", "Professional Ethics.", "Drafting, Pleading, and Conveyancing.", "Alternative Dispute Resolution."]],
      ["Highlights", ["BCI-mandated core subject coverage.", "Moot courts, drafting workshops, and court visits.", "Mandatory internships.", "Legal aid clinic participation.", "Career support for litigation, judiciary, government service, and corporate legal roles."]],
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
  ["Digital Law Library", "Digital legal research support with national and international legal texts, journals, case law databases, and e-resources. TODO: Verify active subscriptions before publishing names like Manupatra, SCC Online, LexisNexis, and HeinOnline."],
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
  "3-Year LL.B. Programmes": ["LSAT India", "LAW CET Telangana / Andhra Pradesh", "CUET Law Domain", "SMRU-LAT"],
  "LL.M. Programmes": ["CLAT PG", "AILET PG", "CUET PG Law", "LAW CET PG Telangana / Andhra Pradesh", "SMRU-LAT PG", "500-word research proposal for preferred specialization"],
};
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
        <li key={item} className="cut-corner-card flex gap-3 border border-[#dbe8f8] border-l-4 border-l-[#b4232a] bg-[#f8fbff] p-3 text-sm font-medium leading-relaxed text-slate-700">
          <FaCheckCircle className="mt-1 shrink-0 text-[#b4232a]" />
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
          <article key={title} className="cut-corner-card border border-[#dbe8f8] border-t-4 border-t-[#b4232a] bg-white p-5 shadow-[0_12px_28px_rgba(13,49,92,0.06)]">
            <CardIcon className="mb-4 text-[#b4232a]" size={28} />
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
          <thead className="bg-[#b4232a] text-white">
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
          <article key={row.programme} className="cut-corner-card border border-[#dbe8f8] border-l-4 border-l-[#b4232a] bg-white p-5 shadow-[0_12px_28px_rgba(13,49,92,0.06)]">
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
  const [vmoTab, setVmoTab] = useState("Vision");
  const [entranceTab, setEntranceTab] = useState("5-Year Integrated UG Programmes");
  const [careerTab, setCareerTab] = useState("After Integrated Law / LL.B.");
  const vmoItems = vmoTab === "Vision" ? visionItems : vmoTab === "Mission" ? missionItems : null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f9ff] text-[#0d315c]">
      <section className="relative flex min-h-[78svh] items-end overflow-hidden">
        <Image src={lawHeroImg} alt="St. Mary's Rehabilitation University campus" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d315c]/95 via-[#0d315c]/82 to-[#b4232a]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d315c]/95 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-24 md:pb-16">
          <div className="max-w-4xl">
            <p className="cut-corner-badge inline-flex bg-[#b4232a] px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white">Admissions Open</p>
            <h1 className="mt-6 text-4xl font-black uppercase leading-[0.9] tracking-tight text-white md:text-7xl">School of Law</h1>
            <p className="mt-5 max-w-3xl text-lg font-semibold leading-relaxed text-white/90">Legal education built around rigorous doctrine, real-world advocacy, ethical reasoning, and emerging areas of law.</p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/82 md:text-base">The School of Law at St. Mary's Rehabilitation University, Hyderabad, offers a practice-driven legal education ecosystem combining classroom learning, moot court training, legal aid, research, and future-facing domains such as AI Regulation, Data Sovereignty, and Forensic Jurisprudence.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#programmes" className="cut-corner-badge bg-[#ffaf3a] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#0d315c] shadow-xl">View Programmes</a>
              <a href="#admissions" className="cut-corner-badge border border-white/30 bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white">Admissions Process</a>
              <a href="#contact" className="cut-corner-badge border border-white/30 bg-[#b4232a]/70 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white">Contact Admissions Office</a>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {heroChips.map((chip) => <span key={chip} className="cut-corner-badge border border-white/20 bg-white/12 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm">{chip}</span>)}
          </div>
        </div>
      </section>

      <nav aria-label="School of Law sections" className="sticky top-[79px] z-20 border-b border-[#dbe8f8] bg-white/95 px-4 py-3 backdrop-blur md:top-[95px]">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto">
          {sectionLinks.map(([label, href]) => <a key={href} href={href} className="cut-corner-badge shrink-0 border border-[#dbe8f8] px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#0d315c] hover:border-[#b4232a] hover:bg-[#fff5f5] hover:text-[#b4232a]">{label}</a>)}
        </div>
      </nav>

      <section id="about" className="px-4 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <UniversitySectionHeader align="left" title="About School of Law" />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-700">
              <p>The School of Law at St. Mary's Rehabilitation University, Hyderabad, stands distinct for combining rigorous legal doctrine with real-world advocacy and emerging legal technologies. The curriculum is designed to go beyond textbook learning, with specialised exposure to AI Regulation, Data Sovereignty, and Forensic Jurisprudence.</p>
              <p>The School promotes an immersive, practice-driven learning ecosystem through moot court training, legal aid engagement, community justice exposure, ethical reasoning, and professional skill development. The goal is to prepare legal professionals who are practice-ready, purpose-driven, and capable of responding to contemporary legal challenges.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {featureCards.map(([title, desc]) => <article key={title} className="cut-corner-card border border-[#dbe8f8] border-l-4 border-l-[#b4232a] bg-white p-5 shadow-[0_12px_28px_rgba(13,49,92,0.06)]"><h3 className="font-black text-[#0d315c]">{title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">{desc}</p></article>)}
          </div>
        </div>
      </section>

      <section id="law-in-action" className="bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <UniversitySectionHeader title="Law in Action at SMRU" subtitle="A legal learning ecosystem designed around advocacy, research, technology, ethics, and community justice." subtitleClassName="max-w-3xl" />
          <div className="mt-10"><CardGrid items={actionCards} /></div>
        </div>
      </section>

      <section id="vision-mission-objectives" className="bg-[#0d315c] px-4 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl">
          <UniversitySectionHeader title="Vision, Mission & Objectives" titleClassName="text-white" />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["Vision", "Mission", "Objectives"].map((tab) => <button key={tab} onClick={() => setVmoTab(tab)} className={`cut-corner-badge px-5 py-3 text-xs font-black uppercase tracking-[0.16em] ${vmoTab === tab ? "bg-[#b4232a] text-white" : "border border-white/20 bg-white/10 text-white"}`}>{tab}</button>)}
          </div>
          <div className="cut-corner-panel mt-8 border border-white/15 bg-white/8 p-5 md:p-8">
            <h3 className="text-2xl font-black text-[#ffaf3a]">{vmoTab === "Vision" ? "Vision of the School" : vmoTab === "Mission" ? "Mission Statement" : "Objectives of the School of Law"}</h3>
            <div className="mt-6">
              {vmoItems ? <CheckList items={vmoItems} /> : <div className="grid gap-4 md:grid-cols-2">{objectiveClusters.map(([title, items]) => <article key={title} className="cut-corner-card border border-white/15 border-l-4 border-l-[#b4232a] bg-white/10 p-4"><h4 className="font-black text-[#ffaf3a]">{title}</h4><ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/85">{items.map((item) => <li key={item}>- {item}</li>)}</ul></article>)}</div>}
            </div>
          </div>
        </div>
      </section>

      <section id="programmes" className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <UniversitySectionHeader title="Programmes Offered" subtitle="St. Mary's Rehabilitation University offers law programmes across undergraduate, postgraduate, and doctoral levels for students from diverse academic backgrounds, career goals, and professional aspirations." subtitleClassName="max-w-4xl" />
          <div className="mt-10"><DataTable rows={programmes} /></div>
          <p className="cut-corner-panel mt-5 border border-[#f4d7a4] border-l-4 border-l-[#b4232a] bg-[#fff8eb] p-4 text-sm font-medium leading-relaxed text-[#7a4a00]">Programme details are based on the School of Law academic document. BCI/UGC approval references should be linked to official verification documents before final publishing.</p>
        </div>
      </section>

      <section id="ug-programmes" className="bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <UniversitySectionHeader title="Undergraduate Programmes" />
          <div className="mt-8 space-y-4">
            {ugProgrammes.map((programme) => (
              <details key={programme.title} className="cut-corner-panel group border border-[#dbe8f8] border-l-4 border-l-[#b4232a] bg-[#fcfeff] shadow-[0_8px_20px_rgba(13,49,92,0.05)]">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 md:p-6">
                  <div><h3 className="text-lg font-black text-[#0d315c] md:text-xl">{programme.title}</h3><p className="mt-2 text-sm text-slate-600">{programme.overview}</p></div>
                  <span className="shrink-0 text-xs font-black uppercase tracking-[0.16em] text-[#b4232a] group-open:hidden">Open</span>
                  <span className="hidden shrink-0 text-xs font-black uppercase tracking-[0.16em] text-[#7c1d1d] group-open:inline">Close</span>
                </summary>
                <div className="space-y-6 border-t border-[#e8f1fb] px-5 pb-6 pt-5 md:px-6">
                  {programme.groups.map(([title, items]) => <div key={title}><h4 className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#0d315c]">{title}</h4><CheckList items={items} /></div>)}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="llm" className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <UniversitySectionHeader title="LL.M. - Master of Laws" subtitle="The LL.M. programme is a one-year, research-driven postgraduate course designed to deepen legal expertise and strengthen professional competence in specialized areas of law." subtitleClassName="max-w-4xl" />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="cut-corner-panel border border-[#dbe8f8] border-t-4 border-t-[#b4232a] bg-white p-6 shadow-[0_12px_28px_rgba(13,49,92,0.06)]"><h3 className="text-xl font-black">Specializations</h3><div className="mt-5"><CheckList items={llmSpecializations} columns="md:grid-cols-1" /></div></article>
            <article className="cut-corner-panel border border-[#dbe8f8] border-t-4 border-t-[#b4232a] bg-white p-6 shadow-[0_12px_28px_rgba(13,49,92,0.06)]"><h3 className="text-xl font-black">Programme Educational Objectives</h3><div className="mt-5"><CheckList items={llmPeos} columns="md:grid-cols-1" /></div></article>
          </div>
          <div className="cut-corner-panel mt-6 overflow-hidden border border-[#dbe8f8] bg-white"><table className="w-full text-sm"><tbody>{llmStructure.map(([label, value]) => <tr key={label} className="border-t border-slate-200 first:border-t-0"><th className="w-1/3 bg-[#fff5f5] px-4 py-4 text-left font-black text-[#b4232a]">{label}</th><td className="px-4 py-4 text-slate-600">{value}</td></tr>)}</tbody></table></div>
        </div>
      </section>

      <section id="phd" className="bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <UniversitySectionHeader title="Ph.D. in Law" subtitle="The Ph.D. in Law is offered in Full-Time and Part-Time modes for scholars seeking to make original and significant contributions to legal knowledge." subtitleClassName="max-w-4xl" />
          <p className="mx-auto mt-6 max-w-4xl text-center leading-relaxed text-slate-600">The programme supports doctrinal, empirical, interdisciplinary, and comparative research under faculty mentorship.</p>
          <div className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">{phdAreas.map((area) => <div key={area} className="cut-corner-badge border border-[#dbe8f8] bg-[#fff5f5] px-4 py-3 text-sm font-bold text-[#b4232a]">{area}</div>)}</div>
          <div className="cut-corner-panel mt-8 overflow-hidden border border-[#dbe8f8] bg-white"><table className="w-full text-sm"><tbody>{phdRequirements.map(([label, value]) => <tr key={label} className="border-t border-slate-200 first:border-t-0"><th className="w-1/3 bg-[#fff5f5] px-4 py-4 text-left font-black text-[#b4232a]">{label}</th><td className="px-4 py-4 text-slate-600">{value}</td></tr>)}</tbody></table></div>
        </div>
      </section>

      <section id="facilities" className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <UniversitySectionHeader title="Facilities at St. Mary's School of Law" />
          <div className="mt-10"><CardGrid items={facilities} /></div>
        </div>
      </section>

      <section id="admissions" className="bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <UniversitySectionHeader title="Admissions" subtitle="Admissions at St. Mary's School of Law are conducted in accordance with BCI and UGC guidelines, with a process designed around fairness, transparency, and merit-based selection." subtitleClassName="max-w-4xl" />
          <p className="cut-corner-panel mx-auto mt-6 max-w-4xl border border-[#dbe8f8] border-l-4 border-l-[#b4232a] bg-[#f8fbff] p-5 text-center font-medium leading-relaxed text-slate-700">The School accepts recognized national and state-level entrance examinations and also conducts SMRU-LAT for candidates who do not have valid national entrance scores.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">{Object.keys(entranceTabs).map((tab) => <button key={tab} onClick={() => setEntranceTab(tab)} className={`cut-corner-badge px-4 py-3 text-xs font-black uppercase tracking-[0.12em] ${entranceTab === tab ? "bg-[#b4232a] text-white" : "border border-[#dbe8f8] bg-white text-[#0d315c]"}`}>{tab}</button>)}</div>
          <div className="cut-corner-panel mt-6 border border-[#dbe8f8] bg-white p-6"><CheckList items={entranceTabs[entranceTab]} /></div>
          <div className="mt-10"><h3 className="mb-5 text-2xl font-black">Eligibility Summary</h3><DataTable rows={programmes} /></div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article><h3 className="mb-5 text-2xl font-black">Mandatory Documents</h3><CheckList items={mandatoryDocs} columns="md:grid-cols-1" /></article>
            <article><h3 className="mb-5 text-2xl font-black">Undertakings Required</h3><CheckList items={undertakings} columns="md:grid-cols-1" /></article>
          </div>
        </div>
      </section>

      <section id="careers" className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <UniversitySectionHeader title="Career Opportunities" />
          <div className="mt-8 flex flex-wrap justify-center gap-3">{Object.keys(careerTabs).map((tab) => <button key={tab} onClick={() => setCareerTab(tab)} className={`cut-corner-badge px-5 py-3 text-xs font-black uppercase tracking-[0.14em] ${careerTab === tab ? "bg-[#b4232a] text-white" : "border border-[#dbe8f8] bg-white text-[#0d315c]"}`}>{tab}</button>)}</div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{careerTabs[careerTab].map((career) => <article key={career} className="cut-corner-card border border-[#dbe8f8] border-l-4 border-l-[#b4232a] bg-white p-4 text-sm font-black text-[#0d315c] shadow-[0_8px_20px_rgba(13,49,92,0.05)]">{career}</article>)}</div>
        </div>
      </section>

      <section id="methodology" className="bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <UniversitySectionHeader title="Teaching-Learning Methodology" subtitle="The School follows a multi-disciplinary and practical teaching-learning approach combining traditional lectures with interactive and experiential learning methods." subtitleClassName="max-w-4xl" />
          <div className="mt-10"><CardGrid items={methodologyCards} /></div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">{["experiential learning", "critical inquiry", "ethical awareness", "social responsibility"].map((item) => <span key={item} className="cut-corner-badge border border-[#dbe8f8] bg-[#fff5f5] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#b4232a]">{item}</span>)}</div>
        </div>
      </section>

      <section id="recognition" className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <UniversitySectionHeader title="Professional Recognition" />
          {/* TODO: Before publishing, link official BCI approval and UGC recognition documents. Do not publish this block as a standalone claim without verification links if the compliance team has not confirmed. */}
          <article className="cut-corner-panel mt-8 border border-[#f4d7a4] border-l-4 border-l-[#b4232a] bg-[#fff8eb] p-6 text-sm font-medium leading-relaxed text-[#583900] md:text-base">
            The School of Law document states that St. Mary's School of Law holds approval of the Bar Council of India and that the University is recognized by the University Grants Commission. It also states that graduates are eligible to appear for the All India Bar Examination and practice law across India.
          </article>
        </div>
      </section>

      <section id="contact" className="bg-[#0d315c] px-4 py-16 text-white md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <FaGraduationCap className="mx-auto text-[#ffaf3a]" size={54} />
          <h2 className="mt-5 text-3xl font-black uppercase leading-tight md:text-5xl">Start Your Legal Education Journey</h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/80">For admissions-related enquiries, connect with the School of Law admissions office.</p>
          <div className="cut-corner-panel mx-auto mt-8 grid max-w-3xl gap-3 border border-white/15 bg-white/8 p-5 text-sm font-semibold text-white/90 md:grid-cols-2">
            <div className="flex items-center justify-center gap-2"><FaLandmark className="text-[#ffaf3a]" /> School of Law</div>
            <div className="flex items-center justify-center gap-2"><FaUsers className="text-[#ffaf3a]" /> St. Mary's Rehabilitation University</div>
            <div className="flex items-center justify-center gap-2"><FaBalanceScale className="text-[#ffaf3a]" /> Hyderabad, Telangana, India</div>
            <a href="mailto:admissions.law@stmarysuniversity.edu.in" className="flex items-center justify-center gap-2 underline decoration-white/30 underline-offset-4"><FaEnvelope className="text-[#ffaf3a]" /> admissions.law@stmarysuniversity.edu.in</a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={() => openApply("general")} className="cut-corner-badge inline-flex items-center gap-3 bg-[#ffaf3a] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#0d315c]">Apply Now <FaArrowRight /></button>
            <a href="#admissions" className="cut-corner-badge border border-white/25 bg-white/10 px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-white">Admissions Process</a>
            <a href="/contact/" className="cut-corner-badge border border-white/25 bg-[#b4232a] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-white">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}
