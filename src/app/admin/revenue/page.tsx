import { AdminRevenueContent } from "@/components/AdminRevenueContent";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Revenue Dashboard | Admin | AI Courses for Adults",
    description: "View revenue, transactions, and payment analytics.",
};

export default function AdminRevenuePage() {
    return <AdminRevenueContent />;
}
