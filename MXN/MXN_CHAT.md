---
title: "MXN.CHAT Complete Feature & Capability Reference (SSOT)"
ssot: true
owner: "brianlindahl"
status: "production"
codeRefs:
  - "Websites/mxn-chat/src"
scripts:
  - "scripts/init-rooms.js"
relatedDocs:
  - "MXN_LOUNGE.md"
  - "MXN_SELECTOR.md"
  - "MXN_VIBE_CONTROLLER.md"
lastReviewed: "2026-01-01"
tags:
  - "features"
  - "ssot"
---

# MXN.CHAT Complete Feature & Capability Reference (SSOT)

**Document Date:** December 12, 2025  
**Last Updated:** December 31, 2025  
**Version:** 1.1.1 (Terminology SSOT Sync)  
**Status:** Production Active (MVP 1.1.0) 

---
Single Source of Truth for the MXN.CHAT
---

## 🎯 Purpose

This document serves as the Single Source of Truth (SSOT) for ALL features, capabilities, and functionality currently implemented in MXN.CHAT. Every feature listed here is deployed and operational.

---

## 📚 Canonical Terminology & Naming Map (SSOT)

This section defines canonical terms to prevent double-meaning across docs, UI copy, and code. If a term conflicts with this section, update the conflicting doc/code.

### System nouns (what things *are*)

| Canonical Term | What It Means | UI / Docs synonyms (allowed) | Code / DB name (reference) |
|---|---|---|---|
| **Lounge** | The hub view where users browse/filter public Thoughts and enter one to chat. | Vibe Lounge, Lounge | Implemented in `ChatInterface.tsx` (hub background + controls + bubbles) |
| **Thought** | A public topic a user can enter to chat; represented as a bubble in the Lounge. | Topic (preferred alt), Public Topic | `ChatRoom` in code; `rooms` table in DB |
| **Room** | The underlying data model for a Thought/Topic (public) or private chat container. | (avoid in UI copy unless technical) | `ChatRoom`; `rooms` table |
| **Message** | A single chat entry within a Room. | Chat message | `Message`; `messages` table |
| **Vibe** | A mood label attached to an alias and (optionally) to a Thought. | Mood | Alias vibe stored on `aliases.vibe`; thought vibe typically in `rooms.metadata.vibe` |
| **Alias** | A user persona identity used to post and appear anonymously. | Persona | `aliases` table; `User.aliases[]` |

### UI primitives (how things *look* and *behave*)

| Term | Canonical Meaning | Examples in MXN.CHAT |
|---|---|---|
| **Indicator** | A UI element that *shows state* (may or may not be interactive). | USER STATUS vibe indicator circle; online status dot |
| **Selector** | A control that lets a user choose **one** value from a discrete set; typically an **indicator button** + an **overlay picker**. | Vibe Selector (ring stack picker); Location Selector (pill dropdown + selector modal) |
| **Controller** | A control that *adjusts* a value continuously or as a boolean toggle; not “choose one from many”. | Notification sound toggle; Do Not Disturb toggle |
| **Tab** | A navigation/filter affordance that switches view or filters content; typically a row of mutually exclusive options. | Lounge Vibe Tabs (filter Thoughts by vibe) |
| **Circle** | A filled circular shape (solid interior). | Online status dot; avatar mask/crop |
| **Ring** | A circular outline (stroke) with a transparent interior. | Vibe ring styling; unfilled vibe tabs in controller spec |
| **Bubble** | A ring-rendered circle used as an interactive “Thought” in the Lounge. | Thought bubbles (Plinko field) |
| **Pill** | A rounded-rectangle chip/button, usually with text. | Location pill dropdown |

### Canonical phrasing rules (keep docs + UI consistent)

- Prefer **Thought** or **Topic** in user-facing UI; use **Room** only when referring to code/DB.
- Prefer **Vibe** for mood; do not use “channel” or “vibe” as a synonym for a Room.
- Use **Vibe Tabs** for the Lounge filter row; use **Vibe Selector** for the USER STATUS “Adjust Your Vibe” control.
- Use **Ring** when the interior is transparent; use **Circle** when filled.

### Related SSOTs

