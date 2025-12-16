# MXN.CHAT Master Roadmap (SSOT)

**Document Date:** December 13, 2025 12:00 CST  
**Last Updated:** December 14, 2025  
**Version:** 1.6.1 (UI Improvements & Room Management)  
**Status:** Phase 1 Complete - MVP 1.1.0 Deployed, Phase 1.6+ P1 Features Planned  
**Next Review:** December 15, 2025 (Daily)

---
## Prompt Current need chages.
1. [✅] Change side bar titles from Channels -> Topics
2. [✅] Change My Rooms -> My Topics
3. [✅] ADD "Current Topics" display other user's Topics.
4. [✅] Add "Vibe" indicator. to Topics.
5. [✅] Develop "Vibe" indicator controls and connections to User's Alias. (Basic implementation via UserSettingsModal)
6. [✅] Develop User Alias, add, vibe settings, "Boundries, Triggers, Off-Limits, Open, and 'Add Custom' - Vibe 'words' these help establish and broaden users' controls for settings. (Basic alias and vibe selection implemented)
7. [✅] Change Color of Users in Topic chats. Let current user see their color as GREEN while other users get purple, pink, orange, yellow.  NO MXN.CHAT Blue. that mxn.chat blue is reserved for MXN communitcations and links. REDS are for CAUTION and not tube used by users according to Layout and Desing Rules for Brand and IP.
8. [✅] Remove all instances of Game Controller ICon.
9. [✅] Remove all instances to Gaming, or Games.  Use mxn.chat(Always lowercase) or Topics, or Vibe as terminology.

4. [✅] Add Settings controls for User to adjust Chat/Topic settings, boundries, triggers, ans so forth. (Basic UserSettingsModal implemented) 

## Recently Completed Tasks
1. [✅] Display Login information if user attempts login through email rather than Google Account. (Added helpful error messages in AuthForm)
2. [✅] Signed in Users need to be able to see which Chats they have created. (Added "My Rooms" section in Sidebar)
3. [✅] Add 'X' to chat for deleting chats. (Added delete button for room creators)
4. [✅] Add Settings controls for User to adjust Chat/Topic settings, boundries, triggers, ans so forth. (Implemented UserSettingsModal with basic alias and vibe controls) 


