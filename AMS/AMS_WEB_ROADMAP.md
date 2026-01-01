# 🚀 Amazingly Strange Development Roadmap

**Version:** 2.1 - **FIREBASE MIGRATION EDITION**  
**Date:** September 6, 2025  
**Status:** Migration Strategy - Firebase → CODE:`DOCs/AMS/Vercel/Supabase`  
**Related Docs**: `AMAZINGLYSTRANGE_FIREBASE.md`, `AMS_AI_PROMPT.md`  

---

## 📊 **Directory Analysis Report**

### **Current Three-Directory Assessment:**

```
📁 DIRECTORY STATUS MATRIX
┌─────────────────────────────────────────────────────────────────┐
│                   │ Content  │ Tech Stack │ Status    │ Role    │
├─────────────────────────────────────────────────────────────────┤
│ amazinglystrange  │ ✅ Complete │ Static HTML │ ✅ Stable │ SOURCE  │
│ ▸ Production site │ 502 lines  │ ITCSS       │ Live      │ Backup  │
│ ▸ Firebase Host   │ 24+ tables │ CSS Grid    │ Working   │ Archive │
│ ▸ Firestore DB    │ Blog posts │ Firebase    │ Active    │ Migrate │
├─────────────────────────────────────────────────────────────────┤
│ amazingly-strange │ 🏗️ Framework │ Next.js 15  │ 🆕 Fresh │ TARGET  │
│ ▸ AMS 1.0 Home    │ React 19    │ Tailwind 4  │ Empty     │ Future  │
│ ▸ Vercel Deploy   │ TypeScript  │ Supabase    │ Setup     │ Prod    │
│ ▸ Node.js Ready   │ Modern      │ PostgreSQL  │ Pending   │ Active  │
├─────────────────────────────────────────────────────────────────┤
│ new_amazingly..   │ ⚠️ Partial   │ Next.js     │ ❓ Broken │ SALVAGE │
│ ▸ Tailwind Work  │ Empty files │ Incomplete  │ Abandoned │ Extract │
│ ▸ First Attempt  │ .next built │ Missing pkg │ Historical│ Components│
└─────────────────────────────────────────────────────────────────┘
```

### **🔥 Firebase Current State**

**Active Firebase Services:**
- ✅ **Firebase Hosting** - amazinglystrange.com (Live Production)
- ✅ **Firestore Database** - Blog posts, user data
- ✅ **Firebase Auth** - Admin authentication
- ✅ **Firebase Storage** - Images, assets, uploads
- ❌ **Firebase Functions** - Not in use (static site only)

**Migration Target:**
- 🎯 **Vercel Hosting** - Next.js 15 deployment
- 🎯 **Supabase PostgreSQL** - Structured database with RLS
- 🎯 **Supabase Auth** - Enhanced authentication system
- 🎯 **Supabase Storage** - CDN-optimized asset delivery
- 🎯 **Next.js API Routes** - Serverless backend functions

**See `AMAZINGLYSTRANGE_FIREBASE.md` for complete migration details**

---

## 🗂️ **Linux File Trees & Architecture**

### **🎯 Target Architecture: AMS 1.0 (amazingly-strange-website)**

