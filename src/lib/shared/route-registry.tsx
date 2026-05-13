import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

import Home from "@/views/Home";
import About from "@/views/About";
import Admissions from "@/views/Admissions";
import AcademicStructure from "@/views/AcademicStructure";
import BrochureDownload from "@/views/BrochureDownload";
import Campus360 from "@/views/Campus360";
import Careers from "@/views/Careers";
import Contact from "@/views/Contact";
import PhdAdmission from "@/views/PhdAdmission";
import Schools from "@/views/Schools";
import ThankYou from "@/views/ThankYou";
import Partner from "@/views/Partner";
import Blackbucks from "@/views/Blackbucks";
import UniversityPortal from "@/views/UniversityPortal";
import Niat from "@/views/Niat";
import QtstSmru from "@/views/QtstSmru";
import NiatUpskillingView from "@/views/NiatUpskilling";
import EdinboxForensicLandingV2 from "@/views/EdinboxForensicLandingV2";
import IstLandingV2 from "@/views/IstLandingV2";
import ApprovalsRecognitions from "@/views/ApprovalsRecognitions";

export type StaticRouteKey =
  | "home"
  | "about"
  | "admissions"
  | "academicStructure"
  | "brochure"
  | "campus360"
  | "careers"
  | "contact"
  | "phdAdmissions"
  | "schools"
  | "thankYou"
  | "partner"
  | "bb"
  | "iiat"
  | "niat"
  | "qtst"
  | "niatUpskilling"
  | "edinboxForensic"
  | "istLanding"
  | "approvalsRecognitions";

type StaticRouteConfig = {
  metadata: Metadata;
  View: () => JSX.Element;
};

