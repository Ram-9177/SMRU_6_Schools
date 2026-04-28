export const SITE_CONTACT = {
  whatsappNumberIntl: "917331119438",
  primaryPhone: "08071296016",
  secondaryPhone: "+91-7331119432",
  email: "reach@smru.edu.in",
  address:
    "Near Ramoji Film City, Deshmukhi Village, Pochampally Mandal, Yadadri Bhuvanagiri District, Hyderabad, Telangana - 508284, India.",
} as const;

export const PHD_APPLY_URL =
  "https://apply.smru.edu.in/Smru/phd/?&utm_source=GoogleAds&utm_network=g&utm_medium=c&utm_keyword=phd%20university&utm_location=9302592&utm_campaign_id=23568608827&utm_source=GoogleAds&utm_network=g&utm_medium=c&utm_keyword=phd%20university&utm_location=9302592&utm_campaign_id=23568608827&utm_adset_id=191050073497&utm_ad_id=797345978535&matchtype=p&placement=&gclid=Cj0KCQjw4a3OBhCHARIsAChaqJMkJqNXMSCPwtJmNnmNQVC-5wrZqINw9I19eZ8QFDhVYIANGphS8y4aAiXuEALw_wcB&gad_source=1&gad_campaignid=23568608827&gbraid=0AAAABCWg9mqefnSTPsaw089RiOQXjxeng";

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
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
  linkedin: "https://www.linkedin.com/",
  youtube: "https://www.youtube.com/",
} as const;

export const PARTNER_HIDDEN_STICKY_ROUTES = [] as const;
