"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useAuth } from "@/contexts";
import { Loader2, Mail, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";

// Validation schema
const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, "Please enter your email address")
        .email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
    const { resetPassword, error, clearError } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        try {
            setIsSubmitting(true);
            clearError();
            await resetPassword(data.email);
            setSubmittedEmail(data.email);
            setIsSuccess(true);
        } catch {
            // Error is handled by context
        } finally {
            setIsSubmitting(false);
        }
    };

    // Success state
    if (isSuccess) {
        return (
            <div className="card text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h1 className="text-h1 text-navy-900 mb-4">Check Your Email</h1>
                <p className="text-navy-600 mb-6">
                    We&apos;ve sent password reset instructions to:
                </p>
                <p className="text-navy-800 font-semibold mb-8">{submittedEmail}</p>
                <p className="text-sm text-navy-500 mb-6">
                    Didn&apos;t receive the email? Check your spam folder or{" "}
                    <button
                        onClick={() => {
                            setIsSuccess(false);
                            clearError();
                        }}
                        className="text-gold-600 hover:text-gold-700 font-medium"
                    >
                        try again
                    </button>
                    .
                </p>
                <Link href="/login" className="btn btn-primary w-full">
                    Return to Login
                </Link>
            </div>
        );
    }

    return (
        <div className="card">
            <Link
                href="/login"
                className="inline-flex items-center gap-2 text-navy-600 hover:text-navy-800 mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to login
            </Link>

            <div className="text-center mb-8">
                <h1 className="text-h1 text-navy-900 mb-2">Forgot Your Password?</h1>
                <p className="text-navy-600">
                    No worries! Enter your email and we&apos;ll send you reset instructions.
                </p>
            </div>

            {/* Error message */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 text-sm">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email */}
                <div>
                    <label htmlFor="email" className="label">
                        Email Address
                    </label>
                    <div className="relative">
                        <input
                            {...register("email")}
                            type="email"
                            id="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            className={`input pl-10 ${errors.email ? "input-error" : ""}`}
                        />
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                    </div>
                    {errors.email && (
                        <p className="error-message">{errors.email.message}</p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn btn-primary text-lg"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        "Send Reset Link"
                    )}
                </button>
            </form>

            <p className="mt-8 text-center text-navy-600">
                Remember your password?{" "}
                <Link
                    href="/login"
                    className="text-gold-600 hover:text-gold-700 font-semibold"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
}
