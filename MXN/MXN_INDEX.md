# MXN.CHAT Master Index (SSOT)

**Last Updated:** December 10, 2025 23:45 CST  
**Version:** 2.0.0 - LEAN Documentation

This document serves as the central index for all MXN.CHAT documentation, scripts, and resources.

---

## 📋 Core Documentation (LEAN & KISS)

### 🔴 Critical (Must Read)
- **[MXN_SECURITY.md](MXN_SECURITY.md)** - Security practices, key management, E2E testing ⭐
- **[MXN_ROADMAP.md](MXN_ROADMAP.md)** - Development phases, milestones, priorities ⭐
- **[MXN_TREE.md](MXN_TREE.md)** - Technical architecture and file structure ⭐

### 🟡 Important (Reference)
- **[MXN_SYSTEM.md](MXN_SYSTEM.md)** - Complete system overview
- **[MXN_BUSINESS_PLAN.md](MXN_BUSINESS_PLAN.md)** - Business strategy and revenue
- **[MXN_SUPABASE_SCHEMA.md](MXN_SUPABASE_SCHEMA.md)** - Database schema and migrations
- **[MXN_AUTH_SETUP.md](MXN_AUTH_SETUP.md)** - Authentication configuration guide

### 🟢 Operational (As Needed)
- **[MXN_SPECS.md](MXN_SPECS.md)** - Technical specifications
- **[MXN_DEPLOYMENT_CICD.md](MXN_DEPLOYMENT_CICD.md)** - Deployment and CI/CD
- **[MXN_ARCHITECTURE_DIAGRAM.md](MXN_ARCHITECTURE_DIAGRAM.md)** - Visual architecture
- **[MXN_1.0_MARKETING.md](MXN_1.0_MARKETING.md)** - Marketing materials
- **[MXN_GOOGLE_ADS_SETUP.md](MXN_GOOGLE_ADS_SETUP.md)** - Ad setup guide

---

## 🔧 Scripts & Tools

### Development Scripts
- **`start-local.sh`** - Start Next.js dev server (http://localhost:3000)
  - Location: `/Users/brianlindahl/Development/Business/Websites/mxn-chat/`
  - Purpose: Smart development server with dependency checking

### Email & DNS Scripts
- **`check-dns.sh`** - Verify DNS records for email delivery
- **`verify-brevo-dns.sh`** - Check Brevo domain authentication status

### Database Scripts
- **`supabase-debug-signup.sql`** - Debug signup errors with logging

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
- **Debug Panel:** http://localhost:3000 (bottom-right icon)

---

## 📊 Current Status

- **Phase:** 1 - Refined MVP (Active)
- **Version:** v1.0.0
- **Last Deploy:** December 10, 2025
- **Next Milestone:** Email domain verification (DKIM setup)

### ✅ Recently Completed
- [x] Email delivery via Brevo API (working!)
- [x] Documentation consolidation (LEAN approach)
- [x] MXN_TREE.md updated with current structure
- [x] Timestamps added to SECURITY and ROADMAP
- [x] Legacy Firebase files removed
- [x] White text on test page fixed

### 🚧 In Progress
- [ ] DKIM records configuration in Cloudflare
- [ ] Domain verification in Brevo
- [ ] Testing email delivery to inbox (not spam)

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

### Documentation
- [Email Setup Guide](/mxn-chat/docs/EMAIL_SETUP.md) - Complete email configuration
- [Supabase Migrations](/mxn-chat/supabase/migrations/) - Database migration scripts

---

## 🗑️ Removed Documentation (December 10, 2025)

**Consolidated/Deleted for LEAN compliance:**
- ❌ MXN_DEBUG.md (merged into MXN_TREE.md)
- ❌ MXN_SITES.md (outdated)
- ❌ SECURITY_NOTES.md (consolidated into MXN_SECURITY.md)
- ❌ MXN.md (generic, info in MXN_SYSTEM.md)
- ❌ MXN_REVIEW.md (outdated strategic review)
- ❌ MULTI_USER_CHAT_PLAN.md (superseded by ROADMAP)

**Legacy Systems Deleted:**
- ❌ Firebase configuration files
- ❌ Firestore rules and indexes
- ❌ Firebase DataConnect
- ❌ Firebase Functions

---

## 📝 Documentation Maintenance

### Review Schedule
- **Daily:** MXN_ROADMAP.md (during active development)
- **Weekly:** MXN_SECURITY.md (key rotation, access review)
- **Monthly:** MXN_TREE.md (architecture changes)
- **Quarterly:** Full documentation audit

### Update Protocol
1. Make code/architecture change
2. Update relevant SSOT document IMMEDIATELY
3. Add timestamp to document header
4. Update this index if needed
5. Commit documentation WITH code changes

---

*This index ensures all MXN.CHAT resources are discoverable and compliant with LEAN/KISS/SSOT principles.*

**Next Index Review:** December 17, 2025
