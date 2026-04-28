import { SITE_CONTACT, SITE_CTA_LINKS } from "@/lib/shared/site-constants";
import { MANUAL_VERIFICATION_LABEL, SEO_UPDATE_NOTE, UNIVERSITY_INFO } from "@/lib/shared/university";

export type InfoPageConfig = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  pageType?: "trust" | "local" | "research";
  keywords?: string[];
  answers: Array<{ question: string; answer: string }>;
  sections: Array<{ heading: string; paragraphs: string[] }>;
  faqItems: Array<{ question: string; answer: string }>;
  relatedLinks: Array<{ href: string; label: string; description: string }>;
  needsVerification?: string[];
  mapEmbedUrl?: string;
  statusNote?: string;
  footerDisclaimer?: string;
  documents?: Array<{ title: string; status: string; url?: string; lastUpdated?: string }>;
};

const admissionsLinks = [
  { href: "/admissions", label: "Admissions", description: "Official admissions route for UG, PG, diploma, and application support." },
  { href: "/contact", label: "Contact", description: "Admissions, campus, and support contact information." },
];

export const INFO_PAGES: InfoPageConfig[] = [
  {
    slug: "approvals-recognitions",
    title: "Approvals & Recognitions",
    description: "Official approvals, recognitions, and regulatory disclosure page for St. Mary's Rehabilitation University.",
    eyebrow: "Trust & Compliance",
    intro: "Approvals & Recognitions – Official Disclosure Page\n\nThis page serves as the official public reference for all approvals, recognitions, and statutory compliance records of St. Mary’s Rehabilitation University.\n\nAll information published here is subject to verification and is updated in accordance with regulatory requirements.",
    statusNote: "Current Status: Pending publication and administrative verification\n\nOnly documents officially published on this page should be treated as valid for regulatory confirmation.",
    footerDisclaimer: "Regulatory Disclaimer:\n\nSt. Mary’s Rehabilitation University is committed to transparency and regulatory compliance.\n\nAll approvals and recognitions must be verified through officially published documents on this page.\nThe university does not assume responsibility for interpretations made without verified disclosures.",
    pageType: "trust",
    keywords: ["UGC", "Approval", "Verification", "Official", "Disclosure", "recognitions", "university disclosure"],
    answers: [
      { question: "What is this page for?", answer: "**Official public reference.**\n→ Serves as the primary disclosure location for all statutory and regulatory compliance records." },
      { question: "Are the approval documents published here?", answer: "**Pending publication.**\n→ Verified documents will be uploaded after official administrative confirmation." },
      { question: "How should students verify public claims?", answer: "**Use official documentation only.**\n→ Cross-reference all claims with verified documents published on this official university page." },
      { question: "What if a document is not available yet?", answer: "**Treat as pending verification.**\n→ Missing documents are currently undergoing administrative review and are not yet confirmed for public disclosure." },
    ],
    sections: [
      {
        heading: "Verification Protocol",
        paragraphs: [
          "• All documents are reviewed and approved by the university administration before publication",
          "• No external claims should be considered valid without official documentation",
          "• Applicants are advised to verify information through this page before taking admission decisions"
        ],
      },
      {
        heading: "Public Disclosure Status",
        paragraphs: [
          "Official approval and recognition documents are currently under administrative verification.",
          "Until documents are published, any regulatory claim should be treated as provisional and subject to confirmation.",
        ],
      },
    ],
    documents: [
      { title: "UGC Recognition / Status Document", status: "Pending Verification" },
      { title: "University Establishment Act", status: "Pending Verification" },
      { title: "Regulatory Approvals (RCI / AICTE / Others)", status: "Pending Verification" },
      { title: "Affiliation / Recognition Letters", status: "Pending Verification" },
    ],
    faqItems: [
      { question: "Can I rely on this page for verification?", answer: "**Yes, once documents are published.**\n→ This page is the official reference point for verified approvals." },
      { question: "How can I confirm approval status today?", answer: "**Contact the university directly.**\n→ Use official contact channels for real-time clarification." },
      { question: "Does this page confirm all approvals already?", answer: "**Under manual verification.**\n→ Only uploaded and verified documents should be treated as final." },
      { question: "Where can I ask for clarification?", answer: "**Official email or admissions desk.**\n→ Use the contact directory for authorized communication channels." },
    ],
    relatedLinks: [
      { href: "/mandatory-disclosure", label: "Mandatory Disclosure", description: "Detailed statutory disclosures as per UGC guidelines" },
      { href: "/ugc-disclosure", label: "UGC Disclosure", description: "Dedicated page for UGC-related verification and documents" },
      { href: "/rci-disclosure", label: "RCI Disclosure", description: "Regulator-specific disclosures related to rehabilitation programs" },
      { href: "/admissions", label: "Admissions", description: "Official admission process and application support" },
      { href: "/contact", label: "Contact", description: "Direct communication for verification and assistance" },
    ],
    needsVerification: ["Approval documents", "Recognition documents", "Regulator-specific public claims"],
  },
  {
    slug: "mandatory-disclosure",
    title: "Mandatory Disclosure",
    description: "Public disclosure and institution information page for St. Mary's Rehabilitation University.",
    eyebrow: "Mandatory Disclosure",
    intro: "This page is reserved for official public disclosure information published by the university administration.",
    pageType: "trust",
    answers: [
      { question: "What is a mandatory disclosure page?", answer: "It is the public page where institution-level disclosures and official documents are organized for students, parents, and public review." },
      { question: "Is every disclosure already uploaded?", answer: `${MANUAL_VERIFICATION_LABEL}. Official documents and details will be updated here after verification by the university administration.` },
      { question: "Can I rely on draft or missing information?", answer: "Use only verified public documents and official contact channels for final confirmation." },
      { question: "Where can I find current admissions support?", answer: "Use the admissions and contact pages for current application and enquiry guidance." },
    ],
    sections: [
      {
        heading: "Document Publishing Note",
        paragraphs: [
          "Official documents and details will be updated here after verification by the university administration.",
          "If a document is not visible yet, treat it as pending publication rather than confirmed or unavailable.",
        ],
      },
    ],
    faqItems: [
      { question: "What should be checked before admission?", answer: "Review admissions information, public disclosures, fee information, and direct contact responses before making a final decision." },
      { question: "How do I request missing information?", answer: `Use ${SITE_CONTACT.email} or the public contact routes to request clarification.` },
    ],
    relatedLinks: [
      { href: "/approvals-recognitions", label: "Approvals & Recognitions", description: "Trust and recognition overview page." },
      { href: "/contact-directory", label: "Contact Directory", description: "Public contact points listed on the website." },
      ...admissionsLinks,
    ],
    needsVerification: ["Disclosure document set", "Upload dates", "Document owners"],
  },
  {
    slug: "ugc-disclosure",
    title: "UGC Disclosure",
    description: "UGC disclosure placeholder page for St. Mary's Rehabilitation University public verification.",
    eyebrow: "UGC Disclosure",
    intro: "This page is reserved for verified UGC-related public information and official disclosure documents.",
    pageType: "trust",
    answers: [
      { question: "Does this page confirm UGC status today?", answer: `${MANUAL_VERIFICATION_LABEL}. Official documents and details will be updated here after verification by the university administration.` },
      { question: "Why is this page still useful?", answer: "It provides a stable public location where verified UGC-related information can be published and referenced." },
      { question: "How should applicants use this page?", answer: "Use it as a public verification checkpoint before relying on regulator-related statements." },
      { question: "What if the page is still empty?", answer: SEO_UPDATE_NOTE },
    ],
    sections: [
      {
        heading: "Verification Note",
        paragraphs: [
          "Only published and verified disclosure documents should be treated as official confirmation.",
        ],
      },
    ],
    faqItems: [
      { question: "Can I use this page as proof if documents are missing?", answer: "No. Public proof depends on verified documents being published on the page." },
      { question: "Where can I request confirmation?", answer: `Use ${SITE_CONTACT.email} or the admissions page for official support.` },
    ],
    relatedLinks: [
      { href: "/approvals-recognitions", label: "Approvals & Recognitions", description: "Institution-level trust and disclosure overview." },
      { href: "/mandatory-disclosure", label: "Mandatory Disclosure", description: "Public disclosure index page." },
      ...admissionsLinks,
    ],
    needsVerification: ["UGC document references", "Official recognition wording"],
  },
  {
    slug: "rci-disclosure",
    title: "RCI Disclosure",
    description: "RCI disclosure placeholder page for public verification on the SMRU website.",
    eyebrow: "RCI Disclosure",
    intro: "This page is reserved for verified RCI-related public information and official disclosure documents where applicable.",
    pageType: "trust",
    answers: [
      { question: "Is RCI information published here?", answer: `${MANUAL_VERIFICATION_LABEL}. Official documents and details will be updated here after verification by the university administration.` },
      { question: "Why is this disclosure important?", answer: "It helps applicants verify regulator-linked statements using a single public reference page." },
      { question: "Should students rely on program marketing language alone?", answer: "No. Regulator-related statements should be checked against verified public documents." },
      { question: "What happens when the documents are verified?", answer: "This page can be updated with official references and linked from relevant program pages." },
    ],
    sections: [
      {
        heading: "Disclosure Publishing Note",
        paragraphs: [
          "Where the website references RCI-related context, this page should be used for verified public documentation rather than marketing copy.",
        ],
      },
    ],
    faqItems: [
      { question: "Does this page confirm regulator status for every program?", answer: "No. Program-level claims still require verified public documentation." },
      { question: "Where can I follow up?", answer: `Use ${SITE_CONTACT.email} or the admissions page for formal clarification.` },
    ],
    relatedLinks: [
      { href: "/approvals-recognitions", label: "Approvals & Recognitions", description: "Institution-level trust and disclosure overview." },
      { href: "/mandatory-disclosure", label: "Mandatory Disclosure", description: "Public disclosure index page." },
      ...admissionsLinks,
    ],
    needsVerification: ["RCI document references", "Program-level applicability"],
  },
  {
    slug: "admission-policy",
    title: "Admission Policy",
    description: "Admission policy and application guidance for St. Mary's Rehabilitation University.",
    eyebrow: "Admissions",
    intro: "This page consolidates public admission guidance from the website and marks missing policy details for manual verification.",
    pageType: "trust",
    answers: [
      { question: "How do I apply to SMRU?", answer: "Use the official application route for UG, PG, and diploma programs or the dedicated Ph.D. admissions page for doctoral routes." },
      { question: "What should I review before applying?", answer: "Check program pages, eligibility notes, official disclosures, fee information, and contact support before final submission." },
      { question: "Are seat matrix and intake details available here?", answer: `${MANUAL_VERIFICATION_LABEL}. Official intake and seat allocation details should be published only after administrative confirmation.` },
      { question: "Where can I ask admission questions?", answer: `Use the admissions and contact pages or email ${SITE_CONTACT.email}.` },
    ],
    sections: [
      {
        heading: "Application Route",
        paragraphs: [
          "UG, PG, and diploma applicants should use the official admissions/application route linked on the website.",
          "Doctoral applicants should use the Ph.D. admissions page and related official application route where applicable.",
        ],
      },
    ],
    faqItems: [
      { question: "Are admission deadlines the same for every program?", answer: `${MANUAL_VERIFICATION_LABEL}. Confirm deadlines on the specific admissions or notice pages.` },
      { question: "Are required documents listed publicly for every program?", answer: `${MANUAL_VERIFICATION_LABEL}. Use program pages and admissions support for current requirements.` },
    ],
    relatedLinks: [
      { href: "/refund-policy", label: "Refund Policy", description: "Fee refund information page." },
      { href: "/fee-structure", label: "Fee Structure", description: "Fee information placeholder page." },
      { href: "/phd-admissions", label: "Ph.D. Admissions", description: "Doctoral admissions route and notices." },
      ...admissionsLinks,
    ],
    needsVerification: ["Admission policy document", "Program-wise intake", "Document checklist"],
  },
  {
    slug: "refund-policy",
    title: "Refund Policy",
    description: "Refund policy placeholder page for St. Mary's Rehabilitation University.",
    eyebrow: "Fees & Policies",
    intro: "This page is reserved for verified fee refund and withdrawal policy details published by the university administration.",
    pageType: "trust",
    answers: [
      { question: "Is the refund policy published here?", answer: `${MANUAL_VERIFICATION_LABEL}. Official documents and details will be updated here after verification by the university administration.` },
      { question: "Should applicants assume refund timelines or deductions?", answer: "No. Refund timelines, deductions, and policy conditions must be taken only from verified public documents." },
      { question: "Where can I ask about fee payments?", answer: `Use the admissions and contact pages or email ${SITE_CONTACT.email} for official clarification.` },
      { question: "What if the policy is not available yet?", answer: SEO_UPDATE_NOTE },
    ],
    sections: [
      {
        heading: "Policy Publishing Note",
        paragraphs: [
          "Refund, withdrawal, and cancellation terms will be updated here after verification by the university administration.",
        ],
      },
    ],
    faqItems: [
      { question: "Can I rely on verbal refund guidance?", answer: "Always ask for verified written guidance or a published policy reference." },
      { question: "Is fee structure enough to understand refunds?", answer: "No. Refund policy and fee structure should be read together when available." },
    ],
    relatedLinks: [
      { href: "/fee-structure", label: "Fee Structure", description: "Fee information placeholder page." },
      { href: "/admission-policy", label: "Admission Policy", description: "Admission and application guidance page." },
      ...admissionsLinks,
    ],
    needsVerification: ["Refund timeline", "Deduction rules", "Withdrawal process"],
  },
  {
    slug: "fee-structure",
    title: "Fee Structure",
    description: "Fee structure placeholder page for St. Mary's Rehabilitation University.",
    eyebrow: "Fees & Policies",
    intro: "This page is reserved for verified fee information published by the university administration.",
    pageType: "trust",
    answers: [
      { question: "Is the official fee structure available here?", answer: `${MANUAL_VERIFICATION_LABEL}. Official documents and details will be updated here after verification by the university administration.` },
      { question: "Should fee amounts on marketing pages be treated as final?", answer: "Final fee confirmation should come from verified public fee documents or official admissions communication." },
      { question: "Can I compare programs here?", answer: "This page will support program-wise fee references once official data is published." },
      { question: "Where can I ask for current fee guidance?", answer: `Use the admissions and contact pages or email ${SITE_CONTACT.email}.` },
    ],
    sections: [
      {
        heading: "Fee Publication Note",
        paragraphs: [
          "Official fee documents and details will be updated here after verification by the university administration.",
        ],
      },
    ],
    faqItems: [
      { question: "Are hostel or transport fees included here?", answer: `${MANUAL_VERIFICATION_LABEL}. Separate verified fee references may apply to those services.` },
      { question: "Does this page replace the refund policy?", answer: "No. Fee structure and refund policy should be reviewed together when both are published." },
    ],
    relatedLinks: [
      { href: "/refund-policy", label: "Refund Policy", description: "Fee refund and withdrawal information." },
      { href: "/admission-policy", label: "Admission Policy", description: "Admissions and policy guidance." },
      ...admissionsLinks,
    ],
    needsVerification: ["Program-wise tuition", "Hostel fee policy", "Installment structure"],
  },
  {
    slug: "anti-ragging",
    title: "Anti-Ragging",
    description: "Anti-ragging policy placeholder page for St. Mary's Rehabilitation University.",
    eyebrow: "Student Support",
    intro: "This page is reserved for verified anti-ragging policy and reporting information published by the university administration.",
    pageType: "trust",
    answers: [
      { question: "Where can students find the anti-ragging policy?", answer: `${MANUAL_VERIFICATION_LABEL}. Official documents and details will be updated here after verification by the university administration.` },
      { question: "How should a student report a concern?", answer: "Use the official grievance and contact routes until the public anti-ragging contact structure is published here." },
      { question: "Is there a dedicated reporting contact on this page today?", answer: `${MANUAL_VERIFICATION_LABEL}.` },
      { question: "What if a student needs urgent help?", answer: `Use the website contact routes and emergency contact information listed on the public contact page.` },
    ],
    sections: [
      {
        heading: "Policy and Reporting Note",
        paragraphs: [
          "The public anti-ragging policy, reporting process, and responsible contact points will be updated here after verification by the university administration.",
        ],
      },
    ],
    faqItems: [
      { question: "Is the grievance page related to anti-ragging reporting?", answer: "Yes. The grievance route can serve as a public support path until dedicated anti-ragging information is published." },
      { question: "Should students rely on unofficial contacts?", answer: "Use public website contacts and verified institutional channels." },
    ],
    relatedLinks: [
      { href: "/grievance-redressal", label: "Grievance Redressal", description: "Public grievance support and escalation page." },
      { href: "/contact-directory", label: "Contact Directory", description: "Public contact points listed on the website." },
      { href: "/contact", label: "Contact", description: "Contact page with phone, email, and campus location." },
    ],
    needsVerification: ["Anti-ragging policy document", "Committee details", "Reporting contacts"],
  },
  {
    slug: "grievance-redressal",
    title: "Grievance Redressal",
    description: "Public grievance redressal placeholder page for St. Mary's Rehabilitation University.",
    eyebrow: "Student Support",
    intro: "This page is reserved for the verified grievance redressal process and escalation contacts published by the university administration.",
    pageType: "trust",
    answers: [
      { question: "What is the grievance redressal page for?", answer: "It is the public page where students, parents, and stakeholders can find the official grievance route and escalation information." },
      { question: "Is the grievance workflow fully published?", answer: `${MANUAL_VERIFICATION_LABEL}. Official documents and details will be updated here after verification by the university administration.` },
      { question: "How can I contact the university today?", answer: `Use ${SITE_CONTACT.email}, the public phone numbers, or the contact page for current support.` },
      { question: "Does this page include committee names?", answer: `${MANUAL_VERIFICATION_LABEL}.` },
    ],
    sections: [
      {
        heading: "Escalation Publishing Note",
        paragraphs: [
          "The verified grievance workflow, response timelines, and responsible contacts will be updated here after official confirmation.",
        ],
      },
    ],
    faqItems: [
      { question: "Can I use the general contact page for immediate support?", answer: "Yes. The contact page remains the current public route for general support and follow-up." },
      { question: "Are escalation timelines public?", answer: `${MANUAL_VERIFICATION_LABEL}.` },
    ],
    relatedLinks: [
      { href: "/contact-directory", label: "Contact Directory", description: "Public contact references on the website." },
      { href: "/contact", label: "Contact", description: "Phone, email, and campus location page." },
      { href: "/anti-ragging", label: "Anti-Ragging", description: "Anti-ragging placeholder and support page." },
    ],
    needsVerification: ["Committee members", "Escalation matrix", "Timeline commitments"],
  },
  {
    slug: "contact-directory",
    title: "Contact Directory",
    description: "Public contact directory for St. Mary's Rehabilitation University.",
    eyebrow: "Public Directory",
    intro: "This page collects public contact information already available on the website for admissions, enquiries, and campus communication.",
    pageType: "trust",
    answers: [
      { question: "What is the main admissions contact?", answer: `${SITE_CONTACT.primaryPhone} and ${SITE_CONTACT.email}` },
      { question: "What is the WhatsApp contact?", answer: `Use the official WhatsApp route: ${UNIVERSITY_INFO.whatsapp}` },
      { question: "Where is the campus located?", answer: UNIVERSITY_INFO.address },
      { question: "What are the office hours?", answer: UNIVERSITY_INFO.officeHours },
    ],
    sections: [
      {
        heading: "Published Contact Points",
        paragraphs: [
          `Primary phone: ${SITE_CONTACT.primaryPhone}`,
          `Secondary phone: ${SITE_CONTACT.secondaryPhone}`,
          `Email: ${SITE_CONTACT.email}`,
          `Emergency contact listed on the website: ${UNIVERSITY_INFO.emergencyPhone}`,
        ],
      },
    ],
    faqItems: [
      { question: "Where should I start for admissions support?", answer: "Use the primary phone, email, or admissions/contact pages for first-response support." },
      { question: "Is there a campus location reference on the site?", answer: "Yes. The website includes the Deshmukhi campus location and a map reference." },
    ],
    relatedLinks: [
      { href: "/contact", label: "Contact", description: "Full contact page with map and admissions helpdesk." },
      { href: "/campus-location-hyderabad", label: "Campus Location", description: "Hyderabad campus location page." },
      { href: "/visit-campus", label: "Visit Campus", description: "Campus visit information page." },
    ],
  },
  {
    slug: "academic-calendar",
    title: "Academic Calendar",
    description: "Academic calendar placeholder page for St. Mary's Rehabilitation University.",
    eyebrow: "Academic Planning",
    intro: "This page is reserved for the verified academic calendar published by the university administration.",
    pageType: "trust",
    answers: [
      { question: "Is the academic calendar published here today?", answer: `${MANUAL_VERIFICATION_LABEL}. Official documents and details will be updated here after verification by the university administration.` },
      { question: "What should students check in the meantime?", answer: "Use official notices, admissions updates, and direct contact with the university for time-sensitive information." },
      { question: "Will this page include semester dates?", answer: "Yes, once verified calendar information is published publicly." },
      { question: "Where can I check admissions notices now?", answer: "Use the admissions and Ph.D. admissions pages and public notices already published on the site." },
    ],
    sections: [
      {
        heading: "Calendar Publishing Note",
        paragraphs: [
          "Academic schedules, semester timelines, holidays, and examination references will be updated here after official confirmation.",
        ],
      },
    ],
    faqItems: [
      { question: "Should students rely on informal date updates?", answer: "Use verified public notices and official contact channels instead." },
      { question: "Will program-specific schedules appear here?", answer: `${MANUAL_VERIFICATION_LABEL}.` },
    ],
    relatedLinks: [
      { href: "/admissions", label: "Admissions", description: "Admissions route and current application guidance." },
      { href: "/phd-admissions", label: "Ph.D. Admissions", description: "Doctoral notices and application links." },
      { href: "/contact", label: "Contact", description: "Official contact route for follow-up questions." },
    ],
    needsVerification: ["Semester dates", "Exam schedule", "Holiday calendar"],
  },
  {
    slug: "faculty-directory",
    title: "Faculty Directory",
    description: "Faculty directory placeholder page for St. Mary's Rehabilitation University.",
    eyebrow: "Public Directory",
    intro: "This page is reserved for verified faculty directory information published by the university administration.",
    pageType: "trust",
    answers: [
      { question: "Is the faculty directory fully published here?", answer: `${MANUAL_VERIFICATION_LABEL}. Official faculty listings and profiles will be updated here after verification by the university administration.` },
      { question: "Why is this page important?", answer: "It provides a stable public location for verified faculty names, departments, and academic roles." },
      { question: "Should students rely on unverified faculty claims elsewhere?", answer: "Use only verified public directory information and official contact routes for confirmation." },
      { question: "How can I ask for updated faculty information?", answer: `Use ${SITE_CONTACT.email} or the contact page for official clarification.` },
    ],
    sections: [
      {
        heading: "Directory Publishing Note",
        paragraphs: [
          "Faculty names, academic roles, departments, and profile references should appear on this page only after administrative verification.",
        ],
      },
    ],
    faqItems: [
      { question: "Will department-wise faculty details appear here?", answer: "Yes, once verified directory information is published publicly." },
      { question: "Does this page confirm faculty strength today?", answer: `${MANUAL_VERIFICATION_LABEL}.` },
    ],
    relatedLinks: [
      { href: "/schools", label: "Schools", description: "Academic schools and department routes." },
      { href: "/departments", label: "Departments", description: "Department directory and academic page routes." },
      { href: "/contact", label: "Contact", description: "Public contact route for clarification." },
    ],
    needsVerification: ["Faculty names", "Designations", "Department assignments", "Profile links"],
  },
  {
    slug: "ombudsperson",
    title: "Ombudsperson",
    description: "Ombudsperson and escalation placeholder page for St. Mary's Rehabilitation University.",
    eyebrow: "Student Support",
    intro: "This page is reserved for verified ombudsperson and formal escalation information published by the university administration.",
    pageType: "trust",
    answers: [
      { question: "Is the ombudsperson contact published here today?", answer: `${MANUAL_VERIFICATION_LABEL}. Official names, roles, and escalation details will be updated here after verification by the university administration.` },
      { question: "What is the purpose of this page?", answer: "It provides a stable public location for higher-level grievance escalation information." },
      { question: "Should students use this page for routine enquiries?", answer: "Routine admissions and general enquiries should still use the public contact and grievance routes first." },
      { question: "Where can I raise questions meanwhile?", answer: `Use ${SITE_CONTACT.email} or the grievance redressal page for current public contact routes.` },
    ],
    sections: [
      {
        heading: "Escalation Publishing Note",
        paragraphs: [
          "Formal escalation contacts, office details, and public guidance will be updated here after official confirmation.",
        ],
      },
    ],
    faqItems: [
      { question: "Does this page replace the grievance process?", answer: "No. The grievance redressal route and ombudsperson route serve different stages of escalation." },
      { question: "Can this page be cited before details are verified?", answer: "Only as a placeholder location, not as final proof of contact details." },
    ],
    relatedLinks: [
      { href: "/grievance-redressal", label: "Grievance Redressal", description: "Primary public grievance workflow page." },
      { href: "/contact", label: "Contact", description: "Public contact page." },
      { href: "/admission-policy", label: "Admission Policy", description: "Admissions guidance and public policy references." },
    ],
    needsVerification: ["Ombudsperson name", "Contact details", "Escalation workflow"],
  },
  {
    slug: "iqac-quality-assurance",
    title: "IQAC & Quality Assurance",
    description: "IQAC and quality assurance placeholder page for St. Mary's Rehabilitation University.",
    eyebrow: "Quality Assurance",
    intro: "This page is reserved for verified internal quality assurance and quality-process information published by the university administration.",
    pageType: "trust",
    answers: [
      { question: "Is IQAC information published here today?", answer: `${MANUAL_VERIFICATION_LABEL}. Official documents and quality-process details will be updated here after verification by the university administration.` },
      { question: "Why is this page useful?", answer: "It provides a stable public location for verified quality assurance references, reports, and institutional process updates." },
      { question: "Will reports and committee details appear here?", answer: `${MANUAL_VERIFICATION_LABEL}.` },
      { question: "Where can I ask about academic quality processes meanwhile?", answer: `Use ${SITE_CONTACT.email} or the public contact routes for official clarification.` },
    ],
    sections: [
      {
        heading: "Quality Publishing Note",
        paragraphs: [
          "Quality assurance reports, committee information, and related public records should appear here only after administrative verification.",
        ],
      },
    ],
    faqItems: [
      { question: "Does this page confirm accreditation or ranking claims?", answer: "No. Claims still require separate verified public documents." },
      { question: "Can this page link to official reports later?", answer: "Yes. It is intended to serve as the public reference location for that material." },
    ],
    relatedLinks: [
      { href: "/approvals-recognitions", label: "Approvals & Recognitions", description: "Trust and public disclosure overview." },
      { href: "/mandatory-disclosure", label: "Mandatory Disclosure", description: "Institution-level public disclosure page." },
      { href: "/contact", label: "Contact", description: "Public contact route for follow-up." },
    ],
    needsVerification: ["Committee details", "Reports", "Public quality documents"],
  },
  {
    slug: "public-information",
    title: "Public Information",
    description: "Public information placeholder page for St. Mary's Rehabilitation University.",
    eyebrow: "Public Information",
    intro: "This page is reserved for verified public information references published by the university administration.",
    pageType: "trust",
    answers: [
      { question: "What is this page for?", answer: "It provides a single public location for verified institutional information links and public records." },
      { question: "Is every public document already available here?", answer: `${MANUAL_VERIFICATION_LABEL}. Official documents and references will be updated here after verification by the university administration.` },
      { question: "How should applicants use this page?", answer: "Use it together with admissions, disclosures, fee, and contact pages for public verification." },
      { question: "Where can I request missing details?", answer: `Use ${SITE_CONTACT.email} or the contact page for official follow-up.` },
    ],
    sections: [
      {
        heading: "Publishing Note",
        paragraphs: [
          "This page is intended to consolidate public information references once the university administration verifies and publishes them.",
        ],
      },
    ],
    faqItems: [
      { question: "Does this page replace admissions or contact pages?", answer: "No. It complements those pages by acting as a public reference index." },
      { question: "Can this page include links to future disclosures?", answer: "Yes, once those disclosures are verified for publication." },
    ],
    relatedLinks: [
      { href: "/mandatory-disclosure", label: "Mandatory Disclosure", description: "Institution-level disclosure page." },
      { href: "/contact-directory", label: "Contact Directory", description: "Public contact reference page." },
      { href: "/approvals-recognitions", label: "Approvals & Recognitions", description: "Trust and disclosure overview." },
    ],
    needsVerification: ["Public records index", "Linked documents", "Publication dates"],
  },
  {
    slug: "statutory-bodies",
    title: "Statutory Bodies",
    description: "Statutory bodies placeholder page for St. Mary's Rehabilitation University.",
    eyebrow: "Governance",
    intro: "This page is reserved for verified information about statutory bodies and institutional governance structures published by the university administration.",
    pageType: "trust",
    answers: [
      { question: "Are statutory body details listed here today?", answer: `${MANUAL_VERIFICATION_LABEL}. Official details will be updated after verification by the university administration.` },
      { question: "Why is this page important?", answer: "It provides a stable public location for governance and institutional oversight information." },
      { question: "Will meeting records or members be published here?", answer: `${MANUAL_VERIFICATION_LABEL}.` },
      { question: "How can I contact the university meanwhile?", answer: `Use ${SITE_CONTACT.email} or the contact page for official follow-up.` },
    ],
    sections: [
      {
        heading: "Governance Publishing Note",
        paragraphs: [
          "Committee names, terms, and related governance documents should appear on this page only after administrative verification.",
        ],
      },
    ],
    faqItems: [
      { question: "Does this page replace leadership profiles?", answer: "No. Leadership profiles and governance disclosures serve different public purposes." },
      { question: "Can applicants request governance information?", answer: "Yes. Use the public contact routes for clarification." },
    ],
    relatedLinks: [
      { href: "/about", label: "About", description: "About the university and leadership overview." },
      { href: "/leadership", label: "Leadership", description: "University leadership overview page." },
      { href: "/contact", label: "Contact", description: "Public contact route for questions." },
    ],
    needsVerification: ["Committee structures", "Members", "Meeting records"],
  },
  {
    slug: "research",
    title: "Research",
    description: "Research and doctoral study information for St. Mary's Rehabilitation University.",
    eyebrow: "Research & Doctoral Studies",
    intro: "This page supports public discovery of doctoral and research-oriented information already referenced across the website.",
    pageType: "research",
    answers: [
      { question: "What research route is visible on the website?", answer: "The website highlights Ph.D. admissions and doctoral study pathways across multiple academic areas." },
      { question: "Where should I start for doctoral applications?", answer: "Use the dedicated Ph.D. admissions page and official doctoral application route." },
      { question: "Are guide lists, labs, and funded projects published here?", answer: `${MANUAL_VERIFICATION_LABEL}.` },
      { question: "How can I contact the university about research?", answer: `Use ${SITE_CONTACT.email} or the admissions/contact pages for official guidance.` },
    ],
    sections: [
      {
        heading: "Current Public Research Surface",
        paragraphs: [
          "The current website publicly exposes doctoral admissions, research-focused academic pathways, and related contact routes.",
          "Detailed research centers, guide lists, and project inventories should be published only after verification.",
        ],
      },
    ],
    faqItems: [
      { question: "Does this page confirm every research facility?", answer: `${MANUAL_VERIFICATION_LABEL}.` },
      { question: "Where can I review doctoral admissions now?", answer: "Use the Ph.D. admissions page for current notices and application guidance." },
    ],
    relatedLinks: [
      { href: "/phd-admissions", label: "Ph.D. Admissions", description: "Doctoral admissions route and notices." },
      { href: "/admissions", label: "Admissions", description: "General admissions page for cross-reference." },
      { href: "/contact", label: "Contact", description: "Official contact route for research enquiries." },
    ],
    needsVerification: ["Research centers", "Faculty guide list", "Project inventory"],
  },
  {
    slug: "campus-location-hyderabad",
    title: "Campus Location Hyderabad",
    description: "Campus location, address, and contact information for St. Mary's Rehabilitation University in Hyderabad.",
    eyebrow: "Local SEO",
    intro: "This page consolidates the public campus address and contact information already available on the website for Hyderabad searches.",
    pageType: "local",
    keywords: ["university in Hyderabad", "rehabilitation university Hyderabad", "campus location Hyderabad"],
    answers: [
      { question: "Where is St. Mary's Rehabilitation University located?", answer: UNIVERSITY_INFO.address },
      { question: "Which city and state is the campus in?", answer: `${UNIVERSITY_INFO.city}, ${UNIVERSITY_INFO.state}, India.` },
      { question: "How can I contact the campus?", answer: `Use ${SITE_CONTACT.primaryPhone} or ${SITE_CONTACT.email}.` },
      { question: "Is there a map reference?", answer: "Yes. The public contact page includes a campus map reference for Deshmukhi." },
    ],
    sections: [
      {
        heading: "Campus Address",
        paragraphs: [UNIVERSITY_INFO.address],
      },
      {
        heading: "How to Reach",
        paragraphs: [
          "Use the public campus address and map reference for route planning by road.",
          "For visit coordination or navigation support, contact the admissions/helpdesk team before travel.",
        ],
      },
    ],
    faqItems: [
      { question: "Can I visit the Hyderabad campus?", answer: "Yes. Use the visit campus and contact pages to coordinate before travel." },
      { question: "Does the website list local support contacts?", answer: "Yes. Phone, email, and WhatsApp contact routes are already published on the website." },
    ],
    relatedLinks: [
      { href: "/visit-campus", label: "Visit Campus", description: "Campus visit and counselling information." },
      { href: "/how-to-reach-smru", label: "How to Reach SMRU", description: "Travel planning and contact guidance." },
      { href: "/contact", label: "Contact", description: "Public contact page with map and helpdesk." },
    ],
    mapEmbedUrl: UNIVERSITY_INFO.mapEmbedUrl,
  },
  {
    slug: "visit-campus",
    title: "Visit Campus",
    description: "Campus visit information for St. Mary's Rehabilitation University in Hyderabad.",
    eyebrow: "Visit SMRU",
    intro: "This page is designed for students and families who want to plan a campus visit using the public information already available on the website.",
    pageType: "local",
    answers: [
      { question: "Can I plan a campus visit from the website?", answer: "Yes. The website publishes contact details, the campus address, and the admissions helpdesk route for visit coordination." },
      { question: "What information should I keep ready before visiting?", answer: "Keep your program interests, contact information, and preferred visit timing ready before speaking with the admissions team." },
      { question: "Where is the campus?", answer: UNIVERSITY_INFO.address },
      { question: "Who should I contact before visiting?", answer: `Use ${SITE_CONTACT.primaryPhone}, ${SITE_CONTACT.email}, or the admissions/helpdesk route.` },
    ],
    sections: [
      {
        heading: "Visit Planning",
        paragraphs: [
          "Campus visits and counselling are referenced on the website through admissions and contact support flows.",
          "For a smoother visit, contact the university before travel so your visit can align with public office hours and current availability.",
        ],
      },
      {
        heading: "Public Visit Contacts",
        paragraphs: [
          `Phone: ${SITE_CONTACT.primaryPhone}`,
          `Email: ${SITE_CONTACT.email}`,
          `Office hours listed on the website: ${UNIVERSITY_INFO.officeHours}`,
        ],
      },
    ],
    faqItems: [
      { question: "Is the campus map available online?", answer: "Yes. The public contact information includes a campus map reference for Deshmukhi." },
      { question: "Can I combine a campus visit with admissions counselling?", answer: "Yes. Use the admissions helpdesk or contact page to coordinate before arrival." },
    ],
    relatedLinks: [
      { href: "/campus-location-hyderabad", label: "Campus Location Hyderabad", description: "Campus address and location page." },
      { href: "/how-to-reach-smru", label: "How to Reach SMRU", description: "Travel planning and contact guidance." },
      { href: "/contact", label: "Contact", description: "Public contact page with map and helpdesk." },
    ],
    mapEmbedUrl: UNIVERSITY_INFO.mapEmbedUrl,
  },
  {
    slug: "how-to-reach-smru",
    title: "How to Reach SMRU",
    description: "Travel planning and route guidance for reaching St. Mary's Rehabilitation University.",
    eyebrow: "Travel Guidance",
    intro: "This page organizes public location and contact information so visitors can plan how to reach the SMRU campus safely.",
    pageType: "local",
    answers: [
      { question: "How do I reach St. Mary's Rehabilitation University by road?", answer: "Use the public campus address and map reference available on the website, then confirm travel details with the admissions or contact team if needed." },
      { question: "What campus address should I use for navigation?", answer: UNIVERSITY_INFO.address },
      { question: "Is a map available?", answer: "Yes. The website includes a public map reference for the Deshmukhi campus." },
      { question: "Whom should I contact if I need navigation help?", answer: `Use ${SITE_CONTACT.primaryPhone} or ${SITE_CONTACT.email}.` },
    ],
    sections: [
      {
        heading: "Route Planning",
        paragraphs: [
          "Use the published campus address for route planning and map search.",
          "If your travel depends on visit timings, coordinate with the admissions/helpdesk team before departure.",
        ],
      },
      {
        heading: "Public Navigation Reference",
        paragraphs: [UNIVERSITY_INFO.address],
      },
    ],
    faqItems: [
      { question: "Does the site publish exact distance markers?", answer: `${MANUAL_VERIFICATION_LABEL}. Use the map reference and direct contact support for current navigation guidance.` },
      { question: "Can I use this page for visit coordination?", answer: "Yes. Pair it with the visit campus and contact pages for route and timing support." },
    ],
    relatedLinks: [
      { href: "/visit-campus", label: "Visit Campus", description: "Campus visit planning page." },
      { href: "/campus-location-hyderabad", label: "Campus Location Hyderabad", description: "Campus address and location page." },
      { href: "/contact", label: "Contact", description: "Public contact page with map and helpdesk." },
    ],
    mapEmbedUrl: UNIVERSITY_INFO.mapEmbedUrl,
  },
  {
    slug: "vision-mission",
    title: "Vision & Mission",
    description: "Core values, vision, and mission of St. Mary's Rehabilitation University.",
    eyebrow: "Our Identity",
    intro: "St. Mary's Rehabilitation University is built on a foundation of service, excellence, and inclusivity.",
    pageType: "trust",
    answers: [
      { question: "What is the university's vision?", answer: "To be a global leader in rehabilitation sciences and allied health education." },
      { question: "What is the mission?", answer: "To empower students with clinical expertise, ethical values, and research-driven innovation." },
    ],
    sections: [
      {
        heading: "Core Values",
        paragraphs: ["Academic Excellence", "Clinical Innovation", "Social Inclusivity", "Ethical Leadership"],
      },
    ],
    faqItems: [
      { question: "What is SMRU's vision for 2030?", answer: "To become India's premier multi-disciplinary rehabilitation research hub." },
      { question: "Is the mission inclusive?", answer: "Yes, our mission explicitly focuses on accessible education for all strata of society." },
    ],
    relatedLinks: [{ href: "/about", label: "About SMRU", description: "Legacy and leadership overview." }],
  },
  {
    slug: "governance",
    title: "Governance",
    description: "Administrative structure and governing bodies of St. Mary's Rehabilitation University.",
    eyebrow: "Administration",
    intro: "The university is governed by a distinguished board of administrators, academicians, and industry experts.",
    pageType: "trust",
    answers: [
      { question: "Who governs the university?", answer: "The Board of Management and Academic Council oversee institutional governance." },
    ],
    sections: [
      {
        heading: "Administrative Hierarchy",
        paragraphs: ["Chancellor", "Vice-Chancellor", "Registrar", "Deans of Schools"],
      },
    ],
    faqItems: [
      { question: "Who is the executive head of the university?", answer: "The Vice-Chancellor oversees day-to-day academic and administrative operations." },
      { question: "Is there a student representative body?", answer: "Yes, student councils are involved in various academic and cultural committees." },
    ],
    relatedLinks: [{ href: "/about", label: "Leadership Profiles", description: "Meet our academic leaders." }],
  },
  {
    slug: "statutory-disclosures",
    title: "Statutory Disclosures",
    description: "Official statutory and regulatory disclosure hub for St. Mary's Rehabilitation University.",
    eyebrow: "Transparency",
    intro: "Consolidated public reference for all statutory filings and regulatory compliance records.",
    pageType: "trust",
    answers: [
      { question: "Where can I find approval letters?", answer: "All verified approval letters are organized in the Approvals & Recognitions section." },
    ],
    sections: [
      {
        heading: "Compliance Repository",
        paragraphs: ["UGC Filings", "RCI Certifications", "State Private University Act records"],
      },
    ],
    faqItems: [
      { question: "Are statutory records updated annually?", answer: "Yes, all disclosures are updated as per the regulatory cycle of the UGC and State Government." },
    ],
    relatedLinks: [
      { href: "/approvals-recognitions", label: "Approvals", description: "Regulatory approval certificates." },
      { href: "/mandatory-disclosure", label: "Mandatory Disclosure", description: "Public disclosure data." },
    ],
  },
  {
    slug: "scholarships",
    title: "Scholarships & Aid",
    description: "Financial aid, merit scholarships, and student support programs at SMRU.",
    eyebrow: "Student Support",
    intro: "We believe in rewarding merit and supporting talent through specialized scholarship programs.",
    pageType: "trust",
    answers: [
      { question: "Is merit-based scholarship available?", answer: "Yes, up to 50% scholarship is available for qualifying students based on academic performance." },
    ],
    sections: [
      {
        heading: "Scholarship Categories",
        paragraphs: ["Merit-based Support", "Sports & Talent Aid", "Social Category Assistance"],
      },
    ],
    faqItems: [
      { question: "How to apply for scholarships?", answer: "Students can apply through the official admissions portal during the application process." },
      { question: "Can I get a 100% scholarship?", answer: "Currently, we offer up to 50% merit-based support for top academic performers." },
    ],
    relatedLinks: [
      { href: "/admissions", label: "Apply Now", description: "Start your admission process." },
      { href: "/fee-structure", label: "Fee Structure", description: "View program-wise fees." },
    ],
  },
  {
    slug: "placements",
    title: "Placements & Careers",
    description: "Career outcomes, recruitment partners, and placement records at SMRU.",
    eyebrow: "Career Outcomes",
    intro: "Dedicated to ensuring every graduate is career-ready through clinical training and industry integration.",
    pageType: "trust",
    answers: [
      { question: "Which companies recruit from SMRU?", answer: "Leading healthcare organizations, rehabilitation centers, and technology firms." },
      { question: "Is there a placement cell?", answer: "Yes, a dedicated Career Development Cell provides training and recruitment support." },
    ],
    sections: [
      {
        heading: "Placement Support",
        paragraphs: ["Resume Workshops", "Mock Interviews", "Clinical Internships", "Campus Recruitment"],
      },
    ],
    faqItems: [
      { question: "Does the university guarantee placements?", answer: "We provide comprehensive placement support and recruitment opportunities with top partners." },
    ],
    relatedLinks: [{ href: "/careers", label: "Careers", description: "Join our faculty team." }],
  },
  {
    slug: "internal-complaints-committee",
    title: "Internal Complaints Committee (ICC)",
    description: "ICC details and POSH compliance at St. Mary's Rehabilitation University.",
    eyebrow: "Student Safety",
    intro: "Ensuring a safe and inclusive environment for all students and staff as per statutory guidelines.",
    pageType: "trust",
    answers: [
      { question: "What is the ICC?", answer: "The committee responsible for handling complaints related to harassment and ensuring campus safety." },
    ],
    sections: [
      {
        heading: "Reporting Process",
        paragraphs: ["Confidential reporting via email", "Committee review within specified timelines"],
      },
    ],
    faqItems: [
      { question: "How to contact the ICC?", answer: "You can reach the ICC via the official safety email listed in the contact directory." },
    ],
    relatedLinks: [{ href: "/grievance-redressal", label: "Grievance Cell", description: "General student grievance support." }],
  },
  {
    slug: "hostel",
    title: "Hostel & Residential Life",
    description: "On-campus residential facilities for boys and girls at SMRU Hyderabad.",
    eyebrow: "Campus Life",
    intro: "A home away from home with modern facilities, safe environments, and nutritious dining.",
    pageType: "trust",
    answers: [
      { question: "Are hostels available on campus?", answer: "Yes, separate residential wings are available for boys and girls with 24/7 security." },
    ],
    sections: [
      {
        heading: "Facilities",
        paragraphs: ["Wi-Fi Connectivity", "Medical Room", "Indoor Sports", "Laundry Services"],
      },
    ],
    faqItems: [
      { question: "Is AC accommodation available?", answer: "Yes, both AC and non-AC options are available in our residential wings." },
    ],
    relatedLinks: [{ href: "/campus-360", label: "Virtual Tour", description: "Explore the campus virtually." }],
  },
  {
    slug: "library",
    title: "Library Resources",
    description: "Academic library, digital resources, and reading rooms at SMRU.",
    eyebrow: "Academic Hub",
    intro: "Our library is a treasure trove of knowledge with thousands of books and international journals.",
    pageType: "trust",
    answers: [
      { question: "Is there a digital library?", answer: "Yes, students have access to international journals and e-book repositories." },
    ],
    sections: [
      {
        heading: "Inventory",
        paragraphs: ["10,000+ Books", "E-Journal Access", "Specialized Rehab Collections"],
      },
    ],
    faqItems: [
      { question: "Can I access the library online?", answer: "Yes, our digital library is accessible to all registered students via the student portal." },
    ],
    relatedLinks: [{ href: "/schools", label: "Schools", description: "Browse academic programs." }],
  },
  {
    slug: "labs",
    title: "Labs & Research Infrastructure",
    description: "State-of-the-art clinical and technical labs at St. Mary's University.",
    eyebrow: "Technical Infrastructure",
    intro: "Modern laboratories designed for clinical practice, technical innovation, and hands-on learning.",
    pageType: "trust",
    answers: [
      { question: "What kind of labs are available?", answer: "Clinical Psychology labs, Anatomy labs, Engineering workshops, and Computer centers." },
    ],
    sections: [
      {
        heading: "Specialized Labs",
        paragraphs: ["Rehabilitation Tech Lab", "Audiology Diagnostics", "Skill Labs"],
      },
    ],
    faqItems: [
      { question: "Are the labs RCI compliant?", answer: "Yes, all specialized rehabilitation labs meet the standards set by regulatory bodies." },
    ],
    relatedLinks: [{ href: "/research", label: "Research", description: "Doctoral research pathways." }],
  },
  {
    slug: "transport",
    title: "Transport & Connectivity",
    description: "University bus services and connectivity for students and staff.",
    eyebrow: "Utility",
    intro: "Reliable transport services connecting the campus to key locations in Hyderabad.",
    pageType: "trust",
    answers: [
      { question: "Is bus transport available?", answer: "Yes, the university operates a fleet of buses covering major routes in Hyderabad and Secunderabad." },
    ],
    sections: [
      {
        heading: "Route Planning",
        paragraphs: ["Major Pickup Points", "GPS Tracking", "Safe Commute Protocols"],
      },
    ],
    faqItems: [
      { question: "Is transport available for faculty?", answer: "Yes, staff bus services cover major metropolitan routes." },
    ],
    relatedLinks: [{ href: "/contact", label: "Contact Us", description: "Get route-specific details." }],
  },
  {
    slug: "naac",
    title: "NAAC",
    description: "NAAC accreditation and quality cycle information for SMRU.",
    eyebrow: "Quality Cycle",
    intro: "Committed to the highest standards of institutional quality and academic excellence.",
    pageType: "trust",
    answers: [
      { question: "What is the NAAC status?", answer: "The university follows the prescribed quality cycles for national accreditation." },
    ],
    sections: [
      {
        heading: "Quality Initiatives",
        paragraphs: ["SSR Preparation", "Internal Quality Audits", "Academic Excellence Frameworks"],
      },
    ],
    faqItems: [
      { question: "When is the next NAAC audit?", answer: "The university is currently in the active cycle of quality framework implementation." },
    ],
    relatedLinks: [{ href: "/iqac-quality-assurance", label: "IQAC", description: "Internal Quality Assurance Cell." }],
  },
  {
    slug: "nirf",
    title: "NIRF",
    description: "National Institutional Ranking Framework (NIRF) data and participation.",
    eyebrow: "Rankings",
    intro: "Transparency in institutional performance data as per national ranking frameworks.",
    pageType: "trust",
    answers: [
      { question: "Does SMRU participate in NIRF?", answer: "Yes, the university provides required data captures for national ranking frameworks." },
    ],
    sections: [
      {
        heading: "Data Captures",
        paragraphs: ["Student Strength", "Faculty Details", "Financial Resources", "Research Output"],
      },
    ],
    faqItems: [
      { question: "Where is the NIRF data published?", answer: "Public data captures are available in the Statutory Disclosures section of this website." },
    ],
    relatedLinks: [{ href: "/statutory-disclosures", label: "Statutory Disclosures", description: "Public disclosure hub." }],
  },
  {
    slug: "university-in-telangana",
    title: "University in Telangana",
    description: "Leading state private university in Telangana for rehabilitation and health sciences.",
    eyebrow: "Regional Excellence",
    intro: "St. Mary's Rehabilitation University is a pioneering institution established under the Telangana State Private Universities Act.",
    pageType: "trust",
    answers: [
      { question: "Is SMRU a private university in Telangana?", answer: "Yes, it is established as a State Private University in Telangana with a focus on specialized education." },
    ],
    sections: [
      {
        heading: "Educational Impact in Telangana",
        paragraphs: ["Bridging the gap in healthcare education", "Local employment and clinical training initiatives"],
      },
    ],
    faqItems: [
      { question: "Where is SMRU located in Telangana?", answer: "The university is located in Deshmukhi, Yadadri Bhuvanagiri district, near Hyderabad." },
      { question: "Which courses are offered at SMRU?", answer: "SMRU offers specialized programs in Physiotherapy, Audiology, Occupational Therapy, and Special Education." },
    ],
    relatedLinks: [{ href: "/approvals-recognitions", label: "Approvals", description: "State and national approvals." }],
  },
  {
    slug: "physiotherapy-college-in-telangana",
    title: "Physiotherapy College in Telangana",
    description: "Top-ranked BPT and MPT programs at SMRU, Telangana.",
    eyebrow: "Clinical Expertise",
    intro: "One of the most advanced centers for physiotherapy education in Telangana, offering UG, PG, and PhD pathways.",
    pageType: "trust",
    answers: [
      { question: "What is the best physiotherapy college in Telangana?", answer: "SMRU offers industry-integrated BPT programs with specialized clinical tracks." },
    ],
    sections: [
      {
        heading: "BPT & MPT Excellence",
        paragraphs: ["Advanced mobilization labs", "Clinical partnerships with top Hyderabad hospitals"],
      },
    ],
    faqItems: [
      { question: "What are the eligibility criteria for BPT in Telangana?", answer: "Candidates typically need to have completed 10+2 with Biology, Physics, and Chemistry." },
      { question: "Does SMRU have clinical tie-ups?", answer: "Yes, we have partnerships with leading multispecialty hospitals for hands-on clinical training." },
    ],
    relatedLinks: [{ href: "/schools/health-allied-health-sciences/physiotherapy", label: "Department of Physiotherapy", description: "View all physiotherapy programs." }],
  },
  {
    slug: "baslp-college-in-hyderabad",
    title: "BASLP College in Hyderabad",
    description: "Premier BASLP and Audiology institute in Hyderabad, Telangana.",
    eyebrow: "Specialized Sciences",
    intro: "A dedicated center for Speech and Hearing sciences in Hyderabad, offering RCI-approved BASLP and M.Sc. programs.",
    pageType: "trust",
    answers: [
      { question: "Where can I study BASLP in Hyderabad?", answer: "St. Mary's Rehabilitation University offers specialized BASLP courses near Ramoji Film City." },
    ],
    sections: [
      {
        heading: "Audiology & Speech Hub",
        paragraphs: ["State-of-the-art Audiology labs", "RCI-approved curriculum and clinical training"],
      },
    ],
    faqItems: [
      { question: "Is SMRU BASLP course RCI approved?", answer: "SMRU follows RCI guidelines and is in the process of official document verification for its specialized speech and hearing programs." },
      { question: "What are the career options after BASLP?", answer: "Graduates can work as Audiologists, Speech Pathologists, or Clinical Supervisors in hospitals and rehabilitation centers." },
    ],
    relatedLinks: [{ href: "/schools/rehabilitation-sciences/audiology-speech-sciences/baslp", label: "BASLP Program", description: "View program details." }],
  },
  {
    slug: "campus-near-ramoji-film-city",
    title: "Campus Near Ramoji Film City",
    description: "SMRU Deshmukhi Campus location guide and directions near Ramoji Film City, Hyderabad.",
    eyebrow: "Location Guide",
    intro: "Strategically located at the edge of the Hyderabad metropolitan area, our campus offers a serene environment for specialized learning.",
    pageType: "trust",
    answers: [
      { question: "How far is the campus from Ramoji Film City?", answer: "The SMRU Deshmukhi campus is located approximately 5 minutes from the main entrance of Ramoji Film City." },
    ],
    sections: [
      {
        heading: "Visitor Information",
        paragraphs: ["Directions from Hyderabad city center", "Proximity to key regional landmarks", "Local transport and bus services"],
      },
    ],
    faqItems: [
      { question: "How to reach SMRU from Hyderabad?", answer: "You can take the Vijayawada highway and follow the signs for Ramoji Film City to reach Deshmukhi." },
      { question: "Is there university transport available?", answer: "Yes, SMRU provides shuttle services from major hubs in Hyderabad city." },
    ],
    relatedLinks: [{ href: "/contact", label: "Contact Us", description: "Get exact coordinates and phone support." }],
  },
];

