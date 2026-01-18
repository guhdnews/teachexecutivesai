"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth, useUser } from "@/contexts";
import {
    CheckCircle,
    Target,
    TrendingUp,
    FileText,
    Users,
    Star,
    Gift,
    ArrowRight,
    Loader2,
    Briefcase,
    Rocket,
} from "lucide-react";
import { toast } from "sonner";

const includedItems = [
    {
        title: "Everything in AI Essentials",
        description: "All 11 lessons from our foundational course",
    },
    {
        title: "Niche Architect AI Tool",
        description: "Find your profitable consulting niche based on your experience",
    },
    {
        title: "Authority Engine AI Tool",
        description: "Generate LinkedIn posts, newsletters, and emails",
    },
    {
        title: "Deal Maker AI Tool",
        description: "Create professional proposals and contracts in minutes",
    },
    {
        title: "Private Community Access",
        description: "Connect with others on the same journey",
    },
    {
        title: "Bonus: 1-on-1 Strategy Call",
        description: "30-minute call to help you get started",
    },
];

const comparison = [
    { feature: "Video lessons", essentials: "11", mastery: "11 + Advanced" },
    { feature: "AI safety training", essentials: "✓", mastery: "✓" },
    { feature: "Certificate", essentials: "✓", mastery: "✓" },
    { feature: "AI tools access", essentials: "—", mastery: "3 Tools" },
    { feature: "Business building", essentials: "—", mastery: "Full System" },
    { feature: "Community access", essentials: "Basic", mastery: "Private VIP" },
    { feature: "1-on-1 support", essentials: "—", mastery: "30-min call" },
    { feature: "Lifetime updates", essentials: "✓", mastery: "✓" },
];

