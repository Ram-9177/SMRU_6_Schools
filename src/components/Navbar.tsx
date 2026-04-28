// @ts-nocheck
"use client";
import React, { startTransition, useCallback, useState, useMemo } from "react";
import { Link, useNavigate } from "@/lib/router";
import { usePathname, useRouter } from "next/navigation";
import { PARTNER_HIDDEN_STICKY_ROUTES } from "@/lib/shared/site-constants";
import { schools } from "../data/schools";
import { FaLayerGroup } from "react-icons/fa";
import { useOpenApply } from "../context/ApplyModalContext";
import {
  cleanProgramName,
  detectProgramCategory,
  getCanonicalProgramKey,
  safeSlug,
} from "@/lib/shared/program-utils";

const MobileAccordionItem = ({ group, closeMenu, openApply }) => {
  const isHeading = !!group.links;
  const [expanded, setExpanded] = useState(group.isOpen || false);

  return (
    <div className="border-b border-slate-100 last:border-0 py-3">
      {isHeading ? (
        <div>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between py-2 group"
          >
            <span className={`text-[19px] font-black tracking-tight transition-colors ${expanded ? "text-[#019e6e]" : "text-[#0d315c]"}`}>
              {group.title}
            </span>
            <span className={`text-[#0d315c] transition-transform duration-300 ${expanded ? "rotate-180 text-[#019e6e]" : ""}`}>
              ▼
            </span>
          </button>
          <ul className={`mt-1 space-y-4 pl-4 overflow-hidden transition-all duration-300 ${expanded ? "max-h-[300px] opacity-100 pb-4 pt-2" : "max-h-0 opacity-0"}`}>
            {group.links.map((link, lIdx) => (
              <li key={lIdx}>
                {link.external ? (
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="text-[16px] font-bold text-slate-500 hover:text-[#019e6e] transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link 
                    to={link.to}
                    onClick={closeMenu}
                    className="text-[16px] font-bold text-slate-500 hover:text-[#019e6e] transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Link 
          to={group.to}
          onClick={closeMenu}
          className="block w-full text-[19px] font-black text-[#0d315c] tracking-tight py-2 hover:text-[#019e6e] transition-colors"
        >
          {group.title}
        </Link>
      )}
    </div>
  );
};

const Navbar = ({ isPartner: propIsPartner }: { isPartner?: boolean } = {}) => {
  const openApply = useOpenApply();
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // 'schools' or null
  const [activeSchoolSlug, setActiveSchoolSlug] = useState(safeSlug(schools[0]?.slug, schools[0]?.name || ""));
  const navigate = useNavigate();
  const router = useRouter();
  const pathname = usePathname();

  const isPartner = propIsPartner !== undefined ? propIsPartner : PARTNER_HIDDEN_STICKY_ROUTES.some(
    (route) => pathname === route || pathname?.startsWith(`${route}/`)
  );

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setActiveMenu(null);
  };

  const prefetchPath = useCallback(
    (path: string) => {
      if (!path) return;
      router.prefetch(path);
    },
    [router]
  );

  const activeSchool = useMemo(() => {
    return schools.find((s) => s.slug === activeSchoolSlug) || schools[0];
  }, [activeSchoolSlug]);

  const schoolProgramsByCategory = useMemo(() => {
    if (!activeSchool) return { ug: [], pg: [], diploma: [], phd: [] };
    const allProgs = [];
    (activeSchool.departments || []).forEach((dept) => {
      const deptSlug = safeSlug(dept.slug, dept.name);
      (dept.programs || []).forEach((prog) => {
        allProgs.push({ 
          ...prog, 
          deptSlug, 
          slug: safeSlug(prog.slug, prog.name),
          deptName: dept.name // Add department name here
        });
      });
    });

    const categories = { ug: [], pg: [], diploma: [], phd: [] };
    const seen = new Set();

    allProgs.forEach((prog) => {
      const cat = detectProgramCategory(prog);
      const canon = getCanonicalProgramKey(prog.name || "");
      const uniqueKey = `${cat}-${canon}`;

      if (!seen.has(uniqueKey)) {
        seen.add(uniqueKey);
        categories[cat].push({ 
          ...prog, 
          displayName: cleanProgramName(prog.name || "Untitled"),
          deptName: prog.deptName || "Department"
        });
      }
    });

    Object.keys(categories).forEach((k) => categories[k].sort((a, b) => a.displayName.localeCompare(b.displayName)));
    return categories;
  }, [activeSchool]);

  const isSchoolsOpen = activeMenu === 'schools';
  const isAdmissionsOpen = activeMenu === 'admissions';

  return (
    <nav 
      className={`fixed ${isPartner ? "top-0" : "top-[39px]"} left-0 right-0 z-[2000] h-20 md:h-24 bg-[#0d315c] border-b-2 border-[#019e6e]/40 shadow-lg transition-all duration-300`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between h-full px-4 md:px-8">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} onMouseEnter={() => setActiveMenu(null)} className="flex items-center h-[60%] sm:h-[70%] shrink-0">
          <img src="/assets/Logo.png" alt="St. Mary's Rehabilitation University Logo" className="h-full w-auto object-contain transition-transform duration-300 hover:brightness-110" />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-6 xl:gap-8 h-full font-outfit">
          <li onMouseEnter={() => setActiveMenu(null)}>
            <Link to="/" onClick={closeMenu} className="text-[14px] font-black uppercase tracking-[0.2em] text-white/90 hover:text-[#ffaf3a] transition-all relative group py-2">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#ffaf3a] transition-all duration-200 group-hover:w-full" />
            </Link>
          </li>
          <li onMouseEnter={() => setActiveMenu(null)}>
            <Link to="/about" onClick={closeMenu} className="text-[14px] font-black uppercase tracking-[0.2em] text-white/90 hover:text-[#ffaf3a] transition-all relative group py-2">
              About
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#ffaf3a] transition-all duration-200 group-hover:w-full" />
            </Link>
          </li>
          
          {/* Schools Mega Menu Entry */}
          <li 
            className="h-full flex items-center"
            onMouseEnter={() => {
              setActiveMenu('schools');
              prefetchPath(`/schools/${safeSlug(activeSchool?.slug, activeSchool?.name)}`);
            }}
          >
            <Link
              to="/schools"
              onClick={closeMenu}
              aria-label="Academic Schools Mega Menu"
              className={`text-[14px] font-black uppercase tracking-[0.2em] cursor-pointer transition-all flex items-center gap-2 py-4 ${isSchoolsOpen ? "text-[#ffaf3a]" : "text-white/90 hover:text-[#ffaf3a]"}`}
            >
              Schools
              <span className={`text-[10px] transition-transform duration-300 ${isSchoolsOpen ? "rotate-180" : ""}`}>▼</span>
            </Link>

            {isSchoolsOpen && (
              <div 
                className={`fixed top-[119px] md:top-[135px] left-1/2 -translate-x-1/2 w-[95vw] max-w-[1100px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-200 cut-corner-panel overflow-hidden flex animate-in fade-in slide-in-from-top-2 duration-200`}
                onMouseLeave={() => setActiveMenu(null)}
              >
                
                {/* School List Sidebar */}
                <div className="w-[300px] shrink-0 bg-slate-50 border-r border-slate-100 p-8 flex flex-col">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-slate-400 border-b border-slate-100 pb-2">Academic Units</h3>
                  <div className="flex flex-col gap-1 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                    {schools.map((s) => {
                      const sSlug = safeSlug(s.slug, s.name);
                      const isActive = activeSchoolSlug === sSlug;
                      return (
                        <button
                          key={sSlug}
                          onMouseEnter={() => {
                            setActiveSchoolSlug(sSlug);
                            prefetchPath(`/schools/${sSlug}`);
                          }}
                          onClick={() => {
                            navigate(`/schools/${sSlug}`);
                            closeMenu();
                          }}
                          className={`text-left px-5 py-3.5 rounded-lg font-black text-[11px] uppercase tracking-wider transition-all flex items-center justify-between group ${
                            isActive ? "bg-[#0d315c] text-white shadow-md translate-x-2" : "text-slate-500 hover:bg-slate-100 hover:text-[#0d315c]"
                          }`}
                        >
                          <span className="leading-tight pr-4">{cleanProgramName(s.short || s.name)}</span>
                          {isActive && <span className="text-[10px]">➜</span>}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/20">
                    <Link 
                      to="/academic-structure"
                      onClick={closeMenu}
                      className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FaLayerGroup className="text-sm" />
                      </div>
                      <div>
                        <p className="text-[11px] font-black leading-none mb-1">Academic Structure</p>
                        <p className="text-[9px] opacity-70">Program catalog</p>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Programs Content Area */}
                <div className="flex-grow p-6 overflow-y-auto max-h-[70vh] bg-slate-50/20">
                  <div className="mb-5">
                    <p className="text-[#019e6e] text-[9px] font-black uppercase tracking-[0.2em] mb-1.5">{cleanProgramName(activeSchool?.name)}</p>
                    <h2 className="text-[24px] font-black text-[#0d315c] tracking-tight leading-none">Programs by Level</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    {["ug", "pg", "diploma", "phd"].map((cat) => {
                      const titles = {
                        ug: "Undergraduate Programs",
                        pg: "Postgraduate Programs",
                        diploma: "Diploma / Certificate",
                        phd: "Ph.D. / M.Phil."
                      };
                      return (
                        <div key={cat}>
                          <h4 className="text-[9px] font-black text-[#0d315c] uppercase tracking-[0.15em] border-b-2 border-[#ffaf3a] pb-1.5 mb-2.5 w-fit leading-none">{titles[cat]}</h4>
                          <ul className="space-y-1.5">
                            {schoolProgramsByCategory[cat].length > 0 ? (
                              schoolProgramsByCategory[cat].map((p) => (
                                <li key={p.slug} className="group flex items-start gap-2 p-1.5 rounded-md hover:bg-white/80 transition-all">
                                  <div className="flex flex-col group/item transition-all">
                                    <Link 
                                      to={`/schools/${safeSlug(activeSchool?.slug, activeSchool?.name)}/${p.deptSlug}/${p.slug}`}
                                      onClick={closeMenu}
                                      onMouseEnter={() => prefetchPath(`/schools/${safeSlug(activeSchool?.slug, activeSchool?.name)}/${p.deptSlug}/${p.slug}`)}
                                      className="text-[13px] font-bold text-slate-800 group-hover/item:text-[#019e6e] leading-snug transition-colors"
                                    >
                                      {p.displayName}
                                    </Link>
                                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tight mt-0.5">{p.deptName}</span>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <li className="text-[11px] text-slate-400 italic pl-2">No programs listed yet.</li>
                            )}
                          </ul>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 pt-5 border-t border-slate-200 flex justify-end">
                    <Link 
                      to={`/schools/${safeSlug(activeSchool?.slug, activeSchool?.name)}`}
                      onClick={closeMenu}
                      onMouseEnter={() => prefetchPath(`/schools/${safeSlug(activeSchool?.slug, activeSchool?.name)}`)}
                      className="text-[#019e6e] font-black text-[13px] hover:gap-2 flex items-center gap-1.5 transition-all group"
                    >
                      View school dashboard <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* Admissions Dropdown */}
          <li 
            className="h-full flex items-center"
            onMouseEnter={() => setActiveMenu('admissions')}
          >
            <Link
              to="/admissions"
              onClick={closeMenu}
              aria-label="Official University Admissions Mega Menu"
              className={`text-[14px] font-black uppercase tracking-[0.2em] cursor-pointer transition-all flex items-center gap-2 py-4 ${isAdmissionsOpen ? "text-[#ffaf3a]" : "text-white/90 hover:text-[#ffaf3a]"}`}
            >
              Admissions
              <span className={`text-[10px] transition-transform duration-300 ${isAdmissionsOpen ? "rotate-180" : ""}`}>▼</span>
            </Link>

            {isAdmissionsOpen && (
              <div 
                className="fixed top-[119px] md:top-[135px] left-1/2 -translate-x-1/2 w-[95vw] max-w-[1000px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-200 cut-corner-panel overflow-hidden flex animate-in fade-in slide-in-from-top-2 duration-200"
                onMouseLeave={() => setActiveMenu(null)}
              >
                {/* Admissions Sidebar */}
                <div className="w-[280px] shrink-0 bg-slate-50 border-r border-slate-100 p-8 flex flex-col">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-slate-400 border-b border-slate-100 pb-2">Enrollment Hub</h3>
                  <div className="space-y-4">
                    <a 
                      href="https://apply.smru.edu.in" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group block p-4 bg-[#019e6e] text-white rounded-xl shadow-lg hover:bg-[#0fa571] transition-all"
                    >
                      <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-80">Apply Now</p>
                      <p className="text-lg font-black leading-none">Admissions 2026</p>
                    </a>
                    <Link 
                      to="/admissions"
                      onClick={closeMenu}
                      className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-[#019e6e] hover:bg-slate-50 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#0d315c] group-hover:bg-[#019e6e]/10 group-hover:text-[#019e6e]">
                        <FaLayerGroup />
                      </div>
                      <span className="text-[11px] font-black text-[#0d315c] uppercase">Overview</span>
                    </Link>
                  </div>
                </div>

                {/* Admissions Categories */}
                <div className="flex-grow p-8 bg-white grid grid-cols-2 gap-10">
                  <div>
                    <h4 className="text-[12px] font-black text-[#019e6e] uppercase tracking-[0.2em] mb-6">Degree Programs</h4>
                    <ul className="space-y-5">
                      {[
                        { label: "UG Admissions", desc: "Bachelors degrees across all schools", to: "/admissions" },
                        { label: "PG Admissions", desc: "Master of Science & specialized masters", to: "/admissions" },
                        { label: "PhD Admissions", desc: "Doctoral research opportunities", to: "/phd-admissions", highlight: true },
                        { label: "Post-Diploma", desc: "Specialized clinical credentials", to: "/admissions" },
                      ].map((item, i) => (
                        <li key={i}>
                          <Link 
                            to={item.to} 
                            onClick={closeMenu}
                            className={`group flex flex-col ${item.highlight ? "text-[#0d315c]" : "text-slate-600"} hover:text-[#019e6e] transition-colors`}
                          >
                            <span className="text-[15px] font-black tracking-tight">{item.label}</span>
                            <span className="text-[11px] text-slate-400 font-medium">{item.desc}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[12px] font-black text-[#019e6e] uppercase tracking-[0.2em] mb-6">Resources & Support</h4>
                    <ul className="space-y-5">
                      {[
                        { label: "Scholarship Support", desc: "Financial aid up to 50% merit-based", to: "/admissions" },
                        { label: "Entrance Test 2026", desc: "Schedule, syllabus & official notices", to: "/phd-admissions" },
                        { label: "Fee Structure", desc: "Institutional fee policy & structure", to: "/admissions" },
                        { label: "Mandatory Disclosure", desc: "Official statutory documentation", to: "/mandatory-disclosure" },
                      ].map((item, i) => (
                        <li key={i}>
                          <Link 
                            to={item.to} 
                            onClick={closeMenu}
                            className="group flex flex-col text-slate-600 hover:text-[#019e6e] transition-colors"
                          >
                            <span className="text-[15px] font-black tracking-tight">{item.label}</span>
                            <span className="text-[11px] text-slate-400 font-medium">{item.desc}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </li>

          <li onMouseEnter={() => setActiveMenu(null)}>
            <Link to="/careers" onClick={closeMenu} className="text-[14px] font-black uppercase tracking-[0.2em] text-white/90 hover:text-[#ffaf3a] transition-all relative group py-2">
              Careers
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#ffaf3a] transition-all duration-200 group-hover:w-full" />
            </Link>
          </li>
          <li onMouseEnter={() => setActiveMenu(null)}>
            <Link to="/contact" onClick={closeMenu} className="text-[14px] font-black uppercase tracking-[0.2em] text-white/90 hover:text-[#ffaf3a] transition-all relative group py-2">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#ffaf3a] transition-all duration-200 group-hover:w-full" />
            </Link>
          </li>

          <li onMouseEnter={() => setActiveMenu(null)}>
            <Link to="/campus-360" onClick={closeMenu} className="text-[14px] font-black uppercase tracking-[0.2em] text-white/90 hover:text-[#ffaf3a] transition-all relative group py-2">
              Campus 360
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#ffaf3a] transition-all duration-200 group-hover:w-full" />
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex flex-col items-center justify-center cursor-pointer p-2 focus:outline-none bg-transparent"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5">
            <span className={`absolute block h-0.5 w-full bg-white transition-all duration-300 ${isOpen ? "rotate-45 top-2" : "top-0"}`} />
            <span className={`absolute block h-0.5 w-full bg-white transition-all duration-300 top-2 ${isOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute block h-0.5 w-full bg-white transition-all duration-300 ${isOpen ? "-rotate-45 top-2" : "top-4"}`} />
          </div>
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 z-[2000] bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={closeMenu}
      >
        <div 
          className={`absolute right-0 top-0 h-full w-[85%] max-w-[400px] bg-white shadow-2xl transition-transform duration-500 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sidebar Top: Close Button */}
          <div className="flex items-center justify-end p-6">
            <button 
              onClick={closeMenu}
              className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-[#0d315c] shadow-sm hover:rotate-90 transition-transform duration-300"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>

          {/* Sidebar Content: Accordion Menu */}
          <div className="flex-grow overflow-y-auto px-6 py-2">
            <nav className="space-y-1">
              {[
                { title: "Home", to: "/" },
                { title: "About us", to: "/about" },
                { 
                  title: "Academics", 
                  links: [
                    { label: "Schools & Programs", to: "/schools" },
                    { label: "Academic Structure", to: "/academic-structure" }
                  ] 
                },
                { 
                  title: "Admissions", 
                  isOpen: true, 
                  links: [
                    { label: "Admission Overview", url: "https://apply.smru.edu.in", external: true },
                    { label: "Ph.D Admissions", to: "/phd-admissions" }
                  ] 
                },
                { title: "Discover", to: "/campus-360" },
                { title: "Contact us", to: "/contact" }
              ].map((group, idx) => (
                <MobileAccordionItem 
                  key={idx} 
                  group={group} 
                  closeMenu={closeMenu} 
                  openApply={openApply} 
                />
              ))}
            </nav>
          </div>

          {/* Sidebar Bottom: Enquire Now & Footer */}
          <div className="p-8 bg-slate-50/50">
            <button 
              onClick={() => {
                openApply();
                closeMenu();
              }}
              aria-label="Enquire for 2026 Admissions"
              className="w-full py-4 bg-[#019e6e] text-white rounded-xl font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-[#0fa571] active:scale-95 transition-all mb-6"
            >
              Enquire Now
            </button>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">
              © {new Date().getFullYear()} St. Mary's Rehabilitation University
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
