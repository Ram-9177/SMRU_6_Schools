"use client";

import { useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/lib/router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import EnquiryModal from "./ApplyModal";
import PhDPopup from "./PhDPopup";
import ReactDomSafetyPatch from "./ReactDomSafetyPatch";
import { ApplyModalContext } from "../context/ApplyModalContext";
import { completeNavigationTransition, restoreScrollPosition, useNavigationTransition } from "../lib/router";
import { FaPaperPlane, FaPhoneAlt, FaFileDownload, FaWhatsapp, FaHeadset } from "react-icons/fa";
import { PARTNER_HIDDEN_STICKY_ROUTES, STICKY_CTA_HIDDEN_ROUTES, SITE_CONTACT, SITE_CTA_LINKS } from "@/lib/shared/site-constants";
import MobileMenu from "./MobileMenu";

type FlashUpdate = {
  text: string;
  to: string;
};

const FLASH_UPDATES: FlashUpdate[] = [
  { text: "Notice: Revised Schedule for PhD Admissions 2026-27 (Download Official Notice)", to: "/assets/Notice_Revised_Schedule_PhD_Admissions_2026_27.docx" },
  { text: "Important: PhD Addendum & Revised Timeline available for download", to: "/assets/SMRU_PhD_Addendum_Formatted.docx" },
  { text: "Deadline: PhD Application End Date is 10-May-2026", to: "/phd-admissions" },
  { text: "Daily Update: Admissions open for UG, PG, and PhD programs", to: "/admissions" },
  { text: "Important: Scholarship support available up to 50% (terms apply)", to: "/admissions" },
  { text: "Flash: PhD Entrance Test scheduled on 15-May-2026", to: "/phd-admissions" },
  { text: "Notice: Campus visits and counseling slots open this week", to: "/contact" },
];

type AppShellContentProps = {
  children: ReactNode;
  openApplyModal: () => void;
  showEnquiryModal: boolean;
  setShowEnquiryModal: Dispatch<SetStateAction<boolean>>;
};

function AppShellContent({
  children,
  openApplyModal,
  showEnquiryModal,
  setShowEnquiryModal,
}: AppShellContentProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isDeveloperPage = pathname?.startsWith("/developer");
  const [scrollDir, setScrollDir] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTop, setIsTop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isNavigating } = useNavigationTransition();
  const isNavLoading = isNavigating;

  useEffect(() => {
    setMounted(true);
  }, []);



  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      // Don't hide header if mobile menu is open (body scroll is locked)
      if (document.body.style.overflow === 'hidden') return;

      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDir("down");
      } else {
        setScrollDir("up");
      }
      
      setLastScrollY(currentScrollY);
      setIsTop(currentScrollY < 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const shouldHideLayoutChrome =
    !mounted ||
    isDeveloperPage ||
    PARTNER_HIDDEN_STICKY_ROUTES.some((route) => pathname === route || pathname?.startsWith(`${route}/`));

  const shouldHideStickyElements =
    shouldHideLayoutChrome ||
    STICKY_CTA_HIDDEN_ROUTES.some((route) => pathname === route || pathname?.startsWith(`${route}/`));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Institutional Loading Bar */}
      {isNavLoading && (
        <div className="fixed top-0 left-0 right-0 z-[3000] h-1 overflow-hidden pointer-events-none">
          <div className="h-full bg-[#ffaf3a] animate-nav-progress origin-left shadow-[0_0_10px_#ffaf3a]" />
        </div>
      )}

      {!isDeveloperPage && !shouldHideLayoutChrome && (
        <div 
          className={`fixed top-0 left-0 right-0 z-[2200] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrollDir === "down" && !isTop ? "-translate-y-full" : "translate-y-0"
          }`}
        >
          <section className="h-10 bg-[#082244] border-b border-white/10">
            <div className="max-w-[1440px] mx-auto h-full px-3 sm:px-4 flex items-center gap-1.5 sm:gap-3">
              <span className="shrink-0 hidden md:inline-flex items-center cut-corner-badge bg-[#ffaf3a] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#0d315c]">
                Flash
              </span>
              <div className="min-w-0 flex-1 overflow-hidden">
                <div className="smru-global-ticker-track">
                  {[...FLASH_UPDATES, ...FLASH_UPDATES].map((item, idx) => {
                    const isAsset = item.to.includes("/assets/");
                    return isAsset ? (
                      <a
                        key={`${idx}-${item.text}`}
                        href={item.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="smru-global-ticker-item smru-global-ticker-link text-[10px] sm:text-[11px]"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <Link
                        key={`${idx}-${item.text}`}
                        to={item.to}
                        className="smru-global-ticker-item smru-global-ticker-link text-[10px] sm:text-[11px]"
                      >
                        {item.text}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <Link
                to="/admissions"
                className="shrink-0 inline-flex items-center cut-corner-badge border border-white/25 bg-white/10 px-2 py-1 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.05em] sm:tracking-[0.12em] text-white hover:bg-white/20 transition-colors"
              >
                <span className="hidden sm:inline">Important</span>
                <span className="sm:hidden">Notice</span>
              </Link>
            </div>
          </section>
          <Navbar 
            isPartner={pathname === "/institutional-partner"} 
            isOpen={isMenuOpen}
            toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      )}

      <MobileMenu 
        isOpen={isMenuOpen} 
        closeMenu={() => setIsMenuOpen(false)} 
        openApply={openApplyModal} 
      />

      <ScrollToTop />

      <main
        className={`flex-1 ${
          isDeveloperPage
            ? ""
            : `${shouldHideLayoutChrome ? "" : "pt-[112px] lg:pt-[136px]"}`
        }`}
      >
        {children}
      </main>

      {!shouldHideStickyElements && (
        <>
          <div className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-[1200] pointer-events-none group/sidebar">
            <div className="flex flex-col items-end pointer-events-auto gap-2">
                <a
                  href={SITE_CTA_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex flex-col items-center justify-center w-[64px] py-4 cut-corner-badge transition-all duration-300 hover:w-[80px] hover:translate-x-[-5px] active:scale-95 group/btn shadow-[-4px_4px_15px_rgba(0,0,0,0.08)] bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0]"
                >
                  <FaWhatsapp className="text-[22px] text-[#166534] drop-shadow-sm group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[9px] font-extrabold mt-1 text-[#166534] uppercase tracking-tighter">WhatsApp</span>
                </a>

                <a
                  href={`tel:${SITE_CONTACT.primaryPhone}`}
                  className="relative flex flex-col items-center justify-center w-[64px] py-4 cut-corner-badge transition-all duration-300 hover:w-[80px] hover:translate-x-[-5px] active:scale-95 group/btn shadow-[-4px_4px_15px_rgba(0,0,0,0.08)] bg-gradient-to-br from-[#fefce8] to-[#fef3c7]"
                >
                  <FaPhoneAlt className="text-[18px] text-[#854d0e] drop-shadow-sm group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[9px] font-extrabold mt-1 text-[#854d0e] uppercase tracking-tighter">Call Us</span>
                </a>

                 <a
                  href={SITE_CTA_LINKS.apply}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex flex-col items-center justify-center w-[64px] py-4 cut-corner-badge transition-all duration-300 hover:w-[80px] hover:translate-x-[-5px] active:scale-95 group/btn shadow-[-4px_4px_15px_rgba(0,0,0,0.08)] bg-gradient-to-br from-[#eff6ff] to-[#dbeafe]"
                >
                  <FaPaperPlane className="text-[18px] text-[#1e3a8a] drop-shadow-sm group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[9px] font-extrabold mt-1 text-[#1e3a8a] uppercase tracking-tighter">Apply</span>
                </a>

                <button
                  type="button"
                  onClick={openApplyModal}
                  className="relative flex flex-col items-center justify-center w-[64px] py-4 cut-corner-badge transition-all duration-300 hover:w-[80px] hover:translate-x-[-5px] active:scale-95 group/btn shadow-[-4px_4px_15px_rgba(0,0,0,0.08)] bg-gradient-to-br from-[#fff7ed] to-[#ffedd5]"
                >
                  <FaHeadset className="text-[18px] text-[#9a3412] drop-shadow-sm group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[9px] font-extrabold mt-1 text-[#9a3412] uppercase tracking-tighter text-center">Enquiry</span>
                </button>

                <Link
                  to="/brochure"
                  className="relative flex flex-col items-center justify-center w-[64px] py-4 cut-corner-badge transition-all duration-300 hover:w-[80px] hover:translate-x-[-5px] active:scale-95 group/btn shadow-[-4px_4px_15px_rgba(0,0,0,0.08)] bg-gradient-to-br from-[#fef2f2] to-[#fee2e2]"
                >
                  <FaFileDownload className="text-[18px] text-[#991b1b] drop-shadow-sm group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[9px] font-extrabold mt-1 text-[#991b1b] uppercase tracking-tighter">Brochure</span>
                </Link>
            </div>
          </div>

          <div className="lg:hidden fixed left-2 right-2 sm:left-3 sm:right-3 z-[1200] pointer-events-none bottom-[max(0.65rem,env(safe-area-inset-bottom))]">
            <div 
              className="grid grid-cols-5 gap-0.5 sm:gap-1 overflow-hidden cut-corner-panel border border-white/40 bg-white/88 p-0.5 sm:p-1 shadow-[0_12px_28px_rgba(0,0,0,0.14)] backdrop-blur-xl pointer-events-auto"
            >
              <a
                href={SITE_CTA_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 flex flex-col items-center justify-center cut-corner-badge bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] py-1.5 sm:py-2 transition-all active:scale-90"
              >
                <FaWhatsapp className="text-sm text-[#166534]" />
                <span className="mt-1 max-w-full truncate text-center text-[clamp(6px,1.55vw,7px)] font-black uppercase tracking-tight leading-none text-[#166534]">WhatsApp</span>
              </a>

              <a
                href={`tel:${SITE_CONTACT.primaryPhone}`}
                className="min-w-0 flex flex-col items-center justify-center cut-corner-badge bg-gradient-to-br from-[#fefce8] to-[#fef3c7] py-1.5 sm:py-2 transition-all active:scale-90"
              >
                <FaPhoneAlt className="text-[13px] text-[#854d0e]" />
                <span className="mt-1 max-w-full truncate text-center text-[clamp(6px,1.55vw,7px)] font-black uppercase tracking-tight leading-none text-[#854d0e]">Call Us</span>
              </a>

              <a
                href={SITE_CTA_LINKS.apply}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 flex flex-col items-center justify-center cut-corner-badge bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] py-1.5 sm:py-2 transition-all active:scale-90"
            >
                <FaPaperPlane className="text-[13px] text-[#1e3a8a]" />
                <span className="mt-1 max-w-full truncate text-center text-[clamp(6px,1.55vw,7px)] font-black uppercase tracking-tight leading-none text-[#1e3a8a]">Apply</span>
              </a>

              <button
                type="button"
                onClick={openApplyModal}
                className="min-w-0 flex flex-col items-center justify-center cut-corner-badge bg-gradient-to-br from-[#fff7ed] to-[#ffedd5] py-1.5 sm:py-2 transition-all active:scale-90"
              >
                <FaHeadset className="text-[13px] text-[#9a3412]" />
                <span className="mt-1 max-w-full truncate text-center text-[clamp(6px,1.55vw,7px)] font-black uppercase tracking-tight leading-none text-[#9a3412]">Enquiry</span>
              </button>

              <Link
                to="/brochure"
                className="min-w-0 flex flex-col items-center justify-center cut-corner-badge bg-gradient-to-br from-[#fef2f2] to-[#fee2e2] py-1.5 sm:py-2 transition-all active:scale-90"
              >
                <FaFileDownload className="text-[13px] text-[#991b1b]" />
                <span className="mt-1 max-w-full truncate text-center text-[clamp(6px,1.55vw,7px)] font-black uppercase tracking-tight leading-none text-[#991b1b]">Brochure</span>
              </Link>
            </div>
          </div>
        </>
      )}

      <EnquiryModal open={showEnquiryModal} onClose={() => setShowEnquiryModal(false)} />
      {!isDeveloperPage && mounted && pathname === "/" && <PhDPopup />}
      {!isDeveloperPage && !shouldHideLayoutChrome && (
        <>
          <div className="w-full h-1.5 bg-[#019e6e]" />
          <Footer />
        </>
      )}

    </div>
  );
}

export default function AppShell({ children }: { children: ReactNode }) {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const openApplyModal = () => setShowEnquiryModal(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    completeNavigationTransition();
    restoreScrollPosition(pathname, true);
    // accessibility: restore focus to main heading for screen readers
    requestAnimationFrame(() => {
      try {
        const mainHeading = document.querySelector("main h1") as HTMLElement | null;
        if (mainHeading) {
          mainHeading.setAttribute("tabindex", "-1");
          mainHeading.focus({ preventScroll: true });
          // remove tabindex to keep DOM clean
          mainHeading.removeAttribute("tabindex");
        }
      } catch (e) {
        // ignore focus errors in non-browser environments
      }
    });
  }, [pathname]);

  return (
    <ApplyModalContext.Provider value={{ showApplyModal: showEnquiryModal, openApplyModal, closeApplyModal: () => setShowEnquiryModal(false) }}>
      <ReactDomSafetyPatch />

      <AppShellContent 
        openApplyModal={openApplyModal}
        showEnquiryModal={showEnquiryModal}
        setShowEnquiryModal={setShowEnquiryModal}
      >
        {children}
      </AppShellContent>

    </ApplyModalContext.Provider>
  );
}
