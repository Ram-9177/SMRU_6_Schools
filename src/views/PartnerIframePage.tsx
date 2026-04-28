"use client";

import { useMemo } from "react";
import { Link } from "@/lib/router";
import SEO from "@/components/SEO";
import { useDeveloperCms } from "@/lib/developer/useDeveloperCms";
import { useIframeAutoHeight } from "@/hooks/useIframeAutoHeight";

export default function PartnerIframePage({ slug }: { slug: string }) {
  const { state } = useDeveloperCms();
  const { iframeRef, iframeHeight, handleIframeLoad, iframeScrolling, hasDynamicHeight } = useIframeAutoHeight(1600);
  const externalFallbackBySlug: Record<string, string> = {
    bytexl: "https://bytexl.com/smru.html",
    niat: "https://www.niatindia.com/external-universities/st.-mary-s-university",
    emversity: "https://emversity.com",
  };

  const partner = useMemo(() => {
    const key = (slug || "").toLowerCase();
    return (state.partners || []).find((item) => (item.slug || "").toLowerCase() === key) || null;
  }, [slug, state.partners]);

  const activeSlug = (partner?.slug || slug || "").toLowerCase();
  const isFullBleedLayout = true; // Global partner layout is now end-to-end as requested

  const iframeSrc =
    partner?.iframeUrl ||
    (partner?.redirectUrl?.startsWith("http") ? partner.redirectUrl : "") ||
    partner?.website ||
    externalFallbackBySlug[activeSlug] ||
    "";

  if (!partner) {
    const displayName = (slug || "Partner").toUpperCase().replace("-", " ");
    return (
      <section className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-3xl cut-corner-panel border border-slate-100 bg-white p-12 md:p-24 text-center shadow-[0_30px_60px_rgba(13,49,92,0.06)]">
          <h1 className="text-4xl md:text-7xl font-black text-[#0d315c] uppercase tracking-tighter opacity-[0.08] mb-4">
            {displayName}
          </h1>
          <p className="text-[11px] font-black uppercase tracking-[0.5em] text-[#019e6e] mb-10">
            Institutional Portal Coming Soon
          </p>
          <Link to="/partner" className="inline-flex cut-corner-badge bg-[#0d315c] px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#019e6e] transition-all hover:scale-105 active:scale-95 shadow-lg">
            Back to Directory
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <SEO
        title={`${partner.name || "Partner"} | St. Mary's University`}
        description={partner.shortDescription || `Explore ${partner.name || "our partner"} at St. Mary's University.`}
        canonical={`https://smru.edu.in/partner/${partner.slug || slug}`}
      />

      <section className={isFullBleedLayout ? "bg-white px-0 py-0" : "bg-white px-0 py-0 sm:px-4 sm:py-3 md:py-4"}>
        <div className={isFullBleedLayout ? "w-full" : "mx-auto max-w-screen-xl"}>

          {iframeSrc ? (
            <div
              className={
                isFullBleedLayout
                  ? "overflow-hidden bg-white"
                  : "overflow-hidden border-y border-slate-200 bg-white shadow-sm sm:cut-corner-panel sm:border"
              }
            >
              <iframe
                ref={iframeRef}
                title={`${partner.name || "Partner"} Portal`}
                src={iframeSrc}
                className="w-full border-0"
                loading="eager"
                scrolling={iframeScrolling}
                onLoad={handleIframeLoad}
                referrerPolicy="strict-origin-when-cross-origin"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                style={{ height: `${iframeHeight}px`, overflow: hasDynamicHeight ? "hidden" : "auto" }}
              />
            </div>
          ) : (
            <div className="cut-corner-panel border border-slate-100 bg-slate-50/50 p-20 text-center backdrop-blur-sm">
              <h2 className="text-4xl md:text-6xl font-black text-[#0d315c] uppercase tracking-tighter opacity-20">
                {partner.name}
              </h2>
              <p className="mt-4 text-[11px] font-black uppercase tracking-[0.4em] text-[#019e6e]">
                Portal Coming Soon
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
