# Blog Engine Tool

## Workstream Ownership (SSOT)
- Workstream: **Blog Alignment (blog-engine + migration tooling)**
- Claimed by: GitHub Copilot (GPT-5.2) — 2025-12-25
- Coordination hub: `DOCs/TOOLS/SHARED_TOOLS_ROADMAP.md`

### Document status
- Status: draft (doc-only complete)
- Last reviewed: 2025-12-25

### This workstream edits
- `DOCs/TOOLS/TOOLS_BLOG_ENGINE.md`
- `Websites/amazingly-strange-website/scripts/migration/README.md`
- `Websites/amazingly-strange-website/scripts/migration/10-migrate-blogposts-firestore-to-supabase.js`

### Avoid / touchpoints
- Public blog rendering parity: `DOCs/TOOLS/TOOLS_BLOG_DISPLAY.md` (+ site routes)
- Schemas/contracts ownership: `DOCs/TOOLS/TOOLS_SUPABASE_SCHEMAS.md`
- Vision/phase exit criteria: `DOCs/TOOLS/AMAZINGLYSTRANGE_PARITY_ROADMAP.md`

## Overview
Authoring UI (`@amazing/blog-engine`) plus migration tooling notes for moving legacy Firestore blog posts into Supabase.

## Scope (this workstream)
- Authoring tool alignment: data contract expectations for create/update/list/delete
- Migration guidance and field mapping (Firestore → Supabase)
- Adapter contract expectations for backend implementations (ADMIN + Hub)

## Out of scope (handled elsewhere)
- Public blog rendering decisions/implementation: see `DOCs/TOOLS/TOOLS_BLOG_DISPLAY.md`
- Canonical schema ownership: see `DOCs/TOOLS/TOOLS_SUPABASE_SCHEMAS.md`

## Package
- `@amazing/blog-engine`
- Location: `/SHARED/blog-engine/`

## Connected Pages
### SHARED Hub
- `/SHARED/hub/src/app/tools/blog-engine/page.tsx`

### ADMIN App
- `/ADMIN/src/app/blog/page.tsx` (uses `@amazing/blog-engine` `BlogManager`)
- `/ADMIN/src/app/admin/amazinglystrange/blog/page.tsx` (uses `@amazing/blog-engine` backed by Supabase `blog_posts`)

## Parity Definition
- Post CRUD: create/edit/delete
- Editor supports rich text (and/or HTML mode)
- Public rendering strategy is decided and recorded in `DOCs/TOOLS/TOOLS_BLOG_DISPLAY.md` (required for end-to-end parity)

## Data Contract (High Level)
- Post: `id`, `title`, `slug`, `content`, `excerpt`, `tags`, `status`, `author`, `views`, `likes`, `featured`, `published`, `createdAt`, `updatedAt`, `lastModified`, `imageUrl`, `imageAlt`
- DataProvider interface: `getPosts()`, `createPost()`, `updatePost()`, `deletePost()`, `bulkDeletePosts()`

## Decisions (TBD)
These are intentionally left as placeholders until finalized. When decided, record the decision (and date) here and ensure it is consistent with `DOCs/TOOLS/TOOLS_BLOG_DISPLAY.md` and `DOCs/TOOLS/TOOLS_SUPABASE_SCHEMAS.md`.

- **Featured image source**: TBD
  - Options: derive from first `<img>` in `content` | store canonical `image_url` column | both
- **Tags normalization**: TBD
  - Options: preserve original case | normalize to lowercase at ingest | normalize on query
- **HTML sanitization enforcement point**: TBD
  - Options: sanitize on write (ADMIN/backend) | sanitize on render (public site) | both

## Legacy AmazinglyStrange (Firebase) Blog SSOT
The production Firebase site stores posts in Firestore collection `blogPosts` and renders them client-side.

