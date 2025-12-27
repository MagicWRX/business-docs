# AmazinglyStrange Parity Roadmap

## Goal
Reproduce the AmazinglyStrange public site and admin capabilities using the extracted SHARED packages (and the ADMIN + SHARED Hub apps as integration hosts).

**Parity definition (practical):**
- Core public pages can be rendered from structured content (layouts/pages/posts/media) with consistent header/footer and SEO metadata.
- Admin can author/edit those structures using the extracted tools.
- Round-trips do not lose data (edit → save → reload → render unchanged).

## Sources of truth
- SHARED extraction status: `DOCs/TOOLS/SHARED_TOOLS_ROADMAP.md`
- Layout Manager phases/checklist: `DOCs/TOOLS/TOOLS_LAYOUT_MANAGER.md`

## Parallel Work (Coordination)
- Parallel AI workstreams and file-ownership live in `DOCs/TOOLS/SHARED_TOOLS_ROADMAP.md`.

## Tool Docs (This Folder)
These are the “where/how” docs for each tool:
- Layout Manager: `DOCs/TOOLS/TOOLS_LAYOUT_MANAGER.md`
- Header Components: `DOCs/TOOLS/TOOLS_HEADER_COMPONENTS.md`
- Gallery: `DOCs/TOOLS/TOOLS_GALLERY_COMPONENTS.md`
- Blog Engine: `DOCs/TOOLS/TOOLS_BLOG_ENGINE.md`
- Media Library: `DOCs/TOOLS/TOOLS_MEDIA_LIBRARY.md`
- Page Editor: `DOCs/TOOLS/TOOLS_PAGE_EDITOR.md`
- Contact Manager: `DOCs/TOOLS/TOOLS_CONTACT_MANAGER.md`
- Analytics Dashboard: `DOCs/TOOLS/TOOLS_ANALYTICS_DASHBOARD.md`
- Location Filter: `DOCs/TOOLS/TOOLS_LOCATION_FILTER.md`

## Phases

### Phase A — Render a branded shell everywhere
**Outcome:** A consistent header/footer + global styles + SEO defaults across pages.
- Adopt `@amazing/header-components` for site-wide navigation/header behaviors.
- Decide where global SEO defaults live (Next.js metadata helpers) and how per-page overrides are stored.

**Exit criteria:**
- Public “home-like” page renders with real header/footer.
- Mobile and desktop header behavior matches expectations.


### Phase B — Content primitives: media + pages + layout
**Outcome:** Most pages become a composition of Layout JSON + Page metadata + Media references.
- Layout authored via `@amazing/layout-manager`.
- Page metadata authored via `@amazing/page-editor` (or a slim metadata editor if you later split it).
- Images/videos served via `@amazing/media-library` and referenced by URL.

**Exit criteria:**
- Create a new page record with metadata + layout, reload, render unchanged.
- Layout Manager round-trips (persist/reload/template apply parity) remain green.


### Phase C — Showcase content: galleries + game cards + newsletter
**Outcome:** The “core visual brand” pages (artwork + product/game showcases) are reproducible.
- Use `@amazing/gallery-components` as the primary gallery/rendering primitive.
- Add (or map) “game cards / store badges” rendering as either:
  - a first-class Layout element type, or
  - `advanced.customComponent` pointing at a registered component.

**Exit criteria:**
- A gallery page renders using real gallery components.
- A “games grid” renders from structured data.


### Phase D — Blog parity
**Outcome:** Posts can be authored, listed, and rendered publicly.
- Use `@amazing/blog-engine` for authoring.
- Decide whether public rendering is:
  - “render stored HTML” (sanitized/allowlisted), or
  - “render stored structured blocks” (harder, safer, more consistent).

**Exit criteria:**
- Post CRUD works end-to-end.
- Blog index and post page render with correct SEO metadata.


### Phase E — Ops parity: contact + analytics
**Outcome:** The operational tools have their data contracts and adapters.
- Contacts: `@amazing/contact-manager` wired to your chosen backend.
- Analytics: `@amazing/analytics-dashboard` wired to your chosen backend.

**Exit criteria:**
- Admin sees live-ish data (or realistic dev mocks), and exports work.


## Shared Contracts (Decisions You Should Make Once)
These should be consistent across tools.

### Backend adapters
- Identify a single “primary” backend for production (Supabase/REST/etc.) and ensure each tool has an adapter.
- Keep mock adapters for demos/tests.

### Identity/permissions
- Define `currentUser` shape and role/permissions.

### URLs + routing
- Decide canonical rules for page paths, trailing slashes, and redirects.

### SEO metadata
- Define what’s stored per-page (title/description/canonical/OG image) and what’s computed.

## Recommended Verification
- Keep SHARED Hub as the canonical harness pages for:
  - visual regression snapshots
  - a11y checks
  - contract tests (persist/reload/apply)
- Use ADMIN app to validate auth/guarded routes and real-world navigation.
