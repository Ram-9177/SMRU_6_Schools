import React from "react";
import { FaFilePdf, FaExternalLinkAlt } from "react-icons/fa";

type OfficialDocumentCardProps = {
  title: string;
  label: string;
  description: string;
  href: string;
  ctaLabel?: string;
};

export default function OfficialDocumentCard({
  title,
  label,
  description,
  href,
  ctaLabel = "View Document",
}: OfficialDocumentCardProps) {
  return (
    <article className="group relative bg-white border border-[#d8e8fb] cut-corner-panel p-6 shadow-[0_4px_20px_-4px_rgba(13,49,92,0.08)] transition-all hover:shadow-[0_12px_30px_-8px_rgba(13,49,92,0.15)] hover:-translate-y-1 overflow-hidden">
      <div className="absolute top-0 right-0 p-6 opacity-[0.02] grayscale pointer-events-none group-hover:opacity-[0.04] transition-opacity">
        <FaFilePdf className="text-8xl text-[#0d315c]" />
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-[#ffaf3a] mb-2">{title}</h3>
          <h4 className="text-lg sm:text-xl font-black text-[#0d315c] tracking-tight leading-tight mb-3 pr-8">{label}</h4>
          <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">
            {description}
          </p>
        </div>

        <div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${ctaLabel}: ${label}`}
            className="inline-flex items-center gap-3 bg-[#0d315c] hover:bg-[#019e6e] text-white px-6 py-3.5 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] shadow-lg transition-all active:scale-95"
          >
            <FaFilePdf size={14} />
            {ctaLabel}
            <FaExternalLinkAlt size={10} className="ml-1 opacity-70" />
          </a>
        </div>
      </div>
    </article>
  );
}
