# Location Filter Tool

## Overview
Location filtering UI/tooling (used to filter content by location/region) for AmazinglyStrange parity.

## Package
- Location: `/SHARED/location-filter/`

## Connected Pages
### SHARED Hub
- `CODE:`DOCs/TOOLS/SHARED/hub/src/app/tools/location-filter/page.tsx``

### ADMIN App
- No location-filter route found under `CODE:`DOCs/TOOLS/ADMIN/src/app/amazinglystrange`` in this workspace.

## Parity Definition
- Filter UI matches legacy behavior (selection model, defaults)
- Works with the data sources used by pages/components

## Data Contract (High Level)
- Location: id/slug/name, optional hierarchy

## Testing
- E2E: select filters → results update

## Next Steps
- Confirm where location-aware content is used (pages, galleries, blog, events).
