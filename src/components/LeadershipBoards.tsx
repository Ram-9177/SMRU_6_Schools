"use client";
// src/components/LeadershipBoards.jsx
import React from "react";
import { Link } from "@/lib/router";

/** Single card (no images). Order: Name → About → Designation: Role */
function Card({ m = {} as any }) {
  const name = m.name || "—";
  const role = m.role || "—";
  const about = m.about || "";

  return (
    <article className="cut-corner-panel bg-[#fdf2f4] p-8 transition-transform hover:scale-[1.01]">
      <h3 className="text-[17px] font-extrabold text-[#0d315c] leading-tight mb-2">
        {name}
      </h3>

      {about && (
        <p className="text-[14px] text-slate-600 font-medium leading-[1.6] mb-5">
          {about}
        </p>
      )}

      <div className="flex flex-wrap items-baseline gap-1.5 pt-1">
        <span className="text-[14px] font-black tracking-tight text-[#25b895]">
          Designation:
        </span>
        <span className="text-[14px] font-bold text-slate-800">{role}</span>
      </div>

      {m.slug && (
        <div className="mt-4">
          <Link
            to={`/leadership/${m.slug}`}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0d315c] hover:text-[#25b895] flex items-center gap-2 transition-colors"
          >
            Full Profile
            <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current border border-current cut-corner-badge p-0.5">
              <path d="M13.172 12 8.222 7.05l1.415-1.414L16 12l-6.364 6.364-1.414-1.414z" />
            </svg>
          </Link>
        </div>
      )}
    </article>
  );
}

function LeadershipBoards({ groups }: { groups?: Record<string, any[]> }) {
  const entries = Object.entries(groups || {}) as [string, any[]][];
  if (!entries.length) return null;

  return (
    <section id="governing-bodies" className="relative overflow-hidden bg-[#c8efdf] pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Background Header - Inspired by 2nd image style and placed at top */}
        <div className="relative mb-6 overflow-hidden px-2 pt-2 text-center md:mb-12 md:px-4 md:pt-4">
          <h2 className="pointer-events-none mx-auto w-full text-center text-[clamp(2.2rem,8.5vw,7rem)] font-black uppercase leading-[0.82] tracking-[-0.05em] text-[#25b895]/30 sm:whitespace-nowrap">
            GOVERNING BODIES
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative z-20">
          {entries.map(([title, members], idx) => (
            <div
              key={title}
              className="space-y-8"
              data-reveal="fade-up"
              style={{ "--delay": `${idx * 0.12}s` }}
            >
              <div className="inline-block px-5 py-2.5 cut-corner-badge bg-[#0d315c] text-white text-[13px] font-bold tracking-wide shadow-lg">
                 {title}
              </div>

              <div className="space-y-5">
                {members.map((m, i) => (
                  <Card key={i} m={m} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LeadershipBoards;
