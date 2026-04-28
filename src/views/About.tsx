// @ts-nocheck
"use client";
// C:\Projects\my_fullstack_app\frontend1\my-app\src\pages\About.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@/lib/router";

import abstractHeroBg from "../assets/abstract-hero-bg.png";
import logo from "../assets/Logo.png";
import vc from "../assets/vc.jpg";
import bharathiImg from "../assets/Bharathi.jpg";
import founderImg from "../assets/kvk.jpg";
import harshaImg from "../assets/harsha.jpg";
import indrajaImg from "../assets/indraja.jpg";
import induImg from "../assets/indu.jpg";
// at the other imports…
import LeadershipBoards from "../components/LeadershipBoards";
import UniversitySectionHeader from "../components/UniversitySectionHeader";
import { ConnectedPillars, WindingRoadTimeline } from "../components/InfographicSections";
import { leadershipGroups } from "../data/leaders";  // <-- add this
import { resolveAssetSrc } from "@/lib/shared/media";


import {
  FaTrophy, FaHeart, FaLightbulb, FaShieldAlt, FaUniversity,
  FaBuilding, FaBookOpen, FaChalkboardTeacher, FaFlask, FaUsers, FaGraduationCap,
  FaGlobe, FaPaintBrush, FaLaptopMedical
} from "react-icons/fa";
import FAQSection from "../components/FAQSection";
import { LinkGridSection } from "@/components/seo/PageSections";
import { SHOW_PUBLIC_SEO_SECTIONS } from "@/lib/seo/visibility";
import { LOCATION_LINKS, TRUST_LINKS } from "@/lib/seo/info-pages";

/* --------------------------------
   Helpers
--------------------------------- */
const placeHolder = "https://via.placeholder.com/640x480?text=Coming+Soon";
const cn = (...c) => c.filter(Boolean).join(" ");
const onImgError = (e) => { e.currentTarget.src = placeHolder; };

