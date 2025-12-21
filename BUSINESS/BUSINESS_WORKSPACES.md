# Business Workspaces Overview

**Document Date:** December 18, 2025  
**Version:** 2.0.0  
**Last Updated:** December 18, 2025  
**Status:** Multi-Tenant Platform Architecture

---
## Business Workspaces Prompt
1. [ ] Setting up Staging Site in ADMIN 
2. [ ] Setting up Demo Pages for SHARED tools.
3. [ ] ADMIN Master and Tenant System
4. [ ] Location-Filter Testing with in SHARED tools.
5. [ ] Stripe Setup
6. [ ] Adsense Setup
7. [ ] Google AUTH setup for BUSINESS Projects
8. [ ] Clear Database Structure, and Scale Development
9. [ ] Landing_01 thru Landing_12 Page for MagicWRX 
10. [ ] Landing Pages intertwinded with Template-WRX and Layout-Manager.tsx and SHARED tools.
11. [ ] Card Develpoment for SHARED Tools. d


**New Architecture (Dec 2025):**
- **Multi-Tenant Platform**: 
	MagicWRX Supabase serves unlimited clients via Row-Level Security (RLS)
	
- **Centralized Admin**: 
	`/ADMIN/` manages all 3 platforms from one dashboard (http://localhost:3006)

- **Shared Components**: 
	`/SHARED/` library (auth-tool, blog-engine, layout-manager, media-library)

---

## � Local Port Assignments (SSOT)

| Port | Project | Location |
|------|---------|----------|
| **3000** | **Business HUB** | `SHARED/hub` |
| **3001** | **MXN Chat** | `Websites/mxn-chat` |
| **3002** | **MagicWRX** | `Websites/MagicWRX` |
| **3003** | **Amazingly Strange** | `Amazingly-Strange-Website` |
| **3004** | **Base Template** | `Websites/base-template` |
| **3005** | **Template WRX** | `Websites/Template-WRX` |
| **3006** | **Master ADMIN** | `ADMIN/` |
| **3007** | **Auth Tool** | `Websites/auth-tool` |
| **3008** | **Auth Tool Pkg** | `Websites/auth-tool-package` |

---

## SHARED Tools Hub (Build + Test Lab)

**Purpose:** A dedicated playground for `@amazing/*` packages so features can be built/tested outside of `ADMIN`, and deployed independently for **staging vs production** validation.

**Local:**
- Runs at **http://localhost:3000** from `SHARED/hub`
- Start via: `bash SHARED/start-all-local.sh start hub`

**Relationship to ADMIN:**
- `ADMIN` remains the **real integration surface** (multi-tenant, real backends).
- The Hub is the **isolation surface** (mock backends by default, faster iteration, safer experiments).

### Environment Variables (Exact Names)

**Hub (recommended when connecting to real services):**
- `NEXT_PUBLIC_APP_ENV` = `development` | `staging` | `production`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only; never expose as `NEXT_PUBLIC_*`)

**mxn-chat (Supabase client uses):**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only; optional)

**ADMIN (.env.local.example):**
- `NEXT_PUBLIC_AS_SUPABASE_URL`
- `NEXT_PUBLIC_AS_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_MAGICWRX_SUPABASE_URL`
- `NEXT_PUBLIC_MAGICWRX_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_MXN_SUPABASE_URL`
- `NEXT_PUBLIC_MXN_SUPABASE_ANON_KEY`

### Vercel + Supabase + Google OAuth (Staging vs Production)

**Recommended approach (simple + reliable):**
- **Vercel Preview Deployments** = staging
- **Vercel Production Deployment** = live

**Supabase:**
- Use **two Supabase projects** (staging + production) to prevent test data and auth settings from leaking into production.
- In Vercel, set env vars by scope:
	- **Preview** → staging Supabase URL/keys
	- **Production** → production Supabase URL/keys

**Google OAuth via Supabase Auth:**
- In Google Cloud Console, set **Authorized redirect URI** to Supabase callback:
	- `https://<SUPABASE_PROJECT_REF>.supabase.co/auth/v1/callback`
