// @ts-nocheck
"use client";
// C:\Projects\my_fullstack_app\frontend1\my-app\src\pages\Home.jsx
import React, { useState, useCallback, useMemo, memo, useEffect } from "react";
import Image from "next/image";
import { useNavigate, Link } from "@/lib/router";
const campusVideo = "/assets/campus_video_fallback.mp4";
const campusPoster = "/assets/hero-campus.jpg";
const canteenImg = "/assets/canteen-CZmCaPgx.jpg";
const hostelImg1 = "/assets/Hostel1-CfcW80Kf.jpeg";
const hostelImg2 = "/assets/Hostel2-C_Z6DObd.jpeg";
import { resolveAssetSrc } from "@/lib/shared/media";
import { useOpenApply } from "../context/ApplyModalContext";
import UniversitySectionHeader from "../components/UniversitySectionHeader";
import { BentoTrustGrid, HalfRingStepRail, PillBand, TechniqueModernGrid, RingStepFlow, StairHighlightStrips } from "../components/InfographicSections";
import {
  FaArrowRight,
  FaAward,
  FaHeartbeat,
  FaHandsHelping,
  FaChartLine,
  FaQuoteLeft,
  FaShieldAlt,
  FaBrain,
  FaEye,
  FaStethoscope,
  FaChalkboardTeacher,
  FaUsers,
  FaBullseye,
  FaBicycle,
  FaUniversity,
  FaScroll,
} from "react-icons/fa";
import { useDeveloperCms } from "@/lib/developer/useDeveloperCms";
import { GiRunningShoe } from "react-icons/gi";
import { HOME_FAQ_CATEGORIES } from "@/lib/seo/home-faqs";
import { LinkGridSection } from "@/components/seo/PageSections";
import { GLOBAL_TRUST_CTA_LINKS, LOCATION_LINKS } from "@/lib/seo/info-pages";
import { SHOW_PUBLIC_SEO_SECTIONS } from "@/lib/seo/visibility";

import FAQSection from "../components/FAQSection";

