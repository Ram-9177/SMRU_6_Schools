import type { SeoFaqItem } from "@/lib/seo/schema";

export const HOME_FAQ_CATEGORIES: Array<{ label: string; faqs: SeoFaqItem[] }> = [
  {
    label: "Student Aspirants",
    faqs: [
      {
        question: "How do I compare the right course at SMRU?",
        answer:
          "Open the program pages and compare duration, eligibility, fees, and career outcomes. If a field is still missing, official details will be published by the university. For current verified guidance, please contact the official university helpdesk.",
      },
      {
        question: "Can I see eligibility and duration before applying?",
        answer:
          "Yes. The website publishes duration and eligibility details on many program pages so students can shortlist courses before submitting an application.",
      },
      {
        question: "Where should I check fees and scholarships first?",
        answer:
          "Use the admissions, fee structure, and scholarship information on the website together so you can compare the likely total cost before applying.",
      },
      {
        question: "What if I am not sure which program fits my background?",
        answer:
          "Review the program requirements, career focus, and department details, then contact admissions for guidance on the best-fit route.",
      },
    ],
  },
  {
    label: "Admissions",
    faqs: [
      {
        question: "How do I apply to St. Mary's Rehabilitation University?",
        answer:
          "You can apply directly at apply.smru.edu.in or fill the Quick Enquiry form on the website. The admissions team will guide you through the next steps.",
      },
      {
        question: "Is St. Mary's Rehabilitation University a recognized university?",
        answer:
          "Yes. St. Mary's Rehabilitation University is established by the Government of Telangana through Act No. 10 of 2026 and is recognized by the UGC under Section 2(f) of the UGC Act, 1956.",
      },
      {
        question: "When do PhD admissions close for 2026-27?",
        answer:
          "The website states that the application end date for PhD admissions 2026-27 is 10 May 2026 and the entrance test is scheduled for 15 May 2026.",
      },
      {
        question: "What is the last date to apply for UG and PG programs?",
        answer:
          "The website currently states that admissions are open and recommends applying early to secure a seat and scholarship consideration.",
      },
    ],
  },
  {
    label: "Programs",
    faqs: [
      {
        question: "What makes St. Mary's Rehabilitation University different from other universities?",
        answer:
          "The website presents St. Mary's Rehabilitation University as a multi-disciplinary institution with six schools, spanning Health, Law, Engineering, Psychology, Nursing, and Rehabilitation, backed by a 30-year academic legacy.",
      },
      {
        question: "Which schools and programs does St. Mary's Rehabilitation University offer?",
        answer:
          "The website lists schools covering rehabilitation sciences, health and allied health sciences, psychology, nursing sciences, engineering and emerging technologies, management and computer applications, and applied sciences and designing.",
      },
      {
        question: "What teaching methods are used at St. Mary's Rehabilitation University?",
        answer:
          "The website refers to activity-based therapy, simulation-based practice, multisensory learning, and peer-led case discussions across relevant programs.",
      },
      {
        question: "Is clinical training part of the curriculum?",
        answer:
          "The website states that real-world clinical training and community outreach are integrated into programs where applicable.",
      },
    ],
  },
  {
    label: "Financial Aid",
    faqs: [
      {
        question: "What scholarships does St. Mary's Rehabilitation University offer?",
        answer:
          "The website lists multiple scholarships including merit, founder, minority, girl student, defence ward, single parent, chancellor's excellence, SC/ST empowerment, and early bird scholarships.",
      },
      {
        question: "Can I get a scholarship up to 50%?",
        answer:
          "The admissions page currently states scholarship support up to 50 percent, subject to university norms and manual verification.",
      },
      {
        question: "What is the hostel fee?",
        answer:
          "The homepage FAQ currently states a hostel fee of INR 1,25,000 per annum. This should be treated as needs manual verification until published on an official hostel or fee page.",
      },
      {
        question: "How do I check my scholarship eligibility?",
        answer:
          "Use the scholarship action on the website or contact admissions for guidance on eligibility and documentation.",
      },
    ],
  },
  {
    label: "Campus Life",
    faqs: [
      {
        question: "What hostel facilities are available?",
        answer:
          "The website mentions secure on-campus hostels with surveillance, study-friendly spaces, and Wi-Fi. Full hostel policy details still need manual verification.",
      },
      {
        question: "What recreational facilities does the campus have?",
        answer:
          "The website highlights a sports complex, meditation gardens, green spaces, and on-campus bike rental.",
      },
      {
        question: "Is there a canteen on campus?",
        answer:
          "Yes. The website describes a hygienic campus canteen with balanced meals and convenient access near academic blocks and hostels.",
      },
      {
        question: "What placement support does St. Mary's Rehabilitation University provide?",
        answer:
          "The website states that a dedicated placement cell offers career guidance, internships, and recruitment support. Specific placement outcomes need manual verification.",
      },
    ],
  },
] ;

export const HOME_FAQS: SeoFaqItem[] = HOME_FAQ_CATEGORIES.flatMap((category) => category.faqs);
