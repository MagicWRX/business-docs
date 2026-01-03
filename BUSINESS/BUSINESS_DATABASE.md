# BUSINESS_DATABASE.md — Business Database SSOT

**Document Date:** December 20, 2025  
**Version:** 1.0.0  
**Status:** Active (SSOT)  
**Owner:** MagicWRX Development Team  

---

## Purpose

This document is the **Single Source of Truth (SSOT)** for how databases are structured and used across the Amazing Business ecosystem.

It aligns with:
- Multi-tenant platform decisions in **BUSINESS_ARCHITECTURE_UPDATE_DEC2025.md**
- Workspace goals in **BUSINESS_WORKSPACES.md**
- Production DB patterns proven in **MXN_SUPABASE_DB_SSOT.md**

This SSOT defines:
- Which Supabase project holds which data
- The canonical *multi-tenant* model for MagicWRX customer websites and tools
- How `/SHARED` tools must store data to scale across customers
- Baseline RLS expectations and data contracts

---

## Core Principle: Separate “App DB Models” by Business Need

We operate two primary database models:

1) **User-Tenant Model (MXN.CHAT)**
- The "tenant" is the authenticated user: `tenant_id = auth.uid()`
- Fit when data is personal-first and privacy-first.

2) **Client-Tenant Model (MagicWRX Multi-Tenant)**
- The "tenant" is the **customer/client**: `tenant_id = client_id`
- Fit when the platform must serve *unlimited customers* with isolated data.

**Rule:** do not force MXN’s user-tenant assumptions onto customer sites/tools.

---

## Supabase Project Allocation (SSOT)

Per business architecture (Dec 2025):

- **MagicWRX Supabase** (multi-tenant)
  - Holds: all customer sites, tool entitlements, billing metadata, customer content, shared tool data.

- **MXN.CHAT Supabase** (privacy app)
  - Holds: MXN-only chat data, user profiles, rooms, messages, invites, vibes, privacy settings.

- **AmazinglyStrange Supabase**
  - Holds: AS-only community/blog data.

---

## MagicWRX: Canonical Multi-Tenant Data Model

MagicWRX is the platform that provisions customer websites by cloning the **base-template shell** and then enabling **/SHARED tools** per customer.

### Tenant Boundary

- `clients.id` is the canonical tenant key (`client_id`).
- All customer-owned rows MUST be partitioned by `client_id`.

### Canonical Tables (Baseline)

Minimum viable schema to support customer sites + tool gating:

- `clients`
  - `id uuid` (PK)
  - `slug text unique` (used for subdomain/path routing)
  - `email text unique`
  - `plan text` (free/starter/pro/enterprise)
  - `stripe_customer_id text null`
  - timestamps

- `client_users` (membership)
  - `client_id uuid` (FK → clients)
  - `user_id uuid` (FK → auth.users)
  - `role text` ('owner' | 'admin' | 'editor' | 'viewer')
  - composite PK `(client_id, user_id)`

- `client_sites`
  - `id uuid` (PK)
  - `client_id uuid` (FK → clients)
  - `name text`
  - `template_key text` (e.g., 'base-template')
  - `content jsonb` (layout-manager JSON)
  - `published boolean`
  - timestamps

- `client_themes`
  - `client_id uuid` (PK/FK → clients)
  - `tokens jsonb` (CSS variables and semantic tokens)
  - `updated_by uuid`
  - timestamps

- `tool_catalog`
  - `tool_key text` (PK) (e.g., 'auth-tool', 'blog-engine', 'media-library')
  - `name text`
  - `description text`
  - `billing_type text` ('free' | 'one_time' | 'subscription')
  - `status text` ('active' | 'deprecated')

- `client_tools` (entitlements)
  - `client_id uuid` (FK → clients)
  - `tool_key text` (FK → tool_catalog)
  - `enabled boolean`
  - `source text` ('free' | 'trial' | 'purchase' | 'admin')
  - `starts_at timestamptz null`
  - `ends_at timestamptz null`
  - composite PK `(client_id, tool_key)`

This baseline supports:
- Admin-controlled customer onboarding
- Token-driven theming per customer
- Tool gating for `/SHARED` packages