- Lounge SSOT: [MXN_LOUNGE.md](MXN_LOUNGE.md)
- Selector SSOT: [MXN_SELECTOR.md](MXN_SELECTOR.md)
- Vibe ring styling: [MXN_VIBE_CONTROLLER.md](MXN_VIBE_CONTROLLER.md)
- Location filter system: [LOCATION_FILTER_IMPLEMENTATION.md](LOCATION_FILTER_IMPLEMENTATION.md)
- Thought dissipation behavior: [TOPIC_DISSIPATION_SSOT.md](TOPIC_DISSIPATION_SSOT.md)

---

## 📋 Feature Inventory

### 1. 🔐 Authentication & User Management

#### Email/Password Authentication
- ✅ User signup with email and password
- ✅ Email verification required before account activation
- ✅ Password reset via email
- ✅ Secure password hashing (Supabase Auth)
- ✅ Resend verification email option
- ✅ Session management with automatic refresh

#### Google OAuth Integration
- ✅ One-click Google Sign-In
- ✅ Automatic account creation from Google profile
- ✅ Secure OAuth 2.0 flow via Supabase
- ✅ Redirect URL configuration for multiple environments

#### User Profile Management
- ✅ Forced alias creation on signup (anonymous by design)
- ✅ Exclusive aliases (unique across platform)
- ✅ Alias auto-deletion after 30 days (prevents hoarding)
- ✅ Custom display name/alias (editable anytime)
- ✅ Auto-generated avatar based on display name
- ✅ User status management (online/offline)
- ✅ Last seen timestamp tracking
- ✅ Account deletion with data cleanup

#### Privacy & Security
- ✅ Anonymous aliases (no display of Google names)
- ✅ Row Level Security (RLS) on all database tables
- ✅ Session-based authentication
- ✅ Secure API key management
- ✅ HTTPS-only connections
- ✅ Password strength requirements (6+ characters)

---

### 2. 💬 Chat & Messaging

#### Real-time Messaging
- ✅ Send text messages to Thoughts (Rooms)
- ✅ Real-time message delivery (Supabase Realtime)
- ✅ Live message updates without page refresh
- ✅ Message timestamp with "time ago" formatting
- ✅ Message history loading (last 100 messages per Thought)
- ✅ Author identification with avatar and display name
- ✅ Swipe-to-delete messages (mobile)
- ✅ Message deletion (own messages only)
- ✅ Edited message indicator (planned)
- ✅ Auto-delete messages after 24 hours (ephemeral)

#### Message Composition
- ✅ Text input with multiline support
- ✅ Character limit enforcement
- ✅ Send button with loading state
- ✅ Enter key to send (Shift+Enter for new line)
- ✅ Input validation and error handling
- ✅ Real-time message preview

#### Image Sharing
- ✅ Upload and share images in chat
- ✅ Image preview before sending
- ✅ Supabase Storage integration
- ✅ Click to open full-size image
- ✅ Image URL sharing support
- ✅ Image metadata tracking
- ✅ Auto-delete images after 24 hours (ephemeral)

---

### 3. 🏠 Thoughts (Rooms)

#### Thought Management
- ✅ Default Thoughts (e.g., Welcome + defaults)
- ✅ Create custom Thoughts (Topics)
- ✅ Delete Thoughts (admin only)
- ✅ Thought descriptions
- ✅ Public/private Thought types
- ✅ Thought member count display
- ✅ Admin permission system
- ✅ Auto-select first Thought on load
- ✅ Thought auto-deletion after 3 days (ephemeral)

#### Thought Navigation
- ✅ Sidebar with Thought list
- ✅ Active Thought highlighting
- ✅ Thought switching without page reload
- ✅ Collapsible "Other Thoughts" dropdown
- ✅ #Welcome Thought always visible
- ✅ Thought icons with # prefix
- ✅ Mobile-friendly Thought sidebar
- ✅ Sidebar search for #topics (purple) and aliases (blue)

#### Thought Features
- ✅ Last activity tracking
- ✅ Message count per Thought
- ✅ Thought creation timestamp
- ✅ Thought creator tracking
- ✅ Default Thought designation
- ✅ Maximum member limits (100 default)
- ✅ Thought active/inactive status

