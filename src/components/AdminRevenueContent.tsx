"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts";
import { useRouter } from "next/navigation";
import {
    DollarSign,
    TrendingUp,
    CreditCard,
    Users,
    Loader2,
    ExternalLink,
} from "lucide-react";

interface RevenueData {
    today: number;
    thisWeek: number;
    thisMonth: number;
    allTime: number;
    recentTransactions: {
        id: string;
        customer: string;
        product: string;
        amount: number;
        date: string;
    }[];
}

export function AdminRevenueContent() {
    const { user } = useAuth();
    const router = useRouter();
    const [data, setData] = useState<RevenueData | null>(null);
    const [loading, setLoading] = useState(true);

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

        // Mock revenue data - would come from Stripe API
        setData({
            today: 994,
            thisWeek: 4485,
            thisMonth: 18740,
            allTime: 127350,
            recentTransactions: [
                { id: "pi_1", customer: "robert.m@example.com", product: "AI Business Builder", amount: 497, date: "2026-01-18 2:15 PM" },
                { id: "pi_2", customer: "patricia.k@example.com", product: "AI Essentials Bundle", amount: 197, date: "2026-01-18 11:30 AM" },
                { id: "pi_3", customer: "james.t@example.com", product: "AI Business Builder", amount: 497, date: "2026-01-17 4:45 PM" },
                { id: "pi_4", customer: "carol.a@example.com", product: "AI SOPs Bundle", amount: 37, date: "2026-01-17 10:00 AM" },
                { id: "pi_5", customer: "william.h@example.com", product: "AI Essentials Bundle", amount: 197, date: "2026-01-16 3:20 PM" },
            ],
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
                        <Link href="/admin/users" className="hover:text-gold-400">Users</Link>
                        <Link href="/admin/revenue" className="text-gold-400 font-medium">Revenue</Link>
                        <Link href="/dashboard" className="text-sm text-navy-300 hover:text-white">
                            Exit Admin
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="container py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-display-sm text-navy-800">Revenue Dashboard</h1>
                    <a
                        href="https://dashboard.stripe.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary flex items-center gap-2"
                    >
                        <span>Open Stripe</span>
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>

                {/* Revenue Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <RevenueCard
                        icon={DollarSign}
                        label="Today"
                        value={`$${data?.today.toLocaleString() || "0"}`}
                    />
                    <RevenueCard
                        icon={TrendingUp}
                        label="This Week"
                        value={`$${data?.thisWeek.toLocaleString() || "0"}`}
                    />
                    <RevenueCard
                        icon={CreditCard}
                        label="This Month"
                        value={`$${data?.thisMonth.toLocaleString() || "0"}`}
                    />
                    <RevenueCard
                        icon={Users}
                        label="All Time"
                        value={`$${data?.allTime.toLocaleString() || "0"}`}
                        highlight
                    />
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-4 border-b border-navy-100">
                        <h2 className="text-h3 text-navy-800">Recent Transactions</h2>
                    </div>
                    <table className="w-full">
                        <thead className="bg-navy-50">
                            <tr>
                                <th className="text-left p-4 text-navy-700 font-semibold">Customer</th>
                                <th className="text-left p-4 text-navy-700 font-semibold">Product</th>
                                <th className="text-left p-4 text-navy-700 font-semibold">Amount</th>
                                <th className="text-left p-4 text-navy-700 font-semibold">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.recentTransactions.map((tx) => (
                                <tr key={tx.id} className="border-t border-navy-100 hover:bg-navy-50">
                                    <td className="p-4 text-navy-700">{tx.customer}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${tx.product.includes("Business")
                                                ? "bg-gold-100 text-gold-700"
                                                : tx.product.includes("Essentials")
                                                    ? "bg-purple-100 text-purple-700"
                                                    : "bg-blue-100 text-blue-700"
                                            }`}>
                                            {tx.product}
                                        </span>
                                    </td>
                                    <td className="p-4 font-semibold text-navy-800">${tx.amount}</td>
                                    <td className="p-4 text-navy-500">{tx.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

function RevenueCard({
    icon: Icon,
    label,
    value,
    highlight = false,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    highlight?: boolean;
}) {
    return (
        <div className={`card ${highlight ? "border-2 border-gold-400" : ""}`}>
            <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${highlight ? "bg-gold-500" : "bg-gold-100"
                    }`}>
                    <Icon className={`w-5 h-5 ${highlight ? "text-navy-900" : "text-gold-600"}`} />
                </div>
                <span className="text-sm text-navy-500">{label}</span>
            </div>
            <p className={`text-2xl font-bold ${highlight ? "text-gold-600" : "text-navy-800"}`}>
                {value}
            </p>
        </div>
    );
}
