# MXN.CHAT Master Roadmap (SSOT)

**Document Date:** December 10, 2025 23:40 CST  
**Last Updated:** December 10, 2025  
**Version:** 2.0.0  
**Status:** Phase 1 Active  
**Next Review:** December 17, 2025 (Weekly)

---

## 1. 🎯 Vision Statement

MXN.CHAT is a lean, secure, fast real-time chat platform designed for:
	•	Private 1:1 and small-group conversations
	•	Minimalist UX
	•	Ephemeral media (auto-deletes)
	•	Low-cost scaling (Supabase + Vercel)
	•	Seamless integration into MagicWRX Hosting

MXN is both:
	1.	A standalone paid tool
	2.	A core feature inside the MagicWRX ecosystem

⸻

2. 🏗 Core Architecture Summary (High-Level)
	•	Frontend: Next.js (App Router), Tailwind, ShadCN, Vercel Edge Middleware
	•	Backend: Supabase Postgres + Realtime Channels
	•	Auth: Supabase Auth with email verification
	•	Storage: Supabase buckets with strict RLS
	•	Ephemeral Media Logic: Cron-based cleanup via Vercel/Edge Functions
	•	Payments: Stripe (standalone + MagicWRX-integrated)
	•	Analytics: Vercel Web Analytics + optional GA4
	•	AI: OpenAI (Blog assist, message suggestions, analytics summaries)

⸻

3. 🚦 Development Phases

PHASE 0.5 — EMERGENCY MVP (2 Weeks) ✅ COMPLETED

Goal: Working text-only chat deployed to production.

Week 1: Foundation ✅
	•	[✅] Create Supabase project & run schema
	•	[✅] Configure Email Auth
	•	[✅] Deploy minimal UI (Login + Chat) to Vercel
	•	[✅] Verify end-to-end connection

Week 2: Core Loop ✅
	•	[✅] Implement Realtime Subscriptions
	•	[✅] Build Conversation List
	•	[✅] Invite 5 Alpha Testers
	•	[✅] NO Images, NO Payments yet.

**Status:** Deployed at https://mxn-chat-magicwrxs-projects.vercel.app
**Migration:** Successfully migrated from Firebase to Supabase
**Image Uploads:** ✅ Implemented and deployed
**Next:** Complete auth testing and profile management

PHASE 1 — REFINED MVP (4 Weeks) 🚧 ACTIVE

Goal: Usable product for early adopters.

**Immediate Next Steps (Week 1):**
	•	[✅] Fix Supabase OAuth redirect URLs (currently redirects to old domain)
	•	[ ] Test Google OAuth login flow
	•	[ ] Verify email/password auth works end-to-end
	•	[ ] Add basic error handling for auth failures
	•	[✅] Remove launch game button from start/login page
	•	[✅] Change "IndieGame Chat" to "mxn.chat" throughout the app
	•	[✅] Remove envelope and person icons from input fields
	•	[✅] Remove 🎮 from title and change welcome text
	•	[✅] Change email placeholder to "name@example.com"
	•	[✅] Remove lock icon from password fields
	•	[✅] Update signup toggle text to "Join mxn.chat?"

Features:
	•	[✅] Image Uploads (Supabase Storage) - Basic implementation complete
	•	[✅] Push Notifications - Browser notifications for new messages
	•	[✅] Push Notification Controls - User preferences for notifications
	•	[✅] Email Invitations - Invite friends via email with personalized messages
	•	Basic Profile Management
	•	Mobile Responsive Polish
	•	50 Beta Users

Milestones:
	•	Deploy Supabase project ✅
	•	Configure storage buckets + RLS
	•	Realtime channels working ✅
	•	Mobile-first UI complete

Release target: Early Alpha

PHASE 2 — Monetization & Scaling Prep

Goal: Prepare MXN to sustain thousands of users.

Features:
	•	Subtle ads (banner only)
	•	Client-side impression counters
	•	Server-side analytics batching
	•	API rate limits + metering foundation
	•	Message pagination + virtual scrolling
	•	Media compression pipeline
	•	Delete old messages (configurable TTL)

Milestones:
	•	Implement AdService
	•	Add Edge Middleware for metering
	•	Deploy cron for cleanup
	•	Add GA4 or self-hosted analytics

Release target: Public Beta

PHASE 3 — MagicWRX Integration Layer

