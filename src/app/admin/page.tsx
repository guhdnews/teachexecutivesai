import { AdminContent } from "@/components/AdminContent";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Admin Dashboard | AI Courses for Adults",
    description: "Admin dashboard for managing users, revenue, and content.",
};

export default function AdminPage() {
    return <AdminContent />;
}
