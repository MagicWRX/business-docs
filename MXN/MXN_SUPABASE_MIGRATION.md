# MXN Chat: Firebase to Supabase Migration Guide

## Overview
This guide outlines the migration of MXN Chat from Firebase to Supabase for improved scalability and cost-effectiveness.

## Prerequisites
1. Supabase account and project created
2. Supabase URL and anon key obtained
3. Database schema set up (see supabase-migration.sql)

## Migration Steps

### 1. Set Up Supabase Project
1. Create a new Supabase project at https://supabase.com
2. Go to Settings > API to get your project URL and anon key
3. Go to SQL Editor and run the migration script from `supabase-migration.sql`

### 2. Configure Authentication
1. In Supabase Dashboard > Authentication > Settings:
   - Enable email/password authentication
   - Enable Google OAuth (configure client ID/secret)
   - Set site URL to your domain
   - Set redirect URLs appropriately

### 3. Update Environment Variables
Replace the placeholders in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Database Schema
The migration includes:
- `users` table for user profiles
- `rooms` table for chat rooms
- `messages` table for chat messages
- Row Level Security policies
- Real-time subscriptions enabled

### 5. Test the Migration
1. Run `npm run dev` to start development server
2. Test user registration/login
3. Test creating/joining rooms
4. Test sending messages
5. Verify real-time updates work

### 6. Deploy to Production
1. Set environment variables in Vercel dashboard
2. Deploy using `vercel --prod`
3. Test production functionality

## Key Changes Made

### Code Changes
- Replaced Firebase Auth with Supabase Auth
- Replaced Firestore with Supabase PostgreSQL
- Updated real-time subscriptions to use Supabase channels
- Modified data models to match Supabase schema

### Dependencies
- Removed: `firebase`
- Added: `@supabase/supabase-js`, `@supabase/ssr`

### Database Schema
- Users: UUID primary key, email unique
- Rooms: Text ID, JSONB for flexible data
- Messages: UUID primary key, foreign keys to users/rooms
- RLS policies for security

## Rollback Plan
If issues arise, you can rollback by:
1. Reverting environment variables to Firebase
2. Switching back to Firebase imports in code
3. Firebase project is still active at https://mxn-chat.web.app

## Benefits of Migration
- Better PostgreSQL performance for complex queries
- Built-in authentication with Supabase Auth
- Real-time subscriptions included
- Lower costs for high-traffic applications
- Better developer experience with SQL