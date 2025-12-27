# Supabase Schemas (Cross-Tool)

## Overview
Single place to define the canonical Supabase schemas used by extracted tools and parity goals (blog, pages, layouts, media, contacts, analytics).

## Workstream Claim
- Owner (AI chat / person):
- Date claimed:
- Status: draft

## Goals
- Keep tool adapters stable by defining required vs optional columns.
- Enable incremental migration from legacy data sources.

## Tables (Draft)
- `blog_posts`
- `pages`
- `layouts`
- `media_items` / `uploads`
- `contacts`
- `analytics_events` / rollups

## Optional Columns Policy
- Tools must not assume optional columns exist.
- Prefer runtime probing in adapters where schema drift is expected.

## Migrations
- Store SQL in a single migration folder and link to it here.
- Track which environments have which migrations applied.

## Links
- Migration scripts (site repo): Websites/amazingly-strange-website/scripts/migration/
- SSOT coordination: DOCs/TOOLS/SHARED_TOOLS_ROADMAP.md
- Vision/exit criteria: DOCs/TOOLS/AMAZINGLYSTRANGE_PARITY_ROADMAP.md
