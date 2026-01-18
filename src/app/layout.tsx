import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Toaster } from "sonner";

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
    default: "AI for Boomers - Learn AI at Your Own Pace",
    template: "%s | AI for Boomers",
  },
  description:
    "AI training designed for adults 55 and older. Learn to use ChatGPT, stay safe online, and embrace technology — all at your own pace. No tech jargon, just clear guidance.",
  keywords: [
    "AI for seniors",
    "AI for older adults",
    "learn AI",
    "ChatGPT for beginners",
    "AI training",
    "boomer AI course",
    "senior technology training",
    "AI for retirees",
    "digital literacy seniors",
    "AI safety for seniors",
  ],
  authors: [{ name: "AI for Boomers" }],
  creator: "AI for Boomers",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aiforboomers.com",
    siteName: "AI for Boomers",
    title: "AI for Boomers - Learn AI at Your Own Pace",
    description:
      "AI training designed for adults 55 and older. Learn to use ChatGPT, stay safe online, and embrace technology — all at your own pace.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI for Boomers - Learn AI at Your Own Pace",
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
          <Toaster
            position="top-center"
            richColors
            closeButton
            toastOptions={{
              duration: 5000,
              className: "text-base",
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
