# MXN.CHAT Master Index (SSOT)

**Document Date:** December 12, 2025  
**Last Updated:** December 12, 2025  
**Version:** 1.1 (MVP 1.1.0 Release)  
**Status:** Active - MVP 1.1.0 Released  
**Compliance:** AI_STANDARDS.md

---

## 🎯 Purpose

This document serves as the **Single Source of Truth (SSOT)** index for all MXN.CHAT documentation, enforcing compliance with AI_STANDARDS.md and providing quick navigation across the technical architecture, business strategy, and operational procedures.

---

## 📋 Required Documents (AI_STANDARDS Compliance)

### Layer 1: Harmony Overview
- **[MXN_INDEX.md](MXN_INDEX.md)** ⭐ **(This Document)** - Central index with executive summary

### Layer 2: Executive Summary & Goals
- **[MXN_SYSTEM.md](MXN_SYSTEM.md)** - Complete system overview, goals, constraints

### Layer 3: Data Flow Diagrams
- **[MXN_ARCHITECTURE_DIAGRAM.md](MXN_ARCHITECTURE_DIAGRAM.md)** - Visual architecture with Mermaid diagrams
- **[MXN_EMAIL_SETUP.md](MXN_EMAIL_SETUP.md)** - Email flow architecture (Brevo API)

### Layer 4: Linux Tree Snapshots
- **[MXN_TREE.md](MXN_TREE.md)** - Complete file structure and component mapping

### Layer 5: Standards Log
- **[MXN_ROADMAP.md](MXN_ROADMAP.md)** - Development phases, sign-off matrix, acceptance criteria

---

## 🔴 Critical Documents (Must Read)

| Document | Purpose | Last Updated | Status |
|----------|---------|--------------|--------|
| **[MXN_SECURITY.md](MXN_SECURITY.md)** | Key management, rotation, E2E testing, SSH setup | Dec 10, 2025 | ✅ Active |
| **[MXN_ROADMAP.md](MXN_ROADMAP.md)** | Development phases, milestones, priorities | Dec 12, 2025 | ✅ Active |
| **[MXN_TREE.md](MXN_TREE.md)** | Technical architecture, file structure SSOT | Dec 12, 2025 | ✅ Active |
| **[MXN_INDEX.md](MXN_INDEX.md)** | This document - central navigation | Dec 12, 2025 | ✅ Active |

---

## 🟡 Important Reference Documents

| Document | Purpose | Last Updated | Status |
|----------|---------|--------------|--------|
| **[MXN_SYSTEM.md](MXN_SYSTEM.md)** | Complete system overview | Dec 10, 2025 | ✅ Active |
| **[MXN_AUTH_SETUP.md](MXN_AUTH_SETUP.md)** | Authentication config (Google OAuth, Supabase) - Complete URL/URI documentation for all environments | Dec 10, 2025 | ✅ Active |
| **[MXN_EMAIL_SETUP.md](MXN_EMAIL_SETUP.md)** | Email configuration (Brevo API, DNS) | Dec 11, 2025 | ✅ Active |
| **[MXN_DEPLOYMENT_CICD.md](MXN_DEPLOYMENT_CICD.md)** | Deployment procedures, CI/CD setup | Dec 6, 2025 | ✅ Active |
| **[MXN_SUPABASE_SCHEMA.md](MXN_SUPABASE_SCHEMA.md)** | Database schema, migrations, RLS policies | Dec 10, 2025 | ✅ Active |

---

## 🟢 Operational Documents (As Needed)

| Document | Purpose | Last Updated | Status |
|----------|---------|--------------|--------|
| **[MXN_BUSINESS_PLAN.md](MXN_BUSINESS_PLAN.md)** | Business strategy, revenue streams | Dec 10, 2025 | ✅ Active |
| **[MXN_SPECS.md](MXN_SPECS.md)** | Technical specifications | Dec 10, 2025 | ✅ Active |
| **[MXN_ARCHITECTURE_DIAGRAM.md](MXN_ARCHITECTURE_DIAGRAM.md)** | Visual system architecture | Dec 10, 2025 | ✅ Active |
| **[MXN_1.0_MARKETING.md](MXN_1.0_MARKETING.md)** | Marketing materials | Dec 10, 2025 | ✅ Active |
| **[MXN_GOOGLE_ADS_SETUP.md](MXN_GOOGLE_ADS_SETUP.md)** | Ad campaign configuration | Dec 10, 2025 | ✅ Active |

---

## 🛠️ CLI Tools & Scripts

