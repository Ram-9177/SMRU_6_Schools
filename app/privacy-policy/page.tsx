import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | St. Mary's Rehabilitation University",
  description: "Privacy policy for St. Mary's Rehabilitation University website users.",
  pathname: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24 text-slate-800">
      <h1 className="text-4xl font-black text-[#0d315c]">Privacy Policy</h1>
      <p className="mt-4 text-sm text-slate-600">
        This page describes how St. Mary&apos;s University handles website visitor information and enquiry submissions.
      </p>
      <p className="mt-8 text-base leading-7">
        By using this website, you agree to the collection and processing of basic contact and enquiry data required for admissions support and communication. For policy-related queries, contact
        {" "}
        <a className="font-semibold text-[#0d315c] underline" href="mailto:reach@smru.edu.in">reach@smru.edu.in</a>.
      </p>
    </main>
  );
}
