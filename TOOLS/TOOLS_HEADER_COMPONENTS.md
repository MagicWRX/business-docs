# Header Components Tool

## Overview
This doc tracks the extracted header/navigation components used to reproduce AmazinglyStrange’s branded header behavior.

## Package
- `@amazing/header-components`
- Location: `/SHARED/header-components/`

## Connected Pages
### ADMIN App
- `/ADMIN/src/app/amazinglystrange/header/page.tsx`

### SHARED Hub
- `/SHARED/hub/src/app/tools/header/page.tsx`

## What “Parity” Means Here
- Brand navbar links + dropdown schema
- Header container background settings
- Sliding promo images sequence (if used)
- Keyboard navigation works; color contrast passes

## Data/Schema Expectations
- Navbar links and dropdowns should be data-driven.
- Slider images should be configurable (URLs + labels/links).

## Testing
- Visual regression: recommended (Hub route)
- a11y: recommended (Hub route)

## Next Steps
- Confirm the exact legacy header behaviors that must match (breakpoints, dropdown interactions, slider timing).