### Development Scripts
```bash
# Location: /Users/brianlindahl/Development/Business/Websites/mxn-chat/
./start-local.sh              # Start Next.js dev server (http://localhost:3000)
./setup-recaptcha.sh          # Setup and configure reCAPTCHA for the application
```

### Email & DNS Scripts
```bash
./check-dns.sh                # Verify DNS records for email delivery
./check-auth-dns.sh           # Check authentication and DNS configuration
./verify-brevo-dns.sh         # Validate Brevo domain authentication and DNS setup
```

### Deployment Scripts
```bash
# Location: /Users/brianlindahl/Development/Business/Websites/mxn-chat/scripts/
./scripts/deploy.sh           # Deploy application to production environment
```

### Database Scripts
```bash
supabase-debug-signup.sql     # Debug signup errors with detailed logging
```

### Testing Scripts
```bash
# Location: /Users/brianlindahl/Development/Business/Websites/mxn-chat/scripts/
node scripts/e2e_test.js      # End-to-end smoke tests (manual workflow)
node scripts/check_db.js      # Check database connectivity and health
node scripts/init-rooms.js    # Initialize default chat rooms/vibes
node scripts/verify-brevo-key.js # Verify Brevo API key validity
```

### Email DNS Scripts
```bash
# Location: /Users/brianlindahl/Development/Business/Websites/mxn-chat/scripts/
./scripts/check-email-dns.sh  # Comprehensive email DNS verification
```

---

## 🌐 Live Systems

### Production
- **URL:** https://mxn-chat-dcgsy3rde-magicwrxs-projects.vercel.app
- **Supabase:** Project `opcsbfwqazyzsskuuooz`
- **Email:** admin@mxn.chat (via Brevo)
- **Domain:** mxn.chat (DNS managed by Cloudflare)

### Development
- **Local:** http://localhost:3000
- **Test Email:** http://localhost:3000/test-brevo-direct
- **Test-Page:** http://localhost:3000/test-suite.html
- **Test-Suite:** http://localhost:3000/test-page.html
- **Debug Panel:** http://localhost:3000 (bottom-right icon)
- ** Local Server

---

## 📊 Current Status

### Project Phase
- **Phase:** 1 - Refined MVP (Active)
- **Version:** v1.0.0
- **Last Deploy:** December 10, 2025

### ✅ Recently Completed (December 2025)
- [x] Email delivery via Brevo API (working!)
- [x] Documentation consolidation to DOCs/MXN (SSOT)
- [x] MXN_TREE.md updated with current file structure
- [x] Timestamps added to all core documents
- [x] Legacy Firebase files removed
- [x] AI_STANDARDS.md compliance layer implemented
- [x] MXN_INDEX.md updated with 5-layer structure

### 🚧 In Progress
- [ ] DKIM records configuration in Cloudflare
- [ ] Domain verification in Brevo
- [ ] Login authentication debugging
- [ ] Email inbox delivery testing (not spam)

### 🔜 Next Milestone
- Complete authentication troubleshooting
- Deploy DKIM records for inbox delivery
- User onboarding flow refinement

---

## 🔗 Quick Links

