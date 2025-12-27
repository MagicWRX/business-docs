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
│   ├── store/
│   │   └── page.tsx               # Online Store template demo
│   ├── service/
│   │   └── page.tsx               # Professional Services template demo
│   ├── restuarant/
│   │   └── page.tsx               # Restaurant & Cafe template demo
│   ├── platforms/
│   │   └── page.tsx               # SaaS Platform template demo
│   ├── corporate/
│   │   └── page.tsx               # Corporate Website template demo
│   ├── 1/page.tsx                 # Legacy template demo (numbered)
│   ├── 2/page.tsx                 # Legacy template demo (numbered)
│   ├── 3/page.tsx                 # Legacy template demo (numbered)
│   ├── 4/page.tsx                 # Legacy template demo (numbered)
│   └── 5/page.tsx                 # Legacy template demo (numbered)
```

## Template Pages & Live Previews

1. **Creative Gallery**
    - URL: `http://localhost:3002/templates/gallery`
    - Code: `src/app/templates/gallery/page.tsx`
    - Live Preview: `http://localhost:3004` (Base Template)

2. **Online Store**
    - URL: `http://localhost:3002/templates/store`
    - Code: `src/app/templates/store/page.tsx`
    - Live Preview: `http://localhost:3002` (MagicWRX itself)

3. **Professional Services**
    - URL: `http://localhost:3002/templates/service`
    - Code: `src/app/templates/service/page.tsx`
    - Live Preview: `http://localhost:3006` (Template-WRX)

4. **Restaurant & Cafe**
    - URL: `http://localhost:3002/templates/restuarant`
    - Code: `src/app/templates/restuarant/page.tsx`
    - Live Preview: `http://localhost:3003` (Amazingly Strange)

5. **SaaS Platform**
    - URL: `http://localhost:3002/templates/platforms`
    - Code: `src/app/templates/platforms/page.tsx`
    - Live Preview: `http://localhost:3001` (MXN Chat)

6. **Corporate Website**
    - URL: `http://localhost:3002/templates/corporate`
    - Code: `src/app/templates/corporate/page.tsx`
    - Live Preview: `http://localhost:3005` (Admin)

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
              <Link href="/signup?template=template-name">Use This Template</Link>
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
