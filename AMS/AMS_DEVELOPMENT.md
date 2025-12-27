# AS Development Workflow

## 🔄 Purpose

This guide describes how to plan, build, test, and deploy changes for the Amazingly Strange Website while adhering to our standards and guardrails.

## 🎯 Delivery Process

### 1. Plan
- Capture work as GitHub issues with clear acceptance criteria
- Review `docs/AS_ROADMAP.md` for priority alignment
- Validate design assumptions with stakeholders before coding

### 2. Build

#### Branching Strategy
```bash
main                      # Production-ready
feature/<topic>           # New functionality (e.g., feature/content-migration)
bugfix/<issue>            # Defect corrections
hotfix/<incident>         # Urgent production fixes
chore/<maintenance>       # Tooling & dependencies
docs/<area>               # Documentation-only updates
```

#### Everyday Commands
```bash
# Pull latest main
git checkout main && git pull origin main

# Start feature branch
git checkout -b feature/content-migration

# Start dev server
npm run dev

# Quality gates
npm run type-check
npm run lint
npm run build
```

### 3. Validate
- Use manual testing checklist in `docs/AS_SETUP.md`
- Update or add automated tests where applicable
- Document notable decisions in PR description

### 4. Deploy
- Ship preview build with `vercel`
- Request peer review focusing on content rendering
- Promote to production with `vercel --prod`
- Follow `AS_RELEASE_RUNBOOK.md` for post-deploy verification and rollback steps

## 🧰 Local Development Tips

```bash
# Run on alternate port
npm run dev -- -p 3100

# Inspect open processes
lsof -i :3000

# Inspect current environment values
cat .env.local
```

### Supabase Local Development (optional advanced usage)
```bash
npx supabase login          # if using Supabase CLI
npx supabase init
npx supabase start
```

## 🧪 Quality Assurance

### Manual Regression Checklist
- [ ] Landing page loads without errors
- [ ] Game download links work
- [ ] Content renders with themes
- [ ] Responsive design on mobile/desktop
- [ ] Images and assets load correctly

### Automated Safeguards
```bash
npm run type-check    # TypeScript strictness
npm run lint          # ESLint rules
npm run build         # Detect runtime build issues
```

Add component or integration tests under `src/__tests__` when implementing new features or fixing bugs that risk regression.

### Performance & Accessibility
- Monitor bundle size with `npx next analyze`
- Run Lighthouse audits for page experience
- Keep layout shifts minimal with consistent component sizing

## 🚀 Deployment Workflow (Summary)

1. Ensure main is green via CI or local checks
2. Deploy preview (`vercel`) and verify content rendering
3. Merge PR with squash commits referencing issue IDs
4. Run production deploy (`vercel --prod`)
5. Execute release checklist in `AS_RELEASE_RUNBOOK.md`

## 🔍 Debugging Playbook

| Scenario | Investigation | Tools |
|----------|---------------|-------|
| Content not loading | Check Supabase connection and queries | Supabase dashboard |
| Images not displaying | Verify public/ paths and file names | Browser devtools |
| Build failure on Vercel | Re-run local build, check TypeScript errors | `npm run build`, Vercel logs |
| Theme not applying | Inspect theme config and component usage | Browser devtools |

### Useful Commands
```bash
# Follow production logs
vercel logs [app-url] --follow

# Inspect specific deployment
vercel inspect [app-url]

# Roll back if needed
vercel rollback
```

## 🤝 Collaboration Norms

- Keep PRs small, focused, and linked to issues
- Highlight test coverage and manual verification steps in PR descriptions
- Call out documentation updates (or confirm none required)
- Use `docs/AS_AI_PROMPT.md` structure when collaborating with AI tooling

## 📚 Reference Documents

- `docs/AS_STANDARDS.md` – Naming, coding, and doc policies
- `docs/AS_SETUP.md` – Environment + Supabase configuration
- `docs/AS_API.md` – Database schema and data flow
- `docs/AS_ROADMAP.md` – Current priorities and milestones
