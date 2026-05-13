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
        className={`smru-title ${centered ? "text-center" : "text-left"} ${titleClassName}`}
        data-reveal="fade-up"
        style={{ "--delay": revealDelay } as React.CSSProperties}
      >
        {title}
      </h2>
      
      <div
        className={`mt-4 h-1.5 w-20 cut-corner-underline bg-[#ffaf3a] ${centered ? "mx-auto" : ""}`}
        data-reveal="fade-up"
        style={{ "--delay": "0.08s" } as React.CSSProperties}
      />

      {subtitle ? (
        <p
          className={`smru-sub ${centered ? "mx-auto text-center" : "text-left"} ${subtitleClassName}`}
          data-reveal="fade-up"
          style={{ "--delay": "0.1s" } as React.CSSProperties}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
