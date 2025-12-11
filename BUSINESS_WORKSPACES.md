# Business Workspaces Overview

**Document Date:** December 5, 2025  
**Version:** 1.0.0  
**Last Updated:** December 5, 2025

---

## Overview

This document provides a comprehensive overview of all active business workspaces, their purposes, technologies, current statuses, and next steps. It serves as a living reference for understanding the ecosystem of projects under the Amazing Business Platform.

## Workspace Summary

| Workspace | Title | Group | Purpose | Tech Stack | Status | Location |
|-----------|-------|-------|---------|------------|--------|----------|
| DOCs/ | Documentation Hub | Platform Ops | Central documentation, roadmaps and standards | Markdown | Active | `/Users/brianlindahl/Development/Business/DOCs/` |
| mxn-chat/ | MXN Chat | Apps/Templates | Real-time gaming chat (can be launched as an add-on app) | Next.js, Firebase | Deployed | `/Users/brianlindahl/Development/Business/Websites/mxn-chat/` |
| MagicWRX/ | Magic WRX (HEAD) | Platform Core | Freemium website builder + template marketplace (head project) | Next.js, Firebase, Stripe | Production-ready | `/Users/brianlindahl/Development/Business/Websites/MagicWRX/` |
| base-template/ | Base Template (DRY) | Templates | Core dry template (recommended canonical starter) | Next.js 15, React 19, Tailwind | Deployed | `/Users/brianlindahl/Development/Business/Websites/base-template/` |
| auth-tool/ | Auth Tool | Platform Core | Packaged Google OAuth / Supabase auth starting point for user verification | Next.js, Supabase | Deployed | `/Users/brianlindahl/Development/Business/Websites/auth-tool/` |
| auth-tool-package/ | Auth Tool Package | Platform Core | Distribution package for Auth Tool with scripts and docs | Next.js, Supabase | Deployed | `/Users/brianlindahl/Development/Business/Websites/auth-tool-package/` |
| Template-WRX/ | Template WRX | Templates Marketplace | Collection of business templates and deploy scripts | Next.js, Firebase | Deployed | `/Users/brianlindahl/Development/Business/Websites/Template-WRX/` |
| hello-world-vercel-main/ | Hello Vercel Demo | Samples | Minimal Vercel demo used for tests and quickstarts | Next.js | Deployed | `/Users/brianlindahl/Development/Business/Websites/hello-world-vercel-main/` |

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

### mxn-chat/
**Purpose:** Real-time gaming community chat application designed for multiplayer gaming environments.

**Technologies:** Next.js 15, TypeScript, Tailwind CSS, Supabase (Auth, PostgreSQL, Real-time), React 18.

**Key Features:**
- Real-time messaging with Firebase Firestore listeners
- User authentication (Email/Password, Google OAuth)
- Friend invitation system
- Gaming-inspired dark UI with neon accents
- Message sanitization and security
- User profiles and presence status
- Single chatroom with AdMob integration at top
- Mobile-responsive design (Flutter compatibility mentioned)

**Current Status:** Migrating from Firebase to Supabase. Code updated, database schema ready. Deployed at https://mxn-chat.web.app (Firebase - legacy) and https://mxn-chat-dxtlqwkli-magicwrxs-projects.vercel.app (Vercel). All Firebase services active but transitioning to Supabase for better scalability.

**Next Steps:** Complete Supabase setup (database schema, auth configuration), test migration, migrate user data if needed, decommission Firebase services.

### MagicWRX/
**Purpose:** Premium business website builder platform offering a marketplace of professional templates with integrated authentication and admin management.

**Technologies:** Next.js 15, React 19, TypeScript, Tailwind CSS, Firebase v10 (Auth, Firestore, Analytics, Storage), Stripe integration.

**Key Features:**
- 5 premium business templates: E-commerce Store, SaaS Platform, Portfolio Website, Restaurant Menu, Corporate Website
- Firebase authentication (email/password + Google OAuth)
- Admin dashboard with user management
- Mobile-first responsive design with custom gradients and card shadows
- Template marketplace with pricing tiers ($19-199 for templates, $19-199/mo for hosting)
- Demo mode available without Firebase setup
- Flutter mobile app compatibility built-in

**Current Status:** Production-ready with comprehensive Firebase integration. Includes troubleshooting guides and automated deployment scripts.

**Next Steps:** Focus on marketplace growth, implement Stripe payments, expand template library, and optimize for mobile app deployment.

### base-template/
**Purpose:** Individual business website template specifically designed for computer repair services, optimized for quick deployment on Vercel.

**Technologies:** Node.js with Express server, vanilla HTML/CSS/JavaScript, Vercel deployment.

**Key Features:**
- Responsive mobile-first design
- Professional layout with hero section, services showcase, about, and contact
- Functional contact form with validation
- Service categories: Laptop/Desktop Repair, Virus Removal, Data Recovery, Performance Tuning, Setup & Installation
- SEO optimized with proper meta tags
- Easy customization guide for business owners

**Current Status:** Deployed at https://base-template-j8e75vif1-magicwrxs-projects.vercel.app. Core dry template (recommended canonical starter) with Next.js 15, React 19, and Tailwind CSS.

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

**Current Status:** Successfully deployed to Vercel at https://apps-gnl0vc31n-magicwrxs-projects.vercel.app. Requires Supabase project setup and Google OAuth configuration to be fully operational.

**Next Steps:** Complete Supabase project creation, configure Google OAuth credentials, add environment variables to Vercel, and test authentication flow.

### auth-tool-package/
**Purpose:** Packaged distribution of the Google OAuth authentication tool, providing a ready-to-deploy authentication solution.

**Technologies:** Identical to auth-tool - Next.js 15.4.3, React 19.1.0, TypeScript, Supabase, Tailwind CSS.

**Key Features:**
- Complete authentication package with setup scripts
- Automated deployment workflow
- Comprehensive documentation and helper scripts
- Same features as auth-tool: Google OAuth, protected routes, admin dashboard

**Current Status:** Deployed at https://auth-tool-package-io51xm33-magicwrxs-projects.vercel.app. Distribution package for Auth Tool with scripts and docs, ready for use.

**Next Steps:** Same as auth-tool - requires Supabase and Google OAuth configuration for full functionality.

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

**Current Status:** Deployed at https://template-1dpr0oe6x-magicwrxs-projects.vercel.app. Production-ready template platform with Firebase integration. Includes deployment scripts and customization guides.

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

**Current Status:** Deployed at https://hello-world-vercel-main-ayqwq2u73-magicwrxs-projects.vercel.app. Minimal Vercel demo used for tests and quickstarts with static HTML and API functions.

**Next Steps:** Use as a starting point for more complex Vercel projects, or as a reference for serverless API implementation.

---

## Maintenance Notes

- **Update Frequency:** Review and update this document quarterly or when new workspaces are added.
- **Contact:** For workspace-specific questions, refer to individual project README.md files.
- **Standards:** All workspaces follow the code quality principles outlined in BUSINESS_AI_PROMPT.md.

---

**Document Version**: 1.0.0  
**Last Updated**: December 5, 2025  
**Next Review**: March 5, 2026

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
