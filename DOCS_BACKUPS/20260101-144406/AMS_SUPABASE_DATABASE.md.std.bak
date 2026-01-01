# 🗄️ Amazingly Strange - Supabase Database Guide

**Project:** Amazingly Strange Website  
**Database:** Supabase PostgreSQL  
**Migration Date:** November 3, 2025  
**Status:** ✅ Production Ready

---

## 📋 Table of Contents

1. [Database Overview](#database-overview)
2. [Migration Process](#migration-process)
3. [Database Schema](#database-schema)
4. [Row Level Security (RLS)](#row-level-security-rls)
5. [Connection & Configuration](#connection--configuration)
6. [Data Import Results](#data-import-results)
7. [Making Changes](#making-changes)
8. [Common Operations](#common-operations)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Database Overview

### **Supabase Project Details**

- **Project ID:** `nthggvagtopobmdnquph`
- **Region:** Auto-selected (US-based)
- **Database:** PostgreSQL 15.x
- **URL:** `https://nthggvagtopobmdnquph.supabase.co`

### **What's Stored**

- **Blog Posts** - 21 articles migrated from Firebase
- **Table Configurations** - Dynamic table builder settings
- **Theme Presets** - UI color schemes (Emerald, Dark, Monster)
- **File Upload Metadata** - Image and asset tracking

---

## 🔄 Migration Process

### **What Had to Be Done**

#### **1. Database Schema Creation** ✅

**Challenge:** Needed to create tables compatible with both Firebase data and Next.js requirements.

**Solution:**
```sql
-- Run in Supabase SQL Editor
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Created 4 main tables:
-- 1. blog_posts - Main content
-- 2. tables - Table builder system
-- 3. themes - UI presets
-- 4. uploads - File metadata
```

**Location:** `scripts/migration/01-setup-database.sql`

**Critical Steps:**
- Enable UUID extension for auto-generated IDs
- Set up proper timestamp fields (`timestamptz`)
- Use JSONB for flexible metadata storage
- Reference `auth.users` for user tracking

#### **2. Row Level Security (RLS) Setup** ✅

**Challenge:** Secure data while allowing public blog viewing.

**Solution:**
```sql
-- Enable RLS on all tables
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "Blog posts viewable by everyone"
    ON public.blog_posts FOR SELECT
    USING (is_published = true);

-- Authenticated users can manage all content
CREATE POLICY "Blog posts manageable by authenticated users"
    ON public.blog_posts FOR ALL
    USING (auth.role() = 'authenticated');
```

**Key Insight:** Service role key bypasses RLS for migrations.

#### **3. Firebase Data Export** ✅

**Challenge:** Collection named `blogPosts` (not `blog-posts`), complex timestamp format.

**Issues Encountered:**
1. **Wrong Collection Name** - Initially tried `blog-posts` but Firebase used `blogPosts`
2. **Timestamp Format** - Firestore uses `{_seconds, _nanoseconds}` object format
3. **No `slug` Field** - Had to use document ID as slug
4. **HTML Content** - Blog posts stored as raw HTML with inline styles

**Solution:**
```javascript
// Fixed export script
const blogPostsRef = db.collection('blogPosts'); // Not 'blog-posts'!
const snapshot = await blogPostsRef.get();

snapshot.forEach((doc) => {
  const data = doc.data();
  const post = {
    id: doc.id,
    slug: data.slug || doc.id, // Fallback to ID
    publishedDate: data.publishedAt?._seconds 
      ? new Date(data.publishedAt._seconds * 1000).toISOString()
      : new Date().toISOString()
  };
});
```

**Location:** `scripts/migration/02-export-firebase.js`

**Lessons Learned:**
- Always inspect Firestore first with `04-inspect-firestore.js`
- Use Firebase Admin SDK, not client SDK
- Service account JSON must be properly formatted

#### **4. Environment Configuration** ✅

**Challenge:** Multiple API keys needed, `.env.local` format issues.

**Critical Variables:**
```bash
# Public keys (safe for browser)
NEXT_PUBLIC_SUPABASE_URL=https://nthggvagtopobmdnquph.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi... # Read-only access

# Service key (server-side ONLY)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi... # Full database access
```

**Common Mistakes:**
- ❌ Using placeholder text like `"your_supabase_service_role_key"`
- ❌ Putting service key in client-side code
- ❌ Not adding Firebase service account JSON

**Where to Get Keys:**
- Supabase Dashboard → Project Settings → API
- `anon` key = public access with RLS
- `service_role` key = admin access (bypasses RLS)

#### **5. Supabase Import** ✅

**Challenge:** Invalid API key errors, data type mismatches.

**Debugging Process:**
1. Verified service role key was real (not placeholder)
2. Tested connection with simple query
3. Added detailed error logging
4. Validated exported JSON structure

**Final Working Import:**
```javascript
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY, // Critical!
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Upsert to handle duplicates
const { data, error } = await supabase
  .from('blog_posts')
  .upsert(posts, { onConflict: 'slug' });
```

**Location:** `scripts/migration/03-import-supabase.js`

**Result:** ✅ 21 blog posts imported successfully

---

## 📊 Database Schema

### **Blog Posts Table**

```sql
CREATE TABLE public.blog_posts (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    title text NOT NULL,
    slug text NOT NULL UNIQUE,
    content text NOT NULL,
    excerpt text,
    author text DEFAULT 'Amazingly Strange',
    published_date timestamptz DEFAULT now(),
    updated_date timestamptz DEFAULT now(),
    tags text[] DEFAULT '{}',
    featured_image text,
    is_published boolean DEFAULT false,
    metadata jsonb DEFAULT '{}'
);
```

**Field Details:**
- `id` - Auto-generated UUID
- `slug` - URL-friendly identifier (must be unique)
- `content` - Full HTML content with inline styles
- `tags` - PostgreSQL array type for categories
- `metadata` - Flexible JSONB for custom fields

**Indexes:**
```sql
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published, published_date DESC);
```

### **Tables Configuration**

```sql
CREATE TABLE public.tables (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    title text NOT NULL,
    layout text CHECK (layout IN ('1-col', '2-col', '3-col')) NOT NULL,
    theme jsonb NOT NULL DEFAULT '{}',
    content jsonb NOT NULL DEFAULT '{}',
    metadata jsonb DEFAULT '{}',
    is_published boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    created_by uuid REFERENCES auth.users(id)
);
```

**Purpose:** Dynamic table builder for custom layouts

### **Themes Table**

```sql
CREATE TABLE public.themes (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name text NOT NULL UNIQUE,
    description text,
    config jsonb NOT NULL,
    is_default boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);
```

**Default Themes:**
- **Emerald** - Brand color (#47D7AC)
- **Dark** - High contrast black
- **Monster** - Purple accent (#671E75)

### **Uploads Table**

```sql
CREATE TABLE public.uploads (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    filename text NOT NULL,
    file_path text NOT NULL,
    content_type text NOT NULL,
    file_size integer NOT NULL,
    created_by uuid REFERENCES auth.users(id),
    created_at timestamptz DEFAULT now()
);
```

**Purpose:** Track file metadata (actual files in Supabase Storage)

---

## 🔒 Row Level Security (RLS)

### **Why RLS Matters**

RLS policies run at the database level, ensuring:
- Users only see published content (unless authenticated)
- Admin operations require authentication
- Service role bypasses all policies for migrations

### **Current Policies**

#### **Blog Posts**

```sql
-- Anyone can read published posts
CREATE POLICY "Blog posts viewable by everyone"
    ON public.blog_posts FOR SELECT
    USING (is_published = true);

-- Authenticated users can do everything
CREATE POLICY "Blog posts manageable by authenticated users"
    ON public.blog_posts FOR ALL
    USING (auth.role() = 'authenticated');
```

**What This Means:**
- Public visitors see published posts only
- Admin panel requires login
- Draft posts are private

#### **Tables, Themes, Uploads**

Similar pattern:
- Public: Read published/active items
- Authenticated: Full CRUD access

### **Testing RLS**

```sql
-- Test as anonymous user (should only see published)
SELECT * FROM blog_posts; -- Only published=true

-- Test as authenticated user (should see all)
-- (requires Supabase Auth session)
```

---

## 🔌 Connection & Configuration

### **Environment Variables**

**Required in `.env.local`:**

```bash
# Supabase Connection
NEXT_PUBLIC_SUPABASE_URL=https://nthggvagtopobmdnquph.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci... # Public key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci... # Admin key (server-side only)

# Firebase (for dual-source during transition)
FIREBASE_SERVICE_ACCOUNT_KEY={...} # JSON object
```

### **Client Connection (Browser)**

```typescript
// SHARED/auth-tool/src/lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

**Security:** Only uses `anon` key (limited by RLS)

### **Server Connection (Scripts/API)**

```typescript
// For migrations and admin operations
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Full access
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
```

**Warning:** Never expose service role key to browser!

---

## 📈 Data Import Results

### **Migration Summary**

**Date:** November 3, 2025

| Collection | Source | Imported | Status |
|------------|--------|----------|--------|
| Blog Posts | Firebase Firestore | 21 posts | ✅ Success |
| Tables | Firebase Firestore | 2 configs | ✅ Success |
| Themes | SQL Default | 3 themes | ✅ Success |
| Images | Firebase Storage | 11 files | ⏳ Still on Firebase |

### **Blog Posts Breakdown**

- **Total:** 21 posts
- **Published:** 11 posts
- **Drafts:** 10 posts
- **Average Length:** 2-5 KB HTML per post
- **Authors:** brian@amazinglystrange.com
- **Content Type:** HTML with inline styles

### **Image Strategy**

**Current State:** Images remain on Firebase Storage

**URLs Still Work:**
```
https://firebasestorage.googleapis.com/v0/b/amazingly-strange.appspot.com/o/blog-images%2F1760557534052-Candy-Corn-Critter.jpg?alt=media&token=...
```

**Future Migration Options:**

1. **Keep Firebase Storage** (Recommended short-term)
   - Zero downtime
   - Already working
   - Can migrate later

2. **Migrate to Supabase Storage**
   ```bash
   # Download from Firebase
   gsutil -m cp -r gs://amazingly-strange.appspot.com/blog-images ./downloads/
   
   # Upload to Supabase (via UI or API)
   # Then find/replace URLs in content
   ```

3. **Use CDN** (Advanced)
   - Cloudflare Images
   - Vercel Image Optimization
   - Better performance

---

## 🛠️ Making Changes

### **Adding New Tables**

**1. Write SQL Migration**

```sql
-- migrations/add_comments_table.sql
CREATE TABLE public.comments (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
    author_name text NOT NULL,
    content text NOT NULL,
    created_at timestamptz DEFAULT now(),
    is_approved boolean DEFAULT false
);

-- Add RLS
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved comments viewable by everyone"
    ON public.comments FOR SELECT
    USING (is_approved = true);

CREATE POLICY "Comments manageable by authenticated users"
    ON public.comments FOR ALL
    USING (auth.role() = 'authenticated');
```

**2. Run in Supabase SQL Editor**

Dashboard → SQL Editor → New Query → Paste → Run

**3. Update TypeScript Types**

```typescript
// src/types/database.ts
export interface Database {
  public: {
    Tables: {
      // ... existing tables
      comments: {
        Row: {
          id: string;
          post_id: string;
          author_name: string;
          content: string;
          created_at: string;
          is_approved: boolean;
        };
        Insert: {
          id?: string;
          post_id: string;
          author_name: string;
          content: string;
          created_at?: string;
          is_approved?: boolean;
        };
        Update: {
          id?: string;
          post_id?: string;
          author_name?: string;
          content?: string;
          created_at?: string;
          is_approved?: boolean;
        };
      };
    };
  };
}
```

**4. Create React Hook**

```typescript
// src/hooks/useComments.ts
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export function useComments(postId: string) {
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    async function fetchComments() {
      const { data } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });
      
      setComments(data || []);
    }
    
    fetchComments();
  }, [postId]);
  
  return { comments };
}
```

### **Modifying Existing Tables**

**Add Column:**

```sql
-- Add tags column to blog_posts
ALTER TABLE blog_posts 
ADD COLUMN view_count integer DEFAULT 0;
```

**Change Column:**

```sql
-- Make excerpt longer
ALTER TABLE blog_posts 
ALTER COLUMN excerpt TYPE text;
```

**Add Index:**

```sql
-- Speed up author queries
CREATE INDEX idx_blog_posts_author ON blog_posts(author);
```

### **Updating RLS Policies**

**Drop and Recreate:**

```sql
-- Remove old policy
DROP POLICY "Blog posts viewable by everyone" ON blog_posts;

-- Create new policy (e.g., add featured posts)
CREATE POLICY "Blog posts viewable by everyone"
    ON public.blog_posts FOR SELECT
    USING (is_published = true OR featured = true);
```

**Policy Templates:**

```sql
-- User can only see their own data
USING (auth.uid() = user_id)

-- Admin-only access
USING (auth.jwt() ->> 'role' = 'admin')

-- Time-based access
USING (published_date <= now())
```

---

## 🔧 Common Operations

### **Backup Database**

**Via Supabase Dashboard:**
1. Database → Backups
2. Click "Backup now"
3. Download SQL dump

**Via CLI:**
```bash
# Requires Supabase CLI
supabase db dump -f backup.sql --project-ref nthggvagtopobmdnquph
```

### **Query Data**

**SQL Editor:**
```sql
-- Get all published posts
SELECT title, published_date, author 
FROM blog_posts 
WHERE is_published = true 
ORDER BY published_date DESC;

-- Count posts by author
SELECT author, COUNT(*) as post_count 
FROM blog_posts 
GROUP BY author;

-- Find posts with specific tags
SELECT title, tags 
FROM blog_posts 
WHERE 'gamedev' = ANY(tags);
```

**Via API (Next.js):**
```typescript
const { data: posts } = await supabase
  .from('blog_posts')
  .select('*')
  .eq('is_published', true)
  .order('published_date', { ascending: false });
```

### **Update Multiple Records**

```sql
-- Publish all posts by specific author
UPDATE blog_posts 
SET is_published = true 
WHERE author = 'brian@amazinglystrange.com';

-- Update all timestamps
UPDATE blog_posts 
SET updated_date = now();
```

### **Delete Records**

```sql
-- Delete drafts older than 6 months
DELETE FROM blog_posts 
WHERE is_published = false 
  AND created_at < now() - INTERVAL '6 months';

-- Cascade delete (removes related records)
DELETE FROM blog_posts WHERE id = '...';
-- Related comments automatically deleted via CASCADE
```

---

## 🐛 Troubleshooting

### **Connection Issues**

**Problem:** "Invalid API key" or "Unable to connect"

**Solutions:**
```bash
# 1. Verify environment variables
node -e "console.log(require('dotenv').config({path:'.env.local'})); console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);"

# 2. Check key format
# Anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
# Service role: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 3. Test connection
curl https://nthggvagtopobmdnquph.supabase.co/rest/v1/blog_posts \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

### **RLS Policy Errors**

**Problem:** "new row violates row-level security policy"

**Cause:** Trying to insert as anonymous user

**Solutions:**
```typescript
// Option 1: Use service role key (server-side only)
const supabase = createClient(url, serviceRoleKey);

// Option 2: Authenticate user first
const { data: { session } } = await supabase.auth.signInWithPassword({
  email: 'admin@example.com',
  password: 'password'
});

// Option 3: Temporarily disable RLS (development only)
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
```

### **Type Errors**

**Problem:** TypeScript complains about table fields

**Solution:** Regenerate types
```bash
# Using Supabase CLI
supabase gen types typescript --project-id nthggvagtopobmdnquph > src/types/database.ts

# Or update manually in src/types/database.ts
```

### **Migration Failures**

**Problem:** Import script fails partway through

**Debug:**
```javascript
// Add detailed logging
console.log('Attempting to insert:', JSON.stringify(post, null, 2));

const { data, error } = await supabase.from('blog_posts').insert(post);

if (error) {
  console.error('Full error:', error);
  console.error('Error details:', error.details);
  console.error('Error hint:', error.hint);
}
```

**Common Fixes:**
- Check unique constraint violations (slug must be unique)
- Verify required fields are present
- Ensure date formats are ISO strings
- Validate JSONB field structure

### **Performance Issues**

**Problem:** Slow queries

**Solutions:**
```sql
-- Add indexes
CREATE INDEX idx_blog_posts_published_date 
  ON blog_posts(published_date DESC) 
  WHERE is_published = true;

-- Analyze query performance
EXPLAIN ANALYZE 
SELECT * FROM blog_posts 
WHERE is_published = true 
ORDER BY published_date DESC;

-- Use materialized views for complex queries
CREATE MATERIALIZED VIEW blog_stats AS
SELECT 
  author,
  COUNT(*) as total_posts,
  SUM(CASE WHEN is_published THEN 1 ELSE 0 END) as published_count
FROM blog_posts
GROUP BY author;

REFRESH MATERIALIZED VIEW blog_stats;
```

---

## 📚 Additional Resources

### **Supabase Dashboard**
- **Project:** https://supabase.com/dashboard/project/nthggvagtopobmdnquph
- **SQL Editor:** https://supabase.com/dashboard/project/nthggvagtopobmdnquph/sql
- **Table Editor:** https://supabase.com/dashboard/project/nthggvagtopobmdnquph/editor
- **API Docs:** https://supabase.com/dashboard/project/nthggvagtopobmdnquph/api

### **Migration Scripts**
- `scripts/migration/01-setup-database.sql` - Initial schema
- `scripts/migration/02-export-firebase.js` - Firebase export
- `scripts/migration/03-import-supabase.js` - Supabase import
- `scripts/migration/04-inspect-firestore.js` - Firebase inspection
- `scripts/migration/05-inspect-storage.js` - Storage inspection

### **Documentation**
- `docs/AS_ROADMAP.md` - Project roadmap
- `docs/AS_SETUP.md` - Setup instructions
- `scripts/migration/FIREBASE_EXTRACTION_GUIDE.md` - Firebase learning guide
- `scripts/migration/EXTRACTION_SUMMARY.md` - Migration summary

### **Official Docs**
- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Manual](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

## ✅ Migration Checklist

- [x] Create Supabase project
- [x] Set up database schema
- [x] Configure Row Level Security
- [x] Export Firebase data (21 blog posts)
- [x] Import to Supabase successfully
- [x] Verify data integrity
- [x] Update environment variables
- [x] Test admin interface
- [x] Document process
- [ ] Migrate images to Supabase Storage (optional)
- [ ] Set up automated backups
- [ ] Configure monitoring/alerts
- [ ] Plan for Firebase decommission

---

**Last Updated:** November 3, 2025  
**Status:** ✅ Production Ready  
**Next Review:** When adding new features or schema changes