- In Supabase Auth settings for each environment, set:
	- **Site URL** (your primary domain)
	- **Additional Redirect URLs** (include local + staging + prod):
		- `http://localhost:3000/*` (Hub)
		- `http://localhost:3005/*` (ADMIN)
		- your staging domain(s)
		- your production domain(s)

**Practical note:** Google OAuth does not support wildcard subdomains well for Vercel previews; prefer a stable staging domain (or rely on PR previews without OAuth).

## �🔐 ADMIN Login Credentials Guide

### What's the Difference?

**Account Access** = Logging into **Supabase Dashboard** (https://supabase.com/dashboard)
- Use to: Manage projects, create users, view database, configure settings
- Login with: Your Supabase account email/password

**User Access** = Logging into **ADMIN App** (http://localhost:3006/login)
- Use to: Manage platforms (MagicWRX, MXN, AmazinglyStrange content)
- Login with: User created IN the Supabase project's Authentication tab

---

### For ADMIN App Login (`/ADMIN/`)

#### MagicWRX & MXN.CHAT Admin

**ADMIN Login:** magicwrxstudio@gmail.com  
**Password:** [Create this user in Supabase Dashboard below]

**How to Create/Reset:**
1. Go to https://supabase.com/dashboard
2. Login with: magicwrxstudio@gmail.com / ***** (Account Access)
3. Select **MagicWRX project** (`ujfcflnrtrkdgfclwelz`)
4. Navigate to **Authentication** → **Users**
5. Add or reset user: `magicwrxstudio@gmail.com`
6. Set password → **Use this for ADMIN login**

#### AmazinglyStrange Admin

**ADMIN Login:** brian@amazinglystrange.com  
**Password:** [Create this user in Supabase Dashboard below]

**How to Create/Reset:**
1. Go to https://supabase.com/dashboard
2. Login with: brian@amazinglystrange.com / ***** (Account Access)
3. Select **AmazinglyStrange project** (`nthggvagtopobmdnquph`)
4. Navigate to **Authentication** → **Users**
5. Add or reset user: `brian@amazinglystrange.com`
6. Set password → **Use this for ADMIN login**

---

### For Platform Management (Dashboard Access)

#### Vercel (Deployment Platform)
- **Login:** magicwrxstudio@gmail.com
- **Password:** ******
- **Used For:** Deploy projects, manage domains, view analytics

#### Supabase Dashboard (Database Management)

**MagicWRX & MXN Projects:**
- **Login:** magicwrxstudio@gmail.com
- **Password:** *****
- **Projects:** MagicWRX (`ujfcflnrtrkdgfclwelz`) + MXN.CHAT (`opcsbfwqazyzsskuuooz`)

**AmazinglyStrange Project:**
- **Login:** brian@amazinglystrange.com
- **Password:** *****
- **Project:** AmazinglyStrange (`nthggvagtopobmdnquph`)

#### Stripe (Payment Processing)
- **Login:** magicwrxstudio@gmail.com
- **Password:** *****
- **Used For:** Manage subscriptions, view revenue, configure products

---

### Quick Reference Table

| Platform | Purpose | Email | Where to Manage |
|----------|---------|-------|-----------------|
| **ADMIN App** | Manage all 3 platforms | magicwrxstudio@gmail.com<br>brian@amazinglystrange.com | Supabase Dashboard → Authentication → Users |
| **Vercel** | Deploy & host apps | magicwrxstudio@gmail.com | https://vercel.com/login |
| **Supabase** | Database & auth setup | magicwrxstudio@gmail.com<br>brian@amazinglystrange.com | https://supabase.com/dashboard |
| **Stripe** | Payment processing | magicwrxstudio@gmail.com | https://dashboard.stripe.com/login |

---

### Common Tasks

**Reset ADMIN Password:**
1. Supabase Dashboard → Your Project → Authentication → Users
2. Find user → Click "..." → Reset Password
3. Copy new password and use at http://localhost:3006/login

**Enable MFA for ADMIN:**
1. Login to ADMIN at http://localhost:3006/login
2. Go to Dashboard → Click "Setup MFA"
3. Scan QR code with Google Authenticator
4. Next login will require 6-digit code

---


## Overview

This document provides a comprehensive overview of all active business workspaces, their purposes, technologies, current statuses, and next steps. It serves as a living reference for understanding the ecosystem of projects under the Amazing Business Platform.

## Workspace Summary

| Workspace | Title | Group | Purpose | Tech Stack | Status | Location |
|-----------|-------|-------|---------|------------|--------|----------|
| DOCs/ | Documentation Hub | Platform Ops | Central documentation, roadmaps and standards | Markdown | Active | `/Users/brianlindahl/Development/Business/DOCs/` |
| **ADMIN/** | **Master Admin Dashboard** | **Platform Ops** | **Multi-tenant admin for all platforms** | **Next.js 15, Supabase (3 instances)** | **In Progress** | `/Users/brianlindahl/Development/Business/ADMIN/` |
| **SHARED/** | **Component Library** | **Platform Core** | **Reusable packages (auth, blog, layout, media)** | **TypeScript, React** | **In Progress** | `/Users/brianlindahl/Development/Business/SHARED/` |
| mxn-chat/ | MXN Chat | Apps | Privacy-first chat platform with aliases and vibes | Next.js, Supabase | Live | `/Users/brianlindahl/Development/Business/Websites/mxn-chat/` |
| MagicWRX/ | Magic WRX (Multi-Tenant Platform) | Platform Core | Multi-tenant SaaS platform for unlimited clients | Next.js, Supabase (multi-tenant RLS), Stripe | Live | `/Users/brianlindahl/Development/Business/Websites/MagicWRX/` |
| base-template/ | Base Template (DRY) | Templates | Core dry template (recommended canonical starter) | Next.js 16, React 19, Tailwind | Live | `/Users/brianlindahl/Development/Business/Websites/base-template/` |
| auth-tool/ | Auth Tool | Platform Core | Google OAuth / Supabase auth (moving to /SHARED/) | Next.js, Supabase | Live | `/Users/brianlindahl/Development/Business/Websites/auth-tool/` |
| auth-tool-package/ | Auth Tool Package | Platform Core | Distribution package for Auth Tool (moving to /SHARED/) | Next.js, Supabase | Live | `/Users/brianlindahl/Development/Business/Websites/auth-tool-package/` |
| Template-WRX/ | Template WRX | Templates Marketplace | Collection of business templates and deploy scripts | Next.js, Firebase | Live | `/Users/brianlindahl/Development/Business/Websites/Template-WRX/` |
| hello-world-vercel-main/ | Hello Vercel Demo | Samples | Minimal Vercel demo used for tests and quickstarts | Next.js | Live | `/Users/brianlindahl/Development/Business/Websites/hello-world-vercel-main/` |
| amazinglystrange/ | Amazingly Strange | Gaming Platform | Gaming community platform with blog and admin features | PHP, Firebase | Live | `/Users/brianlindahl/Development/Hosting/amazinglystrange/` |
| Amazingly-Strange-Website/ | Amazingly Strange Website | Gaming Platform | Next.js version of gaming platform with Supabase | Next.js, Supabase | Live | `/Users/brianlindahl/Development/Amazingly-Strange-Website/amazingly-strange-website/` |

---

## Detailed Workspace Reports

### DOCs/
**Purpose:** Centralized documentation hub for business projects, providing templates and standards for project management, roadmaps, and AI-assisted development.

**Technologies:** Markdown-based documentation system with structured templates.

**Key Features:**
- Generic documentation index template with executive summaries and document inventories
- Business roadmap with visual flow diagrams showing MAGIC (Tools) and MONSTER (Gaming) platform branches
- Code quality principles (SOLID, DRY, KISS, YAGNI, etc.) enforced across all projects
- Directory structure templates and maintenance checklists
- AI prompt standards requiring roadmap compliance

**Current Status:** Active development with established standards. The roadmap targets ambitious growth metrics: $1k MRR by month 6, $30k by year 1, $150k by year 2, and $2M ARR by year 3. Focus on MVP delivery with clean architecture boundaries.

**Next Steps:** Continue implementing roadmap phases, maintain documentation compliance, and track progress against revenue targets.

### ADMIN/ ⭐ NEW
**Purpose:** Centralized multi-tenant admin dashboard to manage all business platforms from a single location.

**Technologies:** Next.js 15, TypeScript, Tailwind CSS, Supabase (3 separate instances), React Query.

**Key Features:**
- Multi-tenant authentication (brian@amazinglystrange.com, magicwrxstudio@gmail.com)
- Site switcher to manage AmazinglyStrange, MagicWRX, and MXN.CHAT
- Shared admin components (blog editor, media manager, user management)
- MagicWRX multi-tenant client management
- Revenue sharing dashboard (Google AdSense API integration)
- Unified analytics across all platforms

**Current Status:** In Progress (Dec 2025). Architecture designed, shared dependencies being initialized.

**Next Steps:** Create `/ADMIN/` directory, implement multi-Supabase client setup, build site switcher UI, migrate existing admin features.

### SHARED/ ⭐ NEW
**Purpose:** Reusable component library extracted from existing projects to reduce code duplication.

**Technologies:** TypeScript, React, published as local npm packages.

**Key Packages:**
- `@amazing/auth-tool`: `/SHARED/auth-tool/` - Google OAuth + Supabase authentication (from auth-tool/) - **✅ Extracted & Integrated**
- `@amazing/blog-engine`: `/SHARED/blog-engine/` - WYSIWYG blog editor (from AmazinglyStrange)
- `@amazing/layout-manager`: `/SHARED/layout-manager/` - Visual page builder (from AS) - **✅ Extracted & Integrated**
- `@amazing/media-library`: `/SHARED/media-library/` - Media upload/optimization (shared across all)

**Current Status:** In Progress (Dec 2025). Layout Manager and Auth Tool extracted and integrated.

**Next Steps:** Extract blog components from AmazinglyStrange, create media library package.

### mxn-chat/
**Purpose:** Real-time VIBE community chat application designed for PRIVATE sharing of 'Thought' based on MOOD/VIBE environments.

**Technologies:** Next.js 15, TypeScript, Tailwind CSS, Supabase (Auth, PostgreSQL, Real-time), React 18.

**Key Features:**
- Real-time messaging with Firebase Firestore listeners <- Switched to Supabase
- User authentication (Email/Password, Google OAuth)
- Friend invitation system
- Gaming-inspired dark UI with neon accents
- Message sanitization and security
- User profiles and presence status
- Single chatroom with AdMob integration at top
- Mobile-responsive design (Flutter compatibility mentioned)

**Current Status:** Successfully migrated to Supabase and deployed live at https://www.mxn.chat. All Firebase services decommissioned in favor of Supabase for better scalability.

**Next Steps:** Monitor performance, gather user feedback, and consider additional features like multiple chat rooms or enhanced moderation tools.

### MagicWRX/
**Purpose:** Multi-tenant Platform-as-a-Service (PaaS) that enables unlimited clients to deploy professional websites and blogs through a shared Supabase database with Row-Level Security (RLS).

**Technologies:** Next.js 16, React 19, TypeScript, Tailwind CSS, Supabase (multi-tenant RLS), Stripe, Google AdSense API.

**Key Features:**
- **Multi-Tenant Architecture**: Single Supabase DB serves unlimited clients via RLS policies
- **Client Sites**: Each client can create multiple websites from 5+ templates
- **Artist Blog Platform**: Revenue-sharing blog platform (70% artist, 30% platform)
- **Pixel Art Platform** (Planned): Art posting and judging community
- **Template Marketplace**: E-commerce, SaaS, Portfolio, Restaurant, Corporate templates
- **Stripe Integration**: Subscription billing for client plans
- **Google AdSense**: Automated revenue tracking and distribution

**Database Schema:**
- `clients` - MagicWRX customers (multi-tenant users)
- `client_sites` - Sites created by clients (isolated by client_id)
- `client_blogs` - Blog posts (Artist Platform, revenue sharing)
- `client_media` - Media files (isolated by client_id)
- `revenue_share` - AdSense revenue tracking

**Current Status:** Live at https://www.magicwrx.com with basic features. Multi-tenant schema designed but not yet implemented. Currently using Firebase (migrating to Supabase multi-tenant).

**Next Steps:** Implement multi-tenant Supabase schema, migrate from Firebase, build client onboarding flow, integrate Stripe subscriptions, launch Artist Blog beta.

### base-template/
**Purpose:** Individual business website template specifically designed for computer repair services, optimized for quick deployment on Vercel.

**Technologies:** Next.js 16, React 19, Tailwind CSS, Vercel deployment.

**Key Features:**
- Responsive mobile-first design
- Professional layout with hero section, services showcase, about, and contact
- Functional contact form with validation
- Service categories: Laptop/Desktop Repair, Virus Removal, Data Recovery, Performance Tuning, Setup & Installation
- SEO optimized with proper meta tags
- Easy customization guide for business owners

**Current Status:** Live at https://base-template-pi.vercel.app. Core dry template (recommended canonical starter) with Next.js 16, React 19, and Tailwind CSS.

**Next Steps:** Deploy customized versions for different repair businesses, potentially expand to other service industries.

### auth-tool/
**Purpose:** Production-ready Google OAuth authentication system using Supabase, designed for secure user management in web applications.

**Technologies:** Next.js 15.4.3, React 19.1.0, TypeScript, Supabase (Auth, Database), Tailwind CSS, Vercel deployment.

**Key Features:**
- Google OAuth 2.0 authentication via Supabase
- Protected routes with middleware
- Dark-themed admin dashboard
- Mobile-first responsive design
- Session management and user profiles
- Environment variable management for production

**Current Status:** Live at https://apps-gnl0vc31n-magicwrxs-projects.vercel.app. Fully operational with Supabase project setup and Google OAuth configuration.

**Next Steps:** Monitor authentication flows, gather user feedback, and consider additional features like social login options.

### auth-tool-package/
**Purpose:** Packaged distribution of the Google OAuth authentication tool, providing a ready-to-deploy authentication solution.

**Technologies:** Identical to auth-tool - Next.js 15.4.3, React 19.1.0, TypeScript, Supabase, Tailwind CSS.

**Key Features:**
- Complete authentication package with setup scripts
- Automated deployment workflow
- Comprehensive documentation and helper scripts
- Same features as auth-tool: Google OAuth, protected routes, admin dashboard

**Current Status:** Live at https://auth-tool-package-io51xm33-magicwrxs-projects.vercel.app. Fully operational distribution package for Auth Tool with scripts and docs.

**Next Steps:** Same as auth-tool - monitor performance and gather feedback for improvements.

### Template-WRX/
**Purpose:** Business website template platform similar to MagicWRX, focused on providing ready-to-use templates for various business types.

**Technologies:** Next.js 15.3.5, React 19, TypeScript, Tailwind CSS, Firebase v11 (Auth, Firestore, Hosting), Vercel deployment option.

**Key Features:**
- Same 5 business templates as MagicWRX: E-commerce, SaaS, Portfolio, Restaurant, Corporate
- Firebase authentication system
- Admin dashboard and user management
- Modern UI with gradients and card shadows
- Mobile-responsive design
- Demo mode without Firebase setup
- Template customization and deployment tools

**Current Status:** Live at https://template-wrx.vercel.app. Production-ready template platform with Firebase integration. Includes deployment scripts and customization guides.

**Next Steps:** Implement template marketplace features, add more business template categories, integrate payment processing.

### hello-world-vercel-main/
**Purpose:** Simple demonstration project showcasing Vercel deployment with static content and serverless API functions, including optional Supabase database integration.

**Technologies:** Next.js 14.2.5, React 18.3.1, Node.js serverless functions, optional Supabase integration.

**Key Features:**
- Static homepage with interactive API testing
- Serverless API endpoints (/api/hello, /api/supabase)
- Optional Supabase database queries
- Environment variable configuration for Supabase
- Basic Next.js project structure

**Current Status:** Live at https://hello-world-vercel-main-ayqwq2u73-magicwrxs-projects.vercel.app. Minimal Vercel demo used for tests and quickstarts with static HTML and API functions.

**Next Steps:** Use as a starting point for more complex Vercel projects, or as a reference for serverless API implementation.

### amazinglystrange/
**Purpose:** Gaming community platform with blog functionality, admin management, and Firebase backend.

**Technologies:** PHP, Firebase (Auth, Firestore, Storage), HTML/CSS/JavaScript.

**Key Features:**
- Blog post management system
- Admin dashboard for content management
- Firebase authentication and data storage
- Gaming-focused community features
- Media upload and management

**Current Status:** Live Firebase-hosted platform for gaming community.

**Next Steps:** Monitor community engagement and consider feature enhancements.

### Amazingly-Strange-Website/
**Purpose:** Next.js version of the gaming platform with Supabase backend, providing enhanced performance and scalability.

**Technologies:** Next.js 16, React 19, TypeScript, Supabase (Auth, PostgreSQL), Tailwind CSS.

**Key Features:**
- Modern Next.js application structure
- Supabase authentication and database
- Blog functionality with rich text editing
- Admin dashboard for content management
- Gaming community features
- Mobile-responsive design

**Current Status:** Live at https://amazingly-strange-website-beta.vercel.app. Successfully deployed with Supabase integration.

**Next Steps:** Complete full feature migration from PHP version, optimize performance, and enhance user experience.

## Maintenance Notes

- **Update Frequency:** Review and update this document quarterly or when new workspaces are added.
- **Contact:** For workspace-specific questions, refer to individual project README.md files.
- **Standards:** All workspaces follow the code quality principles outlined in BUSINESS_AI_PROMPT.md.

---

**Document Version**: 1.0.1  
**Last Updated**: December 16, 2025  
**Next Review**: March 16, 2026

---

## Grouping, Titles & Launch Playbook

### Grouping Principles
- **Platform Core**: Projects that provide foundational services (e.g., `MagicWRX`, `auth-tool`, `auth-tool-package`). Treat these as infra that other workspaces depend on.
- **Templates / Marketplace**: Reusable website templates and template collections (`base-template`, `Template-WRX`). These are canonical deployable artifacts.
- **Apps / Add-ons**: User-facing add-on apps that can be attached to user instances (e.g., `mxn-chat`). These are deployable micro-apps.
- **Samples / Tools**: Minimal demos and utilities used for onboarding and tests (`hello-world-vercel-main`).

### Titles (Canonical)
- MagicWRX — "Magic WRX (HEAD)" (Platform Core)
- Auth Tool — "Auth Tool" (Platform Core)
- Base Template — "Base Template (DRY)" (Templates)
- Template WRX — "Template WRX" (Templates Marketplace)
- MXN Chat — "MXN Chat" (Apps)
- DOCs — "Documentation Hub" (Platform Ops)
- Hello Vercel Demo — "Hello Vercel Demo" (Samples)

### Vercel + Supabase Launch Playbook (Repeatable)
This playbook gives a fast, repeatable path to let users launch templates/apps on Vercel with Supabase-backed auth and storage.

Prereqs (local & team):
- Vercel CLI installed (`npm i -g vercel`) or use Vercel web UI
- Supabase CLI (`npm i -g supabase`) or Supabase account
- `VERCEL_TOKEN` and `SUPABASE_SERVICE_ROLE_KEY` stored in CI or local env
- `auth-tool` configured as canonical auth provider using Supabase

1) Standardize template repo (use `base-template` as canonical starter):
	- Ensure `package.json` has `build` and `start` scripts and a simple `vercel.json` or `project settings` mapping.
	- Convert per-template config to `template.config.json` with placeholders for `SITE_NAME`, `OWNER_EMAIL`, `SUPABASE_URL`, `SUPABASE_KEY`.

2) Provide single-click deploy via Vercel:
	- Create a Vercel Project for each template with Environment Variables defined as runtime placeholders.
	- For a fast launch button add a README link:

```bash
vercel --prod --confirm --token $VERCEL_TOKEN
```

3) Provision Supabase for the user instance:
	- Use a shared Supabase project with multi-tenant schema or a per-user instance strategy (see consolidation recommendation below).
	- For shared project (recommended for MVP): create a `tenant_id` per user and scope data by `tenant_id` in row-level policies (RLS).
	- CLI quick commands (shared project):

```bash
supabase secrets set SUPABASE_URL=$SUPABASE_URL SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
supabase db remote set --project-ref $SUPABASE_PROJECT
```

4) Hook up Auth Tool as canonical onboarding flow:
	- Configure `auth-tool` to require verified email (Supabase Email confirmations enabled).
	- During user onboarding, create a `tenant` record and default site instance using `base-template`.

5) Automate per-user site creation (MVP flow):
	- After email verification, backend function (Cloud Function / Next.js API) clones/copies `base-template` settings into a new Vercel project or deploys environment variables for a templated, param-driven deploy.
	- Option A (fast): Deploy the same template code and use runtime env `TENANT_ID` to scope content (single-codebase, multi-tenant). Recommended for early-stage velocity.
	- Option B (per-tenant project): Use Vercel Programmatic API to create a new project per user. More isolation, higher cost.

6) Monetization & Ads
	- Require `email_verified` for any site to go live and show ads.
	- Integrate ad provider (AdSense/AdMob) at template level; enable ads by default for free tier.
	- Metering: store usage metrics in Supabase (bandwidth, active users, API calls) and expose usage in dashboard.

7) Verification & QA
	- Quick verification script to run after deploy:

```bash
# Verify site is responding
curl -I https://$SITE_DOMAIN
# Verify Supabase connectivity
node ./scripts/check-supabase-connection.js
```

### Quick Commands (copyable)
```bash
# Login CLIs
vercel login
supabase login

# Deploy template in current directory to Vercel
vercel --prod --confirm

# Set required env (example)
vercel env add NEXT_PUBLIC_SUPABASE_URL $VERCEL_PROJECT
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY $VERCEL_PROJECT
```

## Consolidation Recommendation
- For speed-to-market and maintainability, consolidate to a smaller set of canonical codebases:
  - Keep `MagicWRX` as the HEAD platform (single codebase that can host multiple templates via runtime configuration).
  - Make `base-template` the canonical DRY starter template and refactor other templates to be configuration/data on top of this codebase.
  - Treat `mxn-chat`, `auth-tool`, and other apps as micro-frontends or feature modules that can be plugged into the `MagicWRX` platform or deployed independently as needed.

- Consolidation Benefits:
  - Faster updates (single code path), fewer security surfaces, easier CI/CD.
  - Multi-tenant single-codebase approach reduces Vercel project sprawl and speeds onboarding.

- When to split:
  - If an app requires specialized infrastructure (heavy realtime workloads, specialized billing), deploy as separate microservice.

## Recommended Next Steps (short)
1. Adopt `base-template` as canonical starter and add `template.config.json` placeholders.
2. Make `auth-tool` the standard onboarding flow and enable email verification by default.
3. Implement multi-tenant scoping in Supabase with `tenant_id` (row-level policies).
4. Add a small automation service (Next.js API route or Cloud Function) that provisions a tenant record and triggers a template deployment (Option A for MVP).
5. Document the exact deploy steps in a `LAUNCH_PLAYBOOK.md` in each template repo.
