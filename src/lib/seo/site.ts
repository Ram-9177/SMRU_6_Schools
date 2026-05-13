import { UNIVERSITY_INFO } from "../shared/university";
import { SITE_SOCIAL_LINKS } from "../shared/site-constants";

export const SITE_IDENTITY = {
  id: "https://smru.edu.in/#organization",
  websiteId: "https://smru.edu.in/#website",
  siteName: "St. Mary's Rehabilitation University",
  legalName: UNIVERSITY_INFO.legalName,
  publicName: UNIVERSITY_INFO.legacyBrandName,
  shortName: UNIVERSITY_INFO.shortName,
  brandName: UNIVERSITY_INFO.brandName,
  domain: "smru.edu.in",
  canonicalBaseUrl: "https://smru.edu.in",
  defaultTitle: "St. Mary's Rehabilitation University",
  titleTemplate: "%s | St. Mary's Rehabilitation University",
  defaultDescription:
    "St. Mary's University, officially St. Mary's Rehabilitation University (SMRU), Hyderabad, Telangana. Explore schools, courses, admissions, campus life and official updates at smru.edu.in.",
  defaultOpenGraphImage: UNIVERSITY_INFO.defaultOgImage,
  bridgeSentence:
    "St. Mary's University, officially St. Mary's Rehabilitation University (SMRU), Hyderabad, Telangana.",
  logoUrl: "https://smru.edu.in/assets/Logo.png",
  foundingDate: "1996",
  locationText: `${UNIVERSITY_INFO.city}, ${UNIVERSITY_INFO.state}`,
  addressText: UNIVERSITY_INFO.address,
  alternateNames: [
    UNIVERSITY_INFO.legacyBrandName,
    UNIVERSITY_INFO.shortName,
    UNIVERSITY_INFO.legalName,
    "St. Mary’s University",
    "St. Mary’s Rehabilitation University",
  ],
  address: {
    streetAddress: UNIVERSITY_INFO.addressLine,
    addressLocality: UNIVERSITY_INFO.city,
    addressRegion: UNIVERSITY_INFO.state,
    postalCode: UNIVERSITY_INFO.postalCode,
    addressCountry: "IN",
  },
  contactPoints: [
    {
      telephone: UNIVERSITY_INFO.phone,
      contactType: "Admissions",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Telugu"],
    },
  ],
  socialLinks: [
    SITE_SOCIAL_LINKS.facebook,
    SITE_SOCIAL_LINKS.instagram,
    SITE_SOCIAL_LINKS.linkedin,
    SITE_SOCIAL_LINKS.youtube,
  ].filter(Boolean),
};