/* =============================== Page =============================== */
export default function Home() {
  const navigate = useNavigate();
  const openApply = useOpenApply();
  const [showVideo, setShowVideo] = useState(false);
  const { state } = useDeveloperCms();

  const getCmsContent = (id: string, separator = " | ") => {
    const page = state.pages.find((p) => p.id === id);
    return page?.content ? page.content.split(separator).map((s) => s.trim()) : [];
  };

  const scholarshipNames = useMemo(() => {
    const fromCms = getCmsContent("page-scholarships", ";");
    return fromCms.length > 0 ? fromCms : [
      "Freshman Merit Scholarship",
      "Dr. Bharathi Rao Founder Scholarship",
      "Minority Scholarship",
      "Girl Student Scholarship",
      "Defence Ward Scholarship",
      "Single Parent Scholarship",
      "Chancellor's Excellence Award",
      "SC/ST Empowerment Scholarship",
      "Early Bird Scholarship",
    ];
  }, [state.pages]);

  const whyChooseItems = useMemo(() => {
    const phrases = getCmsContent("page-hero-phrases");
    const icons = [<FaHeartbeat />, <FaHandsHelping />, <FaAward />, <FaChartLine />];
    const defaultData = [
      { title: "Rehab-Focused Curriculum", desc: "Specialized programs tailored to the needs of rehabilitation and allied health sciences." },
      { title: "Clinical Training & Outreach", desc: "Real-world training integrated with community outreach and clinical exposure." },
      { title: "30+ Years of Experience", desc: "A proven track record of excellence since 1996." },
      { title: "Consistent Placement Support", desc: "Dedicated placement cell integrated with leading healthcare organizations." },
    ];

    if (phrases.length === 0) return defaultData.map((d, i) => ({ ...d, icon: icons[i] }));
    
    return phrases.map((p, i) => {
      const existing = defaultData.find(d => d.title.toLowerCase() === p.toLowerCase());
      return {
        icon: icons[i % icons.length],
        title: p,
        desc: existing?.desc || "Experience excellence and innovation at St. Mary's University."
      };
    });
  }, [state.pages]);

  const campusItemsFromCms = useMemo(() => {
    const features = getCmsContent("page-campus-hostel", ",");
    const iconMap = {
      hostel: <FaShieldAlt />,
      sports: <GiRunningShoe />,
      labs: <FaBrain />,
      wellness: <FaStethoscope />,
      green: <FaBullseye />,
      bike: <FaBicycle />,
    };
    
    const defaultCampus = [
      { key: 'hostel', title: "Modern Hostels", desc: "Comfortable and secure accommodation with 24/7 surveillance." },
      { key: 'sports', title: "Sports Complex", desc: "Advanced sports facilities that promote holistic fitness." },
      { key: 'labs', title: "Advanced Labs", desc: "State-of-the-art laboratories equipped for research and clinical training." },
      { key: 'wellness', title: "Wellness Center", desc: "Comprehensive health and wellness support." },
      { key: 'green', title: "Green Spaces", desc: "Eco-friendly campus featuring meditation gardens." },
      { key: 'bike', title: "On-Campus Bike Rental", desc: "Low-cost bike rental for quick, comfortable movement between campus locations." },
    ];

    if (features.length === 0) return defaultCampus.map(c => ({ ...c, icon: iconMap[c.key] }));

    return features.map((f, i) => {
      const match = defaultCampus.find(c => f.toLowerCase().includes(c.key) || f.toLowerCase().includes(c.title.toLowerCase().split(' ')[1]));
      return {
        icon: match ? iconMap[match.key] : <FaUniversity />,
        title: f,
        desc: match?.desc || "State-of-the-art facilities designed for student excellence."
      };
    });
  }, [state.pages]);

  const importantLinks = useMemo(
    () => [
      { href: "/approvals-recognitions", label: "Approvals & Recognitions", description: "Official trust and compliance disclosure location for verified public updates." },
      { href: "/mandatory-disclosure", label: "Mandatory Disclosure", description: "Public disclosure index for statutory and institutional information." },
      { href: "/admissions", label: "Admissions 2026", description: "Official admissions routes for UG, PG, diploma, and doctoral pathways." },
      { href: "/fee-structure", label: "Fee Structure", description: "Information regarding program fees and financial policies." },
      { href: "/campus-location-hyderabad", label: "Campus Location", description: "Hyderabad campus location details and map references." },
      { href: "/contact", label: "Contact Helpdesk", description: "Campus, admissions, and public support contact details." },
      { href: "/visit-campus", label: "Visit Campus", description: "Campus visit planning and public location guidance." },
      { href: "/careers", label: "Careers", description: "Explore faculty and institutional job opportunities at SMRU." },
    ].filter(Boolean),
    []
  );

  const canteenHighlights = useMemo(() => {
    const fromCms = getCmsContent("page-canteen-highlights", ";");
    return fromCms.length > 0 ? fromCms : [
      "Hygienic and fresh meal preparation",
      "Spacious and comfortable seating",
      "Balanced and nutritious menu options",
      "Convenient location near academic blocks",
    ];
  }, [state.pages]);

  // On-scroll reveal (lightweight AOS) — keep globally, but we won't use it in FAQ section.
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
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let timer;
    if (!showVideo) {
      // 4.5 seconds of image, then switch to video for a more stable first look
      timer = setTimeout(() => setShowVideo(true), 4500);
    }
    return () => clearTimeout(timer);
  }, [showVideo]);

  const testimonialData = [
    {
      quote:
        "At St. Mary's University, I help learners find their voice—combining therapy and technology to improve speech and hearing outcomes.",
      name: "Raveeti Shiva Deekshith",
      role: "Senior Clinician",
      course: "Dept. of Audiology & Speech-Language Pathology",
    },
    {
      quote:
        "We integrate clinical psychology training with compassionate care so students learn to support mental health with evidence-based practice.",
      name: "Dhanavath Anil Kumar",
      role: "Senior Clinician",
      course: "Dept. of Clinical Psychology",
    },
    {
      quote:
        "Guiding students to understand behavior and build resilience is the most rewarding part of my work at St. Mary's University.",
      name: "Rida Subhan",
      role: "Senior Clinician",
      course: "Dept. of Psychology",
    },
    {
      quote:
        "Occupational therapy here is purpose-driven—every session focuses on independence in real-life activities.",
      name: "Rosalin Singh",
      role: "Senior Clinician",
      course: "Dept. of Occupational Therapy",
    },
    {
      quote:
        "St. Mary's University's collaborative clinics let us tailor interventions that restore dignity and daily function.",
      name: "Gunichetty Joshna Priya",
      role: "Senior Clinician",
      course: "Dept. of Occupational Therapy",
    },
    {
      quote:
        "Rehabilitation is about confidence as much as mobility; our physiotherapy labs turn progress into possibility.",
      name: "Kumpati Venkateswara Rao",
      role: "Senior Clinician",
      course: "Dept. of Physiotherapy",
    },
    {
      quote:
        "At the Special School, we create structured, loving environments where neurodivergent children learn, play, and thrive.",
      name: "Netinti Hemalatha",
      role: "Principal",
      course: "Special School for Neurodevelopmental Disorders",
    },
  ];


  const [index, setIndex] = useState(0);
  const total = testimonialData.length;
  const next = useCallback(() => setIndex((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setIndex((p) => (p - 1 + total) % total), [total]);

  const collegeNameLines = ["St. Mary's", "Rehabilitation", "University"];

  return (
    <>
      {/* ========================= HERO ========================= */}
      <section id="hero" className="relative w-full h-[85svh] md:h-[90svh] min-h-[500px] overflow-hidden">
        {/* Cinematic Asset Cross-Dissolve Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Base Layer: Video (mounts/plays when showVideo is true) */}
          {showVideo && (
            <video
              poster={campusPoster}
              preload="metadata"
              autoPlay
              muted
              playsInline
              onEnded={() => setShowVideo(false)}
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[2500ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${showVideo ? 'opacity-100' : 'opacity-0'}`}
            >
              <source src="/assets/campus_video.webm" type="video/webm" />
              <source src={campusVideo} type="video/mp4" />
            </video>
          )}

          {/* Top Layer: Static Image (fades out to reveal video) */}
          <div className={`absolute inset-0 h-full w-full transition-all duration-[2500ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
              showVideo 
                ? 'opacity-0 scale-[1.02] blur-sm' 
                : 'opacity-100 scale-110 blur-0'
            }`}>
            <Image
              src="/assets/hero-campus.jpg"
              alt="St. Mary's Rehabilitation University Deshmukhi Campus Aerial View"
              fill
              priority
              className="object-cover object-center hero-campus-image"
            />
          </div>
        </div>


        {/* Institutional Mission Backdrop — Dark Blue Fade */}
        <div className="absolute top-0 left-0 w-full h-[42svh] md:h-[45svh] z-10 bg-gradient-to-b from-[#0d315c]/95 via-[#0d315c]/72 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[36svh] z-10 bg-gradient-to-t from-[#0a2446]/85 via-[#0a2446]/35 to-transparent pointer-events-none md:hidden" />

        {/* Floating Institutional Mission Ribbon — Pure 1305 Style Elevation */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-start pt-[3svh] md:pt-[5svh]">
          <div className="w-full max-w-6xl px-6 pointer-events-auto text-center space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            
            {/* Tier-1 Institutional Header Cluster — Brand Identity Primary Highlight */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 cut-corner-badge bg-[#ffaf3a]/10 backdrop-blur-md border border-[#ffaf3a]/30 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffaf3a] animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#ffaf3a]">Admissions 2026-27 Open</span>
              </div>
              
              <div className="space-y-0">
                <h1 className="text-white opacity-100 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-none drop-shadow-2xl [text-shadow:_0_8px_40px_rgba(0,0,0,0.8)] font-['Cinzel']">
                  <span className="text-[#ffaf3a]">St. Mary&apos;s</span> Rehabilitation University.
                </h1>
              </div>

              <p className="text-white/90 text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] max-w-4xl mx-auto drop-shadow-lg">
                Hyderabad • Legacy of 30 Years • UGC Status
              </p>
            </div> 
          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-1000 ${showVideo ? 'opacity-0' : 'opacity-100'}`}>
           <div className="w-[1px] h-12 bg-white/40 mx-auto" />
        </div>
      </section>

      {/* ===================== PHD ADMISSION RIBBON ====================== */}
      <section id="phd-ribbon" className="relative z-30 -mt-8 md:-mt-12 max-w-7xl mx-auto px-4">
        <div className="bg-[#0d315c] cut-corner-panel shadow-2xl overflow-hidden border border-white/10 flex flex-col lg:flex-row items-center justify-between p-6 md:p-10 gap-8 animate-fade-in-up">
          
          {/* Left Side: Title & Badge */}
          <div className="flex items-center gap-6 flex-1 text-center md:text-left">
            <div className="hidden md:flex w-20 h-20 bg-white/10 cut-corner-panel items-center justify-center text-[#ffaf3a] shadow-inner">
               <FaAward size={42} />
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                <span className="bg-[#ffaf3a] text-[#0d315c] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                  Now Happening
                </span>
                <span className="text-[#019e6e] text-[11px] font-black uppercase tracking-[0.2em] drop-shadow-md">
                  PhD Admission 2026-27
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-none">
                Registration Open for <br className="hidden md:block" /> Doctoral Programs
              </h2>
            </div>
          </div>

          {/* Right Side: Dates & Action Card */}
          <div className="w-full lg:w-auto bg-white/5 border border-white/10 cut-corner-panel p-5 md:p-8 backdrop-blur-sm flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] grayscale pointer-events-none">
              <FaUniversity size={100} />
            </div>
            
            <div className="flex gap-8 md:gap-12">
              <div className="text-center md:text-left">
                <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em] mb-2">Current Status</p>
                <p className="text-xl md:text-2xl font-black text-white tracking-tighter">Phase 1 Complete</p>
              </div>
              <div className="w-[1px] h-10 bg-white/10 hidden md:block" />
              <div className="text-center md:text-left">
                <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em] mb-2">Phase 2 Intake</p>
                <p className="text-xl md:text-2xl font-black text-[#ffaf3a] tracking-tighter">Announcing Soon</p>
              </div>
            </div>

            <Link 
              to="/phd-admissions"
              className="w-full md:w-auto bg-[#019e6e] hover:bg-[#0fa571] text-white px-8 py-4 rounded-xl font-black text-[12px] uppercase tracking-[0.25em] shadow-xl hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              Explore PhD <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== TRUST SNAPSHOT ====================== */}
      <section id="trust-snapshot" className="scroll-mt-24 py-12 md:py-14 bg-[#f5f9ff]">
        <div className="max-w-7xl mx-auto px-4">
          <UniversitySectionHeader
            title="Trust & Institutional Highlights"
            subtitle="Quick facts that parents and students scan first."
            subtitleClassName="max-w-2xl"
          />
          <BentoTrustGrid
            className="mt-7"
            items={[
              {
                title: "Established Under Telangana State Private Universities Act, 2018",
                desc: "Legally constituted private university with dedicated rehabilitation focus.",
              },
              {
                title: "30+ Years Academic Legacy",
                desc: "Institutional journey rooted in St. Mary's educational ecosystem since 1996.",
              },
              {
                title: "7 Schools and 150+ Academic Pathways",
                desc: "Broad coverage across rehabilitation and allied-health domains.",
              },
              {
                title: "Scholarship Support Up to 50%",
                desc: "Merit and eligibility-based support designed for wider student access.",
              },
              {
                title: "Clinical Training and Placement-Focused Mentoring",
                desc: "Practice-oriented pedagogy with career readiness built into student journeys.",
              },
            ]}
          />
        </div>
      </section>

      {/* ===================== WHY CHOOSE ====================== */}
      <section id="why-join" className="scroll-mt-24 py-16 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <UniversitySectionHeader
            title="Why Join St. Mary's University?"
            subtitle="Discover what makes us the preferred choice."
            subtitleClassName="max-w-2xl"
          />

          <HalfRingStepRail
            className="mt-8"
            centerTitle="SMRU"
            centerSubtitle="Clinical, credible, student-ready"
            centerImageSrc="/assets/ChatGPT%20Image%20Apr%2021,%202026,%2002_53_39%20PM.png"
            centerImageAlt="SMRU Framework visual"
            items={whyChooseItems}
          />
        </div>
      </section>

      {/* ================== TEACHING TECHNIQUES ================= */}
      <section id="techniques" className="scroll-mt-24 py-16 md:py-16 bg-[#f5f9ff]">
        <div className="max-w-7xl mx-auto px-4">
          <UniversitySectionHeader
            title="Teaching Techniques at St. Mary's University"
            subtitle="We follow advanced, practice-based teaching methods to ensure students gain hands-on experience and a deep understanding of their field."
            subtitleClassName="max-w-3xl"
          />

          <TechniqueModernGrid
            className="mt-8"
            items={[
              {
                title: "Activity-Based Therapy",
                meta: "Hands-On",
                icon: <FaHandsHelping />,
                desc: "Practical, functional tasks that improve learning retention and skill development.",
              },
              {
                title: "Simulation-Based Practice",
                meta: "Clinical Simulations",
                icon: <FaBrain />,
                desc: "Realistic clinical simulations that prepare students for patient-facing scenarios.",
              },
              {
                title: "Multisensory Learning",
                meta: "Integrated Methods",
                icon: <FaEye />,
                desc: "Integrated methods that engage visual, auditory, and kinesthetic pathways.",
              },
              {
                title: "Peer-Led Case Discussions",
                meta: "Collaborative Review",
                icon: <FaUsers />,
                desc: "Collaborative case reviews to build critical thinking and team-based decision skills.",
              },
            ]}
          />
        </div>
      </section>

      {/* =================== WORLD-CLASS CAMPUS ================== */}
      <section id="campus" className="scroll-mt-24 py-16 md:py-16 bg-[#f8fbff]">
        <div className="max-w-7xl mx-auto px-4">
          <UniversitySectionHeader
            title="World-Class Campus"
            subtitle="Experience learning in a state-of-the-art environment designed to foster academic and personal growth."
            subtitleClassName="max-w-2xl"
          />

          <PillBand
            className="mt-6"
            items={[
              { value: "120", label: "Acres Campus" },
              { value: `${campusItemsFromCms.length}+`, label: "Facility Pillars" },
              { value: "24/7", label: "Student Support" },
              { value: "On-Campus", label: "Learning + Living" },
            ]}
          />

          <article className="mt-8 relative cut-corner-panel border border-[#d8e8fb] bg-white shadow-[0_18px_40px_rgba(13,49,92,0.1)]">
            <div className="mx-3 mt-3 md:mx-4 md:mt-4 relative overflow-hidden cut-corner-card ring-1 ring-[#d8e8fb] shadow-[0_22px_44px_-14px_rgba(13,49,92,0.35)] aspect-[16/6] md:aspect-[16/5]">
              <Image
                src="/assets/hero-campus.jpg"
                alt="Integrated Learning Ecosystem at SMRU Hyderabad"
                fill
                className="object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(13,49,92,0.24)_0%,transparent_100%)]" />
            </div>
            <div className="relative p-5 md:p-7">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#019e6e]">Campus Advantage</p>
              <h3 className="mt-2 text-2xl md:text-3xl font-black text-[#0d315c] leading-tight">Integrated Learning Ecosystem</h3>
              <p className="mt-2 text-sm md:text-base text-slate-600 leading-relaxed max-w-3xl font-medium">
                Academic blocks, hostels, laboratories, wellness support, and mobility systems are designed as one connected student environment.
              </p>
            </div>
          </article>

          <StairHighlightStrips
            className="mt-8"
            items={campusItemsFromCms.map((item) => ({
              title: (
                <span className="inline-flex items-center gap-2">
                  <span className="text-lg">{item.icon || <FaUniversity />}</span>
                  <span>{item.title}</span>
                </span>
              ),
              desc: item.desc,
            }))}
          />
        </div>
      </section>

      {/* ================= OUR INDUSTRIAL PARTNERS ================= */}
      <section id="industrial-partners" className="scroll-mt-24 py-14 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div 
            className="relative overflow-hidden cut-corner-panel bg-white border border-gray-200 p-7 sm:p-9 md:p-16 shadow-2xl"
            data-reveal="fade-up"
          >
            <div className="absolute top-0 right-0 p-10 opacity-5 grayscale pointer-events-none">
              <FaHandsHelping className="text-[140px] text-[#019e6e]" />
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black font-outfit text-[#0d315c] tracking-tight uppercase leading-none">
                Our Industrial <span className="text-[#019e6e]">Partners.</span>
              </h2>
              <div className="mx-auto mt-6 h-1.5 w-24 cut-corner-underline bg-[#ffaf3a]" />
              
              <p className="mt-8 text-lg text-slate-600 font-medium leading-relaxed">
                We collaborate with global industry leaders to provide our students with 
                best-in-class clinical exposure, real-world training, and unparalleled 
                placement opportunities.
              </p>

              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link 
                  to="/partner" 
                  className="px-10 py-5 bg-[#019e6e] text-white rounded-xl font-black text-[13px] uppercase tracking-[0.3em] shadow-xl hover:bg-[#0fa571] hover:-translate-y-1 transition-all active:scale-95"
                >
                  Explore Collaborations
                </Link>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  Driving Innovation Together
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ======================== HOSTEL SECTION (Premium Upgrade) ======================== */}
      <section id="hostels" className="relative scroll-mt-24 py-16 md:py-16 bg-[#0a4d3c] text-white overflow-hidden">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12 md:mb-20" data-reveal="fade-up">
            <h2 className="text-[2rem] sm:text-[2.4rem] md:text-6xl font-black font-outfit text-white tracking-tighter uppercase leading-[0.9]">
              Hostel Facilities <br className="md:hidden" /> <span className="text-[#ffaf3a]">at St. Mary's University.</span>
            </h2>
            <div className="mx-auto mt-6 h-1.5 w-24 cut-corner-underline bg-[#ffaf3a]" />
            <p className="mt-8 text-white/50 text-[11px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em]">Secure Residential Infrastructure</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Primary Content: Intro + Gallery */}
            <article 
              className="lg:col-span-8 bg-white/5 border border-white/10 cut-corner-panel backdrop-blur-xl p-6 md:p-12 shadow-2xl relative overflow-hidden group"
              data-reveal="fade-up"
              style={{ "--delay": "0.08s" }}
            >
              <div className="relative z-10">
                <header className="mb-10">
                   <h3 className="text-2xl font-black text-white uppercase tracking-tight">World-Class Residential Hub</h3>
                   <div className="h-1 w-16 cut-corner-underline bg-[#019e6e] mt-4" />
                </header>
                
                <p className="text-lg text-white/80 font-medium leading-relaxed mb-10 max-w-2xl">
                  At St. Mary's University, we provide premium, fully-supervised residential facilities 
                  engineered to support academic excellence and modern student lifestyles.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="group/img overflow-hidden cut-corner-card border border-white/10 shadow-lg aspect-[16/10] bg-black/20 relative">
                    <Image
                      src={resolveAssetSrc(hostelImg1)}
                      alt="Modern student hostel room at SMRU Hyderabad"
                      fill
                      className="object-cover group-hover/img:scale-105 transition-all duration-700"
                    />
                  </div>
                  <div className="group/img overflow-hidden cut-corner-card border border-white/10 shadow-lg aspect-[16/10] bg-black/20 relative">
                    <Image
                      src={resolveAssetSrc(hostelImg2)}
                      alt="Premium residential facilities at SMRU Deshmukhi Campus"
                      fill
                      className="object-cover group-hover/img:scale-105 transition-all duration-700"
                    />
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar Content: Fees & Location */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Fee Card */}
              <div 
                className="bg-[#0d315c] cut-corner-panel p-10 border border-white/10 shadow-2xl relative overflow-hidden group"
                data-reveal="fade-up"
                style={{ "--delay": "0.16s" }}
              >
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] grayscale pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                  <FaUniversity className="text-[120px]" />
                </div>
                <div className="relative z-10">
                   <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#ffaf3a] mb-10">Fee Structure</h3>
                   
                   <div className="space-y-6">
                      <div className="flex justify-between items-center pb-4 border-b border-white/5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Girls</span>
                        <span className="text-[11px] font-black uppercase tracking-tight">5 Sharing AC</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-white/5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Boys</span>
                        <span className="text-[11px] font-black uppercase tracking-tight">3 Sharing AC</span>
                      </div>
                      <div className="pt-4">
                        <p className="text-4xl font-black text-[#019e6e] tracking-tighter">₹1,25,000</p>
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mt-1 italic">Per Annum (University Norms apply)</p>
                      </div>
                   </div>
                </div>
              </div>

              {/* Location/Action Card */}
              <div 
                className="bg-gradient-to-br from-[#019e6e] to-[#017a55] cut-corner-panel p-10 shadow-xl group hover:-translate-y-1 transition-all"
                data-reveal="fade-up"
                style={{ "--delay": "0.2s" }}
              >
                <h4 className="text-xl font-black uppercase tracking-tight text-white mb-2">Campus Location</h4>
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest leading-none">On-campus Only (Hyderabad)</p>
                <div className="mt-8">
                  <button
                    onClick={openApply}
                    aria-label="Apply for 2026 Admissions"
                    className="px-8 md:px-12 py-3.5 md:py-4 bg-[#ffaf3a] hover:bg-[#ffaf3a] text-[#0d315c] font-black rounded-full shadow-[0_12px_40px_rgba(255,175,58,0.35)] transition-all hover:scale-105 active:scale-95 text-xs md:text-sm uppercase tracking-widest"
                  >
                    Apply Now
                  </button>
                  <Link
                    to="/schools"
                    aria-label="Explore Academic Schools and Programs"
                    className="mt-4 block text-center px-8 md:px-12 py-3.5 md:py-4 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border border-white/40 font-black rounded-full transition-all hover:scale-105 active:scale-95 text-xs md:text-sm uppercase tracking-widest"
                  >
                    Explore Schools
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* Bottom Row: Features & Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
             <div className="p-10 bg-white/5 border border-white/10 cut-corner-panel backdrop-blur-md" data-reveal="fade-up" style={{ "--delay": "0.24s" }}>
                <h4 className="text-[13px] font-black uppercase tracking-widest text-[#ffaf3a] mb-6 flex items-center gap-3">
                   <FaShieldAlt className="text-[#019e6e]"/> Highlights
                </h4>
                <ul className="space-y-4">
                  {[
                    "Secure on-campus living",
                    "Study-friendly environment",
                    "Professional management",
                    "Holistic student life"
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/40">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ffaf3a]" /> {f}
                    </li>
                  ))}
                </ul>
             </div>

             <div className="lg:col-span-2 p-10 bg-white/5 border border-white/10 cut-corner-panel backdrop-blur-md flex flex-col md:flex-row gap-10 md:items-center" data-reveal="fade-up" style={{ "--delay": "0.28s" }}>
               <div className="flex-1">
                  <h4 className="text-[13px] font-black uppercase tracking-widest text-[#ffaf3a] mb-6 flex items-center gap-3">
                    <FaScroll className="text-[#019e6e]"/> Important Policy
                  </h4>
                  <ul className="space-y-3 text-[11px] text-white/40 leading-relaxed font-bold uppercase tracking-widest italic">
                    <li>· Limited availability - First come basis</li>
                    <li>· Early reservation highly encouraged</li>
                    <li>· Payments through official university portal only</li>
                  </ul>
               </div>
               <div className="w-24 h-[2px] bg-white/10 hidden md:block" />
               <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#ffaf3a] mb-3">
                    <FaShieldAlt size={24} />
                  </div>
                  <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/30 text-center">Fully Supervised <br/> 24/7 Security</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* ======================== CANTEEN ======================== */}
      <section id="canteen" className="scroll-mt-24 py-16 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-black font-outfit text-[#0d315c]" data-reveal="fade-up">
              Campus Canteen at St. Mary's University
            </h2>
            <div className="mx-auto mt-2 h-1.5 w-20 cut-corner-underline bg-[#ffaf3a]" data-reveal="fade-up" style={{ "--delay": "0.05s" }} />
            <p className="mt-4 text-slate-600 max-w-3xl mx-auto" data-reveal="fade-up" style={{ "--delay": "0.08s" }}>
              The St. Mary's University canteen is designed as a welcoming dining space where students can refresh, recharge,
              and stay focused through a busy academic day. With a clean setup and student-friendly atmosphere,
              it supports both comfort and convenience on campus.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div data-reveal="fade-up" style={{ "--delay": "0.12s" }}>
              <div className="overflow-hidden cut-corner-card border border-[#e6f2ff] shadow-sm aspect-[16/10] relative">
                <Image
                  src={resolveAssetSrc(canteenImg)}
                  alt="Hygienic campus canteen and dining facility at St. Mary's Rehabilitation University"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <article className="cut-corner-panel border border-[#e6f2ff] bg-[#f5f9ff] p-6 md:p-8" data-reveal="fade-up" style={{ "--delay": "0.16s" }}>
              <h3 className="text-xl font-black text-[#0d315c] uppercase tracking-tight">A Study-Day Dining Experience</h3>
              <p className="mt-3 text-slate-700 leading-relaxed font-medium">
                From quick breaks between classes to relaxed meal times with peers, the canteen adds
                value to everyday campus life. It is planned to offer a dependable and pleasant dining
                experience for students and visitors alike.
              </p>
              <PillBand className="mt-5 justify-start" items={canteenHighlights.map((item) => ({ label: item }))} />
            </article>
          </div>
        </div>
      </section> {/* This was the missing closing tag */}

       {/* ======================== SCHOLARSHIPS (Solid Institutional Green) ======================== */}
      <section id="scholarships" className="scroll-mt-24 py-14 md:py-12 bg-[#019e6e] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16" data-reveal="fade-up">
            <h2 className="text-3xl md:text-6xl font-black font-outfit text-white leading-tight">
              Scholarships at St. Mary's University
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-32 cut-corner-underline bg-[#ffaf3a]" />
          </div>

          <div className="bg-white/10 backdrop-blur-lg cut-corner-panel p-8 md:p-12 border border-white/20 shadow-2xl text-white" data-reveal="fade-up">
            <p className="max-w-3xl text-lg text-white/90 font-medium leading-relaxed mb-10">
              We believe financial constraints should never stand in the way of talent. Our dedicated 
              scholarship programs recognize academic excellence, talent, and social commitment.
            </p>
            
            <h3 className="text-xl font-bold text-white mb-6">Featured Programs</h3>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {scholarshipNames.map((item, i) => (
                <li key={i} className="bg-white/10 border border-white/20 backdrop-blur-sm shadow-sm cut-corner-card px-4 py-3 text-[13px] font-bold text-white hover:bg-white/20 transition-all flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ffaf3a]" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={openApply}
                aria-label="Check Eligibility for Scholarships"
                className="bg-white text-[#019e6e] px-8 py-3.5 rounded-full font-black shadow-xl transition-all hover:scale-105 active:scale-95 text-sm uppercase tracking-widest"
              >
                Check Eligibility
              </button>
              <p className="text-white/70 text-sm font-medium">Terms & Conditions Apply according to University Norms.</p>
            </div>
          </div>
        </div>
      </section>


      {/* ====================== FAQ & FOOTER INFO ====================== */}
      <section id="faqs" className="scroll-mt-24 pt-16 pb-12 md:py-16 bg-[#f8fbff]">
        <div className="max-w-6xl mx-auto px-4 space-y-16">
          <FAQSection />
          
          {SHOW_PUBLIC_SEO_SECTIONS && (
            <div className="pt-8 border-t border-slate-100">
              <LinkGridSection title="Important Links" items={importantLinks} />
            </div>
          )}
        </div>
      </section>

    </>
  );
}
