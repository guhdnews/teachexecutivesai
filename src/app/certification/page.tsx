"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth, useUser } from "@/contexts";
import {
    CheckCircle,
    ArrowRight,
    BookOpen,
    Shield,
    Award,
    Clock,
    Users,
    Star,
    Loader2,
} from "lucide-react";
import { toast } from "sonner";

const courseModules = [
    {
        title: "Getting Started with AI",
        lessons: [
            "What AI Really Is (No Jargon)",
            "How ChatGPT Works in Plain English",
            "Your First AI Conversation",
        ],
    },
    {
        title: "Everyday AI Skills",
        lessons: [
            "Writing Better Emails with AI",
            "Researching Any Topic Quickly",
            "Summarizing Long Articles",
            "Getting Creative Ideas",
        ],
    },
    {
        title: "Staying Safe Online",
        lessons: [
            "Spotting AI Scams and Deepfakes",
            "Protecting Your Personal Information",
            "Password Security That Works",
            "Privacy Settings You Need",
        ],
    },
];

const features = [
    { icon: BookOpen, text: "11 comprehensive video lessons" },
    { icon: Clock, text: "Self-paced — learn on your schedule" },
    { icon: Shield, text: "AI safety and security training" },
    { icon: Award, text: "Certificate of completion" },
    { icon: Users, text: "Access to community Q&A" },
    { icon: Star, text: "Lifetime access to updates" },
];

export default function CertificationPage() {
    const { user } = useAuth();
    const { hasAccess } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    const alreadyPurchased = hasAccess("caio");

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
                    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_CAIO,
                    userId: user.uid,
                    userEmail: user.email,
                    tier: "caio",
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
                        <p className="text-gold-400 font-semibold mb-4">AI ESSENTIALS COURSE</p>
                        <h1 className="text-display-lg mb-6">
                            Master AI Basics in
                            <span className="text-gold-400"> 11 Simple Lessons</span>
                        </h1>
                        <p className="text-body-lg text-navy-200 mb-8">
                            Learn to use ChatGPT, stay safe online, and confidently embrace AI —
                            all explained in plain English, at your own pace.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <span className="text-4xl font-bold">$197</span>
                            <span className="text-navy-300 line-through">$297</span>
                            <span className="bg-gold-500 text-navy-900 px-3 py-1 rounded-full text-sm font-semibold">
                                Save $100
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16">
                <div className="container">
                    <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {/* Left: Course Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h2 className="text-display-md text-navy-800 mb-4">
                                    What You&apos;ll Learn
                                </h2>
                                <p className="text-navy-600">
                                    This course covers everything you need to use AI confidently and safely.
                                </p>
                            </div>

                            {/* Modules */}
                            <div className="space-y-6">
                                {courseModules.map((module, index) => (
                                    <div key={index} className="card">
                                        <h3 className="text-h3 text-navy-800 mb-4">
                                            Module {index + 1}: {module.title}
                                        </h3>
                                        <ul className="space-y-2">
                                            {module.lessons.map((lesson, lessonIndex) => (
                                                <li key={lessonIndex} className="flex items-center gap-3">
                                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                                    <span className="text-navy-600">{lesson}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Testimonials */}
                            <div className="card bg-navy-50">
                                <h3 className="text-h3 text-navy-800 mb-4">What Students Say</h3>
                                <div className="space-y-4">
                                    <blockquote className="border-l-4 border-gold-500 pl-4">
                                        <p className="text-navy-700 italic mb-2">
                                            &ldquo;I was completely lost with AI until this course. Now I use ChatGPT
                                            every day to help write emails and plan my week.&rdquo;
                                        </p>
                                        <footer className="text-navy-500 text-sm">
                                            — Margaret T., 64, Retired Nurse
                                        </footer>
                                    </blockquote>
                                    <blockquote className="border-l-4 border-gold-500 pl-4">
                                        <p className="text-navy-700 italic mb-2">
                                            &ldquo;The security lessons alone were worth it. I had no idea how
                                            vulnerable I was online.&rdquo;
                                        </p>
                                        <footer className="text-navy-500 text-sm">
                                            — Harold P., 71, Retired Accountant
                                        </footer>
                                    </blockquote>
                                </div>
                            </div>
                        </div>

                        {/* Right: Sticky CTA */}
                        <div className="lg:col-span-1">
                            <div className="card sticky top-24">
                                <h3 className="text-h2 text-navy-800 mb-2">AI Essentials Course</h3>
                                <p className="text-3xl font-bold text-navy-900 mb-4">$197</p>

                                <ul className="space-y-3 mb-6">
                                    {features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <feature.icon className="w-5 h-5 text-gold-600" />
                                            <span className="text-navy-600">{feature.text}</span>
                                        </li>
                                    ))}
                                </ul>

                                {alreadyPurchased ? (
                                    <Link href="/dashboard/courses/caio" className="btn btn-primary w-full text-lg">
                                        Go to Course
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                ) : (
                                    <button
                                        onClick={handlePurchase}
                                        disabled={isLoading}
                                        className="btn btn-primary w-full text-lg"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Enroll Now — $197
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                )}

                                <p className="text-center text-sm text-navy-500 mt-4">
                                    30-day money-back guarantee
                                </p>

                                {!user && (
                                    <p className="text-center text-sm text-navy-500 mt-2">
                                        <Link href="/signup" className="text-gold-600 hover:underline">
                                            Create an account
                                        </Link>{" "}
                                        to purchase
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-navy-50 py-16">
                <div className="container">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-display-md text-navy-800 mb-8 text-center">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            <FAQItem
                                question="Do I need any technical experience?"
                                answer="Not at all! This course is designed specifically for beginners. We explain everything in plain English with step-by-step instructions."
                            />
                            <FAQItem
                                question="How long do I have access?"
                                answer="You get lifetime access to the course and all future updates. Learn at your own pace — there's no rush."
                            />
                            <FAQItem
                                question="What if I get stuck?"
                                answer="You'll have access to our community Q&A where you can ask questions and get help from other students and our team."
                            />
                            <FAQItem
                                question="Is there a money-back guarantee?"
                                answer="Yes! If you're not satisfied within 30 days, we'll give you a full refund, no questions asked."
                            />
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
                </div>
            </footer>
        </div>
    );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    return (
        <div className="card">
            <h3 className="font-semibold text-navy-800 mb-2">{question}</h3>
            <p className="text-navy-600">{answer}</p>
        </div>
    );
}