export const INFO_PAGE_MAP = new Map(INFO_PAGES.map((page) => [page.slug, page]));

const makeLinks = (slugs: string[]) =>
  slugs
    .map((slug) => INFO_PAGE_MAP.get(slug))
    .filter(Boolean)
    .map((page) => ({
      href: `/${page!.slug}`,
      label: page!.title,
      description: page!.description,
    }));

export const TRUST_LINKS = makeLinks([
  "approvals-recognitions",
  "mandatory-disclosure",
  "statutory-disclosures",
  "admission-policy",
  "refund-policy",
  "fee-structure",
  "scholarships",
  "placements",
  "contact-directory",
  "faculty-directory",
  "ombudsperson",
  "iqac-quality-assurance",
  "naac",
  "nirf",
  "statutory-bodies",
  "public-information",
]);

export const LOCATION_LINKS = makeLinks([
  "campus-location-hyderabad",
  "visit-campus",
  "how-to-reach-smru",
  "hostel",
  "transport",
]);

export const REGIONAL_LINKS = makeLinks([
  "university-in-telangana",
  "physiotherapy-college-in-telangana",
  "baslp-college-in-hyderabad",
  "campus-near-ramoji-film-city",
]);

export const FACILITY_LINKS = makeLinks(["library", "labs"]);

export const RESEARCH_LINKS = makeLinks(["research"]);

export const GLOBAL_TRUST_CTA_LINKS = [
  ...TRUST_LINKS,
  { href: SITE_CTA_LINKS.brochure, label: "Brochure", description: "University brochure download page." },
];
