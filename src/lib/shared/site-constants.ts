export const SITE_CONTACT = {
  whatsappNumberIntl: "917331119438",
  primaryPhone: "08071296016",
  secondaryPhone: "+91-7331119432",
  email: "reach@smru.edu.in",
  address:
    "Near Ramoji Film City, Deshmukhi Village, Pochampally Mandal, Yadadri Bhuvanagiri District, Hyderabad, Telangana - 508284, India.",
} as const;

export const PHD_APPLY_URL = "https://apply.smru.edu.in/Smru/phd/";

export const SITE_CTA_LINKS = {
  apply: "https://apply.smru.edu.in",
  phdApply: PHD_APPLY_URL,
  brochure: "/brochure",
  whatsapp: `https://wa.me/${SITE_CONTACT.whatsappNumberIntl}`,
  ctplApplyRedirect: "https://apply.smru.edu.in/",
} as const;

export const resolveApplyLink = ({
  pathname = "",
  target = "auto",
}: {
  pathname?: string;
  target?: string;
}) => {
  if (target === "phd") return SITE_CTA_LINKS.phdApply;
  if (target === "general") return SITE_CTA_LINKS.apply;
  return pathname.startsWith("/phd-admissions") ? SITE_CTA_LINKS.phdApply : SITE_CTA_LINKS.apply;
};

export const SITE_SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/SMRUniversity",
  instagram: "https://www.instagram.com/smruhyderabad",
  linkedin: "https://www.linkedin.com/company/smruhyderabad/",
  youtube: "https://www.youtube.com/@SMRUniversity",
} as const;

export const PARTNER_HIDDEN_STICKY_ROUTES = [] as const;
