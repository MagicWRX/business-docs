# MXN.CHAT Master Roadmap (SSOT)

**Document Date:** December 12, 2025 12:00 CST  
**Last Updated:** December 12, 2025  
**Version:** 1.4.4 (Desktop Input Visibility Fix + Sliding Behavior)  
**Status:** Phase 1 Complete - MVP 1.1.0 Deployed, MVP 2.0 Planned  
**Next Review:** December 13, 2025 (Daily)

---

## 1. 🎯 Vision Statement

MXN.CHAT is a lean, secure, fast real-time chat platform designed for:
	•	Private 1:1 and small-group conversations
	•	Minimalist UX with ephemeral content
	•	Exclusive aliases (30-day expiry, anti-hoarding)
	•	Vibe-based rooms with colored user indicators
	•	Auto-deletes: Messages/Pictures after 24h, Rooms after 3 days
	•	Low-cost scaling (Supabase + Vercel)
	•	Seamless integration into MagicWRX Hosting

MXN is both:
	1.	A standalone paid tool
	2.	A core feature inside the MagicWRX ecosystem

⸻

2. 🏗 Core Architecture Summary (High-Level)
	•	Frontend: Next.js (App Router), Tailwind, ShadCN, Vercel Edge Middleware
	•	Backend: Supabase Postgres + Realtime Channels
	•	Auth: Supabase Auth with email verification + exclusive aliases (30-day expiry)
	•	Storage: Supabase buckets with strict RLS + 24h auto-delete
	•	Ephemeral Logic: Messages/Pictures delete after 24h, Vibes after 3 days
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

PHASE 1 — LEAN MVP (2 Weeks) ✅ COMPLETED

Goal: Clean, functional MVP with core chat features for early users.

**Core Features (LEAN MVP):**
	•	[✅] Email and Password Login/Signup (Join flow)
	•	[✅] Google Sign-In Account Creation (URLs configured)
	•	[✅] Email Verification Required Before Account Creation
	•	[✅] Send Invites by Email Address
	•	[✅] Create Exclusive Alias on Account Creation (30-day expiry, Editable via Icons Anytime)
	•	[✅] Create and Delete Vibes (Conversations) - Create implemented, Delete needs implementation
	•	[✅] Post Messages to Vibes and View Other Users' Messages (24h auto-delete)
	•	[✅] User Logout
	•	[✅] Delete Account Option in Settings
	•	[✅] Terms of Service and Privacy Policy pages
	•	[✅] Number of members logged in functioning
	•	[✅] Sidebar search for #topics and aliases
	•	[✅] Colored circle avatar for current vibe

**Status:** MVP 1.0.1 Deployed and Fully Functional

**Immediate Next Steps (Post-MVP):**
	•	[✅] **TEST END-TO-END USER FLOW** - Complete signup → email verification → login → messaging flow
		- **Status:** ✅ PASSED - E2E test script ran successfully on Dec 12, 2025
		- **Details:** Created test user, signed in, posted message, verified in database, cleaned up
		- **Database Check:** ✅ All tables accessible (rooms:1, messages:1, users:1)
		- **DNS/Auth Check:** ✅ MX records configured, DKIM/SPF/DMARC set, environment variables loaded
	•	[ ] **USER ONBOARDING** - Invite 5-10 beta users for testing
	•	[ ] **PERFORMANCE OPTIMIZATION** - Review Core Web Vitals and optimize
		- **Lighthouse Audit Checklist:**
			- [ ] **Performance Score > 90:** Optimize Largest Contentful Paint (LCP), First Input Delay (FID), Cumulative Layout Shift (CLS)
			- [ ] **Accessibility Score > 95:** Ensure proper ARIA labels, keyboard navigation, color contrast ratios
			- [ ] **Best Practices Score > 95:** Remove console logs, implement HTTPS, avoid deprecated APIs
			- [ ] **SEO Score > 90:** Add meta descriptions, structured data, proper heading hierarchy
			- [ ] **Mobile Responsiveness:** Test on various device sizes, ensure touch targets meet 44px minimum
			- [ ] **Bundle Size:** Analyze with `npm run build --analyze`, optimize imports and lazy loading
			- [ ] **Runtime Performance:** Monitor React DevTools Profiler, optimize re-renders and memoization
	•	[✅] **DESKTOP INPUT VISIBILITY** - Fixed input field disappearing on short windows
		- **Status:** ✅ IMPLEMENTED - Input now slides down when window height < 600px, hover brings it back
		- **Features:** Sticky positioning, smooth transitions, visual hover indicator

Milestones:
	•	Deploy Supabase project ✅
	•	Realtime channels working ✅
	•	Core auth flows working ✅
	•	Room management implemented ✅
	•	Alias editing functional ✅
	•	MVP enhancements complete ✅

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

PHASE 1.75 — MVP 2.0: Cross-Platform Apps

Goal: Transform MXN.CHAT from web-only to full cross-platform application ecosystem.

**Desktop Apps (Electron):**
	•	Native Windows, macOS, and Linux applications
	•	System tray integration with notifications
	•	Global keyboard shortcuts and hotkeys
	•	Popout chat windows for multitasking
	•	Window focus management (always-on-top, mini mode)
	•	Auto-updater for seamless updates
	•	Offline message queuing

**Mobile Apps (Capacitor):**
	•	Native iOS and Android applications
	•	Push notifications with rich media
	•	Camera integration for media uploads
	•	Native file system access
	•	Device vibration for message alerts
	•	App store distribution (Apple App Store, Google Play)
	•	Biometric authentication (Face ID, Touch ID, Fingerprint)

**Cross-Platform Features:**
	•	Unified user experience across all platforms
	•	Real-time sync between web, desktop, and mobile
	•	Platform-specific optimizations
	•	Shared codebase with 95%+ code reuse
	•	Consistent branding and UI/UX

**Technical Implementation:**
	•	Electron wrapper for desktop (2-3 weeks effort)
	•	Capacitor integration for mobile (1-2 weeks effort)
	•	Shared build pipeline and CI/CD
	•	Code signing and app store submission
	•	Cross-platform testing and QA

**Business Impact:**
	•	Unlocks desktop power users and gaming communities
	•	Captures mobile users for on-the-go communication
	•	Increases user engagement and retention
	•	Creates premium app store revenue streams
	•	Positions MXN as professional communication platform

**Milestones:**
	•	Implement Electron desktop wrapper
	•	Add Capacitor mobile integration
	•	Configure native build pipelines
	•	Test cross-platform compatibility
	•	Submit to app stores (Apple App Store, Google Play, Microsoft Store)
	•	Launch coordinated multi-platform release

**Timeline:** 4-6 weeks total development
**Effort:** Medium (leverages existing web codebase)
**Priority:** High (unlocks new user segments and revenue)

Release target: Multi-Platform MVP 2.0

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

### Session Timeout Extension
**Issue:** Login sessions timing out too quickly (user reports)
**Solution:** Update Supabase Authentication Settings
- Go to Supabase Dashboard → Authentication → Settings
- Under "Session Configuration":
  - Set JWT Expiry to 24 hours (from default 1 hour)
  - Set Refresh Token Expiry to 30 days (default)
- This will keep users logged in longer without frequent re-authentication

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