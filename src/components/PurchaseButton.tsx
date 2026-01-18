"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth, useUser } from "@/contexts";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface PurchaseButtonProps {
    tier: "sop" | "caio" | "launchpad";
    priceId: string | undefined;
    price: string;
    label: string;
}

export function PurchaseButton({ tier, priceId, price, label }: PurchaseButtonProps) {
    const { user } = useAuth();
    const userContext = useUser();
    const [isLoading, setIsLoading] = useState(false);

    // Defensive check for SSR - hasAccess might not be available during prerender
    const hasAccess = userContext?.hasAccess;
    const alreadyPurchased = hasAccess ? hasAccess(tier) : false;

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
                    tier,
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

    if (alreadyPurchased) {
        return (
            <Link
                href={`/dashboard/courses/${tier === "caio" ? "essentials" : "advanced"}`}
                className="btn btn-primary w-full text-lg"
            >
                Go to Course
                <ArrowRight className="w-5 h-5" />
            </Link>
        );
    }

    return (
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
                        {label} — {price}
                        <ArrowRight className="w-5 h-5" />
                    </>
                )}
            </button>
            {!user && (
                <p className="text-center text-sm text-navy-500 mt-4">
                    <Link href="/signup" className="text-gold-600 hover:underline">
                        Create an account
                    </Link>{" "}
                    to purchase
                </p>
            )}
        </>
    );
}

export function UserLink({ loginHref }: { loginHref: string }) {
    const { user } = useAuth();

    return (
        <Link href={loginHref} className="text-navy-600 hover:text-navy-800 font-medium">
            {user ? "Dashboard" : "Log In"}
        </Link>
    );
}
