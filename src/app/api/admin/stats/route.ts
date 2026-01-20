import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

/**
 * Admin Stats API
 * 
 * GET: Returns real statistics from Firestore
 */

export async function GET() {
    try {
        const db = getAdminDb();

        if (!db) {
            return NextResponse.json(
                { error: "Database not configured" },
                { status: 500 }
            );
        }

        // Get total users count
        const usersSnapshot = await db.collection("users")
            .where("deletedAt", "==", null)
            .count()
            .get();
        const totalUsers = usersSnapshot.data().count || 0;

        // Get users with paid tiers
        const paidUsersSnapshot = await db.collection("users")
            .where("tier", "in", ["sop", "caio", "launchpad"])
            .where("deletedAt", "==", null)
            .count()
            .get();
        const activeSubscriptions = paidUsersSnapshot.data().count || 0;

        // For revenue, we'd need to query Stripe directly or store payment records
        // For now, estimate based on user tiers
        const sopCount = (await db.collection("users").where("tier", "==", "sop").count().get()).data().count || 0;
        const caioCount = (await db.collection("users").where("tier", "==", "caio").count().get()).data().count || 0;
        const launchpadCount = (await db.collection("users").where("tier", "==", "launchpad").count().get()).data().count || 0;

        // Estimated revenue (SOP=$37, CAIO=$97, Launchpad=$297)
        const estimatedRevenue = (sopCount * 37) + (caioCount * 97) + (launchpadCount * 297);

        // For courses completed, we'd need to track progress
        // Placeholder for now - shows as 0 until progress tracking is implemented
        const coursesCompleted = 0;

        return NextResponse.json({
            totalUsers,
            totalRevenue: estimatedRevenue,
            activeSubscriptions,
            coursesCompleted,
            breakdown: {
                sop: sopCount,
                caio: caioCount,
                launchpad: launchpadCount,
            },
        });
    } catch (error) {
        console.error("Admin stats error:", error);
        return NextResponse.json(
            { error: "Failed to fetch stats" },
            { status: 500 }
        );
    }
}
