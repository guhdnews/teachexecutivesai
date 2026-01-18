import Stripe from "stripe";
import { loadStripe, Stripe as StripeClient } from "@stripe/stripe-js";

/**
 * Stripe Configuration
 */

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-01-27.acacia",
    typescript: true,
});

// Client-side Stripe promise (singleton)
let stripePromise: Promise<StripeClient | null>;

export function getStripe(): Promise<StripeClient | null> {
    if (!stripePromise) {
        stripePromise = loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
        );
    }
    return stripePromise;
}

// Product/Price IDs
export const STRIPE_PRICES = {
    SOP: process.env.STRIPE_PRICE_SOP!,
    BUMP: process.env.STRIPE_PRICE_BUMP!,
    CAIO: process.env.STRIPE_PRICE_CAIO!,
    CAIO_PLAN: process.env.STRIPE_PRICE_CAIO_PLAN!,
    LAUNCHPAD: process.env.STRIPE_PRICE_LAUNCHPAD!,
    LAUNCHPAD_PLAN: process.env.STRIPE_PRICE_LAUNCHPAD_PLAN!,
} as const;

// Tier mapping
export const TIER_PRICES: Record<string, string> = {
    sop: STRIPE_PRICES.SOP,
    caio: STRIPE_PRICES.CAIO,
    launchpad: STRIPE_PRICES.LAUNCHPAD,
};

// Helper to create checkout session
export async function createCheckoutSession(params: {
    priceId: string;
    userId: string;
    userEmail: string;
    successUrl: string;
    cancelUrl: string;
    referralCode?: string;
    includeOrderBump?: boolean;
}) {
    const lineItems = [{ price: params.priceId, quantity: 1 }];

    // Add order bump if applicable
    if (params.includeOrderBump && params.priceId === STRIPE_PRICES.SOP) {
        lineItems.push({ price: STRIPE_PRICES.BUMP, quantity: 1 });
    }

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: lineItems,
        customer_email: params.userEmail,
        success_url: params.successUrl,
        cancel_url: params.cancelUrl,
        metadata: {
            userId: params.userId,
            referralCode: params.referralCode || "",
        },
    });

    return session;
}
