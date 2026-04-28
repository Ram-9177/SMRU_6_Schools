"use client";
import { useEffect } from "react";
import { useLocation } from "@/lib/router";

export default function ScrollToTop({ smooth = true }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: smooth ? "smooth" : "auto",
            block: "start",
          });
        }, 100); // Small delay to ensure render
      }
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  }, [pathname, hash, smooth]);

  return null;
}