```
amazingly-strange-website/                    # 🎯 PRODUCTION TARGET
├── 📦 FRAMEWORK FILES
│   ├── package.json                          # Next.js 15 + React 19 + Tailwind 4
│   ├── next.config.ts                        # Next.js configuration
│   ├── tailwind.config.ts                    # Tailwind 4 configuration  
│   ├── tsconfig.json                         # TypeScript settings
│   └── .env.local                           # Supabase credentials
│
├── 🎨 FRONTEND ARCHITECTURE
│   ├── app/                                 # Next.js 13+ App Router
│   │   ├── globals.css                      # Global styles + Tailwind
│   │   ├── layout.tsx                       # Root layout with navbar/footer
│   │   ├── page.tsx                         # Home page (index.html replacement)
│   │   ├── loading.tsx                      # Loading states
│   │   ├── error.tsx                        # Error boundaries
│   │   │
│   │   ├── 🏠 MAIN PAGES
│   │   ├── blog/
│   │   │   ├── page.tsx                     # Blog listing
│   │   │   └── [slug]/page.tsx              # Individual blog posts
│   │   ├── admin/
│   │   │   ├── page.tsx                     # Admin dashboard
│   │   │   ├── tables/
│   │   │   │   ├── page.tsx                 # Table management
│   │   │   │   ├── new/page.tsx             # Create table
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx             # Edit table
│   │   │   │       └── preview/page.tsx     # Live preview
│   │   │   └── settings/page.tsx            # Admin settings
│   │   │
│   │   └── 🔌 API ENDPOINTS
│   │       └── api/
│   │           ├── auth/                    # Supabase auth
│   │           ├── tables/                  # Table CRUD
│   │           │   ├── route.ts             # GET/POST tables
│   │           │   └── [id]/route.ts        # PUT/DELETE table
│   │           ├── upload/route.ts          # Image uploads
│   │           └── export/route.ts          # Export functionality
│
├── 🧩 COMPONENT LIBRARY
│   ├── components/
│   │   ├── 🎨 UI COMPONENTS
│   │   ├── ui/
│   │   │   ├── Button.tsx                   # Reusable button
│   │   │   ├── Input.tsx                    # Form inputs
│   │   │   ├── Modal.tsx                    # Modal dialogs
│   │   │   └── Dropdown.tsx                 # Dropdown menus
│   │   │
│   │   ├── 🏗️ LAYOUT COMPONENTS  
│   │   ├── layout/
│   │   │   ├── Header.tsx                   # Site header/navbar
│   │   │   ├── Footer.tsx                   # Site footer
│   │   │   ├── Sidebar.tsx                  # Admin sidebar
│   │   │   └── Breadcrumbs.tsx              # Navigation breadcrumbs
│   │   │
│   │   ├── 📋 TABLE SYSTEM COMPONENTS
│   │   ├── tables/
│   │   │   ├── TableRenderer.tsx            # Main table renderer
│   │   │   ├── TableBuilder.tsx             # Visual table builder
│   │   │   ├── TablePreview.tsx             # Live preview
│   │   │   ├── TableExporter.tsx            # Export functionality
│   │   │   └── themes/
│   │   │       ├── EmeraldTheme.tsx         # Theme presets
│   │   │       ├── DarkTheme.tsx            
│   │   │       └── CustomTheme.tsx          
│   │   │
│   │   └── 🎛️ ADMIN COMPONENTS
│   │       ├── admin/
│   │       │   ├── Dashboard.tsx            # Admin dashboard
│   │       │   ├── TableList.tsx            # Table management list
│   │       │   ├── RichTextEditor.tsx       # Content editor
│   │       │   ├── ImageUploader.tsx        # Image management
│   │       │   └── ColorPicker.tsx          # Theme customization
│   │       │
│   │       └── forms/
│   │           ├── TableForm.tsx            # Table creation/edit forms
│   │           ├── ThemeForm.tsx            # Theme customization
│   │           └── ValidationSchemas.ts     # Form validation
│
├── 🔧 UTILITIES & CONFIGURATION
│   ├── lib/
│   │   ├── 🗃️ DATABASE
│   │   ├── supabase/
│   │   │   ├── client.ts                    # Supabase client setup
│   │   │   ├── auth.ts                      # Authentication helpers
│   │   │   ├── tables.ts                    # Table CRUD operations
│   │   │   └── storage.ts                   # File storage operations
│   │   │
│   │   ├── 🛠️ UTILITIES
│   │   ├── utils/
│   │   │   ├── cn.ts                        # Class name utility (clsx)
│   │   │   ├── formatters.ts                # Data formatting
│   │   │   ├── validators.ts                # Data validation
│   │   │   └── exporters.ts                 # Export utilities
│   │   │
│   │   └── 🎨 STYLE UTILITIES
│   │       ├── tailwind-utils.ts            # Tailwind helpers
│   │       ├── theme-generator.ts           # Dynamic theme creation
│   │       └── css-parser.ts                # Legacy CSS conversion
│
├── 📊 TYPE DEFINITIONS
│   ├── types/
│   │   ├── tables.ts                        # Table data structures
│   │   ├── themes.ts                        # Theme configurations
│   │   ├── auth.ts                          # Authentication types
│   │   └── api.ts                           # API response types
│
└── 🖼️ STATIC ASSETS
    └── public/
        ├── images/                          # Migrated from static site
        │   ├── artwork/                     # Concept art
        │   ├── characters/                  # Character images  
        │   ├── game-assets/                 # Game images
        │   └── marketing/                   # Marketing materials
        ├── fonts/                           # Strange-A-Matic fonts
        │   └── strange-a-matic/
        ├── icons/                           # Site icons
        └── exports/                         # Generated exports
```

