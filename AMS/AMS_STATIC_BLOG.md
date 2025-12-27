# Amazingly Strange Static Blog

Created: 2025-10-15
Last updated: 2025-10-15

This document is the single source of truth for the current Amazingly Strange static blog system. It describes the architecture, data flow, operational scripts, maintenance procedures, and transition considerations for moving to a dynamic stack (Node.js on Vercel with Supabase) later.

## Current Architecture Overview

- Frontend is static HTML/CSS/JS served from `public/`.
- Blog content is stored in Firebase Firestore collection `blogPosts`.
- Blog images are stored in Firebase Storage under `blog-images/`.
- Public pages load posts on the client via Firebase Web SDK (v10).
- Two main JS entry points:
  - `public/js/blog-display.js`: full blog page renderer.
  - `public/js/blog-preview.js`: homepage preview (latest 3 posts) with snippet and first image.
- Inserts loaded into pages at runtime:
  - `public/inserts/blog-display.html` used by `public/blog.html` via fetch.
  - `public/inserts/blog-preview.html` used by homepage to render preview.
- Centralized Firebase config: `public/js/firebase-config.js` (imported as ES module by display/preview scripts).

## Key Files and Responsibilities

- `public/pages/blog.html` or `public/blog.html`: loads navbar/footer, fetches `inserts/blog-display.html`, then loads `blog-display.js` (as module).
- `public/inserts/blog-display.html`: containers and styles for the full post list; IDs: `blogPosts`, `loadingIndicator`, `noPosts` (older naming).
- `public/inserts/blog-preview.html`: containers and styles for the preview; IDs: `blogPreviewContainer`, `blogLoadingIndicator`, `noBlogPosts`.
- `public/js/blog-display.js`:
  - Queries `blogPosts` ordered by `timestamp` desc, limit 50.
  - Processes post HTML content, resolves image paths from `blog-images/` to Firebase Storage download URLs (SDK with fallback), sanitizes HTML, renders posts.
  - Shows loading, empty, and error states; supports auto-refresh with backoff; exposes `window.refreshBlogPosts`.
- `public/js/blog-preview.js`:
  - Queries top 3 posts; extracts first image and a text snippet.
  - Resolves `blog-images/` paths to Storage URLs (SDK with encoded fallback).
  - Renders preview cards with date, author, read time, tags, and Read More link.
- `public/js/firebase-config.js`: provides initialized `db` for Firestore and any shared SDK setup.

## Data Model (Firestore: `blogPosts`)

Document fields commonly used:
- `title`: string
- `content`: string (HTML fragments; may include `<img>` with `src` referencing Firebase Storage or relative `blog-images/...` path)
- `author`: string
- `timestamp`: Firestore Timestamp (publish time)
- `createdAt`: Firestore Timestamp
- `updatedAt`: Firestore Timestamp
- `tags`: array<string>
- `featured`: boolean
- `published` / `status`: boolean or string (e.g., `published`)
- `views`, `likes`: numbers
- `slug`: string (derived from title)

Notes:
- Display relies on `timestamp` for ordering.
- Preview computes a `readTime` based on word count of `content`.

## Linux Tree of Blog Flow (Essential Paths)

```bash
public/
├─ blog.html                 # Loads blog insert and blog-display.js
├─ inserts/
│  ├─ blog-display.html      # Full blog DOM scaffolding + styles
│  └─ blog-preview.html      # Homepage preview DOM + styles + script include
├─ js/
│  ├─ blog-display.js        # Full list fetch+render, image resolution, sanitize
│  ├─ blog-preview.js        # Top 3 preview, image+snippet extraction
│  └─ firebase-config.js     # Centralized Firebase client config
└─ pages/
   └─ blog.html              # (if used) routed blog page variant

scripts/
├─ add-sample-blog-posts.js          # Seed multiple posts with realistic fields
├─ add-test-blog-post-with-image.js  # Seed one post using blog-images/ path
├─ firestore-utilities.js            # Generic Admin SDK helpers (examples)
└─ deploy-production.sh              # Deployment helper (hosting/rules)

docs/
├─ archived/BLOG-ENHANCEMENT-SUMMARY.md  # Rich text editor and display updates
└─ archived/BLOG_IMAGE_DISPLAY_FIX.md    # Image display pipeline fixes
```

## Visual Diagram (Mermaid)

