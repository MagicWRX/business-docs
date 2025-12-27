# MXN.CHAT Documentation Index

**Platform:** MXN.CHAT - Ephemeral Privacy Chat Platform  
**Purpose:** Complete documentation catalog for the MXN.CHAT privacy-first messaging platform  
**Last Updated:** December 2025  
**Total Documents:** 29

---

## 📋 Purpose & Scope

This index catalogs all documentation for **MXN.CHAT**, the ephemeral privacy chat platform featuring:
- **Zero-retention messaging** - Messages auto-delete after 24 hours
- **Alias-based identity** - No real names required
- **Vibe-based matching** - Connect with similar-minded users
- **Room-based chat** - Public lounges and private spaces
- **Real-time subscriptions** - Live typing indicators and presence
- **Google OAuth & email auth** - Secure authentication via Supabase

This documentation covers:
- Platform specifications and features
- System architecture and database schema
- Deployment pipelines and CI/CD
- Security policies and testing strategies
- Business planning and marketing
- Admin tools and moderation

---

## 📚 Document Inventory by Category

### Core Platform Documentation

| Document | Purpose | Status | Key Topics |
|----------|---------|--------|------------|
| [MXN_INDEX.md](MXN_INDEX.md) | Master platform overview | Active | Quick links, feature summary |
| [MXN_SPECS.md](MXN_SPECS.md) | Detailed technical specifications | Active | Features, constraints, tech stack |
| [MXN_SYSTEM.md](MXN_SYSTEM.md) | System architecture | Active | Components, data flow, integrations |
| [MXN_CHAT.md](MXN_CHAT.md) | Chat features and behavior | Active | Messaging, rooms, ephemeral logic |
| [MXN_FEATURES.md](MXN_FEATURES.md) | Feature catalog | Active | User features, admin tools, roadmap |
| [MXN_DESIGN.md](MXN_DESIGN.md) | UI/UX design system | Active | Components, themes, mobile-first |

### Architecture & Database

| Document | Purpose | Status | Key Topics |
|----------|---------|--------|------------|
| [MXN_ARCHITECTURE_DIAGRAM.md](MXN_ARCHITECTURE_DIAGRAM.md) | Visual architecture | Active | System diagrams, component relationships |
| [MXN_SUPABASE_SCHEMA.md](MXN_SUPABASE_SCHEMA.md) | Database schema | **Critical** | Tables, RLS policies, indexes |
| [MXN_SUPABASE_DB_SSOT.md](MXN_SUPABASE_DB_SSOT.md) | Database SSOT | **Critical** | Single source of truth for DB |
| [MXN_SUPABASE_MIGRATION.md](MXN_SUPABASE_MIGRATION.md) | Database migrations | Active | Migration scripts, version history |
| [MXN_TREE.md](MXN_TREE.md) | File tree structure | Reference | Codebase organization |

### Deployment & Operations

| Document | Purpose | Status | Key Topics |
|----------|---------|--------|------------|
| [MXN_DEPLOYMENT_CICD.md](MXN_DEPLOYMENT_CICD.md) | CI/CD pipeline | Active | Vercel deployment, automation |
| [MXN_AUTH_SETUP.md](MXN_AUTH_SETUP.md) | Authentication setup | Active | Supabase Auth, OAuth config |
| [MXN_EMAIL_SETUP.md](MXN_EMAIL_SETUP.md) | Email configuration | Active | Brevo/SMTP, verification emails |
| [MXN_GOOGLE_ADS_SETUP.md](MXN_GOOGLE_ADS_SETUP.md) | Google Ads integration | Active | Ad campaigns, tracking |
| [MXN_DEBUG.md](MXN_DEBUG.md) | Debugging guide | Active | Common issues, troubleshooting |

### Security & Testing

| Document | Purpose | Status | Key Topics |
|----------|---------|--------|------------|
| [MXN_SECURITY.md](MXN_SECURITY.md) | Security policies | **Critical** | RLS, auth, data protection |
| [MXN_TESTING.md](MXN_TESTING.md) | Testing strategy | Active | E2E tests, unit tests, validation |
| [MXN_ABTESTING.md](MXN_ABTESTING.md) | A/B testing framework | Active | Feature flags, experiments |