## Recently Completed Tasks (Latest Updates)
1. [✅] Implemented UserSettingsModal component for adjusting user alias and vibe preferences
2. [✅] Integrated "Adjust Vibe" button in Vibe Lounge to open settings modal  
3. [✅] Added basic vibe selection with 6 predefined vibes (Chill, Hype, Focus, Creative, Support, Wild)
4. [✅] Connected alias editing to existing updateDisplayName functionality
5. [✅] Updated MXN_ROADMAP.md to reflect completion of settings controls implementation


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
	•	[✅] Delete Account Option in Settings - Updated: Confirmation modal and server-side deletion endpoint implemented with closure email notification
	•	[✅] Terms of Service and Privacy Policy pages
	•	[✅] Number of members logged in functioning
	•	[✅] Sidebar search for #topics and aliases
	•	[✅] Colored circle avatar for current vibe
	•	[✅] Contact/Support Page - Implemented with database storage and bot protection

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
	•	[✅] **TAB VISIBILITY RECONNECTION** - Fixed messages disappearing when switching desktops
		- **Status:** ✅ IMPLEMENTED - Added visibilitychange handler that refreshes realtime connection
		- **Features:** Automatic reconnection, loading state reset, detailed logging
		- **Triggers:** Detects when browser tab becomes visible after being hidden

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
	•	Unlocks desktop power for users communities
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
1. Fix Google OAuth authentication (DOMAIN MISMATCH - Supabase configured for mxn.chat but site at www.mxn.chat)
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
	•	[❌] Test Google OAuth login flow (DOMAIN MISMATCH ISSUE FOUND - see MXN_SOLUTIONS.md #10)
	•	[✅] Verify email/password auth works end-to-end (Logic implemented; SMTP pending)
	•	[ ] Implement Alias Creation and Editing (via Icons)
	•	[ ] Add Room Creation and Deletion Functionality
	•	[✅] Implement email invitation system (Database schema + API + UI complete)
	•	[ ] Ensure Logout Works Properly
	•	[ ] Test Complete End-to-End MVP Flow

**Notes:**
	•	Use `magicwrxstudio@gmail.com` for all email requirements/testing until custom domain is fully active.

⸻

## 10. 🎨 NEXT STEPS: Vibe-Based Features & UX Enhancements

### 10.1 Message Interaction & Deletion
**Feature:** Hoverable/clickable messages with delete functionality
**Status:** ✅ Completed - Phase 1.6
**Implementation:** Added hover-to-show delete button for desktop and enhanced existing mobile swipe functionality. Users can only delete their own messages with confirmation dialog.

**Implementation Strategy:**
```typescript
// MessageList.tsx - Add hover state and delete UI
interface MessageItemProps {
  message: Message;
  isOwnMessage: boolean;
  onDelete: (messageId: string) => Promise<void>;
}

// Desktop: Hover shows X button in top-right corner
// Mobile: Swipe left/right to reveal delete action
// Constraint: Users can ONLY delete their own messages
```

**Coding Steps:**
1. Add hover state management to MessageList component
2. Conditionally render delete button (X) only for `message.authorId === currentUser.id`
3. Enhance existing swipe gesture for mobile (already partially implemented)
4. Add confirmation dialog before deletion
5. Update Supabase RLS policies to enforce author-only deletion

**Database RLS Policy:**
```sql
-- Only message author can delete
CREATE POLICY "Users can delete own messages"
ON messages FOR DELETE
USING (auth.uid() = author_id);
```

**UI Design:**
- **Desktop:** Hovering over a user's own message displays a small 'X' (delete) button in the top-right corner of the message bubble. Clicking it triggers a confirmation dialog.
- **Mobile:** Implement swipe-left gesture on the message to reveal a delete action button. Tapping the button shows confirmation.
- **Confirmation Dialog:** Simple modal with "Delete this message?" and "This action cannot be undone." Options: Cancel (dismiss) or Delete (proceed).
- **Visual Feedback:** Deleted messages show as "[Message deleted]" in gray text, visible to all users in the room.
- **Accessibility:** Ensure keyboard navigation (Tab to focus, Enter to delete) and screen reader support for delete actions.

**Testing Plan:**
- **Unit Tests:** Test `onDelete` function calls Supabase delete API only for own messages.
- **Integration Tests:** Verify RLS policy prevents deletion of others' messages.
- **E2E Tests:** Simulate hover/swipe, confirm deletion, check message disappears and shows "[Message deleted]".
- **Edge Cases:** Test deletion of last message in room, rapid clicks, network errors during delete.
- **Mobile Testing:** Verify swipe gesture on iOS/Android devices.

**Estimated Effort:** 2-3 days (1 day UI, 1 day backend integration, 1 day testing)
**Dependencies:** MessageList.tsx component, Supabase RLS policies, existing swipe gesture library (if any)

---

### 10.2 Room/Topic Control & Ownership
**Feature:** Room creators have full control to delete their rooms
**Status:** 🟡 Planned - Phase 1.6
**Priority:** High (User Autonomy)

**Implementation Strategy:**
```typescript
// Room ownership tracked in rooms table
interface ChatRoom {
  id: string;
  name: string;
  createdBy: string; // User ID of creator
  admins: string[];  // Array of admin user IDs
  // ... existing fields
}

// Only creator or admins can delete room
const canDeleteRoom = (room: ChatRoom, userId: string) => {
  return room.createdBy === userId || room.admins.includes(userId);
};
```

**Coding Steps:**
1. Add delete button to RoomSidebar for rooms where user is creator
2. Implement `deleteRoom` function in ChatContext (already exists, needs UI hookup)
3. Add confirmation dialog with room name
4. Handle edge case: Auto-select another room after deletion
5. Update Supabase RLS to enforce creator-only deletion

**Ownership Transfer & Admins**

Feature: Allow room creators to transfer ownership or appoint admins.

Implementation notes:
- Add `owner_id` (UUID) and `admins` (UUID[]) to `rooms` table; keep `created_by` as audit.
- Provide UI: `Transfer Ownership` (requires password reconfirmation) and `Manage Admins` modal.
- Only `owner_id` can transfer ownership; admins can manage members but not transfer unless explicitly granted.

**Soft Delete vs Hard Delete**

- Default to *soft-delete* (mark `deleted_at` TIMESTAMPTZ) so audit logs, moderation, and recovery are possible for a short window (24–72h).
- Provide a background job to purge hard-deleted rooms after retention period; attachments and messages cascade-delete or move to archival bucket.
- UI shows placeholder "[Topic deleted]" for soft-deleted rooms and auto-selects a fallback topic.

**Cascade & Data Retention**

- Deleting a room should either:
	- soft-delete messages (set `deleted_at`), or
	- queue messages/media for archival + scheduled delete job.
- Retain moderation logs and membership records for 30 days for audit purposes.

**Supabase RLS Examples (SQL)**

```sql
-- Only owner or admin can delete (soft/hard handled in server function)
CREATE POLICY "Room owners or admins can delete"
ON rooms FOR UPDATE, DELETE
USING (
	auth.uid() = owner_id
	OR auth.uid() = ANY(admins)
);

-- Allow transfer of ownership only to a valid user (enforced in server function)
-- Example: server-side RPC `transfer_room_owner(room_id, new_owner_id)` with checks
```

**API & UI Flow**

- UI: Room sidebar -> kebab menu -> `Delete Topic` / `Transfer Ownership` / `Manage Admins`.
- Confirm dialog for deletion shows room name, member count, and consequences; require typing the room name to confirm for hard delete.
- API: `DELETE /api/rooms/:id` (soft by default) returns `{deleted: true, archivedAt: ...}`; `POST /api/rooms/:id/transfer` body: `{newOwnerId}`.
- Server: Use Postgres function or Edge function to perform ownership transfer atomically and emit realtime event to room members.

**Notifications & Audit**

- Emit realtime events: `room.deleted`, `room.transferred`, `room.admins.updated` to update clients.
- Write `room_audit_logs` entries for actions: `{actor_id, action, target_id, details, created_at}`.

**Testing & QA Checklist**

- Unit: `deleteRoom` callable only when `canDeleteRoom` true.
- Integration: RLS policy prevents non-owners/admins from deleting via direct DB call.
- E2E: UI flow for owner deleting (soft -> purge), transfer ownership (new owner receives rights), admin actions.
- Edge cases: last-member deletion, concurrent delete+message post, transfer to non-existent user.

**Migration Notes**

- SQL migration should:
	1. Add `owner_id UUID`, `admins UUID[]`, `deleted_at TIMESTAMPTZ DEFAULT NULL` to `rooms`.
	2. Backfill `owner_id = created_by` for existing rows.
	3. Add `room_audit_logs` table and necessary indexes.

Estimated effort: 1–2 days (schema + RLS + UI + tests).

---

### 10.3 Visual Identity: Colored Vibe Bullets
**Feature:** Replace hashtag (#) with colored circle bullets based on Vibe
**Status:** 🟡 Planned - Phase 1.6
**Priority:** Medium (Visual Polish)

**Implementation Strategy:**
```typescript
// Vibe color mapping
const VIBE_COLORS = {
  chill: '#3b82f6',      // Blue
  energetic: '#f59e0b',  // Orange
  focused: '#8b5cf6',    // Purple
  creative: '#ec4899',   // Pink
  social: '#10b981',     // Green
  reflective: '#6366f1', // Indigo
  default: '#64748b'     // Gray
} as const;

// Room component renders colored bullet
<div 
  className="w-3 h-3 rounded-full flex-shrink-0"
  style={{ backgroundColor: VIBE_COLORS[room.vibe || 'default'] }}
/>
```

**Coding Steps:**
1. Add `vibe` field to rooms table schema
2. Update RoomSidebar to render colored circles instead of hash symbols
3. Create Vibe selector UI in CreateChannelDialog
4. Store vibe preference in room metadata
5. Update room list styling for visual consistency

**Database Migration:**
```sql
ALTER TABLE rooms ADD COLUMN vibe TEXT DEFAULT 'default';
ALTER TABLE rooms ADD COLUMN vibe_settings JSONB DEFAULT '{}';
```

---

### 10.4 Terminology Update: Rooms → Topics
**Feature:** Dual terminology support (Rooms/Topics interchangeable)
**Status:** 🟡 Planned - Phase 1.6
**Priority:** Low (UX Clarity)

**Implementation Strategy:**
```typescript
// Use "Topics" in UI, "rooms" in code/database
const UI_LABELS = {
  room: 'Topic',
  rooms: 'Topics',
  createRoom: 'Create Topic',
  deleteRoom: 'Delete Topic'
};

// Keep database table name as "rooms" for stability
// Update UI copy throughout components
```

**Coding Steps:**
1. Create UI label constants file
2. Replace hardcoded "room" text in components
3. Update placeholder text and tooltips
4. Keep database schema unchanged (rooms table)
5. Document terminology mapping in MXN_TREE.md

---

### 10.5 Vibe Settings: Triggers, Boundary, Off-Limits
**Feature:** Privacy controls for topic discussions
**Status:** 🔴 Concept Phase - Needs Architecture Design
**Priority:** High (Core Differentiation)

**Concept Overview:**
Allow topic creators to set discussion parameters:
- **Triggers:** Topics that require content warnings (e.g., "mental health", "politics")
- **Boundary:** What's allowed in the discussion (e.g., "respectful debate only")
- **Off-Limits:** Explicitly forbidden topics (e.g., "no personal attacks", "no spam")

**Proposed Data Model:**
```typescript
interface VibeSettings {
  triggers: string[];      // Array of trigger warning keywords
  boundary: {
    allowedTopics: string[];
    rulesText: string;
  };
  offLimits: {
    forbiddenTopics: string[];
    autoModerate: boolean;  // AI-assisted moderation
  };
  privacyLevel: 'open' | 'invite-only' | 'private';
  moderationLevel: 'relaxed' | 'standard' | 'strict';
}

// Stored in rooms.vibe_settings JSONB column
```

**Implementation Phases:**
1. **Phase 1 (Manual):** Creator sets text rules, displayed in room description
2. **Phase 2 (AI-Assisted):** OpenAI API checks messages against Off-Limits topics
3. **Phase 3 (Advanced):** Real-time content filtering with user warnings

**Coding Strategy:**
```typescript
// Room creation/edit dialog
const VibeSettingsForm = () => {
  const [settings, setSettings] = useState<VibeSettings>({
    triggers: [],
    boundary: { allowedTopics: [], rulesText: '' },
    offLimits: { forbiddenTopics: [], autoModerate: false },
    privacyLevel: 'open',
    moderationLevel: 'standard'
  });

  // Tag input for triggers and forbidden topics
  // Rich text editor for rules
  // Privacy toggle switches
};

// Message validation before sending
const validateMessage = async (text: string, roomSettings: VibeSettings) => {
  if (roomSettings.offLimits.autoModerate) {
    const containsForbidden = await checkWithAI(text, roomSettings.offLimits.forbiddenTopics);
    if (containsForbidden) {
      return { allowed: false, reason: 'Message contains off-limits content' };
    }
  }
  return { allowed: true };
};
```

**UI Components Needed:**
- `VibeSettingsPanel.tsx` - Settings configuration interface
- `TriggerWarningBadge.tsx` - Display trigger warnings on room entry
- `ModeratedMessageNotice.tsx` - Show when message is blocked

**Database Schema:**
```sql
-- Already added in migration above
-- rooms.vibe_settings JSONB stores all settings

-- Message moderation log
CREATE TABLE moderation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES messages(id),
  room_id UUID REFERENCES rooms(id),
  user_id UUID REFERENCES users(id),
  action TEXT, -- 'blocked', 'warned', 'flagged'
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 10.6 Anonymity & Vibe Alias System
**Feature:** Mood-based alias selection for privacy
**Status:** 🟡 Planned - Phase 1.7
**Priority:** High (Core Value Proposition)

**Concept:**
Users can switch their display alias based on current mood/vibe without changing account.

**Implementation Strategy:**
```typescript
// User can have multiple aliases tied to vibes
interface VibeAlias {
  id: string;
  userId: string;
  alias: string;        // Display name
  vibe: keyof typeof VIBE_COLORS;
  avatar: string;       // Optional custom avatar
  isActive: boolean;
  createdAt: Date;
  expiresAt: Date;      // 30-day expiry
}

// User selects active alias on login or switches mid-session
const currentAlias = userAliases.find(a => a.isActive);
```

**Coding Steps:**
1. Create `vibe_aliases` table in Supabase
2. Add alias selector UI to ChatInterface (dropdown or modal)
3. Store active alias in local state + session
4. Messages show alias name instead of account email
5. Implement 30-day expiry with background cleanup job

**Database Schema:**
```sql
CREATE TABLE vibe_aliases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  alias TEXT NOT NULL,
  vibe TEXT DEFAULT 'default',
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 days',
  UNIQUE(user_id, alias)
);

-- Ensure only one active alias per user
CREATE UNIQUE INDEX one_active_alias_per_user 
ON vibe_aliases(user_id) 
WHERE is_active = true;
```

**UI Flow:**
1. After login → "Choose your vibe" modal
2. User picks from preset vibes (chill, energetic, etc.) or custom
3. Enter alias name (availability check)
4. Alias appears in chat with colored indicator
5. Settings panel allows switching aliases or creating new ones

**Privacy Considerations:**
- Aliases are NOT linked to email in UI
- Room members see aliases only, not underlying accounts
- Admin/creator can see account IDs for moderation (backend only)
- Expired aliases auto-release for others to claim

---

### 10.9 Edit Sent Messages
**Feature:** Allow users to edit their own messages within time limit
**Status:** ✅ Completed - Phase 1.6
**Priority:** P1 (High)

**Implementation:** Added double-click to edit for own messages, inline textarea with save/cancel, 5-minute time limit, "(edited)" indicator.

**Implementation Strategy:**
```typescript
// MessageList.tsx - Add edit functionality
interface MessageItemProps {
  message: Message;
  canEdit: boolean; // message.authorId === currentUser.id && withinTimeLimit
  onEdit: (messageId: string, newText: string) => Promise<void>;
}

// Double-click or long-press to enter edit mode
// Show "(edited)" indicator after edit
// 5-minute edit window
```

**Database Schema:**
```sql
ALTER TABLE messages ADD COLUMN edited_at TIMESTAMPTZ;
ALTER TABLE messages ADD COLUMN edit_count INTEGER DEFAULT 0;
```

---

### 10.10 Reply to Specific Messages (Threading)
**Feature:** Click reply button to quote and respond to specific messages
**Status:** 🟡 Planned - Phase 1.6
**Priority:** P1 (High)

**Implementation Strategy:**
```typescript
interface Message {
  id: string;
  replyToId?: string; // Reference to parent message
  replyToPreview?: string; // Cached preview text
}

// UI shows quoted message above reply
// Click quote to jump to original message
```

**Database Schema:**
```sql
ALTER TABLE messages ADD COLUMN reply_to_id UUID REFERENCES messages(id);
ALTER TABLE messages ADD COLUMN reply_to_preview TEXT;
```

---

### 10.11 Message Reactions (Emoji)
**Feature:** Click message to add emoji reactions
**Status:** 🟡 Planned - Phase 1.6
**Priority:** P1 (High)

**Implementation Strategy:**
```typescript
// New component: ReactionPicker.tsx
interface Reaction {
  emoji: string;
  users: string[]; // User IDs who reacted
  count: number;
}

// Hover/long-press message shows reaction picker
// Reactions stored in separate table for performance
```

**Database Schema:**
```sql
CREATE TABLE message_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  emoji TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(message_id, user_id, emoji)
);
```

---

### 10.12 Typing Indicators
**Feature:** Show "User is typing..." when someone types
**Status:** 🟡 Planned - Phase 1.6
**Priority:** P1 (High)

**Implementation Strategy:**
```typescript
// Use Supabase presence for typing status
const typingChannel = supabase.channel(`room:${roomId}:typing`);

