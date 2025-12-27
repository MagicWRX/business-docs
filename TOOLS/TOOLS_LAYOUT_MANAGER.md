# Layout Manager Tool

## Overview
The Layout Manager is a visual page layout builder extracted from AmazinglyStrange into a reusable SHARED package `@amazing/layout-manager`. It provides a drag-and-drop interface for building page layouts with sections, columns, and elements.

## Features
- Visual page layout builder with sections/columns/elements
- Backend-agnostic with onChange callbacks
- Live preview integration
- Drag-and-drop interface
- Responsive design support

## Connected Pages

The Layout Manager tool is integrated into the following *.tsx pages:

### ADMIN App
- `/ADMIN/src/app/amazinglystrange/layout-manager/page.tsx` - Main layout manager page in the admin interface (redirects to `/login` when not authenticated)

### SHARED Hub
- `/SHARED/hub/src/app/tools/layout-manager/page.tsx` - Demo/standalone version in the shared tools hub

## Page Breakdown (Linux ASCII Tree)

```
ADMIN/
└── src/
    └── app/
        └── amazinglystrange/
            └── layout-manager/
                └── page.tsx

SHARED/
└── hub/
    └── src/
        └── app/
            └── tools/
                └── layout-manager/
                    └── page.tsx
```

## Roadmap

See also: `DOCs/TOOLS/AMAZINGLYSTRANGE_PARITY_ROADMAP.md` (cross-tool plan)

### Current Status: ✅ Extracted
- Package: `@amazing/layout-manager`
- Location: `/SHARED/layout-manager/`
- Status: Ready for use, needs polish and testing

### Needs Polish & Testing
1. **UI/UX Improvements**
   - Better drag-and-drop feedback
   - Improved responsive preview
    - Element property panels
    - Undo/redo functionality

2. **Testing**
   - Unit tests for components
   - Integration tests with different backends
    - E2E tests for layout building workflow
   - Performance testing with large layouts

3. **Documentation**
   - API documentation
   - Usage examples
   - Backend integration guides

4. **Features to Add**
   - Template library
   - Export/import layouts
   - Collaboration features
   - Version history

## Parity Checklist (Aligned to Legacy Spec Phases)

This checklist is explicitly aligned to the legacy spec phases in `Hosting/amazinglystrange/docs/AMAZINGLYSTRANGE_LAYOUT_MANAGER.md`.

### Phase 1 — Foundation (Legacy Phase 1)
- [x] Layout model is stable: Page → Sections → Columns → Elements
- [x] CRUD: add/remove/reorder sections
- [x] Save/load layout JSON in at least one backend (mock/local)
- [x] Minimal editor shell integrated into ADMIN (`AdminLayout` + route)

**Testing**
- [ ] Unit: reducers/helpers (if any), layout mutation functions
- [x] Smoke/E2E: editor loads, add section, undo/redo, inspector edits update JSON (Playwright)

### Phase 2 — Column System (Legacy Phase 2)
- [x] Column presets (1, 2 equal, 2 sidebar, 3, 4)
- [ ] Column settings: widths, stacking rules for mobile
- [ ] Column reorder within a section

**Testing**
- [x] Unit: preset application doesn’t drop existing content accidentally
- [x] Visual: responsive preview modes (mobile/tablet/desktop)

### Phase 3 — Element Library (Legacy Phase 3)
- [~] Element palette grouped by category
- [x] Element CRUD: add/edit/delete/duplicate/reorder
- [x] Per-element property panels (typed; avoid freeform `any`)

**Testing**
- [ ] Unit: schema validation for each element type
- [x] E2E: add/edit element → persist → reload unchanged (Playwright)

### Phase 4 — Template System (Legacy Phase 4)
- [~] Save current layout as template (name/description/tags)
- [x] List templates + apply template to a new page/layout (Hub)
- [x] Import/export templates as JSON (Hub)

**Testing**
- [x] Contract: template save round-trip (localStorage write asserted); apply parity asserted
- [x] E2E: apply template → editor state matches template (covered via golden fixture load + edit tests)

