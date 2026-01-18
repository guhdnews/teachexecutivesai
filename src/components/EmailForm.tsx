"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface EmailFormProps {
    buttonText: string;
    redirectTo: string;
    variant?: "hero" | "footer";
}

export function EmailForm({ buttonText, redirectTo, variant = "hero" }: EmailFormProps) {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    source: "ai-quickstart",
                    tags: ["free-training", "ai-quickstart"],
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to subscribe");
            }

            toast.success("Check your inbox for the AI Quickstart!");
            setEmail("");
            router.push(redirectTo);
        } catch (error) {
            console.error("Subscription error:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`btn bg-gold-500 text-navy-900 hover:bg-gold-400 ${variant === "hero" ? "text-lg px-6" : ""}`}
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            {buttonText}
                            {variant === "hero" && <ArrowRight className="w-5 h-5" />}
                        </>
                    )}
                </button>
            </div>
            {variant === "hero" && (
                <p className="text-sm text-navy-300 mt-3">
                    Join 2,000+ adults learning AI the easy way
                </p>
            )}
        </form>
    );
}
