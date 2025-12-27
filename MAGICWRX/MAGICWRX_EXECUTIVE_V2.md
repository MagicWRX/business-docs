# MAGICWRX_EXECUTIVE_V2.md

**Purpose:** Executive summary and foundational platform decisions (security, modularity, scale).

**Date Created:** December 20, 2025  
**Last Updated:** December 20, 2025

---

## Executive Summary

MagicWRX is a multi-tenant SaaS platform that operates as a **control plane** for provisioning and operating many customer websites (including customer-owned domains). The platform is designed so that tenant isolation, permissions, and entitlements are enforced at the data and service layer—not just in UI.

---

## Goals

1. **Security:** Tenant-safe by default (no cross-tenant reads/writes), safe auth flows across custom domains.
2. **Modularity:** Shared UI/tooling that can be reused across products without coupling env/secrets.
3. **Scale:** Support many customer sites, plan-based gating, and predictable deploy/ops.

---

## Foundational Architecture (Recommended Baseline)

### 1) Control Plane (MagicWRX)

Owns:
- Authentication (email/password + Google OAuth)
- Billing/subscriptions, plan enforcement
- Tenant provisioning (create client, domains, entitlements)
- Admin operations (support, moderation, customer management)

Canonical tenant identity:
- `client_id`

### 2) Customer Site Runtime (Base Template / “Shell”)

Owns:
- Customer website UX and rendering
- Tenant theming and tool execution

Tenant-specific values are loaded by `client_id` from the control plane database:
- Theme tokens
- Enabled tools
- Plan limits
- Domain mappings

### 3) Shared Packages / Shared Tools

Owns:
- Reusable components and modules

Contract:
- Every tenant-owned data record includes `client_id`
- RLS (and/or server-side policy checks) must enforce tenant membership
- Tools must check entitlements server-side for write operations

---

## Authentication for Customer-Owned Domains (Google OAuth)

### Best long-term approach: Central Auth Domain + Handoff

Because Google OAuth redirect URIs do not scale to “unlimited customer domains” (no wildcard redirect URIs), the recommended approach is:

- All OAuth flows happen on a single first-party origin, e.g. `auth.magicwrx.com`
- Customer sites (`company.com`, `company.magicwrx.com`) redirect to the auth domain for login
- After successful login, the control plane issues a short-lived **one-time exchange token** and redirects back to the customer domain

This prevents per-customer Google OAuth configuration and keeps the redirect allowlist small.

### Google OAuth credential strategy

Best practice:
- **One Google OAuth Client per Supabase project per environment (dev/prod)**

Example naming:
- `magicwrx-auth-dev`, `magicwrx-auth-prod`
- `mxn-auth-dev`, `mxn-auth-prod`
- `amazinglystrange-auth-dev`, `amazinglystrange-auth-prod`

This improves blast-radius isolation and reduces operational coupling.

---

## Environment Variables Ownership (\.env.local strategy)

Environment variables are owned by the **deployable runtime**, not by ADMIN or SHARED.

Rules:

1. **Each deployable Next.js app has its own `.env.local` (local) and Vercel env vars (deploy).**
   - MagicWRX: its own env
   - ADMIN: its own env
   - Customer runtime:
     - If you run a *single multi-tenant* runtime deployment, it has one env.
     - If you run *per-customer deployments*, each deployment has its own env.

2. **SHARED packages do not own `.env.local`.**
   - SHARED can define and validate required env keys, but it must not contain secrets.

3. **Customers do not get a per-customer `.env.local` in the standard multi-tenant model.**
   - Tenant configuration belongs in the DB keyed by `client_id`.
   - Secrets stay in server environments (Vercel env vars) on MagicWRX/control plane.

4. **ADMIN does not provide env vars to other apps at runtime.**
   - ADMIN can automate provisioning (e.g., setting Vercel env vars via API) but runtime ownership still applies.

---

## Gating: Reads/Writes, Tools, and Storage

### Data (read/write)

Baseline enforcement:
- Add `client_id` to every tenant-owned table
- Enforce Row Level Security (RLS) to restrict rows to tenant membership
- Never rely on UI-only gating

### Tools / entitlements

- Store entitlements per `client_id` (plan + enabled tools)
- Enforce entitlements server-side for any action that mutates data or consumes paid resources

### Storage / “disk space” quotas

- Use tenant-scoped storage paths (e.g., `client_id/...`) and RLS policies
- Track usage per `client_id` in a table
- Enforce quota in a server upload route / edge function (check usage + plan limit before accepting upload)

---

## Staging → Live

Recommended minimum:
- Vercel Preview (staging) and Production (live)
- Separate Supabase projects for staging vs production
- Tenant domains can map to staging and production independently

---

## Acceptance Criteria (Platform Foundation)

- [ ] Tenant safety enforced by `client_id` + RLS
- [ ] Custom domains supported without per-tenant Google OAuth configuration
- [ ] Entitlements enforced server-side (writes and paid operations)
- [ ] Env hygiene: no secrets committed; runtime owns env; tenant config in DB
