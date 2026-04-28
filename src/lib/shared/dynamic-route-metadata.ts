import type { Metadata } from "next";
import { schools } from "@/data/schools";
import { buildMetadata } from "@/lib/metadata";
import { findBySlugOrName } from "@/lib/shared/program-utils";

const trimText = (value: string, maxLength = 160) => {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;

  const clipped = normalized.slice(0, maxLength - 3).replace(/\s+\S*$/, "");
  return `${clipped}...`;
};

const buildProgramSummary = (program?: { duration?: string; eligibility?: string; fees?: string; overview?: string }) => {
  const parts = [
    program?.duration ? `Duration: ${program.duration}` : "",
    program?.eligibility ? `Eligibility: ${program.eligibility}` : "",
    program?.fees ? `Fees: ${program.fees}` : "",
  ].filter(Boolean);

  return parts.join(" | ");
};

export const getSchoolMetadata = (params: { schoolSlug: string }): Metadata => {
  const school = findBySlugOrName(schools, params.schoolSlug);
  const schoolName = school?.name || "Academic School";
  
  // Authority Pattern: [School Name] Admissions 2026 | SMRU Hyderabad
  const title = `${schoolName} Admissions 2026 | Top University in Hyderabad | SMRU`;
  const description = school?.about 
    ? `${school.about.substring(0, 150)}... Explore professional programs at St. Mary's Rehabilitation University, Hyderabad.` 
    : `Explore world-class academic programs and professional certifications at the ${schoolName}, St. Mary's Rehabilitation University.`;

  const isLaw = params.schoolSlug === "law";
  const customKeywords = isLaw 
    ? ["Integrated LLB Hyderabad", "Law College Telangana", "5 Year LLB Admissions", "B.A. LL.B. Hons"]
    : [];

  return buildMetadata({
    title,
    description,
    pathname: `/schools/${params.schoolSlug}`,
    keywords: [schoolName, "Admissions 2026", "Hyderabad University", "Top College Telangana", "SMRU", ...customKeywords],
  });
};

export const getDepartmentMetadata = (params: { schoolSlug: string; deptSlug: string }): Metadata => {
  const school = findBySlugOrName(schools, params.schoolSlug);
  const dept = findBySlugOrName(school?.departments as Array<{ slug?: string; name?: string; about?: string }> | undefined, params.deptSlug);
  
  const deptName = dept?.name || "Department";
  const schoolName = school?.name || "SMRU";
  
  // Authority Pattern: [Department] Admissions | [School] | SMRU Hyderabad
  const title = `${deptName} Admissions | ${schoolName} | SMRU Hyderabad`;
  const description = dept?.about 
    ? `${dept.about.substring(0, 160)}... Join the leading department for specialized studies at St. Mary's University.`
    : `Detailed curriculum and admission information for the ${deptName} under the ${schoolName} at St. Mary's Rehabilitation University.`;

  return buildMetadata({
    title,
    description,
    pathname: `/schools/${params.schoolSlug}/${params.deptSlug}`,
    keywords: [deptName, schoolName, "Direct Admissions", "Hyderabad", "SMRU"],
  });
};

export const getProgramMetadata = (params: { schoolSlug: string; deptSlug: string; programSlug: string }): Metadata => {
  const school = findBySlugOrName(schools, params.schoolSlug);
  const dept = findBySlugOrName(
    school?.departments as Array<{ slug?: string; name?: string; programs?: Array<{ slug?: string; name?: string; overview?: string }> }> | undefined,
    params.deptSlug
  );
  const program = findBySlugOrName(dept?.programs, params.programSlug);

  const programName = program?.name || "Program";
  const deptName = dept?.name || "Department";
  const programSummary = buildProgramSummary(program);
  
  // Authority Pattern: [Program Name] Admissions 2026 | Best University in Hyderabad | SMRU
  const title = `${programName} Admissions 2026 | SMRU Hyderabad`;
  const description = trimText(
    program?.overview
      ? `${program.overview} ${programSummary ? `${programSummary}.` : ""} Learn more about admissions, syllabus, and career outcomes for ${programName} at SMRU.`
      : `Explore ${programName} at St. Mary's Rehabilitation University. ${programSummary ? `${programSummary}. ` : ""}Get details on eligibility, syllabus, and career outcomes.`
  );

  return buildMetadata({
    title,
    description,
    pathname: `/schools/${params.schoolSlug}/${params.deptSlug}/${params.programSlug}`,
    keywords: [programName, deptName, "Hyderabad Admissions", "University Fees", "Eligibility", "Duration", "SMRU"],
  });
};
