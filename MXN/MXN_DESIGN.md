# MXN.CHAT Design System & Styling Standards (SSOT)

**Document Date:** December 15, 2025  
**Status:** Active  
**Version:** 1.0.0  

---

## 🎯 Purpose

This document serves as the **Single Source of Truth (SSOT)** for all visual design, layout, typography, and color implementation in the MXN.CHAT application. It establishes a **SOLID, modular Next.js web design standard** to ensure consistency, maintainability, and scalability.

**All UI/UX changes must adhere to the standards defined in this document.**

---

## 🏗️ Architecture & File Structure

We follow a **Component-Driven Design** architecture where styling is encapsulated within reusable UI components or defined centrally in configuration files. **Inline styles are strictly prohibited** except for dynamic values (e.g., user-uploaded background images).

### Directory Structure (ASCII Tree)

```
src/
├── app/
│   ├── globals.css          # 🎨 THEME LAYER: CSS Variables & Base Resets
│   └── layout.tsx           # 📐 LAYOUT LAYER: Global structure & Providers
│
├── components/
│   ├── ui/                  # 🧱 ATOMS: Base UI elements (Strictly Typed)
│   │   ├── Button.tsx       #    - Encapsulated variants (primary, ghost, danger)
│   │   ├── Card.tsx         #    - Standardized containers
│   │   ├── Input.tsx        #    - Form elements
│   │   └── Typography.tsx   #    - Headings and text standards
│   │
│   └── features/            # 🧩 MOLECULES/ORGANISMS: Complex Logic
│       ├── ChatInterface/   #    - Feature-specific layouts
│       └── UserSettings/    #    - Modals and forms
│
├── lib/
│   └── utils.ts             # 🛠️ UTILS: cn() helper for class merging
│
└── tailwind.config.js       # ⚙️ CONFIG LAYER: Design Tokens (Colors, Fonts, Spacing)
```

---

## 🎨 Color System

Colors are defined semantically, not by their raw values. This allows for easy theming and dark/light mode switching without changing component code.

### 1. CSS Variables (`src/app/globals.css`)
Define the raw color values here, mapped to semantic names.

```css
:root {
  /* Brand Identity */
  --brand-primary: #00d4ff;    /* MXN Blue (Links/Brand only) */
  --brand-secondary: #8844ff;  /* Sithes Purple */
  
  /* User Identity (Vibe Colors) */
  --user-self: #00ff88;        /* Green (Always current user) */
  --user-p1: #8844ff;          /* Purple */
  --user-p2: #ec4899;          /* Pink */
  --user-p3: #f59e0b;          /* Orange */
  --user-p4: #eab308;          /* Yellow */
  
  /* UI Elements */
  --bg-page: #000000;
  --bg-card: rgba(255, 255, 255, 0.05);
  --text-primary: #ffffff;
  --text-secondary: #9ca3af;   /* gray-400 */
  --border-default: rgba(255, 255, 255, 0.1);
}
```

