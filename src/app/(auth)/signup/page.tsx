"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useAuth } from "@/contexts";
import { Loader2, Eye, EyeOff, Mail, User, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

// Google icon SVG
const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
    </svg>
);

// Validation schema
const signupSchema = z
    .object({
        name: z
            .string()
            .min(1, "Please enter your name")
            .min(2, "Name must be at least 2 characters"),
        email: z
            .string()
            .min(1, "Please enter your email address")
            .email("Please enter a valid email address"),
        password: z
            .string()
            .min(1, "Please enter a password")
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Za-z]/, "Password must contain at least one letter")
            .regex(/[0-9]/, "Password must contain at least one number"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
    const { signUp, signInWithGoogle, error, clearError } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    const password = watch("password", "");

    const onSubmit = async (data: SignupFormData) => {
        try {
            setIsSubmitting(true);
            clearError();
            await signUp(data.email, data.password, data.name);
            toast.success("Account created! Welcome aboard.");
        } catch {
            // Error is handled by context
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            setIsGoogleLoading(true);
            clearError();
            await signInWithGoogle();
            toast.success("Welcome!");
        } catch {
            // Error is handled by context
        } finally {
            setIsGoogleLoading(false);
        }
    };

    // Password strength indicators
    const hasMinLength = password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return (
        <div className="card">
            <div className="text-center mb-8">
                <h1 className="text-h1 text-navy-900 mb-2">Create Your Account</h1>
                <p className="text-navy-600">
                    Join 1,000+ executives mastering AI
                </p>
            </div>

            {/* Error message */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 text-sm">{error}</p>
                </div>
            )}

            {/* Google Sign In */}
            <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading || isSubmitting}
                className="w-full btn btn-outline mb-6 gap-3"
            >
                {isGoogleLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <GoogleIcon />
                )}
                Continue with Google
            </button>

            {/* Divider */}
            <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-navy-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-navy-500">or sign up with email</span>
                </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="label">
                        Full Name
                    </label>
                    <div className="relative">
                        <input
                            {...register("name")}
                            type="text"
                            id="name"
                            autoComplete="name"
                            placeholder="John Smith"
                            className={`input pl-10 ${errors.name ? "input-error" : ""}`}
                        />
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                    </div>
                    {errors.name && (
                        <p className="error-message">{errors.name.message}</p>
                    )}
                </div>

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

                {/* Password */}
                <div>
                    <label htmlFor="password" className="label">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            id="password"
                            autoComplete="new-password"
                            placeholder="••••••••"
                            className={`input pr-10 ${errors.password ? "input-error" : ""}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>

                    {/* Password strength indicators */}
                    <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className={`w-4 h-4 ${hasMinLength ? "text-green-500" : "text-navy-300"}`} />
                            <span className={hasMinLength ? "text-green-700" : "text-navy-500"}>
                                At least 8 characters
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className={`w-4 h-4 ${hasLetter ? "text-green-500" : "text-navy-300"}`} />
                            <span className={hasLetter ? "text-green-700" : "text-navy-500"}>
                                Contains a letter
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className={`w-4 h-4 ${hasNumber ? "text-green-500" : "text-navy-300"}`} />
                            <span className={hasNumber ? "text-green-700" : "text-navy-500"}>
                                Contains a number
                            </span>
                        </div>
                    </div>

                    {errors.password && (
                        <p className="error-message">{errors.password.message}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label htmlFor="confirmPassword" className="label">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            {...register("confirmPassword")}
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            autoComplete="new-password"
                            placeholder="••••••••"
                            className={`input pr-10 ${errors.confirmPassword ? "input-error" : ""}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600"
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="error-message">{errors.confirmPassword.message}</p>
                    )}
                </div>

                {/* Terms */}
                <p className="text-sm text-navy-500">
                    By creating an account, you agree to our{" "}
                    <Link href="/terms" className="text-gold-600 hover:text-gold-700">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-gold-600 hover:text-gold-700">
                        Privacy Policy
                    </Link>
                    .
                </p>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting || isGoogleLoading}
                    className="w-full btn btn-primary text-lg"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Creating account...
                        </>
                    ) : (
                        "Create Account"
                    )}
                </button>
            </form>

            {/* Login link */}
            <p className="mt-8 text-center text-navy-600">
                Already have an account?{" "}
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
