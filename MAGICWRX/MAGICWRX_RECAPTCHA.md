# MAGICWRX_RECAPTCHA.md (SSOT)

**Owner Account:** `magicwrxstudio@gmail.com`  
**Last Updated:** 2026-01-01  
**Status:** SSOT for reCAPTCHA in the MagicWRX ecosystem

---

## 1) Purpose

MagicWRX uses Google reCAPTCHA to reduce spam and abuse on public, unauthenticated entry points (primarily contact forms, newsletter signups, and any anonymous write endpoints).

**Key goals:**
- Prevent automated spam (bots)
- Keep secrets server-side
- Make setup repeatable across customer websites
- Avoid per-site custom code whenever possible

---

## 2) Recommended Baseline

### Choose: **reCAPTCHA v3**
- Invisible challenge
- Returns a **score** (0.0–1.0) used to gate/flag requests

Baseline policy (default):
- Verify server-side via `siteverify`
- Require `action` match (e.g., `contact_form`)
- Enforce minimum score (start with `0.5` and tune)
- (Optional) enforce allowed hostnames

---

## 3) Important Constraint: Unlimited Custom Domains

Google reCAPTCHA keys are domain-bound. This creates an operational constraint for a multi-tenant platform that supports **unlimited customer-owned domains**.

You have 2 viable models:

### Model A (Simple / Platform-owned domains)
Use one platform keypair per environment and only support:
- `localhost`
- MagicWRX-owned domains (e.g. `magicwrx.com`, `*.vercel.app` preview domains)

This is the **fastest** and works well for MagicWRX marketing + internal demos.

### Model B (Scales / Customer custom domains)
Each customer uses **their own** reCAPTCHA keys (or you provision per-tenant keys) and you store them per `client_id`.

This scales to unlimited customer domains and keeps domain ownership aligned with the tenant.

**Recommendation:**
- Implement **Model A now** for MagicWRX properties.
- Add **Model B** as the long-term multi-tenant path (a small “paste keys” wizard in ADMIN later).

---

## 4) Create Keys (Google reCAPTCHA Admin)

1. Go to https://www.google.com/recaptcha/admin
2. Create a new site
3. Choose **reCAPTCHA v3**
4. Add allowed domains
   - Dev: `localhost`
   - Prod: your production domain(s)
5. Save and copy:
   - **Site Key** (public)
   - **Secret Key** (server-only)

**Environment strategy:**
- Create separate reCAPTCHA sites for **dev** and **prod**.
- Do not reuse secrets across environments.

---

## 5) Environment Variables (Next.js)

### Required
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (public)
- `RECAPTCHA_SECRET_KEY` (server-only)

### Optional hardening
- `RECAPTCHA_MIN_SCORE` (default: `0.5`)
- `RECAPTCHA_EXPECTED_ACTION` (example: `contact_form`)
- `RECAPTCHA_ALLOWED_HOSTNAMES` (comma-separated, example: `localhost,magicwrx.com`)

**Never** commit secret keys into git.

---

## 6) Shared Tooling: `@amazing/recaptcha-tool`

A shared package exists at `SHARED/recaptcha-tool`:
- Client helpers:
  - `loadRecaptchaV3(siteKey)`
  - `executeRecaptchaV3(siteKey, action)`
- Server helper:
  - `verifyRecaptchaV3({ secretKey, token, expectedAction, minScore, allowedHostnames })`

This is intended to be reused by:
- MagicWRX
- Base-template customer sites
- ADMIN (if it ever exposes public forms)

---

## 7) Standard Verification Flow

1. Client loads reCAPTCHA v3 and requests a token using an **action**
2. Client POSTs `{ token, action }` to a server endpoint
3. Server verifies token with Google `siteverify`
4. Server allows/blocks the operation based on:
   - `success`
   - `score >= minScore`
   - `action === expectedAction`
   - (optional) hostname allowlist

---

## 8) Compliance / UX Requirements

If reCAPTCHA runs on a form page, include a short notice such as:

> “This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.”

(With links to Google’s policies.)

---

## 9) Next Phases (Plan)

### Phase 1 (Implemented now)
- SSOT doc (this file)
- Shared helper package (`@amazing/recaptcha-tool`)
- MagicWRX server-side verification endpoint (see implementation)

### Phase 2 (Recommended)
- ADMIN UI to store tenant keys per `client_id`
- Server-side lookup of tenant keypair by domain → `client_id`

### Phase 3 (Nice-to-have)
- Add rate limiting + abuse logging + threshold tuning dashboard