---

## `/SHARED` Tools: Database Contract (SSOT)

`/SHARED` is a library of reusable tools. A tool MUST be able to run for many customers without schema collisions or data leaks.

### Rule 1 — Tenant Key Required
Every tool-owned table MUST include:
- `client_id uuid not null`

### Rule 2 — RLS Required
Every tool-owned table MUST:
- have RLS enabled
- have a policy that enforces tenant isolation

**Example tenant isolation policy (pattern):**
- Allow access when the request user is a member of the client:
  - `exists(select 1 from client_users where client_users.client_id = table.client_id and client_users.user_id = auth.uid())`

### Rule 3 — Tool Table Naming
To avoid collisions across tools, tool tables should use a prefix:
- `tool_blog_posts`, `tool_media_assets`, `tool_layout_pages`

Or a dedicated schema per tool (optional later):
- `blog.posts`, `media.assets`, etc.

KISS recommendation for now: **prefix tables** in `public`.

### Rule 4 — Avoid Hard-Coding Customer UI
Tools should not hard-code colors/styles.
Tools must consume semantic tokens (CSS variables) from the host app (`base-template`) and only use shared UI primitives.

---

## RLS and Role Model (Business Standard)

We standardize two layers of access:

1) **Tenant membership (client_users)**
- Is the user allowed to see/change *any* data for this client?

2) **Role-based authorization**
- If yes, what can they do? (`owner`, `admin`, `editor`, `viewer`)

**Policy guidance:**
- `SELECT`: allow any client member for that row’s client_id
- `INSERT/UPDATE`: restrict to `admin/editor` (or owner)
- `DELETE`: restrict to `owner/admin`, plus allow `service_role` for maintenance

---

## Base Template (“Customer Shell”) + Database Responsibilities

`/Websites/base-template` is the **rudimentary shell** for any customer website.

Database-driven responsibilities for base-template:
- Resolve `client_id` (from subdomain/path/query per chosen routing standard)
- Load `client_themes.tokens` and apply CSS variables
- Determine enabled tools from `client_tools`
- Render `/SHARED` tools only if entitled

Base-template must NOT:
- contain business-specific tables
- contain per-tool schema logic beyond calling shared tool APIs

---

## ASCII Architecture Diagram (Quick Read)

```
                  ┌──────────────────────────┐
                  │          ADMIN           │
                  │ (Central Multi-Tenant)   │
                  └─────────────┬────────────┘
                                │ manages
                                v
                     ┌───────────────────────┐
                     │ MagicWRX Supabase DB  │
                     │  clients / sites      │
                     │  themes / tools       │
                     │  shared tool data     │
                     └─────────────┬─────────┘
                                   │ client_id
                                   v
     ┌──────────────────────────────────────────────────────────┐
     │ Customer Website (deployed from base-template “shell”)    │
     │  - loads theme tokens                                     │
     │  - gates tools based on entitlements                      │
     └──────────────────────────────────────────────────────────┘
                                   ^
                                   │ uses
                      ┌──────────────────────────┐
                      │         /SHARED          │
                      │ blog/layout/media/auth   │
                      └──────────────────────────┘
```

---

## Notes on MXN.CHAT (User-Tenant DB)

MXN.CHAT is intentionally "user-tenant" (data primarily scoped to `auth.uid()`), and uses additional policies/triggers for chat, ephemeral messages, and privacy.

Do not reuse MXN tables for customer sites.
Instead, reuse *patterns* proven by MXN:
- strict RLS everywhere
- join tables for membership
- tests for RLS
- audit logs for admin actions

---

## Operational Guidance

- Schema changes must be migration-based.
- Add RLS tests (like MXN’s approach) for any tenant-scoped table.
- Use `service_role` only for:
  - admin operations
  - backfills/migrations
  - support workflows

---

## Future Extensions (Explicitly Optional)

These are allowed later but not required for MVP:

- Separate schemas per tool (`blog.*`, `media.*`) instead of prefix tables
- Dedicated analytics warehouse
- Event log / audit trail standardization across all platforms

---

**Follow BUSINESS_ROADMAP.md, use KISS + YAGNI, and write unit tests.**
