import { NextRequest, NextResponse } from "next/server";
import { generateWithGrok, SYSTEM_PROMPTS } from "@/lib/grok";
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

        // Check user tier
        const userDoc = await db.collection("users").doc(userId).get();
        if (!userDoc.exists) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const userData = userDoc.data();
        if (userData?.tier !== "launchpad") {
            return NextResponse.json(
                { error: "This tool requires the Launchpad tier" },
                { status: 403 }
            );
        }

        // Check rate limit (10 per day)
        const today = new Date().toISOString().split("T")[0];
        const rateLimitRef = db
            .collection("users")
            .doc(userId)
            .collection("rateLimits")
            .doc(`authority_${today}`);

        const rateLimitDoc = await rateLimitRef.get();
        const currentCount = rateLimitDoc.exists ? rateLimitDoc.data()?.count || 0 : 0;

        if (currentCount >= 10) {
            return NextResponse.json(
                { error: "Rate limit exceeded. You can generate 10 pieces of content per day." },
                { status: 429 }
            );
        }

        // Get story from body
        const body = await request.json();
        const { story, tone } = body;

        if (!story || story.length < 100) {
            return NextResponse.json(
                { error: "Please provide at least 100 characters of story" },
                { status: 400 }
            );
        }

        // Generate with Grok
        const response = await generateWithGrok(
            [
                { role: "system", content: SYSTEM_PROMPTS.authorityEngine },
                {
                    role: "user",
                    content: `Tone: ${tone || "professional"}\n\nHere is my story:\n\n${story}\n\nPlease transform this into content for LinkedIn, a newsletter, and a cold email.`,
                },
            ],
            {
                maxTokens: 3000,
                temperature: 0.7,
            }
        );

        // Parse JSON response
        let output;
        try {
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                output = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error("No JSON found in response");
            }
        } catch {
            console.error("Failed to parse Grok response:", response);
            return NextResponse.json(
                { error: "Failed to parse AI response. Please try again." },
                { status: 500 }
            );
        }

        // Update rate limit
        await rateLimitRef.set({
            count: currentCount + 1,
            lastUpdated: new Date(),
        });

        // Save generation to history
        await db.collection("generations").add({
            userId,
            toolType: "authority",
            input: { story, tone },
            output: response,
            createdAt: new Date(),
            exported: false,
        });

        return NextResponse.json(output);
    } catch (error) {
        console.error("Authority Engine error:", error);
        return NextResponse.json(
            { error: "Failed to generate content. Please try again." },
            { status: 500 }
        );
    }
}
