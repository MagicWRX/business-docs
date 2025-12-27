# MXN Email Setup & Configuration (SSOT)

**Document Date:** December 11, 2025  
**Last Updated:** December 11, 2025  
**Version:** 1.0 (MVP Pre-Release)  
**Status:** Active - Email Delivery Working, DNS Pending  
**Next Review:** December 18, 2025

---

## 🎯 Purpose

Single Source of Truth for MXN.CHAT email configuration using Brevo transactional email API. This document consolidates setup, testing, DNS configuration, and troubleshooting procedures.

**Compliance:** AI_STANDARDS.md (SOLID, DRY, KISS, SSOT, Clean Boundaries)

---

## 📊 Current Status (Dec 11, 2025)

**Email Sending:** ✅ WORKING  
**Email Receiving:** ❌ NOT WORKING

### Detailed Status
- ✅ **Outbound (Sending):** Brevo API working perfectly
- ✅ **DKIM Records:** Configured and propagated (brevo1, brevo2)
- ✅ **SPF Record:** Active (`v=spf1 include:spf.brevo.com...`)
- ✅ **DMARC Record:** Active (`v=DMARC1; p=none...`)
- ❌ **Inbound (Receiving):** NO MX records on mxn.chat domain
- ❌ **Email Forwarding:** NOT configured

### Critical Issue
You can **SEND** emails from `admin@mxn.chat`, but you **CANNOT RECEIVE** emails to `admin@mxn.chat` because there are no MX records pointing to a mail server.

**Impact:**
- Users cannot reply to your emails
- Support requests to admin@mxn.chat will bounce
- Password reset "reply-to" won't work

---

## 📋 Architecture Overview

```
┌────────────────┐   POST /api/send-invite   ┌──────────────────┐
│   User Action  │ ─────────────────────────▶│  Next.js API     │
│   (UI Layer)   │                            │  Route (Server)  │
└────────────────┘                            └────────┬─────────┘
                                                       │
                                                       │ BREVO_API_KEY
                                                       ▼
                                              ┌──────────────────┐
                                              │  Brevo API v3    │
                                              │  /smtp/email     │
                                              └────────┬─────────┘
                                                       │
                                                       │ SMTP Relay
                                                       ▼
                                              ┌──────────────────┐
                                              │  Recipient Inbox │
                                              │  (Email Client)  │
                                              └──────────────────┘
```

**Key Components:**
- **API Route:** `/src/app/api/send-invite/route.ts` (server-side only)
- **Environment:** `BREVO_API_KEY` in `.env.local` (gitignored)
- **Provider:** Brevo Transactional Email API v3
- **Sender:** `admin@mxn.chat` (verified domain required)

---

## 🔍 Problem & Solution History

### Original Issues
1. **Environment Variable Exposure**
   - ❌ Had: `NEXT_PUBLIC_BREVO_API_KEY` (browser-exposed - security risk!)
   - ✅ Fixed: `BREVO_API_KEY` (server-side only)

2. **Supabase SMTP Misconfiguration**
   - ❌ Problem: Supabase auth emails not using custom SMTP
   - ✅ Solution: Direct Brevo API for full control

3. **dotenv Loading Confusion**
   - ❌ Problem: Next.js auto-loads `.env.local` (dotenv showed 0 injected)
   - ✅ Solution: Use `process.env.BREVO_API_KEY` directly

### Architectural Decision
**Use Direct Brevo API** instead of Supabase SMTP because:
- ✅ Full control over email templates
- ✅ Better tracking and analytics
- ✅ Server-side security (API key never exposed)
- ✅ Flexible for any email type (not just auth)

---

## ⚙️ Configuration

### Environment Variables (.env.local)

**File Location:** `/Users/brianlindahl/Development/Business/Websites/mxn-chat/.env.local`

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://opcsbfwqazyzsskuuooz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...  # Public (RLS enforced)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...      # Server-side only (admin)

# Brevo Email API (Server-side only)
BREVO_API_KEY=xkeysib-5b3d8e03...          # Transactional email