export const STATIC_ROUTE_REGISTRY: Record<StaticRouteKey, StaticRouteConfig> = {
  home: {
    metadata: buildMetadata({
      title: "St. Mary’s University | St. Mary’s Rehabilitation University (SMRU) Hyderabad",
      description:
        "St. Mary’s University, officially St. Mary’s Rehabilitation University (SMRU), Hyderabad, Telangana. Explore schools, courses, admissions, campus life and official updates at smru.edu.in.",
      pathname: "/",
      keywords: ["St Marys University", "St. Mary’s University", "SMRU", "SMRU Hyderabad"],
    }),
    View: Home,
  },
  about: {
    metadata: buildMetadata({
      title: "About SMRU | Top Academic Leadership & Legacy",
      description:
        "Learn about the 30-year legacy, leadership, and vision of St. Mary's Rehabilitation University, Hyderabad. Explore our commitment to academic excellence and clinical innovation.",
      pathname: "/about",
    }),
    View: About,
  },
  admissions: {
    metadata: buildMetadata({
      title: "Admissions 2026 | UG, PG & Doctoral Pathways | SMRU",
      description: "Explore 2026 admissions at St. Mary's Rehabilitation University. Compare program eligibility, duration, fees, scholarships, and doctoral routes before applying.",
      pathname: "/admissions",
      keywords: ["Direct Admission 2026", "University Application Hyderabad", "SMRU Admissions", "Eligibility", "Fees", "Scholarships"],
    }),
    View: Admissions,
  },
  academicStructure: {
    metadata: buildMetadata({
      title: "Academic Schools & Departments | Institutional Structure | SMRU",
      description:
        "Explore the comprehensive academic structure of SMRU Hyderabad. Discover our specialized schools and departments dedicated to advanced health and science education.",
      pathname: "/academic-structure",
    }),
    View: AcademicStructure,
  },
  brochure: {
    metadata: buildMetadata({
      title: "Download Prospectus & Brochure | Admissions 2026 | SMRU",
      description: "Get the official St. Mary's Rehabilitation University brochure. Detailed information on courses, campus facilities, and 2026 admission guidelines.",
      pathname: "/brochure",
    }),
    View: BrochureDownload,
  },
  campus360: {
    metadata: buildMetadata({
      title: "Virtual Campus Tour | Cinematic Campus Experience | SMRU",
      description: "Take a 360-degree virtual tour of our state-of-the-art Hyderabad campus. Explore labs, hostel facilities, and academic infrastructure at SMRU.",
      pathname: "/campus-360",
    }),
    View: Campus360,
  },
  careers: {
    metadata: buildMetadata({
      title: "Faculty & Staff Careers | Join the SMRU Academic Team",
      description: "Build your academic career at St. Mary's Rehabilitation University. Explore faculty and administrative job openings in Hyderabad.",
      pathname: "/careers",
    }),
    View: Careers,
  },
  contact: {
    metadata: buildMetadata({
      title: "Contact Us | Admissions Helpdesk & Location | SMRU Hyderabad",
      description: "Reach out to the St. Mary's Rehabilitation University admissions team. Find our Hyderabad campus location, map, and contact directory.",
      pathname: "/contact",
      keywords: ["Contact SMRU", "Hyderabad University Address", "Admissions Helpdesk"],
    }),
    View: Contact,
  },
  phdAdmissions: {
    metadata: buildMetadata({
      title: "Ph.D. Admissions 2026 | Doctoral Research Programs | SMRU",
      description: "Apply for Doctoral (Ph.D.) programs at St. Mary's Rehabilitation University. Research pathways in rehabilitation, health, and allied sciences for 2026.",
      pathname: "/phd-admissions",
    }),
    View: PhdAdmission,
  },
  schools: {
    metadata: buildMetadata({
      title: "Academic Schools | Professional Degree Programs in Hyderabad | SMRU",
      description: "Explore the schools at St. Mary's Rehabilitation University. From Nursing to Engineering, discover specialized career pathways for 2026.",
      pathname: "/schools",
    }),
    View: Schools,
  },
  thankYou: {
    metadata: buildMetadata({
      title: "Submission Received | SMRU Admissions",
      description: "Your enquiry has been successfully submitted. Our admissions team will contact you shortly.",
      pathname: "/thank-you",
      robots: "noindex,follow",
    }),
    View: ThankYou,
  },
  partner: {
    metadata: buildMetadata({
      title: "Institutional Partners | Industry & Academic Alliances | SMRU",
      description: "Explore the global industry and academic partners of St. Mary's Rehabilitation University, ensuring career-ready education and placements.",
      pathname: "/partner",
    }),
    View: Partner,
  },
  bb: {
    metadata: buildMetadata({
      title: "BlackBucks Portal",
      description: "Access the BlackBucks partner route published on the SMRU website.",
      pathname: "/bb",
    }),
    View: Blackbucks,
  },
  iiat: {
    metadata: buildMetadata({
      title: "IIAT Portal",
      description: "Access the Indian Institute of Advanced Technology partner route published on the SMRU website.",
      pathname: "/iiat",
    }),
    View: UniversityPortal,
  },
  niat: {
    metadata: buildMetadata({
      title: "NIAT",
      description: "Explore the NIAT partner route published on the SMRU website.",
      pathname: "/niat",
    }),
    View: Niat,
  },
  qtst: {
    metadata: buildMetadata({
      title: "QTST",
      description: "Explore the QTST partner route published on the SMRU website.",
      pathname: "/qtst",
    }),
    View: QtstSmru,
  },
  niatUpskilling: {
    metadata: buildMetadata({
      title: "NIAT Upskilling",
      description: "Explore the NIAT Upskilling route published on the SMRU website.",
      pathname: "/niat-upskilling",
    }),
    View: NiatUpskillingView,
  },
  edinboxForensic: {
    metadata: buildMetadata({
      title: "B.Sc Forensic Science | Admissions 2026 | SMRU × AIFSET",
      description: "Join India's first Rehabilitation University for B.Sc Forensic Science. Apply via AIFSET national entrance exam. 100% online, early-bird scholarships available.",
      pathname: "/partner/edinbox",
    }),
    View: EdinboxForensicLandingV2,
  },
  istLanding: {
    metadata: buildMetadata({
      title: "B.Tech Admissions 2026 | SMRU × Intellipaat School of Technology",
      description: "Apply for industry-integrated B.Tech programs in AI, Data Science, and Cyber Security. Earn a UGC-recognized degree from SMRU with Intellipaat's career transformation.",
      pathname: "/partner/ist",
    }),
    View: IstLandingV2,
  },
  approvalsRecognitions: {
    metadata: buildMetadata({
      title: "Approvals & Recognitions | Statutory Status | SMRU Hyderabad",
      description: "Official approvals, recognitions, and regulatory disclosure page for St. Mary's Rehabilitation University. Download SMRU Act and UGC recognition letters.",
      pathname: "/approvals-recognitions",
    }),
    View: ApprovalsRecognitions,
  },
};

export const getStaticRouteConfig = (key: StaticRouteKey) => STATIC_ROUTE_REGISTRY[key];

export const PARTNER_ALIAS_REDIRECTS: Record<string, string> = {
  blackbucks: "/bb",
  "qtst-smru": "/qtst",
  university: "/iiat",
  bytexl: "https://bytexl.com/smru.html",
  edinbox: "/partner/edinbox",
  edridge: "/partner/edridge",
  emversity: "/partner/emversity",
  ist: "/partner/ist",
  mjiollnir: "/partner/mjiollnir",
  nst: "/partner/nst",
  onnbikes: "/partner/onnbikes",
  veloces: "/partner/veloces",
};

export const getPartnerAliasRedirect = (alias: string) => PARTNER_ALIAS_REDIRECTS[alias] ?? "/partner";