---

## 🗄️ **Database Schema (Supabase)**

```sql
-- 📋 TABLES SCHEMA
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Main tables configuration
CREATE TABLE public.tables (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    title text NOT NULL,
    layout text CHECK (layout IN ('1-col', '2-col', '3-col')) NOT NULL,
    theme jsonb NOT NULL DEFAULT '{}',  -- Theme configuration
    content jsonb NOT NULL DEFAULT '{}', -- Table content
    metadata jsonb DEFAULT '{}',       -- Additional metadata
    is_published boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    created_by uuid REFERENCES auth.users(id)
);

-- Theme presets
CREATE TABLE public.themes (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name text NOT NULL UNIQUE,
    description text,
    config jsonb NOT NULL,
    is_default boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- File uploads
CREATE TABLE public.uploads (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    filename text NOT NULL,
    file_path text NOT NULL,
    content_type text NOT NULL,
    file_size integer NOT NULL,
    created_by uuid REFERENCES auth.users(id),
    created_at timestamptz DEFAULT now()
);

-- Row Level Security
ALTER TABLE public.tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.themes ENABLE ROW LEVEL SECURITY;  
ALTER TABLE public.uploads ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Tables viewable by everyone" ON public.tables
    FOR SELECT USING (is_published = true);

CREATE POLICY "Tables manageable by authenticated users" ON public.tables
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert default themes
INSERT INTO public.themes (name, description, config, is_default) VALUES
('Emerald', 'Amazingly Strange brand theme', '{"colors": {"primary": "#47D7AC", "background": "rgba(71, 215, 172, 0.1)"}}', true),
('Dark', 'Dark theme for contrast', '{"colors": {"primary": "#000000", "background": "#000000", "text": "#ffffff"}}', false),
('Monster', 'Monster theme with purple accents', '{"colors": {"primary": "#671E75", "background": "rgba(103, 30, 117, 0.1)"}}', false);
```

---

## 🔄 **Migration Scripts & Automation**

### **📜 Migration Script Tree**

```
scripts/                                     # 🔧 AUTOMATION SCRIPTS
├── migration/
│   ├── 01-backup-static.sh                 # Backup amazinglystrange
│   ├── 02-extract-content.sh               # Extract HTML content
│   ├── 03-convert-css.py                   # CSS → Tailwind conversion
│   ├── 04-migrate-assets.sh                # Move images/fonts
│   ├── 05-setup-database.sql               # Supabase schema setup
│   ├── 06-seed-data.js                     # Import existing tables
│   └── 07-deploy-setup.sh                  # Vercel deployment
│
├── development/
│   ├── serve-local.sh                      # Local dev server (updated)
│   ├── watch-changes.sh                    # File watching
│   ├── test-migration.sh                   # Test migration steps
│   └── rollback.sh                         # Emergency rollback
│
└── deployment/
    ├── build-production.sh                 # Production build
    ├── deploy-vercel.sh                    # Deploy to Vercel  
    ├── setup-domain.sh                     # DNS configuration
    └── health-check.sh                     # Post-deployment tests
```

