import type { DeveloperCMSState, Program } from "@/types/developer";

const levelFromProgramType = (programType?: Program["programType"]) => {
  if (programType === "UG") return "UG Program";
  if (programType === "PG") return "PG Program";
  if (programType === "PhD") return "Ph.D.";
  if (programType === "Diploma" || programType === "Certificate") return "Post Dip";
  if (programType === "Fellowship") return "Fellowship";
  return "Program";
};

const firstPartnerCode = (program?: Program) => {
  const first = Array.isArray(program?.trainingPartnerAssigned) ? program?.trainingPartnerAssigned?.[0] : "";
  return typeof first === "string" ? first.toUpperCase().trim() : "";
};

const isPublicEntity = (entity?: { visibility?: string; status?: string }) => {
  if (!entity) return false;
  const visibility = entity.visibility || "public";
  const status = entity.status || "live";
  return visibility === "public" && status !== "archived";
};

export function buildAcademicSchoolsFromCms(state: DeveloperCMSState) {
  const schools = [...(state.schools || [])]
    .filter((school) => isPublicEntity(school))
    .sort((a, b) => (a.displayOrder || 999) - (b.displayOrder || 999));
  const departments = [...(state.departments || [])]
    .filter((department) => isPublicEntity(department))
    .sort((a, b) => (a.displayOrder || 999) - (b.displayOrder || 999));
  const programs = [...(state.programs || [])].filter((program) => isPublicEntity(program));

  return schools.map((school) => ({
    id: school.id,
    slug: school.slug || "",
    name: school.name || "Untitled School",
    short: school.shortName || school.name || "",
    about: school.overview || school.description || "",
    departments: departments
      .filter((department) => department.schoolId === school.id)
      .map((department) => ({
        id: department.id,
        slug: department.slug || "",
        name: department.name || "Untitled Department",
        short: department.name || "",
        about: department.fullDescription || department.shortDescription || "",
        programs: programs
          .filter((program) => program.departmentId === department.id && program.schoolId === school.id)
          .map((program) => ({
            id: program.id,
            slug: program.slug || "",
            name: program.courseName || program.shortName || "Untitled Program",
            level: levelFromProgramType(program.programType),
            overview: program.fullOverview || program.shortOverview || program.curriculumSummary || "",
            outcomes: program.learningOutcomes || program.careerOutcomes || program.careerOpportunities || "",
            duration: program.duration || "",
            eligibility: program.eligibility || "",
            highlights: program.highlights || [],
            specializations: program.electives || [],
            partnerCode: firstPartnerCode(program),
            partnerLeadUrl: program.applyNowLink || program.primaryCtaLink || "",
          })),
      })),
  }));
}
