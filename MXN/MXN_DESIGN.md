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

LAYOUTS

Vibe Indictors

RightSidebar layout
                                                        left aligned
                                                           v 
|Profile Pick|  |User Alias |v| <- Alias name dropdown.   |O| <- Vibe "Indicator" Status Filled Circle + left aligned + default Color + small text inside Filled Cirlce "SET"

__________________
|User Alias 01 |v| <- Alias name dropdown. 
|User Alias 02 | | 
|User Alias 03 | | 
|+   NEW Alias | | 
------------------




the 'O' Represient the "Filled in Colored Circles",
Place circles in a bos that in-line with current Vibe Indicator. 
When Hover or Pressed Box Quickly fades in and is positioned based on last Vibe or Set to Defaul.  CIRCLES containg SMALL TEXT CHILL, HYPED, FOCUSED, ect.

|O| <- Chill
|O| <- Hype
|O| <- Focus 
|O| <- Default <- mxn blue         
|O| <- Creative                    
|O| <- Support
|O| <- Wild

______________________________________________
VIBE LOUNGE -> TOPIC Status Vibe "Mood" Rings.  <- Flush Top

                                  O O O O O O   <- Mood/Vibe Rings 
----------------------------------------------  <- Purple Vibe Lounge Bar
O       Oo.    O                 Oo. o       O      for Rings to Rest One.
  O.   O        O       O   O O.    o O o
O    O       O   O O.    O       O   O O.       <- USER's TOPICS Colored 
    O       O   O O.                O.  O.  o      Based on that users Vibe
        O       O   O O.    O       O   O O.       Size Changes With Number 
                                                    Number of Users AND Circle TOPIC NAME on REVERVE COLOR TOPIC CIRCLE. When Hovered Circle enloarges for better veiw Increasing size of topic name. As topics are added they fade in and slowly move to the bottom. Responses make the Compback in from top.
                                                    Like The Prices Right's PLINKO game the Drop-in as more come on line the screen fiils. 

                                                    Pressing the Mood VIBE Ring SELECTS TOPICs of With those Moods/Vibe.




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

## 📐 Visual Layout Diagrams

### LEFT SIDEBAR (Desktop) - RoomSidebar.tsx

```
┌────────────────────────────────────────────────────┐
│ ┌────────────────────────────────────────────────┐ │
│ │  mxn.chat           [💰][👥][⚙️][🔔][🚪]      │ │ Header
│ └────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────┐ │
│ │ [👤] (O)  User Alias ▼          Name/Online   │ │ User Info
│ │      ↑                                         │ │ + Vibe Indicator
│ │   Vibe Indicator (Filled Circle)              │ │
│ │                                                │ │
│ │   [Vibe Selector Dropdown on hover/click]     │ │
│ │   ┌──────────────────┐                        │ │
│ │   │ (O) Chill        │ ← Selector appears     │ │
│ │   │ (O) Hype         │   with emoji + text    │ │
│ │   │ (O) Focus        │   Current vibe = bold  │ │
│ │   │ (O) Default      │                        │ │
│ │   │ (O) Creative     │                        │ │
│ │   │ (O) Support      │                        │ │
│ │   │ (O) Wild         │                        │ │
│ │   └──────────────────┘                        │ │
│ └────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────┤
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ┃ Topics                            [+ Create]  ┃ │ Topics Section
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│                                                    │
│   👥 42 Online                                     │
│                                                    │
│   # Welcome                   [Always Visible]    │
│                                                    │
│ ┌────────────────────────────────────────────────┐ │
│ │ ▼ My Topics (3)                                │ │ Collapsible
│ │   # Topic-Name-1      [👥][🗑️]   (5 unread)  │ │ User's Topics
│ │   # Topic-Name-2      [👥][🗑️]   (2 unread)  │ │
│ │   # Topic-Name-3      [👥][🗑️]                │ │
│ └────────────────────────────────────────────────┘ │
│                                                    │
│ ┌────────────────────────────────────────────────┐ │
│ │ ▼ Current Topics (8)                           │ │ Collapsible
│ │   # general           125 members              │ │ Public Topics
│ │   # tech-talk         43 members               │ │
│ │   # random            89 members               │ │
│ │   ...                                          │ │
│ └────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────┤
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ┃ Friends (12)                                   ┃ │ Friends Section
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│   [👤] FriendAlias1    ● Online                   │
│   [👤] FriendAlias2    ● Online                   │
│   [👤] FriendAlias3    ○ Offline                  │
└────────────────────────────────────────────────────┘
```

### MAIN AREA - VIBE LOUNGE (ChatInterface.tsx)

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                                                            │ │
│  │  VIBE LOUNGE  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~             │ │
│  │               ↑ Sine Wave Animation (Purple #8844ff)      │ │
│  │                                                            │ │
│  │  Select a vibe to connect anonymously or jump to a topic  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                         ●    ●    ●    ●    ●    ●      │ │ Mood/Vibe Rings
│  │                       Chill Hype Focus Create Support Wild│ │ (Right Aligned)
│  ├────────────────────────────────────────────────────────────┤ │
│  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │ Purple Vibe Bar
│  └────────────────────────────────────────────────────────────┘ │ (Separator)
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                   TOPIC BUBBLES AREA                       │ │ Active Topics
│  │                                                            │ │ (Plinko Style)
│  │    ●●         ●                    ●●    ●                │ │
│  │  ●    ●     ●   ●        ●     ●●      ●   ●●            │ │ Circles colored
│  │    ●       ●      ●●  ●    ●●       ●   ●●               │ │ by user's vibe
│  │  ●    ●       ●   ●●      ●       ●   ●●                 │ │
│  │      ●       ●   ●●  ●    ●       ●   ●●                 │ │ Size = # users
│  │                                                            │ │ in that topic
│  │  [Topic names shown on reverse color inside circles]      │ │
│  │  [Hover = enlarge circle + larger topic name]             │ │ Drop from top
│  │  [New topics fade in from top, push down like Plinko]     │ │ Responses bring
│  │  [Responses make topics rise back to top]                 │ │ back to top
│  │                                                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │   [Initialize Default Topics]  (if no rooms exist)         │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

INTERACTION:
- Click Vibe Ring → Filter topics showing only that vibe
- Click Topic Bubble → Enter that topic/room
- Hover Topic Bubble → Enlarge + show details
- Vibe Rings rest on purple bar, always visible
- Topic Bubbles animate: drop from top when created
                         rise up when new messages
```

### VIBE INDICATOR DETAILS

```
Vibe Colors & Names:
┌────────────────────────────────────┐
│ ● Chill     (Green)    #22c55e    │
│ ● Hype      (Purple)   #9333ea    │
│ ● Focus     (Orange)   #fb923c    │
│ ● Creative  (Yellow)   #facc15    │
│ ● Support   (Pink)     #ec4899    │
│ ● Wild      (Fuchsia)  #e879f9    │
│ ● Default   (MXN Blue) #00d4ff    │
└────────────────────────────────────┘

In Sidebar:
- Small filled circle (32px) next to avatar
- Shows current user's vibe color
- Click/Hover → Dropdown with all vibes
- Emoji + Name shown in dropdown
- Current selection highlighted

In Vibe Lounge:
- Larger circles (48px) as tabs/filters
- Border + semi-transparent bg
- Hover → Fill with solid color + glow
- Click → Filter topics by that vibe
```

---

**Document Owner:** MagicWRX Development Team  
**Last Updated:** December 16, 2025