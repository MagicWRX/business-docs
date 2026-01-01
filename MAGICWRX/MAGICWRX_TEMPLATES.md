# Templates

http://localhost:3002/templates

## Template Directory Structure

```
MagicWRX/
├── src/app/templates/
│   ├── page.tsx                    # Main templates listing page
│   ├── portfolio/
│   │   └── page.tsx               # Creative Portfolio template demo
│   ├── gallery/
│   │   └── page.tsx               # Creative Gallery template demo
│   ├── ecommerce/
│   │   └── page.tsx               # Online Store template demo (canonical route)
│   ├── store/
│   │   └── page.tsx               # Online Store template demo (legacy alias)
│   ├── service/
│   │   └── page.tsx               # Professional Services template demo
│   ├── restaurant/
│   │   └── page.tsx               # Restaurant & Cafe template demo (canonical route)
│   ├── restuarant/
│   │   └── page.tsx               # Restaurant & Cafe template demo (legacy alias)
│   ├── saas/
│   │   └── page.tsx               # SaaS Platform template demo (canonical route)
│   ├── platforms/
│   │   └── page.tsx               # SaaS Platform template demo (legacy alias)
│   ├── corporate/
│   │   └── page.tsx               # Corporate Website template demo
│   ├── 1/page.tsx                 # Legacy template demo (numbered)
│   ├── 2/page.tsx                 # Legacy template demo (numbered)
│   ├── 3/page.tsx                 # Legacy template demo (numbered)
│   ├── 4/page.tsx                 # Legacy template demo (numbered)
│   └── 5/page.tsx                 # Legacy template demo (numbered)
```

## Template Pages & Live Previews

Canonical template routes (these match the IDs used throughout the app):

1. **Creative Portfolio**
  - URL: `http://localhost:3002/templates/portfolio`
  - Code: `src/app/templates/portfolio/page.tsx`
  - Live Preview: `http://localhost:3004` (Base Template)

2. **Online Store (E-commerce)**
  - URL: `http://localhost:3002/templates/ecommerce`
  - Code: `src/app/templates/ecommerce/page.tsx` (canonical)
  - Live Preview: `http://localhost:3002` (MagicWRX itself)

3. **Professional Services**
  - URL: `http://localhost:3002/templates/service`
  - Code: `src/app/templates/service/page.tsx`
  - Live Preview: `http://localhost:3006` (Template-WRX)

4. **Restaurant & Cafe**
  - URL: `http://localhost:3002/templates/restaurant`
  - Code: `src/app/templates/restaurant/page.tsx` (canonical)
  - Live Preview: `http://localhost:3003` (Amazingly Strange)

5. **SaaS Platform**
  - URL: `http://localhost:3002/templates/saas`
  - Code: `src/app/templates/saas/page.tsx` (canonical)
  - Live Preview: `http://localhost:3001` (MXN Chat)

6. **Corporate Website**
  - URL: `http://localhost:3002/templates/corporate`
  - Code: `src/app/templates/corporate/page.tsx`
  - Live Preview: `http://localhost:3005` (Admin)

Legacy alias routes (kept temporarily for backwards compatibility):
- Store demo: `/templates/store` → canonical `/templates/ecommerce`
- Restaurant demo typo: `/templates/restuarant` → canonical `/templates/restaurant`
- SaaS demo alias: `/templates/platforms` → canonical `/templates/saas`

## Code Structure for Each Template Page

Each template demo page follows this structure:

```tsx
import Link from 'next/link'

export default function TemplateNameDemo() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with navigation and action buttons */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/templates">← Back to Templates</Link>
            <div className="flex gap-4">
              <a href="http://localhost:XXXX" target="_blank">Live Preview →</a>
              <Link href="/sites/new?template=template-name">Use This Template</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Template information and preview sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title, description, badges */}
        {/* Template screenshots/features */}
        {/* Call-to-action section */}
      </div>
    </div>
  )
}
```

## Key Components

- **Navigation**: Back to templates listing
- **Live Preview Button**: Opens actual running site in new tab
- **Use Template Button**: Links to signup with template parameter
- **Template Info**: Title, description, category badges
- **Preview Sections**: Mock screenshots of key template features
- **CTA Section**: Prominent action buttons for next steps
