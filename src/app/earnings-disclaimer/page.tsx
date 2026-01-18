import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Earnings Disclaimer",
    description: "Important information about income claims and testimonials on AI Courses for Adults. Individual results vary based on effort, experience, and market conditions.",
    robots: { index: true, follow: true },
};

export default function EarningsDisclaimerPage() {
    return (
        <div className="min-h-screen bg-gray-50">
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

            {/* Main */}
            <main className="container py-12">
                <div className="max-w-3xl mx-auto prose prose-navy">
                    <h1>Earnings Disclaimer</h1>
                    <p className="text-sm text-navy-500">Last updated: January 2026</p>

                    <h2>No Earnings Guarantees</h2>
                    <p>
                        AI Courses for Adults makes no guarantees regarding income or
                        earnings of any kind. The testimonials and examples used on this
                        website are exceptional results achieved by specific individuals
                        and are not intended to represent or guarantee that anyone will
                        achieve the same or similar results.
                    </p>

                    <h2>Individual Results Vary</h2>
                    <p>
                        Your results will vary and depend on many factors, including but
                        not limited to:
                    </p>
                    <ul>
                        <li>Your individual capacity, skills, and prior experience</li>
                        <li>Your dedication and effort to implement what you learn</li>
                        <li>Your business acumen and experience</li>
                        <li>Market conditions and economic factors</li>
                        <li>Your ability to find and work with clients</li>
                    </ul>

                    <h2>Business Risks</h2>
                    <p>
                        Starting any business involves risk. The information provided in
                        our courses and tools is for educational purposes only. It is not
                        intended as financial, legal, or business advice. You should
                        consult with appropriate professionals before making any business
                        decisions.
                    </p>

                    <h2>Testimonials</h2>
                    <p>
                        The testimonials on this website are real experiences from actual
                        customers. However, they represent exceptional results and are not
                        typical. Your results may differ significantly based on the factors
                        mentioned above.
                    </p>

                    <h2>No Professional Advice</h2>
                    <p>
                        The content on this website and in our courses does not constitute
                        professional advice. We are educators, not attorneys, accountants,
                        or financial advisors. Always seek the advice of qualified
                        professionals regarding your specific situation.
                    </p>

                    <h2>Forward-Looking Statements</h2>
                    <p>
                        Any statements on this website that describe potential earnings
                        or future results are forward-looking statements. These statements
                        are based on current expectations and assumptions and are not
                        guarantees of future performance.
                    </p>

                    <h2>Affiliate Relationships</h2>
                    <p>
                        We may have affiliate relationships with some of the products or
                        services recommended on this website. This means we may receive
                        compensation if you purchase through our links.
                    </p>

                    <h2>Questions</h2>
                    <p>
                        If you have questions about this Earnings Disclaimer, please contact
                        us at legal@aicoursesforadults.com.
                    </p>
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
                        <Link href="/earnings-disclaimer" className="hover:text-white">Earnings Disclaimer</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
