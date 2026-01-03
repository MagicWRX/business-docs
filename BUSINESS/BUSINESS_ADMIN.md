# BUSINESS ADMIN - Master Control System

**Document Date:** December 18, 2025  
**Version:** 2.0.0  
**Status:** Architecture Redesign - Centralized Multi-Tenant Admin  
**Last Updated:** December 18, 2025

---

## 🎯 PURPOSE

This document is the **Single Source of Truth (SSOT)** for the centralized ADMIN system that manages all Amazing Business platforms. The new architecture uses a **multi-tenant admin dashboard** located at `/Users/brianlindahl/Development/Business/ADMIN` to manage all projects from one location.

---

## 🏗️ ARCHITECTURE DECISION: Centralized Multi-Tenant Admin

### **Problem with Previous Approach**
❌ Each project had its own admin dashboard  
❌ Code duplication across 3+ admin implementations  
❌ Inconsistent features (AS had Layout Manager, MXN had user management, MagicWRX had basic stats)  
❌ Maintenance burden (updates replicated across all projects)  
❌ Different authentication contexts (Supabase accounts separate)

### **New Solution: Master ADMIN Dashboard**
✅ Single Next.js application manages all 3 Supabase instances  
✅ Shared component library (blog editor, media manager, user management)  
✅ Site switcher dropdown to switch between platforms  
✅ Role-based access control (brian@ for AS, magicwrxstudio@ for MagicWRX/MXN)  
✅ Unified analytics dashboard  
✅ Extract reusable components to /SHARED/ library

---

## 🗂️ PROJECT STRUCTURE

```
/Users/brianlindahl/Development/Business/
│
├── ADMIN/                              # 🎛️ MASTER CONTROL PANEL
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/              # Multi-tenant login
│   │   │   │   └── callback/
│   │   │   ├── dashboard/              # Site selector
│   │   │   ├── amazinglystrange/       # AS-specific admin
│   │   │   │   ├── blog/
│   │   │   │   ├── media/
│   │   │   │   └── layout-manager/
│   │   │   ├── magicwrx/              # MagicWRX-specific admin
│   │   │   │   ├── clients/           # Multi-tenant client management
│   │   │   │   ├── templates/
│   │   │   │   ├── billing/           # Stripe integration
│   │   │   │   └── revenue-share/     # AdSense tracking
│   │   │   └── mxn/                   # MXN-specific admin
│   │   │       ├── users/
│   │   │       ├── aliases/           # Reserved alias management
│   │   │       ├── vibes/
│   │   │       └── moderation/
│   │   ├── components/
│   │   │   ├── shared/                # Reusable admin UI
│   │   │   └── site-specific/
│   │   ├── lib/
│   │   │   ├── supabase/
│   │   │   │   ├── amazinglystrange.ts  # AS Supabase client
│   │   │   │   ├── magicwrx.ts          # MagicWRX client
│   │   │   │   └── mxn.ts               # MXN client
│   │   │   └── auth/
│   │   │       └── multi-tenant.ts    # Multi-tenant auth
│   │   └── types/
│   │       └── admin.ts               # Shared admin types
│   └── .env.local                     # All Supabase credentials
│
├── SHARED/                             # 📦 REUSABLE COMPONENTS
│   ├── auth-tool/                      # Google OAuth + Supabase (extracted)
│   ├── blog-engine/                    # Blog CMS (from AmazinglyStrange)
│   ├── layout-manager/                 # Visual page builder (from AS)
│   └── media-library/                  # Shared media manager
│
└── Websites/
    ├── MagicWRX/                       # Multi-tenant platform
    ├── mxn-chat/                       # Privacy-isolated platform
    └── amazinglystrange/               # Gaming platform
```

---

## 🔐 AUTHENTICATION & ACCESS CONTROL

### **Account Separation**

| Email | Access | Supabase Projects | Platforms |
|-------|--------|-------------------|-----------|
| **brian@amazinglystrange.com** | Super Admin | AmazinglyStrange Supabase | AmazinglyStrange.com |
| **magicwrxstudio@gmail.com** | Super Admin | MagicWRX Supabase, MXN Supabase | MagicWRX.com, MXN.CHAT, Artist Blogs, Pixel Art |

### **Multi-Tenant Authentication Strategy**

