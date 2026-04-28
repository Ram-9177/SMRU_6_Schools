"use client";

import { useMemo, useState } from "react";
import { Link } from "@/lib/router";
import { schools } from "@/data/schools";
import { lawCareerPaths, lawFacilities, lawHighlights, lawProgrammes } from "@/data/law";
import { INFO_PAGES } from "@/lib/seo/info-pages";
import { cleanProgramName, safeSlug } from "@/lib/shared/program-utils";

type SearchItem = {
  title: string;
  description: string;
  href: string;
  type: string;
  keywords: string;
};

const normalize = (value = "") => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const staticItems: SearchItem[] = [
  { title: "Home", description: "University overview, admissions highlights, campus, schools, and student support.", href: "/", type: "Page", keywords: "home smru university admissions campus" },
  { title: "About", description: "Institutional profile, leadership, journey, and university context.", href: "/about", type: "Page", keywords: "about leadership university profile" },
  { title: "Admissions", description: "UG, PG, diploma, and doctoral admissions guidance.", href: "/admissions", type: "Admissions", keywords: "admission apply eligibility fee scholarship" },
  { title: "Ph.D. Admissions", description: "Doctoral admissions notices, research routes, and application support.", href: "/phd-admissions", type: "Admissions", keywords: "phd doctoral research entrance" },
  { title: "Schools", description: "Academic schools, departments, and programme pathways.", href: "/schools", type: "Academics", keywords: "schools departments programmes courses" },
  { title: "Departments", description: "Department directory across schools and academic units.", href: "/departments", type: "Academics", keywords: "department directory academic units" },
  { title: "Campus 360", description: "Campus tour, facilities, hostel, and student environment.", href: "/campus-360", type: "Campus", keywords: "campus tour hostel facilities" },
  { title: "Contact", description: "Official phone, email, location, and admissions helpdesk details.", href: "/contact", type: "Contact", keywords: "contact phone email address helpdesk" },
  { title: "School of Law", description: "Law programmes, moot court, legal aid, research, LL.B., LL.M., and Ph.D. in Law.", href: "/law", type: "School", keywords: "law llb llm phd moot court legal aid" },
  { title: "School of Law - Academic Route", description: "School of Law academic directory route under schools.", href: "/schools/law", type: "School", keywords: "school law legal studies" }
];

function buildSearchItems(): SearchItem[] {
  const schoolItems = (schools || []).flatMap((school) => {
    const schoolSlug = safeSlug(school.slug, school.name);
    const schoolHref = `/schools/${schoolSlug}`;
    const schoolItem: SearchItem = {
      title: school.name || "School",
      description: school.about || "Explore this school and its programmes.",
      href: schoolHref,
      type: "School",
      keywords: `${school.name || ""} ${school.short || ""} ${school.about || ""}`
    };

    const departmentItems = (school.departments || []).flatMap((department) => {
      const deptSlug = safeSlug(department.slug, department.name);
      const deptHref = `${schoolHref}/${deptSlug}`;
      const deptItem: SearchItem = {
        title: department.name || "Department",
        description: department.about || `${school.name || "School"} department page.`,
        href: deptHref,
        type: "Department",
        keywords: `${school.name || ""} ${department.name || ""} ${department.about || ""}`
      };
      const programmeItems: SearchItem[] = (department.programs || []).map((program) => ({
        title: cleanProgramName(program.name || "Program"),
        description: program.overview || `${department.name || "Department"} programme under ${school.name || "SMRU"}.`,
        href: `${deptHref}/${safeSlug(program.slug, program.name)}`,
        type: "Programme",
        keywords: `${school.name || ""} ${department.name || ""} ${program.name || ""} ${program.level || ""} ${program.eligibility || ""} ${program.duration || ""} ${program.overview || ""}`
      }));
      return [deptItem, ...programmeItems];
    });

    return [schoolItem, ...departmentItems];
  });

  const lawProgrammeItems: SearchItem[] = lawProgrammes.map((program) => ({
    title: program.name,
    description: `${program.level} law programme. Duration: ${program.duration}. Eligibility: ${program.eligibility}.`,
    href: `/schools/law/legal-studies/${program.slug}`,
    type: "Law Programme",
    keywords: `${program.name} ${program.level} ${program.duration} ${program.eligibility} school of law llb llm phd`
  }));

  const lawSupportItems: SearchItem[] = [
    ...lawHighlights.map((title) => ({ title, description: "School of Law academic and professional learning feature.", href: "/law#law-in-action", type: "Law", keywords: `school of law ${title}` })),
    ...lawFacilities.map((item) => ({ title: item.title, description: item.description, href: "/law#facilities", type: "Facility", keywords: `law facility ${item.title} ${item.description}` })),
    ...lawCareerPaths.map((title) => ({ title, description: "Career path connected with law programmes.", href: "/law#careers", type: "Career", keywords: `law career ${title}` }))
  ];

  const infoItems: SearchItem[] = INFO_PAGES.map((page) => ({
    title: page.title,
    description: page.description || page.intro,
    href: `/${page.slug}`,
    type: page.pageType === "trust" ? "Disclosure" : page.pageType === "local" ? "Location" : "Information",
    keywords: `${page.title} ${page.description} ${page.eyebrow} ${(page.keywords || []).join(" ")}`
  }));

  return [...staticItems, ...schoolItems, ...lawProgrammeItems, ...lawSupportItems, ...infoItems];
}

