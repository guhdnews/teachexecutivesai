import { DashboardContent } from "@/components/DashboardContent";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Dashboard | AI for Boomers",
    description: "Your AI learning dashboard - access courses, tools, and track your progress.",
};

export default function DashboardPage() {
    return <DashboardContent />;
}
