"use client";
import React from "react";
import { Link } from "@/lib/router";
import { schools } from "../data/schools";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaChevronUp
} from "react-icons/fa";
import { useOpenApply } from "../context/ApplyModalContext";
import { safeSlug } from "@/lib/shared/program-utils";
import { SITE_CONTACT, SITE_SOCIAL_LINKS } from "@/lib/shared/site-constants";
import { SHOW_PUBLIC_INFO_PAGE_LINKS } from "@/lib/seo/visibility";
import { LOCATION_LINKS, REGIONAL_LINKS, TRUST_LINKS } from "@/lib/seo/info-pages";

import { useDeveloperCms } from "@/lib/developer/useDeveloperCms";

const Footer = () => {
  const { state } = useDeveloperCms();
  const openApply = useOpenApply();
  const [showDirectory, setShowDirectory] = React.useState(false);

  const getCmsContent = (id: string, separator = " | ") => {
    const page = state.pages.find((p) => p.id === id);
    return page?.content ? page.content.split(separator).map((s) => s.trim()) : [];
  };

  const cmsContact = getCmsContent("page-contact-primary"); // [phone1, phone2, email, address]
  const address = cmsContact[3] || SITE_CONTACT.address;
  const primaryPhone = cmsContact[0] || SITE_CONTACT.primaryPhone;
  const secondaryPhone = cmsContact[1] || SITE_CONTACT.secondaryPhone;
  const email = cmsContact[2] || SITE_CONTACT.email;

  const quickLinks = getCmsContent("page-footer-links", ", ");
  const defaultLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Academic Schools", to: "/schools" },
    { label: "Ph.D. Admissions", to: "/phd-admissions" },
    { label: "Admissions", onClick: openApply },
    { label: "Career Portal", to: "/careers" },
    { label: "Contact Support", to: "/contact" },
  ];

  const displayLinks = quickLinks.length > 0 
    ? quickLinks.map(label => {
        const match = defaultLinks.find(d => d.label === label);
        return match || { label, to: "/contact" };
      })
    : defaultLinks;
  const socialIconLinks = [
    { icon: FaYoutube, href: SITE_SOCIAL_LINKS.youtube, label: "YouTube" },
    { icon: FaFacebookF, href: SITE_SOCIAL_LINKS.facebook, label: "Facebook" },
    { icon: FaInstagram, href: SITE_SOCIAL_LINKS.instagram, label: "Instagram" },
    { icon: FaLinkedinIn, href: SITE_SOCIAL_LINKS.linkedin, label: "LinkedIn" },
  ];
  const academicLinks = (schools || []).slice(0, 6);
  
  // Expanded Trust & Utility links for SEO silo crawling
  const trustFooterLinks = SHOW_PUBLIC_INFO_PAGE_LINKS ? [
    ...TRUST_LINKS.filter(l => ["statutory-disclosures", "scholarships", "placements", "approvals-recognitions"].some(slug => l.href.includes(slug))),
    ...LOCATION_LINKS.filter(l => ["hostel", "transport"].some(slug => l.href.includes(slug))),
    ...REGIONAL_LINKS
  ] : [];

  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="w-full overflow-hidden bg-[linear-gradient(180deg,#143a6b_0%,#0d315c_100%)] font-outfit text-white pb-8 md:pb-0">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12 xl:px-20 pt-8 md:pt-14 pb-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] xl:gap-12">
          <div className="flex flex-col gap-5">
            <div className="space-y-2">
              <div>
                <h3 className="text-3xl md:text-4xl font-black italic tracking-tight text-[#ffaf3a] leading-none">
                  ST.MARY&apos;S
                </h3>
                <p className="mt-1 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-white/70">
                  Rehabilitation University
                </p>
              </div>
              <p className="max-w-xs text-[13px] md:text-[14px] font-medium leading-relaxed text-white/40">
                Pioneering allied health and rehabilitation sciences since 1996.
              </p>
            </div>

            <div className="flex gap-3">
              {socialIconLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-[#ffaf3a] hover:text-[#0d315c]"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[12px] font-black uppercase tracking-widest text-[#ffaf3a]">Academia</h4>
            <nav aria-label="Academic Schools">
              <ul className="grid grid-cols-1 gap-2 text-[13px] font-semibold text-white/50">
                {academicLinks.map((school) => (
                  <li key={school.slug}>
                    <Link
                      to={`/schools/${safeSlug(school.slug, school.name)}`}
                      className="transition-colors hover:text-white"
                    >
                      {school.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[12px] font-black uppercase tracking-widest text-[#ffaf3a]">Quick Links</h4>
            <nav aria-label="Quick Links">
              <ul className="grid grid-cols-1 gap-2 text-[13px] font-semibold text-white/50">
                {displayLinks.slice(0, 6).map((link, i) => (
                  <li key={i}>
                    {link.to ? (
                      <Link to={link.to} className="transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    ) : (
                      <button onClick={link.onClick} className="text-left transition-colors hover:text-white">
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[12px] font-black uppercase tracking-widest text-[#ffaf3a]">Connect</h4>
            <div className="space-y-4 text-[13px] font-medium text-white/50">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-[#ffaf3a]" size={14} />
                <p className="leading-relaxed">{address}</p>
              </div>
              <div className="flex items-start gap-3">
                <FaPhoneAlt className="mt-1 shrink-0 text-[#ffaf3a]" size={13} />
                <div>
                  <p>{primaryPhone}</p>
                  <p>{secondaryPhone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaEnvelope className="mt-1 shrink-0 text-[#ffaf3a]" size={13} />
                <p className="break-all">{email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Institutional Directory Toggle — Solves the 'Bulky' Footer issue while keeping SEO alive */}
        {trustFooterLinks.length > 0 && (
          <div className="mt-10 border-t border-white/[0.05] pt-8">
            <div className="flex justify-center">
              <button 
                onClick={() => setShowDirectory(!showDirectory)}
                className="group flex items-center gap-3 px-8 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-[#ffaf3a] hover:text-[#0d315c] transition-all duration-500 shadow-xl"
              >
                <span className="text-[11px] font-black uppercase tracking-[0.3em]">Full Institutional Directory</span>
                <FaChevronUp className={`transition-transform duration-500 ${showDirectory ? 'rotate-0' : 'rotate-180'}`} size={12} />
              </button>
            </div>

            {/* Sub-menu: Default Closed, Animated Reveal */}
            <div className={`transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${showDirectory ? 'max-h-[1000px] opacity-100 mt-12' : 'max-h-0 opacity-0'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10 pb-8">
                 <div className="space-y-4">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-white/30">Trust & Disclosure</h5>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {TRUST_LINKS.map(link => (
                        <li key={link.href}>
                          <Link to={link.href} className="text-[11px] font-medium text-white/20 hover:text-white transition-colors leading-tight block">{link.label}</Link>
                        </li>
                      ))}
                    </ul>
                 </div>
                 <div className="space-y-4">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-white/30">Regional Hubs</h5>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {REGIONAL_LINKS.map(link => (
                        <li key={link.href}>
                          <Link to={link.href} className="text-[11px] font-medium text-white/20 hover:text-white transition-colors leading-tight block">{link.label}</Link>
                        </li>
                      ))}
                    </ul>
                 </div>
                 <div className="space-y-4">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-white/30">Campus Resources</h5>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {LOCATION_LINKS.map(link => (
                        <li key={link.href}>
                          <Link to={link.href} className="text-[11px] font-medium text-white/20 hover:text-white transition-colors leading-tight block">{link.label}</Link>
                        </li>
                      ))}
                    </ul>
                 </div>
                 <div className="space-y-4">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-white/30">Status</h5>
                    <p className="text-[11px] font-medium text-white/15 leading-relaxed">
                      St. Mary's Rehabilitation University: Committed to statutory transparency and global academic compliance.
                    </p>
                 </div>
              </div>
            </div>
          </div>
        )}

        <div className="relative mt-8 md:mt-12 border-t border-white/[0.08] pt-10 md:pt-12">
          <button
            type="button"
            onClick={handleScrollTop}
            aria-label="Scroll to top"
            className="absolute left-1/2 top-0 flex h-13 w-13 md:h-14 md:w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#10bb82] text-white shadow-[0_20px_45px_rgba(1,158,110,0.35)] transition-transform hover:scale-105"
          >
            <FaChevronUp size={18} />
          </button>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="py-4">
              <p className="text-[13px] font-black uppercase tracking-[0.42em] text-white/40">
                SMRU Hyderabad • Since 1996
              </p>
              <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.08em] text-white/25">
                Copyrights © 2026 St. Mary&apos;s Rehabilitation University. All rights reserved.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/[0.35] md:justify-end">
              <Link to="/privacy-policy" className="transition-colors hover:text-white/70">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="transition-colors hover:text-white/70">
                Terms Of Service
              </Link>
              <Link to="/schools" className="text-[#ffaf3a] transition-colors hover:text-white">
                Academics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
