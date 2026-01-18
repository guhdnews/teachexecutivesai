"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export function CheckoutSuccessContent() {
    return (
        <div className="min-h-screen bg-navy-50 flex items-center justify-center px-4">
            <div className="card max-w-md w-full text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                </div>

                <h1 className="text-h1 text-navy-900 mb-4">
                    Payment Successful! 🎉
                </h1>

                <p className="text-navy-600 mb-6">
                    Thank you for your purchase! Your access has been activated and you can
                    start learning right away.
                </p>

                <p className="text-sm text-navy-500 mb-8">
                    A confirmation email has been sent to your inbox with your receipt
                    and access instructions.
                </p>

                <Link href="/dashboard" className="btn btn-primary w-full text-lg">
                    Go to My Dashboard
                </Link>

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