```mermaid
flowchart TD
  A[Admin or Seeding Script] -->|Create/Update| B[(Firestore blogPosts)]
  A -->|Upload Images| C[(Firebase Storage blog-images/)]

  subgraph Static Site (public/)
    D[blog.html + blog-display.html] --> E[js/blog-display.js]
    H[index.html + blog-preview.html] --> I[js/blog-preview.js]
  end

  E -->|query latest 50| B
  E -->|resolve img src via SDK or fallback| C
  I -->|query latest 3| B
  I -->|resolve first image via SDK or fallback| C

  B -->|posts data| E
  C -->|download URLs| E
  B -->|posts data| I
  C -->|download URLs| I

  E -->|render sanitized HTML| U[Full Blog UI]
  I -->|render preview cards| V[Homepage Preview]
```

## Operational Scripts and How They’re Used

All scripts require Firebase Admin credentials (Application Default Credentials or service account) and the `amazingly-strange` project context.

- `scripts/add-sample-blog-posts.js`
  - Seeds 5 posts with fields: title, content, author, tags, featured, published, timestamp, createdAt, updatedAt, views, likes, slug.
  - Skips if collection already has posts (basic guard).
  - Usage:
    ```bash
    node scripts/add-sample-blog-posts.js
    ```

- `scripts/add-test-blog-post-with-image.js`
  - Creates a single post with an `<img src="blog-images/...">` reference to validate image resolution and Storage access paths.
  - Usage:
    ```bash
    node scripts/add-test-blog-post-with-image.js
    ```

- `scripts/firestore-utilities.js`
  - Example admin utilities for get/query/pagination. Adapt as needed for maintenance or exports.
  - Usage (example):
    ```bash
    node scripts/firestore-utilities.js
    ```

- `scripts/deploy-production.sh`
  - Helper for production deploys (Firebase Hosting/Rules). Run from repo root.

## Image Handling Pipeline

- Authors may paste images into `content` using relative `blog-images/...` paths or full Firebase Storage URLs.
- `blog-display.js` and `blog-preview.js` attempt to resolve relative paths via Firebase Storage SDK `getDownloadURL`.
- If SDK resolution fails, scripts fall back to encoded `https://firebasestorage.googleapis.com/v0/b/amazingly-strange.appspot.com/o/<encoded>?alt=media` URLs.
- Display script sanitizes HTML to allow a safe subset of tags and attributes.

### Image Display UX
- Inline images default to an inline/thumbnail style (`.blog-img-inline`) so text can wrap around them (right float by default).
- Clicking an image opens a full-size overlay/lightbox; Esc or clicking outside closes it. Images are keyboard accessible (Enter/Space).
- Authors can optionally use `wrap-left` or `wrap-right` classes on `<img>` to control float direction.
- Currently a single asset is used for both inline and overlay; inline is visually scaled, overlay shows the original resolved URL at full size.

### Admin Editor Image Controls
- **Toolbar Buttons**: Small (30%), Medium (50%), Large (80%) sizes; Left/Right wrap; Clear all styling.
- **Usage**: Click an image in the editor to select it (green border), then use toolbar buttons to apply classes.
- **CSS Classes**: `.size-sm`, `.size-md`, `.size-lg`, `.wrap-left`, `.wrap-right` work in both editor and live display.
- **Selection Detection**: Multiple fallback methods ensure clicked images are properly detected for styling.

## Maintenance Procedures (Live Site)

- Add a new post (scripted seed):
  1. Prepare HTML content (ensure `<img>` tags either use full Storage URLs or `blog-images/...`).
  2. Use `add-test-blog-post-with-image.js` as a template, or run `add-sample-blog-posts.js` for bulk seeds.
  3. Verify on `public/blog.html` and homepage preview.

- Add a new post (admin panel, if applicable):
  - Use the protected admin page to compose HTML and images (see `docs/archived/BLOG-ENHANCEMENT-SUMMARY.md`).
  - **Image Controls**: Insert image with 🖼️ button, click image to select (green border), use toolbar buttons:
    - 📏 Small (30%), 📐 Medium (50%), 📊 Large (80%) for sizing
    - ⬅️ Left, ➡️ Right for text wrapping
    - 🗑️ Clear to remove all styling
  - Images maintain their styling when published to the live blog.

- Verify image resolution:
  - Confirm images render on the full blog page and in preview.
  - If a relative path fails, confirm the file exists in Firebase Storage under `blog-images/` and that Storage rules permit public reads for published assets.

- Update an existing post:
  - Edit the document in Firestore (title/content/tags). Ensure `updatedAt` is set.
  - Keep `timestamp` consistent for ordering; bump if you want it resurfaced.

