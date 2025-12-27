# Admin Layout Tool

## Overview
Shared admin shell (layout + navigation) used across ADMIN routes and SHARED Hub demos.

## Workstream Claim
- Owner (AI chat / person): GitHub Copilot
- Date claimed: 2025-12-25
- Status: claimed

## Scope
- Left sidebar tool navigation
- Active state highlighting
- Collapsible behavior
- Consistent header/top bar (if applicable)
- Content area layout and responsive behavior

## Non-Goals
- Tool-specific CRUD or backend adapters (handled by each tool)

## Connected Pages
### SHARED Hub
- `/SHARED/hub/src/app/tools/admin-layout/page.tsx` (demo/standalone version)

### ADMIN App
- Not yet integrated (work in progress)

## Integration Notes
- Should not embed business-specific branding; accept config (site name/logo/nav groups).
- Should be compatible with Next.js App Router layouts.

## Data / Configuration Contract (Draft)
- `navItems`: label, href, icon?, section?
- `currentSite`: optional (multi-tenant)
- `currentUser`: optional

## Testing
- Visual regression: sidebar expanded/collapsed
- A11y: keyboard navigation through nav

## Open Questions
- Do we create a package `@amazing/admin-layout`, or keep as app-level component shared via `SHARED/*`?
- Where does site switching live (AdminLayout vs SiteSwitcher)?

## Links
- SSOT coordination: DOCs/TOOLS/SHARED_TOOLS_ROADMAP.md
- Vision/exit criteria: DOCs/TOOLS/AMAZINGLYSTRANGE_PARITY_ROADMAP.md

## Initial Checklist & File Plan ✅
**Goal:** Create a reusable `@amazing/admin-layout` package under `SHARED/` that provides a left sidebar, collapsible behavior, and header chrome compatible with Next.js App Router layouts.

### Milestones
1. Design: finalize props contract and keyboard accessibility expectations
2. Scaffold: create package with TypeScript, Storybook, and tests
3. Implement: components for `AdminLayout`, `Sidebar`, `Topbar`, `NavItem`, `SiteSwitcher`
4. Integration: add demo pages and Admin layout example to `ADMIN` app
5. Docs & Tests: add README, usage examples, visual snapshots, unit + a11y tests

### Proposed File Structure
```
/SHARED/admin-layout/
  package.json
  tsconfig.json
  README.md
  src/
    components/
      AdminLayout.tsx
      Sidebar.tsx
      Topbar.tsx
      NavItem.tsx
      SiteSwitcher.tsx
    styles/
      admin-layout.css (or tailwind integration)
    index.ts
  test/
    AdminLayout.test.tsx
  .storybook/
    main.ts
    preview.ts
```

### API (Draft)
```ts
interface NavItem { label: string; href: string; icon?: ReactNode; section?: string }
interface AdminLayoutProps { navItems: NavItem[]; currentUser?: any; currentSite?: string; collapsed?: boolean; onToggle?: () => void }
```

### Acceptance Criteria
- Sidebar supports keyboard navigation and is screen reader friendly
- Collapsible state persists in localStorage (opt-in)
- Visual snapshots for expanded/collapsed states
- Minimal external deps (React, lucide-react for icons, date-fns optional)

### Next steps
- Claim files and create `SHARED/admin-layout` scaffold (if you want, I can create the scaffold next)
- Decide package name (e.g., `@amazing/admin-layout`) and preferred styling approach (Tailwind vs CSS)


