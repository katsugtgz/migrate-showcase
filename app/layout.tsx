import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfitHeading = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const outfitBody = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fariz — Software Engineer",
  description:
    "Software engineer passionate about building innovative solutions and developer tools. Explore my projects and free online utilities.",
  keywords: ["fariz", "software engineer", "backend developer", "typescript", "svelte"],
  authors: [{ name: "Nizar Alfarizi Akbar" }],
  openGraph: {
    title: "Fariz — Software Engineer",
    description:
      "Software engineer passionate about building innovative solutions and developer tools. Explore my projects and free online utilities.",
    url: "https://fariz.dev",
    siteName: "Fariz",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fariz — Software Engineer",
    creator: "@FarizInk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfitHeading.variable} ${outfitBody.variable}`}>
      <body>{children}</body>
    </html>
  );
}
