# MagicWRX Migration Plan: Firebase to Supabase

**Document Date:** December 16, 2025  
**Status:** Planning Phase  
**Target Completion:** 4 Weeks

---

## 🎯 Objective
Migrate the MagicWRX platform from Firebase (Auth, Firestore, Storage) to Supabase (Auth, PostgreSQL, Storage) to unify the MAGIC ecosystem architecture and leverage relational data models for the SaaS platform.

---

## 📋 Pre-Migration Checklist

### 1. Project Setup
- [ ] **Create Supabase Project**
  - Name: `magicwrx-platform`
  - Organization: `magicwrx-studios` (MagicWRXStudios@gmail.com)
  - Region: Same as Vercel deployment (e.g., us-east-1)
  - Save API keys to password manager

- [ ] **Configure Environment**
  - Update `.env.local` with Supabase credentials
  - Keep Firebase credentials for dual-running during migration

### 2. Database Schema Design
- [ ] **Analyze Firestore Data Structure**
  - Users collection
  - Sites collection
  - Templates collection
  - Subscriptions collection

- [ ] **Design PostgreSQL Schema**
  - `public.users` (extends `auth.users`)
  - `public.sites` (linked to users)
  - `public.templates` (marketplace items)
  - `public.subscriptions` (Stripe sync)
  - `public.site_pages` (for site builder content)

---

## 🚀 Migration Phases

### Phase 1: Authentication & User Data (Week 1)

#### 1.1 Supabase Auth Setup
- [ ] Enable Email/Password provider
- [ ] Enable Google OAuth provider
  - Create new OAuth client ID in Google Cloud Console
  - Configure redirect URLs: `http://localhost:3002/auth/callback`, `https://magicwrx.vercel.app/auth/callback`

#### 1.2 User Migration Script
- [ ] Export users from Firebase Auth (using firebase-admin)
- [ ] Import users to Supabase Auth (using supabase-js admin client)
- [ ] Create `public.profiles` entries for imported users

#### 1.3 Update Frontend Auth
- [ ] Replace `useAuth` hook to use Supabase client
- [ ] Update Login/Signup forms
- [ ] Update Protected Route middleware
- [ ] Test Google Sign-In flow

### Phase 2: Database Migration (Week 2)

#### 2.1 Schema Implementation
- [ ] Write SQL migration files (`supabase/migrations/`)
- [ ] Apply schema to local and remote Supabase instances
- [ ] Set up RLS policies (Row Level Security)
  - Users can only read/write their own data
  - Public read access for templates
  - Admin write access for templates

#### 2.2 Data Transfer
- [ ] Write script to read Firestore collections and insert into PostgreSQL tables
- [ ] Handle data type conversions (Timestamp -> ISO string, etc.)
- [ ] Verify data integrity after transfer

#### 2.3 Update Frontend Data Fetching
- [ ] Replace `firebase/firestore` calls with `supabase-js` client
- [ ] Update `SiteCard`, `TemplateCard`, `SubscriptionManager` components
- [ ] Implement real-time subscriptions if needed (e.g., dashboard updates)

### Phase 3: Storage & Assets (Week 3)

#### 3.1 Storage Setup
- [ ] Create Supabase Storage buckets:
  - `site-assets` (public)
  - `user-uploads` (private/authenticated)
  - `templates` (public)

#### 3.2 Asset Migration
- [ ] Script to download files from Firebase Storage and upload to Supabase Storage
- [ ] Update file references in the database (new public URLs)

#### 3.3 Update Frontend Uploads
- [ ] Replace Firebase Storage upload logic with Supabase Storage API
- [ ] Update image components to use new URL structure

### Phase 4: Cleanup & Launch (Week 4)

#### 4.1 Testing
- [ ] Full E2E testing of user journey (Signup -> Create Site -> Save)
- [ ] Verify Stripe webhook integration with new database
- [ ] Check RLS policies (security audit)

#### 4.2 Deployment
- [ ] Deploy updated Next.js app to Vercel
- [ ] Update Vercel environment variables
- [ ] Monitor logs for errors

#### 4.3 Deprecation
- [ ] Disable Firebase Auth (prevent new signups)
- [ ] Make Firestore read-only
- [ ] Archive Firebase project data
- [ ] Remove Firebase SDK dependencies from `package.json`

---

## 🛠️ Technical Implementation Details

### Schema Reference (Draft)

```sql
-- Users (extends auth.users)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  stripe_customer_id text,
  created_at timestamptz default now()
);

-- Templates
create table public.templates (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  description text,
  price_id text, -- Stripe price ID
  thumbnail_url text,
  category text,
  is_premium boolean default false,
  created_at timestamptz default now()
);

-- User Sites
create table public.sites (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles not null,
  template_id uuid references public.templates,
  name text not null,
  subdomain text unique,
  custom_domain text unique,
  settings jsonb default '{}',
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### Migration Script Skeleton (Node.js)

```javascript
// scripts/migrate-firestore-to-supabase.js
const admin = require('firebase-admin');
const { createClient } = require('@supabase/supabase-js');

// Init Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// Init Supabase Admin
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function migrateUsers() {
  const usersSnapshot = await db.collection('users').get();
  for (const doc of usersSnapshot.docs) {
    const userData = doc.data();
    // Insert into Supabase public.profiles
    const { error } = await supabase
      .from('profiles')
      .insert({
        id: doc.id, // Assuming Firebase UID matches Supabase Auth UID (requires careful Auth migration)
        email: userData.email,
        full_name: userData.displayName
      });
    if (error) console.error('Error migrating user:', error);
  }
}
```

---

## ⚠️ Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Data Loss** | High | Perform dry runs; keep Firebase data as backup. |
| **Downtime** | Medium | Use maintenance mode during final data sync. |
| **Auth ID Mismatch** | High | Use custom script to map Firebase UIDs to Supabase or update foreign keys. |
| **Broken Links** | Medium | Create redirect rules or update all asset URLs in DB. |

---

**Next Steps:**
1. Initialize Supabase project.
2. Set up local development environment with Supabase CLI.
3. Begin Phase 1 implementation.
