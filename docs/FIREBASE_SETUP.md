# Firebase Setup Guide

This guide walks you through setting up Firebase for AI for Boomers.

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Name: "AI for Boomers" (or your preferred name)
4. Disable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable these providers:

### Email/Password
- Click "Email/Password"
- Enable "Email/Password"
- Enable "Email link (passwordless sign-in)" (for magic links)
- Save

### Google OAuth
- Click "Google"
- Enable it
- Select project support email
- Save

## 3. Create Firestore Database

1. Go to **Firestore Database**
2. Click "Create database"
3. Select "Start in production mode"
4. Choose location (us-east1 recommended)
5. Click "Enable"

## 4. Get Web App Config

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps"
3. Click **Web** (</> icon)
4. Register app name: "AI for Boomers Web"
5. Copy the config values:

```javascript
const firebaseConfig = {
  apiKey: "...",           // NEXT_PUBLIC_FIREBASE_API_KEY
  authDomain: "...",       // NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  projectId: "...",        // NEXT_PUBLIC_FIREBASE_PROJECT_ID
  storageBucket: "...",    // NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  messagingSenderId: "...", // NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  appId: "..."             // NEXT_PUBLIC_FIREBASE_APP_ID
};
```

## 5. Create Service Account (Admin SDK)

1. Go to **Project Settings** → **Service accounts**
2. Click "Generate new private key"
3. Download the JSON file
4. Extract these values:

```env
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgI...\n-----END PRIVATE KEY-----\n"
```

> **Important**: Keep the `\n` newline characters and wrap in quotes.

## 6. Environment Variables

Add these to `.env.local` or Vercel:

```env
# Firebase Client (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Firebase Admin (Server-side)
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## 7. Firestore Security Rules

In Firebase Console → Firestore Database → Rules, add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Rate limits subcollection
      match /rateLimits/{doc} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      
      // Saved assets subcollection
      match /savedAssets/{doc} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
    
    // Referrals - users can read their own
    match /referrals/{refId} {
      allow read: if request.auth != null && resource.data.referrerId == request.auth.uid;
    }
    
    // Email subscribers - server only (no client access)
    match /emailSubscribers/{doc} {
      allow read, write: if false;
    }
    
    // Generations - users can read their own
    match /generations/{genId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

Click "Publish" to deploy rules.

## 8. Storage Rules (Optional)

If using Firebase Storage for file uploads:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 9. Testing

1. Start dev server: `npm run dev`
2. Go to `/signup` and create an account
3. Check Firebase Console → Authentication for the new user
4. Check Firestore for the user document

## Troubleshooting

### "Firebase is not configured" warning
- Check all `NEXT_PUBLIC_FIREBASE_*` variables are set
- Restart dev server after adding env vars

### "Invalid session" errors
- Session cookies require HTTPS in production
- Make sure `NEXT_PUBLIC_APP_URL` matches your domain

### Private key errors
- Ensure private key is wrapped in quotes
- Keep all `\n` newline characters
- Don't remove the `-----BEGIN/END PRIVATE KEY-----` markers