# Brevo AI API (Client-side safe - rate limited)
NEXT_PUBLIC_BREVO_AI_API_KEY=eyJhcGlfa2V5...  # Base64 encoded
```

### Key Security Matrix

| Environment Variable | Exposure | Purpose | Rotate Frequency |
|---------------------|----------|---------|------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Browser ✅ | Supabase endpoint | Never (public) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser ✅ | Read-only DB access (RLS) | 90 days |
| `SUPABASE_SERVICE_ROLE_KEY` | Server 🔒 | Admin DB access | 90 days |
| `BREVO_API_KEY` | Server 🔒 | Send transactional emails | 90 days |
| `NEXT_PUBLIC_BREVO_AI_API_KEY` | Browser ⚠️ | AI chat features | Monitor usage |

### API Endpoints

| Endpoint | Purpose | Status |
|----------|---------|--------|
| `/api/send-invite` | Production email sending | ✅ Active |
| `/api/test-brevo-direct` | Email testing (dev/staging) | ✅ Active |
| `/test-brevo-direct` | UI test page | ✅ Active |

---

## 🧪 Testing Procedures

### Method 1: Quick Test (Recommended)

**Test Page:** http://localhost:3000/test-brevo-direct

1. Open test page in browser
2. Enter valid email address (real or test)
3. Click "Send Test Email via Brevo"
4. Verify success response with `messageId`

**Expected JSON Response:**
```json
{
  "success": true,
  "message": "Direct test email sent to test@example.com via Brevo API",
  "details": {
    "messageId": "<202512102210...@smtp-relay.mailin.fr>",
    "from": "admin@mxn.chat",
    "to": "test@example.com",
    "provider": "Brevo API (Direct)",
    "timestamp": "2025-12-10T22:10:53.809Z"
  }
}
```

### Method 2: cURL Test (CLI)

```bash
curl -X POST http://localhost:3000/api/test-brevo-direct \
  -H "Content-Type: application/json" \
  -d '{"email":"your@email.com"}'
```

### Method 3: Production Test (Real Inbox)

**Prerequisites:** DKIM records configured (see DNS section)

1. Visit test page with real email
2. Check inbox (may be in spam if DKIM pending)
3. Verify sender shows `admin@mxn.chat` (not "via brevo.com")

### Method 4: Brevo Dashboard Verification

1. Send test email
2. Go to: https://app.brevo.com/statistics/email
3. Verify message appears in sent logs
4. Check delivery status

---

## 🌐 DNS Configuration & Email Receiving

### Current DNS Records (Verified Dec 11, 2025)

**✅ Already Configured for SENDING:**
```bash
# DKIM Records (Email Authentication)
brevo1._domainkey.mxn.chat → b1.mxn-chat.dkim.brevo.com (CNAME) ✅
brevo2._domainkey.mxn.chat → b2.mxn-chat.dkim.brevo.com (CNAME) ✅

# SPF Record (Sender Authorization)
mxn.chat → "v=spf1 include:spf.brevo.com include:_spf.google.com ~all" (TXT) ✅

# DMARC Record (Email Policy)
_dmarc.mxn.chat → "v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com" (TXT) ✅

# Domain Verification
mxn.chat → "brevo-code:fbaea90f891e98c3edb299ccd8433bdd" (TXT) ✅
```

**❌ MISSING for RECEIVING:**
```bash
# MX Records (Mail Receiving)
mxn.chat → NO MX RECORDS ❌

Current Issue: 
  - send.mxn.chat has MX → feedback-smtp.us-east-1.amazonses.com
  - But mxn.chat (root domain) has NO MX records
  - Result: Emails to admin@mxn.chat will BOUNCE
```

### 🚀 Solution: Cloudflare Email Routing (FREE)

**Recommended Setup:** Forward `admin@mxn.chat` → `magicwrxstudio@gmail.com`

**Benefits:**
- ✅ Free (included with Cloudflare)
- ✅ Simple 3-step setup
- ✅ Reliable delivery
- ✅ No new accounts needed
- ✅ Keep sending via Brevo (no changes)

**How It Works:**
```
Sender → admin@mxn.chat → Cloudflare MX Servers → magicwrxstudio@gmail.com
         (public address)   (automatic routing)    (your Gmail inbox)
