"use client";
import { usePathname } from "next/navigation";
import { resolveApplyLink } from "@/lib/shared/site-constants";

export default function useOpenApply(defaultTarget = "auto") {
  const pathname = usePathname() || "";

  return (nextTarget) => {
    const target = typeof nextTarget === "string" ? nextTarget : defaultTarget;
    window.location.href = resolveApplyLink({ pathname, target });
  };
}
