import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getStorage, Storage } from "firebase-admin/storage";

/**
 * Firebase Admin SDK Configuration
 * Used in API routes and server-side code only
 * 
 * Lazy initialization to prevent build-time errors
 */

// Check if Firebase Admin is configured
function isAdminConfigured(): boolean {
    return Boolean(
        process.env.FIREBASE_ADMIN_PRIVATE_KEY &&
        process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
        process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    );
}

// Lazy-initialized instances
let _adminApp: App | null = null;
let _adminAuth: Auth | null = null;
let _adminDb: Firestore | null = null;
let _adminStorage: Storage | null = null;

function getAdminApp(): App | null {
    if (!isAdminConfigured()) {
        console.warn("Firebase Admin: Missing configuration. Please add environment variables.");
        return null;
    }

    if (!_adminApp) {
        // Parse the private key (handles escaped newlines from env)
        const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(
            /\\n/g,
            "\n"
        );

        const adminConfig = {
            credential: cert({
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
                privateKey,
            }),
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        };

        const existingApps = getApps();
        if (!existingApps.length) {
            _adminApp = initializeApp(adminConfig, "admin");
        } else {
            // Check if we already have an admin app
            const adminApp = existingApps.find(app => app.name === "admin");
            if (adminApp) {
                _adminApp = adminApp;
            } else {
                _adminApp = initializeApp(adminConfig, "admin");
            }
        }
    }
    return _adminApp;
}

export function getAdminAuth(): Auth | null {
    if (_adminAuth) return _adminAuth;
    const app = getAdminApp();
    if (!app) return null;
    _adminAuth = getAuth(app);
    return _adminAuth;
}

export function getAdminDb(): Firestore | null {
    if (_adminDb) return _adminDb;
    const app = getAdminApp();
    if (!app) return null;
    _adminDb = getFirestore(app);
    return _adminDb;
}

export function getAdminStorage(): Storage | null {
    if (_adminStorage) return _adminStorage;
    const app = getAdminApp();
    if (!app) return null;
    _adminStorage = getStorage(app);
    return _adminStorage;
}

// Legacy exports for backwards compatibility
export const adminApp = null as App | null;
export const adminAuth = null as Auth | null;
export const adminDb = null as Firestore | null;
export const adminStorage = null as Storage | null;
