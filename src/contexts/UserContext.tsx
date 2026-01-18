"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { getClientDb, isFirebaseConfigured } from "@/lib/firebase";
import { useAuth } from "./AuthContext";
import { UserProfile, UserTier } from "@/types";
import { nanoid } from "nanoid";

interface UserContextType {
    profile: UserProfile | null;
    tier: UserTier;
    loading: boolean;
    hasAccess: (requiredTier: UserTier) => boolean;
    hasTool: (tool: "niche" | "authority" | "dealmaker") => boolean;
    refreshProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Tier hierarchy for access checks
const TIER_LEVELS: Record<UserTier, number> = {
    free: 0,
    sop: 1,
    caio: 2,
    launchpad: 3,
};

export function UserProvider({ children }: { children: ReactNode }) {
    const { user, isConfigured } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch or create user profile when auth changes
    useEffect(() => {
        if (!user) {
            setProfile(null);
            setLoading(false);
            return;
        }

        // Don't try to access Firestore if not configured
        if (!isConfigured) {
            setLoading(false);
            return;
        }

        const fetchOrCreateProfile = async () => {
            const db = getClientDb();
            if (!db) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    // User exists, set profile
                    const data = userSnap.data();
                    setProfile({
                        id: user.uid,
                        email: data.email,
                        name: data.name,
                        createdAt: data.createdAt?.toDate() || new Date(),
                        tier: data.tier || "free",
                        stripeCustomerId: data.stripeCustomerId,
                        referralCode: data.referralCode,
                        referredBy: data.referredBy,
                        deletedAt: data.deletedAt?.toDate(),
                    });
                } else {
                    // Create new user profile
                    const referralCode = nanoid(8).toUpperCase();

                    // Check for referral code in URL or localStorage
                    let referredBy: string | undefined;
                    if (typeof window !== "undefined") {
                        const urlParams = new URLSearchParams(window.location.search);
                        referredBy = urlParams.get("ref") ||
                            sessionStorage.getItem("referralCode") ||
                            undefined;
                    }

                    const newProfile = {
                        email: user.email || "",
                        name: user.displayName || "",
                        createdAt: serverTimestamp(),
                        tier: "free" as UserTier,
                        referralCode,
                        referredBy,
                    };

                    await setDoc(userRef, newProfile);

                    setProfile({
                        id: user.uid,
                        email: user.email || "",
                        name: user.displayName || "",
                        createdAt: new Date(),
                        tier: "free",
                        referralCode,
                        referredBy,
                    });
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrCreateProfile();
    }, [user, isConfigured]);

    // Refresh profile from Firestore
    const refreshProfile = async () => {
        if (!user) return;

        const db = getClientDb();
        if (!db) return;

        try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const data = userSnap.data();
                setProfile({
                    id: user.uid,
                    email: data.email,
                    name: data.name,
                    createdAt: data.createdAt?.toDate() || new Date(),
                    tier: data.tier || "free",
                    stripeCustomerId: data.stripeCustomerId,
                    referralCode: data.referralCode,
                    referredBy: data.referredBy,
                    deletedAt: data.deletedAt?.toDate(),
                });
            }
        } catch (error) {
            console.error("Error refreshing user profile:", error);
        }
    };

    // Check if user has access to a tier
    const hasAccess = (requiredTier: UserTier): boolean => {
        if (!profile) return false;
        return TIER_LEVELS[profile.tier] >= TIER_LEVELS[requiredTier];
    };

    // Check if user has access to AI tools (launchpad only)
    const hasTool = (): boolean => {
        // All three tools require launchpad tier
        return hasAccess("launchpad");
    };

    const value: UserContextType = {
        profile,
        tier: profile?.tier || "free",
        loading,
        hasAccess,
        hasTool,
        refreshProfile,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
