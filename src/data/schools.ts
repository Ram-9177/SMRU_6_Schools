export const THEME = {
  primary: "#0d315c",
  accent: "#019e6e",
  accentDark: "#0f6a5a",
};

const text = (s) => s.replace(/\s+/g, " ").trim();

const APPLY_PORTAL_URL = "https://apply.smru.edu.in/";

export const EDU_PARTNERS = {
  NIAT: {
    code: "NIAT",
    name: "NxtWave",
    landingUrl: "/niat",
    logo: "NIAT.svg"
  },
  IIAT: {
    code: "IIAT",
    name: "Indian Institute of Advanced Technology",
    landingUrl: "/iiat",
  },
  QTST: {
    code: "QTST",
    name: "Quality Thought",
    landingUrl: "/qtst",
  },
  IST: {
    code: "IST",
    name: "Intellipaat",
    landingUrl: "/ist",
  },
  BB: {
    code: "BB",
    name: "BlackBucks",
    landingUrl: "/bb",
  },
  BYTEXL: {
    code: "BYTEXL",
    name: "ByteXL",
    landingUrl: "/bytexl",
    iframeUrl: "https://bytexl.com/smru.html",
  },
  VELOCES: {
    code: "VELOCES",
    name: "Veloces",
    landingUrl: "/veloces",
  },
  EDIN: {
    code: "EDIN",
    name: "EDIN",
    landingUrl: "/edinbox",
  },
  EMVERSITY: {
    code: "EMVERSITY",
    name: "Emversity",
    landingUrl: "/emversity",
  },
  IFT: {
    code: "IFT",
    name: "Institute of FinTech",
    landingUrl: null,
  },
  IIST: {
    code: "IIST",
    name: "Indian Institute of Science and Technology",
    landingUrl: null,
  },
  KPMG: {
    code: "KPMG",
    name: "KPMG",
    landingUrl: null,
  },
  MICROSOFT: {
    code: "MICROSOFT",
    name: "Microsoft",
    landingUrl: null,
  },
  NST: {
    code: "NST",
    name: "Newton School of Technology",
    landingUrl: "/nst",
    iframeUrl: "https://www.newtonschool.co/newton-school-of-technology-nst/nst-st-marys-hyd",
  },
};

export const getEduPartner = (program: any = {}) => {
  const code = (program.partnerCode || "").toUpperCase().trim();
  return EDU_PARTNERS[code] || null;
};

export const getEduPartnerLandingUrl = (program: any = {}) => {
  const isInvalidPartnerUrl = (url = "") => /apply\.smru\.edu\.in/i.test(url);
  const programUrl = (program.partnerLeadUrl || "").trim();
  if (programUrl && !isInvalidPartnerUrl(programUrl)) return programUrl;
  const partnerUrl = (getEduPartner(program)?.landingUrl || "").trim();
  if (partnerUrl && !isInvalidPartnerUrl(partnerUrl)) return partnerUrl;
  return null;
};

export const isEduPartneredProgram = (program: any = {}) => Boolean(getEduPartner(program));

