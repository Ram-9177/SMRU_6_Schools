import type { Metadata } from "next";
import Script from "next/script";
import "../src/styles/globals.css";
import AppShell from "../src/components/AppShell";
import { absoluteUrl } from "../src/lib/metadata";
import { SITE_CONTACT } from "../src/lib/shared/site-constants";
import { UNIVERSITY_INFO } from "../src/lib/shared/university";

import { buildUniversitySchema, buildWebSiteSchema } from "../src/lib/seo/schema";

const universitySchema = buildUniversitySchema();
const websiteSchema = buildWebSiteSchema();

export const metadata: Metadata = {
  metadataBase: new URL(UNIVERSITY_INFO.siteUrl),
  title: UNIVERSITY_INFO.brandName,
  description:
    "St. Mary's Rehabilitation University in Hyderabad offers programs across rehabilitation sciences, allied health sciences, psychology, nursing, engineering, and management.",
  keywords: [
    UNIVERSITY_INFO.brandName,
    UNIVERSITY_INFO.shortName,
    "Hyderabad university",
    "rehabilitation sciences university",
    "allied health sciences university",
  ],
  // NOTE: No root-level canonical here — each page sets its own via buildMetadata()
  // to prevent every page from pointing to "/" as canonical (duplicate content).
  openGraph: {
    siteName: UNIVERSITY_INFO.brandName,
    type: "website",
    url: absoluteUrl("/"),
    title: UNIVERSITY_INFO.brandName,
    description:
      "St. Mary's Rehabilitation University in Hyderabad offers programs across rehabilitation sciences, allied health sciences, psychology, nursing, engineering, and management.",
    images: [
      {
        url: absoluteUrl(UNIVERSITY_INFO.defaultOgImage),
        alt: UNIVERSITY_INFO.brandName,
        width: 1200,
        height: 630,
        type: "image/jpeg",
      },
    ],
  },
  robots: "index,follow",
  twitter: {
    card: "summary_large_image",
    title: UNIVERSITY_INFO.brandName,
    description:
      "St. Mary's Rehabilitation University in Hyderabad offers programs across rehabilitation sciences, allied health sciences, psychology, nursing, engineering, and management.",
    images: [absoluteUrl(UNIVERSITY_INFO.defaultOgImage)],
  },
  icons: {
    icon: "/favicon.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: "#0d315c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Script
          id="smru-university-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(universitySchema) }}
        />
        <Script
          id="smru-website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
