import { redirect } from "next/navigation";
import { getPartnerAliasRedirect } from "@/lib/shared/route-registry";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("BlackBucks | St. Mary's Rehabilitation University", "/bb");

export default function Page() {
  redirect(getPartnerAliasRedirect("blackbucks"));
}