```typescript
// lib/auth/multi-tenant.ts
export function getSiteFromEmail(email: string): 'amazinglystrange' | 'magicwrx' | 'mxn' {
  if (email === 'brian@amazinglystrange.com') return 'amazinglystrange';
  if (email === 'magicwrxstudio@gmail.com') return 'magicwrx'; // Can access both MagicWRX and MXN
  throw new Error('Unauthorized');
}

export function getSupabaseClient(site: 'amazinglystrange' | 'magicwrx' | 'mxn') {
  const configs = {
    amazinglystrange: {
      url: process.env.AS_SUPABASE_URL!,
      anonKey: process.env.AS_SUPABASE_ANON_KEY!,
    },
    magicwrx: {
      url: process.env.MAGICWRX_SUPABASE_URL!,
      anonKey: process.env.MAGICWRX_SUPABASE_ANON_KEY!,
    },
    mxn: {
      url: process.env.MXN_SUPABASE_URL!,
      anonKey: process.env.MXN_SUPABASE_ANON_KEY!,
    },
  };
  
  return createClient(configs[site].url, configs[site].anonKey);
}
```

---

## 🗄️ SUPABASE PROJECT ARCHITECTURE

### **3 Supabase Instances**

| Supabase Project | Account | Purpose | Database Architecture |
|------------------|---------|---------|----------------------|
| **AmazinglyStrange Supabase** | brian@amazinglystrange.com | Gaming community, blog, admin features | Dedicated database |
| **MagicWRX Supabase** | magicwrxstudio@gmail.com | Multi-tenant platform for unlimited clients | Multi-tenant with RLS |
| **MXN.CHAT Supabase** | magicwrxstudio@gmail.com | Privacy-isolated chat platform | Dedicated database |

### **MagicWRX Multi-Tenant Schema**

```sql
-- Clients table (each client = customer of MagicWRX)
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  plan TEXT DEFAULT 'free',
  auth_provider TEXT DEFAULT 'google',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  stripe_customer_id TEXT,
  adsense_publisher_id TEXT
);

-- Multi-tenant sites (1 client -> N sites)
CREATE TABLE client_sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  site_name TEXT NOT NULL,
  domain TEXT,
  template_type TEXT,
  content JSONB,                         -- Layout Manager JSON
  settings JSONB,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Multi-tenant blogs (Artist Blog Platform)
CREATE TABLE client_blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  site_id UUID REFERENCES client_sites(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  images JSONB,
  published BOOLEAN DEFAULT false,
  adsense_enabled BOOLEAN DEFAULT true,
  revenue_share_percent DECIMAL DEFAULT 70.00,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE client_sites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Clients see own sites" ON client_sites
  FOR SELECT USING (client_id = auth.uid());
```

---

## 🎨 ADMIN FEATURES BY PLATFORM

### **AmazinglyStrange Admin**
- ✅ Blog management (WYSIWYG editor, image uploads)
- ✅ Media library (Firebase Storage integration)
- ✅ Layout Manager (visual page builder)
- ✅ Page management
- ✅ Analytics dashboard

### **MagicWRX Admin**
- 🚧 Client management (multi-tenant user CRUD)
- 🚧 Template marketplace management
- 🚧 Billing dashboard (Stripe subscriptions)
- 🚧 Revenue sharing tracker (Google AdSense API)
- 🚧 Site builder management
- 🚧 Analytics per client

### **MXN.CHAT Admin**
- ✅ User management (basic)
- 🚧 Alias management (reserved names: Shodai, Mosu, Brian, etc.)
- 🚧 Vibe controls
- 🚧 Content moderation
- 🚧 Room management
- 🚧 Analytics dashboard

---

## 📦 SHARED COMPONENT LIBRARY (/SHARED/)

### **Strategy: Extract Reusable Components**

| Package | Extracted From | Purpose | Status |
|---------|----------------|---------|--------|
| `@amazing/auth-tool` | /Websites/auth-tool | Google OAuth + Supabase | ✅ Exists |
| `@amazing/blog-engine` | AmazinglyStrange | Blog CMS with WYSIWYG | 🚧 To Extract |
| `@amazing/layout-manager` | AmazinglyStrange | Visual page builder | 🚧 To Extract |
| `@amazing/media-library` | AmazinglyStrange | Media upload/management | 🚧 To Extract |

### **Installation in Projects**

```json
// CODE:`DOCs/BUSINESS/Websites/MagicWRX/package.json`
{
  "dependencies": {
    "@amazing/auth-tool": "file:../../SHARED/auth-tool",
    "@amazing/blog-engine": "file:../../SHARED/blog-engine",
    "@amazing/layout-manager": "file:../../SHARED/layout-manager",
    "@amazing/media-library": "file:../../SHARED/media-library"
  }
}
```

---

## 🚀 MIGRATION ROADMAP

