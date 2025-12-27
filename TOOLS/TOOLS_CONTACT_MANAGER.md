# Contact Manager Tool

## Overview
Contact submissions management extracted for AmazinglyStrange parity.

## Package
- `@amazing/contact-manager`
- Location: `/SHARED/contact-manager/`

## Connected Pages
### ADMIN App
- `/ADMIN/src/app/amazinglystrange/contacts/page.tsx`

### SHARED Hub
- `/SHARED/hub/src/app/tools/contact-manager/page.tsx`

## Parity Definition
- Inbox-style workflow: new → in-progress → resolved/archived
- Export data
- Works with backend adapter

## Data Contract (High Level)
- Contact: `id`, `name`, `email`, `subject`, `message`, `status`, `timestamp`, `lastUpdated`, optional `phone`, `company`, `projectType`

## Testing
- E2E: change status → persist → reload unchanged

## Next Steps
- Decide on retention/archival policies.
