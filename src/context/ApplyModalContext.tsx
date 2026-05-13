"use client";
import React, { createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { resolveApplyLink } from "@/lib/shared/site-constants";

export const ApplyModalContext = createContext(null);

export const useOpenApply = (defaultTarget = "auto") => {
  useContext(ApplyModalContext);
  const pathname = usePathname() || "";

  return (nextTarget) => {
    const target = typeof nextTarget === "string" ? nextTarget : defaultTarget;
    window.location.href = resolveApplyLink({ pathname, target });
  };
};

export const useApplyModal = () => {
  const context = useContext(ApplyModalContext);
  if (!context) return { showApplyModal: false, openApplyModal: () => {}, closeApplyModal: () => {} };
  return context;
};
