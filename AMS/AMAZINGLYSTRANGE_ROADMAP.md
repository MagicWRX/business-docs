# AMAZINGLYSTRANGE Roadmap

**Date Created:** October 29, 2025  
**Last Updated:** December 5, 2025

---

## 🧭 Mission

Deliver a production-ready static website for Amazingly Strange LLC, a game studio, with blog management, image handling, and admin capabilities. Maintain stability while planning migration to Next.js for enhanced features.

### Guardrails
- Follow `AMAZINGLYSTRANGE_STANDARDS.md` for code/doc conventions
- Keep roadmap synced with `AMAZINGLYSTRANGE_INDEX.md` change log
- Validate releases using `AMAZINGLYSTRANGE_RELEASE_RUNBOOK.md`

```
NOW ➜ NEXT ➜ LATER
 |      |       |
 Maintain   Enhance   Migrate
```

---

## ✅ Principles Alignment

| Principle | Application | Owner |
|-----------|-------------|-------|
| SOLID/DRY | Modular JS components, ITCSS CSS | Engineering |
| KISS | Vanilla JS, static hosting | Design + Engineering |
| YAGNI | Firebase-only features, no over-engineering | Product |
| SSOT | Centralized Firebase config | DevOps |
| Composition | Reusable HTML inserts and CSS classes | Engineering |

### Mobile/Desktop App Considerations
- **Responsive Design**: Mobile-first CSS with breakpoints for tablets/desktops
- **Performance**: Optimized images, font loading, and lazy loading
- **Accessibility**: Alt text, keyboard navigation, WCAG compliance

---

## 🔄 Timeline

### NOW (0-3 months)
- ✅ **Comprehensive Admin Dashboard** (COMPLETED October 2025)
  - Dashboard with real-time statistics
  - Blog post management with WYSIWYG editor
  - Image upload and compression
  - Media library integration
  - Pages management interface
- ✅ **Component-Based Admin Controls** (COMPLETED November 2025)
  - Brand Header management (promo links, container settings)
  - Navbar management (navigation links, styling)
  - Preview and HTML generation
- ✅ **Layout Manager System** (COMPLETED November 2025)
  - Visual page composition system
  - Template library (save/reuse layouts)
  - Section-based page builder
  - Multi-column layouts with responsive controls
  - Element library (text, media, interactive components)
  - HTML/CSS generation from visual builder
  - Collapsible element categories in sidebar
  - Smart element ID suggestions
  - See `AMAZINGLYSTRANGE_LAYOUT_MANAGER.md` for details
- ✅ **Admin Interface Structural Fixes** (COMPLETED November 2025)
  - Fixed CSS flexbox layout (display:flex for .tab-panel.active)
  - Restructured all 10 admin tabs with proper HTML nesting
  - Each tab now has content-main + admin-rightsidebar as siblings
  - All tabs validated for balanced div structure
- Maintain production stability of amazinglystrange.com
- Add blog posts via enhanced admin panel
- Monitor Firebase usage and costs
- Fix any responsive design issues
- Optimize image storage and compression

### IMMEDIATE FIXES (Current Sprint)
- ✅ **Blog Image Workflow Enhancement** (COMPLETED December 2025)
  - Added "Select from Library" vs "Upload New" option in Blog Editor.
  - Integrated Media Library picker into Blog workflow.
  - Ensured image optimization (resize/compression) is available for uploads.
- ✅ **Admin Panel Standardization** (COMPLETED December 2025)
  - Migrated `layout-manager.js` from LocalStorage to Firestore
  - Migrated `brand-header-manager.js` from LocalStorage to Firestore
  - Replaced deprecated `document.execCommand` in `page-manager.js` with Quill.js
  - Ensured all admin modules import `firebase-config.js` correctly
- **Layout Manager Bug Fixes**
  - ✅ Fix background colors for tables and solid color backgrounds not applying correctly. (COMPLETED December 2025)

### NEXT (3-6 months)
- Complete Layout Manager implementation
  - ✅ Firestore integration for cloud storage (COMPLETED December 2025)
  - ✅ Template marketplace with starter templates (COMPLETED December 2025)
  - ✅ Advanced responsive controls (COMPLETED December 2025 - Visibility toggles)
  - Accessibility validation tools
  - ✅ **Image Element Enhancements:** Add float controls (left/right), border styling, and size adjustments. (COMPLETED December 2025)
  - ✅ **Table Element Enhancements:** Add border controls and styling options. (COMPLETED December 2025 - Added Table element with CSV support)
- **Enhanced Blog Preview:** Implement real-time preview for blog posts before publishing.
- **Admin Panel Enhancements:**
  - **Dark Mode:** Toggle for admin interface.
  - **Code Editor:** Syntax highlighting for Custom HTML elements in Layout Manager.
