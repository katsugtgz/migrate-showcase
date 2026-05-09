import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fariz — Software Crafter",
  description:
    "Nizar Alfarizi Akbar — Software Crafter based in Sidoarjo, Indonesia. Backend development and high-quality web applications.",
  keywords: ["fariz", "software engineer", "backend developer", "typescript", "svelte"],
  authors: [{ name: "Nizar Alfarizi Akbar" }],
  openGraph: {
    title: "Fariz — Software Crafter",
    description: "Backend dev building great software from Sidoarjo, Indonesia.",
    url: "https://fariz.dev",
    siteName: "Fariz",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fariz — Software Crafter",
    creator: "@FarizInk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
