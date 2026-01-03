# BUSINESS Documentation Index

**Document Date:** December 19, 2025  
**Version:** 2.0.0  
**Status:** Active - Multi-Tenant Platform Architecture  
**Last Updated:** December 19, 2025

---

## Purpose

This directory contains all business-level documentation that applies to the entire Amazing Business ecosystem, covering strategy, architecture, operations, and cross-platform systems.

---

## Document Inventory

### Strategic Planning
- [**BUSINESS_ROADMAP.md**](BUSINESS_ROADMAP.md) - Overall business roadmap with MVP scope, phase planning, and revenue targets
- [**BUSINESS_WORKSPACES.md**](BUSINESS_WORKSPACES.md) - Comprehensive workspace overview with login credentials and setup guides
- [**BUSINESS_ARCHITECTURE_UPDATE_DEC2025.md**](BUSINESS_ARCHITECTURE_UPDATE_DEC2025.md) - December 2025 architecture decisions and updates
 - [**BUSINESS_DATABASE.md**](BUSINESS_DATABASE.md) - Database SSOT for all workspaces (multi-tenant, shared tools, RLS)

### Admin & Operations
- [**BUSINESS_ADMIN.md**](BUSINESS_ADMIN.md) - Master admin dashboard architecture (multi-tenant system for all platforms)
- [**BUSINESS_AI_PROMPT.md**](BUSINESS_AI_PROMPT.md) - AI assistant standards and prompts for development
- [**BUSINESS_SCALABLE_FOUNDATION.md**](BUSINESS_SCALABLE_FOUNDATION.md) - Scalable foundation pathway and implementation strategy
- [**BUSINESS_ENVIRONMENT_MGMT.md**](BUSINESS_ENVIRONMENT_MGMT.md) - Environment variable management across platforms

### Infrastructure & Deployment
- [**BUSINESS_VERCEL.md**](BUSINESS_VERCEL.md) - Vercel deployment strategies and configuration
- [**BUSINESS_EMAIL_BREVO.md**](BUSINESS_EMAIL_BREVO.md) - Brevo email service setup and integration

---

## Key Concepts

### Multi-Tenant Architecture
The business operates on a **multi-tenant platform architecture** with:
- **3 Supabase Instances**: AmazinglyStrange (brian@), MagicWRX (magicwrxstudio@), MXN.CHAT (magicwrxstudio@)
- **Centralized Admin**: Single dashboard at `/ADMIN/` manages all platforms
- **Shared Components**: Reusable libraries in `/SHARED/` (auth-tool, blog-engine, layout-manager, media-library)

### Platform Hierarchy
```
AMAZING BUSINESS
├── MagicWRX (Multi-Tenant SaaS Platform)
│   ├── Unlimited client sites
│   ├── Artist Blog Platform
│   └── Pixel Art Platform (planned)
├── MXN.CHAT (Privacy-First Chat)
│   └── Real-time messaging with aliases
└── AmazinglyStrange (Gaming Community)
    ├── Blog & content
    └── Gaming community features
```

### Admin Access
- **brian@amazinglystrange.com** → AmazinglyStrange admin
- **magicwrxstudio@gmail.com** → MagicWRX + MXN.CHAT admin

---

## Quick Reference

| Document | Purpose | Primary Audience |
|----------|---------|------------------|
| BUSINESS_ROADMAP | Phase planning & milestones | Product, Engineering |
| BUSINESS_ADMIN | Admin dashboard architecture | Engineering, DevOps |
| BUSINESS_WORKSPACES | Workspace overview & credentials | All team members |
| BUSINESS_VERCEL | Deployment strategies | DevOps, Engineering |
| BUSINESS_AI_PROMPT | AI coding standards | Engineering, AI tools |

---

## Related Documentation

- **Platform-Specific**: See `/DOCs/MAGICWRX/`, `/DOCs/MXN/`, `/DOCs/AMS/`
- **Generic Templates**: See `/DOCs/GENERIC/`
- **Code Standards**: See `/DOCs/CODE/`

---

## Maintenance

- **Update Frequency**: Review quarterly or when major architectural changes occur
- **Owner**: Business Operations Team
- **Next Review**: March 19, 2026

---

**Follow BUSINESS_ROADMAP.md, use KISS + YAGNI, and write unit tests.** 🚀
