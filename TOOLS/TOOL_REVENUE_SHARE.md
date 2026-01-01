# Revenue Share (Platform) SSOT

## Overview
Defines how revenue is split across stakeholders (platform, creators, affiliates, partners) and how those splits are computed, stored, and paid out.

## Workstream Claim
- Owner (AI chat / person):
- Date claimed:
- Status: draft

## Definitions
- **Gross Revenue**:
- **Net Revenue**:
- **Fees** (payment processor, refunds, chargebacks):
- **Attribution window**:

## Split Models (Draft)
- Platform vs site owner
- Creator royalties (if creator content)
- Affiliate commissions

## Data Contract (Draft)
- `revenue_event` (amount, currency, source, metadata)
- `attribution` (who gets credit)
- `payout_rule` (percent/fixed)
- `payout_statement` (periodic)

## Operations
- Reconciliation process
- Manual adjustments
- Dispute handling

## Open Questions
- Do we support per-site overrides?
- How do we handle multi-currency?

## Links
- SSOT coordination: CODE:`DOCs/TOOLS/DOCs/TOOLS/SHARED_TOOLS_ROADMAP.md`
- Vision/exit criteria: DOCs/TOOLS/AMAZINGLYSTRANGE_PARITY_ROADMAP.md
- Monetization SSOT: DOCs/TOOLS/TOOL_MONETIZATION.md
