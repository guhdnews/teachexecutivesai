import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getStorage, Storage } from "firebase-admin/storage";

/**
 * Firebase Admin SDK Configuration
 * Used in API routes and server-side code only
 */

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

// Initialize Firebase Admin (singleton pattern)
let adminApp: App;
let adminAuth: Auth;
let adminDb: Firestore;
let adminStorage: Storage;

function initializeFirebaseAdmin() {
    if (!getApps().length) {
        adminApp = initializeApp(adminConfig, "admin");
    } else {
        adminApp = getApps()[0];
    }
    adminAuth = getAuth(adminApp);
    adminDb = getFirestore(adminApp);
    adminStorage = getStorage(adminApp);
}

// Initialize on import
initializeFirebaseAdmin();

export { adminApp, adminAuth, adminDb, adminStorage };
