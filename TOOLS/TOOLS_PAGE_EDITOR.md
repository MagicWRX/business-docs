# Page Editor Tool

## Overview
Page CRUD + metadata editing tool extracted for AmazinglyStrange parity.

## Package
- `@amazing/page-editor`
- Location: `/SHARED/page-editor/`

## Connected Pages
### ADMIN App
- `/ADMIN/src/app/amazinglystrange/pages/page.tsx`

### SHARED Hub
- `/SHARED/hub/src/app/tools/page-editor/page.tsx`

## Parity Definition
- Page CRUD: title/path/metadata
- Template selection (if used)
- Integrates with Layout Manager for layout authoring, or stores a reference to a layout

## Data Contract (High Level)
- Page: `id`, `title`, `path`, `metaDescription`, optional `layoutId`/`layoutJson`

## Testing
- E2E: create page → persist → reload unchanged
- Contract: slug/path generation rules

## Next Steps
- Decide whether “Page” owns layout JSON directly or references a layout record.