### Phase 5 — Output Generation (Legacy Phase 5)
Choose one “output” approach and test it:
- [x] **Recommended for Next.js**: React renderer that turns Layout JSON into real components
- [ ] Optional: HTML/CSS export (only if you truly need portable static output)

**Testing**
- [x] Snapshot: renderer output tree for known layouts (Playwright HTML snapshots)
- [x] Visual regression: golden-page screenshots for key pages (Playwright)

### Phase 6 — Preview & Polish (Legacy Phase 6)
- [x] Live preview uses the same renderer as production
- [x] Undo/redo
- [x] Validation warnings (missing required props, broken links, invalid image src)
- [~] Accessibility pass (headings order, alt text, button labels) (fixed nested interactive markup; added focus-visible + aria labels)

**Testing**
- [x] E2E: undo/redo correctness (Playwright)
- [x] a11y: automated checks (Playwright + axe or equivalent)

### Phase 7 — Cloud Persistence + Versioning (Legacy Phase 7)
- [~] Backend adapter: list/load/save/delete layouts (contract + localStorage adapter wired; cloud adapter pending)
- [ ] Version history + rollback
- [ ] Draft vs published states (if needed)

**Testing**
- [ ] Integration: backend adapters behave the same (mock vs REST vs future)
- [ ] Data: migration tests for older layout JSON versions

## Required Element Types for AmazinglyStrange Parity

These are the concrete `LayoutElement.type` values you’ll need to reproduce the current AmazinglyStrange.com “look & abilities” using Layout JSON + a renderer. Prefer mapping to existing SHARED packages/components instead of inventing bespoke rendering.

### Global / Page-Level
- `page.settings` (not an element, but required): title, meta description, canonical, robots, open graph, global spacing/theme toggles
- `page.includeHeaderFooter`: boolean(s) or references

### Header / Navigation (map to `@amazing/header-components`)
- `header.brandNavbar` (links + dropdown schema)
- `header.brandHeaderContainer` (banner/background settings)
- `header.slidingImages` (promo slider; maps to `HeaderSlidingImages` / `useHeaderSlider`)

### Layout / Structure
- `layout.section` (container/full-width; background; padding/margins)
- `layout.columns` (already supported via section.columns)
- `layout.spacer` (vertical rhythm without hacks)
- `layout.divider`

### Typography / Content
- `text.heading` (level, align)
- `text.rich` (safe rich text; consider HTML sanitization rules)
- `text.paragraph`
- `text.list` (ordered/unordered)

### Media
- `media.image` (src, alt, width/height, fit, link)
- `media.video` (embed URL / provider)
- `media.embed` (YouTube/iframe with allowlist)

### CTAs / Buttons / Links
- `action.button` (label, href, variant)
- `action.linkList` (nav blocks, footer link groups)
- `action.socialLinks` (icon + href)

### Cards / Grids
- `content.card` (image/title/body/button)
- `content.featureGrid` (grid of cards; can compile down to repeated `content.card`)

### Galleries (map to `@amazing/gallery-components`)
- `gallery.grid`
- `gallery.masonry`
- `gallery.carousel`
- `gallery.lightbox` (often implicit via chosen gallery type)
- `gallery.artwork` (if you use `ArtworkGallery`)

### Games / App Store Blocks (site-specific but likely needed)
- `games.gameCards` (list of games with store badges/links)
- `games.badges` (App Store / Google Play badge row)

### Newsletter / Forms / Contact
- `form.newsletterSignup` (email + submit)
- `form.contact` (name/email/message)
- `form.generic` (small allowlist of inputs)

### Blog
- `blog.preview` (latest N cards; aligns with `blog-preview.js` behavior)
- `blog.postList` (index page listing)

### Footer
- `footer.standard` (link groups + copyright)

### Escape Hatches (use sparingly)
- `advanced.customComponent` (references a registered component name + props)
- `advanced.customHtml` (only if you can sanitize/allowlist safely)

## Parity Definition (What “Reproduce the Site” Means)

To claim parity, you should be able to:
- Render the core pages from Layout JSON using the same shared UI packages
- Match the visible structure (header, hero, content sections, galleries, blog preview) within acceptable tolerance
- Persist layouts/templates and round-trip without loss

