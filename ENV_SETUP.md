# Environment Variables Setup Guide

## Overview

This project uses environment variables to store sensitive configuration like API keys and Firebase credentials. These are stored in a `.env` file that is **NOT** committed to GitHub for security.

## Quick Start

### 1. Create your .env file

```bash
cp .env.example .env
```

### 2. Add your credentials

Open `.env` and replace the placeholder values with your actual credentials:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_actual_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_actual_auth_domain
VITE_FIREBASE_PROJECT_ID=your_actual_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_actual_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
VITE_FIREBASE_APP_ID=your_actual_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_actual_measurement_id
VITE_FIREBASE_VAPID_KEY=your_actual_vapid_key

# API Configuration
VITE_API_BASE_URL=/api
```

### 3. Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings > General
4. Scroll to "Your apps" section
5. Copy the `firebaseConfig` values

### 4. Get VAPID Key (for push notifications)

1. In Firebase Console, go to Project Settings > Cloud Messaging
2. Under "Web Push certificates", generate a new key pair
3. Copy the "Key pair" value

## Important Notes

### Security

- **NEVER** commit the `.env` file to GitHub
- The `.env` file is already in `.gitignore`
- Share credentials securely (password manager, encrypted channel)
- The `.env.example` file is safe to commit (no real values)

### Vite Environment Variables

- All environment variables must be prefixed with `VITE_` to be exposed to the client
- Access them in code using `import.meta.env.VITE_VARIABLE_NAME`
- Changes to `.env` require restarting the dev server

### For Team Members

When you clone this repository:

1. Copy `.env.example` to `.env`
2. Ask the team lead for the actual credential values
3. Never share credentials in chat or email

## Troubleshooting

### Variables not loading?

1. Make sure the variable name starts with `VITE_`
2. Restart your dev server (`npm run dev`)
3. Check that `.env` is in the project root directory

### Firebase not working?

1. Verify all Firebase variables are set correctly
2. Check Firebase Console that your domain is authorized
3. Ensure VAPID key is correct for push notifications

## Files Involved

- `.env` - Your actual credentials (git ignored)
- `.env.example` - Template file (committed to git)
- `.gitignore` - Ensures `.env` is not tracked
- `src/vite-env.d.ts` - TypeScript definitions for env variables
- `src/config.ts` - Uses env variables for API configuration
- `src/firebase.tsx` - Uses env variables for Firebase config