export default function SiteSearchClient() {
  const [query, setQuery] = useState("");
  const items = useMemo(buildSearchItems, []);
  const results = useMemo(() => {
    const q = normalize(query);
    if (!q) return items.slice(0, 18);
    const terms = q.split(/\s+/).filter(Boolean);
    return items
      .map((item) => {
        const haystack = normalize(`${item.title} ${item.description} ${item.type} ${item.keywords}`);
        const score = terms.reduce((sum, term) => sum + (haystack.includes(term) ? 1 : 0) + (normalize(item.title).includes(term) ? 2 : 0), 0);
        return { item, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .slice(0, 40)
      .map(({ item }) => item);
  }, [items, query]);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f4f9ff_0%,#fbfdff_100%)] pt-[120px] md:pt-[136px] pb-16">
      <section className="px-4">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-[#dce7f3] bg-white px-6 py-10 shadow-[0_24px_44px_rgba(13,49,92,0.08)] md:px-12">
          <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#019e6e]">Site Search</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-[#0d315c] md:text-6xl">Search SMRU</h1>
          <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600 md:text-lg">
            Search schools, departments, programmes, admissions pages, law programmes, campus information, and public disclosure pages.
          </p>
          <label className="mt-8 block">
            <span className="sr-only">Search website</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search programmes, admissions, law, fee, hostel, contact..."
              className="w-full rounded-2xl border border-[#cddbea] bg-[#f8fbff] px-5 py-4 text-base font-semibold text-[#0d315c] outline-none ring-[#019e6e]/20 transition focus:border-[#019e6e] focus:ring-4"
              autoFocus
            />
          </label>
        </div>
      </section>

      <section className="px-4 pt-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-sm font-bold text-slate-500">{results.length} result{results.length === 1 ? "" : "s"}</p>
            {query && <button onClick={() => setQuery("")} className="text-xs font-black uppercase tracking-[0.16em] text-[#019e6e]">Clear</button>}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {results.map((item) => (
              <Link key={`${item.href}-${item.title}`} to={item.href} className="group rounded-3xl border border-[#dce7f3] bg-white p-5 shadow-[0_14px_32px_rgba(13,49,92,0.06)] transition hover:-translate-y-1 hover:border-[#019e6e] hover:shadow-[0_20px_42px_rgba(13,49,92,0.10)]">
                <span className="inline-flex rounded-full bg-[#e9f8f2] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#019e6e]">{item.type}</span>
                <h2 className="mt-4 text-xl font-black text-[#0d315c] group-hover:text-[#019e6e]">{item.title}</h2>
                <p className="mt-2 text-sm font-medium leading-7 text-slate-600">{item.description}</p>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-[#0d315c]/50">Open page →</p>
              </Link>
            ))}
          </div>
          {results.length === 0 && (
            <div className="rounded-3xl border border-[#dce7f3] bg-white p-8 text-center shadow-[0_14px_32px_rgba(13,49,92,0.06)]">
              <h2 className="text-2xl font-black text-[#0d315c]">No matching page found</h2>
              <p className="mt-3 text-sm font-medium text-slate-600">Try programme names, department names, admissions, law, hostel, fee, contact, or disclosure keywords.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
