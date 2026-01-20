"use client";

import Link from "next/link";
import { useUser } from "@/contexts";
import { Target, TrendingUp, FileText, Lock, ArrowRight } from "lucide-react";

const tools = [
    {
        id: "niche-architect",
        name: "Niche Architect",
        description:
            "Discover 3 profitable micro-niches tailored to your unique experience and expertise.",
        icon: Target,
        href: "/dashboard/tools/niche-architect",
        color: "bg-amber-100 text-amber-600",
    },
    {
        id: "authority-engine",
        name: "Authority Engine",
        description:
            "Generate LinkedIn posts, newsletters, and cold emails that position you as an expert.",
        icon: TrendingUp,
        href: "/dashboard/tools/authority-engine",
        color: "bg-blue-100 text-blue-600",
    },
    {
        id: "deal-maker",
        name: "Deal Maker",
        description:
            "Create professional proposals and contracts in minutes, not hours.",
        icon: FileText,
        href: "/dashboard/tools/deal-maker",
        color: "bg-green-100 text-green-600",
    },
];

export function ToolsContent() {
    const { hasTool } = useUser();
    const hasAccess = hasTool("niche"); // All tools have same access requirement

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-h1 text-navy-800 mb-2">AI Tools</h1>
                <p className="text-navy-600">
                    Powerful AI assistants to help you apply what you've learned
                </p>
            </div>

            {!hasAccess && (
                <div className="card bg-navy-800 text-white mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center">
                            <Lock className="w-6 h-6 text-navy-900" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-h3 mb-1">Unlock All AI Tools</h2>
                            <p className="text-navy-200">
                                These tools are available exclusively to Launchpad members.
                            </p>
                        </div>
                        <Link href="/launchpad" className="btn bg-gold-500 text-navy-900 hover:bg-gold-400">
                            Upgrade Now
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                    <div
                        key={tool.id}
                        className={`card relative ${!hasAccess ? "opacity-75" : ""
                            }`}
                    >
                        <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${tool.color}`}
                        >
                            <tool.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-h3 text-navy-800 mb-2">{tool.name}</h3>
                        <p className="text-navy-600 mb-6">{tool.description}</p>

                        {hasAccess ? (
                            <Link href={tool.href} className="btn btn-primary w-full">
                                Open Tool
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        ) : (
                            <button disabled className="btn btn-outline w-full opacity-50 cursor-not-allowed">
                                <Lock className="w-4 h-4" />
                                Locked
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Usage tips */}
            {hasAccess && (
                <div className="card bg-navy-50 mt-8">
                    <h2 className="text-h3 text-navy-800 mb-4">💡 Getting Started</h2>
                    <div className="space-y-3 text-navy-600">
                        <p>
                            <span className="font-semibold">1. Start with Niche Architect</span>
                            {" → "}Find your profitable consulting niche based on your experience.
                        </p>
                        <p>
                            <span className="font-semibold">2. Use Authority Engine</span>
                            {" → "}Create content that positions you as the go-to expert.
                        </p>
                        <p>
                            <span className="font-semibold">3. Close with Deal Maker</span>
                            {" → "}Generate professional proposals when you find clients.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
