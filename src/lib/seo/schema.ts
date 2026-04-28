import { absoluteUrl } from "@/lib/metadata";
import { UNIVERSITY_INFO } from "@/lib/shared/university";
import { SITE_IDENTITY } from "./site";

export type SeoFaqItem = {
  question: string;
  answer: string;
};

export type SeoBreadcrumbItem = {
  name: string;
  path: string;
};

// 1. Root Organization & University Schema
export const buildOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": SITE_IDENTITY.id,
  name: SITE_IDENTITY.legalName,
  alternateName: SITE_IDENTITY.brandName,
  url: absoluteUrl("/"),
  logo: {
    "@type": "ImageObject",
    url: SITE_IDENTITY.logoUrl,
  },
  address: {
    "@type": "PostalAddress",
    ...SITE_IDENTITY.address,
  },
  contactPoint: SITE_IDENTITY.contactPoints.map((cp) => ({
    "@type": "ContactPoint",
    ...cp,
  })),
  sameAs: SITE_IDENTITY.socialLinks,
});

export const buildUniversitySchema = () => ({
  ...buildOrganizationSchema(),
  "@type": "CollegeOrUniversity",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Academic Programs",
    itemListElement: [
      { "@type": "Offer", name: "Undergraduate Programs" },
      { "@type": "Offer", name: "Postgraduate Programs" },
      { "@type": "Offer", name: "Doctoral Research" },
    ],
  },
});

// 2. WebSite Schema (Global)
export const buildWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE_IDENTITY.websiteId,
  name: SITE_IDENTITY.brandName,
  url: absoluteUrl("/"),
  publisher: { "@id": SITE_IDENTITY.id },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${absoluteUrl("/")}?s={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});

// 3. Page & Collection Schema
export const buildWebPageSchema = ({
  title,
  description,
  pathname,
  type = "WebPage",
}: {
  title: string;
  description: string;
  pathname: string;
  type?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": type,
  "@id": absoluteUrl(`${pathname}#webpage`),
  name: title,
  description,
  url: absoluteUrl(pathname),
  isPartOf: { "@id": SITE_IDENTITY.websiteId },
  about: { "@id": SITE_IDENTITY.id },
  inLanguage: "en-IN",
});

export const buildBreadcrumbSchema = (items: SeoBreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

// 4. Academic Schema
export const buildCourseSchema = ({
  name,
  description,
  pathname,
  schoolName,
  level,
  duration,
  eligibility,
  offers,
}: {
  name: string;
  description: string;
  pathname: string;
  schoolName?: string;
  level?: string;
  duration?: string;
  eligibility?: string;
  offers?: any;
}) => {
  const url = absoluteUrl(pathname);
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${url}#course`,
    name,
    description,
    url,
    provider: { "@id": SITE_IDENTITY.id },
    ...(schoolName ? { isPartOf: { "@type": "EducationalOrganization", name: schoolName } } : {}),
    educationalCredentialAwarded: level || "Degree",
    ...(duration ? { timeRequired: duration } : {}),
    ...(eligibility ? { coursePrerequisites: eligibility } : {}),
    ...(offers ? { offers: { "@type": "Offer", ...offers } } : {}),
  };
};

export const buildEducationProgramSchema = (args: any) => ({
  ...buildCourseSchema(args),
  "@type": "EducationalOccupationalProgram",
});

export const buildItemListSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    url: absoluteUrl(item.url),
  })),
});

// 5. Faculty & Person Schema
export const buildPersonSchema = ({
  name,
  jobTitle,
  description,
  pathname,
  image,
}: {
  name: string;
  jobTitle: string;
  description?: string;
  pathname: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": absoluteUrl(`${pathname}#person`),
  name,
  jobTitle,
  description,
  image: image ? absoluteUrl(image) : undefined,
  url: absoluteUrl(pathname),
  worksFor: { "@id": SITE_IDENTITY.id },
});

// 6. Utility Schema
export const buildFaqSchema = (items: SeoFaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

export const buildContactPageSchema = (pathname: string) => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": absoluteUrl(`${pathname}#contactpage`),
  url: absoluteUrl(pathname),
  mainEntity: { "@id": SITE_IDENTITY.id },
});

export const buildPlaceSchema = ({
  title,
  description,
  pathname,
}: {
  title: string;
  description: string;
  pathname: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Place",
  "@id": absoluteUrl(`${pathname}#place`),
  name: title,
  description,
  url: absoluteUrl(pathname),
  address: {
    "@type": "PostalAddress",
    ...SITE_IDENTITY.address,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "17.3484",
    longitude: "78.6824",
  },
  publicAccess: true,
});

export const buildCollectionPageSchema = ({
  title,
  description,
  pathname,
}: {
  title: string;
  description: string;
  pathname: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": absoluteUrl(`${pathname}#collectionpage`),
  name: title,
  description,
  url: absoluteUrl(pathname),
  isPartOf: { "@id": SITE_IDENTITY.websiteId },
  about: { "@id": SITE_IDENTITY.id },
});

export const buildVideoSchema = ({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  publisher: { "@id": SITE_IDENTITY.id },
});
