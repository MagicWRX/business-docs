# SHARED Tools Extraction Roadmap

## Overview
Plan for extracting legacy JavaScript tools from AmazinglyStrange into reusable SHARED packages.

## Parallel AI Workstreams (SSOT)
Use this document as the single source of truth for parallelizing work across multiple AI chats without destructive overlap.

### Coordination rules
- Each AI chat “claims” exactly one workstream below by adding its chat name/date and keeping edits confined to the listed files.
- Do not edit another workstream’s files unless explicitly coordinating the handoff here first.
- If a workstream needs shared decisions (schemas/contracts), write the decision into `DOCs/TOOLS/AMAZINGLYSTRANGE_PARITY_ROADMAP.md` and link back here.

### Active / Safe Parallel Workstreams
These can be developed in parallel while `TOOLS_BLOG_ENGINE.md` evolves, because they touch different files/concerns.

1) **Admin Layout (shared shell)**
- Claimed by: GitHub Copilot — 2025-12-25
- Status: ✅ Complete (Polished 2025-12-27)
- Scope: shared sidebar + route groupings + consistent admin chrome
- Files: `SHARED/admin-layout/*` and `DOCs/TOOLS/TOOLS_ADMIN_LAYOUT.md`
- Package: `@amazing/admin-layout` v0.1.0
- Avoid: editing blog-engine package components

2) **Public Blog Display parity**
- Claimed by: GitHub Copilot — 2025-12-26
- Scope: decide/render path for public blog (index + post page) and sanitization strategy
- Files: `DOCs/TOOLS/TOOLS_BLOG_DISPLAY.md` and public site routes (e.g. `Websites/amazingly-strange-website/src/app/blog/*`)
- Avoid: changing blog-engine editor UI/CRUD; keep focus on public rendering

3) **Monetization + Revenue Share docs**
- Claimed by: (unclaimed — add chat name + date)
- Scope: platform monetization model, payout splits, attribution, and integration points
- Files: `DOCs/TOOLS/TOOL_MONETIZATION.md` and `DOCs/TOOLS/TOOL_REVENUE_SHARE.md`
- Avoid: changing extracted tool packages; keep it SSOT/strategy

4) **Image Utils extraction plan**
- Claimed by: GitHub Copilot — 2025-12-25
- Scope: formalize `image-utils` extraction, URL normalization rules, and storage backends
- Files: `DOCs/TOOLS/TOOLS_IMAGE_UTILS.md` (and package only if explicitly started)
- Avoid: editing existing tool UIs; focus on shared utility contract

5) **Supabase schemas + migrations (cross-tool)**
- Claimed by: (unclaimed — add chat name + date)
- Scope: unify table schemas, optional columns, and migration scripts for parity
- Files: `Websites/amazingly-strange-website/scripts/migration/*` and `DOCs/TOOLS/TOOLS_SUPABASE_SCHEMAS.md`
- Avoid: UI/UX changes in tool packages

6) **Tool doc tightening (non-blog)**
- Claimed by: GitHub Copilot — 2025-12-26
- Scope: confirm actual Hub/Admin routes + contracts for tools other than blog-engine
- Files: `DOCs/TOOLS/TOOLS_*` excluding `TOOLS_BLOG_ENGINE.md`
- Avoid: changing code; this is documentation-only

7) **Blog Alignment (blog-engine + migration tooling)**
- Claimed by: GitHub Copilot (GPT-5.2) — 2025-12-25
- Scope: blog migration tooling + blog-engine documentation + SSOT coordination scaffolding
- Coordination note: 2025-12-25 — Admin Layout chat is permitted to make **doc-only** tightening edits to `DOCs/TOOLS/TOOLS_BLOG_ENGINE.md` (wording/placeholders only). No code changes outside its workstream.
- Files:
   - `DOCs/TOOLS/TOOLS_BLOG_ENGINE.md`
   - `Websites/amazingly-strange-website/scripts/migration/README.md`
   - `Websites/amazingly-strange-website/scripts/migration/10-migrate-blogposts-firestore-to-supabase.js`
- Avoid:
   - public rendering decisions/implementation (use `DOCs/TOOLS/TOOLS_BLOG_DISPLAY.md`)
   - schema contract ownership beyond documenting findings (use `DOCs/TOOLS/TOOLS_SUPABASE_SCHEMAS.md`)
   - monetization decisions (use `DOCs/TOOLS/TOOL_MONETIZATION.md` + `DOCs/TOOLS/TOOL_REVENUE_SHARE.md`)