// Debounce typing events (300ms)
// Show indicators for 3 seconds after stopping
```

---

### 10.13 Read Receipts
**Feature:** Show when messages are read by others
**Status:** 🟡 Planned - Phase 1.6
**Priority:** P1 (Medium)

**Implementation Strategy:**
```typescript
// Track read status per user per message
interface ReadReceipt {
  messageId: string;
  userId: string;
  readAt: Date;
}

// Show checkmarks: sent (✓) vs read (✓✓)
```

---

### 10.14 Message Search
**Feature:** Search through message history
**Status:** 🟡 Planned - Phase 1.6
**Priority:** P1 (High)

**Implementation Strategy:**
```typescript
// Search input in ChatInterface
// Full-text search with PostgreSQL
// Filter by date, user, room
```

**Database:**
```sql
-- Enable full-text search
CREATE INDEX messages_content_idx ON messages USING gin(to_tsvector('english', content));
```

---

### 10.15 Mention/Tag Users (@username)
**Feature:** @username notifications and highlighting
**Status:** 🟡 Planned - Phase 1.6
**Priority:** P1 (High)

**Implementation Strategy:**
```typescript
// Parse @mentions in message text
// Highlight mentions in UI
// Send push notifications for mentions
// Autocomplete dropdown when typing @
```

---

### 10.16 Link Previews
**Feature:** Show rich previews for URLs
**Status:** 🟡 Planned - Phase 1.6
**Priority:** P1 (High)

**Implementation Strategy:**
```typescript
// Server-side URL parsing
// Cache previews in database
// Show title, description, image
```

**Database Schema:**
```sql
CREATE TABLE link_previews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT UNIQUE,
  title TEXT,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 10.17 File Drag-and-Drop
