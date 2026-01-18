import Link from "next/link";

export const metadata = {
    title: "Terms of Service",
    description: "Terms of Service for AI Courses for Adults",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-50">
                <div className="container flex items-center justify-between py-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-navy-800 rounded-lg flex items-center justify-center">
                            <span className="text-gold-500 font-bold text-xl">A</span>
                        </div>
                        <span className="text-navy-800 font-semibold text-lg">
                            AI Courses for Adults
                        </span>
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="container py-12">
                <div className="max-w-3xl mx-auto prose prose-navy">
                    <h1>Terms of Service</h1>
                    <p className="text-navy-500">Last updated: January 2026</p>

                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using AI Courses for Adults (&quot;the Service&quot;), you agree to be
                        bound by these Terms of Service. If you do not agree to these terms,
                        please do not use the Service.
                    </p>

                    <h2>2. Description of Service</h2>
                    <p>
                        AI Courses for Adults provides online educational content and AI-powered tools
                        designed to help adults learn about and use artificial intelligence
                        technology. The Service includes:
                    </p>
                    <ul>
                        <li>Video lessons and educational content</li>
                        <li>AI-powered tools (for applicable subscription tiers)</li>
                        <li>Community features and support</li>
                    </ul>

                    <h2>3. User Accounts</h2>
                    <p>
                        You are responsible for maintaining the confidentiality of your account
                        credentials and for all activities that occur under your account. You
                        must notify us immediately of any unauthorized use of your account.
                    </p>

                    <h2>4. Payment Terms</h2>
                    <p>
                        Certain features of the Service require payment. By purchasing a
                        subscription or course, you agree to pay all applicable fees. All
                        payments are processed securely through Stripe.
                    </p>

                    <h2>5. Refund Policy</h2>
                    <p>
                        We offer a 30-day money-back guarantee on all purchases. If you are not
                        satisfied with your purchase, contact us within 30 days for a full
                        refund. See our <Link href="/refund">Refund Policy</Link> for details.
                    </p>

                    <h2>6. Intellectual Property</h2>
                    <p>
                        All content on the Service, including text, graphics, logos, videos, and
                        software, is the property of AI Courses for Adults and is protected by
                        intellectual property laws. You may not reproduce, distribute, or create
                        derivative works without our written permission.
                    </p>

                    <h2>7. Acceptable Use</h2>
                    <p>You agree not to:</p>
                    <ul>
                        <li>Share your account credentials with others</li>
                        <li>Use the Service for any illegal or unauthorized purpose</li>
                        <li>Attempt to interfere with or disrupt the Service</li>
                        <li>Resell or redistribute course content</li>
                    </ul>

                    <h2>8. AI Tools Usage</h2>
                    <p>
                        Our AI tools are provided for personal and professional use. You are
                        responsible for reviewing and editing any AI-generated content before
                        use. We do not guarantee the accuracy or suitability of AI outputs.
                    </p>

                    <h2>9. Limitation of Liability</h2>
                    <p>
                        The Service is provided &quot;as is&quot; without warranties of any kind. We are
                        not liable for any indirect, incidental, or consequential damages
                        arising from your use of the Service.
                    </p>

                    <h2>10. Changes to Terms</h2>
                    <p>
                        We may update these terms from time to time. We will notify you of
                        significant changes via email or through the Service. Continued use
                        after changes constitutes acceptance of the new terms.
                    </p>

                    <h2>11. Contact Us</h2>
                    <p>
                        If you have questions about these Terms of Service, please contact us
                        at support@aicoursesforadults.com.
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
                    </div>
                </div>
            </footer>
        </div>
    );
}
