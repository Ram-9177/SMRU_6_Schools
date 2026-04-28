import { redirect } from "next/navigation";
import { getPartnerAliasRedirect } from "@/lib/shared/route-registry";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("Emversity Partner | St. Mary's University", "/partner/emversity");

export default function Page() {
  redirect(getPartnerAliasRedirect("emversity"));
}
