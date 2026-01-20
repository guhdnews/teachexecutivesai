import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebase-admin";
import { cookies } from "next/headers";

/**
 * Session Cookie Management API
 * 
 * POST: Create session cookie from Firebase ID token
 * DELETE: Clear session cookie (logout)
 */

// Session cookie expires in 5 days (Firebase max is 14 days)
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 5 * 1000; // 5 days in ms

export async function POST(request: NextRequest) {
    try {
        const auth = getAdminAuth();

        if (!auth) {
            console.error("Firebase Admin Auth not configured");
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        const body = await request.json();
        const { idToken } = body;

        if (!idToken) {
            return NextResponse.json(
                { error: "ID token required" },
                { status: 400 }
            );
        }

        // Verify the ID token first
        let decodedToken;
        try {
            decodedToken = await auth.verifyIdToken(idToken);
        } catch (error) {
            console.error("ID token verification failed:", error);
            return NextResponse.json(
                { error: "Invalid ID token" },
                { status: 401 }
            );
        }

        // Check if user signed in recently (within last 5 minutes)
        // This prevents session cookie creation from stolen tokens
        const authTime = decodedToken.auth_time * 1000; // Convert to ms
        if (Date.now() - authTime > 5 * 60 * 1000) {
            return NextResponse.json(
                { error: "Recent sign in required. Please sign in again." },
                { status: 401 }
            );
        }

        // Create session cookie
        let sessionCookie;
        try {
            sessionCookie = await auth.createSessionCookie(idToken, {
                expiresIn: SESSION_COOKIE_MAX_AGE,
            });
        } catch (error) {
            console.error("Session cookie creation failed:", error);
            return NextResponse.json(
                { error: "Failed to create session" },
                { status: 500 }
            );
        }

        // Set the cookie
        const cookieStore = await cookies();
        cookieStore.set("__session", sessionCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: SESSION_COOKIE_MAX_AGE / 1000, // Convert to seconds
            path: "/",
        });

        return NextResponse.json({
            success: true,
            message: "Session created successfully"
        });
    } catch (error) {
        console.error("Session creation error:", error);
        return NextResponse.json(
            { error: "Failed to create session" },
            { status: 500 }
        );
    }
}

// DELETE: Clear session cookie (logout)
export async function DELETE() {
    try {
        const cookieStore = await cookies();

        // Get current session to revoke it
        const sessionCookie = cookieStore.get("__session")?.value;

        if (sessionCookie) {
            const auth = getAdminAuth();
            if (auth) {
                try {
                    // Verify and get uid to revoke refresh tokens
                    const decodedClaims = await auth.verifySessionCookie(sessionCookie);
                    await auth.revokeRefreshTokens(decodedClaims.uid);
                } catch {
                    // Session might already be invalid, continue with deletion
                }
            }
        }

        // Delete the session cookie
        cookieStore.delete("__session");

        return NextResponse.json({
            success: true,
            message: "Session cleared successfully"
        });
    } catch (error) {
        console.error("Session deletion error:", error);
        return NextResponse.json(
            { error: "Failed to clear session" },
            { status: 500 }
        );
    }
}
