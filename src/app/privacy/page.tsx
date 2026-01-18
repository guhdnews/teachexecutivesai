import Link from "next/link";

export const metadata = {
    title: "Privacy Policy",
    description: "Privacy Policy for AI for Boomers",
};

export default function PrivacyPage() {
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
                            AI for Boomers
                        </span>
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="container py-12">
                <div className="max-w-3xl mx-auto prose prose-navy">
                    <h1>Privacy Policy</h1>
                    <p className="text-navy-500">Last updated: January 2026</p>

                    <h2>1. Information We Collect</h2>
                    <h3>Information You Provide</h3>
                    <ul>
                        <li>Account information (name, email address)</li>
                        <li>Payment information (processed securely by Stripe)</li>
                        <li>Course progress and preferences</li>
                        <li>Content you create using our AI tools</li>
                    </ul>

                    <h3>Information Collected Automatically</h3>
                    <ul>
                        <li>Device information (browser type, operating system)</li>
                        <li>Usage data (pages visited, features used)</li>
                        <li>IP address and approximate location</li>
                    </ul>

                    <h2>2. How We Use Your Information</h2>
                    <p>We use your information to:</p>
                    <ul>
                        <li>Provide and improve our educational services</li>
                        <li>Process payments and manage subscriptions</li>
                        <li>Send important updates about your account</li>
                        <li>Personalize your learning experience</li>
                        <li>Respond to support requests</li>
                        <li>Analyze usage to improve our services</li>
                    </ul>

                    <h2>3. Information Sharing</h2>
                    <p>
                        We do not sell your personal information. We may share information with:
                    </p>
                    <ul>
                        <li>
                            <strong>Service providers:</strong> Companies that help us operate
                            (payment processing, hosting, analytics)
                        </li>
                        <li>
                            <strong>Legal requirements:</strong> When required by law or to
                            protect our rights
                        </li>
                    </ul>

                    <h2>4. Data Security</h2>
                    <p>
                        We implement appropriate security measures to protect your personal
                        information, including encryption of data in transit and at rest,
                        secure authentication, and regular security audits.
                    </p>

                    <h2>5. Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Access your personal information</li>
                        <li>Correct inaccurate information</li>
                        <li>Delete your account and data</li>
                        <li>Export your data</li>
                        <li>Opt out of marketing communications</li>
                    </ul>

                    <h2>6. Cookies and Tracking</h2>
                    <p>
                        We use cookies and similar technologies to remember your preferences,
                        analyze usage, and improve our services. You can control cookies
                        through your browser settings.
                    </p>

                    <h2>7. Third-Party Services</h2>
                    <p>Our service integrates with:</p>
                    <ul>
                        <li><strong>Firebase:</strong> Authentication and data storage</li>
                        <li><strong>Stripe:</strong> Payment processing</li>
                        <li><strong>xAI:</strong> AI tool functionality</li>
                    </ul>
                    <p>These services have their own privacy policies.</p>

                    <h2>8. Data Retention</h2>
                    <p>
                        We retain your information as long as your account is active. After
                        account deletion, we may retain certain data for legal or business
                        purposes for up to 7 years.
                    </p>

                    <h2>9. Children&apos;s Privacy</h2>
                    <p>
                        Our Service is designed for adults and is not intended for children
                        under 18. We do not knowingly collect information from children.
                    </p>

                    <h2>10. Changes to This Policy</h2>
                    <p>
                        We may update this policy from time to time. We will notify you of
                        significant changes via email or through the Service.
                    </p>

                    <h2>11. Contact Us</h2>
                    <p>
                        If you have questions about this Privacy Policy, please contact us
                        at privacy@aiforboomers.com.
                    </p>
                </div>
            </main>

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
