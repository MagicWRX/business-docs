# AS Overview

## Project Snapshot

The Amazingly Strange Website is a Next.js-based platform for Amazingly Strange LLC, an indie game studio. It showcases their delightfully eerie mobile games, provides information about their whimsical universe, and serves as a hub for fans and potential collaborators.

### 🎯 Strategic Goals

1. **Brand Showcase** – Present the Amazingly Strange universe and game portfolio
2. **User Acquisition** – Drive downloads of mobile games via App Store and Google Play links
3. **Community Building** – Connect with fans through MonstersReign.com and social channels
4. **Content Management** – Flexible table system for dynamic content creation
5. **Developer Experience** – Modern Next.js stack with TypeScript and Tailwind

### 🏗️ Architecture Highlights

- **Frontend**: Next.js 15 (App Router, React Server Components)
- **Database**: Supabase PostgreSQL for content tables and user uploads
- **UI**: Tailwind CSS with custom Amazingly Strange brand colors and themes
- **Hosting**: Vercel production deployment
- **Content**: Dynamic table system with themes (Emerald, Dark, Monster)

### 🚀 Feature Set

- ✅ Landing page with hero banner and game showcases
- ✅ Download links for iOS and Android games
- ✅ About section linking to MonstersReign.com
- ✅ Dynamic content tables with themeable layouts
- ✅ File upload system for assets
- ✅ Responsive design for mobile and desktop

### 📁 Repository Map (High Level)

```
amazingly-strange-website/
├── docs/                          # Documentation hub (AS_* files)
├── src/
│   ├── app/                       # Next.js App Router pages & layouts
│   ├── components/                # Reusable React components
│   └── CODE:`DOCs/AMS/ADMIN/src/lib/supabase`              # Supabase client factories
├── public/                        # Static assets (images, badges)
├── scripts/                       # Database setup scripts
├── checkpoints/                   # Phase checklists
└── package.json                   # Scripts and dependencies
```

### 🔧 Technology Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| Framework | Next.js | 15.3.5 | App Router & SSR |
| Language | TypeScript | Latest | Type safety |
| Database | Supabase | Latest | Content storage & auth |
| Styling | Tailwind CSS | 4 | Responsive UI with brand themes |
| Hosting | Vercel | Latest | CI/CD + hosting |
| Package Manager | npm | Latest | Dependency management |

### 🌐 Production Footprint

- **App URL**: [To be deployed on Vercel]
- **Supabase URL**: [Configured in environment]
- **Environment Parity**: Local `.env.local`, production Vercel env vars

### 🔐 Security Considerations

- Supabase RLS policies for data access
- Secure file uploads with user isolation
- Environment variables for sensitive config

### 📈 Performance Practices

- Server-side rendering for content pages
- Optimized images and assets
- Lazy loading for game icons

### 🛣️ Roadmap Snapshot

See `docs/AS_ROADMAP.md` for detailed NOW/NEXT/LATER initiatives. Currently in Phase 1 (Foundation) completed, moving to Phase 2 (Content Migration).

### 🧭 Documentation Suite

- `docs/AS_INDEX.md` – Navigation index & change log
- `docs/AS_SETUP.md` – Local + production setup, environment management
- `docs/AS_DEVELOPMENT.md` – Day-to-day workflow and QA checklists
- `docs/AS_STANDARDS.md` – Naming conventions, coding standards, doc rules
- `docs/AS_API.md` – Database schema, Supabase interfaces, data flow
- `docs/AS_AI_PROMPT.md` – AI collaboration guardrails

### 📝 Future Enhancements

- [ ] Content migration from static site
- [ ] Table builder interface for dynamic content
- [ ] User authentication for content management
- [ ] Dark mode toggle
- [ ] Additional game integrations
- [ ] Blog/news section

### 🤝 Contribution Notes

Before contributing, review `docs/AS_STANDARDS.md` and `docs/AS_DEVELOPMENT.md` to align on branching strategy, naming rules, and testing expectations.

### 📞 Support Channels

For build/run issues start with `docs/AS_SETUP.md`. For process or workflow questions consult `docs/AS_DEVELOPMENT.md`. For database troubleshooting reference `docs/AS_API.md`.