---

### 4. 👥 Social & Collaboration

#### Friend System
- ✅ Friends list tracking
- ✅ Invite friends by email
- ✅ Email invitation templates
- ✅ Invitation acceptance flow
- ✅ Pending invitations tracking
- ✅ Friend count display

#### Email Invitations
- ✅ Send invites via email (Brevo API)
- ✅ Custom invitation templates
- ✅ Invitation token generation
- ✅ Secure invitation links
- ✅ Invitation expiration tracking
- ✅ Multiple invitations per user

#### User Presence
- ✅ Online/offline status
- ✅ Real-time online user count
- ✅ Last seen timestamp
- ✅ Status auto-update on activity
- ✅ 30-second refresh interval
- ✅ Green pulse indicator for online users

---

### 5. 🎨 User Interface & Experience

#### Design System
- ✅ Gaming-themed dark UI
- ✅ Neon blue/purple gradient accents
- ✅ Custom CSS animations
- ✅ Tailwind CSS utility classes
- ✅ Responsive card layouts
- ✅ Glass morphism effects
- ✅ Smooth transitions and hover states
- ✅ Colored circle avatar for current vibe (user-selectable)

#### Mobile Experience
- ✅ Mobile-first responsive design
- ✅ Touch-optimized controls
- ✅ Swipe gestures for actions
- ✅ Mobile sidebar overlay
- ✅ Collapsible navigation
- ✅ Adaptive text sizing
- ✅ Full-screen mobile chat

#### Desktop Experience
- ✅ Multi-column layout
- ✅ Persistent sidebar
- ✅ Keyboard shortcuts ready
- ✅ Mouse hover interactions
- ✅ Desktop notification support
- ✅ Tab focus management

#### Accessibility
- ✅ Semantic HTML structure
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ High contrast mode compatible
- ✅ Screen reader friendly
- ✅ Focus visible indicators

---

### 6. 🔔 Notifications & Alerts

#### Browser Notifications
- ✅ Desktop browser notifications
- ✅ New message alerts (tab inactive)
- ✅ Notification permission request
- ✅ Room name in notification
- ✅ Message preview in notification
- ✅ Icon with notification

#### In-App Notifications
- ✅ Error message display
- ✅ Success message toasts
- ✅ Loading state indicators
- ✅ Connection status alerts
- ✅ Dismissible notifications

---

### 7. 🛠️ Developer Tools & Debugging

#### Debug Panel (Development Only)
- ✅ System diagnostics panel
- ✅ Auth status check
- ✅ Database connection tests
- ✅ RLS policy verification
- ✅ Realtime subscription test
- ✅ Environment variable check
- ✅ Brevo API connection test
- ✅ SMTP email delivery test
- ✅ Messaging read/write test
- ✅ Debug mode toggle
- ✅ Hidden in production

#### Scripts & Utilities
- ✅ `start-local.sh` - Local development server
- ✅ `check-dns.sh` - DNS verification
- ✅ `verify-brevo-dns.sh` - Email DNS check
- ✅ `check-auth-dns.sh` - Auth & DNS combo check
- ✅ SQL debug scripts for Supabase

---

### 8. 📧 Email System

#### Transactional Emails
- ✅ Email verification messages
- ✅ Password reset emails
- ✅ Friend invitation emails
- ✅ Custom HTML email templates
- ✅ Brevo API integration
- ✅ Email delivery tracking

#### Email Configuration
- ✅ SPF records configured
- ✅ DKIM authentication
- ✅ DMARC policy
- ✅ Custom sender domain (admin@mxn.chat)
- ✅ Cloudflare DNS management
- ✅ Email routing setup (pending MX records)

---

### 9. 🗄️ Data Management

#### Database (Supabase PostgreSQL)
- ✅ User profiles table
- ✅ Chat rooms table
- ✅ Messages table
- ✅ Invitations table
- ✅ Attachments metadata table
- ✅ Real-time subscriptions
- ✅ Database migrations
- ✅ RLS policies on all tables

