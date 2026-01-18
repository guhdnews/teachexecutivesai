import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default: "Executive AI Institute | Turn Experience Into AI-Powered Income",
    template: "%s | Executive AI Institute",
  },
  description:
    "Learn how retired executives use AI as their digital staff to build profitable consulting practices. No tech skills required. Join 1,000+ professionals.",
  keywords: [
    "AI for executives",
    "AI training for professionals",
    "executive AI education",
    "consulting for retirees",
    "AI certification",
    "CAIO certification",
  ],
  authors: [{ name: "Executive AI Institute" }],
  creator: "Executive AI Institute",
  publisher: "Executive AI Institute",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Executive AI Institute",
    title: "Executive AI Institute | Turn Experience Into AI-Powered Income",
    description:
      "Learn how retired executives use AI as their digital staff to build profitable consulting practices. No tech skills required.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Executive AI Institute",
    description:
      "Turn 40+ years of experience into a profitable AI-powered consulting business.",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1e3a5f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