- Production deployment:
  - Use your established `deploy-production.sh` process to publish Hosting and update rules as needed.

- Logging and monitoring:
  - Client scripts log initialization, queries, and image processing steps to the browser console.
  - Errors show user-friendly states and can be retried.

## Known Constraints and Notes

- Ordering depends on `timestamp`; ensure it’s set for all published posts.
- HTML is sanitized client-side; keep to allowed tags/attributes.
- Image resolution prefers SDK; falls back to public URL encoding.
- Preview extracts first image and creates a short text snippet; not a full WYSIWYG render.

## Transition Plan Considerations (to Node.js + Vercel + Supabase)

- Data export:
  - Export Firestore `blogPosts` into a JSON/CSV with fields listed above.
  - Migrate `content` HTML as-is; keep image URLs compatible.
- Image assets:
  - Option A: Keep Firebase Storage and hotlink existing download URLs during migration.
  - Option B: Bulk copy `blog-images/` to new storage (Supabase Storage or S3) and rewrite URLs in `content`.
- API layer:
  - Replace client-side Firestore queries with server-side API routes on Vercel.
  - Implement pagination, filtering, and tag queries.
- Rendering:
  - SSR or ISR for blog index and post pages for SEO. Maintain HTML sanitization on the server.
- Backfill tasks:
  - Generate slugs deterministically; enforce uniqueness.
  - Normalize timestamps to ISO.
  - Maintain `createdAt`/`updatedAt` fidelity.

## Changelog (Ongoing Records)

- 2025-10-15: Initial single source of truth created; documented architecture, scripts, flow, and transition guidance.

## References

- `docs/archived/BLOG-ENHANCEMENT-SUMMARY.md`
- `docs/archived/BLOG_IMAGE_DISPLAY_FIX.md`
- `public/js/blog-display.js`
- `public/js/blog-preview.js`
- `public/inserts/blog-display.html`
- `public/inserts/blog-preview.html`

## Appendix: Maintenance Log

Use this section to record every live content or system update affecting the static blog. Keep entries brief, factual, and link to commits, script runs, or tickets when applicable.

Recommended cadence: update on each of the following actions: new post published, post updated, image asset added/changed, rule/deploy change, script run impacting content.

### Entry Template

- Date (UTC): YYYY-MM-DD
- Action: short verb phrase (e.g., "Publish post", "Update image", "Deploy hosting")
- Affected: post title(s) or asset path(s)
- Method: admin panel | script | console | deploy
- Details: one or two lines; include IDs/paths and purpose
- Links: commit/PR, Firebase console doc ID, ticket, or run logs

Example:
- Date (UTC): 2025-10-15
- Action: Publish post
- Affected: "Monsters Reign Vinyl Sticker Collection"
- Method: script
- Details: Seeded via `scripts/add-test-blog-post-with-image.js`; image path `blog-images/1757364468061-10-Monsters-Reign-Vinyl-Sticker.jpg`
- Links: commit abc123, Firestore doc ID xyz789

### Entries

- Date (UTC): 2025-10-15
- Action: Establish single source of truth
- Affected: docs/AMS_STATIC_BLOG.md
- Method: docs
- Details: Created static blog architecture and operations document; added Linux tree, Mermaid diagram, scripts overview, maintenance procedures, and changelog.
- Links: commit N/A (working copy)

- Date (UTC): 2025-10-15
- Action: Add Maintenance Log appendix
- Affected: docs/AMS_STATIC_BLOG.md
- Method: docs
- Details: Added structured template and guidance for ongoing operational entries.
- Links: commit N/A (working copy)

- Date (UTC): 2025-10-15
- Action: Improve image display UX
- Affected: public/inserts/blog-display.html, public/js/blog-display.js
- Method: code edit
- Details: Added inline/wrapped image class, lightbox overlay with keyboard support, and binding after post render.
- Links: commit <to-fill>

- Date (UTC): 2025-10-15
- Action: Add image size/wrap controls to admin editor
- Affected: public/protected-content/admin-access.html, public/js/admin-access.js
- Method: code edit
- Details: Added toolbar buttons for Small/Medium/Large image sizes and Left/Right/Clear wrap controls; click image to select, then apply via toolbar. Improved image selection detection with multiple fallback methods.
- Links: commit <to-fill>
- Status: ✅ Tested and working

Note: No confirmed blog content or hosting changes were found in git commits since 2025-09-01. If updates occurred via Firebase Console or scripts without commits, please add entries above with their dates and details.