### **🎯 Anti-AI Drift Checkpoints**

```
checkpoints/                                # 📋 ROADMAP VALIDATION
├── phase-1-checklist.md                   # Frontend setup validation
├── phase-2-checklist.md                   # Backend integration validation  
├── phase-3-checklist.md                   # Migration completion validation
└── templates/
    ├── table-component-template.tsx        # Standard table component
    ├── api-route-template.ts               # Standard API route
    └── page-template.tsx                   # Standard page structure
```

---

## 🎨 **CSS/Tailwind Variable System**

### **🎨 Tailwind Configuration Structure**

```typescript
// tailwind.config.ts - UNIFIED DESIGN SYSTEM
export default {
  theme: {
    extend: {
      // 🎨 AMAZINGLY STRANGE BRAND COLORS  
      colors: {
        'as-primary': '#47D7AC',        // Foam green (existing --color-primary)
        'as-secondary': '#981D97',       // Purple (existing --color-secondary)  
        'as-orange': '#FFB81C',         // Orange accent
        'as-yellow': '#F7EA48',         // Yellow accent
        'as-dark': '#0b0b0b',           // Dark background
        'as-surface': '#1a1a1a',        // Surface color
        
        // 🎨 TABLE SYSTEM COLORS
        'table': {
          'emerald': {
            'bg': 'rgba(71, 215, 172, 0.1)',
            'border': 'rgba(71, 215, 172, 0.2)',
            'header': '#47D7AC'
          },
          'monster': {
            'bg': 'rgba(103, 30, 117, 0.1)', 
            'border': 'rgba(103, 30, 117, 0.2)',
            'header': '#671E75'
          },
          'dark': {
            'bg': '#000000',
            'border': 'rgba(255, 255, 255, 0.12)',
            'header': '#1a1a1a'
          }
        }
      },
      
      // 🎨 TYPOGRAPHY SYSTEM
      fontFamily: {
        'strange': ['Strange-A-Matic', 'sans-serif'],  // Brand font
        'raleway': ['Raleway', 'sans-serif'],          // Body font
        'amatic': ['Amatic SC', 'cursive']             // Accent font
      },
      
      // 🎨 SPACING & SIZING
      spacing: {
        'table': '20px',                    // Standard table padding
        'window': '16px',                   // Window border radius
        'header': '64px'                    // Header height
      },
      
      // 🎨 GRID SYSTEM
      gridTemplateColumns: {
        'table-2': '1fr 1fr',              // 2-column tables
        'table-3': '1fr 1fr 1fr',          // 3-column tables
        'admin': '240px 1fr',               // Admin layout
        'two-thirds': '2fr 1fr',            // 2/3 + 1/3 layout
        'one-third': '1fr 2fr'              // 1/3 + 2/3 layout
      }
    }
  },
  
  // 🎨 COMPONENT CLASSES
  plugins: [
    // Custom table components
    plugin(function({ addComponents, theme }) {
      addComponents({
        // Base table styles
        '.table-base': {
          display: 'grid',
          borderRadius: theme('spacing.window'),
          overflow: 'hidden',
          marginBottom: theme('spacing.table')
        },
        
        // Layout variants
        '.table-1-col': { gridTemplateColumns: theme('gridTemplateColumns.table-1') },
        '.table-2-col': { gridTemplateColumns: theme('gridTemplateColumns.table-2') },  
        '.table-3-col': { gridTemplateColumns: theme('gridTemplateColumns.table-3') },
        
        // Theme variants
        '.table-emerald': {
          backgroundColor: theme('colors.table.emerald.bg'),
          borderColor: theme('colors.table.emerald.border')
        },
        '.table-monster': {
          backgroundColor: theme('colors.table.monster.bg'),
          borderColor: theme('colors.table.monster.border')  
        },
        '.table-dark': {
          backgroundColor: theme('colors.table.dark.bg'),
          borderColor: theme('colors.table.dark.border')
        }
      })
    })
  ]
}
```

