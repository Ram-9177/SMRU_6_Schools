import type { Metadata } from "next";
import DeveloperAccessGate from "@/components/developer/DeveloperAccessGate";

export const metadata: Metadata = {
  title: "Developer CMS | SMRU",
  description: "Internal CMS control panel for SMRU website content operations.",
  robots: "noindex,nofollow",
};

export default function DeveloperPage() {
  return <DeveloperAccessGate />;
}