```

### Impact of Missing DNS Records

| Record Missing | Impact | User Experience |
|----------------|--------|-----------------|
| SPF | Moderate | Some emails rejected |
| DMARC | Low | Reduced reporting |
### 📋 Detailed DNS Records (Cloudflare Configuration)

**Location:** Cloudflare Dashboard → mxn.chat → DNS → Records

| Type | Name (Host) | Content (Value) | Proxy Status | Purpose |
|------|-------------|-----------------|--------------|---------|
| **CNAME** | `brevo1._domainkey` | `b1.mxn-chat.dkim.brevo.com` | **DNS Only** (Gray Cloud) | DKIM Authentication |
| **CNAME** | `brevo2._domainkey` | `b2.mxn-chat.dkim.brevo.com` | **DNS Only** (Gray Cloud) | DKIM Authentication |
| **TXT** | `@` | `brevo-code:fbaea90f891e98c3edb299ccd8433bdd` | N/A | Domain Verification |
| **TXT** | `_dmarc` | `v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com` | N/A | Email Policy |
| **TXT** | `@` | `v=spf1 include:spf.brevo.com include:_spf.google.com ~all` | N/A | Sender Authorization |

**⚠️ Critical Configuration Notes:**

1. **SPF Record:** If you have an existing TXT record for `@`, **edit it** to include the SPF value above. Do not create duplicate SPF records.

2. **CNAME Records:** Ensure "Proxy Status" is set to **DNS Only** (Gray Cloud icon), not Proxied (Orange Cloud).

3. **DMARC Policy:** `p=none` allows emails during setup. Change to `p=quarantine` or `p=reject` for production.

4. **Propagation:** DNS changes take 5-30 minutes to propagate globally.

### DNS Verification Script

```bash
# Run this to verify DNS records are configured correctly
./scripts/check-email-dns.sh
```

**Expected Output:**
```bash
🌐 DNS Configuration Check
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ SPF Record found: v=spf1 include:spf.brevo.com include:_spf.google.com ~all
✅ DKIM Records found: brevo1._domainkey, brevo2._domainkey
✅ DMARC Record found: v=DMARC1; p=none...
✅ Domain Verification: brevo-code:fbaea90f891e98c3edb299ccd8433bdd
```

#### Step 2: Verify Destination Email

1. **Add Destination Address:**
   - Click: **"Destination addresses"** → **"Add destination address"**
   - Enter: `magicwrxstudio@gmail.com`
   - Click: **"Send verification email"**

2. **Verify in Gmail:**
   - Open Gmail inbox: `magicwrxstudio@gmail.com`
   - Look for email from: Cloudflare
   - Subject: "Verify your email for Cloudflare Email Routing"
   - Click the verification link
   - Return to Cloudflare (should show ✅ Verified)

#### Step 3: Create Routing Rule

1. **Add Custom Address:**
   - Click: **"Routing rules"** → **"Create address"**
   - Select: **"Custom address"**
   - Address: `admin`
   - Domain: `@mxn.chat` (auto-selected)
   - Action: **"Send to an email"**
   - Destination: Select `magicwrxstudio@gmail.com`
   - Click: **"Save"**

2. **Optional - Add Catch-All:**
   - Click: **"Create address"** again
   - Select: **"Catch-all address"**
   - Action: **"Send to"** → `magicwrxstudio@gmail.com`
   - This forwards ALL @mxn.chat emails to Gmail
   - Click: **"Save"**

#### Step 4: Verify MX Records Added

Cloudflare automatically adds these MX records:
```bash
mxn.chat MX 27 isaac.mx.cloudflare.net
mxn.chat MX 89 linda.mx.cloudflare.net  
mxn.chat MX 67 amir.mx.cloudflare.net
```

**Check via terminal:**
```bash
dig MX mxn.chat +short