### **🔄 CSS Variable Migration Map**

```
CSS VARIABLE CONVERSION MAP
┌─────────────────────────────────────────────────────────────────┐
│ Legacy CSS Variable        │ Tailwind Class        │ Usage      │
├─────────────────────────────────────────────────────────────────┤
│ --color-primary           │ text-as-primary       │ Text color │
│ --color-secondary         │ text-as-secondary     │ Text color │
│ --window-border-radius    │ rounded-window        │ Corners    │
│ --header-height           │ h-header              │ Height     │
│ --bg-pattern             │ bg-[url(...)]         │ Patterns   │
│ --container-background   │ bg-table-emerald      │ Background │
│ --header-justify         │ justify-center        │ Alignment  │
│ --window-border-width    │ border-2              │ Borders    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🗺️ **Migration Flow & Process**

### **📋 Phase 1: Foundation Setup (Week 1)**

```
🎯 PHASE 1 CHECKLIST - FOUNDATION
┌─────────────────────────────────────────────────────────────────┐
│ ✅ Task                              │ Script               │ ETA │
├─────────────────────────────────────────────────────────────────┤
│ ⬜ Backup Firebase project           │ 01-backup-firebase.sh│ 1h  │
│ ⬜ Export Firestore data to JSON     │ 02-export-firestore.js│ 2h │
│ ⬜ Download Firebase Storage         │ 03-download-storage.sh│ 1h │
│ ⬜ Create Supabase project           │ Manual (supabase.com)│ 30m │
│ ⬜ Setup database schema             │ 04-setup-supabase.sql│ 2h  │
│ ⬜ Configure environment vars        │ .env.local           │ 30m │
│ ⬜ Create base component library     │ components/ui/       │ 4h  │
│ ⬜ Build layout components           │ Header/Footer        │ 3h  │
├─────────────────────────────────────────────────────────────────┤
│ 🎯 CHECKPOINT: Supabase connected    │ Test query works     │ -   │
│ 🎯 ANTI-DRIFT: Compare to roadmap    │ phase-1-checklist   │ -   │
│ 📚 REFERENCE: AMAZINGLYSTRANGE_FIREBASE.md for scripts          │
└─────────────────────────────────────────────────────────────────┘
```

### **📋 Phase 2: Content Migration (Week 2)**

```
🎯 PHASE 2 CHECKLIST - CONTENT MIGRATION  
┌─────────────────────────────────────────────────────────────────┐
│ ✅ Task                              │ Script               │ ETA │
├─────────────────────────────────────────────────────────────────┤
│ ⬜ Import Firestore data to Supabase │ 05-import-data.js    │ 2h  │
│ ⬜ Upload assets to Supabase Storage │ 07-upload-assets.sh  │ 1h  │
│ ⬜ Convert HTML to React components  │ Manual (index→page)  │ 4h  │
│ ⬜ Convert CSS variables to Tailwind │ tailwind.config.ts   │ 4h  │
│ ⬜ Create table components           │ components/tables/   │ 8h  │
│ ⬜ Build home page (index.html→tsx)  │ app/page.tsx         │ 4h  │
│ ⬜ Build blog system                 │ app/blog/            │ 6h  │
│ ⬜ Verify data integrity             │ 08-verify-migration.js│ 2h │
├─────────────────────────────────────────────────────────────────┤
│ 🎯 CHECKPOINT: Static content ported │ Home page renders    │ -   │
│ 🎯 ANTI-DRIFT: Content matches orig  │ phase-2-checklist   │ -   │
│ 📚 REFERENCE: CSS migration map in roadmap                      │
└─────────────────────────────────────────────────────────────────┘
```

### **📋 Phase 3: Admin Interface (Week 3-4)**

```
🎯 PHASE 3 CHECKLIST - ADMIN SYSTEM
┌─────────────────────────────────────────────────────────────────┐
│ ✅ Task                              │ Component            │ ETA │
├─────────────────────────────────────────────────────────────────┤
│ ⬜ Build admin dashboard             │ app/admin/page.tsx   │ 6h  │
│ ⬜ Create table builder interface    │ TableBuilder.tsx     │ 8h  │
│ ⬜ Implement rich text editor        │ RichTextEditor.tsx   │ 4h  │
│ ⬜ Add image upload system           │ ImageUploader.tsx    │ 4h  │
│ ⬜ Build theme customization         │ ColorPicker.tsx      │ 4h  │
│ ⬜ Create export functionality       │ TableExporter.tsx    │ 4h  │
├─────────────────────────────────────────────────────────────────┤
│ 🎯 CHECKPOINT: Admin fully functional│ End-to-end workflow  │ -   │
│ 🎯 ANTI-DRIFT: Matches roadmap spec  │ phase-3-checklist   │ -   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 **Deployment & Production**

