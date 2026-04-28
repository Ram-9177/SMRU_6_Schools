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
      <div className="relative flex flex-col items-center">
        <div className="relative">
          <img 
            src="/favicon.png" 
            alt="Loading..." 
            className="h-20 md:h-24 w-auto object-contain animate-premium-pulse"
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes premium-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        .animate-premium-pulse {
          animation: premium-pulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
}
