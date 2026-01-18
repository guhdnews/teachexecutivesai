"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth, useUser } from "@/contexts";
import { useRouter } from "next/navigation";
import {
    Users,
    DollarSign,
    TrendingUp,
    BookOpen,
    ArrowUpRight,
    Loader2,
} from "lucide-react";

interface AdminStats {
    totalUsers: number;
    totalRevenue: number;
    activeSubscriptions: number;
    coursesCompleted: number;
}

export function AdminContent() {
    const { user } = useAuth();
    const { profile } = useUser();
    const router = useRouter();
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);

    // Simple admin check - in production, use Firebase custom claims
    const isAdmin = user?.email === "admin@aicoursesforadults.com" ||
        user?.email?.endsWith("@teachexecutivesai.com");

    useEffect(() => {
        if (!user) {
            router.push("/login");
            return;
        }

        if (!isAdmin) {
            router.push("/dashboard");
            return;
        }

        // Mock stats for now - would come from Firestore aggregations
        setStats({
            totalUsers: 2547,
            totalRevenue: 127350,
            activeSubscriptions: 342,
            coursesCompleted: 1893,
        });
        setLoading(false);
    }, [user, isAdmin, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
            </div>
        );
    }

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Admin Header */}
            <header className="bg-navy-900 text-white">
                <div className="container py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
                                <span className="text-navy-900 font-bold text-xl">A</span>
                            </div>
                            <span className="font-semibold text-lg">Admin Dashboard</span>
                        </Link>
                    </div>
                    <nav className="flex items-center gap-6">
                        <Link href="/admin" className="text-gold-400 font-medium">Overview</Link>
                        <Link href="/admin/users" className="hover:text-gold-400">Users</Link>
                        <Link href="/admin/revenue" className="hover:text-gold-400">Revenue</Link>
                        <Link href="/dashboard" className="text-sm text-navy-300 hover:text-white">
                            Exit Admin
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="container py-8">
                <h1 className="text-display-sm text-navy-800 mb-8">Dashboard Overview</h1>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={Users}
                        label="Total Users"
                        value={stats?.totalUsers.toLocaleString() || "0"}
                        change="+12%"
                    />
                    <StatCard
                        icon={DollarSign}
                        label="Total Revenue"
                        value={`$${stats?.totalRevenue.toLocaleString() || "0"}`}
                        change="+8%"
                    />
                    <StatCard
                        icon={TrendingUp}
                        label="Active Subscriptions"
                        value={stats?.activeSubscriptions.toLocaleString() || "0"}
                        change="+5%"
                    />
                    <StatCard
                        icon={BookOpen}
                        label="Courses Completed"
                        value={stats?.coursesCompleted.toLocaleString() || "0"}
                        change="+15%"
                    />
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="card">
                        <h2 className="text-h3 text-navy-800 mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link
                                href="/admin/users"
                                className="flex items-center justify-between p-3 bg-navy-50 rounded-lg hover:bg-navy-100"
                            >
                                <span className="font-medium text-navy-700">Manage Users</span>
                                <ArrowUpRight className="w-5 h-5 text-navy-400" />
                            </Link>
                            <Link
                                href="/admin/revenue"
                                className="flex items-center justify-between p-3 bg-navy-50 rounded-lg hover:bg-navy-100"
                            >
                                <span className="font-medium text-navy-700">View Revenue</span>
                                <ArrowUpRight className="w-5 h-5 text-navy-400" />
                            </Link>
                            <a
                                href="https://dashboard.stripe.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 bg-navy-50 rounded-lg hover:bg-navy-100"
                            >
                                <span className="font-medium text-navy-700">Stripe Dashboard</span>
                                <ArrowUpRight className="w-5 h-5 text-navy-400" />
                            </a>
                            <a
                                href="https://console.firebase.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 bg-navy-50 rounded-lg hover:bg-navy-100"
                            >
                                <span className="font-medium text-navy-700">Firebase Console</span>
                                <ArrowUpRight className="w-5 h-5 text-navy-400" />
                            </a>
                        </div>
                    </div>

                    <div className="card">
                        <h2 className="text-h3 text-navy-800 mb-4">Recent Activity</h2>
                        <div className="space-y-3">
                            <ActivityItem
                                action="New signup"
                                detail="john.doe@example.com"
                                time="5 minutes ago"
                            />
                            <ActivityItem
                                action="Purchase"
                                detail="AI Business Builder - $497"
                                time="12 minutes ago"
                            />
                            <ActivityItem
                                action="Course completed"
                                detail="AI Essentials by Mary S."
                                time="1 hour ago"
                            />
                            <ActivityItem
                                action="New lead"
                                detail="AI Quickstart download"
                                time="2 hours ago"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatCard({
    icon: Icon,
    label,
    value,
    change,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    change: string;
}) {
    return (
        <div className="card">
            <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gold-600" />
                </div>
                <span className="text-sm text-green-600 font-medium">{change}</span>
            </div>
            <p className="text-2xl font-bold text-navy-800">{value}</p>
            <p className="text-sm text-navy-500">{label}</p>
        </div>
    );
}

function ActivityItem({
    action,
    detail,
    time,
}: {
    action: string;
    detail: string;
    time: string;
}) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-navy-100 last:border-0">
            <div>
                <p className="font-medium text-navy-700">{action}</p>
                <p className="text-sm text-navy-500">{detail}</p>
            </div>
            <p className="text-xs text-navy-400">{time}</p>
        </div>
    );
}
