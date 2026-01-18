import { LaunchpadContent } from "@/components/LaunchpadContent";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "AI Business Builder ($497) | AI Courses for Adults",
    description:
        "Master AI AND start your own consulting business. Everything in AI Essentials plus business tools, client templates, niche finder, and deal-closing guides.",
    keywords: [
        "AI consulting business",
        "start a business after retirement",
        "consulting for retirees",
        "AI business tools",
        "second career after 55",
        "AI entrepreneur course",
        "ChatGPT business",
        "make money with AI",
    ],
    openGraph: {
        title: "AI Business Builder - Turn Experience Into Income",
        description:
            "Everything you need to master AI AND start your own consulting business. $497 one-time payment, 30-day money-back guarantee.",
        type: "website",
    },
};

export default function LaunchpadPage() {
    return <LaunchpadContent />;
}
