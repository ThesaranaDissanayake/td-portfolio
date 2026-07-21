import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import "../styles/syntax-highlighting.css";
import "../styles/mdx-typography.css";

import ThemeProvider from "@/theme/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeaderBlurOverlay from "@/components/HeaderBlurOverlay";
import Providers from "@/components/Providers";
import { profile } from "@/features/profile.config";

// Editorial serif display — the signature voice for headings.
const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

// Clean grotesque for body copy and UI.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Mono utility face — labels, section numbers, code.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: profile.fullName,
  description: profile.siteDescription,

  keywords: [
    profile.fullName,
    "Digital Transformation",
    "Software Engineering",
    "Automation",
    "Business Analysis",
    "Portfolio",
    "Process Improvement",
    "Data Analytics",
    "React",
    "Next.js",
  ],

  authors: [{ name: profile.fullName }],
  creator: profile.fullName,
  publisher: profile.fullName,

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: profile.siteName,
    description: profile.siteDescription,
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: profile.siteName,
  },

  twitter: {
    card: "summary_large_image",
    title: profile.siteName,
    description: profile.siteDescription,
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/icon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#C2410C",
      },
    ],
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      >
        <Providers>
          <ThemeProvider>
            <Header />
            <HeaderBlurOverlay />
            {children}
            <Footer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}