8) **Email Domains (Customer branded sending — Option A)**
- Claimed by: GitHub Copilot (GPT-5.2) — 2025-12-29
- Scope: customer onboarding UI + DNS verification + sender identity management (no mailbox provisioning)
- SSOT: `DOCs/TOOLS/TOOLS_EMAIL.md` and `DOCs/BUSINESS/MAGICWRX_CUSTOMER_BRANDED_EMAIL_OPTION_A.md`
- Avoid: mailbox provisioning/reseller flows; keep it “send-as via Brevo” only

Status (current):
- ✅ ADMIN MVP implemented (Email Domains UI + TXT check endpoint)
- ✅ `/api/dns/check-txt` hardened (auth required + light rate limiting)
- 🔲 Customer self-serve onboarding UI (tenant-scoped) not implemented yet

## Suggested Development Order for AI Workstreams

Based on dependencies, priority, and current status, here's the recommended sequence for tackling the unclaimed workstreams:

1. **Public Blog Display parity** (Priority: High - depends on blog-engine completion)
   - Why next: Builds on blog-engine extraction; enables public-facing blog functionality
   - Dependencies: Blog Alignment workstream (currently in progress)

2. **Supabase schemas + migrations (cross-tool)** (Priority: High - foundational for data consistency)
   - Why next: Unifies data models across tools; critical for parity and migrations
   - Dependencies: None direct, but informs all tool integrations

3. **Tool doc tightening (non-blog)** (Priority: Medium - documentation cleanup)
   - Why next: Ensures accurate contracts for remaining tools; low-risk parallel work
   - Dependencies: None

4. **Monetization + Revenue Share docs** (Priority: Medium - business logic)
   - Why next: Strategic planning; can be developed independently
   - Dependencies: None

This order prioritizes functional dependencies first (blog display needs blog engine), then foundational data work (schemas), followed by documentation and business strategy tasks.

## Current Status

### ✅ Completed
1. **Layout Manager** - Extracted to `@amazing/layout-manager`
   - Visual page layout builder with sections/columns/elements
   - Backend-agnostic with onChange callbacks
   - Live preview integration
2. **Auth Tool** - Extracted to `@amazing/auth-tool`
   - Email/password and OAuth authentication
   - MFA support with QR codes
3. **Blog Engine** - Extracted to `@amazing/blog-engine`
   - WYSIWYG editor with visual/HTML modes
   - Backend-agnostic (mockBackend, restBackend)
   - Post CRUD, bulk delete, search/filter
4. **Media Library** - Extracted to `@amazing/media-library`
   - Drag-and-drop file upload with validation
   - Thumbnail grid with search/filter by type
   - Backend-agnostic (mockBackend, restBackend, firebaseBackend)
   - Copy URL, delete with protection for static files
   - Support for images, videos, PDFs
5. **Page Editor** - Extracted to `@amazing/page-editor`
   - Quill WYSIWYG editor with full toolbar
   - Page CRUD with title, path, meta description
   - Template selection (default, landing, blog, portfolio)
   - Image upload integration
   - Auto-generate URL path from title
   - Core page protection (cannot delete index)
   - Backend-agnostic (mockBackend, restBackend)
6. **Analytics Dashboard** - Extracted to `@amazing/analytics-dashboard`
   - Real-time visitor and page view tracking
   - Traffic source breakdown with pie chart
   - Popular pages list with view counts
   - Session duration and return rate metrics
   - Export analytics data (JSON/CSV)
   - Real-time updates support
   - Recharts integration for visualizations
   - Backend-agnostic (mockBackend, restBackend)
7. **Contact Manager** - Extracted to `@amazing/contact-manager`
   - Contact form submission management with status tracking
   - Stats dashboard (total, new, in progress, resolved)
   - Status workflow (new → in-progress → resolved → archived)
   - Filter by status with responsive buttons
   - Expandable message view with truncation
   - Reply via mailto link with pre-filled template
   - Delete with confirmation dialog
   - Export to JSON and CSV formats
   - Real-time updates support with subscription
   - Backend-agnostic (mockBackend, restBackend)
8. **Gallery Components** - Extracted to `@amazing/gallery-components`
   - Reusable frontend galleries (grid, masonry, carousel)
   - Lightbox overlay with keyboard navigation
   - Touch/swipe navigation (carousel + lightbox)
   - Lazy-loaded images
   - Tailwind-only styling (no animation library dependency)

