"use client";

import { useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/lib/router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageLoader from "./PageLoader";
import ScrollToTop from "./ScrollToTop";
import EnquiryModal from "./ApplyModal";
import PhDPopup from "./PhDPopup";
import ReactDomSafetyPatch from "./ReactDomSafetyPatch";
import { ApplyModalContext } from "../context/ApplyModalContext";
import { completeNavigationTransition, restoreScrollPosition } from "../lib/router";
import { FaPaperPlane, FaPhoneAlt, FaFileDownload, FaWhatsapp, FaHeadset } from "react-icons/fa";
import { PARTNER_HIDDEN_STICKY_ROUTES, SITE_CONTACT, SITE_CTA_LINKS } from "@/lib/shared/site-constants";

type FlashUpdate = {
  text: string;
  to: string;
};

const FLASH_UPDATES: FlashUpdate[] = [
  { text: "Notice: Revised Schedule for PhD Admissions 2026-27 (Download Official Notice)", to: "/assets/Notice_Revised_Schedule_PhD_Admissions_2026_27.docx" },
  { text: "Important: PhD Addendum & Revised Timeline available for download", to: "/assets/SMRU_PhD_Addendum_Formatted.docx" },
  { text: "Daily Update: Admissions open for UG, PG, and PhD programs", to: "/admissions" },
  { text: "Important: Scholarship support available up to 50% (terms apply)", to: "/admissions" },
  { text: "Flash: PhD Entrance Test scheduled on 26-April-2026", to: "/phd-admissions" },
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
  const [isNavLoading, setIsNavLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsNavLoading(true);
    const timer = setTimeout(() => setIsNavLoading(false), 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsTop(scrollY < 20);
      if (scrollY > lastScrollY && scrollY > 140) {
        setScrollDir("down");
      } else {
        setScrollDir("up");
      }
      setLastScrollY(scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const shouldHideLayoutChrome =
    !mounted ||
    isDeveloperPage ||
    PARTNER_HIDDEN_STICKY_ROUTES.some((route) => pathname === route || pathname?.startsWith(`${route}/`));

  const shouldHideStickyElements =
    shouldHideLayoutChrome || pathname?.startsWith("/partner");

  return (
    <>
      {/* Institutional Loading Bar */}
      {isNavLoading && (
        <div className="fixed top-0 left-0 right-0 z-[3000] h-1 overflow-hidden pointer-events-none">
          <div className="h-full bg-[#ffaf3a] animate-nav-progress origin-left shadow-[0_0_10px_#ffaf3a]" />
        </div>
      )}

      {!isDeveloperPage && !shouldHideLayoutChrome && (
        <div className="fixed top-0 left-0 right-0 z-[2200]">
          <section className="h-10 bg-[#082244] border-b border-white/10">
            <div className="max-w-[1440px] mx-auto h-full px-2.5 sm:px-4 flex items-center gap-2">
              <span className="shrink-0 inline-flex items-center cut-corner-badge bg-[#ffaf3a] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#0d315c]">
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
                        className="smru-global-ticker-item smru-global-ticker-link"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <Link
                        key={`${idx}-${item.text}`}
                        to={item.to}
                        className="smru-global-ticker-item smru-global-ticker-link"
                      >
                        {item.text}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <Link
                to="/admissions"
                className="shrink-0 inline-flex items-center cut-corner-badge border border-white/25 bg-white/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-white hover:bg-white/20 transition-colors"
              >
                Important
              </Link>
            </div>
          </section>
          <Navbar isPartner={pathname === "/institutional-partner"} />
        </div>
      )}
      <ScrollToTop />

      <main
        className={
          isDeveloperPage
            ? ""
            : `${shouldHideLayoutChrome ? "pt-[79px] md:pt-[95px]" : "pt-[119px] md:pt-[135px]"} ${shouldHideStickyElements ? "" : "pb-[108px] sm:pb-[116px] lg:pb-0"}`
        }
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

          <div className="lg:hidden fixed left-3 right-3 z-[1200] pointer-events-none" style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
            <div 
              className="grid grid-cols-5 gap-1 overflow-hidden cut-corner-panel border border-white/40 bg-white/88 p-1 shadow-[0_12px_28px_rgba(0,0,0,0.14)] backdrop-blur-xl pointer-events-auto"
            >
              <a
                href={SITE_CTA_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center cut-corner-badge bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] py-2 transition-all active:scale-90"
              >
                <FaWhatsapp className="text-sm text-[#166534]" />
                <span className="mt-1 text-[7px] font-black uppercase tracking-tight text-[#166534]">WhatsApp</span>
              </a>

              <a
                href={`tel:${SITE_CONTACT.primaryPhone}`}
                className="flex flex-col items-center justify-center cut-corner-badge bg-gradient-to-br from-[#fefce8] to-[#fef3c7] py-2 transition-all active:scale-90"
              >
                <FaPhoneAlt className="text-[13px] text-[#854d0e]" />
                <span className="mt-1 text-[7px] font-black uppercase tracking-tight text-[#854d0e]">Call Us</span>
              </a>

              <a
                href={SITE_CTA_LINKS.apply}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center cut-corner-badge bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] py-2 transition-all active:scale-90"
            >
                <FaPaperPlane className="text-[13px] text-[#1e3a8a]" />
                <span className="mt-1 text-[7px] font-black uppercase tracking-tight text-[#1e3a8a]">Apply</span>
              </a>

              <button
                type="button"
                onClick={openApplyModal}
                className="flex flex-col items-center justify-center cut-corner-badge bg-gradient-to-br from-[#fff7ed] to-[#ffedd5] py-2 transition-all active:scale-90"
              >
                <FaHeadset className="text-[13px] text-[#9a3412]" />
                <span className="mt-1 text-[7px] font-black uppercase tracking-tight text-[#9a3412]">Enquiry</span>
              </button>

              <Link
                to="/brochure"
                className="flex flex-col items-center justify-center cut-corner-badge bg-gradient-to-br from-[#fef2f2] to-[#fee2e2] py-2 transition-all active:scale-90"
              >
                <FaFileDownload className="text-[13px] text-[#991b1b]" />
                <span className="mt-1 text-[7px] font-black uppercase tracking-tight text-[#991b1b]">Brochure</span>
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

    </>
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

      {mounted && <PageLoader />}

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