export const schools = [
  {
    slug: "rehabilitation-sciences",
    name: "School of Rehabilitation Sciences",
    short: "Rehabilitation Sciences",
    about: text("The School of Rehabilitation Sciences operates as a specialized hub for educating practitioners who restore communication and learning abilities. Curriculum focuses on evidence-based audiology, speech therapy, and inclusive education, using clinical labs and assistive technology to improve the lives of individuals with diverse challenges."),
    departments: [
      {
        slug: "audiology-speech-sciences",
        name: "Audiology & Speech-Language Pathology",
        about: "",
        programs: [
          {
            slug: "baslp",
            name: "BASLP - Bachelor of Audiology & Speech Language Pathology",
            level: "UG Program",
            overview: text("Students learn to calibrate advanced audiological equipment and conduct speech-language assessments for individuals with communication impairments. You will spend time in clinical labs mastering the fitting of hearing aids and designing rehabilitation protocols for neurogenic communication disorders."),
            intake: "40 Seats",
            duration: "4 Years (3 Years Academic + 1 Year Internship)",
            eligibility: "10+2 with Physics, Chemistry, Biology/Mathematics; minimum 50% marks",
            labs: "Specialized Audiology Lab, Speech Science Lab, and Earmould Lab equipped with diagnostic audiometers.",
            fieldExposure: "Clinical rotations at leading ENT hospitals and rehabilitation centers in Hyderabad.",
            careerOpportunities: ["Audiologist", "Speech-Language Pathologist", "Clinical Supervisor", "Rehab Consultant"],
            outcomes: text("Graduates find placement in ENT clinics and specialized schools, where they manage diagnostic testing and long-term speech therapy for pediatric and geriatric populations."),
            accreditation: "RCI Approved Program (Rehabilitation Council of India)"
          },
          { slug: "msc-audiology", name: "M.Sc. Audiology", level: "PG Program" }
        ]
      },
      {
        slug: "prosthetics-orthotics",
        name: "Prosthetics Orthotics",
        about: "",
        programs: [
          { slug: "bpo", name: "BPO", level: "UG Program" },
          { slug: "mpo", name: "MPO", level: "PG Program" }
        ]
      },
      {
        slug: "inclusive-education",
        name: "Special & Inclusive Education",
        about: "",
        programs: [
          { slug: "ba-bed-special-inclusive-education", name: "B.A. B.Ed. (Special & Inclusive Education)", level: "UG Program" },
          { slug: "bsc-bed-special-inclusive-education", name: "B.Sc. B.Ed. (Special & Inclusive Education)", level: "UG Program" },
          { slug: "bcom-bed-special-inclusive-education", name: "B.Com. B.Ed. (Special & Inclusive Education)", level: "UG Program" }
        ]
      }
    ]
  },
  {
    slug: "health-allied-health-sciences",
    name: "School of Health & Allied Health Sciences",
    short: "Health & Allied Health Sciences",
    about: text("The School of Health and Allied Health Sciences at St. Mary's University is a multidisciplinary center of excellence dedicated to training health and allied health professionals who play a vital role in diagnostics, therapy, patient care, and health system management. The school integrates scientific knowledge with hands-on training to support advanced clinical services and rehabilitation care across various healthcare domains."),
    departments: [
      {
        slug: "physiotherapy",
        name: "Physiotherapy",
        about: text("Dedicated to the science of restorative movement and physical well-being. Students engage in manual therapy practice and use advanced mobilization technologies to improve patient mobility across diverse clinical environments."),
        programs: [
          {
            slug: "bpt",
            name: "Bachelor of Physiotherapy (BPT)",
            partnerCode: "EMVERSITY",
            level: "UG Program",
            duration: "5 years (4 years academic + 1 year internship)",
            eligibility: "10+2 with Physics, Chemistry, Biology; minimum 50% marks",
            fees: "1.5 Lakh per annum",
            overview: text("Students master the science of movement by practicing manual therapy techniques and operating electrotherapy equipment in clinical labs. You will learn to draft recovery schedules for sports injuries and neurological conditions by assessing muscular performance and joint mobility."),
            specializations: ["Neuro Physiotherapy", "Ortho Physiotherapy", "Cardio Respiratory", "Sports Physiotherapy", "Paediatric Physiotherapy", "Onco Physiotherapy", "Obstetric / Gynic Physiotherapy"],
            outcomes: text("Career paths lead to positions in specialized sports clinics and geriatric wards, where you will manage full-cycle physical rehabilitation for active and recovering patients."),
            accreditation: text("Curriculum aligned with NCAHP and RCI guidelines, ensuring eligibility for national registration and supporting international certification pathways.")
          },
          {
            slug: "mpt",
            name: "Master of Physiotherapy (MPT)",
            partnerCode: "EMVERSITY",
            level: "PG Program",
            duration: "2 years (full-time)",
            eligibility: "Bachelor of Physiotherapy with minimum 50% marks",
            fees: "1.75 Lakh per annum",
            overview: text("Delve into specialized musculoskeletal and neurological recovery pathways through clinical mentorship and evidence-based practice. You will develop expertise in advanced mobilization techniques and injury prevention strategies tailored for high-performance athletes and chronic rehabilitation cases."),
            specializations: ["Neuro Physiotherapy", "Ortho Physiotherapy", "Cardio Respiratory", "Sports Physiotherapy", "Pediatric Physiotherapy", "Onco Physiotherapy", "Obstetric / Gynic Physiotherapy"],
            outcomes: text("Prepares you for senior consultant roles and clinical research positions, focusing on innovative physical therapy solutions in global healthcare settings."),
            accreditation: text("Following Allied Health Professions Act norms, this program aligns with National Medical Commission recommendations for advanced clinical eligibility.")
          }
        ]
      },
      {
        slug: "occupational-therapy",
        name: "Occupational Therapy",
        about: text("This department focuses on restoring functional independence through activity-based therapy. Students learn to analyze life-skills and physical task performance to help patients overcome cognitive and physical barriers."),
        programs: [
          {
            slug: "bot",
            name: "Bachelor of Occupational Therapy (BOT)",
            partnerCode: "EMVERSITY",
            level: "UG Program",
            duration: "5 years (4 years coursework + 1 year internship)",
            eligibility: "10+2 Science with Physics, Chemistry, Biology; minimum 50% marks",
            fees: "1.5 Lakh per annum",
            overview: text("Learn to evaluate a patient's physical and cognitive limitations by observing their performance of daily activities. You will design custom sensory integration plans and ergonomic modifications to help individuals regain independence after illness or injury using specialized clinical tools."),
            intake: "60 Seats",
            specializations: ["Neuro Science", "Mental Health", "Orthopedics", "Hand Therapy", "Paediatrics", "Sensory Integration", "Oncology", "Rehabilitation"],
            labs: "ADL (Activities of Daily Living) Lab, Sensory Integration Lab, and Splinting/Orthotics Workshop.",
            fieldExposure: "1000+ hours of clinical practice in orthopedics and mental health wards.",
            careerOpportunities: ["Occupational Therapist", "Rehabilitation Manager", "Ergonomic Consultant", "Pediatric Therapist"],
            outcomes: text("Prepares you for roles as Occupational Therapists in high-performing hospitals and hand therapy clinics, focused on restoring functionality for diverse patient groups."),
            accreditation: "Accredited as per NCAHP Standards"
          },
          {
            slug: "mot",
            name: "Master of Occupational Therapy (MOT)",
            partnerCode: "EMVERSITY",
            level: "PG Program",
            duration: "2 years (advanced coursework + research project/clinical practicum)",
            eligibility: "Bachelor's degree in Occupational Therapy with minimum 50% marks",
            fees: "1.75 Lakh per annum",
            overview: text("This advanced program focuses on specialized recovery strategies for pediatric and neurological cases. You will lead research-driven interventions, using assistive technologies to manage complex patient profiles and advocating for inclusive healthcare delivery across specialized wards."),
            specializations: ["Neuro Science", "Mental Health", "Orthopaedics", "Hand Therapy", "Paediatrics", "Sensory Integration", "Oncology", "Rehabilitation"],
            outcomes: text("Graduates move into clinical leadership and rehabilitation management, overseeing multidisciplinary therapy teams in specialized medical centers."),
            accreditation: text("The MOT is conducted per RCI and NCAHP guidelines, facilitating professional recognition in India and international mobility.")
          }
        ]
      },
      {
        slug: "allied-health-sciences",
        name: "Allied Health Technologies",
        about: "",
        programs: [
          { slug: "bmlt", name: "Medical Lab Technology", partnerCode: "EMVERSITY", level: "UG Program" },
          { slug: "bsc-anaesthesia-ot", name: "Anesthesia & Operation Theatre Technology", partnerCode: "EMVERSITY", level: "UG Program" },
          { slug: "bcvt", name: "Cardiovascular Technology", partnerCode: "EMVERSITY", level: "UG Program" },
          { slug: "betcms", name: "Emergency Medical Technology", partnerCode: "EMVERSITY", level: "UG Program" },
          { slug: "b-optometry", name: "Optometry", partnerCode: "EMVERSITY", level: "UG Program" },
          { slug: "brt", name: "Radiotherapy Technology", partnerCode: "EMVERSITY", level: "UG Program" },
          {
            slug: "bsc-forensic-science",
            name: "B.Sc. Forensic Science",
            level: "UG Program",
            duration: "3 Years (6 Semesters)",
            eligibility: "10+2 Science stream",
            fees: "1,50,000 per year",
            overview: text("Uncover the hidden truths of investigative science by mastering the chemical, biological, and digital analysis techniques that drive modern criminal justice. Students transition from foundational science to active crime scene simulation, learning to identify, preserve, and analyze evidence that bridges the gap between the lab and the courtroom."),
            schoolTitle: "School of Health & Allied Health Sciences - St. Mary's University",
            schoolDescription: text("The School of Health & Allied Health Sciences focuses on the practical application of scientific discovery across investigative and creative domains. We prepare students with the analytical and technical skills required for modern scientific and professional fields."),
            highlights: [
              "Simulating crime scene investigation and evidence preservation",
              "Hands-on lab training in forensic toxicology and DNA profiling",
              "Mastering chemical analysis for fingerprint and trace evidence detection",
              "Exploring digital forensics and information security investigative methods",
              "Analyzing the link between forensic science and rehabilitative health"
            ],
            durationNote: text("6 semesters of investigative science and laboratory drills."),
            eligibilityNote: text("Requires a background in science and high analytical focus."),
            eligibilityPoints: ["10+2 with Science (Biology/Math/Chemistry)", "Selection based on academic merit and entrance performance"],
            feeNotes: ["Specialized laboratory and crime-scene kit fees", "Standard examination charges"],
            specializationsIntro: text("Technical focus:"),
            specializations: ["Crime Scene Analysis", "Forensic Toxicology", "DNA Profiling", "Digital Investigation", "Trace Evidence Science"],
            careerOpportunities: ["Forensic Investigator", "Lab Analyst", "Toxicology Specialist", "Crime Scene Coordinator", "Science Research Associate"],
            outcomes: text("Graduates are prepared to serve as specialized investigators and analysts in state forensic labs and private investigative firms."),
            salaryIndia: "3 LPA - 6 LPA",
            salaryInternational: "$40,000 - $80,000 annually",
            salaryNote: text("Reflects market demand for specialized scientific investigative talent."),
            accreditation: text("Degree awarded by St. Mary's University; curriculum focus on contemporary forensic standards."),
            accreditationPoints: ["Awarded by St. Mary's University", "Technical labs focused on experimental and investigative science"],
            whyChoose: [
              "Hands-on crime scene simulation and investigative drills",
              "Focus on practical lab analysis for high-stakes evidence detection",
              "Academic mentorship from experts in forensic chemistry and biology",
              "Learning in a research-oriented institution"
            ],
            whyChooseNote: text("Empowers you to apply the power of science to the pursuit of justice."),
            hostelFee: "1,25,000 per year",
            hostelFeeNote: text("On-campus accommodation including meals.")
          }
        ]
      }
    ]
  },
  {
    slug: "psychology",
    name: "School of Psychology",
    short: "Psychology",
    about: text("The School of Psychology at St. Mary's University serves as a specialized center for mental health education and clinical training. Programs are structured around practical research and rehabilitative strategies, preparing students to evaluate behavioral patterns and implement psychological interventions in diverse community and medical settings."),
    departments: [
      {
        slug: "clinical-psychology",
        name: "Clinical Psychology",
        about: text("The Department of Clinical Psychology focuses on the science of diagnosing and managing mental health disorders through direct clinical exposure. Students engage in supervised assessment drills and therapeutic case studies to master the tools required for evidence-based mental health care."),
        programs: [
          {
            slug: "bsc-clinical-psychology",
            name: "B.Sc. Clinical Psychology",
            level: "UG Program",
            duration: "4 years (full-time undergraduate program, 6 semesters)",
            eligibility: "10+2 in any stream; background in science preferred but not mandatory",
            fees: "1.5 Lakh per annum",
            overview: text("Students dive into the mechanics of human behavior by conducting controlled observations and learning the nuances of psychological testing. You will learn to map cognitive processes, assess emotional triggers, and participate in case-based discussions that reflect real-world clinical scenarios in mental health departments."),
            outcomes: text("Graduates transition into support roles within psychiatric clinics and rehabilitation centers, assisting in the implementation of therapeutic plans and behavioral monitoring for patients."),
            accreditation: text("Degree recognized by RCI and UGC, establishing the academic eligibility needed for entrance to advanced clinical psychology pathways in India.")
          },
          {
            slug: "ma-clinical-psychology",
            name: "M.A. Clinical Psychology",
            level: "PG Program",
            duration: "2 years",
            eligibility: "Bachelor's in Psychology or any discipline with psychology as a paper with 50%+ marks",
            fees: "1.75 Lakh per annum",
            overview: text("This postgraduate track focuses on mastering complex diagnostic protocols and evidence-based psychotherapy techniques through intensive fieldwork. You will gain proficiency in managing specialized patient cases and designing psychological intervention programs that address severe psychopathology in diverse clinical settings."),
            outcomes: text("Prepares you for lead consulting roles in mental health services and faculty positions, with a focus on delivering specialized clinical care in high-pressure medical and social welfare environments."),
            accreditation: text("Degree recognized by RCI and UGC, providing the credentials required for entrance to professional RCI-regulated programs.")
          },
          { slug: "professional-diploma-clinical-psychology", name: "Professional Diploma in Clinical Psychology (PDCP)", level: "Post Dip" }
        ]
      },
      {
        slug: "rehabilitation-psychology",
        name: "Rehabilitation Psychology",
        about: text("This department specializes in helping individuals with chronic disabilities adapt to cognitive and physical challenges. Training focuses on vocational assessment and psychosocial support strategies used in long-term recovery centers."),
        programs: [
          { slug: "pg-diploma-rehabilitation-psychology", name: "P.G. Diploma in Rehabilitation Psychology (PGDRP)", level: "Post Dip" }
        ]
      },
      {
        slug: "applied-psychology-behavioural-health",
        name: "Applied Psychology & Behavioral Health",
        about: text("Focuses on the practical application of psychological science in corporate, educational, and digital spaces. Students learn to use behavioral metrics to improve organizational productivity and individual well-being."),
        programs: [
          {
            slug: "b-psychology-applied-behavioural",
            name: "B.Psychology",
            level: "UG Program",
            duration: "4 years (full-time undergraduate program, 6 semesters)",
            eligibility: "10+2 in any stream; background in psychology not mandatory",
            fees: "1.5 Lakh per annum",
            overview: text("Explore how psychological principles solve practical problems in education, business, and community settings by analyzing human interactions. Students learn to draft behavioral modification plans and conduct organizational assessments to enhance group performance and individual mental well-being in professional environments."),
            specializations: ["Neuro Psychology", "Organizational Psychology", "Forensic Psychology", "School Psychology", "Sports Psychology", "Cyber Psychology", "Military Psychology"],
            outcomes: text("You will be equipped to work in school counseling units, corporate HR departments as behavioral experts, and as program coordinators for mental health NGOs."),
            accreditation: text("Curriculum aligned with Indian Psychological Association recommendations, supporting readiness for advanced postgraduate studies.")
          },
          {
            slug: "m-psychology-applied-behavioural",
            name: "M. Psychology",
            level: "PG Program",
            duration: "2 years",
            eligibility: "Bachelor's in Psychology or any discipline with psychology as a paper with 50%+ marks",
            fees: "1.75 Lakh per annum",
            overview: text("Master specialized domains like Neuropsychology and Forensic Psychology by applying research-driven approaches to understand complex behavioral patterns. The program involves using digital therapy frameworks and specialized assessment tools to navigate legal, corporate, and competitive landscapes in behavioral health."),
            specializations: ["Neuro Psychology", "Organizational Psychology", "Forensic Psychology", "School Psychology", "Sports Psychology", "Cyber Psychology", "Military Psychology"],
            outcomes: text("Career paths include roles as Behavioral Health Consultants and specialized investigators in legal and military settings, utilizing expert profiling and modification skills."),
            accreditation: text("Degree recognized by NAHC and UGC, providing required academic credentials for entrance to further regulated professional pathways.")
          }
        ]
      }
    ]
  },
  {
    slug: "nursing-sciences",
    name: "School of Nursing",
    short: "Nursing",
    about: text("Programs in nursing from undergraduate to postgraduate level."),
    departments: [
      {
        slug: "nursing",
        name: "Nursing",
        about: "",
        programs: [
          { slug: "bsc-nursing", name: "B.Sc. Nursing", level: "UG Program" },
          { slug: "msc-nursing", name: "M.Sc. Nursing", level: "PG Program" }
        ]
      }
    ]
  },
  {
    slug: "engineering-emerging-technologies",
    name: "School of Engineering & Emerging Technologies",
    short: "Engineering & Emerging Technologies",
    about: text("Programs in rehabilitation engineering, assistive technologies, computer science, artificial intelligence, machine learning, and data science as shown in the academic structure."),
    departments: [
      {
        slug: "rehabilitation-engineering-assistive-technologies",
        name: "Rehabilitation Engineering & Assistive Technologies",
        about: "",
        programs: [
          { slug: "btech-rehabilitation-engineering-prosthetics-orthotics-assistive-technologies", name: "B.Tech in Rehabilitation Engineering with Prosthetics & Orthotics / Assistive Technologies", level: "UG Program" }
        ]
      },
      {
        slug: "computer-science-engineering",
        name: "Computer Science & Engineering",
        about: "",
        programs: [
          {
            slug: "btech-cse-iiat",
            name: "B.Tech CSE",
            level: "UG Program",
            partnerCode: "IIAT",
            partnerLeadUrl: APPLY_PORTAL_URL,
            duration: "4 Years (8 Semesters)",
            eligibility: "10+2 with Physics, Chemistry, and Mathematics (PCM); entrance process as applicable",
            fees: "1,50,000 per year",
            overview: text("Students engineer scalable software architectures by mastering programming paradigms and system-level integration. You will implement computational models that drive digital health innovations and secure enterprise data infrastructures in the modern technology landscape."),
            schoolTitle: "School of Engineering and Technology - St. Mary's University",
            schoolDescription: text("The School of Engineering is a center for technical advancement where computing power meets medical necessity. Focus is on creating digital tools that facilitate long-term patient recovery and streamline healthcare operations through data-driven engineering."),
            highlights: [
              "8-semester professional track in architectural software design",
              "Hands-on system building in specialized coding environments",
              "Implementation of neural networks and distributed cloud systems",
              "Direct participation in technical sprints and software life-cycle projects",
              "Engineering digital solutions for assistive technology sectors"
            ],
            durationNote: text("The program involves architectural system design, laboratory drills, and technical research sprints."),
            eligibilityNote: text("Admission eligibility follows university norms for engineering disciplines."),
            eligibilityPoints: [
              "10+2 with Physics, Chemistry, and Mathematics (PCM)",
              "Qualifying entrance examination score",
              "Academic performance as per university norms"
            ],
            feeNotes: ["Examination fees", "Laboratory and project expenses", "Technical event and workshop charges"],
            specializationsIntro: text("Technical domains include:"),
            specializations: ["AI & ML Architecture", "Data Infrastructure", "Cyber Security Systems", "Cloud Computing Strategy", "Enterprise Software Engineering"],
            careerOpportunities: ["Full-Stack Software Engineer", "Cloud Architect", "AI Systems Developer", "Cyber Security Analyst", "Data Systems Engineer"],
            outcomes: text("Graduates become the architects of digital infrastructure, working as full-stack engineers and cloud specialists in global tech firms and healthcare startups."),
            salaryIndia: "4 LPA - 8 LPA",
            salaryInternational: "$60,000 - $100,000 annually",
            salaryNote: text("Reflects entry-level market trends for software engineering roles."),
            accreditation: text("Degree awarded by St. Mary's University. Program aligned with global software engineering and architecture standards."),
            accreditationPoints: [
              "Degree awarded by St. Mary's University",
              "Aligned with modern technology architecture requirements",
              "Technical curriculum vetted by IT industry mentors"
            ],
            whyChoose: [
              "Technical curriculum linked with high-impact medical engineering",
              "Access to advanced labs for collaborative system building",
              "Focus on verifiable technical skill acquisition and project delivery",
              "Learning environment that mirrors modern tech industry practices"
            ],
            whyChooseNote: text("Graduates emerge ready to lead technical teams and manage complex software deployments in data-rich sectors."),
            hostelFee: "1,25,000 per year",
            hostelFeeNote: text("Separate from tuition; includes campus amenities and accommodation.")
          },
          {
            slug: "btech-cse-aiml-niat",
            name: "B.Tech CSE (AI & ML)",
            level: "UG Program",
            partnerCode: "NIAT",
            duration: "4 Years (8 Semesters)",
            eligibility: "10+2 with Physics, Chemistry, and Mathematics (PCM) and entrance process as applicable",
            fees: "1,50,000 per year",
            overview: text("Synthesize machine intelligence with core computing to architect autonomous software systems that learn and adapt in real-time. Students learn to build high-precision predictive engines and automate complex information processing tasks, focusing on the high-growth sectors of digital healthcare and automated industrial operations."),
            schoolTitle: "School of Engineering and Technology - St. Mary's University",
            schoolDescription: text("The School of Engineering is a center for technical advancement where computing power meets medical necessity. Focus is on creating digital tools that facilitate long-term patient recovery and streamline healthcare operations through data-driven engineering."),
            highlights: [
              "Architecting autonomous agents and predictive software engines",
              "Implementing high-precision ML models for automated healthcare diagnostics",
              "Practical training in neural architecture search and adaptive systems",
              "Building data-intensive AI platforms for real-time industrial automation",
              "Exposure to ethical AI governance and large-scale model optimization"
            ],
            durationNote: text("8 semesters focusing on the convergence of machine intelligence and software systems."),
            eligibilityNote: text("Proficiency in mathematical logic and logical reasoning required."),
            eligibilityPoints: ["10+2 with PCM", "University-specified entrance qualifying score"],
            feeNotes: ["Laboratory and computing software fees", "Standard examination charges"],
            specializationsIntro: text("Technical verticals:"),
            specializations: ["Predictive Systems", "Autonomous Agents", "Clinical AI", "Industrial Automation", "Information Synthesis"],
            careerOpportunities: ["AI System Architect", "Machine Learning Lead", "Data Strategy Analyst", "Automation Engineer", "Research Analyst"],
            outcomes: text("Graduates gain the knowledge and technical skills required to become AI engineers and innovators shaping intelligent technology systems."),
            salaryIndia: "6 LPA - 12 LPA",
            salaryInternational: "$80,000 - $140,000 annually",
            salaryNote: text("Salary prospects depend on skills, projects, organization, experience, and specialization."),
            accreditation: text("Degree awarded by St. Mary's University. Program offered under the School of Engineering and Technology. Curriculum aligned with modern artificial intelligence and computing industry requirements."),
            accreditationPoints: [
              "Degree awarded by St. Mary's University",
              "Program offered under the School of Engineering and Technology",
              "Curriculum aligned with modern artificial intelligence and computing industry requirements"
            ],
            whyChoose: [
              "engineering programs connected with healthcare and technological innovation",
              "Exposure to emerging technologies such as AI and machine learning",
              "Hands-on learning through technical laboratories and development projects",
              "Academic environment focused on research, innovation, and ethical technology development"
            ],
            whyChooseNote: text("Graduates gain the knowledge and technical skills required to become AI engineers and innovators shaping intelligent technology systems."),
            hostelFee: "1,25,000 per year",
            hostelFeeNote: text("Hostel charges are separate from tuition and may include accommodation and basic facilities as per university norms.")
          },
          {
            slug: "btech-cse-ai-ds-niat",
            name: "B.Tech CSE (AI & DS)",
            level: "UG Program",
            partnerCode: "NIAT",
            duration: "4 Years (8 Semesters)",
            eligibility: "10+2 PCM; entrance process applies",
            fees: "1,50,000 per year",
            overview: text("Master the 'Holy Trinity' of modern technology by synthesizing vast data streams into actionable intelligence using advanced machine learning models. You will build and deploy predictive systems from scratch, learning to optimize algorithms for accuracy and scale across diverse industrial and medical datasets."),
            schoolTitle: "School of Engineering and Technology - St. Mary's University",
            schoolDescription: text("The School of Engineering is a center for technical advancement where computing power meets medical necessity. Focus is on creating digital tools that facilitate long-term patient recovery and streamline healthcare operations through data-driven engineering."),
            highlights: [
              "Integrating AI, ML, and Data Science into a singular engineering workflow",
              "Building end-to-end predictive pipelines for high-precision decision making",
              "Hands-on exercises in statistical computing and neural pattern recognition",
              "Deploying intelligent models for real-time analysis of clinical healthcare data",
              "Collaborative methodology focused on solve-from-scratch technical projects"
            ],
            durationNote: text("8 semesters of intensive data-driven engineering and model optimization."),
            eligibilityNote: text("Requires proficiency in mathematical modeling and logic."),
            eligibilityPoints: ["10+2 with PCM", "University-specified entrance qualifying score"],
            feeNotes: ["Laboratory and software licensing charges", "Examination fees"],
            specializationsIntro: text("Core focus:"),
            specializations: ["Predictive Analytics", "Deep Learning", "Data Synthesis", "Information Visualization", "Automated Reasoning"],
            careerOpportunities: ["Full-Stack AI Developer", "Data Scientist", "ML Operations Engineer", "Business Intelligence Architect", "Predictive Analyst"],
            outcomes: text("Prepares you for roles in high-stakes analytics and AI development, focused on creating scalable, data-driven systems for the global digital economy."),
            salaryIndia: "6 LPA - 12 LPA",
            salaryInternational: "$80,000 - $140,000 annually",
            salaryNote: text("Reflects market value for multi-disciplinary technology leads."),
            accreditation: text("Degree awarded by St. Mary's University; curriculum aligned with NIAT industry benchmarks."),
            accreditationPoints: ["Awarded by St. Mary's University", "Technical labs focused on large-scale data engineering"],
            whyChoose: [
              "Holistic training across AI, Machine Learning, and Data Science",
              "Practical project builds targeting real-world industrial challenges",
              "Focus on high-growth sectors like digital health and finance",
              "Mentorship from experts in advanced computational modeling"
            ],
            whyChooseNote: text("Ideal for students aiming to architect the intelligent foundations of modern business and healthcare."),
            hostelFee: "1,25,000 per year",
            hostelFeeNote: text("Includes full board on campus.")
          }
        ]
      }
    ]
  },
  {
    slug: "law",
    name: "School of Law",
    short: "Law",
    about: text("The School of Law at St. Mary's Rehabilitation University (SMRU), Hyderabad, stands distinct among India's premier law schools for its unwavering fusion of rigorous legal doctrine with real-world advocacy and emerging technologies. Our curriculum is intentionally designed to transcend textbook learning, offering specialised training in critical future-facing domains such as AI Regulation, Data Sovereignty, and Forensic Jurisprudence. What truly sets SMRU apart is our commitment to an immersive, practice-driven ecosystem - from our fully operational state-of-the-art Moot Court Hall to a vibrant Legal Aid Cell that connects students directly with community justice needs."),
    vision: [
      "To be a globally recognized center of excellence in legal education, research, and innovation.",
      "To cultivate a generation of legal professionals who are intellectually robust, ethically principled, and socially responsible.",
      "To inspire transformative leadership that strengthens the rule of law and contributes to nation-building.",
      "To uphold the constitutional values of justice, equality, liberty, and fraternity in every aspect of legal learning.",
      "To serve as a catalyst for social change through legal empowerment, community outreach, and interdisciplinary scholarship."
    ],
    mission: [
      "To offer a holistic and dynamic legal education that blends theoretical foundations with real-world applications.",
      "To promote a culture of critical inquiry, academic freedom, and interdisciplinary research in legal studies.",
      "To bridge the gap between legal academia and the legal profession through robust clinical programmes, internships, and industry partnerships.",
      "To instill a deep sense of professional ethics, public service, and commitment to human rights among students.",
      "To encourage diversity, inclusivity, and global engagement in all academic and co-curricular pursuits.",
      "To nurture future-ready legal professionals equipped to address contemporary legal challenges locally, nationally, and globally."
    ],
    facilities: [
      { name: "Moot Court Hall", desc: "Replicates real courtroom settings with professional A/V recording for advocacy training." },
      { name: "Digital Law Library", desc: "Access to Manupatra, SCC Online, LexisNexis, and Hein Online databases." },
      { name: "Legal Aid Cell", desc: "Free legal assistance to underprivileged sections through rural camps and literacy drives." },
      { name: "ADR & Arbitration Centre", desc: "Specialized training in negotiation, mediation, and arbitration." },
      { name: "Forensic Studies Centre", desc: "Interdisciplinary hub integrating criminal law with forensic science investigation." }
    ],
    departments: [
      {
        slug: "legal-studies",
        name: "Law",
        about: "",
        programs: [
          {
            slug: "llb",
            name: "LL.B.",
            level: "UG Program",
            duration: "3 Years",
            eligibility: "Bachelor's Degree with 45%",
            overview: text("A broad and comprehensive legal education covering all BCI-mandated core subjects with practical training in moot courts, drafting, legal aid, and internships for litigation and advisory careers.")
          },
          {
            slug: "llb-hons",
            name: "LL.B. (Hons.) – 3-Year",
            level: "UG Program",
            duration: "3 Years",
            eligibility: "Bachelor's Degree with 45%",
            overview: text("An intensive graduate-level legal education across six semesters with Honours specialization tracks, practical training, and research-oriented learning for high-level legal practice and scholarship.")
          },
          {
            slug: "ba-llb-hons",
            name: "B.A. LL.B. (Hons.) – Integrated",
            level: "UG Program",
            duration: "5 Years",
            eligibility: "10+2 with 45% aggregate",
            overview: text("A five-year integrated dual-degree programme combining arts and humanities with legal rigor. The curriculum integrates political science, history, sociology, and economics with constitutional, criminal, corporate, international, and environmental law.")
          },
          {
            slug: "bba-llb-hons",
            name: "B.B.A. LL.B. (Hons.) – Integrated",
            level: "UG Program",
            duration: "5 Years",
            eligibility: "10+2 with 45% aggregate",
            overview: text("A specialized integrated degree at the intersection of business, management, and law. It combines business administration foundations with legal expertise for corporate legal practice, compliance, and commercial law careers.")
          },
          {
            slug: "bsc-llb-hons",
            name: "B.Sc. LL.B. (Hons.) – Integrated",
            level: "UG Program",
            duration: "5 Years",
            eligibility: "10+2 with 45% (Science)",
            overview: text("An innovative integrated programme combining scientific precision with legal depth. It focuses on technology law, cyber law, biotechnology law, environmental law, forensic science, and intellectual property rights.")
          }
        ]
      }
    ]
  }
];

export const allSchoolsBar = schools.map(({ slug, name, short }) => ({
  slug,
  name,
  short: short || name,
}));
