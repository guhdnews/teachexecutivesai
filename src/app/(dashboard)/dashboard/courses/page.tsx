import { CoursesContent } from "@/components/CoursesContent";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "My Courses | AI Courses for Adults",
    description: "Access your AI training courses and track your progress.",
};

export default function CoursesPage() {
    return <CoursesContent />;
}
