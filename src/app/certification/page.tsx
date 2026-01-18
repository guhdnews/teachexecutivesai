import { CertificationContent } from "@/components/CertificationContent";

// Force dynamic rendering to skip static prerender
export const dynamic = "force-dynamic";

export const metadata = {
    title: "AI Essentials Bundle | AI for Boomers",
    description: "Master AI basics in 11 simple lessons. Learn ChatGPT, stay safe online, and embrace AI at your own pace.",
};

export default function CertificationPage() {
    return <CertificationContent />;
}
