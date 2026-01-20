import { NextRequest, NextResponse } from "next/server";
import { getServerStripe } from "@/lib/stripe";
import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { cookies } from "next/headers";

/**
 * Stripe Billing Portal API
 * 
 * GET: Redirects authenticated user to Stripe Customer Portal
 */

export async function GET(request: NextRequest) {
    try {
        // Verify authentication
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("__session")?.value;

        if (!sessionCookie) {
            // Redirect to login if not authenticated
            return NextResponse.redirect(new URL("/login?redirect=/dashboard/settings", request.url));
        }

        const auth = getAdminAuth();
        const db = getAdminDb();

        if (!auth || !db) {
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        // Verify session and get user ID
        let userId: string;
        try {
            const decodedToken = await auth.verifySessionCookie(sessionCookie);
            userId = decodedToken.uid;
        } catch {
            return NextResponse.redirect(new URL("/login?redirect=/dashboard/settings", request.url));
        }

        // Get user's Stripe customer ID from Firestore
        const userDoc = await db.collection("users").doc(userId).get();

        if (!userDoc.exists) {
            return NextResponse.redirect(new URL("/dashboard/settings", request.url));
        }

        const userData = userDoc.data();
        const stripeCustomerId = userData?.stripeCustomerId;

        if (!stripeCustomerId) {
            // User has no Stripe customer ID - they haven't purchased anything
            return NextResponse.redirect(new URL("/dashboard/settings?error=no_subscription", request.url));
        }

        // Get Stripe client
        const stripe = getServerStripe();
        if (!stripe) {
            return NextResponse.json(
                { error: "Stripe not configured" },
                { status: 500 }
            );
        }

        // Create Stripe billing portal session
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: stripeCustomerId,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/settings`,
        });

        // Redirect to Stripe billing portal
        return NextResponse.redirect(portalSession.url);
    } catch (error) {
        console.error("Billing portal error:", error);
        return NextResponse.redirect(
            new URL("/dashboard/settings?error=billing_error", request.url)
        );
    }
}
