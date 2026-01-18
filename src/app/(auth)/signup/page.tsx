import { SignupContent } from "@/components/SignupContent";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Create Free Account",
    description:
        "Join thousands of adults learning AI. Create your free account to access courses, tools, and a supportive community.",
    robots: { index: false, follow: false },
};

export default function SignupPage() {
    return <SignupContent />;
}
