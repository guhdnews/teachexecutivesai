"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export function NotFoundContent() {
    return (
        <div className="min-h-screen bg-navy-50 flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-8xl font-bold text-navy-800 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-navy-700 mb-4">
                    Page Not Found
                </h2>
                <p className="text-navy-600 mb-8 max-w-md">
                    Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/" className="btn btn-primary">
                        <Home className="w-4 h-4" />
                        Go Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="btn btn-outline"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
