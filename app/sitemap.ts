import type { MetadataRoute } from "next";
import { leaders } from "../src/data/leaders";
import { schools } from "../src/data/schools";
import { INFO_PAGES } from "../src/lib/seo/info-pages";
import { SHOW_PUBLIC_INFO_PAGES } from "../src/lib/seo/visibility";
import { safeSlug } from "../src/lib/shared/program-utils";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://smru.edu.in";

// Build date used as lastModified for static routes
const LAST_MODIFIED = new Date("2026-04-28");

// Tier 1: Conversion & Trust pages — highest priority after homepage
const tier1Routes = ["/admissions", "/phd-admissions", "/schools", "/about", "/contact", "/law"];

// Tier 2: Academic catalogue & campus pages
const tier2Routes = [
  "/academic-structure",
  "/campus-360",
  "/brochure",
  "/careers",
  "/partner",
  "/leadership/all",
  "/search",
  "/schools/law",
  "/schools/law/legal-studies",
];

// Tier 3: Legal & utility pages — included for crawlability, low priority
const tier3Routes = [
  "/privacy-policy",
  "/terms-of-service",
  "/departments",
  "/niat",
  "/qtst",
  "/niat-upskilling",
  "/iiat",
  "/bb",
];

const partnerRoutes = [
  "/partner/bytexl",
  "/partner/edinbox",
  "/partner/edridge",
  "/partner/emversity",
  "/partner/ist",
  "/partner/mjiollnir",
  "/partner/nst",
  "/partner/onnbikes",
  "/partner/veloces",
];

const lawProgramRoutes = [
  "/schools/law/legal-studies/ba-llb-hons",
  "/schools/law/legal-studies/bba-llb-hons",
  "/schools/law/legal-studies/bsc-llb-hons",
  "/schools/law/legal-studies/llb-hons",
  "/schools/law/legal-studies/llb-general",
  "/schools/law/legal-studies/llm",
  "/schools/law/legal-studies/phd-law",
];

const infoPageRoutes = SHOW_PUBLIC_INFO_PAGES ? INFO_PAGES.map((page) => `/${page.slug}`) : [];

export default function sitemap(): MetadataRoute.Sitemap {
  const schoolRoutes: MetadataRoute.Sitemap = schools.flatMap((school) => {
    const schoolPath = `/schools/${safeSlug(school.slug, school.name)}`;
    const deptRoutes = (school.departments || []).flatMap((dept) => {
      const deptPath = `${schoolPath}/${safeSlug(dept.slug, dept.name)}`;
      const programRoutes: MetadataRoute.Sitemap = (dept.programs || []).map((program) => ({
        url: `${base}${deptPath}/${safeSlug(program.slug, program.name)}/`,
        lastModified: LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.7,
      }));
      return [
        { url: `${base}${deptPath}/`, lastModified: LAST_MODIFIED, changeFrequency: "monthly" as const, priority: 0.75 },
        ...programRoutes,
      ];
    });
    return [
      { url: `${base}${schoolPath}/`, lastModified: LAST_MODIFIED, changeFrequency: "monthly" as const, priority: 0.85 },
      ...deptRoutes,
    ];
  });

  const leadershipRoutes: MetadataRoute.Sitemap = (leaders || []).map((leader) => ({
    url: `${base}/leadership/${leader.slug}/`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const infoRoutes: MetadataRoute.Sitemap = infoPageRoutes.map((path) => ({
    url: `${base}${path}/`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const partnerEntries: MetadataRoute.Sitemap = partnerRoutes.map((path) => ({
    url: `${base}${path}/`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const lawProgramEntries: MetadataRoute.Sitemap = lawProgramRoutes.map((path) => ({
    url: `${base}${path}/`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.72,
  }));

  return [
    // Homepage — highest authority
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // Tier 1: Conversion pages
    ...tier1Routes.map((path) => ({
      url: `${base}${path}/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    // Tier 2: Academic catalogue pages
    ...tier2Routes.map((path) => ({
      url: `${base}${path}/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Tier 3: Utility pages
    ...tier3Routes.map((path) => ({
      url: `${base}${path}/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
    // Dynamic school/dept/program routes
    ...schoolRoutes,
    // Law programme aliases
    ...lawProgramEntries,
    // Leadership profiles
    ...leadershipRoutes,
    // Trust & disclosure info pages
    ...infoRoutes,
    // Partner routes
    ...partnerEntries,
  ];
}