### **Phase 1: Foundation (Week 1)**
- [ ] Create `/ADMIN/` directory structure
- [ ] Set up Next.js 15 with App Router
- [ ] Configure multi-Supabase client setup
- [ ] Create shared UI components (tables, forms, modals)
- [ ] Implement multi-tenant authentication

### **Phase 2: Extract Shared Components (Week 2)** - 🚧 IN PROGRESS
- [ ] Move `auth-tool` to `/SHARED/auth-tool/` as npm package
- [ ] Extract blog editor from AmazinglyStrange → `/SHARED/blog-engine/`
- [ ] **🎯 PRIORITY: Extract layout manager from AmazinglyStrange → `/SHARED/layout-manager/`**
  - Source: `CODE:`../../../../Hosting/amazinglystrange/public/admin/js/layout-manager.js``
  - Features: Section/Column/Element hierarchy, template system, responsive design
  - See: [AMAZINGLYSTRANGE_LAYOUT_MANAGER.md](../../AMS/AMAZINGLYSTRANGE_LAYOUT_MANAGER.md)
- [ ] Extract media library → `/SHARED/media-library/`

### **Phase 3: Build Admin Features (Weeks 3-4)**
- [ ] **Week 3**: Migrate AmazinglyStrange admin
  - Blog Manager
  - Media Library
  - Layout Manager
- [ ] **Week 4**: Build MagicWRX admin
  - Client Management (multi-tenant)
  - Template Marketplace
  - Billing/Stripe Integration
  - Revenue Sharing Dashboard

### **Phase 4: MXN Admin (Week 5)**
- [ ] Alias Management (Reserved names system)
- [ ] Vibe Controls
- [ ] User Moderation
- [ ] Room Management

### **Phase 5: Unify & Deprecate (Week 6)**
- [ ] Add deprecation notices to old admin panels
- [ ] Redirect old admin URLs to new MASTER ADMIN
- [ ] Archive old admin code
- [ ] Update documentation

---

## 🔧 ENVIRONMENT VARIABLES

```bash
# AmazinglyStrange (brian@amazinglystrange.com)
AS_SUPABASE_URL=https://...supabase.co
AS_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
AS_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# MagicWRX (magicwrxstudio@gmail.com) - Multi-Tenant
MAGICWRX_SUPABASE_URL=https://...supabase.co
MAGICWRX_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
MAGICWRX_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# MXN (magicwrxstudio@gmail.com) - Privacy-Isolated
MXN_SUPABASE_URL=https://...supabase.co
MXN_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
MXN_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe (shared across platforms)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Google AdSense (for revenue sharing)
GOOGLE_ADSENSE_CLIENT_ID=ca-pub-...
GOOGLE_ADSENSE_API_KEY=...
```

---

## 📊 CURRENT STATUS

### **AmazinglyStrange.com**
- ✅ Uses brian@amazinglystrange.com for CODE:`DOCs/BUSINESS/GitHub/CODE:`DOCs/BUSINESS/Vercel/Supabase``
- ✅ Uses magicwrxstudio@gmail.com for Stripe Account
- 🚧 Migrating from Firebase to CODE:`DOCs/BUSINESS/Vercel/Supabase`
- ✅ Has static Firebase admin (to be replaced by /ADMIN/)
- 📁 **Live Directory**: `/Users/brianlindahl/Development/Hosting/amazinglystrange` (Firebase)
- 📁 **New Directory**: `/Users/brianlindahl/Development/Amazingly-Strange-Website` (CODE:`DOCs/BUSINESS/Vercel/Supabase`)

### **MagicWRX.com**
- ✅ Uses magicwrxstudio@gmail.com for CODE:`DOCs/BUSINESS/Vercel/Supabase`/Stripe
- 🚧 Multi-tenant architecture designed (not yet implemented)
- ❌ No admin page (will be built in /ADMIN/)
- 🚧 Needs multi-tenant schema migration

### **MXN.CHAT**
- ✅ Uses magicwrxstudio@gmail.com for Supabase
- ✅ Basic admin implemented in project
- 🚧 Will be migrated to /ADMIN/ dashboard
- 🚧 Reserved alias system to be implemented

---

## 📝 NEXT STEPS

### Completed
1. ✅ **Review architecture decision** (this document)
2. ✅ **Create `/ADMIN/` Next.js project** - Completed and pushed to GitHub
3. ✅ **Implement multi-Supabase client factory** - Factory pattern implemented in `CODE:`DOCs/BUSINESS/ADMIN/src/lib/supabase/factory.ts``
4. ✅ **Build site switcher UI** - Dashboard includes platform switcher dropdown
5. ✅ **Build AmazinglyStrange admin features** - Blog and Media management pages created
6. ✅ **Build MagicWRX admin** - Client management and billing dashboard created
7. ✅ **Build MXN admin** - User management, aliases, and moderation pages created

