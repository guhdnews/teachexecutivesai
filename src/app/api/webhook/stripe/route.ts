import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { getServerStripe } from "@/lib/stripe";
import { getAdminDb } from "@/lib/firebase-admin";
import { UserTier } from "@/types";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Tier mapping from price IDs
function getTierFromPriceId(priceId: string): UserTier | null {
    const priceToTier: Record<string, UserTier> = {};

    if (process.env.STRIPE_PRICE_SOP) priceToTier[process.env.STRIPE_PRICE_SOP] = "sop";
    if (process.env.STRIPE_PRICE_CAIO) priceToTier[process.env.STRIPE_PRICE_CAIO] = "caio";
    if (process.env.STRIPE_PRICE_CAIO_PLAN) priceToTier[process.env.STRIPE_PRICE_CAIO_PLAN] = "caio";
    if (process.env.STRIPE_PRICE_LAUNCHPAD) priceToTier[process.env.STRIPE_PRICE_LAUNCHPAD] = "launchpad";
    if (process.env.STRIPE_PRICE_LAUNCHPAD_PLAN) priceToTier[process.env.STRIPE_PRICE_LAUNCHPAD_PLAN] = "launchpad";

    return priceToTier[priceId] || null;
}

async function handleCheckoutCompleted(
    session: Stripe.Checkout.Session,
    stripe: Stripe
) {
    const db = getAdminDb();
    if (!db) {
        console.error("Firebase Admin not configured");
        return;
    }

    const userId = session.metadata?.userId;
    const tier = session.metadata?.tier as UserTier;
    const referralCode = session.metadata?.referralCode;

    if (!userId) {
        console.error("No userId in session metadata");
        return;
    }

    // Get the purchased tier
    let purchasedTier = tier;
    if (!purchasedTier && session.line_items) {
        // Try to determine from line items
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        for (const item of lineItems.data) {
            if (item.price?.id) {
                const itemTier = getTierFromPriceId(item.price.id);
                if (itemTier) {
                    purchasedTier = itemTier;
                    break;
                }
            }
        }
    }

    // Update user tier
    if (purchasedTier) {
        await db.collection("users").doc(userId).update({
            tier: purchasedTier,
            lastPurchaseAt: new Date(),
        });
    }

    // Handle referral commission
    if (referralCode && session.amount_total) {
        const referrerDoc = await db
            .collection("users")
            .where("referralCode", "==", referralCode)
            .limit(1)
            .get();

        if (!referrerDoc.empty) {
            const referrer = referrerDoc.docs[0];
            const commission = Math.round(session.amount_total * 0.2); // 20% commission

            await db.collection("referrals").add({
                referrerId: referrer.id,
                referredUserId: userId,
                referralCode,
                purchaseAmount: session.amount_total,
                commission,
                status: "pending",
                createdAt: new Date(),
                sessionId: session.id,
            });
        }
    }

    console.log(`Checkout completed for user ${userId}, tier: ${purchasedTier}`);
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
    console.error("Payment failed:", {
        paymentIntentId: paymentIntent.id,
        error: paymentIntent.last_payment_error?.message,
    });
}

export async function POST(request: NextRequest) {
    const stripe = getServerStripe();

    if (!stripe || !webhookSecret) {
        console.error("Stripe webhook not configured");
        return NextResponse.json(
            { error: "Webhook not configured" },
            { status: 500 }
        );
    }

    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
        return NextResponse.json(
            { error: "Missing stripe-signature header" },
            { status: 400 }
        );
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return NextResponse.json(
            { error: "Webhook signature verification failed" },
            { status: 400 }
        );
    }

    // Handle the event
    switch (event.type) {
        case "checkout.session.completed":
            await handleCheckoutCompleted(
                event.data.object as Stripe.Checkout.Session,
                stripe
            );
            break;

        case "payment_intent.payment_failed":
            await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
            break;

        case "invoice.paid":
            console.log("Invoice paid:", event.data.object);
            break;

        case "invoice.payment_failed":
            console.log("Invoice payment failed:", event.data.object);
            break;

        case "customer.subscription.deleted":
            console.log("Subscription deleted:", event.data.object);
            break;

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
