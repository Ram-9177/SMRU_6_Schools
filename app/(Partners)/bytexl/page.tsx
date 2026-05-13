import { redirect } from "next/navigation";
import { getPartnerAliasRedirect } from "@/lib/shared/route-registry";
import { buildRedirectMetadata } from "@/lib/shared/redirect-metadata";

export const metadata = buildRedirectMetadata("ByteXL | St. Mary's Rehabilitation University", "https://bytexl.com/smru.html");

export default function Page() {
  redirect(getPartnerAliasRedirect("bytexl"));
}
