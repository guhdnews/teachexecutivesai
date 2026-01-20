"use client";

import { useState } from "react";
import { useAuth, useUser } from "@/contexts";
import { ArrowRight, Loader2, Gift, Zap } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface SOPCheckoutSectionProps {
    priceId: string | undefined;
}

const bumpContents = [
    "50+ Advanced AI Prompts",
    "Industry-specific templates",
    "Prompt engineering guide",
    "Weekly prompt updates",
];

export function SOPCheckoutSection({ priceId }: SOPCheckoutSectionProps) {
    const { user } = useAuth();
    const userContext = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [includeBump, setIncludeBump] = useState(false);

    const hasAccess = userContext?.hasAccess;
    const alreadyPurchased = hasAccess ? hasAccess("sop") : false;

    const handlePurchase = async () => {
        if (!user) {
            toast.info("Please log in to purchase");
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    priceId,
                    userId: user.uid,
                    userEmail: user.email,
                    tier: "sop",
                    includeOrderBump: includeBump, // Pass order bump state!
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Calculate total price
    const basePrice = 37;
    const bumpPrice = 17;
    const totalPrice = includeBump ? basePrice + bumpPrice : basePrice;

    return (
        <div className="space-y-8">
            {/* Order Bump */}
            <div
                className={`card border-2 cursor-pointer transition-all ${includeBump
                        ? "border-gold-500 bg-gold-50"
                        : "border-dashed border-navy-300 hover:border-navy-400"
                    }`}
                onClick={() => setIncludeBump(!includeBump)}
            >
                <div className="flex items-start gap-4">
                    <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 ${includeBump
                                ? "bg-gold-500 border-gold-500"
                                : "border-navy-300"
                            }`}
                    >
                        {includeBump && <span className="text-white text-xs">✓</span>}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Gift className="w-5 h-5 text-gold-600" />
                            <span className="font-semibold text-navy-800">
                                Add the AI Prompt Vault
                            </span>
                            <span className="text-gold-600 font-bold">+ $17</span>
                        </div>
                        <p className="text-sm text-navy-600 mb-3">
                            Expand your toolkit with 50+ additional prompts and templates!
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            {bumpContents.map((item, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-navy-600">
                                    <Zap className="w-3 h-3 text-gold-500" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Card */}
            <div className="card bg-navy-800 text-white text-center">
                <h2 className="text-h2 mb-4">Get Started Now</h2>
                <p className="text-3xl font-bold text-gold-400 mb-2">${totalPrice}</p>
                {includeBump && (
                    <p className="text-sm text-navy-300 mb-4">
                        AI SOPs Bundle ($37) + AI Prompt Vault ($17)
                    </p>
                )}

                {alreadyPurchased ? (
                    <Link
                        href="/dashboard/courses/essentials"
                        className="btn btn-primary w-full text-lg"
                    >
                        Go to Course
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                ) : (
                    <>
                        <button
                            onClick={handlePurchase}
                            disabled={isLoading}
                            className="btn btn-primary w-full text-lg"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Get Instant Access — ${totalPrice}
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                        {!user && (
                            <p className="text-center text-sm text-navy-300 mt-4">
                                <Link href="/signup" className="text-gold-400 hover:underline">
                                    Create an account
                                </Link>{" "}
                                to purchase
                            </p>
                        )}
                    </>
                )}

                <p className="text-sm text-navy-300 mt-4">
                    Instant download • 30-day guarantee
                </p>
            </div>
        </div>
    );
}
