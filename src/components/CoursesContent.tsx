"use client";

import Link from "next/link";
import { useUser } from "@/contexts";
import {
    BookOpen,
    Lock,
    ArrowRight,
    Play,
    Clock,
} from "lucide-react";

type TierType = "free" | "sop" | "caio" | "launchpad";

interface Course {
    id: string;
    title: string;
    description: string;
    totalLessons: number;
    completedLessons: number;
    tier: TierType;
    estimatedTime: string;
}

const courses: Course[] = [
    {
        id: "essentials",
        title: "AI Essentials",
        description: "Master the basics of AI in 11 comprehensive lessons.",
        totalLessons: 11,
        completedLessons: 0,
        tier: "caio",
        estimatedTime: "4 hours",
    },
    {
        id: "advanced",
        title: "Advanced AI Techniques",
        description: "Take your AI skills to the next level with advanced strategies.",
        totalLessons: 8,
        completedLessons: 0,
        tier: "launchpad",
        estimatedTime: "3 hours",
    },
];

export function CoursesContent() {
    const userContext = useUser();
    const hasAccess = userContext?.hasAccess;
    const tier = userContext?.tier || "free";

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-h1 text-navy-800 mb-2">My Courses</h1>
                <p className="text-navy-600">
                    Your learning journey to AI mastery
                </p>
            </div>

            <div className="space-y-6">
                {courses.map((course) => {
                    const hasAccessToCourse = hasAccess ? hasAccess(course.tier) : false;
                    const progress = (course.completedLessons / course.totalLessons) * 100;

                    return (
                        <div
                            key={course.id}
                            className={`card ${!hasAccessToCourse ? "opacity-75" : ""}`}
                        >
                            <div className="flex items-start gap-6">
                                <div
                                    className={`w-16 h-16 rounded-lg flex items-center justify-center ${hasAccessToCourse ? "bg-gold-100" : "bg-navy-100"
                                        }`}
                                >
                                    {hasAccessToCourse ? (
                                        <BookOpen className="w-8 h-8 text-gold-600" />
                                    ) : (
                                        <Lock className="w-8 h-8 text-navy-400" />
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h2 className="text-h2 text-navy-800">{course.title}</h2>
                                            <p className="text-navy-600">{course.description}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-navy-500 mb-4">
                                        <span className="flex items-center gap-1">
                                            <BookOpen className="w-4 h-4" />
                                            {course.totalLessons} lessons
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {course.estimatedTime}
                                        </span>
                                    </div>

                                    {hasAccessToCourse ? (
                                        <>
                                            {/* Progress bar */}
                                            <div className="mb-4">
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-navy-600">Progress</span>
                                                    <span className="text-navy-600">
                                                        {course.completedLessons}/{course.totalLessons} complete
                                                    </span>
                                                </div>
                                                <div className="w-full bg-navy-100 rounded-full h-2">
                                                    <div
                                                        className="bg-gold-500 h-2 rounded-full transition-all"
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                            </div>

                                            <Link
                                                href={`/dashboard/courses/${course.id}`}
                                                className="btn btn-primary"
                                            >
                                                <Play className="w-4 h-4" />
                                                {course.completedLessons > 0 ? "Continue" : "Start"} Course
                                            </Link>
                                        </>
                                    ) : (
                                        <Link
                                            href={course.tier === "caio" ? "/certification" : "/launchpad"}
                                            className="btn btn-outline"
                                        >
                                            <Lock className="w-4 h-4" />
                                            Unlock Course
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Upgrade prompt for free users */}
            {tier === "free" && (
                <div className="card bg-navy-800 text-white mt-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-navy-900" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-h3 mb-1">Ready to Learn?</h3>
                            <p className="text-navy-200">
                                Unlock all courses and start your AI journey today.
                            </p>
                        </div>
                        <Link
                            href="/certification"
                            className="btn bg-gold-500 text-navy-900 hover:bg-gold-400"
                        >
                            Get Started
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
