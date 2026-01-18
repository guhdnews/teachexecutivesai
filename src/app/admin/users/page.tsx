import { AdminUsersContent } from "@/components/AdminUsersContent";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "User Management | Admin | AI Courses for Adults",
    description: "Manage users, tiers, and access.",
};

export default function AdminUsersPage() {
    return <AdminUsersContent />;
}
