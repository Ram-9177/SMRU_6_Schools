import { redirect } from "next/navigation";
import { getPartnerAliasRedirect } from "@/lib/shared/route-registry";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("Mjiollnir Partner | St. Mary's University", "/partner/mjiollnir");

export default function Page() {
  redirect(getPartnerAliasRedirect("mjiollnir"));
}
