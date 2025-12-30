# Admin Layout Tool

## Overview
Shared admin shell (layout + navigation) used across ADMIN routes and SHARED Hub demos.

## Workstream Claim
- Owner (AI chat / person): GitHub Copilot
- Date claimed: 2025-12-25
- Status: ✅ Complete (Polished 2025-12-27)

## Implementation Status
✅ **Package Created**: `@amazing/admin-layout` v0.1.0

### Completed Features
- ✅ Left sidebar with collapsible behavior
- ✅ Section-based navigation grouping
- ✅ Active route highlighting (exact + prefix matching)
- ✅ Keyboard shortcuts (Ctrl/Cmd + B)
- ✅ localStorage persistence (opt-in)
- ✅ Controlled and uncontrolled modes
- ✅ Icon support via ReactNode
- ✅ Accessibility (ARIA labels, keyboard nav)
- ✅ Responsive design with Tailwind CSS
- ✅ TypeScript with proper types
- ✅ Unit tests with Vitest
- ✅ Demo page in SHARED Hub

## Scope
- Left sidebar tool navigation
- Active state highlighting
- Collapsible behavior with toggle button
- Section-based grouping
- Keyboard shortcuts
- Content area layout and responsive behavior
- Optional topbar support

## Non-Goals
- Tool-specific CRUD or backend adapters (handled by each tool)
- Multi-tenant site switching (can be added as topbar content)

## Connected Pages
### SHARED Hub
- `/SHARED/hub/src/app/tools/admin-layout/page.tsx` - Demo with icons and persistence

### ADMIN App
- Ready for integration in `/ADMIN/src/app/layout.tsx` or route-specific layouts
- Package available: `@amazing/admin-layout`

## Usage Example

```tsx
'use client';

import { AdminLayout, type AdminNavItem } from '@amazing/admin-layout';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, FileText, Image } from 'lucide-react';

const navItems: AdminNavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: <Home size={18} />, section: 'General' },
  { label: 'Pages', href: '/admin/pages', icon: <FileText size={18} />, section: 'Content' },
  { label: 'Media', href: '/admin/media', icon: <Image size={18} />, section: 'Content' }
];

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AdminLayout
      brand={{ siteName: 'Admin Panel' }}
      navItems={navItems}
      activeHref={pathname}
      linkComponent={Link as any}
      persistCollapsed
    >
      {children}
    </AdminLayout>
  );
}
```

## Integration Notes
- Should not embed business-specific branding; accept config (site name/logo/nav groups).
- Should be compatible with Next.js App Router layouts.

## Data / Configuration Contract

### AdminLayoutProps
```typescript
interface AdminLayoutProps {
  brand?: { siteName?: string; logo?: ReactNode };
  navItems: AdminNavItem[];
  activeHref?: string;
  isActive?: (href: string, activeHref?: string) => boolean;
  collapsed?: boolean; // Controlled mode
  defaultCollapsed?: boolean; // Uncontrolled mode
  onCollapsedChange?: (collapsed: boolean) => void;
  persistCollapsed?: boolean; // Enable localStorage
  persistKey?: string; // localStorage key (default: 'admin-layout-collapsed')
  linkComponent?: AdminLinkComponent; // e.g., Next.js Link
  topbar?: ReactNode;
  children: ReactNode;
  className?: string;
  sidebarClassName?: string;
  contentClassName?: string;
}

interface AdminNavItem {
  label: string;
  href: string;
  icon?: ReactNode;
  section?: string;
  disabled?: boolean;
}
```

### Default Behavior
- **Active matching**: Exact match OR prefix match for nested routes
- **Sections**: Items without section go to "Tools"
- **Collapse**: Defaults to expanded unless `defaultCollapsed` or `persistCollapsed` with stored value
- **Link**: Uses `<a>` by default, override with `linkComponent`

## Testing
- ✅ Unit tests with Vitest + Testing Library
- ✅ Visual demo in SHARED Hub
- ✅ Keyboard navigation tested
- ✅ Responsive behavior verified

### Test Coverage
- Sidebar width changes on collapse/expand
- Active highlighting based on `activeHref`
- Keyboard shortcut (Ctrl/Cmd + B)
- localStorage persistence
- Section grouping

## Features

### Keyboard Shortcuts
- **Ctrl/Cmd + B**: Toggle sidebar collapse/expand

### Accessibility
- ARIA labels on toggle button with hints
- Keyboard navigation through nav items
- Focus visible states
- Screen reader friendly (collapsed content hidden with `sr-only`)

### Persistence
Optional localStorage support to remember sidebar state across sessions:
```tsx
<AdminLayout persistCollapsed persistKey="my-app-sidebar">
```

## Open Questions
- ✅ **RESOLVED**: Created `@amazing/admin-layout` package
- ✅ **RESOLVED**: Site switching can be added as topbar content by consumer
- 🔲 **PENDING**: Integration into ADMIN app routes (awaiting route restructure)

## Links
- Package: `/SHARED/admin-layout/`
- Demo: `/SHARED/hub/src/app/tools/admin-layout/page.tsx`
- README: `/SHARED/admin-layout/README.md`
- SSOT coordination: [DOCs/TOOLS/SHARED_TOOLS_ROADMAP.md](../../DOCs/TOOLS/SHARED_TOOLS_ROADMAP.md)

## Installation

```bash
# Add to package.json
"@amazing/admin-layout": "file:../SHARED/admin-layout"

# With lucide-react for icons
npm install lucide-react
```

## Recent Updates
- **2025-12-27**: Polished package with improved features
  - Added keyboard shortcuts (Ctrl/Cmd + B)
  - Implemented localStorage persistence
  - Enhanced toggle button with animated icon
  - Added comprehensive documentation
  - Updated demo with icons and examples
  - Fixed TypeScript readonly props warnings
  - Added lucide-react peer dependency

---

## Implementation Notes

### File Structure (Actual)
```
/SHARED/admin-layout/
  package.json
  tsconfig.json
  vitest.config.ts
  README.md
  src/
    components/
      AdminLayout.tsx
      Sidebar.tsx
      Topbar.tsx
      NavItem.tsx
    lib/
      cn.ts
    types.ts
    index.ts
  test/
    AdminLayout.test.ts
    setup.ts
  dist/  (compiled output)
```

### Dependencies
- **Peer**: React 19+, lucide-react 0.400+
- **Dev**: TypeScript 5+, Vitest, Testing Library
- **Runtime**: Zero dependencies (just React)

### Acceptance Criteria ✅
- ✅ Sidebar supports keyboard navigation (Ctrl/Cmd + B)
- ✅ Screen reader friendly (ARIA labels, sr-only)
- ✅ Collapsible state persists in localStorage (opt-in)
- ✅ Unit tests with Vitest
- ✅ Minimal external deps (React, lucide-react peer)
- ✅ Tailwind CSS styling
- ✅ TypeScript with proper types