#### Storage
- ✅ Image upload storage
- ✅ File metadata tracking
- ✅ Storage bucket organization
- ✅ Public URL generation
- ✅ Storage RLS policies

#### Data Privacy
- ✅ User data deletion on account removal
- ✅ GDPR-compliant data handling
- ✅ No user tracking without consent
- ✅ Encrypted data in transit
- ✅ Secure data at rest

---

### 10. 📊 Analytics & Monitoring

#### Analytics Events
- ✅ User signup tracking
- ✅ Login event tracking
- ✅ Message sent tracking
- ✅ First message milestone
- ✅ Invitation sent tracking
- ✅ User ID association
- ✅ Event metadata collection

#### Analytics Integration
- ✅ Vercel Web Analytics
- ✅ Custom event tracking
- ✅ User journey tracking
- ✅ Performance metrics
- ✅ Privacy-focused analytics

---

### 11. ⚙️ Settings & Preferences

#### User Settings
- ✅ Display name editing
- ✅ Account deletion option
- ✅ Logout functionality
- ✅ Password change support
- ✅ Email verification resend

#### Application Settings
- ✅ Notification preferences (planned)
- ✅ Theme selection (planned)
- ✅ Language preferences (planned)

---

### 12. 📱 Platform Support

#### Browsers
- ✅ Chrome/Chromium
- ✅ Safari
- ✅ Firefox
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

#### Devices
- ✅ Desktop (Windows, macOS, Linux)
- ✅ Mobile (iOS, Android)
- ✅ Tablet (iPad, Android tablets)
- ✅ Responsive across all screen sizes

---

### 13. 🚀 Deployment & Infrastructure

#### Hosting
- ✅ Vercel edge deployment
- ✅ Automatic deployments from GitHub
- ✅ Environment variable management
- ✅ Custom domain support (mxn.chat)
- ✅ SSL/TLS certificates
- ✅ CDN integration

#### Performance
- ✅ Server-side rendering (SSR)
- ✅ Code splitting
- ✅ Image optimization
- ✅ Lazy loading
- ✅ Edge caching
- ✅ Fast global delivery

---

### 14. 📄 Legal & Compliance

#### Legal Pages
- ✅ Terms of Service page
- ✅ Privacy Policy page
- ✅ Links from signup form
- ✅ User agreement acceptance

#### Compliance
- ✅ GDPR compliance framework
- ✅ Data protection measures
- ✅ User rights implementation
- ✅ Transparent data practices

---

## 🎨 UI Concept Diagram (MVP 1.1.0)

```
MXN.CHAT Interface Layout

+-------------------+-------------------+
|     Sidebar       |     Chat Area     |
+-------------------+-------------------+
| Search: [_______] | [🔵] Alias O      |
|                   |                   |
| #topic (purple)   | Message 1 (24h)   |
| alias (blue)      | Message 2 (24h)   |
|                   |                   |
| Vibes:            |                   |
| 🎮 Gaming Vibe    |                   |
| 💬 Chat Vibe      |                   |
| 🎵 Music Vibe     |                   |
+-------------------+-------------------+

Key Features Illustrated:
1. 🔵 Exclusive aliases with 30-day expiry (prevents hoarding)
2. 🔍 Sidebar search for #topics (purple) and aliases (blue)
3. 🎮 Rooms rebranded as "Vibes" for better UX
4. 🎨 Colored circle avatar representing user's current vibe
5. ⏰ Ephemeral content: Messages/Pictures auto-delete after 24h, Vibes after 3 days
```

---

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom CSS
- **Icons:** Lucide React

### Backend
- **Database:** Supabase PostgreSQL
- **Authentication:** Supabase Auth
- **Realtime:** Supabase Realtime Channels
- **Storage:** Supabase Storage
- **Email:** Brevo API

### Infrastructure
- **Hosting:** Vercel
- **DNS:** Cloudflare
- **Analytics:** Vercel Analytics
- **CI/CD:** GitHub + Vercel

---

## 📈 Current Statistics (MVP 1.1.0)

- **Total Features:** 160+ implemented capabilities
- **API Endpoints:** 3 custom routes + Supabase APIs
- **Database Tables:** 5 core tables with RLS
- **UI Components:** 14 React components
- **Scripts:** 4 utility scripts
- **Deployment Environments:** Development + Production

