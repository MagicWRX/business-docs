# AmazinglyStrange Firebase Rules SSOT

This document serves as the Single Source of Truth for the Firebase Security Rules configuration for the AmazinglyStrange project.

## Current Status: RELAXED FOR DEBUGGING
**Date:** December 5, 2025
**Note:** Rules have been temporarily relaxed to `allow read, write: if true;` for core collections to diagnose dashboard loading issues.

## Firestore Rules Structure

The `firestore.rules` file controls access to the Firestore database.

### Helper Functions
- `isAdmin()`: Checks if `request.auth.token.admin == true`.
- `isAuthenticated()`: Checks if `request.auth != null`.

### Collection Rules (Intended Production State)

| Collection | Read Access | Write Access | Notes |
|------------|-------------|--------------|-------|
| `blogPosts` | Public (`true`) | Admin Only | Main blog content |
| `pages` | Admin Only | Admin Only | Site pages management |
| `media` | Admin Only | Admin Only | Media library metadata |
| `analytics` | Admin Only | Public (`true`) | Visitor tracking (write), Dashboard (read) |
| `settings` | Public (`true`) | Admin Only | Global site settings |
| `contacts` | Admin Only | Public (`true`) | Contact form submissions |
| `users` | Owner/Admin | Owner | User profile data |

### Storage Rules Structure

The `storage.rules` file controls access to Firebase Storage buckets.

| Path | Read Access | Write Access | Notes |
|------|-------------|--------------|-------|
| `/media/**` | Public (`true`) | Admin Only | General media uploads |
| `/blog-images/**` | Public (`true`) | Admin Only | Blog post images |
| `/public/**` | Public (`true`) | Admin Only | Public assets |

## Deployment
To deploy rules:
```bash
firebase deploy --only firestore:rules,storage
```

## Troubleshooting
If data is not loading in the admin dashboard:
1. Check if the user has the `admin` custom claim.
2. Verify `firestore.rules` allows read access to the collection.
3. Check browser console for "Missing or insufficient permissions".
