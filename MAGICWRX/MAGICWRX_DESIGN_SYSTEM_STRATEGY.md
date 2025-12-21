# MagicWRX Unified Design System Strategy

**Date:** December 17, 2025
**Status:** Draft Strategy
**Target:** All MagicWRX Projects (Business Site, MXN.CHAT, etc.)

---

## 1. Executive Summary

Currently, MagicWRX projects use ad-hoc styling and flat component structures. To scale efficiently and maintain brand consistency across the Business Website, MXN.CHAT, and future products, we must adopt a **Unified Design System (MDS)**.

This strategy proposes a **Component-Driven Architecture** based on the "Atomic Design" principles found in `MXN_DESIGN.md`, but generalized for the entire organization.

## 2. Core Architecture: The "ui" vs "features" Split

We will restructure all projects to separate **dumb UI components** (Atoms) from **smart business components** (Molecules/Organisms).

### Directory Structure Standard
```
src/
├── components/
│   ├── ui/                  # 🧱 ATOMS (The Design System)
│   │   ├── button.tsx       #    - Generic, reusable, styled via props
│   │   ├── card.tsx         #    - Layout primitives
│   │   ├── input.tsx        #    - Form primitives
│   │   └── dialog.tsx       #    - Overlay primitives
│   │
│   ├── features/            # 🧩 MOLECULES (The Business Logic)
│   │   ├── auth/            #    - Login forms, Signup flows
│   │   ├── chat/            #    - Chat bubbles, input areas
│   │   └── marketing/       #    - Hero sections, Pricing tables
│   │
│   └── layout/              # 📐 TEMPLATES (Page Structure)
│       ├── header.tsx
│       └── footer.tsx
```

**Rule:** `components/ui` imports **NEVER** contain business logic or API calls. They only receive props.

## 3. The Token System (Theming)

We will use **CSS Variables** combined with **Tailwind CSS** to allow for instant re-theming (e.g., switching between "Corporate Blue" for MagicWRX and "Neon Dark" for MXN.CHAT) without changing component code.

### Semantic Token Categories

| Category | Token Name | MagicWRX (Business) | MXN.CHAT (Product) |
| :--- | :--- | :--- | :--- |
| **Brand** | `--primary` | Blue (`#3b82f6`) | Neon Blue (`#00d4ff`) |
| | `--secondary` | Purple (`#8b5cf6`) | Neon Purple (`#8844ff`) |
| **Surface** | `--background` | White (`#ffffff`) | Black (`#000000`) |
| | `--card` | Gray (`#f9fafb`) | Glass (`rgba(255,255,255,0.05)`) |
| **Text** | `--foreground` | Gray-900 (`#111827`) | White (`#ffffff`) |
| | `--muted` | Gray-500 (`#6b7280`) | Gray-400 (`#9ca3af`) |
| **Border** | `--border` | Gray-200 (`#e5e7eb`) | White-10 (`rgba(255,255,255,0.1)`) |

### Implementation in `tailwind.config.js`
```javascript
colors: {
  border: "hsl(var(--border))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  // ...
}
```

## 4. Component Standardization (The "SSOT")

We will define a standard set of "Primitive" components that every project MUST implement. This ensures that a developer moving from one project to another knows exactly how to build a UI.

### Core Primitives List
1.  **Button**: Variants (default, destructive, outline, secondary, ghost, link).
2.  **Card**: Header, Title, Description, Content, Footer.
3.  **Input/Form**: Label, Input, ErrorMessage.
4.  **Toast**: For notifications.
5.  **Avatar**: For user profiles.
6.  **Badge**: For status indicators.

## 5. Migration Plan for MagicWRX Repo

1.  **Phase 1: Foundation**
    *   Create `src/components/ui` and `src/components/features`.
    *   Update `tailwind.config.js` with semantic tokens.
    *   Update `globals.css` with the "Business Theme" variables.

2.  **Phase 2: Refactor**
    *   Move `Hero.tsx`, `Features.tsx` -> `src/components/features/marketing/`.
    *   Move `PaymentButton.tsx` -> `src/components/ui/button.tsx` (generalize it).
    *   Move `SupabaseStatus.tsx` -> `src/components/features/status/`.

3.  **Phase 3: Cleanup**
    *   Remove hardcoded colors (e.g., `bg-blue-600`) and replace with semantic tokens (`bg-primary`).
    *   Delete unused components.

## 6. Recommendation

Adopt the **shadcn/ui** philosophy:
*   It matches our proposed architecture perfectly.
*   It provides the code for the "Atoms" so we don't have to write them from scratch.
*   It is fully customizable via Tailwind.

**Next Action:** Approval to begin Phase 1 of the migration on the MagicWRX repository.
