import { UNIVERSITY_INFO } from "../shared/university";
import { SITE_SOCIAL_LINKS } from "../shared/site-constants";

export const SITE_IDENTITY = {
  id: "https://smru.edu.in/#organization",
  websiteId: "https://smru.edu.in/#website",
  legalName: "St. Mary's Rehabilitation University",
  brandName: UNIVERSITY_INFO.brandName,
  logoUrl: "https://smru.edu.in/assets/logos/logo.png", // Verify actual path
  foundingDate: "1996",
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
