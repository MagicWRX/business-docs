# AS Development Standards

## 📋 Overview

This standardizes naming conventions, directory structure, code style, documentation patterns, and deployment hygiene for the Amazingly Strange Website. All new documentation must use the `AS_*.md` naming scheme.

## 🏗️ Project Structure Rules

### Directory Naming

```
project-root/
├── docs/                         # Documentation (AS_* files only)
├── src/                          # Application code (lowercase folders)
├── public/                       # Static assets
├── scripts/                      # Database and utility scripts
├── checkpoints/                  # Phase checklists
└── config/                       # Deployment/runtime configs (if needed)
```

### File Naming

| Artifact | Convention | Example |
|----------|------------|---------|
| React components | PascalCase | `Header.tsx` |
| Next.js pages/layouts | lowercase | `page.tsx`, `layout.tsx` |
| Utilities | camelCase | `cn.ts` |
| Types/Interfaces | PascalCase | `Database.ts` |
| Constants | UPPER_SNAKE_CASE | `GAME_LINKS.ts` |
| Config files | kebab-case | `tailwind.config.ts` |
| Documentation | Prefix `AS_` + PascalCase | `AS_SETUP.md` |
| Environment | dotfile | `.env.local`, `.env.example` |

## 🔤 Naming Conventions

### Variables & Functions
```typescript
const gameDownloadUrl = 'https://...'; // camelCase
function formatGameTitle() { /* ... */ }
```
Avoid snake_case or PascalCase for variables/functions.

### React Components
```typescript
const GameCard = () => { /* ... */ }; // PascalCase
```
One component per file; default export unless multiple exports required.

### Constants & Enums
```typescript
const APP_STORE_URL = 'https://apps.apple.com/...';
enum ThemeType {
  Emerald = 'emerald',
}
```

### CSS & Tailwind
- Prefer Tailwind utility classes
- Custom classes use kebab-case (`game-grid`)

## 📁 Code Organization

### Components
```
components/
├── ui/                           # Reusable UI components
│   ├── Button.tsx
│   └── Modal.tsx
├── layout/                       # Layout components
│   ├── Header.tsx
│   └── Footer.tsx
└── game/                         # Game-specific components
    ├── GameIcon.tsx
    └── DownloadButton.tsx
```

### Libraries & Utilities
```
lib/
├── supabase/                     # Supabase clients
│   ├── client.ts
│   └── types.ts
├── utils/                        # Utility functions
│   ├── cn.ts
│   └── formatters.ts
└── types/                        # Type definitions
    ├── database.ts
    └── index.ts
```

## 🎨 Code Style

- TypeScript strict mode enforced via `tsconfig.json`
- Prefer explicit return types on public functions
- Use async/await; avoid mixing with `.then()`
- Handle errors explicitly and bubble contextual messages
- Keep functions small and single-purpose (SRP)

### Example Patterns
```typescript
interface GameInfo {
  id: string;
  title: string;
  storeUrl: string;
}

type LayoutType = '1-col' | '2-col' | '3-col';

const fetchGames = async (): Promise<GameInfo[]> => {
  // Fetch from Supabase or static data
};
```

## 📝 Documentation Standards

Refer to `docs/AS_AI_STANDARDS.md` for governance requirements that apply to AI-assisted workflows in addition to the rules below.

- Store project docs in `docs/` with `AS_` prefix
- Update `AS_INDEX.md` after adding/modifying docs
- Each doc starts with an H1 describing its scope (e.g., `# AS Setup Guide`)
- Include "Related Documents" section when cross-references help navigation
- Record doc changes in the change log of `AS_INDEX.md`

### README Composition
Every project README (or in this case `AS_OVERVIEW.md`) must cover:
1. Project snapshot + goals
2. Architecture summary
3. Feature inventory
4. Tech stack table
5. Deployment & support references
6. Future enhancements

### Commenting
```typescript
/**
 * Renders a game download section with App Store and Google Play links.
 */
const GameDownloadSection = () => { /* ... */ }
```
Reserve inline comments for non-obvious logic only.

## 🌐 Environment & Git Hygiene

### Environment Variables
- Prefix browser-exposed values with `NEXT_PUBLIC_`
- Document all variables in `.env.example`
- Pull production values with `vercel env pull`
- Rotate Supabase keys quarterly

### Git Standards
```bash
# Branch naming
feature/add-game-showcase
bugfix/fix-mobile-layout
chore/update-dependencies

# Commit messages (Conventional Commits)
feat: add game download section
fix: resolve image loading on mobile
docs: update AS_SETUP with new env vars
```

## 🔍 Quality Gates

- `npm run type-check` — must pass before commit
- `npm run lint` — addresses style and best practices
- `npm run build` — ensures production readiness
- Add/update tests for logic-heavy changes

## 📊 Performance & Security

- Track Core Web Vitals (FCP < 1.5s, LCP < 2.5s, CLS < 0.1)
- Monitor bundle size; avoid large third-party packages
- Use HTTPS everywhere
- Validate user inputs and sanitize data

## 🔄 Review Cadence

- Review standards quarterly for stack changes
- Update documentation references in `AS_INDEX.md`
- Confirm doc naming compliance during PR reviews

---

*Maintain these standards to ensure a consistent, secure, and maintainable website for Amazingly Strange.*
