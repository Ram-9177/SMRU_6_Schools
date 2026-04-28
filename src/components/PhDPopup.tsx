// @ts-nocheck
"use client";
import React, { useState, useEffect } from "react";

import { FaTimes } from "react-icons/fa";
import admissionsImg from "../assets/Phd Notification one.jpg";
import { Link } from "@/lib/router";

const PhDPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("phd_popup_v2");
    if (hasSeen) return;

    const showTimer = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem("phd_popup_v2", "true");
    }, 1200);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    if (timeLeft <= 0) { setIsVisible(false); return; }
    const tick = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(tick);
  }, [isVisible, timeLeft]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/50 px-4"
      onClick={() => setIsVisible(false)}
    >
      <div
        className="relative w-full max-w-sm sm:max-w-md md:max-w-lg cut-corner-panel overflow-hidden shadow-2xl animate-[phd-popup_0.4s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/90 hover:bg-white text-gray-700 cut-corner-badge flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Close popup"
        >
          <FaTimes size={13} />
        </button>

        {/* Countdown indicator */}
        <div className="absolute top-2 left-2 z-10 w-9 h-9 flex items-center justify-center">
          <svg className="absolute" width="36" height="36" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="14" fill="rgba(0,0,0,0.35)" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" />
            <circle
              cx="18" cy="18" r="14" fill="none"
              stroke="white" strokeWidth="2.5"
              strokeDasharray={`${2 * Math.PI * 14}`}
              strokeDashoffset={`${2 * Math.PI * 14 * (1 - timeLeft / 10)}`}
              strokeLinecap="round"
              transform="rotate(-90 18 18)"
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <span className="text-white text-[11px] font-bold relative z-10">{timeLeft}</span>
        </div>

        {/* The actual design image (Clickable Link → internal PhD page) */}
        <Link
          to="/phd-admissions"
          className="block w-full h-full transition-transform duration-500 hover:scale-[1.02] active:scale-95 group focus:outline-none"
          onClick={() => setIsVisible(false)}
        >
          <img
            src={admissionsImg.src}
            alt="PhD Admissions 2026-27 — Application End Date: 10 April 2026, Entrance Test: 26 April 2026"
            className="w-full h-auto block cut-corner-panel group-hover:brightness-105"
          />
          {/* Click Indicator (Floating Tooltip style) */}
          <div className="absolute bottom-6 right-6 px-4 py-2 bg-[#019e6e]/95 text-white font-black uppercase tracking-[0.15em] text-[10px] cut-corner-badge shadow-lg opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
            APPLY NOW ↗
          </div>
        </Link>
      </div>

      <style>{`
        @keyframes phd-popup {
          from { opacity: 0; transform: scale(0.88) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PhDPopup;