9. **Header Components** - Extracted to `@amazing/header-components`
   - `BrandNavbar` with left/right aligned links and dropdowns
   - `BrandHeaderContainer` for brand header background settings
   - `HeaderSlidingImages` promo slider (timed slide/pause/fade loop)
   - `useHeaderSlider` hook for the slider sequencing

10. **Image Utils** - Extracted to `@amazing/image-utils`
   - URL resolution for Firebase, S3, local paths
   - Image processing (resize, crop, optimize) with Canvas API
   - CDN integration (Cloudinary, Imgix)
   - TypeScript-first, backend-agnostic

11. **Public Blog Display parity** - Implemented in `Websites/amazingly-strange-website/src/app/blog/`
   - Blog index page with pagination and tag filtering
   - Individual post pages with SEO meta tags
   - HTML sanitization using DOMPurify
   - Integration with `@amazing/blog-engine` and `@amazing/image-utils`

### 🚧 In Progress
1. **Email Domains (Option A)**
   - ADMIN MVP complete; customer self-serve onboarding remains

### ✅ Recently Completed
1. **Admin Layout** (2025-12-27)
   - Collapsible sidebar with keyboard shortcuts
   - localStorage persistence
   - Section-based navigation
   - Full TypeScript + tests

## Tools to Extract

Note: This section is now primarily **historical inventory**. Most tools listed below have already been extracted and integrated (see **Current Status** above). Keep it as a reference for legacy names/paths.

### Priority 1: Core Admin Tools

#### Media Manager (`/admin/js/media-manager.js`)
**Status**: ✅ Complete  
**Package**: `@amazing/media-library`  
**Size**: 566 lines (legacy) → 4 components + 3 backends  
**Features**:
- ✅ Drag-and-drop file upload with visual feedback
- ✅ File validation (type, size limits)
- ✅ Thumbnail grid display with hover actions
- ✅ Search and filter by file type (image/video/document)
- ✅ Copy URL to clipboard
- ✅ Delete with confirmation (static file protection)
- ✅ Backend-agnostic architecture
- ✅ Mock backend for demos
- ✅ REST API adapter
- ✅ Firebase Storage + Firestore adapter
- ✅ File size formatting and metadata display

**Integration**: Used in `/ADMIN/src/app/amazinglystrange/media/page.tsx`

---

#### Page Manager (`/admin/js/page-manager.js`)
**Status**: ✅ Complete  
**Package**: `@amazing/page-editor`  
**Size**: 422 lines (legacy) → 5 components + 3 backends  
**Features**:
- ✅ Quill WYSIWYG editor (v2.0.2) with full toolbar
- ✅ Page CRUD operations (create, read, update, delete)
- ✅ Auto-generate URL path from title
- ✅ Template selection (default, landing, blog, portfolio)
- ✅ SEO meta description field (160 char limit)
- ✅ Image upload with inline insertion
- ✅ Core page protection (index cannot be deleted)
- ✅ Search and filter pages
- ✅ Preview pages in new tab
- ✅ Backend-agnostic architecture
- ✅ Mock backend with 3 sample pages
- ✅ REST API adapter
- ✅ Firebase adapter stub (requires firebase package)

**Integration**: Used in `/ADMIN/src/app/amazinglystrange/pages/page.tsx`

---

#### Analytics Manager (`/js/analytics-manager.js`)
**Status**: ✅ Complete  
**Package**: `@amazing/analytics-dashboard`  
**Size**: 384 lines (legacy) → 5 components + 2 backends  
**Features**:
- ✅ Real-time visitor tracking with unique visitor IDs
- ✅ Page view counting and session analytics
- ✅ Average session duration calculation (minutes)
- ✅ Return visitor rate percentage
- ✅ Traffic source categorization (Search, Social, Direct, Other)
- ✅ Pie chart visualization with Recharts
- ✅ Popular pages list with view counts
- ✅ Real-time updates via WebSocket/polling
- ✅ Export analytics data (JSON/CSV)
- ✅ Auto-refresh with configurable interval
- ✅ Stats cards with loading states
- ✅ Backend-agnostic architecture
- ✅ Mock backend with simulated real-time updates
- ✅ REST API adapter with polling support

**Integration**: Used in `/ADMIN/src/app/amazinglystrange/analytics/page.tsx`

---

