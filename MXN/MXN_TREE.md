# MXN.CHAT Technical Architecture & File Structure (SSOT)

**Document Date:** December 13, 2025 12:00 CST  
**Last Updated:** December 13, 2025  
**Version:** 2.2.0  
**Status:** Production Active

---

## 🎯 Purpose

This document provides the complete technical architecture and file structure for MXN.CHAT, serving as the Single Source of Truth (SSOT) for the codebase organization, component purposes, and system hierarchy.

---

## 📁 Repository Structure

### Root Level
```
mxn-chat/
├── .DS_Store
├── .env.example
├── .env.local                    # Environment variables (gitignored, server-side keys)
├── .env.local.example
├── .firebaserc
├── .git/
├── .github/
├── .gitignore                    # Git ignore rules
├── .next/
├── .vercel/
├── README.md                     # Project documentation
├── SUPABASE_MIGRATION.md
├── _legacy/                      # Old implementation files
├── check-auth-dns.sh
├── check-dns.sh                  # DNS verification script for email
├── docs/                         # Documentation
├── next-env.d.ts
├── next.config.js                # Next.js configuration
├── node_modules/
├── out/                          # Build output
├── package-lock.json
├── package.json                  # Dependencies and scripts
├── postcss.config.js
├── public/                       # Static assets
├── scripts/                      # Utility scripts
├── server.log
├── setup-recaptcha.sh
├── src/                          # Source code
├── start-local.sh                # Development server launcher
├── supabase/                     # Database migrations and config
├── supabase-debug-signup.sql     # Supabase debugging script
├── supabase-fix-all.sql
├── tailwind.config.js            # Tailwind CSS configuration
├── test-firestore.js
├── test-message.js
├── tmp/
├── trace-config.sh
├── tsconfig.json                 # TypeScript configuration
├── tsconfig.tsbuildinfo
├── verify-brevo-dns.sh           # Brevo DNS verification script
└── verify-deployment.js

### Source Code (/src)
```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Homepage (AuthForm or ChatInterface)
│   ├── globals.css               # Global styles
│   ├── error.tsx                 # Error boundary
│   ├── global-error.tsx          # Global error handler
│   │
│   ├── api/                      # API Routes (Server-side)
│   │   ├── contact/route.ts      # Contact form submission
│   │   ├── delete-account/route.ts # Account deletion
│   │   ├── test-email/route.ts   # Email testing endpoint (Supabase)
│   │   ├── test-brevo-direct/route.ts  # Direct Brevo email test
│   │   └── send-invite/route.ts  # Send email invitations
│   │
│   ├── contact/                  # Contact page
│   │   └── page.tsx              # Contact form UI
│   │
│   ├── test-email/page.tsx       # Email test UI
│   ├── test-brevo-direct/page.tsx # Brevo direct test UI
│   ├── test/page.tsx             # General test page
│   │
│   ├── invite/                   # Invitation system
│   │   ├── page.tsx              # Invite friends interface
│   │   └── [token]/page.tsx      # Accept invitation by token
│   │
│   └── dev/                      # Developer tools
│       └── outbox/page.tsx       # Email outbox for testing
│
├── components/                   # React Components
│   ├── AuthForm.tsx              # Login/Signup form with Google OAuth
│   ├── BillingDashboard.tsx      # Billing and subscription management
│   ├── ChatInterface.tsx         # Main chat UI
│   ├── CreateChannelDialog.tsx   # Dialog for creating new channels
│   ├── DebugPanel.tsx            # System diagnostics panel
│   ├── FileUpload.tsx            # File upload with drag-and-drop
│   ├── FriendsPanel.tsx          # Friends list panel
│   ├── ImageGallery.tsx          # Image gallery viewer
│   ├── InvitationPage.tsx        # Invitation acceptance page
│   ├── InviteFriendsDialog.tsx   # Email invitation dialog
│   ├── LinkPreview.tsx           # Rich link previews
│   ├── MessageInput.tsx          # Message composition
│   ├── MessageList.tsx           # Message display
│   ├── MessageSearch.tsx         # Message search interface
│   ├── NotificationSettings.tsx  # Notification preferences
│   ├── PaymentModal.tsx          # Payment processing modal
│   ├── ProfileSettings.tsx       # User profile management
│   ├── ReactionPicker.tsx        # Emoji reaction selector
│   ├── ReportUserDialog.tsx      # User reporting interface
│   ├── RoomSidebar.tsx           # Room list sidebar
│   ├── SearchInterface.tsx       # Global search component
│   ├── ThemeSelector.tsx         # Theme selection component
│   ├── TypingIndicator.tsx       # "User is typing..." display
│   └── UserBlockMute.tsx         # Block/mute user controls
│
├── contexts/                     # React Contexts
│   └── ChatContext.tsx           # Global chat state management
│
├── hooks/                        # Custom React Hooks
│   ├── usePushNotifications.ts   # Push notification hook
│   ├── useFileUpload.ts          # File upload management
│   ├── useMessageSearch.ts       # Message search functionality
│   ├── useTypingIndicator.ts     # Typing indicator logic
│   ├── useMessageReactions.ts    # Message reactions handling
│   └── useUserBlocking.ts        # User blocking/muting logic
│
├── lib/                          # Utilities & Helpers
│   ├── supabase.ts               # Supabase client initialization
│   ├── analytics.tsx             # Analytics tracking (Vercel)
│   ├── billingSystem.ts          # Billing and payment logic
│   ├── defaultRooms.ts           # Default room configurations
│   ├── linkPreview.ts            # Link preview generation
│   ├── mediaProcessing.ts        # Media file processing
│   ├── messageParser.ts          # Message parsing (@mentions, links)
│   ├── rateLimiter.ts            # Rate limiting utilities
│   ├── reactionUtils.ts          # Message reaction utilities
│   ├── sanitization.ts           # Input sanitization
│   ├── searchUtils.ts            # Search functionality helpers
│   ├── userUtils.ts              # User-related utilities
│   └── utils.ts                  # General utilities
│
├── config/                       # Configuration
│   └── server.ts                 # Server-side config (dotenv loading)
│
├── types/                        # TypeScript Definitions
│   └── chat.ts                   # Chat-related type definitions (expanded for P1 features: MessageReactions, LinkPreviews, UserBlocks, TypingIndicators, etc.)
│
└── styles/                       # Additional Styles
    └── themes/                   # Theme configurations
        ├── gaming-v1-stable.css  # Stable gaming theme
        ├── gaming-v2-cyberpunk.css # Cyberpunk theme
        └── gaming-v3-retro.css   # Retro theme

