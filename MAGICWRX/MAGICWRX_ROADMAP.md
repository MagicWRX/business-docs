# MAGICWRX_ROADMAP.md

**Purpose:** Strategic roadmap and implementation plan for MagicWRX.

**Date Created:** December 18, 2025  
**Last Updated:** December 18, 2025

---

## 🧭 Strategic Goals

1.  **MVP Delivery:** Launch a fully functional site builder with 5 core templates.
2.  **Platform Stability:** Ensure 99.9% uptime with Supabase and Vercel.
3.  **User Growth:** Onboard first 100 paying customers via Freemium model.

---
## Now

### 🎯 Current Focus: User Registration & Website Creation (Phase 2A)

**Objective:** Enable users to register, authenticate, and create their first website based on base-template.

**Key Deliverables:**
1. ✅ Complete user registration flow (Supabase Auth)
2. 🔄 Website provisioning system using base-template
3. 🔄 User dashboard for site management
4. 🔄 Template selection and customization
5. 📋 Admin-controlled landing page (Future Phase)

**Timeline:** Next 2 weeks

---

## 🛣️ Milestone Timeline

### ✅ Phase 1: Foundation (Completed)
- [x] **Project Setup:** Next.js 15+, Tailwind, TypeScript.
- [x] **Authentication:** Migrated from Firebase to Supabase Auth.
- [x] **Database:** Supabase Postgres schema and RLS policies established.
- [x] **Basic UI:** Hero, Features, Pricing, Contact pages.

### 🚧 Phase 2: Core Features (In Progress)

#### Phase 2A: User Registration & Site Provisioning (Current Sprint)
- [x] **User Authentication:**
    - [x] Supabase Auth integration (Email/Password + Google OAuth)
    - [x] User profiles table with RLS policies
    - [x] Session management middleware
- [ ] **Website Creation Flow:**
    - [ ] User registration onboarding
    - [ ] Template selection interface (base-template as foundation)
    - [ ] Site provisioning service (creates user subdomain)
    - [ ] Initial site configuration (theme, branding)
- [ ] **User Dashboard:**
    - [x] Site management list
    - [ ] Quick actions (Edit, Publish, Settings)
    - [ ] Site preview and analytics
- [ ] **Site Management:**
    - [ ] Clone base-template for each new site
    - [ ] Database schema for sites table (client_id, domain, config)
    - [ ] Subdomain routing (username.magicwrx.com)
    - [ ] Site settings management

#### Phase 2B: Site Builder & Templates
- [ ] **Site Builder:**
    - [x] Drag-and-drop interface (Basic)
    - [ ] Component library expansion (Gallery, Forms, Maps)
    - [ ] Real-time preview
- [ ] **Templates:**
    - [x] Portfolio Template
    - [ ] E-commerce Template
    - [ ] SaaS Template
    - [ ] Restaurant Template
    - [ ] Corporate Template
- [ ] **Advanced Dashboard:**
    - [ ] Analytics integration
    - [ ] Domain settings
    - [ ] Custom domain mapping

### 📅 Phase 3: Monetization & Scale (Q1 2026)
- [ ] **Billing:** Stripe Subscription integration (Basic -> Pro -> Enterprise).
- [ ] **Admin Tools:** User management, content CMS, support ticket system.
- [ ] **Marketing:** SEO optimization, blog launch, email campaigns (Resend).

---

## 🛠️ Implementation Details

### Site Builder Engine
- **Tech:** `@dnd-kit/core` for drag-and-drop.
- **State:** Local state for editor, synced to Supabase on save.
- **Rendering:** JSON-based schema stored in `sites` table `content` column.

### Authentication Flow
- **Provider:** Supabase Auth (Email/Password + Google OAuth).
- **Middleware:** `src/middleware.ts` protects `/dashboard` and `/admin` routes.
- **Roles:** `profiles` table contains `role` ('user' | 'admin').

### Database Schema
- **`profiles`**: User data, linked to `auth.users`.
- **`sites`**: User created sites, contains JSON content.
- **`subscriptions`**: Stripe subscription status.

---

## ⚠ Risks & Blockers

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Complex Editor State** | High | Use `useReducer` or state machine for editor logic. |
| **Template Divergence** | Medium | Create strict interfaces for template components. |
| **Stripe Webhooks** | Medium | Comprehensive testing with Stripe CLI. |

---

## 🎉 Recent Accomplishments (December 20, 2025)

### ✅ Phase 2A: User Registration & Site Provisioning - COMPLETE

**Delivered:**
- [x] Complete database schema with RLS policies
- [x] Site provisioning service (create, update, publish, delete)
- [x] Multi-step onboarding flow (Account → Business → Template → Complete)
- [x] Enhanced user dashboard with site management
- [x] Template-based website creation (5 templates)
- [x] Subscription tier limits enforcement
- [x] Subdomain generation and routing
- [x] Comprehensive documentation and setup scripts

**Files Created:**
- `supabase/migrations/001_create_sites_tables.sql` - Database schema
- `src/lib/services/site-provisioning.ts` - Site management service
- `src/app/onboarding/page.tsx` - Multi-step registration
- `src/app/dashboard/enhanced-page.tsx` - Enhanced dashboard
- `docs/USER_REGISTRATION_IMPLEMENTATION.md` - Complete guide
- `IMPLEMENTATION_SUMMARY.md` - Implementation summary
- `setup-user-registration.sh` - Automated setup script

**Key Features:**
- Users can register and get their first website in < 5 minutes
- Dashboard shows all sites with publish/unpublish functionality
- Subscription limits prevent over-creation
- Row Level Security ensures data isolation
- Base-template foundation for all new sites

**See:** `IMPLEMENTATION_SUMMARY.md` for complete details

---

## 📌 Alignment Checklist

```
[x] AI_STANDARDS.md cited
[x] Visual aids used
[x] Accessibility review
[x] Phase 2A Complete
[x] Ready for Phase 2B: Site Builder
```