### Business & Planning

| Document | Purpose | Status | Key Topics |
|----------|---------|--------|------------|
| [MXN_ROADMAP.md](MXN_ROADMAP.md) | Product roadmap | **Critical** | Milestones, features, timeline |
| [MXN_BUSINESS_PLAN.md](MXN_BUSINESS_PLAN.md) | Business strategy | Active | Revenue model, market analysis |
| [MXN_1.0_MARKETING.md](MXN_1.0_MARKETING.md) | Marketing strategy | Active | Launch plan, user acquisition |
| [MXN_LIFECYCLE.md](MXN_LIFECYCLE.md) | User lifecycle | Active | Onboarding, retention, churn |

### Features & Functionality

| Document | Purpose | Status | Key Topics |
|----------|---------|--------|------------|
| [MXN_VIBE_CONTROLLER.md](MXN_VIBE_CONTROLLER.md) | Vibe matching system | **Critical** | Algorithm, preferences, matching |
| [MXN_LOUNGE.md](MXN_LOUNGE.md) | Lounge (public rooms) | Active | Default rooms, room types |
| [TOPIC_DISSIPATION_SSOT.md](TOPIC_DISSIPATION_SSOT.md) | Ephemeral content logic | Active | Auto-delete rules, retention |

### Admin & Management

| Document | Purpose | Status | Key Topics |
|----------|---------|--------|------------|
| [MXN_ADMIN.md](MXN_ADMIN.md) | Admin dashboard | Active | User management, moderation |
| [MXN_SOLUTIONS.md](MXN_SOLUTIONS.md) | Problem solutions | Reference | Troubleshooting, fixes |
| [MXN_DOCUMENTATION_CONSOLIDATION.md](MXN_DOCUMENTATION_CONSOLIDATION.md) | Docs organization | Meta | This consolidation effort |

### Version-Specific

| Directory | Purpose | Status |
|-----------|---------|--------|
| [MVP_1.0/](MVP_1.0/) | MVP version docs | Archive | Initial launch documentation |

---

## 🗂️ Quick Reference Tables

### By Development Phase

| Phase | Documents | Focus |
|-------|-----------|-------|
| **Planning** | ROADMAP, BUSINESS_PLAN, 1.0_MARKETING | Strategy and timeline |
| **Architecture** | SYSTEM, ARCHITECTURE_DIAGRAM, SUPABASE_SCHEMA | Technical design |
| **Implementation** | SPECS, FEATURES, CHAT, DESIGN | Build features |
| **Deployment** | DEPLOYMENT_CICD, AUTH_SETUP, EMAIL_SETUP | Launch prep |
| **Operations** | ADMIN, DEBUG, TESTING, SECURITY | Maintenance |

### By User Type

| User Role | Recommended Reading Order |
|-----------|--------------------------|
| **New Developer** | INDEX → SPECS → SYSTEM → SUPABASE_SCHEMA → AUTH_SETUP |
| **Product Manager** | ROADMAP → FEATURES → BUSINESS_PLAN → 1.0_MARKETING |
| **DevOps Engineer** | DEPLOYMENT_CICD → AUTH_SETUP → EMAIL_SETUP → DEBUG |
| **Security Auditor** | SECURITY → SUPABASE_SCHEMA → AUTH_SETUP → TESTING |
| **QA Tester** | TESTING → FEATURES → DEBUG → ABTESTING |
| **Admin User** | ADMIN → VIBE_CONTROLLER → LOUNGE → LIFECYCLE |

---

## 🔑 Key Concepts

### Platform Core

- **Ephemeral Messaging**: Messages auto-delete after 24 hours, rooms after 3 days
- **Alias System**: Reserved aliases (Shodai, Mosu, Brian) prevent impersonation
- **Vibe Matching**: Algorithm connects users based on preferences and activity
- **Real-time Chat**: Supabase subscriptions for live updates and typing indicators
- **Zero Knowledge**: No message history retention beyond 24h window

### Technical Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **State**: React Context with useReducer (ChatContext.tsx)
- **Auth**: Supabase Auth with email/password and Google OAuth
- **Hosting**: Vercel with serverless functions
- **Email**: Brevo SMTP for transactional emails

