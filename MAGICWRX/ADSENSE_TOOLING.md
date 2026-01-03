# MagicWRX AdSense Tooling (Draft)

Date: 2026-01-01

## Goal

Enable revenue generation on **free** customer sites created via MagicWRX by injecting **MagicWRX-provided** Google AdSense ads (banner display ads), while supporting an **ad-free paid option**.

## Two Base-Template Options

### Option A — Ad-Free (Paid)
- Customer pays a small annual fee.
- Provisioned site is deployed with ads disabled.

**Implementation (base-template env):**
- `NEXT_PUBLIC_AD_MODE=none`

### Option B — MagicWRX Ads + Shared Revenue Incentive
- Free/low-cost site includes MagicWRX AdSense ads.
- MagicWRX collects AdSense revenue under the existing publisher account (currently `amazinglystrangemedia@gmail.com`).
- MagicWRX shares a portion of revenue with the MagicWRX customer over time based on tracked site activity.

**Implementation (base-template env):**
- `NEXT_PUBLIC_AD_MODE=magicwrx-ads`
- `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx` (MagicWRX publisher id)
- Optional: `NEXT_PUBLIC_ADSENSE_SLOT=##########`

## Consent / Privacy Controls

Advertising typically requires consent controls in some regions.

**Template supports a minimal consent gate:**
- `NEXT_PUBLIC_ADS_REQUIRE_CONSENT=true` → do not load AdSense until consent is granted via a small banner.

If you use a full CMP (recommended for larger scale), you can disable the template banner and drive consent via the CMP, then set local storage key `mw_ads_consent_v1=granted`.

## Revenue Share Tracking (How to Attribute)

AdSense revenue is reported at the publisher level. To share revenue, MagicWRX must compute payouts using internal metrics.

**Recommended identifiers per deployed site:**
- `NEXT_PUBLIC_MAGICWRX_CUSTOMER_ID=<magicwrxCustomerId>`
- `NEXT_PUBLIC_MAGICWRX_SITE_ID=<siteId>`

The template will optionally POST a lightweight context event to:
- `POST {MAGICWRX_URL}/api/ads/context`

Payload includes: timestamp, siteId, customerId, path, referrer, consent.

## Security & Third-Party Measures (Minimum Bar)

- Enforce HTTPS everywhere.
- Strong CSP and security headers (ensure AdSense domains are allowed when ads enabled).
- Minimize data: do not send PII in ad attribution events.
- Log and rate-limit `/api/ads/context` to prevent abuse.
- Document data flows for: customer (MagicWRX user) and end user (their site visitor).

## Next Needed in MagicWRX Backend

- Implement `POST /api/ads/context` ingestion (store per-site activity + consent states).
- Admin UI: toggle ad mode per site, set customer share %, payout schedule.
- Payout pipeline: monthly calculation + invoice / payment method.

### Implemented (MagicWRX)

MagicWRX now includes:
- `POST /api/ads/context` (Next.js route) at `src/app/api/ads/context/route.ts`
- Supabase migration creating `public.ads_context_events` and view `public.ads_site_daily`

To apply the migration, run your normal Supabase migration flow (or execute the SQL in `supabase/migrations/002_create_ads_context_events.sql`).

