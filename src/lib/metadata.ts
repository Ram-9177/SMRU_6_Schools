import type { Metadata } from "next";
import { SITE_IDENTITY } from "@/lib/seo/site";
import { UNIVERSITY_INFO } from "@/lib/shared/university";

const siteUrl = SITE_IDENTITY.canonicalBaseUrl;
const siteName = SITE_IDENTITY.siteName;

const normalizeTitle = (title: string) => {
  const trimmed = (title || "").trim();
  if (!trimmed) return siteName;
  if (trimmed.includes("|")) {
    return trimmed.replace(/St\.\s*Mary(?:'|')s\s+University/gi, siteName);
  }
  return `${trimmed} | ${siteName}`;
};

/**
 * Returns an absolute URL with a trailing slash, matching next.config.mjs trailingSlash: true.
 * This prevents canonical vs. actual URL mismatch (duplicate content risk).
 */
export function absoluteUrl(pathname = "/") {
  const url = new URL(pathname, siteUrl);
  // Ensure trailing slash for all non-asset paths (assets have extensions)
  const isAsset = /\.[a-z0-9]+$/i.test(url.pathname);
  if (!isAsset && !url.pathname.endsWith("/")) {
    url.pathname = `${url.pathname}/`;
  }
  return url.toString();
}

export function buildMetadata({
  title,
  description,
  pathname,
  robots = "index,follow",
  keywords = [],
  imagePath = UNIVERSITY_INFO.defaultOgImage,
}: {
  title: string;
  description: string;
  pathname: string;
  robots?: string;
  keywords?: string[];
  imagePath?: string;
}): Metadata {
  const canonical = absoluteUrl(pathname);
  const normalizedTitle = normalizeTitle(title);
  const ogImage = absoluteUrl(imagePath);
  const baseKeywords = [
    UNIVERSITY_INFO.brandName,
    "SMRU",
    "Hyderabad university",
    "Telangana private university",
    "rehabilitation sciences",
  ];

  return {
    title: normalizedTitle,
    description,
    keywords: Array.from(new Set([...baseKeywords, ...keywords])),
    alternates: {
      canonical,
    },
    robots,
    openGraph: {
      title: normalizedTitle,
      description,
      url: canonical,
      type: "website",
      siteName,
      images: [
        {
          url: ogImage,
          alt: UNIVERSITY_INFO.brandName,
          width: 1200,
          height: 630,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: normalizedTitle,
      description,
      images: [ogImage],
    },
  };
}
