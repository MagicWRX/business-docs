# MXN.CHAT Master Roadmap (SSOT)

**Document Date:** December 11, 2025 12:00 CST  
**Last Updated:** December 11, 2025  
**Version:** 1.3 (Critical Bug + Desktop Features Added)  
**Status:** Phase 1 Active - LEAN MVP (Critical Bug Identified)  
**Next Review:** December 12, 2025 (Daily)

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

PHASE 1 — LEAN MVP (2 Weeks) 🚧 ACTIVE

Goal: Clean, functional MVP with core chat features for early users.

**Core Features (LEAN MVP):**
	•	[✅] Email and Password Login/Signup (Join flow)
	•	[✅] Google Sign-In Account Creation (URLs configured)
	•	[✅] Email Verification Required Before Account Creation
	•	[✅] Send Invites by Email Address
	•	[ ] Create Alias on Account Creation (Editable via Icons Anytime)
	•	[ ] Create and Delete Rooms (Conversations) - Create implemented, Delete needs implementation
	•	[✅] Post Messages to Rooms and View Other Users' Messages
	•	[✅] User Logout

**🚨 CRITICAL BLOCKERS (Must Fix Immediately):**
	•	[✅] **FIX GOOGLE OAUTH LOGIN** - URLs and URIs updated in Supabase and Google Cloud Console
	•	[ ] **ENABLE EMAIL RECEIVING** - Can send but NOT receive emails to admin@mxn.chat
		- ✅ DKIM records already configured and working
		- ✅ Email sending via Brevo API working
		- ❌ NO MX RECORDS on mxn.chat domain (emails will bounce)
		- **SOLUTION:** Enable Cloudflare Email Routing (free)
		  1. Go to Cloudflare Dashboard → mxn.chat → Email → Email Routing
		  2. Add destination: magicwrxstudio@gmail.com (verify)
		  3. Create rule: admin@mxn.chat → magicwrxstudio@gmail.com
		  4. Test: Send email to admin@mxn.chat
		- See: MXN_DNS_EMAIL_SETUP.md for step-by-step guide
	•	[ ] **TEST END-TO-END USER FLOW** - Signup → Email Verification → Login → Send Message
	•	[ ] **FIX CHAT MESSAGES NOT APPEARING** - Chats are not appearing in #General or Latest Created Chat Room
		- **Issue:** Messages sent to rooms are not displaying in the chat interface
		- **Impact:** Core functionality broken - users cannot see their messages
		- **Priority:** CRITICAL - blocks all chat functionality

**Immediate Next Steps (Week 1):**
	•	[✅] Fix Supabase OAuth redirect URLs (currently redirects to old domain)
	•	[ ] Test Google OAuth login flow
	•	[ ] Verify email/password auth works end-to-end
	•	[ ] Add basic error handling for auth failures
	•	[ ] Implement Alias Creation and Editing (via Icons)
	•	[ ] Add Room Creation and Deletion Functionality
	•	[ ] Ensure Logout Works Properly

**Deferred to Phase 2:**
	•	Image Uploads
	•	Push Notifications
	•	Mobile Responsive Polish
	•	50 Beta Users Onboarding

Milestones:
	•	Deploy Supabase project ✅
	•	Realtime channels working ✅
	•	Core auth flows working
	•	Room management implemented
	•	Alias editing functional

Release target: Clean MVP

PHASE 1.5 — Desktop Experience Enhancement

Goal: Add desktop-specific features for power users and multitasking.

Features:
	•	Popout chat windows for multitasking
	•	Window focus management (above/below content)
	•	Resizable windows (standard and mini versions)
	•	Hide debug panel with reactivation instructions

Milestones:
	•	Implement Electron wrapper or browser popout API
	•	Add window management controls
	•	Create mini chat widget
	•	Document debug reactivation in MXN_DEBUG.md

Release target: Enhanced Desktop Experience

## 🔧 Recommended Actions (Based on Dec 11 Review)

### Authentication Debugging
1. **Check Supabase Connection:**
   ```bash
   grep NEXT_PUBLIC_SUPABASE_URL .env.local
   grep NEXT_PUBLIC_SUPABASE_ANON_KEY .env.local
   ```

2. **Review Auth State Listener:**
   - File: `/src/contexts/ChatContext.tsx`
   - Line: 168 - `supabase.auth.onAuthStateChange()`
   - Add console logging to track auth events

