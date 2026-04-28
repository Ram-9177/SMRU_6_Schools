import { redirect } from "next/navigation";
import { getPartnerAliasRedirect } from "@/lib/shared/route-registry";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("Edridge Partner | St. Mary's University", "/partner/edridge");

export default function Page() {
  redirect(getPartnerAliasRedirect("edridge"));
}
