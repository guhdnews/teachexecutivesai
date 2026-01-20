import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-navy-50 flex flex-col">
            {/* Header with logo */}
            <header className="py-6 px-4">
                <div className="max-w-md mx-auto">
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/images/icon-192.png"
                            alt="AI Courses for Adults"
                            width={40}
                            height={40}
                            className="w-10 h-10"
                        />
                        <span className="text-navy-800 font-semibold text-lg">
                            AI Courses for Adults
                        </span>
                    </Link>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 flex items-center justify-center px-4 pb-12">
                <div className="w-full max-w-md">{children}</div>
            </main>

            {/* Minimal footer */}
            <footer className="py-4 px-4 text-center">
                <p className="text-sm text-navy-500">
                    © {new Date().getFullYear()} AI Courses for Adults. All rights
                    reserved.
                </p>
            </footer>
        </div>
    );
}