### **🌐 Vercel Deployment Configuration**

```javascript
// vercel.json - PRODUCTION DEPLOYMENT
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs",
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase-service-key"
  },
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 10
    }
  }
}
```

---

## 📈 **Success Metrics & Validation**

### **🎯 Migration Success Criteria**

```
SUCCESS VALIDATION CHECKLIST
┌─────────────────────────────────────────────────────────────────┐
│ ✅ Criteria                          │ Validation Method    │ ✓/✗ │
├─────────────────────────────────────────────────────────────────┤
│ Static site content fully migrated   │ Visual comparison    │ ⬜  │
│ All 24+ table prototypes working     │ Functional testing   │ ⬜  │
│ Admin interface fully operational    │ End-to-end testing   │ ⬜  │
│ Database integration working         │ CRUD operations      │ ⬜  │
│ Performance equal or better          │ Lighthouse scores    │ ⬜  │
│ Mobile responsive                    │ Device testing       │ ⬜  │
│ SEO equivalent or improved           │ Meta tag analysis    │ ⬜  │
│ Accessibility maintained             │ WCAG compliance      │ ⬜  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 **Directory Action Plan**

### **🎯 Immediate Next Steps (This Week)**

1. **🗂️ Directory Consolidation:**
   ```bash
   # Backup current state
   tar -czf amazinglystrange-backup-$(date +%Y%m%d).tar.gz amazinglystrange/
   
   # Clean target directory for fresh start
   cd amazingly-strange-website && rm -rf !(package.json|.git)
   
   # Extract useful components from new_amazinglystrange
   # (Manual inspection required for Tailwind progress)
   ```

2. **⚙️ Foundation Setup:**
   ```bash
   # Initialize fresh Next.js in target directory
   cd amazingly-strange-website
   npx create-next-app@latest . --typescript --tailwind --app
   npm install CODE:`DOCs/AMS/ADMIN/node_modules/@supabase/supabase-js` @supabase/auth-helpers-nextjs
   ```

3. **📋 Roadmap Compliance:**
   - Create phase checklists to prevent AI drift
   - Establish component templates
   - Set up anti-drift validation scripts

---

## 📌 **Anti-AI Drift Strategy**

### **🔒 Roadmap Validation Protocol**

1. **Before Each Phase:** Review current roadmap section
2. **During Development:** Reference component templates
3. **After Each Task:** Update checklist and validate against roadmap
4. **Weekly Reviews:** Compare progress to timeline and adjust

### **📋 Checkpoint Files:**
- `checkpoints/current-phase.md` - Track current progress
- `checkpoints/decisions-log.md` - Record all architectural decisions  
- `checkpoints/deviations.md` - Document any roadmap changes with rationale

### **🤖 AI Prompt Template**

**For new AI sessions, use `AMS_AI_PROMPT.md`:**
```bash
# Copy and paste the content of AMS_AI_PROMPT.md to start any new AI session
# This ensures consistent context and prevents drift across sessions
```

**Standard footer for all AI prompts:**
```
Follow AMS_WEB_ROADMAP.md and AMAZINGLYSTRANGE_FIREBASE.md.
Use KISS + YAGNI principles. Write TypeScript with strict types.
Check against roadmap to prevent AI drift.
```

---

## 🔮 Later: Blog Media & Assets Enhancements

- Dual-size image assets at upload-time
  - Add upload-time resize step to create `-sm` and `-lg` variants; store both URLs in post content or metadata.
  - Display script selects `-sm` for inline (wrapped) view and `-lg` for lightbox overlay.

- Blog media enhancements
  1. Support extra images per post (gallery or ordered sequence)
  2. Hero image plus second and third image slots in post metadata/UI
  3. Embedded media support: YouTube, TikTok, Instagram, Reels (sanitized, responsive wrappers)
  4. Draft vs Live states in authoring workflow (`status: draft|published`) with gated preview

Note: When moving to Node.js + Vercel + Supabase, implement image processing either via Vercel serverless functions or Supabase Storage edge functions, and persist variant URLs. The editor should expose simple controls to set inline size/wrap and choose hero/secondary images.

## 📚 **Documentation Hub**

### **Core Documents** (Read these first)
1. **`AMS_WEB_ROADMAP.md`** *(This file)* - Complete migration roadmap with phases and checklists
2. **`AMAZINGLYSTRANGE_FIREBASE.md`** - Firebase to Supabase migration guide with scripts and schemas
3. **`AMS_AI_PROMPT.md`** - AI session starter template with NOW/NEXT/LATER structure

### **Supporting Documents**
4. **`TABLE_DEVELOPMENT_GUIDE.md`** - Table system architecture and component library
5. **`FONT_SYSTEM_GUIDE.md`** - Typography system and font loading optimization
6. **`IMAGE_MANAGER.md`** - Image optimization and asset management

### **Reference Templates**
- **`Template-WRX/TEMPLATE_ROADMAP.md`** - Enterprise roadmap example (inspiration)
- **`Template-WRX/TEMPLATE_AI_PROMPT.md`** - AI prompt template pattern (followed)

### **How to Use These Docs:**
```
┌─────────────────────────────────────────────────────────────────┐
│ Starting New Session?     → Use AMS_AI_PROMPT.md                │
│ Planning Migration?       → Read AMAZINGLYSTRANGE_FIREBASE.md   │
│ Checking Progress?        → Review AMS_WEB_ROADMAP.md checklists│
│ Building Components?      → Reference TABLE_DEVELOPMENT_GUIDE.md│
│ Need Database Schema?     → See AMAZINGLYSTRANGE_FIREBASE.md    │
│ Lost Context?             → Re-read all three core docs         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 **Final Recommendation**

**PRIORITY ORDER:**
1. **amazingly-strange-website** ← Primary development target (AMS 1.0)
2. **amazinglystrange** ← Source of truth for content migration (Firebase)
3. **new_amazinglystrange** ← Salvage useful Tailwind components, then archive

**IMMEDIATE NEXT ACTIONS:**
1. ✅ Read `AMAZINGLYSTRANGE_FIREBASE.md` for Firebase migration details
2. ⏳ Create Supabase project at https://supabase.com
3. ⏳ Run database setup script (`04-setup-supabase.sql`)
4. ⏳ Configure `.env.local` with Supabase credentials
5. ⏳ Build base UI components (`components/ui/`)

**NEXT AI SESSION:** Copy `AMS_AI_PROMPT.md` content to start with full context

---

*📝 This roadmap will be updated at each phase completion to prevent AI drift and ensure project alignment.*

---

**VERSION CONTROL:**
- v1.0: Initial recommendations (Sept 6, 2025)
- v2.0: Directory analysis & migration strategy (Sept 6, 2025)
- v2.1: Firebase migration integration + AI prompt template (Sept 6, 2025)
- Next: v2.2 after Phase 1 completion