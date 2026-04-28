import type { SeoFaqItem } from "@/lib/seo/schema";
import { SITE_CONTACT } from "@/lib/shared/site-constants";

export const ADMISSIONS_FAQS: SeoFaqItem[] = [
  {
    question: "How do I apply to SMRU?",
    answer:
      "Use the official application route for UG, PG, and diploma programs or the dedicated Ph.D. admissions page for doctoral applications.",
  },
  {
    question: "Can I check duration, eligibility, and fees before applying?",
    answer:
      "Yes. Program pages publish those details where they are available, and missing items should be treated as pending publication until officially confirmed.",
  },
  {
    question: "Are program-wise documents and eligibility rules published for every course?",
    answer:
      "Program pages list available eligibility notes where the website provides them. Remaining program-specific document requirements need manual verification.",
  },
  {
    question: "Where can I verify fees, refunds, and disclosures before admission?",
    answer:
      "Review the fee structure, refund policy, mandatory disclosure, and approvals pages together before relying on any unverified detail.",
  },
  {
    question: "What should parents and students check before final admission?",
    answer:
      "Compare program eligibility, duration, fees, scholarships, and disclosure pages, then confirm any missing details with admissions support.",
  },
  {
    question: "Who should I contact for admissions help?",
    answer: `Use the contact page or email ${SITE_CONTACT.email} for official admissions support.`,
  },
];

export const CONTACT_FAQS: SeoFaqItem[] = [
  {
    question: "Where is St. Mary's Rehabilitation University located?",
    answer:
      "The website lists the campus at Deshmukhi Village, Pochampally Mandal, Yadadri Bhuvanagiri District, Hyderabad, Telangana.",
  },
  {
    question: "How quickly does the admissions team respond?",
    answer: "The contact page states that the team typically responds within one business day.",
  },
  {
    question: "Can I plan a campus visit from the website?",
    answer:
      "Yes. Use the campus location, visit campus, and how to reach pages together with the contact page for visit planning.",
  },
  {
    question: "Which public contact points are available on the website?",
    answer:
      "The website publishes phone, email, WhatsApp, office hours, and emergency contact details on the contact page.",
  },
];

export const PHD_FAQS: SeoFaqItem[] = [
  {
    question: "How do I apply for Ph.D. admissions at SMRU?",
    answer:
      "Use the official Ph.D. application route linked on the page and complete the online form with the required academic and research details.",
  },
  {
    question: "What dates are currently shown for the 2026-27 Ph.D. cycle?",
    answer:
      "The page currently lists 10 April 2026 as the application end date and 26 April 2026 as the entrance test date.",
  },
  {
    question: "Are annual Ph.D. fee details shown on the website?",
    answer:
      "Yes. The page publishes category-wise annual tuition figures, while policy-linked details such as refunds still need separate public verification.",
  },
  {
    question: "Where can I verify research support and contact details?",
    answer:
      "Use the research, admissions, and contact pages together for public references, enquiry support, and follow-up.",
  },
];