# Expected output:
# 27 isaac.mx.cloudflare.net.
# 89 linda.mx.cloudflare.net.
# 67 amir.mx.cloudflare.net.
```

#### Step 5: Test Email Receiving

1. **Send Test Email:**
   - From any email account (Gmail, Outlook, etc.)
   - To: `admin@mxn.chat`
   - Subject: "Test - Email Routing Setup"
   - Body: "Testing inbound email forwarding to Gmail"

2. **Check Gmail Inbox:**
   - Open: `magicwrxstudio@gmail.com`
   - Email should arrive within 1-2 minutes
   - From: Original sender
   - To: `admin@mxn.chat`

3. **Verify Headers (Optional):**
   - In Gmail, click **⋮** (three dots) → **"Show original"**
   - Look for: `Received: from ... by mx.cloudflare.net`
   - Confirms routing through Cloudflare

✅ **Done!** You can now receive emails at `admin@mxn.chat`. Click: "Save"                                │
│ 6. Repeat for all pending records               │
└─────────────────────────────────────────────────┘
```

### Verification Commands

```bash
# Run automated check script
cd /Users/brianlindahl/Development/Business/Websites/mxn-chat
./check-dns.sh

# Manual verification
dig CNAME brevo1._domainkey.mxn.chat +short
dig CNAME brevo2._domainkey.mxn.chat +short
dig TXT mxn.chat +short | grep brevo-code
```

**Note:** DNS propagation: 5-60 minutes

### Brevo Dashboard Verification

After DNS propagates:
1. Go to: https://app.brevo.com/settings/domains
2. Find domain: `mxn.chat`
3. Click: **"Verify"**
4. Status should show: **"Authenticated" ✅**

---

## 🐛 Troubleshooting

### Issue: "Brevo API key not configured"

**Symptoms:**
```json
{"error": "Brevo API key not configured"}
```

**Resolution:**
```bash
# 1. Check .env.local
grep BREVO_API_KEY .env.local

# 2. If missing, add it
echo 'BREVO_API_KEY=xkeysib-...' >> .env.local

# 3. Restart dev server
pkill -f "next dev"
./start-local.sh
```

### Issue: Email Sent But Not Received

**Diagnostic Steps:**
1. ✅ Check Brevo dashboard: https://app.brevo.com/statistics/email
2. ✅ Verify DNS records: `./check-dns.sh`
3. ✅ Check spam folder
4. ✅ Try different email provider (Gmail, Outlook, Yahoo)

### Issue: Emails Go to Spam

**Root Cause:** Missing DKIM authentication

**Fix:**
1. Add DKIM CNAME records to Cloudflare (see DNS section)
2. Wait 5-60 minutes for DNS propagation
3. Verify domain in Brevo dashboard
4. Test with real email

**Temporary Workaround:**
- Add `admin@mxn.chat` to email contacts
- Mark test email as "Not Spam"

### Issue: Login Failing After Email Setup

**Google OAuth Not Working:**

**Diagnostic Steps:**
```bash
# 1. Verify Supabase connection
grep NEXT_PUBLIC_SUPABASE_URL .env.local

# 2. Run diagnostic script
./check-auth-dns.sh
```

**Required Google OAuth Redirect URIs:**
- `http://localhost:3000/auth/v1/callback`
- `https://mxn-chat-dcgsy3rde-magicwrxs-projects.vercel.app/auth/v1/callback`
- `https://opcsbfwqazyzsskuuooz.supabase.co/auth/v1/callback`

**Fix Steps:**
1. Go to: https://console.cloud.google.com/apis/credentials
2. Select your OAuth 2.0 Client ID
3. Under "Authorized redirect URIs", add all 3 URIs above
4. Click "Save"
5. Test login at: http://localhost:3000

**Common Errors:**
- `redirect_uri_mismatch` → Add missing URI to Google Console
- `invalid_client` → Regenerate OAuth credentials
- `Access blocked` → Configure OAuth consent screen

See: **[MXN_DNS_EMAIL_SETUP.md](MXN_DNS_EMAIL_SETUP.md)** for detailed Google OAuth troubleshooting

---

## 🚀 Production Deployment

