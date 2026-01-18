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

        // Check rate limit (5 per day for contracts)
        const today = new Date().toISOString().split("T")[0];
        const rateLimitRef = db
            .collection("users")
            .doc(userId)
            .collection("rateLimits")
            .doc(`deal_${today}`);

        const rateLimitDoc = await rateLimitRef.get();
        const currentCount = rateLimitDoc.exists ? rateLimitDoc.data()?.count || 0 : 0;

        if (currentCount >= 5) {
            return NextResponse.json(
                { error: "Rate limit exceeded. You can generate 5 documents per day." },
                { status: 429 }
            );
        }

        // Get deal info from body
        const body = await request.json();
        const { clientName, clientCompany, problem, solution, price, timeline } = body;

        if (!clientName || !clientCompany || !problem || !solution || !price || !timeline) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Generate with Grok
        const response = await generateWithGrok(
            [
                { role: "system", content: SYSTEM_PROMPTS.dealMaker },
                {
                    role: "user",
                    content: `Client: ${clientName} at ${clientCompany}
Problem: ${problem}
Solution: ${solution}
Price: ${price}
Timeline: ${timeline}

Please generate a Statement of Work and Consulting Agreement.`,
                },
            ],
            {
                maxTokens: 2500,
                temperature: 0.6,
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
            toolType: "deal",
            input: { clientName, clientCompany, problem, solution, price, timeline },
            output: response,
            createdAt: new Date(),
            exported: false,
        });

        return NextResponse.json(output);
    } catch (error) {
        console.error("Deal Maker error:", error);
        return NextResponse.json(
            { error: "Failed to generate documents. Please try again." },
            { status: 500 }
        );
    }
}
