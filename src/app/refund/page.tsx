import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "30-Day Money-Back Guarantee | Refund Policy",
    description: "We offer a 30-day money-back guarantee on all AI courses. Not satisfied? Get a full refund — no questions asked.",
    robots: { index: true, follow: true },
};

export default function RefundPage() {
    return (
        <div className="min-h-screen bg-white">
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

            {/* Content */}
            <main className="container py-12">
                <div className="max-w-3xl mx-auto prose prose-navy">
                    <h1>Refund Policy</h1>
                    <p className="text-navy-500">Last updated: January 2026</p>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 not-prose mb-8">
                        <h2 className="text-lg font-semibold text-green-800 mb-2">
                            ✅ 30-Day Money-Back Guarantee
                        </h2>
                        <p className="text-green-700">
                            We stand behind our courses. If you&apos;re not satisfied within 30 days
                            of your purchase, we&apos;ll give you a full refund — no questions asked.
                        </p>
                    </div>

                    <h2>How to Request a Refund</h2>
                    <ol>
                        <li>
                            <strong>Email us</strong> at support@aicoursesforadults.com with your
                            account email and purchase date
                        </li>
                        <li>
                            <strong>We&apos;ll process your refund</strong> within 5-7 business days
                        </li>
                        <li>
                            <strong>The refund will appear</strong> on your original payment
                            method within 5-10 business days (depending on your bank)
                        </li>
                    </ol>

                    <h2>What&apos;s Covered</h2>
                    <ul>
                        <li>All course purchases (AI Essentials, Complete Mastery)</li>
                        <li>One-time payment plans</li>
                        <li>First payment of subscription plans</li>
                    </ul>

                    <h2>Refund Timeline</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Request Within</th>
                                <th>Refund Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>0-30 days</td>
                                <td>100% full refund</td>
                            </tr>
                            <tr>
                                <td>31+ days</td>
                                <td>No refund (access continues)</td>
                            </tr>
                        </tbody>
                    </table>

                    <h2>Payment Plans</h2>
                    <p>
                        If you&apos;re on a payment plan and request a refund, we will:
                    </p>
                    <ul>
                        <li>Cancel all future payments immediately</li>
                        <li>Refund any payments made within the last 30 days</li>
                    </ul>

                    <h2>Account Access After Refund</h2>
                    <p>
                        After a refund is processed, you will lose access to the associated
                        course content and AI tools. Your account will revert to the free tier.
                    </p>

                    <h2>Exceptions</h2>
                    <p>
                        We reserve the right to deny refund requests in cases of:
                    </p>
                    <ul>
                        <li>Repeated refund requests (multiple purchases and refunds)</li>
                        <li>Evidence of content downloading or redistribution</li>
                        <li>Violation of our Terms of Service</li>
                    </ul>

                    <h2>Questions?</h2>
                    <p>
                        If you have any questions about our refund policy, please email us
                        at support@aicoursesforadults.com. We&apos;re here to help!
                    </p>

                    <div className="bg-navy-50 rounded-lg p-6 not-prose mt-8">
                        <h3 className="font-semibold text-navy-800 mb-2">
                            Still not sure?
                        </h3>
                        <p className="text-navy-600 mb-4">
                            Start with our free Digital Defense Briefing to see if our teaching
                            style works for you — before making any purchase.
                        </p>
                        <Link href="/free" className="btn btn-primary">
                            Get Free Training
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-navy-900 text-white py-8">
                <div className="container text-center">
                    <p className="text-navy-400 text-sm">
                        © {new Date().getFullYear()} AI Courses for Adults. All rights reserved.
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
