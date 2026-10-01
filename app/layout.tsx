import type { Metadata } from "next";
import { Outfit, Bebas_Neue } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

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
  metadataBase: new URL(SITE_URL),
  title: "Fariz — Software Engineer",
  description:
    "Software engineer passionate about building innovative solutions and developer tools. Explore my projects and free online utilities.",
  keywords: ["fariz", "software engineer", "backend developer", "typescript", "svelte"],
  authors: [{ name: "Nizar Alfarizi Akbar" }],
  openGraph: {
    title: "Fariz — Software Engineer",
    description:
      "Software engineer passionate about building innovative solutions and developer tools. Explore my projects and free online utilities.",
    url: SITE_URL,
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
    <html lang="en" suppressHydrationWarning className={`${bebasNeue.variable} ${outfitHeading.variable} ${outfitBody.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-md focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-[var(--bg)] focus:no-underline">
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
        {process.env.VERCEL === "1" ? <Analytics /> : null}
      </body>
    </html>
  );
}
