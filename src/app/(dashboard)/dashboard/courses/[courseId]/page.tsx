"use client";

// Force dynamic rendering - this page uses auth context
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/contexts";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Circle,
    Play,
    FileText,
    Clock,
    Lock,
} from "lucide-react";

// Course data (in production, this would come from Firestore)
type TierType = "free" | "sop" | "caio" | "launchpad";
const courseData: Record<string, {
    title: string;
    tier: TierType;
    lessons: { id: string; title: string; duration: string; type: "video" | "text" }[];
}> = {
    essentials: {
        title: "AI Essentials",
        tier: "caio",
        lessons: [
            { id: "1", title: "Welcome & Course Overview", duration: "5 min", type: "video" },
            { id: "2", title: "What AI Really Is (No Jargon)", duration: "15 min", type: "video" },
            { id: "3", title: "How ChatGPT Works in Plain English", duration: "20 min", type: "video" },
            { id: "4", title: "Your First AI Conversation", duration: "15 min", type: "video" },
            { id: "5", title: "Writing Better Emails with AI", duration: "25 min", type: "video" },
            { id: "6", title: "Researching Any Topic Quickly", duration: "20 min", type: "video" },
            { id: "7", title: "Summarizing Long Articles", duration: "15 min", type: "video" },
            { id: "8", title: "Spotting AI Scams and Deepfakes", duration: "25 min", type: "video" },
            { id: "9", title: "Protecting Your Personal Information", duration: "20 min", type: "video" },
            { id: "10", title: "Password Security That Works", duration: "15 min", type: "video" },
            { id: "11", title: "Your AI Action Plan", duration: "10 min", type: "text" },
        ],
    },
    advanced: {
        title: "Advanced AI Techniques",
        tier: "launchpad",
        lessons: [
            { id: "1", title: "Beyond ChatGPT: Other AI Tools", duration: "20 min", type: "video" },
            { id: "2", title: "Advanced Prompting Techniques", duration: "25 min", type: "video" },
            { id: "3", title: "AI for Creative Projects", duration: "20 min", type: "video" },
            { id: "4", title: "Building Your Personal AI Workflow", duration: "25 min", type: "video" },
            { id: "5", title: "AI for Business Ideas", duration: "20 min", type: "video" },
            { id: "6", title: "Staying Current with AI", duration: "15 min", type: "video" },
            { id: "7", title: "Common AI Mistakes to Avoid", duration: "15 min", type: "video" },
            { id: "8", title: "Your Path Forward", duration: "10 min", type: "text" },
        ],
    },
};