3. **Verify Google OAuth Setup:**
   - Google Cloud Console → Credentials → OAuth 2.0 Client IDs
   - Authorized redirect URIs must include:
     - `http://localhost:3000/auth/v1/callback`
     - `https://mxn-chat-git-develop-magicwrxs-projects.vercel.app/auth/v1/callback`
     - `https://mxn-chat-dcgsy3rde-magicwrxs-projects.vercel.app/auth/v1/callback`
     - `https://mxn.chat/auth/v1/callback`
     - `https://auth.mxn.chat/auth/v1/callback`
     - `https://opcsbfwqazyzsskuuooz.supabase.co/auth/v1/callback`

4. **Test Authentication Locally:**
   ```bash
   cd /Users/brianlindahl/Development/Business/Websites/mxn-chat
   ./start-local.sh
   # Open http://localhost:3000
   # Try signup with new email
   # Check browser console for errors
   ```

### Email Configuration (CRITICAL)
**Status Check Completed:** December 11, 2025 14:17 CST

**Current Status:**
- ✅ Email SENDING: Working via Brevo API
- ✅ DKIM Records: Already configured and propagated
- ✅ SPF/DMARC: Already configured
- ❌ Email RECEIVING: NOT working (no MX records)

**Immediate Action Required:**

1. **Enable Cloudflare Email Routing (10 minutes):**
   - Go to: https://dash.cloudflare.com → mxn.chat → Email
   - Click: "Enable Email Routing"
   - Add destination: `magicwrxstudio@gmail.com`
   - Verify Gmail address (check inbox for verification email)
   - Create routing rule: `admin@mxn.chat` → `magicwrxstudio@gmail.com`
   - Cloudflare will automatically add MX records

2. **Test Email Receiving:**
   ```bash
   # Send test email from any account to:
   admin@mxn.chat
   
   # Check Gmail inbox:
   magicwrxstudio@gmail.com
   
   # Should arrive within 1-2 minutes
   ```

3. **Verify MX Records:**
   ```bash
   dig MX mxn.chat +short
   # Expected: Cloudflare MX servers (isaac, linda, amir)
   ```

**Complete Setup Guide:** See [MXN_DNS_EMAIL_SETUP.md](MXN_DNS_EMAIL_SETUP.md)

### Testing Priority Order
1. Fix Google OAuth authentication (blocking users)
2. Enable email receiving via Cloudflare Email Routing (10 min)
3. Test invite system (working but verify)
4. Test message posting (working but verify)
5. Test complete user journey end-to-end

### Quick Diagnostic
```bash
# Run comprehensive DNS & Auth check
cd /Users/brianlindahl/Development/Business/Websites/mxn-chat
./check-auth-dns.sh

# Expected output:
# ✅ Email SENDING working
# ✅ DKIM records configured
# ✅ Environment variables set
# ❌ NO MX RECORDS (need Cloudflare Email Routing)
```

### Documentation References
- **DNS & Email Setup:** See [MXN_DNS_EMAIL_SETUP.md](MXN_DNS_EMAIL_SETUP.md) ⭐ NEW
- **Authentication:** See [MXN_AUTH_SETUP.md](MXN_AUTH_SETUP.md)
- **Email Configuration:** See [MXN_EMAIL_SETUP.md](MXN_EMAIL_SETUP.md)
- **Security:** See [MXN_SECURITY.md](MXN_SECURITY.md)
- **System Overview:** See [MXN_SYSTEM.md](MXN_SYSTEM.md)

---

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

**Next Development Sprint (LEAN MVP Focus):**
	•	[✅] Fix message sending/display issues (database column names)
	•	[✅] Update Supabase URLs and Google OAuth URIs (completed)
	•	[ ] Test Google OAuth login flow (should now work)
	•	[✅] Verify email/password auth works end-to-end (Logic implemented; SMTP pending)
	•	[ ] Implement Alias Creation and Editing (via Icons)
	•	[ ] Add Room Creation and Deletion Functionality
	•	[✅] Implement email invitation system (Database schema + API + UI complete)
	•	[ ] Ensure Logout Works Properly
	•	[ ] Test Complete End-to-End MVP Flow

**Notes:**
	•	Use `magicwrxstudio@gmail.com` for all email requirements/testing until custom domain is fully active.

⸻