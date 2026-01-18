"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const EXIT_POPUP_KEY = "exit_popup_shown";
const DAYS_TO_REMEMBER = 30;

interface ExitIntentPopupProps {
    variant: "lead" | "discount";
}

export function ExitIntentPopup({ variant }: ExitIntentPopupProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if popup was already shown
        const stored = localStorage.getItem(EXIT_POPUP_KEY);
        if (stored) {
            const shownDate = new Date(stored);
            const daysSince = (Date.now() - shownDate.getTime()) / (1000 * 60 * 60 * 24);
            if (daysSince < DAYS_TO_REMEMBER) {
                return; // Don't show again within 30 days
            }
        }

        // Exit intent detection for desktop
        const handleMouseLeave = (e: MouseEvent) => {
            // Check if mouse is leaving toward the top of the page
            if (e.clientY <= 0) {
                setIsOpen(true);
                localStorage.setItem(EXIT_POPUP_KEY, new Date().toISOString());
                // Remove listener after showing
                document.removeEventListener("mouseleave", handleMouseLeave);
            }
        };

        // Only add listener after a delay (don't trigger immediately)
        const timer = setTimeout(() => {
            document.addEventListener("mouseleave", handleMouseLeave);
        }, 5000);

        return () => {
            clearTimeout(timer);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 relative shadow-2xl animate-fade-in">
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 text-navy-400 hover:text-navy-600"
                    aria-label="Close"
                >
                    <X className="w-6 h-6" />
                </button>

                {variant === "lead" ? (
                    <>
                        <h2 className="text-h3 text-navy-800 mb-3 pr-8">
                            Wait! Don&apos;t Leave Empty-Handed
                        </h2>
                        <p className="text-navy-600 mb-6">
                            Get our free AI Quickstart guide and learn how to use AI
                            confidently in just 15 minutes.
                        </p>
                        <Link
                            href="/free"
                            className="btn btn-primary w-full justify-center"
                            onClick={handleClose}
                        >
                            Get Your Free Guide
                        </Link>
                        <button
                            onClick={handleClose}
                            className="text-sm text-navy-500 mt-4 w-full text-center hover:text-navy-700"
                        >
                            No thanks, I&apos;ll figure it out myself
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="text-h3 text-navy-800 mb-3 pr-8">
                            Special Offer Just for You!
                        </h2>
                        <p className="text-navy-600 mb-4">
                            We noticed you&apos;re still deciding. Here&apos;s 10% off your
                            order when you complete your purchase in the next 15 minutes.
                        </p>
                        <div className="bg-gold-50 border border-gold-200 rounded-lg p-4 mb-6 text-center">
                            <p className="text-sm text-navy-600 mb-1">Use code at checkout:</p>
                            <p className="text-xl font-bold text-gold-600">STAYLEARN10</p>
                        </div>
                        <button
                            onClick={handleClose}
                            className="btn btn-primary w-full justify-center"
                        >
                            Continue to Checkout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