/* --------------------------------
   Reusable Leader Card
--------------------------------- */
function LeaderCard({ person, to }) {
  return (
    <Link
      to={to}
      className="group relative cut-corner-card bg-white ring-1 ring-slate-200 hover:ring-[#0d315c]/40 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d315c] focus-visible:ring-offset-2"
      aria-label={`View profile of ${person?.name || "Leader"}`}
    >
      {/* Corner arrow */}
      <span className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/95 ring-1 ring-slate-300 text-[#0f6a5a] transition-all duration-200 group-hover:bg-[#0f6a5a] group-hover:text-white">
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
          <path d="M13.172 12 8.222 7.05l1.415-1.414L16 12l-6.364 6.364-1.414-1.414z" />
        </svg>
      </span>

      {/* Image */}
      <div className="px-4 pt-5">
        <div className="aspect-[4/5] cut-corner-card overflow-hidden bg-slate-100 ring-1 ring-slate-200">
          <img
            src={person.image || placeHolder}
            alt={person.name || "Profile"}
            onError={onImgError}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-[15.5px] font-semibold text-slate-900 leading-tight tracking-[0.1px]">
          {person.name}
        </h3>
        <p className="mt-1 text-[12.5px] text-slate-600">{person.role}</p>
        <div className="mt-2 flex items-center gap-2 text-[#0f6a5a] text-xs font-semibold">
          <span>View profile</span>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
            <path d="M13.172 12 8.222 7.05l1.415-1.414L16 12l-6.364 6.364-1.414-1.414z" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

/* --------------------------------
   Leadership Tabs
--------------------------------- */
function LeadershipSection({ data, initial }) {
  const sections = useMemo(() => Object.keys(data || {}), [data]);
  const [active, setActive] = useState(
    initial && data?.[initial] ? initial : sections[0]
  );

  // keyboard support for tabs
  const tablistRef = useRef(null);
  useEffect(() => {
    const list = tablistRef.current;
    if (!list) return;
    const onKeyDown = (e) => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
      e.preventDefault();
      const tabs = [...list.querySelectorAll("[role='tab']")];
      let idx = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
      if (e.key === "ArrowRight") idx = (idx + 1) % tabs.length;
      if (e.key === "ArrowLeft") idx = (idx - 1 + tabs.length) % tabs.length;
      if (e.key === "Home") idx = 0;
      if (e.key === "End") idx = tabs.length - 1;
      tabs[idx]?.focus();
      const label = tabs[idx]?.dataset?.label;
      if (label) setActive(label);
    };
    list.addEventListener("keydown", onKeyDown);
    return () => list.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!sections.length) return null;

  return (
    <section className="py-16 bg-white" id="leadership">
      <div className="container max-w-screen-xl mx-auto px-4">
        <header className="text-center mb-10" data-reveal="fade-up">
          <h2 className="text-3xl font-extrabold text-[#0d315c] tracking-tight">Leadership</h2>
          <p className="mt-2 text-slate-600 max-w-3xl mx-auto">
            A clear, organized view of the teams steering St. Mary's University.
          </p>
        </header>

        {/* Tabs */}
        <div className="w-full overflow-x-auto no-scrollbar" data-reveal="fade-up" style={{ "--delay": "0.05s" }}>
          <div
            ref={tablistRef}
            role="tablist"
            aria-label="Leadership Sections"
            className="inline-flex gap-2 bg-slate-50 p-1.5 cut-corner-panel ring-1 ring-slate-200"
          >
            {sections.map((label) => {
              const isActive = label === active;
              const count = data[label]?.length || 0;
              return (
                <button
                  key={label}
                  role="tab"
                  data-label={label}
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(label)}
                  className={cn(
                    "flex items-center gap-2 whitespace-nowrap cut-corner-badge px-4 py-2 text-[13.5px] font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d315c] focus-visible:ring-offset-2",
                    isActive
                      ? "bg-white text-[#0d315c] shadow-sm ring-1 ring-slate-200"
                      : "text-slate-600 hover:text-[#0d315c]"
                  )}
                >
                  <span>{label}</span>
                  <span className={cn(
                    "inline-flex h-5 min-w-[20px] items-center justify-center cut-corner-badge px-1.5 text-[11px]",
                    isActive ? "bg-[#e6effa] text-[#0d315c]" : "bg-slate-200 text-slate-700"
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div role="tabpanel" aria-label={active} className="mt-8">
          {data[active]?.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(data[active] || []).map((m, idx) => (
                <LeaderCard key={`${active}-${idx}-${m?.slug || "x"}`} person={m} to={`/leadership/${m.slug || ""}`} />
              ))}
            </div>
          ) : (
            <div className="mt-8 grid place-items-center cut-corner-panel border border-dashed border-slate-300 bg-slate-50 py-14">
              <p className="text-slate-600">Profiles coming soon.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}

/* --------------------------------
   Page: About (ordered as requested)
--------------------------------- */
export default function About() {
  const [openObjective, setOpenObjective] = useState(0);


  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -5% 0px" }
    );
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (inViewport) {
        el.classList.add("is-visible");
        return;
      }

      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  /* ---- Journey: unchanged ---- */
  const journeyData = [
    { year: "1996", title: "Engineering Foundation – Hyderabad", description: "St. Mary’s College of Engineering & Technology opens at Deshmukhi, launching the St. Mary’s legacy.", icon: <FaBuilding aria-hidden />, side: "left" },
    { year: "1998", title: "Management Studies Begin", description: "St. Mary’s P.G. College (MBA) starts, adding business education.", icon: <FaBookOpen aria-hidden />, side: "right" },
    { year: "1999", title: "Technology P.G. Expansion", description: "MCA programme established, strengthening IT studies.", icon: <FaLaptopMedical aria-hidden />, side: "left" },
    { year: "2006", title: "Teacher-Education Entry", description: "B.Ed. colleges open in Hyderabad and Podili (Prakasam).", icon: <FaChalkboardTeacher aria-hidden />, side: "right" },
    { year: "2007", title: "Twin Growth Spurts", description: "Hyderabad Pharmacy College added; in Guntur, Engineering, P.G. Centre & Pharmacy colleges launch at Chebrolu.", icon: <FaFlask aria-hidden />, side: "left" },
    { year: "2008", title: "Inclusive & Regional Reach", description: "Women’s Engineering College; PGDM colleges in Hyderabad; MBA & MCA colleges at Podili (Prakasam).", icon: <FaUsers aria-hidden />, side: "right" },
    { year: "2009", title: "Integrated & Tech Leap", description: "Integrated Campus Hyderabad and CE&T Patancheru start; Sree Harsha Technologies training centre opens.", icon: <FaGraduationCap aria-hidden />, side: "left" },
    { year: "2011", title: "Pan-India Presence – Kolkata", description: "St. Mary’s Technical Campus Kolkata launches with Engineering, Management & MCA schools.", icon: <FaGlobe aria-hidden />, side: "right" },
    { year: "2020", title: "Creative & Digital Frontier", description: "Visual Arts & Design Degree College opens; tele-rehab and digital-health pilots roll out.", icon: <FaPaintBrush aria-hidden />, side: "left" },
    { year: "2025", title: "St. Mary's University", description: "India’s first private university dedicated to rehabilitation sciences.", icon: <FaUniversity aria-hidden />, side: "right" },
  ];

  /* ---- Leadership data (slugs match /leadership/:slug routes) ---- */
  const leadershipData = {
    "Sponsor Body": [
      { slug: "founder",  name: "Dr. K.V.K. Rao", role: "Founder, Chairman & Chancellor", image: founderImg },
      { slug: "co-founder", name: "Smt. C.V.N.V Bharathi", role: "Co-Founder & Pro-Chancellor", image: bharathiImg },
      { slug: "ceo", name: "Mr. K. Sri Harsha", role: "Secretary & CEO", image: harshaImg },
      { slug: "treasurer", name: "Smt. K. Indraja", role: "Treasurer & CFO", image: indrajaImg },
      { slug: "joint-secretary", name: "Smt. K. Indu Aparna", role: "Joint Secretary & COO", image: induImg },
    ],
    "University Governing Body": [
      { slug: "ugb-1", name: "Coming Soon...", role: "Member", image: placeHolder },
      { slug: "ugb-2", name: "Coming Soon...", role: "Member", image: placeHolder },
      { slug: "ugb-3", name: "Coming Soon...", role: "Member", image: placeHolder },
      { slug: "ugb-4", name: "Coming Soon...", role: "Member", image: placeHolder },
    ],
    "University BOM": [
      { slug: "vice-chancellor", name: "Lt Gen Pradeep Chandran Nair (PVSM, AVSM, YSM)", role: "Vice-Chancellor", image: vc },
      { slug: "cpo", name: "Sekhar Vijayanth Divakaruni", role: "Chief People Officer", image: placeHolder },
    ],
    "Academic Council": [
      { slug: "ac-1", name: "Coming Soon...", role: "Chair", image: placeHolder },
      { slug: "ac-2", name: "Coming Soon...", role: "Member", image: placeHolder },
      { slug: "ac-3", name: "Coming Soon...", role: "Member", image: placeHolder },
    ],
  };

  const coreObjectives = [
    {
      title: "Bridging the National Gap in Rehabilitation Professionals",
      benefit: "Prepares students for specialized careers in rehabilitation and allied health sciences.",
      description:
        "St. Mary's University is committed to addressing the critical national shortage of qualified rehabilitation professionals by offering multidisciplinary, academically rigorous, and clinically immersive programs across core fields such as Rehabilitation Sciences, Health Sciences, Psychology, Speech & Hearing, Engineering, Special Need Education, Nursing, and Pharmaceutical Science.",
    },
    {
      title: "Inclusive Rehabilitation-Education Ecosystem",
      benefit: "Students gain real-world experience through community-integrated training models.",
      description:
        "Embedding Community-Based Rehabilitation (CBR) into student training, enabling them to work in real-world settings while delivering affordable or free care aligned with government welfare schemes.",
    },
    {
      title: "Rural Outreach via Satellite Rehabilitation Hubs",
      benefit: "Extends therapeutic services to semi-urban and rural regions while serving as clinical training grounds.",
      description:
        "Acting as both training grounds and therapy centers, ensuring early intervention in semi-urban and rural regions.",
    },
    {
      title: "Empowerment through Skills and Livelihood",
      benefit: "Enhances employability for PwDs through vocational training and specialized skill development.",
      description:
        "St. Mary's University places strong emphasis on vocational training and upskilling of PwDs to enhance their employability in both public and private sectors, ensuring utilization of the statutory 5% reservation in employment and advancing socio-economic empowerment.",
    },
    {
      title: "Alignment with Constitutional and Legislative Mandates",
      benefit: "Ensures academic and institutional practice follows national disability rights and educational frameworks.",
      description:
        "The University’s objectives align with Article 41 of the Constitution of India, the Rights of Persons with Disabilities (RPwD) Act, 2016, and other national mandates promoting inclusive, equitable, and accessible education and healthcare.",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative w-full overflow-hidden min-h-[46vh] flex items-center justify-center">
        {/* Clean Institutional 'Light Wash' Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f0fdfa] via-[#f8fafc] to-[#eff6ff]" />

        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Abstract Image Hero */}
          <img 
            src={resolveAssetSrc(abstractHeroBg)} 
            alt="Abstract Background" 
            className="absolute inset-0 h-full w-full object-cover opacity-[0.05] scale-105" 
          />
          {/* Gradient Overlay for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-[#f5f9ff]" />
        </div>

        <div className="container relative z-20 max-w-screen-xl mx-auto px-4 pt-8 md:pt-16 pb-6 md:pb-12 flex flex-col items-center justify-center text-center">
          <h1 className="text-[clamp(3.1rem,9.5vw,9.1rem)] font-black font-outfit uppercase leading-[0.85] tracking-tighter text-[#0d315c] flex flex-col items-center" data-reveal="fade-up">
            About 
            <span className="text-[#25b895] text-[0.4em] tracking-normal mt-4 block font-bold capitalize">
              St. Mary's University
            </span>
          </h1>
          <div className="mt-4 h-1.5 w-20 cut-corner-badge bg-[#ffaf3a] mx-auto" data-reveal="fade-up" style={{ "--delay": "0.1s" }} />
          <p
            className="mt-7 max-w-4xl text-[#0f1736] text-[clamp(0.95rem,1.45vw,1.55rem)] leading-[1.35] font-semibold"
            data-reveal="fade-up"
            style={{ "--delay": "0.08s" }}
          >
            St. Mary's University empowers healthcare professionals to transform lives through world-class rehabilitation education, innovative research, and compassionate care.
          </p>
        </div>
      </section>

      {/* 1) WHO WE ARE (moved first) */}
      <section id="overview" className="scroll-mt-24 py-16 bg-white">
        <div className="container max-w-screen-xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <UniversitySectionHeader
              title="Who We Are"
              align="left"
              titleClassName="text-3xl font-extrabold tracking-tight"
              className="mb-0"
            />
            <div
              className="mt-4 space-y-4 text-slate-700 text-[1.04rem] leading-relaxed"
              data-reveal="fade-up"
              style={{ "--delay": "0.08s" }}
            >
              <p><strong>St. Mary’s University</strong> is India’s pioneering private university devoted exclusively to <strong>rehabilitation sciences</strong> and inclusive healthcare. Our network spans Hyderabad, Guntur, Prakasam, Patancheru and Kolkata.</p>
              <p>Programs in Physiotherapy, Occupational Therapy, Clinical Psychology, Speech-Language Therapy and Rehabilitation Nursing blend rigorous <strong>clinical training</strong>, cutting-edge research and a culture of empathy with hands-on experience in modern labs and partner hospitals.</p>
              <p>Guided by distinguished faculty and strong hospital-industry collaborations, St. Mary's University sets new benchmarks in rehabilitation education—restoring mobility, independence and quality of life.</p>
              
              <div className="pt-4">
                <p className="text-[13px] font-bold text-[#019e6e] uppercase tracking-widest border-l-2 border-[#019e6e] pl-4 py-1 italic">
                  Built for students who want careers in rehabilitation, allied health, clinical care, research, and inclusive healthcare services.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center" data-reveal="fade-left">
            <img
              src={resolveAssetSrc(logo)}
              alt="St. Mary's University Logo"
              className="w-full max-w-[420px] object-contain drop-shadow-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 2) About the Society & Establishment + Core Objectives */}
      <section id="establishment" className="scroll-mt-24 py-16 bg-slate-50">
        <div className="container max-w-screen-xl mx-auto px-4">
          <UniversitySectionHeader
            title="About the Society and Establishment of University"
            align="left"
            titleClassName="text-3xl font-extrabold tracking-tight"
            className="mb-0"
          />

          <div className="mt-4 text-slate-700 leading-relaxed space-y-4" data-reveal="fade-up" style={{ "--delay": "0.06s" }}>
            <p>
              The Joseph Sriharsha &amp; Mary Indraja Educational Society (Regd. No. 6624/1996), a Christian Minority Institution with over 25 years of distinguished service in technical and professional education, has established St. Mary’s University in Hyderabad, Telangana. Envisioned as India’s first integrated Centre of Excellence in Disability Studies, Rehabilitation, and Allied &amp; Health Sciences, the university seeks to transform the rehabilitation landscape of the country.
            </p>

            <div className="mt-6">
              <div className="flex items-center gap-3 mt-2">
                <span className="h-5 w-1 rounded-full bg-[#ffaf3a]" />
                <h3 className="text-xl font-bold text-[#0d315c]">Our Core Objectives</h3>
              </div>
              <h4 className="mt-1 text-[13px] font-semibold uppercase tracking-wider text-slate-500">Commitment to Rehabilitation and Disability Empowerment</h4>

              <div className="mt-5 space-y-3">
                {coreObjectives.map((item, idx) => {
                  const isOpen = openObjective === idx;
                  const panelId = `objective-panel-${idx}`;
                  const buttonId = `objective-button-${idx}`;
                  return (
                    <article key={item.title} className="cut-corner-panel bg-white shadow-sm ring-1 ring-slate-200 border-l-4 border-[#019e6e]">
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenObjective(isOpen ? -1 : idx)}
                        className="w-full flex items-center justify-between gap-3 text-left p-5"
                      >
                        <div className="flex-1">
                          <h5 className="text-[1.08rem] font-bold text-[#0d315c] leading-snug">{item.title}</h5>
                          <p className="mt-1 text-[12px] font-bold text-[#019e6e] uppercase tracking-wide">{item.benefit}</p>
                        </div>
                        <span
                          className={cn(
                            "shrink-0 grid h-7 w-7 place-items-center cut-corner-badge bg-[#e9faf3] text-[#019e6e] transition-transform",
                            isOpen ? "rotate-180" : ""
                          )}
                          aria-hidden
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                            <path d="M7 10l5 5 5-5z" />
                          </svg>
                        </span>
                      </button>

                      {isOpen && (
                        <div id={panelId} role="region" aria-labelledby={buttonId} className="px-5 pb-5 text-[15px] text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
                          <p>{item.description}</p>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION / MISSION */}
      <section id="vision-mission" className="scroll-mt-24 py-16 md:py-24 bg-[linear-gradient(105deg,#f5f6ee_0%,#c8efdf_55%,#9fdfca_100%)]">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center" data-reveal="fade-up">
            <h2 className="text-[clamp(3.2rem,12vw,9.6rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-[#25b895]/50 md:whitespace-nowrap">
              Our Vision
            </h2>
            <p className="mt-8 max-w-4xl mx-auto text-[clamp(1rem,1.65vw,1.7rem)] leading-[1.45] font-medium text-[#0f172a]">
              To be a National Leader in evidence-based rehabilitative education, fostering <strong>innovation</strong>, inclusivity, and shaping compassionate healthcare professionals.
            </p>
            <p className="mt-4 text-sm font-bold text-[#019e6e]/70 uppercase tracking-widest italic">
              "Supported by an integrated clinical learning ecosystem, multidisciplinary programs, and rehabilitation-focused academic planning."
            </p>

            <div className="mx-auto mt-10 md:mt-12 h-0.5 w-[min(60vw,360px)] border-t-2 border-dashed border-[#1b2444]/40" />

            <h2
              className="mt-10 md:mt-14 text-[clamp(3.2rem,12vw,9.6rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-[#25b895]/50 md:whitespace-nowrap"
              data-reveal="fade-up"
              style={{ "--delay": "0.06s" }}
            >
              Our Mission
            </h2>
            <p
              className="mt-8 max-w-4xl mx-auto text-[clamp(1rem,1.65vw,1.7rem)] leading-[1.45] font-medium text-[#0f172a]"
              data-reveal="fade-up"
              style={{ "--delay": "0.1s" }}
            >
              To empower students with deep knowledge, practical expertise and strong ethics—advancing <strong>rehabilitation sciences</strong>, research and community engagement.
            </p>
            <p className="mt-4 text-sm font-bold text-[#019e6e]/70 uppercase tracking-widest italic">
              "Delivered through structured academic pathways, hands-on training, ethical practice, and community engagement."
            </p>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section id="core-values" className="scroll-mt-24 py-16 bg-white">
        <div className="container max-w-screen-xl mx-auto px-4 text-center">
          <UniversitySectionHeader
            title="Our Core Values"
            subtitle="Principles that guide our commitment to excellence in rehabilitation education and patient care."
          />
          <ConnectedPillars
            className="mt-10"
            items={[
              { icon: <FaTrophy aria-hidden />, title: "Excellence", desc: "Academic quality, clinical readiness, and continuous improvement." },
              { icon: <FaHeart aria-hidden />, title: "Compassion", desc: "Patient-first thinking and dignity in care." },
              { icon: <FaLightbulb aria-hidden />, title: "Innovation", desc: "Assistive technology, rehabilitation research, and modern learning methods." },
              { icon: <FaShieldAlt aria-hidden />, title: "Integrity", desc: "Transparent governance and ethical institutional practice." },
            ]}
          />
        </div>
      </section>

      {/* JOURNEY */}
      <section id="journey" className="scroll-mt-24 py-16 bg-slate-50">
        <div className="mx-auto w-full max-w-[1600px] px-4 md:px-8">
          <div className="text-center mb-10">
            <UniversitySectionHeader
              title="Our Journey"
              subtitle="From a single engineering college to India’s foremost rehabilitation university. Our journey reflects consistent growth, innovation, and impact."
              subtitleClassName="max-w-3xl"
            />

            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
              <span className="inline-flex items-center cut-corner-badge border border-[#d7e9f7] bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#0d315c]">
                {journeyData.length} Milestones
              </span>
              <span className="inline-flex items-center cut-corner-badge border border-[#d7e9f7] bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#0d315c]">
                {journeyData[0]?.year} - {journeyData[journeyData.length - 1]?.year}
              </span>
              <span className="inline-flex items-center cut-corner-badge border border-[#d7e9f7] bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#0d315c]">
                Multi-Disciplinary Expansion
              </span>
            </div>
          </div>

          <WindingRoadTimeline
            className="mx-auto"
            items={journeyData.map((e) => ({ meta: e.year, title: e.title, desc: e.description, impact: e.impact, icon: e.icon }))}
          />
        </div>
      </section>

      {/* FEATURED STRIP — Leading a legacy of transformative impact */}
      {/*<section className="py-12 bg-white" id="legacy">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d315c]" data-reveal="fade-up">
              Leading a legacy of transformative impact
            </h2>
            <Link
              to="#leadership"
              className="inline-flex items-center gap-2 text-[#0f6a5a] font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d315c] focus-visible:ring-offset-2"
            >
              Explore Leadership
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M13.172 12 8.222 7.05l1.415-1.414L16 12l-6.364 6.364-1.414-1.414z" />
              </svg>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {[
              { name: "Dr. K.V.K. Rao", role: "Founder, Chairman & Chancellor", image: founderImg, slug: "founder" },
              { name: "Smt. C.V.N.V Bharathi", role: "Co-Founder & Pro-Chancellor", image: bharathiImg, slug: "co-founder" },
              { name: "Mr. K. Sri Harsha", role: "Secretary & CEO", image: harshaImg, slug: "ceo" },
              { name: "Smt. K. Indraja", role: "Treasurer & CFO", image: indrajaImg, slug: "treasurer" },
              { name: "Smt. K. Indu Aparna", role: "Joint Secretary & COO", image: induImg, slug: "joint-secretary" },
            ].map((p) => (
              <LeaderCard
                key={p.slug}
                person={{ name: p.name, role: p.role, image: p.image, slug: p.slug }}
                to={`/leadership/${p.slug}`}
              />
            ))}
          </div>
        </div>
      </section>*/}
      {/* LEADERSHIP TABS */}
      {/* LEADERSHIP TABS */}
      <div className="bg-white py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <p className="text-[13px] font-bold text-[#0d315c] uppercase tracking-widest mb-6 opacity-60">
            "Governance at St. Mary’s Rehabilitation University is structured to support transparent academic leadership, institutional accountability, and statutory compliance."
          </p>
          <LeadershipBoards groups={leadershipGroups} />
        </div>
      </div>

      {/* ====================== FAQ & FOOTER INFO ====================== */}
      <section id="faqs" className="scroll-mt-24 pt-16 pb-20 md:py-24 bg-[#f8fbff]">
        <div className="max-w-6xl mx-auto px-4 space-y-16">
          <FAQSection 
            customFaqs={[
              {
                question: "Is St. Mary’s Rehabilitation University recognized?",
                answer: "Applicants are advised to refer to the Approvals & Recognitions and Mandatory Disclosure pages for officially published verification documents."
              },
              {
                question: "Are programs clinically integrated?",
                answer: "Programs are designed with practical learning, laboratory exposure, clinical orientation, and rehabilitation-focused training components."
              },
              {
                question: "What makes SMRU different?",
                answer: "SMRU focuses on rehabilitation sciences, allied health education, clinical readiness, and inclusive healthcare impact."
              },
              {
                question: "Where is the campus located?",
                answer: "Near Ramoji Film City, Deshmukhi Village, Yadadri Bhuvanagiri District, Hyderabad, Telangana."
              },
              {
                question: "How can students apply?",
                answer: "Students can use the official admissions route or contact the admissions support team for guidance."
              },
              {
                question: "Is hostel support available?",
                answer: "On-campus residential support is available subject to university norms and availability."
              }
            ]}
          />
          
          <div className="pt-12 border-t border-slate-100">
             <div className="mb-8">
                <h2 className="text-2xl font-black text-[#0d315c] uppercase tracking-tight">Statutory & Public Disclosures</h2>
                <p className="mt-2 text-sm text-slate-500 font-medium">Official public information pages for applicants, parents, regulators, and institutional stakeholders.</p>
             </div>
             
             <div className="bg-white cut-corner-panel p-8 border border-slate-100 shadow-sm">
                <div className="mb-6">
                  <p className="text-[13px] font-bold text-[#019e6e] uppercase tracking-widest italic">
                    Parents and applicants can verify institutional information through public disclosure pages before applying.
                  </p>
                </div>
                <LinkGridSection 
                  title="" 
                  items={[
                    { href: "/approvals-recognitions", label: "Approvals & Recognitions", description: "Official trust and compliance disclosure location." },
                    { href: "/mandatory-disclosure", label: "Mandatory Disclosure", description: "Public record of institutional assets and statutory metrics." },
                    { href: "/admission-policy", label: "Admission Policy", description: "Official guidelines for student intake and eligibility norms." },
                    { href: "/visit-campus", label: "Visit Campus", description: "Campus visit planning and public location guidance." },
                    LOCATION_LINKS[0],
                    { href: "/contact", label: "Contact Us", description: "Direct support for admissions and institutional queries." },
                  ].filter(Boolean)} 
                />
             </div>
             
             <div className="mt-12 text-center">
                <p className="text-sm font-semibold text-[#0d315c]">
                  Ready to explore programs? <Link to="/admissions" className="text-[#019e6e] hover:underline">Visit Admissions</Link> or speak with the admissions support team.
                </p>
                <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last updated: April 2026</p>
             </div>
          </div>
        </div>
      </section>


      {/* Reveal animations */}
      <style>{`
        :root { --ease-out: cubic-bezier(.22,.95,.36,1); }
        [data-reveal]{ opacity:0; transform: translateY(14px); transition: opacity .7s var(--ease-out), transform .7s var(--ease-out); transition-delay: var(--delay, 0s); will-change: opacity, transform; }
        [data-reveal].is-visible{ opacity:1; transform:none; }
        [data-reveal=fade-up]{ transform: translateY(18px); }
        [data-reveal=fade-left]{ transform: translateX(22px); }
        [data-reveal=fade-right]{ transform: translateX(-22px); }
        [data-reveal=zoom-in]{ transform: translateY(12px); }
      `}</style>
    </>
  );
}
