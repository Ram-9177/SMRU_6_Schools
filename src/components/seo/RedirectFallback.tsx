import type { Metadata } from "next";
import { Link } from "@/lib/router";
import { absoluteUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Page Moved | St. Mary's Rehabilitation University",
  description: "This page has moved to the School of Law page.",
  robots: "noindex, follow",
  alternates: {
    canonical: "https://smru.edu.in/schools/law/",
  },
};

export default function RedirectPage() {
  const targetUrl = "/schools/law/";
  
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-slate-50">
      <div className="max-w-xl w-full bg-white p-10 md:p-16 cut-corner-panel border border-slate-200 shadow-xl text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-50 text-yellow-600 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-[#0d315c] uppercase tracking-tight mb-4">Page Has Moved</h1>
          <p className="text-slate-600 font-medium leading-relaxed">
            The content you are looking for has been relocated to the official <strong className="text-[#0d315c]">School of Law</strong> page.
          </p>
        </div>
        
        <div className="space-y-6">
          <Link 
            to={targetUrl}
            className="inline-flex items-center justify-center px-8 py-4 bg-[#0d315c] text-white font-black uppercase tracking-widest text-xs cut-corner-badge hover:bg-[#019e6e] transition-all transform hover:scale-105"
          >
            Go to School of Law
          </Link>
          
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Redirecting automatically in 5 seconds...
          </p>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              setTimeout(function() {
                window.location.href = "${targetUrl}";
              }, 5000);
            `,
          }}
        />
        <meta httpEquiv="refresh" content={`5;url=${targetUrl}`} />
      </div>
    </main>
  );
}
