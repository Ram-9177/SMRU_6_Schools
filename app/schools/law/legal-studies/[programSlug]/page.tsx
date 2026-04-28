import { redirect } from "next/navigation";
import { lawProgrammes } from "@/data/law";

export function generateStaticParams() {
  return lawProgrammes.map((program) => ({ programSlug: program.slug }));
}

export default function Page() {
  redirect("/law#programmes");
}
