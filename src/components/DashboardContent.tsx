"use client";

import Link from "next/link";
import { useUser } from "@/contexts";
import {
    BookOpen,
    Wrench,
    TrendingUp,
    Clock,
    ArrowRight,
    Star,
    Users,
    CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardContent() {
    const { profile, tier, hasAccess } = useUser();

    // Tier display names
    const tierNames: Record<string, string> = {
        free: "Free Member",
        sop: "SOP Bundle",
        caio: "CAIO Certified",
        launchpad: "Launchpad Pro",
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Welcome section */}
            <div className="card bg-gradient-to-br from-navy-800 to-navy-900 text-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-h1 mb-2">
                            Welcome back, {profile?.name?.split(" ")[0] || "there"}! 👋
                        </h1>
                        <p className="text-navy-200">
                            Your membership: <span className="text-gold-400 font-semibold">{tierNames[tier]}</span>
                        </p>
                    </div>
                    {tier === "free" && (
                        <Link
                            href="/sop"
                            className="btn bg-gold-500 text-navy-900 hover:bg-gold-400"
                        >
                            Upgrade Now
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    )}
                </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    icon={BookOpen}
                    label="Courses Available"
                    value={tier === "launchpad" ? "2" : tier === "caio" ? "1" : "0"}
                />
                <StatCard
                    icon={Wrench}
                    label="AI Tools"
                    value={hasAccess("launchpad") ? "3" : "Locked"}
                />
                <StatCard
                    icon={Users}
                    label="Referrals"
                    value="0"
                />
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Continue learning */}
                <div className="lg:col-span-2 card">
                    <h2 className="text-h2 text-navy-800 mb-4">Your Learning Path</h2>

                    {tier === "free" ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-navy-400" />
                            </div>
                            <p className="text-navy-600 mb-4">
                                You haven&apos;t enrolled in any courses yet.
                            </p>
                            <Link href="/sop" className="btn btn-primary">
                                Get Started with AI SOPs
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* CAIO Course Card */}
                            {hasAccess("caio") && (
                                <CourseCard
                                    title="Chief AI Officer (CAIO) Certification"
                                    progress={0}
                                    lessons={11}
                                    duration="4-6 weeks"
                                    href="/dashboard/courses/caio"
                                />
                            )}

                            {/* Launchpad Course Card */}
                            {hasAccess("launchpad") && (
                                <CourseCard
                                    title="Wisdom Consultant Launchpad"
                                    progress={0}
                                    lessons={13}
                                    duration="4-6 weeks"
                                    href="/dashboard/courses/launchpad"
                                />
                            )}
                        </div>
                    )}
                </div>

                {/* Quick actions / Upsell */}
                <div className="card">
                    <h2 className="text-h2 text-navy-800 mb-4">Quick Actions</h2>

                    <div className="space-y-3">
                        {hasAccess("launchpad") && (
                            <>
                                <QuickAction
                                    icon={Star}
                                    label="Find Your Niche"
                                    href="/dashboard/tools/niche-architect"
                                />
                                <QuickAction
                                    icon={TrendingUp}
                                    label="Create Content"
                                    href="/dashboard/tools/authority-engine"
                                />
                            </>
                        )}

                        <QuickAction
                            icon={Users}
                            label="Share & Earn 20%"
                            href="/dashboard/referrals"
                        />
                    </div>

                    {/* Upgrade prompt for non-launchpad */}
                    {!hasAccess("launchpad") && (
                        <div className="mt-6 p-4 bg-gold-50 rounded-lg border border-gold-200">
                            <p className="text-sm text-navy-700 mb-3">
                                🔒 Unlock AI Tools with Launchpad
                            </p>
                            <Link
                                href="/launchpad"
                                className="btn btn-primary w-full text-sm"
                            >
                                Learn More
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Stat Card Component
function StatCard({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
}) {
    return (
        <div className="card flex items-center gap-4">
            <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center">
                <Icon className="w-6 h-6 text-navy-600" />
            </div>
            <div>
                <p className="text-sm text-navy-500">{label}</p>
                <p className="text-xl font-semibold text-navy-800">{value}</p>
            </div>
        </div>
    );
}

// Course Card Component
function CourseCard({
    title,
    progress,
    lessons,
    duration,
    href,
}: {
    title: string;
    progress: number;
    lessons: number;
    duration: string;
    href: string;
}) {
    const completedLessons = Math.round((progress / 100) * lessons);

    return (
        <Link
            href={href}
            className="block p-4 bg-navy-50 rounded-lg hover:bg-navy-100 transition-colors"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <h3 className="font-semibold text-navy-800">{title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-navy-500">
                        <span className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            {completedLessons}/{lessons} lessons
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {duration}
                        </span>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-sm font-medium text-navy-600">{progress}%</span>
                    <div className="w-16 h-2 bg-navy-200 rounded-full mt-1">
                        <div
                            className="h-full bg-gold-500 rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
}

// Quick Action Component
function QuickAction({
    icon: Icon,
    label,
    href,
}: {
    icon: React.ElementType;
    label: string;
    href: string;
}) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 p-3 bg-navy-50 rounded-lg hover:bg-navy-100 transition-colors"
        >
            <Icon className="w-5 h-5 text-navy-600" />
            <span className="flex-1 text-navy-700">{label}</span>
            <ArrowRight className="w-4 h-4 text-navy-400" />
        </Link>
    );
}