### Static Assets (/public)
```
public/
├── browser-test.js
├── icon-192x192.png
├── icon-512x512.png
├── manifest.json
├── sw.js
├── test-page.html
└── test-suite.html
```

### Scripts (/scripts)
```
scripts/
├── check-email-dns.sh            # Email DNS verification
├── check_db.js                   # Database connectivity check
├── deploy.sh                     # Production deployment
├── dev-manager.sh                # Development environment control
├── e2e_test.js                   # End-to-end user flow tests
├── e2e_invite_flow.js            # E2E invite signup flow tests
├── e2e_lifecycle.js              # E2E lifecycle tests (invite, CRUD, public)
├── health-check.sh               # System validation & diagnostics
├── init-rooms.js                 # Initialize default rooms
├── provision_branch_protection.sh # GitHub branch protection setup
├── rollback_migrations.sh        # Database migration rollback helper
├── test_rls.js                   # RLS policy validation tests
└── verify-brevo-key.js           # Brevo API key validation
```

### Documentation (/docs)
```
docs/
└── EMAIL_SETUP.md                # Complete email setup guide (Brevo + DNS)

### Database (/supabase)
```
supabase/
├── .gitignore
├── .temp/
├── config.toml
├── migrations/                   # Database migration scripts
│   ├── 20251206000000_initial_schema.sql
│   ├── 20251206221554_setup_storage_bucket.sql
│   ├── 20251208_add_invitations_table.sql
│   ├── 20251212_add_room_members_table.sql
│   ├── 20251213_add_p1_features.sql          # Message reactions, link previews, user blocks
│   ├── 20251214_add_vibe_system.sql           # Vibe aliases, settings, moderation
│   └── 20251215_add_advanced_features.sql     # Bookmarks, pins, encryption metadata

