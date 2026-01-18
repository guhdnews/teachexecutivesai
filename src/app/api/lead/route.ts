import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
    try {
        const db = getAdminDb();

        if (!db) {
            // Still save to a mock response if DB not configured
            console.log("Firebase not configured, mock response");
        }

        const body = await request.json();
        const { name, email } = body;

        // Validate
        if (!name || !email) {
            return NextResponse.json(
                { error: "Name and email are required" },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            );
        }

        // Save to Firestore if configured
        if (db) {
            // Check for existing subscriber
            const existingDoc = await db
                .collection("emailSubscribers")
                .where("email", "==", email.toLowerCase())
                .limit(1)
                .get();

            if (existingDoc.empty) {
                await db.collection("emailSubscribers").add({
                    name,
                    email: email.toLowerCase(),
                    source: "lead-magnet",
                    leadMagnet: "digital-defense-briefing",
                    createdAt: new Date(),
                    tags: ["lead", "defense-briefing"],
                });
            }
        }

        // TODO: Send to ConvertKit when configured
        // const convertKitApiKey = process.env.CONVERTKIT_API_KEY;
        // if (convertKitApiKey) {
        //   await sendToConvertKit(name, email);
        // }

        // TODO: Send welcome email with PDF attachment
        // For now, we'll return success and let the frontend handle the download

        return NextResponse.json({
            success: true,
            message: "Thank you! Check your email for the download link.",
        });
    } catch (error) {
        console.error("Lead capture error:", error);
        return NextResponse.json(
            { error: "Failed to subscribe. Please try again." },
            { status: 500 }
        );
    }
}
