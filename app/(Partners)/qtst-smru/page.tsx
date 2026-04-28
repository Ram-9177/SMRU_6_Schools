import { redirect } from "next/navigation";
import { getPartnerAliasRedirect } from "@/lib/shared/route-registry";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("QTST | St. Mary's University", "/qtst");

export default function Page() {
  redirect(getPartnerAliasRedirect("qtst-smru"));
}
