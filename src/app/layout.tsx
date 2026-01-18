import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

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
    "AI training",
    "AI consulting business",
    "senior technology training",
    "AI for retirees",
    "digital literacy seniors",
    "AI safety for seniors",
  ],
  authors: [{ name: "AI Courses for Adults" }],
  creator: "AI Courses for Adults",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aicoursesforadults.com",
    siteName: "AI Courses for Adults",
    title: "AI Courses for Adults - Learn AI at Your Own Pace",
    description:
      "AI training designed for adults 55 and older. Learn to use ChatGPT, stay safe online, and start your own AI consulting business.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Courses for Adults - Learn AI at Your Own Pace",
    description:
      "AI training designed for adults 55+. No tech jargon, just clear guidance.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