export default function CourseDetailPage() {
    const params = useParams();
    const courseId = params.courseId as string;
    const { hasAccess } = useUser();

    const [completedLessons, setCompletedLessons] = useState<string[]>([]);
    const [currentLesson, setCurrentLesson] = useState<string | null>(null);

    const course = courseData[courseId];

    if (!course) {
        return (
            <div className="max-w-2xl mx-auto text-center py-12">
                <h1 className="text-h1 text-navy-800 mb-4">Course Not Found</h1>
                <Link href="/dashboard/courses" className="btn btn-primary">
                    Back to Courses
                </Link>
            </div>
        );
    }

    if (!hasAccess(course.tier)) {
        return (
            <div className="max-w-2xl mx-auto text-center py-12">
                <div className="w-20 h-20 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-10 h-10 text-navy-400" />
                </div>
                <h1 className="text-h1 text-navy-800 mb-4">{course.title}</h1>
                <p className="text-navy-600 mb-8">
                    This course requires the {course.tier === "caio" ? "AI Essentials" : "Complete Mastery"} plan.
                </p>
                <Link
                    href={course.tier === "caio" ? "/certification" : "/launchpad"}
                    className="btn btn-primary"
                >
                    Unlock This Course
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        );
    }

    const toggleComplete = (lessonId: string) => {
        setCompletedLessons((prev) =>
            prev.includes(lessonId)
                ? prev.filter((id) => id !== lessonId)
                : [...prev, lessonId]
        );
    };

    const progress = (completedLessons.length / course.lessons.length) * 100;
    const activeLesson = currentLesson
        ? course.lessons.find((l) => l.id === currentLesson)
        : course.lessons[0];

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <Link
                    href="/dashboard/courses"
                    className="text-navy-500 hover:text-navy-700 flex items-center gap-2 mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Courses
                </Link>
                <h1 className="text-h1 text-navy-800 mb-2">{course.title}</h1>
                <div className="flex items-center gap-4">
                    <div className="flex-1 max-w-xs">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-navy-600">Progress</span>
                            <span className="text-navy-600">
                                {completedLessons.length}/{course.lessons.length} complete
                            </span>
                        </div>
                        <div className="w-full bg-navy-100 rounded-full h-2">
                            <div
                                className="bg-gold-500 h-2 rounded-full transition-all"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main content area */}
                <div className="lg:col-span-2">
                    <div className="card">
                        {activeLesson?.type === "video" ? (
                            <div className="aspect-video bg-navy-900 rounded-lg flex items-center justify-center mb-6">
                                <div className="text-center text-white">
                                    <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <p className="text-navy-300">Video: {activeLesson.title}</p>
                                    <p className="text-sm text-navy-400 mt-2">
                                        Video content will be embedded here
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-navy-50 rounded-lg p-8 mb-6">
                                <FileText className="w-12 h-12 text-navy-400 mx-auto mb-4" />
                                <p className="text-center text-navy-600">
                                    Text lesson: {activeLesson?.title}
                                </p>
                            </div>
                        )}

                        <h2 className="text-h2 text-navy-800 mb-4">{activeLesson?.title}</h2>

                        <div className="prose text-navy-600">
                            <p>
                                This is where the lesson content would appear. In a production environment,
                                this content would be loaded from your CMS or Firestore database.
                            </p>
                            <p>
                                Each lesson includes video content (or text for reading lessons),
                                action items, and resources to help you apply what you&apos;ve learned.
                            </p>
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between mt-8 pt-6 border-t border-navy-200">
                            <button
                                onClick={() => {
                                    const currentIndex = course.lessons.findIndex((l) => l.id === activeLesson?.id);
                                    if (currentIndex > 0) {
                                        setCurrentLesson(course.lessons[currentIndex - 1].id);
                                    }
                                }}
                                disabled={activeLesson?.id === course.lessons[0].id}
                                className="btn btn-outline disabled:opacity-50"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Previous
                            </button>
                            <button
                                onClick={() => {
                                    if (activeLesson) toggleComplete(activeLesson.id);
                                    const currentIndex = course.lessons.findIndex((l) => l.id === activeLesson?.id);
                                    if (currentIndex < course.lessons.length - 1) {
                                        setCurrentLesson(course.lessons[currentIndex + 1].id);
                                    }
                                }}
                                className="btn btn-primary"
                            >
                                {completedLessons.includes(activeLesson?.id || "")
                                    ? "Next Lesson"
                                    : "Mark Complete & Continue"}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Lesson list */}
                <div className="lg:col-span-1">
                    <div className="card sticky top-24">
                        <h3 className="text-h3 text-navy-800 mb-4">Lessons</h3>
                        <div className="space-y-2">
                            {course.lessons.map((lesson, index) => {
                                const isCompleted = completedLessons.includes(lesson.id);
                                const isActive = lesson.id === (currentLesson || course.lessons[0].id);

                                return (
                                    <button
                                        key={lesson.id}
                                        onClick={() => setCurrentLesson(lesson.id)}
                                        className={`w-full text-left p-3 rounded-lg flex items-start gap-3 transition-colors ${isActive
                                            ? "bg-gold-50 border border-gold-200"
                                            : "hover:bg-navy-50"
                                            }`}
                                    >
                                        <div className="flex-shrink-0 mt-0.5">
                                            {isCompleted ? (
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                            ) : (
                                                <Circle className="w-5 h-5 text-navy-300" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p
                                                className={`text-sm font-medium truncate ${isActive ? "text-navy-800" : "text-navy-600"
                                                    }`}
                                            >
                                                {index + 1}. {lesson.title}
                                            </p>
                                            <p className="text-xs text-navy-400 flex items-center gap-1 mt-1">
                                                <Clock className="w-3 h-3" />
                                                {lesson.duration}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