### Database Architecture

- **users** table: Profile data with friends/invites arrays
- **rooms** table: Chat rooms with member arrays, JSONB metadata
- **messages** table: Chat messages with reactions JSONB
- **RLS Policies**: Row-level security enforces access control
- **Snake_case**: DB uses snake_case (author_id), frontend uses camelCase (authorId)

---

## 📖 Related Documentation

### Cross-Platform References

- **Business Docs**: [/DOCs/BUSINESS/DOC_INDEX.md](../BUSINESS/DOC_INDEX.md)
- **Admin System**: [/ADMIN/README.md](../../ADMIN/README.md) - Multi-tenant admin dashboard
- **MagicWRX Docs**: [/DOCs/MAGICWRX/MAGICWRX_DOC_INDEX.md](../MAGICWRX/MAGICWRX_DOC_INDEX.md)

### External Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Production Site**: https://mxn.chat

### Workspace Scripts

Located in `/mxn-chat/` workspace:
- `start-local.sh` - Start local dev server with validation
- `check-auth-dns.sh` - Validate authentication and DNS
- `setup-recaptcha.sh` - Configure reCAPTCHA v3
- `check-dns.sh` - DNS validation for email delivery

---

## 🛠️ Maintenance Guidelines

### Adding New Documentation

1. **Name with MXN_ prefix**: Follow `MXN_SHORT_SUBJECT_TITLE.md` pattern
2. **Place in /DOCs/MXN/**: Keep all MXN docs in this directory
3. **Update this index**: Add to appropriate category table
4. **Link from MXN_INDEX.md**: Add reference in master index
5. **Cross-reference**: Link related docs in "Related Documentation" section

### Updating Existing Docs

1. **Update "Last Updated" date** in document header
2. **Document changes** in CHANGELOG section if present
3. **Update this index** if document purpose/status changes
4. **Notify team** of critical documentation updates (ROADMAP, SECURITY, SCHEMA)

### Documentation Status Levels

- **Critical** - Must be reviewed before any deployment
- **Active** - Current and maintained documentation
- **Reference** - Historical or supplementary information
- **Archive** - Preserved for reference, not actively maintained
- **Meta** - Documentation about documentation

### Review Cadence

- **Weekly**: ROADMAP, ADMIN, DEBUG
- **Monthly**: SPECS, FEATURES, SYSTEM
- **Quarterly**: BUSINESS_PLAN, SECURITY, ARCHITECTURE_DIAGRAM
- **As-needed**: Setup guides, testing docs, marketing

---

## 📝 Document Health Status

| Category | Total Docs | Up-to-Date | Needs Review | Last Audit |
|----------|-----------|------------|--------------|------------|
| Core Platform | 6 | 6 | 0 | Dec 2025 |
| Architecture & DB | 5 | 5 | 0 | Dec 2025 |
| Deployment | 5 | 5 | 0 | Dec 2025 |
| Security & Testing | 3 | 3 | 0 | Dec 2025 |
| Business | 4 | 4 | 0 | Dec 2025 |
| Features | 3 | 3 | 0 | Dec 2025 |
| Admin | 3 | 3 | 0 | Dec 2025 |
| **Total** | **29** | **29** | **0** | **Dec 2025** |

---

## 🎯 Documentation Roadmap

### Short-term (Next Sprint)
- [ ] Update MXN_FEATURES.md with new vibe matching algorithm
- [ ] Add MXN_API.md for API endpoint documentation
- [ ] Create MXN_MOBILE.md for mobile-specific considerations

### Mid-term (Next Quarter)
- [ ] Comprehensive MXN_SECURITY_AUDIT.md
- [ ] MXN_PERFORMANCE.md with optimization guidelines
- [ ] MXN_ANALYTICS.md for tracking and metrics

### Long-term (Next Year)
- [ ] MXN_SCALING.md for growth planning
- [ ] MXN_INTERNATIONALIZATION.md for multi-language support
- [ ] MXN_COMPLIANCE.md for GDPR/CCPA

---

**Last Reviewed:** December 2025  
**Next Review:** January 2026  
**Maintained By:** Brian Lindahl (@MagicWRX)  
**Platform Status:** ✅ Active Development
