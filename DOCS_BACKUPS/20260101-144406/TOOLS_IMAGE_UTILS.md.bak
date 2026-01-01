# Image Utils Tool

## Overview
Shared image URL normalization and (optional) transform utilities to unify behavior across tools (blog, media library, galleries).

## Workstream Claim
- Owner (AI chat / person): GitHub Copilot — 2025-12-25
- Date claimed: 2025-12-25
- Status: ✅ Complete - Extracted to `@amazing/image-utils`

## Scope
- ✅ Normalize legacy paths (e.g. `blog-images/...`, `media/...`)
- ✅ Storage URL rewriting rules (Firebase -> Supabase -> CDN)
- ✅ Safe helper APIs for client/server
- ✅ Image processing (resize, crop, optimize)
- ✅ CDN URL generation (Cloudinary, Imgix)

## Non-Goals
- Full image processing pipeline unless explicitly added (resize/crop/compress) - Added as core feature

## Implemented API
- `resolveImageUrl(pathOrUrl: string, options?: ResolveOptions): Promise<string>`
- `resizeImage(blob: Blob, options: ResizeOptions): Promise<Blob>`
- `cropImage(blob: Blob, options: CropOptions): Promise<Blob>`
- `optimizeImage(blob: Blob, options: OptimizeOptions): Promise<Blob>`
- `convertFormat(blob: Blob, format: string): Promise<Blob>`
- `getCloudinaryUrl(publicId: string, transforms: CloudinaryTransforms): string`
- `getImgixUrl(baseUrl: string, params: ImgixParams): string`

## Backends
- ✅ Firebase Storage (URL construction, no SDK)
- ✅ S3 Storage
- ✅ Static `/public` assets
- ✅ Cloudinary CDN
- ✅ Imgix CDN

## Testing
- ✅ Unit tests for path rewriting
- ✅ Jest tests for URL generation
- Regression fixtures copied from legacy HTML content (future)

## Open Questions (Resolved)
- Do we publish as `@amazing/image-utils` or keep internal? → Published as package
- Do we allow async resolution (SDK calls) or only deterministic rewrites? → Async for flexibility

## Links
- SSOT coordination: DOCs/TOOLS/SHARED_TOOLS_ROADMAP.md
- Vision/exit criteria: DOCs/TOOLS/AMAZINGLYSTRANGE_PARITY_ROADMAP.md
