import { FreeContent } from "@/components/FreeContent";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Free AI Quickstart Training | AI Courses for Adults",
    description:
        "Start your AI journey with our free 15-minute quickstart. Learn what ChatGPT is, try your first prompt, and get 10 starter prompts — all designed for adults 55+.",
    keywords: [
        "free AI training",
        "ChatGPT tutorial",
        "AI for beginners",
        "free AI course",
        "learn AI free",
        "ChatGPT prompts",
        "AI quickstart",
    ],
    openGraph: {
        title: "Free AI Quickstart Training",
        description:
            "Your first AI conversation in 15 minutes. Free training designed for adults who want to learn ChatGPT without the tech jargon.",
        type: "website",
    },
};

export default function FreePage() {
    return <FreeContent />;
}