export function LaunchpadContent() {
    const { user } = useAuth();
    const userContext = useUser();
    const [isLoading, setIsLoading] = useState(false);

    const hasAccess = userContext?.hasAccess;
    const alreadyPurchased = hasAccess ? hasAccess("launchpad") : false;

    const handlePurchase = async () => {
        if (!user) {
            toast.info("Please log in to purchase");
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_LAUNCHPAD,
                    userId: user.uid,
                    userEmail: user.email,
                    tier: "launchpad",
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-50">
                <div className="container flex items-center justify-between py-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-navy-800 rounded-lg flex items-center justify-center">
                            <span className="text-gold-500 font-bold text-xl">A</span>
                        </div>
                        <span className="text-navy-800 font-semibold text-lg hidden sm:block">
                            AI for Boomers
                        </span>
                    </Link>
                    <Link href="/login" className="text-navy-600 hover:text-navy-800 font-medium">
                        {user ? "Dashboard" : "Log In"}
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-16 lg:py-24">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Briefcase className="w-4 h-4" />
                            Ultimate Business Bundle
                        </div>
                        <h1 className="text-display-lg mb-6">
                            Master AI &amp;
                            <span className="text-gold-400"> Start Your Own Business</span>
                        </h1>
                        <p className="text-body-lg text-navy-200 mb-8">
                            Everything in AI Essentials, plus powerful AI tools and a complete
                            system to help you turn your experience into a profitable consulting
                            side-business — even if you&apos;ve never done it before.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <span className="text-4xl font-bold">$497</span>
                            <span className="text-navy-300 line-through">$697</span>
                            <span className="bg-gold-500 text-navy-900 px-3 py-1 rounded-full text-sm font-semibold">
                                Save $200
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Business Building Focus */}
            <section className="py-16 bg-gold-50">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <Rocket className="w-16 h-16 text-gold-600 mx-auto mb-6" />
                        <h2 className="text-display-md text-navy-800 mb-4">
                            Turn Your 30+ Years of Experience Into Income
                        </h2>
                        <p className="text-navy-600 max-w-2xl mx-auto">
                            You&apos;ve spent decades building expertise. Now, AI can help you package
                            that knowledge and offer it as a consulting service. Whether you want
                            extra income in retirement or a full second career, this bundle gives
                            you everything you need to get started.
                        </p>
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section className="py-16">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-display-md text-navy-800 mb-8 text-center">
                            Everything You Get
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {includedItems.map((item, index) => (
                                <div key={index} className="card flex gap-4">
                                    <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <CheckCircle className="w-6 h-6 text-gold-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-navy-800 mb-1">{item.title}</h3>
                                        <p className="text-navy-600 text-sm">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="bg-navy-50 py-16">
                <div className="container">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-display-md text-navy-800 mb-8 text-center">
                            Compare Your Options
                        </h2>

                        <div className="bg-white rounded-lg overflow-hidden shadow">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-navy-100">
                                        <th className="text-left p-4 text-navy-800">Feature</th>
                                        <th className="text-center p-4 text-navy-800">Essentials<br /><span className="font-normal">$197</span></th>
                                        <th className="text-center p-4 text-navy-800 bg-gold-100">Ultimate<br /><span className="font-normal">$497</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparison.map((row, index) => (
                                        <tr key={index} className="border-t border-navy-100">
                                            <td className="p-4 text-navy-700">{row.feature}</td>
                                            <td className="p-4 text-center text-navy-600">{row.essentials}</td>
                                            <td className="p-4 text-center font-semibold text-navy-800 bg-gold-50">{row.mastery}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Tools Preview */}
            <section className="py-16">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-display-md text-navy-800 mb-4 text-center">
                            Your AI-Powered Business Toolkit
                        </h2>
                        <p className="text-navy-600 text-center mb-12 max-w-2xl mx-auto">
                            These aren&apos;t just tutorials — they&apos;re actual AI tools you can use
                            anytime to build and grow your consulting business.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="card text-center">
                                <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Target className="w-8 h-8 text-navy-600" />
                                </div>
                                <h3 className="text-h3 text-navy-800 mb-2">Niche Architect</h3>
                                <p className="text-navy-600 text-sm">
                                    Paste your resume or career summary, and AI will identify 3 profitable
                                    consulting niches matched to YOUR unique experience.
                                </p>
                            </div>
                            <div className="card text-center">
                                <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="w-8 h-8 text-navy-600" />
                                </div>
                                <h3 className="text-h3 text-navy-800 mb-2">Authority Engine</h3>
                                <p className="text-navy-600 text-sm">
                                    Turn your stories and insights into polished LinkedIn posts,
                                    newsletters, and professional emails that attract clients.
                                </p>
                            </div>
                            <div className="card text-center">
                                <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-8 h-8 text-navy-600" />
                                </div>
                                <h3 className="text-h3 text-navy-800 mb-2">Deal Maker</h3>
                                <p className="text-navy-600 text-sm">
                                    Generate professional proposals and contracts in minutes.
                                    Look like a seasoned pro from day one.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="bg-navy-800 text-white py-16">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <Star className="w-12 h-12 text-gold-400 mx-auto mb-6" />
                        <blockquote className="text-xl mb-6">
                            &ldquo;I was skeptical about AI until I found this program. The Niche Architect
                            tool helped me realize I could help small businesses with supply chain issues —
                            something I did for 30 years but never thought of as a service. I landed my
                            first paying client within a month.&rdquo;
                        </blockquote>
                        <footer>
                            <p className="font-semibold">Robert M., 68</p>
                            <p className="text-navy-300">Retired Operations Director, Now Consultant</p>
                        </footer>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16">
                <div className="container">
                    <div className="max-w-xl mx-auto text-center">
                        <h2 className="text-display-md text-navy-800 mb-4">
                            Ready to Start Your Business?
                        </h2>
                        <p className="text-navy-600 mb-8">
                            Get everything you need to confidently use AI and maybe even start
                            a profitable side business using skills you already have.
                        </p>

                        <div className="card bg-navy-800 text-white">
                            <h3 className="text-h2 mb-2">Ultimate Business Bundle</h3>
                            <p className="text-3xl font-bold text-gold-400 mb-6">$497</p>

                            {alreadyPurchased ? (
                                <Link href="/dashboard/courses/advanced" className="btn bg-gold-500 text-navy-900 hover:bg-gold-400 w-full text-lg">
                                    Go to Course
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            ) : (
                                <button
                                    onClick={handlePurchase}
                                    disabled={isLoading}
                                    className="btn bg-gold-500 text-navy-900 hover:bg-gold-400 w-full text-lg"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Get Complete Access — $497
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            )}

                            <p className="text-center text-sm text-navy-300 mt-4">
                                30-day money-back guarantee
                            </p>

                            {!user && (
                                <p className="text-center text-sm text-navy-300 mt-2">
                                    <Link href="/signup" className="text-gold-400 hover:underline">
                                        Create an account
                                    </Link>{" "}
                                    to purchase
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-navy-900 text-white py-8">
                <div className="container text-center">
                    <p className="text-navy-400 text-sm">
                        © {new Date().getFullYear()} AI for Boomers. All rights reserved.
                    </p>
                    <div className="flex justify-center gap-6 mt-4 text-sm text-navy-400">
                        <Link href="/terms" className="hover:text-white">Terms</Link>
                        <Link href="/privacy" className="hover:text-white">Privacy</Link>
                        <Link href="/refund" className="hover:text-white">Refund Policy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
