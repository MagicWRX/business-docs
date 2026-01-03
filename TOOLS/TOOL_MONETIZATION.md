# Monetization (Platform) SSOT

## Overview
Platform-level monetization model across sites/tools (Ads, subscriptions, affiliate, commerce), designed to support MagicWRX backbone + AmazinglyStrange parity.

## Workstream Claim
- Owner (AI chat / person):
- Date claimed:
- Status: draft

## Revenue Streams (List)
- Ads (AdSense / ad network)
- Affiliate links
- Digital goods
- Physical goods (storefront)
- Subscriptions / memberships

## Product Surfaces
- Public site pages
- Blog
- Newsletter
- Store pages
- Admin dashboards

## Shared Requirements
- Attribution (campaign/source)
- Auditability (events + payouts)
- Multi-tenant (site-based separation)

## Implementation Notes (Draft)
- Define event schema for revenue events (impression/click/purchase/subscription).
- Define where events are stored (Supabase tables vs external analytics).

## Dependencies / Integrations
- Ads: ads.txt / app-ads.txt
- Payments: Stripe/Shopify/etc.
- Analytics: internal dashboard + external tracking

## Open Questions
- Which revenue streams are in-scope for v1 parity?
- Where are payout rules defined (DB vs config)?

## Links
- SSOT coordination: CODE:`DOCs/TOOLS/DOCs/TOOLS/SHARED_TOOLS_ROADMAP.md`
- Vision/exit criteria: DOCs/TOOLS/AMAZINGLYSTRANGE_PARITY_ROADMAP.md
