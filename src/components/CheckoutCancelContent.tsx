"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";

export function CheckoutCancelContent() {
    return (
        <div className="min-h-screen bg-navy-50 flex items-center justify-center px-4">
            <div className="card max-w-md w-full text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle className="w-10 h-10 text-red-500" />
                </div>

                <h1 className="text-h1 text-navy-900 mb-4">
                    Payment Cancelled
                </h1>

                <p className="text-navy-600 mb-6">
                    No worries! Your payment was cancelled and you haven&apos;t been charged.
                </p>

                <p className="text-sm text-navy-500 mb-8">
                    If you experienced any issues or have questions, please don&apos;t
                    hesitate to reach out.
                </p>

                <div className="space-y-3">
                    <Link href="/" className="btn btn-primary w-full">
                        Return Home
                    </Link>

                    <Link href="/free" className="btn btn-outline w-full">
                        Get Free Training First
                    </Link>
                </div>

                <p className="mt-6 text-sm text-navy-500">
                    Need help?{" "}
                    <Link href="mailto:support@aicoursesforadults.com" className="text-gold-600 hover:text-gold-700">
                        Contact Support
                    </Link>
                </p>
            </div>
        </div>
    );
}
