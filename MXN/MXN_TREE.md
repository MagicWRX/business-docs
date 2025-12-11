# MXN.CHAT Technical Architecture & File Structure (SSOT)

**Document Date:** December 10, 2025 23:35 CST  
**Last Updated:** December 10, 2025  
**Version:** 2.0.0  
**Status:** Production Active

---

## 🎯 Purpose

This document provides the complete technical architecture and file structure for MXN.CHAT, serving as the Single Source of Truth (SSOT) for the codebase organization, component purposes, and system hierarchy.

---

## 📁 Repository Structure

### Root Level
```
mxn-chat/
├── .env.local                    # Environment variables (gitignored, server-side keys)
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── firebase.json                 # Firebase configuration (legacy, can be removed)
├── firestore.rules               # Firestore rules (legacy, can be removed)
├── firestore.indexes.json        # Firestore indexes (legacy, can be removed)
├── start-local.sh                # Development server launcher
├── check-dns.sh                  # DNS verification script for email
├── verify-brevo-dns.sh           # Brevo DNS verification script
├── supabase-debug-signup.sql     # Supabase debugging script (can be archived)
└── README.md                     # Project documentation

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
│   │   ├── test-email/route.ts   # Email testing endpoint (Supabase)
│   │   ├── test-brevo-direct/route.ts  # Direct Brevo email test
│   │   └── send-invite/route.ts  # Send email invitations
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
│   ├── ChatInterface.tsx         # Main chat UI
│   ├── RoomSidebar.tsx           # Room list sidebar
│   ├── MessageList.tsx           # Message display
│   ├── MessageInput.tsx          # Message composition
│   ├── DebugPanel.tsx            # System diagnostics panel
│   ├── InviteFriendsDialog.tsx   # Email invitation dialog
│   └── NotificationManager.tsx   # Push notification handler
│
├── contexts/                     # React Contexts
│   └── ChatContext.tsx           # Global chat state management
│
├── hooks/                        # Custom React Hooks
│   ├── useAuth.ts                # Authentication hook
│   ├── useRooms.ts               # Room management
│   ├── useMessages.ts            # Message handling
│   └── useNotifications.ts       # Notification preferences
│
├── lib/                          # Utilities & Helpers
│   ├── supabase.ts               # Supabase client initialization
│   ├── analytics.ts              # Analytics tracking (Vercel)
│   └── utils.ts                  # General utilities
│
├── config/                       # Configuration
│   └── server.ts                 # Server-side config (dotenv loading)
│
├── types/                        # TypeScript Definitions
│   └── index.ts                  # Shared type definitions
│
└── styles/                       # Additional Styles
    └── themes/                   # Theme configurations

### Documentation (/docs)
```
docs/
└── EMAIL_SETUP.md                # Complete email setup guide (Brevo + DNS)

### Database (/supabase)
```
supabase/
└── migrations/                   # Database migration scripts
    └── [timestamp]_initial_schema.sql

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
- `messages` - Chat messages with metadata
- `invitations` - Email invitation system
- `attachments` - File upload metadata

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
npm run dev                   # Alternative: direct Next.js start
npm run build                 # Build production bundle
npm start                     # Run production server
```

### Testing & Debugging
```bash
./check-dns.sh                # Verify DNS records for email
./verify-brevo-dns.sh         # Check Brevo domain authentication
```

### Database
```bash
# Run in Supabase SQL Editor:
supabase-debug-signup.sql     # Debug signup errors
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

**Last Architecture Review:** December 10, 2025  
**Next Review Due:** January 10, 2026  
**Document Owner:** MagicWRX Development Team