#### Contact Manager (`/js/contact-manager.js`)
**Status**: ✅ Complete  
**Package**: `@amazing/contact-manager`  
**Size**: 626 lines (legacy) → 5 components + 2 backends  
**Features**:
- ✅ Contact form submission management
- ✅ Status tracking (new, in-progress, resolved, archived)
- ✅ Stats dashboard with 4 metrics cards
- ✅ Filter by status with active state highlighting
- ✅ Expandable message view (truncate at 150 chars)
- ✅ Reply via mailto with pre-filled subject and body
- ✅ Delete with confirmation dialog
- ✅ Export contacts to JSON and CSV
- ✅ Real-time updates subscription support
- ✅ Contact metadata (name, email, phone, company, project type)
- ✅ Timestamp formatting with date-fns
- ✅ Responsive design with mobile-friendly actions
- ✅ Backend-agnostic architecture
- ✅ Mock backend with 5 sample contacts
- ✅ REST API adapter with polling

**Integration**: Used in `/ADMIN/src/app/amazinglystrange/contacts/page.tsx`

---

### Priority 2: Frontend Display Components

#### Gallery Components
**Status**: ✅ Complete  
**Package**: `@amazing/gallery-components`  
**Legacy Sources**:
- `artwork-gallery.js`
- `gallery.js`
- `image-fade-gallery.js`

**Features**:
- ✅ `GalleryGrid` (responsive grid + lightbox)
- ✅ `GalleryMasonry` (CSS columns masonry + lightbox)
- ✅ `GalleryCarousel` (autoplay + indicators + touch/swipe)
- ✅ `GalleryLightbox` (overlay + keyboard + touch/swipe)
- ✅ `ArtworkGallery` (hero + thumbnails + lightbox)

**Integration**: Used in `/ADMIN/src/app/amazinglystrange/gallery/page.tsx`

---

#### Blog Display (`/js/blog-display.js`)
**Status**: ✅ Complete (public blog display parity implemented)  
**Features**:
- Public-facing blog rendering
- Pagination
- Categories/tags
- Comments (if applicable)

---

#### Header Controllers
**Files**:
- `header-sliding-controller.js`
- `brand-header-manager.js`

**Status**: ✅ Complete  
**Package**: `@amazing/header-components`  
**ADMIN Demo**: `/amazinglystrange/header`

**Features**:
- ✅ Responsive navbar links with right-aligned group
- ✅ Dropdown support (legacy `dropdown` schema)
- ✅ Brand header container background settings
- ✅ Sliding promo images sequence via hook-driven timing

---

Image Utils: ✅ complete (see **Current Status** above)

---

#### Font Loader (`/js/font-loader.js`)
**Status**: Low priority (Next.js has built-in font optimization)

---

## Integration Strategy (current)

Status: ✅ extraction + ADMIN integration are complete for the currently listed tool packages.

Remaining work is tracked as workstreams above (schemas, monetization docs, and Email Domains customer self-serve).

## Technical Approach

### Package Structure
```
/SHARED/
  /<tool-name>/
    /src/
      /components/  - React components
      /lib/         - Utility functions
      /types.ts     - TypeScript definitions
    /dist/          - Compiled output
    package.json
    tsconfig.json
    README.md
```

### Backend Abstraction Pattern
All packages follow this pattern:
```ts
interface ToolProps {
  // Backend callbacks (optional)
  loadData?: () => Promise<Data[]>;
  saveData?: (data: Data) => Promise<void>;
  deleteData?: (id: string) => Promise<void>;
  
  // Optional user context
  currentUser?: any;
  
  // Optional in-memory mode
  initialData?: Data[];
}
```

### Dependencies to Standardize
- **React**: 19.x
- **TypeScript**: 5.x
- **Icons**: lucide-react
- **Dates**: date-fns
- **State**: Built-in React hooks (avoid Redux/Zustand)

## Next Steps (remaining / unclaimed)

1. **Supabase schemas + migrations (cross-tool)** — claim workstream #5 and produce/confirm `TOOLS_SUPABASE_SCHEMAS.md`.
2. **Monetization + Revenue Share docs** — claim workstream #3 and draft SSOT docs.
3. **Email Domains (Option A) customer self-serve UI** — complete the tenant-scoped onboarding flow (workstream #8).

## Notes

- All Firebase dependencies must be removed
- Each package should work standalone
- Provide mock backends for demos
- Include REST backend wrappers
- TypeScript-first approach
- Mobile-responsive by default
