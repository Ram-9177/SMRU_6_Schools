import { redirect } from "next/navigation";
import { getPartnerAliasRedirect } from "@/lib/shared/route-registry";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("Newton School of Technology Partner | St. Mary's University", "/partner/nst");

export default function Page() {
  redirect(getPartnerAliasRedirect("nst"));
}
