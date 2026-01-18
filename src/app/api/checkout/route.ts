import { NextRequest, NextResponse } from "next/server";
import { getServerStripe, STRIPE_PRICES } from "@/lib/stripe";
import { getAdminDb } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
    try {
        const stripe = getServerStripe();
        const db = getAdminDb();

        if (!stripe) {
            return NextResponse.json(
                { error: "Stripe not configured" },
                { status: 500 }
            );
        }

        if (!db) {
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        const body = await request.json();
        const { priceId, userId, userEmail, tier, referralCode, includeOrderBump } = body;

        // Validate required fields
        if (!priceId || !userId || !userEmail) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Build line items
        const lineItems = [{ price: priceId, quantity: 1 }];

        // Add order bump if applicable (only for SOP tier)
        if (includeOrderBump && priceId === STRIPE_PRICES.SOP) {
            lineItems.push({ price: STRIPE_PRICES.BUMP, quantity: 1 });
        }

        // Create or retrieve Stripe customer
        let customerId: string | undefined;

        // Check if user already has a Stripe customer ID
        const userDoc = await db.collection("users").doc(userId).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            customerId = userData?.stripeCustomerId;
        }

        if (!customerId) {
            // Create new customer
            const customer = await stripe.customers.create({
                email: userEmail,
                metadata: {
                    firebaseUserId: userId,
                },
            });
            customerId = customer.id;

            // Save customer ID to Firestore
            await db.collection("users").doc(userId).update({
                stripeCustomerId: customerId,
            });
        }

        // Determine success and cancel URLs
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        // Create checkout session
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            mode: "payment",
            payment_method_types: ["card"],
            line_items: lineItems,
            success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/checkout/cancel`,
            metadata: {
                userId,
                tier,
                referralCode: referralCode || "",
            },
            allow_promotion_codes: true,
            billing_address_collection: "required",
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json(
            { error: "Failed to create checkout session" },
            { status: 500 }
        );
    }
}