### Legacy/Deprecated (To Be Removed)
```
_legacy/                          # Old implementation files
firebase.json                     # Firebase config (replaced by Supabase)
firestore.rules                   # Firestore rules (replaced by Supabase RLS)
firestore.indexes.json            # Firestore indexes (no longer needed)
dataconnect/                      # Firebase DataConnect (deprecated)
dataconnect-generated/            # Generated Firebase code (deprecated)
functions/                        # Firebase Functions (replaced by Vercel Edge)
```

---

## 🏗️ Architecture Layers

### 1. Frontend Layer (Next.js 15 + React 19)
- **Framework:** Next.js App Router with TypeScript
- **Styling:** Tailwind CSS + Custom CSS
- **Components:** Modular React components
- **State:** React Context API (ChatContext)
- **Real-time:** Supabase Realtime subscriptions

### 2. API Layer (Vercel Edge Functions)
- **Authentication:** Supabase Auth (Email/Password + Google OAuth)
- **Email:** Brevo API for transactional emails
- **File Upload:** Supabase Storage
- **Rate Limiting:** (Planned - Edge Middleware)

### 3. Database Layer (Supabase PostgreSQL)
**Tables:**
- `users` - User profiles and authentication
- `rooms` - Chat rooms/conversations  
- `room_members` - Room membership join table (Dec 12, 2025)
- `messages` - Chat messages with metadata
- `invitations` - Email invitation system
- `attachments` - File upload metadata
- `debug_logs` - Debug logging (service_role only)

**Planned Tables (Phase 1.6+):**
- `vibes` - User vibe/persona system with aliases
- `vibe_room_assignments` - Vibe-to-room mappings
- `privacy_settings` - User privacy controls
- `trust_relationships` - Trust-gated sharing
- `message_encryption_metadata` - E2E encryption & TTL
- `message_threads` - Reply threading
- `message_bookmarks` - Saved messages
- `pinned_messages` - Room announcements
- `room_moderation_logs` - Moderation actions
- `message_reactions` - Emoji reactions on messages
- `link_previews` - Cached rich link previews
- `user_blocks` - User blocking/muting relationships
- `user_reports` - User reporting system
- `vibe_aliases` - User alias management by vibe
- `moderation_logs` - AI moderation actions

**Security:** Row Level Security (RLS) policies on all tables

### 4. Storage Layer (Supabase Storage)
- **Bucket:** `attachments` - User uploaded files (images, etc.)
- **Access Control:** RLS policies
- **Cleanup:** Automated deletion (planned)

### 5. Email Layer (Brevo)
- **Provider:** Brevo Transactional Email API
- **Sender:** admin@mxn.chat
- **DNS:** SPF, DKIM, DMARC configured in Cloudflare
- **Templates:** Custom HTML emails

### 6. Analytics Layer
- **Provider:** Vercel Web Analytics
- **Events:** Login, Signup, Message Send, Invite Send
- **Privacy:** GDPR compliant

---

## 🔧 Development Tools & Scripts

### Local Development
```bash
./start-local.sh              # Start Next.js dev server (http://localhost:3000)
./scripts/dev-manager.sh start # Unified dev environment control (RECOMMENDED)
./scripts/health-check.sh     # System validation & diagnostics
npm run dev                   # Alternative: direct Next.js start
npm run build                 # Build production bundle
npm start                     # Run production server
npm run type-check            # TypeScript validation
```

### Testing & Validation
```bash
npm run test:rls              # RLS policy validation
npm run test:e2e:invite       # E2E invite flow tests
npm run test:e2e:lifecycle    # E2E lifecycle tests
npm run ci:pr                 # Full PR validation suite
./check-dns.sh                # Verify DNS records for email
./check-auth-dns.sh           # Comprehensive auth & DNS validation
./verify-brevo-dns.sh         # Check Brevo domain authentication
./setup-recaptcha.sh          # Setup reCAPTCHA
```

### Utility Scripts
```bash
./scripts/check_db.js          # Check database connectivity
./scripts/deploy.sh            # Deploy to production
./scripts/init-rooms.js        # Initialize default rooms
./scripts/verify-brevo-key.js  # Verify Brevo API key
./scripts/provision_branch_protection.sh # Setup GitHub branch protection
npm run provision:branch-protection      # Run branch protection setup
```