### Firestore fields observed
- `title`: string
- `content`: string (HTML fragments; can include `<img>` and inline styles/classes)
- `excerpt`: string (admin generates from stripped text, ~150 chars)
- `status`: string (`published` | `draft`)
- `published`: boolean (admin sets `status === 'published'`)
- `timestamp`: Firestore Timestamp (used for ordering; also treated as “publishedAt”)
- `createdAt`, `updatedAt`, `lastModified`: Firestore Timestamp
- `author`: string (usually current user email)
- `slug`: string (slugified from title)
- `tags`: array of strings
- `featured`: boolean
- `views`, `likes`: numbers

### Rendering behavior observed
- Listing page loads up to 50 posts ordered by `timestamp desc`.
- Homepage preview loads top 3 posts ordered by `timestamp desc`.
- Preview derives:
	- `readTime` as `ceil(wordCount/200)` (computed from raw HTML string)
	- `featuredImage` as the first `<img>` in `content`
- Images in `content` may use relative Storage paths (`blog-images/...` or `media/...`). These are resolved at runtime via Firebase Storage `getDownloadURL`, with a fallback to a constructed `firebasestorage.googleapis.com` URL.
- The public blog renderer sanitizes HTML to an allowlist of tags and attributes, and:
	- strips non-http(s)/mailto/tel links
	- adds `target="_blank"` + `rel="noopener noreferrer"` for external links

### Noted legacy inconsistency
- The legacy renderer script looks for IDs like `blogLoadingIndicator` / `noBlogPosts` / `blogErrorState`, while the legacy insert markup uses `loadingIndicator` / `noPosts` and no error state container.
- When migrating, prefer a single, consistent contract between markup and renderer.

## Migration to Supabase + `@amazing/blog-engine`
### Recommended Supabase mapping
Map Firestore → Supabase `blog_posts` roughly as:
- `title` → `title`
- `content` (HTML) → `content` (or `content_html` if you split)
- `excerpt` → `excerpt`
- `slug` → `slug`
- `tags[]` → `tags` (Postgres `text[]`) or `tags` JSON
- `featured` → `featured`
- `views`, `likes` → `views`, `likes`
- `timestamp` → `published_at`
- `createdAt`, `updatedAt` → `created_at`, `updated_at`
- (optional) store original Firestore doc ID in `metadata->>'firestoreId'` for traceability

### Image migration choices
- Fastest cutover: keep existing Firebase Storage URLs (or rewrite `blog-images/...` → full Firebase download URL) and continue rendering them.
- Cleanest long-term: bulk copy `blog-images/` (and `media/`) into Supabase Storage and rewrite `<img src>` values in `content` to Supabase public URLs.

### Minimal migration checklist
1. Export Firestore `blogPosts` to JSON with timestamps normalized (ISO strings).
2. Transform fields to match `blog_posts` schema (including `tags` type).
3. Normalize image URLs inside HTML content.
4. Import rows into Supabase.
5. Ensure server-side (or trusted client-side) HTML sanitization in the Next.js rendering path.

## Testing
- Contract tests for backend adapter
- E2E: create/edit post → persist → reload unchanged
- Visual regression: snapshot list page and post page for representative fixtures (Newsletter and Featured posts)
- Accessibility (axe) checks on editor and public post page

## Backend Adapter Contract (Required)
The `@amazing/blog-engine` package must provide clear adapter hooks so host apps can implement persistence. Adapters should be robust to optional columns and schema drift.

Interface (TypeScript, draft):

```ts
export type BlogPost = {
  id?: string;
  title: string;
  slug?: string;
  content: string; // HTML
  excerpt?: string;
  tags?: string[];
  featured?: boolean;
  imageUrl?: string;
  imageAlt?: string;
  status?: 'draft' | 'published';
  publishedAt?: string; // ISO
  createdAt?: string;
  updatedAt?: string;
  metadata?: Record<string, any>;
};

export interface BlogBackend {
  list(opts?: { limit?: number; offset?: number; cursor?: string }): Promise<BlogPost[]>;
  get(idOrSlug: string): Promise<BlogPost | null>;
  create(post: BlogPost): Promise<BlogPost>;
  update(post: BlogPost): Promise<BlogPost>;
  delete(id: string): Promise<void>;
  // Optional bulk operations
  bulkDelete?(ids: string[]): Promise<void>;
}
```