Goal: Build cross-platform upgrade path.

Features:
	•	One-click embed for MagicWRX websites
	•	Shared user identity (MagicWRX Auth → MXN.CHAT)
	•	Unified billing pipeline via Stripe Business account
	•	Shared analytics integration
	•	Content moderation AI

Milestones:
	•	Create MagicWRX → MXN shared auth bridge
	•	Deploy unified Stripe webhook processor
	•	Add developer API for message send/receive

Release target: 1.0 Launch

PHASE 4 — AI-Powered Features

Goal: Add premium-value tools for creators.

Features:
	•	AI message suggestions
	•	AI mood tagging
	•	AI thread summaries
	•	AI-generated content moderation
	•	Analytics dashboard powered by AI summaries

Milestones:
	•	Integrate OpenAI endpoints
	•	Create “MXN Insights” dashboard
	•	Add AI credit system

Release target: 1.5 Expansion

PHASE 5 — Enterprise + Scaling

Goal: Reach 100,000+ users.

Features:
	•	Team spaces (paid)
	•	Export chat history (paid)
	•	Long-term media storage (paid)
	•	Internal notification microservice

Milestones:
	•	Separate realtime engine from core DB
	•	Partition messages table if needed
	•	Optimize storage → CDN delivery

Release target: 2.0 Enterprise Edition

⸻

4. 🧱 Anti-Drift Safeguards

To ensure long-term consistency:

Stable SSOT Docs

All decisions must be reflected in:
	•	MXN_ROADMAP.md
	•	MXN_BUSINESS_PLAN.md
	•	MXN_TREE.md

Atomic Architecture Rules
	1.	Feature request → reflected in TREE → schema changes → roadmap
	2.	No new tables without updating the schema document
	3.	No new integrations without entering the Integration Map
	4.	MagicWRX integrations must be sandboxed (no entanglement)
	5.	Every architectural change must be versioned

Technical Safeguards
	•	Code generators must reference only SSOT documents
	•	LLM prompts must include: “Use MXN_SSOT Standards”
	•	CI pipeline checks architecture folder

⸻

5. 📦 Completed Deliverables (Running List)
	•	MXN_ROADMAP.md
	•	MXN_BUSINESS_PLAN.md
	•	MXN_TREE.md
	•	MXN_FOUNDATIONS.md
	•	MXN_SUPABASE_SCHEMA.sql
	•	MXN_ARCH_DIAGRAM.png (future)

⸻

6. 📅 Timeline Overview

0 → 3 Months
	•	Foundations
	•	MVP Core
	•	Monetization Lite

3 → 6 Months
	•	MagicWRX integration
	•	AI features

6 → 12 Months
	•	Scale to 50k+ users
	•	Add enterprise features

⸻

7. 🔮 Long-Term Vision

MXN.CHAT becomes:
	•	A stand-alone premium chat platform
	•	A core social tool embedded across MagicWRX
	•	A messaging layer for creators, artists, and small businesses
	•	A fully AI-assisted communication environment

⸻

8. 📘 Linked Documents (SSOT Network)
	•	MXN_BUSINESS_PLAN.md
	•	MXN_TREE.md
	•	MXN_FOUNDATIONS.md
	•	MXN_SUPABASE_SCHEMA.sql (architecture)
	•	MXN_ARCHITECTURE_DIAGRAM.md (optional)

⸻

9. 🚨 Current Blockers & Immediate Actions

**Critical Issues:**
	•	Supabase OAuth redirect configured to old domain (apps-gnl0vc31n-magicwrxs-projects.vercel.app)
	•	Need to update Site URL and Redirect URLs in Supabase Dashboard
	•	Test all auth flows (email/password, Google OAuth)

**Next Development Sprint:**
	•	[✅] Fix message sending/display issues (database column names)
	•	[🚧] Test Google OAuth login flow (user working on this)
	•	[✅] Verify email/password auth works end-to-end (Logic implemented; SMTP pending)
	•	[✅] Implement basic user profile management (display name editing) - Already implemented!
	•	[ ] Add push notifications
	•	[✅] Implement email invitation system (Database schema + API + UI complete)
	•	[ ] Improve mobile responsiveness
	•	[ ] Prepare for beta user onboarding (50 users)

**Notes:**
	•	Use `magicwrxstudio@gmail.com` for all email requirements/testing until custom domain is fully active.

⸻