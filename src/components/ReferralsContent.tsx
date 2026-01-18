"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/contexts";
import { doc, collection, getDocs, query, where } from "firebase/firestore";
import { getClientDb } from "@/lib/firebase";
import {
    Users,
    Copy,
    ExternalLink,
    DollarSign,
    TrendingUp,
    Gift,
    CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

interface Referral {
    id: string;
    referredUserId: string;
    purchaseAmount: number;
    commission: number;
    status: "pending" | "paid";
    createdAt: Date;
}

export function ReferralsContent() {
    const { profile } = useUser();
    const [referrals, setReferrals] = useState<Referral[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const referralLink = profile?.referralCode
        ? `${typeof window !== "undefined" ? window.location.origin : ""}/free?ref=${profile.referralCode}`
        : "";

    useEffect(() => {
        const fetchReferrals = async () => {
            if (!profile?.id) {
                setIsLoading(false);
                return;
            }

            const db = getClientDb();
            if (!db) {
                setIsLoading(false);
                return;
            }

            try {
                const q = query(
                    collection(db, "referrals"),
                    where("referrerId", "==", profile.id)
                );
                const snapshot = await getDocs(q);
                const refs: Referral[] = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate() || new Date(),
                })) as Referral[];

                setReferrals(refs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
            } catch (error) {
                console.error("Error fetching referrals:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReferrals();
    }, [profile?.id]);

    const copyLink = () => {
        navigator.clipboard.writeText(referralLink);
        toast.success("Link copied to clipboard!");
    };

    const totalEarnings = referrals.reduce((sum, r) => sum + r.commission, 0) / 100;
    const pendingEarnings = referrals
        .filter((r) => r.status === "pending")
        .reduce((sum, r) => sum + r.commission, 0) / 100;
    const paidEarnings = referrals
        .filter((r) => r.status === "paid")
        .reduce((sum, r) => sum + r.commission, 0) / 100;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-h1 text-navy-800 mb-2">Referral Program</h1>
                <p className="text-navy-600">
                    Earn 20% commission on every sale from people you refer
                </p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    icon={DollarSign}
                    label="Total Earnings"
                    value={`$${totalEarnings.toFixed(2)}`}
                />
                <StatCard
                    icon={TrendingUp}
                    label="Pending"
                    value={`$${pendingEarnings.toFixed(2)}`}
                />
                <StatCard
                    icon={CheckCircle}
                    label="Paid Out"
                    value={`$${paidEarnings.toFixed(2)}`}
                />
            </div>

            {/* Share Link */}
            <div className="card mb-8">
                <h2 className="text-h2 text-navy-800 mb-4">Your Referral Link</h2>
                <p className="text-navy-600 mb-4">
                    Share this link with friends and family. When they purchase any course,
                    you earn 20% commission!
                </p>

                <div className="flex gap-3">
                    <input
                        type="text"
                        value={referralLink}
                        readOnly
                        className="input flex-1 bg-navy-50"
                    />
                    <button onClick={copyLink} className="btn btn-primary">
                        <Copy className="w-4 h-4" />
                        Copy
                    </button>
                </div>

                <div className="flex gap-4 mt-4">
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-navy-600 hover:text-navy-800 flex items-center gap-1"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Share on Facebook
                    </a>
                    <a
                        href={`mailto:?subject=Learn AI at your own pace&body=I thought you might be interested in this AI training for our generation: ${referralLink}`}
                        className="text-sm text-navy-600 hover:text-navy-800 flex items-center gap-1"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Share via Email
                    </a>
                </div>
            </div>

            {/* How It Works */}
            <div className="card bg-navy-50 mb-8">
                <h2 className="text-h2 text-navy-800 mb-4">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-gold-600 font-bold">1</span>
                        </div>
                        <h3 className="font-semibold text-navy-800 mb-1">Share Your Link</h3>
                        <p className="text-sm text-navy-600">
                            Send your unique link to friends and family
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-gold-600 font-bold">2</span>
                        </div>
                        <h3 className="font-semibold text-navy-800 mb-1">They Purchase</h3>
                        <p className="text-sm text-navy-600">
                            When they buy any course, you get credited
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-gold-600 font-bold">3</span>
                        </div>
                        <h3 className="font-semibold text-navy-800 mb-1">Get Paid</h3>
                        <p className="text-sm text-navy-600">
                            Receive 20% of each sale as commission
                        </p>
                    </div>
                </div>
            </div>

            {/* Referral History */}
            <div className="card">
                <h2 className="text-h2 text-navy-800 mb-4">Referral History</h2>

                {isLoading ? (
                    <p className="text-navy-500 text-center py-8">Loading...</p>
                ) : referrals.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-navy-400" />
                        </div>
                        <p className="text-navy-500 mb-2">No referrals yet</p>
                        <p className="text-sm text-navy-400">
                            Share your link to start earning!
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-navy-200">
                                    <th className="text-left py-3 text-navy-600 font-medium">Date</th>
                                    <th className="text-left py-3 text-navy-600 font-medium">Sale</th>
                                    <th className="text-left py-3 text-navy-600 font-medium">Commission</th>
                                    <th className="text-left py-3 text-navy-600 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {referrals.map((referral) => (
                                    <tr key={referral.id} className="border-b border-navy-100">
                                        <td className="py-3 text-navy-700">
                                            {referral.createdAt.toLocaleDateString()}
                                        </td>
                                        <td className="py-3 text-navy-700">
                                            ${(referral.purchaseAmount / 100).toFixed(2)}
                                        </td>
                                        <td className="py-3 text-gold-600 font-medium">
                                            ${(referral.commission / 100).toFixed(2)}
                                        </td>
                                        <td className="py-3">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${referral.status === "paid"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-amber-100 text-amber-700"
                                                    }`}
                                            >
                                                {referral.status === "paid" ? "Paid" : "Pending"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

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
