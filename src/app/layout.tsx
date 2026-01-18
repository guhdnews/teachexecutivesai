import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { CookieConsent } from "@/components/CookieConsent";

// Body font - Inter for readability
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Display font - Outfit for headings
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://aicoursesforadults.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI Courses for Adults - Learn AI at Your Own Pace",
    template: "%s | AI Courses for Adults",
  },
  description:
    "AI training designed for adults 55 and older. Learn to use ChatGPT, stay safe online, and even start your own AI consulting business — all at your own pace.",
  keywords: [
    "AI courses for adults",
    "AI for seniors",
    "AI for older adults",
    "learn AI",
    "ChatGPT for beginners",
    "AI training over 50",
    "AI consulting business",
    "senior technology training",
    "AI for retirees",
    "digital literacy seniors",
    "AI safety for seniors",
    "ChatGPT tutorials for seniors",
    "AI education baby boomers",
  ],
  authors: [{ name: "AI Courses for Adults", url: siteUrl }],
  creator: "AI Courses for Adults",
  publisher: "AI Courses for Adults",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "AI Courses for Adults",
    title: "AI Courses for Adults - Learn AI at Your Own Pace",
    description:
      "AI training designed for adults 55 and older. Learn to use ChatGPT, stay safe online, and start your own AI consulting business.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Courses for Adults - Learn AI at Your Own Pace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Courses for Adults - Learn AI at Your Own Pace",
    description:
      "AI training designed for adults 55+. No tech jargon, just clear guidance.",
    images: ["/images/og-image.png"],
    creator: "@AICoursesAdults",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
  category: "education",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1e3a5f",
  colorScheme: "light",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "AI Courses for Adults",
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  description:
    "AI training designed for adults 55 and older. Learn to use ChatGPT, stay safe online, and start your own AI consulting business.",
  sameAs: [
    "https://twitter.com/AICoursesAdults",
    "https://www.facebook.com/AICoursesForAdults",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@aicoursesforadults.com",
    contactType: "customer service",
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0",
    highPrice: "497",
    offerCount: "3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Providers>
          {children}
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
