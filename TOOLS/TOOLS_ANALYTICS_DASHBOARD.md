# Analytics Dashboard Tool

## Overview
Analytics dashboard extracted for AmazinglyStrange parity.

## Package
- `@amazing/analytics-dashboard`
- Location: `/SHARED/analytics-dashboard/`

## Connected Pages
### ADMIN App
- `/ADMIN/src/app/amazinglystrange/analytics/page.tsx`

### SHARED Hub
- `/SHARED/hub/src/app/tools/analytics/page.tsx`

## Parity Definition
- Core metrics visible (visitors, page views, sources)
- Export works
- Real-time updates support (polling/websocket) as needed

## Data Contract (High Level)
- Event/session model decided (page view events vs aggregated daily stats)

## Testing
- Contract tests for backend adapter
- UI smoke tests for loading + export

## Next Steps
- Confirm the analytics collection strategy (client beacon vs server logs vs provider).
