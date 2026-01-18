"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import {
    User,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink,
    updateProfile,
} from "firebase/auth";
import { getClientAuth, isFirebaseConfigured } from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    isConfigured: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, name: string) => Promise<void>;
    signOut: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    sendMagicLink: (email: string) => Promise<void>;
    completeMagicLinkSignIn: (email: string) => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const googleProvider = new GoogleAuthProvider();

// Action code settings for magic links
const actionCodeSettings = {
    url: typeof window !== "undefined"
        ? `${window.location.origin}/auth/verify`
        : (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000") + "/auth/verify",
    handleCodeInApp: true,
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isConfigured, setIsConfigured] = useState(false);
    const router = useRouter();

    // Check if Firebase is configured on mount
    useEffect(() => {
        setIsConfigured(isFirebaseConfigured());
    }, []);

    // Listen to auth state changes
    useEffect(() => {
        const auth = getClientAuth();
        if (!auth) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [isConfigured]);

    // Clear error
    const clearError = () => setError(null);

    // Check if Firebase is ready
    const ensureAuth = () => {
        const auth = getClientAuth();
        if (!auth) {
            throw new Error("Firebase is not configured. Please add environment variables.");
        }
        return auth;
    };

    // Email/Password Sign In
    const signIn = async (email: string, password: string) => {
        try {
            setError(null);
            setLoading(true);
            const auth = ensureAuth();
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/dashboard");
        } catch (err: unknown) {
            const message = getAuthErrorMessage(err);
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    // Email/Password Sign Up
    const signUp = async (email: string, password: string, name: string) => {
        try {
            setError(null);
            setLoading(true);
            const auth = ensureAuth();
            const result = await createUserWithEmailAndPassword(auth, email, password);

            // Update display name
            await updateProfile(result.user, { displayName: name });

            // Note: Firestore user document will be created via UserContext
            router.push("/dashboard");
        } catch (err: unknown) {
            const message = getAuthErrorMessage(err);
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    // Sign Out
    const signOut = async () => {
        try {
            setError(null);
            const auth = ensureAuth();
            await firebaseSignOut(auth);
            router.push("/");
        } catch (err: unknown) {
            const message = getAuthErrorMessage(err);
            setError(message);
            throw new Error(message);
        }
    };

    // Google Sign In
    const signInWithGoogle = async () => {
        try {
            setError(null);
            setLoading(true);
            const auth = ensureAuth();
            await signInWithPopup(auth, googleProvider);
            router.push("/dashboard");
        } catch (err: unknown) {
            const message = getAuthErrorMessage(err);
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    // Send Magic Link
    const sendMagicLink = async (email: string) => {
        try {
            setError(null);
            const auth = ensureAuth();
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            // Store email for verification page
            if (typeof window !== "undefined") {
                window.localStorage.setItem("emailForSignIn", email);
            }
        } catch (err: unknown) {
            const message = getAuthErrorMessage(err);
            setError(message);
            throw new Error(message);
        }
    };

    // Complete Magic Link Sign In
    const completeMagicLinkSignIn = async (email: string) => {
        try {
            setError(null);
            setLoading(true);
            const auth = ensureAuth();

            if (typeof window !== "undefined" && isSignInWithEmailLink(auth, window.location.href)) {
                await signInWithEmailLink(auth, email, window.location.href);
                window.localStorage.removeItem("emailForSignIn");
                router.push("/dashboard");
            }
        } catch (err: unknown) {
            const message = getAuthErrorMessage(err);
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    // Password Reset
    const resetPassword = async (email: string) => {
        try {
            setError(null);
            const auth = ensureAuth();
            await sendPasswordResetEmail(auth, email);
        } catch (err: unknown) {
            const message = getAuthErrorMessage(err);
            setError(message);
            throw new Error(message);
        }
    };

    const value: AuthContextType = {
        user,
        loading,
        error,
        isConfigured,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        sendMagicLink,
        completeMagicLinkSignIn,
        resetPassword,
        clearError,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

// Helper to convert Firebase errors to user-friendly messages
function getAuthErrorMessage(error: unknown): string {
    if (error && typeof error === "object" && "code" in error) {
        const code = (error as { code: string }).code;
        switch (code) {
            case "auth/invalid-email":
                return "Please enter a valid email address.";
            case "auth/user-disabled":
                return "This account has been disabled. Contact support.";
            case "auth/user-not-found":
                return "No account found with this email. Did you mean to sign up?";
            case "auth/wrong-password":
                return "Incorrect password. Please try again.";
            case "auth/email-already-in-use":
                return "This email is already registered. Did you mean to log in?";
            case "auth/weak-password":
                return "Password must be at least 8 characters.";
            case "auth/too-many-requests":
                return "Too many attempts. Please try again in 15 minutes.";
            case "auth/popup-closed-by-user":
                return "Sign-in popup was closed. Please try again.";
            case "auth/invalid-credential":
                return "Invalid email or password. Please check and try again.";
            default:
                return "Something went wrong. Please try again.";
        }
    }

    // Check for our custom error
    if (error instanceof Error && error.message.includes("not configured")) {
        return "Authentication is not configured. Please contact support.";
    }

    return "Something went wrong. Please try again.";
}