### Vercel Environment Variables

**Dashboard:** https://vercel.com/magicwrxs-projects/mxn-chat/settings/environment-variables

Required variables (all environments: Production, Preview, Development):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://opcsbfwqazyzsskuuooz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Brevo
BREVO_API_KEY=xkeysib-5b3d8e03...
NEXT_PUBLIC_BREVO_AI_API_KEY=eyJhcGlfa2V5...
```

### Deployment Checklist

```
[ ] Environment variables configured in Vercel
[ ] DNS records added to Cloudflare (DKIM)
[ ] Domain verified in Brevo dashboard
[ ] Code committed and pushed to GitHub
[ ] Vercel auto-deployment triggered
[ ] Test email endpoint in production
[ ] Verify Brevo statistics for production sends
```

---

## 🔗 Quick Reference Links

### Development
- Local Test Page: http://localhost:3000/test-brevo-direct
- DNS Check Script: `./check-dns.sh`
- Brevo Verify Script: `./verify-brevo-dns.sh`

### Dashboards
- [Brevo Dashboard](https://app.brevo.com)
- [Brevo Domains](https://app.brevo.com/settings/domains)
- [Brevo Statistics](https://app.brevo.com/statistics/email)
- [Brevo API Keys](https://app.brevo.com/settings/keys/api)
- [Supabase Project](https://supabase.com/dashboard/project/opcsbfwqazyzsskuuooz)
- [Cloudflare DNS](https://dash.cloudflare.com)
- [Vercel Deployment](https://vercel.com/magicwrxs-projects/mxn-chat)

### Documentation
- [Brevo API Docs](https://developers.brevo.com/docs)
- [Brevo Transactional Email](https://developers.brevo.com/docs/send-a-transactional-email)
- [Supabase Auth SMTP](https://supabase.com/docs/guides/auth/auth-smtp)

---

## 📌 Related Documents

- **[MXN_AUTH_SETUP.md](MXN_AUTH_SETUP.md)** - Authentication configuration (Google OAuth, Supabase)
- **[MXN_SECURITY.md](MXN_SECURITY.md)** - Key management, rotation, E2E testing
- **[MXN_TREE.md](MXN_TREE.md)** - Technical architecture and file structure
- **[MXN_DEPLOYMENT_CICD.md](MXN_DEPLOYMENT_CICD.md)** - Deployment procedures

---

## ✅ Validation Checklist

| Check | Status | Last Verified |
|-------|--------|---------------|
| **Email Sending** | | |
| `.env.local` has `BREVO_API_KEY` (server-side) | ✅ | Dec 11, 2025 |
| Test endpoint works locally | ✅ | Dec 11, 2025 |
| API returns success with messageId | ✅ | Dec 11, 2025 |
| DNS DKIM records propagated | ✅ | Dec 11, 2025 |
| DNS SPF record configured | ✅ | Dec 11, 2025 |
| DNS DMARC record configured | ✅ | Dec 11, 2025 |
| Domain verified in Brevo | ⏳ | Optional |
| **Email Receiving** | | |
| Cloudflare Email Routing enabled | ❌ | **ACTION NEEDED** |
| Gmail destination verified | ❌ | **ACTION NEEDED** |
| Routing rule: admin@mxn.chat → Gmail | ❌ | **ACTION NEEDED** |
| MX records added by Cloudflare | ❌ | **ACTION NEEDED** |
| Test email received in Gmail | ❌ | **ACTION NEEDED** |
| **Production** | | |
| Vercel env vars configured | ✅ | Active |
| Production email sending tested | ⏳ | After deployment |

**Current Status:** 6/13 complete (Email sending ✅ | Email receiving ❌)

**Next Actions:**
1. ✅ Follow Step-by-Step guide above
2. ✅ Enable Cloudflare Email Routing
3. ✅ Test receiving email to admin@mxn.chat
4. ⏳ Fix Google OAuth redirect URIs

---

**Document Owner:** MagicWRX Development Team  
**Last Architecture Review:** December 11, 2025  
**Next Review Due:** January 11, 2026