**Feature:** Drag files directly into chat
**Status:** 🟡 Planned - Phase 1.6
**Priority:** P1 (High)

**Implementation Strategy:**
```typescript
// HTML5 drag/drop API
// Multiple file selection
// Progress indicators
// Supabase Storage upload
```

---

### 10.18 Multi-File Upload
**Feature:** Upload multiple files at once
**Status:** 🟡 Planned - Phase 1.6
**Priority:** P1 (Medium)

**Implementation Strategy:**
```typescript
// File input with multiple attribute
// Batch upload with progress
// Thumbnail previews
```

---

### 10.19 Image Gallery View
**Feature:** Click images to view in gallery
**Status:** 🟡 Planned - Phase 1.6
**Priority:** P1 (Medium)

**Implementation Strategy:**
```typescript
// Modal gallery viewer
// Navigation between images
// Download/share options
```

---

### 10.20 Block/Mute User Features
**Feature:** Block users from contacting you, mute notifications
**Status:** 🟡 Planned - Phase 1.7
**Priority:** P1 (High)

**Implementation Strategy:**
```typescript
// Block: Hide messages, prevent DMs
// Mute: Hide notifications only
// Settings panel for management
```

**Database Schema:**
```sql
CREATE TABLE user_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blocker_id UUID REFERENCES users(id),
  blocked_id UUID REFERENCES users(id),
  block_type TEXT DEFAULT 'full', -- 'full' or 'notifications'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(blocker_id, blocked_id)
);
```