- ✅ Implement SEO optimizations (meta tags, sitemap, structured data) (COMPLETED December 2025)
- ✅ Add analytics integration (Google Analytics) (COMPLETED December 2025 - GA script added, replace GA_MEASUREMENT_ID with actual ID)
- ✅ Enhance admin panel with bulk operations (COMPLETED December 2025 - Publish/Unpublish/Delete)
- ✅ Improve image gallery with lightbox (COMPLETED December 2025)
- ✅ Add admin interface enhancements:
  - ✅ Keyboard shortcuts for common actions (COMPLETED December 2025 - Ctrl+S Save, Ctrl+N New, Ctrl+B Sidebar)
  - ✅ Undo/redo functionality (COMPLETED December 2025 - Layout Manager)
  - ✅ Auto-save improvements (COMPLETED December 2025 - LocalStorage backup)
  - ✅ Better error handling and user feedback (COMPLETED December 2025 - Toast Notifications)
  - ✅ Mobile admin interface optimization (COMPLETED December 2025 - Sidebar toggle, stacked layouts, touch targets)

### LATER (6+ months)
- Layout Manager advanced features
  - Visual drag-and-drop editor
  - Animation and interaction builder
  - A/B testing for layouts
  - AI-powered layout suggestions
- Migrate to Next.js as per AMS_WEB_ROADMAP.md
- Implement Supabase for database
- Add user accounts and comments
- Expand to e-commerce features

---

## 🧪 Iteration Acceptance Checklist

```
[✅] Admin dashboard implementation complete
[✅] Firebase integration with blogPosts collection
[✅] Image upload to blog-images/ storage folder
[✅] Component-based admin controls (Brand Header, Navbar)
[✅] Layout Manager Phase 1: Foundation implementation
[✅] Layout Manager Phase 2: Column system
[✅] Layout Manager Phase 3: Element library
[✅] Layout Manager sidebar enhancements (collapsible categories, smart IDs)
[✅] Admin interface structural fixes (flexbox layout, proper HTML nesting)
[✅] All 10 admin tabs validated for balanced div structure
[✅] AMAZINGLYSTRANGE_INDEX.md change log entry added
[✅] AMAZINGLYSTRANGE_LAYOUT_MANAGER.md created
[ ] Unit/integration tests for new admin features
[ ] Data flow diagrams reviewed (AMAZINGLYSTRANGE_EXEC_SUMMARY.md)
[✅] Repository tree snapshot current
```

---

## 🌲 Repository Tree (High Level)

```
amazinglystrange/
├── docs/                          # Documentation hub (AMAZINGLYSTRANGE_* files)
│   ├── AMAZINGLYSTRANGE_LAYOUT_MANAGER.md  # ✅ NEW: Layout system design
│   └── ... (other documentation)
├── public/
│   ├── index.html                 # Homepage with dynamic content
│   ├── admin.html                 # ✅ Admin dashboard with Layout Manager tab
│   ├── admin-access.html          # Admin authentication page
│   ├── pages/                     # Static pages (games, about, etc.)
│   ├── css/                       # ITCSS architecture styles
│   │   └── layout-manager.css     # ✅ Layout Manager admin styles
│   ├── js/
│   │   ├── firebase-config.js     # Centralized Firebase config
│   │   ├── admin-dashboard.js     # Dashboard controller
│   │   ├── page-manager.js        # Page editing with images
│   │   ├── media-manager.js       # Media library
│   │   ├── admin-access.js        # Blog admin with WYSIWYG
│   │   ├── blog-display.js        # Blog display for public pages
│   │   ├── layout-manager.js      # ✅ Main layout controller
│   │   ├── layout-builder.js      # ✅ UI builder functions
│   │   ├── layout-renderer.js     # ✅ HTML generation
│   │   ├── layout-templates.js    # ✅ Template definitions
│   │   └── layout-storage.js      # ✅ Data persistence
│   ├── inserts/                   # Reusable HTML components
│   │   ├── brand-container.html   # Brand header with promo carousel
│   │   └── navbar.html            # Navigation bar
│   ├── images/                    # Static assets
│   └── protected-content/         # Admin-only pages
├── functions/                     # Firebase functions (if any)
├── firebase.json                  # Firebase hosting config
└── package.json                   # Dependencies (Firebase tools)
```

---

## ⚠️ Key Risks & Mitigations

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Firebase costs increase | Medium | Monitor usage, implement caching |
| Static site limitations | Medium | Plan Next.js migration timeline |
| SEO performance | Low | Add meta tags, sitemap, optimize content |
| Admin security | Low | Use Firebase Auth, regular audits |

---

## 📌 Alignment Checklist

```
[✔] AMAZINGLYSTRANGE_AI_STANDARDS.md cited in this overview
[✔] Roadmap link verified (AMS_WEB_ROADMAP.md)
[✔] Doc index entry updated (AMAZINGLYSTRANGE_INDEX.md)
[ ] Visual assets refreshed quarterly
[ ] Accessibility audit scheduled (Q1 2026)
```