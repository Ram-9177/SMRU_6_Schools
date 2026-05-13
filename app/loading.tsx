"use client";

import React from "react";

/**
 * Root Loading State (App Router)
 * Refactored to a subtle, non-blocking overlay.
 * Replaces the legacy full-screen white-out to prevent 'Wait' psychology.
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-slate-100 bg-white shadow-[0_18px_40px_rgba(13,49,92,0.08)]">
        <div className="h-8 w-8 rounded-full border-4 border-[#019e6e] border-t-transparent animate-premium-spin" />
      </div>

      <style jsx global>{`
        @keyframes premium-spin {
          to { transform: rotate(360deg); }
        }
        .animate-premium-spin {
          animation: premium-spin 0.9s linear infinite;
        }
      `}</style>
    </div>
  );
}