---

## 🎯 What's NOT Included (Future Phases)

The following are planned but NOT yet implemented:

### Phase 1.5 - Desktop Enhancement
- Popout chat windows
- Window focus management
- Resizable windows
- Mini chat widget

### Phase 2 - Monetization
- Ad integration
- Subscription tiers
- Payment processing
- Usage metering

### Phase 3 - MagicWRX Integration
- One-click embed
- Shared authentication
- Unified billing
- Cross-platform features

### Phase 4 - AI Features
- AI message suggestions
- Thread summaries
- Content moderation AI
- Analytics AI

### Phase 5 - Enterprise
- Team spaces
- Chat export
- Long-term storage
- Advanced admin tools

---

## 🔄 Update Protocol

This document MUST be updated when:
1. New features are deployed to production
2. Features are deprecated or removed
3. Technical stack changes
4. Integration partnerships change
5. Major UI/UX updates occur

**Review Schedule:**
- Weekly: Feature additions/changes
- Monthly: Complete feature audit
- Quarterly: Stack and architecture review

---

## 🔗 Related Documentation

- **[MXN_ROADMAP.md](MXN_ROADMAP.md)** - Development roadmap and phases
- **[MXN_TREE.md](MXN_TREE.md)** - File structure and architecture
- **[MXN_SYSTEM.md](MXN_SYSTEM.md)** - System overview
- **[MXN_SECURITY.md](MXN_SECURITY.md)** - Security practices
- **[MXN_INDEX.md](MXN_INDEX.md)** - Quick reference guide

---

**Last Feature Audit:** December 12, 2025  
**Next Review Due:** December 19, 2025 (Weekly)  
**Document Owner:** MagicWRX Development Team




# 🎮 Emotional Vibe System
**Arcade • Mood • Thought • Safe Sharing**

This document defines a **clean, non-slang emotional color system** designed for:
- Arcade-style UI
- Mood & thought expression
- Safe public sharing
- Long-term brand stability

All labels use **ultra-common everyday language**.

---

## 🌈 Color Spectrum Overview (Warm → Cool → Neutral)

[ Angry ]
🔴
|
[ Frustrated ]
🟠
|
[ Stressed ]
🟧
|
[ Happy ]
🟡
|
[ Excited ]
💗
|
[ Anxious ]
🟣
|
[ Sad ]
🔵
|
[ Calm ]
🟦🟢
|
[ Relaxed ]
🟢
|
[ Tired ]
⚪
|
[ Focused ]
🔷
|
[ Supported ]
🌸

---

## 📊 Mood → Color Chart


| # | Icon | Mood | Color Name | Hex |
|---|------|------|----------|-----|
| 1 | 🔴 | **Angry** | Arcade Red | `#EF4444` |
| 2 | 🟠 | **Frustrated** | Burnt Orange | `#F97316` |
| 3 | 🟧 | **Stressed** | Amber Orange | `#FB923C` |
| 4 | 🟡 | **Happy** | Golden Yellow | `#FACC15` |
| 5 | 💗 | **Excited** | Hot Pink | `#EC4899` |
| 6 | 🟣 | **Anxious** | Soft Violet | `#A78BFA` |
| 7 | 🔵 | **Sad** | Sky Blue | `#60A5FA` |
| 8 | 🟢 | **Calm** | Teal Mint | `#2DD4BF` |
| 9 | 🟢 | **Relaxed** | Soft Green | `#4ADE80` |
|10 | ⚪ | **Tired** | Neutral Gray | `#6B7280` |
|11 | 🔷 | **Focused** | Cool Indigo | `#6366F1` |
|12 | 🌸 | **Supported** | Rose Soft | `#F472B6` |



