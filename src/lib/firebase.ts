import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

/**
 * Firebase Client-Side Configuration
 * Used in React components and client-side code
 * 
 * SSR-safe: Only initializes when called on the client
 */

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Lazy initialization - only runs when accessed
let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;
let _storage: FirebaseStorage | null = null;

function getFirebaseApp(): FirebaseApp {
    if (!_app) {
        if (!getApps().length) {
            _app = initializeApp(firebaseConfig);
        } else {
            _app = getApps()[0];
        }
    }
    return _app;
}

export function getClientAuth(): Auth {
    if (typeof window === "undefined") {
        throw new Error("Firebase Auth can only be used on the client side");
    }
    if (!_auth) {
        _auth = getAuth(getFirebaseApp());
    }
    return _auth;
}

export function getClientDb(): Firestore {
    if (typeof window === "undefined") {
        throw new Error("Firebase Firestore client can only be used on the client side");
    }
    if (!_db) {
        _db = getFirestore(getFirebaseApp());
    }
    return _db;
}

export function getClientStorage(): FirebaseStorage {
    if (typeof window === "undefined") {
        throw new Error("Firebase Storage client can only be used on the client side");
    }
    if (!_storage) {
        _storage = getStorage(getFirebaseApp());
    }
    return _storage;
}

// For backwards compatibility - these getters ensure client-side only access
export const auth = typeof window !== "undefined" ? getClientAuth() : (null as unknown as Auth);
export const db = typeof window !== "undefined" ? getClientDb() : (null as unknown as Firestore);
export const storage = typeof window !== "undefined" ? getClientStorage() : (null as unknown as FirebaseStorage);
