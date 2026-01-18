import Link from "next/link";
import {
    CheckCircle,
    FileText,
    Zap,
    Gift,
} from "lucide-react";
import { PurchaseButton, UserLink } from "@/components/PurchaseButton";
import { SOPOrderBump } from "@/components/SOPOrderBump";

export const metadata = {
    title: "AI SOPs & Prompt Templates | AI Courses for Adults",
    description: "10 ready-to-use AI prompts and templates to start using AI productively today.",
};

const sopContents = [
    "10 Ready-to-Use AI Prompts for business communication",
    "Email templates that get responses",
    "Meeting summary automation",
    "Research assistant prompts",
    "Content ideas generator",
];

export default function SOPPage() {
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
                            AI Courses for Adults
                        </span>
                    </Link>
                    <UserLink loginHref="/login" />
                </div>
            </header>

            {/* Hero */}
            <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-16">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-gold-400 font-semibold mb-4">QUICK START BUNDLE</p>
                        <h1 className="text-display-lg mb-6">
                            AI SOPs &amp; Prompt Templates
                        </h1>
                        <p className="text-body-lg text-navy-200 mb-8">
                            10 ready-to-use AI prompts and templates to start using AI
                            productively today — no learning curve required.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <span className="text-4xl font-bold">$37</span>
                            <span className="text-navy-300 line-through">$67</span>
                            <span className="bg-gold-500 text-navy-900 px-3 py-1 rounded-full text-sm font-semibold">
                                Save $30
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16">
                <div className="container">
                    <div className="max-w-3xl mx-auto">
                        {/* What's Included */}
                        <div className="card mb-8">
                            <h2 className="text-h2 text-navy-800 mb-6">What&apos;s Included</h2>
                            <div className="space-y-3">
                                {sopContents.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-navy-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Bump */}
                        <SOPOrderBump />

                        {/* CTA */}
                        <div className="card bg-navy-800 text-white text-center">
                            <h2 className="text-h2 mb-4">Get Started Now</h2>
                            <p className="text-3xl font-bold text-gold-400 mb-6">$37</p>

                            <PurchaseButton
                                tier="sop"
                                priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_SOP}
                                price="$37"
                                label="Get Instant Access"
                            />

                            <p className="text-sm text-navy-300 mt-4">
                                Instant download • 30-day guarantee
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-navy-900 text-white py-8">
                <div className="container text-center">
                    <p className="text-navy-400 text-sm">
                        © {new Date().getFullYear()} AI Courses for Adults. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