### Dashboards
- [Supabase Dashboard](https://supabase.com/dashboard/project/opcsbfwqazyzsskuuooz)
- [Vercel Dashboard](https://vercel.com/magicwrxs-projects/mxn-chat)
- [Brevo Dashboard](https://app.brevo.com)
- [Brevo Domains](https://app.brevo.com/settings/domains)
- [Brevo Statistics](https://app.brevo.com/statistics/email)
- [Cloudflare DNS](https://dash.cloudflare.com)
- [Google Cloud Console](https://console.cloud.google.com/)

### Repository
- [GitHub Repository](https://github.com/MagicWRX/mxn-chat)
- [Project Files](/Users/brianlindahl/Development/Business/Websites/mxn-chat/)
- [Documentation Root](/Users/brianlindahl/Development/Business/DOCs/MXN/)

---

## 🗂️ Document Organization Principles

### SSOT Enforcement
1. **Single Location:** All authoritative docs in `DOCs/MXN/`
2. **No Duplication:** Remove redundant copies in project directories
3. **Versioning:** Semantic versioning (MAJOR.MINOR.PATCH)
4. **Timestamps:** ISO 8601 format (YYYY-MM-DD)
5. **Status Tags:** Active, Deprecated, Archived, WIP

### Naming Conventions
```
MXN_<CATEGORY>_<SUBCATEGORY>.md    # Multi-word topics
MXN_<CATEGORY>.md                  # Single-word topics
```

**Examples:**
- `MXN_EMAIL_SETUP.md` (email + setup)
- `MXN_SECURITY.md` (single category)
- `MXN_DEPLOYMENT_CICD.md` (deployment + CI/CD)

### Review Schedule
- **Daily:** MXN_ROADMAP.md (during active sprints)
- **Weekly:** MXN_SECURITY.md (key rotation, access review)
- **Monthly:** MXN_TREE.md (architecture changes)
- **Quarterly:** Full documentation audit (this index)

---

## 🗑️ Deprecated & Removed Documentation

### Consolidated into SSOT (December 11, 2025)
- ❌ `/mxn-chat/docs/EMAIL_SETUP.md` → Moved to `DOCs/MXN/MXN_EMAIL_SETUP.md`
- ❌ `/mxn-chat/docs/SECURITY_NOTES.md` → Consolidated into `MXN_SECURITY.md`
- ❌ DOC_INDEX.md → Consolidated into MXN_INDEX.md

### Deleted (Outdated/Redundant)
- ❌ `PROJECT_STATUS.md` - References deprecated Firebase (project uses Supabase)
- ❌ `DEPLOYMENT.md` - Empty file, covered by `MXN_DEPLOYMENT_CICD.md`
- ❌ `MXN_DEBUG.md` - Merged into `MXN_TREE.md`
- ❌ `MXN_SITES.md` - Outdated
- ❌ `MULTI_USER_CHAT_PLAN.md` - Superseded by `MXN_ROADMAP.md`

### Legacy Systems Removed
- ❌ Firebase configuration files
- ❌ Firestore rules and indexes
- ❌ Firebase DataConnect
- ❌ Firebase Functions

---

## 📝 Documentation Maintenance Protocol

### Before Making Changes
1. ✅ Check this index for current document location
2. ✅ Review AI_STANDARDS.md for compliance requirements
3. ✅ Verify document is not deprecated

### During Changes
1. ✅ Update relevant SSOT document
2. ✅ Add timestamp to document header
3. ✅ Update version number if needed
4. ✅ Ensure data flow diagrams reflect changes

### After Changes
1. ✅ Update this index if new docs added
2. ✅ Commit documentation WITH code changes
2. ✅ Verify cross-references still valid
3. ✅ Run validation checklist in document

---

## ✅ AI_STANDARDS.md Compliance Matrix

| Layer | Requirement | Document | Status |
|-------|-------------|----------|--------|
| **1** | Harmony Overview | MXN_INDEX.md | ✅ Complete |
| **2** | Executive Summary | MXN_SYSTEM.md | ✅ Complete |
| **3** | Data Flow Diagrams | MXN_ARCHITECTURE_DIAGRAM.md, MXN_EMAIL_SETUP.md | ✅ Complete |
| **4** | Linux Tree Snapshot | MXN_TREE.md | ✅ Complete |
| **5** | Standards Log | MXN_ROADMAP.md | ✅ Complete |

**Additional Compliance:**
- ✅ SOLID, DRY, KISS, YAGNI, SSOT principles documented
- ✅ Visual aids (tables, diagrams, ASCII boxes) in all docs
- ✅ Accessibility-friendly formatting (short sentences, active voice)
- ✅ Validation checklists in operational docs
- ✅ Timestamps and version numbers standardized

---

## 🧭 Quick Navigation Flowchart

```
┌─────────────────────────────────────────────────┐
│  New to MXN.CHAT?                               │
│  Start Here: MXN_SYSTEM.md                      │
└──────────────────┬──────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
┌───────────────┐     ┌───────────────┐
│  Development  │     │   Business    │
│  MXN_TREE.md  │     │  MXN_BUSINESS │
│  MXN_ROADMAP  │     │  _PLAN.md     │
└───────┬───────┘     └───────────────┘
        │
        ├─── Authentication? → MXN_AUTH_SETUP.md
        │
        ├─── Email Setup? → MXN_EMAIL_SETUP.md
        │
        ├─── Security? → MXN_SECURITY.md
        │
        ├─── Deployment? → MXN_DEPLOYMENT_CICD.md
        │
        └─── Database? → MXN_SUPABASE_SCHEMA.md
```

---

## 📌 Action Reminders

> **Before coding:** Review this index and relevant SSOT documents to ensure alignment with current architecture and standards.

> **After coding:** Update documentation immediately. Never commit code without updating relevant docs.

> **Weekly:** Review MXN_SECURITY.md for key rotation and access control updates.

> **Monthly:** Run documentation audit against this index to identify drift.

---

**Document Owner:** MagicWRX Development Team  
**Next Index Review:** December 18, 2025  
**Compliance Validation:** ✅ Passed AI_STANDARDS.md checklist