---

### 10.21 User Report System
**Feature:** Report abusive users for moderation
**Status:** 🟡 Planned - Phase 1.7
**Priority:** P1 (High)

**Implementation Strategy:**
```typescript
// Report button on user profiles/messages
// Categories: spam, harassment, inappropriate
// Admin review queue
```

**Database Schema:**
```sql
CREATE TABLE user_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES users(id),
  reported_id UUID REFERENCES users(id),
  category TEXT,
  description TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 10.22 Account Export (GDPR)
**Feature:** Download all user data
**Status:** 🟡 Planned - Phase 1.7
**Priority:** P1 (High)

**Implementation Strategy:**
```typescript
// Generate JSON/CSV export
// Include messages, profile data, settings
// Email download link
```

---

### 10.23 Profile Management Features
**Feature:** Custom avatars, status messages, visibility controls
**Status:** 🟡 Planned - Phase 1.7
**Priority:** P1 (High)

**Implementation Strategy:**
```typescript
// Profile settings panel
// Avatar upload to Supabase Storage
// Status message with emoji picker
// Privacy toggles
```

**Database Schema:**
```sql
ALTER TABLE users ADD COLUMN avatar_url TEXT;
ALTER TABLE users ADD COLUMN status_message TEXT;
ALTER TABLE users ADD COLUMN profile_visibility TEXT DEFAULT 'public';
```

---

### 10.7 Implementation Timeline

**Phase 1.6 - Core Messaging Features (3 weeks)**
- ✅ Message hover/delete (Desktop + Mobile)
- ✅ Edit sent messages (P1)
- ✅ Reply to specific messages (threading) (P1)
- ✅ Message reactions (emoji) (P1)
- ✅ Typing indicators (P1)
- ✅ Read receipts (P1)
- ✅ Message search (P1)
- ✅ Mention/tag users (@username) (P1)
- ✅ Link previews (P1)
- ✅ File drag-and-drop (P1)
- ✅ Multi-file upload (P1)
- ✅ Image gallery view (P1)
- ✅ Room deletion by creator
- ✅ Colored vibe bullets instead of hashtags
- ✅ Rooms → Topics terminology update

**Phase 1.7 - User Management & Privacy (2 weeks)**
- ✅ Block user feature (P1)
- ✅ Mute user feature (P1)
- ✅ User report system (P1)
- ✅ Account export (GDPR) (P1)
- ✅ Profile visibility controls (P1)
- ✅ Custom avatar upload (P1)
- ✅ Status messages (custom text) (P1)
- ✅ Vibe Settings Foundation (Triggers, Boundary, Off-Limits)
- ✅ Privacy level controls (Open, Invite-Only, Private)
- ✅ Vibe Alias creation and selection
- ✅ 30-day alias expiry logic

**Phase 1.8 - Advanced Features (3 weeks)**
- ✅ Message pinning (P1)
- ✅ Message bookmarks/saved messages (P1)
- ✅ Code snippet formatting (P1)
- ✅ Markdown support (P1)
- ✅ Spam detection (P1)
- ✅ AI-Powered Moderation (Off-Limits enforcement)
- ✅ Real-time message validation
- ✅ Moderation logging and analytics

**Phase 1.9 - Rich Media & Communication (2 weeks)**
- ✅ Voice messages (P2)
- ✅ GIF picker integration (P2)
- ✅ Sticker packs (P2)
- ✅ Poll creation (P1)
- ✅ Custom emoji reactions (P2)

**Phase 2.0 - Scaling & Monetization (4 weeks)**
- ✅ Subtle ads integration
- ✅ Message pagination + virtual scrolling
- ✅ Media compression pipeline
- ✅ API rate limits + metering foundation
- ✅ File size limits by tier
- ✅ Premium subscription system

---

### 10.8 Technical Debt & Considerations

**Security:**
- Alias system must prevent impersonation
- Vibe settings require creator authentication
- RLS policies must enforce ownership rules

**Performance:**
- AI moderation adds latency (cache common checks)
- Alias lookups should be optimized (indexed queries)
- Real-time updates for vibe changes

**Scalability:**
- JSONB vibe_settings allows flexible schema evolution
- Message validation should be async (don't block send)
- Consider rate limiting for alias creation

**User Education:**
- Onboarding flow to explain vibe system
- Visual indicators for room privacy levels
- Help text for Vibe Settings configuration

---

⸻