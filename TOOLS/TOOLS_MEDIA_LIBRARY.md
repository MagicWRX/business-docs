# Media Library Tool

## Overview
Media upload/browse tool extracted for AmazinglyStrange parity.

## Package
- `@amazing/media-library`
- Location: `/SHARED/media-library/`

## Connected Pages
### ADMIN App
- `CODE:`DOCs/TOOLS/ADMIN/src/app/amazinglystrange/media/page.tsx``

### SHARED Hub
- `CODE:`DOCs/TOOLS/SHARED/hub/src/app/tools/media-library/page.tsx``

## Parity Definition
- Upload (with validation), browse/search/filter
- Copy URL, delete protections
- Works with chosen backend adapter

## Data Contract (High Level)
- Media item: `id`, `name`, `url`, `type`, `size`, `uploaded`, optional `alt`, `isStatic`, `storagePath`

## Testing
- E2E: upload (mock) → appears in grid → copy URL
- Contract: backend adapters behave consistently

## Next Steps
- Confirm production backend (Supabase storage vs REST vs other).
