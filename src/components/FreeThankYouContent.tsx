"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ArrowRight } from "lucide-react";

export function FreeThankYouContent() {
    return (
        <div className="min-h-screen bg-navy-50">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-50">
                <div className="container flex items-center justify-between py-4">
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/images/icon-192.png"
                            alt="AI Courses for Adults"
                            width={44}
                            height={44}
                            className="w-11 h-11"
                        />
                        <span className="text-navy-800 font-semibold text-lg">
                            AI Courses for Adults
                        </span>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="container py-16">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>

                    <h1 className="text-display-md text-navy-800 mb-4">
                        You&apos;re In! Check Your Email
                    </h1>
                    <p className="text-navy-600 mb-8">
                        I just sent you the AI Quickstart training. It should arrive in the
                        next few minutes. While you wait, here&apos;s what to do next...
                    </p>

                    {/* Next Steps */}
                    <div className="card text-left mb-8">
                        <h2 className="text-h2 text-navy-800 mb-6">Your Next Steps</h2>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-gold-600 font-bold">1</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-navy-800">Check your inbox</h3>
                                    <p className="text-navy-600 text-sm">
                                        Look for an email from AI Courses for Adults with the subject
                                        &ldquo;Your AI Quickstart is ready!&rdquo;
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-gold-600 font-bold">2</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-navy-800">Watch the 5-minute video</h3>
                                    <p className="text-navy-600 text-sm">
                                        Follow along as I show you exactly how to start your first
                                        AI conversation.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-gold-600 font-bold">3</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-navy-800">Download your cheat sheet</h3>
                                    <p className="text-navy-600 text-sm">
                                        Get 10 starter prompts you can copy and paste right away.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upgrade Prompt */}
                    <div className="card bg-navy-800 text-white">
                        <h2 className="text-h2 mb-4">Want to Go Deeper?</h2>
                        <p className="text-navy-200 mb-6">
                            The AI Quickstart is just the beginning. Our full AI Essentials
                            course teaches you everything you need to use AI confidently and
                            safely — in 11 easy lessons.
                        </p>
                        <Link href="/certification" className="btn bg-gold-500 text-navy-900 hover:bg-gold-400">
                            Learn More About AI Essentials
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Spam folder note */}
                    <p className="text-sm text-navy-500 mt-8">
                        Can&apos;t find the email? Check your spam or promotions folder.
                        Add hello@aicoursesforadults.com to your contacts to make sure you
                        receive future emails.
                    </p>
                </div>
            </main>
        </div>
    );
}
