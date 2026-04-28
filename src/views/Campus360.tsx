// @ts-nocheck
"use client";
import React, { useEffect } from "react";
import { Link } from "@/lib/router";
import SEO from "../components/SEO";
import { resolveAssetSrc } from "@/lib/shared/media";
const campusVideo = "/assets/campus_video_fallback.mp4";
import abstractHeroBg from "../assets/abstract-hero-bg.png";

const TOUR_EMBED_URL = "https://www.google.com/maps/embed?pb=!4v1726425600000!6m8!1m7!1sCqjunw4dGqkAAAQvOdM3Zg!2m2!1d17.3320062!2d78.7276328!3f260.33!4f0!5f0.7820865974627469";

export default function Campus360() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white min-h-screen">
      <SEO
        title="Campus 360° Tour | St. Mary's University"
        description="Explore St. Mary's University campus in an immersive 360° virtual tour."
      />

      {/* ================= HERO ================= */}
      <section
        className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden"
      >
        {/* Clean Institutional 'Light Wash' Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f0fdfa] via-[#f8fafc] to-[#eff6ff]" />

        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={resolveAssetSrc(abstractHeroBg)}
            alt="Abstract Background"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.05] scale-105"
          />
          {/* Smooth integration with content area */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/40" />
        </div>
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#019e6e] mb-6" data-reveal="fade-up">
            Immersive Experience
          </p>
          <h1 className="text-[clamp(2.5rem,8.5vw,7.5rem)] font-black font-outfit text-[#0d315c] uppercase leading-[0.85] tracking-tighter mb-8 flex flex-col items-center" data-reveal="fade-up" style={{ "--delay": "0.1s" }}>
            Campus 360°
            <span className="text-[#25b895] text-[0.4em] tracking-normal mt-4 block font-bold capitalize">
              St. Mary's University
            </span>
          </h1>
          <div className="mt-4 h-1.5 w-20 cut-corner-badge bg-[#ffaf3a] mx-auto" data-reveal="fade-up" style={{ "--delay": "0.15s" }} />
          <p className="text-sm md:text-lg text-[#0f1736] font-bold uppercase tracking-[0.2em] max-w-3xl mx-auto" data-reveal="fade-up" style={{ "--delay": "0.15s" }}>
            Experience the St. Mary's University legacy from anywhere in the world.
          </p>
        </div>
      </section>

      {/* ================= TOURS ================= */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12 space-y-24">
        
        {/* Video Tour */}
        <div className="space-y-10" data-reveal="fade-up">
           <div className="text-center">
              <h2 className="text-2xl md:text-4xl font-black text-[#0d315c] uppercase tracking-tight">Cinematic Campus Tour</h2>
              <div className="h-1.5 w-16 bg-[#25b895] mx-auto mt-4 cut-corner-badge" />
           </div>
           <div className="relative aspect-video cut-corner-panel overflow-hidden shadow-2xl border border-slate-100 ring-1 ring-slate-100 bg-black">
              <video
                preload="metadata"
                autoPlay loop muted playsInline controls
                className="h-full w-full object-cover"
              >
                <source src="/assets/campus_video.webm" type="video/webm" />
                <source src={campusVideo} type="video/mp4" />
              </video>
           </div>
        </div>

        {/* 360 View */}
        <div className="space-y-10" data-reveal="fade-up" style={{ "--delay": "0.1s" }}>
           <div className="text-center">
              <h2 className="text-2xl md:text-4xl font-black text-[#0d315c] uppercase tracking-tight">Immersive 360° Perspective</h2>
              <div className="h-1.5 w-16 bg-[#ffaf3a] mx-auto mt-4 cut-corner-badge" />
           </div>
           <div className="relative aspect-video cut-corner-panel overflow-hidden shadow-2xl border border-slate-100 ring-1 ring-slate-100">
              <iframe
                src={TOUR_EMBED_URL}
                title="St. Mary's University Campus 360 Tour"
                className="h-full w-full border-0"
              />
           </div>
        </div>

        {/* Tips & Visit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
           <div className="p-10 cut-corner-panel bg-slate-50 border border-slate-100" data-reveal="fade-right">
              <h3 className="text-xl font-black text-[#0d315c] mb-6">Interaction Tips</h3>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 cut-corner-badge bg-[#25b895] shadow-glow" /> Click and drag to look around</li>
                <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 cut-corner-badge bg-[#25b895] shadow-glow" /> Use scroll to zoom into details</li>
                <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 cut-corner-badge bg-[#25b895] shadow-glow" /> Click arrows to move between points</li>
              </ul>
           </div>
           
           <div className="p-10 cut-corner-panel bg-[#0d315c] shadow-2xl text-white flex flex-col justify-between" data-reveal="fade-left">
              <div>
                 <h3 className="text-xl font-black mb-4">Visit Us In Person</h3>
                 <p className="text-sm font-bold text-white/60 leading-relaxed max-w-sm">
                    Our physical campus at Deshmukhi is even more stunning. Plan your visit to meet the faculty and see our world-class labs.
                 </p>
              </div>
              <Link to="/contact" className="w-fit mt-8 px-8 py-3.5 cut-corner-badge bg-[#25b895] text-white font-black uppercase tracking-widest text-[11px] hover:scale-110 active:scale-95 transition-all">
                 Plan Your Visit
              </Link>
           </div>
        </div>

      </section>

      <style>{`
        :root { --ease-out: cubic-bezier(.22,.95,.36,1); }
        [data-reveal]{ opacity:0; transform: translateY(18px); transition: opacity .8s var(--ease-out), transform .8s var(--ease-out); transition-delay: var(--delay, 0s); }
        [data-reveal].is-visible{ opacity:1; transform:none; }
        [data-reveal=fade-right]{ transform: translateX(-24px); }
        [data-reveal=fade-left]{ transform: translateX(24px); }
        .shadow-glow { box-shadow: 0 0 10px rgba(37, 184, 149, 0.4); }
      `}</style>
    </main>
  );
}
