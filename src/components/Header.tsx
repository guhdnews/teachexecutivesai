"use client";

import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
    variant?: "default" | "simple";
    showNav?: boolean;
}

export function Header({ variant = "default", showNav = true }: HeaderProps) {
    return (
        <header className="bg-white border-b sticky top-0 z-50">
            <div className="container flex items-center justify-between py-4">
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/images/icon-192.png"
                        alt="AI Courses for Adults"
                        width={44}
                        height={44}
                        className="w-11 h-11"
                        priority
                    />
                    <span className="text-navy-800 font-semibold text-lg hidden sm:block">
                        AI Courses for Adults
                    </span>
                </Link>

                {showNav && variant === "default" && (
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href="/free"
                            className="text-navy-600 hover:text-navy-800 font-medium"
                        >
                            Free Training
                        </Link>
                        <Link
                            href="/certification"
                            className="text-navy-600 hover:text-navy-800 font-medium"
                        >
                            Courses
                        </Link>
                        <Link
                            href="/blog"
                            className="text-navy-600 hover:text-navy-800 font-medium"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/login"
                            className="text-navy-600 hover:text-navy-800 font-medium"
                        >
                            Log In
                        </Link>
                        <Link href="/free" className="btn btn-primary">
                            Get Started
                        </Link>
                    </nav>
                )}

                {/* Mobile nav */}
                <div className="flex md:hidden items-center gap-3">
                    <Link href="/login" className="text-navy-600 font-medium">
                        Log In
                    </Link>
                    <Link href="/free" className="btn btn-primary text-sm px-4 py-2">
                        Start Free
                    </Link>
                </div>
            </div>
        </header>
    );
}