## Current Implementation Snapshot (Dec 2025)

This is the current reality of `@amazing/layout-manager` vs the two host pages.

### What the shared package supports today
- Schema: `schemaVersion = 1` with a migration helper to normalize older layouts
- Sections: add/delete/duplicate/reorder
- Columns: presets preserve existing column content; overflow elements are merged into the last column when reducing column count
- Elements: add/delete/duplicate/reorder for `heading`, `text`, `image`, `card`, `form`
- Property editing: Inspector panel supports editing content for `heading`, `text`, `image`, `card`, `form`
- Rendering: shared `LayoutRenderer` supports the same core element set for visual previews
- Persistence: `LayoutStore` adapter interface with localStorage store (Hub + ADMIN); emits `onChange`/`onSave`

### What the host pages add today
- ADMIN page provides the route shell and uses the shared renderer for its preview pane
- SHARED hub page is the canonical test harness:
    - Golden fixtures (canonical layouts)
    - Round-trip check (load fixture → edit → Visual Preview + JSON updates)

## Next Useful Steps (Do These in Order)

Each step ends with explicit “review checkpoints” so you can approve progress before moving on.

### Step 1 — Freeze the Schema (Types + Validation)
Goal: stop `any` from spreading and define the contract the ecosystem will share.

- [x] Replace freeform `type: string` with a `LayoutElementType` union that includes the required parity types (or a smaller v1 subset)
- [x] Define typed `content` schemas per element type (use a validator like Zod if/when you add runtime validation)
- [x] Add a `schemaVersion` to layouts and a minimal migration strategy

**Review checkpoints**
- [ ] You can paste a layout JSON and it validates (or fails with clear errors)
- [ ] No breaking changes to existing consumers without a migration

### Step 2 — Build the Renderer (Parity Comes From Output)
Goal: prove the platform can *render* AmazinglyStrange pages from Layout JSON.

- [x] Implement `renderLayout(layout)` that maps element types to real React components
- [ ] Prefer wiring to existing extracted packages (header-components, gallery-components, etc.)
- [x] Establish “golden layouts” for a handful of key pages (home, gallery, blog preview)

**Review checkpoints**
- [x] Golden layouts render correctly in at least one app (SHARED hub or a demo route)
- [ ] Visual parity is “close enough” for the chosen pages

### Step 3 — Upgrade the Editor to Author What the Renderer Supports
Goal: the editor becomes useful for real work, not just structure.

- [x] Element palette matches the renderer-supported element types
- [x] Property panels exist for each supported element type
- [~] Add delete/duplicate/reorder for sections, columns, elements
- [x] Avoid destructive operations (don’t drop content when changing column presets; prompt or migrate)

**Review checkpoints**
- [ ] You can build the golden layouts from scratch in the editor
- [ ] Save → reload is lossless

### Step 4 — Persistence + Templates
Goal: shared, repeatable admin workflows.

- [~] Backend adapter for layouts/templates (mock + REST first)
- [x] Mock/local adapter implemented (browser localStorage) and wired in Hub + ADMIN
- [x] Template library: save/apply/import/export (Hub)
- [ ] Optional: draft/publish + version history

**Review checkpoints**
- [ ] Templates apply cleanly and predictably
- [ ] Backend adapters behave identically (contract tests)

### Step 5 — Polish + Accessibility + Regression Testing
Goal: production readiness.

- [x] Undo/redo
- [x] Live preview uses the same renderer as production output
- [~] Accessibility baseline (headings, alt text, focus states)
- [x] Visual regression tests for golden layouts (Playwright screenshot snapshots in SHARED hub)

**Review checkpoints**
- [ ] No major regressions across releases (screenshots stable)
- [ ] Admin users can build pages without “escape hatch” HTML


### Integration Strategy
#### Phase 1: Extract Core Admin Tools (Current)
- Layout Manager ✅ (needs polish)

#### Next Steps
- Complete polish and testing
- Add to production admin workflows
- Create template library
- Add advanced features (collaboration, versioning)
