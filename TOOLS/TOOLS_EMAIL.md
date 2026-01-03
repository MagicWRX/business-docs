# TOOLS_EMAIL.md — Customer Branded Email (Option A)

**Status:** SSOT (MVP)  
**Applies to:** MagicWRX SaaS (multi-tenant)  
**Goal:** Let a logged-in MagicWRX customer send email as `admin@customer-domain.com` **without** MagicWRX provisioning mailboxes.

---

## Decision (SSOT)

We implement **Option A: branded sending**, not mailbox provisioning.

- MagicWRX **does not** create inboxes like Google Workspace does.
- Customers must own the domain and manage inbound mail with their provider.
- MagicWRX enables outbound email branding via **Brevo** once DNS is verified.

Canonical runbook (business-level):
- [MAGICWRX_CUSTOMER_BRANDED_EMAIL_OPTION_A.md](../BUSINESS/MAGICWRX_CUSTOMER_BRANDED_EMAIL_OPTION_A.md)

---

## UX surfaces (who sees what)

### 1) ADMIN (operator UI)
Purpose: help you / internal admin verify a customer’s domain control.

- Route: `/admin/magicwrx/clients/[clientId]/email-domains`
- Status: ✅ scaffolded
- What it does:
  - Generates a DNS TXT token
  - Shows Cloudflare DNS instructions
  - Calls the server API to verify TXT propagation

### 2) Customer UI (MagicWRX product UI)
Purpose: self-serve onboarding.

- MVP recommendation: reuse the exact flow from ADMIN but scoped to the logged-in tenant.
- Not implemented yet in this pass (SSOT only).

---

## API (Next.js route handler)

### DNS TXT verification (server-side)
- Route: `/api/dns/check-txt`
- Method: `POST`

Auth (ADMIN):
- Requires `admin_site` cookie
- Requires `Authorization: Bearer <supabase_access_token>`
- Rate limited (light): 30 requests/minute per user+IP
- Body:

```json
{ "name": "_magicwrx-verification.customer-domain.com", "expectedSubstring": "magicwrx-verification=<token>" }
```

- Returns:
  - `verified: boolean`
  - `records: string[]`
  - `matched: string[]`

Notes:
- This endpoint is intentionally generic and does **not** mutate DB.
- Production hardening: ✅ implemented in ADMIN (2025-12-29)
  - Requires ADMIN auth context via `admin_site` cookie
  - Requires `Authorization: Bearer <supabase_access_token>` (validated server-side)
  - Rate limited (light): 30 requests/minute per user+IP
  - Returns `401 UNAUTHORIZED` or `429 RATE_LIMITED` as applicable

Example request:

```bash
curl -sS -X POST \
  -H 'content-type: application/json' \
  -H 'authorization: Bearer <access_token>' \
  --data '{"name":"_magicwrx-verification.customer-domain.com","expectedSubstring":"magicwrx-verification=<token>"}' \
  http://localhost:3005/api/dns/check-txt
```

---

## Customer onboarding steps (MVP)

1) Customer enters `customer-domain.com`
2) MagicWRX generates token `magicwrx-verification=<token>`
3) Customer adds Cloudflare DNS record:
   - Type: `TXT`
   - Name: `_magicwrx-verification`
   - Value: token
4) Customer clicks “Check verification”
5) After verification, customer completes Brevo domain authentication:
   - Publish Brevo-provided DKIM (CNAME)
   - Update SPF to include Brevo (plus any existing providers)
   - Add DMARC at `_dmarc.customer-domain.com`
6) Customer selects allowed sender local-parts (MVP allowlist): `admin`, `support`, `noreply`

---

## Automation vs manual setup (clean MVP stance)

**MVP (recommended): manual DNS + Brevo UI**
- We show customers the DNS records to add.
- They add records in Cloudflare and complete domain setup in Brevo.

**Later (optional): API automation**
- Cloudflare automation requires customer authorization (OAuth app) or API tokens.
- Brevo automation requires a secure per-tenant Brevo sub-account strategy or scoped API keys.
- Both add meaningful support/security complexity; keep out of MVP unless required.

---

## Related docs
- [TOOLS_ADMIN_LAYOUT.md](TOOLS_ADMIN_LAYOUT.md) — shared admin shell (available; ADMIN currently uses its own layout)
- [SHARED_TOOLS_ROADMAP.md](SHARED_TOOLS_ROADMAP.md) — add/track email tool workstream here
