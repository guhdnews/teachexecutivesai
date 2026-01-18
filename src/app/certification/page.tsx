import { CertificationContent } from "@/components/CertificationContent";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "AI Essentials Bundle ($197) | AI Courses for Adults",
    description:
        "Master AI basics in 11 simple lessons. Learn ChatGPT, stay safe online, create AI-generated content, and embrace technology confidently — all at your own pace.",
    keywords: [
        "AI certification",
        "AI essentials course",
        "ChatGPT course",
        "AI training for seniors",
        "learn AI online",
        "AI course $197",
        "ChatGPT lessons",
    ],
    openGraph: {
        title: "AI Essentials Bundle - Master AI in 11 Lessons",
        description:
            "Learn ChatGPT, stay safe online, and create AI content — all designed for adults who want clear guidance without tech jargon. $197 one-time payment.",
        type: "website",
    },
};

export default function CertificationPage() {
    return <CertificationContent />;
}
