"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import {
    Shield,
    CheckCircle,
    ArrowRight,
    Download,
    Lock,
    AlertTriangle,
    Loader2,
} from "lucide-react";
import { toast } from "sonner";

// Form schema
const leadFormSchema = z.object({
    name: z.string().min(2, "Please enter your name"),
    email: z.string().email("Please enter a valid email"),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

export default function FreeLeadMagnetPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LeadFormData>({
        resolver: zodResolver(leadFormSchema),
    });

    const onSubmit = async (data: LeadFormData) => {
        try {
            setIsSubmitting(true);

            const response = await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to submit");
            }

            setIsSuccess(true);
            toast.success("Check your email for the download link!");
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Checklist items
    const checklistItems = [
        "How to spot AI-powered phishing emails",
        "The 5 settings to change on your devices today",
        "Password security that actually works",
        "Protecting your financial accounts from AI fraud",
        "Red flags that signal an AI deepfake",
        "Essential privacy settings for seniors",
    ];

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-50">
                <div className="container flex items-center justify-between py-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-navy-800 rounded-lg flex items-center justify-center">
                            <span className="text-gold-500 font-bold text-xl">E</span>
                        </div>
                        <span className="text-navy-800 font-semibold text-lg hidden sm:block">
                            Executive AI Institute
                        </span>
                    </Link>
                    <Link
                        href="/login"
                        className="text-navy-600 hover:text-navy-800 font-medium"
                    >
                        Member Login
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-16 lg:py-24">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left: Copy */}
                            <div>
                                <p className="text-gold-400 font-semibold mb-4">
                                    FREE SECURITY CHECKLIST
                                </p>
                                <h1 className="text-display-lg mb-6">
                                    The Digital Defense Briefing
                                </h1>
                                <p className="text-body-lg text-navy-200 mb-6">
                                    Protect yourself and your family from AI-powered scams, deepfakes,
                                    and cyber threats with this simple 1-page checklist.
                                </p>

                                <div className="space-y-3 mb-8">
                                    {checklistItems.map((item, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            <span className="text-navy-100">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-sm text-navy-300">
                                    ✓ Instant PDF download ✓ No spam, ever ✓ Unsubscribe anytime
                                </p>
                            </div>

                            {/* Right: Form */}
                            <div className="card bg-white text-navy-800">
                                {!isSuccess ? (
                                    <>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                                <Shield className="w-6 h-6 text-red-600" />
                                            </div>
                                            <div>
                                                <h2 className="text-h3 text-navy-800">Get Your Free Copy</h2>
                                                <p className="text-sm text-navy-500">
                                                    Sent to your inbox instantly
                                                </p>
                                            </div>
                                        </div>

                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                            <div>
                                                <label htmlFor="name" className="label">
                                                    Your Name
                                                </label>
                                                <input
                                                    {...register("name")}
                                                    type="text"
                                                    id="name"
                                                    placeholder="John Smith"
                                                    className={`input ${errors.name ? "input-error" : ""}`}
                                                />
                                                {errors.name && (
                                                    <p className="error-message">{errors.name.message}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="label">
                                                    Email Address
                                                </label>
                                                <input
                                                    {...register("email")}
                                                    type="email"
                                                    id="email"
                                                    placeholder="john@example.com"
                                                    className={`input ${errors.email ? "input-error" : ""}`}
                                                />
                                                {errors.email && (
                                                    <p className="error-message">{errors.email.message}</p>
                                                )}
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full btn btn-primary text-lg py-4"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Download className="w-5 h-5" />
                                                        Get My Free Checklist
                                                    </>
                                                )}
                                            </button>

                                            <p className="text-xs text-center text-navy-500">
                                                We respect your privacy. No spam, ever.
                                            </p>
                                        </form>
                                    </>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle className="w-10 h-10 text-green-500" />
                                        </div>
                                        <h2 className="text-h2 text-navy-800 mb-4">
                                            Check Your Email! 📧
                                        </h2>
                                        <p className="text-navy-600 mb-6">
                                            Your Digital Defense Briefing is on its way. Check your inbox
                                            (and spam folder, just in case).
                                        </p>
                                        <a
                                            href="/downloads/digital-defense-briefing.pdf"
                                            download
                                            className="btn btn-primary"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download Now
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why This Matters */}
            <section className="py-16 bg-red-50">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                        <h2 className="text-display-md text-navy-800 mb-4">
                            AI Fraud is Exploding
                        </h2>
                        <p className="text-body-lg text-navy-600 mb-8">
                            In 2024, seniors lost over <span className="font-bold">$3.4 billion</span>{" "}
                            to online scams. AI is making these attacks more sophisticated and
                            harder to detect.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6">
                            <StatCard value="300%" label="Increase in AI deepfake scams" />
                            <StatCard value="$3.4B" label="Lost by seniors to fraud" />
                            <StatCard value="1 in 3" label="Seniors targeted each year" />
                        </div>
                    </div>
                </div>
            </section>

            {/* What You'll Learn */}
            <section className="py-16">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-display-md text-navy-800 mb-4">
                            What&apos;s Inside
                        </h2>
                        <p className="text-body-lg text-navy-600">
                            A simple, printable checklist you can complete in 15 minutes
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <FeatureCard
                            icon={Lock}
                            title="Password Security"
                            description="The simple system for creating and managing passwords that hackers can't crack."
                        />
                        <FeatureCard
                            icon={Shield}
                            title="Device Protection"
                            description="Essential settings to enable on your phone, tablet, and computer today."
                        />
                        <FeatureCard
                            icon={AlertTriangle}
                            title="Scam Detection"
                            description="Red flags that reveal AI-powered phishing emails and deepfake calls."
                        />
                        <FeatureCard
                            icon={CheckCircle}
                            title="Quick Audit"
                            description="A 15-minute security audit you can do right now to protect yourself."
                        />
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 bg-navy-800 text-white">
                <div className="container">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-display-md mb-4">
                            Don&apos;t Wait Until It&apos;s Too Late
                        </h2>
                        <p className="text-body-lg text-navy-200 mb-8">
                            Get your free Digital Defense Briefing now and protect yourself today.
                        </p>
                        <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="btn bg-gold-500 text-navy-900 hover:bg-gold-400 text-lg px-8 py-4">
                            Get Your Free Checklist
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-navy-900 text-white py-8">
                <div className="container text-center">
                    <p className="text-navy-400 text-sm">
                        © {new Date().getFullYear()} Executive AI Institute. All rights reserved.
                    </p>
                    <div className="flex justify-center gap-6 mt-4 text-sm text-navy-400">
                        <Link href="/terms" className="hover:text-white">Terms</Link>
                        <Link href="/privacy" className="hover:text-white">Privacy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function StatCard({ value, label }: { value: string; label: string }) {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-3xl font-bold text-red-600 mb-1">{value}</p>
            <p className="text-sm text-navy-600">{label}</p>
        </div>
    );
}

function FeatureCard({
    icon: Icon,
    title,
    description,
}: {
    icon: React.ElementType;
    title: string;
    description: string;
}) {
    return (
        <div className="flex gap-4">
            <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-navy-600" />
            </div>
            <div>
                <h3 className="text-h3 text-navy-800 mb-1">{title}</h3>
                <p className="text-navy-600">{description}</p>
            </div>
        </div>
    );
}
