import { NextRequest, NextResponse } from "next/server";
import { getAdminDb, getAdminAuth } from "@/lib/firebase-admin";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        // Get auth token from cookie
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("__session")?.value;

        if (!sessionCookie) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        // Verify token
        const auth = getAdminAuth();
        const db = getAdminDb();

        if (!auth || !db) {
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        let userId: string;
        try {
            const decodedToken = await auth.verifySessionCookie(sessionCookie);
            userId = decodedToken.uid;
        } catch {
            return NextResponse.json(
                { error: "Invalid session" },
                { status: 401 }
            );
        }

        // Get asset data from body
        const body = await request.json();
        const { type, title, content } = body;

        if (!type || !title || !content) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Validate type
        const validTypes = ["niche", "content", "contract"];
        if (!validTypes.includes(type)) {
            return NextResponse.json(
                { error: "Invalid asset type" },
                { status: 400 }
            );
        }

        // Save to user's assets collection
        const assetRef = await db
            .collection("users")
            .doc(userId)
            .collection("savedAssets")
            .add({
                type,
                title,
                content,
                createdAt: new Date(),
            });

        return NextResponse.json({
            success: true,
            id: assetRef.id,
            message: "Asset saved successfully"
        });
    } catch (error) {
        console.error("Save asset error:", error);
        return NextResponse.json(
            { error: "Failed to save asset" },
            { status: 500 }
        );
    }
}
