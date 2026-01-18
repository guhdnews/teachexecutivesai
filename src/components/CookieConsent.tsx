"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const COOKIE_CONSENT_KEY = "cookie_consent";

type ConsentStatus = "accepted" | "declined" | null;

export function CookieConsent() {
    const [consent, setConsent] = useState<ConsentStatus>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if consent already given
        const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (stored) {
            setConsent(stored as ConsentStatus);
        } else {
            // Show banner after short delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
        setConsent("accepted");
        setIsVisible(false);

        // Enable analytics (GA, Meta Pixel)
        if (typeof window !== "undefined") {
            // Analytics will auto-initialize based on consent
            (window as Window & { cookieConsentGiven?: boolean }).cookieConsentGiven = true;
        }
    };

    const handleDecline = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
        setConsent("declined");
        setIsVisible(false);
    };

    if (!isVisible || consent) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-navy-900 text-white p-4 z-50 shadow-lg">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                    <p className="text-sm">
                        We use cookies to enhance your experience and analyze site traffic.
                        By clicking &ldquo;Accept,&rdquo; you consent to our use of cookies.
                        <Link href="/privacy" className="text-gold-400 hover:text-gold-300 ml-1">
                            Learn more
                        </Link>
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleDecline}
                        className="px-4 py-2 text-sm text-white border border-navy-500 hover:bg-navy-700 rounded-lg transition-colors"
                    >
                        Decline
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-4 py-2 bg-gold-500 hover:bg-gold-600 text-navy-900 font-medium rounded-lg text-sm transition-colors"
                    >
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    );
}

/**
 * Check if user has given cookie consent
 */
export function hasConsentedToCookies(): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted";
}
