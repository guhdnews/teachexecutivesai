import { DashboardContent } from "@/components/DashboardContent";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Dashboard | AI Courses for Adults",
    description: "Your AI learning dashboard - access courses, tools, and track your progress.",
};

export default function DashboardPage() {
    return <DashboardContent />;
}
