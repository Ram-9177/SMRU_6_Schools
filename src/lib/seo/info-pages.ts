import { SITE_CONTACT, SITE_CTA_LINKS } from "@/lib/shared/site-constants";
import { MANUAL_VERIFICATION_LABEL, OFFICIAL_DOCUMENTS, SEO_UPDATE_NOTE, UNIVERSITY_INFO } from "@/lib/shared/university";
import { SITE_IDENTITY } from "@/lib/seo/site";

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

const corePublicLinks = [
  { href: "/", label: "Home", description: "Official website home page." },
  { href: "/about", label: "About", description: "Institutional information and university context." },
  { href: "/schools", label: "Schools", description: "Official school information published on smru.edu.in." },
  { href: "/academic-structure", label: "Academic Structure", description: "Academic structure and programme listing page." },
  { href: "/admissions", label: "Admissions", description: "Official admissions information page." },
  { href: "/contact", label: "Contact", description: "Official contact and location information." },
];

export const INFO_PAGES: InfoPageConfig[] = [
  {
    slug: "st-marys-university",
    title: "St. Mary's University",
    description:
      "St. Mary's University is the public brand used for St. Mary's Rehabilitation University (SMRU), Hyderabad, Telangana. Official website: smru.edu.in.",
    eyebrow: "Brand Reference",
    intro: SITE_IDENTITY.bridgeSentence,
    pageType: "trust",
    keywords: ["St Mary's University", "St. Mary's University", "SMRU", "St Mary's University Hyderabad"],
    answers: [
      { question: "What is the public brand name?", answer: "The public brand name is St. Mary's University." },
      { question: "What is the official legal name?", answer: "The official legal name is St. Mary's Rehabilitation University." },
      { question: "What is the short name?", answer: "The short name is SMRU." },
    ],
    sections: [
      {
        heading: "Official Identity",
        paragraphs: [
          "Official website: https://smru.edu.in.",
          "Public brand: St. Mary's University.",
          "Official/legal name: St. Mary's Rehabilitation University.",
          "Short name: SMRU.",
          "Location: Hyderabad, Telangana.",
        ],
      },
    ],
    faqItems: [
      { question: "Is St. Mary's University the same institution as SMRU?", answer: SITE_IDENTITY.bridgeSentence },
      { question: "Where should official course and school information be checked?", answer: "Official school and course information should be checked on smru.edu.in pages." },
    ],
    relatedLinks: corePublicLinks,
  },
  {
    slug: "st-marys-rehabilitation-university",
    title: "St. Mary's Rehabilitation University Official Name | SMRU",
    description:
      "St. Mary's Rehabilitation University is the official/legal name of SMRU, Hyderabad, Telangana. The official website is smru.edu.in.",
    eyebrow: "Official Name",
    intro: SITE_IDENTITY.bridgeSentence,
    pageType: "trust",
    keywords: ["St Mary's Rehabilitation University", "St. Mary's Rehabilitation University", "SMRU"],
    answers: [
      { question: "What is the official/legal name?", answer: "The official/legal name is St. Mary's Rehabilitation University." },
      { question: "What is the public brand?", answer: "The public brand is St. Mary's University." },
      { question: "What is the official website?", answer: "The official website is https://smru.edu.in." },
    ],
    sections: [
      {
        heading: "University Reference",
        paragraphs: [
          "St. Mary's Rehabilitation University is the official/legal name used for SMRU.",
          "The public brand used for the university is St. Mary's University.",
          "SMRU is located in Hyderabad, Telangana.",
        ],
      },
    ],
    faqItems: [
      { question: "What does SMRU stand for?", answer: "SMRU stands for St. Mary's Rehabilitation University." },
      { question: "Which website should be used for official information?", answer: "Use https://smru.edu.in for official university information." },
    ],
    relatedLinks: corePublicLinks,
  },
  {
    slug: "smru-hyderabad",
    title: "SMRU Hyderabad",
    description:
      "SMRU Hyderabad refers to St. Mary's Rehabilitation University, publicly known as St. Mary's University, located in Hyderabad, Telangana.",
    eyebrow: "Location Reference",
    intro: SITE_IDENTITY.bridgeSentence,
    pageType: "trust",
    keywords: ["SMRU Hyderabad", "SMRU", "St Mary's University Hyderabad"],
    answers: [
      { question: "What is SMRU Hyderabad?", answer: "SMRU Hyderabad refers to St. Mary's Rehabilitation University in Hyderabad, Telangana." },
      { question: "What is the public brand name?", answer: "The public brand name is St. Mary's University." },
      { question: "Where is official information published?", answer: "Official information is published at https://smru.edu.in." },
    ],
    sections: [
      {
        heading: "Factual Summary",
        paragraphs: [
          "Official website: https://smru.edu.in.",
          "Public brand: St. Mary's University.",
          "Official/legal name: St. Mary's Rehabilitation University.",
          "Short name: SMRU.",
          "Location: Hyderabad, Telangana.",
        ],
      },
    ],
    faqItems: [
      { question: "Is SMRU located in Hyderabad?", answer: "SMRU is located in Hyderabad, Telangana." },
      { question: "Where are SMRU schools and programmes listed?", answer: "Schools and programme information are listed on smru.edu.in pages including /schools and /academic-structure." },
    ],
    relatedLinks: corePublicLinks,
  },
  {
    slug: "rehabilitation-university-hyderabad",
    title: "Rehabilitation University Hyderabad",
    description:
      "Reference page for St. Mary's Rehabilitation University (SMRU), Hyderabad, Telangana, publicly known as St. Mary's University.",
    eyebrow: "University Reference",
    intro: SITE_IDENTITY.bridgeSentence,
    pageType: "trust",
    keywords: ["Rehabilitation University Hyderabad", "St Mary's Rehabilitation University", "SMRU Hyderabad"],
    answers: [
      { question: "Which university does this page refer to?", answer: "This page refers to St. Mary's Rehabilitation University (SMRU), Hyderabad, Telangana." },
      { question: "What public brand is used?", answer: "The public brand is St. Mary's University." },
      { question: "What is the official website?", answer: "The official website is https://smru.edu.in." },
    ],
    sections: [
      {
        heading: "Official Reference",
        paragraphs: [
          "St. Mary's University is the public brand.",
          "St. Mary's Rehabilitation University is the official/legal name.",
          "SMRU is the short name.",
          "The university location is Hyderabad, Telangana.",
        ],
      },
    ],
    faqItems: [
      { question: "What is the short name of St. Mary's Rehabilitation University?", answer: "The short name is SMRU." },
      { question: "Where should official school information be checked?", answer: "Official school information should be checked only on smru.edu.in pages." },
    ],
    relatedLinks: corePublicLinks,
  },
  {
    slug: "smru-facts",
    title: "SMRU Facts",
    description:
      "Factual reference for SMRU: official website, public brand, legal name, short name, location, and important public routes.",
    eyebrow: "Factual Reference",
    intro: "This page provides factual reference information for St. Mary's University and SMRU.",
    pageType: "trust",
    keywords: ["SMRU facts", "St Mary's University facts", "St Mary's Rehabilitation University"],
    answers: [
      { question: "What is the official website?", answer: "The official website is https://smru.edu.in." },
      { question: "What is the public brand?", answer: "The public brand is St. Mary's University." },
      { question: "What is the official/legal name?", answer: "The official/legal name is St. Mary's Rehabilitation University." },
      { question: "What is the short name?", answer: "The short name is SMRU." },
    ],
    sections: [
      {
        heading: "Entity Facts",
        paragraphs: [
          "Official website: https://smru.edu.in.",
          "Public brand: St. Mary's University.",
          "Official/legal name: St. Mary's Rehabilitation University.",
          "Short name: SMRU.",
          "Location: Hyderabad, Telangana.",
        ],
      },
      {
        heading: "Important Public Routes",
        paragraphs: [
          "Home: /.",
          "About: /about.",
          "Schools: /schools.",
          "Academic Structure: /academic-structure.",
          "Admissions: /admissions.",
          "Contact: /contact.",
        ],
      },
    ],
    faqItems: [
      { question: "What source should be used for official SMRU course and school information?", answer: "Official course and school information should be taken only from smru.edu.in pages." },
      { question: "What is the relationship between St. Mary's University and SMRU?", answer: SITE_IDENTITY.bridgeSentence },
    ],
    relatedLinks: corePublicLinks,
  },
  {
    slug: "approvals-recognitions",
    title: "Approvals & Recognitions",
    description: "Official approvals, recognitions, and regulatory disclosure page for St. Mary's Rehabilitation University.",
    eyebrow: "Trust & Compliance",
    intro: "St. Mary’s Rehabilitation University maintains this page as a public reference for official establishment, recognition, and statutory documents. Students, parents, and stakeholders may use the documents below for transparent verification.",
    pageType: "trust",
    answers: [
      { question: "What is this page for?", answer: "It serves as the official public reference for all statutory and regulatory compliance records including the University Act and UGC recognition." },
      { question: "Are the approval documents published here?", answer: "Yes, you can download the SMRU Act (Telangana Gazette) and UGC 2(f) recognition letter directly from the documents section below." }
    ],
    sections: [
      {
        heading: "Verification Protocol",
        paragraphs: [
          "All documents are reviewed and approved by the university administration before publication.",
          "Applicants are advised to verify information through this page before taking admission decisions."
        ]
      }
    ],
    documents: [
      { title: "University Establishment Act", status: "Verified", url: "/assets/SMRU%20Act%2010%20of%202026.pdf", lastUpdated: "Official Telangana Gazette document establishing St. Mary’s Rehabilitation University through Act No. 10 of 2026." },
      { title: "UGC Recognition under Section 2(f)", status: "Verified", url: "/assets/St.%20Marys%20Rehabilitation%20University%20UGC%20recognition%20letter%202(f).pdf", lastUpdated: "Official UGC recognition letter confirming St. Mary’s Rehabilitation University under Section 2(f) of the UGC Act, 1956." }
    ],
    faqItems: [
      { question: "Can I rely on this page for verification?", answer: "Yes. This page is the official reference point for verified approvals." }
    ],
    relatedLinks: [
      { href: "/ugc-disclosure", label: "UGC Disclosure", description: "Dedicated page for UGC-related verification and documents" },
      { href: "/mandatory-disclosure", label: "Mandatory Disclosure", description: "Detailed statutory disclosures as per UGC guidelines" }
    ]
  },
  {
    slug: "ugc-disclosure",
    title: "UGC Disclosure",
    description: "UGC recognition and disclosure information page for St. Mary's Rehabilitation University.",
    eyebrow: "UGC Status",
    intro: "St. Mary’s Rehabilitation University is recognized under Section 2(f) of the UGC Act, 1956. This page serves as a dedicated reference for UGC compliance.",
    pageType: "trust",
    answers: [
      { question: "Is SMRU recognized by the UGC?", answer: "Yes, SMRU is established through the Telangana Gazette Act No. 10 of 2026 and holds UGC 2(f) recognition." }
    ],
    sections: [
      {
        heading: "UGC Compliance Note",
        paragraphs: ["The University Grants Commission (UGC) recognition letter confirms SMRU’s status as a recognized university. Refer to the specific programme pages for individual course-level approvals."]
      }
    ],
    faqItems: [],
    relatedLinks: [
      { href: "/approvals-recognitions", label: "Approvals & Recognitions", description: "All official statutory documents." }
    ]
  },
  {
    slug: "mandatory-disclosure",
    title: "Mandatory Disclosure",
    description: "Public disclosure and institution information page for St. Mary's Rehabilitation University.",
    eyebrow: "Mandatory Disclosure",
    intro: "This page serves as a clean public index for official university disclosures.",
    pageType: "trust",
    answers: [
      { question: "What is a mandatory disclosure page?", answer: "It is the public page where institution-level disclosures and official documents are organized for students, parents, and public review." }
    ],
    sections: [
      {
        heading: "Official Establishment",
        paragraphs: ["Information regarding the University Establishment Act and Gazette notification."]
      },
      {
        heading: "UGC Recognition",
        paragraphs: ["Details of University Grants Commission Section 2(f) inclusion."]
      },
      {
        heading: "Admissions & Academic Information",
        paragraphs: ["Official details will be published by the university. For current verified guidance, please contact the official university helpdesk."]
      },
      {
        heading: "Student Support",
        paragraphs: ["Information on grievance redressal, anti-ragging, and student wellness programs."]
      },
      {
        heading: "Contact & Public Information",
        paragraphs: ["Directory of official contacts for the university administration."]
      }
    ],
    faqItems: [],
    relatedLinks: [
      { href: "/approvals-recognitions", label: "Approvals & Recognitions", description: "Trust and recognition overview page." }
    ]
  },
  {
    slug: "public-information",
    title: "Public Information",
    description: "Public information desk and compliance contacts for SMRU.",
    eyebrow: "Public Information",
    intro: "The university provides access to institutional policies and contact avenues for transparency.",
    pageType: "trust",
    answers: [],
    sections: [
      {
        heading: "Public Relations & Enquiries",
        paragraphs: ["Official details will be published by the university. For current verified guidance, please contact the official university helpdesk."]
      }
    ],
    faqItems: [],
    relatedLinks: []
  },
  {
    slug: "anti-ragging",
    title: "Anti-Ragging",
    description: "Anti-ragging policy and committee details for a safe campus at SMRU.",
    eyebrow: "Student Welfare",
    intro: "SMRU maintains a strict zero-tolerance policy towards ragging and student harassment.",
    pageType: "trust",
    answers: [],
    sections: [
      {
        heading: "Reporting Procedures",
        paragraphs: ["Official details will be published by the university. For current verified guidance, please contact the official university helpdesk."]
      }
    ],
    faqItems: [],
    relatedLinks: []
  },
  {
    slug: "grievance-redressal",
    title: "Grievance Redressal",
    description: "Student and staff grievance redressal mechanism at SMRU.",
    eyebrow: "Student Welfare",
    intro: "A dedicated cell ensures timely and fair resolution of academic and administrative grievances.",
    pageType: "trust",
    answers: [],
    sections: [
      {
        heading: "Redressal Workflow",
        paragraphs: ["Official details will be published by the university. For current verified guidance, please contact the official university helpdesk."]
      }
    ],
    faqItems: [],
    relatedLinks: []
  },
  {
    slug: "ombudsperson",
    title: "Ombudsperson",
    description: "University ombudsperson contact and independent review procedures.",
    eyebrow: "Student Welfare",
    intro: "The university ombudsperson provides an independent mechanism for resolving complex student disputes.",
    pageType: "trust",
    answers: [],
    sections: [
      {
        heading: "Appointment Details",
        paragraphs: ["Official details will be published by the university. For current verified guidance, please contact the official university helpdesk."]
      }
    ],
    faqItems: [],
    relatedLinks: []
  },
  {
    slug: "iqac-quality-assurance",
    title: "IQAC & Quality Assurance",
    description: "Internal Quality Assurance Cell (IQAC) initiatives and quality audits.",
    eyebrow: "Quality Cycles",
    intro: "Committed to the highest standards of institutional quality and academic excellence.",
    pageType: "trust",
    answers: [],
    sections: [
      {
        heading: "Quality Framework",
        paragraphs: ["Official details will be published by the university. For current verified guidance, please contact the official university helpdesk."]
      }
    ],
    faqItems: [],
    relatedLinks: []
  },
  {
    slug: "academic-calendar",
    title: "Academic Calendar",
    description: "Official academic calendar, term dates, and exam schedules.",
    eyebrow: "Academics",
    intro: "The academic calendar provides the official timeline for terms, exams, and holidays.",
    pageType: "trust",
    answers: [],
    sections: [
      {
        heading: "Term Schedules",
        paragraphs: ["Official details will be published by the university. For current verified guidance, please contact the official university helpdesk."]
      }
    ],
    faqItems: [],
    relatedLinks: []
  },
  {
    slug: "faculty-directory",
    title: "Faculty Directory",
    description: "Directory of academic faculty and department heads at SMRU.",
    eyebrow: "Academics",
    intro: "Our dedicated faculty brings extensive academic and clinical experience to the university.",
    pageType: "trust",
    answers: [],
    sections: [
      {
        heading: "Faculty Profiles",
        paragraphs: ["Official details will be published by the university. For current verified guidance, please contact the official university helpdesk."]
      }
    ],
    faqItems: [],
    relatedLinks: []
  },
  {
    slug: "contact-directory",
    title: "Contact Directory",
    description: "Official contact directory for departments, administration, and support.",
    eyebrow: "Information",
    intro: "Find the correct department or support desk to address your enquiry efficiently.",
    pageType: "trust",
    answers: [],
    sections: [
      {
        heading: "Administration Contacts",
        paragraphs: ["Official details will be published by the university. For current verified guidance, please contact the official university helpdesk."]
      }
    ],
    faqItems: [],
    relatedLinks: []
  },
  {
    slug: "refund-policy",
    title: "Refund Policy",
    description: "Fee refund and withdrawal policy for St. Mary's Rehabilitation University.",
    eyebrow: "Fees & Policies",
    intro: "The university follows transparent and compliant policies regarding fee refunds and admission withdrawals.",
    pageType: "trust",
    answers: [],
    sections: [
      {
        heading: "Withdrawal Regulations",
        paragraphs: ["Official details will be published by the university. For current verified guidance, please contact the official university helpdesk."]
      }
    ],
    faqItems: [],
    relatedLinks: []
  },
  {
    slug: "fee-structure",
    title: "Fee Structure",
    description: "Academic fee structure information page for St. Mary's Rehabilitation University.",
    eyebrow: "Fees & Policies",
    intro: "SMRU maintains a transparent fee structure across all programs to support accessible education.",
    pageType: "trust",
    answers: [],
    sections: [
      {
        heading: "Tuition and Associated Fees",
        paragraphs: ["Official details will be published by the university. For current verified guidance, please contact the official university helpdesk."]
      }
    ],
    faqItems: [],
    relatedLinks: []
  },
  {
    slug: "admission-policy",
    title: "Admission Policy",
    description: "Admission policy and application guidance for St. Mary's Rehabilitation University.",
    eyebrow: "Admissions",
    intro: "Admissions at SMRU are conducted through a fair, transparent, and merit-based selection process in alignment with statutory frameworks.",
    pageType: "trust",
    answers: [],
    sections: [
      {
        heading: "Selection Criteria",
        paragraphs: ["Official details will be published by the university. For current verified guidance, please contact the official university helpdesk."]
      }
    ],
    faqItems: [],
    relatedLinks: [
      { href: "/admissions", label: "Admissions", description: "Official admissions route." }
    ]
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
    faqItems: [],
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
    faqItems: [],
    relatedLinks: [{ href: "/mandatory-disclosure", label: "Statutory Disclosures", description: "Public disclosure hub." }],
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
    faqItems: [],
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
    faqItems: [],
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
    faqItems: [],
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
    faqItems: [],
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
  "ugc-disclosure",
  "admission-policy",
  "refund-policy",
  "fee-structure",
  "contact-directory",
  "faculty-directory",
  "ombudsperson",
  "iqac-quality-assurance",
  "naac",
  "nirf",
  "public-information",
  "anti-ragging",
  "grievance-redressal",
  "academic-calendar"
]);

export const LOCATION_LINKS = makeLinks([
  "campus-near-ramoji-film-city"
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
