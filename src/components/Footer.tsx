import Link from "next/link";
import Image from "next/image";

interface FooterProps {
    variant?: "default" | "simple";
}

export function Footer({ variant = "default" }: FooterProps) {
    const currentYear = new Date().getFullYear();

    if (variant === "simple") {
        return (
            <footer className="bg-navy-900 text-white py-8">
                <div className="container text-center">
                    <p className="text-navy-400 text-sm">
                        © {currentYear} AI Courses for Adults. All rights reserved.
                    </p>
                </div>
            </footer>
        );
    }

    return (
        <footer className="bg-navy-900 text-white py-12">
            <div className="container">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <Image
                                src="/images/icon-192.png"
                                alt="AI Courses for Adults"
                                width={40}
                                height={40}
                                className="w-10 h-10"
                            />
                            <span className="font-semibold">AI Courses for Adults</span>
                        </Link>
                        <p className="text-navy-300 text-sm">
                            AI education designed for adults 55+. Learn at your own pace.
                        </p>
                    </div>

                    {/* Courses */}
                    <div>
                        <h4 className="font-semibold mb-4">Courses</h4>
                        <ul className="space-y-2 text-navy-300 text-sm">
                            <li>
                                <Link href="/free" className="hover:text-white transition-colors">
                                    Free Training
                                </Link>
                            </li>
                            <li>
                                <Link href="/certification" className="hover:text-white transition-colors">
                                    AI Essentials ($197)
                                </Link>
                            </li>
                            <li>
                                <Link href="/launchpad" className="hover:text-white transition-colors">
                                    Business Builder ($497)
                                </Link>
                            </li>
                            <li>
                                <Link href="/sop" className="hover:text-white transition-colors">
                                    Prompt Templates ($37)
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2 text-navy-300 text-sm">
                            <li>
                                <Link href="/blog" className="hover:text-white transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="hover:text-white transition-colors">
                                    Student Login
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-navy-300 text-sm">
                            <li>
                                <Link href="/terms" className="hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/refund" className="hover:text-white transition-colors">
                                    Refund Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/earnings-disclaimer" className="hover:text-white transition-colors">
                                    Earnings Disclaimer
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-navy-700 pt-8 text-center">
                    <p className="text-navy-400 text-sm">
                        © {currentYear} AI Courses for Adults. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