Adapter responsibilities:
- Probe the backend schema when necessary and avoid writing non-existent optional fields (see Supabase probe pattern in migration script).
- Perform server-side sanitization if backend accepts raw HTML.
- Ensure slug uniqueness (create slug if missing, and return final slug on save).
- Accept `tags` as array but adapt to backend column type (adapter should detect and coerce; migration script shows an example).

## Adapter Example (Supabase, sketch)
- Use the migration script's probing approach to detect `tags` column type and choose: text[] (array), jsonb, or text (comma-separated).
- Use upsert on `slug` to avoid duplicate imports.

## Schema (Suggested SQL for `blog_posts`)
```sql
CREATE TABLE public.blog_posts (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  tags text[], -- or jsonb
  featured boolean DEFAULT false,
  image_url text,
  image_alt text,
  status text DEFAULT 'draft',
  is_published boolean DEFAULT false,
  published_at timestamptz,
  views integer DEFAULT 0,
  likes integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'
);
```

## Sanitization / Rendering Rules
- If rendering stored HTML: sanitize on the server with an allowlist of tags/attributes and strict URL validation for links and images (no javascript: URIs). Use `isomorphic-dompurify` on server render or build step.
- Allow image attributes: `src`, `alt`, `title`, `width`, `height`, `loading`.
- For links: only allow `http(s)`, `mailto:`, `tel:`; mark external links `target="_blank" rel="noopener noreferrer"`.

## Migration / Cutover Checklist (detailed)
1. Run `scripts/migration/02-export-firebase.js` to export legacy data to `exports/blog-posts.json`.
2. Run `scripts/migration/10-migrate-blogposts-firestore-to-supabase.js --dry-run --limit 10` to verify transformations and tags coercion.
3. Copy assets (`06-copy-assets.sh`), upload to Supabase storage if doing full asset migration (`09-upload-media-to-supabase.js`).
4. Re-run `10-migrate...` without `--dry-run` to import into Supabase. Inspect logged `tagsType` to confirm tag column behavior.
5. Run integration tests: adapter contract tests + E2E: create/edit/publish roundtrip.
6. Smoke test public rendering on staging: index + post pages + image lightbox + analytics events.
7. Switch DNS/traffic when staging is validated, keep the Firebase site as fallback for a short window.

## Acceptance Criteria
- All posts import without data loss for required fields (`title`, `content`, `slug`).
- Optional fields (`imageUrl`, `imageAlt`, `tags`) are persisted only where columns exist and mapped correctly.
- Public rendering shows images and sanitizes HTML consistently with legacy behavior.
- Admin authoring round-trip: create → save → reload shows unchanged content.
- Playwright visual snapshots for canonical fixtures match the golden set.

## Tests (examples)
- Contract test: backend adapter `create`/`get`/`list`/`update`/`delete`.
- Migration test: run exporter → transform → import (dry-run) and assert transformed JSON fields (slug, image urls rewritten, tags coercion).
- E2E test (Playwright):
  - Admin: login → create post with image and tags → save → list shows post → edit → save
  - Public: visit index → open post → image lightbox opens on click

## Open Questions
If these remain open, they should stay tracked here; otherwise promote answers into **Decisions (TBD)** above.

- Featured image source (see **Decisions (TBD)**)
- Tags normalization (see **Decisions (TBD)**)
- HTML sanitization enforcement point (see **Decisions (TBD)**)

## Next Steps
- Confirm whether blog authoring lives in ADMIN under AmazinglyStrange routes or elsewhere.
- Add adapter test harness to `SHARED/blog-engine` and a contract test in `SHARED/blog-engine/test`.

## Links
- Migration runbook: Websites/amazingly-strange-website/scripts/migration/README.md
- Migration script: Websites/amazingly-strange-website/scripts/migration/10-migrate-blogposts-firestore-to-supabase.js
- SSOT coordination: DOCs/TOOLS/SHARED_TOOLS_ROADMAP.md
- Vision: DOCs/TOOLS/AMAZINGLYSTRANGE_PARITY_ROADMAP.md
