"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts";
import { useRouter } from "next/navigation";
import {
    Users,
    Search,
    ChevronLeft,
    ChevronRight,
    Loader2,
    Mail,
    Calendar,
    Shield,
} from "lucide-react";

interface User {
    id: string;
    email: string;
    name: string;
    tier: "free" | "sop" | "caio" | "launchpad";
    createdAt: string;
}

export function AdminUsersContent() {
    const { user } = useAuth();
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

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

        // Mock users for now - would come from Firestore
        setUsers([
            { id: "1", email: "robert.m@example.com", name: "Robert M.", tier: "launchpad", createdAt: "2026-01-15" },
            { id: "2", email: "patricia.k@example.com", name: "Patricia K.", tier: "caio", createdAt: "2026-01-14" },
            { id: "3", email: "james.t@example.com", name: "James T.", tier: "launchpad", createdAt: "2026-01-12" },
            { id: "4", email: "carol.a@example.com", name: "Carol A.", tier: "free", createdAt: "2026-01-10" },
            { id: "5", email: "william.h@example.com", name: "William H.", tier: "sop", createdAt: "2026-01-08" },
        ]);
        setLoading(false);
    }, [user, isAdmin, router]);

    const filteredUsers = users.filter(u =>
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const tierColors = {
        free: "bg-gray-100 text-gray-700",
        sop: "bg-blue-100 text-blue-700",
        caio: "bg-purple-100 text-purple-700",
        launchpad: "bg-gold-100 text-gold-700",
    };

    const tierLabels = {
        free: "Free",
        sop: "SOP Bundle",
        caio: "AI Essentials",
        launchpad: "Business Builder",
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
            </div>
        );
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
                        <Link href="/admin" className="hover:text-gold-400">Overview</Link>
                        <Link href="/admin/users" className="text-gold-400 font-medium">Users</Link>
                        <Link href="/admin/revenue" className="hover:text-gold-400">Revenue</Link>
                        <Link href="/dashboard" className="text-sm text-navy-300 hover:text-white">
                            Exit Admin
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="container py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-display-sm text-navy-800">User Management</h1>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-navy-50">
                            <tr>
                                <th className="text-left p-4 text-navy-700 font-semibold">User</th>
                                <th className="text-left p-4 text-navy-700 font-semibold">Tier</th>
                                <th className="text-left p-4 text-navy-700 font-semibold">Joined</th>
                                <th className="text-right p-4 text-navy-700 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((u) => (
                                <tr key={u.id} className="border-t border-navy-100 hover:bg-navy-50">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-navy-200 rounded-full flex items-center justify-center">
                                                <Users className="w-5 h-5 text-navy-500" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-navy-800">{u.name}</p>
                                                <p className="text-sm text-navy-500">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${tierColors[u.tier]}`}>
                                            {tierLabels[u.tier]}
                                        </span>
                                    </td>
                                    <td className="p-4 text-navy-600">{u.createdAt}</td>
                                    <td className="p-4 text-right">
                                        <button className="text-gold-600 hover:text-gold-700 font-medium text-sm">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex items-center justify-between p-4 border-t border-navy-100">
                        <p className="text-sm text-navy-500">
                            Showing {filteredUsers.length} of {users.length} users
                        </p>
                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-navy-100 rounded">
                                <ChevronLeft className="w-5 h-5 text-navy-500" />
                            </button>
                            <button className="p-2 hover:bg-navy-100 rounded">
                                <ChevronRight className="w-5 h-5 text-navy-500" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
