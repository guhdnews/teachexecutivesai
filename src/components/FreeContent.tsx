"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowRight,
    MessageSquare,
    CheckCircle,
    Play,
    Sparkles,
    Gift,
    Loader2,
} from "lucide-react";
import { toast } from "sonner";

const steps = [
    {
        number: "01",
        title: "Watch the 5-Minute Video",
        description: "Learn what ChatGPT actually is and why everyone's talking about it",
    },
    {
        number: "02",
        title: "Try Your First Prompt",
        description: "Follow along as I show you exactly what to type",
    },
    {
        number: "03",
        title: "Get the Cheat Sheet",
        description: "Download 10 starter prompts you can use today",
    },
];

const prompts = [
    "Write a thank-you note for a dinner party",
    "Explain this medical article in simple terms",
    "Help me plan a week's worth of meals",
    "Draft a message to my landlord about a repair",
    "Summarize this news article for me",
];

export function FreeContent() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    source: "ai-quickstart",
                    tags: ["free-training", "ai-quickstart"],
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to subscribe");
            }

            toast.success("Check your inbox for the AI Quickstart!");
            setEmail("");
            router.push("/free/thank-you");
        } catch (error) {
            console.error("Subscription error:", error);
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
                        Log In
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-16 lg:py-24">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Gift className="w-4 h-4" />
                            100% Free — No Credit Card
                        </div>
                        <h1 className="text-display-lg mb-6">
                            Your First AI Conversation
                            <span className="text-gold-400"> in 5 Minutes</span>
                        </h1>
                        <p className="text-body-lg text-navy-200 mb-8">
                            Never used ChatGPT? Perfect. This free mini-course shows you exactly
                            what to do — step by step — so you can start using AI today.
                        </p>

                        {/* Email Form - Hero */}
                        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-3 rounded-lg text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="btn bg-gold-500 text-navy-900 hover:bg-gold-400 text-lg px-6"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            Get Started
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </div>
                            <p className="text-sm text-navy-300 mt-3">
                                Join 2,000+ adults learning AI the easy way
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            {/* What You'll Learn */}
            <section className="py-16 bg-white">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-display-md text-navy-800 text-center mb-4">
                            What&apos;s Inside the Free Training
                        </h2>
                        <p className="text-navy-600 text-center mb-12 max-w-2xl mx-auto">
                            No fluff, no jargon — just the practical steps to have your first
                            successful AI conversation today.
                        </p>

                        <div className="grid md:grid-cols-3 gap-8">
                            {steps.map((step, index) => (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-gold-600 font-bold text-xl">{step.number}</span>
                                    </div>
                                    <h3 className="text-h3 text-navy-800 mb-2">{step.title}</h3>
                                    <p className="text-navy-600">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Preview */}
            <section className="py-16 bg-navy-50">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-display-md text-navy-800 mb-4">
                                    See How Simple It Is
                                </h2>
                                <p className="text-navy-600 mb-6">
                                    In the training, I&apos;ll walk you through your first conversation
                                    with ChatGPT. Here are some of the things you&apos;ll learn to do:
                                </p>
                                <ul className="space-y-3">
                                    {prompts.map((prompt, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-navy-700">&ldquo;{prompt}&rdquo;</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <div className="aspect-video bg-navy-100 rounded-lg flex items-center justify-center mb-4">
                                    <Play className="w-16 h-16 text-navy-400" />
                                </div>
                                <h3 className="text-h3 text-navy-800 mb-2">
                                    5-Minute Quickstart Video
                                </h3>
                                <p className="text-navy-600 text-sm">
                                    Watch over my shoulder as I show you exactly how to have your
                                    first AI conversation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="py-16 bg-white">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <Sparkles className="w-12 h-12 text-gold-500 mx-auto mb-6" />
                        <blockquote className="text-xl text-navy-700 mb-6">
                            &ldquo;I started with this free training and within 6 months I was
                            helping local businesses with AI. Now I have a small consulting
                            practice that brings in extra retirement income!&rdquo;
                        </blockquote>
                        <footer>
                            <p className="font-semibold text-navy-800">Carol A., 67</p>
                            <p className="text-navy-500">Retired Teacher, Now AI Consultant</p>
                        </footer>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 bg-navy-800 text-white">
                <div className="container">
                    <div className="max-w-xl mx-auto text-center">
                        <MessageSquare className="w-16 h-16 text-gold-400 mx-auto mb-6" />
                        <h2 className="text-display-md mb-4">
                            Ready to Try AI?
                        </h2>
                        <p className="text-navy-200 mb-8">
                            Get the free training and have your first AI conversation in the
                            next 5 minutes.
                        </p>

                        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-3 rounded-lg text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="btn bg-gold-500 text-navy-900 hover:bg-gold-400"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        "Send My Training"
                                    )}
                                </button>
                            </div>
                        </form>

                        <p className="text-sm text-navy-300 mt-6">
                            🔒 We respect your privacy. Unsubscribe anytime.
                        </p>
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
                    </div>
                </div>
            </footer>
        </div>
    );
}
