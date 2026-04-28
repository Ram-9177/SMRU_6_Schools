import { redirect } from "next/navigation";
import { getPartnerAliasRedirect } from "@/lib/shared/route-registry";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("EDIN Partner | St. Mary's University", "/partner/edinbox");

export default function Page() {
  redirect(getPartnerAliasRedirect("edinbox"));
}
