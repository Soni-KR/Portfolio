import type { Metadata, Viewport } from "next";
import { profile } from "@/data/profile";
import "./globals.css";

const description =
  "Explore Mourad Kraiem's AI, machine learning, computer vision, Graph-RAG, and distributed-systems work inside OperatingSoni-KR, a custom retro-computing portfolio.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteUrl =
  configuredSiteUrl?.startsWith("https://") || configuredSiteUrl?.startsWith("http://")
    ? configuredSiteUrl
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "OperatingSoni-KR",
  title: {
    default: "Mourad Kraiem // AI & Machine Learning Portfolio",
    template: "%s // OperatingSoni-KR",
  },
  description,
  keywords: [
    "Mourad Kraiem",
    "AI portfolio",
    "machine learning",
    "computer vision",
    "Graph-RAG",
    "distributed AI",
    "ENSI",
    "Tunisia",
  ],
  authors: [{ name: profile.name, url: profile.links.linkedin }],
  creator: profile.name,
  publisher: profile.name,
  category: "technology",
  alternates: { canonical: "/" },
  formatDetection: { address: false, email: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "OperatingSoni-KR",
    title: "OperatingSoni-KR // Mourad Kraiem",
    description,
    images: [
      {
        url: "/og.jpg",
        width: 1731,
        height: 909,
        alt: "OperatingSoni-KR — Mourad Kraiem, AI and Machine Learning",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OperatingSoni-KR // Mourad Kraiem",
    description,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#071419",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
