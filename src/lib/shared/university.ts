import { SITE_CONTACT } from "@/lib/shared/site-constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://smru.edu.in";

export const UNIVERSITY_INFO = {
  siteUrl,
  brandName: "St. Mary's Rehabilitation University",
  shortName: "SMRU",
  legalName: "St. Mary's Rehabilitation University",
  legacyBrandName: "St. Mary's University",
  city: "Hyderabad",
  state: "Telangana",
  country: "India",
  postalCode: "508284",
  locality: "Yadadri Bhuvanagiri District",
  addressLine: "Near Ramoji Film City, Deshmukhi Village, Pochampally Mandal",
  address: SITE_CONTACT.address,
  email: SITE_CONTACT.email,
  phone: SITE_CONTACT.primaryPhone,
  secondaryPhone: SITE_CONTACT.secondaryPhone,
  whatsapp: `https://wa.me/${SITE_CONTACT.whatsappNumberIntl}`,
  logoPath: "/assets/Logo.png",
  defaultOgImage: "/assets/hero-campus.jpg",
  officeHours: "Mon - Sat: 9:30 AM - 5:00 PM",
  emergencyPhone: "+91 90104 55590",
  mapEmbedUrl: "https://maps.google.com/maps?q=St.%20Mary%27s%20University%2C%20Deshmukhi&output=embed",
} as const;

export const SEO_UPDATE_NOTE = "This information is not published yet. Please use the official contact channels for the latest verified guidance.";
export const MANUAL_VERIFICATION_LABEL = "Official document not published yet";
