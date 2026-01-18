import { LoginContent } from "@/components/LoginContent";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Log In",
    description: "Sign in to access your AI courses, tools, and personalized dashboard.",
    robots: { index: false, follow: false },
};

export default function LoginPage() {
    return <LoginContent />;
}
