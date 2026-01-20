import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

// Simple in-memory rate limiting (per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // 5 requests
const RATE_WINDOW = 60 * 1000; // per minute

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
        return true;
    }

    if (record.count >= RATE_LIMIT) {
        return false;
    }

    record.count++;
    return true;
}

export async function POST(request: NextRequest) {
    try {
        // Rate limit by IP
        const ip = request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip") ||
            "unknown";

        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: "Too many requests. Please try again in a minute." },
                { status: 429 }
            );
        }

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

        return NextResponse.json({
            success: true,
            message: "You're all set! Access your content on the next page.",
        });
    } catch (error) {
        console.error("Lead capture error:", error);
        return NextResponse.json(
            { error: "Failed to subscribe. Please try again." },
            { status: 500 }
        );
    }
}
