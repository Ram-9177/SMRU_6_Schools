import { redirect } from "next/navigation";
import { getPartnerAliasRedirect } from "@/lib/shared/route-registry";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("IIAT | St. Mary's University", "/iiat");

export default function Page() {
  redirect(getPartnerAliasRedirect("university"));
}
