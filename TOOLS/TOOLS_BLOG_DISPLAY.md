## Blog Display (Public) Tool

### Overview
Public-facing blog rendering for AmazinglyStrange parity (blog index + post page). This is separate from `@amazing/blog-engine` (authoring UI).

### Workstream Claim
- Owner (AI chat / person): GitHub Copilot — 2025-12-26
- Date claimed: 2025-12-26
- Status: ✅ Complete - Public blog routes implemented with sanitization

### Scope
- Blog index page (list, pagination)
- Blog post page (SEO, canonical URL, share meta)
- HTML sanitization/allowlist (if rendering stored HTML)
- Tag filtering UX (optional)

### Non-Goals
- Authoring UI (handled by `@amazing/blog-engine`)
- Admin CRUD (handled by ADMIN integration)

### Rendering Strategy Decision (Finalized)
Decision: Render stored HTML (sanitized/allowlisted) — faster to ship, compatible with current blog-engine output.

This has been implemented in `Websites/amazingly-strange-website/src/app/blog/` using DOMPurify for sanitization.

### Data Contract (Initial)
Minimal fields needed for public rendering (confirm when inspecting `@amazing/blog-engine`):
- `id`
- `title`
- `slug`
- `content` (HTML or blocks)
- `excerpt`
- `tags`
- `publishedAt`
- `author` (optional)
- `coverImage` / `imageAlt` (optional)

### Confirmed model (from `@amazing/blog-engine`)
The package exposes a `BlogPost` type with these fields — use this as the source-of-truth when mapping public rendering:
- `id: string`
- `title: string`
- `content: string` (HTML)
- `excerpt?: string`
- `status: 'draft' | 'published'`
- `author: string` (author identifier/string)
- `slug: string`
- `views: number`
- `likes: number`
- `featured: boolean`
- `tags: string[]`
- `published: boolean`
- `createdAt: Date | string | number`
- `updatedAt: Date | string | number`
- `lastModified: Date | string | number`
- `imageUrl?: string`
- `imageAlt?: string`

### Sanitization Rules (proposed)
- Public rendering MUST run `sanitizeHtml` server-side (or during a trusted build step) before injecting `post.content` into the DOM (e.g. via `dangerouslySetInnerHTML`). Do not render raw HTML directly.
- Recommended implementation: import `sanitizeHtml` from `@amazing/blog-engine` to keep the policy consistent between authoring and display.
- Whitelist tags: `p, a, ul, ol, li, strong, em, blockquote, h1-h3, img, figure, figcaption, pre, code`
- Strip all `on*` attributes and unsafe attributes; allow `src`, `alt`, `title`, `href` (only http(s): or relative), `loading` for images.
- Enforce `rel="noopener noreferrer"` on external links and `target="_blank"` only when intended.
- Resolve/normalize relative image URLs using `@amazing/image-utils` when available.

### Routes / Implementation Target
- Target site (Next.js): add routes under `Websites/amazingly-strange-website/src/app/blog/` for `index` and `[slug]`.
- Prefer SSR/SSG for SEO with incremental/static options.

### Testing Strategy
- Unit tests for sanitization util and URL resolver.
- Snapshot tests for rendered output.
- E2E: index -> open post -> verify images and links; compare to admin preview where feasible.

### Open Questions
- Pagination strategy (cursor vs offset)
- Canonical URL format (trailing slash, query params)

### Implementation Checklist
- [x] Map `@amazing/blog-engine` model fields to public contract
- [x] Implement sanitization util and unit tests
- [x] Implement `BlogIndex` + `BlogPost` pages in `Websites/amazingly-strange-website/src/app/blog/`
- [x] Create mock/rest adapter examples for public read operations
- [x] Add e2e tests in `SHARED/hub` or website test suite
- [x] Finalize docs and link back to `DOCs/TOOLS/SHARED_TOOLS_ROADMAP.md`

### Links
- SSOT coordination: `DOCs/TOOLS/SHARED_TOOLS_ROADMAP.md`
- Authoring tool: `DOCs/TOOLS/TOOLS_BLOG_ENGINE.md`

---
File updated to claim the Public Blog Display workstream and provide an initial spec/checklist.
