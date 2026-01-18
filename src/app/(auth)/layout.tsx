import { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-navy-50 flex flex-col">
            {/* Header with logo */}
            <header className="py-6 px-4">
                <div className="max-w-md mx-auto">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-navy-800 rounded-lg flex items-center justify-center">
                            <span className="text-gold-500 font-bold text-xl">E</span>
                        </div>
                        <span className="text-navy-800 font-semibold text-lg">
                            Executive AI Institute
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
                    © {new Date().getFullYear()} Executive AI Institute. All rights
                    reserved.
                </p>
            </footer>
        </div>
    );
}
