# MagicWRX SaaS — Customer Branded Email (Option A)

**Status:** SSOT Runbook (MVP)  
**Goal:** Allow a MagicWRX customer to send email *as* `admin@customer-domain.com` without MagicWRX provisioning a mailbox.

---

## What Option A is (and is not)

**Is:** Branded sending of transactional/notification emails (e.g., password reset, purchase receipt, contact form, site publish alerts) where the **From** address is on the customer’s domain.

**Is not:** Creating real inboxes/mailboxes. Customers must already have inbound email handled by their chosen provider (Google Workspace, Microsoft 365, Cloudflare Email Routing, etc.).

---

## Why this fits your architecture

- Matches your multi-tenant/RLS strategy (single Supabase project, tenant-scoped rows).
- Uses Brevo for outbound deliverability and domain authentication.
- Keeps ADMIN as the control surface (site switcher → MagicWRX tenant admin).

---

## Customer onboarding flow (end-to-end)

### 1) Customer adds a domain
UI: MagicWRX (or ADMIN → MagicWRX → Tenant → Email)
- Input: `customer-domain.com`
- Create record `tenant_domains` with `status = pending_verification`

### 2) Prove domain control (DNS TXT)
Generate a random token.
Customer adds DNS:
- Type: `TXT`
- Name/Host: `_magicwrx-verification` (or `@`, but `_magicwrx-verification` is cleaner)
- Value: `magicwrx-verification=<token>`

Backend polls DNS until TXT appears, then:
- Mark domain `status = verified`

### 3) Connect domain to Brevo (domain authentication)
In Brevo:
- Add domain: `customer-domain.com`
- Brevo provides DNS records for:
  - SPF include (usually `include:spf.brevo.com`)
  - DKIM (selectors are **Brevo-provided**, often CNAME)

Customer adds the provided records in Cloudflare (DNS-only / gray cloud).

### 4) Enable “send as admin@…”
Once (a) domain is verified in MagicWRX and (b) Brevo authentication is confirmed:
- Allow customer to create sender identities, e.g. local part `admin`
- Store allowed local parts in `tenant_senders`

### 5) Sending mail (runtime)
When the app sends an email:
- Determine tenant from session / data ownership
- Pick `From: <local_part>@<verified_domain>`
- Send via Brevo API (preferred) or Brevo SMTP

---

## Minimal Supabase schema (MagicWRX project)

This keeps “tenant” as the core boundary and supports multiple users per tenant later.

### Tables

```sql
-- Tenants (your MagicWRX customers)
create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

-- Tenant members (links Supabase auth.users → tenant)
create table if not exists public.tenant_members (
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'owner' check (role in ('owner','admin','member')),
  created_at timestamptz not null default now(),
  primary key (tenant_id, user_id)
);

-- Domains owned by a tenant
create table if not exists public.tenant_domains (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  domain text not null,
  status text not null default 'pending_verification'
    check (status in ('pending_verification','verified','brevo_pending','active','failed')),
  verification_token text not null,
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  unique (tenant_id, domain)
);

-- Allowed sender identities for a tenant
create table if not exists public.tenant_senders (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  domain_id uuid not null references public.tenant_domains(id) on delete cascade,
  local_part text not null,
  from_name text,
  reply_to text,
  is_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  unique (domain_id, local_part)
);

-- Optional audit log for changes
create table if not exists public.tenant_audit_log (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  actor_user_id uuid references auth.users(id) on delete set null,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
```

### RLS policies (MVP-safe)

```sql
alter table public.tenants enable row level security;
alter table public.tenant_members enable row level security;
alter table public.tenant_domains enable row level security;
alter table public.tenant_senders enable row level security;
alter table public.tenant_audit_log enable row level security;

-- Helper: member check via EXISTS
-- (Inline EXISTS is usually enough for MVP; add SQL functions later only if needed.)

create policy "tenant_members_select_own" on public.tenant_members
for select using (user_id = auth.uid());

create policy "tenants_select_if_member" on public.tenants
for select using (
  exists (
    select 1 from public.tenant_members tm
    where tm.tenant_id = tenants.id and tm.user_id = auth.uid()
  )
);

create policy "tenant_domains_crud_if_member" on public.tenant_domains
for all using (
  exists (
    select 1 from public.tenant_members tm
    where tm.tenant_id = tenant_domains.tenant_id and tm.user_id = auth.uid()
  )
) with check (
  exists (
    select 1 from public.tenant_members tm
    where tm.tenant_id = tenant_domains.tenant_id and tm.user_id = auth.uid()
  )
);

create policy "tenant_senders_crud_if_member" on public.tenant_senders
for all using (
  exists (
    select 1 from public.tenant_members tm
    where tm.tenant_id = tenant_senders.tenant_id and tm.user_id = auth.uid()
  )
) with check (
  exists (
    select 1 from public.tenant_members tm
    where tm.tenant_id = tenant_senders.tenant_id and tm.user_id = auth.uid()
  )
);

create policy "tenant_audit_select_if_member" on public.tenant_audit_log
for select using (
  exists (
    select 1 from public.tenant_members tm
    where tm.tenant_id = tenant_audit_log.tenant_id and tm.user_id = auth.uid()
  )
);
```

---

## Operational rules (deliverability + security)

- **One SPF record only:** ensure the customer publishes a *single* TXT record starting with `v=spf1`.
- Require DKIM enabled (Brevo) before allowing branded **From**.
- Default DMARC can start with `p=none` for MVP; encourage `quarantine/reject` later.
- Rate limit per tenant; log sender changes in `tenant_audit_log`.
- Keep an allowlist of local parts for MVP: `admin`, `support`, `noreply`.

---

## What the customer actually does (Cloudflare)

When the UI says “Add these DNS records”, the customer:
- Adds the TXT verification record (`_magicwrx-verification`)
- Adds Brevo’s DKIM CNAME records (DNS-only)
- Updates SPF to include Brevo (and keep Google/Cloudflare routing if they use them)
- Adds DMARC at `_dmarc.customer-domain.com`

---

## Next implementation step (smallest useful slice)

1) Add DB tables/policies above to MagicWRX Supabase.
2) Build one ADMIN page: **MagicWRX → Tenant → Email Domains**
   - Add domain
   - Show DNS TXT token
   - “Check verification” button (calls an API route that uses `dig`/DNS lookup server-side)
3) Once verified, show the Brevo DNS instructions and store a boolean “brevo_active” once confirmed.

---

## Related tooling

- DNS/SMTP review script (operator tool): [SHARED/review-smtp-setup.sh](CODE:`SHARED/review-smtp-setup.sh`)
