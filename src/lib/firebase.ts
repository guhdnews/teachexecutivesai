import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

/**
 * Firebase Client-Side Configuration
 * Used in React components and client-side code
 * 
 * SSR-safe: Only initializes when called on the client
 * Gracefully handles missing environment variables
 */

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if Firebase is configured
export function isFirebaseConfigured(): boolean {
    return Boolean(
        firebaseConfig.apiKey &&
        firebaseConfig.projectId &&
        typeof window !== "undefined"
    );
}

// Lazy initialization - only runs when accessed
let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;
let _storage: FirebaseStorage | null = null;

function getFirebaseApp(): FirebaseApp | null {
    if (typeof window === "undefined") return null;
    if (!isFirebaseConfigured()) return null;

    if (!_app) {
        if (!getApps().length) {
            _app = initializeApp(firebaseConfig);
        } else {
            _app = getApps()[0];
        }
    }
    return _app;
}

export function getClientAuth(): Auth | null {
    if (typeof window === "undefined") return null;
    if (!isFirebaseConfigured()) {
        console.warn("Firebase Auth: Missing API key. Please configure environment variables.");
        return null;
    }
    if (!_auth) {
        const app = getFirebaseApp();
        if (app) {
            _auth = getAuth(app);
        }
    }
    return _auth;
}

export function getClientDb(): Firestore | null {
    if (typeof window === "undefined") return null;
    if (!isFirebaseConfigured()) {
        console.warn("Firebase Firestore: Missing API key. Please configure environment variables.");
        return null;
    }
    if (!_db) {
        const app = getFirebaseApp();
        if (app) {
            _db = getFirestore(app);
        }
    }
    return _db;
}

export function getClientStorage(): FirebaseStorage | null {
    if (typeof window === "undefined") return null;
    if (!isFirebaseConfigured()) {
        console.warn("Firebase Storage: Missing API key. Please configure environment variables.");
        return null;
    }
    if (!_storage) {
        const app = getFirebaseApp();
        if (app) {
            _storage = getStorage(app);
        }
    }
    return _storage;
}

// Legacy exports for backwards compatibility - may be null if not configured
export const auth = typeof window !== "undefined" ? getClientAuth() : null;
export const db = typeof window !== "undefined" ? getClientDb() : null;
export const storage = typeof window !== "undefined" ? getClientStorage() : null;
