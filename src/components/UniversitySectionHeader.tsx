import React from "react";

type Props = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  align?: "left" | "center";
  revealDelay?: string;
};

export default function UniversitySectionHeader({
  title,
  subtitle,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  align = "center",
  revealDelay = "0.05s",
}: Props) {
  const centered = align === "center";
  return (
    <div className={`relative ${className}`}>
      <h2
        className={`text-3xl md:text-5xl font-black font-outfit text-[#0d315c] tracking-tight uppercase leading-[0.95] ${centered ? "text-center" : ""} ${titleClassName}`}
        data-reveal="fade-up"
        style={{ "--delay": revealDelay } as React.CSSProperties}
      >
        {title}
      </h2>
      
      <div
        className={`mt-4 h-1 w-20 cut-corner-underline bg-[#ffaf3a] ${centered ? "mx-auto" : ""}`}
        data-reveal="fade-up"
        style={{ "--delay": "0.08s" } as React.CSSProperties}
      />

      {subtitle ? (
        <p
          className={`mt-5 text-sm md:text-lg text-slate-500 font-medium leading-relaxed ${centered ? "mx-auto text-center" : ""} ${subtitleClassName}`}
          data-reveal="fade-up"
          style={{ "--delay": "0.1s" } as React.CSSProperties}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