| # | Icon | Color | Mood | Color Name | Hex |
|---|------|-------|------|----------|-----|
| 1 | 🔴 | <span style="background-color: #EF4444; width: 20px; height: 20px; display: inline-block; border-radius: 50%; border: 1px solid #333;"></span> | **Angry** | Arcade Red | `#EF4444` |
| 2 | 🟠 | <span style="background-color: #F97316; width: 20px; height: 20px; display: inline-block; border-radius: 50%; border: 1px solid #333;"></span> | **Frustrated** | Burnt Orange | `#F97316` |
| 3 | 🟧 | <span style="background-color: #FB923C; width: 20px; height: 20px; display: inline-block; border-radius: 50%; border: 1px solid #333;"></span> | **Stressed** | Amber Orange | `#FB923C` |
| 4 | 🟡 | <span style="background-color: #FACC15; width: 20px; height: 20px; display: inline-block; border-radius: 50%; border: 1px solid #333;"></span> | **Happy** | Golden Yellow | `#FACC15` |
| 5 | 💗 | <span style="background-color: #EC4899; width: 20px; height: 20px; display: inline-block; border-radius: 50%; border: 1px solid #333;"></span> | **Excited** | Hot Pink | `#EC4899` |
| 6 | 🟣 | <span style="background-color: #A78BFA; width: 20px; height: 20px; display: inline-block; border-radius: 50%; border: 1px solid #333;"></span> | **Anxious** | Soft Violet | `#A78BFA` |
| 7 | 🔵 | <span style="background-color: #60A5FA; width: 20px; height: 20px; display: inline-block; border-radius: 50%; border: 1px solid #333;"></span> | **Sad** | Sky Blue | `#60A5FA` |
| 8 | 🟢 | <span style="background-color: #2DD4BF; width: 20px; height: 20px; display: inline-block; border-radius: 50%; border: 1px solid #333;"></span> | **Calm** | Teal Mint | `#2DD4BF` |
| 9 | 🟢 | <span style="background-color: #4ADE80; width: 20px; height: 20px; display: inline-block; border-radius: 50%; border: 1px solid #333;"></span> | **Relaxed** | Soft Green | `#4ADE80` |
|10 | ⚪ | <span style="background-color: #6B7280; width: 20px; height: 20px; display: inline-block; border-radius: 50%; border: 1px solid #333;"></span> | **Tired** | Neutral Gray | `#6B7280` |
|11 | 🔷 | <span style="background-color: #6366F1; width: 20px; height: 20px; display: inline-block; border-radius: 50%; border: 1px solid #333;"></span> | **Focused** | Cool Indigo | `#6366F1` |
|12 | 🌸 | <span style="background-color: #F472B6; width: 20px; height: 20px; display: inline-block; border-radius: 50%; border: 1px solid #333;"></span> | **Supported** | Rose Soft | `#F472B6` |

---

## 🎛️ Emotional Axes (Internal Model)

Tone (Negative → Positive)
───────────────────────────▶

Angry     Happy     Supported
|         |           |
|         |           |
▼         ▼           ▼
Energy (High → Low)

- **High Energy + Negative** → Angry, Frustrated
- **High Energy + Positive** → Excited
- **Low Energy + Negative** → Sad, Tired
- **Low Energy + Positive** → Calm, Relaxed

---

## 🧩 Replacement Mapping (Slang → Stable)

Chill     ──▶ Relaxed
Hype      ──▶ Excited
Wild      ──▶ Frustrated / Excited
Creative  ──▶ Happy / Focused
Support   ──▶ Supported
Focus     ──▶ Focused

---

## 🛡️ Safety & Sharing Rules (Recommended)

[ Private Use ]
├─ Angry
├─ Frustrated
├─ Anxious
└─ Sad

[ Public / Shareable ]
├─ Happy
├─ Calm
├─ Relaxed
├─ Focused
└─ Supported

---

## 🎨 UI Implementation Notes

- Use **color + icon + label** (never color alone)
- Use **70–85% opacity** for badges
- Gray (`Tired`) overrides all blends
- Avoid red in passive UI states

---

## ✅ Brand Goals Achieved

✔ Arcade-friendly  
✔ Emotionally intuitive  
✔ Non-slang / timeless  
✔ Safe for all ages  
✔ Share-aware by design  

---

If you want next:
- Tailwind / CSS variable tokens
- Gradient blends between moods
- Dark-mode palette
- Emoji or icon mapping
- Moderation rules by mood

Just say the word.
