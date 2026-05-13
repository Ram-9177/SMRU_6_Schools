export const lawPathname = "/law";

export const lawMetaDescription =
  "Explore the School of Law at St. Mary's Rehabilitation University, Hyderabad with integrated law programmes, LL.B., LL.M., Ph.D., moot court training, legal aid, legal research, and admissions guidance.";

export const lawProgrammes = [
  { slug: "ba-llb-hons", name: "B.A. LL.B. (Hons.) - Integrated", level: "UG", duration: "5 Years", eligibility: "10+2 with 45% aggregate" },
  { slug: "bba-llb-hons", name: "B.B.A. LL.B. (Hons.) - Integrated", level: "UG", duration: "5 Years", eligibility: "10+2 with 45% aggregate" },
  { slug: "bsc-llb-hons", name: "B.Sc. LL.B. (Hons.) - Integrated", level: "UG", duration: "5 Years", eligibility: "10+2 with 45% aggregate Science" },
  { slug: "llb-hons", name: "LL.B. (Hons.) - 3-Year", level: "UG", duration: "3 Years", eligibility: "Bachelor's Degree with 45%" },
  { slug: "llb-general", name: "LL.B. (General) - 3-Year", level: "UG", duration: "3 Years", eligibility: "Bachelor's Degree with 45%" },
  { slug: "llm", name: "LL.M.", level: "PG", duration: "1 Year", eligibility: "LL.B./B.L. with 55% + Entrance" },
  { slug: "phd-law", name: "Ph.D. in Law", level: "Doctoral", duration: "3-6 Years", eligibility: "LL.M. with 55% + NET/SET or Entrance" },
] as const;

export const lawHighlights = [
  "Moot court training",
  "Legal aid and community justice exposure",
  "Legal research and publication support",
  "ADR, negotiation, mediation, and arbitration practice",
  "Emerging law exposure including AI Regulation, Data Sovereignty, Cyber Law, Technology Law, and Forensic Jurisprudence",
  "Career readiness through internships, workshops, mock interviews, and professional guidance",
] as const;

export const lawFacilities = [
  {
    title: "Moot Court Hall",
    description: "Courtroom-style training space for simulated proceedings, advocacy practice, oral arguments, and moot court competitions.",
  },
  {
    title: "Digital Law Library",
    description: "Digital legal research support with legal texts, journals, case law references, and e-resources. Specific database subscriptions will be listed after official university publication.",
  },
  {
    title: "Legal Aid Cell",
    description: "Supports supervised legal literacy, rural legal aid camps, urban legal awareness, and access-to-justice initiatives.",
  },
  {
    title: "ADR & Arbitration Centre",
    description: "Training in negotiation, mediation, arbitration, drafting arbitration clauses, and dispute-resolution simulations.",
  },
  {
    title: "Research and Publication Cell",
    description: "Supports legal research, papers, seminars, conferences, publication activities, and academic writing practice.",
  },
  {
    title: "Career Guidance and Placement Cell",
    description: "Supports internships, bootcamps, resume workshops, mock interviews, and career guidance for legal career preparation.",
  },
] as const;

export const lawCareerPaths = [
  "Advocate",
  "Judicial Services",
  "Corporate Counsel / In-House Lawyer",
  "Legal Advisor / Consultant",
  "Public Prosecutor / Assistant Public Prosecutor",
  "Legal Analyst / Legal Researcher",
  "Law Firm Associate",
  "Civil Services",
  "NGO / Policy Work",
  "Legal Academia",
  "Arbitration and Mediation Specialist",
  "Doctoral Studies",
] as const;

export const lawVerificationNote =
  "Programme and recognition details should be read with official university notifications and published approval documents. Where a document is not published yet, applicants should use the official admissions/contact channels for verified guidance.";

export const findLawProgramme = (slug: string) => lawProgrammes.find((program) => program.slug === slug);
