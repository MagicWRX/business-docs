# SHARED Tools Extraction Roadmap

## Overview
Plan for extracting legacy JavaScript tools from AmazinglyStrange into reusable SHARED packages.

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

### 🚧 In Progress
1. **Admin Layout** - Shared navigation/layout component
   - Left sidebar with tool navigation
   - Active state highlighting
   - Collapsible design

## Tools to Extract

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
**Status**: Consider merging with blog-engine  
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

### Priority 3: Utility Modules

#### Image Utils (`/js/image-utils.js`)
**Extraction Plan**:
- Package: `@amazing/image-utils`
- Resize/crop helpers
- Format conversion
- Optimization utilities
- Cloudinary/Imgix integration support

---

#### Font Loader (`/js/font-loader.js`)
**Status**: Low priority (Next.js has built-in font optimization)

---

## Integration Strategy

### Phase 1: Extract Core Admin Tools (Current)
- Layout Manager ✅
- Auth Tool ✅
- Blog Engine ✅
- Admin Layout 🚧
- Media Manager (next)

### Phase 2: Complete Admin Suite
- Page Manager
- Analytics Dashboard
- Contact Manager

### Phase 3: Frontend Components
- Gallery components
- Blog display
- Header components

### Phase 4: Utilities & Polish
- Image utils
- Testing & documentation
- Performance optimization

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

## Next Steps

1. ✅ Complete Admin Layout with sidebar navigation
2. ✅ Add Live Preview to Layout Manager
3. 🔲 Extract Media Manager next
4. 🔲 Document API patterns for each tool
5. 🔲 Create integration examples for ADMIN app

## Notes

- All Firebase dependencies must be removed
- Each package should work standalone
- Provide mock backends for demos
- Include REST backend wrappers
- TypeScript-first approach
- Mobile-responsive by default
