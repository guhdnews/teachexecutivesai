import { FreeContent } from "@/components/FreeContent";

// Force dynamic rendering to skip static prerender
export const dynamic = "force-dynamic";

export const metadata = {
    title: "Free AI Quickstart | AI for Boomers",
    description: "Your first AI conversation in 5 minutes. Free training for adults 55+ who want to learn ChatGPT.",
};

export default function FreePage() {
    return <FreeContent />;
}