### 2. Tailwind Configuration (`tailwind.config.js`)
Map CSS variables to Tailwind utility classes.

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--brand-primary)',
          purple: 'var(--brand-secondary)',
        },
        user: {
          self: 'var(--user-self)',
          purple: 'var(--user-p1)',
          pink: 'var(--user-p2)',
          orange: 'var(--user-p3)',
          yellow: 'var(--user-p4)',
        },
        ui: {
          bg: 'var(--bg-page)',
          card: 'var(--bg-card)',
          border: 'var(--border-default)',
        }
      }
    }
  }
}
```

### 3. Usage in Components
❌ **Don't:** `text-purple-400` (Raw value)  
✅ **Do:** `text-brand-purple` or `text-user-purple` (Semantic value)

---

## 🔤 Typography Standards

Fonts are loaded via `next/font` in `layout.tsx` and configured in Tailwind.

### Font Families
1.  **Headings**: `font-heading` (Montserrat) - Used for titles, headers, and emphasis.
2.  **Body**: `font-body` (Rajdhani) - Used for chat messages, UI text, and inputs.
3.  **Gaming/Special**: `font-gaming` (Orbitron) - *Deprecated/Reserved for special events only.*

### Scale & Weight
| Class | Size | Weight | Usage |
|-------|------|--------|-------|
| `text-4xl font-heading font-bold` | 36px | 700 | Page Titles (e.g., "Sithes Purple") |
| `text-xl font-heading font-semibold` | 20px | 600 | Section Headers, Card Titles |
| `text-base font-body` | 16px | 400 | Chat Messages, Inputs |
| `text-sm font-body text-gray-400` | 14px | 400 | Metadata, Timestamps, Subtitles |

---

## 📐 Layout & Spacing

We use a **Mobile-First** approach. All layouts should be designed for mobile screens first, then enhanced for desktop using `md:` and `lg:` breakpoints.

### Grid System
-   **Mobile**: Single column (stack).
-   **Desktop**: Sidebar (fixed 80px or 320px) + Main Content (flex-1).

### Standard Spacing (Tailwind Scale)
-   **Padding/Margin**:
    -   `p-2` (8px): Tight spacing (buttons, tags)
    -   `p-4` (16px): Standard container padding
    -   `p-6` (24px): Section padding
    -   `gap-4` (16px): Standard grid/flex gap

### Z-Index Layers
-   `z-0`: Backgrounds
-   `z-10`: Standard content
-   `z-40`: Sticky headers/footers
-   `z-50`: Modals, Dropdowns, Overlays
-   `z-60`: Critical Alerts (Delete Confirmation)

---

## 🛠️ Implementation Rules (SOLID Principles)

### 1. Single Responsibility Principle (SRP)
A component should do one thing.
-   **Bad**: A `ChatInterface` that handles layout, auth logic, message fetching, and rendering.
-   **Good**: `ChatLayout` handles structure, `MessageList` handles rendering, `ChatProvider` handles logic.

### 2. Open/Closed Principle
UI components should be open for extension (via props/variants) but closed for modification.
-   Use `cva` (Class Variance Authority) or simple prop interfaces to define variants (e.g., `<Button variant="danger">`).

### 3. DRY (Don't Repeat Yourself)
-   **Never** write the same long Tailwind string twice.
-   Extract common patterns to `src/components/ui/` or custom CSS classes in `globals.css` (e.g., `.btn-vibe`, `.card-vibe`).

### 4. No Inline Styles
**Strictly Prohibited:**
```tsx
<div style={{ backgroundColor: '#000', padding: '20px' }}> // ❌ BAD
```

**Allowed (Dynamic Content Only):**
```tsx
<div style={{ backgroundImage: `url(${userAvatar})` }}> // ✅ OK
```

---

## 🔄 Refactoring Plan (Migration to Standard)

To bring the current codebase into compliance:

1.  **Phase 1: Centralize Colors**
    -   Update `globals.css` with the CSS variables defined above.
    -   Update `tailwind.config.js` to reference these variables.
    -   Replace hardcoded colors (e.g., `text-purple-400`) with semantic names.

2.  **Phase 2: Component Extraction**
    -   Extract `Button`, `Card`, `Input` from `ChatInterface.tsx` into `src/components/ui/`.
    -   Replace repeated Tailwind strings with these components.

3.  **Phase 3: Layout Cleanup**
    -   Remove inline styles from `ChatInterface.tsx` and `MessageList.tsx`.
    -   Move layout-specific logic out of large components.

---

## Diagram of ChatInterfase.tsx
/Users/brianlindahl/Development/Business/Websites/mxn-chat/src/components/RoomSidebar.tsx

/Users/brianlindahl/Development/Business/DOCs/MXN/MXN_DESIGN.md
┌─────────────────────────────────────────────────┐
│ Header (mxn.chat title + action buttons)        │
│   [ChatInterface.tsx#L383](../../Websites/mxn-chat/src/components/ChatInterface.tsx#L383)
├─────────────────────────────────────────────────┤
│ User Info (avatar + name + online status)       │
│   [ChatInterface.tsx#L425](../../Websites/mxn-chat/src/components/ChatInterface.tsx#L425)
├─────────────────────────────────────────────────┤
│ ROOM SIDEBAR (RoomSidebar component)            │
│   [RoomSidebar.tsx](../../Websites/mxn-chat/src/components/RoomSidebar.tsx)
│ ├─ Topics Header + Create Button               │
│ │   [RoomSidebar.tsx#L99](../../Websites/mxn-chat/src/components/RoomSidebar.tsx#L99)
│ ├─ Online Users Count                          │
│ │   [RoomSidebar.tsx#L112](../../Websites/mxn-chat/src/components/RoomSidebar.tsx#L112)
│ ├─ Welcome Room (always visible)               │
│ │   [RoomSidebar.tsx#L117](../../Websites/mxn-chat/src/components/RoomSidebar.tsx#L117)
│ ├─ My Topics (collapsible)                     │
│ │   [RoomSidebar.tsx#L150](../../Websites/mxn-chat/src/components/RoomSidebar.tsx#L150)
│ │  ├─ Topic Item 1 (with actions)              │
│ │  └─ Topic Item 2 (with actions)              │
│ └─ Current Topics (collapsible)                │
│    [RoomSidebar.tsx#L227](../../Websites/mxn-chat/src/components/RoomSidebar.tsx#L227)
│    ├─ Public Topic 1                           │
│    └─ Public Topic 2                           │
├─────────────────────────────────────────────────┤
│ FRIENDS SECTION                                │
│   [RoomSidebar.tsx#L310](../../Websites/mxn-chat/src/components/RoomSidebar.tsx#L310)
│ ├─ Friends Header + Count                      │
│ └─ Friends List or "No friends" message        │
└─────────────────────────────────────────────────┘

**Document Owner:** MagicWRX Development Team
**Last Updated:** December 15, 2025
