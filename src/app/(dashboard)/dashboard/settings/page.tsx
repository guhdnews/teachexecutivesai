import { SettingsContent } from "@/components/SettingsContent";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Settings | AI Courses for Adults",
    description: "Manage your account settings, profile, and security.",
};

export default function SettingsPage() {
    return <SettingsContent />;
}
