import { Metadata } from "next";
import { VerifyContent } from "@/components/VerifyContent";

export const metadata: Metadata = {
    title: "Verify Email | AI Courses for Adults",
    description: "Complete your sign-in by verifying your email",
    robots: { index: false, follow: false },
};

export default function VerifyPage() {
    return <VerifyContent />;
}