### Current Priority (Phase 2)
8. 🎯 **Extract Layout Manager to `/SHARED/layout-manager/`**
   - Source: AmazinglyStrange Firebase admin (`layout-manager.js`)
   - Convert to React/TypeScript package
   - Implement as npm package for cross-platform use
   - Test integration in ADMIN dashboard
   - Document usage and API

9. [ ] **Extract remaining shared components:**
   - Blog Engine (WYSIWYG editor from AS)
   - Media Library (upload/management system)
   - Auth Tool (already exists at `/Websites/auth-tool` - needs npm packaging)

### Future Phases
10. [ ] **Integrate shared components into all platforms**
11. [ ] **Build remaining MagicWRX features** (Template Marketplace, Revenue Sharing)
12. [ ] **Build remaining MXN features** (Room Management, Vibe Controls)
13. [ ] **Deprecate old admin panels** and redirect to centralized ADMIN

---

## ✅ COMPLETED WORK (December 19, 2025)

### Admin Dashboard Implementation

The ADMIN system has been successfully built and deployed to GitHub with the following features:

#### Core Infrastructure
- ✅ Next.js 15 App Router with TypeScript
- ✅ Multi-tenant authentication system with `AuthContext`
- ✅ Supabase client factory supporting 3 separate instances
- ✅ Site switching for multi-platform access
- ✅ MFA (Multi-Factor Authentication) support
- ✅ Session persistence via localStorage and cookies

#### Platform-Specific Admin Pages

**AmazinglyStrange Admin** (`/admin/amazinglystrange/`)
- ✅ Blog Management (`/blog`) - List, create, edit, delete blog posts
- ✅ Media Library (`/media`) - Upload and manage images/files
- 🎯 **Layout Manager** - Exists in AS Firebase admin, needs extraction to `/SHARED/`
  - Visual page builder with Section → Column → Element hierarchy
  - Template system with save/reuse capability
  - Responsive design controls and breakpoints
  - Export to HTML for production
  - **Action Required:** Extract to shared library for cross-platform use

**MagicWRX Admin** (`/admin/magicwrx/`)
- ✅ Client Management (`/clients`) - View all clients with search and filtering
- ✅ Billing Dashboard (`/billing`) - MRR tracking, revenue breakdown, subscription stats
- 🚧 Template Marketplace - To be implemented
- 🚧 Stripe webhook integration - To be implemented

**MXN.CHAT Admin** (`/admin/mxn/`)
- ✅ User Management (`/users`) - View, search, ban/unban users
- ✅ Reserved Aliases (`/aliases`) - Manage protected usernames (Shodai, Mosu, Brian, etc.)
- ✅ Content Moderation (`/moderation`) - Review flagged messages and content
- 🚧 Room Management - To be implemented
- 🚧 Vibe Controls - To be implemented

#### Additional Features
- ✅ Unified overview page (`/admin`) showing stats across all platforms
- ✅ Enhanced dashboard with quick actions and platform info
- ✅ Comprehensive README with setup instructions
- ✅ Deployment guide (DEPLOYMENT.md)
- ✅ `.gitignore` configured to exclude build artifacts
- ✅ GitHub repository: https://github.com/MagicWRX/admin.git

### Repository Status
- **Latest Commit:** "Add platform-specific admin pages and multi-tenant dashboard"
- **Branch:** main
- **Status:** Pushed to GitHub and ready for deployment

---
## 🖥️ Local Development & Scripts

- **Repo:** The Admin app lives at `/Users/brianlindahl/Development/Business/ADMIN` and has been pushed to https://github.com/MagicWRX/admin.git.
- **Install:** Run `npm install` in the `ADMIN` directory to install dependencies.
- **Dev server:** Start the app locally with `npm run dev` (serves on port 3005 by default via `next dev -p 3005`).
- **Build / Start:** Use `npm run build` then `npm start` for production runs.
- **Notes:** A `.gitignore` was added and build artifacts (the `.next` folder) are excluded from the repo to keep the repository small.

Add these commands when onboarding or updating the Admin environment:

```bash
cd /Users/brianlindahl/Development/Business/ADMIN
npm install
npm run dev
```

If you'd like, I can also commit this doc change to your docs repo and push it — tell me whether you want that and which remote to use.

**Follow BUSINESS_ROADMAP.md, use KISS + YAGNI, and write unit tests.** 🚀