### Database & Migrations
```bash
# Run in Supabase SQL Editor or via CLI:
supabase-debug-signup.sql     # Debug signup errors
supabase-fix-all.sql          # Fix all known issues

# Migration management:
npx supabase db push --linked  # Push migrations to remote DB
npx supabase db dump --linked  # Backup remote database
npm run rollback:migrations    # Rollback all migrations (requires psql)
./scripts/rollback_migrations.sh <file.sql>  # Rollback specific migration
```

---

## 🌐 Integration Map

### Third-Party Services

| Service | Purpose | Configuration |
|---------|---------|---------------|
| **Supabase** | Database, Auth, Storage, Realtime | Project: `opcsbfwqazyzsskuuooz` |
| **Brevo** | Transactional emails | API Key in `.env.local` |
| **Vercel** | Hosting, Edge Functions, Analytics | Auto-deploy from GitHub |
| **Cloudflare** | DNS management | Domain: `mxn.chat` |
| **Google OAuth** | Social login | Client ID in Supabase |

### Environment Variables (.env.local)
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://opcsbfwqazyzsskuuooz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...           # Public (RLS enforced)
SUPABASE_SERVICE_ROLE_KEY=eyJ...               # Server-side only

# Brevo Email
BREVO_API_KEY=xkeysib-...                      # Server-side only
NEXT_PUBLIC_BREVO_AI_API_KEY=eyJ...            # Client-side (AI features)
```

---

## 📊 Data Flow Architecture

### User Authentication Flow
```
User → AuthForm → Supabase Auth → Database (users table)
                   ↓
              Google OAuth (optional)
                   ↓
              ChatContext (global state)
                   ↓
              ChatInterface (authorized view)
```

### Message Sending Flow
```
User → MessageInput → Supabase INSERT (messages table)
                       ↓
                  RLS Policy Check
                       ↓
                  Realtime Broadcast
                       ↓
                  All Subscribed Clients
                       ↓
                  MessageList Update
```

### Email Invitation Flow
```
User → InviteFriendsDialog → /api/send-invite
                               ↓
                          Create invitation (DB)
                               ↓
                          Brevo API Email
                               ↓
                          Recipient Email
                               ↓
                          /invite/[token]
                               ↓
                          Accept & Signup
```

---

## 🚨 Cleanup & Deprecation Tasks

### To Delete (Legacy Firebase)
- [ ] `firebase.json`
- [ ] `firestore.rules`
- [ ] `firestore.indexes.json`
- [ ] `dataconnect/` directory
- [ ] `dataconnect-generated/` directory
- [ ] `functions/` directory
- [ ] `.firebase/` directory

### To Archive
- [ ] `supabase-debug-signup.sql` → Move to `/scripts/archive/`
- [ ] Old migration files → Consolidate into single schema

### To Consolidate
- [ ] Merge email test pages into single testing interface
- [ ] Remove duplicate diagnostic tools

---

## 🔗 Related Documentation

- **[MXN_SECURITY.md](MXN_SECURITY.md)** - Security practices, key management
- **[MXN_ROADMAP.md](MXN_ROADMAP.md)** - Development phases and milestones
- **[MXN_SYSTEM.md](MXN_SYSTEM.md)** - Complete system overview
- **[MXN_INDEX.md](MXN_INDEX.md)** - Quick reference guide
- **[/docs/EMAIL_SETUP.md](/mxn-chat/docs/EMAIL_SETUP.md)** - Email configuration guide

---

## ✅ SSOT Compliance

**Architecture Changes:**
- All new features must update this document BEFORE implementation
- New database tables require migration script + documentation
- New integrations must be added to Integration Map
- File structure changes must be reflected immediately

**Review Schedule:**
- Weekly: Check for outdated/deprecated code
- Monthly: Verify documentation matches codebase
- Quarterly: Architecture review and optimization

---

**Last Architecture Review:** December 12, 2025  
**Next Review Due:** January 12, 2026  
**Document Owner:** MagicWRX Development Team