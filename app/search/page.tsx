import type { Metadata } from "next";
import SiteSearchClient from "@/components/search/SiteSearchClient";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Search SMRU Website",
  description: "Search St. Mary's Rehabilitation University website for schools, departments, programmes, admissions, campus information, law programmes, and public information pages.",
  pathname: "/search",
  keywords: ["SMRU search", "programme search", "admissions search", "school search", "university search"],
});

export default function Page() {
  return <SiteSearchClient />;
}
