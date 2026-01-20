"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts";
import { Loader2, CheckCircle, AlertCircle, Mail } from "lucide-react";
import Link from "next/link";

type VerifyStatus = "loading" | "need-email" | "verifying" | "success" | "error";

export function VerifyContent() {
    const { completeMagicLinkSignIn, error, loading } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [status, setStatus] = useState<VerifyStatus>("loading");

    useEffect(() => {
        // Get email from localStorage (saved when magic link was sent)
        const storedEmail = typeof window !== "undefined"
            ? window.localStorage.getItem("emailForSignIn")
            : null;

        if (storedEmail) {
            setEmail(storedEmail);
            handleVerify(storedEmail);
        } else {
            // No stored email - ask user to enter it
            setStatus("need-email");
        }
    }, []);

    const handleVerify = async (emailToVerify: string) => {
        try {
            setStatus("verifying");
            await completeMagicLinkSignIn(emailToVerify);
            setStatus("success");
            // Redirect happens in completeMagicLinkSignIn
        } catch {
            setStatus("error");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            handleVerify(email.trim());
        }
    };

    // Loading state
    if (status === "loading" || status === "verifying" || loading) {
        return (
            <div className="card text-center">
                <Loader2 className="w-12 h-12 text-gold-500 animate-spin mx-auto mb-4" />
                <h1 className="text-h2 text-navy-900 mb-2">
                    {status === "verifying" ? "Signing you in..." : "Loading..."}
                </h1>
                <p className="text-navy-600">
                    Please wait while we verify your email.
                </p>
            </div>
        );
    }

    // Success state
    if (status === "success") {
        return (
            <div className="card text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h1 className="text-h2 text-navy-900 mb-2">Success!</h1>
                <p className="text-navy-600 mb-6">
                    You are now signed in. Redirecting to your dashboard...
                </p>
                <Link href="/dashboard" className="btn btn-primary">
                    Go to Dashboard
                </Link>
            </div>
        );
    }

    // Error state
    if (status === "error") {
        return (
            <div className="card text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h1 className="text-h2 text-navy-900 mb-2">Verification Failed</h1>
                <p className="text-navy-600 mb-6">
                    {error || "The link may have expired or already been used. Please try signing in again."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/login" className="btn btn-primary">
                        Back to Login
                    </Link>
                    <button
                        onClick={() => setStatus("need-email")}
                        className="btn btn-outline"
                    >
                        Try Different Email
                    </button>
                </div>
            </div>
        );
    }

    // Need email input state
    return (
        <div className="card">
            <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-gold-600" />
            </div>
            <h1 className="text-h2 text-navy-900 mb-2 text-center">
                Confirm Your Email
            </h1>
            <p className="text-navy-600 mb-6 text-center">
                Please enter the email address you used to request the sign-in link.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="label">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="input"
                        required
                        autoFocus
                    />
                </div>
                <button type="submit" className="btn btn-primary w-full">
                    Continue
                </button>
            </form>
            <p className="mt-6 text-center text-sm text-navy-500">
                <Link href="/login" className="text-gold-600 hover:text-gold-700">
                    ← Back to login
                </Link>
            </p>
        </div>
    );
}
